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
