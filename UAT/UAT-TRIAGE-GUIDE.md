# UAT Triage Guide
## TPC eSolutions — Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-TG-001 |
| **Version** | 1.0 |
| **Classification** | INTERNAL — CONTROLLED |
| **Prepared by** | eTPC Development Team |
| **Issue date** | 2026-06-05 |

---

## Related Documents

| Document | Ref | Purpose |
|---|---|---|
| UAT Defect Management Process | UAT-DEFECT-MANAGEMENT.md | Master severity definitions, lifecycle, exit criteria |
| UAT Defect Template | UAT-DEFECT-TEMPLATE.md | Individual defect record format |
| UAT Defect Log | UAT-DEFECTS.md | Active defect register |
| UAT Execution Plan | TPC-ESOL-UAT-001 | Scenarios, schedule, roles |

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Daily Triage Meeting](#2-daily-triage-meeting)
3. [Roles and Responsibilities](#3-roles-and-responsibilities)
4. [Decision Criteria](#4-decision-criteria)
5. [Escalation Rules](#5-escalation-rules)
6. [Triage Meeting Log Template](#6-triage-meeting-log-template)

---

## 1. Purpose

This guide governs how defects reported during UAT are reviewed, classified, prioritised, and assigned. It defines the daily triage meeting format, clarifies who has authority over each decision, and provides explicit decision criteria so that triage is consistent and defensible regardless of who is present on a given day.

Triage is the control point between a tester reporting an observation and a developer starting work. A defect that is not triaged correctly — whether it is wrongly accepted, wrongly rejected, or wrongly classified — can either waste developer time or allow a genuine issue to reach production.

---

## 2. Daily Triage Meeting

### 2.1 Schedule

| Item | Detail |
|---|---|
| **Frequency** | Once per UAT day |
| **Time** | End of each UAT session day — after testers have completed their scenarios for the day |
| **Recommended time** | 16:30 local time (allows testers to complete afternoon sessions before the meeting) |
| **Duration** | 30 minutes maximum. If any single defect requires more than 10 minutes of discussion, escalate it to the Project Sponsor and park it — do not let it consume the full meeting. |
| **Location** | In-person preferred. Remote (Teams / video) acceptable. |
| **Quorum** | UAT Coordinator + Dev Lead. Both must be present. If either is unavailable, the meeting is rescheduled to the earliest possible time that day — never skipped. |

### 2.2 Meeting Agenda

The agenda is fixed. Do not extend it.

| # | Item | Time | Owner |
|---|---|---|---|
| 1 | Review new defects logged since last meeting — confirm IDs and completeness of records | 5 min | UAT Coordinator |
| 2 | Triage each new defect — apply the decision criteria in Section 4 | 15 min | UAT Coordinator + Dev Lead |
| 3 | Review In Progress defects — confirm SLA status and get updated ETAs from Dev Lead | 5 min | Dev Lead |
| 4 | Review Ready for Retest defects — assign retest owners and confirm timing | 3 min | UAT Coordinator |
| 5 | Update the dashboard metrics in UAT-DEFECTS.md | 2 min | UAT Coordinator |
| 6 | Confirm plan for next UAT day — scenarios, testers, known defect retests | 3 min | UAT Coordinator |
| 7 | Confirm any escalations required to Project Sponsor | 2 min | UAT Coordinator |

### 2.3 Mandatory Outputs

Every triage meeting must produce the following before participants leave:

- [ ] Every new defect has a confirmed state (Approved / Rejected / Deferred) and confirmed severity
- [ ] Every Approved defect has an assigned developer and a confirmed SLA deadline
- [ ] Every In Progress defect has a confirmed current ETA — if SLA is at risk, escalation is triggered before the meeting ends
- [ ] Every Ready for Retest defect has a named retest assignee and a retest window
- [ ] UAT-DEFECTS.md is updated with all state changes from this meeting
- [ ] The daily status report figures are ready for the UAT Coordinator to send

### 2.4 Unscheduled Triage (Critical and High Defects)

Critical and High defects must not wait for the daily meeting. When a tester reports a Critical or High observation:

1. The UAT Coordinator assesses the report immediately and logs it as New in UAT-DEFECTS.md
2. The UAT Coordinator contacts the Dev Lead directly — by phone or instant message — within 1 hour
3. An unscheduled triage call (15 minutes maximum) takes place to confirm severity and assign the defect
4. If both agree the defect is Critical, the UAT Coordinator suspends affected scenarios immediately and notifies the Project Sponsor in writing within 1 hour of logging
5. The unscheduled triage is recorded in UAT-DEFECTS.md under the defect's Triage Notes field

---

## 3. Roles and Responsibilities

### 3.1 Authority Matrix

| Decision | UAT Coordinator | Dev Lead | Project Sponsor | HSE Process Owner |
|---|---|---|---|---|
| Log a new defect | **Sole authority** | — | — | — |
| Propose severity | Tester proposes, UAT Coordinator confirms draft | Co-confirms at triage | — | Consulted for workflow defects |
| Confirm severity | **Joint authority** — must agree | **Joint authority** — must agree | — | — |
| Approve a defect (confirm it is genuine) | **Joint authority** | **Joint authority** | — | — |
| Reject a defect | **Joint authority** — both must agree | **Joint authority** — both must agree | — | — |
| Assign to developer | Recommends | **Final authority** | — | — |
| Set priority | Recommends | **Final authority** | — | — |
| Deploy a fix to UAT | Notified | Authorises | — | — |
| Change state to Ready for Retest | Notified | **Sole authority** | — | — |
| Assign retest | **Sole authority** | — | — | — |
| Mark Closed | **Sole authority** | — | — | — |
| Issue a formal waiver (Deferred) | Drafts | Confirms fix plan | **Countersigns** | — |
| Suspend UAT (Critical SLA breach) | **Sole authority** | Consulted | Notified | — |
| GO / NO GO decision | Issues recommendation | Consulted | **Sole authority** | Signs workflow section |

### 3.2 Responsibility Descriptions

#### UAT Coordinator

The UAT Coordinator is the process owner for defect management. All defect lifecycle actions flow through this role. The UAT Coordinator is **not** responsible for fixing defects — they are responsible for ensuring the process is followed correctly, records are accurate, and stakeholders are informed at the right time.

Specific responsibilities:
- Log all defects in UAT-DEFECTS.md within 4 hours of a tester report
- Chair every triage meeting and unscheduled triage call
- Confirm severity jointly with the Dev Lead
- Assign retest owners and track retest completion
- Mark defects Closed — no other role may do this
- Update the daily dashboard metrics
- Issue all escalation notifications to the Project Sponsor
- Maintain the defect register as the authoritative record

#### Development Lead

The Development Lead is the technical authority for defect analysis and resolution. They attend every triage meeting and are available for unscheduled triage on Critical and High defects.

Specific responsibilities:
- Confirm whether a reported issue is a genuine defect or expected behaviour
- Confirm severity jointly with the UAT Coordinator
- Assign defects to developers and set priority
- Provide root cause analysis within the SLA window
- Deploy fixes to the `uat-feedback` branch and notify the UAT Coordinator
- Change defect state to Ready for Retest after deployment confirmation
- Provide revised ETAs immediately if SLA is at risk
- Attend the unscheduled triage within 1 hour for Critical and High defects

#### Project Sponsor

The Project Sponsor is not involved in day-to-day triage. They are engaged when:
- A Critical defect is logged (notification within 1 hour)
- A Critical SLA (4 hours) is not met
- A High SLA (24 hours) is not met
- A Medium defect requires a formal waiver (Deferred)
- The scenario pass rate falls below 93%
- A NO GO decision is triggered

The Project Sponsor makes the final GO / NO GO decision and countersigns all formal waivers.

#### HSE Process Owner

The HSE Process Owner is consulted — not a decision-maker — when a defect relates to whether the approval workflow correctly reflects TPC operational procedure. The HSE Process Owner's input is particularly relevant for defects affecting:
- Stage sequencing (Safety Review → EMP Review → IH Review)
- Return for revision routing
- Rejection terminal state behaviour
- The request detail timeline record

---

## 4. Decision Criteria

### 4.1 Is This a Defect?

Apply the following criteria in order to determine whether a reported observation is a genuine defect.

```
Is the reported behaviour described in the test scenario
as an expected result that was NOT produced?
                    │
          ┌─────────┴──────────┐
          │ NO                 │ YES
          ▼                    ▼
Is the behaviour    ┌─────────────────────────────────────────┐
listed in OPEN-01   │ Is the behaviour listed in Section 5    │
through OPEN-08     │ of UAT-KICKOFF-PACKAGE.md (known        │
(Deferred items)?   │ deferred items OPEN-01 through OPEN-08)?│
          │         └──────────────────┬──────────────────────┘
          │                            │
     ┌────┴────┐                ┌──────┴──────┐
     │ YES     │ NO             │ YES         │ NO
     ▼         ▼                ▼             ▼
  REJECTED  Continue      REJECTED        Continue
  (Known    to next        (Known          to next
  deferred  question       deferred        question
  item)                    item)
```

```
Is the behaviour described in Section 13 of
UAT-KICKOFF-PACKAGE.md (What Is Not a Defect)?
                    │
          ┌─────────┴──────────┐
          │ YES                │ NO
          ▼                    ▼
       REJECTED         Is this in scope for this UAT cycle?
       (Expected         (See UAT-EXECUTION-PLAN.md §2.3
       behaviour)         Out of Scope section)
                                    │
                         ┌──────────┴──────────┐
                         │ NO (out of scope)   │ YES (in scope)
                         ▼                     ▼
                      REJECTED          ──► APPROVED
                      (Out of scope)         │
                                             ▼
                                      Assign severity
                                      (Section 4.2)
```

### 4.2 Severity Assignment Decision Tree

```
Can the tester complete ANY step of the affected scenario?
                    │
          ┌─────────┴──────────┐
          │ NO — completely     │ YES
          │ blocked             │
          ▼                     ▼
    Is there data loss,  Does the defect produce a
    data corruption, or  wrong result in core business
    a security breach?   logic (approval routing,
          │              stage advancement, data
          │              persistence, access control)?
          ▼                     │
     CRITICAL (SEV-1)   ┌───────┴───────┐
                        │ YES           │ NO
                        ▼               ▼
                   HIGH (SEV-2)  Is a workaround practical
                                 and acceptable for UAT
                                 (not for production)?
                                        │
                                ┌───────┴───────┐
                                │ YES           │ NO
                                ▼               ▼
                           MEDIUM (SEV-3)  HIGH (SEV-2)
                                 │
                                 ▼
                          Is the defect purely
                          cosmetic, textual, or
                          minor layout?
                                 │
                         ┌───────┴───────┐
                         │ YES           │
                         ▼
                     LOW (SEV-4)
```

### 4.3 Severity Boundary Cases

The following boundary cases are likely to arise during triage. Use these rulings as precedents.

| Situation | Correct severity | Rationale |
|---|---|---|
| A feature is broken for one role only but works for others | High if the broken role is a production role. Medium if the role is rarely used or the workaround is for another role to perform the same action. | Access to the feature determines severity, not the number of affected roles. |
| An intermittent defect that cannot be consistently reproduced | One severity level lower than the consistent equivalent would warrant. A High intermittent defect is treated as Medium. | Intermittent defects have lower business impact due to their unreliability, but must still be investigated. |
| A defect that is also present in a deferred / out-of-scope area | REJECTED — the in-scope behaviour works correctly. Log the deferred area observation as a note in the defect record for future reference. | Out-of-scope areas are not being validated in this UAT cycle. |
| French mode produces wrong data (not just wrong text) | High or Critical depending on whether the workflow is blocked. A translation error is Medium; a workflow failure in FR mode is held to the same standard as in EN mode. | Language is an in-scope feature; workflows must function identically in both languages. |
| A defect reproduces only with a specific pre-seeded demo record (CHM-154, CHM-155, CHM-156) | Treat as a standard in-scope defect. The pre-seeded records are authoritative UAT data. | Pre-seeded records are part of the official test data set. |
| A defect appears to be caused by a specific browser (not the required Edge) | REJECTED if reproducing only on an unsupported browser. Log as an observation. If reproducing on Edge (required), treat as standard. | UAT validates Edge (required) and Chrome (supported). Firefox and Safari are not in scope. |

### 4.4 Priority Assignment Guide

Priority is set by the Dev Lead and reflects the order of work — it is independent of severity.

| Situation | Recommended priority |
|---|---|
| Critical defect (any) | P1 — always |
| High defect blocking a tester who cannot continue | P1 |
| High defect on a later scenario that has not yet started | P2 |
| Medium defect affecting multiple testers or scenarios | P2 |
| Medium defect affecting one tester or one scenario | P3 |
| Low defect | P4 |
| Any defect where the Dev Lead has a fix ready and it is low-risk to deploy | Can be raised one level — developer capacity should not sit idle |
| Any defect reported by the HSE Process Owner as operationally significant | Can be raised one level regardless of technical severity |

---

## 5. Escalation Rules

### 5.1 Escalation Triggers and Actions

| Trigger | Who escalates | To whom | Within | Action required |
|---|---|---|---|---|
| SEV-1 logged | UAT Coordinator | Project Sponsor + Dev Lead | 1 hour | Written notification. UAT Coordinator suspends affected scenarios immediately. |
| SEV-1 fix SLA (4h) not met | UAT Coordinator | Project Sponsor | At SLA breach | Written escalation: root cause from Dev Lead, revised ETA, interim workaround if any. Project Sponsor decides whether to extend UAT window. |
| SEV-2 fix SLA (24h) not met | UAT Coordinator | Project Sponsor | At SLA breach | Written notification: revised ETA from Dev Lead, UAT schedule impact assessment. |
| Retest FAIL on SEV-1 or SEV-2 | UAT Coordinator | Dev Lead | Immediately | Defect reopened. SLA restarts from the re-open timestamp. Dev Lead provides updated root cause. |
| Retest FAIL on a defect that has failed retest more than once | UAT Coordinator | Project Sponsor | Same day | Pattern escalation: suggests a systemic issue in the fix approach. Dev Lead must provide written review of fix strategy. |
| Scenario pass rate falls below 93% | UAT Coordinator | Project Sponsor | Same-day report | UAT Coordinator assesses whether the failing scenario is a blocker for other scenarios. Project Sponsor decides on Conditional GO conditions. |
| More than 3 Medium defects open simultaneously | UAT Coordinator | Project Sponsor | Next daily report | Observation only — no immediate action. Project Sponsor assesses risk to exit date. |
| Dev Lead is unavailable for unscheduled triage (Critical/High) | UAT Coordinator | Project Sponsor | 1 hour of Dev Lead unavailability | Project Sponsor must provide an alternative technical contact or authorise UAT suspension until Dev Lead is available. |
| HSE Process Owner raises a concern that the approval workflow does not match TPC operational procedure | UAT Coordinator | Project Sponsor + Dev Lead | Immediately | This is a scope and requirements issue, not a standard defect. Must be assessed as a potential change request before any fix is designed. |

### 5.2 Escalation Communication Format

All escalations must be sent in writing (Teams / email) using the following format. Verbal escalations are not valid.

```
═══════════════════════════════════════════════════════════
TPC eSolutions UAT — ESCALATION NOTICE
═══════════════════════════════════════════════════════════

Date / Time:       [YYYY-MM-DD HH:MM]
From:              [UAT Coordinator name]
To:                [Project Sponsor name]
Copy:              [Dev Lead name]

Escalation type:   [SEV-1 LOG / SLA BREACH / RETEST FAILURE / SCHEDULE RISK]

─────────────────────────────────────────────────────────
DEFECT REFERENCE

Defect ID:         DEF-[NNN]
Title:             [Defect title]
Severity:          [Critical / High / Medium]
Current state:     [New / In Progress / Ready for Retest / etc.]
Scenario affected: SCN-[XX]
Impact:            [Scenarios suspended / UAT continuing / tester blocked]

─────────────────────────────────────────────────────────
SITUATION

[2–4 sentences describing what happened and when.]

─────────────────────────────────────────────────────────
CURRENT STATUS

Logged:            [YYYY-MM-DD HH:MM]
SLA deadline:      [YYYY-MM-DD HH:MM]
Time elapsed:      [N hours since log]
Dev Lead ETA:      [Latest ETA from Dev Lead, or "Not yet provided"]

─────────────────────────────────────────────────────────
ACTION REQUIRED FROM PROJECT SPONSOR

[Specific decision or acknowledgement required. E.g.:
 "Confirm whether to extend the UAT window by N hours."
 "Acknowledge receipt and confirm escalation path."
 "Approve waiver for DEF-NNN as Deferred item."]

─────────────────────────────────────────────────────────
INTERIM STATUS

[Current interim workaround if any, or "None available."]
[Effect on UAT schedule: "Day N delayed by N hours" or "No schedule impact."]

═══════════════════════════════════════════════════════════
```

### 5.3 Escalation Resolution

An escalation is resolved when:
- The Project Sponsor has responded in writing with the required decision
- The UAT Coordinator has updated UAT-DEFECTS.md with the escalation outcome
- The daily status report reflects the escalation and its resolution

Unresolved escalations must be carried forward in every subsequent daily report until formally closed.

---

## 6. Triage Meeting Log Template

Complete a meeting log entry in UAT-DEFECTS.md after every triage session. This provides an audit trail of all classification decisions.

```
─────────────────────────────────────────────────────────────
TRIAGE MEETING LOG — [YYYY-MM-DD]
─────────────────────────────────────────────────────────────

Meeting date:      [YYYY-MM-DD]
Meeting time:      [HH:MM – HH:MM]
Participants:      UAT Coordinator: [name]
                   Dev Lead: [name]
                   Others (if any): [name / role]

─────────────────────────────────────────────────────────────
NEW DEFECTS TRIAGED

┌─────────┬────────────────────────┬──────────┬──────┬────────────┬───────────────────────────┐
│ ID      │ Title                  │ Severity │ Pri  │ Decision   │ Assigned to               │
├─────────┼────────────────────────┼──────────┼──────┼────────────┼───────────────────────────┤
│ DEF-xxx │ [title]                │ High     │ P1   │ Approved   │ [developer name]          │
│ DEF-xxx │ [title]                │ Medium   │ P3   │ Approved   │ [developer name]          │
│ DEF-xxx │ [title]                │ Low      │ P4   │ Rejected   │ N/A — expected behaviour  │
└─────────┴────────────────────────┴──────────┴──────┴────────────┴───────────────────────────┘

─────────────────────────────────────────────────────────────
IN PROGRESS DEFECTS — SLA STATUS

┌─────────┬──────────┬──────────────┬──────────────┬──────────────────────────────────────────┐
│ ID      │ Severity │ SLA deadline │ Status       │ Dev Lead update                          │
├─────────┼──────────┼──────────────┼──────────────┼──────────────────────────────────────────┤
│ DEF-xxx │ High     │ [date/time]  │ On track     │ Fix ready by [time] — deploying tonight  │
│ DEF-xxx │ Medium   │ [date/time]  │ AT RISK      │ Root cause complex — new ETA [date]      │
└─────────┴──────────┴──────────────┴──────────────┴──────────────────────────────────────────┘

─────────────────────────────────────────────────────────────
READY FOR RETEST — ASSIGNMENTS

┌─────────┬──────────┬──────────────────────────┬──────────────────────────┐
│ ID      │ Severity │ Assigned to              │ Retest window            │
├─────────┼──────────┼──────────────────────────┼──────────────────────────┤
│ DEF-xxx │ High     │ [tester name]            │ [date] morning session   │
└─────────┴──────────┴──────────────────────────┴──────────────────────────┘

─────────────────────────────────────────────────────────────
ESCALATIONS FROM THIS MEETING

[ ] None required
[ ] Escalation issued to Project Sponsor — ref: [description]

─────────────────────────────────────────────────────────────
NEXT SESSION PLAN

Scenarios:         [SCN-XX, SCN-XX, ...]
Testers:           [names and roles]
Priority retests:  [DEF-xxx, ...]
Session start:     [HH:MM]

─────────────────────────────────────────────────────────────
Meeting log recorded by: [UAT Coordinator name] — [YYYY-MM-DD HH:MM]
─────────────────────────────────────────────────────────────
```

---

*Document ref: TPC-ESOL-UAT-TG-001 v1.0 | Classification: INTERNAL — CONTROLLED*
*Retain for a minimum of 3 years as part of the project audit trail.*
*All changes to this document during the UAT window must be version-controlled and re-circulated.*
