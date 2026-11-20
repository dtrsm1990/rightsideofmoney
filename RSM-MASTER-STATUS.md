# RSM Publishing Services | Master System Status
Last baseline: 2026-11-19
Repository: dtrsm1990/rightsideofmoney
Production dashboard: mpid-portal/admin-dashboard.html
Supabase project: rufcgmqpueejoyypnpzn

## Authority and operating rules
- GitHub is authoritative for website/dashboard source and these continuity records.
- Supabase live schema, deployed functions, and actual records are authoritative for runtime state.
- A chat summary is NOT proof of a passed test. Never mark a feature verified without evidence, version, and date.
- Read all four RSM continuity documents at the start of every new chat. Compare with live systems before acting.
- Keep customer data, passwords, service keys, private manuscripts, and signed documents OUT of these public-repository Markdown records.
- RSM Publishing Services is the public brand. MPID identifiers are internal only.
- Preserve exact admin dashboard filename: mpid-portal/admin-dashboard.html.
- Never issue payments before signed-agreement verification. Do not resend agreements or emails without checking existing records.

## Verified inventory (2026-11-19)
- Supabase: 16 active Edge Functions, 29 public tables with RLS enabled.
- Scheduled jobs: mpid-notification-processor every minute; mpid-signwell-background-sync every five minutes.
- Admin dashboard source exists, approximately 214 KB, with sections for applications, payments, manuscript intake, editorial processing, SignWell, projects, and private release.
- Manuscript-processing and QA job tables had zero records at baseline. This is not proof that no editorial work occurred elsewhere.
- Eight private editorial deliverables existed in pending_review at baseline.
- One publishing project existed with status onboarding at baseline.
- Some functions have verify_jwt=false; authorization implementation must be individually audited.

## Current live client milestone (checked 2026-11-19)
- Maurice Watkins, The VA Loan Millionaire, Publish-Ready.
- Revised family-discount agreement: $500 total, $250 due upon signature, $250 upon completion.
- SignWell document ID 8de47506-d4f4-4310-80cf-8777831a6023, test_mode=false, database status=sent at check.
- Original $600 signed agreement retained with status completed.
- Application approved_price=500, agreement_status=sent, payment_status=not_requested; pricing token [RSM_PRICING:FAMILY_50_50].
- Original $600 installment was cancelled. No new $250 payment request was confirmed at baseline.
- Do not claim Maurice has signed the revised agreement without a fresh status check.

## Known blockers
1. Database trigger rsm_prepare_signed_payment does not support FAMILY_50_50; its current logic handles discounted full upfront or standard 30% initial.
2. RPC rsm_request_payment rejects nonstandard $500 package pricing and assumes standard 30/40/30 or discounted full upfront.
3. Payment Center UI must be reviewed for the same assumptions.
4. End-to-end manuscript automation, document integrity, and release QA are not verified.
5. Security, observability, backup restoration, and regression testing require completion.

## Definition of done
A workflow is COMPLETE only after code is deployed, evidence-backed acceptance tests pass, failure/retry behavior is checked, and the test registry and next-actions file are updated.
