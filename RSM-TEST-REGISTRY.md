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
