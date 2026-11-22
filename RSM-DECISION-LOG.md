## CURRENT OPERATING DECISIONS | 2026-11-21 | READ FIRST
- Manuscript-first production: improve working copy as far as signed package safely permits, preserve original and author voice, deliver readable clean manuscript plus transparent corrections and concrete improvement recommendations.
- One evidence-backed workflow, one source of truth: manuscript engine, audit register, author checklist, administrator decisions, production and progress display must agree. Never infer completion from a document existing.
- Automate routine copyedits, synchronization and refresh. Keep human authorization for substantive author decisions, external messages, payments and releases. Minimize controls and duplicate work.
- Delivery standard: integrated change with migration/source review, targeted verification and continuity update. Do not represent source syntax checks as live browser tests.
- Preserve prior approved decisions and history below; newer explicit decisions supersede older incomplete plans.

# RSM Publishing Services | Approved Decisions
Last baseline: 2026-11-19

## Business and branding
- Public brand: RSM Publishing Services, operated under Right Side of Money LLC.
- Technical MPID names may remain in internal database and code.
- All publishing notifications route to publishing@rightsideofmoney.com.
- GitHub repository dtrsm1990/rightsideofmoney is authoritative for website source.
- Admin dashboard filename must remain mpid-portal/admin-dashboard.html.
- Admin UI should be professional, structured, and card-based, not raw SignWell field dumps.

## Packages
- Publish-Ready: $997.
- Full Launch: $2,497.
- Signature Author: $4,997.
- Standard schedule: 30% initial, 40% milestone, 30% before final delivery.
- Reusable Bluevine links are preferred; never invent or regenerate a payment link.
- Special pricing must be explicitly scoped and approved, not silently applied to all clients.

## Maurice Watkins agreement revision
- Book: The VA Loan Millionaire; package: Publish-Ready.
- Revised contract: $500 family discount; $250 on signing and $250 on completion.
- Preserve original signed $600 contract as historical evidence.
- Do not send payment request before the revised agreement is signed.
- Do not issue duplicate agreements or payment requests.
- Revised SignWell document ID: 8de47506-d4f4-4310-80cf-8777831a6023.

## Client lifecycle
Application -> review and scope -> agreement signed -> verified payment -> author invitation/onboarding -> manuscript processing -> admin review -> author approvals/proof -> final payment -> secure delivery -> archive.
Human approval is required for substantive editorial changes, publication authorization, and final release.

## Editorial and production
- AI manuscript processing should be package-specific, auditable, and admin-reviewed before release.
- Preserve originals and provide traceable revisions.
- No invented facts, citations, or unapproved material changes.
- For Maurice paperback: 6x9, black-and-white interior on white paper, glossy cover.
- Author retains responsibility for their KDP account and ISBN unless the signed scope explicitly states otherwise.

## Continuity policy (adopted 2026-11-19)
- Maintain four GitHub records: master status, test registry, decision log, next actions.
- Every chat begins by reading these records and inspecting live system state.
- After each deployed change, update test evidence and next action.
- Prior chat claims are context, not proof of passing tests.
- No secret keys, private client files, or sensitive contract text in GitHub continuity files.

## Reusable discount selection (confirmed 2026-11-19)
- Regular Discount and Family Discount are reusable options for any eligible author, not Maurice-specific.
- Approved options: standard packages at $997/$2,497/$4,997 with 30/40/30; Regular Discount $600 full upfront; Family Discount $500 full upfront OR $250 upon signing plus $250 upon completion.
- Discounts affect price and payment schedule, not the selected publishing service package or scope unless separately approved.
- Admin dashboard must expose a reusable pricing selector and send agreements with corresponding terms; no customer-specific button in the general workflow.
- Reuse existing approved Bluevine links; do not create new links per author.

## 2026-11-20 payment approval workflow decision
- Owner approved future automatic initial payment preparation with administrator approval notification before sending author payment requests. Administrator approval email destination publishing@rightsideofmoney.com. Maurice Watkins current $250 request must remain held and must not be sent without separate explicit authorization. Approval is not permission to send an author payment request.

## 2026-11-20 approved dashboard and continuity operating decisions
- Invite New Author belongs immediately BELOW Author Application Review Center, followed by Applicant Manuscript Inbox. GitHub main commit 494b4bc09bbf38ae1c50db7cf2a0fbccdee0d836 implements source ordering; browser acceptance pending.
- Maintain accurate completion tracking in ALL FOUR GitHub continuity files after each meaningful change. Mark deployed source and verified behavior separately, record commit/evidence, carry forward only outstanding actions, and read these files first in every new chat. Do not recommend rebuilding a completed feature without first checking source and live data.
- Maurice's signed $500 agreement and already-requested $250 initial payment must not be reissued. Verified payment remains the onboarding prerequisite. Admin approval is mandatory for future author payment sends.

## 2026-11-20 decision: repair deployed worker, do not rebuild
- Live status constraint is pending/processing/completed/failed; an existing active every-minute cron invokes the existing worker. Earlier assumption of awaiting_admin_review status was stale and corrected by inspecting live constraints.
- Preserve the existing worker and improve eligibility/retry safeguards. Do not treat deployment as end-to-end acceptance or manually invite Maurice before verified payment.

## 2026-11-20 project identity decision
- Use mpid_projects.application_id as stable unique linkage for automatic onboarding. Never infer project identity solely from author_id and book title. Preserve existing projects with null application_id until explicitly reconciled.

## 2026-11-20 duplicate-trigger remediation
- Two payment-to-onboarding triggers coexisted. The legacy rsm_prepare_onboarding_after_payment used readiness state but did not enforce contract-specific amount, permitting wrong-size paid deposits into queue. Removed legacy trigger/function; retained stricter rsm_enqueue_verified_onboarding_trigger. Negative rollback fixture now passes.

## 2026-11-20 background project audit decision
- Activity history must support background automation with no auth.uid(). Preserve non-null actor_id using project author_id as fallback and explicitly label event automated in details; do not misrepresent as a manual admin action. Verified transactional test.

## 2026-11-20 manuscript processing payment safeguard
- Editing must validate verified amount against approved contract price and correct commencement stage, not accept arbitrary paid installments. Family 50/50, standard 30%, and discounted full-upfront are handled. Human editorial QA and administrator release remain required.


## 2026-11-21 Stripe and notification compatibility
- Preserve authenticated administrator approval for matched Stripe payment verification until safe automatic matching/crediting has been designed and acceptance-tested. Stripe webhook signature validation and event receipt alone do not authorize crediting an arbitrary installment.
- Notification event_type constraints must remain aligned with deployed trigger event types. Accepted operational events: payment_verified_admin, author_onboarding_completed_admin, author_onboarding_failed_admin. No duplicate live payment charges or notifications should be initiated for testing.


## 2026-11-21 manuscript handoff
- Treat application manuscript as canonical immutable intake source; on completed onboarding copy into private project source-manuscripts directory, register document once by deterministic storage path, and never delete intake original. Do not re-request already uploaded manuscripts.


## 2026-11-21 professional author review deliverables
- Provide a clean author-readable edited manuscript and a separate editorial report with recommendations/questions. Correct grammar, spelling, punctuation and clarity only within approved scope; substantive changes require explicit review. Preserve original source and hold all author-facing releases for administrator approval.

## 2026-11-21 | Manuscript-first editorial production standard
- Primary deliverable is a substantially improved, publication-ready manuscript within the selected signed package, not an editorial report alone. Preserve the original immutable manuscript and the author's voice and meaning.
- Apply safe grammar, spelling, punctuation, consistency, readability and formatting corrections directly to a separate working copy. Give the author a clean edited manuscript and a clear correction record; routine mechanical edits do not require individual author approval.
- For substantive issues, propose concrete improved wording or additions, explain the benefit and source evidence, and request author decisions only where needed (facts, personal experiences, legal/tax/mortgage assertions, scope changes). The publisher completes approved changes and final QA.
- Do not claim publication readiness until package obligations, substantive accuracy, author decisions and print/ebook production QA have actually passed.

## 2026-11-21 | Minimal-click editorial dashboard
- Remove redundant buttons and automate routine state refresh, manuscript processing and report preparation wherever safe. Keep administrator approval for meaningful substantive changes, author delivery, payment requests and publication release. Preserve audit history and protected source manuscripts.

## 2026-11-21 | Workflow milestones own publishing stage
- Project status must reflect verified workflow events rather than requiring an administrator to select routine stages. Edit runs and staged editorial deliverables advance eligible projects to editing; review-stage runs are NOT proofing or completed. Preserve on_hold and later stages. Manual status changes are exception overrides, not normal workflow. Publishing Progress uses authoritative project status. Later stage transitions require separate evidence-backed gates and tests.

## 2026-11-21 | Enterprise publishing platform design standard
- All workflow centers must reflect one authoritative project state with evidence-backed transitions. Editorial engine outputs must be registered as structured findings with source locations, correction actions, author decision requirements, provenance and QA disposition. Reports are views of that evidence, not separate disconnected systems. Avoid redundant buttons, duplicated state, unverifiable readiness claims and repetitive manual reconciliation. Keep explicit administrator authorization for external communications, payments and author release.

## 2026-11-21 | Source-linked findings ingestion
- Only explicit manuscript-editor uncertainty notes are eligible for automatic central audit registration. Each record must retain source segment provenance and stay open until human QA verifies issue versus chunk-boundary artifact. Routine copyedits must not become author tasks. Idempotency must prevent duplicate findings. Administrator-authenticated execution only; no auto-author release.

## 2026-11-21 | Editorial audit ingestion operational rule
- Persist source-linked processing uncertainties as provisional internal audit findings, not as author-facing confirmed corrections. Use unique segment links for deduplication. The dashboard reads findings rather than attempting an RPC batch on every refresh. Remove hard-coded customer-specific processing triggers from generic dashboard. Only create author checklist actions after editorial verification.
