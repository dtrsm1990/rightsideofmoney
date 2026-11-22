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
| T-001 | 2026-11-19 | Live revised SignWell agreement record | VERIFIED | Supabase mpid_signwell_agreements contains document 8de47506-d4f4-4310-80cf-8777831a6023, status sent, test_mode false | Sending/recording only; not signature completion |
| T-002 | 2026-11-19 | Preserve original signed agreement | VERIFIED | Original document 3c6b34ec-c92b-40ca-84b2-dc117615a1a5 remains completed | Database preservation; not external SignWell audit |
| T-003 | 2026-11-19 | Revised application pricing | VERIFIED | Application approved_price=500, agreement_status=sent, payment_status=not_requested, FAMILY_50_50 token | State at observation time |
| T-004 | 2026-11-19 | Cancel obsolete $600 installment | VERIFIED | Supabase installment full $600 status cancelled | Does not validate downstream notification suppression |
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


| T-012 | 2026-11-19 | Family payment preparation trigger deployment | PARTIAL | Migration prepare_family_50_50_deposit_only_after_signature succeeded; Maurice agreement remained sent and noncancelled installment count remained zero | Signature-trigger simulation and payment request end-to-end remain untested |

| T-013 | 2026-11-19 | Family payment request function deployment | PARTIAL | Migration support_family_50_50_payment_request_stages succeeded; inspected deployed function for family branch and link mapping; application still sent/not_requested | No live payment request made; isolated acceptance test and dashboard alignment pending |

| T-014 | 2026-11-19 | Family pricing payment overview source update | PARTIAL | GitHub commit 2bcc8af88b88e2912f811bb58def0d92730b9f48 | Browser/runtime and payment preview acceptance tests pending; no emails sent |

| T-015 | 2026-11-19 | Reusable family upfront backend deployment | PARTIAL | Supabase migrations support_reusable_family_upfront_signed_payment and support_reusable_family_upfront_payment_requests succeeded | No isolated transaction test or actual payment email; acceptance pending |
| T-016 | 2026-11-19 | Family payment preview guard changes | PARTIAL | GitHub commit 1b25c34f63e14168736055171a43ae3b031624f6 | Browser test and agreement generation pending |

| T-017 | 2026-11-19 | Reusable pricing review form source update | PARTIAL | GitHub commit 0331a0c413a526384350945da8ab70d4dc469351 | Browser acceptance and SignWell generalization pending; no real agreement sent |

| T-018 | 2026-11-19 | Generalized SignWell agreement function deployment | PARTIAL | mpid-signwell-agreements v42 ACTIVE; retrieved deployed source confirming family markers and validPricing; Maurice sent/not_requested unchanged | No live send, no browser acceptance, no template API runtime validation performed |

| T-019 | 2026-11-19 | Pricing-aware SignWell dashboard preview/readiness | PARTIAL | GitHub commit b189804a87387aa2a44a9095ad7c98be463af5c1 | Source update confirmed; browser runtime not verified; no emails sent |

| T-020 | 2026-11-19 | Reusable $600 regular discount Bluevine link lookup | PARTIAL | Supabase migration reusable_regular_discount_payment_link_verified succeeded after rejected syntax attempt | No payment email or end-to-end runtime test; authorization/duplicate guards retained |

| T-021 | 2026-11-19 | Discount link inventory and dashboard mapping | PARTIAL | Supabase live select: active $600 full, $500 full, $250 initial and $250 milestone; dashboard commit e0135933e6d13a7576e88512bcfcc2e34cdf8eb5 | Live link records verified; UI/browser runtime not tested; Maurice sent/not_requested unchanged |

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

| T-043 | 2026-11-20 | Signed-agreement payment preparation, no-send | PASS (live backfill and state verification) | Migration rsm_signed_payment_dispatch_draft_no_send succeeded; Maurice $250 initial dispatch draft awaiting_authorization; 0 request rows for installment; 0 new payment outbox rows | Future agreement insert trigger not exercised in isolated test; admin UI display and delivery flow pending |

| T-044 | 2026-11-20 | Isolated automatic held dispatch draft trigger | PASS | Synthetic approved signed family application plus $250 installment generated exactly one draft; transaction rolled back. Maurice held $250 draft remains and payment request count 0 | Actual email dispatch intentionally not authorized |

| T-045 | 2026-11-20 | Held payment draft dashboard source integration and non-admin RLS | PARTIAL | Dashboard commit 4a9819b2a413dd4887b671504e0fe7f8e3d63d79; admin SELECT policy; simulated non-admin sees zero drafts; one HTML terminator and script block | Browser acceptance and full JS compilation not yet verified; no client email sent |

| T-046 | 2026-11-20 | Payment dispatch draft lifecycle guard | DEPLOYED, NOT TESTED | rsm_payment_dispatch_draft_lifecycle_guard migration applied; future payment approval notification still pending | Requires isolated rollback test, secure admin approval workflow, email notification delivery verification |

| T-047 | 2026-11-20 | Held payment draft lifecycle cancellation guard | PASS (transaction rolled back) | Live Supabase: BEGIN; temporarily changed the one held $250 initial installment from not_requested to cancelled; asserted matching draft became superseded; ROLLBACK; subsequent SELECT confirmed installment not_requested, draft awaiting_authorization and approval notice held | This validates cancelled transition only. Other terminal states and authenticated browser approval flow remain untested; no payment request or email sent. |

| T-048 | 2026-11-20 | Held draft Approve & Send dashboard control | DEPLOYED, UNVERIFIED | GitHub commit 97759d369ec4a26fd72dd1a428c0f14615e466f0; source adds signed/approved gate, admin confirmation, draft re-read and existing server RPC | Authenticated browser JS/runtime acceptance and payment delivery unverified; no live request sent |

| T-049 | 2026-11-20 | Existing request duplicate-send UI clarity | DEPLOYED, UNVERIFIED | GitHub commit 66eec2915fac92cc46c82058434a378ef674837d; hides send button if request history exists and displays delivery status | Browser rendering still pending; provider acceptance is not recipient delivery; no new payment sent |

| T-050 | 2026-11-20 | Confusing payment action correction | SOURCE DEPLOYED, BROWSER UNVERIFIED | GitHub 6aa2814b2000686ee9ef367197996de27bf18092; hides family final stage until completion approval and alternate send for held drafts; live SQL confirms initial request accepted | Browser cache/runtime pending; no new request sent |

| T-051 | 2026-11-20 | Admin payment approval notification wiring | DEPLOYED, END-TO-END PENDING | Migration queue_admin_payment_approval_notice + mpid-send-notification v14; existing queued count 0 | Future eligible signed application required for delivery confirmation; no author payment sent |

| T-052 | 2026-11-20 | Verified-payment onboarding readiness foundation | MIGRATION APPLIED, INTEGRATION PENDING | security_invoker view rsm_onboarding_readiness gates readiness on signed agreement and paid fully verified initial/full installment | No live invitations or projects created; dashboard integration pending |

| T-053 | 2026-11-20 | Publishing dashboard workflow order source | SOURCE VERIFIED, BROWSER UNVERIFIED | Main commits c22c1f2b33a5234985a3dfdd7553b27ff842a7b5 and 494b4bc09bbf38ae1c50db7cf2a0fbccdee0d836; fetched workflow JS confirms applicationCenter immediately followed by authorInvitations and applicantManuscriptCenter | Authenticated visual/layout and interactive controls must be tested before marking end-to-end complete |
| T-054 | 2026-11-20 | Maurice agreement/payment status reconciliation | VERIFIED (database state only) | Read-only Supabase mpid_author_applications and mpid_payment_installments: signed agreement, approved $500, payment_status=requested, $250 initial installment requested, $0 verified, historical $600 installment cancelled | Payment receipt not verified; do not resend request or unlock onboarding; provider acceptance is not proof of customer receipt |
| T-055 | 2026-11-20 | Payment approval implementation vs full acceptance | PARTIAL | Dashboard source contains Approve & Send Payment Link and rsm_payment_dispatch_drafts; previous T-048/T-051 record deployed source and notification wiring | Authenticated UI, future signed-agreement notification delivery, retries and duplicate prevention remain unverified; no new message sent |

| T-056 | 2026-11-20 | Verified-payment onboarding queue foundation | PARTIAL, DEPLOYED | Supabase migration prepare_onboarding_jobs_after_verified_payment_no_send succeeded; read-only query: trigger_count=1, rls_enabled=true, queued_jobs=0, Maurice onboarding_state=awaiting_verified_payment | No positive paid test, no worker/invitation/project integration, no email sent; must not mark end-to-end complete |

| T-057 | 2026-11-20 | Onboarding worker v4 payment-stage guard | DEPLOYED, PARTIAL | Supabase function rsm-onboarding-worker v4 active; independent post-deploy SQL jobs=0, Maurice awaiting_verified_payment, active cron=1 | Positive paid path, duplicate/retry and browser acceptance not verified; no email sent |

| T-058 | 2026-11-20 | One project per application idempotency | DEPLOYED, PARTIAL | Unique partial index verified=1; rsm-onboarding-worker v5 active; jobs=0 and Maurice projects=0 | No positive isolated paid-path or email retry test yet |

| T-059 | 2026-11-20 | Transactional onboarding queue tests | PASS | Rolled-back SQL fixture: unpaid blocked; $250 paid queued once; repeat payment update no duplicate | Worker/email path not exercised |
| T-060 | 2026-11-20 | Incorrect deposit negative test | FAIL then FIXED and PASS | $150/500 incorrectly queued through obsolete rsm_prepare_onboarding_after_payment trigger; migration removed it; rerun $150 blocked, $250 queued, duplicate job rejected | No customer invitation |

| T-061 | 2026-11-20 | Service-role project creation and duplicate guard | FAIL then FIXED, PASS | Original SQL fixture failed null actor_id in mpid_project_activity. Migrated trigger to fallback author_id with automated-event label; retest project insert PASS, duplicate unique guard PASS, rollback PASS | Worker invitation/email not exercised |

| T-062 | 2026-11-20 | Manuscript queue contract-specific payment gate | PASS isolated logic, runtime pending | v17 active; eight read-only SQL pricing scenarios PASS, code inspection verifies preflight/start/resume gates | Not a live authenticated processing run |


| T-063 | 2026-11-21 | Stripe live destination and signing secret | PARTIAL | Stripe GET webhook endpoints: destination enabled, payment_intent.succeeded, correct function URL; Vault named secret exists, whsec_ format true, service_role RPC access true; Edge Function v3 active | No new Stripe webhook delivery observed; no signed-event end-to-end acceptance |
| T-064 | 2026-11-21 | Office notification event constraint repair | VERIFIED isolated | Initial real admin verification failed on mpid_notification_outbox_event_type_check; migration allow_office_operational_notification_event_types applied; rollback-only insert accepted all three operational event types | Outbox processor mail delivery separate |
| T-065 | 2026-11-21 | Maurice $250 authenticated Stripe payment verification | VERIFIED | Admin confirmed successful dashboard popup; independent Supabase query: installment paid, amount_verified=250.00, Stripe reconciliation=verified, application=partially_paid; project exists onboarding | Does not establish automatic payment crediting or manuscript processing |
| T-066 | 2026-11-21 | Payment verification notification | PARTIAL | mpid_notification_outbox payment_verified_admin status sent, last_error null | Recipient mailbox delivery not independently verified |


| T-067 | 2026-11-21 | Maurice intake manuscript to project handoff | PASS live storage/database | Onboarding worker v6 ACTIVE; copied original PDF from mpid-applicant-manuscripts to mpid-manuscripts/projects/<project-id>/source-manuscripts/<request-id>/; project mpid_documents row b3156828-3088-4993-b814-5501418eb473 exists with original filename; intake original retained | Browser dashboard refresh and future onboarding acceptance pending |


| T-068 | 2026-11-21 | Publishing Projects manuscript visibility | PASS administrator UI observation | User confirmed Files=1 after dashboard refresh; independent SQL confirmed source manuscript document | Does not verify manuscript download or editing |
| T-069 | 2026-11-21 | PDF manuscript engine compatibility | BLOCKED identified by source inspection | rsm-manuscript-queue extracts DOCX via mammoth but falls back to file.text() for PDF; no PDF parser; Maurice source is PDF | Must implement validated PDF extraction before editing; no run initiated |


| T-070 | 2026-11-21 | PDF extraction support deployment | DEPLOYED, RUNTIME PENDING | rsm-manuscript-queue v20 ACTIVE; PDF.js extraction added with page-level low-text rejection; existing DOCX/TXT/MD branches retained | Authenticated preflight, real PDF extraction, document fidelity, editor QA and publication release not tested |


| T-071 | 2026-11-21 | Maurice preflight contract records | PASS database inspection | Approved application, signed agreement, matching Publish-Ready project, $500 family pricing and active manuscript, zero editing runs; verified $250 installment from T-065 | Authenticated endpoint preflight pending |
| T-072 | 2026-11-21 | Read-only PDF extraction preflight | DEPLOYED, RUNTIME PENDING | rsm-manuscript-queue v21 ACTIVE; preflight downloads PDF and attempts PDF.js text extraction with minimum readability checks, no editing run created | Authenticated browser invocation and extraction quality review required |


| T-073 | 2026-11-21 | Dashboard processing section placement | SOURCE UPDATED, UI PENDING | GitHub admin-dashboard.html commit 07d1eea moved existing editing section immediately after Publishing Projects and corrected PDF capability copy | Live browser rendering and selected-project continuity not yet verified |

| T-074 | 2026-11-21 | Manuscript preflight prerequisite reconciliation | PARTIAL, AUTHENTICATED PREFLIGHT PENDING | Live SQL read-only project/document count confirms one registered manuscript for The VA Loan Millionaire; deployed rsm-manuscript-queue v21 ACTIVE. Connector get_edge_function returned Failed to retrieve function bundle. | No authenticated PDF preflight, extraction fidelity, or author release tested; no data mutated. |

| T-075 | 2026-11-21 | Manuscript preflight diagnostic UI source | SOURCE/SYNTAX PASS, RUNTIME PENDING | GitHub commit 3ca986fed0df2196d0a90ca74ce6ee733d95ea03; full inline JavaScript Function compilation PASS; single HTML document terminator PASS | Authenticated runtime PDF extraction and displayed metrics not verified; no editing run initiated |

| T-076 | 2026-11-21 | Direct manuscript project selector | SOURCE/SYNTAX PASS, BROWSER PENDING | GitHub commit 17f9922e432c45b036630c1bb00d5c4e612fa762; selector now inside processing panel, synchronizes project and auto-loads unique matching approved application/manuscript; full inline JS syntax compilation PASS | Authenticated UI and PDF preflight pending; no editing or author release |

| T-077 | 2026-11-21 | Preflight missing choices and legacy test cleanup | SOURCE/SYNTAX PASS, BROWSER PENDING | Commit 4fb71f160cded8fb5b7fa837566a0051f6a86cde; direct application_id lookup, unique manuscript selection, preflight self-loading; obsolete Perfect Marriage test panel hidden; full inline JavaScript syntax compilation PASS | Authenticated preflight and PDF extraction not yet executed; no customer communications |

| T-078 | 2026-11-21 | Maurice authenticated readiness preflight | PASS FOR SEVEN REPORTED GATES; EXTRACTION FIDELITY UNVERIFIED | Administrator reported live dashboard 'Preflight passed' and seven PASS checks covering project/application, source, approval/scope, title/package, signed agreement, verified commencement payment, supported input type | No page/word count shown; PDF extraction fidelity and manuscript editorial outputs still require acceptance |

| T-079 | 2026-11-21 | Submission notification pending item diagnosis | LIVE SQL PASS, UI SOURCE/SYNTAX PASS, BROWSER PENDING | Exactly one active document: Maurice original PDF; reviewed_at null. Dashboard commit 98e4c8c1b47e87db7c549e009bbc3c9ffa9ea091 clarifies receipt acknowledgment and filters hidden test projects; JS syntax PASS | Did not mark document reviewed; no manuscript editing or author release |

| T-080 | 2026-11-21 | Maurice submission receipt acknowledgment | LIVE PASS | Administrator reported 'Submission marked as reviewed'; SQL verified reviewed_at=2026-11-22 03:57:24.045+00 on original PDF | Intake acknowledgment only, no editorial QA or author release |

| T-081 | 2026-11-21 | Private editing start source handoff | SOURCE/SYNTAX PASS, RUNTIME PENDING | Dashboard commit fbdc1fae9e17b548b2345a738beb8c3a72b55be8 makes start self-load linked application/source and fixes misleading next-button wording; inline JS syntax PASS | No editing run started; API usage and PDF extraction fidelity not verified |

| T-082 | 2026-11-21 | Simplify active manuscript processing buttons | SOURCE/SYNTAX PASS, BROWSER PENDING | Commit 3129b41c8eeb767a4b85ee79b7ee2ab7ad9122be; removed obsolete buttons from visible UI by hiding (preserving handlers); ordered active steps 1/2/3; inline JS syntax PASS | Authenticated browser flow and draft processing not tested |

| T-083 | 2026-11-21 | Draft workflow state-aware controls | LIVE SQL + SOURCE/SYNTAX PASS, BROWSER PENDING | SQL confirms zero edit runs for Maurice; dashboard commit ea1e6a9e983e9221382556d7b93dd71f8ab1dff4 disables Continue when no active run and Start when active run exists; JS syntax PASS | Authenticated browser state and PDF extraction not verified |

| T-084 | 2026-11-21 | Single project selector manuscript workflow | SOURCE/SYNTAX PASS, BROWSER PENDING | Commit 428d0bdd32879229513278edc8ea58b0893b4b51 hides duplicate selector and wires main Select project to load manuscript and run progress; JS syntax PASS | Full dashboard-wide scoping of all sections still requires audit |

| T-085 | 2026-11-21 | Selected project persistence and publishing table scope | SOURCE/SYNTAX PASS, BROWSER PENDING | Commits d78896f9e32874179153e77adf1ccca07f3f0c7b, ee75aa4deb41aa1276a142097bdf098c798d68d9; project selection retained per browser session, table filtered and rerendered on change, manuscript loaded on refresh; inline JS syntax PASS | Other dashboard sections may still contain global queues; browser acceptance needed |

| T-086 | 2026-11-21 | Canonical project selection across project controls | SOURCE/SYNTAX PASS, BROWSER PENDING | Commit a4a69e518c0ebb0b84ce562308c2431892adeaf9; upload/findings/checklist project selectors dispatch canonical change; checklist synchronized; inline JS syntax PASS | Remaining global intake/notification queues intentionally not scoped; runtime testing pending |

| T-087 | 2026-11-21 | Single-action manuscript processing workflow | SOURCE/SYNTAX PASS, RUNTIME PENDING | Reviewed Supabase queue v21 and dashboard commit d8a0ed912981f30dbd521efaf8040d8add0a19b5; new Process Private Manuscript creates/resumes private run and processes segments, with explicit paid API confirmation; JS syntax PASS | No authenticated invocation, editing output, or author release tested |

| T-088 | 2026-11-21 | Manuscript start failure diagnostic | LIVE SQL + SOURCE/SYNTAX PASS, RUNTIME PENDING | Live project/application/manuscript linkage confirmed; zero edit runs. Commit fb1feec5e0b20cf3317132d9f1d23ab6aa031c0a surfaces Supabase start error and prevents refresh masking it; inline JS syntax PASS | Exact runtime failure still unknown; authenticated invocation needed |

| T-089 | 2026-11-21 | Live manuscript source selection | SOURCE/SYNTAX PASS, RUNTIME PENDING | Replaced cached document lookup with live mpid_documents query; commit 234c253bbf82f9caca6383c44c3c0ef67c5c8c33; JS syntax PASS | No authenticated start or AI processing verified |

| T-090 | 2026-11-21 | Private local Maurice editorial working artifacts | FILE GENERATION PASS, FINAL EDITORIAL QA PENDING | Recovered source PDF from accessible project files, generated DOCX working draft and separate report, rendered 24 and 2 pages respectively; original source untouched | Not a complete professional copyedit; portal run absent; author release prohibited |

| T-091 | 2026-11-21 | Live PDF manuscript engine bug fix | DEPLOYMENT PASS, PROCESSING PENDING | Supabase rsm-manuscript-queue v22 ACTIVE, PDF preflight regex and word split corrected; JWT/admin/payment safeguards retained; dashboard commit 2c2d38a174775fa87ee65552b4cd0a9556f1e80f shows completed files in review center; JS syntax PASS | Live SQL still zero Maurice editing runs, no runtime edit completion verified |

| T-092 | 2026-11-21 | Approved Maurice manuscript auto-start integration | SOURCE/SYNTAX PASS, AUTHENTICATED RUNTIME PENDING | Commit 504f4bcc439f2781397c9521ca3e325256233ed2; authenticated dashboard refresh attempts previously authorized private editing for exact Maurice project; no duplicate start for review/failed runs, session repeat suppressed, release remains admin gated | Requires browser session execution and verification of staged deliverables |

| T-093 | 2026-11-21 | Maurice PDF cover-page extraction fix | ROOT CAUSE VERIFIED; DEPLOYMENT PASS; END-TO-END PENDING | Observed user error page 1 under 15 characters, no run. Inspected engine source, changed per-page fatal threshold to document-level minimum, deployed `rsm-manuscript-queue` v23 ACTIVE, verify_jwt=true. | Need authenticated retry and completed private draft/report verification |
