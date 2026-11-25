## 2026-11-24 | Privacy and verification scope

- PASS dashboard JavaScript syntax and GitHub readback checks for removal of client-specific literals and use of selected project and QA records. Authenticated browser behavior was not exercised.
- Reviewed 402 repository commit diffs from the connector's recent and keyword results. Historical client and agreement references found. No privileged credential pattern matched in the reviewed diffs. The sample does not certify complete history.
- Preserved earlier isolated ZIP integrity, private access and payment-gate results. Paid author HTTP download and real KDP Print Previewer acceptance are still open. No prior acceptance workflow was rerun.

## 2026-11-24 | Monitor and additional paperback checks

- PASS rollback tests for isolated failure suppression, detection of an active unresolved failure, prior-day deduplication, and exclusion of a superseded historical failure. The first scheduled monitor run after deployment completed with no new notices or errors.
- PASS existing 26-page PDF passed uniform 6 × 9 geometry, font embedding and annotation checks. A separate actual two-file print-and-cover ZIP passed CRC and byte verification. Synthetic cover artwork and blank barcode reserve were inspected. KDP Print Previewer and paid author HTTP download remain unverified. No previous acceptance test was repeated.

## 2026-11-24 | Actual paperback production evidence

- PASS deployed worker generated real synthetic PDF/DOCX/ZIP and read them back from private Storage. PDF reopened at 26 pages and 432 × 648 points; four pages rendered and inspected, including chapter and table pages. First render exposed black table fill. Renderer corrected and second render verified readable table contents and borders. ZIP reopened with CRC checks and exact members and bytes. Cover geometry accepted a matching synthetic one-page PDF and rejected incorrect size. No cover design or KDP upload exercised.
- PASS rollback regression of exact-version production enqueue and unsupported scope rejection. PASS unprivileged database Storage access check against actual private test artifacts. Preserve prior proof, payment, final-release and revision regressions. No test or live email sent in these production runs.
- Pending: integrated approval-to-storage proof and cover ZIP for a real signed manuscript, paid author download of the generated ZIP, expanded package assets, and KDP Previewer acceptance. The isolated generated ZIP contained the synthetic editable DOCX and PDF; live supported scope packages approved print interior and supplied cover only.

## 2026-11-24 | Production completion regression

- PASS rollback regressions: unverified proof rejected, completed QA plus ready proof advances to Proofing, approval bound to current proof, family payment authorization required, idempotent preparation of one [amount] final installment with no email dispatch, synthetic accepted request and payment verification, unpaid final ZIP rejected, administrator-approved paid ZIP release idempotent, one production completion event and Completed status. Used synthetic storage metadata and simulated provider acceptance. No requests or messages escaped the transaction.
- Found existing payment-approval notice missing from the outbox constraint. Restored the event already supported by the worker. Family regression passed after repair.
- Dashboard syntax checked. Authenticated flows, actual package bytes and rendered KDP proof, notification delivery, and full package asset requirements still need evidence. Prior author revision results carried forward.

## 2026-11-24 | Reconciled acceptance and actual Word revision

- Carry forward prior owner-confirmed sample submission and automatic admin visibility, prior manuscript downloads and editorial Word generation, and owner-confirmed synthetic office email receipt. No manual retest requested for those passed paths. New automatic revision, replacement release and version-specific approval required distinct automated regression because the earlier dashboard and rollback tests did not exercise stored Word artifacts.
- PASS actual stored synthetic manuscript revision. Initial synthetic markup used ordinary table cells in the header; generator rejected it safely. Retried the same isolated revision with the converter's actual table header markup and produced two private Word outputs. Reopened original, revision and summary; Wednesday replaced Tuesday, other text matched, Word package parts outside the main document were byte-identical, and layout/table structures matched. Original and released version 2 remain in storage.
- PASS authenticated-role private access denial for an unprivileged identity, admin approval, byte-verified release copy, idempotent finalization, stale approval rejection, version 2 approval, Production advancement and one remaining round. Fixture shares the administrator identity, so independent author browser login and visual rendering remain unverified. Isolated emails suppressed; production ready/release delivery awaits real events.

## 2026-11-24 | Actual test specimen and allowance regression

- PASS actual synthetic DOCX generated, reopened, uploaded and released as version 1 on `RSM TEST | Private Editorial Workflow`. Storage size 8,745 bytes. Zero release emails. Visual inspection and dashboard download remain pending.
- PASS rollback: two included rounds, duplicate rejection, exhaustion, idempotent additional-round authorization and correct balance. PASS approval of current generated replacement advances the isolated project to Production. No live project writes.
- Dashboard syntax checks passed. Both public URLs served login screens but the first checks did not yet expose the new allowance code. Signed-in full lifecycle remains pending.

## 2026-11-24 | Office notification receipt and isolated release check

- PASS, office receipt of synthetic Author Revision Received notification, owner-confirmed. The requested test `[private reference]` was accepted at 2:41:03 p.m. Pacific on attempt 1 without error or a client association. Same-subject prior test `[private reference]` was accepted at 2:28:00 p.m. Pacific. Exact row correlation awaits received message time or body. Do not resend for correlation.
- PASS, rollback-only database test on isolated project: one generation request, two idempotently registered private outputs, administrator release of version 2 and zero email jobs. Storage entries were synthetic rollback metadata. Authenticated browser and real synthetic artifact acceptance remain open.

## 2026-11-24 | Private revision production and publication checks

- Public Admin Dashboard standard URL served committed approval version label and generation retry code. GitHub readback matched the full replacement.
- Deployed worker v22 generated and re-read a synthetic Word revision, built its correction summary, and sent one isolated office-only email accepted by Resend at 2:41 p.m. Pacific on attempt 1. Outbox ID `[private reference]`. Mailbox receipt unverified.
- Rolled-back database regressions passed: one submission notice plus one generation event, reject missing staged outputs, idempotent private registration, enforce summary privacy and approval gate, release replacement version once, queue one author notice, reject stale approval and allow current replacement approval. Release test used synthetic storage metadata inside the transaction. No author email, actual release or persisted fixtures.

## 2026-11-24 | Revision to version-specific approval regression

- Passed rollback-only authenticated database regression: submit corrections, queue one office event, deny approval of the submitted source, release a synthetic replacement, deny approval of the stale source, accept approval of the current replacement, and read decision and source as an administrator. No fixture data persisted and no test email sent during this regression.
- Both dashboard sources passed syntax and GitHub readback checks. Author Portal published source verified. First admin published check did not yet show the new version label. Authenticated browser acceptance and mailbox delivery are unverified.

## 2026-11-24 | Revision permissions and notification acceptance

- Before migration, authenticated insert reproduced SQLSTATE 42501. After `grant_author_revision_snapshot_insert_columns`, a rolled-back synthetic transaction verified authenticated author insert and read, duplicate rejection, admin read, and exactly one pending live office event. No synthetic revision or live event persisted. Anonymous insert and authenticated insert of author identity remain disallowed.
- Separate office-only test notification was marked sent on attempt 1 after Resend acceptance. No client was contacted. Mailbox receipt unverified.
- Author Portal source syntax, GitHub readback and published source verified for `535a61a55b4d8fdcbaf1869589eedb4c2b8b4fee`. Authenticated browser conversion and editing remain to be exercised.

## 2026-11-24 | Author submission and review-stage checks

- Verified both committed dashboard files against validated complete replacements. Inline JavaScript syntax checks passed. Mocked author submission checks passed for successful write, lost response with saved row, and failed write with a retry available. These checks did not use a live author account.
- Verified Supabase migration `advance_editorial_stage_for_released_review_pair` and live database readback of `author_review` following confirmation of the active released manuscript/report pair. Zero saved revision snapshots and zero author approvals on the live project. Security advisor did not flag the updated function.
- Verified scheduled notification worker v20 and event schema by inspection. Zero revision notices found. Pending authenticated author submission and admin receipt, retry under network interruption, and provider delivery. Browser verified that both live sign-in pages load and serve the new dashboard code.

## CURRENT ACCEPTANCE GATE | 2026-11-21 | READ FIRST
- VERIFIED LIVE DATABASE: [private name] project editing; manuscript processing 13/13, run review, QA needs_review; zero central audit findings and zero author approvals; five private deliverables pending review.
- VERIFIED SOURCE ONLY: latest dashboard commit d6c8ff735b5d849be5a84f76bad0b191430e70ee passed inline JavaScript syntax validation. Live browser behavior not verified.
- OPEN FAILURE/GAP: automated processing results are not registered in central audit/checklist; author-facing corrections are not yet a fully verified change-by-change register; no end-to-end publication readiness proof.
- Next acceptance test: one safe integrated run covering intake/paid agreement gating, original preservation, edit evidence, central findings, targeted author decisions, QA, production and controlled release. Never send real correspondence or release [private name] files in a test.
- Detailed historical tests below remain available; do not mistake their status for current end-to-end verification.

# RSM Publishing Services | Evidence-Based Test Registry
Last baseline: 2026-11-19

## Status definitions
- VERIFIED: directly observed with current evidence and exact environment/version.
- PARTIAL: a component or narrower behavior was verified, but not the full workflow.
- FAILED: observed failure, with fix not yet acceptance-tested.
- NOT TESTED: no acceptable evidence available.
- HISTORICAL CLAIM: discussed in earlier chats but evidence not yet reconstructed; do not count as VERIFIED.

## Baseline evidence
| ID | Date | Area | Status | Evidence | Scope / retest rule |
|---|---|---|---|---|---|
| T-001 | 2026-11-19 | Live revised SignWell agreement record | VERIFIED | Supabase mpid_signwell_agreements contains document [private reference], status sent, test_mode false | Sending/recording only; not signature completion |
| T-002 | 2026-11-19 | Preserve original signed agreement | VERIFIED | Original document [private reference] remains completed | Database preservation; not external SignWell audit |
| T-003 | 2026-11-19 | Revised application pricing | VERIFIED | Application approved_price=500, agreement_status=sent, payment_status=not_requested, FAMILY_50_50 token | State at observation time |
| T-004 | 2026-11-19 | Cancel obsolete [amount] installment | VERIFIED | Supabase installment full [amount] status cancelled | Does not validate downstream notification suppression |
| T-005 | 2026-11-19 | Family-discount payment automation | FAILED | Inspected rsm_prepare_signed_payment and rsm_request_payment definitions; neither implements FAMILY_50_50 | Requires code fix and full acceptance test |
| T-006 | 2026-11-19 | Notification and agreement polling schedules | VERIFIED | cron.job lists active jobs at one-minute and five-minute intervals | Schedule exists; delivery success not established |
| T-007 | 2026-11-19 | Editorial processing end to end | NOT TESTED | mpid_processing_jobs, mpid_processing_qa, rsm_manuscript_edit_runs had zero rows | Do not infer end-to-end production success |
| T-008 | 2026-11-19 | Private editorial deliverables | PARTIAL | Eight rows pending_review in mpid_editorial_deliverables | Existence only; content/release quality unverified |
| T-009 | 2026-11-19 | Security / RLS | PARTIAL | 29 public tables reported RLS enabled | Policies and access paths not fully tested |
| T-010 | 2026-11-19 | Admin dashboard deployment | PARTIAL | GitHub file mpid-portal/admin-dashboard.html fetched successfully | Does not establish browser functionality |
| T-011 | 2026-11-19 | Full client journey | NOT TESTED | No verified unified acceptance run recorded | Required before production-readiness claim |

## Historical testing backlog
Earlier work reportedly included cross-author storage isolation, archive/restore, payment-link safety, editorial audits, SignWell templates, and dashboard changes. Retrieve exact evidence from GitHub/Supabase before adding verified test rows. Do not repeat unchanged tests simply because a new chat starts.

## Test record format for future work
| ID | UTC date | Feature | Status | Environment and version | Steps/input | Expected | Actual | Evidence locator | Retest trigger |
Record each significant test once. For a regression, add a NEW test row linked to the original rather than rewriting history. Never store secrets or client manuscripts here.


| T-012 | 2026-11-19 | Family payment preparation trigger deployment | PARTIAL | Migration prepare_family_50_50_deposit_only_after_signature succeeded; [private name] agreement remained sent and noncancelled installment count remained zero | Signature-trigger simulation and payment request end-to-end remain untested |

| T-013 | 2026-11-19 | Family payment request function deployment | PARTIAL | Migration support_family_50_50_payment_request_stages succeeded; inspected deployed function for family branch and link mapping; application still sent/not_requested | No live payment request made; isolated acceptance test and dashboard alignment pending |

| T-014 | 2026-11-19 | Family pricing payment overview source update | PARTIAL | GitHub commit 2bcc8af88b88e2912f811bb58def0d92730b9f48 | Browser/runtime and payment preview acceptance tests pending; no emails sent |

| T-015 | 2026-11-19 | Reusable family upfront backend deployment | PARTIAL | Supabase migrations support_reusable_family_upfront_signed_payment and support_reusable_family_upfront_payment_requests succeeded | No isolated transaction test or actual payment email; acceptance pending |
| T-016 | 2026-11-19 | Family payment preview guard changes | PARTIAL | GitHub commit 1b25c34f63e14168736055171a43ae3b031624f6 | Browser test and agreement generation pending |

| T-017 | 2026-11-19 | Reusable pricing review form source update | PARTIAL | GitHub commit 0331a0c413a526384350945da8ab70d4dc469351 | Browser acceptance and SignWell generalization pending; no real agreement sent |

| T-018 | 2026-11-19 | Generalized SignWell agreement function deployment | PARTIAL | mpid-signwell-agreements v42 ACTIVE; retrieved deployed source confirming family markers and validPricing; [private name] sent/not_requested unchanged | No live send, no browser acceptance, no template API runtime validation performed |

| T-019 | 2026-11-19 | Pricing-aware SignWell dashboard preview/readiness | PARTIAL | GitHub commit b189804a87387aa2a44a9095ad7c98be463af5c1 | Source update confirmed; browser runtime not verified; no emails sent |

| T-020 | 2026-11-19 | Reusable [amount] regular discount Bluevine link lookup | PARTIAL | Supabase migration reusable_regular_discount_payment_link_verified succeeded after rejected syntax attempt | No payment email or end-to-end runtime test; authorization/duplicate guards retained |

| T-021 | 2026-11-19 | Discount link inventory and dashboard mapping | PARTIAL | Supabase live select: active [amount] full, [amount] full, [amount] initial and [amount] milestone; dashboard commit e0135933e6d13a7576e88512bcfcc2e34cdf8eb5 | Live link records verified; UI/browser runtime not tested; [private name] sent/not_requested unchanged |

| T-022 | 2026-11-19 | Family final installment premature-send protection | PARTIAL | Supabase migration block_family_final_until_completion_release_gate succeeded; dashboard commit 316d5ed2abc30678fc5a3224a0386886e0390cf4 | Source guards installed, no live payment request made; runtime rejection test and verified completion release gate outstanding |

| T-023 | 2026-11-19 | Audited family final completion approval | PARTIAL | Supabase migration audited_author_linked_family_final_approval succeeded | Schema and RPC deployed; no runtime approval/rejection acceptance run; dashboard send intentionally disabled |

| T-024 | 2026-11-20 | Family final approval dashboard integration | PARTIAL | Supabase migration admin_family_final_readiness_rpc; GitHub commit 75dedfdcec9856e32eb20f795b883b699d6ccb56 | Code deployed; no real approval/payment sent; browser JS and isolated negative/positive runtime tests pending |

| T-025 | 2026-11-20 | Existing SignWell signer diagnostics | PARTIAL | Edge Function v43 ACTIVE; dashboard commit d040bc71ed28265a2e99a237acfba7f9e24447b2 | Read-only inspection deployed, no invitation sent; authenticated runtime and delivery evidence pending |

| T-026 | 2026-11-20 | Family final-payment authorization negative test | VERIFIED (limited) | Live Supabase SQL invoked `rsm_family_final_readiness` without authenticated admin context; rejected `P0001 Administrator required`; active approvals count zero; anon EXECUTE false for readiness, approval and request RPCs; approval table RLS enabled | Does not verify authenticated browser flow, approval success, or SignWell email delivery |

| T-027 | 2026-11-20 | Agreement guidance and family readiness batching | PARTIAL | GitHub dashboard commit d10fe1e956d1dda144c6155f73c11ee81284fea5 | Source change deployed; browser runtime and authenticated end-to-end checks not yet verified |

| T-028 | 2026-11-20 | Completed-project selector for family final approval | PARTIAL | GitHub commit 9f16f90185cb9fb4ec5e77d6753a0d17c6d8587d | Source deployed; browser interaction and authenticated approval tests outstanding |

| T-029 | 2026-11-20 | Author-scoped completed project selector | PARTIAL | Supabase migration family_final_author_scoped_completed_project_selector succeeded; dashboard commit b3a058406bd171919e2351eaf3f50908aeae735a | Schema verified and code deployed; authenticated browser acceptance outstanding |

| T-030 | 2026-11-20 | Author-scoped selector RPC permission check | VERIFIED (limited) | Live pg_proc grants: anon EXECUTE false, authenticated EXECUTE true; source confirms internal mpid_is_admin guard | Authenticated positive and browser runtime remain unverified |

| T-031 | 2026-11-20 | Author-signed RSM-pending dashboard indication | PARTIAL | GitHub commit d7999c5e27398113e4fe79998978c7771fd91427 | Source deployed; SignWell authenticated runtime and email notification integration not tested |

| T-032 | 2026-11-20 | SignWell signer observation persistence | PARTIAL | Supabase migration signwell_signer_observations_held_notifications; Edge Function v44 ACTIVE | Schema and deployment succeeded; authenticated recipient observation, event insertion and notification delivery unverified; no email sent |

| T-033 | 2026-11-20 | Author signature notification queue and Resend template | PARTIAL | Migration author_signed_notification_queue_admin_gated succeeded; notification function v13 ACTIVE; dashboard commit 6afe58af6033ac4cafb213ed9334c69766cce75e | Code deployed, no event queued or email sent; authenticated recipient status and worker acceptance pending |

| T-034 | 2026-11-20 | Admin queue control for author-signed notification | PARTIAL | SignWell Edge Function v45 ACTIVE; dashboard commit 625ddc7ce11e889a1bf4e15bc2b3acc90bb3d062 | Code deployed; authenticated SignWell and Resend delivery acceptance pending; no live notification sent |

| T-035 | 2026-11-20 | Dashboard JavaScript syntax smoke check | FAILED | Retrieved live GitHub admin-dashboard.html and attempted JavaScript compilation of full inline script using Function constructor | Full script reports SyntaxError Invalid or unexpected token; isolated SignWell inspection handler compiled successfully. Browser functionality not verified. Must identify and repair full-script issue before acceptance. |

| T-036 | 2026-11-20 | HTML structural integrity check | FAILED | Live GitHub file contains 151077 characters after first closing html, including duplicate document ending | Requires reconstruction and full syntax validation before deployment |

| T-037 | 2026-11-20 | Dashboard source repair static validation | PASS (source syntax only) | Commit cac141fd9094de56522ea0a68141433b0ec1b266; fetched revised file and compiled full inline JavaScript; single closing HTML document | Authenticated browser workflow and payment/SignWell runtime tests still pending |

| T-038 | 2026-11-20 | Signature notification live read-only checks | VERIFIED (limited) | SQL: 0 signer events, 0 queued notices, 0 active family final approvals; anon RPC EXECUTE false. Dashboard commit e18e2dfe308748fbc7736a6692419079e6f1b02e syntax compiled | SignWell recipient payload, authenticated dashboard and email delivery not tested |

| T-040 | 2026-11-20 | SECURITY DEFINER exposure review (read-only) | VERIFIED limited | All 12 flagged functions deny anon EXECUTE; all contain mpid_is_admin references; storage helper also gates non-admin by mpid_can_view_project. No changes made | Requires negative permission tests for non-admin authenticated users and leaked-password protection |

| T-041 | 2026-11-20 | Simulated authenticated non-admin negative RPC tests | PASS (four functions) | mpid_is_admin false; payment request, payment verification, family-final approval, signature notice each returned explicit admin-required SQL exception; failed transactions rolled back | Other privileged functions and actual client auth session not yet tested |

| T-042 | 2026-11-20 | Remaining privileged RPC negative authorization checks | PASS (simulated non-admin) | Five restricted RPCs rejected; project and storage checks returned false for nonexistent resources | Actual non-admin JWT, existing project cross-user tests and password protection configuration pending |

| T-043 | 2026-11-20 | Signed-agreement payment preparation, no-send | PASS (live backfill and state verification) | Migration rsm_signed_payment_dispatch_draft_no_send succeeded; [private name] [amount] initial dispatch draft awaiting_authorization; 0 request rows for installment; 0 new payment outbox rows | Future agreement insert trigger not exercised in isolated test; admin UI display and delivery flow pending |

| T-044 | 2026-11-20 | Isolated automatic held dispatch draft trigger | PASS | Synthetic approved signed family application plus [amount] installment generated exactly one draft; transaction rolled back. [private name] held [amount] draft remains and payment request count 0 | Actual email dispatch intentionally not authorized |

| T-045 | 2026-11-20 | Held payment draft dashboard source integration and non-admin RLS | PARTIAL | Dashboard commit 4a9819b2a413dd4887b671504e0fe7f8e3d63d79; admin SELECT policy; simulated non-admin sees zero drafts; one HTML terminator and script block | Browser acceptance and full JS compilation not yet verified; no client email sent |

| T-046 | 2026-11-20 | Payment dispatch draft lifecycle guard | DEPLOYED, NOT TESTED | rsm_payment_dispatch_draft_lifecycle_guard migration applied; future payment approval notification still pending | Requires isolated rollback test, secure admin approval workflow, email notification delivery verification |

| T-047 | 2026-11-20 | Held payment draft lifecycle cancellation guard | PASS (transaction rolled back) | Live Supabase: BEGIN; temporarily changed the one held [amount] initial installment from not_requested to cancelled; asserted matching draft became superseded; ROLLBACK; subsequent SELECT confirmed installment not_requested, draft awaiting_authorization and approval notice held | This validates cancelled transition only. Other terminal states and authenticated browser approval flow remain untested; no payment request or email sent. |

| T-048 | 2026-11-20 | Held draft Approve & Send dashboard control | DEPLOYED, UNVERIFIED | GitHub commit 97759d369ec4a26fd72dd1a428c0f14615e466f0; source adds signed/approved gate, admin confirmation, draft re-read and existing server RPC | Authenticated browser JS/runtime acceptance and payment delivery unverified; no live request sent |

| T-049 | 2026-11-20 | Existing request duplicate-send UI clarity | DEPLOYED, UNVERIFIED | GitHub commit 66eec2915fac92cc46c82058434a378ef674837d; hides send button if request history exists and displays delivery status | Browser rendering still pending; provider acceptance is not recipient delivery; no new payment sent |

| T-050 | 2026-11-20 | Confusing payment action correction | SOURCE DEPLOYED, BROWSER UNVERIFIED | GitHub 6aa2814b2000686ee9ef367197996de27bf18092; hides family final stage until completion approval and alternate send for held drafts; live SQL confirms initial request accepted | Browser cache/runtime pending; no new request sent |

| T-051 | 2026-11-20 | Admin payment approval notification wiring | DEPLOYED, END-TO-END PENDING | Migration queue_admin_payment_approval_notice + mpid-send-notification v14; existing queued count 0 | Future eligible signed application required for delivery confirmation; no author payment sent |

| T-052 | 2026-11-20 | Verified-payment onboarding readiness foundation | MIGRATION APPLIED, INTEGRATION PENDING | security_invoker view rsm_onboarding_readiness gates readiness on signed agreement and paid fully verified initial/full installment | No live invitations or projects created; dashboard integration pending |

| T-053 | 2026-11-20 | Publishing dashboard workflow order source | SOURCE VERIFIED, BROWSER UNVERIFIED | Main commits c22c1f2b33a5234985a3dfdd7553b27ff842a7b5 and 494b4bc09bbf38ae1c50db7cf2a0fbccdee0d836; fetched workflow JS confirms applicationCenter immediately followed by authorInvitations and applicantManuscriptCenter | Authenticated visual/layout and interactive controls must be tested before marking end-to-end complete |
| T-054 | 2026-11-20 | [private name] agreement/payment status reconciliation | VERIFIED (database state only) | Read-only Supabase mpid_author_applications and mpid_payment_installments: signed agreement, approved [amount] payment_status=requested, [amount] initial installment requested, [amount] verified, historical [amount] installment cancelled | Payment receipt not verified; do not resend request or unlock onboarding; provider acceptance is not proof of customer receipt |
| T-055 | 2026-11-20 | Payment approval implementation vs full acceptance | PARTIAL | Dashboard source contains Approve & Send Payment Link and rsm_payment_dispatch_drafts; previous T-048/T-051 record deployed source and notification wiring | Authenticated UI, future signed-agreement notification delivery, retries and duplicate prevention remain unverified; no new message sent |

| T-056 | 2026-11-20 | Verified-payment onboarding queue foundation | PARTIAL, DEPLOYED | Supabase migration prepare_onboarding_jobs_after_verified_payment_no_send succeeded; read-only query: trigger_count=1, rls_enabled=true, queued_jobs=0, [private name] onboarding_state=awaiting_verified_payment | No positive paid test, no worker/invitation/project integration, no email sent; must not mark end-to-end complete |

| T-057 | 2026-11-20 | Onboarding worker v4 payment-stage guard | DEPLOYED, PARTIAL | Supabase function rsm-onboarding-worker v4 active; independent post-deploy SQL jobs=0, [private name] awaiting_verified_payment, active cron=1 | Positive paid path, duplicate/retry and browser acceptance not verified; no email sent |

| T-058 | 2026-11-20 | One project per application idempotency | DEPLOYED, PARTIAL | Unique partial index verified=1; rsm-onboarding-worker v5 active; jobs=0 and [private name] projects=0 | No positive isolated paid-path or email retry test yet |

| T-059 | 2026-11-20 | Transactional onboarding queue tests | PASS | Rolled-back SQL fixture: unpaid blocked; [amount] paid queued once; repeat payment update no duplicate | Worker/email path not exercised |
| T-060 | 2026-11-20 | Incorrect deposit negative test | FAIL then FIXED and PASS | [amount]/500 incorrectly queued through obsolete rsm_prepare_onboarding_after_payment trigger; migration removed it; rerun [amount] blocked, [amount] queued, duplicate job rejected | No customer invitation |

| T-061 | 2026-11-20 | Service-role project creation and duplicate guard | FAIL then FIXED, PASS | Original SQL fixture failed null actor_id in mpid_project_activity. Migrated trigger to fallback author_id with automated-event label; retest project insert PASS, duplicate unique guard PASS, rollback PASS | Worker invitation/email not exercised |

| T-062 | 2026-11-20 | Manuscript queue contract-specific payment gate | PASS isolated logic, runtime pending | v17 active; eight read-only SQL pricing scenarios PASS, code inspection verifies preflight/start/resume gates | Not a live authenticated processing run |


| T-063 | 2026-11-21 | Stripe live destination and signing secret | PARTIAL | Stripe GET webhook endpoints: destination enabled, payment_intent.succeeded, correct function URL; Vault named secret exists, whsec_ format true, service_role RPC access true; Edge Function v3 active | No new Stripe webhook delivery observed; no signed-event end-to-end acceptance |
| T-064 | 2026-11-21 | Office notification event constraint repair | VERIFIED isolated | Initial real admin verification failed on mpid_notification_outbox_event_type_check; migration allow_office_operational_notification_event_types applied; rollback-only insert accepted all three operational event types | Outbox processor mail delivery separate |
| T-065 | 2026-11-21 | [private name] [amount] authenticated Stripe payment verification | VERIFIED | Admin confirmed successful dashboard popup; independent Supabase query: installment paid, amount_verified=250.00, Stripe reconciliation=verified, application=partially_paid; project exists onboarding | Does not establish automatic payment crediting or manuscript processing |
| T-066 | 2026-11-21 | Payment verification notification | PARTIAL | mpid_notification_outbox payment_verified_admin status sent, last_error null | Recipient mailbox delivery not independently verified |


| T-067 | 2026-11-21 | [private name] intake manuscript to project handoff | PASS live storage/database | Onboarding worker v6 ACTIVE; copied original PDF from mpid-applicant-manuscripts to mpid-manuscripts/projects/<project-id>/source-manuscripts/<request-id>/; project mpid_documents row [private reference] exists with original filename; intake original retained | Browser dashboard refresh and future onboarding acceptance pending |


| T-068 | 2026-11-21 | Publishing Projects manuscript visibility | PASS administrator UI observation | User confirmed Files=1 after dashboard refresh; independent SQL confirmed source manuscript document | Does not verify manuscript download or editing |
| T-069 | 2026-11-21 | PDF manuscript engine compatibility | BLOCKED identified by source inspection | rsm-manuscript-queue extracts DOCX via mammoth but falls back to file.text() for PDF; no PDF parser; [private name] source is PDF | Must implement validated PDF extraction before editing; no run initiated |


| T-070 | 2026-11-21 | PDF extraction support deployment | DEPLOYED, RUNTIME PENDING | rsm-manuscript-queue v20 ACTIVE; PDF.js extraction added with page-level low-text rejection; existing DOCX/TXT/MD branches retained | Authenticated preflight, real PDF extraction, document fidelity, editor QA and publication release not tested |


| T-071 | 2026-11-21 | [private name] preflight contract records | PASS database inspection | Approved application, signed agreement, matching Publish-Ready project, [amount] family pricing and active manuscript, zero editing runs; verified [amount] installment from T-065 | Authenticated endpoint preflight pending |
| T-072 | 2026-11-21 | Read-only PDF extraction preflight | DEPLOYED, RUNTIME PENDING | rsm-manuscript-queue v21 ACTIVE; preflight downloads PDF and attempts PDF.js text extraction with minimum readability checks, no editing run created | Authenticated browser invocation and extraction quality review required |


| T-073 | 2026-11-21 | Dashboard processing section placement | SOURCE UPDATED, UI PENDING | GitHub admin-dashboard.html commit 07d1eea moved existing editing section immediately after Publishing Projects and corrected PDF capability copy | Live browser rendering and selected-project continuity not yet verified |

| T-074 | 2026-11-21 | Manuscript preflight prerequisite reconciliation | PARTIAL, AUTHENTICATED PREFLIGHT PENDING | Live SQL read-only project/document count confirms one registered manuscript for [private title]; deployed rsm-manuscript-queue v21 ACTIVE. Connector get_edge_function returned Failed to retrieve function bundle. | No authenticated PDF preflight, extraction fidelity, or author release tested; no data mutated. |

| T-075 | 2026-11-21 | Manuscript preflight diagnostic UI source | SOURCE/SYNTAX PASS, RUNTIME PENDING | GitHub commit 3ca986fed0df2196d0a90ca74ce6ee733d95ea03; full inline JavaScript Function compilation PASS; single HTML document terminator PASS | Authenticated runtime PDF extraction and displayed metrics not verified; no editing run initiated |

| T-076 | 2026-11-21 | Direct manuscript project selector | SOURCE/SYNTAX PASS, BROWSER PENDING | GitHub commit 17f9922e432c45b036630c1bb00d5c4e612fa762; selector now inside processing panel, synchronizes project and auto-loads unique matching approved application/manuscript; full inline JS syntax compilation PASS | Authenticated UI and PDF preflight pending; no editing or author release |

| T-077 | 2026-11-21 | Preflight missing choices and legacy test cleanup | SOURCE/SYNTAX PASS, BROWSER PENDING | Commit 4fb71f160cded8fb5b7fa837566a0051f6a86cde; direct application_id lookup, unique manuscript selection, preflight self-loading; obsolete Perfect Marriage test panel hidden; full inline JavaScript syntax compilation PASS | Authenticated preflight and PDF extraction not yet executed; no customer communications |

| T-078 | 2026-11-21 | [private name] authenticated readiness preflight | PASS FOR SEVEN REPORTED GATES; EXTRACTION FIDELITY UNVERIFIED | Administrator reported live dashboard 'Preflight passed' and seven PASS checks covering project/application, source, approval/scope, title/package, signed agreement, verified commencement payment, supported input type | No page/word count shown; PDF extraction fidelity and manuscript editorial outputs still require acceptance |

| T-079 | 2026-11-21 | Submission notification pending item diagnosis | LIVE SQL PASS, UI SOURCE/SYNTAX PASS, BROWSER PENDING | Exactly one active document: [private name] original PDF; reviewed_at null. Dashboard commit 98e4c8c1b47e87db7c549e009bbc3c9ffa9ea091 clarifies receipt acknowledgment and filters hidden test projects; JS syntax PASS | Did not mark document reviewed; no manuscript editing or author release |

| T-080 | 2026-11-21 | [private name] submission receipt acknowledgment | LIVE PASS | Administrator reported 'Submission marked as reviewed'; SQL verified reviewed_at=2026-11-22 03:57:24.045+00 on original PDF | Intake acknowledgment only, no editorial QA or author release |

| T-081 | 2026-11-21 | Private editing start source handoff | SOURCE/SYNTAX PASS, RUNTIME PENDING | Dashboard commit fbdc1fae9e17b548b2345a738beb8c3a72b55be8 makes start self-load linked application/source and fixes misleading next-button wording; inline JS syntax PASS | No editing run started; API usage and PDF extraction fidelity not verified |

| T-082 | 2026-11-21 | Simplify active manuscript processing buttons | SOURCE/SYNTAX PASS, BROWSER PENDING | Commit 3129b41c8eeb767a4b85ee79b7ee2ab7ad9122be; removed obsolete buttons from visible UI by hiding (preserving handlers); ordered active steps 1/2/3; inline JS syntax PASS | Authenticated browser flow and draft processing not tested |

| T-083 | 2026-11-21 | Draft workflow state-aware controls | LIVE SQL + SOURCE/SYNTAX PASS, BROWSER PENDING | SQL confirms zero edit runs for [private name]; dashboard commit ea1e6a9e983e9221382556d7b93dd71f8ab1dff4 disables Continue when no active run and Start when active run exists; JS syntax PASS | Authenticated browser state and PDF extraction not verified |

| T-084 | 2026-11-21 | Single project selector manuscript workflow | SOURCE/SYNTAX PASS, BROWSER PENDING | Commit 428d0bdd32879229513278edc8ea58b0893b4b51 hides duplicate selector and wires main Select project to load manuscript and run progress; JS syntax PASS | Full dashboard-wide scoping of all sections still requires audit |

| T-085 | 2026-11-21 | Selected project persistence and publishing table scope | SOURCE/SYNTAX PASS, BROWSER PENDING | Commits d78896f9e32874179153e77adf1ccca07f3f0c7b, ee75aa4deb41aa1276a142097bdf098c798d68d9; project selection retained per browser session, table filtered and rerendered on change, manuscript loaded on refresh; inline JS syntax PASS | Other dashboard sections may still contain global queues; browser acceptance needed |

| T-086 | 2026-11-21 | Canonical project selection across project controls | SOURCE/SYNTAX PASS, BROWSER PENDING | Commit a4a69e518c0ebb0b84ce562308c2431892adeaf9; upload/findings/checklist project selectors dispatch canonical change; checklist synchronized; inline JS syntax PASS | Remaining global intake/notification queues intentionally not scoped; runtime testing pending |

| T-087 | 2026-11-21 | Single-action manuscript processing workflow | SOURCE/SYNTAX PASS, RUNTIME PENDING | Reviewed Supabase queue v21 and dashboard commit d8a0ed912981f30dbd521efaf8040d8add0a19b5; new Process Private Manuscript creates/resumes private run and processes segments, with explicit paid API confirmation; JS syntax PASS | No authenticated invocation, editing output, or author release tested |

| T-088 | 2026-11-21 | Manuscript start failure diagnostic | LIVE SQL + SOURCE/SYNTAX PASS, RUNTIME PENDING | Live project/application/manuscript linkage confirmed; zero edit runs. Commit fb1feec5e0b20cf3317132d9f1d23ab6aa031c0a surfaces Supabase start error and prevents refresh masking it; inline JS syntax PASS | Exact runtime failure still unknown; authenticated invocation needed |

| T-089 | 2026-11-21 | Live manuscript source selection | SOURCE/SYNTAX PASS, RUNTIME PENDING | Replaced cached document lookup with live mpid_documents query; commit 234c253bbf82f9caca6383c44c3c0ef67c5c8c33; JS syntax PASS | No authenticated start or AI processing verified |

| T-090 | 2026-11-21 | Private local [private name] editorial working artifacts | FILE GENERATION PASS, FINAL EDITORIAL QA PENDING | Recovered source PDF from accessible project files, generated DOCX working draft and separate report, rendered 24 and 2 pages respectively; original source untouched | Not a complete professional copyedit; portal run absent; author release prohibited |

| T-091 | 2026-11-21 | Live PDF manuscript engine bug fix | DEPLOYMENT PASS, PROCESSING PENDING | Supabase rsm-manuscript-queue v22 ACTIVE, PDF preflight regex and word split corrected; JWT/admin/payment safeguards retained; dashboard commit 2c2d38a174775fa87ee65552b4cd0a9556f1e80f shows completed files in review center; JS syntax PASS | Live SQL still zero [private name] editing runs, no runtime edit completion verified |

| T-092 | 2026-11-21 | Approved [private name] manuscript auto-start integration | SOURCE/SYNTAX PASS, AUTHENTICATED RUNTIME PENDING | Commit 504f4bcc439f2781397c9521ca3e325256233ed2; authenticated dashboard refresh attempts previously authorized private editing for exact [private name] project; no duplicate start for review/failed runs, session repeat suppressed, release remains admin gated | Requires browser session execution and verification of staged deliverables |

| T-093 | 2026-11-21 | [private name] PDF cover-page extraction fix | ROOT CAUSE VERIFIED; DEPLOYMENT PASS; END-TO-END PENDING | Observed user error page 1 under 15 characters, no run. Inspected engine source, changed per-page fatal threshold to document-level minimum, deployed `rsm-manuscript-queue` v23 ACTIVE, verify_jwt=true. | Need authenticated retry and completed private draft/report verification |

| T-094 | 2026-11-21 | [private name] 13/13 finalization repair | PASS: RUN RECOVERED TO REVIEW; QA PENDING | Logs showed 13/13 complete, private DOCX and report storage uploads HTTP 200, editorial deliverable registration HTTP 201, final run PATCH HTTP 400. Trigger attempted unsupported `manuscript_review_ready_admin` event. Applied event-type constraint migration, verified allowed event, conditionally updated run [private reference] to `review`/`needs_review` with 13/13; SQL RETURNING verified. | No author release; substantive editorial and publication QA remain |

| T-095 | 2026-11-21 | Private editorial deliverable visibility | DATABASE PASS, JS SYNTAX PASS, BROWSER PENDING | Live DB confirms 2 pending_review [private name] deliverables and admin-only RLS; dashboard commit 5155c8b6e3f561d91f9f6f73f8b8b8eeee3a452a invokes stageLoad during refresh and displays errors rather than silent blank list. | Must confirm actual browser lists/downloads both files; no release |

| T-096 | 2026-11-21 | [private name] editorial report DOCX formatting | SOURCE SYNTAX PASS, LIVE GENERATION PENDING | Commit cc6218274185fa51522c2ff4ff9235670842f86c adds project-scoped Word report conversion and private staging; inline JavaScript parsed successfully. | Need browser generation, download, document inspection; no author release |

| T-097 | 2026-11-21 | Editorial report quality acceptance | FAIL | User-provided DOCX report is concatenated segment notes, lacks chapter-specific findings, factual verification, and actionable author questions; contains unverified KDP claim. Engine source confirms raw `editorial_notes` concatenation. | Block author release; redesign substantive report generation and QA |

| T-098 | 2026-11-21 | Integrated private editorial assessment | SOURCE SYNTAX PASS; LIVE PENDING | GitHub commit 99973ad0b7bf89f4b3ab0ed7dd0367b18ffcae9d; 13-segment source-linked Word report generator and loading state correction | Verify browser generation, private upload, report content, download, admin QA and no release |

| T-099 | 2026-11-21 | Package-aware editorial report and change register | SOURCE SYNTAX PASS; LIVE PENDING | Commit a73f17d323d6821e1a0880edb3f19157c05b6b28; confirmed live project package Publish-Ready; source-vs-edited changed regions added | Verify signed package criteria, complete per-edit change tracking, report readability and browser generation |

| T-101 | 2026-11-21 | Private editorial review clutter cleanup | SOURCE SYNTAX PASS; LIVE PENDING | DB confirmed current DOCX assessment, edited DOCX draft and two obsolete report artifacts; dashboard commit 5620ae203cceb8cc55c426b9e52e42d66d3b84a9 hides obsolete report rows without deleting data | Verify two active review rows render and permitted actions work; no release |

| T-102 | 2026-11-21 | Detailed author-facing editorial findings | SOURCE SYNTAX PASS; LIVE PENDING | Commit 6678afd20366c7f836ac190b645976378a997b5c adds clear original/RSM done/author action/next step/status fields to private generated DOCX | Generate via dashboard, inspect passage-specific instructions and complete per-change traceability before author release |

| T-103 | 2026-11-21 | Automatic private deliverables loading | SOURCE SYNTAX PASS; LIVE PENDING | Commit ebe4053997028aa13f33679a7809bd1fa7b9ef54 hides refresh control and triggers stageLoad on project selection | Verify project switching, history refresh, error display and no duplicate requests in browser |

| T-104 | 2026-11-21 | Automatic editing stage from manuscript activity | DATABASE PASS | Supabase migration sync_publishing_project_editing_from_editorial_work applied; live [private name] project changed onboarding to editing; run remains review/needs_review, 13/13 segments; no author release | Test insert/update triggers on safe test records and future stage gates |
| T-105 | 2026-11-21 | Dashboard progress synchronization | SOURCE SYNTAX PASS; BROWSER PENDING | Commit 3697879f0d6b17df5603d4c3f5b42cb4a899941e: live project status fetch, realtime subscription, manual override disclosure | Verify actual browser progress, project switching, realtime events and fallback behavior |

| T-106 | 2026-11-21 | Editorial Audit Management Center integration assessment | DATABASE GAP CONFIRMED; DASHBOARD SOURCE SYNTAX PASS; BROWSER PENDING | [private name] has 13/13 processed segments, QA needs_review, zero `mpid_audit_findings`, zero `mpid_approvals`, five pending private deliverables. Commit d6c8ff735b5d849be5a84f76bad0b191430e70ee displays live evidence and warning; removes redundant refresh. | Integrate validated segment findings with central audit and checklist, verify dashboard live |

| T-107 | 2026-11-21 | Engine-to-audit source-linked ingestion | MIGRATION VERIFIED; DASHBOARD SYNTAX PASS; AUTHENTICATED END-TO-END PENDING | Supabase migration register_source_linked_manuscript_uncertainties created RPC/source table; GitHub commit 38a6aebcd01a118a6c6f3d45f8106a8aa54658f3 calls RPC during refresh. [private name] central findings remain 0 before authenticated dashboard invocation. | Verify admin refresh creates source-linked findings, repeated refresh is idempotent, audit displays correct count, no spurious author checklist/release |

| T-108 | 2026-11-21 | Live [private name] source-linked audit registration | DATABASE VERIFIED; BROWSER PENDING | 5 provisional open findings registered; 5 distinct segment source links; 0 author checklist items. Dashboard commit 7003c7939971ac1571c8cbe830009beca9d1f503 removes refresh-time RPC and [private name]-specific auto-start. Inline JS syntax PASS. | Verify browser displays five findings and current workflow state; editorial QA must distinguish true issues from chunk-boundary artifacts |

| T-109 | 2026-11-21 | Author portal lifecycle and real-time gap | SOURCE AND DATABASE VERIFIED; REALTIME NOT IMPLEMENTED | `mpid-portal/author-dashboard.html` exists, shows assigned projects and released checklist, but no realtime subscription/polling. [private name] has assigned author role/project; application signed, partially paid, portal invitation timestamp populated. Invitation acceptance/login not proven. | Verify author sign-in, RLS, status updates, released-only file access and no lost draft responses; implement realtime safely |
| T-110 | 2026-11-21 | Cross-workflow no-regression gate | POLICY ADOPTED; TESTS PENDING | Future releases must verify agreement/payment, invitation, manuscript source, admin/author dashboards, audit/checklist, storage permissions and release controls before calling complete | Build one repeatable automated acceptance suite with safe fixtures |

| T-111 | 2026-11-21 | In-portal author onboarding guide | SOURCE COMMITTED; BROWSER PENDING | Commit 78f1976c4204aa7f402b813ec4ed208570922fe1 inserts six-section static guide in authenticated author dashboard without editing its existing module script; no email sent. | Verify author login, guide visibility, responsive layout, checklist/upload operation and restricted file access |

## 2026-11-22 | Verified live intake/readiness checkpoint
- PASS database: rsm_register_manuscript_intake trigger exists; [private name] original manuscript has one intake job, awaiting_assembly; duplicate guard unique(source_document_id). Admin-only read policy installed.
- PASS database: rsm_editorial_project_readiness view returned [private name] foreword 0, awaiting assembly 1, open findings 5, pending private deliverables 5, released 0, QA review runs 1.
- NOT TESTED: automatic assembly, background editing, page-specific findings generation, KDP export, end-to-end author browser access. No claims of these passing.

## 2026-11-22 | T-112 live resumption readiness inspection
- **PASS, READ-ONLY DATABASE AND DEPLOYED SOURCE INSPECTION; END-TO-END BLOCKED.** Live `rsm_editorial_project_readiness` for [private name] returned editing, registered_forewords=0, awaiting_assembly=1, unresolved_findings=5, pending_admin_deliverables=5, released_deliverables=0, qa_review_runs=1. `rsm-manuscript-queue` v23 ACTIVE and verify_jwt=true; source starts from original manuscript document and has no foreword assembly path. No processing, release, external sends, or migration performed. Next: register actual foreword and implement versioned assembly before another run.

## 2026-11-22 | T-114 integrated manuscript assembly
- PASS local DOCX creation and render: recovered Colonel [private name] foreword integrated into a copy of [private name] candidate v7 after title and before Contents; 546 foreword words; contents entry added; rendered PDF text confirmed page sequence title -> foreword -> contents. LIMITATION: source candidate carries historical title; no Supabase upload, no editorial QA approval, no author release.

## 2026-11-22 | T-116 continuity of seven-stage operational handoff
- DOCUMENTATION ONLY: user provided exact previously approved seven-stage dashboard order and finding-status semantics (Open, In Progress, Resolved, Waived). Recorded as requirements, NOT deployment or browser test. Local foreword integration previously verified T-114. No new runtime tests or client actions. Outstanding: private Supabase version registration, end-to-end revision processing, seven-stage dashboard deployment and QA.

## 2026-11-22 | T-117 dashboard workflow ordering source check
- PASS: fetched committed `mpid-portal/rsm-workflow-order.js`, compiled JavaScript syntax successfully, seven named stage labels present. Presentation-only DOM moves preserve original element objects. NOT TESTED: authenticated browser rendering, full panel mapping, responsive display, end-to-end release controls. No client actions.

## 2026-11-22 | T-118 panel mapping source inspection
- PASS source inspection: identified actual HTML panel IDs/headings; corrected author checklist/private release into stage 5 and operations into stage 1. JS compilation PASS. Browser event behavior NOT TESTED. No external sends.

## 2026-11-22 | T-119 dashboard navigation source validation
- PASS: deployed workflow-order JS compiled with Function constructor, seven stages and anchors defined; verified existing dashboard source includes the external script and workspace container. NOT VERIFIED: browser DOM positioning, mobile rendering, authenticated administrator workflows or author access. No client records touched.

## 2026-11-22 | T-120 project next-action view
- PASS migration execution and read-only SQL query for [private name]: `workflow_step=manuscript_assembly`, `awaiting_assembly=1`, `unresolved_findings=5`, `pending_admin_deliverables=5`. Dashboard panel and placement committed, NOT browser tested. No processing run, upload, author release or communication.

## 2026-11-22 | T-121 assembled document intake trigger
- PASS migration applied for assembled manuscript recognition and `ready_for_processing` job creation on future `mpid_documents` inserts. Existing [private name] project read-only readiness remained `awaiting_assembly=1`, open findings 5, as expected because combined DOCX has not been uploaded. NOT TESTED: actual document upload, trigger execution with real assembled document, end-to-end editing or browser QA. No live client data modified.

## 2026-11-22 | T-122 private assembled manuscript upload endpoint
- PASS deployment metadata: `rsm-assembled-manuscript-upload` v1 ACTIVE, verify_jwt=true. PASS local combined manuscript exists (55KB). PASS live query: [private name] assembled document count 0, so no false upload claim. NOT TESTED: authenticated multipart request, storage policy compatibility, DB constraints, race handling, dashboard wiring or end-to-end editing. No client send.

## 2026-11-22 | T-123 admin intake connection
- PASS Edge Function v2 deployment status ACTIVE and verify_jwt true; PASS GitHub workflow-order JS syntax compilation after adding assembled DOCX upload panel; PASS source validation nonempty 9,298-character script, previous 4,506 characters. NOT TESTED authenticated browser upload, actual storage bytes, processing worker, author review. Manuscript source inspection shows legacy first-page title inconsistent with approved title.

## 2026-11-22 | T-124 latest assembled manuscript release gate
- PASS migration applied and live SQL verified [private name] has assembled=false, latest-version QA=false, findings resolved=false, approved deliverable=false, editorial release ready=false. PASS local candidate DOCX opens with python-docx, 226 paragraphs, corrected title and Foreword. NOT TESTED authenticated private upload or manuscript processing.

## 2026-11-22 | T-125 atomic latest-version job claim
- PASS migrations applied and function source read back from Supabase, including service-role guard, latest-version selection, private storage path restriction, FOR UPDATE SKIP LOCKED, status transition. NOT TESTED: invocation with actual assembled DOCX, worker execution, failure retry, browser acceptance. No author communication.

## 2026-11-22 | T-126 continuity verification of dashboard and [private name] gates
- PASS: GitHub read-only verification of dashboard HTML reference to `rsm-workflow-order.js` and Next Action Center; workflow script includes all seven ordered stages and Complete Manuscript Intake panel. Source SHA dashboard `50171c4ff4f7bc01aa39713787553198209ed478`, script `be28d5935e9fa3cd552b70ac857c7d77058bdbfd`.
- PASS: Supabase list-edge-functions reports `rsm-assembled-manuscript-upload` v2 ACTIVE, verify_jwt=true. PASS: live [private name] release-gate query returns four false conditions and editorial_release_ready=false.
- NOT TESTED: authenticated browser layout, upload execution, manuscript bytes in private storage, queue worker execution, annotation/page accuracy, author dashboard approval, final release, KDP-ready deliverable. No client notifications sent.

## 2026-11-22 | T-127 project records visual polish
- PASS: `rsm-workflow-order.js` modified with nonempty 13,605-character full source and JavaScript syntax compilation. GitHub commit `615f359002d24b58506238da579edcb9b73b578d`. CSS scoped to `#rsmProjectRecordPanel`; existing `#details` render and action handlers untouched. NOT TESTED: authenticated browser screenshot, responsive visual QA, duplicate audit across all dashboard sections.

## 2026-11-22 | T-129 duplicate summary cleanup
- PASS: JavaScript syntax validation and nonempty GitHub commit `9b7226ab3fac713b720aacc4e82e733cd52d6976`. Stage 2 retains file-management render and controls; CSS hides duplicate findings and approval summaries, leaving dedicated workflow panels authoritative. NOT TESTED: authenticated browser layout and behavior. No processing or storage changes.

## 2026-11-22 | T-130 dashboard-native report integration
- PASS: Supabase Edge Function deployed ACTIVE v1 with verify_jwt=true; PASS GitHub full workflow script committed with Stage 4 report controls and JavaScript syntax validation. NOT TESTED: authenticated report generation, storage registration, UI download, user approval, automated new manuscript editing, or final QA. Reports remain private and explicitly unapproved.

## 2026-11-22 | T-131 automatic dashboard report initiation
- PASS: GitHub source JS syntax validation and commit `fc3fb3833a8198a814cf1ee92a6ac7e561e26d26`. PASS: live database schema read confirms `mpid_editorial_deliverables` required fields and default pending_review status. NOT TESTED: authenticated browser report generation and storage insertion. No false completion claim.

## 2026-11-22 | T-132 report project selector synchronization
- PASS: GitHub workflow script JavaScript syntax compiled and commit `20ee4ffc19291ef8d83e84693d8416c0ba397866` saved. PASS: local assembled manuscript candidate exists. NOT TESTED: authenticated browser, report endpoint invocation, private storage upload, processing completion.

## 2026-11-22 | T-133 audit UI simplification and upload capability check
- PASS: workflow JS syntax validation and GitHub commit `21051144ba08d53800ba99252a86b1c216d39798`. PASS: local combined DOCX file exists. CHECKED: available Supabase connector tools do not provide private storage binary upload, and no authenticated admin browser session is available in current tool environment. NOT TESTED: live manuscript upload, browser UI, report generation, manuscript QA. No client release.

## 2026-11-22 | T-134 dashboard-only automation acceptance criteria recorded
- REQUIREMENT RECORDED, NOT PASSED: Existing project manuscript and foreword must be automatically assembled and processed within authenticated dashboard; source-linked editorial findings must show exact location, original and correction; report and edited manuscript must be private dashboard artifacts; admin/author approval and KDP QA gates must be enforced. No authenticated end-to-end execution has been demonstrated. Prior local DOCX/report creation and GitHub UI commits do not constitute a passing production test.

## 2026-11-22 | T-135 private source reconciliation
- PASS: SQL read verified [private name] original PDF, awaiting_assembly job, existing needs_review editing run; no registered foreword/assembled version. PASS: Supabase admin-authenticated source reconciliation Edge Function v1 ACTIVE and GitHub JS syntax validated/committed `9afc3e380d6f980f9db23e67299a2f84362429b8`. NOT TESTED: authenticated Edge Function invocation, storage folder discovery, source assembly, processing, final report or release.

## 2026-11-22 | T-136 private source assembly deployment
- PASS: Supabase `rsm-private-manuscript-assembly` v1 ACTIVE, JWT verification enabled; function source fetched and inspected; dashboard workflow JS syntax compiled before GitHub commit `57dedfa42d340561be7348ba08c7cba4ff8839bc`. NOT TESTED: authenticated invocation, private foreword discovery, PDF text extraction, DOCX output, registration, intake trigger, editorial worker or release. No QA pass claimed.

## 2026-11-22 | T-137 integrated foreword and automated preflight deployment
- PASS: private integrated foreword text inserted and read back (3,432 characters), RLS migration applied, assembly Edge Function v2 ACTIVE, source reconciliation v2 ACTIVE, mechanical editorial preflight v1 ACTIVE; GitHub JS syntax validated and committed `90986cb6288d51c60101905405a8ec5fbe069ab3`. FAIL/NOT COMPLETE: post-deployment live SQL shows only original PDF in `mpid_documents`, latest editing run still original PDF and `needs_review`. NOT TESTED: authenticated dashboard assembly/preflight execution, final source fidelity, full factual editorial review, KDP page layout, author release. No false test pass.

## 2026-11-22 | T-138 editing-run schema fix
- PASS: live information_schema shows `rsm_manuscript_edit_runs.application_id` and `approved_scope` NOT NULL; v1 lacked both. PASS: deployed `rsm-private-editorial-preflight` v2 ACTIVE with those fields, confirmed [private name] project application_id exists. NOT TESTED: authenticated function invocation, full editorial run, layout QA or release. Existing needs_review run and five pending deliverables remain. No pass claimed for manuscript completion.

## 2026-11-22 | T-139 release-gate constraint mismatch
- PASS: inspected live view requiring `status=completed` and `qa_status=passed`; inspected live check constraints allowing neither. PASS: applied migration extending allowed statuses; GitHub workflow JS syntax validated and committed `320b5491e6b8f908952548611899998ed9939a47`. PASS: read [private name] live release-gate booleans, all false. NOT TESTED: authenticated manuscript assembly, processing, substantive editorial QA, KDP print proof, admin/author release. No false completion claim.

## 2026-11-22 | T-140 dashboard-native report viewing
- PASS: JavaScript syntax validation of `rsm-workflow-order.js` after inline TXT report preview and Stage 4 project auto-processing changes; GitHub commit `65626d5cc6aafa10239c1191294dc99e662b0cd9`. NOT TESTED: authenticated browser rendering, private report retrieval, source assembly, editorial preflight, KDP production or author release. No release or author notification performed.

## 2026-11-22 | T-141 editor integration
- PASS: live application status read (approved, signed, partially_paid, Publish-Ready approved scope). PASS: Supabase `rsm-manuscript-editor` v8 deployed ACTIVE with assembled manuscript support and private report registration. PASS: dashboard JS syntax checked and GitHub commit `99bd2945ac00005e502d13c196a4ecd7ceb41506`. NOT TESTED: authenticated browser execution, payment-installment gate at runtime, source DOCX editing, generated findings with exact location, print proof and author release. Do not mark end-to-end acceptance passed.

## 2026-11-22 | T-142 live payment and automatic run state
- PASS: queried live [private name] installment, verified paid [amount] of [amount] and cancelled [amount] legacy item. PASS: deployed source reconciliation v3 ACTIVE with report_storage_path in latest run response to support idempotent dashboard processing. FAIL/INCOMPLETE: live document table still original manuscript only. NOT TESTED: authenticated dashboard function execution, manuscript assembly, final editorial QA, KDP proof or author release.

## 2026-11-22 | T-143 source-located editorial findings panel
- PASS: verified live `mpid_audit_findings` column names and dashboard JavaScript syntax after adding read-only source location cards. GitHub commit `2255594782cbd7c9fa6d65a698e807141221a4dd`. NOT TESTED: authenticated browser display, source-location correctness of existing findings, manuscript processing, print proof and author release. Missing location values are labeled rather than invented.

2026-11-22: Editorial dashboard private findings export added in commit 352781536e74a1c7e97569b958848372c1540725. JavaScript syntax validated; authenticated UI and end-to-end editorial processing remain unverified. No author release or notification.

## 2026-11-22 | Editorial acceptance status reconciliation
- VERIFIED: Stage 4 findings display and private report export committed in GitHub; JavaScript syntax previously validated.
- NOT VERIFIED: authenticated dashboard operation, original PDF text extraction and foreword assembly, substantive editorial processing, page/paragraph accuracy, KDP-ready output, administrator approval-to-author-review workflow.
- Overall editorial production acceptance: NOT PASSED. No client-facing delivery or release test performed.

2026-11-22: Verified live [private name] documents (original PDF only), latest edit run review/needs_review and source findings lacking page/paragraph. Dashboard assembly handoff fix ab3324e3cd8e0674018c3c5197443c185e43746e passed JavaScript syntax check. Authenticated function execution and complete editorial acceptance NOT TESTED.

2026-11-22: VERIFIED deployed rsm-manuscript-editor v9 ACTIVE and dashboard GitHub commit e31c5ca758ed6b8cdfdb38d17c0d9bcdb182a29a JavaScript syntax validation. NOT TESTED: authenticated run, actual DOCX creation, report accuracy, author approval, KDP production.

2026-11-22: DEPLOYED rsm-dashboard-editorial-report v2 ACTIVE, GitHub dashboard commit 21d18a45f5359a7689e67524d32b60a224933f36 syntax checked. NOT TESTED authenticated function invocation, actual DOCX bytes, private report registration or [private name] substantive audit. Do not mark audit passed.

2026-11-22: PASS read-only live SQL inventory: 14 pending editorial deliverables, 9 editorial_report and 5 manuscript. PASS JavaScript syntax check for current-versus-history dashboard filtering, commit 44ae685c2327f13a7b13939f0a250f28e314318c. NOT TESTED authenticated browser rendering. No data deleted.

2026-11-22: PASS JavaScript syntax checks for dashboard editorial run-to-DOCX chaining and existing-run DOCX backfill, commits 47a0130273d8fccfb94d543b739e7c16d7e35561 and c7f56274725dfb9d09f0f79fb9133099fcb1e64b. NOT TESTED authenticated assembly, edit, DOCX creation, page/paragraph mapping or author release.

2026-11-22: PASS static syntax validation of inline scripts in admin-dashboard.html after replacing legacy TXT editorial report download with formatted DOCX request. Commit e830c01e9cd5ebcbe0485d54d44a90780aedaa3d. NOT TESTED authenticated browser download or generated DOCX content.

2026-11-22: PASS live Supabase migration and registration of [private name] assembled DOCX as mpid_documents v2 after fixing intake job role CHECK. Editorial processing, DOCX content fidelity and author release NOT TESTED.

2026-11-22: PASS deployment status ACTIVE of rsm-dashboard-editorial-report v3 and JS syntax validation of selected-project correction. NOT TESTED authenticated function execution, DOCX fidelity, assembled manuscript editing, source-located findings or author release.

2026-11-22: PASS deployed rsm-manuscript-editor v10 ACTIVE, retrieved deployed source and verified DOCX report, 6x9 DOCX, source-excerpt matching logic present. PASS live original and assembled manuscript registrations. NOT TESTED authenticated editor execution, report generation, DOCX contents, page accuracy or QA. No new [private name] run registered at last check.

2026-11-23: PASS JS syntax check for Stage 4 assembled-manuscript processing and test-project filter; GitHub commit 69319d454cda625c1c129ffaae6b041644536d5f. NOT TESTED authenticated browser, editor invocation, DOCX generation, or author release.

2026-11-23: PASS live DB confirmed nine [private name] deliverable rows and formatted DOCX audit registered. PASS JS syntax after regex fix commit 90d1de6b947e43490726fa2a80630e66b7e221f4. NOT TESTED authenticated UI after deployment; assembled-source editorial run remains missing.

2026-11-23: PASS syntax validation of two inline admin-dashboard.html scripts after enforcing assembled manuscript processing source, commit 622c78e954847a90d654b5a35f0e905b45c6fd44. Authenticated execution not verified.

2026-11-23: PASS syntax check of working-source-linked report classification, commit ba212eee886838f2d05b265c2dff859769221f57. NOT TESTED live authenticated dashboard. No assembled-source run verified.

2026-11-23: PASS runtime log root-cause identified 'Could not find file in options' in Mammoth DOCX extraction. PASS Edge Function rsm-manuscript-editor v11 deployed ACTIVE and readback confirms Buffer.from(bytes) fix. NOT TESTED new authenticated editor run or DOCX output.

2026-11-23: FAIL live editor request: Supabase Edge Function HTTP 546 after ~150 seconds. PASS safe conditional recovery of stale processing row to failed with error reason, output paths null. No complete DOCX generated.

2026-11-23: PASS Supabase migration rsm_editor_resumable_segments, PASS Edge Function v12 ACTIVE deployment/readback, PASS dashboard JavaScript syntax and GitHub commit 2435ee2011801021509c91ffcb0defdc57c1f03e. NOT TESTED authenticated segment run or final DOCX outputs.

2026-11-23: PASS authenticated 7/7 editorial segments and registered private DOCX paths in DB. FAIL user Word opening RSM_Editorial_Audit report. PASS Edge Function report generator v4 ACTIVE deployment; NOT TESTED regenerated Word file opens. QA remains needs_review.

2026-11-23: FAIL user Word opening regenerated v4 audit. PASS v5 Edge Function deployment ACTIVE, source updated for new file path and DOCX ZIP signature guard. NOT TESTED Word opening regenerated v5 report; ZIP signature alone does not prove document integrity.

2026-11-23: PASS user-observed Word-open/download acceptance for corrected v5 audit DOCX and current 7/7 edited manuscript DOCX. PASS DB presence of private deliverable records, status pending_review. NOT VERIFIED: source fidelity, specific page/paragraph locations, editorial correctness, KDP production formatting, author release. No client notification.

2026-11-23: PASS GitHub source commit 15f86c3702a74ce706638386c844e10be3559e97 for Stage 4 approval/release UI. PASS read-only inspection of existing mpid_finalize_editorial_release RPC and editorial events schema. NOT TESTED authenticated browser button rendering, approvals, release, notifications, or author visibility. No client records changed and no author notification sent.

2026-11-23: PASS user supplied direct printed source PDF page/header artifact in edited DOCX; PASS source code inspection confirms one-Word-paragraph-per-newline assembly and unfiltered page markers; PASS DB confirms defective edited deliverable still pending_review; PASS GitHub commit of targeted approval blocks. NOT TESTED clean regeneration, browser deployment, or author release. No client notification.

2026-11-23: PASS Supabase deployment rsm-clean-manuscript v1 ACTIVE, JWT verification enabled; PASS GitHub Stage 4 regeneration UI commit 1980462ebd5ddb714b471812f37ca283b83d6786. NOT TESTED authenticated invocation, generated DOCX opening, artifact removal, paragraph integrity, author release. No client data changed by deployment.

2026-11-23: PASS user-confirmed clean generation success with 17 page markers and 15 running headers removed. PASS live DB registration of private clean pending_review DOCX. PASS source-level fix of Stage 4 current document filter commit 240a5194bb0eeeaf30a2e6d719d46e46f0c69523. NOT TESTED refreshed browser display, Word opening, text fidelity, final layout, author release.

2026-11-23: PASS inspected live rsm_editor_segments funding-fee text showing table header and three rate rows. PASS Supabase deployment rsm-clean-manuscript v2 ACTIVE and GitHub UI update e2aae03afc9a2a663cf83eb5e166559083fca0b1. NOT TESTED actual typeset DOCX generation, table rendering, pagination, title page breaks, complete table inventory or Word opening. Author release not performed.

2026-11-23: PASS live source inspection of v3 showing all headings using default Heading1 and no Manuscript removal. PASS Supabase rsm-clean-manuscript v5 ACTIVE and GitHub UI commit 033580938385ad6dff626de84f8eb8615ff37068. NOT TESTED production-review generation, Word opening, exact chapter break coverage, copyright order, all tables or KDP proof. No author release.

2026-11-23: PASS Supabase Edge Function rsm-clean-manuscript v6 ACTIVE; PASS GitHub Stage 4 structured layout UI commit 4162d51431ffa03622284bdd48e95fc70269a4cb. NOT TESTED authenticated generation, front matter boundary validation, Word opening, pagination, complete manuscript fidelity or author release.

2026-11-23: FAIL user visual inspection of BookLayout front matter: copyright disclaimer hard-wrap lines became separate paragraphs; heading/paragraph hierarchy not verified against original. PASS read-only SQL inspection of saved editorial segment: copyright lines are separated by double newline despite forming one sentence. NOT TESTED source-page comparison, paragraph reconstruction, full heading inventory, Word rendering, or KDP proof. No author release.

2026-11-23 | PASS administrator visual acceptance: latest manuscript layout and spacing look good. NOT TESTED independently: complete page-by-page machine inspection, final KDP print proof, author release. Stage 4 workflow button relabeling and Advanced Corrections placement require post-deployment browser verification.

2026-11-23 | PASS source inspection: author-dashboard.html previously required browser-entered publishable key; verified active publishable key in Supabase. PASS static code check: removed setup panel, manual key input, and localStorage dependency; retained auth flows. NOT TESTED live browser invitation activation, login, RLS or project visibility for [private name].

2026-11-23 | PASS code review: existing release RPC verifies approved status and registers document; existing trigger queues editorial_deliverable_released notification. PASS static implementation: one-click per-document approval then existing release path; retry button for approved documents. NOT TESTED authenticated browser approval, actual author access, email dispatcher or email delivery. No author-facing test executed.

2026-11-23 | PASS Supabase deployment mpid-send-notification v18 ACTIVE. PASS code inspection: notification includes specific manuscript/audit review and response instructions, correct author-dashboard URL, and no Supabase key prompt. PASS GitHub author dashboard static instruction addition pending commit. NOT TESTED live Resend email, author login, or author submission; no client notification dispatched.

2026-11-23 | PASS static mapping review of admin-dashboard.html IDs and rsm-workflow-order.js. Corrected private editorial staging placement and active-vs-legacy processing order. PASS source verification of seven-stage configuration and retained handlers. NOT TESTED authenticated dashboard rendering, buttons, production QA, approval/release, or notification delivery.

2026-11-23 | PASS SQL creation of admin-only rsm_package_comparison_runs and RLS. PASS Supabase Edge Function rsm-package-comparison v1 ACTIVE. PASS static dashboard integration with package selector, generate, history, and two private download buttons. NOT TESTED live AI processing, generated DOCX validity, browser UI, or download permissions. 18,000-character limit is enforced; no author release performed.

2026-11-23 | PASS rsm-package-comparison Edge Function v2 deployed ACTIVE with gateway verify_jwt=false; internal getUser and mpid_is_admin checks retained. PASS static dashboard relabeling and error handling. NOT TESTED Safari request success, full DOCX generation or audit completion. User reported 'Load failed' before changes.

2026-11-23 | PASS live log diagnosis: POST 500 with Mammoth openZip 'Could not find file in options' on 2026-11-24 05:44 UTC. PASS Edge Function v3 deployed ACTIVE with corrected buffer extraction. NOT TESTED new live generation, output DOCX validation or browser end-to-end.

2026-11-23 | PASS additive database columns and Edge Function v4 deployment. PASS static dashboard progress-loop integration. User confirmed v3 extraction reached length validation. NOT TESTED v4 live generation, resume, document completeness or formatting.

2026-11-23 | PASS read-only verification of 2/8 persisted sections in Signature Author run. PASS counter migration and v5 ACTIVE deployment. NOT TESTED resumed processing or final DOCX generation.

2026-11-23 | PASS live resume from saved sections (user confirmed section 3 onward), database 8/8 and review status, both storage objects with DOCX MIME and nonzero sizes. PASS user-reported dashboard completion and download controls. NOT TESTED actual Word opening, content completeness, layout, editorial quality, or other packages.

2026-11-23 | PASS database additive column and v6 deployment ACTIVE; PASS static dashboard integration. NOT TESTED formatted DOCX opening or pagination. User confirmed prior raw draft opens but lacks professional formatting.

2026-11-23 | PASS deployment v7 ACTIVE and deployed-source inspection confirms automatic interior builder and administrator RPC retained. NOT TESTED authenticated generation, actual DOCX layout, PDF or KDP proof.

2026-11-23 | PASS live saved text inspection confirms four funding fee rows; PASS v8 deployment and source checks. NOT TESTED actual Word rendering, table pagination, all headings or KDP PDF.

2026-11-23 | PASS v10 deployment and deployed-source heading formatter sample execution; user reported v9 nearly acceptable. Actual v10 DOCX visual QA and PDF readiness pending.

2026-11-23 | PASS v11 deployment and deployed-source checks for shared builder, indentation, spacing and administrator gate. User visually accepted v10 heading appearance. v11 visual review and PDF QA pending.

2026-11-23 | User confirmed v11 indentation visible but requested paragraph spacing. PASS v12 deployment and deployed-source spacing check; visual review pending.

2026-11-23 | PASS administrator visual acceptance of v12 formatting (user reported looks good). This is not PDF/KDP preflight or acceptance of every package execution. Earlier contracted manuscript/audit release not yet verified.

2026-11-24 | PASS GitHub dashboard commit and source inspection for collapsed details and exception summary; browser deployment and authenticated UI verification pending.

2026-11-24 | PASS committed source inspection and sample current-selection logic for released manuscript/audit with older pending draft. Live authenticated UI and release verification pending.

2026-11-24 | PASS committed workflow source inspection: old heading absent, exception filter and full export retained. Live browser verification pending.

2026-11-24 | PASS administrator confirms preview visible and simulated submission. PASS database readback of corrected revision read policy and two new triggers; two released deliverables retained; zero revision notices queued at verification. Notification worker v19 deployment confirmed. PENDING authenticated author submission, concurrency, cross-author isolation, email delivery and regression.

2026-11-24 | PASS new inbox JavaScript and workflow script syntax checks. Pending authenticated browser and actual submission test.

2026-11-24 | Administrator confirmed live revision center visible. PASS sample inbox script syntax; browser retest pending.

2026-11-24 | PASS administrator browser test: clicking Submit sample revisions immediately displays test submission in revision center without refresh. Live submission, email, regeneration and approval remain unverified.

2026-11-24 | PASS worker v20 deployment, migration success and sample script syntax. Pending browser queue and Resend delivery verification.
