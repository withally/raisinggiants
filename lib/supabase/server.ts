// WARNING: service_role key bypasses ALL Row Level Security policies.
// This client is for server-side operations ONLY (e.g., Stripe webhook handler).
// NEVER import this file in client components, pages, or any browser-executed code.
// The SUPABASE_SERVICE_ROLE_KEY env var must NOT have the NEXT_PUBLIC_ prefix.
import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
