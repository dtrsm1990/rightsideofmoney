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
