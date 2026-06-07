# UAT Execution Plan
## Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-001 |
| **Version** | 2.0 — Official |
| **Status** | APPROVED FOR EXECUTION |
| **Build status** | READY FOR UAT |
| **Git tag** | `UAT-2026-06-04` |
| **Source branch** | `master` — frozen at tag |
| **Feedback branch** | `uat-feedback` |
| **Regression tests** | 35 / 35 PASS |
| **Open defects at UAT entry** | 0 |
| **Prepared by** | eTPC Development Team |
| **Plan date** | 2026-06-04 |
| **Classification** | INTERNAL — CONTROLLED |

---

## Document Control

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-06-04 | eTPC Dev Team | Initial template |
| 2.0 | 2026-06-04 | eTPC Dev Team | Official plan — build confirmed READY FOR UAT, all entry criteria met, build context locked |

---

## Table of Contents

1. [Purpose and Background](#1-purpose-and-background)
2. [Scope](#2-scope)
3. [Objectives](#3-objectives)
4. [Participants](#4-participants)
5. [Test Environment](#5-test-environment)
6. [Entry Criteria](#6-entry-criteria)
7. [Exit Criteria](#7-exit-criteria)
8. [Test Scenarios](#8-test-scenarios)
9. [Severity Definitions](#9-severity-definitions)
10. [Defect Workflow](#10-defect-workflow)
11. [Daily Reporting](#11-daily-reporting)
12. [Final Sign-Off Process](#12-final-sign-off-process)
13. [Schedule](#13-schedule)
14. [Risks and Mitigations](#14-risks-and-mitigations)

---

## 1. Purpose and Background

### 1.1 Purpose

This document is the authoritative execution plan for the User Acceptance Testing (UAT) of the TPC eSolutions Safety Data Management module. It defines who will test, what will be tested, how defects will be managed, and what constitutes a valid sign-off.

UAT is the final quality gate before the platform is made available to operational personnel at Tchad Petroleum Company. It is conducted by representative users — not developers — to confirm that the system behaves correctly in real operational conditions and that it meets the business requirements defined during design.

This plan supersedes all earlier draft plans and templates. It takes effect at the moment the UAT Coordinator distributes it to participants.

### 1.2 Background

The TPC eSolutions platform is a multi-module enterprise system for Tchad Petroleum Company operational workflows. The Safety Data Management module — the first live module — manages the full lifecycle of chemical product requests: submission by field personnel, multi-stage HSE review, approval, and archiving.

The module has completed a pre-UAT stabilisation sprint in which eight defects were identified and closed, 35 regression test cases were executed and passed, and the build was confirmed READY FOR UAT with zero open defects.

### 1.3 What This Plan Does Not Cover

- Cash Advance, Daily Expense, Security Escort, and Management of Change modules (not live)
- Backend integration with Azure SQL or SharePoint (deferred — application currently uses browser localStorage)
- Entra ID / SSO authentication (deferred — roles simulated via UI role selector)
- Mobile device testing (desktop browsers only for this UAT cycle)

---

## 2. Scope

### 2.1 In Scope — Safety Data Management

| Feature area | Description | Roles |
|---|---|---|
| New chemical request — submission | 4-section form: chemical info, hazard classification, manufacturer, SDS and storage | Field User, Store Manager, all roles |
| New chemical request — form validation | Required field enforcement, minimum length, manufacturer selection, error feedback | All roles |
| Hazard classification (GHS) | Pictogram picker, PPE auto-recommendation strip | All roles |
| eSDS file attachment | Drag-and-drop and click-to-browse PDF/DOC upload | All roles |
| eSDS revision date | Date capture and storage in request payload | All roles |
| Multi-stage approval workflow | Safety Review → EMP Review → IH Review — sequential, role-scoped | HSE Reviewer, Safety Admin, GA |
| Approval — Approve action | One-stage advancement per action | HSE Reviewer, Safety Admin, GA |
| Approval — Return for revision | Reason required (min 3 chars), routes back to revision stage (not Stage 1) | HSE Reviewer, Safety Admin, GA |
| Approval — Reject | Reason required, terminal state | HSE Reviewer, Safety Admin, GA |
| Resubmission after revision | Submitter corrects and resubmits — routes to the stage where revision was requested | Field User, Store Manager |
| My Requests — tracking | Grouped by status: Action Needed / In Progress / Closed | All roles |
| My Requests — visibility | Field User and Store Manager see own requests only. GA/Admin/HSE see all. | All roles |
| Approvals inbox | Live pending requests scoped to reviewer's stage | HSE Reviewer, Safety Admin, GA |
| Request detail drawer | Full metadata, hazards, PPE, timeline, action zone | All roles |
| Master Sheet | Chemical inventory — 12 items, GHS icons, inventory bars, row click to drawer | All roles |
| Manufacturers — browse | Search, active/inactive filter | All roles |
| Manufacturers — admin | Add, edit, deactivate (double-confirm), reactivate | GA, Safety Admin |
| Storage locations — browse | Site-grouped list | All roles |
| Storage locations — admin | Add, edit, deactivate, reactivate, duplicate prevention | GA |
| PPE reference | GHS-keyed PPE recommendations, admin CRUD | All roles (view), GA (admin) |
| Add to my site | Simplified chemical assignment request | All roles |
| User guide | PDF drop zone for operational guide | All roles |

### 2.2 In Scope — Platform Shell

| Feature area | Roles |
|---|---|
| Dashboard — module cards, stats, activity stream, news | All roles |
| Navigation sidebar — expand/collapse, active state, breadcrumb | All roles |
| Command palette (Ctrl+K / search button) | All roles |
| Role-based navigation visibility | All 5 roles |
| Language toggle EN ⇄ FR | All roles |
| Notifications panel — bell, tabs, mark all read | All roles |
| User management — invite, edit, deactivate, stage scope | GA only |
| Theme toggle (light / dark) | All roles |
| Session continuity — data persistence across hard refresh | All roles |
| Topbar — clock, lang button, theme button, user chip, dropdown | All roles |

### 2.3 Out of Scope

The following must not be included in UAT test scripts. If a tester navigates to these areas, they should note the observation and return to the in-scope workflows.

| Area | Reason |
|---|---|
| Cash Advance module | Stub — not live |
| Daily Expense module | Stub — not live |
| Security Escort module | Stub — not live |
| Management of Change | Stub — not live |
| "Soon" module cards on dashboard | Preview only |
| Sign Out button | SSO / Entra ID deferred |
| My Profile button | Deferred to v2 |
| Save Draft button | Draft store deferred — shows toast only |
| Azure Sync indicator | Static — backend integration deferred |

### 2.4 Deferred Items — Known and Accepted

The following known issues are formally accepted and must not be raised as defects during UAT. They are documented in UAT-DEFECTS.md and will be addressed in defined future sprints.

| Ref | Description |
|---|---|
| OPEN-01 | Sign Out has no action |
| OPEN-02 | My Profile has no action |
| OPEN-03 | Save Draft shows toast only |
| OPEN-04 | Dashboard stats are static demo values |
| OPEN-05 | Cash/Expense/Escort cards show "Live" — they are stubs |
| OPEN-06 | GHS hazard selection not required before submission |
| OPEN-07 | Storage location not required before submission |
| OPEN-08 | Store Manager and Field User see Cash and Escort nav items |

---

## 3. Objectives

The following objectives must all be demonstrably met by the close of UAT.

| Ref | Objective | Measurement |
|---|---|---|
| OBJ-01 | Confirm that the end-to-end chemical request workflow — from submission through all three approval stages to completion — operates correctly across all assigned roles | SCN-01 through SCN-05 pass for all assigned testers |
| OBJ-02 | Confirm that form validation blocks incomplete or invalid submissions and provides clear, actionable error feedback | SCN-01 validation steps pass with no false positives or negatives |
| OBJ-03 | Confirm that the resubmission workflow routes requests back to the stage at which revision was requested, not to Stage 1 | SCN-03 pass — confirmed via timeline inspection |
| OBJ-04 | Confirm that role-based access restricts navigation, approvals inbox, and actions in accordance with the access matrix | SCN-12 pass — all 5 roles verified |
| OBJ-05 | Confirm that the French language mode renders all UI strings correctly and that all workflows function identically in both languages | SCN-11 pass — no untranslated strings, no functional difference |
| OBJ-06 | Confirm that request data submitted in one session is visible and accurate after a full browser page refresh | SCN-13 pass — all mutation types tested |
| OBJ-07 | Confirm that the HSE approval workflow as implemented matches the operational process at Tchad Petroleum Company | HSE Process Owner confirmation in UAT-SIGNOFF.md Section 6 |
| OBJ-08 | Confirm that the platform is fit for operational rollout to Safety Data personnel | UAT-SIGNOFF.md signed by all participants and Project Sponsor |

---

## 4. Participants

### 4.1 UAT Roles and Assignments

Each tester is assigned one platform role for the duration of UAT. Role switching during a session is permitted only for scenarios that explicitly require it (e.g., SCN-03 requires both a reviewer and a submitter).

| UAT participant | Platform role | Demo name in system | Scope | Primary scenarios |
|---|---|---|---|---|
| TBC | Global Admin (`ga`) | Cherif Hassan | All pages, all requests | SCN-01 through SCN-14 |
| TBC | Safety Admin (`admin`) | Cherif Hassan | Approvals, Manufacturers, Storage, PPE, Users hidden | SCN-01, 02, 05, 06, 07, 08, 09, 11, 12, 13, 14 |
| TBC | HSE Reviewer — Safety Review (`she`) | Mariam Deby | Scoped to Safety Review stage | SCN-02, 03, 05, 06, 07, 11, 12 |
| TBC | HSE Reviewer — IH Review (`she`) | Oumar Cheikh | Scoped to IH Review stage | SCN-03, 05, 11, 12 |
| TBC | Store Manager (`sm`) | Fatima Moussa | No approvals, no admin pages | SCN-01, 06, 07, 09, 11, 12, 13, 14 |
| TBC | Field User (`user`) | Ahmed Mahamat | Submission and tracking only | SCN-01, 03, 05, 06, 11, 12, 13, 14 |

> **Note on role simulation:** In the current build, roles are switched via the role selector in the tweaks panel (top-right cog icon). Each tester selects their assigned role at the start of their session and does not change it unless a scenario explicitly requires it. Real Entra ID authentication is deferred. This does not affect any workflow under test.

### 4.2 Supporting Roles

| Role | Name | Responsibility |
|---|---|---|
| UAT Coordinator | TBC | Distributes scenarios, runs daily stand-up, maintains UAT-DEFECTS.md, issues daily report |
| Development Lead | TBC | Answers tester questions, triages defects within 4 hours, deploys fixes to UAT slot |
| HSE Process Owner | TBC | Validates that the approval workflow matches TPC operational procedure. Signs Section 6 of UAT-SIGNOFF.md. |
| IT Representative | TBC | Maintains UAT environment, resolves browser or access issues, manages build deployment |
| Project Sponsor | TBC | Receives daily report, makes final GO / NO GO decision in UAT-SIGNOFF.md |

### 4.3 RACI

| Activity | UAT Coordinator | Dev Lead | HSE Process Owner | IT Rep | Project Sponsor |
|---|---|---|---|---|---|
| Distribute briefing pack | **R** | I | I | I | I |
| Execute test scenarios | A | I | C | I | I |
| Log defects | **R** | I | I | I | I |
| Triage defects | C | **R** | I | I | I |
| Fix and deploy defects | I | **R** | I | C | I |
| Retest fixed defects | **R** | I | I | I | I |
| Complete daily report | **R** | C | I | I | I |
| Sign UAT-SIGNOFF.md | **R** | I | **R** | **R** | **R** |
| Make GO / NO GO decision | C | C | C | C | **R** |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

---

## 5. Test Environment

### 5.1 Build Reference

| Item | Value |
|---|---|
| Application file | `TPC E-Solution.html` |
| Build date | 2026-06-04 |
| Git tag | `UAT-2026-06-04` |
| Source branch | `master` — frozen at tag. No commits permitted to `master` during UAT. |
| Feedback branch | `uat-feedback` — all defect fixes and documentation changes go here during UAT |
| Regression tests | 35 / 35 PASS at git tag |
| Open defects at tag | 0 |

### 5.2 Infrastructure

| Item | Detail |
|---|---|
| Hosting | Azure Static Web Apps — UAT deployment slot |
| URL | TBC — to be confirmed by IT Representative before first session |
| Authentication | None — roles simulated via UI selector |
| Data store | Browser `localStorage` — key: `tpc_requests` |
| Pre-seeded data | CHM-154 (Methanol — Rejected), CHM-155 (Diesel — Review Complete), CHM-156 (Acetone — Safety Review pending) |

### 5.3 Browser Requirements

| Browser | Minimum version | Status |
|---|---|---|
| Microsoft Edge | Latest stable | Required |
| Google Chrome | Latest stable | Supported |
| Mozilla Firefox | Latest stable | Not validated for this UAT cycle |
| Safari | Any | Not validated for this UAT cycle |

Do not use InPrivate / Incognito mode — this prevents localStorage from persisting correctly between tabs and may affect SCN-13.

### 5.4 Session Setup — UAT Coordinator Checklist

Complete the following before each tester's first session.

- [ ] Confirm the UAT URL is accessible from the tester's machine
- [ ] Clear `localStorage` for the tester's browser profile:  
  Edge: Settings → Privacy → Clear browsing data → Cookies and other site data  
  Chrome: Settings → Privacy → Clear browsing data → Cookies and other site data  
  *Or in DevTools console:* `localStorage.clear()`
- [ ] Confirm the tester has selected the correct demo role via the tweaks panel
- [ ] Confirm UAT-DEFECTS.md is open and the tester has a copy of UAT-FEEDBACK.md
- [ ] Note session start time in the daily log

### 5.5 Data Reset

If a tester needs to restart with a clean data state mid-session:

1. Open the browser DevTools (F12)
2. Navigate to Application → Local Storage
3. Delete the keys `tpc_requests` and `tpc_req_counter`
4. Hard-refresh (Ctrl+Shift+R)
5. Notify the UAT Coordinator that a reset was performed — this must be noted in the daily report

Pre-seeded demo requests (CHM-154, CHM-155, CHM-156) are restored automatically on reload.

---

## 6. Entry Criteria

All criteria must be confirmed **MET** before UAT sessions begin. The UAT Coordinator is responsible for this check.

| # | Criterion | Owner | Status |
|---|---|---|---|
| EC-01 | Git tag `UAT-2026-06-04` applied to `master` | Dev Lead | ✅ CONFIRMED |
| EC-02 | `master` branch frozen — no further commits permitted during UAT | Dev Lead | ✅ CONFIRMED |
| EC-03 | `uat-feedback` branch created from tag | Dev Lead | ✅ CONFIRMED |
| EC-04 | All 35 regression tests pass at git tag | Dev Lead | ✅ CONFIRMED — 35/35 PASS |
| EC-05 | Zero open Critical defects | UAT Coordinator | ✅ CONFIRMED — 0 open |
| EC-06 | Zero open High defects | UAT Coordinator | ✅ CONFIRMED — 0 open |
| EC-07 | All pre-UAT sprint defects closed and recorded in UAT-DEFECTS.md | UAT Coordinator | ✅ CONFIRMED — 8 closed |
| EC-08 | UAT application deployed to Azure UAT slot at confirmed URL | IT Representative | ☐ PENDING |
| EC-09 | All UAT participants identified, briefed, and available | UAT Coordinator | ☐ PENDING |
| EC-10 | HSE Process Owner has reviewed the approval workflow scenarios (SCN-02 through SCN-05) and confirmed readiness to validate | HSE Process Owner | ☐ PENDING |
| EC-11 | UAT-DEFECTS.md, UAT-FEEDBACK.md, and this plan distributed to all participants | UAT Coordinator | ☐ PENDING |
| EC-12 | UAT Coordinator has confirmed `localStorage` cleared on each tester's browser | UAT Coordinator | ☐ PENDING |

**UAT may not begin until all 12 criteria are confirmed MET.**  
UAT Coordinator sign-off on entry criteria: ___________________________ Date: ___________

---

## 7. Exit Criteria

UAT is complete and the build may proceed to sign-off when all criteria below are confirmed MET.

| # | Criterion | Threshold | Measurement |
|---|---|---|---|
| EX-01 | All 14 test scenarios executed | 14 / 14 | UAT-TEST-REPORT.md scenario table |
| EX-02 | Scenario pass rate | ≥ 93% (13 of 14) | UAT-TEST-REPORT.md |
| EX-03 | Zero open Critical defects | 0 | UAT-DEFECTS.md active log |
| EX-04 | Zero open High defects | 0 | UAT-DEFECTS.md active log |
| EX-05 | All Medium defects resolved or formally accepted with waiver | 0 unresolved | UAT-DEFECTS.md + UAT-SIGNOFF.md Section 5 |
| EX-06 | All 6 UAT participant feedback forms completed and submitted | 6 / 6 | UAT-FEEDBACK.md forms collected |
| EX-07 | HSE Process Owner has confirmed approval workflow matches TPC operational process | Signed | UAT-SIGNOFF.md Section 6 |
| EX-08 | All 6 UAT participants have signed UAT-SIGNOFF.md | 6 / 6 signatures | UAT-SIGNOFF.md Section 7 |
| EX-09 | UAT-TEST-REPORT.md completed, figures populated, and reviewed by UAT Coordinator | Approved | UAT-TEST-REPORT.md |
| EX-10 | Project Sponsor has signed UAT-SIGNOFF.md Section 8 | Signed | UAT-SIGNOFF.md |

### 7.1 Exceptional Circumstances

If the scenario pass rate falls below 93% but all Critical and High defects are closed, the UAT Coordinator and Project Sponsor may agree a **Conditional GO** with documented conditions. This requires written justification in UAT-TEST-REPORT.md Section 11 and explicit sign-off in UAT-SIGNOFF.md.

A single open Critical or High defect at sign-off time constitutes an automatic **NO GO**. There are no exceptions.

---

## 8. Test Scenarios

### Execution Instructions

1. Execute scenarios in the order listed. Some scenarios depend on state created by earlier ones.
2. Record pass / fail and observations in your UAT-FEEDBACK.md form as you go — do not complete it from memory at the end.
3. If you find a defect, note it in Section 7 of UAT-FEEDBACK.md immediately. The UAT Coordinator will log it formally in UAT-DEFECTS.md within 4 hours.
4. If a step produces an unexpected result that blocks you from continuing, mark the scenario BLOCKED and notify the UAT Coordinator immediately.
5. A scenario is PASS only if every step produces the stated expected result. A single step failure is a scenario FAIL.

---

### SCN-01 — New Chemical Request Submission

**Assigned roles:** Field User, Store Manager, Safety Admin, GA  
**Precondition:** Clean session. Role set to Field User.  
**Estimated duration:** 15 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | In the sidebar, navigate to Safety Data → New Chemical | New Chemical form loads. Four numbered sections visible: Chemical information, Hazard classification & PPE, Manufacturer, SDS & storage location. | |
| 2 | Click **Submit request** without entering anything | Red border and shadow appear on the Chemical name field. Focus moves to the field. No request is created. No page navigation occurs. | |
| 3 | Type "AC" (2 characters) in Chemical name. Click Submit. | Submission still blocked. Red border remains (minimum 3 characters enforced). | |
| 4 | Type "Acetone 99%" in Chemical name. | Red border clears as you type. | |
| 5 | Leave Intended use at "Select Intended Use". Click Submit. | Red border appears on Intended use dropdown. Focus moves to it. | |
| 6 | Select Intended use → "First Use" | Red border clears. | |
| 7 | Select Handling method → "Open System" | |
| 8 | Leave Manufacturer at "Select manufacturer…". Click Submit. | Red border appears on Manufacturer dropdown. Focus moves to it. No request created. | |
| 9 | Select any manufacturer from the list (e.g., "3M") | Manufacturer email, phone, and address auto-populate from the database. Red border clears. | |
| 10 | Select one or more GHS hazard pictograms from the hazard picker | PPE recommendation strip appears below the picker with suggested PPE items based on selected hazards. | |
| 11 | Select Area of use → "Kome 5" | Storage location dropdown populates with Kome 5 locations only. | |
| 12 | Select a storage location from the dropdown | |
| 13 | Set the eSDS last revision date to any date | |
| 14 | Click **Submit request** | Success toast fires: "✓ Request submitted — Routing to HSE reviewer". After approximately 1 second the page navigates to the Safety Data home. | |
| 15 | Navigate to My Requests | The new request appears under the "In Progress" group with status "Pending" and stage "Safety Review". | |
| 16 | Click the eye icon on the request | Detail drawer opens. Title, manufacturer, hazards, PPE, and Submission timeline entry are all visible and correct. | |

---

### SCN-02 — Safety Review Approval

**Assigned roles:** HSE Reviewer (Safety Review scope), Safety Admin, GA  
**Precondition:** SCN-01 complete — a request is pending at Safety Review.  
**Estimated duration:** 10 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | Switch role to HSE Reviewer (Safety Review scope) | Role name updates in the topbar. Approvals nav remains visible. Users and Settings nav are hidden. | |
| 2 | Navigate to Approvals | The SCN-01 request appears in the table at stage "Safety Review". The Approvals nav badge count is accurate. | |
| 3 | Click anywhere on the request row (not a button) | The detail drawer opens showing full request metadata, hazards, PPE chips, and the Submission timeline entry. | |
| 4 | Confirm Approve, Reject, and Return buttons are visible in the drawer footer | Action zone is displayed. All three buttons present. | |
| 5 | Click **Approve** in the drawer footer | Drawer closes. Toast fires: "✓ Approved — #CHM-xxx". The request reappears in the Approvals table at stage "EMP Review". | |
| 6 | Switch to Global Admin role. Navigate to My Requests. | The request shows stage "EMP Review" and status "In review". Timeline shows Submission + Safety Review approval with reviewer name. | |

---

### SCN-03 — Return for Revision and Resubmission

**Assigned roles:** HSE Reviewer (IH Review scope), then Field User  
**Precondition:** A request has been approved through Safety Review and EMP Review and is now at IH Review.

> **Coordinator Setup (required before Day 2 if no request is at IH Review):** At the close of the Day 1 session, after SCN-02 has been executed, the UAT Coordinator switches to the GA role and approves the SCN-01 request at EMP Review stage. This advances it to IH Review without entering terminal state, creating the state SCN-03 requires. Perform this step before ending the Day 1 session and record the request ID used in the daily session log. Do not run SCN-04 as a substitute setup — SCN-04 approves through all three stages and terminates the request, which cannot then be used for SCN-03.

**Estimated duration:** 15 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | As HSE Reviewer (IH Review scope), navigate to Approvals | Request at "IH Review" is visible in the table. | |
| 2 | Click the request row to open the drawer | Action zone visible. Approve, Reject, Return buttons present. | |
| 3 | Click **Return** | Reason modal opens with title "Return for revision". Confirm button is disabled. | |
| 4 | Click Confirm without entering any text | Confirm button remains disabled. Modal stays open. | |
| 5 | Type "AB" (2 characters) in the reason field | Confirm button remains disabled (minimum 3 characters). | |
| 6 | Enter the full reason: "Quantity exceeds site allowance per IH-2024-08. Resubmit with reduced volume." | Confirm button becomes enabled. | |
| 7 | Click **Confirm return** | Modal closes. Toast: "Returned for revision — #CHM-xxx". | |
| 8 | Switch to Field User role. Navigate to My Requests. | The request appears under **Action Needed** group with status "Revision needed". A **Resubmit** button is visible. | |
| 9 | Click the eye icon on the request | Drawer opens. Timeline shows the IH Review "Returned" entry with the reviewer's note visible. | |
| 10 | Close the drawer. Click **Resubmit**. | The request disappears from "Action Needed". Toast or page refresh occurs. | |
| 11 | Switch to GA. Navigate to Approvals. | The request appears in the Approvals table at stage **IH Review** — not at Safety Review or EMP Review. | |
| 12 | Open the request drawer. Inspect the timeline. | Timeline shows: Submission → Safety Review (done) → EMP Review (done) → IH Review (returned) → Resubmission (done). Resubmission note reads "Resubmitted for review." | |

---

### SCN-04 — Full Approval Chain (End-to-End)

**Assigned roles:** GA (to approve all three stages sequentially)  
**Precondition:** A new request submitted by Field User in SCN-01 or a fresh submission.  
**Estimated duration:** 20 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | Submit a new chemical request as Field User. Note the request ID. | Request created at Safety Review. |  |
| 2 | Switch to GA. Navigate to Approvals. Approve the request at Safety Review. | Stage advances to EMP Review. Toast fires. |  |
| 3 | Approve the request at EMP Review. | Stage advances to IH Review. Toast fires. |  |
| 4 | Approve the request at IH Review. | Status changes to "Review Complete". Toast fires. |  |
| 5 | Navigate to My Requests (as GA, seeing all). | Request appears in the **Closed** group with status "Review Complete". |  |
| 6 | Open the request drawer. | Timeline shows 5 entries: Submission + 3 stage approvals + Review Complete. All marked "done". No Approve/Reject/Return buttons visible. |  |
| 7 | Attempt to click Approve or Reject if any buttons are visible. | No action buttons present. Action zone is hidden for terminal state. |  |
| 8 | Hard-refresh the browser (Ctrl+Shift+R). Navigate to My Requests. | Request still present in Closed group with "Review Complete" status. Data has survived the refresh. |  |

---

### SCN-05 — Rejection Workflow

**Assigned roles:** HSE Reviewer, then Field User  
**Precondition:** A request is pending at Safety Review.  
**Estimated duration:** 10 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | As HSE Reviewer, navigate to Approvals. Click the request row. | Drawer opens with action zone visible. | |
| 2 | Click **Reject** | Reason modal opens with title "Reject request". Confirm button disabled. Confirm button styled red. | |
| 3 | Type a rejection reason. Click **Confirm reject**. | Modal closes. Toast: "Rejected — #CHM-xxx". | |
| 4 | Switch to Field User. Navigate to My Requests. | Request in **Closed** group with status "Rejected". No Resubmit button visible. | |
| 5 | Open the drawer for the rejected request. | Timeline shows Submission and Safety Review Rejected entries. Reviewer's reason note is visible. No action zone. | |

---

### SCN-06 — My Requests — Tracking and Grouping

**Assigned roles:** Field User, then GA  
**Precondition:** Multiple requests exist in different status states.  
**Estimated duration:** 10 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | As Field User, navigate to My Requests. | Only requests submitted by Field User (Ahmed Mahamat) are visible. Pre-seeded CHM-154 and CHM-155 are NOT visible (different submitters). | |
| 2 | Confirm group structure: Action Needed / In Progress / Closed | Correct group headings present. Requests in correct groups based on status. | |
| 3 | Switch to Global Admin. Navigate to My Requests. | All requests visible across all submitters. CHM-154 (Rejected), CHM-155 (Review Complete), CHM-156 (Pending) all visible. | |
| 4 | Confirm CHM-154 is in Closed group with "Rejected" status. | ✓ |
| 5 | Confirm CHM-155 is in Closed group with "Review Complete" status. | ✓ |
| 6 | Confirm CHM-156 is in In Progress group with "Pending" status. | ✓ |

---

### SCN-07 — Master Sheet Browsing

**Assigned roles:** Any  
**Precondition:** Navigate to Safety Data → Master Sheet.  
**Estimated duration:** 8 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | Navigate to Safety Data → Master Sheet | Inventory table loads with 12 chemical rows. Column headers visible: ID, Chemical, Hazards, Class, Manufacturer, Site, Inventory, PPE. | |
| 2 | Inspect GHS hazard icons for any row | Pictograms render correctly. Hazard icons are recognisable GHS symbols. | |
| 3 | Inspect the inventory bar for Diesel (CHM-002) | Bar shows 480 / 600. Bar fill is amber/yellow indicating high utilisation. | |
| 4 | Inspect the inventory bar for Mercaptan Odorant (CHM-011) | Bar shows 3 / 8. Bar fill is normal (green). | |
| 5 | Click any table row (not a button) | Detail drawer opens for the selected chemical. ID, hazards, PPE, and manufacturer are displayed. | |

---

### SCN-08 — Manufacturer Management

**Assigned roles:** GA, Safety Admin  
**Precondition:** Navigate to Safety Data → Manufacturers.  
**Estimated duration:** 15 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | Navigate to Manufacturers | Grid loads with all active manufacturers sorted A–Z. | |
| 2 | Type "3M" in the search field | Grid filters to show only manufacturers matching "3M". | |
| 3 | Clear the search. Click **Add manufacturer**. | Empty form panel appears below (or scrolls into view). | |
| 4 | Click **Save** without entering a name | Toast: "Manufacturer name is required". Form does not close. | |
| 5 | Enter a name, email, phone, and address. Click **Save**. | Manufacturer added to the grid. Toast confirms. | |
| 6 | Click **Edit** on the newly added manufacturer | Form pre-populates with the manufacturer's data. | |
| 7 | Change the phone number. Click **Save**. | Grid updates with the new phone number. Toast confirms. | |
| 8 | Click **Deactivate** on the manufacturer | Button changes to "Confirm deactivate?" styled red. | |
| 9 | Wait 3 seconds without clicking | Button reverts to normal "Deactivate" style. Deactivation did not proceed. | |
| 10 | Click **Deactivate** again. Immediately click **Confirm deactivate?**. | Manufacturer marked inactive. | |
| 11 | Switch filter to "All" | Inactive manufacturer appears with "Inactive" badge. | |
| 12 | Click **Reactivate** | Manufacturer returns to active status. | |

---

### SCN-09 — Storage Location Management

**Assigned roles:** GA  
**Precondition:** Navigate to Safety Data → Storage.  
**Estimated duration:** 12 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | Navigate to Storage | Locations displayed grouped by site. Kome 5 group has 16 active locations. Moundouli has 1. | |
| 2 | Click **Add location** | Form panel opens. Site dropdown populated with all sites. | |
| 3 | Click **Save** without selecting a site or entering a name | Error: site and name are required. | |
| 4 | Select site "Kome 5". Enter an existing location name (e.g., "AIRPORT"). Click **Save**. | Error: "A location with this name already exists at this site". Duplicate prevention working. | |
| 5 | Enter a unique name (e.g., "UAT Test Location"). Click **Save**. | Location added to Kome 5 group. Toast confirms. | |
| 6 | Click **Deactivate** on the new location. Confirm. | Location marked inactive and greyed out. | |
| 7 | Navigate to New Chemical form. Select Area of use → Kome 5. | The deactivated "UAT Test Location" does not appear in the Storage location dropdown. Inactive locations are correctly excluded. | |

---

### SCN-10 — User Management

**Assigned roles:** GA, then HSE Reviewer (to verify access restriction)  
**Estimated duration:** 15 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | As GA, navigate to Users | User grid loads. KPI strip shows: 6 active, 0 inactive, 2 reviewers. All 6 seeded users visible. | |
| 2 | Switch to HSE Reviewer. Navigate to Users. | Grid shows "Access restricted to Global Admin." No user data visible. | |
| 3 | Switch back to GA. Click **Invite user**. | Form panel opens. All fields empty. | |
| 4 | Click **Save** with empty name | Error: "Full name is required (min 2 characters)". | |
| 5 | Enter name "A" (1 character). Click **Save**. | Error: name too short. | |
| 6 | Enter a valid name. Enter an invalid email ("notanemail"). Click **Save**. | Error: "A valid email address is required". | |
| 7 | Enter a valid email. Select Role → HSE Reviewer. | A "Stage scope" section appears with checkboxes for Safety Review, EMP Review, and IH Review. | |
| 8 | Select all fields. Leave stage scope unchecked. Click **Save**. | Validation note: at least one stage scope required for reviewer role (if implemented) — or user saved with empty scope. Record observation either way. | |
| 9 | Check at least one stage scope. Select a site. Click **Save**. | User added to grid. Toast confirms. | |
| 10 | Click **Edit** on the new user | Form pre-populates. Email field is greyed out and read-only. | |
| 11 | Click **Deactivate** on the new user | Countdown button appears: "Confirm? (3s)" styled red. | |
| 12 | Click the countdown button within 3 seconds | User marked inactive. KPI counts update. | |

---

### SCN-11 — Language Toggle EN / FR

**Assigned roles:** Any  
**Estimated duration:** 10 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | Click the **EN** button in the topbar | Button changes to **FR**. All navigation labels switch to French: "Tableau de bord", "Mes demandes", "Approbations", etc. | |
| 2 | Navigate through Dashboard, My Requests, Approvals | All page titles and subtitles in French. No English strings visible in nav or headings. | |
| 3 | Submit a new chemical request in FR mode | Success toast fires in French: "✓ Demande soumise — Routage vers réviseur HSE". | |
| 4 | Navigate to Approvals. Open a request drawer. Click **Return**. | Reason modal title reads "Retourner pour révision". Label reads "Motif *". Buttons labelled in French. | |
| 5 | Enter a reason and confirm the return | Toast in French: "Retourné pour révision — #CHM-xxx". | |
| 6 | Click the **FR** button to revert to English | Button changes to **EN**. All labels revert to English. Previously submitted requests remain in the store. | |
| 7 | Navigate to My Requests in EN mode | French-mode request appears correctly with English labels. No data loss from language switch. | |

---

### SCN-12 — Role-Based Visibility

**Assigned roles:** All five roles tested in sequence  
**Estimated duration:** 12 minutes

| # | Role | Expected navigation | Verify |
|---|---|---|---|
| 1 | Global Admin (`ga`) | All nav items visible: Dashboard, My Requests, Safety Data (+ children), Cash Advance, Daily Expense, Security Escort, Approvals, Users, Settings, Quick Actions | ☐ |
| 2 | Safety Admin (`admin`) | Users and Settings nav items hidden. All others visible. | ☐ |
| 3 | HSE Reviewer (`she`) | Users and Settings nav items hidden. Approvals visible. Quick Review visible. | ☐ |
| 4 | Store Manager (`sm`) | Users, Approvals, Settings, Manufacturers, Quick Review nav items hidden. | ☐ |
| 5 | Field User (`user`) | Same hidden items as Store Manager. | ☐ |
| 6 | Switch back to GA. Attempt to navigate to Users as HSE Reviewer via the sidebar. | Users nav item is not present for HSE Reviewer — navigation impossible via UI. | ☐ |

---

### SCN-13 — Session Continuity

**Assigned roles:** GA  
**Estimated duration:** 10 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | Submit a new chemical request. Note its ID (e.g., CHM-157). | Request created. |  |
| 2 | Hard-refresh the browser (Ctrl+Shift+R). Navigate to My Requests. | CHM-157 is present with status "Pending". Data survived the refresh. |  |
| 3 | Approve CHM-157 at Safety Review. Note it advances to EMP Review. | Stage = EMP Review, status = under_review. |  |
| 4 | Hard-refresh. Navigate to Approvals. | CHM-157 is present at EMP Review. Approval was persisted. |  |
| 5 | Return CHM-157 for revision. Note the "Revision needed" status. | Status = revision_requested. |  |
| 6 | Hard-refresh. Switch to Field User. Navigate to My Requests. | CHM-157 appears in Action Needed with the reviewer's note intact. revisionStage preserved. |  |
| 7 | Resubmit CHM-157 as Field User. Switch to GA. Navigate to Approvals. | CHM-157 re-enters at **EMP Review** (not Safety Review). revisionStage routing preserved across the refresh. |  |
| 8 | Submit a second request (CHM-158). Verify its ID is sequential, not repeating. | ID is CHM-158 or higher — counter not reset by the refresh. |  |

---

### SCN-14 — Dashboard and Navigation

**Assigned roles:** GA  
**Estimated duration:** 12 minutes

| # | Step | Expected result | Pass / Fail |
|---|---|---|---|
| 1 | Load the application URL. | Splash screen animates with TPC logo and progress bar. Dashboard loads after ~2.5 seconds. |  |
| 2 | Observe the Approvals nav badge immediately after splash. | Badge shows ≥ 1 (CHM-156 is pre-seeded and pending at Safety Review). |  |
| 3 | Click the Safety Data module card on the Dashboard. | Navigates to Safety Data home. Breadcrumb updates: Dashboard > Safety Data. |  |
| 4 | Click "Dashboard" in the breadcrumb. | Returns to Dashboard. Breadcrumb resets. |  |
| 5 | Press Ctrl+K (or click the search button in topbar). | Command palette opens with a search field and categorised items. |  |
| 6 | Type "acetone" | CHM-156 "Acetone — #CHM-156" appears in results. |  |
| 7 | Click the CHM-156 result. | Palette closes. Detail drawer opens for CHM-156 with Safety Review action zone visible. |  |
| 8 | Press Escape. | Drawer closes. |  |
| 9 | Click the nav-toggle button (hamburger) in the topbar. | Sidebar collapses to icon-only mode. Main content expands. |  |
| 10 | Click the nav-toggle again. | Sidebar expands to full width. |  |
| 11 | Click the theme toggle button (moon/sun icon). | Theme switches between light and dark. All text remains readable. Colours adjust correctly. |  |
| 12 | Click the bell (notifications) icon. | Notification panel opens. Tabs: All, Approval, Mention, SLA, System. Unread items highlighted. |  |
| 13 | Click **Mark all as read**. | Unread highlights clear. Bell dot disappears. |  |

---

## 9. Severity Definitions

### 9.1 Severity Levels

| Severity | Code | Definition | SLA — Fix deploy | SLA — Retest |
|---|---|---|---|---|
| **Critical** | SEV-1 | A workflow is completely blocked and cannot be completed. Data is lost or corrupted. A security boundary is breached. No viable workaround exists. UAT is suspended until resolved. | 4 hours | 2 hours after deploy |
| **High** | SEV-2 | A major feature is broken or produces incorrect results. A workaround may exist but is not acceptable in production. UAT continues on unaffected scenarios but this defect must be resolved before sign-off. | 24 hours | 4 hours after deploy |
| **Medium** | SEV-3 | A feature is partially impaired. A practical workaround exists. UAT continues. Must be resolved or formally accepted with waiver before sign-off. | 3 business days | Next UAT session |
| **Low** | SEV-4 | Cosmetic, text, or minor UX issue. No functional impact. May be resolved in the next sprint or accepted at sign-off. | Next sprint | At sign-off |

### 9.2 Severity Classification Examples

| Example | Severity |
|---|---|
| Clicking Submit on the New Chemical form creates no request — workflow completely blocked | Critical |
| Page refresh wipes all submitted requests | Critical |
| Approve button in the drawer does nothing for any request | Critical |
| Resubmit routes to the wrong stage, losing prior approvals | High |
| French mode shows English strings for specific labels | Medium |
| Manufacturer form saves without validating email format | Medium |
| A column heading is misaligned by 4 pixels | Low |
| A tooltip text has a minor spelling error | Low |

### 9.3 What is NOT a Defect

The following are known, accepted behaviours. Do not raise them as defects.

| Behaviour | Reason |
|---|---|
| Sign Out, My Profile, Save Draft have no full action | Formally deferred — see OPEN-01/02/03 |
| Dashboard stats (12 pending, 47 approved, 23 users) never change | Static demo values — backend deferred |
| Cash/Expense/Escort cards labelled "Live" but lead to stub pages | OPEN-05 — label correction deferred |
| localStorage is cleared when browser data is cleared | Expected — backend deferred |
| Only one manufacturer is visible after navigating back from a search | Expected browser behaviour — no bug |

---

## 10. Defect Workflow

### 10.1 Lifecycle

```
REPORTED BY TESTER
       │
       ▼
   [OPEN] ──────────────────────────────────────────────── UAT Coordinator logs in UAT-DEFECTS.md within 4h
       │
       ▼
 TRIAGE (UAT Coordinator + Dev Lead — joint, within 4h of logging)
       │
       ├──► REJECTED ─────────────────────────────────────── Not a defect / out of scope / known deferred item
       │                                                       UAT Coordinator notifies tester. No further action.
       │
       ├──► DEFERRED ─────────────────────────────────────── Accepted for future sprint
       │                                                       Waiver required in UAT-SIGNOFF.md Section 5
       │
       └──► [IN PROGRESS] ───────────────────────────────── Dev Lead assigns to developer. SLA clock starts.
               │
               ▼
           [FIXED] ─────────────────────────────────────── Developer deploys fix to uat-feedback branch
               │                                            Dev Lead notifies UAT Coordinator
               ▼
           [RETEST] ────────────────────────────────────── UAT Coordinator assigns retest to original reporter
               │                                            Retest must use corrected steps from defect record
               │
               ├──► Retest PASS ─────────────────────────── [CLOSED] — UAT Coordinator marks closed with date
               │
               └──► Retest FAIL ─────────────────────────── Defect reopened as [OPEN]
                                                             Dev Lead notified. SLA restarts.
```

### 10.2 Defect Reporting Rules

1. Every defect must be logged in UAT-DEFECTS.md within 4 hours of observation, regardless of severity.
2. The UAT Coordinator assigns the defect ID (DEF-001, DEF-002, …) and logs the full detail entry.
3. The reporter must provide: steps to reproduce, expected result, actual result, role at time of defect, and browser.
4. Screenshots or screen recordings are mandatory for Critical and High defects. Strongly recommended for Medium.
5. Severity is proposed by the reporter but is final only after joint triage.
6. A defect may not be marked CLOSED by anyone other than the UAT Coordinator.
7. A defect may not be marked REJECTED without agreement from both the UAT Coordinator and Dev Lead.

### 10.3 SLA Escalation

If a Critical or High defect is not in FIXED state within its SLA:

| Action | Owner |
|---|---|
| UAT Coordinator notifies Project Sponsor | UAT Coordinator |
| UAT Coordinator suspends affected scenarios (Critical) | UAT Coordinator |
| Project Sponsor decides whether to extend UAT window | Project Sponsor |
| Dev Lead provides written root cause and revised ETA | Dev Lead |

### 10.4 Build Deployment of Fixes

All fixes during the UAT window are applied to the `uat-feedback` branch. The `master` branch and the `UAT-2026-06-04` tag are frozen and must not be modified.

When a fix is ready:
1. Dev Lead merges the fix into `uat-feedback`
2. IT Representative deploys `uat-feedback` to the UAT Azure slot
3. IT Representative confirms deployment in the UAT Coordinator's Slack / Teams channel
4. UAT Coordinator updates the defect status to FIXED and assigns for retest

---

## 11. Daily Reporting

The UAT Coordinator issues a daily status report at the close of each UAT day. The report is sent to: Project Sponsor, Dev Lead, HSE Process Owner, IT Representative.

### 11.1 Daily Report Template

```
═══════════════════════════════════════════════════════════════
TPC eSolutions — UAT Daily Status Report
Safety Data Management Module
═══════════════════════════════════════════════════════════════

Date:              [YYYY-MM-DD]
Day:               [Day N of N planned]
Reported by:       [UAT Coordinator name]
Distribution:      Project Sponsor, Dev Lead, HSE Process Owner, IT Representative

───────────────────────────────────────────────────────────────
1. OVERALL STATUS

   ☐ ON TRACK    ☐ AT RISK    ☐ SUSPENDED

   Narrative (2–3 sentences):
   [Describe the day's progress, any issues, and confidence in
    the current exit date.]

───────────────────────────────────────────────────────────────
2. SCENARIO EXECUTION PROGRESS

   Completed today:    [SCN-XX, SCN-XX, ...]
   Cumulative:         [N] / 14 scenarios
   Remaining:          [N] scenarios

   | Scenario | Status   | Assigned to    | Notes         |
   |----------|----------|----------------|---------------|
   | SCN-01   | PASS     | [name]         |               |
   | SCN-02   | PASS     | [name]         |               |
   | SCN-03   | IN PROG  | [name]         |               |
   | ...      | ...      | ...            |               |

───────────────────────────────────────────────────────────────
3. DEFECT SUMMARY

   New today:          [N]
   Fixed today:        [N]
   Retested / Closed:  [N]
   Deferred today:     [N]

   Open defects by severity:
   ┌──────────┬──────┐
   │ Critical │  [N] │
   │ High     │  [N] │
   │ Medium   │  [N] │
   │ Low      │  [N] │
   │ TOTAL    │  [N] │
   └──────────┴──────┘

   New defects logged today:
   | ID      | Title                  | Severity | Status      |
   |---------|------------------------|----------|-------------|
   | DEF-XXX | [title]                | [sev]    | OPEN        |

   SLA status:
   | ID      | Severity | Logged date | SLA deadline | Status      |
   |---------|----------|-------------|--------------|-------------|
   | DEF-XXX | High     | [date]      | [date]       | IN PROGRESS |

───────────────────────────────────────────────────────────────
4. PARTICIPANT STATUS

   | Participant | Role        | Sessions done | Feedback submitted |
   |-------------|-------------|---------------|--------------------|
   | [name]      | GA          | [N]           | ☐ Yes / ☐ No       |
   | [name]      | she (SR)    | [N]           | ☐ Yes / ☐ No       |
   | [name]      | she (IH)    | [N]           | ☐ Yes / ☐ No       |
   | [name]      | sm          | [N]           | ☐ Yes / ☐ No       |
   | [name]      | user        | [N]           | ☐ Yes / ☐ No       |
   | [name]      | admin       | [N]           | ☐ Yes / ☐ No       |

───────────────────────────────────────────────────────────────
5. BLOCKERS AND RISKS

   Active blockers:
   [None / describe]

   Risks to exit date:
   [None / describe]

   Actions required from Project Sponsor or IT:
   [None / describe]

───────────────────────────────────────────────────────────────
6. PLAN FOR TOMORROW

   Scenarios:   [SCN-XX, SCN-XX, ...]
   Participants: [names]
   Defect retests: [DEF-XXX, ...]
   Session start: [time]

───────────────────────────────────────────────────────────────
7. EXIT CRITERIA TRACKER

   | Criterion | Threshold | Current | Status         |
   |-----------|-----------|---------|----------------|
   | EX-01 Scenarios | 14/14   | [N]/14  | ☐ MET ☐ OPEN  |
   | EX-02 Pass rate  | ≥93%    | [N]%    | ☐ MET ☐ OPEN  |
   | EX-03 Critical   | 0 open  | [N]     | ☐ MET ☐ OPEN  |
   | EX-04 High       | 0 open  | [N]     | ☐ MET ☐ OPEN  |
   | EX-05 Medium     | 0/waived| [N]     | ☐ MET ☐ OPEN  |
   | EX-06 Feedback   | 6/6     | [N]/6   | ☐ MET ☐ OPEN  |
   | EX-07 HSE sign.  | Signed  | ☐/✓     | ☐ MET ☐ OPEN  |
   | EX-08 Part. sign | 6/6     | [N]/6   | ☐ MET ☐ OPEN  |
   | EX-09 Report     | Complete| ☐/✓     | ☐ MET ☐ OPEN  |
   | EX-10 Sponsor    | Signed  | ☐/✓     | ☐ MET ☐ OPEN  |

═══════════════════════════════════════════════════════════════
END OF REPORT — [YYYY-MM-DD]
═══════════════════════════════════════════════════════════════
```

### 11.2 Reporting Schedule

| Report | Trigger | Recipient |
|---|---|---|
| Daily status report | End of each UAT day | All stakeholders |
| Critical defect alert | Within 1 hour of SEV-1 log | Project Sponsor, Dev Lead |
| UAT suspension notice | If SEV-1 not FIXED within 4h | All stakeholders |
| UAT completion notice | All exit criteria MET | All stakeholders |

---

## 12. Final Sign-Off Process

### 12.1 Process Overview

```
  All 10 exit criteria MET
           │
           ▼
  UAT Coordinator completes UAT-TEST-REPORT.md
           │
           ▼
  Dev Lead reviews UAT-TEST-REPORT.md
           │
           ▼
  UAT Coordinator circulates UAT-SIGNOFF.md to participants
           │
           ▼
  HSE Process Owner signs Section 6
  (workflow alignment confirmation)
           │
           ▼
  All 6 UAT participants sign Section 7
  (individual acceptance)
           │
           ▼
  UAT Coordinator completes Section 8.1
  (GO / CONDITIONAL GO / NO GO recommendation)
           │
           ▼
  IT Representative signs Section 8.3
  (environment readiness)
           │
           ▼
  Project Sponsor signs Section 8.2
  (final binding decision)
           │
           ▼
  UAT CLOSED
  Production deployment authorised
```

### 12.2 Sign-Off Roles and Authorities

| Signatory | Section | Authority |
|---|---|---|
| HSE Process Owner | UAT-SIGNOFF.md §6 | Confirms operational workflow accuracy. Without this signature, the approval workflow is not validated for production. |
| Each UAT participant | UAT-SIGNOFF.md §7 | Confirms completion of assigned scenarios and personal acceptance. |
| UAT Coordinator | UAT-SIGNOFF.md §8.1 | Issues the formal GO / CONDITIONAL GO / NO GO recommendation based on evidence. |
| IT Representative | UAT-SIGNOFF.md §8.3 | Confirms production environment readiness and deployment plan review. |
| Project Sponsor | UAT-SIGNOFF.md §8.2 | Makes the final binding acceptance decision. Only this signature authorises production deployment. |

### 12.3 Conditional GO

A Conditional GO may be issued when:
- All Critical and High defects are closed
- One or more Medium defects are outstanding but accepted with formal waivers
- The scenario pass rate is ≥ 93%

Conditions must be:
1. Documented in UAT-SIGNOFF.md Section 5 with waiver
2. Assigned to a named owner with a target sprint
3. Accepted in writing by the Project Sponsor

### 12.4 NO GO Triggers

A NO GO is automatic when any of the following are true at sign-off time:
- Any Critical defect is open or unresolved
- Any High defect is open or unresolved
- Scenario pass rate is below 93% with no agreed conditional waiver
- HSE Process Owner has not signed
- Project Sponsor has not signed

### 12.5 Post-Sign-Off Actions

Upon Project Sponsor signature:

| Action | Owner | Timing |
|---|---|---|
| Communicate UAT outcome to all participants | UAT Coordinator | Same day |
| Archive all UAT-FEEDBACK.md forms | UAT Coordinator | Within 48h |
| Finalise and archive UAT-TEST-REPORT.md | UAT Coordinator | Within 48h |
| Merge `uat-feedback` into `master` (if fixes were applied) | Dev Lead | Before production deploy |
| Tag production build | Dev Lead | Before production deploy |
| Execute production deployment | IT Representative | Per agreed deployment schedule |
| Schedule post-go-live monitoring review | Project Sponsor | 2 weeks post-launch |

---

## 13. Schedule

| # | Activity | Duration | Owner | Target date |
|---|---|---|---|---|
| 1 | Entry criteria final check (EC-08 through EC-12) | 0.5 day | UAT Coordinator | TBC |
| 2 | Participant briefing session | 1 hour | UAT Coordinator | TBC |
| 3 | SCN-01, 02, 05 — Core submission and approval | Day 1 | All relevant roles | TBC |
| 4 | SCN-03, 04 — Revision and full chain | Day 1 | GA, she, user | TBC |
| 5 | SCN-06, 07, 13, 14 — My Requests, Master Sheet, Persistence, Dashboard | Day 1–2 | All roles | TBC |
| 6 | SCN-08, 09, 10 — Admin scenarios | Day 2 | GA, admin | TBC |
| 7 | SCN-11, 12 — Language, role visibility | Day 2 | All roles | TBC |
| 8 | Defect triage and resolution window | Day 2–3 | Dev Lead | TBC |
| 9 | Defect retesting | Day 3 | UAT Coordinator | TBC |
| 10 | HSE Process Owner confirmation session | Day 3 | HSE Process Owner | TBC |
| 11 | UAT-TEST-REPORT.md completion | Day 3 | UAT Coordinator | TBC |
| 12 | Sign-off circulation and collection | Day 3–4 | UAT Coordinator | TBC |
| 13 | Project Sponsor final decision | Day 4 | Project Sponsor | TBC |

**Total planned UAT window:** 4 business days

---

## 14. Risks and Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-01 | A Critical defect is discovered, suspending UAT | Low | High | Dev Lead on standby with 4-hour SLA. UAT window extended by the suspension duration. |
| R-02 | HSE Process Owner identifies a workflow deviation that requires a code change | Medium | High | Conduct HSE workflow review on Day 1 as part of SCN-02/03/04. Maximises time to address findings. |
| R-03 | A tester clears browser storage mid-session, losing submitted data | Medium | Medium | Pre-session briefing emphasises not clearing storage. UAT Coordinator can re-seed via console if required. |
| R-04 | A participant is unavailable during the UAT window | Medium | Medium | Identify backup testers for each role before UAT begins. |
| R-05 | Testers attempt to test out-of-scope modules (Cash, Escort) | High | Low | Explicit briefing and out-of-scope section in this plan. UAT Coordinator monitors daily feedback. |
| R-06 | Browser caching serves the pre-stabilisation build | Low | High | IT Representative confirms cache-clearing procedure and serves build with correct cache headers. |
| R-07 | Defect volume exceeds Dev Lead's resolution capacity | Low | High | Daily triage ensures early prioritisation. Project Sponsor may authorise additional developer resource. |
| R-08 | sign-off quorum not reached within planned window | Medium | Medium | Sign-off window extended. Electronic signatures acceptable if in-person not possible. |

---

## Approval of This Plan

This execution plan is approved for distribution to UAT participants.

| Role | Name | Signature | Date |
|---|---|---|---|
| UAT Coordinator | | | |
| Development Lead | | | |
| Project Sponsor | | | |

---

*Document ref: TPC-ESOL-UAT-001 v2.0 | Classification: INTERNAL — CONTROLLED*  
*Retain for a minimum of 3 years as part of the project audit trail.*  
*All changes to this document during the UAT window must be version-controlled and re-circulated.*
