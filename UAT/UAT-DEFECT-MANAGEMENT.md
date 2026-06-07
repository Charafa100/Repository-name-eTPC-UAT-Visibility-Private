# UAT Defect Management Process
## TPC eSolutions — Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-DMP-001 |
| **Version** | 1.0 |
| **Status** | APPROVED FOR UAT |
| **Classification** | INTERNAL — CONTROLLED |
| **Prepared by** | eTPC Development Team |
| **Issue date** | 2026-06-05 |

---

## Document Control

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-06-05 | eTPC Dev Team | Initial release — approved for UAT execution |

---

## Related Documents

| Document | Ref | Purpose |
|---|---|---|
| UAT Execution Plan | TPC-ESOL-UAT-001 | Master test plan — scenarios, entry/exit criteria, schedule |
| UAT Defect Log | UAT-DEFECTS.md | Active defect register — log all defects here |
| UAT Defect Template | UAT-DEFECT-TEMPLATE.md | Defect recording template for all severity levels |
| UAT Triage Guide | UAT-TRIAGE-GUIDE.md | Daily triage meeting agenda, roles, decision criteria |
| UAT Kickoff Package | UAT-KICKOFF-PACKAGE.md | Business user guide — severity definitions in plain language |
| UAT Sign-Off | UAT-SIGNOFF.md | Acceptance and GO / NO GO decision record |

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Severity Levels](#2-severity-levels)
3. [Defect Lifecycle](#3-defect-lifecycle)
4. [UAT Dashboard Metrics](#4-uat-dashboard-metrics)
5. [UAT Exit Criteria](#5-uat-exit-criteria)

---

## 1. Purpose

This document defines the complete defect management process for the UAT of the TPC eSolutions Safety Data Management module. It governs how defects are classified, recorded, triaged, resolved, retested, and used to make the final GO / NO GO acceptance decision.

All participants — testers, the UAT Coordinator, the Development Lead, and the Project Sponsor — must operate within this process for the duration of the UAT window.

---

## 2. Severity Levels

### 2.1 Severity Classification Matrix

| Severity | Code | Workflow blocked? | Data at risk? | Workaround acceptable? | Fix required before sign-off? |
|---|---|---|---|---|---|
| Critical | SEV-1 | Yes — completely | Possibly | No | Yes — UAT suspended until fixed |
| High | SEV-2 | Partially | No | No | Yes |
| Medium | SEV-3 | No | No | Yes | Yes — or formally waived |
| Low | SEV-4 | No | No | Yes | No — deferred to next sprint acceptable |

---

### 2.2 SEV-1 — Critical

#### Definition

A Critical defect completely prevents a business workflow from being executed. No acceptable workaround exists. The defect may also include data loss, data corruption, or a breach of access controls. UAT is suspended for all affected scenarios until the defect is resolved and verified.

A single open Critical defect at sign-off time is an **automatic NO GO** with no exceptions.

#### Examples

| Example | Why Critical |
|---|---|
| Clicking Submit on the New Chemical form creates no request | Core workflow completely blocked — submitters cannot proceed at all |
| All submitted requests disappear after a browser page refresh | Data loss — all UAT work since last reset is destroyed |
| The Approve button in the request drawer does nothing | Entire approval workflow blocked — no request can advance through any stage |
| A Field User can access the Approvals inbox and action requests | Security boundary breached — access control is not enforced |
| The application fails to load past the splash screen | All testing blocked |

#### Business Impact

Complete operational failure. If this were the live system, no chemical requests could be submitted, reviewed, or approved. HSE workflows would revert to manual processes with no digital record. Potential compliance and safety risk.

#### Target Resolution Time

| Milestone | Time |
|---|---|
| UAT Coordinator notifies Dev Lead | Immediately on log |
| UAT Coordinator notifies Project Sponsor | Within 1 hour of log |
| Affected scenarios suspended | Immediately |
| Fix deployed to UAT environment | Within **4 hours** of log |
| Retest completed by UAT Coordinator | Within **2 hours** of fix deployment |

If the 4-hour fix SLA is not met, the UAT Coordinator must escalate to the Project Sponsor with a written root cause and revised ETA from the Development Lead.

#### Escalation Path

```
SEV-1 logged
     │
     ▼ Immediate
UAT Coordinator suspends affected scenarios
     │
     ▼ Within 1 hour
UAT Coordinator notifies Project Sponsor in writing
Dev Lead notified — 4-hour SLA clock starts
     │
     ├──► Fix deployed within 4 hours
     │         │
     │         ▼ UAT Coordinator assigns retest (2-hour window)
     │         └──► Retest PASS → Resume suspended scenarios
     │
     └──► 4-hour SLA missed
               │
               ▼
          UAT Coordinator issues written escalation to Project Sponsor
          Dev Lead provides: root cause, revised ETA, interim workaround if any
          Project Sponsor decides: extend UAT window or invoke NO GO
```

---

### 2.3 SEV-2 — High

#### Definition

A High defect causes a major feature to fail or produce an incorrect result. A workaround may exist but it is not acceptable for a system that is going into production. UAT continues on unaffected scenarios, but all High defects must be fixed and verified before the sign-off process can begin.

A single open High defect at sign-off time is an **automatic NO GO** with no exceptions.

#### Examples

| Example | Why High |
|---|---|
| After a reviewer returns a request, resubmission routes to Stage 1 instead of the revision stage | Incorrect business logic — prior approvals are effectively lost |
| The approval timeline in the request drawer shows the wrong reviewer name or wrong stage | Incorrect audit record — the record cannot be trusted |
| The Approvals inbox shows requests that are not at the reviewer's assigned stage | Reviewer is presented with requests they should not be able to action |
| The eSDS attachment is not saved in the request payload after submission | Key safety document silently dropped — compliance risk |
| French mode causes a workflow action (e.g. Return, Approve) to fail | Core workflow broken for French-language users |
| A rejected request shows a Resubmit button | Submitter can attempt to resubmit a terminally closed request |

#### Business Impact

A significant portion of the Safety Data workflow is impaired or produces unreliable results. The affected workflow cannot be trusted for production use in its current state. Depending on the specific defect, there may be compliance or audit trail implications.

#### Target Resolution Time

| Milestone | Time |
|---|---|
| UAT Coordinator logs defect | Within 4 hours of observation |
| Joint triage (UAT Coordinator + Dev Lead) | Within 4 hours of log |
| Fix deployed to UAT environment | Within **24 hours** of log |
| Retest completed | Within **4 hours** of fix deployment |

If the 24-hour SLA is not met, the UAT Coordinator notifies the Project Sponsor with a revised ETA and any impact on the UAT schedule.

#### Escalation Path

```
SEV-2 logged
     │
     ▼ Within 4 hours
Joint triage — UAT Coordinator + Dev Lead confirm severity
24-hour SLA clock starts
     │
     ├──► Fix deployed within 24 hours
     │         │
     │         ▼ Retest within 4 hours of fix
     │         └──► Retest PASS → CLOSED. Sign-off unblocked for this defect.
     │
     └──► 24-hour SLA missed
               │
               ▼
          UAT Coordinator notifies Project Sponsor
          Dev Lead provides revised ETA in writing
          Project Sponsor assesses UAT schedule impact
```

---

### 2.4 SEV-3 — Medium

#### Definition

A Medium defect causes a feature to behave incorrectly or inconsistently, but a practical workaround exists that allows the tester to continue. UAT is not suspended. Medium defects must be resolved before sign-off, or formally accepted with a written waiver countersigned by the Project Sponsor.

#### Examples

| Example | Why Medium |
|---|---|
| French mode leaves a subset of UI labels untranslated | Functional in both languages — incorrect presentation only |
| The manufacturer form accepts submission with an invalid email format | Validation gap — data quality risk, not a workflow block |
| A Store Manager sees a navigation item they should not (but cannot action it) | Access control display gap — no security breach as the page is inaccessible |
| A GHS pictogram does not render at correct size on a specific browser | Partial display failure — hazard data is still present |
| The deactivation countdown timer resets to 3 seconds instead of counting down correctly | Cosmetically wrong but the action still completes correctly |
| Dashboard statistics do not reflect newly submitted requests | Display accuracy only — no functional workflow impact |

#### Business Impact

A specific feature is degraded or inaccurate. The impact is contained — other workflows are not affected. In a production environment this would create minor friction, potential data quality issues, or user confusion, but would not prevent core operations.

#### Target Resolution Time

| Milestone | Time |
|---|---|
| UAT Coordinator logs defect | Within 4 hours of observation |
| Joint triage | Within 4 hours of log |
| Fix deployed to UAT environment | Within **3 business days** of log |
| Retest completed | At the **next scheduled UAT session** after fix |

If a Medium defect cannot be resolved within the UAT window, it may be formally deferred with a waiver. See Section 5.3.

#### Escalation Path

```
SEV-3 logged
     │
     ▼ Within 4 hours
Joint triage — UAT Coordinator + Dev Lead confirm severity
3-business-day SLA clock starts
     │
     ├──► Fix deployed within 3 days
     │         │
     │         ▼ Retest at next UAT session
     │         └──► Retest PASS → CLOSED
     │
     └──► Cannot be fixed within UAT window
               │
               ▼
          UAT Coordinator drafts formal waiver entry in UAT-SIGNOFF.md §5
          Dev Lead assigns waived item to a named target sprint
          Project Sponsor countersigns waiver before sign-off proceeds
```

---

### 2.5 SEV-4 — Low

#### Definition

A Low defect is a cosmetic, typographic, minor layout, or minor UX issue with no functional impact on any workflow. UAT is not affected. Low defects may be resolved in the next development sprint or formally accepted at sign-off without a waiver.

#### Examples

| Example | Why Low |
|---|---|
| A column heading is misaligned by a few pixels | Visual only — no functional impact |
| A tooltip contains a spelling or grammatical error | Text quality — no functional impact |
| A button label uses incorrect capitalisation | Presentation only |
| A section divider line is the wrong colour in dark mode | Theme cosmetic only |
| A success toast message has a trailing space | Text quality — no functional impact |
| An icon is slightly smaller than the design specification | Visual only |

#### Business Impact

No functional or operational impact. End users may notice minor visual inconsistencies but no workflow is impaired and no data is affected.

#### Target Resolution Time

| Milestone | Time |
|---|---|
| UAT Coordinator logs defect | Within 4 hours of observation (or batched at end of day) |
| Joint triage | Can be deferred to next daily triage meeting |
| Fix deployed | **Next development sprint** after UAT — not during the UAT window |
| Retest | At sign-off review or in the next sprint |

Low defects do not block sign-off and do not require a formal waiver.

#### Escalation Path

Low defects follow the standard lifecycle. There is no escalation path for Low defects unless their volume is unexpectedly high (more than 15 Low defects open at sign-off), in which case the UAT Coordinator flags the pattern to the Project Sponsor as a quality observation.

---

## 3. Defect Lifecycle

### 3.1 State Definitions

| State | Who sets it | Meaning |
|---|---|---|
| **New** | UAT Coordinator | Defect has been logged in UAT-DEFECTS.md. No triage has occurred yet. |
| **Under Review** | UAT Coordinator | Triage is in progress. UAT Coordinator and Dev Lead are jointly reviewing. |
| **Approved** | UAT Coordinator | Triage complete — confirmed as a genuine defect. Severity assigned. Awaiting developer assignment. |
| **In Progress** | Dev Lead | Developer has been assigned and is actively working on the fix. |
| **Ready for Retest** | Dev Lead | Fix has been deployed to the UAT environment. Developer has confirmed the fix. Retest not yet started. |
| **Closed** | UAT Coordinator | Retest completed and passed. Defect is resolved. Only the UAT Coordinator may set this state. |
| **Rejected** | UAT Coordinator | Triage determined this is not a defect — it is expected behaviour, a known deferred item, or out of scope. Requires agreement from both UAT Coordinator and Dev Lead. |
| **Deferred** | UAT Coordinator + Project Sponsor | Confirmed defect that will not be fixed during the UAT window. Formal waiver required in UAT-SIGNOFF.md §5. Assigned to a named future sprint. |

---

### 3.2 Lifecycle State Machine

```
                        ┌─────────────────┐
  Tester finds issue ──►│      NEW        │
                        └────────┬────────┘
                                 │ UAT Coordinator logs within 4h
                                 ▼
                        ┌─────────────────┐
                        │  UNDER REVIEW   │◄── Joint triage begins
                        └────────┬────────┘
                                 │
                   ┌─────────────┼──────────────┐
                   │             │              │
                   ▼             ▼              ▼
          ┌──────────────┐ ┌──────────┐ ┌──────────────┐
          │   REJECTED   │ │ DEFERRED │ │   APPROVED   │
          │              │ │          │ │              │
          │ Not a defect │ │ Future   │ │ Confirmed.   │
          │ Out of scope │ │ sprint.  │ │ Severity     │
          │ Known item   │ │ Waiver   │ │ assigned.    │
          └──────────────┘ │ required │ └──────┬───────┘
                           └──────────┘        │ Dev Lead assigns developer
                                               ▼
                                      ┌─────────────────┐
                                      │   IN PROGRESS   │◄── SLA clock running
                                      └────────┬────────┘
                                               │ Fix deployed to UAT slot
                                               ▼
                                      ┌─────────────────┐
                                      │ READY FOR RETEST│◄── UAT Coordinator
                                      └────────┬────────┘    assigns retest
                                               │
                                  ┌────────────┴────────────┐
                                  │                         │
                                  ▼                         ▼
                           ┌──────────┐             ┌──────────────┐
                           │  CLOSED  │             │   REOPENED   │
                           │          │             │              │
                           │ Retest   │             │ Retest FAIL  │
                           │ PASS     │             │ → back to    │
                           │          │             │ IN PROGRESS  │
                           └──────────┘             └──────┬───────┘
                                                           │
                                                           ▼
                                                    SLA restarts from
                                                    original severity
```

---

### 3.3 State Transition Rules

| Transition | Permitted by | Condition |
|---|---|---|
| New → Under Review | UAT Coordinator | Triage session started |
| Under Review → Approved | UAT Coordinator + Dev Lead | Both agree it is a genuine defect |
| Under Review → Rejected | UAT Coordinator + Dev Lead | Both must agree — one party cannot reject unilaterally |
| Under Review → Deferred | UAT Coordinator + Project Sponsor | Severity confirmed, fix not feasible in UAT window, waiver drafted |
| Approved → In Progress | Dev Lead | Developer assigned |
| In Progress → Ready for Retest | Dev Lead | Fix deployed and confirmed by developer |
| Ready for Retest → Closed | UAT Coordinator only | Retest passed by original reporter or assigned tester |
| Ready for Retest → In Progress (reopen) | UAT Coordinator | Retest failed — SLA restarts |
| Any state → Deferred | UAT Coordinator + Project Sponsor | At any point if fix cannot be delivered in UAT window |

**Rule:** No defect may be marked Closed by anyone other than the UAT Coordinator.  
**Rule:** No defect may be marked Rejected without written agreement from both the UAT Coordinator and the Dev Lead.  
**Rule:** A Deferred defect requires a signed waiver in UAT-SIGNOFF.md §5 before sign-off proceeds.

---

### 3.4 Retest Rules

1. The original reporter is the preferred retest assignee. If unavailable, the UAT Coordinator assigns another tester in the same role.
2. The retest must follow the corrected reproduction steps recorded in the defect entry — not the original tester's memory.
3. A retest must verify the specific fix only. It must also confirm that no regression has been introduced to adjacent steps in the same scenario.
4. Retest results (PASS or FAIL, with notes) must be recorded in the defect entry in UAT-DEFECTS.md within the SLA window.
5. If a retest cannot be completed within the SLA (due to tester unavailability), the UAT Coordinator must notify the Project Sponsor.

---

## 4. UAT Dashboard Metrics

The UAT Coordinator updates these metrics in the daily status report and in the Exit Criteria tracker. All figures are drawn from UAT-DEFECTS.md.

### 4.1 Metric Definitions

| Metric | Definition | Source | Update frequency |
|---|---|---|---|
| **Total defects logged** | Count of all defect entries ever created, regardless of current state | UAT-DEFECTS.md — all DEF-xxx entries | Daily |
| **Open defects** | Count of defects in state: New, Under Review, Approved, In Progress, Ready for Retest | UAT-DEFECTS.md — active section | Daily |
| **Closed defects** | Count of defects in state: Closed | UAT-DEFECTS.md | Daily |
| **Rejected defects** | Count of defects in state: Rejected | UAT-DEFECTS.md | Daily |
| **Deferred defects** | Count of defects in state: Deferred | UAT-DEFECTS.md | Daily |
| **Open by severity — Critical** | Count of open defects with severity SEV-1 | UAT-DEFECTS.md | Real-time on discovery |
| **Open by severity — High** | Count of open defects with severity SEV-2 | UAT-DEFECTS.md | Real-time on discovery |
| **Open by severity — Medium** | Count of open defects with severity SEV-3 | UAT-DEFECTS.md | Daily |
| **Open by severity — Low** | Count of open defects with severity SEV-4 | UAT-DEFECTS.md | Daily |
| **Defects by module** | Count of open defects grouped by module area | UAT-DEFECTS.md — module field | Daily |
| **Retest pass rate** | (Retests that passed ÷ total retests conducted) × 100 | UAT-DEFECTS.md — retest result field | Daily |
| **SLA compliance rate** | (Defects fixed within SLA ÷ total defects fixed) × 100 | UAT-DEFECTS.md — logged date vs fixed date | Daily |
| **Days to close — average** | Average calendar days from New to Closed across all closed defects | UAT-DEFECTS.md — reported date vs closed date | At UAT close |

---

### 4.2 Daily Dashboard Template

Include this section in each daily status report (see UAT-EXECUTION-PLAN.md §11).

```
═══════════════════════════════════════════════════════════════
DEFECT DASHBOARD — [YYYY-MM-DD]
═══════════════════════════════════════════════════════════════

TOTALS
──────────────────────────────────────────────────────────────
Total logged (all time):          [N]
Open (all severities):            [N]     ← Must be 0 Crit / 0 High for sign-off
Closed:                           [N]
Rejected:                         [N]
Deferred:                         [N]

OPEN DEFECTS BY SEVERITY
──────────────────────────────────────────────────────────────
┌──────────────┬──────┬────────────────────────────────────┐
│ Severity     │ Open │ IDs                                │
├──────────────┼──────┼────────────────────────────────────┤
│ Critical     │  [N] │ DEF-xxx, DEF-xxx                   │
│ High         │  [N] │ DEF-xxx                            │
│ Medium       │  [N] │ DEF-xxx, DEF-xxx, DEF-xxx          │
│ Low          │  [N] │ DEF-xxx                            │
├──────────────┼──────┼────────────────────────────────────┤
│ TOTAL OPEN   │  [N] │                                    │
└──────────────┴──────┴────────────────────────────────────┘

OPEN DEFECTS BY MODULE
──────────────────────────────────────────────────────────────
┌──────────────────────────────┬──────┐
│ Module                       │ Open │
├──────────────────────────────┼──────┤
│ New Chemical — submission    │  [N] │
│ Approval workflow            │  [N] │
│ My Requests                  │  [N] │
│ Master Sheet                 │  [N] │
│ Manufacturers                │  [N] │
│ Storage locations            │  [N] │
│ User management              │  [N] │
│ Platform shell               │  [N] │
│ Language / localisation      │  [N] │
├──────────────────────────────┼──────┤
│ TOTAL                        │  [N] │
└──────────────────────────────┴──────┘

SLA STATUS
──────────────────────────────────────────────────────────────
┌─────────┬──────────┬─────────────┬──────────────┬──────────┐
│ ID      │ Severity │ Logged date │ SLA deadline │ Status   │
├─────────┼──────────┼─────────────┼──────────────┼──────────┤
│ DEF-xxx │ Critical │ [date]      │ [date+4h]    │ [status] │
│ DEF-xxx │ High     │ [date]      │ [date+24h]   │ [status] │
└─────────┴──────────┴─────────────┴──────────────┴──────────┘

RETEST METRICS
──────────────────────────────────────────────────────────────
Retests completed (all time):     [N]
Retest PASS:                      [N]
Retest FAIL (reopened):           [N]
Retest pass rate:                 [N]%   ← Target ≥ 85%

═══════════════════════════════════════════════════════════════
```

---

### 4.3 Metric Interpretation Guide

| Metric | Healthy signal | Warning signal | Action required |
|---|---|---|---|
| Open Critical | 0 | ≥ 1 | Immediate — suspend affected scenarios, escalate to Project Sponsor |
| Open High | 0 | ≥ 1 | Escalate to Dev Lead — 24h SLA clock running |
| Open Medium | ≤ 3 | 4–6 | Review triage backlog — consider sprint extension |
| Open Low | ≤ 8 | > 8 | Log pattern observation in daily report — no immediate action |
| Retest pass rate | ≥ 85% | 70–84% | Dev Lead reviews fix quality — are fixes introducing regressions? |
| Retest pass rate | — | < 70% | UAT Coordinator escalates to Project Sponsor — fix quality review required |
| SLA compliance | ≥ 90% | 75–89% | Dev Lead reviews capacity |
| SLA compliance | — | < 75% | Project Sponsor notified — capacity or scope discussion required |

---

## 5. UAT Exit Criteria

### 5.1 Exit Criteria Thresholds

All ten criteria below must be confirmed MET before the sign-off process begins. The UAT Coordinator is responsible for this assessment.

| Ref | Criterion | Threshold | Measurement |
|---|---|---|---|
| EX-01 | All 14 test scenarios executed | 14 / 14 | UAT-TEST-REPORT.md scenario table |
| EX-02 | Scenario pass rate | ≥ 93% (13 of 14) | UAT-TEST-REPORT.md |
| EX-03 | Open Critical defects | **Zero** | UAT-DEFECTS.md active log |
| EX-04 | Open High defects | **Zero** | UAT-DEFECTS.md active log |
| EX-05 | Medium defects unresolved and not waived | **Zero** | UAT-DEFECTS.md + UAT-SIGNOFF.md §5 |
| EX-06 | UAT participant feedback forms submitted | 6 / 6 | UAT-FEEDBACK.md forms collected |
| EX-07 | HSE Process Owner workflow confirmation | Signed | UAT-SIGNOFF.md §6 |
| EX-08 | UAT participant sign-offs | 6 / 6 | UAT-SIGNOFF.md §7 |
| EX-09 | UAT-TEST-REPORT.md completed and reviewed | Approved | UAT-TEST-REPORT.md |
| EX-10 | Project Sponsor acceptance | Signed | UAT-SIGNOFF.md §8 |

### 5.2 Maximum Allowed Open Defects at Sign-Off

| Severity | Maximum allowed open | Notes |
|---|---|---|
| Critical | **0** | Hard stop — automatic NO GO if any are open |
| High | **0** | Hard stop — automatic NO GO if any are open |
| Medium | **0 unwaived** | May be Deferred with formal waiver signed by Project Sponsor |
| Low | No limit | May be accepted or noted for next sprint — no sign-off block |

### 5.3 Waiver Process for Medium Defects

When a Medium defect cannot be resolved within the UAT window:

1. UAT Coordinator drafts a waiver entry for UAT-SIGNOFF.md §5 containing:
   - Defect ID and title
   - Description of the residual risk
   - Agreed workaround (if any)
   - Named owner responsible for the fix
   - Target sprint and target date
2. Dev Lead confirms the fix plan is realistic
3. Project Sponsor countersigns the waiver
4. The defect state is changed to **Deferred** in UAT-DEFECTS.md

A defect waived without Project Sponsor countersignature is not a valid waiver.

### 5.4 GO / NO GO Decision Process

```
All 10 exit criteria assessed by UAT Coordinator
              │
              ▼
   ┌──────────────────────────────────────┐
   │ Are EX-03 and EX-04 both met?        │
   │ (Zero Critical, Zero High open)       │
   └──────────────┬───────────────────────┘
                  │
        ┌─────────┴──────────┐
        │ NO                 │ YES
        ▼                    ▼
   ┌──────────┐   ┌──────────────────────────────────────┐
   │  NO GO   │   │ Is EX-02 met? (≥ 93% scenario pass)  │
   │          │   └──────────────┬───────────────────────┘
   │ Automatic│                  │
   │ — no     │        ┌─────────┴──────────┐
   │ exception│        │ NO                 │ YES
   └──────────┘        ▼                    ▼
                  ┌──────────────┐  ┌──────────────────────────────────┐
                  │ Is a waiver  │  │ Are EX-05 through EX-10 all met? │
                  │ agreed by    │  └──────────────┬───────────────────┘
                  │ Project      │                  │
                  │ Sponsor?     │        ┌─────────┴──────────┐
                  └──────┬───────┘        │ NO                 │ YES
                         │                ▼                    ▼
                  ┌──────┴────┐     ┌──────────┐        ┌──────────┐
                  │ NO  │ YES │     │ OPEN     │        │   GO     │
                  │     │     │     │ ITEMS    │        │          │
                  ▼     ▼     │     │ REMAIN   │        │ Project  │
               NO GO  COND.  │     │ Resolve  │        │ Sponsor  │
                      GO     │     │ or waive │        │ signs    │
                             │     └──────────┘        └──────────┘
                             ▼
                      CONDITIONAL GO
                      — conditions documented
                        in UAT-SIGNOFF.md
                      — Project Sponsor signs
```

### 5.5 Decision Outcomes

#### GO
All 10 exit criteria met with no outstanding conditions. System approved for production deployment. Project Sponsor signature on UAT-SIGNOFF.md §8 is the binding authority.

#### CONDITIONAL GO
All Critical and High defects are closed. One or more Medium defects are formally deferred with waivers countersigned by the Project Sponsor. Scenario pass rate is ≥ 93%. All other exit criteria met. Conditional GO is valid only with explicit written conditions documented in UAT-SIGNOFF.md.

#### NO GO
Issued automatically when any of the following are true at sign-off time:
- Any Critical defect is Open, In Progress, or Ready for Retest
- Any High defect is Open, In Progress, or Ready for Retest
- Scenario pass rate below 93% with no agreed conditional waiver
- HSE Process Owner has not signed
- Project Sponsor has not signed

A NO GO does not end the project. It identifies what must be resolved before UAT can be re-entered. The UAT Coordinator and Project Sponsor agree a remediation plan and a re-entry date.

### 5.6 Post-Sign-Off Actions

Upon Project Sponsor GO or CONDITIONAL GO signature:

| Action | Owner | Timing |
|---|---|---|
| Communicate outcome to all participants | UAT Coordinator | Same day |
| Archive all UAT-FEEDBACK.md forms | UAT Coordinator | Within 48 hours |
| Finalise and archive UAT-TEST-REPORT.md | UAT Coordinator | Within 48 hours |
| Merge `uat-feedback` into `master` (if any fixes were applied during UAT) | Dev Lead | Before production deployment |
| Tag production build | Dev Lead | Before production deployment |
| Execute production deployment | IT Representative | Per agreed deployment schedule |
| Close all Deferred items in sprint backlog | Dev Lead | Within 5 business days of GO |
| Post-go-live monitoring review | Project Sponsor | 2 weeks after launch |

---

*Document ref: TPC-ESOL-UAT-DMP-001 v1.0 | Classification: INTERNAL — CONTROLLED*
*Retain for a minimum of 3 years as part of the project audit trail.*
*All changes to this document during the UAT window must be version-controlled and re-circulated.*
