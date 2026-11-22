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

- [x] Add confirmed admin queue action for held verified author signature events (SignWell v45, dashboard commit 625ddc7ce11e889a1bf4e15bc2b3acc90bb3d062).
- [ ] Authenticated administrator test: inspect Maurice signer status, confirm event stored, explicitly queue RSM notification if authorized, and verify Resend outbox status. No automatic queue without authorization.

- [ ] BLOCKER: Locate and repair full inline admin-dashboard.html JavaScript syntax error detected by source compilation (T-035); then repeat full script check and authenticated browser acceptance. SignWell handler alone passed isolated compilation.

- [ ] CRITICAL: Recover corrupted admin-dashboard.html: duplicated tail after first closing html (151077 characters) and failing JavaScript compilation. Compare known-good GitHub revision and preserve all subsequent integrations. Do not assume removing tail alone fixes syntax.

- [x] Repair truncated pricing string and duplicated HTML tail in admin-dashboard.html (commit cac141fd9094de56522ea0a68141433b0ec1b266). Full inline JS source syntax passed.
- [ ] Run authenticated browser acceptance for admin connect, application review, signed-agreement lock, family final release, SignWell signer inspection, and notification queue. Do not send live email without explicit authorization.

- [x] Correct signer inspection to display actual held/queued notification state, dashboard commit e18e2dfe308748fbc7736a6692419079e6f1b02e.
- [ ] Authenticate admin and run Inspect Existing Signers for Maurice to populate verified event, then explicitly authorize and queue a notification and verify worker/Resend delivery. No event currently exists.

- [x] Review 12 authenticated SECURITY DEFINER functions for anon EXECUTE and authorization references. All deny anon EXECUTE; review remains limited to static SQL.
- [ ] Run non-admin negative authorization tests with safe test identities, verify Supabase leaked-password protection configuration, review auth logs for anomalies without exposing client data.

- [x] Simulated non-admin negative authorization tests for payment request, payment verification, signature notice queue, and family final approval (T-041); all rejected.
- [ ] Verify remaining privileged functions with non-admin test identity and review leaked-password protection; maintain no-send policy for live client actions.

- [x] Simulated non-admin checks for remaining 7 privileged functions (T-042), five rejected, two false for nonexistent resources.
- [ ] Review leaked-password protection warning and perform real non-admin session/cross-project access tests; avoid disrupting live clients.

- [x] Diagnose signed-agreement payment automation gap and deploy no-send automatic dispatch-draft trigger. Maurice $250 initial draft held, T-043.
- [ ] Test trigger on isolated non-delivering test records and surface held payment draft in admin dashboard. Existing admin-authorized rsm_request_payment remains sole send-queue path; do not send Maurice payment request without explicit authorization.

- [x] Isolated end-to-end SQL trigger test for $250 family deposit generated held dispatch draft, rolled back (T-044).
- [ ] Surface held dispatch drafts in admin dashboard; preserve no-send boundary until explicit authorization.

- [x] Show held payment drafts in Payment Management Center; admin-only RLS select policy deployed, T-045 source/RLS checks.
- [ ] Run authenticated browser acceptance and full JavaScript syntax validation for dashboard held draft display; keep delivery gated by explicit authorization.

- [ ] Implement administrator payment-approval notification to publishing@rightsideofmoney.com for future signed agreements, with secure admin approval/hold and idempotent send. Do not send Maurice's held $250 request.
- [ ] Test draft lifecycle guard and notification workflow in isolation before enabling future live sends. Confirm Resend receipt and duplicate prevention.

## 2026-11-20 resumption and next implementation
- [x] Read all four continuity files and confirmed production Supabase ACTIVE_HEALTHY.
- [x] T-047: cancellation lifecycle guard passed inside rolled-back transaction; existing $250 draft remains held and installment not_requested.
- [ ] NEXT: implement idempotent administrator approval notification for newly held signed-agreement payment drafts to publishing@rightsideofmoney.com, with no automatic author payment send. Verify sender configuration and outbox authorization before enabling notification delivery.
- [ ] Implement administrator Approve/Hold control in mpid-portal/admin-dashboard.html with server-side authenticated admin guard, idempotency, stale-draft checks, and explicit live-send authorization boundary. Keep Maurice's current $250 draft held.
- [ ] Authenticated browser acceptance for held-draft rendering and payment approval flow, plus remaining terminal-status lifecycle cases; no unauthorized live messages.

## 2026-11-20 payment dashboard approval implementation
- [x] Added Approve & Send Payment Link control to held payment drafts, GitHub commit 97759d369ec4a26fd72dd1a428c0f14615e466f0; requires explicit confirmation and uses existing authenticated admin RPC.
- [ ] NEXT: authenticated browser acceptance and source JS compilation; verify admin dashboard shows Maurice's held $250 initial draft and approval action. Do not click real send without separate authorization.
- [ ] Implement automatic administrator approval notification for future signed agreements and secure idempotent approval workflow; no auto author email before approval.

- [x] Existing-request stages now hide redundant Send Payment Request and show delivery status (commit 66eec2915fac92cc46c82058434a378ef674837d).
- [ ] Verify authenticated browser display and JS syntax; finish automatic admin approval notification for future signed agreements.

- [x] Corrected duplicate/premature payment actions in dashboard source (6aa2814b2000686ee9ef367197996de27bf18092).
- [ ] Verify deployed website serves latest GitHub dashboard and browser renders accepted initial request without Send Payment Request, with final stage locked pending project completion. Complete automatic administrator approval notification separately.

- [x] Deploy idempotent admin payment approval notification trigger and Edge Function handler (v14).
- [ ] Confirm next eligible signed agreement automatically queues admin notice, dispatcher delivers to publishing@rightsideofmoney.com, and dashboard displays held approval. No need to resend Maurice payment.

- [x] Deploy read-only verified-payment onboarding readiness view, preserving payment verification as the prerequisite (T-052).
- [ ] Connect readiness state to admin onboarding action and existing secure invitation workflow, without auto-inviting before verified payment. Record each new test once and do not repeat previously passed checks unless dependencies change.

## CURRENT PRIORITY HANDOFF | 2026-11-20 (supersedes stale NEXT entries above)
- [x] Four continuity files exist and were read from GitHub main in this session.
- [x] Family 50/50 preparation and payment request backend deployed (see prior migrations/tests); no need to rebuild.
- [x] Payment Management Center held-draft approval source deployed, plus admin approval notification queue/handler (T-048/T-051). Full delivery acceptance remains open.
- [x] Maurice's revised $500 agreement is signed and $250 initial installment is REQUESTED (T-054). Do NOT resend or generate another request.
- [x] Dashboard workflow ordering source deployed (c22c1f2b33a5234985a3dfdd7553b27ff842a7b5); Invite New Author directly below Application Review (494b4bc09bbf38ae1c50db7cf2a0fbccdee0d836), T-053.
- [ ] FIRST: confirm $250 payment provider settlement and secure verified payment record. Current amount_verified=$0, so do not invite Maurice yet.
- [ ] NEXT: integrate rsm_onboarding_readiness with existing admin invitation flow; only enable invitation after signed agreement and verified payment, no duplicate invitation.
- [ ] Verify authenticated dashboard/browser layout, login, approval button behavior, duplicate suppression, and author-invitation controls; do not send customer messages in tests.
- [ ] Verify future eligible signed agreements create held approval drafts and admin notification delivery, then one-click authorized send, idempotency, retries and audit trail. Do not recreate Maurice's request.
- [ ] Complete manuscript processing, editorial QA, release security and end-to-end acceptance tests already listed above.
- [ ] Keep all four continuity files updated after each verified deployment/test, with exact evidence and remaining blockers. Historical unchecked items above are superseded when their implementation is explicitly marked complete here.

## 2026-11-20 active onboarding implementation
- [x] Deploy verified-payment onboarding queue and trigger (migration prepare_onboarding_jobs_after_verified_payment_no_send, T-056).
- [x] Verify Maurice stays awaiting_verified_payment and zero premature jobs exist.
- [ ] NEXT: add secure idempotent worker to process queued jobs using existing mpid-invite-author eligibility checks, prevent duplicate emails and partial author profile creation, and create project only after verified author account linkage. Preserve payment gate.
- [ ] Add onboarding queue/readiness display to admin dashboard, then run isolated positive/negative acceptance and authenticated browser tests. No real client invitation until payment verification.

## 2026-11-20 current implementation handoff
- [x] Inspect live onboarding queue constraint, existing worker, and active cron. Existing worker was already deployed.
- [x] Deploy rsm-onboarding-worker v4 with approved-contract payment-stage/amount verification and invitation timestamp persistence.
- [x] Verify post-deployment: zero jobs, Maurice awaiting_verified_payment, active worker cron.
- [ ] Verify positive payment path in isolated controlled test without sending a real author email; duplicate and partial-failure recovery; authenticated dashboard display. Do not mark end-to-end complete.

## 2026-11-20 next handoff
- [x] Add unique application-to-project linkage and deploy worker v5.
- [x] Confirm no duplicate/early Maurice project created.
- [ ] Execute isolated payment-positive and retry tests, invitation partial-failure reconciliation, and admin dashboard visibility. Do not send test invitations to real clients.

## 2026-11-20 onboarding test results
- [x] Transactional positive queue test with $250 family deposit and duplicate update, rollback verified.
- [x] Negative incorrect-deposit test found and fixed legacy trigger bypass. Retest passed.
- [ ] Test worker invitation partial-failure, auth duplicate reconciliation, and project creation without sending real customer messages. Verify dashboard authenticated UI.

## 2026-11-20 additional acceptance
- [x] Fix and verify background project creation audit trigger (T-061).
- [x] Verify duplicate project rejection in rollback-isolated transaction.
- [ ] Validate worker email invitation, profile creation, recovery and dashboard authenticated UI; do not invite Maurice before verified payment.

## 2026-11-20 manuscript engine progress
- [x] Deploy rsm-manuscript-queue v17 contract-specific payment guard across preflight/start/resume.
- [x] Eight isolated read-only payment cases PASS; source inspection confirms guards and review state.
- [ ] Authenticated runtime preflight and end-to-end DOCX editing/QA acceptance with an isolated authorized project; no live author release.


## 2026-11-21 live payment milestone
- [x] Verify live Stripe destination, Vault signing secret and service-role retrieval; webhook v3 deployed.
- [x] Repair outbox event type constraint and verify three operational events with rollback-only test.
- [x] Verify Maurice $250 initial installment via authenticated dashboard and independently confirm ledger, Stripe reconciliation and partial-payment status.
- [x] Observe office payment verification outbox event marked sent.
- [ ] Confirm actual post-creation signed Stripe event delivery and safe automatic reconciliation. Existing admin approval remains required; do not claim automatic crediting.
- [ ] Inspect onboarding job state, invitation delivery, author access and manuscript intake before starting processing; do not send duplicate invitation.
- [ ] Verify actual office mailbox receipt for payment alert.


## 2026-11-21 manuscript handoff
- [x] Locate Maurice's original applicant manuscript and verify private storage object.
- [x] Deploy onboarding worker v6 idempotent copy/registration and confirm project document exists.
- [ ] Confirm refreshed dashboard shows Files=1, validate authorized admin download and author access, and run controlled next-author handoff acceptance without sending customer invitations.


- [x] User confirmed Publishing Projects shows Files=1 for Maurice.
- [ ] Add safe PDF extraction/conversion to manuscript queue, preserving original PDF and rejecting unreadable/scanned content. Then run authenticated preflight and editorial QA before any release.


- [x] Deploy PDF extraction support in rsm-manuscript-queue v20.
- [ ] Run authenticated preflight and controlled PDF extraction with Maurice's registered original; validate extracted content fidelity before AI editing. Confirm runtime PDF.js worker behavior. No author release until admin QA.


- [x] Deploy authenticated read-only PDF extraction preflight in manuscript queue v21.
- [ ] Invoke authenticated Preflight Check in Admin Dashboard on Maurice's registered PDF; inspect PDF extraction result. If it fails, repair worker runtime without creating an edit run. Do not release deliverables before QA.


- [x] Move Manuscript Processing immediately below Publishing Projects in admin dashboard source.
- [ ] Verify deployed dashboard layout, manuscript/application selector continuity and readiness button. Confirm private edited DOCX and editorial recommendations meet professional author review requirements before release.

## 2026-11-21 continuation checkpoint (T-074)
- [x] Reconcile live project/document count and deployed queue version without repeating historical acceptance tests. Maurice project has one manuscript; queue v21 ACTIVE.
- [ ] PRIORITY: authenticated admin preflight on Maurice's registered PDF. Inspect extraction result, PDF.js worker behavior, page count/text quality and preserve source. Current connector could not retrieve queue function bundle; this does NOT establish a PDF failure.
- [ ] After preflight passes, controlled edit/QA acceptance, readable edited manuscript plus separate recommendations report, admin-only release review. No author-facing release without approval.
- [ ] Verify live browser layout and project selector continuity. No agreement or payment request resend.

## 2026-11-21 diagnostic UI implementation (T-075)
- [x] Enhance Check Editing Readiness display for extraction metrics and per-check detail, preserving existing backend and no-release boundary; GitHub commit 3ca986fed0df2196d0a90ca74ce6ee733d95ea03; inline JavaScript syntax passed.
- [ ] Run authenticated read-only PDF preflight on registered Maurice PDF and inspect extraction fidelity. Dashboard source syntax is not proof of runtime PDF.js success.
- [ ] Verify live browser serves updated dashboard, then proceed to controlled editing and private administrator QA only after successful preflight.

## 2026-11-21 direct manuscript selection repair (T-076)
- [x] Add direct project selector within manuscript processing panel and load matching application/source automatically when unique. Source deployed commit 17f9922e432c45b036630c1bb00d5c4e612fa762; JS syntax verified.
- [ ] Authenticated browser check: select Maurice in new Project to process dropdown, confirm matching application/manuscript and Check Editing Readiness results. Do not start editing if extraction blocked.

## 2026-11-21 preflight selection incident repair (T-077)
- [x] Repair application/manuscript resolution using canonical project.application_id, re-resolve on Check Editing Readiness, and hide legacy Perfect Marriage test panel. Commit 4fb71f160cded8fb5b7fa837566a0051f6a86cde; JS syntax PASS.
- [ ] Confirm deployed dashboard refresh and authenticated readiness invocation; capture PDF extraction result and repair actual runtime errors if any. No author release or edits before validated preflight.

## 2026-11-21 administrator-confirmed readiness (T-078)
- [x] Authenticated live readiness checks passed for Maurice's registered PDF (seven gates reported).
- [ ] Confirm actual PDF extraction page/word metrics and text fidelity before asserting editing-ready quality; supported type check alone is insufficient.
- [ ] Controlled private processing and author-readable DOCX/editorial report QA after extraction confirmation; administrator release required. Do not initiate live agreement/payment/author notification.

## 2026-11-21 Submission Notification Center (T-079)
- [x] Diagnose pending item via live SQL: Maurice's original manuscript, unacknowledged, not a stale Perfect Marriage test.
- [x] Clarify receipt acknowledgment vs editorial approval and hide test-project items from active counts in dashboard source; commit 98e4c8c1b47e87db7c549e009bbc3c9ffa9ea091.
- [ ] Verify live UI after refresh. Administrator may acknowledge Maurice manuscript receipt after reviewing the document; do not automatically mark editorial QA approved.
- [ ] Audit remaining dashboard controls and stage handoffs to reduce disconnected navigation; preserve permissions and release gates.

## 2026-11-21 receipt acknowledged (T-080)
- [x] Confirm Maurice original manuscript receipt acknowledged in live Supabase review table; no pending action for this document.
- [ ] Continue PDF extraction fidelity verification and controlled private manuscript editing with admin QA and author-readable deliverables.

## 2026-11-21 private manuscript handoff (T-081)
- [x] Fix Start Resumable 6×9 Layout Draft to resolve project application/manuscript without navigating separate controls; commit fbdc1fae9e17b548b2345a738beb8c3a72b55be8.
- [ ] Run controlled private draft start only after confirming PDF extraction integrity; review any resulting segments and output quality before author release.

## 2026-11-21 manuscript controls cleanup (T-082)
- [x] Hide obsolete manual manuscript center and disabled legacy editor; retain dependencies and project data; simplify active processing steps with numbered actions. Commit 3129b41c8eeb767a4b85ee79b7ee2ab7ad9122be.
- [ ] Verify active workflow renders correctly in browser and complete dashboard-wide button inventory and conditional action visibility by stage; preserve security and release approval gates.

## 2026-11-21 draft control state management (T-083)
- [x] Verify live Maurice editing run status: none created. Commit ea1e6a9e983e9221382556d7b93dd71f8ab1dff4 sets Start/Continue button availability according to active run.
- [ ] Verify live dashboard button state, source PDF extraction fidelity, and create private draft run when extraction integrity is established; no author release without QA.

## 2026-11-21 single-selector fix (T-084)
- [x] Hide duplicate manuscript project selector and synchronize manuscript load and draft progress from main Select project; commit 428d0bdd32879229513278edc8ea58b0893b4b51.
- [ ] Audit all dashboard project-specific panels to ensure one selected project scopes every view; verify browser and reload persistence.

## 2026-11-21 selected project persistence (T-085)
- [x] Persist main project selection per browser session, scope Publishing Projects table, and restore manuscript draft context on refresh. Commits d78896f9e32874179153e77adf1ccca07f3f0c7b and ee75aa4deb41aa1276a142097bdf098c798d68d9.
- [ ] Verify live dashboard and continue scoping remaining project-specific global panels; preserve global business intake queues where appropriate.

## 2026-11-21 canonical project context (T-086)
- [x] Route project dropdown changes through one selection handler and synchronize checklist, manuscript, project table, audit and activity; commit a4a69e518c0ebb0b84ce562308c2431892adeaf9.
- [ ] Verify authenticated browser state and ensure project-specific panels are scoped without hiding business-wide intake queues.
- [ ] Verify Maurice source PDF extraction fidelity before paid manuscript processing; no author release without QA.

## 2026-11-21 private processing workflow (T-087)
- [x] Consolidate separate start/continue manuscript actions into Process Private Manuscript with private source, confirmation, resumable progress and no automatic author release. Commit d8a0ed912981f30dbd521efaf8040d8add0a19b5.
- [ ] Initiate authorized private run through authenticated dashboard, inspect segment completeness and edited DOCX/report, and perform human editorial QA before any author release. No further general onboarding test cycle required.

## 2026-11-21 processing failure diagnostic (T-088)
- [x] Confirm canonical project/application/source linkage and no edit run in live DB; commit fb1feec5e0b20cf3317132d9f1d23ab6aa031c0a to preserve actual function errors.
- [ ] Capture authenticated private start failure details and fix specific backend issue; do not repeat general onboarding readiness checks.

- [x] Fix stale manuscript source selection, commit 234c253bbf82f9caca6383c44c3c0ef67c5c8c33.
- [ ] Verify authenticated private processing start and actual edited DOCX/report, without author release.

- [x] Recover accessible Maurice original PDF and create private preliminary Word working draft plus editorial review report outside portal, without changing source or releasing author files.
- [ ] Complete substantive line-by-line copyedit and original-page comparison, correct reconstructed paragraph/heading/table formatting, validate VA and tax claims, then upload private deliverables into portal and obtain administrator QA approval before release.

- [x] Deploy Edge Function v22 fixing malformed PDF preflight detection and word counting; dashboard automatically refreshes private review center after successful run, commit 2c2d38a174775fa87ee65552b4cd0a9556f1e80f.
- [ ] Initiate Maurice's authenticated processing run, verify segment completion, staged private DOCX and report, and administrator QA. Live SQL currently shows no run. Never auto-release to author.

- [x] Integrate narrowly scoped, previously authorized Maurice manuscript auto-start into authenticated admin dashboard refresh, commit 504f4bcc439f2781397c9521ca3e325256233ed2. Source syntax verified.
- [ ] Verify authenticated dashboard refresh starts/resumes run, completes private manuscript editing and stages author-readable edited DOCX and report for admin review. Investigate runtime errors, no author release.

- [x] Fix Maurice's page-1 PDF preflight rejection and deploy `rsm-manuscript-queue` v23 ACTIVE; short cover/blank pages no longer abort extraction.
- [ ] Run authenticated manuscript processing after v23 and verify actual editing run, all segments, private DOCX and report. If scanned body text fails document minimum, use OCR or original accessible manuscript, without replacing immutable source.

- [x] Recover Maurice 13/13 editing run from finalization failure by fixing notification event-type constraint and conditionally transitioning existing run to review; two private deliverables registered pending_review. No reprocessing or author release.
- [ ] Administrator inspect draft and editorial report in Private Editorial Review & Release, verify original fidelity, VA/tax factual claims, and print layout before author-facing approval.

- [x] Correct silent blank private editorial list in dashboard source by auto-loading stageLoad on refresh and surfacing errors; commit 5155c8b6e3f561d91f9f6f73f8b8b8eeee3a452a.
- [ ] Confirm published dashboard/browser shows two Maurice pending_review deliverables and both private downloads work. Perform substantive QA before approval or release.

- [x] Add project-scoped Word-format conversion for Maurice's editorial report in private dashboard, commit cc6218274185fa51522c2ff4ff9235670842f86c.
- [ ] Verify DOCX report generation and downloadable formatting; replace TXT as preferred admin review artifact, preserve TXT for audit; do not release without QA.
