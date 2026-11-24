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

## 2026-11-21 | Mandatory author portal and no-regression standards
- Grant author portal access at onboarding only after signed agreement, verified required initial payment and authorized invitation. Maintain access throughout active project. Author sees up-to-date milestone status, released edits/proofs, approved findings, author actions and response history. Internal draft changes and provisional audit flags remain private until admin approval. Author must not wait until editorial editing finishes.
- Every change requires dependency review and explicit regression checklist across agreement/payment gates, invitations, author access, project state, manuscript preservation, editorial findings, checklist release, file RLS and admin release. Preserve working behavior and exact filenames. No client-specific hard-coded automation in generic dashboard.
- Existing author dashboard is NOT real-time: it loads on demand and has no realtime subscription. Implement safe non-disruptive project updates and approved-item notifications without wiping in-progress author form responses.

## 2026-11-21 | Author onboarding instructions
- Make clear onboarding instructions available inside the existing authenticated author portal without adding unnecessary administrator buttons or altering payment/invitation gates. Explain account activation, project stage, uploads, approved edits, released checklist, proofs and help contact. Keep internal drafts private. Branded onboarding emails require delivery tracking, idempotency and explicit authorization before sending real correspondence.

## 2026-11-22 | Automatic editorial workflow
- Administrator should only review and approve package-scoped outputs. Incoming forewords and supplements must be versioned, assembled before processing, and never overwrite original manuscripts. Exact page/paragraph evidence and change comparisons are required before author release. No author communication or KDP-ready designation without explicit gates.

## 2026-11-22 | Approved administrator workflow and automation policy
- Seven administrator stages in strict operational order: Application, Agreement & Payment; Author Onboarding & Manuscript Intake; Manuscript Processing; Editorial Audit & Quality Assurance; Author Review & Approval; Book Production & Proofing; Final Payment & Publication Readiness.
- Automatic manuscript revision intake must register the integrated version, fingerprint/idempotently process only changed content, and link source-page/paragraph findings to corrections, verification and author recommendations. Status recommendations may be automated, but verified resolution and release remain gated. Admin responsibilities are exception review, QA and approval. Dashboard refresh is not processing. Do not change provisional findings solely to advance workflow.

## 2026-11-22 | Continuity and release-truth policy
- Source-code stage ordering is implemented but must never be described as authenticated browser acceptance. A Supabase function's ACTIVE status must never be described as a successful upload, manuscript edit, or author release without an actual tested transaction.
- Keep author-facing releases blocked until latest assembled manuscript is privately registered, version-linked editorial processing passes QA, findings are resolved with exact source references, and an administrator approves the deliverables. Preserve originals and audit history. No real author correspondence, agreement, or payment request without explicit authorization.
- Future GitHub dashboard writes must preserve complete nonempty content, dependencies and exact filenames; prefer modifying dedicated workflow script rather than replacing the large administrator HTML when feasible.

## 2026-11-22 | Administrator editorial responsibility
- Stage 4 Editorial Quality Review is an exception-review and approval surface, not a manual status bookkeeping step. Advanced finding-status changes remain accessible only when needed for verified exceptions. Do not automatically mark segment-boundary artifacts resolved without comparison to full source. Preserve author approval in Stage 5.

## 2026-11-22 | Binding workflow decision: dashboard-only, no manual artifact transfer
- All author manuscripts, forewords, working copies, editorial findings, reports, QA results and deliverables must be ingested, generated, stored and reviewed within RSM Publishing Services' authenticated Admin Dashboard and private Supabase infrastructure. No external ChatGPT-produced manuscript download or reupload as a normal operational step. Administrator responsibility is to review exceptions and approve release, not run processing or manually update routine finding statuses. Preserve source files, version history, contracted scope, privacy and approval gates. Do not represent the system as fully automated until an authenticated end-to-end test passes.

## 2026-11-22 | Foreword is part of Maurice's manuscript
- The Colonel Carlos T. Jackson foreword is integrated as manuscript source content in private Supabase, not treated as an independent operational deliverable. Server-side assembly reads the original PDF and integrated foreword, creates a new working version without changing original source. Admin dashboard should automatically initiate processing when sources are present. A mechanical preflight is not a full substantive editorial review; no automatic author release or KDP-ready claim without verified QA and approvals.

## 2026-11-22 | Preserve strict production QA gate
- Align database allowed statuses with release-gate view without weakening gate requirements. Automated mechanical preflight stays `needs_review`; only verified substantive editorial, source-fidelity, and print-layout QA can justify `completed` plus `passed`. No automatic approval or author release from a mere deployment or preflight.

## 2026-11-22 | Editorial completion acceptance criteria
- Do not describe the editorial section as complete until a private source manuscript plus integrated sections is assembled, processed into an edited manuscript, documented with verifiable source-located findings and corrections, checked for source fidelity and KDP production requirements, and tested through administrator approval and author review gates.
- Administrator approval remains required for release. UI deployment and JavaScript syntax checks alone are insufficient.

2026-11-22: Register edited DOCX and editorial report as separate private pending-review deliverables. Reuse an existing successful draft for the same source rather than creating duplicate AI runs. Only an authorized admin can download private drafts; no automatic author release.

2026-11-22: Private editorial audit output should be professionally formatted DOCX, not TXT-only; retain TXT for backwards compatibility. DOCX remains private pending_review with explicit release gate, not an author-facing approved audit.

2026-11-22: Editorial cleanup is non-destructive: current formatted DOCX/PDF review first; older drafts, TXT reports and test artifacts in collapsed private history. No permanent deletion of client or audit history.

2026-11-22: Run Editorial Audit & Generate DOCX acts on selected private project, chains private assembly/editor and formatted audit. Existing completed private edit may generate missing formatted audit without a duplicate editing run. Release remains approval gated.

2026-11-22: Fix the existing visible Manuscript Processing controls rather than add duplicate workflow buttons. Editorial report download must generate formatted DOCX; TXT remains internal only. Preserve original and admin approval gates.

2026-11-22: Intake trigger already classifies assembled_manuscript; expand intake jobs role constraint to allow that value rather than bypass registration or change original source. No author release.

2026-11-22: Generate/register only formatted DOCX audits for new dashboard reports, do not add TXT deliverables. Use active Publishing Projects selection as authoritative processing project. Preserve historical files and approval gate.

2026-11-22: Editorial engine v10 registers formatted DOCX report, not TXT. Exact source excerpt verification is mandatory for automatic findings; inferred source PDF page marker may be recorded, but unverified paragraph is null. Original manuscript and private approval gates remain intact.

2026-11-23: Stage 4 Generate Report for Admin Review must run missing assembled-manuscript editing before audit generation. Do not let stale PDF-based runs masquerade as current. Hide test projects in production workflow selectors.

2026-11-23: Correct actual DOCX/PDF filename filtering rather than regenerate existing documents. Do not classify original-PDF draft as final foreword-inclusive manuscript.

2026-11-23: Stage 3 private manuscript queue source dropdown must only expose assembled_manuscript documents. Do not process original manuscript PDF as current working version.

2026-11-23: Current editorial deliverables must match the latest registered assembled working manuscript and its processing run. Historical PDF-source drafts are not current for QA or release.

2026-11-23: For Mammoth 1.9.0 in Supabase Edge Function, use Buffer.from(DOCX ArrayBuffer) as {buffer} to extract raw text. Keep admin JWT and private release controls.

2026-11-23: Do not repeat synchronous full-manuscript editing requests after HTTP 546 timeout. Implement resumable background or segment processing with persisted checkpoints and job status, preserving source and existing deliverables.

2026-11-23: Process one editorial segment per authenticated request; persist edited text, findings and usage in rsm_editor_segments before next request; assemble private DOCX outputs only after all segments saved. Preserve approval gate.

2026-11-23: Publishing layout decision: title page alone on page 1; copyright/disclaimer page starts page 2; foreword starts a subsequent page and Carlos T. Jackson signature/rank stay adjacent; introduction and chapters start new pages. Original manuscript is the structural reference for heading levels, paragraph boundaries, and tables. Do not use blank-line PDF extraction or uppercase heuristics as authoritative. Preserve original and prior private outputs, and require admin QA before author release.

2026-11-23 | Lock accepted private manuscript layout as working master based on administrator visual acceptance, without changing original or earlier drafts. Section 4 should show final review and approval first; place regeneration under collapsed Advanced Corrections. Never automatically release to author.

2026-11-23 | Author Portal must never ask an author for Supabase connection details. Use only active public sb_publishable key as browser configuration; preserve Supabase RLS, invitation activation, passwords, private manuscript access, and separate author release gate. No real invitation sent as part of fix.

2026-11-23 | Admin one-click approval and author release is authorized only after explicit in-dashboard confirmation for each exact document. Edited manuscript and editorial audit are separate actions. Existing release RPC, version checks, QA triggers, RLS and notification outbox remain authoritative; no direct email from browser. Delivery must not be claimed until confirmed.

2026-11-23 | All author editorial releases must include actionable, plain-English steps tailored to edited manuscript versus editorial audit, document identity/version, where to access, how to approve or request revisions, contact support, and distinction between review approval and publication authorization. Keep manuscript attachments private behind portal authentication.

2026-11-23 | Workflow stages must follow application to agreement/payment to author onboarding/intake to processing to editorial audit/private review to author approval to proofing to final payment/readiness. Keep private editorial staging in editorial audit, not author-facing approval. Keep legacy manual tools collapsed, preserve their event handlers and availability.

2026-11-23 | Package comparison runs are independent private assessments. Never modify contracted package, original or working manuscript, agreements, payments, or author visibility. Explicit admin action, source version, package and distinct private outputs. Upgrade opportunities must be based on findings. Long manuscripts must fail clearly rather than be silently truncated.

2026-11-23 | Manual package audit is an editing workflow for the chosen editorial standard, not a comparison or upsell workflow. Preserve contracted package, source manuscript, author access, and all release gates. Gateway JWT verification can be disabled only when function independently validates authenticated user and administrator RPC.

2026-11-23 | Investigate live server logs before attributing package audit failure to browser or network. DOCX extraction in Deno Mammoth requires buffer input; preserve admin-only processing and source integrity.

2026-11-23 | Replace 18,000-character single-call limit with section processing. Preserve selected package and exact source hash; resume interrupted runs; never register complete deliverables before all sections are saved. No automatic author release.

2026-11-23 | Use integer progress counter for optimistic concurrency rather than serializing manuscript content into a PostgREST filter. Never reset saved segments on retry.

2026-11-23 | Keep successful optional package audit outputs private and separate from contracted deliverables. Administrator must inspect both documents before considering further action.

2026-11-23 | All packages require professional book production; editorial depth differs by package. Preserve saved editorial results and raw drafts; formatted output remains private until final QA. Do not label preliminary layout as KDP-ready.

2026-11-23 | Package selection is editorial processing, not comparison. Automatically format every package on completion; retain internal identifiers for compatibility. Do not label preliminary DOCX KDP-ready.

2026-11-23 | Reuse approved production standards across packages; left align body to avoid excessive justification gaps. Retain private review gate.

2026-11-23 | Use consistent Title Case with acronym preservation; Georgia 18pt major headings, 12pt subsection headings, 11pt body. No changes to editorial body or release gates.

2026-11-23 | Universal package typography: traditional first-line indent 0.2 inches, no indent first paragraph after heading, single line spacing, zero between prose paragraphs, 12pt before/6pt after headings. Lists/tables excluded.

2026-11-23 | Supersede zero inter-prose spacing with 4pt after body paragraphs for readable nonfiction layout across all package selections.

2026-11-23 | LOCKED administrator-approved v12 typography: Georgia 24pt book title, 18pt bold centered major headings on new pages, 12pt bold left paragraph headings, consistent Title Case preserving acronyms, 11pt single-spaced body, 0.2-inch first-line indent except first paragraph after headings, 4pt after prose, 12pt before/6pt after headings, bordered tables, centered 9pt page numbers. Trim per project (Maurice 6x9). Same production quality for all packages; editorial depth alone differs. Preserve earlier contracted deliverables and separate optional runs.

2026-11-24 | Administrator approved manage-by-exception editorial dashboard; retain all underlying findings, resolution controls and approval history, collapse details by default.
