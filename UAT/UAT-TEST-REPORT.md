# UAT Test Report
**Project:** TPC eSolutions — Enterprise Platform  
**Module:** Safety Data Management  
**Document version:** 1.0  
**Status:** DRAFT — Pending UAT execution  
**Prepared by:** UAT Coordinator  
**Review date:** —  
**Distribution:** Project Sponsor, Development Lead, HSE Process Owner, IT Representative

---

## 1. Executive Summary

> *Complete this section after UAT execution is finished.*

| Item | Detail |
|---|---|
| UAT period | TBC |
| Total scenarios executed | — / 14 |
| Pass rate | —% |
| Critical defects raised | — |
| Critical defects closed | — |
| High defects raised | — |
| High defects closed | — |
| Open defects at report date | — |
| Deferred items with formal waiver | 8 |
| Overall recommendation | TBC |

**Summary narrative:**

> *2–3 sentences summarising the UAT outcome, key findings, and recommendation. Written by the UAT Coordinator after all sessions are complete.*

---

## 2. Test Scope

### 2.1 Module Tested

**TPC eSolutions — Safety Data Management**

The Safety Data Management module enables Tchad Petroleum Company personnel to submit, review, and manage chemical product requests through a formal HSE approval workflow. The module covers:

- New chemical request submission with GHS hazard classification and PPE documentation
- Multi-stage approval workflow: Safety Review → EMP Review → IH Review
- Return for revision and resubmission
- Rejection workflow
- Chemical inventory (Master Sheet)
- Manufacturer and storage location administration
- Role-based access for five platform roles

### 2.2 Modules Explicitly Out of Scope

- Cash Advance
- Daily Expense (Note de frais)
- Security Escort (E85)
- Management of Change
- Any module card labelled "Soon" on the dashboard

### 2.3 Platform Features Tested

- Dashboard (summary, module cards, activity stream, news)
- Navigation sidebar and breadcrumb
- Command palette (Ctrl+K)
- Role-based visibility for all five roles
- Language toggle EN / FR
- Notifications panel
- User management (GA role)
- Session continuity via localStorage

---

## 3. Participants

| Name | Role | Site | Sessions attended | Scenarios covered |
|---|---|---|---|---|
| | Global Admin | | | SCN-01 to SCN-14 |
| | Safety Admin | | | SCN-01, 02, 05, 06, 07, 08, 09, 11, 12, 13, 14 |
| | HSE Reviewer — Safety Review | | | SCN-02, 03, 05, 06, 07, 11, 12 |
| | HSE Reviewer — IH Review | | | SCN-03, 05, 11, 12 |
| | Store Manager | | | SCN-01, 06, 07, 09, 11, 12, 13, 14 |
| | Field User | | | SCN-01, 03, 05, 06, 11, 12, 13, 14 |

---

## 4. Environment

| Item | Detail |
|---|---|
| Application | TPC E-Solution.html — post-stabilisation build (2026-06-04) |
| Hosting | Azure Static Web App — UAT slot |
| Browsers | Microsoft Edge (version ___), Google Chrome (version ___) |
| Data state | Pre-seeded: CHM-154 (Rejected), CHM-155 (Review Complete), CHM-156 (Safety Review pending) |
| Persistence | Browser localStorage — cleared before each tester's first session |

---

## 5. Scenario Execution Results

### 5.1 Result by Scenario

| Scenario | Description | Result | Defects raised | Notes |
|---|---|---|---|---|
| SCN-01 | New chemical request submission | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-02 | Safety Review approval | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-03 | Return for revision and resubmission | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-04 | Full approval chain end-to-end | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-05 | Rejection workflow | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-06 | My Requests — tracking and grouping | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-07 | Master Sheet browsing | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-08 | Manufacturer management | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-09 | Storage location management | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-10 | User management | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-11 | Language toggle EN / FR | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-12 | Role-based visibility | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-13 | Session continuity after refresh | ☐ PASS ☐ FAIL ☐ BLOCKED | | |
| SCN-14 | Dashboard and navigation | ☐ PASS ☐ FAIL ☐ BLOCKED | | |

**Totals:** PASS: ___ / FAIL: ___ / BLOCKED: ___

### 5.2 Pass Rate

```
Pass rate = (Passed scenarios / Total executed) × 100

Pass rate: _____%     Target: ≥ 93% (13 of 14)
```

---

## 6. Defect Summary

### 6.1 Defects Raised During UAT

| Severity | Raised | Closed | Deferred | Open |
|---|---|---|---|---|
| Critical | | | | |
| High | | | | |
| Medium | | | | |
| Low | | | | |
| **Total** | | | | |

### 6.2 Defect List

| Defect ID | Title | Severity | Status | Scenario | Resolution |
|---|---|---|---|---|---|
| | | | | | |
| | | | | | |
| | | | | | |

> *Refer to UAT-DEFECTS.md for full detail on each item.*

### 6.3 Pre-UAT Defects (Closed Before UAT)

8 defects were identified and closed during the pre-UAT stabilisation sprint. These are fully documented in UAT-DEFECTS.md under "Closed Defects — Sprint Pre-UAT." None required UAT-phase retesting.

---

## 7. Participant Feedback Summary

### 7.1 Scenario Ratings (Average by Scenario)

| Scenario | Average rating (1–5) | Key observations |
|---|---|---|
| SCN-01 | | |
| SCN-02 | | |
| SCN-03 | | |
| SCN-04 | | |
| SCN-05 | | |
| SCN-06 | | |
| SCN-07 | | |
| SCN-08 | | |
| SCN-09 | | |
| SCN-10 | | |
| SCN-11 | | |
| SCN-12 | | |
| SCN-13 | | |
| SCN-14 | | |
| **Overall** | | |

### 7.2 Platform Experience Ratings (Average)

| Dimension | Average rating (1–5) |
|---|---|
| Ease of navigation | |
| Form usability | |
| Error messages | |
| Speed / responsiveness | |
| Visual clarity | |
| French language quality | |
| Approval workflow clarity | |
| Feedback / confirmations | |

### 7.3 Key Feedback Themes

> *Summarise the most frequently raised themes from UAT-FEEDBACK.md forms. 3–5 bullet points.*

- 
- 
- 
- 

### 7.4 Workflow Alignment (HSE Process Owner)

> *Summarise the HSE Process Owner's assessment of workflow alignment from UAT-SIGNOFF.md Section 6.*

**Deviations from operational process:**

| # | Deviation | Impact | Agreed resolution |
|---|---|---|---|
| | | | |

---

## 8. Deferred Items

The following 8 items are formally deferred and accepted for a future sprint. Full waiver details are in UAT-SIGNOFF.md Section 5.

| ID | Description | Severity | Target sprint |
|---|---|---|---|
| OPEN-01 | Sign Out — no action (SSO deferred) | Low | Entra ID sprint |
| OPEN-02 | My Profile — no action (deferred to v2) | Low | v2 |
| OPEN-03 | Save Draft — toast only, no draft store | Low | v2 |
| OPEN-04 | Dashboard stats are static demo values | Medium | Backend integration sprint |
| OPEN-05 | Cash/Expense/Escort cards show "Live" | Medium | Pre-launch UI sprint |
| OPEN-06 | GHS hazard selection not required | Medium | Pending HSE Process Owner decision |
| OPEN-07 | Storage location not validated before submit | Medium | Next sprint |
| OPEN-08 | sm/user roles see Cash and Escort nav items | Medium | Role visibility sprint |

---

## 9. Observations and Recommendations for Next Sprint

> *Complete this section based on tester feedback and UAT findings. Items here are not defects — they are improvement opportunities.*

| # | Observation | Source | Recommended action | Priority |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

---

## 10. UAT Readiness Scores

| Dimension | Pre-UAT score | Post-UAT score | Change |
|---|---|---|---|
| Data persistence | 10/10 | | |
| Form validation | 8/10 | | |
| Approval workflow | 9/10 | | |
| Demo data / approvals inbox | 9/10 | | |
| Payload integrity | 9/10 | | |
| Role visibility | 5/10 | | |
| Accessibility | 4/10 | | |
| Responsive layout | 5/10 | | |
| **UAT Readiness Score** | **8.5/10** | | |

---

## 11. Recommendation

> *Complete after all sessions, defect triage, and feedback consolidation.*

**Based on UAT execution:**

- [ ] **READY FOR PRODUCTION DEPLOYMENT**  
  All exit criteria met. Defects closed or formally deferred. Participant feedback confirms the platform meets TPC operational requirements for the Safety Data Management module.

- [ ] **CONDITIONAL GO**  
  Exit criteria substantially met. The following conditions must be satisfied before deployment:

  | Condition | Owner | Target date |
  |---|---|---|
  | | | |

- [ ] **NOT READY — RETURN TO DEVELOPMENT**  
  Exit criteria not met. The following blockers prevent deployment:

  | Blocker | Defect ID | Severity |
  |---|---|---|
  | | | |

**Recommendation narrative:**

> *2–4 sentences providing context for the decision.*

---

## 12. Sign-Off Reference

Formal acceptance is recorded in **UAT-SIGNOFF.md**. This report is an annex to that document and does not independently constitute acceptance.

| Sign-off party | Name | Date |
|---|---|---|
| UAT Coordinator | | |
| Project Sponsor | | |
| HSE Process Owner | | |
| IT Representative | | |

---

## Appendix A — Test Execution Timeline

| Date | Activity | Participants | Duration |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

## Appendix B — Documents Referenced

| Document | Version | Location |
|---|---|---|
| UAT Execution Plan | 1.0 | `UAT/UAT-EXECUTION-PLAN.md` |
| UAT Defect Log | 1.0 | `UAT/UAT-DEFECTS.md` |
| UAT Participant Feedback (all) | 1.0 | `UAT/UAT-FEEDBACK.md` |
| UAT Sign-Off | 1.0 | `UAT/UAT-SIGNOFF.md` |
| Pre-UAT Stabilisation Report | 1.0 | Session transcript — 2026-06-04 |
| Platform Architecture | Current | `project/docs/PLATFORM_ARCHITECTURE.md` |
| Platform Blueprint | Current | `project/docs/PLATFORM_BLUEPRINT.md` |

## Appendix C — Regression Test Results (Pre-UAT Sprint)

All 35 pre-UAT regression tests passed following the stabilisation sprint completed on 2026-06-04. Zero open defects at UAT entry. Full results documented in the stabilisation session record.

| Fix | Tests | Result |
|---|---|---|
| BUG-02 — eSDS date field | 3 | PASS |
| BUG-01 — Form validation | 7 executed / 2 blocked (restested: PASS) | PASS |
| DI-01 — localStorage persistence | 7 | PASS |
| BUG-03 — Resubmit stage routing | 6 | PASS |
| BUG-07 — Mock requests in live store | 8 executed / 1 fail (retested: PASS) | PASS |

---

*This document must be finalised and countersigned before the UAT-SIGNOFF.md can be submitted for Project Sponsor acceptance.*
