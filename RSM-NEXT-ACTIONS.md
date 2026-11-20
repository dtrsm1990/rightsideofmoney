# RSM Publishing Services | Next Actions and Handoff
Last baseline: 2026-11-19
Current focus: complete continuity infrastructure, then safely finish contract-to-payment-to-onboarding automation.

## Immediate next actions (in order)
1. [ ] Confirm these four continuity files exist in GitHub and can be read in a new chat.
2. [ ] Inspect SignWell background sync and the current revised agreement state before making any changes.
3. [ ] Update rsm_prepare_signed_payment to support approved FAMILY_50_50 pricing with $250 initial, without creating payment requests before signature.
4. [ ] Update rsm_request_payment to support family initial/final stages and reusable approved Bluevine $250 link; enforce initial payment verification before final and final completion milestone.
5. [ ] Align dashboard Payment Management Center and payment readiness indicators with family pricing.
6. [ ] Test signature sync, installment preparation, notification idempotency, payment verification, author invitation and project creation with safe test data, not live payment charges.
7. [ ] Add durable exception monitoring, retry controls, and a dashboard readiness/test history view.
8. [ ] Validate manuscript engine, chapter integrity, editorial QA and private release workflow.
9. [ ] Conduct authorization, RLS, storage, backup/recovery, and full client journey acceptance tests.

## Existing live state at handoff
- Revised Maurice agreement sent; SignWell document 8de47506-d4f4-4310-80cf-8777831a6023; database status sent when checked.
- Original $600 signed agreement preserved.
- Revised application price $500; payment_status not_requested.
- Original $600 payment installment cancelled.
- No $250 request should be sent until revised signature is verified and the family pricing workflow is fixed.

## How to resume in a new chat
Use this instruction:
"Continue the RSM Publishing Services project. First read RSM-MASTER-STATUS.md, RSM-TEST-REGISTRY.md, RSM-DECISION-LOG.md, and RSM-NEXT-ACTIONS.md from GitHub repository dtrsm1990/rightsideofmoney. Compare them with live Supabase project rufcgmqpueejoyypnpzn. Do not repeat previously verified tests unless relevant code or dependencies changed. Work on the highest-priority unfinished action, then update all affected continuity files. Keep the public brand RSM Publishing Services, preserve mpid-portal/admin-dashboard.html, and do not send real customer contracts or payment requests without explicit authorization."

## Required handoff discipline
- Update after each meaningful deployment, not only at chat end.
- Record changed files/functions and commit or deployment versions.
- Add tests with date, inputs, expected and actual outcomes, evidence, and retest triggers.
- Preserve unresolved errors, exact next action, and any customer-impact risk.
- Distinguish proposed, deployed, verified, and blocked.
- Do not put service keys, personal details, manuscript text, or payment links in public Markdown files.


## Latest session update (2026-11-19)
- [x] Deployed family 50/50 preparation trigger with $250 initial on signed application only.
- [x] Verified Maurice revised agreement still sent and no active payment installment created prematurely.
- [ ] NEXT: safely update rsm_request_payment to handle FAMILY_50_50 initial and final stages with approved reusable $250 link, preserve authenticated-admin and idempotency checks.
- [ ] Update dashboard family-payment readiness and verify signed-agreement sync and downstream notification behavior.
- [ ] Test with isolated safe records before live payment requests. No new customer payment request was sent.

## 2026-11-19 additional update
- [x] Deployed rsm_request_payment FAMILY_50_50 initial/final support and approved link mapping.
- [x] Verified deployed function contains family logic; Maurice application remains sent and payment not_requested.
- [ ] NEXT: inspect and update admin dashboard family payment UI, then safely acceptance-test full signed-agreement-to-payment flow and record evidence.

## Pricing selector requirement
- [ ] Replace Maurice-specific family discount UI with reusable Standard / Regular Discount / Family Discount selection for any approved application.
- [ ] For Family Discount, offer Full Upfront $500 or Two Installments $250/$250.
- [ ] Ensure SignWell agreement generation uses selected terms and package scope; protect signed historical agreements.
- [ ] Implement FAMILY_UPFRONT backend payment preparation and request, reusing the approved $500 family link.
- [ ] Update dashboard readiness and payment request amounts; test each option on isolated records.

## Latest dashboard source update
- [x] Updated GitHub dashboard payment overview source for FAMILY_50_50 and FAMILY_UPFRONT display and link lookup (commit 2bcc8af88b88e2912f811bb58def0d92730b9f48).
- [ ] Verify dashboard JavaScript syntax and live browser behavior; inspect remaining preview/send guards for family schedule.
- [ ] Add reusable pricing selection and SignWell agreement generation for all clients, including $600 regular discount and both $500 family options.
- [ ] Implement family upfront backend and end-to-end isolated acceptance testing.

## Latest implementation handoff (2026-11-19)
- [x] Deployed FAMILY_UPFRONT $500 preparation and request backend with reusable approved family link; validated regular discount amount $600.
- [x] Updated dashboard family payment preview and send readiness source, commit 1b25c34f63e14168736055171a43ae3b031624f6.
- [ ] NEXT: implement reusable pricing selector and SignWell agreement generation for any approved author, including scope/terms and safeguarding existing signed agreements.
- [ ] Browser test dashboard and run isolated end-to-end contract/payment acceptance tests without sending real customer emails.

## Current handoff
- [x] Added reusable pricing dropdown to application review form (standard, regular $600 upfront, family $500 upfront, family $250/$250), commit 0331a0c413a526384350945da8ab70d4dc469351.
- [x] Added price validation and lock against editing signed agreement terms in normal review.
- [ ] NEXT CRITICAL: generalize SignWell Edge Function v41 makeFields for all pricing markers and remove Maurice-only send authorization safely, with per-application approvals, template validation, idempotency and historical agreement protection.
- [ ] Run JavaScript/browser and backend isolated acceptance tests before real customer sends.

## SignWell v42 handoff
- [x] Deployed generalized SignWell `send` action for approved not_sent applications; added pricing-aware agreement fields for all four modes, v42 ACTIVE.
- [x] Verified Maurice remains sent and not_requested, no new agreement or payment sent.
- [ ] NEXT: inspect dashboard SignWell readiness/preview/send flow against v42, remove Maurice-specific normal UI button (preserve replacement history), and test agreement fields and send guards without emailing real clients.
- [ ] Check family final-payment completion gate and payment readiness guards; complete isolated acceptance testing and update test registry.

## Current dashboard state
- [x] Structured SignWell agreement preview and pricing-aware readiness source integrated, commit b189804a87387aa2a44a9095ad7c98be463af5c1.
- [ ] Perform browser JS syntax and UI runtime checks and non-sending SignWell validation for standard, regular discount, family upfront, and family split; confirm v42 actual response format.
- [ ] Verify $250 family final payment completion condition and secure live agreement send confirmation.

- [x] Removed per-author custom payment link prerequisite for regular $600 discount, using existing approved reusable Bluevine link, migration reusable_regular_discount_payment_link_verified.
- [ ] Check payment overview source for regular $600 discount link matching and eliminate obsolete manual link registration UI; browser/runtime tests pending.

- [x] Dashboard reusable Bluevine lookup for regular $600 and family $500/$250 pricing; obsolete custom registration UI removed, commit e0135933e6d13a7576e88512bcfcc2e34cdf8eb5.
- [x] Verified four discount link records active in Supabase; Maurice remains sent/not_requested.
- [ ] Run JavaScript syntax, browser UI, and isolated backend acceptance checks without sending customer emails; ensure final family payment is gated by completion as approved.

- [x] Block premature FAMILY_50_50 final payment requests at RPC and UI levels pending a verified completion/release gate (migration block_family_final_until_completion_release_gate, commit 316d5ed2abc30678fc5a3224a0386886e0390cf4).
- [ ] Implement audited admin completion approval linked to correct author/project and release the family final installment only after verified completion. Do not remove the safety block without acceptance testing.

- [x] Deployed author-linked completed-project and administrator-reason approval gate for FAMILY_50_50 final payment; migration audited_author_linked_family_final_approval.
- [ ] Add administrator approval controls with project selection and completion evidence, then conditionally enable family final request only after verified approval; run isolated acceptance tests without live emails.

- [x] Implemented admin completion approval form and readiness RPC for family final payments, dashboard commit 75dedfdcec9856e32eb20f795b883b699d6ccb56.
- [ ] Run browser JavaScript syntax and authenticated end-to-end acceptance tests for completion approval and request gating, including regression after project status changes; do not send real payment emails.

- [x] Added read-only SignWell recipient inspection, Edge Function v43 and dashboard commit d040bc71ed28265a2e99a237acfba7f9e24447b2.
- [ ] Run authenticated SignWell recipient inspection for Maurice; inspect SignWell activity/delivery evidence before changing signing roles or sending any reminders. Verify account sender invitation behavior without creating duplicate contracts.

- [x] Verified live unauthenticated rejection of family final readiness, zero active approvals, anon RPC EXECUTE denied, and approval table RLS enabled (T-026).
- [ ] Authenticate as real admin in browser to test read-only SignWell signer inspection and family final readiness; run isolated positive/negative approval tests without triggering client emails.

- [x] Corrected stale SignWell live-send warning and batched family final readiness checks (dashboard commit d10fe1e956d1dda144c6155f73c11ee81284fea5).
- [ ] Verify browser runtime and SignWell invitation activity under authenticated administrator account before changing delivery behavior.

- [x] Replaced family final-payment project UUID typing with completed-project selector and client reason validation (commit 9f16f90185cb9fb4ec5e77d6753a0d17c6d8587d).
- [ ] Test dashboard selector and approval under authenticated administrator session, and verify only correct author-linked project can be approved.

- [x] Scope completed-project selector to selected family-split application author via admin-only rsm_family_completed_projects RPC, dashboard commit b3a058406bd171919e2351eaf3f50908aeae735a.
- [ ] Authenticated browser acceptance: author-scoped dropdown, signer inspection, final-payment approval and readiness; do not send real payment messages.

- [x] Confirmed live author-scoped selector RPC grants and current Maurice application state (T-030).
- [ ] Complete authenticated browser/runtime tests; do not treat agreement status sent as evidence of delivered invitation or signed agreement.

- [x] Surface author-signed / RSM-signature-pending condition in read-only SignWell inspection (commit d7999c5e27398113e4fe79998978c7771fd91427).
- [ ] Implement secure idempotent SignWell signature-status event detection and RSM Resend notification, with explicit authorization before any real notification send; verify actual SignWell recipient payload and delivery.

- [x] Create protected idempotent signer observation table and record confirmed recipient signatures during admin inspection (Edge Function v44). All notifications held by default.
- [ ] Validate actual SignWell recipient status payload and persisted signer observations with authenticated admin; then implement safe explicit notification queue and Resend processing after authorization.

- [x] Integrated admin-gated author-signature outbox queue and Resend message handler; deployed mpid-send-notification v13. No email sent.
- [ ] Verify SignWell actual recipient payload and signed event persistence; run authenticated queue/worker acceptance with explicitly authorized live email or isolated test data. Do not claim delivery until Resend confirms.
