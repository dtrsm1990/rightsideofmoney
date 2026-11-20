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


## 2026-11-19 implementation update
- Deployed migration prepare_family_50_50_deposit_only_after_signature replacing rsm_prepare_signed_payment with support for FAMILY_50_50. It prepares a $250 initial installment only on qualifying signed application state, using an approved Bluevine link; no email is sent by this trigger.
- Post-deployment check: Maurice revised SignWell agreement remained sent; zero noncancelled installments. No premature payment was generated.
- rsm_request_payment and dashboard family pricing remain unresolved. Do not call the family payment workflow production-ready.

- Deployed migration support_family_50_50_payment_request_stages: rsm_request_payment now recognizes FAMILY_50_50, requires $500 approved total, supports initial/final $250 installments, maps final to approved reusable family milestone link, and exempts family final from standard milestone prerequisite. Standard and discounted upfront paths retained. Full end-to-end acceptance test still pending.

## Reusable discount requirement (confirmed 2026-11-19)
- User approved Regular Discount $600 full upfront and Family Discount $500 either full upfront or $250/$250 for any eligible author, while retaining standard package options.
- Current dashboard still contains a Maurice-specific family revision button and only recognizes DISCOUNTED_UPFRONT in appPaymentReady. This is NOT yet reusable end to end.
- Backend FAMILY_50_50 support was deployed; FAMILY_UPFRONT and general SignWell pricing selection still require implementation and verification.

## 2026-11-19 dashboard update
- GitHub commit 2bcc8af88b88e2912f811bb58def0d92730b9f48 updates Payment Overview display logic for FAMILY_50_50 and FAMILY_UPFRONT markers, approved family Bluevine link matching, and family split installment rows. This is a source deployment, not browser acceptance proof.
- Reusable agreement pricing selector and SignWell integration still outstanding. FAMILY_UPFRONT backend preparation/request still outstanding. Existing Maurice-specific SignWell button remains.

## 2026-11-19 additional discount deployment
- Supabase migrations support_reusable_family_upfront_signed_payment and support_reusable_family_upfront_payment_requests deployed. $500 FAMILY_UPFRONT now recognized in signed-payment preparation and request RPC. Regular $600 discount total explicitly validated. Existing family $250/$250 and standard schedules retained.
- Dashboard GitHub commit 1b25c34f63e14168736055171a43ae3b031624f6 adjusts family pricing preview/send guards and marker stripping. This is not browser-tested.
- Reusable pricing selection in SignWell and agreement generation remains outstanding. Do not claim full end-to-end readiness.

## 2026-11-19 reusable pricing review form
- GitHub commit 0331a0c413a526384350945da8ab70d4dc469351 adds Regular Discount $600 upfront, Family Discount $500 upfront, and Family Discount $250/$250 to application review pricing selector. Enforces approved amounts and blocks changes to signed agreement price/package/scope through ordinary review form.
- SignWell Edge Function v41 still has a Maurice-only live send guard and special replacement flow. General reusable agreement sending is NOT implemented; no agreement was sent. Browser verification pending.

## 2026-11-19 SignWell generalization
- Deployed Supabase mpid-signwell-agreements Edge Function v42 (ACTIVE). General `send` action now permits any approved, not_sent author with valid package/price/marker, complete terms and valid email, retains live-agreement duplicate guard and SignWell template verification; preserves separate Maurice replacement action. makeFields supports regular $600 upfront, family $500 upfront, family $250/$250, and standard 30/40/30. A single existing test draft may be retired, but is no longer mandatory.
- Maurice remains agreement_status=sent, approved_price=$500, payment_status=not_requested. No SignWell send was invoked. End-to-end acceptance testing and browser integration remain pending.

## 2026-11-19 SignWell dashboard integration
- GitHub commit b189804a87387aa2a44a9095ad7c98be463af5c1 updates agreement readiness to display all pricing schedules and replaces paragraph-style agreement preview with structured field rows. Maurice-only replacement button hidden from normal workflow; its historical handler retained.
- No live agreement or payment request sent. Browser/JS syntax acceptance and Edge Function v42 runtime agreement tests remain outstanding.

## 2026-11-19 regular discount payment fix
- Supabase migration reusable_regular_discount_payment_link_verified succeeded. rsm_request_payment now looks up approved reusable `RSM Publishing Discount` $600 full-payment link rather than requiring manual per-application installment link registration. Existing auth, signed-agreement, amount, prior payment and duplicate-request checks remain.
- Initial attempted migration failed syntax validation and did NOT deploy; corrected migration succeeded. No payment request was invoked.

## 2026-11-19 reusable discount dashboard integration
- Dashboard commit e0135933e6d13a7576e88512bcfcc2e34cdf8eb5 removes obsolete per-application custom Bluevine link registration panel, matches Regular Discount to RSM Publishing Discount, and uses reusable link readiness for all pricing modes. Supabase confirmed active $600 full, $500 full, and two $250 family stage links. Maurice remains sent/not_requested at $500.
- Browser JS/runtime and isolated non-sending acceptance tests still pending.

## 2026-11-19 family final-payment safety hold
- Supabase migration block_family_final_until_completion_release_gate succeeded. The `rsm_request_payment` RPC now rejects FAMILY_50_50 final stage until a verified project-completion/release gate is implemented. Existing signed-agreement and initial-paid requirements remain.
- Dashboard commit 316d5ed2abc30678fc5a3224a0386886e0390cf4 disables the family final Send button and adds a readiness warning. This intentionally blocks early final collection; a completion-linked release mechanism remains to implement and test.

## 2026-11-19 audited family final payment gate
- Supabase migration audited_author_linked_family_final_approval succeeded. New RLS-protected `rsm_family_final_approvals` table and admin-only `rsm_approve_family_final` RPC require signed $500 FAMILY_50_50 agreement, completed non-test project linked to author's auth email, and a reason. `rsm_request_payment` final stage checks active approval plus project completion and identity again at request time. No approval/payment request invoked.
- Dashboard final send remains disabled pending approval UI and acceptance testing.

## 2026-11-20 family final approval dashboard integration
- Supabase migration admin_family_final_readiness_rpc succeeded, adding admin-only `rsm_family_final_readiness` RPC to verify active author-linked completed-project approval.
- Dashboard commit 75dedfdcec9856e32eb20f795b883b699d6ccb56 adds administrator completion approval UI with project UUID and evidence reason, invokes `rsm_approve_family_final` after confirmation, and enables family final request only when readiness RPC reports ready. No approval or payment email invoked. Browser/runtime acceptance still pending.

## 2026-11-20 SignWell sender invitation diagnostics
- Verified revised Maurice agreement remains tracked as sent and SignWell integration lists publishing@rightsideofmoney.com as Document Sender signer. This does not prove email delivery.
- Supabase mpid-signwell-agreements v43 ACTIVE adds admin-only read-only inspect_signing_invitations action, fetching SignWell document and recipient statuses without creating/sending agreements.
- Dashboard commit d040bc71ed28265a2e99a237acfba7f9e24447b2 adds Inspect Existing Signers (No Email) control. Runtime/authenticated test and SignWell activity email-delivery confirmation pending. No real messages sent.

## 2026-11-20 limited live security verification
- Live `rsm_family_final_readiness` call without authenticated admin rejected with P0001 Administrator required. Active final approval records: zero. `anon` EXECUTE denied on approval/readiness/payment request functions; approval table RLS enabled. No approval or payment email sent. Authenticated positive test and browser runtime still pending.
