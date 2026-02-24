/**
 * verify-rls.ts — Phase 1 gate script
 *
 * Verifies all Phase 1 RLS success criteria through the JavaScript SDK with
 * real anonymous sessions. This is the ONLY valid verification surface — the
 * SQL editor runs as postgres superuser and bypasses RLS policies.
 *
 * Run: npm run verify-rls
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
 *           SUPABASE_SERVICE_ROLE_KEY and a running local Supabase instance.
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ---------------------------------------------------------------------------
// Load environment variables from .env.local (no external dependencies)
// ---------------------------------------------------------------------------
function loadEnvLocal(): void {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    console.error('ERROR: .env.local not found. Copy .env.local.example and fill in values from `supabase start`.')
    process.exit(1)
  }
  const raw = fs.readFileSync(envPath, 'utf-8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const value = trimmed.slice(eqIdx + 1).trim()
    if (key && !(key in process.env)) {
      process.env[key] = value
    }
  }
}

loadEnvLocal()

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('ERROR: Missing required environment variables.')
  console.error('  NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? 'set' : 'MISSING')
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? 'set' : 'MISSING')
  console.error('  SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'MISSING')
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function pass(msg: string): void {
  console.log(`PASS: ${msg}`)
}

function fail(msg: string): never {
  console.error(`FAIL: ${msg}`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Main verification sequence
// ---------------------------------------------------------------------------
async function runVerification(): Promise<void> {
  console.log('=== Phase 1 RLS Verification ===')
  console.log(`Supabase URL: ${SUPABASE_URL}`)
  console.log('')

  // Single anon client — we swap sessions on it by calling signInAnonymously()
  const anonClient: SupabaseClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  // Admin client — service_role, bypasses RLS (used only for test data setup/cleanup)
  const adminClient: SupabaseClient = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  // Track inserted rows for cleanup
  let sessionAId: string | null = null
  let testOrderId: string | null = null

  try {
    // ------------------------------------------------------------------
    // Test 1 — Anonymous sign-in works
    // ------------------------------------------------------------------
    const { data: signInA, error: signInAErr } = await anonClient.auth.signInAnonymously()
    if (signInAErr || !signInA.user?.id) {
      fail(`Anonymous sign-in failed: ${signInAErr?.message ?? 'no user returned'}`)
    }
    const userA = signInA.user!
    if (!userA.id.match(/^[0-9a-f-]{36}$/i)) {
      fail(`Anonymous sign-in returned invalid UUID: ${userA.id}`)
    }
    pass(`Anonymous sign-in succeeded. User A: ${userA.id}`)

    // ------------------------------------------------------------------
    // Test 2 — User A can INSERT a quiz_session
    // ------------------------------------------------------------------
    const { data: insertData, error: insertErr } = await anonClient
      .from('quiz_sessions')
      .insert({ user_id: userA.id, status: 'in_progress' })
      .select()
      .single()

    if (insertErr || !insertData) {
      fail(`User A could not insert quiz_session: ${insertErr?.message ?? 'no data returned'}`)
    }
    sessionAId = insertData.id as string
    pass(`User A inserted quiz_session: ${sessionAId}`)

    // ------------------------------------------------------------------
    // Test 3 — User A can SELECT their own quiz_session
    // ------------------------------------------------------------------
    const { data: selectData, error: selectErr } = await anonClient
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionAId)

    if (selectErr) {
      fail(`User A SELECT failed: ${selectErr.message}`)
    }
    if (!selectData || selectData.length !== 1) {
      fail(`User A expected 1 row, got ${selectData?.length ?? 0}`)
    }
    pass(`User A can read their own session`)

    // ------------------------------------------------------------------
    // Test 4 — User A can UPDATE their own quiz_session
    // ------------------------------------------------------------------
    const { error: updateErr } = await anonClient
      .from('quiz_sessions')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', sessionAId)

    if (updateErr) {
      fail(`User A could not update their quiz_session: ${updateErr.message}`)
    }
    pass(`User A can update their own session`)

    // ------------------------------------------------------------------
    // Test 5 — Cross-user read isolation (CRITICAL SECURITY TEST)
    // ------------------------------------------------------------------
    await anonClient.auth.signOut()

    const { data: signInB, error: signInBErr } = await anonClient.auth.signInAnonymously()
    if (signInBErr || !signInB.user?.id) {
      fail(`User B sign-in failed: ${signInBErr?.message ?? 'no user returned'}`)
    }
    const userB = signInB.user!
    pass(`Anonymous sign-in succeeded. User B: ${userB.id}`)

    const { data: crossReadData, error: crossReadErr } = await anonClient
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionAId)

    if (crossReadErr) {
      fail(`Unexpected error during cross-user SELECT: ${crossReadErr.message}`)
    }
    if (crossReadData && crossReadData.length > 0) {
      fail(`SECURITY FAIL: User B CAN read User A's session — RLS policy not working! Rows returned: ${crossReadData.length}`)
    }
    pass(`User B cannot read User A's session (RLS enforced)`)

    // ------------------------------------------------------------------
    // Test 6 — Cross-user insert rejection
    // User B attempts to INSERT a quiz_session with user_id = userA.id
    // ------------------------------------------------------------------
    const { data: crossInsertData, error: crossInsertErr } = await anonClient
      .from('quiz_sessions')
      .insert({ user_id: userA.id, status: 'in_progress' })
      .select()

    if (!crossInsertErr && crossInsertData && crossInsertData.length > 0) {
      fail(`SECURITY FAIL: User B inserted a session for User A — RLS WITH CHECK not working!`)
    }
    pass(`User B cannot insert a session for User A`)

    // ------------------------------------------------------------------
    // Test 7 — Storage bucket exists and is private
    // ------------------------------------------------------------------
    const { data: bucketsData, error: bucketsErr } = await adminClient.storage.listBuckets()
    if (bucketsErr) {
      fail(`listBuckets failed: ${bucketsErr.message}`)
    }
    const blueprintsBucket = bucketsData?.find((b) => b.id === 'blueprints')
    if (!blueprintsBucket) {
      fail(`blueprints bucket not found. Buckets found: ${bucketsData?.map((b) => b.id).join(', ') ?? 'none'}`)
    }
    if (blueprintsBucket.public !== false) {
      fail(`blueprints bucket is PUBLIC — must be private!`)
    }
    pass(`blueprints bucket exists and is private`)

    // ------------------------------------------------------------------
    // Test 8 — Orders table SELECT isolation
    // Admin inserts a test order for User A; User B must not be able to read it
    // ------------------------------------------------------------------

    // Admin inserts a test order for User A's session
    const { data: orderData, error: orderErr } = await adminClient
      .from('orders')
      .insert({
        quiz_session_id: sessionAId,
        user_id: userA.id,
        stripe_checkout_session_id: `test_${Date.now()}_rls_verify`,
        status: 'pending',
        amount_cents: 4900,
        customer_email: 'test-rls-verify@example.com',
      })
      .select()
      .single()

    if (orderErr || !orderData) {
      fail(`Admin could not insert test order for User A: ${orderErr?.message ?? 'no data'}`)
    }
    testOrderId = orderData.id as string

    // As User B (anon client still signed in as User B), attempt to SELECT User A's order
    const { data: crossOrderData, error: crossOrderErr } = await anonClient
      .from('orders')
      .select('*')
      .eq('id', testOrderId)

    if (crossOrderErr) {
      fail(`Unexpected error during cross-user orders SELECT: ${crossOrderErr.message}`)
    }
    if (crossOrderData && crossOrderData.length > 0) {
      fail(`SECURITY FAIL: User B CAN read User A's order — orders RLS policy not working!`)
    }
    pass(`User B cannot read User A's orders`)

  } finally {
    // ------------------------------------------------------------------
    // Cleanup — delete test data via service_role
    // ------------------------------------------------------------------
    console.log('')
    console.log('Cleaning up test data...')

    if (testOrderId) {
      const { error } = await adminClient.from('orders').delete().eq('id', testOrderId)
      if (error) {
        console.warn(`Warning: Failed to delete test order ${testOrderId}: ${error.message}`)
      }
    }

    if (sessionAId) {
      const { error } = await adminClient.from('quiz_sessions').delete().eq('id', sessionAId)
      if (error) {
        console.warn(`Warning: Failed to delete test quiz_session ${sessionAId}: ${error.message}`)
      }
    }

    console.log('Cleanup complete.')
  }

  console.log('')
  console.log('=== All Phase 1 RLS checks PASSED ===')
}

runVerification().catch((err: unknown) => {
  console.error('Unhandled error:', err)
  process.exit(1)
})
