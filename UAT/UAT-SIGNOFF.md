# UAT Sign-Off Document
## TPC eSolutions — Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-SO-001 |
| **Version** | 2.0 |
| **Classification** | INTERNAL — CONTROLLED DOCUMENT |
| **Prepared by** | UAT Coordinator |
| **Status** | PENDING COMPLETION |

---

> **Legal weight of this document**
>
> Signatures on this document constitute formal, binding acceptance of the TPC eSolutions Safety Data Management module on behalf of Tchad Petroleum Company. The Project Sponsor signature in Section 13 is the sole authority that authorises production deployment. No unsigned or partially signed copy of this document carries any binding status.

---

## Document Control

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-06-04 | eTPC Dev Team | Initial template |
| 2.0 | 2026-06-05 | eTPC Dev Team | Full restructure — all sections expanded, signature blocks formalised, deferred item waivers added |

---

## Table of Contents

1. [Project Information](#1-project-information)
2. [Build Information](#2-build-information)
3. [UAT Period](#3-uat-period)
4. [Participants](#4-participants)
5. [Open Defects Summary](#5-open-defects-summary)
6. [Exit Criteria Checklist](#6-exit-criteria-checklist)
7. [Deferred Items and Accepted Waivers](#7-deferred-items-and-accepted-waivers)
8. [HSE Process Owner Confirmation](#8-hse-process-owner-confirmation)
9. [Participant Sign-Off — Business Approval](#9-participant-sign-off--business-approval)
10. [UAT Coordinator Recommendation](#10-uat-coordinator-recommendation)
11. [IT Approval](#11-it-approval)
12. [Business Sponsor Approval](#12-business-sponsor-approval)
13. [Project Sponsor Decision — Final Authority](#13-project-sponsor-decision--final-authority)
14. [Post-UAT Actions](#14-post-uat-actions)

---

## 1. Project Information

| Field | Value |
|---|---|
| **Platform name** | TPC eSolutions |
| **Organisation** | Tchad Petroleum Company |
| **Module under test** | Safety Data Management |
| **Module status** | First live module — all other modules are future development |
| **Document ref** | TPC-ESOL-UAT-SO-001 |
| **UAT execution plan ref** | TPC-ESOL-UAT-001 |
| **Defect management ref** | TPC-ESOL-UAT-DMP-001 |
| **UAT Coordinator** | _________________________________ |
| **Development Lead** | _________________________________ |
| **HSE Process Owner** | _________________________________ |
| **IT Representative** | _________________________________ |
| **Project Sponsor** | _________________________________ |
| **Document prepared date** | 2026-06-05 |
| **Document completed date** | _________________________________ |

---

## 2. Build Information

| Field | Value |
|---|---|
| **Application file** | TPC E-Solution.html |
| **Build date** | 2026-06-04 |
| **Git tag** | `UAT-2026-06-04` |
| **Source branch** | `master` — frozen at tag. No commits permitted during UAT. |
| **Feedback branch** | `uat-feedback` — all defect fixes applied here during UAT |
| **Hosting environment** | Azure Static Web Apps — UAT deployment slot |
| **Deployment URL** | _________________________________ |
| **Data store** | Browser `localStorage` — key: `tpc_requests` |
| **Regression tests at tag** | 35 / 35 PASS |
| **Open defects at tag** | 0 |
| **Pre-UAT sprint defects closed** | 8 (see UAT-DEFECTS.md — Pre-UAT Sprint section) |
| **Pre-seeded test data** | CHM-154 (Methanol — Rejected), CHM-155 (Diesel — Review Complete), CHM-156 (Acetone — Safety Review pending) |

> **Build freeze confirmation:** The UAT Coordinator confirms that the `master` branch and git tag `UAT-2026-06-04` are frozen. Any defect fixes applied during UAT are deployed exclusively from the `uat-feedback` branch. The production build tag will be applied after Project Sponsor sign-off.

**UAT Coordinator confirmation of build freeze:**

Name: _________________________________

Signature: _________________________________ Date: _________________

---

## 3. UAT Period

| Field | Value |
|---|---|
| **Planned UAT start date** | _________________________________ |
| **Planned UAT end date** | _________________________________ |
| **Planned duration** | 4 business days |
| **Actual UAT start date** | _________________________________ |
| **Actual UAT end date** | _________________________________ |
| **Actual duration** | _________________________________ |
| **Extensions granted** | ☐ None   ☐ Yes — reason: _________________________________ |
| **UAT suspended** | ☐ No   ☐ Yes — period: _________________________________ |
| **Suspension reason (if any)** | _________________________________ |

### 3.1 Daily Session Log

| Day | Date | Scenarios executed | Defects logged | Notes |
|---|---|---|---|---|
| Day 1 | | | | |
| Day 2 | | | | |
| Day 3 | | | | |
| Day 4 | | | | |
| Extension (if any) | | | | |

---

## 4. Participants

### 4.1 UAT Testers

| Name | Platform role | Role code | Demo persona in system | Primary scenarios | Attended |
|---|---|---|---|---|---|
| _________________________________ | Global Admin | `ga` | Cherif Hassan | SCN-01 through SCN-14 | ☐ Yes  ☐ Partial |
| _________________________________ | Safety Admin | `admin` | Cherif Hassan | SCN-01, 02, 05–09, 11–14 | ☐ Yes  ☐ Partial |
| _________________________________ | HSE Reviewer — Safety Review | `she` | Mariam Deby | SCN-02, 03, 05, 06, 07, 11, 12 | ☐ Yes  ☐ Partial |
| _________________________________ | HSE Reviewer — IH Review | `she` | Oumar Cheikh | SCN-03, 05, 11, 12 | ☐ Yes  ☐ Partial |
| _________________________________ | Store Manager | `sm` | Fatima Moussa | SCN-01, 06, 07, 09, 11, 12, 13, 14 | ☐ Yes  ☐ Partial |
| _________________________________ | Field User | `user` | Ahmed Mahamat | SCN-01, 03, 05, 06, 11, 12, 13, 14 | ☐ Yes  ☐ Partial |

> **Note on role simulation:** Platform roles are selected via the UI role selector (cog icon, top right) in this build. Entra ID / SSO authentication is deferred. This does not affect the validity of any workflow under test.

### 4.2 Supporting Roles

| Role | Name | Responsibility |
|---|---|---|
| UAT Coordinator | _________________________________ | Ran sessions, maintained defect log, issued daily reports, circulates this document |
| Development Lead | _________________________________ | Triaged defects, applied fixes to `uat-feedback`, confirmed deployments |
| HSE Process Owner | _________________________________ | Validated approval workflow against TPC operational procedure — signs §8 |
| IT Representative | _________________________________ | Maintained UAT environment, managed deployments — signs §11 |
| Project Sponsor | _________________________________ | Final GO / NO GO authority — signs §13 |

### 4.3 Substitutions and Absences

| Participant | Absence or substitution | Approved by | Date |
|---|---|---|---|
| | | | |
| | | | |

*If a tester was substituted mid-UAT, the scenarios completed by the substitute are still valid provided the substitute held an equivalent role and was briefed by the UAT Coordinator.*

---

## 5. Open Defects Summary

*Populated by the UAT Coordinator from UAT-DEFECTS.md at the point of sign-off circulation.*

### 5.1 Defect Counts at Sign-Off

| Severity | Total logged | Closed | Rejected | Deferred | Open at sign-off |
|---|---|---|---|---|---|
| Critical (SEV-1) | | | | | |
| High (SEV-2) | | | | | |
| Medium (SEV-3) | | | | | |
| Low (SEV-4) | | | | | |
| **Total** | | | | | |

### 5.2 Quality Metrics at Sign-Off

| Metric | Value | Target | Status |
|---|---|---|---|
| Retest pass rate | | ≥ 85% | ☐ MET  ☐ NOT MET |
| SLA compliance rate | | ≥ 90% | ☐ MET  ☐ NOT MET |
| Scenario pass rate | | ≥ 93% | ☐ MET  ☐ NOT MET |
| Open Critical defects | | 0 | ☐ MET  ☐ NOT MET |
| Open High defects | | 0 | ☐ MET  ☐ NOT MET |

### 5.3 Open Defects Remaining at Sign-Off

> List every defect that is not in Closed, Rejected, or Deferred state. If zero, write "None". A single Critical or High entry here triggers an automatic NO GO.

| Defect ID | Title | Severity | Status | Blocking sign-off? |
|---|---|---|---|---|
| | | | | |
| | | | | |

**UAT Coordinator declaration:**

I confirm that the defect counts in Section 5.1 are accurate as of the date of sign-off circulation, and that no Critical or High defects are open.

Name: _________________________________

Signature: _________________________________ Date: _________________

---

## 6. Exit Criteria Checklist

All ten criteria must be confirmed MET before signatures are collected. The UAT Coordinator completes this checklist. Evidence references are mandatory for each MET item.

| Ref | Exit criterion | Threshold | Actual | Status | Evidence |
|---|---|---|---|---|---|
| EX-01 | All test scenarios executed | 14 / 14 | ___ / 14 | ☐ MET  ☐ NOT MET | UAT-TEST-REPORT.md §scenario table |
| EX-02 | Scenario pass rate | ≥ 93% (≥ 13 of 14) | ___% | ☐ MET  ☐ NOT MET | UAT-TEST-REPORT.md §pass rate |
| EX-03 | Open Critical defects | 0 | ___ | ☐ MET  ☐ NOT MET | UAT-DEFECTS.md §active log |
| EX-04 | Open High defects | 0 | ___ | ☐ MET  ☐ NOT MET | UAT-DEFECTS.md §active log |
| EX-05 | Medium defects resolved or formally waived | 0 unwaived | ___ | ☐ MET  ☐ NOT MET | UAT-DEFECTS.md + §7 below |
| EX-06 | Participant feedback forms submitted | 6 / 6 | ___ / 6 | ☐ MET  ☐ NOT MET | UAT-FEEDBACK.md forms collected |
| EX-07 | HSE Process Owner workflow confirmation | Signed | ☐ / ✅ | ☐ MET  ☐ NOT MET | §8 of this document |
| EX-08 | All UAT participants signed | 6 / 6 | ___ / 6 | ☐ MET  ☐ NOT MET | §9 of this document |
| EX-09 | UAT-TEST-REPORT.md completed and reviewed | Approved | ☐ / ✅ | ☐ MET  ☐ NOT MET | UAT-TEST-REPORT.md |
| EX-10 | Project Sponsor acceptance | Signed | ☐ / ✅ | ☐ MET  ☐ NOT MET | §13 of this document |

**Exit criteria met: ___ / 10**

### 6.1 Exceptional Circumstances

If EX-02 (pass rate) falls below 93% but EX-03 and EX-04 are both met, a Conditional GO may be issued with documented conditions. Record the justification here and carry the condition into §10 and §13.

Justification (if applicable):

_______________________________________________________________________________

_______________________________________________________________________________

**UAT Coordinator sign-off on exit criteria:**

Name: _________________________________

Signature: _________________________________ Date: _________________

---

## 7. Deferred Items and Accepted Waivers

The following items are confirmed defects or known gaps that are formally accepted as not blocking production deployment of the Safety Data Management module. Each item is assigned to a named owner and a target sprint.

**By signing this document, all signatories confirm they have read, understood, and accepted each waiver listed below.**

---

### Waiver 1 — OPEN-01

| Field | Value |
|---|---|
| **ID** | OPEN-01 |
| **Title** | Sign Out button has no action |
| **Severity** | Low |
| **Description** | The Sign Out button in the user dropdown has no action. SSO / Entra ID authentication is not implemented in this build. |
| **Residual risk** | None for UAT cycle. In production: users cannot formally end their session via the UI until Entra ID is integrated. |
| **Agreed workaround** | Close the browser tab to end the session. |
| **Owner** | eTPC Development Team |
| **Target sprint** | Entra ID / SSO integration sprint |
| **Target date** | _________________________________ |

Accepted by (Project Sponsor): _________________________________ Date: _________________

---

### Waiver 2 — OPEN-02

| Field | Value |
|---|---|
| **ID** | OPEN-02 |
| **Title** | My Profile button has no action |
| **Severity** | Low |
| **Description** | The My Profile button in the user dropdown has no action. Profile management is a v2 feature. |
| **Residual risk** | None. Users have no need to edit their own profile in this initial release. |
| **Agreed workaround** | Profile changes to be managed by the Global Admin via the Users page. |
| **Owner** | eTPC Development Team |
| **Target sprint** | v2 platform release |
| **Target date** | _________________________________ |

Accepted by (Project Sponsor): _________________________________ Date: _________________

---

### Waiver 3 — OPEN-03

| Field | Value |
|---|---|
| **ID** | OPEN-03 |
| **Title** | Save Draft shows confirmation toast but does not save data |
| **Severity** | Low |
| **Description** | The Save Draft button on the New Chemical form shows a success toast but writes nothing to storage. A page refresh loses the partially completed form. |
| **Residual risk** | Low. Users who navigate away mid-form will lose their progress. This is communicated to users in the platform guide. |
| **Agreed workaround** | Complete and submit the form in a single session. |
| **Owner** | eTPC Development Team |
| **Target sprint** | v2 platform release |
| **Target date** | _________________________________ |

Accepted by (Project Sponsor): _________________________________ Date: _________________

---

### Waiver 4 — OPEN-04

| Field | Value |
|---|---|
| **ID** | OPEN-04 |
| **Title** | Dashboard KPI statistics show static demo values |
| **Severity** | Medium |
| **Description** | The Dashboard KPI figures (pending requests, approved items, active users) are hardcoded demo values. They do not update to reflect actual platform activity. |
| **Residual risk** | Medium. Operational managers who rely on the Dashboard for workload overview will see inaccurate figures until the backend data connection is implemented. |
| **Agreed workaround** | Use the My Requests and Approvals pages for accurate live counts. |
| **Owner** | eTPC Development Team |
| **Target sprint** | Backend integration sprint |
| **Target date** | _________________________________ |

Accepted by (Project Sponsor): _________________________________ Date: _________________

---

### Waiver 5 — OPEN-05

| Field | Value |
|---|---|
| **ID** | OPEN-05 |
| **Title** | Stub module cards display "Live" label |
| **Severity** | Medium |
| **Description** | Cash Advance, Daily Expense, and Security Escort module cards on the Dashboard are labelled "Live" but are placeholder stubs. Clicking their navigation items leads to a blank page. |
| **Residual risk** | Low. Users may attempt to navigate to these areas and find no content. Risk of confusion rather than operational failure. |
| **Agreed workaround** | Brief all users at onboarding that only Safety Data is live in the initial release. |
| **Owner** | eTPC Development Team |
| **Target sprint** | Pre-launch UI sprint — labels to be corrected to "Coming Soon" before production go-live |
| **Target date** | _________________________________ |

Accepted by (Project Sponsor): _________________________________ Date: _________________

---

### Waiver 6 — OPEN-06

| Field | Value |
|---|---|
| **ID** | OPEN-06 |
| **Title** | GHS hazard selection not required before submission |
| **Severity** | Medium |
| **Description** | The New Chemical request form can be submitted without selecting any GHS hazard pictogram. A request with no hazard information enters the review workflow with an empty hazard field. |
| **Residual risk** | Medium — pending HSE Process Owner decision. If GHS classification is operationally mandatory at submission, the absence of this validation could result in incomplete safety records entering the approval workflow. |
| **Agreed workaround** | _________________________________ |
| **HSE Process Owner decision** | ☐ Mandatory — add validation in next sprint   ☐ Optional — accept as designed |
| **Owner** | eTPC Development Team |
| **Target sprint** | _________________________________ |
| **Target date** | _________________________________ |

HSE Process Owner decision recorded by: _________________________________ Date: _________________

Accepted by (Project Sponsor): _________________________________ Date: _________________

---

### Waiver 7 — OPEN-07

| Field | Value |
|---|---|
| **ID** | OPEN-07 |
| **Title** | Storage location not required before submission |
| **Severity** | Medium |
| **Description** | The New Chemical request form can be submitted without selecting a storage location. A request with a blank storage location field enters the review workflow. |
| **Residual risk** | Medium. Requests without a storage location may be operationally incomplete — reviewers cannot confirm site-specific storage requirements. |
| **Agreed workaround** | HSE reviewers to flag requests with blank storage locations and use the Return for Revision action to request the information before approving. |
| **Owner** | eTPC Development Team |
| **Target sprint** | Next sprint after UAT |
| **Target date** | _________________________________ |

Accepted by (Project Sponsor): _________________________________ Date: _________________

---

### Waiver 8 — OPEN-08

| Field | Value |
|---|---|
| **ID** | OPEN-08 |
| **Title** | Store Manager and Field User roles see stub module navigation items |
| **Severity** | Medium |
| **Description** | Store Manager and Field User roles see Cash Advance and Security Escort navigation items in the sidebar with hardcoded badge counts. These modules are not active. |
| **Residual risk** | Low. Navigation leads to blank stub pages. No data or functionality is exposed that these roles should not see. Risk is user confusion only. |
| **Agreed workaround** | Brief all Store Manager and Field User participants that only Safety Data navigation items are active. |
| **Owner** | eTPC Development Team |
| **Target sprint** | Role visibility sprint — before production launch |
| **Target date** | _________________________________ |

Accepted by (Project Sponsor): _________________________________ Date: _________________

---

### Additional Waivers (UAT-raised defects, if any)

| Defect ID | Title | Severity | Owner | Target sprint | Accepted by (Sponsor) | Date |
|---|---|---|---|---|---|---|
| | | | | | | |
| | | | | | | |

**Total deferred items accepted: ___**

---

## 8. HSE Process Owner Confirmation

*To be completed by the designated TPC HSE Process Owner before participant sign-off signatures are collected. This section validates that the approval workflow implemented in the system accurately reflects TPC operational procedure.*

---

### 8.1 Workflow Accuracy Declaration

I have reviewed and tested the Safety Data approval workflow as implemented in TPC eSolutions. Specifically, I have observed and validated the following:

| Workflow element | Confirmed | Notes |
|---|---|---|
| Three-stage review sequence: Safety Review → EMP Review → IH Review | ☐ Confirmed  ☐ Deviation noted | |
| Stage-by-stage advancement — each stage must be approved before the next activates | ☐ Confirmed  ☐ Deviation noted | |
| Return for Revision — reviewer can return a request with a documented reason | ☐ Confirmed  ☐ Deviation noted | |
| Resubmission routing — resubmitted requests return to the stage where revision was requested, not Stage 1 | ☐ Confirmed  ☐ Deviation noted | |
| Rejection — reviewer can reject a request with a documented reason, placing it in a terminal closed state | ☐ Confirmed  ☐ Deviation noted | |
| Review Complete — a request approved through all three stages reaches a terminal "Review Complete" state | ☐ Confirmed  ☐ Deviation noted | |
| Audit trail — the request detail timeline accurately records all actions, reviewer names, and timestamps | ☐ Confirmed  ☐ Deviation noted | |

### 8.2 Deviations from TPC Operational Procedure

*List any areas where the implemented workflow does not match the TPC operational process. If none, write "None identified." Each deviation must have an agreed resolution.*

| # | Deviation observed | Operational impact | Resolution agreed |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### 8.3 Overall Workflow Assessment

☐ **The implemented workflow accurately reflects TPC operational HSE procedure.** No material deviations identified. The approval workflow is fit for production use.

☐ **The implemented workflow reflects TPC operational HSE procedure with the deviations noted above.** The deviations are accepted under the conditions stated and assigned resolutions are confirmed.

☐ **The implemented workflow does NOT accurately reflect TPC operational HSE procedure.** The deviations noted above are material and must be resolved before production deployment.

### 8.4 HSE Process Owner Signature

*My signature confirms that the Safety Data Management approval workflow, as tested and described above, meets TPC HSE operational requirements for production deployment.*

&nbsp;

**Full name:** _________________________________

**Title / Position:** _________________________________

**Department:** _________________________________

**Signature:** _________________________________

**Date:** _________________

---

## 9. Participant Sign-Off — Business Approval

*Each UAT participant signs to confirm they have completed their assigned scenarios, submitted their feedback form, and accept the system for production use in their operational area.*

---

### 9.1 Individual Declaration

> *"I confirm that I have executed all test scenarios assigned to my role, recorded all observations and defects in my feedback form, and that the TPC eSolutions Safety Data Management module — as tested during this UAT cycle and subject to the deferred items listed in Section 7 — meets my operational requirements and is fit for production use."*

---

**Participant 1 — Global Admin**

I have completed all assigned scenarios: SCN-01 through SCN-14

☐ **ACCEPT** — The system meets my requirements and is ready for production deployment.

☐ **ACCEPT WITH CONDITIONS** — The system is acceptable subject to the following conditions:

Conditions: _______________________________________________________________________________

_______________________________________________________________________________

☐ **REJECT** — The system does not meet my requirements. Reason:

_______________________________________________________________________________

**Full name:** _________________________________

**Role at TPC:** _________________________________

**Signature:** _________________________________  **Date:** _________________

---

**Participant 2 — Safety Admin**

I have completed assigned scenarios: SCN-01, 02, 05, 06, 07, 08, 09, 11, 12, 13, 14

☐ **ACCEPT** — The system meets my requirements and is ready for production deployment.

☐ **ACCEPT WITH CONDITIONS** — The system is acceptable subject to the following conditions:

Conditions: _______________________________________________________________________________

_______________________________________________________________________________

☐ **REJECT** — The system does not meet my requirements. Reason:

_______________________________________________________________________________

**Full name:** _________________________________

**Role at TPC:** _________________________________

**Signature:** _________________________________  **Date:** _________________

---

**Participant 3 — HSE Reviewer (Safety Review scope)**

I have completed assigned scenarios: SCN-02, 03, 05, 06, 07, 11, 12

☐ **ACCEPT** — The system meets my requirements and is ready for production deployment.

☐ **ACCEPT WITH CONDITIONS** — The system is acceptable subject to the following conditions:

Conditions: _______________________________________________________________________________

_______________________________________________________________________________

☐ **REJECT** — The system does not meet my requirements. Reason:

_______________________________________________________________________________

**Full name:** _________________________________

**Role at TPC:** _________________________________

**Signature:** _________________________________  **Date:** _________________

---

**Participant 4 — HSE Reviewer (IH Review scope)**

I have completed assigned scenarios: SCN-03, 05, 11, 12

☐ **ACCEPT** — The system meets my requirements and is ready for production deployment.

☐ **ACCEPT WITH CONDITIONS** — The system is acceptable subject to the following conditions:

Conditions: _______________________________________________________________________________

_______________________________________________________________________________

☐ **REJECT** — The system does not meet my requirements. Reason:

_______________________________________________________________________________

**Full name:** _________________________________

**Role at TPC:** _________________________________

**Signature:** _________________________________  **Date:** _________________

---

**Participant 5 — Store Manager**

I have completed assigned scenarios: SCN-01, 06, 07, 09, 11, 12, 13, 14

☐ **ACCEPT** — The system meets my requirements and is ready for production deployment.

☐ **ACCEPT WITH CONDITIONS** — The system is acceptable subject to the following conditions:

Conditions: _______________________________________________________________________________

_______________________________________________________________________________

☐ **REJECT** — The system does not meet my requirements. Reason:

_______________________________________________________________________________

**Full name:** _________________________________

**Role at TPC:** _________________________________

**Signature:** _________________________________  **Date:** _________________

---

**Participant 6 — Field User**

I have completed assigned scenarios: SCN-01, 03, 05, 06, 11, 12, 13, 14

☐ **ACCEPT** — The system meets my requirements and is ready for production deployment.

☐ **ACCEPT WITH CONDITIONS** — The system is acceptable subject to the following conditions:

Conditions: _______________________________________________________________________________

_______________________________________________________________________________

☐ **REJECT** — The system does not meet my requirements. Reason:

_______________________________________________________________________________

**Full name:** _________________________________

**Role at TPC:** _________________________________

**Signature:** _________________________________  **Date:** _________________

---

### 9.2 Participant Conditions Summary

*The UAT Coordinator compiles all conditions raised by participants selecting "Accept with Conditions". Each condition must be addressed before the Project Sponsor signs §13.*

| Participant | Role | Condition raised | Resolution |
|---|---|---|---|
| | | | |
| | | | |

**Participants who accepted unconditionally: ___ / 6**

**Participants who accepted with conditions: ___ / 6**

**Participants who rejected: ___ / 6**

> **Rule:** If any participant selects REJECT, the UAT Coordinator must discuss the rejection with the Project Sponsor before §13 is signed. A single rejection does not automatically trigger NO GO, but must be formally assessed and documented.

---

## 10. UAT Coordinator Recommendation

*The UAT Coordinator issues a formal recommendation based on all evidence collected: test results, defect register, participant feedback, HSE Process Owner confirmation, and exit criteria status.*

---

### 10.1 Evidence Summary

| Item | Value |
|---|---|
| Exit criteria met | ___ / 10 |
| Scenario pass rate | ___% |
| Open Critical defects | ___ |
| Open High defects | ___ |
| Deferred items accepted | ___ |
| Participants signed — Unconditional | ___ / 6 |
| Participants signed — Conditional | ___ / 6 |
| Participants — Rejected | ___ / 6 |
| HSE Process Owner — Signed | ☐ Yes  ☐ No |
| UAT Readiness Score | ___ / 100 |
| UAT Readiness Band | ☐ NOT READY  ☐ AT RISK  ☐ CONDITIONAL  ☐ READY |

### 10.2 Recommendation

☐ **GO — READY FOR PRODUCTION DEPLOYMENT**

All ten exit criteria are met. Zero open Critical defects. Zero open High defects. All deferred items formally accepted. Scenario pass rate meets or exceeds 93%. HSE Process Owner confirms workflow accuracy. All participants have signed. The Safety Data Management module is recommended for production deployment.

&nbsp;

☐ **CONDITIONAL GO — READY FOR PRODUCTION DEPLOYMENT WITH CONDITIONS**

All Critical and High defects are closed. One or more exit criteria are met conditionally — Medium defects are deferred with accepted waivers, and/or the scenario pass rate is at or above the acceptable minimum with no unresolved blockers. The following conditions must be satisfied prior to or immediately following deployment:

| # | Condition | Owner | Target date |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

&nbsp;

☐ **NO GO — NOT READY FOR PRODUCTION DEPLOYMENT**

One or more of the following blocking conditions exist. The build must not be deployed until all blockers are resolved and a re-entry into UAT is agreed with the Project Sponsor:

| # | Blocker | Defect ref / criterion | Required action |
|---|---|---|---|
| 1 | | | |
| 2 | | | |

### 10.3 Recommendation Narrative

*2–4 sentences summarising the overall UAT outcome and the basis for the recommendation above.*

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

### 10.4 UAT Coordinator Signature

*My signature confirms that this recommendation is based on the complete evidence set collected during UAT, that all records referenced above are accurate and complete, and that the defect register contains no undisclosed Critical or High defects.*

&nbsp;

**Full name:** _________________________________

**Title:** UAT Coordinator — TPC eSolutions

**Signature:** _________________________________

**Date:** _________________

---

## 11. IT Approval

*The IT Representative confirms that the production deployment environment is ready, the deployment plan has been reviewed, and a tested rollback procedure is in place.*

---

### 11.1 Environment Readiness Checklist

| Item | Status | Notes |
|---|---|---|
| Production Azure Static Web App slot confirmed available | ☐ Confirmed  ☐ Not ready | |
| `uat-feedback` branch reviewed — all UAT-period fixes included | ☐ Confirmed  ☐ Not ready | |
| Production build tag applied after Project Sponsor sign-off | ☐ Confirmed  ☐ Pending sign-off | |
| Production deployment URL confirmed and tested | ☐ Confirmed  ☐ Not ready | |
| Browser compatibility validated on production environment | ☐ Confirmed  ☐ Not ready | |
| Cache-control headers configured correctly for production | ☐ Confirmed  ☐ Not ready | |
| Rollback procedure documented and tested | ☐ Confirmed  ☐ Not ready | |
| Deployment schedule agreed with Project Sponsor | ☐ Confirmed  ☐ Not ready | |
| Go-live communication plan ready | ☐ Confirmed  ☐ Not ready | |

### 11.2 Rollback Plan Reference

| Item | Detail |
|---|---|
| Rollback trigger | Any Critical defect discovered within 48 hours of go-live |
| Rollback method | _________________________________ |
| Rollback decision authority | _________________________________ |
| Estimated rollback time | _________________________________ |
| User communication in rollback | _________________________________ |

### 11.3 IT Representative Signature

*My signature confirms that the production infrastructure is ready to receive the deployment, the deployment plan has been reviewed, and a tested rollback procedure is documented and available.*

&nbsp;

**Full name:** _________________________________

**Title / Position:** _________________________________

**Department:** _________________________________

**Signature:** _________________________________

**Date:** _________________

---

## 12. Business Sponsor Approval

*The Business Sponsor — the senior operational or business authority for the Safety Data Management function — confirms that the system is fit for operational use and authorises rollout to Safety Data personnel.*

*This signature is separate from the Project Sponsor (§13). The Business Sponsor confirms operational readiness; the Project Sponsor confirms final programme-level acceptance and authorises deployment.*

---

### 12.1 Operational Readiness Confirmation

| Item | Status | Notes |
|---|---|---|
| End user training or briefing plan in place | ☐ Yes  ☐ No  ☐ Not required | |
| Operational procedures updated to reflect the new system | ☐ Yes  ☐ No  ☐ In progress | |
| HSE Process Owner confirmation received (§8) | ☐ Yes  ☐ No | |
| Deferred items reviewed and residual risks accepted | ☐ Yes  ☐ No | |
| Go-live date agreed with Project Sponsor | ☐ Yes  ☐ No — target: _________________ | |

### 12.2 Business Sponsor Assessment

☐ **OPERATIONALLY READY** — The Safety Data Management module as tested is fit for rollout to TPC Safety Data personnel. The module supports the operational HSE workflow and the deferred items carry acceptable residual risk.

☐ **OPERATIONALLY READY WITH CONDITIONS** — The module is acceptable for rollout subject to the following conditions:

Conditions: _______________________________________________________________________________

_______________________________________________________________________________

☐ **NOT OPERATIONALLY READY** — Reason:

_______________________________________________________________________________

### 12.3 Business Sponsor Signature

*My signature confirms that, from an operational and business perspective, the TPC eSolutions Safety Data Management module is ready for production deployment to TPC personnel.*

&nbsp;

**Full name:** _________________________________

**Title / Position:** _________________________________

**Department:** _________________________________

**Signature:** _________________________________

**Date:** _________________

---

## 13. Project Sponsor Decision — Final Authority

*This section constitutes the final, binding acceptance decision for the TPC eSolutions Safety Data Management module. Only the Project Sponsor's signature in Section 13.3 authorises production deployment. No other signature, section, or document carries equivalent authority.*

---

### 13.1 Evidence Review Confirmation

Before signing, the Project Sponsor confirms having reviewed:

| Document / evidence | Reviewed |
|---|---|
| UAT-TEST-REPORT.md — full test results | ☐ |
| UAT-DEFECTS.md — complete defect register | ☐ |
| Section 5 — Open Defects Summary | ☐ |
| Section 6 — Exit Criteria Checklist | ☐ |
| Section 7 — All deferred item waivers | ☐ |
| Section 8 — HSE Process Owner confirmation | ☐ |
| Section 9 — All participant sign-offs and conditions | ☐ |
| Section 10 — UAT Coordinator recommendation and narrative | ☐ |
| Section 11 — IT approval and rollback plan | ☐ |
| Section 12 — Business Sponsor approval | ☐ |
| UAT-COMMAND-CENTER.md — final Readiness Score and dashboard | ☐ |

### 13.2 Final Decision

☐ **GO — PRODUCTION DEPLOYMENT AUTHORISED**

All exit criteria are met. All Critical and High defects are closed. All deferred items are formally accepted. The UAT Coordinator has issued a GO recommendation. All required signatures have been collected. I hereby authorise production deployment of the TPC eSolutions Safety Data Management module.

**Authorised deployment date:** _________________________________

&nbsp;

☐ **CONDITIONAL GO — PRODUCTION DEPLOYMENT AUTHORISED WITH CONDITIONS**

The Safety Data Management module is accepted for production deployment subject to the conditions listed below. These conditions do not prevent deployment but must be tracked and closed within the defined timelines. I accept the residual risk associated with the deferred items in Section 7.

| # | Condition | Owner | Deadline |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

**Authorised deployment date:** _________________________________

&nbsp;

☐ **NO GO — PRODUCTION DEPLOYMENT NOT AUTHORISED**

The Safety Data Management module is not accepted for production deployment. The following blockers must be resolved. The Development Lead and UAT Coordinator will agree a remediation plan and re-entry criteria.

| # | Blocker | Required resolution | Target date |
|---|---|---|---|
| 1 | | | |
| 2 | | | |

**Remediation review date:** _________________________________

### 13.3 Project Sponsor Signature

*My signature is the binding authority for this decision. Production deployment of the TPC eSolutions Safety Data Management module may only proceed upon my signature below.*

&nbsp;

**Full name:** _________________________________

**Title / Position:** _________________________________

**Organisation:** Tchad Petroleum Company

**Signature:** _________________________________

**Date:** _________________

---

## 14. Post-UAT Actions

*Populated by the UAT Coordinator on the day of Project Sponsor sign-off. Owner names and dates to be confirmed at that time.*

| # | Action | Owner | Target date | Status |
|---|---|---|---|---|
| 1 | Communicate UAT outcome (GO / CONDITIONAL GO / NO GO) to all participants and stakeholders | UAT Coordinator | Same day as sign-off | |
| 2 | Archive all UAT-FEEDBACK.md forms with participant names | UAT Coordinator | Within 48 hours | |
| 3 | Finalise and archive UAT-TEST-REPORT.md with final figures | UAT Coordinator | Within 48 hours | |
| 4 | Finalise and archive UAT-COMMAND-CENTER.md with final scores | UAT Coordinator | Within 48 hours | |
| 5 | Merge `uat-feedback` branch into `master` (if any fixes were applied during UAT) | Dev Lead | Before production deployment | |
| 6 | Apply production build git tag to merged `master` | Dev Lead | Before production deployment | |
| 7 | Execute production deployment to Azure SWA production slot | IT Representative | Per agreed deployment schedule | |
| 8 | Confirm production URL accessible and build is correct post-deployment | IT Representative | Within 2 hours of deployment | |
| 9 | Update all Deferred items in UAT-DEFECTS.md with target sprint assignments | Dev Lead | Within 5 business days | |
| 10 | Brief operational users and Safety Data personnel on go-live date and access | Business Sponsor | Before go-live date | |
| 11 | Begin planning Entra ID / SSO sprint (OPEN-01) | Dev Lead + Project Sponsor | Within 2 weeks of go-live | |
| 12 | Schedule and conduct post-go-live monitoring review | Project Sponsor | 2 weeks after go-live | |
| 13 | Close this document and retain in project audit archive | UAT Coordinator | Within 5 business days of sign-off | |

---

## Document Completion Record

*Completed by the UAT Coordinator once all signatures are collected.*

| Signature | Signatory | Date signed | Section |
|---|---|---|---|
| ☐ | HSE Process Owner | | §8 |
| ☐ | Participant — Global Admin | | §9 |
| ☐ | Participant — Safety Admin | | §9 |
| ☐ | Participant — HSE Reviewer (SR) | | §9 |
| ☐ | Participant — HSE Reviewer (IH) | | §9 |
| ☐ | Participant — Store Manager | | §9 |
| ☐ | Participant — Field User | | §9 |
| ☐ | UAT Coordinator | | §10 |
| ☐ | IT Representative | | §11 |
| ☐ | Business Sponsor | | §12 |
| ☐ | Project Sponsor | | §13 |

**Total signatures collected: ___ / 11**

**Document status on final signature:**

☐ GO   ☐ CONDITIONAL GO   ☐ NO GO

**UAT Coordinator final declaration:**

I confirm this document is complete, all signatures have been collected as recorded above, and the decision recorded in Section 13 is the final binding outcome of the TPC eSolutions Safety Data Management UAT cycle.

**Full name:** _________________________________

**Signature:** _________________________________

**Date:** _________________

---

*Document ref: TPC-ESOL-UAT-SO-001 v2.0 | Classification: INTERNAL — CONTROLLED DOCUMENT*
*This document becomes effective upon signature by the Project Sponsor in Section 13.3.*
*Retain for a minimum of 3 years as part of the project audit trail.*
*All changes to this document after first signature must be recorded in the Document Control table and re-circulated to all signatories.*
