# RSM Publishing Services | Public Verification Summary

## 2026-11-25

- Private staging source readback passed. Main excluded the import.
- Synthetic cover geometry accepted a matching template and rejected a wrong binding, page count, width, and rotation.
- Prior verified results remain in force: isolated revision and recovery checks, paperback rendering and package integrity, payment and release controls, authorized synthetic download, and EPUB archive and XML checks.
- Isolated deployment parity, full cover quality review, EPUBCheck, reading-system preview, and KDP Previewer remain open.

## Administrator workspace staging

- Static checks passed for the eight-stage config, workflow and all three inline script blocks, all 232 preexisting element IDs and preservation of existing gate calls.
- Read-only schema verification confirmed project readiness, signed format specifications, approval versions and private deliverable fields. Staged operations monitor source matches active version 5 byte for byte.
- Authenticated staging browser acceptance, visual cover QA, full isolated engine parity and rollback remain open. No previous acceptance tests were repeated.

- Confirmed the existing final readiness service returns signed agreement, verified payment, signed balance and exact proof approval status. The release guard remains authoritative for final eligibility.
- No isolated Supabase branch was available. A branch creation attempt returned an expired cost confirmation. Authenticated acceptance remains open.

- Targeted DOM fixture checks passed for six upload actions, single-form movement, project and busy guards, and readiness error, unpaid and paid states. The live sign-in page rendered in a browser. Authenticated storage was not exercised.


## Isolated acceptance environment

- A fresh Supabase branch request returned PaymentRequiredException: Branching is supported only on the Pro plan or above. The branch inventory showed only the default production ref. No authenticated checks or rollback rehearsal were performed.

## Temporary Free test project

- The project cost endpoint rejected the organization quote request with MCP error -32600, permission denied. The browser fallback required account sign-in. No authenticated tests ran.

## Dedicated QA project foundation

- Transaction-scoped database role tests passed for admin project access and staging inserts, both authors' project isolation, author staging read/write denial, anonymous project denial and release rejection. Confirmed rollback left no fixture rows. Confirmed two private buckets and their administrator staging policies. Authenticated browser and Storage API tests remain open.

## Authenticated QA checkpoint

- Browser sign-in worked for the synthetic administrator and first author. Logged-in author saw only their assigned project and was denied administrator access on reload. Confirmed all eight navigation links and Stage 6 navigation, both administrator test projects, private cover upload, pending review registration and one-page PDF dimension preview. Verified the object by matching the staging bucket and registration record. Initial QA sign-ins failed because fixture rows had not been committed; successful sign-ins followed the fixture fix.

## Author intake and revision safeguards

- A signed-in author uploaded and downloaded an actual synthetic PDF classified as manuscript intake. Matched its document record to private storage and the assigned synthetic author. Rollback-only database fixtures accepted the current editorial version, rejected stale approval and duplicate submission, consumed one of two synthetic rounds, and rejected approval after submitted corrections. Confirmed zero retained revision fixtures and both release locks still installed.

## Automated DOCX correction checkpoint

- The actual correction generator produced a revised DOCX and a private summary fixture. Verified precise text replacement, bold run formatting, headings, unchanged paragraphs, unchanged table, preserved page break and footer page-number field, and byte-identical content of all 17 other package parts. Confirmed empty and structural edits were rejected. The final local dependency audit reported no advisories. The QA database retained both release locks and denied direct output registration to authenticated users.

## In-dashboard author manuscript review

- Verified live sign-in fields in-browser without signing in to production. Tested the staged workspace against a real synthetic DOCX in a loopback browser fixture. Verified heading navigation, search, table rendering, draft restore after reload and current-version approval navigation. Fixture persistence used session storage as a Supabase substitute. No authenticated revision or notification result is claimed.

## Isolated revision worker checkpoint

- Verified deployed source readback for worker and correction module. Anonymous invoke returned 401. Initial synthetic administrator invoke returned 403 because the service role lacked table read grants. Applied limited read grants. Retest returned 404 for an unqueued revision as administrator and 403 as author. Email and password authentication returned 200 for both. No author submission, generated output or release was exercised by these tests.

## Release guard integration

- Rollback-only tests denied author release, unapproved admin release, approval with missing or failed processing QA, release without the authorized destination object, and proof-link changes. Passing processing QA permitted the approval transition. Confirmed no proof was accepted without a verified released proof and both locks remained installed.

## Editorial destination authorization

- Authenticated Storage API checks with a real synthetic DOCX passed: pending copy, wrong destination, author write and author read were denied; the administrator could copy the approved file to its exact destination. The finalizer reached the document insert and was rejected by the QA release constraint. Verified zero author-visible registrations, one approved private candidate, and two intact release locks.

## Professional Author Dashboard staging

- Checked parsing and rendered desktop and 390-pixel mobile browser previews with synthetic data and a DOCX worksheet. Verified the logo, nine navigation entries, inline table rendering and no horizontal overflow on mobile. These visual checks did not authenticate to the QA backend or execute a release.

## Coordinated dashboard redesign

- Browser design fixture passed the eight-stage render, keyboard disclosure toggle, selected production stage highlight, official logo and visible Upload Cover action. Verified no horizontal overflow at 390 CSS pixels. Captured both administrator layouts. Prior author screenshots remain applicable to the unchanged Author Workspace. Source checks preserved existing administrator element IDs and release gate calls. Read-only QA check confirmed both release locks remain.

## Visual approval and atomic editorial acceptance

- Verified role-based rollback tests and authenticated QA API acceptance using a real DOCX: original release and retry, cross-author denial, draft save and sign-out restore, single submission, decrement of synthetic allowance, worker output and private summary, corrected DOCX part preservation, approval, exact-destination release and current-version author approval. Stale approval and private summary access were denied. Fixed worker queue completion by using fresh query builders, then verified completion without duplicate outputs. Browser acceptance was not performed.

## Controlled dashboard activation

- Authenticated QA author opened version 2 and the read-only earlier manuscript. QA admin switched the synthetic project and opened its revision view. QA lacked payment and operations parity; the production dependencies were verified read-only and no new backend targets were introduced. Verified both public sign-in pages, CSS and logos and all eight administrator workflow disclosures after publication. No production sign-in or financial mutation was performed.

## Print boundary validation

- The staged cover validator accepted a synthetic 40-page full wrap and rejected an otherwise identical PDF with a narrowed crop box. The exact change is also wired into interior bundle preflight. The full isolated bundle path was not rerun.

## Studio QA integration

- Rollback tests selected approved DOCX version 2 and rejected absent scope, the wrong stage, unrelated approvals and registration without the private proof object. Verified service-only proof registration. A real 26-page synthetic DOCX rendered to PDF and paired with a page-count-matched full wrap in a byte-verified ZIP. A clipped interior was rejected.

### Authenticated print worker integration

Passed in isolated QA through authenticated APIs. A real synthetic DOCX went through private upload, administrator approval, atomic manuscript release and exact-version author approval. Worker execution was rejected before the production stage and rejected for the author identity. After the synthetic project entered production, the administrator generated a private 26-page PDF proof and retrieved its actual bytes. A repeated request reused the proof. Direct author download of the unreleased proof was rejected. Studio browser controls, visual cover QA, proof release and downstream steps were outside this run.

### Authenticated proof release and approval

Passed using the existing registered proof. All 26 pages matched the synthetic DOCX text and table cells. PDF checks confirmed matching 6 x 9 page boxes, embedded fonts, sequential folios and in-bounds text origins. Rejected unreviewed release, incomplete QA, incorrect destination, missing copy, author copy and release, access before finalization, unrelated author access and approval, and approval against a non-proof ID. The exact PDF was retrieved and approved by the assigned author. Finalization was idempotent and moved the project to Proofing. These were authenticated API checks.
