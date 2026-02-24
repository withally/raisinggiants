# Phase 1: Data Foundation - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up the Supabase database schema (quiz_sessions, orders tables), Row Level Security policies, anonymous authentication, and a private Storage bucket for PDF delivery. This is pure infrastructure — no UI, no user-facing features. Enables all downstream phases.

</domain>

<decisions>
## Implementation Decisions

### Quiz session data shape
- Store full answer set: every individual answer + computed dimension scores + final archetype result
- Cultural background gets its own dedicated column (not buried in answers JSON) — critical for personalization in Phases 5-6
- Track completion status with a status column (in_progress / completed) plus started_at / completed_at timestamps — enables funnel analytics
- Email captured before showing free results (lead capture gate on quiz_sessions, not deferred to checkout)

### Order lifecycle & data
- 5 order statuses: pending → paid → generating → fulfilled → delivered
- Store price per order (amount_cents column) — supports future pricing changes without schema migration
- Foreign key from orders.quiz_session_id to quiz_sessions.id — direct traceability from order to quiz answers
- Store stripe_checkout_session_id on orders — required for idempotent webhook handling (PAY-03) and reconciliation

### PDF access & signed URLs
- Signed URLs expire after 7 days
- Users can re-download via email request (fresh signed URL sent to purchase email)
- Storage organized by order ID: `blueprints/{order_id}/blueprint.pdf`
- No PII in storage paths — download filename presented to users can be friendly (e.g. "Your-Parenting-Blueprint.pdf")

### Schema scope
- Strictly v1 — no couple's blueprint hooks or speculative v2 columns
- One quiz session per anonymous user (matches "no unlimited retakes" scope exclusion)
- Admin/analytics done via Supabase dashboard SQL editor — no extra schema for admin views
- Lifecycle timestamps on orders: paid_at, fulfilled_at, delivered_at in addition to standard created_at/updated_at

### Claude's Discretion
- Exact column types and constraints (e.g., JSONB vs JSON for answers)
- RLS policy implementation details
- Index strategy
- Supabase Storage bucket configuration specifics
- Standard created_at/updated_at trigger setup

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard Supabase approaches for schema, RLS, and Storage configuration.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-data-foundation*
*Context gathered: 2026-02-24*
