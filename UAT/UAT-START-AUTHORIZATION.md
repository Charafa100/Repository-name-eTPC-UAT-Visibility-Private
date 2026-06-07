# UAT Start Authorization
## TPC eSolutions — Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-AUTH-001 |
| **Version** | 1.0 |
| **Classification** | INTERNAL — CONTROLLED |
| **Prepared by** | UAT Coordinator |
| **Authorization date** | 2026-06-05 |
| **UAT window** | TBC — Day 1 date to be confirmed by IT Representative |

---

> **Purpose of this document**
>
> This document is the formal authorization to begin User Acceptance Testing of the TPC eSolutions Safety Data Management module. It confirms that all confirmed entry criteria are met, that all pre-session governance blockers have been resolved, and that the Project Sponsor has authorized the commencement of testing. UAT sessions may not begin until Section 8 of this document carries the Project Sponsor signature.

---

## Document Control

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-06-05 | eTPC Dev Team | Initial issue — post governance audit, post R-01 to R-05 resolution |

---

## Related Documents

| Document | Ref | Status |
|---|---|---|
| UAT Execution Plan | TPC-ESOL-UAT-001 v2.0 | APPROVED FOR EXECUTION |
| UAT Defect Management Process | TPC-ESOL-UAT-DMP-001 v1.0 | APPROVED |
| UAT Defect Log | TPC-ESOL-UAT-DL-001 v2.0 | ACTIVE |
| UAT Defect Template | TPC-ESOL-UAT-DT-001 v1.0 | APPROVED |
| UAT Triage Guide | TPC-ESOL-UAT-TG-001 v1.0 | APPROVED |
| UAT Command Center | TPC-ESOL-UAT-CC-001 v1.0 | APPROVED |
| UAT Kickoff Package | TPC-ESOL-UAT-KO-001 v1.0 | APPROVED FOR DISTRIBUTION |
| UAT Sign-Off | TPC-ESOL-UAT-SO-001 v2.0 | PENDING — not signed until UAT closes |
| UAT Test Report | *(ref pending)* v1.0 | DRAFT — to be completed during UAT |
| UAT Participant Feedback | *(per tester)* v1.0 | PENDING — distributed at briefing |
| Governance Audit | *(session record)* | COMPLETE — 2026-06-05 |

---

## Table of Contents

1. [UAT Readiness Statement](#1-uat-readiness-statement)
2. [Scope](#2-scope)
3. [Entry Criteria Verification](#3-entry-criteria-verification)
4. [Outstanding Non-Blocking Risks](#4-outstanding-non-blocking-risks)
5. [UAT Start Recommendation](#5-uat-start-recommendation)
6. [Required Participants](#6-required-participants)
7. [Day 1 Activities](#7-day-1-activities)
8. [Formal Authorization](#8-formal-authorization)

---

## 1. UAT Readiness Statement

### 1.1 Build State

The TPC eSolutions Safety Data Management module has completed a pre-UAT stabilisation sprint and a full governance audit. The build is confirmed stable, regression-tested, and correctly documented for UAT execution.

| Item | Value |
|---|---|
| **Application file** | TPC E-Solution.html |
| **Build date** | 2026-06-04 |
| **Git tag** | `UAT-2026-06-04` |
| **Source branch** | `master` — frozen at tag |
| **Active UAT branch** | `uat-feedback` — all session fixes applied here |
| **Regression tests** | 35 / 35 PASS at git tag |
| **Open defects at tag** | 0 |
| **Pre-UAT sprint defects closed** | 8 |
| **Hosting** | Azure Static Web Apps — UAT deployment slot |
| **Data store** | Browser `localStorage` — key: `tpc_requests` |

### 1.2 Pre-UAT Sprint Summary

The build entered a stabilisation sprint on 2026-06-04. Eight defects were identified and closed before UAT entry. The most significant fixes were:

| Ref | Defect | Severity | Impact |
|---|---|---|---|
| DI-01 | All request data lost on browser refresh | Critical | Core persistence added — `_persistRequests()` / `_loadRequests()` |
| BUG-01 | Chemical name and manufacturer not validated before submission | High | `_fieldError()` validation helper; min-length and empty-selection guards added |
| BUG-03 | Resubmission always reset to Stage 1 regardless of revision stage | High | `revisionStage` now serialised and restored across sessions |
| BUG-02 | eSDS revision date silently dropped from payload | High | `id="esds-date"` added to HTML element |
| BUG-07 | Drawer actions silently failed on pre-seeded demo data | Medium | Mock requests merged into live store with correct schema |
| D-03 | Duplicate `change` listener stored location ID instead of label | Medium | Duplicate listener removed; `tpc-v5.js` is sole authority |

All 35 regression tests passed following these fixes. The build entered UAT with zero open defects — no known workflow blockers exist.

### 1.3 Governance Audit Summary

A governance audit of the full UAT package was conducted on 2026-06-05. The audit identified six contradictions and six governance risks across the five core UAT documents. Twelve recommendations were issued (R-01 through R-12).

Five pre-session blockers (R-01 through R-05) were resolved on 2026-06-05:

| Ref | Issue resolved |
|---|---|
| R-01 | SCN-05 step 5 corrected — "IH Review Rejected" → "Safety Review Rejected" |
| R-02 | Sign-off count corrected — denominator updated from 10 to 11 (Business Sponsor added) across UAT-COMMAND-CENTER.md |
| R-03 | Three scenario assignment discrepancies in UAT-TEST-REPORT.md §3 corrected to match UAT-EXECUTION-PLAN.md §4.1 |
| R-04 | UAT-FEEDBACK.md confirmed present and structurally complete — EX-06 satisfiable |
| R-05 | SCN-03 forward reference replaced with explicit Coordinator Setup procedure |

Seven non-blocking recommendations (R-06 through R-12) remain open. None prevent UAT from starting. See Section 4.

### 1.4 UAT Readiness Score at Authorization

The Command Center readiness score at UAT Day 0 (pre-testing baseline):

```
Component A — Scenario execution:   0.0 / 20   (no scenarios run yet — expected)
Component B — Pass rate:             0.0 / 25   (no scenarios run yet — expected)
Component C — Defect health:        30.0 / 30   (zero open defects — maximum)
Component D — Exit criteria:         3.0 / 15   (EX-03, EX-04, EX-05 met at entry)
Component E — Sign-off progress:     0.0 / 10   (sign-off process not started — expected)

BASELINE SCORE:  33 / 100   →  NOT READY (expected — testing not started)
TARGET BY DAY 4: ≥ 85 / 100  →  READY
```

A score of 33 at Day 0 is the expected baseline. It reflects perfect defect health (30/30) and partial exit criteria progress, with zero score on execution and sign-off because neither has started. The trajectory to READY (≥ 85) by Day 4 is achievable given the current defect-free state.

**Governance package score (audit):** 87 / 100 — GOOD. All pre-session blockers resolved.

---

## 2. Scope

### 2.1 Module Under Test

**Safety Data Management — only.** No other module is in scope for this UAT cycle.

### 2.2 In-Scope Features

| Feature area | What is being validated |
|---|---|
| New chemical request — submission | 4-section form, all required fields, GHS hazard picker, PPE auto-recommendation, eSDS upload and date, manufacturer selection with auto-populated contact data, storage location selection |
| New chemical request — validation | Required field enforcement, minimum length rules, manufacturer and intended use blocking, error feedback clarity |
| Multi-stage approval workflow | Safety Review → EMP Review → IH Review sequential routing, role-scoped action zones |
| Approve action | Single-stage advancement, timeline update, toast confirmation |
| Return for revision | Reason modal (min 3 chars), routing back to the stage of revision, not Stage 1 |
| Rejection | Reason required, terminal state, no resubmit option |
| Resubmission | Routes to the stage at which revision was requested; prior approvals preserved |
| My Requests | Action Needed / In Progress / Closed grouping; submitter visibility rules; GA/Admin/HSE see all |
| Approvals inbox | Pending requests scoped to reviewer's stage; badge count accuracy |
| Request detail drawer | All metadata, hazards, PPE, timeline, stage-appropriate action zone |
| Master Sheet | 12-item inventory, GHS icons, inventory bars, row click to drawer |
| Manufacturer management | Browse, search, add, edit, deactivate (double-confirm), reactivate |
| Storage location management | Site-grouped browse, add, deactivate, duplicate prevention, inactive exclusion from form |
| PPE reference | GHS-keyed recommendations |
| User management | Invite, edit, deactivate, stage scope assignment (GA only) |
| Role-based navigation visibility | All 5 roles verified against access matrix |
| Language toggle EN / FR | All strings, all workflows, functional parity |
| Session continuity | All mutation types survive hard refresh |
| Dashboard and navigation | Module cards, breadcrumb, command palette, sidebar collapse, theme, notifications |

### 2.3 Explicitly Out of Scope

The following must not appear in any test script. Testers who navigate to these areas should note the observation and return to their assigned scenario.

| Area | Reason |
|---|---|
| Cash Advance module | Stub — not yet developed |
| Daily Expense module | Stub — not yet developed |
| Security Escort module | Stub — not yet developed |
| Management of Change | Stub — not yet developed |
| Sign Out button | Entra ID / SSO deferred |
| My Profile button | Deferred to v2 |
| Save Draft button | Draft store deferred |
| Azure Sync indicator | Backend integration deferred |
| Mobile browser testing | Desktop only for this cycle |
| Backend database integration | localStorage only for this cycle |

### 2.4 Formally Accepted Deferred Items

The following 8 known items are accepted and must not be raised as defects. Each carries a formal waiver in UAT-SIGNOFF.md §7.

| Ref | Description | Severity |
|---|---|---|
| OPEN-01 | Sign Out has no action | Low |
| OPEN-02 | My Profile has no action | Low |
| OPEN-03 | Save Draft shows toast only | Low |
| OPEN-04 | Dashboard stats are static demo values | Medium |
| OPEN-05 | Stub module cards labelled "Live" | Medium |
| OPEN-06 | GHS hazard selection not required before submission | Medium — HSE Process Owner decision pending |
| OPEN-07 | Storage location not required before submission | Medium |
| OPEN-08 | sm/user roles see Cash and Escort nav items | Medium |

---

## 3. Entry Criteria Verification

All 12 entry criteria (EC-01 through EC-12) must be confirmed MET before the first tester session begins. The UAT Coordinator is responsible for this check. EC-01 through EC-07 are confirmed from the pre-UAT sprint record. EC-08 through EC-12 must be confirmed on the day of first session.

| # | Criterion | Owner | Status | Confirmed by | Date |
|---|---|---|---|---|---|
| EC-01 | Git tag `UAT-2026-06-04` applied to `master` | Dev Lead | ✅ CONFIRMED | eTPC Dev Team | 2026-06-04 |
| EC-02 | `master` branch frozen — no further commits during UAT | Dev Lead | ✅ CONFIRMED | eTPC Dev Team | 2026-06-04 |
| EC-03 | `uat-feedback` branch created from tag | Dev Lead | ✅ CONFIRMED | eTPC Dev Team | 2026-06-04 |
| EC-04 | All 35 regression tests pass at git tag | Dev Lead | ✅ CONFIRMED — 35 / 35 PASS | eTPC Dev Team | 2026-06-04 |
| EC-05 | Zero open Critical defects | UAT Coordinator | ✅ CONFIRMED — 0 open | eTPC Dev Team | 2026-06-04 |
| EC-06 | Zero open High defects | UAT Coordinator | ✅ CONFIRMED — 0 open | eTPC Dev Team | 2026-06-04 |
| EC-07 | All pre-UAT sprint defects closed | UAT Coordinator | ✅ CONFIRMED — 8 closed | eTPC Dev Team | 2026-06-04 |
| EC-08 | UAT application deployed to Azure UAT slot at confirmed URL | IT Representative | ☐ PENDING | | |
| EC-09 | All participants identified, briefed, and available | UAT Coordinator | ☐ PENDING | | |
| EC-10 | HSE Process Owner has reviewed SCN-02 through SCN-05 and confirmed readiness | HSE Process Owner | ☐ PENDING | | |
| EC-11 | UAT-DEFECTS.md, UAT-FEEDBACK.md, and UAT-EXECUTION-PLAN.md distributed to all participants | UAT Coordinator | ☐ PENDING | | |
| EC-12 | UAT Coordinator has confirmed `localStorage` cleared on each tester's browser | UAT Coordinator | ☐ PENDING | | |

**Entry criteria confirmed MET at authorization: 7 / 12**

**Entry criteria requiring Day 1 confirmation: 5 / 12** (EC-08 through EC-12)

> **Rule:** UAT sessions may not begin until all 12 criteria are confirmed MET and the UAT Coordinator has signed the entry criteria section of UAT-EXECUTION-PLAN.md §6.

### 3.1 Day 1 Entry Criteria Checklist

The UAT Coordinator must complete the following on the morning of Day 1, before any tester opens the application.

- [ ] **EC-08** — Confirm the UAT URL is accessible. Open it in Edge. Verify the application loads and displays the TPC eSolutions splash screen. Record the confirmed URL in UAT-SIGNOFF.md §2.
- [ ] **EC-09** — Confirm all 6 testers have confirmed availability and are present or ready. Confirm all supporting roles (Dev Lead, HSE Process Owner, IT Rep) are reachable.
- [ ] **EC-10** — Confirm the HSE Process Owner has read SCN-02 through SCN-05 in UAT-EXECUTION-PLAN.md and has confirmed the approval workflow scenarios are ready to validate.
- [ ] **EC-11** — Confirm all participants have received: UAT-EXECUTION-PLAN.md, their individual UAT-FEEDBACK.md copy, UAT-KICKOFF-PACKAGE.md, and this Start Authorization document.
- [ ] **EC-12** — On each tester's browser: open DevTools (F12) → Application → Local Storage → confirm `tpc_requests` and `tpc_req_counter` keys are absent, or clear them. Confirm in the briefing log.

UAT Coordinator sign-off on all 12 entry criteria MET:

**Name:** _________________________________ **Signature:** _________________________________ **Date / Time:** _________________

---

## 4. Outstanding Non-Blocking Risks

The following recommendations from the 2026-06-05 governance audit remain open. Each has been assessed as non-blocking — they do not prevent UAT from starting or prevent a valid GO decision. They are recorded here so the UAT Coordinator can track and address them in parallel with testing, or assign them to a post-UAT action.

| Ref | Finding | Category | Owner | UAT impact | Recommended action |
|---|---|---|---|---|---|
| R-06 | Business Sponsor has no RACI, escalation path, or authority definition in the governance framework | Governance gap | UAT Coordinator | None — Business Sponsor engages only at §12 sign-off (Day 4). Coordinator should confirm the Business Sponsor's name and availability before Day 4. | Add Business Sponsor to UAT-EXECUTION-PLAN.md RACI and UAT-TRIAGE-GUIDE.md escalation rules. Target: before Day 3. |
| R-07 | Two incompatible readiness scoring systems — UAT-TEST-REPORT.md §10 uses a 10-point dimension score; UAT-COMMAND-CENTER.md uses a 100-point formula. Not reconciled or cross-referenced. | Documentation inconsistency | UAT Coordinator | Low — Project Sponsor may query two different readiness numbers. Coordinator should be prepared to explain both are used for different purposes. | Retire the 10-point dimension score from UAT-TEST-REPORT.md §10 and replace with the Command Center formula, or add a reconciliation note. Target: before Day 3 when the test report is completed. |
| R-08 | UAT-TEST-REPORT.md lacks a document reference number, a document control version table, and Appendix B references stale document versions (DEFECTS.md v1.0, SIGNOFF.md v1.0). | Documentation quality | UAT Coordinator | None — does not affect testing. | Assign ref TPC-ESOL-UAT-TR-001, add version table, update Appendix B version references. Can be done any time before the report is completed on Day 3. |
| R-09 | Appendix C of UAT-TEST-REPORT.md lists regression tests totalling 31, against the stated count of 35. D-01, D-02, D-03 entries are absent. | Audit trail gap | Dev Lead | None — regression tests were confirmed PASS at git tag. This is a documentation completeness issue. | Add D-01, D-02, D-03 test entries to Appendix C so the count reconciles to 35. Target: before sign-off. |
| R-10 | OPEN-06 in UAT-DEFECTS.md is marked Deferred before the HSE Process Owner decision that would trigger the deferral has been made. | Status accuracy | UAT Coordinator | None — a status label. Functionally OPEN-06 is treated correctly as pending. | Change OPEN-06 status to Approved (pending HSE decision) on Day 1 after the HSE Process Owner briefing. Update to Deferred or Closed after the decision is recorded. |
| R-11 | UAT-SIGNOFF.md does not explicitly state the required signature collection sequence. Implied by section order but not written as a rule. | Documentation clarity | UAT Coordinator | None — the UAT Coordinator knows the sequence. Marginal risk if a new signatory tries to complete out of order. | Add a one-paragraph sequence note at the top of UAT-SIGNOFF.md. Can be done any time before Day 3 sign-off collection begins. |
| R-12 | UAT-EXECUTION-PLAN.md participant table shows "TBC" for all tester and supporting role names. The plan is approved for execution with no named participants. | Accountability gap | UAT Coordinator | None for testing itself — scenarios are assigned by role, not name. Creates an accountability gap in the audit trail. | Replace all "TBC" entries with confirmed participant names before distributing the plan. Target: before Day 1 briefing. |

**Risk summary:** All 7 outstanding items are documentation quality, governance completeness, or audit trail issues. None affect the ability to execute test scenarios, raise and triage defects, or make a valid GO / NO GO decision.

---

## 5. UAT Start Recommendation

### 5.1 Basis for Recommendation

| Factor | Status |
|---|---|
| Build regression tests | 35 / 35 PASS ✅ |
| Open defects at UAT entry | 0 ✅ |
| Pre-session governance blockers | 0 open — all 5 resolved ✅ |
| Governance package score | 87 / 100 — GOOD ✅ |
| Baseline Readiness Score | 33 / 100 — NOT READY (expected at Day 0) ✅ |
| Entry criteria confirmed (pre-session) | 7 / 12 — remaining 5 require Day 1 confirmation ✅ |
| Test scenarios | 14 defined, fully specified, execution-ready ✅ |
| Defect management process | Complete — lifecycle, triage guide, template, command center in place ✅ |
| Feedback forms | Confirmed present — EX-06 satisfiable ✅ |
| SCN-03 setup procedure | Documented — Coordinator Setup note added ✅ |
| SCN-05 step 5 accuracy | Corrected ✅ |
| Outstanding non-blocking risks | 7 open — all documentation/governance quality items, none affect testing ✅ |

### 5.2 Recommendation

**PROCEED — UAT IS AUTHORIZED TO START.**

The Safety Data Management module build is in a confirmed-ready state. All workflow-blocking defects were resolved before UAT entry. The governance package is complete at a level appropriate for a first-module enterprise platform UAT. The five pre-session blockers identified by the governance audit have been resolved. The remaining open items are documentation quality recommendations that do not affect any tester's ability to execute scenarios or the Project Sponsor's ability to make a valid acceptance decision.

UAT may commence on the date confirmed by the IT Representative (EC-08) following completion of the Day 1 entry criteria checklist in Section 3.1.

### 5.3 Conditions on Authorization

This authorization is issued with the following conditions, which must be satisfied before the first tester opens the application:

| # | Condition | Owner |
|---|---|---|
| 1 | EC-08 through EC-12 confirmed MET and UAT Coordinator has signed Section 3.1 | UAT Coordinator |
| 2 | All 6 testers have received and acknowledged the UAT Kickoff Package and their scenario assignments | UAT Coordinator |
| 3 | IT Representative has confirmed the UAT URL and verified the build matches git tag `UAT-2026-06-04` | IT Representative |
| 4 | Dev Lead is available for unscheduled triage during Day 1 sessions | Dev Lead |

---

## 6. Required Participants

### 6.1 UAT Testers

All six roles must be covered. If a named participant is unavailable, a substitute must be identified and briefed by the UAT Coordinator before sessions begin. Substitution must be recorded in UAT-SIGNOFF.md §4.3.

| Role | Role code | Demo persona | Primary scenarios | Availability confirmed |
|---|---|---|---|---|
| Global Admin | `ga` | Cherif Hassan | SCN-01 through SCN-14 (all) | ☐ |
| Safety Admin | `admin` | Cherif Hassan | SCN-01, 02, 05, 06, 07, 08, 09, 11, 12, 13, 14 | ☐ |
| HSE Reviewer — Safety Review | `she` | Mariam Deby | SCN-02, 03, 05, 06, 07, 11, 12 | ☐ |
| HSE Reviewer — IH Review | `she` | Oumar Cheikh | SCN-03, 05, 11, 12 | ☐ |
| Store Manager | `sm` | Fatima Moussa | SCN-01, 06, 07, 09, 11, 12, 13, 14 | ☐ |
| Field User | `user` | Ahmed Mahamat | SCN-01, 03, 05, 06, 11, 12, 13, 14 | ☐ |

> **Role selection:** Each tester selects their assigned role using the cog icon (top-right) at the start of every session. Role must not be changed during a session unless a scenario explicitly requires it. The UAT Coordinator verifies correct role selection during the session setup checklist.

### 6.2 Supporting Roles

| Role | Responsibility | Availability confirmed |
|---|---|---|
| UAT Coordinator | Runs briefing, verifies entry criteria, manages sessions, logs defects, issues daily report | ☐ |
| Development Lead | Available for Day 1 unscheduled triage; on-call throughout UAT for Critical and High defects (4-hour SLA) | ☐ |
| HSE Process Owner | Attends Day 1 briefing; validates SCN-02 through SCN-05 workflow accuracy; signs UAT-SIGNOFF.md §8 | ☐ |
| IT Representative | Confirms EC-08 (URL and build); maintains UAT slot; deploys fixes from `uat-feedback` | ☐ |
| Project Sponsor | Receives daily report; makes final GO / NO GO decision; signs UAT-SIGNOFF.md §13 | ☐ |
| Business Sponsor | Confirms operational readiness; signs UAT-SIGNOFF.md §12 (Day 4) | ☐ |

### 6.3 Contact Sheet

*To be completed by the UAT Coordinator before the Day 1 briefing.*

| Role | Name | Contact (Teams / email) | Timezone |
|---|---|---|---|
| UAT Coordinator | _________________________________ | _________________________________ | ________ |
| Development Lead | _________________________________ | _________________________________ | ________ |
| HSE Process Owner | _________________________________ | _________________________________ | ________ |
| IT Representative | _________________________________ | _________________________________ | ________ |
| Project Sponsor | _________________________________ | _________________________________ | ________ |
| Business Sponsor | _________________________________ | _________________________________ | ________ |
| Global Admin tester | _________________________________ | _________________________________ | ________ |
| Safety Admin tester | _________________________________ | _________________________________ | ________ |
| HSE Reviewer SR tester | _________________________________ | _________________________________ | ________ |
| HSE Reviewer IH tester | _________________________________ | _________________________________ | ________ |
| Store Manager tester | _________________________________ | _________________________________ | ________ |
| Field User tester | _________________________________ | _________________________________ | ________ |

---

## 7. Day 1 Activities

### 7.1 Day 1 Objectives

By the close of Day 1, the following must be achieved:

- [ ] All 12 entry criteria confirmed MET
- [ ] All 6 testers briefed, roles confirmed, localStorage cleared
- [ ] SCN-01 executed and passed (new chemical submission — core entry point to all other scenarios)
- [ ] SCN-02 executed (Safety Review approval — validates first approval stage)
- [ ] SCN-04 executed (full approval chain — validates end-to-end workflow, sets baseline confidence)
- [ ] SCN-05 executed (rejection workflow — validates terminal negative path)
- [ ] Coordinator Setup for SCN-03 completed — request advanced to IH Review (see 7.4)
- [ ] Day 1 defects logged and first triage meeting completed
- [ ] Day 1 status report issued to Project Sponsor and stakeholders

SCN-03 is reserved for Day 2 because it requires the SCN-01 request to have been approved through EMP Review first. The Coordinator Setup step at the end of Day 1 creates that state.

### 7.2 Day 1 Timed Agenda

| Time | Activity | Owner | Location / channel |
|---|---|---|---|
| 09:00 | **Participant briefing** (60 min) — UAT Kickoff Package walkthrough, role assignments confirmed, deferred items explained, defect reporting process, no-refresh rule, question time | UAT Coordinator | [Room / Teams link TBC] |
| 10:00 | **Session setup** — IT Representative confirms URL accessible from each tester's machine; UAT Coordinator verifies localStorage cleared on each browser; roles confirmed in-application | UAT Coordinator + IT Rep | Per tester machine |
| 10:15 | **EC-08 through EC-12 sign-off** — UAT Coordinator confirms all 5 pending entry criteria MET and signs Section 3.1 of this document | UAT Coordinator | |
| 10:30 | **SCN-01 — New Chemical Request Submission** | Field User, Store Manager, Safety Admin, GA | UAT environment |
| 11:15 | **SCN-02 — Safety Review Approval** | HSE Reviewer SR, Safety Admin, GA | UAT environment |
| 11:45 | **SCN-05 — Rejection Workflow** | HSE Reviewer SR, Field User | UAT environment |
| 12:15 | **Lunch break** | | |
| 13:15 | **SCN-04 — Full Approval Chain (end-to-end)** | GA | UAT environment |
| 14:15 | **Buffer / catch-up window** — any SCN-01 or SCN-02 re-runs for roles that did not complete; HSE Process Owner walkthrough of workflow accuracy observations | UAT Coordinator | |
| 15:00 | **Coordinator Setup for SCN-03** *(see Section 7.4)* | UAT Coordinator (GA role) | UAT environment |
| 15:15 | **Open session** — testers document observations, complete Section 7 of feedback form for any issues found, UAT Coordinator collects verbal feedback | All participants | |
| 16:30 | **Daily triage meeting** (30 min) — UAT Coordinator + Dev Lead; triage all new defects; confirm SLA status; assign owners; update UAT-DEFECTS.md; update Command Center | UAT Coordinator + Dev Lead | [Room / Teams link TBC] |
| 17:00 | **Day 1 status report issued** — UAT Coordinator sends report to Project Sponsor, Dev Lead, HSE Process Owner, IT Representative | UAT Coordinator | Email / Teams |

### 7.3 Day 1 Scenario Execution Order and Role Matrix

| Scenario | Title | Roles required | Sequence dependency |
|---|---|---|---|
| SCN-01 | New Chemical Request Submission | Field User, Store Manager, Safety Admin, GA | None — first scenario |
| SCN-02 | Safety Review Approval | HSE Reviewer SR, Safety Admin, GA | Requires SCN-01 (a pending request at Safety Review) |
| SCN-05 | Rejection Workflow | HSE Reviewer SR, Field User | Requires a separate pending request at Safety Review. Use a freshly submitted request, not the SCN-01/02 request (which is at EMP Review after SCN-02). |
| SCN-04 | Full Approval Chain | GA | Requires a fresh submission. GA submits and approves through all 3 stages. Independent of other sessions. |

> **Parallel execution note:** SCN-01 and SCN-05 can proceed in parallel if sufficient tester coverage allows. SCN-02 must follow SCN-01. SCN-04 is fully independent and can run concurrently with SCN-05 if GA and HSE Reviewer SR can be split across machines.

### 7.4 Coordinator Setup for SCN-03 (End of Day 1)

This is a mandatory Coordinator action — not a test scenario. It creates the data state SCN-03 requires on Day 2.

**Context:** SCN-03 (Return for Revision and Resubmission) requires a request at IH Review stage. After SCN-02, the SCN-01 request is at EMP Review. SCN-03 cannot begin until that request is advanced to IH Review.

**Procedure:**

1. After all Day 1 testers have completed their sessions, the UAT Coordinator opens the UAT application.
2. Switch to role: `ga` (Global Admin).
3. Navigate to Approvals.
4. Locate the request created in SCN-01 (currently at EMP Review after SCN-02 approval).
5. Open the request drawer. Click **Approve**.
6. Confirm the request advances to IH Review stage. Note the request ID in the Day 1 session log.
7. Close the browser. Do not hard-refresh after this action — the state must persist.

**Verification:** On Day 2, before SCN-03 begins, the UAT Coordinator confirms the request is at IH Review by navigating to Approvals as GA. If the request is no longer at IH Review (browser cleared between sessions), repeat steps 1–7 using a freshly submitted request.

**Log entry required:** Record the request ID, the time of setup, and the Coordinator name in the daily session log for Day 1.

### 7.5 Day 1 Defect Reporting Protocol

- Testers record observations in Section 7 of their UAT-FEEDBACK.md as they test — not from memory at the end.
- If a tester believes they have found a defect, they notify the UAT Coordinator verbally or via the agreed channel immediately.
- The UAT Coordinator logs all reported defects in UAT-DEFECTS.md within 4 hours of the report.
- Critical defects: UAT Coordinator suspends affected scenarios immediately and notifies the Project Sponsor within 1 hour.
- High defects: triaged at the 16:30 meeting; 24-hour SLA clock starts at log time.
- Any defect that blocks a scenario must be reported to the UAT Coordinator immediately — do not attempt to work around it.

---

## 8. Formal Authorization

This section constitutes the formal authorization for UAT to begin. All four signatures are required. The Project Sponsor signature is the binding authority. UAT sessions must not start before Section 8.4 is signed.

---

### 8.1 UAT Coordinator Authorization

*I confirm that:*
- *The governance documentation package is complete and correct for UAT execution*
- *R-01 through R-05 have been resolved and the corrections applied*
- *Entry criteria EC-01 through EC-07 are confirmed MET*
- *EC-08 through EC-12 will be verified on Day 1 before sessions begin, per Section 3.1*
- *All 6 UAT participant roles have been identified and briefed or are scheduled for briefing*
- *The UAT Kickoff Package and scenario assignments have been or will be distributed before Day 1*
- *Outstanding risks R-06 through R-12 have been reviewed and assessed as non-blocking*

&nbsp;

**Full name:** _________________________________

**Title:** UAT Coordinator — TPC eSolutions

**Signature:** _________________________________

**Date:** _________________

---

### 8.2 Development Lead Authorization

*I confirm that:*
- *Git tag `UAT-2026-06-04` is applied to the `master` branch*
- *`master` is frozen — no commits will be made to `master` during the UAT window*
- *`uat-feedback` branch exists and is the target for all defect fixes during UAT*
- *35 / 35 regression tests passed at the git tag*
- *Zero defects are open at UAT entry*
- *I am available for unscheduled triage on Day 1 and maintain a 4-hour response SLA for Critical defects throughout the UAT window*

&nbsp;

**Full name:** _________________________________

**Title:** Development Lead — TPC eSolutions

**Signature:** _________________________________

**Date:** _________________

---

### 8.3 IT Representative Authorization

*I confirm that:*
- *The UAT application is deployed to the Azure Static Web Apps UAT slot*
- *The deployed build corresponds to git tag `UAT-2026-06-04`*
- *The UAT URL has been tested and is accessible from tester machines*
- *A process is in place to deploy fixes from the `uat-feedback` branch during the UAT window*
- *The confirmed UAT URL is:* `_________________________________`

&nbsp;

**Full name:** _________________________________

**Title:** IT Representative — TPC eSolutions

**Signature:** _________________________________

**Date:** _________________

---

### 8.4 Project Sponsor Authorization — Binding Authority

*I have reviewed:*
- *This UAT Start Authorization document in full*
- *The UAT Readiness Statement (Section 1)*
- *The Entry Criteria Verification (Section 3)*
- *The Outstanding Non-Blocking Risks (Section 4)*
- *The UAT Start Recommendation (Section 5)*

*I confirm that the conditions in Section 5.3 are understood and will be satisfied before the first tester session begins.*

*I hereby authorize the commencement of User Acceptance Testing for the TPC eSolutions Safety Data Management module.*

☐ **AUTHORIZED** — UAT may begin on the date confirmed by the IT Representative (EC-08).

☐ **NOT AUTHORIZED** — UAT may not begin. Reason:

_______________________________________________________________________________

_______________________________________________________________________________

&nbsp;

**Full name:** _________________________________

**Title / Position:** _________________________________

**Organisation:** Tchad Petroleum Company

**Signature:** _________________________________

**Date:** _________________

---

## Appendix A — Pre-Seeded Test Data Reference

The following requests are loaded automatically when `localStorage` is empty. Testers will see these on first load.

| Request ID | Chemical | Status | Location in UI |
|---|---|---|---|
| CHM-154 | Methanol | Rejected | My Requests → Closed group; not visible in Approvals |
| CHM-155 | Diesel | Review Complete | My Requests → Closed group; not visible in Approvals |
| CHM-156 | Acetone | Safety Review (pending) | Approvals inbox for SA/HSE/GA; My Requests → In Progress |

CHM-154 and CHM-155 are completed requests — no actions are available on them. CHM-156 is live and can be used for approval, return, or rejection actions. If a tester accidentally actions CHM-156 before it is needed for a scenario, the UAT Coordinator can reset the data state using the procedure in UAT-EXECUTION-PLAN.md §5.5.

---

## Appendix B — Data Reset Procedure

If a tester needs a clean state mid-session:

1. Press **F12** to open browser DevTools
2. Navigate to **Application → Local Storage**
3. Delete keys: `tpc_requests` and `tpc_req_counter`
4. Press **Ctrl+Shift+R** (hard refresh)
5. Pre-seeded data (CHM-154, CHM-155, CHM-156) is restored automatically
6. Notify the UAT Coordinator — every reset must be noted in the daily session log with the time and reason

---

*Document ref: TPC-ESOL-UAT-AUTH-001 v1.0 | Classification: INTERNAL — CONTROLLED*
*This authorization is valid for the UAT window defined in UAT-EXECUTION-PLAN.md §13.*
*Any change to build, scope, or participants after this document is signed requires a written amendment countersigned by the Project Sponsor.*
*Retain for a minimum of 3 years as part of the project audit trail.*
