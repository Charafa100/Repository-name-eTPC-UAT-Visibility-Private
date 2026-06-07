# UAT Defect Template
## TPC eSolutions — Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-DT-001 |
| **Version** | 1.0 |
| **Classification** | INTERNAL — CONTROLLED |
| **Maintained by** | UAT Coordinator |

---

## Instructions for Use

1. **Who fills this in:** The UAT Coordinator fills in the official defect record in UAT-DEFECTS.md within 4 hours of a tester reporting an issue. Testers record observations in their UAT-FEEDBACK.md form Section 7 — the UAT Coordinator transfers them here.

2. **Defect IDs:** Assign sequentially — DEF-001, DEF-002, DEF-003. Never reuse an ID. If a defect is rejected, the ID is retained in the log with status REJECTED.

3. **Severity:** The reporter proposes a severity. Severity is confirmed only after joint triage by the UAT Coordinator and Development Lead. Do not mark a defect Approved until triage is complete.

4. **Priority:** Priority is set during triage and reflects the order in which the Development Lead should address defects. Priority is independent of severity — a Medium defect blocking a tester's ability to continue may be higher priority than a High defect affecting a rarely-executed path.

   | Priority | Meaning |
   |---|---|
   | P1 | Fix immediately — blocks UAT progress or affects the most critical path |
   | P2 | Fix this UAT session — affects a significant number of testers or scenarios |
   | P3 | Fix before next session — impacts are contained |
   | P4 | Fix when capacity allows — Low severity, no UAT schedule impact |

5. **Screenshots / recordings:** Mandatory for Critical and High. Strongly recommended for Medium. Attach files to the defect entry or link to a shared location confirmed by the UAT Coordinator.

6. **One defect per record:** Do not combine multiple issues into one defect entry. If two separate things are wrong, create two separate DEF-xxx entries.

7. **Status transitions:** Follow UAT-DEFECT-MANAGEMENT.md §3.3 for all state transitions. Only the UAT Coordinator may mark a defect Closed or Rejected.

---

## Defect Record Template

> Copy the block below for each new defect. Replace all `[placeholders]` with actual values.

---

### DEF-[NNN] — [Short descriptive title — max 10 words]

#### Header

| Field | Value |
|---|---|
| **Defect ID** | DEF-[NNN] |
| **Title** | [Short descriptive title — what is wrong, not what was expected] |
| **Module** | [Select one: New Chemical — submission / Approval workflow / My Requests / Master Sheet / Manufacturers / Storage locations / User management / PPE reference / Platform shell / Language / localisation] |
| **Feature area** | [The specific sub-feature within the module, e.g. "Return for revision — reason modal"] |
| **Environment** | UAT — TPC E-Solution.html — Build: 2026-06-04 — Git tag: UAT-2026-06-04 |
| **Browser** | [Edge vXX / Chrome vXX] |
| **Severity** | [Proposed: Critical / High / Medium / Low] — [Confirmed after triage: Critical / High / Medium / Low] |
| **Priority** | [Set at triage: P1 / P2 / P3 / P4] |
| **Status** | [New / Under Review / Approved / In Progress / Ready for Retest / Closed / Rejected / Deferred] |
| **Scenario** | [SCN-XX — step XX] |
| **Role at time of defect** | [ga / admin / she / sm / user] |
| **Reporter** | [UAT participant name] |
| **Date reported** | [YYYY-MM-DD HH:MM] |
| **Assigned owner** | [Developer name — set during triage] |
| **SLA deadline** | [Calculated from date reported: Critical +4h / High +24h / Medium +3 business days] |

---

#### Steps to Reproduce

> Provide the exact sequence of actions that reliably produces the defect. Be specific — include button labels, field values, and role context.

1. Open the application at [UAT URL]. Ensure localStorage is in the expected state (fresh / with seeded data / with specific prior actions).
2. Select role: [ga / admin / she / sm / user] via the cog panel (top right).
3. Navigate to: [exact navigation path, e.g. Safety Data → New Chemical].
4. [Action taken — e.g. "Enter 'Acetone 99%' in the Chemical name field"].
5. [Action taken — e.g. "Click Submit request"].
6. [Continue with each step until the defect is reproduced].

**Reproducibility:** [Always / Intermittent — approximately N% of attempts / Once only]

**Preconditions:** [Any state required before starting these steps, e.g. "SCN-01 must have been completed — a request must exist at Safety Review stage"]

---

#### Expected Result

> What should have happened at the point the defect occurred, as described in the test scenario or as a reasonable business expectation.

[Describe the expected behaviour clearly and specifically.]

---

#### Actual Result

> What actually happened. Be precise — describe the observable behaviour, not an interpretation of the cause.

[Describe exactly what occurred: error messages verbatim, UI state, data state, console errors if visible.]

---

#### Screenshots / Recordings

> Mandatory for Critical and High. Strongly recommended for Medium.

| Attachment | Description |
|---|---|
| [filename or URL] | [What this screenshot shows, e.g. "Browser console showing undefined error on Submit click"] |
| [filename or URL] | [e.g. "Screen recording of full reproduction sequence"] |

*If no attachment: state the reason (e.g. "Low severity — cosmetic only — screenshot not required").*

---

#### Triage Notes

> Completed by UAT Coordinator and Dev Lead jointly during triage session.

| Field | Value |
|---|---|
| **Triage date** | [YYYY-MM-DD] |
| **Triage participants** | [UAT Coordinator name], [Dev Lead name] |
| **Confirmed severity** | [Critical / High / Medium / Low] |
| **Priority** | [P1 / P2 / P3 / P4] |
| **Triage decision** | [Approved / Rejected / Deferred] |
| **Decision rationale** | [Why this severity and decision? E.g. "Confirmed High — resubmission routing is core business logic; workaround would require manual tracking by HSE team"] |
| **If Rejected — reason** | [Not a defect because... / Out of scope because... / Known deferred item OPEN-XX] |
| **If Deferred — target sprint** | [Sprint name or version] |
| **If Deferred — waiver ref** | [UAT-SIGNOFF.md §5 entry ref] |

---

#### Fix Details

> Completed by the Development Lead and assigned developer.

| Field | Value |
|---|---|
| **Assigned developer** | [Name] |
| **Assignment date** | [YYYY-MM-DD] |
| **Root cause** | [Brief technical root cause — e.g. "revisionStage not persisted to localStorage on Return action — only held in memory"] |
| **Fix description** | [What was changed to resolve the defect — e.g. "revisionStage field added to _persistRequests() serialisation in tpc-app.js"] |
| **Files changed** | [e.g. project/tpc-app.js line 412] |
| **Fix deployed to UAT** | [YYYY-MM-DD HH:MM] |
| **Build / commit ref** | [uat-feedback branch — commit: XXXXXXX] |
| **Dev Lead sign-off** | [Name] — [YYYY-MM-DD] |

---

#### Retest

> Completed by the UAT Coordinator and assigned tester.

| Field | Value |
|---|---|
| **Retest assigned to** | [Name — preferably the original reporter] |
| **Retest date** | [YYYY-MM-DD] |
| **Retest steps** | [Confirm these match the updated reproduction steps — paste or reference them] |
| **Retest result** | [PASS / FAIL] |
| **Retest notes** | [What was observed during retest. If PASS: confirm the fix worked and no regression observed. If FAIL: describe what still fails.] |
| **Regression check** | [Confirm adjacent scenario steps tested and passing: e.g. "SCN-03 steps 1–5 retested — no regression"] |
| **Closed by** | [UAT Coordinator name] |
| **Closed date** | [YYYY-MM-DD] |

---
---

## Completed Example

The following example illustrates a correctly completed defect record.

---

### DEF-001 — Resubmission routes to Stage 1 instead of revision stage

#### Header

| Field | Value |
|---|---|
| **Defect ID** | DEF-001 |
| **Title** | Resubmission routes to Stage 1 instead of revision stage |
| **Module** | Approval workflow |
| **Feature area** | Return for revision — resubmission routing |
| **Environment** | UAT — TPC E-Solution.html — Build: 2026-06-04 — Git tag: UAT-2026-06-04 |
| **Browser** | Microsoft Edge v125 |
| **Severity** | Proposed: High — Confirmed after triage: High |
| **Priority** | P1 |
| **Status** | Closed |
| **Scenario** | SCN-03 — step 11 |
| **Role at time of defect** | ga (Global Admin) |
| **Reporter** | [UAT Coordinator name] |
| **Date reported** | 2026-06-05 10:30 |
| **Assigned owner** | [Developer name] |
| **SLA deadline** | 2026-06-06 10:30 (24 hours from log) |

---

#### Steps to Reproduce

1. Open the UAT application. Select role: `she` (HSE Reviewer — IH Review scope).
2. Navigate to Approvals.
3. Find a request that is currently at IH Review stage. Click the row to open the detail drawer.
4. Click **Return**. In the reason modal, enter "Quantity exceeds site allowance per IH-2024-08." Click **Confirm return**.
5. Switch role to `user` (Field User). Navigate to My Requests.
6. Locate the returned request in the Action Needed group. Click **Resubmit**.
7. Switch role to `ga` (Global Admin). Navigate to Approvals.
8. Observe the stage of the resubmitted request.

**Reproducibility:** Always

**Preconditions:** A request must have passed Safety Review and EMP Review and be at IH Review stage before step 3.

---

#### Expected Result

In step 8, the resubmitted request should appear in the Approvals inbox at **IH Review** stage — the stage at which revision was requested. The Safety Review and EMP Review approvals should be preserved.

---

#### Actual Result

In step 8, the resubmitted request appears at **Safety Review** stage. All prior stage approvals (Safety Review and EMP Review) have been lost. The request must pass through all three stages again from the beginning.

---

#### Screenshots / Recordings

| Attachment | Description |
|---|---|
| DEF-001-actual.png | Approvals inbox showing the resubmitted request at Safety Review stage instead of IH Review |
| DEF-001-repro.mp4 | Full screen recording of the reproduction sequence from step 1 through step 8 |

---

#### Triage Notes

| Field | Value |
|---|---|
| **Triage date** | 2026-06-05 |
| **Triage participants** | [UAT Coordinator], [Dev Lead] |
| **Confirmed severity** | High |
| **Priority** | P1 |
| **Triage decision** | Approved |
| **Decision rationale** | Confirmed High — resubmission routing is core business logic. The practical workaround (restart all three stages) is not acceptable in production as it creates incorrect audit records and forces reviewers to repeat work they have already completed. |
| **If Rejected — reason** | N/A |
| **If Deferred — target sprint** | N/A |
| **If Deferred — waiver ref** | N/A |

---

#### Fix Details

| Field | Value |
|---|---|
| **Assigned developer** | [Developer name] |
| **Assignment date** | 2026-06-05 |
| **Root cause** | `revisionStage` was set in memory on the Return action but was not included in the `_persistRequests()` serialisation call. On resubmission, `resubmitRequest()` read `revisionStage` from the in-memory object which had been reset on the next page load, so it defaulted to Stage 1. |
| **Fix description** | `revisionStage` field added to the request serialisation in `_persistRequests()`. `resubmitRequest()` now reads `revisionStage` from the persisted payload and clears it after use. |
| **Files changed** | project/tpc-app.js — `_persistRequests()` and `resubmitRequest()` |
| **Fix deployed to UAT** | 2026-06-05 18:00 |
| **Build / commit ref** | uat-feedback branch — commit: a1b2c3d |
| **Dev Lead sign-off** | [Dev Lead name] — 2026-06-05 |

---

#### Retest

| Field | Value |
|---|---|
| **Retest assigned to** | [Original reporter name] |
| **Retest date** | 2026-06-05 19:45 |
| **Retest steps** | As per original reproduction steps 1–8 above |
| **Retest result** | PASS |
| **Retest notes** | Resubmitted request correctly appeared at IH Review in the Approvals inbox. Safety Review and EMP Review timeline entries confirmed preserved. Return reason note still visible in drawer. |
| **Regression check** | SCN-03 steps 1–10 retested — no regression observed. SCN-04 full chain also retested — Review Complete terminal state reached correctly. |
| **Closed by** | [UAT Coordinator name] |
| **Closed date** | 2026-06-05 |

---

*Document ref: TPC-ESOL-UAT-DT-001 v1.0 | Classification: INTERNAL — CONTROLLED*
*All defect records are retained for a minimum of 3 years as part of the project audit trail.*
