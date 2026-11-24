## CURRENT EXECUTIVE CHECKPOINT | 2026-11-21 | READ FIRST
- Mission: deliver an integrated, secure, automated, professional RSM Publishing Services platform. Prioritize working end-to-end business workflows over disconnected dashboard buttons and isolated reports.
- Live verified: Maurice Watkins / The VA Loan Millionaire project status **editing**; manuscript run 45fdcf7f-6204-4966-bd9c-f20a2d98b686 has 13/13 completed segments, run status review, QA needs_review. Five private editorial deliverables pending review, zero structured audit findings, zero author approvals. NOT publication ready; nothing released.
- Key gap: editing output and detailed author report are not connected to structured audit findings, checklist, approval decisions and production gates. No unsupported claims of QA completion.
- Latest dashboard commit: d6c8ff735b5d849be5a84f76bad0b191430e70ee. Editorial Audit Management Center shows evidence summary and gap warning, refresh button removed. Browser acceptance remains pending.
- Database migration: sync_publishing_project_editing_from_editorial_work advances eligible projects to editing from manuscript run/deliverable evidence; Maurice live status verified.
- Source: dtrsm1990/rightsideofmoney, exact dashboard mpid-portal/admin-dashboard.html. Supabase: rufcgmqpueejoyypnpzn.
- Next integrated release: register verifiable source-linked findings from engine, separate auto-corrected mechanical changes from author decisions, derive action checklist, synchronize stage gates, then one complete acceptance run. Preserve signed scope, original manuscripts, payments, audit trails. No external sends/releases without explicit authorization.
- Continuity: read all four files each session; update checkpoint, decisions, test evidence, next actions after each significant release. Older entries below are historical, not necessarily current.

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

## 2026-11-20 dashboard agreement guidance and readiness performance
- Dashboard commit d10fe1e956d1dda144c6155f73c11ee81284fea5 replaces outdated claim that live signature requests are disabled with accurate confirmation/no-duplicate guidance. Family final-payment readiness RPCs now run concurrently for eligible split-payment applications. Browser syntax/runtime verification still pending; no live sends.

## 2026-11-20 completion project selection improvement
- Dashboard commit 9f16f90185cb9fb4ec5e77d6753a0d17c6d8587d replaces manual UUID entry in family final approval with Load Completed Projects selector and reason-length client validation. Backend author identity/completion/non-test checks remain authoritative. Browser runtime not yet verified; no approval or email sent.

## 2026-11-20 author-scoped family completion selector
- Live mpid_projects schema verified supports selector fields. Supabase migration family_final_author_scoped_completed_project_selector succeeded, adding admin-only RPC rsm_family_completed_projects that returns only completed non-test projects matched to selected application author's auth email. Dashboard commit b3a058406bd171919e2351eaf3f50908aeae735a uses this RPC. Runtime browser and authenticated positive tests pending; no approvals or emails sent.

- Live permission verification for rsm_family_completed_projects: anon EXECUTE false; authenticated EXECUTE true with internal admin guard. Maurice application remains approved, agreement sent, payment not_requested, approved price $500 Publish-Ready. No live sends. SignWell invitation delivery still unverified.

## 2026-11-20 SignWell author-signed state visibility
- Dashboard commit d7999c5e27398113e4fe79998978c7771fd91427 enhances read-only SignWell signer inspection to prominently flag author signed / RSM signature pending based on SignWell recipient statuses. No email notification was implemented or sent. SignWell recipient runtime verification pending; delivery tracking remains absent.

## 2026-11-20 signer observation foundation
- Supabase migration signwell_signer_observations_held_notifications succeeded. Created protected RLS-enabled rsm_signwell_signer_events with unique(document_id,signer_email), held notification default, no anon/auth table grants.
- mpid-signwell-agreements Edge Function v44 ACTIVE now records SignWell-reported signed recipients idempotently when admin runs inspect_signing_invitations. Does not send email, queue notifications, or infer email delivery. Authenticated runtime not tested; no signer observations claimed.

## 2026-11-20 author signature notification queue integration
- Migration author_signed_notification_queue_admin_gated succeeded: outbox accepts agreement_author_signed_admin; admin-only rsm_queue_author_signed_notice queues a unique event only for verified live author signature records. No queue invoked.
- mpid-send-notification Edge Function v13 ACTIVE handles verified author-signature notice to publishing@rightsideofmoney.com. Existing notification worker secret remains required. Dashboard commit 6afe58af6033ac4cafb213ed9334c69766cce75e displays held notice status. No live notification sent; authenticated end-to-end acceptance pending.

## 2026-11-20 administrator-controlled signature notice action
- SignWell Edge Function v45 ACTIVE returns persisted signer event IDs and held/queued status on admin inspection. Dashboard commit 625ddc7ce11e889a1bf4e15bc2b3acc90bb3d062 adds explicit confirmation-gated Queue RSM Signature Notification control only for verified held author event. No notification queued or sent in development. Authenticated browser/Resend acceptance pending.

## 2026-11-20 dashboard syntax blocker
- Full inline admin-dashboard.html JavaScript fails source-level Function-constructor compilation with SyntaxError Invalid or unexpected token; isolated SignWell inspection handler passes. Exact cause not yet isolated. Treat dashboard as unverified and do not mark browser tests passed. No notification sent.

## 2026-11-20 critical dashboard file corruption discovered
- GitHub mpid-portal/admin-dashboard.html is 370678 characters with first </script></body></html> at character 219579 and 151077 additional characters after the first document terminator, including a second closing document. Full inline JavaScript of first document fails compilation. Do not overwrite blindly. Recovery requires reconstructing and syntax-validating against a known-good revision and preserving newer features. No notification sent.

## 2026-11-20 dashboard source repair deployed
- GitHub commit cac141fd9094de56522ea0a68141433b0ec1b266 repaired truncated pricing-validation JavaScript string, restored signed-agreement pricing lock checks, and removed duplicate 150566-character appended tail. Source now 220112 characters, one closing HTML document, full inline script successfully compiled using JavaScript Function constructor. SignWell queue and family payment identifiers retained. Authenticated browser end-to-end acceptance remains pending; no email sent.

## 2026-11-20 signature notification status accuracy
- Live SQL shows zero rsm_signwell_signer_events, zero signature-notification outbox rows, zero active family final approvals. Anonymous EXECUTE on rsm_queue_author_signed_notice is false; authenticated EXECUTE true with internal admin check. Dashboard commit e18e2dfe308748fbc7736a6692419079e6f1b02e shows actual notification status rather than hard-coded held. Full inline JS source syntax passed. SignWell authenticated recipient inspection and browser acceptance remain pending; no email sent.

## 2026-11-20 security review follow-up
- Read-only inspection of 12 authenticated-callable SECURITY DEFINER functions: all deny anon EXECUTE; 11 directly reference auth.uid(), all 12 reference mpid_is_admin(); mpid_storage_document_is_active instead uses mpid_is_admin OR an active document with mpid_can_view_project authorization. No grants or functions changed. Supabase advisor warnings still require a comprehensive authorization and leaked-password-protection review. No breach established from reviewed evidence.

## 2026-11-20 simulated non-admin authorization tests
- Simulated authenticated non-admin JWT sub 00000000-0000-4000-8000-000000000001 under SET LOCAL ROLE authenticated. mpid_is_admin() returned false. Four live RPC negative tests explicitly raised administrator-required errors: rsm_request_payment, rsm_queue_author_signed_notice, rsm_approve_family_final, rsm_verify_payment. Failed SQL transactions rolled back. No real client action performed. Real non-admin session and remaining privileged functions not yet tested. Supabase leaked-password protection advisor warning remains.

## 2026-11-20 remaining privileged RPC negative tests
- Simulated authenticated non-admin role with nonexistent UUID. Explicit administrator-required rejections for mpid_finalize_document_delete, mpid_set_document_archived, rsm_register_custom_payment_link (preview only), rsm_family_final_readiness, rsm_family_completed_projects. mpid_can_view_project(nonexistent UUID) and mpid_storage_document_is_active(nonexistent path) returned false. Together with T-041, 11 sensitive operations tested and mpid_is_admin() returned false. No records changed. This is simulated SQL authorization testing, not an actual non-admin browser JWT test. Leaked-password protection warning outstanding.

## 2026-11-20 signed-agreement payment automation repair
- Root cause: rsm_prepare_signed_payment trigger only created an installment; it did not prepare a payment request or queue dispatch. Added migration rsm_signed_payment_dispatch_draft_no_send with RLS-protected rsm_payment_dispatch_drafts and after-insert trigger to automatically prepare idempotent held dispatch drafts. Backfilled Maurice Watkins initial $250 draft as awaiting_authorization. Verified 1 held draft, 0 mpid_payment_requests for initial installment, 0 new payment outbox rows. No email sent. Draft is intentionally not dispatchable without existing admin-authorized rsm_request_payment workflow. End-to-end real signature-to-trigger simulation and admin UI integration remain pending.

## 2026-11-20 isolated trigger acceptance
- In a single rolled-back transaction, inserted a synthetic approved/signed family $500 application and $250 initial installment; a separate SQL statement confirmed automatic creation of exactly one held dispatch draft. Rolled back all synthetic rows. Maurice remains one held $250 draft and zero actual payment request records. No client email sent.

## 2026-11-20 held payment draft dashboard integration
- Deployed admin-only SELECT policy on rsm_payment_dispatch_drafts, tested simulated non-admin SELECT returns 0. Updated mpid-portal/admin-dashboard.html to load held drafts and display 'Prepared Payment Requests | Not Sent' with installment amount/stage in Payment Management Center, commit 4a9819b2a413dd4887b671504e0fe7f8e3d63d79. Source re-fetched, single HTML ending and script block confirmed. Authenticated admin browser acceptance and JS compilation not performed. No payment request queued or email sent.

## 2026-11-20 payment approval notification design
- Owner approved future approval-before-send payment workflow, Maurice held. Deployed rsm_payment_dispatch_draft_lifecycle_guard trigger: if installment becomes requested, partially_paid, paid, or cancelled, a held draft is marked superseded. Existing held draft creation and dashboard remain. Approval email creation/sending and secure one-click authorization endpoint are NOT yet implemented or tested. No emails sent.

## 2026-11-20 payment draft lifecycle isolated acceptance
- Live Supabase T-047: within a rolled-back SQL transaction, temporary cancellation of held $250 initial installment caused dispatch draft to become superseded; after rollback, installment remained not_requested and draft awaiting_authorization with approval notice held. No client record change persisted and no message sent. Remaining priority: implement secure admin approval notification and approval action, with separate explicit authorization required before any live client payment dispatch.

## 2026-11-20 held-draft approval dashboard action
- GitHub commit 97759d369ec4a26fd72dd1a428c0f14615e466f0 adds an Approve & Send Payment Link action to held draft rows. Requires approved/signed application, explicit administrator confirmation, live draft re-read, and existing admin-gated rsm_request_payment RPC. Final-stage draft action disabled pending completion gate. This is source deployment only; authenticated browser/runtime acceptance is pending. No live payment request sent.

## 2026-11-20 duplicate-send dashboard clarity
- GitHub commit 66eec2915fac92cc46c82058434a378ef674837d hides the redundant Send Payment Request action for stages with existing request records and displays provider-accepted/queued/previously-recorded status. Existing server duplicate protections preserved. Live Maurice initial $250 request previously verified accepted by email provider. Authenticated browser verification pending; no new payment sent.

## 2026-11-20 payment dashboard confusing actions correction
- Live SQL confirmed Maurice initial $250 request accepted by provider (processed 2026-11-20 22:25:02 UTC), installment requested; historical cancelled full request retained. GitHub commit 6aa2814b2000686ee9ef367197996de27bf18092 hides premature family final payment row until completion approval and suppresses alternate Send Payment Request for held drafts. Existing request rows already hide duplicate send action. No new request sent. Browser deployment/cache and live runtime acceptance remain unverified.

## 2026-11-20 automatic admin payment approval notice
- Deployed Supabase migration `queue_admin_payment_approval_notice` to enqueue idempotent `payment_approval_pending_admin` outbox events when eligible held payment drafts are inserted/updated with approval_notice_status=pending. Restricted to signed approved applications and initial/full/milestone stages; no author payment is sent. Updated existing `mpid-send-notification` Edge Function to v14 with admin-only email to publishing@rightsideofmoney.com and dashboard link, checking draft still pending. Existing Maurice request accepted and draft superseded, so no new notification or payment queued. Next eligible agreement needs end-to-end confirmation. Existing notification dispatcher schedule assumed, not revalidated.

## 2026-11-20 onboarding readiness foundation
- Deployed security-invoker read-only view `public.rsm_onboarding_readiness`, calculating approved/signed/verified-initial-or-full-payment status and whether portal invitation is recorded. Requires installment status paid and amount_verified>=amount_due, so email acceptance does not unlock onboarding. View does not send invitations, create projects, or change payments. Admin/browser wiring and invitation automation remain outstanding. Prior completed T-001..T-051 remain accepted; only retest when dependent code changes.

## 2026-11-20 verified handoff reconciliation and dashboard workflow ordering
- GitHub main commit c22c1f2b33a5234985a3dfdd7553b27ff842a7b5 added mpid-portal/rsm-workflow-order.js and linked it from mpid-portal/admin-dashboard.html to organize publishing workflow panels. Commit 494b4bc09bbf38ae1c50db7cf2a0fbccdee0d836 moved Invite New Author directly below Author Application Review Center. Both source changes were fetched/verified on main; authenticated browser rendering remains UNVERIFIED.
- Read-only Supabase check 2026-11-20: Maurice application agreement_status=signed, payment_status=requested, approved_price=$500. Initial installment $250 status=requested, amount_verified=$0; obsolete $600 full installment remains cancelled. The $250 request already exists; DO NOT regenerate or resend it. Verified payment and invitation readiness remain outstanding.
- Payment approval source and admin notification infrastructure are DEPLOYED/PARTIAL, not full end-to-end VERIFIED. Earlier baseline statements about Maurice agreement=sent/payment=not_requested are historical snapshots, not current state. The signed-to-payment request for Maurice is completed; payment receipt is not.
- Continuity upkeep: all four GitHub records updated to reflect completed deployments and open acceptance tests. Preserve existing historical test entries; no customer email or payment action initiated during this reconciliation.

## 2026-11-20 onboarding queue deployment
- Supabase migration `prepare_onboarding_jobs_after_verified_payment_no_send` succeeded. Added RLS-protected `rsm_onboarding_jobs` with unique application_id and trigger `rsm_prepare_onboarding_after_payment` on installment insert/verified status updates. Trigger queues a pending admin-review job only when payment is paid/fully verified and `rsm_onboarding_readiness` says ready_for_portal_invitation. No email, account, or project is created by this trigger.
- Post-migration verification: one trigger, RLS enabled, zero jobs, Maurice remains awaiting_verified_payment. Existing mpid-invite-author v8 uses admin-authorized manual send and lacks automatic project creation; full onboarding is NOT complete. Next: safe job worker with idempotent invitation/project linking, isolated acceptance, and dashboard queue visibility.

## 2026-11-20 onboarding worker hardening
- Live Supabase schema inspection superseded an outdated assumption: rsm_onboarding_jobs status check is pending/processing/completed/failed; cron job rsm-author-onboarding-worker is active every minute. Worker already exists and handles invitations, profiles, and project creation.
- Deployed rsm-onboarding-worker Edge Function v4. Added server-side approved-price and payment-stage-specific amount verification before invitation; uses saved invitation_sent_at when recording application invitation. No client communication initiated in deployment.
- Post-deploy read-only check: jobs=0, Maurice onboarding_state=awaiting_verified_payment, active schedule=1. End-to-end positive payment, duplicate suppression, and browser acceptance remain unverified. Worker may still require resilience improvements for partial failures.

## 2026-11-20 project idempotency implementation
- Supabase migration link_publishing_project_to_application_uniquely succeeded: mpid_projects.application_id nullable FK and unique partial index mpid_projects_application_id_unique. Existing records remain unchanged.
- Deployed rsm-onboarding-worker v5 to identify/create projects by application_id, recover uniqueness conflicts, and reject mismatched author ownership. Verified unique index=1, onboarding jobs=0, Maurice linked projects=0. No customer invitation sent. Positive end-to-end test remains open.

## 2026-11-20 onboarding queue acceptance and defect repair
- Ran rollback-isolated live database fixture tests: unpaid blocks queue, paid family $250/500 creates exactly one job, repeated verification creates no duplicate, and fixtures rolled back. All passed.
- Negative fixture revealed incorrectly sized $150 marked-paid payment could queue via legacy rsm_prepare_onboarding_after_payment trigger. Removed that trigger and its obsolete function in migration remove_legacy_duplicate_onboarding_payment_trigger. Retest: $150 blocked, corrected $250 queued, duplicate application job rejected, all PASS. No client emails sent.
- Worker invitation dispatch and partial-failure recovery still require controlled testing; do not mark end-to-end complete.

## 2026-11-20 service-created project trigger fix
- Isolated transaction test discovered mpid_log_project_activity() inserted null auth.uid() into non-null mpid_project_activity.actor_id, blocking background worker project creation. Applied migration support_service_created_project_activity_with_audit_label: use author_id as recorded actor fallback and explicit automated action description when no user session. Rollback-isolated retest: project creation without auth user PASS, duplicate project unique constraint PASS, fixture rolled back PASS. This tests database creation, not actual email delivery or full worker execution.

## 2026-11-20 manuscript queue payment gate
- Deployed rsm-manuscript-queue v17, ACTIVE. Contract-specific verified-payment checks added to preflight, start, and resumed processing. Code inspected post-deploy. Eight isolated SQL-equivalent contract pricing scenarios PASS. No manuscript was processed and no author deliverable released. Runtime authenticated end-to-end acceptance remains pending.


## 2026-11-21 Stripe payment verification incident resolved
- Stripe live destination enabled for payment_intent.succeeded; Supabase rsm-stripe-webhook v3 active. Vault signing secret format and service-role access verified. No actual post-creation webhook delivery has been observed; automatic receipt-to-credit remains NOT VERIFIED.
- Maurice Watkins $250 initial installment verified via authenticated admin dashboard. Live SQL confirmed status paid, amount_verified 250.00, reconciliation event verified, application payment_status partially_paid (remaining $250 final). Project The VA Loan Millionaire exists in onboarding status.
- Payment verification initially failed due to mpid_notification_outbox_event_type_check excluding payment_verified_admin. Applied allow_office_operational_notification_event_types migration; three event types accepted in rollback-isolated test. Admin retry succeeded. Office payment_verified_admin outbox row observed status sent; actual mailbox receipt not independently checked.


## 2026-11-21 applicant manuscript handoff repaired
- Maurice's uploaded original PDF found in private mpid-applicant-manuscripts storage (application 36eb0794-5def-4c5f-ab55-ca091ae649fd). Onboarding project f2bc6b19-c4f7-4842-9a74-c9ea3447a496 initially showed 0 documents.
- Deployed rsm-onboarding-worker v6, adding idempotent source-manuscript copy and mpid_documents registration for completed onboarding jobs, preserving originals and requiring no new author upload. Confirmed target storage object exists and project document b3156828-3088-4993-b814-5501418eb473 registered with original filename. Browser UI refresh and future-author acceptance still pending.


## 2026-11-21 dashboard confirmation and PDF intake limitation
- Administrator confirmed Publishing Projects Files=1 for Maurice's project after handoff. Live SQL confirmed source document registered. Manuscript edit runs for this project: zero.
- Inspected active rsm-manuscript-queue source: it extracts DOCX with mammoth but treats other formats using file.text(). Maurice's original source is PDF; must add PDF-safe extraction/conversion before invoking edit run. No processing run initiated.


## 2026-11-21 PDF manuscript processing implementation
- Deployed rsm-manuscript-queue v20 ACTIVE with PDF.js PDF text extraction and page-level insufficient-text rejection. DOCX/TXT/MD paths retained. Source manuscript preserved. Deployment confirmed; no authenticated runtime extraction or editing acceptance executed.


## 2026-11-21 PDF runtime preflight enhancement
- Live application/project contract check: approved Publish-Ready, $500 family 50/50, signed agreement, active manuscript document, no existing edit runs. Deployed rsm-manuscript-queue v21 ACTIVE; authenticated preflight now downloads PDF and attempts PDF.js extraction, validates text length and word count, and reports pass/fail without creating an editing run. Authenticated browser invocation not yet performed, so runtime extraction not yet passed.


## 2026-11-21 dashboard workflow placement and editorial requirements
- GitHub admin-dashboard.html commit 07d1eea moves existing Manuscript Processing | Private Editorial Review section directly below Publishing Projects and updates obsolete PDF support text. No new editing run initiated. Deployment/browser rendering not yet verified.
- Editorial acceptance requirement: preserve immutable original, readable edited DOCX, separate understandable editorial recommendations and author questions, private admin QA and approval before author-facing release. Do not silently alter facts or substantive meaning. Current editor outputs are preliminary and need acceptance review against these requirements.

## 2026-11-21 continuation reconciliation (read-only)
- Re-read all four continuity files and compared live Supabase schema/function inventory. Live public tables have RLS enabled; rsm-manuscript-queue v21 is ACTIVE.
- Read-only live project/document query: The VA Loan Millionaire is onboarding, linked to its application, with exactly one registered manuscript document. An unrelated RSM TEST project remains with zero documents; no records changed.
- Attempt to retrieve deployed rsm-manuscript-queue function bundle failed with connector InternalServerErrorException (Failed to retrieve function bundle). This is not a runtime preflight failure. Authenticated PDF extraction preflight remains UNTESTED; do not start editing or release on this evidence.

## 2026-11-21 preflight diagnostics source enhancement
- GitHub commit 3ca986fed0df2196d0a90ca74ce6ee733d95ea03 enhances the existing administrator Check Editing Readiness status to display available PDF page/word/character metrics and per-check detail. It does not invoke processing, change payment controls, or release files.
- Full inline dashboard script compiled via JavaScript Function constructor after edit; exactly one closing HTML document verified. Authenticated PDF preflight and live browser rendering remain unverified. No author communications or processing runs initiated.

## 2026-11-21 manuscript selector usability repair
- Dashboard commit 17f9922e432c45b036630c1bb00d5c4e612fa762 adds Project to process selector directly within Manuscript Processing | Private Editorial Review. Selection synchronizes existing Manage Project and invokes existing approved application/manuscript loader; selects the only matching option when unique. Existing source/contract gates and admin release unchanged.
- Full inline JavaScript compiled successfully after change. Authenticated browser UI and PDF preflight still unverified. No client messages or edit runs.

## 2026-11-21 manuscript preflight selector repair and legacy test cleanup
- Dashboard commit 4fb71f160cded8fb5b7fa837566a0051f6a86cde hides obsolete Isolated AI Editing Test panel from normal operations (code retained) and removes The Perfect Marriage placeholder. Replaces fragile name/title/package application matching with project's canonical application_id, auto-selects unique linked approved application and registered manuscript, and resolves choices again before preflight.
- Live SQL confirmed Maurice's project links one approved application and has one active manuscript. Inline JavaScript syntax compiled after change. Authenticated browser and actual PDF preflight remain pending. No edit run or customer notification initiated.

## 2026-11-21 authenticated preflight result reported by administrator
- Administrator selected The VA Loan Millionaire and registered source PDF in live dashboard. Readiness response: Preflight passed, with seven PASS checks: project/application records, real project/source, approved application/scope, matching title/package, signed live agreement, verified commencement payment, supported input type.
- Reported UI did not show PDF page count, word count, or extraction quality evidence. Treat contractual/source readiness as PASS, but extraction fidelity and editorial QA as NOT VERIFIED. Do not conflate supported PDF type with accurate extraction.

## 2026-11-21 Submission Notification Center reconciliation
- Live SQL: one active mpid_documents row, Maurice's registered original manuscript, with no mpid_submission_reviews.reviewed_at; therefore Awaiting Review=1 reflects an unacknowledged real intake document, not a Perfect Marriage test. No database review state was changed.
- Dashboard commit 98e4c8c1b47e87db7c549e009bbc3c9ffa9ea091 clarifies that submission review is intake acknowledgment rather than editorial approval, renames action Acknowledge Receipt, and excludes hidden test-project documents from counts. Inline JS syntax passed. Browser runtime unverified.

## 2026-11-21 Maurice manuscript receipt acknowledged
- Administrator reported successful Submission marked as reviewed. Live Supabase query verified mpid_submission_reviews.reviewed_at=2026-11-22 03:57:24.045+00 for Maurice original PDF. This is an intake receipt acknowledgment only; no editing, editorial QA, or author release.

## 2026-11-21 private manuscript start handoff fix
- Dashboard commit fbdc1fae9e17b548b2345a738beb8c3a72b55be8 makes Start Resumable 6×9 Layout Draft resolve canonical linked approved application and registered manuscript automatically, matching preflight; corrected instruction to Continue All Segments. JavaScript source syntax PASS. No editing run created or OpenAI credits spent by this change.
- Supabase rsm-manuscript-queue v21 ACTIVE; original manuscript remains registered. User-confirmed preflight passed seven gates; page/word extraction fidelity and generated deliverable QA remain unverified.

## 2026-11-21 active manuscript UI simplification
- Dashboard commit 3129b41c8eeb767a4b85ee79b7ee2ab7ad9122be hides disabled Legacy Editor Retired button and legacy manual RSM Manuscript Processing Center, preserving elements/handlers for compatibility. Orders and numbers active controls: 1 Check Editing Readiness, 2 Start Private Manuscript Draft, 3 Continue Draft Processing; Pause and Refresh Draft Progress remain available. No database change, payments, author notifications, or editing run.
- Full inline JavaScript syntax compilation PASS. Browser acceptance still pending; additional dashboard-wide control audit remains.

## 2026-11-21 active draft controls and current live run status
- Live SQL verified Maurice's The VA Loan Millionaire has no rsm_manuscript_edit_runs rows yet. No private editing run has been started.
- Dashboard commit ea1e6a9e983e9221382556d7b93dd71f8ab1dff4 disables Continue Draft Processing when no active processing run, and disables Start Private Manuscript Draft when an active run exists. Inline JavaScript syntax PASS; browser runtime pending. No client communication or processing charge.

## 2026-11-21 single project selector restoration
- Dashboard commit 428d0bdd32879229513278edc8ea58b0893b4b51 hides duplicate manuscript Project to process selector (retains synchronized DOM dependency). Main Select project now loads canonical linked manuscript and refreshes private editing progress on selection change. Source JavaScript syntax PASS, live browser behavior pending. No database mutation or author communication.

## 2026-11-21 selected project continuity
- Dashboard commits d78896f9e32874179153e77adf1ccca07f3f0c7b and ee75aa4deb41aa1276a142097bdf098c798d68d9 persist selected project in browser session, restore on refresh if still authorized/visible, scope Publishing Projects table to current selection, rerender table on switching projects, and reload canonical manuscript/private run status on refresh. No backend records changed. JS syntax PASS, live browser QA pending.

## 2026-11-21 canonical project selection propagation
- Dashboard commit a4a69e518c0ebb0b84ce562308c2431892adeaf9 routes upload, findings and checklist dropdown project changes through the main project selector change handler so manuscript context, progress, table, details, audit and activity update together. Checklist dropdown also synchronized by syncProjectSelectors. Main selector relabeled Active publishing project. JavaScript source syntax PASS, authenticated browser acceptance pending. No client data changed or notifications sent.

## 2026-11-21 single-action private manuscript processing
- Reviewed live Supabase rsm-manuscript-queue v21 source. It supports private PDF extraction, segment persistence, OpenAI copyediting, numeric and word-count QA checks, private 6x9 DOCX and editorial report, no automatic author release. Existing browser workflow required separate Start then Continue clicks.
- Dashboard commit d8a0ed912981f30dbd521efaf8040d8add0a19b5 exposes a single Process Private Manuscript action: resolves canonical project source, creates a private run when none exists, and processes or resumes segments with paid OpenAI credits after confirmation. Old preflight/start buttons hidden but retained for compatibility; pause and refresh remain. JavaScript syntax PASS, authenticated runtime not verified. No run started and no client notification sent.

## 2026-11-21 processing failure investigation
- Live SQL confirms Maurice project f2bc6b19-c4f7-4842-9a74-c9ea3447a496 linked to approved application 36eb0794-5def-4c5f-ab55-ca091ae649fd and original manuscript document b3156828-3088-4993-b814-5501418eb473. No rsm_manuscript_edit_runs row was created.
- Dashboard commit fb1feec5e0b20cf3317132d9f1d23ab6aa031c0a preserves detailed failure message after refresh, reads Supabase function response error body, and removes stale direction to hidden Start button. Full HTML retained (245235 chars), inline JS syntax PASS. No editing run initiated, no client communication.

## 2026-11-21 live manuscript source selection fix
- Dashboard rsmLoadProcessingChoices selected source from cached documents array, which can be stale. Commit 234c253bbf82f9caca6383c44c3c0ef67c5c8c33 changes selection to live authenticated mpid_documents query scoped to project, manuscript and nonarchived rows. Full dashboard preserved; inline JS syntax PASS. Runtime start unverified.

## 2026-11-21 private manuscript editorial artifacts created outside portal
- Recovered Maurice Watkins original PDF from available Project/Library file; created preliminary private Word working draft and editorial review report in current conversation, using local file processing. Source PDF 21 pages, approximately 6,800 words. Rendered draft (24 pages) and report (2 pages). Draft is extracted/reconstructed text with only limited conservative editing, not a completed copyedit, layout proof or source-verified final manuscript. Original PDF unchanged. Files are not uploaded to Supabase, no edit run exists and nothing was sent to author. Need full editorial copyedit and source/page fidelity QA before any release.

## 2026-11-21 manuscript engine live deployment v22
- Inspected actual deployed rsm-manuscript-queue v21. Found malformed PDF-specific preflight regex (/\\\\.pdf$/) and malformed preflight word split (/\\\\s+/). Corrected both in live Supabase Edge Function v22, retained JWT verification and admin checks, original manuscript protection, contract/payment safeguards, private staging and admin release gate. Dashboard commit 2c2d38a174775fa87ee65552b4cd0a9556f1e80f now immediately loads private review center on run completion. Live SQL after deployment still returns zero runs for Maurice; runtime processing and edited outputs not verified. No author notification or release.

## 2026-11-21 approved manuscript processing auto-start integration
- Dashboard commit 504f4bcc439f2781397c9521ca3e325256233ed2 corrects canonical project selection precedence and adds a narrowly scoped authenticated dashboard auto-start for previously authorized Maurice project f2bc6b19-c4f7-4842-9a74-c9ea3447a496 on dashboard refresh. Existing admin JWT, paid OpenAI, contract/payment verification, original-file preservation, private staging and administrator release gate remain. No new blanket automation for other clients. Prevents repeat auto-attempt within same browser session, avoids restarting completed/failed runs, and resumes existing active run. Source JavaScript syntax PASS; live authenticated runtime and actual run remain unverified. No author release.

## 2026-11-21 PDF cover-page extraction incident
- Maurice's authenticated processing returned `PDF page 1 needs text extraction review | No run created`. Root cause verified in `rsm-manuscript-queue` source: every page required at least 15 extractable characters, incorrectly rejecting cover/blank pages. Deployed Supabase Edge Function v23 ACTIVE: preserves PDF page order, skips short/blank pages and requires at least 300 extractable characters across document. JWT/admin/payment/contract and private staging/release controls unchanged. Live end-to-end manuscript editing still requires verification. No run was created by the failed attempt.

## 2026-11-21 Maurice manuscript finalization recovered
- Live run 45fdcf7f-6204-4966-bd9c-f20a2d98b686 completed all 13/13 AI editing segments. Finalization produced private DOCX and editorial-report TXT in both private storage and `mpid_editorial_deliverables` as pending_review, but status update failed HTTP 400. Root cause: existing `rsm_manuscript_review_alert` trigger emits `manuscript_review_ready_admin` not allowed by `mpid_notification_outbox_event_type_check`. Applied Supabase migration `allow_manuscript_review_ready_admin_notification`, preserving existing event types, confirmed constraint. Recovered existing run by conditional update only after verifying both pending_review registrations and 13/13 completion; returned status=review, qa_status=needs_review. Original source untouched; no author release. Private deliverables require substantive human QA, not publication ready.

## 2026-11-21 private review list visibility correction
- Live SQL confirms Maurice has exactly two `mpid_editorial_deliverables` pending_review: 6x9-layout-review-draft.docx and editorial-report.txt. Admin-only RLS policy exists. Dashboard source commit 5155c8b6e3f561d91f9f6f73f8b8b8eeee3a452a calls stageLoad during main refresh, shows loading/error/selection guidance in stageList, and chooses the only project when there is exactly one. Inline JS syntax PASS; browser and published-site behavior not verified. No release.

## 2026-11-21 editorial report format correction
- User correctly identified that raw TXT editorial reports violate agreed professional DOCX/PDF review standard. Dashboard commit cc6218274185fa51522c2ff4ff9235670842f86c adds narrowly scoped `Create Formatted Word Report` for Maurice's existing pending_review editorial-report.txt, producing a private DOCX `RSM_Editorial_Review_Report.docx` with headings and admin-review warning. Original TXT retained for audit, original manuscript untouched. JS syntax PASS; live browser conversion and DOCX output pending verification. Do not approve or release.

## 2026-11-21 EDITORIAL QUALITY BLOCKER
- User inspected Maurice's generated DOCX editorial report and rejected it as unprofessional. Confirmed engine source assembles report from concatenated raw `editorial_notes` by segment with generic QA flags, no true manuscript-specific editorial assessment or traceable references. Dashboard TXT-to-DOCX conversion only changed presentation, not substance. Report includes unsupported KDP readiness claim, false confidence in facts, boundary artifacts and em dash additions. Existing deliverables MUST remain pending_review, no approval or author release. Require redesigned structured editorial assessment and independent factual/original-fidelity QA, with chapter/passage evidence and actionable author questions; do not misrepresent automated copyedit as substantive verification.

## 2026-11-21 dashboard integrated assessment correction
- GitHub commit 99973ad0b7bf89f4b3ab0ed7dd0367b18ffcae9d replaces Maurice's raw TXT-to-DOCX button with private `Generate Editorial Assessment (Word)` action. Reads all 13 completed `rsm_edit_segments` using admin SELECT RLS, produces source-excerpt-linked prioritized editorial concerns, author questions, numerical-token integrity warning and release gates. Uses private staging and existing deliverable registry. Removes stale loading indicator. JS syntax check PASS; browser generation, document inspection, factual accuracy and author release NOT verified. No files sent to author.

## 2026-11-21 package scope and corrections register
- Verified Maurice's live `mpid_projects.package` is `Publish-Ready`, status onboarding. Commit a73f17d323d6821e1a0880edb3f19157c05b6b28 extends private dashboard assessment with live package label, scope boundary and source-versus-edited changed-region register for all 13 segments. Does NOT establish complete per-edit tracked changes, signed agreement package entitlements, substantive accuracy, or end-to-end browser success. No author release.

## 2026-11-21 private review UI cleanup
- User confirmed current assessment report looks good and requested unnecessary buttons removed. Verified live staging has four pending_review artifacts: current `RSM_Editorial_Assessment_Action_Plan.docx`, current `6x9-layout-review-draft.docx`, superseded `RSM_Editorial_Review_Report.docx`, and source `editorial-report.txt`. Dashboard commit 5620ae203cceb8cc55c426b9e52e42d66d3b84a9 hides superseded report rows when current assessment exists; retains underlying private records, original manuscripts and legitimate download/approve/release actions. Inline JS syntax PASS; browser verification pending. No author release.

## 2026-11-21 detailed author findings dashboard enhancement
- Dashboard commit 6678afd20366c7f836ac190b645976378a997b5c adds `Generate Detailed Author Findings` on the current assessment row. New private `RSM_Editorial_Findings_Author_Instructions.docx` explains each source-linked review flag using original passage, RSM work performed, why review is needed, precise author response options, next RSM action and pending status; copyediting register uses BEFORE/AFTER labels. Supersedes prior assessment in active list only after new document exists; preserves audit records. JS syntax PASS; browser generation and document quality NOT independently verified; no author release.

## 2026-11-21 | Editorial objective reaffirmed
- User confirms manuscript-first objective: correct as much as safely possible in the contracted package; show all corrections transparently; offer precise recommendations to strengthen the book; require author decisions only for matters that cannot be safely resolved by RSM. Author receives clean edited manuscript plus intelligible corrections and actionable advice. Current automated run/report does NOT yet prove complete copyediting, per-edit traceability or publication-ready QA.

## 2026-11-21 streamlined private deliverables navigation
- Commit ebe4053997028aa13f33679a7809bd1fa7b9ef54 hides redundant `Refresh Private Deliverables` button and automatically loads project private deliverables when project selection changes. Existing manual refresh handler retained internally; approval and author-release controls preserved. Inline JavaScript syntax PASS; browser end-to-end verification pending. No author release.

## 2026-11-21 automated project stage synchronization
- Root cause verified: Maurice's live project remained onboarding despite manuscript run 45fdcf7f-6204-4966-bd9c-f20a2d98b686 having 13/13 completed segments, status review and qa_status needs_review. Supabase migration `sync_publishing_project_editing_from_editorial_work` added secured database triggers for edit-run and private-deliverable activity, advancing earlier-stage projects to editing without changing on_hold/completed/production/proofing. Backfilled existing active runs. Verified Maurice project now status editing; run remains review and requires QA. GitHub commit 3697879f0d6b17df5603d4c3f5b42cb4a899941e makes manual status an exception override, refreshes selected project's live status, and subscribes to project status updates. JavaScript syntax PASS; browser realtime/visibility end-to-end still pending. No author release.

## 2026-11-21 | Enterprise platform architecture audit
- Verified live Maurice project stage editing and manuscript run 13/13, status review, QA needs_review; `mpid_audit_findings` has ZERO rows and `mpid_approvals` ZERO rows while 5 private editorial deliverables are pending_review. This means the Editorial Audit Management Center is not registering the processing output as structured audit findings. The platform is NOT yet an enterprise-grade integrated workflow. Commit d6c8ff735b5d849be5a84f76bad0b191430e70ee adds live workflow evidence and discrepancy warning to Editorial Audit Management Center and removes its redundant Refresh Audit button. JS syntax PASS; browser verification pending. No findings were fabricated or author records changed.

## 2026-11-21 | Editorial audit ingestion implementation
- Root cause: prior Editorial Audit Management Center update only displayed evidence warning, did not register actual manuscript-engine uncertainties. Supabase migration `register_source_linked_manuscript_uncertainties` successfully created `rsm_audit_finding_sources` (segment-to-finding uniqueness, RLS admin SELECT) and admin-only RPC `rsm_register_editorial_uncertainties(run_id)` for idempotent source-linked open findings from explicit uncertainty notes. Dashboard commit 38a6aebcd01a118a6c6f3d45f8106a8aa54658f3 calls RPC during refresh before querying findings; JavaScript syntax PASS. Live database currently still has zero Maurice findings because administrator-authenticated browser RPC has NOT yet been exercised; migration runner cannot invoke admin-only RPC. This is NOT yet an end-to-end verified fix. Source notes include potential segment boundary artifacts; human QA required before author action. No author notifications/releases.

## 2026-11-21 | Live editorial findings now registered
- Directly registered five provisional source-linked editorial uncertainties for Maurice's existing 13-segment processing run in live Supabase; verified 5 mpid_audit_findings rows, 5 unique source-segment links, all open, 0 author checklist items. Entries are RSM QA flags, NOT confirmed errors or author tasks; no author notification/release. Dashboard commit 7003c7939971ac1571c8cbe830009beca9d1f503 removes fragile administrator RPC dependency on every dashboard refresh and legacy Maurice-specific auto-start; JS syntax PASS. Database state VERIFIED, live browser rendering still pending. No duplicate links observed.

## 2026-11-21 | Author portal access and regression protection
- Confirmed author portal source `mpid-portal/author-dashboard.html` exists, uses Supabase author role/RLS, displays assigned project status and progress, shows only released checklist items and authorized files. It currently loads on demand; NO realtime subscription or automatic polling. Thus do not claim live push updates are implemented. Maurice's project is assigned to author profile c63019d2-9eaf-443c-84c8-963c9c672e1d, role author, stage editing. Application 36eb0794-5def-4c5f-ab55-ca091ae649fd: approved, agreement signed, payment partially_paid, invited_to_portal_at 2026-11-22 03:09:02 UTC. Invitation record does not prove he accepted/signs in; no new invite sent. Author portal access is due after signed agreement, verified initial payment, and authorized onboarding, not after editing. Do not expose internal pending_review files or provisional findings. Regression-protection and release-gate acceptance tests required before changes across admin, author, finance, storage or editorial flows.

## 2026-11-21 | Author onboarding guide added to portal
- GitHub commit 78f1976c4204aa7f402b813ec4ed208570922fe1 adds six-section professional author guide directly to `mpid-portal/author-dashboard.html`, inside authenticated dashboard. Covers activation, progress, submissions, edited manuscript and recommendations, author checklist responses, proofs and final deliverables. Original author authentication, upload, file access, approval logic unchanged. Existing Supabase `mpid-invite-author` edge function v8 still sends Supabase-managed invitation email only; no separate RSM-branded welcome instructions or tracked delivery. No new invite/email sent. Browser verification pending. Future enhancement: branded guide email via controlled, idempotent notification pipeline, subject to explicit send approval for real authors.

## 2026-11-22 | Intake automation checkpoint
- Live Supabase: public.rsm_manuscript_intake_jobs created with unique source_document_id, admin-only SELECT RLS, and mpid_documents INSERT trigger. Maurice's original manuscript registered as awaiting_assembly. Foreword is NOT yet registered in project storage and is NOT merged into working manuscript.
- Editorial findings schema expanded with source document/page/paragraph/section, original and corrected excerpts, suggestions, action owner, change type and verification notes. Existing five findings remain open, private, and without fabricated locations.
- Still incomplete: automatic foreword assembly, package-scoped processing worker, verified page-anchored annotations, QA, KDP-ready export, dashboard order, author release. No new editing run or author release performed.

## 2026-11-22 | Live resumption verification
- Re-read all four continuity records and inspected live Supabase tables, readiness view, and rsm-manuscript-queue v23. Maurice remains editing with 0 registered forewords, 1 awaiting assembly, 5 unresolved provisional findings, 5 pending private deliverables, 0 released, 1 QA review run.
- Existing queue v23 accepts original source_document_id and does not assemble a foreword. Do NOT start a new run against original alone while foreword is pending. No new deployment, author release, agreement, or payment request performed.
- Next prerequisite: obtain/register actual Colonel Jackson foreword in private project storage, then build versioned source assembly and gated processing. Browser acceptance remains pending.

## 2026-11-22 | Foreword integrated into manuscript working copy
- Created `The_VA_Loan_Millionaire_Manuscript_With_Foreword.docx` locally from existing `MPID_Maurice_Watkins_Publication_Candidate_v7(1).docx` plus recovered original Carlos T. Jackson foreword. Foreword now appears after title page, before Contents, and Contents includes Foreword. Original candidate untouched. DOCX rendered successfully to PDF for page inspection. This is a local assembled working copy, NOT yet uploaded to Supabase, NOT a final KDP-ready or author-released deliverable. Note base candidate still bears old title `YOUR VA HOME LOAN BENEFIT EXPLAINED`; approved project title is `The VA Loan Millionaire`, so title reconciliation/QA remains. No live payment or agreement action.

## 2026-11-22 | Restored exact seven-stage dashboard requirements
- User supplied prior-session operational handoff. Confirmed intended dashboard stages in order: (1) Application, Agreement & Payment; (2) Author Onboarding & Manuscript Intake; (3) Manuscript Processing; (4) Editorial Audit & Quality Assurance; (5) Author Review & Approval; (6) Book Production & Proofing; (7) Final Payment & Publication Readiness. This ordering is APPROVED DESIGN, not yet deployed or browser verified.
- Integrated Colonel Jackson foreword is already present in locally assembled manuscript `The_VA_Loan_Millionaire_Manuscript_With_Foreword.docx`. Do not re-request or reassemble. Live Supabase version registration remains unverified, and previous run's 13/13 segments must not be mistaken for the revised edition.
- Existing 5 findings remain open and 5 private deliverables awaiting review per last live checkpoint. Do not resolve/release without manuscript-linked verification. Admin should review and approve, not manually orchestrate technical steps. No code deployment or client send in this continuity update.

## 2026-11-22 | Seven-stage administrator dashboard source deployment
- GitHub commit `7dd0face50571a54e72598c3be058ee6f746f62f` replaces presentation-only `mpid-portal/rsm-workflow-order.js` with seven ordered operational stage containers. It moves existing DOM panel nodes without recreating their handlers and retains unmatched controls in Additional Administration Controls. `mpid-portal/admin-dashboard.html` and its exact filename unchanged. Source syntax passed via JavaScript compilation. Authenticated browser/visual acceptance is NOT yet verified; author review stage currently has no dedicated mapped panel and must be integrated with release workflow before calling complete. No Supabase mutation or client send.

## 2026-11-22 | Seven-stage placement refinement
- GitHub commit `c941df975fc6faf8c802380f71100dfc75efa1e8` moves existing Author Action & Approval Checklist and Private Editorial Review & Release panels into stage 5 (Author Review & Approval), rather than leaving stage empty; maps Operations Center to stage 1. Verified panel IDs/headings against live dashboard HTML source and workflow-order script syntax PASS. Authenticated browser acceptance pending. No customer data or external sends.

## 2026-11-22 | Admin Dashboard seven-stage navigation enhancement
- GitHub `mpid-portal/rsm-workflow-order.js` commit `c445c35a6c0ed9e8c1425e24c8b42e280457f9d5` adds seven-stage jump navigation, accessible labels, responsive navigation, section anchors and final-stage payment/release guidance. Existing dashboard HTML and panel elements/handlers preserved; login/setup sections remain outside workspace. Source JS syntax PASS; authenticated browser acceptance remains pending. This is a dashboard presentation release, not manuscript processing completion. No Supabase mutations or external sends.

## 2026-11-22 | Live read-only project next-action queue deployed
- Supabase migration `rsm_editorial_next_actions_readonly_20261122` created `public.rsm_editorial_next_actions` as security_invoker read-only view based on existing readiness counts. Live SQL verified Maurice action `manuscript_assembly`, 1 awaiting assembly, 5 open findings, 5 private deliverables. This is guidance only, not a processing trigger or manuscript upload.
- Dashboard HTML commit `dca9910f069d387db4c3280a88d2354413979fdc` adds Project Workflow | Next Required Action panel using authenticated Supabase session, safe DOM text rendering and refresh button. Workflow JS commit `40147d9286df5e1927978c3bd520b32397a9f20e` places panel first in stage 1. Browser/authenticated acceptance pending. No client sends, manuscript release or changes to historical findings.

## 2026-11-22 | Assembled manuscript automatic intake registration deployed
- Supabase migration `rsm_register_assembled_manuscript_versions_20261122` updated existing `public.rsm_register_manuscript_intake` trigger to recognize document_type `assembled_manuscript`, `working_manuscript`, `manuscript_revision` or manuscript filenames containing `with_foreword`, creating an idempotent intake job with `document_role=assembled_manuscript` and `status=ready_for_processing`. Original manuscripts still register as `awaiting_assembly`; original records are not overwritten. Trigger does not start editing or release anything. Migration success returned; existing Maurice readiness unchanged, because integrated local DOCX has not been uploaded. Need live upload and integration acceptance.
- IMPORTANT: Prior GitHub consent UI incorrectly characterized a dashboard HTML write as empty-content. No new GitHub dashboard HTML write was attempted in this session. Before future GitHub writes verify complete nonempty content and require safe consent description.

## 2026-11-22 | Private assembled manuscript ingestion endpoint deployed
- Supabase Edge Function `rsm-assembled-manuscript-upload` v1 ACTIVE, verify_jwt=true, function ID `ca009af4-399a-4c50-bd2f-1ec1ac1609f0`. Admin JWT and profile role required; accepts <=20 MB DOCX multipart file, checks ZIP signature, hashes SHA-256, uploads to private `mpid-manuscripts/projects/{project_id}/assembled/{sha256}/...`, registers `mpid_documents` version `assembled_manuscript`; existing DB trigger creates ready_for_processing job. No external notifications or releases. Deployment succeeded but authenticated request test not executed. Existing combined Maurice DOCX exists locally at `/mnt/data/The_VA_Loan_Millionaire_Manuscript_With_Foreword.docx`, 55KB. No direct upload route from current container, and no dashboard UI wired yet. Live query confirms zero assembled documents for Maurice. GitHub dashboard HTML not modified to avoid ambiguous empty-content authorization dialog.

## 2026-11-22 | Private assembled intake connected to Admin Dashboard
- Edge Function `rsm-assembled-manuscript-upload` v2 ACTIVE, JWT verification, explicit CORS origin `https://rightsideofmoney.com`, role check, hash/idempotent private upload and DB registration. GitHub commit `425ce041b0fc3c062a70ae39ea36cacde390d69f` adds an admin-only Complete Manuscript Intake panel inside stage 2 of existing `rsm-workflow-order.js`, with project selection, DOCX upload, queue registration and safe status. Existing `admin-dashboard.html` was not overwritten. Script syntax compiled successfully before commit. Existing combined DOCX has legacy first-page title `YOUR VA HOME LOAN BENEFIT EXPLAINED` despite approved project title `The VA Loan Millionaire`, so title reconciliation and final QA required. The assembled DOCX is still local; authenticated upload and actual queue processing not yet verified. Do not represent as KDP-ready or author-released.

## 2026-11-22 | Latest manuscript version QA gate strengthened
- Migration `rsm_latest_manuscript_version_release_gate_20261122` requires successful editing run to reference the latest non-archived assembled manuscript document ID, not an older manuscript. Verified live Maurice `editorial_release_ready=false` with all four gates false. Local editorial candidate DOCX inspected: 226 paragraphs, title `THE VA LOAN MILLIONAIRE`, Foreword present; local file not yet in private Supabase storage. No author release.

## 2026-11-22 | Atomic latest-version processing claim deployed
- Migration `rsm_atomic_assembled_intake_queue_20261122` plus guard fix `rsm_atomic_claim_role_guard_20261122` deployed `public.rsm_claim_assembled_intake_job()`. Only service_role can atomically claim a `ready_for_processing` job for the latest, unarchived assembled DOCX in private project storage. Row locking with SKIP LOCKED prevents concurrent double claims; claim changes status to `processing`, but DOES NOT run an editor, produce QA, or release author materials. Source function verified through live SQL. Next: worker and authenticated manuscript upload.

## 2026-11-22 | Continuity reconciliation: dashboard workflow and editorial production
- Verified GitHub source `mpid-portal/admin-dashboard.html` SHA `50171c4ff4f7bc01aa39713787553198209ed478` includes `rsm-workflow-order.js` and `rsmNextActionCenter`. Verified workflow script SHA `be28d5935e9fa3cd552b70ac857c7d77058bdbfd`, nonempty (9,298 characters), defines seven ordered stages and `rsmAssembledIntake` in Stage 2. This verifies repository source only; authenticated browser and deployed website behavior are NOT verified.
- Seven stages: 1 Application, Agreement & Payment; 2 Author Onboarding & Manuscript Intake; 3 Manuscript Processing; 4 Editorial Audit & Quality Assurance; 5 Author Review & Approval; 6 Book Production & Proofing; 7 Final Payment & Publication Readiness.
- Supabase `rsm-assembled-manuscript-upload` v2 is ACTIVE with verify_jwt=true. Other existing editorial engine/editor functions are ACTIVE, but ACTIVE deployment is not proof of end-to-end processing.
- Live `rsm_editorial_release_gates` for Maurice Watkins project `f2bc6b19-c4f7-4842-9a74-c9ea3447a496`: assembled=false, QA-passed latest-version edit=false, findings resolved=false, admin-approved deliverable=false, editorial_release_ready=false. Combined corrected-title DOCX was prepared locally, but not verified uploaded or registered. No author release or client send performed.

## 2026-11-22 | Project Records visual refinement
- GitHub commit `615f359002d24b58506238da579edcb9b73b578d` updates only `mpid-portal/rsm-workflow-order.js`, adding scoped responsive card styling for Project Details Active Documents, Editorial Findings and Author Approvals. Renames that overview `Project Records & Review Snapshot` and identifies findings/approvals as read-only summaries while their actionable controls remain in Stage 4 and Stage 5. Preserves existing dashboard HTML, DOM IDs, download/archive/delete handlers and live render functions. JavaScript syntax compiled before commit. Authenticated browser visual acceptance remains pending; do not claim duplicates across all dashboard sections eliminated.

## 2026-11-22 | Remove duplicated project-record findings and approvals
- GitHub commit `9b7226ab3fac713b720aacc4e82e733cd52d6976` updates `mpid-portal/rsm-workflow-order.js`: move existing Project Details/Manuscript & File Management panel to Stage 2; display active and archived files only, with original file action handlers preserved. Remove redundant read-only findings and author approval columns from that overview; authoritative findings remain in Stage 4 and author approvals in Stage 5. JS syntax validated. No actual manuscript upload, processing, or author release was performed. Authenticated browser QA pending.

## 2026-11-22 | Dashboard-native private editorial report generator deployed
- Deployed Supabase Edge Function `rsm-dashboard-editorial-report` v1 ACTIVE verify_jwt=true, checks admin identity, reads project, latest assembled DOCX metadata, latest edit run, QA flags and existing findings, and downloads any existing private editorial engine report. Writes a private TXT administrator review report to `mpid-manuscripts` under `private-ai-review/dashboard-reports` and registers a `pending_review` `mpid_editorial_deliverables` record idempotently by storage path. Does not author-release. GitHub `mpid-portal/rsm-workflow-order.js` commit `cabc9897b628c586a9d329350d25f5f499463af4` adds Stage 4 project selector, Generate Report for Admin Review, private report list and authenticated download. JS syntax compiled before commit. NOT YET browser-tested; no live invocation of report generation, and this is a summary of existing findings, not a fresh independently fact-checked manuscript edit.

## 2026-11-22 | Auto-registration of private dashboard editorial report
- GitHub commit `fc3fb3833a8198a814cf1ee92a6ac7e561e26d26` adds automatic Stage 4 report registration when an authenticated administrator selects a project with an existing editing run and no prior dashboard-generated report. Uses authenticated Edge Function `rsm-dashboard-editorial-report` and checks existing deliverables to avoid repeat generation. Existing manual Generate Report button retained for refresh/rebuild. No author release. JavaScript syntax checked. Browser and actual Supabase function invocation still unverified; source manuscript integration and editing worker remain outstanding.

## 2026-11-22 | Editorial report active-project synchronization
- GitHub `mpid-portal/rsm-workflow-order.js` commit `20ee4ffc19291ef8d83e84693d8416c0ba397866` synchronizes Stage 4 report project selection with the main `selectedProject` control and defaults to the sole available project. JavaScript syntax verified before commit. Existing local Maurice combined manuscript candidate file confirmed present, but there is no authenticated upload to private Supabase and no newly completed editing run. Live report generation remains unverified.

## 2026-11-22 | Editorial Quality Review UI streamlined; upload blocker remains
- GitHub `mpid-portal/rsm-workflow-order.js` commit `21051144ba08d53800ba99252a86b1c216d39798` renames Stage 4 audit panel to Editorial Quality Review, hides duplicate author approval history and manual finding status controls by default behind Advanced Finding Controls, and improves card styling. Existing findings and event handlers preserved. JS syntax validated. Local assembled Maurice DOCX confirmed exists at `/mnt/data/The_VA_Loan_Millionaire_Complete_Editorial_Candidate.docx`, but connected Supabase tools do not expose storage file-upload action and no authenticated administrator browser session is available to upload this local binary. No live private upload performed; do not claim otherwise. Stage 4 UI change is source-committed but not browser-tested.

## 2026-11-22 | User-confirmed dashboard-only editorial automation requirement
- User explicitly rejected generating manuscript/report files outside the RSM Publishing Services Admin Dashboard and any manual download/reupload steps. The required workflow is dashboard-native: retrieve the existing private project manuscript and foreword, assemble a versioned working copy without altering originals, process per contracted package, generate location-specific findings and corrections, present private report and edited manuscript for administrator approval, then route approved items to author review and produce KDP-ready deliverables only after QA and author approval. Current implementation does NOT satisfy this end-to-end requirement; prior local DOCX and report files are not integrated into private dashboard storage. No upload, fresh processing run, final QA or author release verified. Do not direct the user to download/reupload a local artifact again.

## 2026-11-22 | Private source reconciliation deployed
- Live Supabase inspection confirms Maurice project has exactly one registered `mpid_documents` manuscript, the original PDF `b3156828-3088-4993-b814-5501418eb473`; intake job `854388a9-b461-4d7f-98a9-de78d0b6f6a5` is `awaiting_assembly`, and latest editing run `45fdcf7f-6204-4966-bd9c-f20a2d98b686` is `review`/`needs_review` tied to original PDF. No registered foreword or assembled manuscript in `mpid_documents`. Deployed authenticated admin-only Supabase Edge Function `rsm-manuscript-source-reconciliation` v1 ACTIVE, which inspects private project source records and common private storage folders without moving/releasing files. GitHub dashboard workflow JS commit `9afc3e380d6f980f9db23e67299a2f84362429b8` adds Stage 2 automatic source check. Source check has NOT been invoked through authenticated dashboard; no foreword storage candidate verified. This is diagnostic groundwork, not the required automated PDF+foreword assembly or editorial processing worker.

## 2026-11-22 | Private PDF and foreword assembly function deployed, not executed
- Supabase `rsm-private-manuscript-assembly` v1 ACTIVE verify_jwt=true. Administrator-only Edge Function reads registered original project PDF and seeks registered/private foreword DOCX/TXT, extracts PDF text and foreword text, writes a new private DOCX working version with source-page labels, registers `mpid_documents` `assembled_manuscript` and preserves originals. Refuses assembly when foreword absent or PDF extraction insufficient. This is a text-only editorial working copy, NOT KDP-ready typesetting. Dashboard Stage 2 source panel gained `Assemble Existing Private Sources` button via GitHub `mpid-portal/rsm-workflow-order.js` commit `57dedfa42d340561be7348ba08c7cba4ff8839bc`. No authenticated invocation or assembly success verified. Automatic background assembly, actual full manuscript editorial worker, location-accurate edits, approval integration and author release are NOT complete.

## 2026-11-22 | Integrated foreword and automatic private preflight release
- **Live verified:** Existing Colonel Carlos T. Jackson foreword text (3,432 characters) was inserted into `public.rsm_manuscript_integrated_sections` for Maurice's project, sourced from existing complete manuscript candidate, as private integrated manuscript source. This eliminates separate foreword file dependency; original PDF remains unchanged. Migration `rsm_private_integrated_manuscript_sections_20261122` enables RLS and revokes client roles. Supabase `rsm-private-manuscript-assembly` v2 ACTIVE now uses integrated foreword text when creating versioned private DOCX. `rsm-manuscript-source-reconciliation` v2 ACTIVE recognizes integrated foreword. New `rsm-private-editorial-preflight` v1 ACTIVE implements mechanical DOCX preflight, private working DOCX, preliminary paragraph/page markers, private TXT report, open findings and `needs_review` editing run; it does not perform substantive VA loan fact-checking or final KDP layout. GitHub workflow JS commit `90986cb6288d51c60101905405a8ec5fbe069ab3` automatically attempts assembly and preflight on project source check, hiding manual upload panel. No author release. **Live post-deployment SQL confirms assembled manuscript NOT YET registered and no new editing run**, so no end-to-end success claim. Browser-authenticated invocation remains unverified. Full editorial QA, print page references, and approval/release integration remain incomplete.

## 2026-11-22 | Editorial preflight required-fields fix and production gate check
- Corrected `rsm-private-editorial-preflight` Edge Function to v2 ACTIVE: it now fetches project `application_id`, validates that an application exists, and includes required `application_id` and `approved_scope` fields when inserting `rsm_manuscript_edit_runs`. The previous v1 code omitted both non-null fields and would fail to register the run. Verified Maurice project has application `36eb0794-5def-4c5f-ab55-ca091ae649fd`, package Publish-Ready. Live SQL still shows old run `45fdcf7f-6204-4966-bd9c-f20a2d98b686` with `needs_review`; five pending deliverables remain. No authenticated execution of v2, assembled DOCX, final KDP proof or author release verified. Preflight is limited to mechanical spacing and must not be called substantive editorial QA.

## 2026-11-22 | Integrated release-gate audit and dashboard correction
- Reviewed actual `rsm_editorial_release_gates` view and found it requires `rsm_manuscript_edit_runs.status='completed'` and `qa_status='passed'`, but live check constraints previously prohibited BOTH values. Applied Supabase migration `rsm_align_edit_run_qa_constraints_with_release_gates_20261122` to permit the exact view-required statuses while retaining `needs_review` as preflight state. Did not mark any run completed/passed. Corrected dashboard workflow JS in commit `320b5491e6b8f908952548611899998ed9939a47` to remove obsolete manual assembly button and undefined private-report refresh call; automatic private source flow retained. Live release gate for Maurice: has_assembled_manuscript=false, has_qa_passed_edit=false, findings_resolved=false, has_admin_approved_deliverable=false, editorial_release_ready=false. Original PDF remains sole registered document. This confirms the project is NOT publication ready. No authenticated Edge Function execution available through current management connector, and no real author release attempted.

## 2026-11-22 | Dashboard-native report review and automatic source flow fix
- GitHub `mpid-portal/rsm-workflow-order.js` commit `65626d5cc6aafa10239c1191294dc99e662b0cd9` broadens Stage 4 report listing to include private editorial preflight reports and displays TXT content inline inside Admin Dashboard rather than requiring a file download. Source check now resolves the selected Stage 4 project as a fallback, Stage 4 selection triggers private source check, and automatic processing refreshes report list. Existing author release gate remains unchanged and locked. Code syntax validated before commit; no authenticated browser session or actual run executed. Latest known live state remains original PDF only and all Maurice release-gate conditions false.

## 2026-11-22 | Contracted AI editor wired to assembled source
- Supabase `rsm-manuscript-editor` v8 ACTIVE: now accepts versioned `assembled_manuscript` DOCX as well as original manuscripts, retains signed-agreement and verified-payment checks, uses approved application scope, writes edited DOCX and private report, registers pending-review report deliverable, and retains `qa_status=needs_review`. GitHub dashboard `mpid-portal/rsm-workflow-order.js` commit `99bd2945ac00005e502d13c196a4ecd7ceb41506` now automatically invokes this contracted AI editor after private PDF+integrated-foreword assembly, instead of stopping at mechanical preflight. Maurice application is approved, agreement signed, partially paid, approved Publish-Ready scope includes audit, KDP readiness, two revisions and final proof checklist. No authenticated execution test or new assembled manuscript registration yet. AI output does not prove source fidelity, accurate final page numbers or KDP layout; admin/author release still gated. No client notification or release.

## 2026-11-22 | Payment gate verified and automatic run detection corrected
- Live Maurice payment installment verified: $250 due/$250 verified, status paid, plus cancelled legacy $600 installment with $0 verified. Existing signed agreement and approved application previously verified. Supabase `rsm-manuscript-source-reconciliation` v3 ACTIVE now includes `report_storage_path` in latest run response; this fixes dashboard automatic pipeline detection, which checks that field to avoid duplicate edits. Live source document check still shows only original PDF version 1; no assembled manuscript registered. Authenticated browser execution and complete publishing QA remain unverified. No outgoing author action.

## 2026-11-22 | Editorial source-location review in dashboard
- GitHub `mpid-portal/rsm-workflow-order.js` commit `2255594782cbd7c9fa6d65a698e807141221a4dd` adds Stage 4 administrator-only read-only finding cards showing stored source section, PDF page, paragraph, original excerpt, proposed correction, author suggestion and verification notes. Missing locations are explicitly labeled not recorded; source PDF page is not misrepresented as KDP final page. Existing private RLS and release gates remain unchanged. JavaScript syntax validated, authenticated browser rendering not tested. No manuscript processing or release claimed.

2026-11-22: Editorial dashboard private findings export added in commit 352781536e74a1c7e97569b958848372c1540725. JavaScript syntax validated; authenticated UI and end-to-end editorial processing remain unverified. No author release or notification.

## 2026-11-22 | Continuity reconciliation and editorial readiness
- The Stage 4 private findings panel and administrator-only text export are committed to GitHub. They are interface capabilities, not proof of completed editing.
- Editorial automation is NOT production-ready: original-to-working-manuscript assembly, substantive editing, exact source-location verification, KDP-ready DOCX/PDF, authenticated end-to-end tests and gated author review remain incomplete or unverified.
- No client payment action, external communication or author release is authorized by this update.

2026-11-22: GitHub commit ab3324e3cd8e0674018c3c5197443c185e43746e fixes dashboard assembly handoff to retrieve the registered assembled manuscript from private mpid_documents instead of trusting a possibly mismatched function response. Original client document remains unchanged. Live Maurice check still showed original PDF only; no end-to-end run claimed.

2026-11-22: Editorial engine rsm-manuscript-editor v9 ACTIVE. It now prevents duplicate completed/review processing of the same source and registers the edited DOCX as a private pending-review deliverable. Dashboard Stage 4 commit e31c5ca758ed6b8cdfdb38d17c0d9bcdb182a29a adds private DOCX download for admin alongside TXT report. Neither deployment authorizes author release. End-to-end execution remains unverified.

2026-11-22: rsm-dashboard-editorial-report v2 ACTIVE generates private formatted DOCX audit (letter-size, branded headings, finding location and excerpt sections, QA and release warnings) alongside legacy TXT, registers DOCX as pending_review. Dashboard commit 21d18a45f5359a7689e67524d32b60a224933f36 identifies DOCX output. Maurice original remains in Supabase, but authenticated audit invocation and new DOCX file generation are not yet verified.

2026-11-22: Audited live editorial deliverables: 14 pending_review records, including Maurice's private drafts and a separate test project. GitHub commit 44ae685c2327f13a7b13939f0a250f28e314318c separates current formatted DOCX/PDF reviews from older drafts and TXT in collapsed private history. No database or storage deletion; manuscript originals, agreements and audit records preserved.

2026-11-22: Dashboard commits 47a0130273d8fccfb94d543b739e7c16d7e35561 and c7f56274725dfb9d09f0f79fb9133099fcb1e64b add selected-project editorial audit run control, automatic formatted DOCX audit generation after private editor success, and backfill generation for existing edit runs without re-editing. Syntax validated. No authenticated execution or author release.

2026-11-22: Corrected existing Manuscript Processing panel in mpid-portal/admin-dashboard.html, commit e830c01e9cd5ebcbe0485d54d44a90780aedaa3d. Its legacy Download Editorial Report now requests and downloads formatted private DOCX from rsm-dashboard-editorial-report v2 rather than TXT. Existing edited draft download rejects non-DOCX/PDF. All inline scripts passed syntax check. Authenticated browser invocation still unverified.

2026-11-22: FIXED LIVE registration failure for Maurice assembled manuscript. Supabase migration allow_assembled_manuscript_intake_registration aligned intake jobs role CHECK with existing trigger. Verified private storage DOCX existed, registered as mpid_documents id 27834501-e54b-4801-af4c-ba744d8ee725 version 2. Original PDF preserved. Processing and editorial QA not yet verified.

2026-11-22: Deployed rsm-dashboard-editorial-report v3, DOCX-only newly registered audit, historical TXT preserved privately. Corrected rsm-workflow-order.js selected project precedence commit ad55208be2874e2e9c504c582c8614bc5aa3cace. No authenticated editing run or DOCX content verified; editorial not release ready.

2026-11-22 late: Deployed rsm-manuscript-editor v10 ACTIVE. New runs based on assembled DOCX now generate 6x9 edited DOCX and private formatted editorial DOCX, verify exact source excerpts for proposed findings and record inferred PDF source page markers without fabricating paragraph numbers. Preserves admin QA needs_review and release gate. Existing Maurice assembled DOCX registered as v2. Authenticated editor invocation not available through connector and no new Maurice run yet; DO NOT mark editorial complete.

2026-11-23: Fixed Stage 4 report generation workflow in rsm-workflow-order.js commit 69319d454cda625c1c129ffaae6b041644536d5f. Button now reconciles assembled manuscript, executes editor against assembled DOCX when needed, then generates DOCX report; test projects excluded from workflow dropdowns. JS syntax validated; authenticated end-to-end still unverified.

2026-11-23: Identified dashboard false zero-current-documents defect: regex /\\.docx$/ was overescaped in rsm-workflow-order.js, hiding valid DOCX/PDF records. Fixed regex commit 90d1de6b947e43490726fa2a80630e66b7e221f4. Live DB has nine editorial deliverables, including private formatted DOCX audit, but latest edit run still references original PDF, not assembled DOCX. No author release.

2026-11-23: Fixed legacy Stage 3 processing source selection in admin-dashboard.html to use only registered assembled_manuscript records, not original PDF. Commit 622c78e954847a90d654b5a35f0e905b45c6fd44. Two inline JS scripts syntax-validated. Authenticated end-to-end remains pending.

2026-11-23: Updated rsm-workflow-order.js commit ba212eee886838f2d05b265c2dff859769221f57 to display current editorial documents only when backed by a completed output run linked to the registered working manuscript. Prior PDF-based drafts are retained as history, not current. JavaScript syntax checked. Authenticated end-to-end run still pending.

2026-11-23: Root cause found in Supabase function_logs at 08:25:54 UTC: Mammoth DOCX extraction threw 'Could not find file in options' because Edge Function passed {arrayBuffer} instead of Node-compatible {buffer}. Deployed rsm-manuscript-editor v11 ACTIVE using Buffer.from(bytes), readback confirmed. Authenticated retry and output QA still pending.

2026-11-23: Live editor POST returned HTTP 546 at 08:42:38 UTC after starting 08:40:09, with run b5bf1cfe-c74e-43c7-8bb7-ecabb04e3eb8 stuck processing. Confirmed no output paths, marked only that run failed with timeout reason via conditional SQL. Synchronous editor exceeds Edge Function execution window; needs resumable segment architecture. No author release.

2026-11-23: Deployed rsm-manuscript-editor v12 ACTIVE with persistent per-segment checkpoints in new RLS-enabled rsm_editor_segments table, and dashboard sequential segment processing commit 2435ee2011801021509c91ffcb0defdc57c1f03e. Authenticated live run still not verified. No author release.

2026-11-23: Authenticated Maurice working-manuscript run 7c047525-ee48-4988-b1d0-a1362531a960 completed 7/7 segments, status review, QA needs_review, two private DOCX outputs, no author release. User reported Word cannot open dashboard audit DOCX. Deployed rsm-dashboard-editorial-report v4 to extract DOCX source report using Mammoth rather than blob.text and sanitize XML-invalid control characters. Existing broken audit must be regenerated and verified.

2026-11-23: User confirmed dashboard editorial audit DOCX still fails to open in Word after v4. Stored report exists (18,876 bytes, updated 17:32:09 UTC) but validity not independently verified. Deployed rsm-dashboard-editorial-report v5 ACTIVE: new -v5 storage path and corrected filename, no duplicate embedded engine report, XML invalid surrogate sanitization, ZIP signature check. Await authenticated regeneration and actual Word open test. Manuscript edit run 7/7 remains review, QA needs_review, no author release.

2026-11-23: User confirmed both RSM_Editorial_Audit_Corrected_f2bc6b19-c4f7-4842-9a74-c9ea3447a496.docx and Edited_Manuscript_7c047525-ee48-4988-b1d0-a1362531a960.docx downloaded and opened successfully. Live DB confirmed corrected v5 audit and edited manuscript registered as private pending_review. This verifies user-observed file opening only, not content quality or KDP readiness. Run QA remains needs_review. No author release.

2026-11-23: Committed Stage 4 current-version editorial approval/release controls in mpid-portal/rsm-workflow-order.js, GitHub commit 15f86c3702a74ce706638386c844e10be3559e97. Controls: private approval, correction-request event, explicit confirmed author release using existing finalize RPC, private storage copy with SHA-256 retry comparison. No approval/release performed. Browser acceptance and author-portal verification pending.

2026-11-23: User reported printed 'Source PDF page 6' and original running header interrupting a VA funding-fee paragraph in edited manuscript, plus inconsistent hard-wrapped lines. Root cause verified in rsm-manuscript-editor v12: Mammoth raw text fed to AI and DOCX assembled by splitting editedText on each newline, preserving source PDF page markers. Current manuscript remains pending_review, no author release. GitHub commits ebbdab252726b7445d09bfe31e77444915200767 and 0b512fec1a58ae1431ad64eac2a94e72df3cd8f4 block approval of this specific defective draft in Stage 4 and legacy review. Clean regeneration still required.

2026-11-23: Deployed authenticated admin-only rsm-clean-manuscript Edge Function v1 (ACTIVE), reconstructing DOCX from completed rsm_editor_segments without AI rerun, removing exact known source PDF page markers and Maurice running headers, preserving original and creating new private pending_review deliverable. GitHub rsm-workflow-order.js commit 1980462ebd5ddb714b471812f37ca283b83d6786 adds explicit Regenerate Clean Edited Manuscript control and prefers clean current document. NOT EXECUTED for Maurice yet; Word opening, paragraph fidelity and layout not verified. No author release.

2026-11-23: User invoked clean manuscript regeneration; reported success removing 17 page labels and 15 running headers. Live DB confirms new private pending_review deliverable deeb8e67-e4f8-4852-93dd-d6f374b01a8f, Edited_Manuscript_Clean_7c047525-ee48-4988-b1d0-a1362531a960.docx. Found Stage 4 activeReports filter excluded clean filename; fixed in mpid-portal/rsm-workflow-order.js GitHub commit 240a5194bb0eeeaf30a2e6d719d46e46f0c69523. No author release. Word opening and editorial fidelity still require review.

2026-11-23: User confirmed clean manuscript opens but lacks page numbers, has inconsistent bold headings, VA funding-fee table content without table borders, em dashes and incorrect page starts. Inspected saved segment text and confirmed 3-column VA funding fee table is plain text. Deployed rsm-clean-manuscript v2 (ACTIVE) to generate distinct private typeset-v3 DOCX, 6x9, footer page numbers, bold uppercase headings, chapter breaks, em dash replacement and real bordered 3-column VA funding-fee table with fail-closed 4-row check. GitHub UI commit e2aae03afc9a2a663cf83eb5e166559083fca0b1 exposes Generate Typeset Manuscript with Tables & Page Numbers. Not yet invoked or inspected; other tables not verified. No author release.

2026-11-23: User reviewed typeset v3 and reported all headings same-size blue, chapter titles not on new pages, literal Manuscript before copyright, excess whitespace. Deployed rsm-clean-manuscript v5 ACTIVE with separate production-review v4 output: removes exact Manuscript marker, black Georgia typography with title/major/subsection/body size hierarchy, dedicated page breaks before Foreword, Copyright and identified MY FIRST HOME/chapter-number headings; retains bordered VA funding table and footer numbering. GitHub Stage 4 commit 033580938385ad6dff626de84f8eb8615ff37068 recognizes production-review output. Generation, complete chapter inventory and Word acceptance NOT VERIFIED; original and prior outputs preserved. No author release.

2026-11-23: User reported production-review v4 has no title page and poor front matter: foreword signature split, copyright immediately after foreword, introduction text without heading. Deployed rsm-clean-manuscript v6 ACTIVE generating separate BookLayout v5 DOCX. Front matter validation requires foreword, Carlos signature and rank, copyright, author contact boundaries; assembles title+author, copyright, foreword with adjacent signature/rank, introduction, body; dedicated page starts. Preserves original and prior private versions. Stage 4 UI commit 4162d51431ffa03622284bdd48e95fc70269a4cb exposes Generate Structured Book Layout. Not invoked or inspected yet; chapter inventory, paragraphs and KDP proof remain unverified. No author release.

2026-11-23: User confirmed BookLayout output still has incorrectly separated copyright/disclaimer paragraphs and asked to consult original manuscript for actual title/paragraph heading structure. Saved rsm_editor_segments excerpt independently confirms blank lines between wrapped disclaimer lines, and source-PDF page markers. Original manuscript page-by-page layout has NOT been reviewed; do not claim KDP readiness. Next work: inspect original private source file, reconstruct structural paragraphs and heading hierarchy, validate title page/copyright page/foreword signature/intro and tables. No author release.

2026-11-23 | User visually accepted latest The VA Loan Millionaire manuscript layout and spacing as working master. Preserve the accepted private DOCX and all historical outputs; do not regenerate automatically. Stage 4 final review controls are being reorganized to prioritize manuscript review, findings, and explicit approval. Author release and KDP proof remain separate unverified steps.

2026-11-23 | Author portal login defect: Maurice was prompted to enter a Supabase publishable key before activation. Corrected author-dashboard.html to use the project's verified active public publishable key automatically. Removed author-facing key setup and localStorage dependency. Service-role key never included. Existing invite/password/auth flows retained; live author invitation acceptance and sign-in remain untested.

2026-11-23 | Section 4 workflow updated for separate Approve & Send Edited Manuscript and Approve & Send Editorial Audit controls. Confirmed existing mpid_finalize_editorial_release RPC registers author-facing document and editorial release trigger queues author notification. Explicit admin confirmation required. Failed release retains approved status for retry. No real release or notification performed during implementation.

2026-11-23 | Enhanced author-facing instructions. Supabase mpid-send-notification Edge Function deployed v18: editorial release emails now identify project, exact filename/version, sign-in/download steps, manuscript vs audit review checklist, formal response steps, support and publication disclaimer. Author Dashboard now includes matching in-portal review instructions. No real client message sent during implementation.

2026-11-23 | Admin dashboard workflow source audit completed. Corrected seven-stage ordering: application/agreement/initial payment; author onboarding and intake; active manuscript processing before collapsed legacy tools; editorial audit and private staging; author checklist; production QA; final payment/readiness. Existing DOM nodes and handlers retained. Source-level verification only; authenticated browser regression outstanding.

2026-11-23 | Added optional package-specific comparison generator in Section 4. New isolated Supabase rsm-package-comparison v1 produces private DOCX edited manuscript and audit for selected Publish-Ready, Full Launch, Signature Author using assembled DOCX; independent rsm_package_comparison_runs table, admin-only RLS, separate storage paths, no author release. Current bounded engine supports 100 to 18,000 characters; production-scale manuscript handling remains to be implemented.

2026-11-23 | Corrected user-facing intent: optional manual package editorial audit and manuscript editing, not package comparison. Addressed Safari Load failed likely Edge Function gateway JWT rejection by deploying rsm-package-comparison v2 with gateway JWT verification off; function still validates bearer identity and mpid_is_admin internally. Dashboard now reports network/HTTP errors clearly. No author release.

2026-11-23 | Diagnosed user-reported package audit Load failed from live Supabase function logs: HTTP 500 and Mammoth 'Could not find file in options' during DOCX extraction. Fixed package audit Edge Function v3 to pass Uint8Array as Mammoth buffer rather than unsupported arrayBuffer option. No manuscript processing or author release performed.

2026-11-23 | Package audit v4 deployed with resumable section processing up to 300,000 extracted characters, source hash, saved section results, private DOCX assembly and excerpt verification flags. Dashboard loops through saved sections and displays progress. No actual generation test yet.

2026-11-23 | Signature Author live run ea94ad0d-8a39-42c3-ac7b-2f275beb158b paused with progress conflict; database confirmed 2 of 8 sections persisted. Added saved_segment_count and backfilled from JSON array length. Edge Function v5 uses atomic integer compare-and-set instead of full JSON URL filter, preserves existing sections and distinguishes database errors from concurrency. No author release.

2026-11-23 | Signature Author run ea94ad0d-8a39-42c3-ac7b-2f275beb158b resumed successfully and reached review, 8/8 sections persisted. Both private DOCX storage objects verified: edited manuscript 25,585 bytes; editorial audit 25,669 bytes. Admin dashboard reported download controls. No author release; file opening and editorial quality still pending.

2026-11-23 | User reported plain edited Word output unacceptable. Added private 6x9 formatted interior review DOCX generation from existing saved package sections (no AI rerun), separate formatted_manuscript_path, Edge Function v6 and dashboard formatting/download controls. Initial formatting includes serif typography, heading detection, page breaks, margins, footer numbering. NOT final KDP-ready: TOC, front matter validation, project-specific trim, PDF rendering and print QA outstanding.

2026-11-23 | Package editorial engine v7 ACTIVE: shared interior DOCX builder now used automatically on completion and on existing-run formatting. Existing saved sections preserved. Preliminary 6x9 layout only; final print QA outstanding.

2026-11-23 | v8 ACTIVE: title/copyright page separation, major/subheading hierarchy, left aligned single-spaced body, Markdown bordered tables, new versioned private formatting path. Existing runs preserved.

2026-11-23 | v9 added manuscript-specific section hierarchy and historical price table; user confirmed improved layout. v10 ACTIVE standardizes heading case and 18pt major/12pt subsection sizes; preserves prior private versions.

2026-11-23 | v11 ACTIVE shared package builder adds 0.2-inch first-line prose indentation, flush first paragraph after headings, zero inter-prose spacing, 6pt after headings. User confirmed v10 looks good.
