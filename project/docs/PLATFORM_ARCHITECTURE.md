# eTPC Platform Architecture Specification

**Version:** 1.0  
**Date:** 2026-05-31  
**Status:** Approved — Blueprint for all future development  
**Scope:** All platform modules: Safety Data, Cash Advance, Daily Expense, Security Escort, Management of Change, and future modules

---

## Table of Contents

1. [Global Dashboard](#1-global-dashboard)
2. [My Requests Architecture](#2-my-requests-architecture)
3. [Approvals Architecture](#3-approvals-architecture)
4. [Module Registry Architecture](#4-module-registry-architecture)
5. [User Roles Architecture](#5-user-roles-architecture)
6. [Global Admin Responsibilities](#6-global-admin-responsibilities)
7. [Safety Data Admin Responsibilities](#7-safety-data-admin-responsibilities)
8. [Future Module Onboarding Process](#8-future-module-onboarding-process)
9. [Request Lifecycle Model](#9-request-lifecycle-model)
10. [Security and Access Model](#10-security-and-access-model)

---

## 1. Global Dashboard

### Purpose

The Global Dashboard is the platform's landing page. It provides a unified cross-module view of operational health, pending actions, and live activity. Its role is to give each user an immediate picture of what requires their attention without navigating into individual modules.

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  KPI STRIP                                                   │
│  Total Pending  │  Approvals Due Today  │  SLA Breached      │
├──────────────────────────────────────────────────────────────┤
│  MODULE CARDS (one per active module)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │Safety    │  │Cash      │  │Expense   │  │Escort    │    │
│  │Data      │  │Advance   │  │          │  │          │    │
│  │145 items │  │12 pending│  │8 pending │  │3 active  │    │
│  │Bottleneck│  │SLA OK    │  │1 breach  │  │SLA OK    │    │
│  │IH Review │  │          │  │          │  │          │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
├──────────────────────────────────────────────────────────────┤
│  LIVE ACTIVITY FEED                                          │
│  Cross-module event stream (approvals, submissions,          │
│  rejections, SLA breaches)                                   │
└──────────────────────────────────────────────────────────────┘
```

### KPI Strip

| KPI | Definition | Scope |
|---|---|---|
| Total Pending | Requests in `submitted` or `in_review` state | Scoped by user role (see §5) |
| Approvals Due Today | Requests where the current stage is assigned to the logged-in user | Reviewer's own queue |
| SLA Breached | Requests past their stage deadline | Platform-wide for admin; own queue for others |

### Module Cards

Each card shows:
- Module name, icon, color (from MODULES registry — see §4)
- Count of active requests in that module
- Current bottleneck stage (stage with the highest average dwell time)
- SLA status indicator: OK / At risk / Breached

Cards are generated from the MODULES registry. A module with status `soon` displays as a placeholder card ("Coming soon") rather than live data.

### Live Activity Feed

- Displays the 20 most recent cross-module events
- Event types: submitted, stage advanced, approved, rejected, returned, SLA breached
- Each event shows: module badge, request ID, actor, timestamp
- Field users see only events on their own requests
- Admins see all events

### Role-Aware Behavior

| Role | KPI scope | Module cards shown | Activity feed |
|---|---|---|---|
| `field_user` | Own submissions | Modules in their moduleAccess[] | Own requests only |
| `she_reviewer` | Own submissions + assigned reviews | Modules in their moduleAccess[] | Own + assigned |
| `module_admin` | Full module | Their assigned module(s) | Full module |
| `global_admin` | Full platform | All active modules | Full platform |

---

## 2. My Requests Architecture

### Purpose

My Requests is the platform's global request center. It replaces the current Safety Data-only view with a unified list of all requests submitted by the user, across all modules. It is the primary self-service surface for tracking request status and accessing request details.

### Data Model: Request Envelope

Every request across every module conforms to a shared envelope. The envelope contains universally meaningful fields. Module-specific data is contained in a typed `payload` field.

```
RequestEnvelope {
  id            : string          // Platform-wide unique ID: TPC-YYYY-NNN
  internalRef   : string          // Module-specific ID: CHM-001, ADV-012, etc.
  moduleKey     : ModuleKey       // 'safety' | 'cash' | 'expense' | 'escort' | 'moc'
  type          : string          // Module-specific subtype (e.g. 'New Chemical', 'Add to Site')
  title         : string          // Human-readable label for list and drawer header
  submittedBy   : UserRef         // { id, name, avatar }
  site          : string          // Submission site (Douala, PS2, PS3, PRS, FSO, etc.)
  submittedAt   : date
  status        : RequestStatus   // See §9 for full state machine
  currentStage  : string          // Name of the active workflow stage
  timeline      : TimelineEntry[] // Append-only audit log of stage transitions
  payload       : ModulePayload   // Discriminated by moduleKey (see below)
}
```

### Payload Types by Module

Each module defines its own payload shape. The envelope is never modified to accommodate module-specific fields.

**SafetyPayload** (moduleKey: `safety`)
```
{
  chemicalName   : string
  casNumber      : string
  manufacturer   : string
  useDescription : string
  hazardCodes    : string[]
  gchsPictograms : string[]
  ppeRequired    : string[]
  storageLocation: string
  sdsAttached    : boolean
}
```

**CashPayload** (moduleKey: `cash`)
```
{
  amount         : number
  currency       : string
  costCenter     : string
  justification  : string
  expectedReturnDate : date
  receiptsAttached   : boolean
}
```

**ExpensePayload** (moduleKey: `expense`)
```
{
  amount         : number
  currency       : string
  category       : string
  costCenter     : string
  expenseDate    : date
  receiptsAttached : boolean
}
```

**EscortPayload** (moduleKey: `escort`)
```
{
  routeFrom      : string
  routeTo        : string
  departureDate  : date
  returnDate     : date
  personnelCount : number
  vehicleType    : string
  justification  : string
}
```

**MocPayload** (moduleKey: `moc`)
```
{
  changeType     : string
  description    : string
  affectedSystems: string[]
  riskLevel      : 'low' | 'medium' | 'high' | 'critical'
  proposedDate   : date
  rollbackPlan   : string
}
```

### ID Scheme

```
Platform-wide ID : TPC-2026-001  (sequential across all modules, year-prefixed)
Internal ref     : CHM-001       (module-scoped, used for SDS references and module tools)
```

The platform-wide ID is the primary key for My Requests, Approvals, and navigation. The internal ref is retained for module-internal use (e.g. chemical SDS lookup by CHM code).

### Module ID Prefixes

| Module | Prefix |
|---|---|
| Safety Data | CHM |
| Cash Advance | ADV |
| Daily Expense | EXP |
| Security Escort | ESC |
| Management of Change | MOC |

### Display

**Filter bar** — chip-filter derived from MODULES registry:

```
[ All (24) ]  [ Safety Data (12) ]  [ Cash Advance (5) ]
[ Daily Expense (4) ]  [ Security Escort (2) ]  [ MOC (1) ]
```

Chips are generated from the registry. A module with no requests still shows a chip with count 0. Modules with status `soon` are not shown.

**Table columns** (flat list view, default):

| Column | Source |
|---|---|
| ID | envelope.id |
| Module | derived from envelope.moduleKey via MODULES registry |
| Type | envelope.type |
| Title | envelope.title |
| Submitted | envelope.submittedAt |
| Current Stage | envelope.currentStage |
| Status | envelope.status (badge) |

**Grouped view** (toggle):

```
ACTION NEEDED (returned / pending with submitter action required)
  ...rows...

IN PROGRESS (submitted / in_review)
  ...rows...

CLOSED (approved / rejected / cancelled)
  ...rows...
```

### Role Visibility Rules

| Role | My Requests scope |
|---|---|
| `field_user` | Own submissions only (`submittedBy = self`) |
| `she_reviewer` | Own submissions + requests where they appear in timeline as assigned reviewer |
| `store_manager` | Own submissions only |
| `module_admin` | All requests in their assigned module(s) |
| `global_admin` | All requests across all modules |

### Request Detail Drawer

The detail drawer uses a **shared shell with a module payload zone**:

```
┌─────────────────────────────────────────┐
│ SHARED HEADER                           │
│ TPC-2026-156  ·  New Chemical  ·  CHM   │
│ Title: Acetone — New Chemical           │
│ Ahmed Mahamat  ·  Douala  ·  14 May     │
│ Status: Pending                         │
├─────────────────────────────────────────┤
│ TIMELINE (shared for all modules)       │
│ ● Submitted → ● IH Review → ○ OI       │
│ Each entry: stage, actor, date, note   │
├─────────────────────────────────────────┤
│ MODULE PAYLOAD SECTION                  │
│ Rendered by module-specific renderer    │
│ keyed on envelope.moduleKey             │
│                                         │
│ Safety: Hazards / PPE / Manufacturer   │
│ Cash: Amount / Cost center / Return date│
│ Escort: Route / Dates / Vehicles        │
└─────────────────────────────────────────┘
```

The shell (header + timeline) is implemented once and shared. Each module contributes one payload renderer. Adding a new module requires only adding its renderer — no changes to the shell.

---

## 3. Approvals Architecture

### Purpose

The Approvals inbox is the platform's unified action center for reviewers and administrators. It consolidates pending review tasks from all modules into a single queue, eliminating the need for reviewers to check each module separately.

### Inbox Structure

```
┌──────────────────────────────────────────────────────────┐
│ FILTER BAR                                               │
│ [ All (11) ] [ Safety (7) ] [ Cash (2) ] [ Expense (1) ]│
│ [ Escort (1) ] [ MOC (0) ]                               │
├──────────────────────────────────────────────────────────┤
│ SORT / GROUP CONTROLS                                    │
│ Sort: Oldest first | SLA: soonest first | Module         │
├──────────────────────────────────────────────────────────┤
│ INBOX LIST                                               │
│  Each row: module badge, ID, title, stage, submitter,   │
│  submitted date, SLA indicator                           │
├──────────────────────────────────────────────────────────┤
│ BULK ACTION BAR (appears on multi-select)                │
│ [ Approve all ] [ Reject all ] [ Delegate ]              │
└──────────────────────────────────────────────────────────┘
```

### Approval Actions

| Action | Description | Who can perform |
|---|---|---|
| Approve | Advance request to next stage | Assigned reviewer for current stage |
| Reject | Terminate the request | Assigned reviewer or module_admin |
| Return for correction | Send back to submitter with note | Assigned reviewer or module_admin |
| Delegate | Reassign current stage to another reviewer | module_admin or global_admin |
| Escalate | Flag as urgent, notify next-level admin | module_admin or global_admin |

### Bulk Operations

- Bulk Approve: approves all selected requests in a single action; each generates its own timeline entry
- Bulk Reject: requires a shared rejection note applied to all selected
- Bulk operations are scoped to the active filter — a reviewer cannot accidentally bulk-approve another module's requests

### SLA Tracking

Each stage within a module's workflow has a configured maximum dwell time (e.g. IH Review: 2 business days). The inbox tracks:

- `stageEnteredAt`: timestamp when request entered current stage
- `stageSLAHours`: configured maximum hours for this stage (from module workflow config)
- `slaStatus`: `ok` | `at_risk` (>75% elapsed) | `breached` (>100% elapsed)

SLA breach triggers a visual indicator on the row and an optional notification to the module admin.

### Bottleneck Detection

A bottleneck is the stage with the highest average dwell time across all active requests for that module. The Global Dashboard module card surfaces the bottleneck stage name. The Approvals inbox sort option "SLA: soonest first" naturally surfaces at-risk items from bottleneck stages.

### Stage Configuration

Stage sequences are **module-owned**, not global. Each module defines its own stages in the MODULES registry (see §4):

**Safety Data stages:**
```
Submission → Safety Review → EMP Review → IH Review → Review Complete
```

**Cash Advance stages:**
```
Submission → Line Manager → Finance Review → CFO Approval (if > threshold)
```

**Security Escort stages:**
```
Submission → Security Coordinator → HSE Sign-off → Operations Approval
```

**Daily Expense stages:**
```
Submission → Line Manager → Finance Validation
```

**Management of Change stages:**
```
Submission → Technical Review → HSE Review → Management Approval → Implementation Sign-off
```

### Visibility in Approvals

A reviewer only sees inbox items where they are the assigned reviewer for the current stage. A module_admin sees all items for their module. A global_admin sees all items across all modules.

### Notification Triggers

| Event | Notified parties |
|---|---|
| Request submitted | First-stage reviewers |
| Stage advanced | Next-stage reviewers |
| Request approved | Submitter |
| Request rejected | Submitter + module_admin |
| Request returned | Submitter |
| SLA breached | Current-stage reviewer + module_admin |
| SLA at risk (75%) | Current-stage reviewer |

---

## 4. Module Registry Architecture

### Purpose

The MODULES registry is the **single source of truth** for all module metadata on the platform. Every surface that needs to know "what modules exist" — filter chips, breadcrumbs, nav items, drawer routing, role checks, ID generation, Dashboard cards — reads from this registry. No module-specific logic is hardcoded outside this registry and its associated payload type and renderer.

### Registry Entry Shape

```
ModuleDefinition {
  key          : ModuleKey        // Unique identifier: 'safety' | 'cash' | 'expense' | 'escort' | 'moc'
  label        : { en: string, fr: string }   // Display name in both languages
  color        : string           // Brand color hex (used in badges, cards, module chips)
  icon         : string           // Icon name from the platform icon system
  idPrefix     : string           // Internal reference prefix: CHM, ADV, EXP, ESC, MOC
  status       : ModuleStatus     // 'live' | 'beta' | 'soon'
  stages       : StageDefinition[]  // Ordered workflow stages (see §3)
  adminRole    : string           // Nav group for this module's admin pages
}

StageDefinition {
  key          : string           // Machine-readable stage key
  label        : { en: string, fr: string }
  slaHours     : number           // Maximum allowed dwell time in business hours
  assignedRoles: string[]         // Which platform roles can act at this stage
}
```

### Current Registry

| Key | Label (EN) | Prefix | Status | Stages |
|---|---|---|---|---|
| `safety` | Safety Data | CHM | live | 5 (Submission → Review Complete) |
| `cash` | Cash Advance | ADV | live | 3–4 (conditional CFO stage) |
| `expense` | Daily Expense | EXP | live | 3 |
| `escort` | Security Escort | ESC | live | 4 |
| `moc` | Management of Change | MOC | beta | 5 |

### Derived Behaviors

Everything listed below is **derived from the registry** — not hardcoded in individual components:

| Surface | What it reads from registry |
|---|---|
| Dashboard module cards | All entries with status `live` or `beta` |
| My Requests filter chips | All entries with status `live` or `beta` |
| Approvals filter tabs | All entries with status `live` or `beta` |
| Solutions nav items | All entries |
| Module admin nav groups | entries where current user has module_admin access |
| Request ID prefix | `idPrefix` per entry |
| Drawer payload routing | `key` as discriminator |
| i18n module labels | `label.en` / `label.fr` |
| Badge colors | `color` per entry |

### Module Status Flags

| Status | Dashboard card | Nav item | Filter chips | Can submit |
|---|---|---|---|---|
| `live` | Full data card | Visible | Visible | Yes |
| `beta` | Full data card + beta badge | Visible | Visible | Yes (limited users) |
| `soon` | Placeholder card | Visible (grayed) | Hidden | No |

---

## 5. User Roles Architecture

### Purpose

The role model controls what each user can see, submit, review, and administer. The current model uses a blunt `hidden[]` array to hide nav items — it has no concept of module-scoped permissions and cannot express nuanced access rules. This specification replaces it with a two-tier model.

### Two-Tier Model

**Tier 1 — Platform Role**  
Defines the user's function on the platform. One role per user.

| Role | Key | Description |
|---|---|---|
| Field User | `field_user` | Submits requests; views own submissions only |
| HSE Reviewer | `she_reviewer` | Reviews requests at assigned stages |
| Store Manager | `store_manager` | Submits requests; manages site-level inventory |
| Module Admin | `module_admin` | Administers one or more specific modules |
| Global Admin | `global_admin` | Full platform access; manages users, roles, settings |

**Tier 2 — Module Access Array**  
Lists which modules the user can interact with. Supplements the platform role.

```
User {
  id            : string
  name          : string
  email         : string
  avatar        : string           // Two-letter initials
  platformRole  : PlatformRole
  moduleAccess  : ModuleKey[]      // e.g. ['safety', 'cash']
  site          : string           // Primary site assignment
}
```

**How the two tiers combine:**

- A `field_user` with `moduleAccess: ['safety', 'cash']` can submit Safety Data and Cash Advance requests but not Escort or MOC.
- A `module_admin` with `moduleAccess: ['safety']` is the Safety Data administrator — full access to Safety Data requests and Safety Data admin pages, but not Cash Advance or platform settings.
- A `global_admin` implicitly has access to all modules regardless of `moduleAccess`.

### Role × Module Permission Matrix

The following matrix defines what each platform role can do within a module, assuming that module appears in the user's `moduleAccess[]`:

|  | Submit | View own | View all (module) | Approve/Reject | Configure module |
|---|---|---|---|---|---|
| `field_user` | Yes | Yes | No | No | No |
| `she_reviewer` | Yes | Yes | Assigned only | Yes (own stage) | No |
| `store_manager` | Yes | Yes | No | No | No |
| `module_admin` | Yes | Yes | Yes | Yes (all stages) | Yes |
| `global_admin` | Yes | Yes | Yes | Yes | Yes |

### My Requests Scope by Role

| Role | Sees in My Requests |
|---|---|
| `field_user` | Own submissions only |
| `she_reviewer` | Own submissions + requests where they are assigned reviewer |
| `store_manager` | Own submissions only |
| `module_admin` | All requests in moduleAccess[] modules |
| `global_admin` | All requests on the platform |

### Nav Visibility Derivation

Nav visibility is derived from `(platformRole, moduleAccess)` at render time — not stored as a hardcoded list. The derivation rules:

| Nav item | Visible to |
|---|---|
| Dashboard | All |
| My Requests | All |
| Safety Data nav group | Users with `safety` in moduleAccess[] |
| Cash Advance | Users with `cash` in moduleAccess[] |
| Daily Expense | Users with `expense` in moduleAccess[] |
| Security Escort | Users with `escort` in moduleAccess[] |
| Management of Change | Users with `moc` in moduleAccess[] |
| Safety Data Administration nav group | `module_admin` (safety) + `global_admin` |
| Platform Administration nav group | `global_admin` only |

---

## 6. Global Admin Responsibilities

### Purpose

Global Admin manages platform-wide concerns that apply across all modules. A Global Admin does not manage module-specific configuration — that belongs to the Module Admin (see §7). This separation ensures that a Safety Data admin cannot accidentally affect Cash Advance workflows or modify user roles.

### Scope: Platform-Wide Only

Global Admin is responsible for:

| Area | Responsibility |
|---|---|
| User Management | Create, edit, deactivate user accounts |
| Role Assignment | Assign `platformRole` and `moduleAccess[]` to each user |
| Azure SSO | Configure tenant ID, organization domain, SSO provider |
| Platform Settings | Email notification settings, language defaults, SLA policies |
| Cross-Module Approvals | View and act on approval items from any module |
| Audit Log | View all platform events: logins, role changes, approvals, rejections |

### Nav Group: Platform Administration

```
PLATFORM ADMINISTRATION
  ├── Approvals           (cross-module inbox)
  ├── Users & Roles       (user management + role assignment)
  ├── Platform Settings   (Azure SSO, org domain, notification config)
  └── Audit Log
```

Visibility: `global_admin` only.

### Pages Detail

**Users & Roles**
- User list: name, email, platform role, module access, site, status (active/inactive)
- Actions: invite user, edit role, edit module access, deactivate
- Role assignment enforces that `global_admin` cannot assign a role higher than their own

**Platform Settings**
- Azure tenant ID (read-only after initial config)
- Azure SQL server endpoint
- Organization domain
- SSO provider (Microsoft Entra ID)
- Default language (EN / FR)
- SLA business hours definition (start time, end time, excluded weekends/holidays)

**Approvals (cross-module)**
- Same inbox as the Approvals page available to reviewers, but without module scope restriction
- Global Admin can act as a delegate approver on any module, on any stage
- Global Admin can reassign stuck approvals

**Audit Log**
- Immutable log of all platform events
- Filters: date range, event type, user, module
- Export to CSV

### What Global Admin Does NOT Own

- Chemical inventory, manufacturers, PPE, storage — these are Safety Data Admin concerns
- Module workflow stage configuration — owned by each module's admin
- Individual request data — Global Admin can view but does not routinely manage request content

---

## 7. Safety Data Admin Responsibilities

### Purpose

Safety Data Admin manages the reference data and workflow configuration that the Safety Data module depends on. These responsibilities are module-specific and must remain separate from platform administration to maintain clear ownership and prevent privilege escalation between module types.

### Scope: Safety Data Module Only

| Area | Responsibility |
|---|---|
| Chemical Inventory | Master sheet of all approved chemicals across all sites |
| Manufacturers | Supplier registry (name, contact, address, certifications) |
| PPE Reference | GHS-aligned PPE catalog with pictogram mappings |
| Storage Locations | Site-level storage location registry (by site, zone, capacity) |
| Approval Workflows | Stage sequence configuration, reviewer assignment, backup reviewer assignment |
| GHS Classification | Hazard classification reference data |

### Nav Group: Safety Data Administration

```
SAFETY DATA ADMINISTRATION
  ├── Chemical Inventory   (master sheet — all sites)
  ├── Manufacturers        (supplier registry)
  ├── PPE                  (GHS PPE catalog)
  ├── Storage              (storage location registry)
  └── Workflows            (stage config, reviewer assignment)
```

Visibility: `module_admin` with `moduleAccess: ['safety']` + `global_admin`.

### Pages Detail

**Chemical Inventory**
- Full master sheet across all sites (not site-scoped like the field user view)
- Actions: edit quantity, edit storage location, mark for review, archive
- Filters: site, hazard class, manufacturer, status

**Manufacturers**
- Full supplier directory
- Fields: name, contact email, phone, address, country, certifications
- Actions: add, edit, deactivate
- Referenced by New Chemical submission form (auto-fill)

**PPE**
- GHS pictogram-to-PPE mapping reference
- Actions: add PPE item, map to pictogram(s), edit, deactivate
- Referenced by New Chemical hazard classification section (auto-suggested PPE)

**Storage**
- Location registry per site
- Structure: Site → Zone → Location → Capacity
- Actions: add site, add zone, add location, set capacity, deactivate
- Referenced by New Chemical SDS & Storage section (location selector)

**Workflows**
- Stage sequence per workflow type (New Chemical, Add to Site)
- Per-stage configuration: stage name, assigned role, backup reviewer, SLA hours
- Actions: reorder stages, add stage, remove stage, assign reviewer

### What Safety Data Admin Does NOT Own

- User accounts or role assignments — Global Admin responsibility
- Azure SSO or platform settings — Global Admin responsibility
- Approval inboxes from other modules — not visible to module_admin (safety)

### Separation Principle

A user with `module_admin` + `moduleAccess: ['safety']` can access all Safety Data Admin pages and see all Safety Data requests in the Approvals inbox. They cannot:
- Access the Users & Roles page
- Access Platform Settings
- See Cash Advance, Expense, Escort, or MOC requests in any view
- Modify another module's workflow configuration

---

## 8. Future Module Onboarding Process

### Purpose

This checklist defines the exact steps required to add a new module to the platform. Following this process ensures that every module integrates with My Requests, Approvals, the Dashboard, role controls, and navigation without requiring changes to shared platform code.

### Prerequisites

Before beginning, the following must be defined for the new module:
- Module name (EN + FR)
- Request type(s) the module will handle
- Workflow stages (ordered sequence, SLA per stage)
- Which platform roles will submit, review, and administer the module
- The module's brand color and icon

### Onboarding Checklist

**Step 1 — Registry Entry**
Add one entry to the MODULES registry with: `key`, `label` (EN + FR), `color`, `icon`, `idPrefix`, `status: 'soon'`, `stages[]`, `adminRole`.

The module immediately appears in the Solutions nav as "Coming soon" and as a placeholder Dashboard card. All other surfaces remain unaffected.

**Step 2 — Payload Type**
Define the module's payload type following the pattern established in §2. Fields should be the minimum required for the submission form and for the detail drawer's payload section.

**Step 3 — Submission Form**
Create the request submission page (`page-new-[module]`). The form must:
- Collect all fields defined in the payload type
- Produce a `RequestEnvelope` with `moduleKey` set correctly
- Assign `status: 'draft'` on save and `status: 'submitted'` on submit
- Generate the platform-wide `TPC-YYYY-NNN` ID and the module-specific `idPrefix-NNN` internal ref

**Step 4 — Request List View**
The My Requests table requires no code changes. The new module's requests appear automatically once the envelope is populated, because the filter chips are registry-derived. Verify by setting `moduleAccess: ['new-module']` on a test user.

**Step 5 — Detail Drawer Renderer**
Create the module's payload renderer — the section of the drawer that displays module-specific fields. The drawer shell (header + timeline) is shared and requires no changes. Wire the renderer to the drawer via `moduleKey`.

**Step 6 — Stage Sequence**
The stages defined in Step 1 must be validated:
- Each stage has an `assignedRoles[]` listing which platform roles can act
- Each stage has a `slaHours` value
- The Approvals inbox automatically shows the new module's requests once `status: 'live'`

**Step 7 — Nav Items**
Register two nav items:
- Solution nav item (under Solutions section) — visible to users with the module in `moduleAccess[]`
- Admin nav item under a `[Module Name] Administration` group — visible to `module_admin` + `global_admin`

**Step 8 — Role Assignment**
In Users & Roles, the new `ModuleKey` must be available as an option in the `moduleAccess[]` selector. No code changes are needed if the selector is generated from the registry.

**Step 9 — i18n**
Add EN and FR strings for:
- Module name (already done in registry entry)
- All form field labels
- All payload display labels in the drawer renderer
- Any module-specific status messages or error messages

**Step 10 — Dashboard Card**
Change the module's `status` in the registry from `'soon'` to `'live'`. The Dashboard card automatically switches from placeholder to live data. The module now appears in all filter chips and approval tabs.

### Summary: What Changes vs. What Is Shared

| Component | Change required for new module |
|---|---|
| MODULES registry | Add one entry |
| Payload type | Define new type |
| Submission form | Create new page |
| My Requests table | No change |
| My Requests filter chips | No change (registry-derived) |
| Detail drawer shell | No change |
| Detail drawer payload section | Create one renderer |
| Approvals inbox | No change (registry-derived) |
| Dashboard module card | No change (registry-derived) |
| Nav items | Register 2 items |
| Role permission matrix | No change (roles are generic) |
| i18n | Add new keys |

---

## 9. Request Lifecycle Model

### Purpose

All requests on the platform — regardless of module — follow the same lifecycle state machine. The lifecycle defines permitted states, valid transitions, who can trigger each transition, and how history is recorded.

### States

| State | Key | Meaning |
|---|---|---|
| Draft | `draft` | Created and saved but not yet submitted. Visible only to submitter. |
| Submitted | `submitted` | Formally submitted. First-stage reviewers notified. |
| In Review | `in_review` | Actively being reviewed at the current stage. |
| Returned | `returned` | Sent back to submitter for correction. Submitter must resubmit. |
| Approved | `approved` | All stages passed. Request is closed and fulfilled. |
| Rejected | `rejected` | Rejected at any stage. Request is closed. |
| Cancelled | `cancelled` | Withdrawn by the submitter before approval. |

### State Machine

```
         ┌─────────────────────────────────────────────────────┐
         │                                                     │
    ┌────▼────┐   submit    ┌───────────┐   reviewer   ┌──────────────┐
    │  DRAFT  ├────────────►│ SUBMITTED ├─────────────►│  IN_REVIEW   │
    └─────────┘             └───────────┘              └──────┬───────┘
                                                              │
                        ┌─────────────────────────────────────┤
                        │          │           │               │
                   ┌────▼───┐ ┌───▼────┐ ┌────▼────┐ ┌───────▼────────┐
                   │APPROVED│ │REJECTED│ │RETURNED │ │ NEXT STAGE...  │
                   └────────┘ └────────┘ └────┬────┘ │ (loops back to │
                                              │      │  IN_REVIEW)    │
                                         resubmit    └────────────────┘
                                              │
                                         ┌────▼───────┐
                                         │ SUBMITTED  │
                                         │ (revision) │
                                         └────────────┘
```

### Permitted Transitions by Role

| Transition | Permitted roles |
|---|---|
| `draft` → `submitted` | Submitter (field_user, she_reviewer, store_manager, module_admin) |
| `submitted` → `in_review` | Assigned reviewer (automatic on first action) |
| `in_review` → `in_review` (next stage) | Assigned reviewer for current stage |
| `in_review` → `approved` | Assigned reviewer at final stage |
| `in_review` → `rejected` | Assigned reviewer or module_admin |
| `in_review` → `returned` | Assigned reviewer or module_admin |
| `returned` → `submitted` | Original submitter (resubmission creates a new revision) |
| `draft` → `cancelled` | Submitter only |
| `submitted` → `cancelled` | Submitter only (before first reviewer action) |
| `in_review` → `cancelled` | module_admin or global_admin only |

### Timeline Entry Schema

Every state transition appends an immutable entry to the request's timeline:

```
TimelineEntry {
  entryId    : string    // Unique entry ID
  stage      : string    // Stage name at time of action
  action     : string    // 'submitted' | 'advanced' | 'approved' | 'rejected' | 'returned' | 'cancelled'
  actor      : UserRef   // { id, name, avatar }
  timestamp  : datetime
  note       : string    // Optional reviewer comment or return reason
  slaStatus  : string    // 'ok' | 'at_risk' | 'breached' at time of action
}
```

### Immutability Rule

Timeline entries are **append-only**. Once written, an entry cannot be modified or deleted. This ensures a complete and tamper-evident audit trail for compliance purposes.

### Resubmission After Return

When a submitter resubmits a returned request:
- A new `RequestEnvelope` is created with a new `id` (TPC-YYYY-NNN+1)
- The `internalRef` increments (e.g. CHM-002 becomes the revision ref)
- The original request's `id` is stored in the new request as `previousRevisionId`
- The new request starts at `status: submitted`
- The original request's status remains `returned` (it is not overwritten)

This preserves the complete history of all revisions.

### Archival Policy

- Approved, rejected, and cancelled requests are **retained indefinitely** for audit purposes
- They are never deleted from the request store
- They are visible in My Requests under the "Closed" group (grouped view) or with a status filter
- Archive export (CSV or PDF) is available to module_admin and global_admin

---

## 10. Security and Access Model

### Purpose

This section defines how the platform authenticates users, enforces access control, protects data, and maintains an audit trail. It establishes the principles that must be upheld as the platform moves from a prototype to a production system.

### Authentication

**Provider:** Microsoft Azure Active Directory (Entra ID)  
**Method:** Single Sign-On (SSO) via OAuth 2.0 / OpenID Connect  
**Configuration:** Azure tenant ID, organization domain (`tpc-tchad.td`), and SSO provider are configured in Platform Settings (Global Admin only)

All users authenticate through Azure AD. The platform does not manage passwords. Session tokens are issued by Azure AD and validated on each request.

### Authorization Model

**Principle:** Authorization is enforced at the **data layer**, not only at the UI layer.

The current implementation hides nav items based on a `hidden[]` array — this is a UX convenience, not a security boundary. In the production system:

- Every data query is scoped by `(platformRole, moduleAccess[])` server-side
- A `field_user` query for the request list is automatically filtered to `submittedBy = currentUser`
- A `module_admin` query is scoped to `moduleKey IN (user.moduleAccess[])`
- UI-level hiding of nav items is additive to, not a substitute for, server-side enforcement

### Data Isolation Rules

| Role | Read scope | Write scope |
|---|---|---|
| `field_user` | Own submissions; public module reference data | Own drafts; submit own requests |
| `she_reviewer` | Own submissions + assigned reviews | Own drafts; approve/reject/return at assigned stage |
| `store_manager` | Own submissions; site inventory | Own drafts; submit own requests |
| `module_admin` | All requests in moduleAccess[] modules; module config data | All requests in module; module config |
| `global_admin` | Everything | Everything (within platform boundaries) |

### Admin Separation Principle

This is a hard architectural rule:

> A Safety Data Admin (`module_admin` + `moduleAccess: ['safety']`) **must not** be able to read, write, or influence platform settings, user accounts, role assignments, or data from other modules.

This is enforced by:
1. Separate nav groups with role-gated visibility
2. Server-side role checks on every admin page endpoint
3. `moduleAccess[]` scoping on all data queries
4. The two-tier role model (platform role + module access) making it structurally impossible to grant module-level admin access to platform-level resources

### Sensitive Data Handling

| Data category | Location | Protection |
|---|---|---|
| User credentials | Azure AD — never stored in platform | Azure AD security policies |
| Request payloads | Platform database (Azure SQL) | Role-scoped queries |
| SDS attachments | Azure Blob Storage | Signed URLs; access scoped by moduleAccess[] |
| Audit log | Append-only table | No delete permission; global_admin read-only |
| Azure tenant ID | Platform Settings | Displayed read-only after initial config |

No personally identifiable information beyond `name` and `email` is stored in request payloads. Chemical names, cash amounts, and route descriptions are operational data, not PII.

### Audit Trail

Every security-relevant event is logged:

| Event category | Events logged |
|---|---|
| Authentication | Login, logout, failed login, session expiry |
| Role changes | Role assigned, role changed, module access modified |
| Request lifecycle | All state transitions (see §9 timeline entries) |
| Admin actions | User created, user deactivated, workflow stage changed |
| Data access | Bulk exports, audit log access |

Audit log entries are immutable (append-only). They are accessible only to `global_admin`. Export is available for compliance reporting.

### Future Backend Considerations

The current platform is a prototype with client-side data. When transitioning to a production backend (Azure SQL + Azure Functions or equivalent), the following security controls must be implemented:

1. All API endpoints validate JWT from Azure AD before processing
2. Row-level security in Azure SQL enforces `moduleAccess[]` scoping
3. No endpoint returns data outside the caller's role scope, regardless of query parameters
4. HTTPS enforced for all traffic (no HTTP fallback)
5. API rate limiting per user to prevent abuse
6. Secrets (connection strings, API keys) stored in Azure Key Vault, not in application config

---

## Appendix: Navigation Structure

The complete navigation structure derived from this architecture:

```
PLATFORM
  Dashboard
  My Requests

SOLUTIONS
  Safety Data ▾
    New Chemical
    Master Sheet
    Add to my site
    User Guide
  Cash Advance ▾
    New Advance
    My Advances
    Reconciliation
  Daily Expense ▾
    New Expense
  Security Escort ▾
    New Escort Request
  Management of Change ▾
    New MOC

SAFETY DATA ADMINISTRATION        ← module_admin (safety) + global_admin
  Chemical Inventory
  Manufacturers
  PPE
  Storage
  Workflows

[MODULE] ADMINISTRATION           ← pattern for each future module admin
  (module-specific pages)

PLATFORM ADMINISTRATION           ← global_admin only
  Approvals
  Users & Roles
  Platform Settings
  Audit Log
```

---

## Appendix: Glossary

| Term | Definition |
|---|---|
| Module | A distinct functional area of the platform (Safety Data, Cash Advance, etc.) |
| ModuleKey | Machine-readable identifier for a module: `safety`, `cash`, `expense`, `escort`, `moc` |
| RequestEnvelope | The shared wrapper for all requests; discriminated by `moduleKey` |
| Payload | Module-specific data within a RequestEnvelope |
| Platform Role | The user's functional role on the platform (field_user, module_admin, etc.) |
| Module Access | The list of modules a user is authorized to interact with |
| Stage | One step in a module's approval workflow |
| SLA | Service Level Agreement — the maximum time allowed for a stage before it is considered breached |
| Bottleneck | The stage with the highest average dwell time across active requests |
| MODULES Registry | The central configuration object that defines all modules and their metadata |
| Global Admin | Platform-wide administrator; manages users, roles, and platform settings |
| Module Admin | Module-specific administrator; manages one module's config and requests |
| Timeline | The append-only audit log of all state transitions on a request |
| Revision | A new version of a request created when a submitter resubmits after a return |
