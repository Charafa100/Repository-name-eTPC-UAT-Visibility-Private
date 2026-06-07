# TPC eSolutions — UAT Kickoff Package
## Safety Data Management Module

---

| | |
|---|---|
| **Project** | TPC eSolutions — Enterprise Platform |
| **Module** | Safety Data Management |
| **Document ref** | TPC-ESOL-UAT-KO-001 |
| **Version** | 1.0 |
| **Classification** | INTERNAL — FOR UAT PARTICIPANTS |
| **Issued by** | eTPC Development Team |
| **Issue date** | 2026-06-05 |
| **UAT window** | TBC — see Section 7 |

---

## A Note to Participants

This document is your complete guide to the UAT for TPC eSolutions. You do not need any technical background to participate. Everything you need to know — what to test, how to report problems, and what happens at the end — is in this package.

Please read it in full before your first session. If anything is unclear, contact the UAT Coordinator before the session begins.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [What Is UAT and Why It Matters](#2-what-is-uat-and-why-it-matters)
3. [What Is In Scope](#3-what-is-in-scope)
4. [What Is Out of Scope](#4-what-is-out-of-scope)
5. [Known Features Not Yet Available](#5-known-features-not-yet-available)
6. [Your Role in UAT](#6-your-role-in-uat)
7. [Schedule](#7-schedule)
8. [The Test Environment](#8-the-test-environment)
9. [Important Rules for Testers](#9-important-rules-for-testers)
10. [Test Scenarios](#10-test-scenarios)
11. [How to Report a Defect](#11-how-to-report-a-defect)
12. [Severity Definitions](#12-severity-definitions)
13. [What Is Not a Defect](#13-what-is-not-a-defect)
14. [The Acceptance Process](#14-the-acceptance-process)
15. [Contacts](#15-contacts)

---

## 1. Project Overview

### 1.1 What Is TPC eSolutions?

TPC eSolutions is a new digital platform being developed for Tchad Petroleum Company. It is designed to digitalise and streamline operational workflows that are currently managed on paper or through informal channels.

The platform is built as a set of independent modules. Each module handles one operational area. Modules are added over time without disrupting what is already live.

### 1.2 The Safety Data Management Module

The Safety Data Management module is the first live module in the platform. It manages the complete lifecycle of chemical product requests at TPC sites.

**Before this system, the process looked like this:**
- A field worker or store manager needed to bring a new chemical to a site
- Information about the chemical (hazards, manufacturer, storage requirements) was collected informally
- HSE review happened through manual routing — emails, printouts, or verbal sign-off
- There was no central record of what had been approved, rejected, or was pending review

**With TPC eSolutions, the process works like this:**
1. A field worker or store manager submits a chemical request through the platform, filling in a structured form that captures all required safety information
2. The request is automatically routed to the HSE review team for a structured, three-stage review: Safety Review → EMP Review → IH Review
3. At each stage, the assigned reviewer can approve, return for revision, or reject the request — with reasons on record
4. The submitter can track their request in real time, respond to revision requests, and receive the final outcome
5. All requests — approved, rejected, and pending — are stored in a permanent record accessible to authorised personnel

### 1.3 Current Development Status

The Safety Data Management module has completed development and a pre-UAT stabilisation sprint. All critical bugs identified during internal testing have been fixed. The system is ready for business user testing.

Other modules (Cash Advance, Daily Expense, Security Escort, Management of Change) are planned but not yet in development. They will not be tested during this UAT cycle.

---

## 2. What Is UAT and Why It Matters

### 2.1 What Is UAT?

User Acceptance Testing (UAT) is the final quality check before a system goes live. It is conducted by representative business users — the people who will actually use the system — not by the development team.

The purpose of UAT is to answer one question: **Does this system do what the business needs it to do, in a way that real users can actually use it?**

UAT is not about finding every possible technical error. It is about confirming that the key business workflows work correctly and that the system is fit for operational use.

### 2.2 Why Your Participation Matters

Developers can test whether code runs. Only you can confirm whether the system supports real operational work at TPC.

Your feedback during UAT directly shapes whether and when this platform goes live. If you find something that does not work correctly, raising it now — before the system is used by all personnel — is far better than discovering it after go-live.

Your sign-off at the end of UAT is a formal statement that the system is accepted for use. It carries real weight.

---

## 3. What Is In Scope

The following areas are in scope for this UAT. Your test scenarios will cover all of them.

### 3.1 Safety Data — Chemical Requests

| What you will test | Who tests it |
|---|---|
| Submitting a new chemical request (4-section form with chemical info, hazards, manufacturer, and storage details) | Field User, Store Manager, all roles |
| Form validation — the system blocks incomplete or incorrect submissions and tells you what is missing | All roles |
| GHS hazard classification — selecting hazard pictograms and seeing the automatic PPE recommendations | All roles |
| Uploading the eSDS (electronic Safety Data Sheet) file | All roles |
| The three-stage HSE approval workflow: Safety Review → EMP Review → IH Review | HSE Reviewer, Safety Admin, Global Admin |
| Approving a request at your assigned stage | HSE Reviewer, Safety Admin, Global Admin |
| Returning a request for revision — the submitter must correct and resubmit | HSE Reviewer, Safety Admin, Global Admin |
| Rejecting a request with a recorded reason | HSE Reviewer, Safety Admin, Global Admin |
| Resubmitting a revised request — and confirming it goes back to the stage where revision was requested | Field User, Store Manager |
| Tracking your own requests in My Requests — grouped as Action Needed, In Progress, and Closed | All roles |
| The Approvals inbox — seeing only the requests that are at your review stage | HSE Reviewer, Safety Admin, Global Admin |
| The full request detail drawer — all chemical data, hazards, PPE, and the approval timeline | All roles |

### 3.2 Safety Data — Reference Data

| What you will test | Who tests it |
|---|---|
| Master Sheet — the chemical inventory with GHS icons and stock levels | All roles |
| Manufacturers directory — search, filter active/inactive | All roles |
| Manufacturer administration — add, edit, deactivate, reactivate | Global Admin, Safety Admin |
| Storage locations — browsing site-grouped locations | All roles |
| Storage location administration — add, edit, deactivate with duplicate prevention | Global Admin |
| PPE reference — GHS-keyed PPE recommendations | All roles |

### 3.3 Platform Shell

| What you will test | Who tests it |
|---|---|
| Dashboard — module cards, stats, activity stream, platform news | All roles |
| Navigation sidebar — expand, collapse, active page highlight, breadcrumb | All roles |
| Command palette (Ctrl+K shortcut) — global search | All roles |
| Role-based navigation — each role sees only the pages they are authorised to access | All 5 roles |
| Language toggle — full French mode, including all workflows | All roles |
| Notifications panel | All roles |
| User management — invite, edit, deactivate users (Global Admin only) | Global Admin |
| Theme toggle (light and dark mode) | All roles |
| Session continuity — data is still there after refreshing the browser page | All roles |

---

## 4. What Is Out of Scope

The following must **not** be tested during this UAT cycle. If you navigate to these areas by accident, simply note the observation and return to your assigned scenario. Please do not raise these as defects.

| Area | Why it is out of scope |
|---|---|
| Cash Advance module | Not yet developed — placeholder only |
| Daily Expense module | Not yet developed — placeholder only |
| Security Escort module | Not yet developed — placeholder only |
| Management of Change module | Not yet developed — placeholder only |
| Sign Out button | Login and authentication (Entra ID / SSO) are deferred to a future sprint |
| My Profile page | Deferred to a future version of the platform |
| Save Draft button on the chemical request form | Draft saving is deferred — the button is visible but shows a message only |
| Azure Sync indicator on the dashboard | Backend database connection is deferred for this UAT cycle |

---

## 5. Known Features Not Yet Available

The following items are known limitations of the current build. They have been reviewed and formally accepted by the project team. **You should not raise these as defects.** They are planned for future development.

| Reference | Description | Planned for |
|---|---|---|
| OPEN-01 | The Sign Out button has no action. Authentication is not yet integrated. | Entra ID / SSO sprint |
| OPEN-02 | The My Profile button has no action. | Future version |
| OPEN-03 | Save Draft saves nothing — it shows a confirmation message only. | Future version |
| OPEN-04 | Dashboard statistics (pending requests, approved items, active users) show demo values and do not update in real time. | Backend integration sprint |
| OPEN-05 | Some module cards on the dashboard show a "Live" label — these modules are not yet active. | Pre-launch update |
| OPEN-06 | The system does not require a GHS hazard selection before submitting a chemical request. | Next sprint — under review |
| OPEN-07 | The system does not require a storage location before submitting a chemical request. | Next sprint — under review |
| OPEN-08 | Some users see navigation items for modules that are not yet available to their role. | Pre-launch update |

If you have a strong opinion about any of these items — particularly OPEN-06 and OPEN-07 which are still under review — please note it in your feedback form. The HSE Process Owner's view on OPEN-06 is especially important.

---

## 6. Your Role in UAT

### 6.1 Tester Roles

Each participant is assigned one platform role for their UAT session. The role determines which pages you can see and which actions you can take — just as it will in the live system.

| Platform role | What this role represents | Demo user name in system |
|---|---|---|
| **Global Admin** | Full access — all pages, all requests, all admin functions | Cherif Hassan |
| **Safety Admin** | Approvals, reference data administration — no user management | Cherif Hassan |
| **HSE Reviewer (Safety Review)** | Can review and action requests at the Safety Review stage | Mariam Deby |
| **HSE Reviewer (IH Review)** | Can review and action requests at the IH Review stage | Oumar Cheikh |
| **Store Manager** | Can submit requests, track own requests — no approval access | Fatima Moussa |
| **Field User** | Can submit requests, track own requests — no approval access | Ahmed Mahamat |

> **Note:** In the current build, you select your role using a small settings panel (the cog icon at the top right of the screen). Your assigned role is listed in the participation table you received from the UAT Coordinator. **Do not change your role during testing unless a scenario specifically asks you to.**

### 6.2 Supporting Roles

| Role | Responsibility |
|---|---|
| **UAT Coordinator** | Runs the sessions, answers your questions, logs defects, issues the daily report |
| **Development Lead** | Available to fix confirmed defects. Available for technical questions. |
| **HSE Process Owner** | Validates that the approval workflow matches TPC operational procedure |
| **IT Representative** | Manages the UAT environment and resolves access issues |
| **Project Sponsor** | Receives the daily report and makes the final GO / NO GO decision |

---

## 7. Schedule

| Activity | Duration | Target date |
|---|---|---|
| UAT Kickoff briefing — all participants | 1 hour | TBC |
| Day 1 — Core submission and approval scenarios (SCN-01 through SCN-05) | Full day | TBC |
| Day 2 — Reference data, admin, language, and role visibility scenarios (SCN-06 through SCN-12) | Full day | TBC |
| Day 3 — Persistence, dashboard, defect retesting, HSE workflow review | Full day | TBC |
| Day 4 — Sign-off collection and Project Sponsor decision | Half day | TBC |

**Total planned window:** 4 business days from kickoff.

The UAT Coordinator will confirm actual dates with all participants before the first session.

---

## 8. The Test Environment

### 8.1 Accessing the Application

The UAT build is hosted on a dedicated testing URL, separate from any future production environment. The URL will be provided by the IT Representative before your first session.

You access the application directly in your web browser — no installation is required.

**Recommended browsers (in order of preference):**
1. Microsoft Edge (latest version) — required
2. Google Chrome (latest version) — supported

> Do **not** use InPrivate / Incognito mode. This prevents the application from saving data correctly.

### 8.2 Demo Data Pre-Loaded in the System

The system has been pre-loaded with three sample chemical requests so you can see a working dataset from the start of your session.

| Request ID | Chemical | Status | What it demonstrates |
|---|---|---|---|
| CHM-154 | Methanol | Rejected | A completed request that was rejected — visible in the Closed group |
| CHM-155 | Diesel | Review Complete | A completed request that went through all three approval stages — visible in the Closed group |
| CHM-156 | Acetone | Safety Review (pending) | A live request waiting for a reviewer action — visible in the Approvals inbox |

### 8.3 Data Storage

In this UAT build, the data you enter is saved in your browser (not on a central server). This means:

- Your data **persists across page refreshes** — you will not lose your work if you refresh the page
- Your data **does not sync with other testers** — each tester has their own independent data set
- Your data **will be lost if you clear your browser's cookies and site data** — please do not do this during a session

If you need to reset your data mid-session, notify the UAT Coordinator who will assist.

### 8.4 Important: The No-Refresh Rule During Active Workflows

During multi-step workflows (for example, approving a request while another tester is also active), avoid refreshing the browser in the middle of a sequence. The UAT Coordinator will advise you on this during the briefing.

---

## 9. Important Rules for Testers

Please follow these rules throughout the UAT period.

1. **Follow the scenarios in order.** Some scenarios depend on data created in earlier ones. Skipping ahead may cause unexpected results.

2. **Record your results as you go.** Fill in your UAT Feedback Form step by step — do not complete it from memory at the end of the session.

3. **Do not clear your browser data.** Clearing cookies or site data during a session will wipe your test data. If you accidentally do this, notify the UAT Coordinator immediately.

4. **Stay in your assigned role.** Only change your role when a scenario explicitly asks you to.

5. **Report problems immediately.** If you find something that does not work as described, note it in Section 7 of your Feedback Form right away and tell the UAT Coordinator. Do not try to work around it or assume someone else will report it.

6. **Out-of-scope areas are signposted.** If you accidentally navigate to a placeholder module (Cash Advance, etc.), simply note it and return to your scenario.

7. **Ask if you are unsure.** The UAT Coordinator is there to help. A question asked is better than a scenario completed incorrectly.

---

## 10. Test Scenarios

You will be given a personal copy of the Feedback Form (UAT-FEEDBACK.md) that contains the specific step-by-step scenarios assigned to your role. This section summarises what each scenario covers so you understand what you are being asked to validate.

### Scenario Summary

| Scenario | Title | What you are validating | Roles assigned |
|---|---|---|---|
| **SCN-01** | New Chemical Request Submission | You submit a complete chemical request form, including validation checks — the system must block incomplete submissions and accept a complete one | Field User, Store Manager, Safety Admin, GA |
| **SCN-02** | Safety Review Approval | As a Safety Review stage reviewer, you approve the SCN-01 request and confirm it advances to the next stage | HSE Reviewer (SR), Safety Admin, GA |
| **SCN-03** | Return for Revision and Resubmission | A reviewer returns a request to the submitter with a reason; the submitter resubmits; the request must return to the stage where revision was requested — not restart from Stage 1 | HSE Reviewer (IH), Field User, GA |
| **SCN-04** | Full Approval Chain (End-to-End) | You approve a single request through all three stages until it reaches the "Review Complete" terminal state | GA |
| **SCN-05** | Rejection Workflow | A reviewer rejects a request with a recorded reason; the submitter sees the rejection with no option to resubmit | HSE Reviewer, Field User |
| **SCN-06** | My Requests — Tracking and Grouping | You confirm that submitters only see their own requests; Global Admin sees all; requests are correctly sorted into the three groups | Field User, GA |
| **SCN-07** | Master Sheet Browsing | You browse the chemical inventory, inspect GHS hazard icons, review inventory bars, and open a request detail drawer | Any role |
| **SCN-08** | Manufacturer Management | You add, edit, deactivate, and reactivate a manufacturer — including the double-confirmation safety step for deactivation | GA, Safety Admin |
| **SCN-09** | Storage Location Management | You add a storage location, confirm duplicate prevention, deactivate a location, and confirm the deactivated location no longer appears in the New Chemical form | GA |
| **SCN-10** | User Management | You invite a new user, assign their role and stage scope, edit them, and deactivate them — confirming that non-admin roles cannot access the Users page | GA, HSE Reviewer |
| **SCN-11** | Language Toggle EN / FR | You switch the interface to French, execute a complete workflow in French, and switch back — confirming no data loss and correct language on all strings | Any role |
| **SCN-12** | Role-Based Visibility | You switch through all five roles and confirm each one sees exactly the navigation items they are authorised to see | All roles |
| **SCN-13** | Session Continuity | You confirm that submitted requests, stage approvals, revision requests, and resubmissions all survive a full browser page refresh | GA |
| **SCN-14** | Dashboard and Navigation | You confirm the splash screen, dashboard cards, breadcrumb navigation, command palette search, sidebar collapse, theme toggle, and notifications panel all work correctly | GA |

### Scenario Pass / Fail Definition

A scenario is **PASS** only if every single step produces the stated expected result.

If even one step produces a different result than described, the scenario is **FAIL**. Record exactly which step failed, what you expected, and what actually happened.

If a failure blocks you from continuing to the next step, the scenario is **BLOCKED**. Stop immediately and notify the UAT Coordinator.

---

## 11. How to Report a Defect

### 11.1 What Is a Defect?

A defect is any behaviour where the system does something different from what the test scenario describes as the expected result — and it is not listed in Section 5 (Known Features Not Yet Available) or Section 13 (What Is Not a Defect).

### 11.2 What to Record (Before You Tell Anyone)

When you find a problem, write down the following **immediately**, before anything changes:

1. **Which scenario and step** you were on (e.g., "SCN-01, Step 8")
2. **What role** you were using
3. **Which browser** you were using
4. **Exactly what you did** — the precise steps that led to the problem
5. **What you expected to happen** (as described in the scenario)
6. **What actually happened** — be specific
7. **A screenshot or screen recording** if possible — mandatory for critical or high severity problems

### 11.3 How to Submit

1. Write the details in **Section 7 of your UAT Feedback Form** as soon as you observe the problem
2. Tell the **UAT Coordinator** verbally or by the agreed channel (Teams / in person) at the same time
3. The UAT Coordinator will create the official defect record and assign it a reference number (DEF-001, DEF-002, etc.)
4. You will be notified when the problem is fixed and asked to retest it

### 11.4 The Defect Lifecycle

```
You find a problem
       │
       ▼
You record it in your Feedback Form + notify UAT Coordinator
       │
       ▼
UAT Coordinator logs it officially within 4 hours
       │
       ▼
UAT Coordinator + Dev Lead triage it within 4 hours
       │
       ├──► Not a defect / out of scope → You are notified, no further action
       │
       ├──► Accepted for a future sprint → Formally deferred (waiver signed at sign-off)
       │
       └──► Confirmed defect → Developer fixes it within the SLA
               │
               ▼
           You are asked to retest it
               │
               ├──► Retest PASS → UAT Coordinator marks it CLOSED
               │
               └──► Retest FAIL → Defect re-opened, fix cycle repeats
```

### 11.5 Fix SLAs

| Severity | Fix must be deployed within | You retest within |
|---|---|---|
| Critical | 4 hours | 2 hours of the fix |
| High | 24 hours | 4 hours of the fix |
| Medium | 3 business days | Next UAT session |
| Low | Next sprint | At sign-off |

> **Critical defects suspend UAT** for affected scenarios until they are fixed. The UAT Coordinator will inform you if this happens.

---

## 12. Severity Definitions

When you report a problem, suggest a severity level. The UAT Coordinator and Development Lead will confirm the final severity in triage.

### SEV-1 — Critical

> A workflow is completely blocked and cannot be completed, OR data has been lost or corrupted, OR a security boundary has been crossed. There is no acceptable workaround. UAT is suspended for affected scenarios until this is fixed.

**Examples:**
- Clicking Submit creates nothing — you cannot submit any request
- All your submitted requests disappear after refreshing the page
- Clicking Approve in a request does nothing for any request

### SEV-2 — High

> A major feature is broken or produces the wrong result. A workaround may exist but would not be acceptable once the system is live. UAT continues on unaffected scenarios, but this must be fixed before sign-off.

**Examples:**
- After a reviewer returns a request for revision, resubmitting it goes back to Stage 1 instead of the stage where revision was requested
- The manufacturer name does not appear in the request detail after submission
- The Approvals inbox shows no requests even though requests are pending

### SEV-3 — Medium

> A feature is partially impaired but a practical workaround exists. UAT can continue. This must be fixed or formally accepted before sign-off.

**Examples:**
- Switching the interface to French leaves some labels in English
- The manufacturer form accepts an entry without validating the email format
- A specific role can see a navigation item they should not be able to access

### SEV-4 — Low

> A cosmetic, text, or minor layout issue with no functional impact. UAT is not affected.

**Examples:**
- A column heading is slightly misaligned
- A tooltip has a spelling error
- A button label has incorrect capitalisation

---

## 13. What Is Not a Defect

The following behaviours are **expected in this build** and must not be logged as defects. They are either deferred features (see Section 5) or known platform behaviours.

| Behaviour | Why it is not a defect |
|---|---|
| Sign Out does nothing | SSO / Entra ID authentication is deferred |
| My Profile does nothing | Deferred to a future version |
| Save Draft shows a message but does not save | Draft storage is deferred |
| Dashboard numbers (pending, approved, users) never change | Static demo values — backend data connection is deferred |
| Cash Advance, Daily Expense, and Security Escort open to blank stub pages | These modules are not yet built |
| Your data disappears if you deliberately clear all browser cookies and site data | Expected — the application uses browser storage, not a server database, in this UAT build |

If you are not sure whether something is a defect or an expected behaviour, **report it anyway** and add a note that you are unsure. The triage team will classify it.

---

## 14. The Acceptance Process

### 14.1 How UAT Ends

UAT is complete when all of the following are true:

| Condition | Target |
|---|---|
| All 14 test scenarios executed | 14 / 14 |
| Scenario pass rate | At least 13 of 14 (93%) |
| No Critical defects open | Zero |
| No High defects open | Zero |
| All Medium defects resolved or formally accepted | Zero unresolved |
| All UAT participants have submitted their Feedback Form | 6 / 6 |
| HSE Process Owner has confirmed the approval workflow matches TPC operational procedure | Signed |
| All participants have signed the UAT Sign-Off form | 6 / 6 signatures |
| Project Sponsor has made the final GO / NO GO decision | Signed |

### 14.2 What You Will Be Asked to Sign

At the close of UAT, each participant will be asked to sign the **UAT Sign-Off document** (UAT-SIGNOFF.md). Your signature confirms:

- You executed the scenarios assigned to you
- The system behaviour you observed meets the stated requirements
- You accept the system for use in the areas covered by your assigned role
- You are aware of the deferred items listed in Section 5 of this document

Your signature is not a claim that the system is perfect. It is a professional statement that the system is fit for operational use given what was tested and given the formally accepted deferred items.

### 14.3 The HSE Process Owner Sign-Off

The HSE Process Owner has a separate and specific responsibility: to confirm that the approval workflow implemented in the system — Safety Review → EMP Review → IH Review — accurately reflects the actual operational process used at Tchad Petroleum Company.

This confirmation is mandatory. Without it, the approval workflow cannot be accepted regardless of tester sign-off.

### 14.4 The Project Sponsor Decision

After all participants and the HSE Process Owner have signed, the Project Sponsor reviews the complete UAT evidence package and makes one of three decisions:

| Decision | Meaning |
|---|---|
| **GO** | All exit criteria met. System approved for production deployment. |
| **CONDITIONAL GO** | All Critical and High defects are closed. One or more Medium defects are formally accepted with documented waivers and assigned to future sprints. Deployment proceeds under agreed conditions. |
| **NO GO** | One or more Critical or High defects remain open, or the scenario pass rate is below 93%, or required signatures are missing. Production deployment is blocked. |

The Project Sponsor's signature is the only authority that can authorise production deployment.

### 14.5 After GO

Once the Project Sponsor signs:

| Action | Timing |
|---|---|
| UAT outcome communicated to all participants | Same day |
| All Feedback Forms archived | Within 48 hours |
| Final test report archived | Within 48 hours |
| Any fixes from UAT merged into the main build | Before production deployment |
| Production deployment executed | Per agreed schedule |
| Post-go-live review session | 2 weeks after launch |

---

## 15. Contacts

Fill in the names and contact details before distributing to participants.

| Role | Name | Contact |
|---|---|---|
| UAT Coordinator | TBC | TBC |
| Development Lead | TBC | TBC |
| HSE Process Owner | TBC | TBC |
| IT Representative | TBC | TBC |
| Project Sponsor | TBC | TBC |

For technical problems with the UAT environment (cannot access the URL, browser errors, page not loading), contact the IT Representative first.

For questions about what a scenario is asking you to do, contact the UAT Coordinator.

For questions about whether an observed behaviour is correct for the HSE process, contact the HSE Process Owner.

---

## Appendix A — Quick Reference Card

> Cut this out or keep it open alongside your test session.

**Tester checklist before each session:**
- [ ] I have the UAT URL open in Edge or Chrome (not InPrivate)
- [ ] I have selected my assigned role using the cog icon (top right)
- [ ] I have my UAT Feedback Form open and ready to fill in
- [ ] I have not cleared my browser data since the last session
- [ ] I know who to contact if I find a problem

**If something goes wrong:**

| Situation | Action |
|---|---|
| A step does not produce the expected result | Record it immediately in Section 7 of your Feedback Form. Tell the UAT Coordinator. |
| You are blocked and cannot continue | Mark the scenario BLOCKED. Stop. Tell the UAT Coordinator immediately. |
| You accidentally cleared your browser data | Tell the UAT Coordinator. Do not try to recreate the data yourself. |
| You are not sure if something is a defect | Record it and note "unsure if defect". The triage team will decide. |
| You have a question about the scenario steps | Ask the UAT Coordinator before proceeding. |

**Severity at a glance:**

| Level | When to use it |
|---|---|
| Critical (SEV-1) | Completely blocked. Cannot continue. Data lost. |
| High (SEV-2) | Major feature broken. Wrong result. Workaround not acceptable. |
| Medium (SEV-3) | Partially broken. Workaround exists. |
| Low (SEV-4) | Cosmetic only. No functional impact. |

---

*Document ref: TPC-ESOL-UAT-KO-001 v1.0 | Classification: INTERNAL — FOR UAT PARTICIPANTS*
*Issued: 2026-06-05 | eTPC Development Team*
*Retain as part of the project audit trail.*
