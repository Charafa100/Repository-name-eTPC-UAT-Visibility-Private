# TPC eSolutions — Platform Development Rules

## IMPORTANT: Mandatory Workflow

Before making any change, follow these three steps in order. Do not skip any step.

### Step 1 — Impact Analysis

Before touching any file, report:
- Files that will be affected
- Files that could be affected as side effects
- Risks to existing functionality
- Dependencies between components
- Estimated complexity (small / medium / large)

### Step 2 — Implementation Plan

Produce a short plan covering:
- What will change
- What will NOT change
- Rollback strategy

### Step 3 — Wait for Approval

Do not modify any file until the user has reviewed and approved the plan.

---

## Platform Goal

TPC eSolutions is a multi-module enterprise platform. All development must preserve the stability of existing modules while enabling safe extension.

### Current Modules

- Safety Data Management — **Live**
- Cash Advance — future
- Daily Expense — future
- Security Escort — future
- Management of Change — future

---

## Architecture Principles

- Protect existing functionality above all else
- Avoid large-scale rewrites
- Avoid framework migrations
- Prefer extension over replacement
- Reuse existing patterns whenever possible
- Keep modules loosely coupled

---

## DO NOT

- Rewrite `tpc-app.js` unless explicitly approved by the user
- Rebuild the dashboard
- Change existing routes (`data-page` attributes)
- Change working workflows (Safety Data approval chain)
- Replace working UI components with new designs
- Introduce breaking changes to any live module

---

## ALWAYS

- Extend new modules through the MODULES registry
- Reuse the My Requests architecture for all request types
- Reuse the Approvals architecture for all approval workflows
- Reuse the role and permission architecture
- Preserve backward compatibility with all existing functionality

---

## Safety Rules

If a proposed change may affect any of the following, perform an architecture review before planning implementation:

- Navigation sidebar structure
- Dashboard
- Role and permission model
- My Requests page
- Approvals inbox
- Module Registry

---

## Future Module Requirements

Every new module must integrate through all of the following without modifying existing module behaviour:

- MODULES registry (one new entry)
- My Requests (automatic via registry)
- Approvals inbox (automatic via registry)
- Role and permission model (automatic via moduleAccess[])
- Notifications

---

## Reference Documents

The following architecture documents in `project/docs/` govern all design decisions:

- `PLATFORM_ARCHITECTURE.md` — Technical specification
- `PLATFORM_BLUEPRINT.md` — Management blueprint

Consult these before proposing any structural change.
