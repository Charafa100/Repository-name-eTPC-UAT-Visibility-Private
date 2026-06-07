# UAT Defect Log
## TPC eSolutions — Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-DL-001 |
| **Version** | 2.0 |
| **Status** | ACTIVE — UAT IN PROGRESS |
| **Classification** | INTERNAL — CONTROLLED |
| **Maintained by** | UAT Coordinator |
| **Build ref** | TPC E-Solution.html — Git tag: UAT-2026-06-04 |
| **Last updated** | 2026-06-05 |

---

## Document Control

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-06-04 | eTPC Dev Team | Initial template — pre-UAT sprint defect log |
| 2.0 | 2026-06-05 | eTPC Dev Team | Migrated to full 15-field schema. All pre-UAT sprint records preserved. Active log ready for UAT execution. |

---

## Related Documents

| Document | Purpose |
|---|---|
| UAT-DEFECT-MANAGEMENT.md | Severity definitions, lifecycle rules, exit criteria |
| UAT-DEFECT-TEMPLATE.md | Full field-by-field instructions and completed example |
| UAT-TRIAGE-GUIDE.md | Daily triage meeting format and decision criteria |
| UAT-COMMAND-CENTER.md | Dashboard — draws defect KPIs from this log |
| UAT-SIGNOFF.md | Waiver signatures for all Deferred items |

---

## Quick Reference

### Severity

| Code | Label | Fix SLA | Retest SLA | Sign-off impact |
|---|---|---|---|---|
| SEV-1 | Critical | 4 hours | 2 hours after fix | Automatic NO GO if open |
| SEV-2 | High | 24 hours | 4 hours after fix | Automatic NO GO if open |
| SEV-3 | Medium | 3 business days | Next UAT session | Must be resolved or waived |
| SEV-4 | Low | Next sprint | At sign-off | No sign-off block |

### Priority

| Code | Meaning |
|---|---|
| P1 | Fix immediately — blocks UAT progress or affects the critical path |
| P2 | Fix this session — affects multiple testers or scenarios |
| P3 | Fix before next session — contained impact |
| P4 | Fix when capacity allows — Low severity, no UAT schedule impact |

### Status

| Status | Meaning |
|---|---|
| New | Logged. Triage not yet started. |
| Under Review | Joint triage in progress — UAT Coordinator + Dev Lead. |
| Approved | Confirmed genuine defect. Severity assigned. Awaiting developer assignment. |
| In Progress | Developer assigned. Fix underway. SLA clock running. |
| Ready for Retest | Fix deployed to UAT slot. Awaiting tester verification. |
| Closed | Retest passed. Defect resolved. UAT Coordinator authority only. |
| Rejected | Not a defect — expected behaviour, known deferred item, or out of scope. Requires UAT Coordinator + Dev Lead agreement. |
| Deferred | Confirmed defect accepted for a future sprint. Formal waiver required in UAT-SIGNOFF.md §5. |

### Module Values

| Value | Area covered |
|---|---|
| New Chemical — submission | Request form, validation, GHS picker, eSDS upload, storage selection |
| Approval workflow | Approve / Return / Reject actions, stage routing, resubmission |
| My Requests | Request grouping, visibility rules, status display, resubmit action |
| Master Sheet | Chemical inventory table, GHS icons, inventory bars, row drawer |
| Manufacturers | Directory browse, search, add, edit, deactivate, reactivate |
| Storage locations | Site grouping, add, edit, deactivate, duplicate prevention |
| User management | User grid, invite, edit, deactivate, stage scope |
| PPE reference | GHS-keyed PPE display and admin |
| Platform shell | Dashboard, navigation, command palette, notifications, theme, language |
| Language / localisation | EN / FR toggle, translated strings, workflow parity in both languages |

---

## Field Definitions

| Field | Type | Required | Notes |
|---|---|---|---|
| **Defect ID** | String | Yes | Format: DEF-NNN (sequential). Pre-UAT sprint IDs use original codes (BUG-xx, D-xx, DI-xx). Never reuse an ID. |
| **Date Reported** | Date | Yes | YYYY-MM-DD. Use the date the tester first reported the issue, not the date the UAT Coordinator logged it. |
| **Reporter** | String | Yes | Full name of the UAT participant who observed the defect. |
| **Module** | Enum | Yes | Select from Module Values table above. |
| **Severity** | Enum | Yes | Proposed by reporter. Confirmed at triage. Values: Critical / High / Medium / Low. |
| **Priority** | Enum | Yes | Set by Dev Lead at triage. Values: P1 / P2 / P3 / P4. |
| **Description** | String | Yes | One or two sentences stating what is wrong. Should be understandable without reading the steps. |
| **Steps to Reproduce** | List | Yes | Numbered steps. Exact enough that any tester can reproduce the defect independently. Include role, URL, preconditions. |
| **Expected Result** | String | Yes | What should have happened. Reference the scenario step where possible. |
| **Actual Result** | String | Yes | What actually happened. Exact error messages verbatim. Describe observable state — not the suspected cause. |
| **Owner** | String | Conditional | Developer assigned at triage. Blank until Approved state. |
| **Status** | Enum | Yes | Current lifecycle state. See Status table above. |
| **Date Fixed** | Date | Conditional | YYYY-MM-DD. Set by Dev Lead when fix is deployed to UAT slot. Blank until Ready for Retest. |
| **Date Retested** | Date | Conditional | YYYY-MM-DD. Set by UAT Coordinator when retest is completed. Blank until retest attempted. |
| **Closure Notes** | String | Conditional | Required for Closed, Rejected, and Deferred. States: what was fixed / why rejected / waiver reference. Blank for all other states. |

---

## Active Defect Log

### Summary Table

> The UAT Coordinator updates this table after every triage meeting and every retest. It is the at-a-glance view for the daily status report and the Command Center.

| Defect ID | Date Reported | Reporter | Module | Severity | Priority | Status | Owner | Date Fixed | Date Retested |
|---|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | — | — |

*No defects open at UAT entry. Log entries below when raised during UAT execution.*

---

### Active Defect Records

> Copy the record block from Section "Defect Record Template" below for each new defect. Assign the next sequential ID (DEF-001, DEF-002, …).

*No active defect records at UAT entry.*

---

### Defect Record Template

> Copy this block for each new defect. Replace all `[placeholders]`.

---

**DEF-[NNN]**

| Field | Value |
|---|---|
| **Defect ID** | DEF-[NNN] |
| **Date Reported** | [YYYY-MM-DD] |
| **Reporter** | [Full name of UAT participant] |
| **Module** | [Select from module values table] |
| **Severity** | Proposed: [Critical / High / Medium / Low] — Confirmed: [Critical / High / Medium / Low] |
| **Priority** | [P1 / P2 / P3 / P4] |
| **Status** | [New / Under Review / Approved / In Progress / Ready for Retest / Closed / Rejected / Deferred] |
| **Owner** | [Developer name — assigned at triage] |
| **Date Fixed** | [YYYY-MM-DD — set when fix deployed to UAT slot] |
| **Date Retested** | [YYYY-MM-DD — set when retest completed] |

**Description**
[One or two sentences. What is wrong, stated plainly.]

**Steps to Reproduce**
1. Open the UAT application at [URL]. Select role: [ga / admin / she / sm / user].
2. Navigate to: [exact path].
3. [Action].
4. [Action].
5. Observe the result.

*Reproducibility:* [Always / Intermittent — approx N% / Observed once]
*Preconditions:* [Any state required before step 1. E.g. "A request must be at IH Review stage."]

**Expected Result**
[What should have happened. Reference the scenario step if applicable — e.g. "Per SCN-03 step 11, the request should appear at IH Review stage."]

**Actual Result**
[What actually happened. Exact error messages verbatim. Describe observable state.]

**Closure Notes**
[Leave blank until Closed / Rejected / Deferred. Then record: fix description / rejection reason / waiver reference.]

---

---

## Example Defect Records

The following three records are fully completed examples drawn from the pre-UAT stabilisation sprint. They illustrate correct use of all 15 fields across Critical, High, and Medium severity levels.

---

### EXAMPLE 1 — Critical Severity (DI-01)

---

**DI-01**

| Field | Value |
|---|---|
| **Defect ID** | DI-01 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team (pre-UAT internal testing) |
| **Module** | Platform shell |
| **Severity** | Proposed: Critical — Confirmed: Critical |
| **Priority** | P1 |
| **Status** | Closed |
| **Owner** | eTPC Dev Team |
| **Date Fixed** | 2026-06-04 |
| **Date Retested** | 2026-06-04 |

**Description**
All submitted chemical requests are lost when the browser page is refreshed. Submitting a request, refreshing with Ctrl+Shift+R, and navigating to My Requests shows an empty list — the submitted request no longer exists.

**Steps to Reproduce**
1. Open the UAT application. Select role: `ga` (Global Admin).
2. Navigate to Safety Data → New Chemical.
3. Complete all required fields and click **Submit request**.
4. Confirm the success toast fires and the request appears in My Requests.
5. Press Ctrl+Shift+R (hard refresh).
6. Navigate to My Requests.
7. Observe that the list is empty — the submitted request is gone.

*Reproducibility:* Always — every submitted request is lost on any page refresh.
*Preconditions:* None. Reproducible from a clean session.

**Expected Result**
After a hard refresh, the submitted request should still appear in My Requests with its correct status and all field values intact. Data persistence across page refresh is a stated UAT objective (OBJ-06, SCN-13).

**Actual Result**
My Requests is empty after refresh. The `tpc_requests` key in localStorage was never written — all request data was held in memory only and was destroyed by the page reload. No error is displayed; the application simply shows an empty state as if no requests had ever been submitted.

**Closure Notes**
Fixed 2026-06-04. `_persistRequests()` and `_loadRequests()` added to `tpc-app.js`. `_persistRequests()` is called on all request mutations (submit, approve, return, reject, resubmit). `_loadRequests()` is called in `init()` on application startup, restoring the full request store from `localStorage` key `tpc_requests`. Retest confirmed: submitted requests survive hard refresh. Pre-seeded demo requests (CHM-154, CHM-155, CHM-156) correctly restored on reload. SCN-13 subsequently passed in full.

---

### EXAMPLE 2 — High Severity (BUG-01)

---

**BUG-01**

| Field | Value |
|---|---|
| **Defect ID** | BUG-01 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team (pre-UAT internal testing) |
| **Module** | New Chemical — submission |
| **Severity** | Proposed: High — Confirmed: High |
| **Priority** | P1 |
| **Status** | Closed |
| **Owner** | eTPC Dev Team |
| **Date Fixed** | 2026-06-04 |
| **Date Retested** | 2026-06-04 |

**Description**
The New Chemical submission form accepts and creates a request even when the Chemical name field is empty or contains fewer than three characters, and even when no manufacturer has been selected. Neither field is validated before submission.

**Steps to Reproduce**
1. Open the UAT application. Select role: `user` (Field User).
2. Navigate to Safety Data → New Chemical.
3. Leave the Chemical name field completely empty. Leave the Manufacturer dropdown at its placeholder value ("Select manufacturer…"). Fill in all other required fields normally.
4. Click **Submit request**.
5. Observe the result.
6. Repeat with Chemical name set to "AC" (two characters) and Manufacturer still unselected.
7. Click **Submit request** again.

*Reproducibility:* Always.
*Preconditions:* None.

**Expected Result**
In both cases, submission should be blocked. A red border and error indicator should appear on the invalid field. Focus should move to the first invalid field. No request should be created. This behaviour is the requirement defined in SCN-01 steps 2–8.

**Actual Result**
In both cases, the form submits successfully. A success toast fires. A new request is created in My Requests with an empty or two-character Chemical name and no manufacturer. The created request has a malformed payload that causes the detail drawer to display blank fields for the chemical name and manufacturer contact information.

**Closure Notes**
Fixed 2026-06-04. `_fieldError()` helper function added to `tpc-app.js` to apply and clear red border validation state. Submit handler updated to validate `chem-name` field (minimum 3 characters) and `mfr-select` (blocks placeholder value and internal `__new` sentinel). Validation applied before any request object is created. Retest confirmed: empty name blocked at step 4 with red border and focus; two-character name blocked at step 6; valid submission with manufacturer selected proceeds normally. SCN-01 steps 2–9 subsequently passed in full.

---

### EXAMPLE 3 — High Severity (BUG-03)

---

**BUG-03**

| Field | Value |
|---|---|
| **Defect ID** | BUG-03 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team (pre-UAT internal testing) |
| **Module** | Approval workflow |
| **Severity** | Proposed: High — Confirmed: High |
| **Priority** | P1 |
| **Status** | Closed |
| **Owner** | eTPC Dev Team |
| **Date Fixed** | 2026-06-04 |
| **Date Retested** | 2026-06-04 |

**Description**
When a reviewer returns a request for revision and the submitter resubmits, the request is always routed back to Stage 1 (Safety Review) regardless of which stage the revision was requested from. Prior stage approvals are lost and reviewers must repeat work they have already completed.

**Steps to Reproduce**
1. Open the UAT application. Select role: `she` (HSE Reviewer).
2. Navigate to Approvals. Open a request that is currently at IH Review stage (Stage 3).
3. Click **Return**. Enter reason "Volume exceeds site allowance. Resubmit with revised quantity." Click **Confirm return**.
4. Confirm toast fires: "Returned for revision — #CHM-xxx".
5. Switch role to `user` (Field User). Navigate to My Requests.
6. Locate the returned request in the Action Needed group. Click **Resubmit**.
7. Switch role to `ga` (Global Admin). Navigate to Approvals.
8. Observe the stage of the resubmitted request in the Approvals table.

*Reproducibility:* Always — any return from any stage routes resubmission to Stage 1.
*Preconditions:* A request must have been approved through Safety Review and EMP Review and must be at IH Review before step 2.

**Expected Result**
At step 8, the resubmitted request should appear in the Approvals table at IH Review (the stage from which revision was requested). The Safety Review and EMP Review approvals from the original submission should be preserved in the timeline. Per SCN-03 step 11.

**Actual Result**
At step 8, the resubmitted request appears at Safety Review (Stage 1). The Safety Review and EMP Review approvals are gone. The timeline shows the Submission and the Returned entry but the prior stage approvals are not present. All three reviewers must action the request again from the beginning.

**Closure Notes**
Fixed 2026-06-04. Root cause: `revisionStage` was set correctly in the in-memory request object on the Return action but was not included in the `_persistRequests()` serialisation call. On the next page load, `resubmitRequest()` read `revisionStage` from the freshly loaded store where the field was absent, defaulting to Stage 1. Fix: `revisionStage` field added to the serialisation in `_persistRequests()`. `resubmitRequest()` now reads `revisionStage` from the persisted payload and deletes the field from the request object after consuming it, preventing stale routing on any subsequent submission. Retest confirmed: resubmission from IH Review routes correctly to IH Review; prior stage timeline entries preserved. SCN-03 subsequently passed in full.

---

---

## Closed Defects — Pre-UAT Stabilisation Sprint

The following defects were identified and closed during the pre-UAT stabilisation sprint (2026-06-04) before UAT execution began. They are recorded here for traceability. No retesting is required during the UAT window. All were closed with zero open defects at the UAT-2026-06-04 git tag.

---

**D-01**

| Field | Value |
|---|---|
| **Defect ID** | D-01 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | New Chemical — submission |
| **Severity** | Low |
| **Priority** | P4 |
| **Status** | Closed |
| **Owner** | eTPC Dev Team |
| **Date Fixed** | 2026-06-04 |
| **Date Retested** | 2026-06-04 |

**Description**
Test cases TC-01-06 and TC-01-09 described a UI sequence for the `__new` manufacturer option that is not possible in the actual application interface — the test steps referred to an inline form that does not exist in this build.

**Steps to Reproduce**
1. Review TC-01-06 and TC-01-09 in the regression test suite.
2. Attempt to follow the described steps for adding a new manufacturer via the `__new` dropdown sentinel in the New Chemical form.
3. Observe that the described inline form does not appear.

*Reproducibility:* Always — the described UI path does not exist.
*Preconditions:* None.

**Expected Result**
Test case steps should accurately describe achievable actions in the current build.

**Actual Result**
Steps described a non-existent UI path. Test cases would always fail not due to a code defect but due to incorrect test documentation.

**Closure Notes**
Closed 2026-06-04. Test case steps corrected to reflect the actual validation behaviour — the `__new` value in `mfr-select` is blocked by the submit handler validation added in BUG-01. Code behaviour confirmed correct. Test documentation updated.

---

**D-02**

| Field | Value |
|---|---|
| **Defect ID** | D-02 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | Approval workflow |
| **Severity** | Low |
| **Priority** | P4 |
| **Status** | Closed |
| **Owner** | eTPC Dev Team |
| **Date Fixed** | 2026-06-04 |
| **Date Retested** | 2026-06-04 |

**Description**
Test case TC-07-04 stated that after approving a request, the request should disappear from the Approvals inbox. The correct behaviour is that the request remains visible but advances to the next stage.

**Steps to Reproduce**
1. Review TC-07-04 pass criteria.
2. As a reviewer, approve a request.
3. Observe the Approvals inbox after the approval action.

*Reproducibility:* Always — the pass criterion was written incorrectly.
*Preconditions:* A request must be pending at the reviewer's stage.

**Expected Result**
The pass criterion should state: request remains in the Approvals table at the next stage (or moves to the next reviewer's inbox if the current reviewer's scope does not include the next stage).

**Actual Result**
The test case stated the request should disappear from the inbox. The code correctly advances the stage — the test documentation was wrong.

**Closure Notes**
Closed 2026-06-04. TC-07-04 pass criteria corrected to state stage advancement behaviour. Code behaviour confirmed correct — no code change required.

---

**D-03**

| Field | Value |
|---|---|
| **Defect ID** | D-03 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | New Chemical — submission |
| **Severity** | Medium |
| **Priority** | P2 |
| **Status** | Closed |
| **Owner** | eTPC Dev Team |
| **Date Fixed** | 2026-06-04 |
| **Date Retested** | 2026-06-04 |

**Description**
A duplicate `change` event listener on the `#aou-select` (Area of use) dropdown caused the storage location field to be populated with the internal location ID instead of the human-readable location label. The location saved in the request payload was an integer key rather than the location name.

**Steps to Reproduce**
1. Open the UAT application. Navigate to Safety Data → New Chemical.
2. Select Area of use → "Kome 5".
3. Select any storage location from the dropdown.
4. Submit the request.
5. Open the request detail drawer.
6. Inspect the storage location field in the payload (visible in the drawer or browser DevTools → Application → Local Storage).

*Reproducibility:* Always.
*Preconditions:* None.

**Expected Result**
The storage location field in the saved request payload should contain the human-readable location name (e.g. "AIRPORT") as displayed in the dropdown.

**Actual Result**
The storage location field contained the internal numeric location ID (e.g. `3`) instead of the label. The detail drawer displayed a number in the storage location field rather than a location name.

**Closure Notes**
Closed 2026-06-04. Root cause: both `tpc-app.js` and `tpc-v5.js` each registered a `change` listener on `#aou-select`. The `tpc-app.js` listener saved the option value (ID); the `tpc-v5.js` listener saved the option text (label). Whichever listener ran last determined the stored value — non-deterministic. Fix: duplicate listener removed from `tpc-app.js`. `tpc-v5.js` is now the sole authority for `#aou-select` handling. Stale comment referencing the removed listener also deleted from `tpc-v5.js`. Retest confirmed: location label now correctly saved in all submitted requests.

---

**BUG-02**

| Field | Value |
|---|---|
| **Defect ID** | BUG-02 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | New Chemical — submission |
| **Severity** | High |
| **Priority** | P1 |
| **Status** | Closed |
| **Owner** | eTPC Dev Team |
| **Date Fixed** | 2026-06-04 |
| **Date Retested** | 2026-06-04 |

**Description**
The eSDS last revision date entered by the submitter was silently dropped from the request payload. The date field had no `id` attribute, so the submit handler could not locate it by ID and the value was never read.

**Steps to Reproduce**
1. Open the UAT application. Navigate to Safety Data → New Chemical.
2. Complete all required fields including setting the eSDS last revision date to any valid date.
3. Submit the request.
4. Open the request detail drawer.
5. Inspect the eSDS revision date field.

*Reproducibility:* Always — the `id` attribute was absent from the HTML element.
*Preconditions:* None.

**Expected Result**
The eSDS revision date entered at submission should appear in the request detail drawer and be stored in the request payload.

**Actual Result**
The eSDS revision date was blank in the request detail drawer. The field was not present in the stored payload at all. No error or warning was displayed to the submitter — the date was silently discarded.

**Closure Notes**
Closed 2026-06-04. `id="esds-date"` attribute added to the eSDS revision date input element in `TPC E-Solution.html`. The submit handler's `document.getElementById('esds-date')` call now correctly locates the field and reads its value into the request payload. Retest confirmed: revision date now correctly stored and displayed in the detail drawer.

---

**BUG-07**

| Field | Value |
|---|---|
| **Defect ID** | BUG-07 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | Approval workflow |
| **Severity** | Medium |
| **Priority** | P2 |
| **Status** | Closed |
| **Owner** | eTPC Dev Team |
| **Date Fixed** | 2026-06-04 |
| **Date Retested** | 2026-06-04 |

**Description**
Approve, Return, and Reject actions taken on the three pre-seeded demo requests (CHM-154, CHM-155, CHM-156) silently failed. The action toast fired but no state change occurred. The requests remained at their original status on the next render.

**Steps to Reproduce**
1. Open the UAT application. Select role: `ga` (Global Admin).
2. Navigate to Approvals. Locate CHM-156 (Acetone — pending at Safety Review).
3. Click the row to open the detail drawer.
4. Click **Approve** in the action zone.
5. Observe the toast and then navigate away and back to Approvals.
6. Observe the status of CHM-156.

*Reproducibility:* Always — all three MOCK_REQUEST entries were affected.
*Preconditions:* None. Reproducible from a fresh session with seeded data.

**Expected Result**
After clicking Approve, CHM-156 should advance to EMP Review stage. The stage change should be reflected in the Approvals table and the request detail drawer timeline.

**Actual Result**
The approval toast fired ("✓ Approved — #CHM-156") but the request remained at Safety Review status unchanged. The action was not persisted. The MOCK_REQUESTS array was a separate in-memory structure not connected to the live `TPC.requests` store that the action handlers update.

**Closure Notes**
Closed 2026-06-04. Root cause: `MOCK_REQUESTS` objects lacked the `status`, `currentStage`, and `revisionStage` fields required by the action handler functions. Additionally, mock records were not included in the `TPC.requests` live store — actions wrote to the store but reads for those IDs found nothing. Fix: mock request objects normalised with full status fields matching the live schema. Merge block added to `tpc-v2.js init()` to seed `TPC.requests` with mock data guarded by a localStorage check — if localStorage already contains these IDs (from a previous session), the seed is skipped to avoid overwriting real test data. Retest confirmed: all three pre-seeded requests now respond correctly to Approve, Return, and Reject actions.

---

---

## Deferred Items — Formally Accepted

The following items are confirmed defects or known gaps that have been formally accepted as out of scope for this UAT cycle. They will not be fixed during the UAT window. Each requires a waiver counter-signed by the Project Sponsor in UAT-SIGNOFF.md §5 before sign-off proceeds.

Testers must not raise these as new defects. If any of these items is observed during testing, note the observation in your feedback form (UAT-FEEDBACK.md §7 with a note: "Known deferred — OPEN-xx") and continue with the scenario.

---

**OPEN-01**

| Field | Value |
|---|---|
| **Defect ID** | OPEN-01 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | Platform shell |
| **Severity** | Low |
| **Priority** | P4 |
| **Status** | Deferred |
| **Owner** | eTPC Dev Team (future sprint) |
| **Date Fixed** | — |
| **Date Retested** | — |

**Description**
The Sign Out button in the user dropdown menu has no action. Clicking it does nothing.

**Steps to Reproduce**
1. Click the user chip in the topbar.
2. Click **Sign Out**.

**Expected Result**
User session ends. User is redirected to the login page or shown a signed-out confirmation.

**Actual Result**
Nothing happens. No navigation, no message, no session change.

**Closure Notes**
Deferred. Authentication (Entra ID / Azure AD SSO) is not implemented in this build. Roles are simulated via the UI role selector. SSO integration is a separate milestone planned after pilot sign-off. Target sprint: Entra ID sprint. Waiver reference: UAT-SIGNOFF.md §5 — OPEN-01.

---

**OPEN-02**

| Field | Value |
|---|---|
| **Defect ID** | OPEN-02 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | Platform shell |
| **Severity** | Low |
| **Priority** | P4 |
| **Status** | Deferred |
| **Owner** | eTPC Dev Team (future sprint) |
| **Date Fixed** | — |
| **Date Retested** | — |

**Description**
The My Profile button in the user dropdown menu has no action. Clicking it does nothing.

**Steps to Reproduce**
1. Click the user chip in the topbar.
2. Click **My Profile**.

**Expected Result**
A user profile page or panel opens showing the user's account details.

**Actual Result**
Nothing happens.

**Closure Notes**
Deferred. My Profile is a v2 feature. Profile management is not required for the Safety Data workflow being validated in this UAT cycle. Target sprint: v2 platform release. Waiver reference: UAT-SIGNOFF.md §5 — OPEN-02.

---

**OPEN-03**

| Field | Value |
|---|---|
| **Defect ID** | OPEN-03 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | New Chemical — submission |
| **Severity** | Low |
| **Priority** | P4 |
| **Status** | Deferred |
| **Owner** | eTPC Dev Team (future sprint) |
| **Date Fixed** | — |
| **Date Retested** | — |

**Description**
The Save Draft button on the New Chemical request form displays a confirmation toast but does not save the form data. Refreshing the page after clicking Save Draft results in a blank form — no draft is stored.

**Steps to Reproduce**
1. Navigate to Safety Data → New Chemical.
2. Enter data in several fields.
3. Click **Save Draft**.
4. Hard-refresh the browser.
5. Navigate back to New Chemical.

**Expected Result**
Partially completed form data is saved. After refresh, the form pre-populates with the saved draft.

**Actual Result**
Toast fires ("Draft saved") but no data is written to storage. Form is blank after refresh.

**Closure Notes**
Deferred. Draft storage requires a persistent backend (Azure SQL or SharePoint). The current build uses browser localStorage for submitted requests only — a full draft store is outside the scope of this UAT cycle. Target sprint: v2 platform release. Waiver reference: UAT-SIGNOFF.md §5 — OPEN-03.

---

**OPEN-04**

| Field | Value |
|---|---|
| **Defect ID** | OPEN-04 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | Platform shell |
| **Severity** | Medium |
| **Priority** | P4 |
| **Status** | Deferred |
| **Owner** | eTPC Dev Team (backend integration sprint) |
| **Date Fixed** | — |
| **Date Retested** | — |

**Description**
The KPI statistics displayed on the Dashboard (pending requests, approved items, active users) are static demo values. They do not reflect the actual number of requests submitted, approved, or active users in the system.

**Steps to Reproduce**
1. Navigate to the Dashboard.
2. Note the KPI figures displayed.
3. Submit several new chemical requests.
4. Return to the Dashboard.
5. Observe that the KPI figures have not changed.

**Expected Result**
Dashboard statistics should reflect live data from the request store — updating in real time as requests are submitted and processed.

**Actual Result**
KPI figures remain at hardcoded demo values regardless of system activity.

**Closure Notes**
Deferred. Dashboard live statistics require a backend data connection (Azure SQL or SharePoint). The current build uses browser localStorage scoped to individual tester sessions — a cross-session aggregated stat feed is not feasible at this stage. Static values are acceptable for UAT validation of workflows. Target sprint: backend integration sprint. Waiver reference: UAT-SIGNOFF.md §5 — OPEN-04.

---

**OPEN-05**

| Field | Value |
|---|---|
| **Defect ID** | OPEN-05 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | Platform shell |
| **Severity** | Medium |
| **Priority** | P4 |
| **Status** | Deferred |
| **Owner** | eTPC Dev Team (pre-launch UI sprint) |
| **Date Fixed** | — |
| **Date Retested** | — |

**Description**
The Cash Advance, Daily Expense, and Security Escort module cards on the Dashboard display a "Live" status badge. These modules are placeholder stubs — they are not live and clicking their navigation items leads to a blank page.

**Steps to Reproduce**
1. Navigate to the Dashboard.
2. Observe the module cards for Cash Advance, Daily Expense, and Security Escort.
3. Note the "Live" label on each card.
4. Click the Cash Advance navigation item in the sidebar.

**Expected Result**
Stub modules should be labelled "Coming Soon" or similar to accurately communicate their status to users. Navigation items for stub modules should either be hidden or lead to an informative placeholder page.

**Actual Result**
Cards display "Live". Navigation leads to a blank or nearly-empty stub page with no content or indication that the module is not yet active.

**Closure Notes**
Deferred. Labels will be corrected to "Coming Soon" prior to production launch. Navigation items for stub modules will be hidden for non-admin roles before go-live. These corrections are low-risk cosmetic changes to be applied in the pre-launch UI sprint. Does not affect Safety Data workflow validation. Waiver reference: UAT-SIGNOFF.md §5 — OPEN-05.

---

**OPEN-06**

| Field | Value |
|---|---|
| **Defect ID** | OPEN-06 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | New Chemical — submission |
| **Severity** | Medium |
| **Priority** | P3 |
| **Status** | Deferred |
| **Owner** | eTPC Dev Team (next sprint — pending HSE Process Owner decision) |
| **Date Fixed** | — |
| **Date Retested** | — |

**Description**
The GHS hazard classification section of the New Chemical form does not require at least one hazard pictogram to be selected before the form can be submitted. A request can be submitted with no hazard information, which may not meet HSE data requirements.

**Steps to Reproduce**
1. Navigate to Safety Data → New Chemical.
2. Complete all required fields except hazard selection — do not click any GHS pictogram.
3. Click **Submit request**.

**Expected Result**
Submission is blocked until at least one GHS hazard pictogram is selected. An error indicator appears on the hazard picker. This behaviour is under review — the expected result depends on HSE Process Owner confirmation.

**Actual Result**
The form submits successfully with no hazard selected. The resulting request has an empty hazard array. The PPE recommendation strip does not appear in the detail drawer for this request.

**Closure Notes**
Deferred pending decision from the HSE Process Owner during UAT. The HSE Process Owner must confirm whether GHS hazard selection should be mandatory before a chemical can enter the review workflow. If mandatory: validation to be added in the next sprint. If optional: OPEN-06 is accepted as designed behaviour and closed without a fix. HSE Process Owner decision to be recorded in UAT-SIGNOFF.md §6. Waiver reference: UAT-SIGNOFF.md §5 — OPEN-06.

---

**OPEN-07**

| Field | Value |
|---|---|
| **Defect ID** | OPEN-07 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | New Chemical — submission |
| **Severity** | Medium |
| **Priority** | P3 |
| **Status** | Deferred |
| **Owner** | eTPC Dev Team (next sprint) |
| **Date Fixed** | — |
| **Date Retested** | — |

**Description**
The Storage location field in the New Chemical form does not require a selection before the form can be submitted. A request can be submitted with no storage location specified.

**Steps to Reproduce**
1. Navigate to Safety Data → New Chemical.
2. Select Area of use → "Kome 5" to populate the storage location dropdown.
3. Leave the Storage location dropdown at its placeholder ("Select storage location…").
4. Complete all other required fields.
5. Click **Submit request**.

**Expected Result**
Submission is blocked until a storage location is selected. An error indicator appears on the storage location dropdown.

**Actual Result**
The form submits successfully with no storage location selected. The resulting request has a blank storage location field in the detail drawer.

**Closure Notes**
Deferred. Storage location validation to be added in the next sprint. UAT testers should note whether the absence of this validation causes any downstream issues during workflow testing — feedback to be captured in UAT-FEEDBACK.md. Waiver reference: UAT-SIGNOFF.md §5 — OPEN-07.

---

**OPEN-08**

| Field | Value |
|---|---|
| **Defect ID** | OPEN-08 |
| **Date Reported** | 2026-06-04 |
| **Reporter** | eTPC Dev Team |
| **Module** | Platform shell |
| **Severity** | Medium |
| **Priority** | P3 |
| **Status** | Deferred |
| **Owner** | eTPC Dev Team (role visibility sprint) |
| **Date Fixed** | — |
| **Date Retested** | — |

**Description**
Store Manager and Field User roles see Cash Advance and Security Escort navigation items in the sidebar with hardcoded badge counts. These modules are not yet active and these roles should not have visibility of them.

**Steps to Reproduce**
1. Open the UAT application. Select role: `sm` (Store Manager).
2. Observe the sidebar navigation.
3. Note Cash Advance and Security Escort items are visible with badge counts.
4. Repeat with role: `user` (Field User).

**Expected Result**
Store Manager and Field User should not see navigation items for modules outside their operational scope, and particularly not for stub modules that are not yet active.

**Actual Result**
Both roles see Cash Advance and Security Escort nav items with static badge counts. The items lead to stub pages.

**Closure Notes**
Deferred. Role-based navigation visibility for stub modules to be corrected before production launch. This is a cosmetic access control gap — the stub pages contain no data or functionality that these roles should not see. Fix to be applied in the role visibility sprint alongside the OPEN-05 label correction. Waiver reference: UAT-SIGNOFF.md §5 — OPEN-08.

---

*Document ref: TPC-ESOL-UAT-DL-001 v2.0 | Classification: INTERNAL — CONTROLLED*
*This document is the authoritative defect register for the TPC eSolutions Safety Data Management UAT.*
*All entries must be made within 4 hours of defect discovery. Only the UAT Coordinator may mark a defect Closed or Rejected.*
*Retain for a minimum of 3 years as part of the project audit trail.*
