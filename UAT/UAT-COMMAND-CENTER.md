# UAT Command Center
## Dashboard Specification — TPC eSolutions Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-CC-001 |
| **Version** | 1.0 |
| **Classification** | INTERNAL — CONTROLLED |
| **Prepared by** | eTPC Development Team |
| **Issue date** | 2026-06-05 |

---

## Document Control

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-06-05 | eTPC Dev Team | Initial release |

---

## Related Documents

| Document | Ref | Role in this specification |
|---|---|---|
| UAT Execution Plan | TPC-ESOL-UAT-001 | Source of truth for scenario count, exit criteria, schedule |
| UAT Defect Management Process | UAT-DEFECT-MANAGEMENT.md | Severity definitions, exit criteria thresholds, KPI targets |
| UAT Defect Log | UAT-DEFECTS.md | Primary data source for all defect KPIs |
| UAT Triage Guide | UAT-TRIAGE-GUIDE.md | Daily meeting that produces the dashboard update |
| UAT Sign-Off | UAT-SIGNOFF.md | Source for sign-off status KPI |
| UAT Test Report | UAT-TEST-REPORT.md | Source for scenario execution KPIs |

---

## Table of Contents

1. [Command Center Overview](#1-command-center-overview)
2. [Dashboard Layout](#2-dashboard-layout)
3. [KPI Definitions](#3-kpi-definitions)
4. [UAT Readiness Score](#4-uat-readiness-score)
5. [Data Sources](#5-data-sources)
6. [Update Frequency](#6-update-frequency)
7. [Sample Reports](#7-sample-reports)

---

## 1. Command Center Overview

### 1.1 Purpose

The UAT Command Center is the single source of truth for the governance of the TPC eSolutions UAT cycle. It consolidates all progress, quality, and sign-off data into one structured view that enables the UAT Coordinator, Project Sponsor, and stakeholders to assess the state of UAT at any moment without reading multiple documents.

The Command Center does not replace the detailed records in UAT-DEFECTS.md, UAT-TEST-REPORT.md, or UAT-SIGNOFF.md. It aggregates those records into a set of indicators that support rapid, confident decision-making.

### 1.2 Primary Audience

| Audience | How they use it |
|---|---|
| **Project Sponsor** | Reads the daily report to assess overall health and make GO / NO GO decisions. Focuses on: overall status banner, Readiness Score, Critical / High defect counts, sign-off status. |
| **UAT Coordinator** | Updates the dashboard after every session and every triage meeting. Uses it as the source for the daily report and escalation notices. |
| **Development Lead** | Reads open defect counts and SLA status to prioritise developer work. |
| **UAT Participants** | Reads the scenario execution table to understand how much testing remains and where they stand. |
| **HSE Process Owner** | Reviews readiness score and sign-off status to know when their confirmation is needed. |

### 1.3 How the Command Center Is Maintained

The UAT Command Center is a living document updated by the UAT Coordinator. It is not automated — all figures are manually transferred from the source documents listed in Section 5 after each UAT session and after each triage meeting.

The UAT Coordinator is responsible for accuracy. No stakeholder should make a governance decision on the basis of Command Center data that is more than 24 hours old during an active UAT day.

### 1.4 Relationship to Other Governance Documents

```
  UAT Execution Plan          UAT Defect Log        UAT Test Report
  (scenarios, schedule,       (UAT-DEFECTS.md)      (UAT-TEST-REPORT.md)
   exit criteria)                    │                      │
         │                           │                      │
         └───────────────────────────┼──────────────────────┘
                                     │ UAT Coordinator
                                     │ aggregates after
                                     │ each session
                                     ▼
                           UAT COMMAND CENTER
                           (UAT-COMMAND-CENTER.md)
                                     │
                           ┌─────────┼──────────┐
                           ▼         ▼          ▼
                      Daily       Escalation   GO / NO GO
                      Report      Notice       Decision
                      (§11 of     (UAT-        (UAT-
                      exec plan)  TRIAGE-      SIGNOFF.md)
                                  GUIDE.md)
```

---

## 2. Dashboard Layout

The following layout is the canonical format for all Command Center reports. Every section must appear in every report, in this order. Do not omit sections even if the values are zero.

---

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║  TPC eSolutions — UAT COMMAND CENTER             Safety Data Management Module       ║
║  Report date:  [YYYY-MM-DD  HH:MM]    Day [N] of 4    Reported by: [coordinator]    ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  OVERALL STATUS                                                                      ║
║  ┌─────────────────────────────────────────────────────────────────────────────┐    ║
║  │                                                                             │    ║
║  │   ☐ ON TRACK     ☐ AT RISK     ☐ SUSPENDED                                 │    ║
║  │                                                                             │    ║
║  │   [One sentence narrative — e.g. "Day 2 complete. Core approval chain       │    ║
║  │    validated. One High defect open — fix in progress, SLA met by 10:00     │    ║
║  │    tomorrow. Schedule remains on track for Day 4 sign-off."]               │    ║
║  │                                                                             │    ║
║  └─────────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 1 — EXECUTION PROGRESS                                                      ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  ║
║  │  UAT PROGRESS    │  │  EXECUTED        │  │  PASSED          │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │    [NNN] %       │  │   [N]  of  14    │  │    [N]  of  14   │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │  [████░░░░░░░░]  │  │  Target: 14/14   │  │  Target: ≥ 13   │                  ║
║  │                  │  │  by Day 3        │  │  (≥ 93%)        │                  ║
║  └──────────────────┘  └──────────────────┘  └──────────────────┘                  ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐                                         ║
║  │  FAILED          │  │  BLOCKED         │                                         ║
║  │                  │  │                  │                                         ║
║  │      [N]         │  │      [N]         │                                         ║
║  │                  │  │                  │                                         ║
║  │  Target: ≤ 1     │  │  Target: 0       │                                         ║
║  │  (with waiver)   │  │  (unblock same   │                                         ║
║  └──────────────────┘  │   day)           │                                         ║
║                         └──────────────────┘                                         ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 2 — DEFECT HEALTH                                                           ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  ║
║  │  OPEN DEFECTS    │  │  CRITICAL        │  │  HIGH            │                  ║
║  │  (all severities)│  │  (SEV-1)         │  │  (SEV-2)         │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │      [N]         │  │      [N]         │  │      [N]         │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │  Closed: [N]     │  │  TARGET: 0       │  │  TARGET: 0       │                  ║
║  │  Deferred: [N]   │  │  (hard stop)     │  │  (hard stop)     │                  ║
║  └──────────────────┘  └──────────────────┘  └──────────────────┘                  ║
║                                                                                      ║
║  ┌──────────────────────────────────────────────────────────────────────────────┐   ║
║  │  DEFECT DISTRIBUTION                                                         │   ║
║  │                                                                              │   ║
║  │  Critical (SEV-1)  [N]  [█░░░░░░░░░░░░░░░░░░░░░░░░]                        │   ║
║  │  High     (SEV-2)  [N]  [███░░░░░░░░░░░░░░░░░░░░░░]                        │   ║
║  │  Medium   (SEV-3)  [N]  [█████░░░░░░░░░░░░░░░░░░░░]                        │   ║
║  │  Low      (SEV-4)  [N]  [██░░░░░░░░░░░░░░░░░░░░░░░]                        │   ║
║  │                                                                              │   ║
║  │  Retest pass rate: [N]%   (target ≥ 85%)                                    │   ║
║  │  SLA compliance:   [N]%   (target ≥ 90%)                                    │   ║
║  └──────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 3 — READINESS AND SIGN-OFF                                                  ║
║                                                                                      ║
║  ┌──────────────────────────────────────┐  ┌───────────────────────────────────┐   ║
║  │  UAT READINESS SCORE                 │  │  SIGN-OFF STATUS                  │   ║
║  │                                      │  │                                   │   ║
║  │  SCORE:  [NN] / 100                  │  │  [N] of 10 signatures collected   │   ║
║  │  BAND:   [NOT READY / AT RISK /      │  │                                   │   ║
║  │           CONDITIONAL / READY]       │  │  [████████████░░░░░░░░░░░░░░░░░] │   ║
║  │                                      │  │                                   │   ║
║  │  [████████████████░░░░░░░░░░░░░░░░] │  │  ☐/✅ UAT Coordinator  (§8.1)    │   ║
║  │                                      │  │  ☐/✅ HSE Process Owner (§6)     │   ║
║  │  A  Scenario execution:  [NN] / 20   │  │  ☐/✅ Participant — GA   (§7)    │   ║
║  │  B  Pass rate:           [NN] / 25   │  │  ☐/✅ Participant — Admin (§7)   │   ║
║  │  C  Defect health:       [NN] / 30   │  │  ☐/✅ Participant — SR   (§7)    │   ║
║  │  D  Exit criteria:       [NN] / 15   │  │  ☐/✅ Participant — IH   (§7)    │   ║
║  │  E  Sign-off progress:   [NN] / 10   │  │  ☐/✅ Participant — SM   (§7)    │   ║
║  │                                      │  │  ☐/✅ Participant — User  (§7)   │   ║
║  └──────────────────────────────────────┘  │  ☐/✅ IT Representative  (§8.3)  │   ║
║                                            │  ☐/✅ Project Sponsor    (§8.2)  │   ║
║                                            └───────────────────────────────────┘   ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 4 — SCENARIO EXECUTION STATUS                                               ║
║                                                                                      ║
║  ┌───────┬────────────────────────────────────┬────────┬────────────┬────────────┐ ║
║  │ Ref   │ Title                              │ Status │ Assigned   │ Notes      │ ║
║  ├───────┼────────────────────────────────────┼────────┼────────────┼────────────┤ ║
║  │ SCN-01│ New Chemical Submission            │ [    ] │ [name]     │            │ ║
║  │ SCN-02│ Safety Review Approval             │ [    ] │ [name]     │            │ ║
║  │ SCN-03│ Return for Revision & Resubmit     │ [    ] │ [name]     │            │ ║
║  │ SCN-04│ Full Approval Chain                │ [    ] │ [name]     │            │ ║
║  │ SCN-05│ Rejection Workflow                 │ [    ] │ [name]     │            │ ║
║  │ SCN-06│ My Requests — Tracking & Grouping  │ [    ] │ [name]     │            │ ║
║  │ SCN-07│ Master Sheet Browsing              │ [    ] │ [name]     │            │ ║
║  │ SCN-08│ Manufacturer Management            │ [    ] │ [name]     │            │ ║
║  │ SCN-09│ Storage Location Management        │ [    ] │ [name]     │            │ ║
║  │ SCN-10│ User Management                    │ [    ] │ [name]     │            │ ║
║  │ SCN-11│ Language Toggle EN / FR            │ [    ] │ [name]     │            │ ║
║  │ SCN-12│ Role-Based Visibility              │ [    ] │ [name]     │            │ ║
║  │ SCN-13│ Session Continuity                 │ [    ] │ [name]     │            │ ║
║  │ SCN-14│ Dashboard and Navigation           │ [    ] │ [name]     │            │ ║
║  └───────┴────────────────────────────────────┴────────┴────────────┴────────────┘ ║
║  Status codes: PASS  FAIL  BLOCKED  IN PROGRESS  PENDING                            ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 5 — ACTIVE DEFECT SLA TRACKER                                               ║
║                                                                                      ║
║  ┌─────────┬──────────┬──────────┬─────────────┬──────────────┬───────────────┐    ║
║  │ ID      │ Severity │ Priority │ Logged      │ SLA deadline │ Status        │    ║
║  ├─────────┼──────────┼──────────┼─────────────┼──────────────┼───────────────┤    ║
║  │ DEF-xxx │ Critical │ P1       │ [date/time] │ [date/time]  │ IN PROGRESS   │    ║
║  │ DEF-xxx │ High     │ P1       │ [date/time] │ [date/time]  │ IN PROGRESS   │    ║
║  │ DEF-xxx │ Medium   │ P3       │ [date/time] │ [date]       │ APPROVED      │    ║
║  └─────────┴──────────┴──────────┴─────────────┴──────────────┴───────────────┘    ║
║  Note: Closed, Rejected, and Deferred defects are not shown here.                    ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 6 — EXIT CRITERIA TRACKER                                                   ║
║                                                                                      ║
║  ┌──────┬────────────────────────────────────────┬───────────┬─────────┬────────┐  ║
║  │ Ref  │ Criterion                              │ Threshold │ Current │ Status │  ║
║  ├──────┼────────────────────────────────────────┼───────────┼─────────┼────────┤  ║
║  │ EX-01│ All scenarios executed                 │ 14 / 14   │ [N]/14  │ ☐ / ✅ │  ║
║  │ EX-02│ Scenario pass rate                     │ ≥ 93%     │ [N]%    │ ☐ / ✅ │  ║
║  │ EX-03│ Zero open Critical defects             │ 0         │ [N]     │ ☐ / ✅ │  ║
║  │ EX-04│ Zero open High defects                 │ 0         │ [N]     │ ☐ / ✅ │  ║
║  │ EX-05│ Medium defects resolved or waived      │ 0 open    │ [N]     │ ☐ / ✅ │  ║
║  │ EX-06│ Participant feedback forms             │ 6 / 6     │ [N]/6   │ ☐ / ✅ │  ║
║  │ EX-07│ HSE Process Owner confirmation         │ Signed    │ ☐/✅    │ ☐ / ✅ │  ║
║  │ EX-08│ Participant sign-offs                  │ 6 / 6     │ [N]/6   │ ☐ / ✅ │  ║
║  │ EX-09│ UAT-TEST-REPORT.md complete            │ Approved  │ ☐/✅    │ ☐ / ✅ │  ║
║  │ EX-10│ Project Sponsor acceptance             │ Signed    │ ☐/✅    │ ☐ / ✅ │  ║
║  └──────┴────────────────────────────────────────┴───────────┴─────────┴────────┘  ║
║  Exit criteria met: [N] / 10                                                         ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║  END OF REPORT — [YYYY-MM-DD  HH:MM]                                                 ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 3. KPI Definitions

### 3.1 KPI Overview

| # | KPI | Type | Target | Hard stop? |
|---|---|---|---|---|
| 1 | UAT Progress % | Ratio | 100% by end of Day 3 | No |
| 2 | Executed Test Cases | Count | 14 | No |
| 3 | Passed Test Cases | Count | ≥ 13 (≥ 93%) | No |
| 4 | Failed Test Cases | Count | ≤ 1 with waiver | No |
| 5 | Blocked Test Cases | Count | 0 at sign-off | Yes — unblock same day |
| 6 | Open Defects | Count | 0 Critical and High at sign-off | Partial |
| 7 | Critical Defects | Count | 0 at all times | Yes |
| 8 | High Defects | Count | 0 at sign-off | Yes |
| 9 | UAT Readiness Score | Score / 100 | ≥ 85 for GO | No |
| 10 | Sign-off Status | Count / 11 | 11 / 11 | Yes |

---

### KPI 1 — UAT Progress %

**Definition**

The percentage of the total 14 test scenarios that have been executed, regardless of outcome.

**Formula**

```
UAT Progress % = (Executed Scenarios ÷ 14) × 100

Where:
  Executed Scenarios = count of scenarios with status PASS, FAIL, or BLOCKED
  14 = total scenarios defined in UAT-EXECUTION-PLAN.md §8
```

**Threshold bands**

| Value | Status | Interpretation |
|---|---|---|
| 0 – 35% | Amber | Day 1 normal — less than 5 scenarios done |
| 36 – 70% | Green | Day 2 normal — 6 to 10 scenarios done |
| 71 – 99% | Green | Day 3 — approaching completion |
| 100% | Green | All scenarios executed — sign-off process may begin |

**Note:** 100% execution does not mean UAT is passed. It means all scenarios have a recorded outcome. Failed and Blocked scenarios still require resolution before sign-off.

---

### KPI 2 — Executed Test Cases

**Definition**

The raw count of test scenarios that have been started and completed — meaning the tester has reached the final step and recorded an outcome of PASS, FAIL, or BLOCKED.

A scenario is **not** counted as executed if:
- It is marked IN PROGRESS (started but not yet completed)
- It is marked PENDING (not yet started)

**Formula**

```
Executed = Count of scenarios where Status ∈ {PASS, FAIL, BLOCKED}
```

**Source:** UAT-TEST-REPORT.md scenario status table.

---

### KPI 3 — Passed Test Cases

**Definition**

The count of test scenarios where every step produced the stated expected result. A scenario is PASS only when all steps pass without exception.

**Formula**

```
Passed = Count of scenarios where Status = PASS

Pass Rate % = (Passed ÷ Executed) × 100
```

**Target:** ≥ 13 of 14 (≥ 93%) — the minimum required for a GO decision (UAT-DEFECT-MANAGEMENT.md §5.1 EX-02).

**Note:** A scenario with a failed step that was subsequently fixed and retested successfully may be reclassified from FAIL to PASS by the UAT Coordinator, provided the retest is documented in UAT-TEST-REPORT.md.

---

### KPI 4 — Failed Test Cases

**Definition**

The count of test scenarios where at least one step produced a result different from the stated expected result and the scenario was not subsequently retested as PASS.

**Formula**

```
Failed = Count of scenarios where Status = FAIL
```

**Target:** ≤ 1 at sign-off — but only with a formal waiver. The Project Sponsor must accept a failing scenario in writing in UAT-SIGNOFF.md.

**Escalation trigger:** ≥ 2 failed scenarios without waivers triggers an automatic AT RISK overall status.

---

### KPI 5 — Blocked Test Cases

**Definition**

The count of test scenarios where a tester reached a step that could not be completed due to a defect, environment failure, or missing prerequisite, and was unable to proceed further in that scenario.

**Formula**

```
Blocked = Count of scenarios where Status = BLOCKED
```

**Target:** 0 at all times during active UAT. Any BLOCKED scenario must be unblocked on the same day — either by fixing the underlying defect or by the UAT Coordinator formally deferring that scenario with a written justification.

**Escalation trigger:** Any BLOCKED scenario immediately triggers an unscheduled triage call with the Development Lead. If the block cannot be resolved within 4 hours, the UAT Coordinator notifies the Project Sponsor.

---

### KPI 6 — Open Defects

**Definition**

The count of all defect records in UAT-DEFECTS.md that are in an active state — meaning the defect has not yet been fully resolved.

**Formula**

```
Open Defects = Count of defects where Status ∈ {New, Under Review, Approved,
                                                  In Progress, Ready for Retest}

Does NOT include: Closed, Rejected, Deferred
```

**Target at sign-off:** Zero Critical and Zero High. Medium and Low defects may be open at sign-off if formally waived.

**Companion metrics always reported alongside Open Defects:**
- Closed defects (all time): confirmation that work is being completed
- Deferred defects: items that will need waivers in UAT-SIGNOFF.md

---

### KPI 7 — Critical Defects

**Definition**

The count of open defects with confirmed severity SEV-1 (Critical). This is the single most important indicator in the Command Center. Any non-zero value here represents an immediate risk to UAT completion and production readiness.

**Formula**

```
Critical Defects = Count of defects where Status ∈ {open states} AND Severity = SEV-1
```

**Target:** **0 at all times during active UAT.** A value of ≥ 1 triggers:
- Immediate UAT suspension for affected scenarios
- Immediate escalation to Project Sponsor
- Overall status banner set to SUSPENDED

**Sign-off rule:** A single open Critical defect at sign-off time is an **automatic NO GO** with no exceptions (UAT-DEFECT-MANAGEMENT.md §5.2).

---

### KPI 8 — High Defects

**Definition**

The count of open defects with confirmed severity SEV-2 (High).

**Formula**

```
High Defects = Count of defects where Status ∈ {open states} AND Severity = SEV-2
```

**Target:** 0 at sign-off.

**Status band guidance:**

| Value | Overall status impact |
|---|---|
| 0 | No impact |
| 1 and within SLA | Amber — AT RISK if SLA expires today |
| 1 and SLA breached | Escalate to Project Sponsor immediately |
| ≥ 2 | AT RISK — Development Lead and Project Sponsor informed |

**Sign-off rule:** A single open High defect at sign-off time is an **automatic NO GO** with no exceptions.

---

### KPI 9 — UAT Readiness Score

> Defined in full in Section 4. Summary only here.

**Definition**

A weighted composite score (0–100) that synthesises scenario execution rate, pass rate, defect health, exit criteria progress, and sign-off progress into a single number that represents the overall readiness of the build for production acceptance.

**Bands:**

| Score | Band | Overall status |
|---|---|---|
| 85 – 100 | READY | GO eligible |
| 70 – 84 | CONDITIONAL | CONDITIONAL GO eligible with waivers |
| 50 – 69 | AT RISK | Requires remediation plan |
| 0 – 49 | NOT READY | Significant work remains |

---

### KPI 10 — Sign-off Status

**Definition**

The count of formal signatures collected against the total required in UAT-SIGNOFF.md, expressed as a fraction and a progress bar.

**Formula**

```
Sign-off Status = Signatures collected ÷ 11

Required signatures (11 total):
  §8   HSE Process Owner          (1 signature)
  §9   UAT Participants            (6 signatures — one per tester role)
  §10  UAT Coordinator             (1 signature)
  §11  IT Representative           (1 signature)
  §12  Business Sponsor            (1 signature)
  §13  Project Sponsor             (1 signature — binding GO / NO GO authority)
```

**Sequence dependency:** Signatures must be collected in a defined order. The Project Sponsor signs last — their signature is the binding authority that authorises production deployment. Collecting 10/11 signatures but missing the Project Sponsor is not a valid sign-off state.

**Target:** 11 / 11 for a full GO. 10 / 11 with Project Sponsor pending means the sign-off process is in its final stage.

---

## 4. UAT Readiness Score

### 4.1 Formula

The UAT Readiness Score is a weighted composite of five independently measurable components. Maximum score is 100.

```
Readiness Score = A + B + C + D + E

Component A — Scenario Execution (max 20 points)
  A = (Executed Scenarios ÷ 14) × 20

Component B — Scenario Pass Rate (max 25 points)
  B = (Passed Scenarios ÷ Executed Scenarios) × 25
  B = 0 if Executed Scenarios = 0

Component C — Defect Health (max 30 points)
  C = 30
    − (15 × Critical_open)
    − (7  × High_open)
    − (2  × Medium_open_unwaived)
    − (0.5 × Low_open)
  C = max(C, 0)   [floor at zero — cannot go negative]

Component D — Exit Criteria Progress (max 15 points)
  D = (Exit_criteria_met ÷ 10) × 15
  Exit criteria met = count of EX-01 through EX-10 confirmed MET

Component E — Sign-off Progress (max 10 points)
  E = (Signatures_collected ÷ 11) × 10
```

### 4.2 Component Weights — Rationale

| Component | Weight | Rationale |
|---|---|---|
| A — Execution | 20 | Scope coverage is necessary but not sufficient — a project could execute all scenarios and fail them all |
| B — Pass rate | 25 | The largest single weight because quality of outcomes is the core purpose of UAT |
| C — Defect health | 30 | The highest weight — open Critical and High defects represent the most direct risk to production readiness. The steep penalty for Critical (−15) and High (−7) reflects the hard stops they represent |
| D — Exit criteria | 15 | Broader than just scenarios and defects — ensures sign-off mechanics, feedback forms, and the HSE confirmation are progressing |
| E — Sign-off | 10 | Smallest weight — sign-off follows quality, not the reverse. A high sign-off count with poor defect health would be misleading |

### 4.3 Band Definitions

| Band | Score range | Meaning | Eligible decision |
|---|---|---|---|
| **READY** | 85 – 100 | All or nearly all components are in good health. The build is ready for the sign-off process. | GO |
| **CONDITIONAL** | 70 – 84 | Most components healthy but one or more areas have residual items. A Conditional GO may be appropriate if all Critical and High defects are closed and remaining items are formally waived. | CONDITIONAL GO |
| **AT RISK** | 50 – 69 | Multiple components are degraded. Remediation is underway but is not complete. Sign-off process should not begin. | No decision yet |
| **NOT READY** | 0 – 49 | Significant gaps remain. Either UAT is in its early stages (expected) or a Critical defect has materially reduced the score (escalation required). | No decision yet |

### 4.4 Score Behaviour Examples

| Situation | Score impact |
|---|---|
| UAT just started — 0 scenarios executed, 0 defects | Score = 30 (Component C baseline). Expected. NOT READY. |
| Day 2 — 8 scenarios done, 6 pass, 1 fail, 0 Critical, 1 High, 2 Medium open | Score ≈ 51. AT RISK. Expected at mid-point with open defects. |
| A Critical defect is logged mid-UAT | Component C drops by 15. If score was 65, it drops to 50. AT RISK. |
| Critical defect resolved and closed | Component C fully recovers. Score normalises. |
| End of Day 3 — 14 done, 13 pass, 0 Critical, 0 High, 1 Medium waived | Score ≈ 89. READY. GO eligible. |
| All scenarios pass, all defects closed, all signatures collected | Score = 100. Maximum. |

### 4.5 Score Calculation Worksheet

Include this worksheet in each daily report.

```
──────────────────────────────────────────────────────
UAT READINESS SCORE CALCULATION — [YYYY-MM-DD]
──────────────────────────────────────────────────────

COMPONENT A — SCENARIO EXECUTION
  Executed:         [N]
  Total:            14
  Calculation:      ([N] ÷ 14) × 20
  Component A:                            [NN.N] / 20

COMPONENT B — PASS RATE
  Passed:           [N]
  Executed:         [N]
  Calculation:      ([N] ÷ [N]) × 25
  Component B:                            [NN.N] / 25

COMPONENT C — DEFECT HEALTH
  Base score:       30
  Critical open:    [N]  × −15  =  [−NN]
  High open:        [N]  × −7   =  [−NN]
  Medium open       [N]  × −2   =  [−NN]
  (unwaived):
  Low open:         [N]  × −0.5 =  [−N.N]
  Subtotal:         30 − [NN]   =  [NN] (floor: 0)
  Component C:                            [NN.N] / 30

COMPONENT D — EXIT CRITERIA PROGRESS
  Criteria met:     [N]
  Total criteria:   10
  Calculation:      ([N] ÷ 10) × 15
  Component D:                            [NN.N] / 15

COMPONENT E — SIGN-OFF PROGRESS
  Signatures:       [N]
  Required:         11
  Calculation:      ([N] ÷ 11) × 10
  Component E:                            [NN.N] / 10

──────────────────────────────────────────────────────
TOTAL SCORE:   [A + B + C + D + E]        [NNN]  / 100
BAND:          [NOT READY / AT RISK / CONDITIONAL / READY]
──────────────────────────────────────────────────────
```

---

## 5. Data Sources

### 5.1 Per-KPI Data Source Map

| KPI | Primary source | Field / location | Updated by |
|---|---|---|---|
| UAT Progress % | UAT-TEST-REPORT.md | Scenario status table — count of PASS + FAIL + BLOCKED | UAT Coordinator |
| Executed Test Cases | UAT-TEST-REPORT.md | Scenario status table — count of PASS + FAIL + BLOCKED | UAT Coordinator |
| Passed Test Cases | UAT-TEST-REPORT.md | Scenario status table — count of PASS | UAT Coordinator |
| Failed Test Cases | UAT-TEST-REPORT.md | Scenario status table — count of FAIL | UAT Coordinator |
| Blocked Test Cases | UAT-TEST-REPORT.md | Scenario status table — count of BLOCKED | UAT Coordinator |
| Open Defects | UAT-DEFECTS.md | Active Defects table — count by status | UAT Coordinator |
| Critical Defects | UAT-DEFECTS.md | Active Defects table — count where Severity = SEV-1 AND Status ∈ {open states} | UAT Coordinator |
| High Defects | UAT-DEFECTS.md | Active Defects table — count where Severity = SEV-2 AND Status ∈ {open states} | UAT Coordinator |
| UAT Readiness Score | Calculated | Section 4.5 worksheet — draws from all sources above | UAT Coordinator |
| Sign-off Status | UAT-SIGNOFF.md | §8–§13 — count of completed signatures (11 total) | UAT Coordinator |
| Exit criteria count (for Score Component D) | UAT-EXECUTION-PLAN.md §7 | EX-01 through EX-10 — count of rows confirmed MET | UAT Coordinator |
| Retest pass rate | UAT-DEFECTS.md | Retest result field — count PASS ÷ total retests | UAT Coordinator |
| SLA compliance | UAT-DEFECTS.md | Logged date vs. Fixed date per defect — compare against SLA | UAT Coordinator |

### 5.2 Source Document Roles

| Document | Read from | Written to |
|---|---|---|
| UAT-TEST-REPORT.md | Scenario execution KPIs | UAT Coordinator updates after each session |
| UAT-DEFECTS.md | All defect KPIs | UAT Coordinator within 4h of tester report; Dev Lead updates state and fix fields |
| UAT-SIGNOFF.md | Sign-off KPI | Participants sign directly — UAT Coordinator records receipt |
| UAT-EXECUTION-PLAN.md | Total scenario count (14), exit criteria list | Read-only during UAT — frozen at UAT entry |
| UAT-COMMAND-CENTER.md | — | UAT Coordinator populates after each session and triage meeting |

---

## 6. Update Frequency

### 6.1 Update Schedule

| KPI | Update trigger | Update frequency | Maximum age |
|---|---|---|---|
| UAT Progress % | End of each tester session | Per session (1–3× per day) | 24 hours |
| Executed Test Cases | End of each tester session | Per session | 24 hours |
| Passed Test Cases | End of each tester session | Per session | 24 hours |
| Failed Test Cases | End of each tester session | Per session | 24 hours |
| Blocked Test Cases | **Immediately when a tester reports a block** | Real-time | 1 hour |
| Open Defects | After each triage meeting | After every triage (daily minimum) | 24 hours |
| Critical Defects | **Immediately when a Critical defect is logged** | Real-time | 1 hour |
| High Defects | After triage confirms severity | Within 4 hours of report | 4 hours |
| UAT Readiness Score | After each dashboard update | Same as slowest-updating input KPI | 24 hours |
| Sign-off Status | When a signature is received | Per signature event | 24 hours |
| Exit criteria tracker | After each triage meeting | Daily | 24 hours |

### 6.2 Real-Time vs. Daily Update Rules

**Real-time updates required (do not wait for daily triage):**

- Critical defect logged → update Section 2 (Critical Defects count), recalculate Component C of Readiness Score, update overall status banner to SUSPENDED, notify Project Sponsor
- Scenario BLOCKED → update Section 1 (Blocked count), update Section 4 scenario table, notify UAT Coordinator for same-day unblock
- Critical defect closed → update immediately — UAT Coordinator must confirm UAT resumption in writing

**Daily updates (end-of-session minimum):**

- All Section 1 execution KPIs
- All Section 2 defect health figures (excluding Critical, which are real-time)
- Section 3 Readiness Score recalculation
- Section 4 scenario table
- Section 5 SLA tracker
- Section 6 exit criteria tracker

**Event-triggered updates:**

- Signature received → update Section 3 Sign-off Status immediately
- Fix deployed → update defect state to Ready for Retest in Section 5

---

## 7. Sample Reports

The following three samples illustrate the Command Center at representative points in the UAT timeline. All figures are illustrative — they are consistent with the defined formulas and realistic for a 14-scenario UAT cycle.

---

### Sample A — Day 1 End of Day (Baseline)

*Context: First day of testing complete. Four scenarios executed. No defects yet logged. Sign-off process not started.*

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║  TPC eSolutions — UAT COMMAND CENTER             Safety Data Management Module       ║
║  Report date:  2026-06-08  17:00         Day 1 of 4    Reported by: [Coordinator]   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  OVERALL STATUS                                                                      ║
║  ┌─────────────────────────────────────────────────────────────────────────────┐    ║
║  │                                                                             │    ║
║  │   ✅ ON TRACK                                                               │    ║
║  │                                                                             │    ║
║  │   "Day 1 complete. SCN-01 through SCN-04 executed — 3 pass, 1 fail          │    ║
║  │    (resubmission routing — DEF-001 logged, triaged as High, in             │    ║
║  │    progress). No Critical defects. Schedule on track for Day 4 sign-off."  │    ║
║  │                                                                             │    ║
║  └─────────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 1 — EXECUTION PROGRESS                                                      ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  ║
║  │  UAT PROGRESS    │  │  EXECUTED        │  │  PASSED          │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │      29 %        │  │    4   of  14    │  │    3   of  14    │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │  [████░░░░░░░░]  │  │  Target: 14/14   │  │  Target: ≥ 13   │                  ║
║  │                  │  │  by Day 3        │  │  (≥ 93%)        │                  ║
║  └──────────────────┘  └──────────────────┘  └──────────────────┘                  ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐                                         ║
║  │  FAILED          │  │  BLOCKED         │                                         ║
║  │                  │  │                  │                                         ║
║  │       1          │  │       0          │                                         ║
║  │                  │  │                  │                                         ║
║  │  SCN-03 (FAIL)   │  │  Target: 0 ✅    │                                         ║
║  │  DEF-001 open    │  │                  │                                         ║
║  └──────────────────┘  └──────────────────┘                                         ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 2 — DEFECT HEALTH                                                           ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  ║
║  │  OPEN DEFECTS    │  │  CRITICAL        │  │  HIGH            │                  ║
║  │                  │  │  (SEV-1)         │  │  (SEV-2)         │                  ║
║  │       1          │  │                  │  │                  │                  ║
║  │                  │  │       0   ✅     │  │       1   ⚠️     │                  ║
║  │  Closed:   0     │  │                  │  │                  │                  ║
║  │  Deferred: 0     │  │  TARGET: 0 ✅    │  │  TARGET: 0       │                  ║
║  └──────────────────┘  └──────────────────┘  └──────────────────┘                  ║
║                                                                                      ║
║  ┌──────────────────────────────────────────────────────────────────────────────┐   ║
║  │  DEFECT DISTRIBUTION                                                         │   ║
║  │                                                                              │   ║
║  │  Critical (SEV-1)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]                          │   ║
║  │  High     (SEV-2)  1  [████░░░░░░░░░░░░░░░░░░░░]                          │   ║
║  │  Medium   (SEV-3)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]                          │   ║
║  │  Low      (SEV-4)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]                          │   ║
║  │                                                                              │   ║
║  │  Retest pass rate: n/a (no retests yet)                                     │   ║
║  │  SLA compliance:   100%  (DEF-001 within 24h SLA — due 2026-06-09 10:30)   │   ║
║  └──────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 3 — READINESS AND SIGN-OFF                                                  ║
║                                                                                      ║
║  ┌──────────────────────────────────────┐  ┌───────────────────────────────────┐   ║
║  │  UAT READINESS SCORE                 │  │  SIGN-OFF STATUS                  │   ║
║  │                                      │  │                                   │   ║
║  │  SCORE:   38 / 100                   │  │  0 of 11 signatures collected     │   ║
║  │  BAND:    NOT READY                  │  │                                   │   ║
║  │                                      │  │  [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] │   ║
║  │  [████████░░░░░░░░░░░░░░░░░░░░░░░░] │  │                                   │   ║
║  │                                      │  │  ☐ UAT Coordinator        (§8.1) │   ║
║  │  A  Scenario execution:   5.7 / 20   │  │  ☐ HSE Process Owner       (§6)  │   ║
║  │  B  Pass rate:           18.8 / 25   │  │  ☐ Participant — GA        (§7)  │   ║
║  │  C  Defect health:       23.0 / 30   │  │  ☐ Participant — Admin     (§7)  │   ║
║  │  D  Exit criteria:        0.0 / 15   │  │  ☐ Participant — SR        (§7)  │   ║
║  │  E  Sign-off progress:    0.0 / 10   │  │  ☐ Participant — IH        (§7)  │   ║
║  │                                      │  │  ☐ Participant — SM        (§7)  │   ║
║  │  NOT READY is expected on Day 1.     │  │  ☐ Participant — User      (§7)  │   ║
║  │  Target trajectory: ≥ 85 by Day 4.  │  │  ☐ IT Representative      (§11) │   ║
║  └──────────────────────────────────────┘  │  ☐ Business Sponsor       (§12) │   ║
║                                            │  ☐ Project Sponsor        (§13) │   ║
║                                            └───────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 4 — SCENARIO EXECUTION STATUS                                               ║
║                                                                                      ║
║  ┌───────┬────────────────────────────────────┬──────────────┬────────────────────┐ ║
║  │ Ref   │ Title                              │ Status       │ Notes              │ ║
║  ├───────┼────────────────────────────────────┼──────────────┼────────────────────┤ ║
║  │ SCN-01│ New Chemical Submission            │ PASS         │                    │ ║
║  │ SCN-02│ Safety Review Approval             │ PASS         │                    │ ║
║  │ SCN-03│ Return for Revision & Resubmit     │ FAIL         │ DEF-001 open       │ ║
║  │ SCN-04│ Full Approval Chain                │ PASS         │                    │ ║
║  │ SCN-05│ Rejection Workflow                 │ PENDING      │                    │ ║
║  │ SCN-06│ My Requests — Tracking & Grouping  │ PENDING      │                    │ ║
║  │ SCN-07│ Master Sheet Browsing              │ PENDING      │                    │ ║
║  │ SCN-08│ Manufacturer Management            │ PENDING      │                    │ ║
║  │ SCN-09│ Storage Location Management        │ PENDING      │                    │ ║
║  │ SCN-10│ User Management                    │ PENDING      │                    │ ║
║  │ SCN-11│ Language Toggle EN / FR            │ PENDING      │                    │ ║
║  │ SCN-12│ Role-Based Visibility              │ PENDING      │                    │ ║
║  │ SCN-13│ Session Continuity                 │ PENDING      │                    │ ║
║  │ SCN-14│ Dashboard and Navigation           │ PENDING      │                    │ ║
║  └───────┴────────────────────────────────────┴──────────────┴────────────────────┘ ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 5 — ACTIVE DEFECT SLA TRACKER                                               ║
║                                                                                      ║
║  ┌─────────┬──────────┬──────┬─────────────────────┬──────────────────┬───────────┐ ║
║  │ ID      │ Severity │ Pri  │ Logged              │ SLA deadline     │ Status    │ ║
║  ├─────────┼──────────┼──────┼─────────────────────┼──────────────────┼───────────┤ ║
║  │ DEF-001 │ High     │ P1   │ 2026-06-08  10:30   │ 2026-06-09 10:30 │ IN PROG   │ ║
║  └─────────┴──────────┴──────┴─────────────────────┴──────────────────┴───────────┘ ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 6 — EXIT CRITERIA TRACKER                                                   ║
║                                                                                      ║
║  ┌──────┬────────────────────────────────────────┬───────────┬─────────┬────────┐  ║
║  │ Ref  │ Criterion                              │ Threshold │ Current │ Status │  ║
║  ├──────┼────────────────────────────────────────┼───────────┼─────────┼────────┤  ║
║  │ EX-01│ All scenarios executed                 │ 14 / 14   │  4 / 14 │  ☐     │  ║
║  │ EX-02│ Scenario pass rate                     │ ≥ 93%     │   75%   │  ☐     │  ║
║  │ EX-03│ Zero open Critical defects             │ 0         │    0    │  ✅    │  ║
║  │ EX-04│ Zero open High defects                 │ 0         │    1    │  ☐     │  ║
║  │ EX-05│ Medium defects resolved or waived      │ 0 open    │    0    │  ✅    │  ║
║  │ EX-06│ Participant feedback forms             │ 6 / 6     │  0 / 6  │  ☐     │  ║
║  │ EX-07│ HSE Process Owner confirmation         │ Signed    │  ☐      │  ☐     │  ║
║  │ EX-08│ Participant sign-offs                  │ 6 / 6     │  0 / 6  │  ☐     │  ║
║  │ EX-09│ UAT-TEST-REPORT.md complete            │ Approved  │  ☐      │  ☐     │  ║
║  │ EX-10│ Project Sponsor acceptance             │ Signed    │  ☐      │  ☐     │  ║
║  └──────┴────────────────────────────────────────┴───────────┴─────────┴────────┘  ║
║  Exit criteria met: 2 / 10                                                           ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║  END OF REPORT — 2026-06-08  17:00                                                   ║
╚══════════════════════════════════════════════════════════════════════════════════════╝

READINESS SCORE CALCULATION
──────────────────────────────────────────────
A  (4 ÷ 14) × 20             =   5.7
B  (3 ÷ 4)  × 25             =  18.8
C  30 − 0 − 7 − 0 − 0        =  23.0
D  (2 ÷ 10) × 15             =   3.0   ← EX-03 and EX-05 met
E  (0 ÷ 11) × 10             =   0.0
TOTAL                        =  50.5   → AT RISK
──────────────────────────────────────────────
```

> **Coordinator note:** Score of 50.5 AT RISK is expected and appropriate at end of Day 1 with 10 scenarios still pending and 1 High defect open. DEF-001 is within SLA. Trajectory to READY (≥ 85) by Day 4 remains achievable if DEF-001 is resolved by tomorrow morning and remaining scenarios proceed without new Critical or High defects.

---

### Sample B — Day 2 End of Day (Under Pressure)

*Context: Eight scenarios executed. DEF-001 (High) closed overnight. Two new Medium defects found today. One scenario failed due to a new Medium defect but testing has continued on other scenarios.*

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║  TPC eSolutions — UAT COMMAND CENTER             Safety Data Management Module       ║
║  Report date:  2026-06-09  17:00         Day 2 of 4    Reported by: [Coordinator]   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  OVERALL STATUS                                                                      ║
║  ┌─────────────────────────────────────────────────────────────────────────────┐    ║
║  │                                                                             │    ║
║  │   ⚠️  AT RISK                                                               │    ║
║  │                                                                             │    ║
║  │   "Day 2 complete. DEF-001 closed — SCN-03 retest passed, reclassified      │    ║
║  │    to PASS. Two new Medium defects logged (DEF-002, DEF-003). No Critical   │    ║
║  │    or High defects open. AT RISK due to 2 open Mediums and 6 scenarios      │    ║
║  │    remaining. Developer fixes due Day 3. Schedule tight but recoverable."   │    ║
║  │                                                                             │    ║
║  └─────────────────────────────────────────────────────────────────────────────┘    ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 1 — EXECUTION PROGRESS                                                      ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  ║
║  │  UAT PROGRESS    │  │  EXECUTED        │  │  PASSED          │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │      57 %        │  │    8   of  14    │  │    7   of  14    │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │  [████████░░░░]  │  │  Target: 14/14   │  │  Target: ≥ 13   │                  ║
║  │                  │  │  by Day 3        │  │  (≥ 93%)        │                  ║
║  └──────────────────┘  └──────────────────┘  └──────────────────┘                  ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐                                         ║
║  │  FAILED          │  │  BLOCKED         │                                         ║
║  │                  │  │                  │                                         ║
║  │       1          │  │       0          │                                         ║
║  │                  │  │                  │                                         ║
║  │  SCN-11 (FR mode)│  │  Target: 0 ✅    │                                         ║
║  │  DEF-002 open    │  │                  │                                         ║
║  └──────────────────┘  └──────────────────┘                                         ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 2 — DEFECT HEALTH                                                           ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  ║
║  │  OPEN DEFECTS    │  │  CRITICAL        │  │  HIGH            │                  ║
║  │                  │  │  (SEV-1)         │  │  (SEV-2)         │                  ║
║  │       2          │  │                  │  │                  │                  ║
║  │                  │  │       0   ✅     │  │       0   ✅     │                  ║
║  │  Closed:   1     │  │                  │  │                  │                  ║
║  │  Deferred: 0     │  │  TARGET: 0 ✅    │  │  TARGET: 0 ✅    │                  ║
║  └──────────────────┘  └──────────────────┘  └──────────────────┘                  ║
║                                                                                      ║
║  ┌──────────────────────────────────────────────────────────────────────────────┐   ║
║  │  DEFECT DISTRIBUTION                                                         │   ║
║  │                                                                              │   ║
║  │  Critical (SEV-1)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]                          │   ║
║  │  High     (SEV-2)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]                          │   ║
║  │  Medium   (SEV-3)  2  [████████░░░░░░░░░░░░░░░░]                          │   ║
║  │  Low      (SEV-4)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]                          │   ║
║  │                                                                              │   ║
║  │  Retest pass rate: 100%  (1 retest conducted — DEF-001: PASS)               │   ║
║  │  SLA compliance:   100%  (DEF-001 closed within SLA)                        │   ║
║  └──────────────────────────────────────────────────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 3 — READINESS AND SIGN-OFF                                                  ║
║                                                                                      ║
║  ┌──────────────────────────────────────┐  ┌───────────────────────────────────┐   ║
║  │  UAT READINESS SCORE                 │  │  SIGN-OFF STATUS                  │   ║
║  │                                      │  │                                   │   ║
║  │  SCORE:   60 / 100                   │  │  0 of 11 signatures collected     │   ║
║  │  BAND:    AT RISK                    │  │                                   │   ║
║  │                                      │  │  [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] │   ║
║  │  [████████████░░░░░░░░░░░░░░░░░░░░] │  │                                   │   ║
║  │                                      │  │  ☐ UAT Coordinator        (§8.1) │   ║
║  │  A  Scenario execution:  11.4 / 20   │  │  ☐ HSE Process Owner       (§6)  │   ║
║  │  B  Pass rate:           21.9 / 25   │  │  ☐ Participant — GA        (§7)  │   ║
║  │  C  Defect health:       26.0 / 30   │  │  ☐ Participant — Admin     (§7)  │   ║
║  │  D  Exit criteria:        4.5 / 15   │  │  ☐ Participant — SR        (§7)  │   ║
║  │  E  Sign-off progress:    0.0 / 10   │  │  ☐ Participant — IH        (§7)  │   ║
║  │                                      │  │  ☐ Participant — SM        (§7)  │   ║
║  │  AT RISK: 2 open Mediums reduce C.   │  │  ☐ Participant — User      (§7)  │   ║
║  │  Resolve DEF-002/003 Day 3 to reach  │  │  ☐ IT Representative      (§11) │   ║
║  │  CONDITIONAL band by Day 3 close.   │  │  ☐ Business Sponsor       (§12) │   ║
║  └──────────────────────────────────────┘  │  ☐ Project Sponsor        (§13) │   ║
║                                            └───────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 4 — SCENARIO EXECUTION STATUS                                               ║
║                                                                                      ║
║  ┌───────┬────────────────────────────────────┬──────────┬──────────────────────┐  ║
║  │ Ref   │ Title                              │ Status   │ Notes                │  ║
║  ├───────┼────────────────────────────────────┼──────────┼──────────────────────┤  ║
║  │ SCN-01│ New Chemical Submission            │ PASS     │                      │  ║
║  │ SCN-02│ Safety Review Approval             │ PASS     │                      │  ║
║  │ SCN-03│ Return for Revision & Resubmit     │ PASS     │ Retested — DEF-001   │  ║
║  │ SCN-04│ Full Approval Chain                │ PASS     │                      │  ║
║  │ SCN-05│ Rejection Workflow                 │ PASS     │                      │  ║
║  │ SCN-06│ My Requests — Tracking & Grouping  │ PASS     │                      │  ║
║  │ SCN-07│ Master Sheet Browsing              │ PASS     │                      │  ║
║  │ SCN-08│ Manufacturer Management            │ IN PROG  │ Session continues AM │  ║
║  │ SCN-09│ Storage Location Management        │ PENDING  │                      │  ║
║  │ SCN-10│ User Management                    │ PENDING  │                      │  ║
║  │ SCN-11│ Language Toggle EN / FR            │ FAIL     │ DEF-002 open (Medium)│  ║
║  │ SCN-12│ Role-Based Visibility              │ PENDING  │                      │  ║
║  │ SCN-13│ Session Continuity                 │ PENDING  │                      │  ║
║  │ SCN-14│ Dashboard and Navigation           │ PENDING  │                      │  ║
║  └───────┴────────────────────────────────────┴──────────┴──────────────────────┘  ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 5 — ACTIVE DEFECT SLA TRACKER                                               ║
║                                                                                      ║
║  ┌─────────┬──────────┬──────┬───────────────────┬────────────────────┬───────────┐ ║
║  │ ID      │ Severity │ Pri  │ Logged            │ SLA deadline       │ Status    │ ║
║  ├─────────┼──────────┼──────┼───────────────────┼────────────────────┼───────────┤ ║
║  │ DEF-002 │ Medium   │ P2   │ 2026-06-09 11:00  │ 2026-06-12 11:00   │ IN PROG   │ ║
║  │ DEF-003 │ Medium   │ P3   │ 2026-06-09 14:30  │ 2026-06-12 14:30   │ APPROVED  │ ║
║  └─────────┴──────────┴──────┴───────────────────┴────────────────────┴───────────┘ ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 6 — EXIT CRITERIA TRACKER                                                   ║
║                                                                                      ║
║  ┌──────┬────────────────────────────────────────┬───────────┬─────────┬────────┐  ║
║  │ EX-01│ All scenarios executed                 │ 14 / 14   │  8 / 14 │  ☐     │  ║
║  │ EX-02│ Scenario pass rate                     │ ≥ 93%     │   88%   │  ☐     │  ║
║  │ EX-03│ Zero open Critical defects             │ 0         │    0    │  ✅    │  ║
║  │ EX-04│ Zero open High defects                 │ 0         │    0    │  ✅    │  ║
║  │ EX-05│ Medium defects resolved or waived      │ 0 open    │    2    │  ☐     │  ║
║  │ EX-06│ Participant feedback forms             │ 6 / 6     │  0 / 6  │  ☐     │  ║
║  │ EX-07│ HSE Process Owner confirmation         │ Signed    │  ☐      │  ☐     │  ║
║  │ EX-08│ Participant sign-offs                  │ 6 / 6     │  0 / 6  │  ☐     │  ║
║  │ EX-09│ UAT-TEST-REPORT.md complete            │ Approved  │  ☐      │  ☐     │  ║
║  │ EX-10│ Project Sponsor acceptance             │ Signed    │  ☐      │  ☐     │  ║
║  └──────┴────────────────────────────────────────┴───────────┴─────────┴────────┘  ║
║  Exit criteria met: 3 / 10                                                           ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║  END OF REPORT — 2026-06-09  17:00                                                   ║
╚══════════════════════════════════════════════════════════════════════════════════════╝

READINESS SCORE CALCULATION
──────────────────────────────────────────────
A  (8 ÷ 14) × 20             =  11.4
B  (7 ÷ 8)  × 25             =  21.9
C  30 − 0 − 0 − (2×2) − 0   =  26.0
D  (2 ÷ 10) × 15             =   3.0   ← EX-03 and EX-04 met (2 criteria)
E  (0 ÷ 11) × 10             =   0.0
TOTAL                        =  62.3   → AT RISK
──────────────────────────────────────────────
```

> **Coordinator note:** AT RISK is expected at Day 2 mid-point with 6 scenarios remaining and 2 open Mediums. No Critical or High defects — the hard stops are clear. Day 3 plan: complete SCN-08 through SCN-14, retest DEF-002 and DEF-003 after morning fixes, collect feedback forms from Day 1–2 participants. If all goes to plan, score reaches CONDITIONAL (≥ 70) by end of Day 3.

---

### Sample C — Day 4 Sign-off Ready (GO State)

*Context: All 14 scenarios executed. DEF-002 fixed and retested PASS. DEF-003 formally deferred with waiver. 2 Low defects accepted for next sprint. 9 of 10 signatures collected — Project Sponsor signing today.*

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║  TPC eSolutions — UAT COMMAND CENTER             Safety Data Management Module       ║
║  Report date:  2026-06-11  10:30         Day 4 of 4    Reported by: [Coordinator]   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  OVERALL STATUS                                                                      ║
║  ┌─────────────────────────────────────────────────────────────────────────────┐    ║
║  │                                                                             │    ║
║  │   ✅ ON TRACK — SIGN-OFF IN PROGRESS                                        │    ║
║  │                                                                             │    ║
║  │   "All 14 scenarios executed: 13 PASS, 1 FAIL (SCN-11 FR mode —             │    ║
║  │    DEF-002 closed, reclassified PASS after retest). DEF-003 formally        │    ║
║  │    deferred with waiver. Zero Critical and High open. 10 of 11 signatures   │    ║
║  │    collected. Awaiting Project Sponsor signature for final GO decision."    │    ║
║  │                                                                             │    ║
║  └─────────────────────────────────────────────────────────────────────────────┘    ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 1 — EXECUTION PROGRESS                                                      ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  ║
║  │  UAT PROGRESS    │  │  EXECUTED        │  │  PASSED          │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │     100 %  ✅    │  │   14   of  14 ✅  │  │   14   of  14 ✅  │                 ║
║  │                  │  │                  │  │                  │                  ║
║  │  [████████████]  │  │  Target: 14/14 ✅ │  │  Target: ≥ 13 ✅ │                 ║
║  │                  │  │                  │  │  Pass rate: 100% │                  ║
║  └──────────────────┘  └──────────────────┘  └──────────────────┘                  ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐                                         ║
║  │  FAILED          │  │  BLOCKED         │                                         ║
║  │                  │  │                  │                                         ║
║  │       0   ✅     │  │       0   ✅     │                                         ║
║  │                  │  │                  │                                         ║
║  │  (SCN-11 retested│  │  Target: 0 ✅    │                                         ║
║  │   → reclassified │  │                  │                                         ║
║  │   PASS)          │  │                  │                                         ║
║  └──────────────────┘  └──────────────────┘                                         ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 2 — DEFECT HEALTH                                                           ║
║                                                                                      ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  ║
║  │  OPEN DEFECTS    │  │  CRITICAL        │  │  HIGH            │                  ║
║  │  (active states) │  │  (SEV-1)         │  │  (SEV-2)         │                  ║
║  │                  │  │                  │  │                  │                  ║
║  │       2   ⚠️     │  │       0   ✅     │  │       0   ✅     │                  ║
║  │  (2 Low — accptd)│  │                  │  │                  │                  ║
║  │  Closed:   2     │  │  TARGET: 0 ✅    │  │  TARGET: 0 ✅    │                  ║
║  │  Deferred: 1     │  │                  │  │                  │                  ║
║  └──────────────────┘  └──────────────────┘  └──────────────────┘                  ║
║                                                                                      ║
║  ┌──────────────────────────────────────────────────────────────────────────────┐   ║
║  │  DEFECT DISTRIBUTION                                                         │   ║
║  │                                                                              │   ║
║  │  Critical (SEV-1)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]  ✅                       │   ║
║  │  High     (SEV-2)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]  ✅                       │   ║
║  │  Medium   (SEV-3)  0  [░░░░░░░░░░░░░░░░░░░░░░░░]  ✅ (DEF-003 deferred)    │   ║
║  │  Low      (SEV-4)  2  [████░░░░░░░░░░░░░░░░░░░░]  accepted for next sprint  │   ║
║  │                                                                              │   ║
║  │  Retest pass rate: 100%  (2 retests — DEF-001: PASS, DEF-002: PASS)         │   ║
║  │  SLA compliance:   100%  (all defects resolved within SLA)                  │   ║
║  └──────────────────────────────────────────────────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 3 — READINESS AND SIGN-OFF                                                  ║
║                                                                                      ║
║  ┌──────────────────────────────────────┐  ┌───────────────────────────────────┐   ║
║  │  UAT READINESS SCORE                 │  │  SIGN-OFF STATUS                  │   ║
║  │                                      │  │                                   │   ║
║  │  SCORE:   93 / 100                   │  │  10 of 11 signatures collected    │   ║
║  │  BAND:    READY  ✅                  │  │                                   │   ║
║  │                                      │  │  [████████████████████████░░░░░] │   ║
║  │  [███████████████████████░░░░░░░░░] │  │                                   │   ║
║  │                                      │  │  ✅ UAT Coordinator        (§8.1) │   ║
║  │  A  Scenario execution:  20.0 / 20   │  │  ✅ HSE Process Owner       (§6)  │   ║
║  │  B  Pass rate:           25.0 / 25   │  │  ✅ Participant — GA        (§7)  │   ║
║  │  C  Defect health:       29.0 / 30   │  │  ✅ Participant — Admin     (§7)  │   ║
║  │  D  Exit criteria:       13.5 / 15   │  │  ✅ Participant — SR        (§7)  │   ║
║  │  E  Sign-off progress:    9.1 / 10   │  │  ✅ Participant — IH        (§7)  │   ║
║  │                                      │  │  ✅ Participant — SM        (§7)  │   ║
║  │  READY — GO ELIGIBLE.                │  │  ✅ Participant — User      (§7)  │   ║
║  │  1 point lost in C (2 Low open).     │  │  ✅ IT Representative      (§11) │   ║
║  │  1.5 pts lost in D (EX-10 pending).  │  │  ✅ Business Sponsor       (§12) │   ║
║  │  0.9 pt lost in E (sponsor pending). │  │  ☐ Project Sponsor        (§13) │   ║
║  └──────────────────────────────────────┘  │    ← PENDING — signing today     │   ║
║                                            └───────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 4 — SCENARIO EXECUTION STATUS                                               ║
║                                                                                      ║
║  ┌───────┬────────────────────────────────────┬──────────┬──────────────────────┐  ║
║  │ SCN-01│ New Chemical Submission            │ PASS     │                      │  ║
║  │ SCN-02│ Safety Review Approval             │ PASS     │                      │  ║
║  │ SCN-03│ Return for Revision & Resubmit     │ PASS     │ Retested Day 2       │  ║
║  │ SCN-04│ Full Approval Chain                │ PASS     │                      │  ║
║  │ SCN-05│ Rejection Workflow                 │ PASS     │                      │  ║
║  │ SCN-06│ My Requests — Tracking & Grouping  │ PASS     │                      │  ║
║  │ SCN-07│ Master Sheet Browsing              │ PASS     │                      │  ║
║  │ SCN-08│ Manufacturer Management            │ PASS     │                      │  ║
║  │ SCN-09│ Storage Location Management        │ PASS     │                      │  ║
║  │ SCN-10│ User Management                    │ PASS     │                      │  ║
║  │ SCN-11│ Language Toggle EN / FR            │ PASS     │ Retested Day 3       │  ║
║  │ SCN-12│ Role-Based Visibility              │ PASS     │                      │  ║
║  │ SCN-13│ Session Continuity                 │ PASS     │                      │  ║
║  │ SCN-14│ Dashboard and Navigation           │ PASS     │                      │  ║
║  └───────┴────────────────────────────────────┴──────────┴──────────────────────┘  ║
║  14 / 14 PASS  ✅                                                                    ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 5 — ACTIVE DEFECT SLA TRACKER                                               ║
║                                                                                      ║
║  ┌──────────────────────────────────────────────────────────────────────────────┐   ║
║  │  DEF-004  Low  P4  Logged 2026-06-10  Accepted for next sprint               │   ║
║  │  DEF-005  Low  P4  Logged 2026-06-10  Accepted for next sprint               │   ║
║  │  No Critical, High, or Medium defects in active SLA tracking.               │   ║
║  └──────────────────────────────────────────────────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                      ║
║  SECTION 6 — EXIT CRITERIA TRACKER                                                   ║
║                                                                                      ║
║  ┌──────┬────────────────────────────────────────┬───────────┬──────────┬───────┐  ║
║  │ EX-01│ All scenarios executed                 │ 14 / 14   │ 14 / 14  │  ✅   │  ║
║  │ EX-02│ Scenario pass rate                     │ ≥ 93%     │   100%   │  ✅   │  ║
║  │ EX-03│ Zero open Critical defects             │ 0         │    0     │  ✅   │  ║
║  │ EX-04│ Zero open High defects                 │ 0         │    0     │  ✅   │  ║
║  │ EX-05│ Medium defects resolved or waived      │ 0 open    │ 0 (1 def)│  ✅   │  ║
║  │ EX-06│ Participant feedback forms             │ 6 / 6     │  6 / 6   │  ✅   │  ║
║  │ EX-07│ HSE Process Owner confirmation         │ Signed    │  ✅      │  ✅   │  ║
║  │ EX-08│ Participant sign-offs                  │ 6 / 6     │  6 / 6   │  ✅   │  ║
║  │ EX-09│ UAT-TEST-REPORT.md complete            │ Approved  │  ✅      │  ✅   │  ║
║  │ EX-10│ Project Sponsor acceptance             │ Signed    │  PENDING │  ☐    │  ║
║  └──────┴────────────────────────────────────────┴───────────┴──────────┴───────┘  ║
║  Exit criteria met: 9 / 10  — awaiting EX-10 (Project Sponsor signature)            ║
║                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║  END OF REPORT — 2026-06-11  10:30                                                   ║
╚══════════════════════════════════════════════════════════════════════════════════════╝

READINESS SCORE CALCULATION
──────────────────────────────────────────────
A  (14 ÷ 14) × 20            =  20.0
B  (14 ÷ 14) × 25            =  25.0
C  30 − 0 − 0 − 0 − (2×0.5) =  29.0
D  (9 ÷ 10)  × 15            =  13.5   ← EX-01 to EX-09 met; EX-10 pending
E  (10 ÷ 11) × 10           =   9.1
TOTAL                        =  96.6   → READY ✅
──────────────────────────────────────────────

GO DECISION STATUS
──────────────────────────────────────────────
Hard stop — Critical open:    0  ✅
Hard stop — High open:        0  ✅
Pass rate:                  100% ✅  (≥ 93% threshold met)
Medium waivers:         DEF-003 waiver signed by Project Sponsor in SIGNOFF §5  ✅
Remaining:              Project Sponsor signature on SIGNOFF §8.2
──────────────────────────────────────────────
ELIGIBLE FOR:  GO  (pending final signature)
──────────────────────────────────────────────
```

> **Coordinator note:** Score 96.5 / READY. All hard stops clear. All exit criteria met except EX-10 (Project Sponsor signature — scheduled for today). On receipt of §8.2 signature, UAT is formally closed with a full GO decision. Score will reach 100 on final signature.

---

*Document ref: TPC-ESOL-UAT-CC-001 v1.0 | Classification: INTERNAL — CONTROLLED*
*Retain for a minimum of 3 years as part of the project audit trail.*
*All changes to this document during the UAT window must be version-controlled and re-circulated.*
