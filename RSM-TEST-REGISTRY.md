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
