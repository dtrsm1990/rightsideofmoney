## CURRENT EXECUTION QUEUE | 2026-11-21 | READ FIRST
**Single active objective: complete one integrated editorial-to-publication workflow, not another collection of disconnected features.**
1. Inspect current engine and signed package rules; define source-linked finding schema and idempotent ingestion into central audit. Do not turn routine copyedits into author tasks or invent technical findings.
2. Link real findings to author decisions and action checklist, with explicit original text, RSM correction, proposed improvement, evidence, responsibility and resolution.
3. Connect milestone events to correct dashboard stage and enforce QA, author review, production and proofing gates. Preserve hold states and prevent premature completion.
4. Remove duplicate controls and reports; show one clear active project, pending administrator decisions and next action.
5. Run one integrated safe acceptance test, log actual evidence, then assess readiness for Maurice's controlled author review.
**Current verified:** project editing, 13/13 processing segments, QA needs_review, five private pending deliverables, zero structured findings/author approvals. No real author release.
**Current dashboard:** d6c8ff735b5d849be5a84f76bad0b191430e70ee. **Open:** browser QA and engine-to-audit integration.
**Historical backlog below may be stale. Do not restart old payment work without verifying live state.**

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

- [ ] PRIORITY BLOCKER: Replace generic concatenated segment editorial report with professionally structured, evidence-based assessment, author action list and source references. Correct KDP/fact-check overclaims, segment-boundary artifacts and prohibited em dashes. Keep existing Maurice files pending_review and unreleased until verified replacement passes QA.

- [ ] Verify dashboard `Generate Editorial Assessment (Word)` against Maurice's 13 segments and inspect generated DOCX inside private editorial staging; do not approve or release without substantive editorial QA.

- [ ] Verify signed Publish-Ready scope against automatic correction categories, build complete per-edit traceability (current changed-region excerpts are not tracked changes), generate and inspect private assessment in dashboard; preserve original and require author approval for substantive edits.

- [x] Hide obsolete TXT and superseded DOCX report rows from active private review list while preserving audit records; dashboard commit 5620ae203cceb8cc55c426b9e52e42d66d3b84a9.
- [ ] Verify refreshed dashboard displays only current assessment DOCX and edited manuscript DOCX, with appropriate status-specific actions.

- [ ] Generate `RSM_Editorial_Findings_Author_Instructions.docx` from current private assessment using dashboard, inspect for clear source-specific author instructions and factual accuracy, and retain private pending_review until approved.

- [ ] PRIORITY: Finish manuscript-first pipeline: complete safe copyedits in separate working manuscript, full original-to-edited change audit, exact proposed wording for substantive recommendations, targeted author decisions, incorporation of approvals and publication-ready QA by signed package. Reports support the edited manuscript rather than replacing editorial work.

- [ ] Browser-test automatic private deliverables loading on project selection and identify other redundant controls for safe consolidation without bypassing administrator approvals.

- [x] Synchronize project editing stage automatically from manuscript edit-run/private editorial activity; verify Maurice status editing with 13/13 run in review. Migration sync_publishing_project_editing_from_editorial_work.
- [x] Move routine status selection behind administrator exception override and add live status refresh/realtime subscription; commit 3697879f0d6b17df5603d4c3f5b42cb4a899941e.
- [ ] Browser-verify Publishing Progress and project selector after deployment; implement and test evidence-gated automatic transitions for author review, production, proofing and completed without skipping author/admin approval requirements.

## Enterprise integration priority | 2026-11-21
1. [ ] Build single evidence-backed project workflow state and transition rules across intake, payment, manuscript, editorial QA, author decisions, production and release.
2. [ ] Register manuscript-engine findings into central audit with exact source references, proposed correction, owner, author action and verification status, without fabricating findings or duplicating prior records.
3. [ ] Generate author action checklist from findings that genuinely require author decisions; keep automatic copyedits in separate change register.
4. [ ] Drive report, dashboard, author deliverables and production gates from the same source records. Consolidate redundant controls and run one integrated end-to-end acceptance test with safe test records.
5. [x] Add live processing/QA/pending-file/structured-finding summary to Editorial Audit Management Center and remove its manual refresh button; commit d6c8ff735b5d849be5a84f76bad0b191430e70ee.

- [x] Create idempotent source-linked editorial uncertainty ingestion RPC and dashboard refresh hook. Migration register_source_linked_manuscript_uncertainties; commit 38a6aebcd01a118a6c6f3d45f8106a8aa54658f3.
- [ ] CRITICAL: Run authenticated admin dashboard refresh and verify source-linked findings are inserted, rendered, and not duplicated on repeat refresh. Current live findings count remains 0; do not claim fixed until verified.
- [ ] Reconcile genuine findings versus chunk-boundary artifacts; derive author actions only for unresolved substantive decisions; integrate complete QA and milestone gates.

- [x] Persist five provisional, source-linked manuscript uncertainty flags for Maurice; database verified 5 findings/5 unique segment links, no author checklist or release. Dashboard commit 7003c7939971ac1571c8cbe830009beca9d1f503 removes brittle refresh-time RPC and legacy client-specific auto-start.
- [ ] Browser-verify Editorial Audit Management Center displays five findings without manual re-registration.
- [ ] Editorial QA of each provisional flag against adjacent source segments; resolve boundary artifacts, produce exact safe corrections, then create author checklist only for genuine substantive decisions.

- [ ] PRIORITY: Build repeatable no-regression acceptance suite for signed agreement/payment gate, portal invitation, author role/RLS, source manuscript integrity, manuscript editing, audit, checklist, private deliverables, approved release and project progress. No real messages or releases during tests.
- [ ] Implement safe near-real-time author project status and approved action updates without re-rendering or deleting unfinished author form inputs. Keep private draft findings and deliverables inaccessible.
- [ ] Verify Maurice invitation acceptance and actual portal access through appropriate authorized logs, not merely the invitation timestamp. Current application signed, partially_paid, invited 2026-11-22 03:09 UTC; assigned author profile exists.

- [x] Add six-section onboarding and editorial collaboration guide inside authenticated author portal, commit 78f1976c4204aa7f402b813ec4ed208570922fe1.
- [ ] Verify author guide in browser under authorized author login and regression-test existing uploads, checklist and private file RLS.
- [ ] Build branded welcome/onboarding email in idempotent, auditable notification workflow with approval gate; do not resend to Maurice without explicit authorization. Supabase-managed invitation v8 alone does not include a detailed guide.

## 2026-11-22 | Current execution blockers
- Upload/register Colonel Jackson foreword in Maurice project, then assemble a versioned working manuscript with front matter and original preserved. Existing file is only available as conversation attachment, not project storage.
- Implement secure processing worker with signed-package gate, revision fingerprint/idempotency, location-aware findings, document comparison, author report and QA. Never process original alone when new foreword pending.
- Reorder Admin Dashboard into intake, assembly, processing, audit/QA, approval, proofing, final payment/release; implement auto-refresh and run authenticated acceptance tests.

## 2026-11-22 | Resumption verification and immediate execution gate
- [x] Re-read four continuity files and compare live Supabase readiness, RLS tables and deployed manuscript queue v23.
- [x] Confirm Maurice: 0 registered forewords, 1 intake awaiting assembly, 5 unresolved findings, 5 pending private deliverables, 0 released. Existing queue cannot assemble foreword; do not rerun original-only processing.
- [ ] Obtain actual Colonel Jackson foreword file/content and register privately to Maurice's project with provenance. Never invent the text.
- [ ] Implement immutable original plus foreword versioned assembly, source fingerprint and duplicate-safe processing, then exact location findings and full QA. Preserve existing release gates.
- [ ] Perform authenticated browser and isolated no-send regression acceptance after deployment.

## 2026-11-22 | Manuscript assembly produced
- [x] Insert Colonel Jackson foreword directly into existing Maurice candidate manuscript working copy; original source preserved; rendered and text-checked.
- [ ] Stage integrated working DOCX in Maurice private Supabase project and replace separate-foreword blocker in processing logic; validate title, formatting, full manuscript and source fidelity before production QA. No release without authorization.

## 2026-11-22 | Seven-stage integrated workflow handoff
- [x] Foreword merged locally into manuscript working DOCX. Do not request again or treat as separate deliverable.
- [ ] Register integrated DOCX as versioned private Maurice manuscript; preserve original PDF, prior run and deliverables; reconcile approved title.
- [ ] Implement safe processing from integrated version with duplicate prevention and source-located findings, before/after correction evidence, author questions and package scope. Preserve five open findings pending QA.
- [ ] Reorganize `mpid-portal/admin-dashboard.html` into the seven approved stages without losing controls; auto-update project progress and QA/readiness. Verify syntax and authenticated browser behavior.
- [ ] Finish author review, proofing and final release gates; run dependency-relevant regression tests only; no client sends without authorization.

## 2026-11-22 | Stage ordering implementation progress
- [x] Commit `7dd0face50571a54e72598c3be058ee6f746f62f`: seven ordered stage containers in existing workflow-order JS; syntax PASS. This is source deployment only.
- [ ] Authenticated browser acceptance and correct placement of all live panels, especially author review and final payment; ensure no lost handlers.
- [ ] Register integrated Maurice manuscript in private Supabase and connect version-aware editing; validate QA before author release.

## 2026-11-22 | Dashboard stage 5 corrected
- [x] Commit `c941df975fc6faf8c802380f71100dfc75efa1e8` maps existing author checklist and private release into Author Review & Approval; JS syntax PASS.
- [ ] Browser validate all seven stages and complete versioned manuscript ingestion and QA.

## 2026-11-22 | Dashboard navigation delivered
- [x] Seven-stage workflow sections, accessible jump navigation and mobile styling committed `c445c35a6c0ed9e8c1425e24c8b42e280457f9d5`; syntax checked.
- [ ] Authenticated visual/browser test for stage order, preserved controls and responsive layout. Do not claim complete until observed.
- [ ] Continue integrated manuscript version staging, QA and author release workflow separately.

## 2026-11-22 | Live next-action queue progress
- [x] Deploy security-invoker `rsm_editorial_next_actions` view; verified Maurice next action and counts in live SQL (T-120).
- [x] Commit dashboard live next-action panel `dca9910f069d387db4c3280a88d2354413979fdc` and stage mapping `40147d9286df5e1927978c3bd520b32397a9f20e`.
- [ ] Browser verify panel under administrator login, session lifecycle and layout.
- [ ] Stage integrated Maurice manuscript in private storage; build versioned editing/QA processing. Do not interpret read-only next-action guidance as completed automation.

## 2026-11-22 | Versioned assembled intake
- [x] Deploy Supabase intake trigger recognition for `assembled_manuscript`/`working_manuscript`/`manuscript_revision`, with duplicate guard and `ready_for_processing` status. No author release.
- [ ] Upload integrated Maurice DOCX to private Supabase storage and create linked `mpid_documents` row to exercise trigger; preserve originals. Existing toolset has no direct storage upload action, so do not create a false document row without file bytes.
- [ ] Implement authenticated version-aware processing worker, QA and author approval. No further dashboard HTML write unless complete payload and safe authorization confirmed.

## 2026-11-22 | Secure assembled manuscript endpoint
- [x] Deploy admin-authenticated private DOCX upload endpoint `rsm-assembled-manuscript-upload` v1; hashes and version-registers assembled documents, no client release.
- [ ] Wire admin dashboard to endpoint with safe nonempty-file update and verify authenticated upload. No direct container internet or Supabase storage-upload connector; Maurice assembled document count remains zero.
- [ ] Validate actual upload, processing worker, QA and author approval end-to-end before marking complete.

## 2026-11-22 | Intake UI and secure endpoint connected
- [x] Edge Function v2 with CORS and private DOCX registration.
- [x] Admin stage 2 upload UI, project selector and private registration wired via `rsm-workflow-order.js` commit `425ce041b0fc3c062a70ae39ea36cacde390d69f`; no dashboard HTML replacement.
- [ ] Authenticated upload of existing combined DOCX, title reconciliation, worker processing, annotated QA and author approval. No evidence these have completed; avoid false success claims.

## 2026-11-22 | Version-specific QA guard
- [x] Require QA-passed edit run tied to latest assembled DOCX document before editorial release readiness.
- [x] Inspect local candidate DOCX and verify title/foreword present.
- [ ] Private upload of candidate DOCX, actual queue worker execution and full editorial QA; browser acceptance and author approval remain outstanding.

## 2026-11-22 | Processing queue concurrency
- [x] Atomic service-role-only latest-version assembled manuscript queue claim.
- [ ] Implement worker to process DOCX, emit location-accurate findings, generate edited manuscript and QA deliverables, with retries and private staging.
- [ ] Authenticate admin upload of Maurice candidate DOCX; complete end-to-end acceptance and author approval.

## 2026-11-22 | Reconciled priority queue
- [x] Verify seven-stage dashboard ordering and Complete Manuscript Intake panel exist in GitHub source; no authenticated browser acceptance claimed.
- [x] Verify latest-version release gate remains closed for Maurice and private upload function is deployed.
- [ ] Complete authenticated private upload of corrected-title combined Maurice DOCX to `mpid-manuscripts`; confirm actual storage bytes, document row and version-specific intake job. Do not fabricate a document record.
- [ ] Complete and verify integrated processing worker: read latest registered DOCX, apply package-scoped edits preserving author voice, produce exact paragraph/page evidence and before/after change log, generate private editorial report and edited DOCX, and run QA.
- [ ] Verify admin dashboard login, all seven stage panels, manuscript upload, status refresh, private approval and author review in a real authenticated browser; repair any failures.
- [ ] Release to author only following verified QA, resolved findings, and explicit administrator approval; then author approval, final production QA and payment readiness. Do not send payment requests or client notifications without authorization.

## 2026-11-22 | Admin visual refinement
- [x] Restyle Project Records Active Documents, Editorial Findings and Author Approvals into responsive, coordinated cards, preserving live controls.
- [ ] Authenticated browser visual acceptance at desktop and mobile sizes, audit duplicated sections and eliminate redundant workflow panels without removing functional controls. Continue remaining editorial processing integration.

## 2026-11-22 | Remove redundant records display
- [x] Hide duplicate Project Details findings and author approval summaries; relocate existing file management to Stage 2 without removing download/archive/delete handlers.
- [ ] Browser-verify responsive Stage 2 file management and dedicated Stage 4/5 views; inspect remaining duplicate sections.
- [ ] Complete authenticated private manuscript intake and actual processing worker so review reports are generated inside the dashboard, not as disconnected local artifacts.

## 2026-11-22 | Dashboard report generation
- [x] Deploy administrator-authenticated private editorial report generator and Stage 4 generate/review controls in existing Admin Dashboard.
- [ ] Authenticated browser invocation for Maurice and verify actual private TXT report and `pending_review` record; investigate any schema/status constraints.
- [ ] Connect revised assembled manuscript upload and real editing worker to generate new findings with exact source references and final page verification, then deliver professional DOCX/PDF through dashboard and gate author release.

## 2026-11-22 | Auto report on Stage 4 selection
- [x] Trigger private report generation from existing editing run when administrator selects project in Stage 4, if no dashboard report exists.
- [ ] Authenticate and execute live generation, verify private storage, report record, and download; fix failures.
- [ ] Upload revised assembled manuscript and implement actual version-linked worker for new full-manuscript QA; do not treat old segment warnings as verified final findings.

## 2026-11-22 | Report panel project synchronization
- [x] Sync Stage 4 report project with selected dashboard project, reducing duplicate selection.
- [ ] Authenticated upload of local assembled DOCX, queue processing, dashboard report registration and download acceptance. Current tools do not provide an authenticated browser session or direct private storage upload on behalf of the logged-in administrator.

## 2026-11-22 | Editorial Quality Review and manuscript upload
- [x] Rename Stage 4 to Editorial Quality Review, remove duplicate author approval history and hide manual finding controls by default; preserve exception override and audit history.
- [ ] Upload `/mnt/data/The_VA_Loan_Millionaire_Complete_Editorial_Candidate.docx` using authenticated Complete Manuscript Intake in Stage 2 or authorized binary storage tool when available. Verify `mpid_documents`, storage bytes and intake job. No upload success claimed.
- [ ] Execute latest-version manuscript processing and generate verified location-accurate findings, DOCX/PDF private deliverables and QA; present for admin approval only after actual verification.

## 2026-11-22 | Highest-priority integrated dashboard-only completion
- [ ] Eliminate manual download/reupload of ChatGPT-generated manuscript files. In authenticated dashboard, retrieve existing private Maurice project source and foreword, assemble/version privately, and trigger processing automatically.
- [ ] Build and execute latest-source-linked manuscript editing and QA worker; distinguish genuine source findings from segment-boundary artifacts; attach exact page/paragraph references when verified.
- [ ] Generate and register polished editorial report and corrected manuscript privately in dashboard, with administrator review and approval; route author decisions to Stage 5 and gate final KDP-ready release.
- [ ] Run authenticated end-to-end acceptance tests on Maurice's real project without sending unauthorized author communications; record exact pass/fail results and update all continuity files. Do not ask user to download/reupload local manuscript artifacts.

## 2026-11-22 | Source reconciliation integration
- [x] Inspect Maurice live source document, intake job and prior editing run; deploy private source reconciliation function and dashboard Stage 2 status display.
- [ ] Verify actual foreword location in private storage via authenticated source check. If absent, implement dashboard-native foreword intake without external ChatGPT artifact transfers.
- [ ] Implement server-side PDF extraction and DOCX assembly preserving original source, version registration, automated latest-version processing, findings and QA; authenticate and execute complete workflow before declaring complete.

## 2026-11-22 | Private assembly function deployed
- [x] Deploy authenticated admin-only private PDF plus foreword text assembly function and dashboard invocation, preserving source PDF and registering new version when successful.
- [ ] Confirm foreword actually exists in Maurice's private project storage; invoke assembly authenticated, verify resulting DOCX and intake job. Function must not invent missing foreword.
- [ ] Make assembly automatic when sources become ready, build real editing/QA worker with source-accurate findings, connect report/approval/release and execute authenticated end-to-end acceptance test. Existing assembly is text-only and not KDP production ready.

## 2026-11-22 | Integrated foreword and automated preflight
- [x] Store existing Colonel Jackson foreword text in private project-integrated manuscript source, eliminating separate foreword upload dependency.
- [x] Deploy private PDF+integrated-foreword DOCX assembly v2 and automatic dashboard initiation; deploy mechanical preflight worker, private findings and report generation (all unverified at runtime).
- [ ] Invoke authenticated dashboard flow, fix runtime errors, verify assembled manuscript and version-linked editing run in live database. Currently NOT registered.
- [ ] Implement substantive editing per purchased scope, verify paragraph and final printed page locations, source fidelity and VA facts, produce professional DOCX/PDF, and complete admin approval -> author review -> release gates. No client notification or release without explicit approval.

## 2026-11-22 | Remaining production acceptance gates
- [x] Fix mandatory application_id and approved_scope on automated editing-run registration in preflight v2.
- [ ] Execute private assembly and preflight with authenticated dashboard, verify storage and new run. Connected Supabase management tool does not expose an authenticated user-session Edge Function invocation.
- [ ] Complete substantive VA/mortgage editorial review, source-to-page references, print typesetting and KDP proof validation; integrate gated admin approval and author review. Never release pending or needs_review deliverables.

## 2026-11-22 | Gate alignment and remaining verified acceptance
- [x] Correct contradictory editing-run check constraints that made release gate impossible to satisfy.
- [x] Remove obsolete manual assembly control and undefined report-refresh reference from workflow JS.
- [ ] Authenticated run of private PDF plus integrated foreword assembly and preflight; inspect errors and verify new private document/run in live SQL.
- [ ] Implement and validate substantive editorial findings, print-ready KDP layout and proof, verified QA and administrator/author approval release. Live gate remains all false. Never mark mechanical preflight as full QA.

## 2026-11-22 | Admin-only private report integration
- [x] Add inline private TXT report viewing and Stage 4 project-triggered automatic source processing without requiring manuscript download/reupload.
- [ ] Execute with authenticated admin session and inspect live logs/storage/database for assembled manuscript, new run and report; fix any runtime failures.
- [ ] Complete substantive editorial and print QA plus explicit administrator and author release workflow; do not release on preflight-only results.

## 2026-11-22 | Integrated contracted editor
- [x] Wire automatic dashboard assembly to approved-scope AI editor using versioned private DOCX and approved application ID; register private editorial report pending review.
- [ ] Execute authenticated dashboard flow, verify assembly/editor output, identify errors from function logs, and inspect resulting documents and QA state.
- [ ] Implement exact page/paragraph tracked corrections, substantive fact-check review, professional KDP layout and proof QA; verify admin approval, author review and gated release without sending unauthorized messages.

## 2026-11-22 | Updated integration verification
- [x] Verify Maurice $250 commencement payment is marked paid and fully verified in live installment table.
- [x] Fix source reconciliation response to include latest run report path for dashboard automatic processing detection.
- [ ] Execute authenticated administrator dashboard processing to register assembled manuscript and editing run; inspect runtime failures and complete substantive QA, KDP proof and gated author review.

## 2026-11-22 | Editorial findings display
- [x] Implement private Stage 4 source-located finding cards with original/corrected excerpts and recommendations, no manual finding-status action required to view.
- [ ] Verify live authenticated rendering and source mapping; complete manuscript assembly, substantive editing, KDP proof and approval workflow.

2026-11-22: Editorial dashboard private findings export added in commit 352781536e74a1c7e97569b958848372c1540725. JavaScript syntax validated; authenticated UI and end-to-end editorial processing remain unverified. No author release or notification.

## 2026-11-22 | Editorial completion priorities
1. Diagnose authenticated private manuscript assembly and confirm integrated sections are present in a new registered working document, preserving original.
2. Run substantive editing on assembled source and generate actual location-verified editorial findings with original and corrected excerpts, author suggestions and private review deliverables.
3. Produce and QA KDP-compliant edited DOCX/PDF, verify source fidelity and print layout.
4. Exercise administrator review and approval, author review and approval, and final release gates without sending unauthorized client communications.
5. Record real acceptance results in the test registry. Do not mark completion based only on deployments.

2026-11-22: [x] Correct assembly-to-editor document ID handoff in dashboard. [ ] Authenticated assembly execution and substantive editing, precise location findings, print QA, gated author review. Do not release client work before verification.

2026-11-22: [x] Add editor duplicate-run protection and private edited-DOCX registration; [x] expose private edited-DOCX admin download in Stage 4. [ ] Verify authenticated assembly and editor execution; generate source-located findings and complete KDP production and gated author review.

2026-11-22: [x] Add formatted private DOCX editorial audit generation and dashboard private download. [ ] Execute authenticated Maurice audit using registered original plus integrated foreword; verify DOCX registration and real source-located findings; complete editing, print QA and approvals.

2026-11-22: [x] Separate old editorial reports and reviews from current formatted review documents without deleting historical records. [ ] Verify authenticated dashboard rendering, Maurice assembly/audit, new DOCX generation, and complete author release gates.

2026-11-22: [x] Wire selected-project private audit trigger, formatted DOCX generation after editing, and DOCX backfill for existing runs. [ ] Execute authenticated Maurice project processing and verify actual DOCX, source fidelity, page/paragraph findings, KDP-ready production and approval gates.

2026-11-22: [x] Correct visible Manuscript Processing legacy editorial report download to formatted DOCX. [ ] Authenticated verification of download and Maurice source/foreword assembly, location-verified audit and KDP QA.

2026-11-22: [x] Resolve private assembled manuscript registration failure; assembled document v2 registered. [ ] Resume automated editorial processing from assembled document and verify DOCX audit/QA, approval gates.

2026-11-22: [x] Remove new TXT audit deliverable registration, deploy formatted DOCX report v3; [x] fix project selection precedence. [ ] Execute authenticated assembled manuscript editing and inspect actual DOCX and source-anchored findings; retain private release gate.

2026-11-22: [x] Deploy editor v10 with formatted DOCX reports and source-excerpt-verified finding records. [ ] Authenticated execute on Maurice assembled document v2 (id 27834501-e54b-4801-af4c-ba744d8ee725); verify private output DOCX and source fidelity, findings, QA and admin review. Do not release to author before approval.

2026-11-23: [x] Connect Stage 4 Generate Report to assembled-manuscript editor before DOCX audit; hide test projects in workflow dropdowns. [ ] Authenticated reload dashboard, select Maurice, click Generate Report, verify new assembled-source run, DOCX output, QA and finding location.

2026-11-23: [x] Fix overescaped DOCX/PDF regex causing false 0 current reports. [ ] Refresh authenticated dashboard to verify report visibility. [ ] Run editor on assembled DOCX v2, not original PDF; inspect foreword inclusion and QA before approval.

2026-11-23: [x] Prevent Stage 3 queue from selecting original PDF. [ ] Verify authenticated processing run uses assembled manuscript source and produces DOCX deliverables; QA and release approval remain pending.

2026-11-23: [x] Separate current working-source editorial output from historical original-source drafts in Stage 4. [ ] Execute authenticated editorial processing and verify generated DOCX QA, findings and private review.

2026-11-23: [x] Fix runtime DOCX parser crash in rsm-manuscript-editor v11. [ ] Authenticated retry and verify new working-source editorial run, private DOCX deliverables, QA findings and release gate.

2026-11-23: [x] Diagnose HTTP 546 runtime timeout and recover stuck run state. [ ] Implement resumable per-segment editorial engine, durable progress and retry, then verify private deliverables and QA before author release.

2026-11-23: [x] Implement persisted editorial section checkpoints and sequential dashboard orchestration. [ ] Verify authenticated end-to-end section execution, DOCX outputs, QA findings and no-author-release.

2026-11-23: [x] Confirm 7/7 private editorial segments and report paths. [x] Fix DOCX-as-text parsing in dashboard audit generator (v4). [ ] Regenerate existing audit DOCX and verify ZIP/Word opens; inspect edited manuscript DOCX; complete QA before author release.

2026-11-23: [x] Deploy separate v5 audit report generation path without large embedded engine report. [ ] Generate v5 audit with authenticated dashboard and verify Word opens, then inspect DOCX content and QA before release.

2026-11-23: [x] User confirmed corrected v5 audit and edited manuscript DOCX both download and open in Word. [ ] Perform substantive editorial QA, source-located findings, foreword/author-voice preservation, KDP layout validation. [ ] Require administrator and author approval before release; QA remains needs_review. Do not rerun seven completed segments for DOCX-open testing.

2026-11-23: [x] Restore Stage 4 current working-document Approve for Author Review, Request Corrections, and separately confirmed Release to Author controls in GitHub source. [ ] Browser refresh and authenticated rendering/approval acceptance; verify current corrected audit and edited manuscript selected, no historical approval. [ ] Validate author portal delivery/notification safely before any real author release. [ ] Complete substantive QA and approval gates.

2026-11-23: [x] Block admin approval of the known defective Maurice edited manuscript in Stage 4 and legacy approval list. [ ] Implement clean manuscript reassembly using completed segment text, remove only verified source-page artifacts and repeated running headers, restore paragraph flow/styles, preserve actual headings/foreword/author text. [ ] Register a distinct private corrected DOCX; verify Word opening and source fidelity; supersede defective version without deleting audit history. [ ] Validate release gates for all review surfaces. No author release.

2026-11-23: [x] Deploy admin-only clean DOCX regeneration from saved editorial checkpoints and Stage 4 one-click control. [ ] Admin triggers regeneration and verifies new clean DOCX in Word. [ ] Confirm original paragraphs/foreword, headings, spacing, no source-page labels, no missing text. [ ] Complete substantive editorial QA and KDP production formatting. No author release.

2026-11-23: [x] Clean DOCX generated and registered privately; [x] Fix Stage 4 filtering to display clean replacement instead of original defective draft. [ ] Refresh Section 4 and download Edited_Manuscript_Clean...docx; inspect foreword, page 6 passage, headings and paragraph spacing; [ ] Complete editorial/KDP QA before any approval or author release.

2026-11-23: [x] Implement private typeset-v3 generator with page numbers, bold headings, chapter starts, VA funding-fee table borders and em dash cleanup. [ ] Invoke Stage 4 Generate Typeset Manuscript with Tables & Page Numbers and inspect Word file. [ ] Audit all source tables and chapter titles, compare with original, check em dash replacements for punctuation quality, and verify print-ready KDP layout before author approval. No author release.

2026-11-23: [x] Implement v5 private production-review generation with black heading hierarchy, remove Manuscript label, chapter/foreword/copyright page breaks. [ ] Generate new ProductionReview file in Section 4; [ ] inspect Word for heading levels, actual chapter list, correct copyright/foreword order, spacing, table integrity and page numbers; [ ] complete KDP quality control before any author approval/release.

2026-11-23: [x] Implement validated front matter segmentation and structured book layout v5. [ ] Generate new BookLayout DOCX via Stage 4; [ ] verify title page, copyright page, foreword signature/rank adjacency, introduction and chapter breaks; [ ] audit paragraphs, table fidelity and KDP proof before approval. No author release.

2026-11-23: [ ] Inspect original manuscript source file and identify true page/section titles, paragraph headings, paragraph breaks, all tables. [ ] Repair DOCX builder to make copyright page 2, merge legal disclaimer line wraps into complete paragraphs, preserve foreword signature and rank, build genuine title page, and ensure introduction/chapter page breaks. [ ] Run authenticated generation and inspect actual DOCX in Word, including all pages and KDP dimensions. [ ] Do not approve or release current BookLayout output.
