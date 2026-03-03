// WARNING: service_role key bypasses ALL Row Level Security policies.
// This client is for server-side operations ONLY (e.g., Stripe webhook handler).
// NEVER import this file in client components, pages, or any browser-executed code.
// The SUPABASE_SERVICE_ROLE_KEY env var must NOT have the NEXT_PUBLIC_ prefix.
import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      `Missing Supabase env vars: ${[!url && 'SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL', !key && 'SUPABASE_SERVICE_ROLE_KEY'].filter(Boolean).join(', ')}`,
    )
  }

  return createClient(url, key)
}
