# eTPC — Enterprise Technology Platform for Chad Petroleum
## Platform Blueprint Document

---

**Document Reference:** eTPC-BLUEPRINT-v1.0  
**Version:** 1.0  
**Date:** 31 May 2026  
**Classification:** Internal — Management Distribution  
**Status:** Approved for Development Guidance  
**Owner:** Information Technology Department — TPC Chad

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Platform Vision](#2-platform-vision)
3. [Global Dashboard Architecture](#3-global-dashboard-architecture)
4. [My Requests Architecture](#4-my-requests-architecture)
5. [Approvals Architecture](#5-approvals-architecture)
6. [Module Registry Architecture](#6-module-registry-architecture)
7. [User Role Model](#7-user-role-model)
8. [Global Admin Model](#8-global-admin-model)
9. [Safety Data Admin Model](#9-safety-data-admin-model)
10. [Request Lifecycle](#10-request-lifecycle)
11. [Security and Access Model](#11-security-and-access-model)
12. [Azure Deployment Strategy](#12-azure-deployment-strategy)
13. [SharePoint Integration Strategy](#13-sharepoint-integration-strategy)
14. [Future Module Onboarding](#14-future-module-onboarding)

---

## 1. Executive Summary

### Overview

The eTPC platform is TPC Chad's enterprise digital operations hub. It centralises request submission, multi-level approval workflows, compliance documentation, and operational reporting across all functional departments — replacing paper-based and siloed processes with a single, governed, auditable system.

The platform is built on Microsoft Azure infrastructure, integrated with Microsoft Entra ID (Azure Active Directory) for single sign-on, and designed for gradual expansion across business units without requiring architectural rework at each step.

### Current State

Safety Data is the platform's first live module. It covers chemical inventory management, Safety Data Sheet (SDS) storage, PPE assignment, hazard classification, and a six-stage HSE approval workflow. The platform currently serves users across TPC Chad's operational sites: Douala, PS2-Dompta, PS3-Belabo, PRS-Kribi, and FSO.

The current "My Requests" surface shows Safety Data requests only. Administration functions — user management, approvals, and platform settings — are grouped together without distinction between platform-level and module-level concerns.

### Strategic Direction

This blueprint defines the architecture required to transform eTPC from a single-module tool into a platform that governs all operational request and approval workflows across the company. Four additional modules are in scope for this phase: Cash Advance, Daily Expense, Security Escort, and Management of Change.

The key architectural decisions documented in this blueprint are:

- A unified request model that serves all modules without structural change for each addition
- A global request center ("My Requests") that replaces the Safety Data-only view
- A separated administration model — platform administration distinct from module-level administration
- A two-tier role model that controls access at both the platform level and the individual module level
- A module registry that makes adding a new module a configuration exercise, not a rebuild
- Azure-native deployment aligned with TPC Chad's existing Microsoft infrastructure
- SharePoint Online integration for document management and record archival

### Key Decisions at a Glance

| Decision | Choice | Rationale |
|---|---|---|
| Cloud platform | Microsoft Azure | Aligned with existing Azure AD SSO and SQL infrastructure |
| Authentication | Azure AD SSO (Entra ID) | Eliminates separate credentials; enforces corporate identity |
| Document storage | SharePoint Online | Integrated with Microsoft 365; supports SDS versioning and audit retention |
| Request model | Universal envelope with module payload | New modules require no changes to shared platform code |
| Administration model | Platform Admin separated from Module Admin | Prevents privilege escalation; each admin owns only their domain |
| Role model | Platform role + module access array | Fine-grained control without complex permission matrices |
| Request history | Append-only, immutable timeline | Tamper-evident audit trail for HSE and finance compliance |

---

## 2. Platform Vision

### Mission

To provide TPC Chad with a single, reliable, and auditable platform for managing all operational requests and approvals — from chemical registrations and cash advances to security escorts and management of change — ensuring that every transaction is visible, traceable, and governed.

### Design Principles

**1. One platform, many modules.**
Every department uses the same underlying platform. Request submission, approval workflows, status tracking, and administration follow the same patterns regardless of module. Users learn the platform once.

**2. Configuration over rebuild.**
Adding a new module — whether Finance, HR, Maintenance, or any other department — does not require rewriting shared platform features. Module-specific content is contained; platform infrastructure is reused.

**3. Access earned, not assumed.**
Users access only the modules and functions they are explicitly assigned. Access is enforced at the data level, not just the user interface. Module administrators cannot reach platform settings. Platform administrators do not routinely manage module content.

**4. Every action is recorded.**
All request transitions, approvals, rejections, and administrative changes are logged in an immutable timeline. Nothing is deleted. The record is always available for audit, compliance review, or dispute resolution.

**5. Bilingual by default.**
The platform is designed for English and French from the start. All user-facing content is maintained in both languages. No feature is delivered in one language only.

**6. Built on the company's existing infrastructure.**
The platform extends Microsoft Azure, Azure Active Directory, SharePoint Online, and Azure SQL — services TPC Chad already operates. There is no new identity provider, no new document store, no new cloud vendor to onboard.

### Target Modules

The following modules are in scope for the current phase:

| Module | Status | Primary Function |
|---|---|---|
| Safety Data | Live | Chemical inventory, SDS management, HSE approval workflow |
| Cash Advance | Live | Cash advance requests, line manager and finance approval |
| Daily Expense | Live | Expense submissions, receipt management, finance validation |
| Security Escort | Live | Personnel escort requests, security and operations approval |
| Management of Change | In development | Formal change requests, technical and management approval |

Future modules may include: Maintenance Work Orders, HR Onboarding, Procurement Requests, Training Records, and Permit to Work. Each will follow the same onboarding process defined in Section 14.

### Supported Sites

The platform serves all TPC Chad operational locations:

| Site Code | Location |
|---|---|
| Douala | Douala Headquarters |
| PS2 | PS2-Dompta |
| PS3 | PS3-Belabo |
| PRS | PRS-Kribi |
| FSO | FSO Offshore Platform |

---

## 3. Global Dashboard Architecture

### Purpose

The Global Dashboard is every user's entry point to the platform. It is a role-aware, cross-module overview that surfaces what requires immediate attention — pending approvals, SLA breaches, and module health — without requiring the user to navigate into each module separately.

### What the Dashboard Shows

The dashboard is composed of three zones:

**Zone 1 — KPI Strip (top bar)**
Three headline metrics calculated in real time, scoped to the logged-in user's role:

| Metric | Definition |
|---|---|
| Total Pending | All requests currently awaiting action (submitted or in review) |
| Approvals Due Today | Requests assigned to the current user that require action today |
| SLA Breached | Requests that have exceeded their stage's maximum review time |

**Zone 2 — Module Cards (centre grid)**
One card per active module, showing:
- Module name and visual identity
- Count of active requests in that module
- Current bottleneck — the stage where requests are taking longest
- SLA health indicator: On Track / At Risk / Breached

Modules configured with a "Coming Soon" status display as placeholder cards with no live data. This allows users to see that a module is planned without accessing it prematurely.

**Zone 3 — Live Activity Feed (bottom panel)**
A real-time stream of the 20 most recent platform events across all modules: submissions, stage advances, approvals, rejections, and SLA breaches. Each event shows the relevant module, request identifier, the person who acted, and the timestamp.

### Role-Aware Behaviour

The dashboard adapts to the role of the logged-in user. Field users see only their own activity. Administrators see the full platform view.

| Role | KPI scope | Modules displayed | Activity feed |
|---|---|---|---|
| Field User | Own submissions only | Modules assigned to them | Own requests only |
| HSE Reviewer | Own submissions and assigned reviews | Modules assigned to them | Own and assigned |
| Module Administrator | Entire module | Their assigned module(s) | Full module events |
| Global Administrator | Entire platform | All active modules | All platform events |

---

## 4. My Requests Architecture

### Purpose

My Requests is the platform's global self-service request center. It replaces the current Safety Data-only view with a unified list of all requests a user has submitted, across every module. From My Requests, a user can check the status of any request, view the full approval timeline, and access the detail of any submission — regardless of which module it belongs to.

### The Universal Request Model

Every request on the platform — a chemical registration, a cash advance, an escort request, a change record — is stored in the same structural format. This format has two layers:

**The Envelope** contains information that is true of every request, regardless of module: the request identifier, the module it belongs to, the submitter, the site, the submission date, the current status, the current approval stage, and the full history of all actions taken.

**The Payload** contains module-specific information attached to the envelope. A Safety Data payload holds chemical name, hazard codes, and PPE requirements. A Cash Advance payload holds the amount, currency, cost centre, and expected return date. Each module defines its own payload. The envelope never changes when a new module is added.

This separation means that My Requests, the Approvals inbox, and the Dashboard all work identically regardless of which modules are active. There is no Safety Data-specific code in the request list — only module-aware rendering of a universal structure.

### Request Identification

Every request receives two identifiers at submission:

| Identifier | Format | Purpose |
|---|---|---|
| Platform ID | TPC-2026-001 | Universal reference, used across My Requests, Approvals, and notifications |
| Module Reference | CHM-001, ADV-012, ESC-007, etc. | Module-internal reference, used in SDS lookups, finance records, and module-specific reports |

The platform ID is the primary identifier for all cross-module operations. The module reference is retained for integration with module-specific systems (such as chemical SDS filing by CHM code).

### Module Reference Prefixes

| Module | Prefix | Example |
|---|---|---|
| Safety Data | CHM | CHM-145 |
| Cash Advance | ADV | ADV-012 |
| Daily Expense | EXP | EXP-031 |
| Security Escort | ESC | ESC-007 |
| Management of Change | MOC | MOC-003 |

### Filtering and Display

My Requests displays all of a user's requests in a filterable table. A filter bar at the top of the page allows the user to narrow the view to a specific module:

All requests — Safety Data — Cash Advance — Daily Expense — Security Escort — MOC

Each tab shows the count of requests in that module. The filter tabs are generated from the Module Registry (see Section 6), so newly activated modules appear automatically without page changes.

The table displays: Request ID, Module, Type, Title, Submission Date, Current Stage, and Status.

A grouped view option organises requests into three sections:
- **Action Needed** — requests that have been returned and require submitter correction
- **In Progress** — requests currently moving through the approval workflow
- **Closed** — approved, rejected, or cancelled requests

### Request Detail Panel

Clicking any request opens a detail panel on the right side of the screen. The panel is structured in three sections that apply to every module:

**Header** — Request ID, module badge, type, title, submitter name, site, and submission date.

**Approval Timeline** — A visual track of every stage in the workflow, showing which stages are complete (with the reviewer name and date), which stage is currently active (with the reviewer name and elapsed time), and which stages are pending. Every reviewer comment and return note appears here.

**Module Details** — The content of the request payload, rendered in a layout appropriate to that module: chemical properties and hazard classifications for Safety Data requests, financial details and receipts for Cash Advance requests, route and personnel details for Escort requests.

The header and timeline are shared across all modules. Only the module details section differs, and each module provides its own layout for that section.

---

## 5. Approvals Architecture

### Purpose

The Approvals inbox is the platform's unified action center for reviewers and administrators. Rather than each module having its own separate approval queue, all pending review tasks from every module appear in a single inbox. A reviewer assigned to Safety Data IH Review and Cash Advance Line Manager approval sees both items in one place and does not need to navigate between modules to clear their queue.

### Inbox Design

The inbox presents a filterable list of requests awaiting action. Filter tabs mirror those in My Requests — All, Safety Data, Cash Advance, and so on — allowing a reviewer to focus on a specific module when needed.

Each row in the inbox shows: the module badge, the request identifier, the request title, the current stage, who submitted it, the submission date, and the SLA status indicator.

Rows can be sorted by age (oldest first), by SLA urgency (most at-risk first), or by module.

### Approval Actions

A reviewer acting on a request in the inbox has five options:

| Action | Meaning | Who can perform |
|---|---|---|
| Approve | Advance the request to the next stage | Assigned reviewer for the current stage |
| Reject | Close the request as not approved | Assigned reviewer or Module Administrator |
| Return for Correction | Send back to the submitter with a note explaining what needs to change | Assigned reviewer or Module Administrator |
| Delegate | Transfer responsibility for the current stage to a different reviewer | Module Administrator or Global Administrator |
| Escalate | Flag the request as urgent and notify the next-level administrator | Module Administrator or Global Administrator |

### Bulk Actions

When a reviewer selects multiple items in the inbox, a bulk action bar appears at the bottom of the screen. Bulk Approve processes all selected requests simultaneously, each generating its own timeline entry. Bulk Reject requires a single shared rejection reason to be applied to all selected requests. Bulk actions are scoped to the active module filter — a reviewer cannot accidentally process items from a different module.

### Approval Workflows by Module

Each module defines its own approval stage sequence. Stages are not shared across modules. The configured sequences for current modules are:

| Module | Approval Stages |
|---|---|
| Safety Data | Submission → Safety Review → EMP Review → IH Review → Review Complete |
| Cash Advance | Submission → Line Manager Approval → Finance Review → CFO Approval (if above threshold) |
| Daily Expense | Submission → Line Manager Approval → Finance Validation |
| Security Escort | Submission → Security Coordinator Review → HSE Sign-off → Operations Approval |
| Management of Change | Submission → Technical Review → HSE Review → Management Approval → Implementation Sign-off |

### SLA Management

Each stage in every module's workflow has a maximum dwell time — the number of business hours the request may remain at that stage before the SLA is considered breached. The platform tracks three SLA states:

| State | Condition | Indicator |
|---|---|---|
| On Track | Less than 75% of the allotted time has elapsed | Green |
| At Risk | Between 75% and 100% of the allotted time has elapsed | Amber |
| Breached | More than 100% of the allotted time has elapsed | Red |

When a request reaches "At Risk" status, the assigned reviewer is notified. When a request breaches its SLA, the reviewer and the Module Administrator are both notified.

### Bottleneck Identification

The platform identifies the bottleneck stage within each module — the stage where requests spend the most time on average. This information is surfaced on the Global Dashboard module card and is used to guide workflow optimisation decisions. A persistent bottleneck at a particular stage indicates a staffing, process, or SLA configuration issue that management can address.

### Notification Events

The following events trigger automated notifications to the relevant parties:

| Event | Recipients |
|---|---|
| Request submitted | First-stage reviewers |
| Request advanced to next stage | Reviewers assigned to the next stage |
| Request approved | Submitter |
| Request rejected | Submitter and Module Administrator |
| Request returned for correction | Submitter |
| SLA at risk (75% elapsed) | Assigned reviewer at current stage |
| SLA breached | Assigned reviewer and Module Administrator |

---

## 6. Module Registry Architecture

### Purpose

The Module Registry is the platform's central directory of all modules. It is the single source of truth for what modules exist, what they are called, how they are identified, what their approval stages are, and how they should be displayed across the platform.

Every platform surface that needs to know what modules are available — the navigation sidebar, the Dashboard module cards, the My Requests filter tabs, the Approvals inbox tabs, the user access assignment interface — reads from this registry. Nothing about a module's identity or structure is hardcoded outside it.

### What the Registry Defines for Each Module

For each module, the registry holds:

| Field | Purpose |
|---|---|
| Module key | The internal identifier used throughout the platform |
| Display name | The name shown to users, in English and French |
| Visual identity | The brand colour and icon used in badges and cards |
| Reference prefix | The prefix used in module-specific IDs (CHM, ADV, EXP, etc.) |
| Status | Whether the module is live, in beta, or coming soon |
| Approval stages | The ordered list of stages, each with its SLA and the roles that can act |
| Admin group | The navigation group under which this module's admin pages appear |

### Current Module Directory

| Module | Key | Prefix | Status | Stages |
|---|---|---|---|---|
| Safety Data | safety | CHM | Live | 6 |
| Cash Advance | cash | ADV | Live | 3 to 4 |
| Daily Expense | expense | EXP | Live | 3 |
| Security Escort | escort | ESC | Live | 4 |
| Management of Change | moc | MOC | In development | 5 |

### Module Status and Its Effect

The status flag in the registry controls how a module appears across the platform:

| Status | Dashboard | Navigation | Filter tabs | Can submit |
|---|---|---|---|---|
| Live | Full data card | Fully visible | Visible with counts | Yes |
| Beta | Full data card with beta badge | Visible | Visible with counts | Yes, for designated users |
| Coming Soon | Placeholder card | Visible but inactive | Not shown | No |

### Derived Platform Behaviour

The following platform behaviours are all derived automatically from the registry. None of them require individual updates when a new module is added:

- Dashboard module cards are generated from all Live and Beta registry entries
- My Requests filter tabs are generated from all Live and Beta entries
- Approvals inbox filter tabs are generated from all Live and Beta entries
- Navigation solution items are generated from all entries regardless of status
- Module admin navigation groups are generated per entry for users with the appropriate access
- Request ID prefixes are taken from the registry entry for the relevant module
- Module badges, colours, and labels displayed throughout the platform come from the registry

This means that activating a new module — changing its status from Coming Soon to Live — is sufficient to make it appear across the entire platform at once.

---

## 7. User Role Model

### Purpose

The role model defines what each person on the platform can see, submit, review, and administer. The current model controls visibility by hiding navigation items for certain roles, which is a display convenience but not a security control. This blueprint replaces it with a two-tier model that enforces access at the data level.

### Two-Tier Access Design

Access on the eTPC platform is determined by two complementary attributes assigned to every user:

**Tier 1 — Platform Role**
A single role that defines the user's function across the platform. Every user has exactly one platform role.

| Role | Description |
|---|---|
| Field User | Submits requests. Views only their own submissions. Cannot access any administration functions. |
| HSE Reviewer | Reviews and approves requests at the stages they are assigned to. Can also submit requests. |
| Store Manager | Submits requests. Manages site-level inventory data. Cannot approve or administer. |
| Module Administrator | Administers one or more specific modules. Can approve, reject, configure workflows, and view all requests within their assigned modules. Cannot access platform-level administration. |
| Global Administrator | Full access to the platform. Manages users, roles, and platform-level settings. Can act on any request in any module. |

**Tier 2 — Module Access**
An explicit list of modules the user is permitted to interact with. This list is assigned by the Global Administrator and can contain any combination of active modules.

A Field User with Safety Data and Cash Advance in their module access list can submit requests in those two modules and see them in My Requests, but cannot submit Escort requests or see Expense requests. A Module Administrator with only Safety Data in their access list can administer Safety Data fully but has no visibility into any other module.

A Global Administrator has access to all modules implicitly, regardless of what the module access list contains.

### How the Two Tiers Work Together

The two tiers combine to produce precise, auditable access rules:

- Platform Role defines the category of action (submit, review, administer, govern)
- Module Access defines the scope of modules where that action is permitted

This design means that adding a new module to the platform does not require creating new roles or rewriting permission logic. The Module Administrator role and the module access mechanism handle any new module automatically.

### Role and Module Permission Matrix

The following matrix shows what each role can do within any module that appears in their module access list:

| Capability | Field User | HSE Reviewer | Store Manager | Module Admin | Global Admin |
|---|---|---|---|---|---|
| Submit new requests | Yes | Yes | Yes | Yes | Yes |
| View own submissions | Yes | Yes | Yes | Yes | Yes |
| View all requests (module) | No | Assigned only | No | Yes | Yes |
| Approve or reject at assigned stage | No | Yes | No | Yes | Yes |
| Approve or reject at any stage | No | No | No | Yes | Yes |
| Configure module workflows | No | No | No | Yes | Yes |
| Manage users and roles | No | No | No | No | Yes |
| Access platform settings | No | No | No | No | Yes |

### My Requests Visibility by Role

| Role | Sees in My Requests |
|---|---|
| Field User | Own submissions only |
| HSE Reviewer | Own submissions plus requests where they are the assigned reviewer |
| Store Manager | Own submissions only |
| Module Administrator | All requests in their assigned modules |
| Global Administrator | All requests across all modules on the platform |

### Navigation Visibility Rules

Navigation is derived at runtime from the combination of platform role and module access. Nothing is stored as a hardcoded list of hidden items.

| Navigation section | Visible to |
|---|---|
| Dashboard | All users |
| My Requests | All users |
| Safety Data module | Users with Safety Data in their module access |
| Cash Advance module | Users with Cash Advance in their module access |
| Daily Expense module | Users with Daily Expense in their module access |
| Security Escort module | Users with Security Escort in their module access |
| Management of Change module | Users with MOC in their module access |
| Safety Data Administration | Module Administrators (Safety Data) and Global Administrators |
| Platform Administration | Global Administrators only |

---

## 8. Global Admin Model

### Purpose

Global Administration governs the platform as a whole. It is responsible for the infrastructure that all modules depend on: who has access, what roles they hold, how the platform connects to corporate systems, and what the audit record shows.

A Global Administrator does not own any module's content or configuration. That separation is deliberate and enforced — it prevents a single person from having unchecked access to both system governance and operational data.

### Responsibilities

| Area | Responsibilities |
|---|---|
| User Management | Create user accounts, edit user details, deactivate accounts when personnel leave or change roles |
| Role and Access Assignment | Assign platform roles and module access lists to every user |
| Azure SSO Configuration | Configure and maintain the connection to Microsoft Entra ID: tenant ID, organisation domain, SSO provider |
| Platform Settings | Set default language, define business hours for SLA calculations, configure email notification settings, manage public holidays that affect SLA tracking |
| Cross-Module Approvals | View and act on approval requests from any module; reassign stuck approvals; delegate approvals when reviewers are unavailable |
| Audit Log | Access the immutable log of all platform events for compliance review, investigation, or export |

### Platform Administration Pages

The following pages are accessible only to Global Administrators, under a dedicated Platform Administration section in the navigation:

**Users and Roles**
A complete directory of all platform users showing name, email address, platform role, module access list, primary site, and account status. The Global Administrator can invite new users, modify roles and access, and deactivate accounts. The system prevents assigning a role higher than Global Administrator, and requires that at least one active Global Administrator account exists at all times.

**Platform Settings**
The configuration interface for the platform's connection to Azure: the Azure tenant identifier, the Azure SQL server endpoint, the organisation domain, and the SSO provider. Language defaults and SLA business hour definitions are also managed here. The Azure tenant identifier becomes read-only once the initial configuration is committed.

**Approvals (Cross-Module)**
The full approval inbox without module scope restriction. The Global Administrator can view all pending items across all modules, delegate approvals to available reviewers, and intervene in workflows where no reviewer is available or where an approval is unreasonably delayed.

**Audit Log**
A complete, immutable record of every significant platform event. Filterable by date range, event type, user, and module. Exportable to CSV for compliance reporting. The audit log is described in detail in Section 11.

### What Global Administration Does Not Own

The following are explicitly outside the scope of Global Administration:

- Chemical inventory, manufacturer data, PPE catalog, and storage locations — these are Safety Data Administration responsibilities
- Approval workflow stage configurations for any module — each Module Administrator configures their own workflows
- The content of individual requests — Global Administrators can view requests but do not routinely manage or modify request data

---

## 9. Safety Data Admin Model

### Purpose

Safety Data Administration manages the reference data and workflow configuration that the Safety Data module depends on to function correctly. These responsibilities sit entirely within the Safety Data domain. They are managed by the Safety Data Module Administrator and are not accessible to administrators of other modules or to Global Administrators through the same interface.

### Responsibilities

| Area | Responsibilities |
|---|---|
| Chemical Inventory | Maintain the master list of all approved chemicals across all sites: quantities, storage locations, hazard classifications, and expiry or review dates |
| Manufacturer Registry | Manage the directory of chemical suppliers: contact details, addresses, countries of origin, and certifications |
| PPE Catalog | Maintain the platform's PPE reference data, including the mapping between GHS hazard pictograms and the PPE items automatically suggested during chemical registration |
| Storage Locations | Manage the storage location hierarchy for each site: site → zone → location → capacity. These locations populate the dropdown in the New Chemical submission form |
| Approval Workflows | Configure the stage sequence for each Safety Data workflow type (New Chemical, Add to Site). For each stage: assign the responsible role, assign a backup reviewer, set the maximum SLA duration |
| GHS Classification Reference | Maintain the Globally Harmonised System hazard classification reference data used in chemical submissions |

### Safety Data Administration Pages

The following pages are accessible to the Safety Data Module Administrator and to Global Administrators, under a dedicated Safety Data Administration section in the navigation:

**Chemical Inventory**
The full master sheet of all chemicals across all sites, not restricted by site as the field user view is. Actions available: edit quantities and storage locations, mark chemicals for periodic review, archive chemicals that are no longer in use. Filterable by site, hazard class, manufacturer, and status.

**Manufacturers**
The complete supplier directory. Each record holds the supplier name, contact email, phone number, postal address, country, and certifications. The manufacturer lookup in the New Chemical submission form reads from this directory and auto-fills contact details when a manufacturer is selected.

**PPE**
The PPE catalog aligned to GHS pictograms. Each PPE item is mapped to one or more GHS pictograms. When a user classifies a chemical with a particular set of pictograms during submission, the platform automatically suggests the PPE items mapped to those pictograms.

**Storage**
The storage location registry, organised by site, zone, and location, with capacity information. The storage location selector in the New Chemical form reads from this registry. Administrators can add new sites, zones, and locations as the operational footprint changes.

**Workflows**
The configuration interface for Safety Data approval workflows. Each workflow type (New Chemical, Add to Site) has its own stage sequence. Per-stage settings include the stage name, the platform role required to act, the designated backup reviewer, and the SLA duration in business hours.

### What Safety Data Administration Does Not Own

- User accounts and role assignments — these are Global Administration responsibilities
- Azure SSO and platform settings — these are Global Administration responsibilities
- Requests, workflows, or data from Cash Advance, Expense, Escort, or MOC — these are not visible to the Safety Data Module Administrator
- The ability to grant or revoke access to any system — access management belongs exclusively to Global Administration

### Separation Principle

A Safety Data Module Administrator has full authority over the Safety Data module and nothing beyond it. They cannot access the Users and Roles page, cannot view Platform Settings, and cannot see request data from any other module. This is a hard architectural boundary enforced at the data access layer, not only at the user interface.

---

## 10. Request Lifecycle

### Purpose

All requests on the platform — regardless of which module they originate from — follow the same lifecycle. The lifecycle defines the states a request can be in, the transitions that are permitted between states, who is authorised to trigger each transition, and how every action is permanently recorded.

### Request States

| State | Meaning |
|---|---|
| Draft | The request has been created and saved but not yet formally submitted. It is visible only to the submitter and can be edited or deleted before submission. |
| Submitted | The request has been formally submitted. The assigned first-stage reviewers have been notified. The submitter can no longer edit the request. |
| In Review | A reviewer has opened the request and is actively processing it at the current stage. |
| Returned | A reviewer has sent the request back to the submitter with a note explaining what needs to be corrected. The submitter must address the feedback and resubmit. |
| Approved | The request has passed all stages successfully. It is closed and its outcome is recorded. |
| Rejected | The request has been rejected at one of the stages. It is closed. The submitter and Module Administrator are notified. |
| Cancelled | The submitter has withdrawn the request before it reached a final outcome. |

### Permitted Transitions

| Transition | Who can trigger |
|---|---|
| Draft to Submitted | The submitter |
| Submitted to In Review | The assigned reviewer (automatic when they first act on the request) |
| In Review to next stage In Review | The assigned reviewer at the current stage |
| In Review to Approved | The assigned reviewer at the final stage |
| In Review to Rejected | The assigned reviewer at any stage, or the Module Administrator |
| In Review to Returned | The assigned reviewer at any stage, or the Module Administrator |
| Returned to Submitted (resubmission) | The original submitter |
| Draft to Cancelled | The submitter only |
| Submitted to Cancelled | The submitter only, before a reviewer has acted |
| In Review to Cancelled | The Module Administrator or Global Administrator only |

### Approval Timeline

Every state transition appends a permanent, uneditable record to the request's approval timeline. Each entry records:

- The stage at which the action occurred
- The action taken (submitted, advanced, approved, rejected, returned, cancelled)
- The name of the person who acted
- The date and time of the action
- Any note or reason provided by the reviewer
- The SLA status at the moment the action was taken (on track, at risk, or breached)

Timeline entries cannot be modified or removed after they are written. This produces a tamper-evident chronological record of every decision made on every request.

### Resubmission After Return

When a request is returned to the submitter for correction, the submitter addresses the feedback and resubmits. The resubmission creates a new version of the request with a new platform identifier. The new version carries a reference back to the original, linking the full history of corrections and resubmissions. The original returned request remains in the system with its returned status intact — it is not overwritten or deleted.

This approach preserves the complete revision history for any request that required correction before approval.

### Archival Policy

Requests that reach a terminal state — Approved, Rejected, or Cancelled — are retained in the system permanently. They are never deleted. Closed requests remain visible in My Requests under the Closed group and are available for audit export at any time by Module Administrators and Global Administrators. Export formats include CSV and PDF.

---

## 11. Security and Access Model

### Purpose

This section defines how the platform establishes user identity, enforces access boundaries, protects sensitive data, and maintains the audit record required for operational and compliance purposes.

### Authentication

All users authenticate to eTPC through Microsoft Entra ID (Azure Active Directory) using Single Sign-On. The platform does not manage usernames or passwords. Corporate identity is the only identity the platform recognises.

This means that TPC Chad's existing Azure AD policies — password requirements, multi-factor authentication, account lockout, and conditional access — apply automatically to eTPC without any additional configuration.

When a user leaves TPC Chad and their Azure AD account is deactivated, their access to eTPC is revoked immediately without any separate action being required from the platform administrator.

### Authorisation: Data-Layer Enforcement

The fundamental principle of the authorisation model is that access is enforced at the data level, not only at the user interface.

The current prototype controls what users can see by hiding navigation items. In the production system, hiding a navigation item is a convenience that prevents accidental navigation — it is not a security boundary. Every query for data is independently validated against the user's platform role and module access list before any data is returned. A user cannot obtain data they are not authorised to see by manipulating a URL or bypassing a UI control.

Specifically:
- A Field User's request list query is automatically restricted to their own submissions at the data layer, regardless of what the request contains
- A Module Administrator's query for all requests is automatically restricted to the modules in their access list
- A Global Administrator has unrestricted read access but all write actions are logged

### Data Isolation

| Role | What they can read | What they can write |
|---|---|---|
| Field User | Own submissions; public reference data (PPE catalog, storage locations) | Own draft requests; submit own requests |
| HSE Reviewer | Own submissions; requests where they are assigned reviewer | Own drafts; approve, reject, or return at their assigned stage |
| Store Manager | Own submissions; site inventory for their assigned site | Own drafts; submit own requests |
| Module Administrator | All requests in their assigned modules; module configuration data | All requests in their modules; module configuration |
| Global Administrator | All platform data | All platform data (all actions logged) |

### The Admin Separation Principle

The following is a non-negotiable architectural rule:

A Safety Data Module Administrator must not be able to read, write, or influence platform settings, user accounts, role assignments, or data from any other module. This separation is enforced by separate navigation groups with role-gated visibility, server-side role validation on every page and API endpoint, and module access scoping applied to every data query.

The same principle applies to every module. A Cash Advance Module Administrator cannot see Safety Data requests, workflows, or configuration. Each module's administrator operates within a fully bounded domain.

### Sensitive Data Handling

| Data Category | Storage Location | Protection Mechanism |
|---|---|---|
| User credentials | Microsoft Azure AD — never held by the platform | Governed by Azure AD security policies |
| Request payloads | Azure SQL Database | Role-scoped query enforcement; encrypted at rest |
| Safety Data Sheets and attachments | SharePoint Online / Azure Blob Storage | Access controlled by module access list; signed URLs for direct access |
| Audit log | Append-only database table | No delete permission exists; read-only for Global Administrator |
| Platform configuration | Azure Key Vault (connection strings, API keys) | No secrets in application code or configuration files |

No personally identifiable information beyond name and email address is stored within request payloads. Chemical names, financial amounts, route descriptions, and change records are operational data. Their sensitivity is protected through the module access model rather than PII classification.

### Audit Trail Coverage

The following categories of events are automatically recorded in the immutable audit log:

| Category | Events Captured |
|---|---|
| Authentication | Login, logout, login failure, session expiry |
| Identity changes | Role assigned, role modified, module access changed, account deactivated |
| Request lifecycle | All state transitions across all modules and requests |
| Administrative actions | User account created, workflow stage modified, platform settings changed |
| Data access | Bulk export initiated, audit log accessed |

The audit log is accessible only to Global Administrators. It cannot be edited, cleared, or selectively deleted. It is available for export in CSV format for submission to compliance, legal, or HSE audit processes.

---

## 12. Azure Deployment Strategy

### Overview

eTPC is deployed on Microsoft Azure, aligned with TPC Chad's existing Azure infrastructure and Microsoft 365 subscription. The deployment strategy uses Azure-native services throughout, with no third-party cloud services or external dependencies beyond the Microsoft ecosystem.

### Infrastructure Components

**Azure Static Web Apps — Application Hosting**
The eTPC frontend is hosted as an Azure Static Web App. This service provides global content delivery, automatic HTTPS, built-in authentication integration with Azure AD, and zero-infrastructure management. Deployments are triggered automatically from the source code repository.

**Azure Functions — Backend API**
Business logic, data operations, and approval workflow processing are hosted as Azure Functions (serverless compute). Functions scale automatically with demand and are billed only for execution time. Each module's workflow logic is contained in its own function group, maintaining the separation-of-concerns principle at the infrastructure level.

**Azure SQL Database — Primary Data Store**
All request data, user records, module configuration, approval timelines, and the audit log are stored in Azure SQL Database. Row-level security is enabled to enforce module access scoping at the database layer, independent of application-level checks.

**Azure Blob Storage — Document and Attachment Storage**
Safety Data Sheets, expense receipts, escort route documents, and change management attachments are stored in Azure Blob Storage. Access to files is controlled through time-limited signed URLs generated by the API. Direct public access to the storage container is disabled.

**Microsoft Entra ID (Azure Active Directory) — Identity**
All authentication and identity management is handled by Microsoft Entra ID. The platform registers as an application in the TPC Chad Azure AD tenant. Users authenticate via SSO with their corporate credentials. No separate user credential store exists within the platform.

**Azure Key Vault — Secrets Management**
All connection strings, API keys, and configuration secrets are stored in Azure Key Vault. The application retrieves secrets at runtime using managed identity — no secrets appear in configuration files or application code.

**Azure Monitor and Application Insights — Observability**
Platform health, API response times, error rates, and user activity metrics are collected by Azure Monitor. Application Insights provides detailed telemetry for performance diagnostics and alerting. Operational alerts notify the IT team of service disruptions, elevated error rates, or security anomalies.

**Azure CDN — Content Delivery**
Static assets (stylesheets, icons, scripts) are served through Azure CDN for fast delivery to users at all TPC Chad sites, including remote locations with limited bandwidth.

### Deployment Environments

Three environments are maintained, each with complete isolation from the others:

| Environment | Purpose | Access |
|---|---|---|
| Development | Active feature development. Developers test changes here before promoting to UAT. Uses synthetic data only. | Development team only |
| User Acceptance Testing (UAT) | Pre-production validation. Business users test new features against realistic data. Approval is required before any change is promoted to Production. | IT team and designated business reviewers |
| Production | The live platform serving all users. Deployments to Production require UAT sign-off and occur during a defined maintenance window. | All users |

### Deployment Pipeline

Code changes move through the pipeline as follows: developer commits to the development branch → automated build and test validation → deployment to Development environment → code review and approval → merge to UAT branch → automated deployment to UAT → business validation → merge to main branch → scheduled deployment to Production.

No manual file transfers, FTP uploads, or direct server modifications are used at any stage.

### Disaster Recovery

Azure SQL Database is configured with automated backups retained for 35 days, enabling point-in-time restoration. Blob Storage uses geo-redundant replication, maintaining a copy of all documents in a secondary Azure region. The recovery time objective (RTO) target for the platform is four hours. The recovery point objective (RPO) target is one hour.

### Network and Access Security

All traffic to the platform is encrypted in transit using TLS 1.2 or higher. HTTP access is redirected to HTTPS automatically. Azure Functions are not directly accessible from the internet — all client requests route through the Static Web App's API proxy. Azure SQL Database and Blob Storage are accessible only from the Functions layer, not from the public internet.

---

## 13. SharePoint Integration Strategy

### Overview

Microsoft SharePoint Online is TPC Chad's corporate document management system, operating within the same Microsoft 365 tenant as Azure Active Directory. The eTPC platform integrates with SharePoint Online at three levels: document storage for module-generated files, record archival for approved requests, and collaborative reference data management for Safety Data.

Because eTPC and SharePoint Online share the same Azure AD tenant, users navigate between them with no additional login. The same identity that authenticates a user to eTPC authenticates them in SharePoint Online.

### Integration Points

**1. Safety Data Sheet Library**
When a new chemical is approved through the Safety Data workflow, the platform stores the Safety Data Sheet document in a dedicated SharePoint document library. The SharePoint URL of the stored document is written back to the chemical record in the eTPC database, making the SDS accessible from within the platform via a direct link.

SharePoint's document versioning is used to maintain the full history of SDS revisions. When a chemical's SDS is updated, the new version is stored alongside the previous versions. The current version is always the one linked in the eTPC record.

| SharePoint Library | Contents | Version Control |
|---|---|---|
| Safety Data Sheets | One document per chemical (PDF or Word) | Full version history retained |
| Expense Receipts | Scanned receipts attached to expense requests | Single version |
| Escort Documentation | Route approvals and security clearances | Full version history retained |
| MOC Records | Management of Change formal records | Full version history retained |

**2. Approved Request Archival**
When a request on the eTPC platform reaches the Approved state, a summary record is automatically written to a SharePoint list in the relevant module's SharePoint site. This creates a durable, human-readable archive of all approved requests that is accessible to users through SharePoint even without logging into the eTPC platform.

Approved request records in SharePoint are read-only. They serve as the authoritative reference copy for audit and regulatory purposes. The eTPC database remains the operational system of record; SharePoint holds the archival copy.

| SharePoint Site | List | Trigger |
|---|---|---|
| Safety Data | Approved Chemicals | Chemical approval finalised |
| Finance | Approved Cash Advances | Cash advance approved |
| Finance | Approved Expense Claims | Expense approved |
| Operations | Approved Escort Requests | Escort request approved |
| Operations | Approved Change Records | MOC fully approved |

**3. Power Automate Workflow Notifications**
Microsoft Power Automate (part of Microsoft 365) is used to deliver email notifications and Teams messages when approval events occur on the platform. When an eTPC approval event is triggered — a request submitted, a stage advanced, an SLA breached — the platform sends a structured event to a Power Automate flow, which formats and delivers the notification through the corporate email and Teams channels. This approach uses TPC Chad's existing Microsoft 365 licensing rather than requiring a separate notification service.

**4. Reference Data Collaboration**
Certain reference data maintained in the Safety Data Administration module — particularly the manufacturer directory and the chemical reference catalog — can be managed as SharePoint lists by subject matter experts who do not have access to the eTPC administration interface. Changes made in SharePoint are synchronised to the eTPC database on a scheduled basis. This allows a broader set of users to contribute to reference data without requiring eTPC platform access or IT intervention.

### Single Sign-On Passthrough

Because both eTPC and SharePoint Online are registered applications in the same Azure AD tenant, users who are authenticated to eTPC do not need to log in again when a SharePoint link is opened. Document links within eTPC open SharePoint documents directly in the browser. The user sees a seamless experience.

### Access Governance

Access to eTPC and access to SharePoint are governed independently. A user who has access to Safety Data in eTPC is not automatically granted access to the Safety Data SharePoint site. SharePoint access is managed through Microsoft 365 group membership, administered through Azure AD by the Global Administrator.

The SharePoint sites used for eTPC integration are:

| SharePoint Site | Managed by |
|---|---|
| Safety Data | HSE Department (Safety Data Module Administrator) |
| Finance | Finance Department |
| Operations | Operations Department |
| Platform Administration | IT Department (Global Administrator) |

---

## 14. Future Module Onboarding

### Purpose

This section defines the process for adding a new module to the eTPC platform. The process is designed to be repeatable, low-risk, and achievable without changes to existing shared platform code.

### Prerequisites

Before the onboarding process begins, the sponsoring department must provide the following:

| Item | Description |
|---|---|
| Module name | In English and French |
| Request types | The categories of request the module will handle |
| Approval stages | The ordered sequence of review stages, with a maximum duration for each |
| Stakeholder roles | Which platform roles will submit, review, and administer the module |
| Visual identity | A colour and icon representing the module in the platform |
| SharePoint site | The SharePoint site where approved records and documents will be stored |

### Onboarding Steps

**Step 1 — Registry Entry**
Add the new module to the Module Registry with all required fields and set its status to "Coming Soon." The module immediately appears in the Solutions navigation as inactive and as a placeholder card on the Dashboard. No other platform surfaces are affected.

**Step 2 — Request Payload Definition**
Define the data fields specific to this module's requests. These fields become the module payload that is attached to the universal request envelope. Fields should be limited to what is necessary for the submission form and the request detail view.

**Step 3 — Submission Form**
Build the request submission page for the module, collecting the fields defined in Step 2. The form produces a standard request envelope with the module key set correctly, generates both the platform-wide request ID and the module-specific reference, and follows the standard draft-then-submit pattern.

**Step 4 — Request List Verification**
The My Requests page requires no changes. Once the module is active and test requests are submitted, verify that they appear correctly in the table and that the module filter tab shows the correct count.

**Step 5 — Request Detail Renderer**
Build the module's payload display section for the detail panel. The header and approval timeline sections of the panel are shared and require no changes. Only the module-specific content section needs to be built.

**Step 6 — Workflow Validation**
Validate the stages defined in Step 1: confirm that each stage has an assigned role, a backup reviewer option, and an SLA duration. The Approvals inbox will automatically display this module's requests once the status is changed to Live.

**Step 7 — Navigation Registration**
Add two navigation items: one under the Solutions section (visible to users with module access), and one under a new Module Administration navigation group (visible to the Module Administrator and Global Administrators).

**Step 8 — User Access Configuration**
In Users and Roles, ensure the new module key is available as an option in the module access assignment interface. Assign the module to relevant users and designate the Module Administrator.

**Step 9 — Bilingual Labels**
Add English and French strings for all new user-facing content: form labels, payload display labels, status messages, and error messages.

**Step 10 — SharePoint Integration**
Configure the SharePoint document library and approved records list for the new module (as defined in Section 13). Verify that approved requests trigger the archival flow correctly and that document links are accessible from within the platform.

**Step 11 — Go Live**
Change the module's status in the Module Registry from "Coming Soon" to "Live." The placeholder Dashboard card becomes a live data card. The module filter tab appears in My Requests and Approvals. The module is available to all users with it in their access list.

### What Requires Change vs. What Is Shared

The following table summarises the work involved in onboarding a new module and confirms which platform components require no changes:

| Component | Required action |
|---|---|
| Module Registry | Add one entry |
| Request payload | Define module-specific fields |
| Submission form | Build new form page |
| My Requests table | No change required |
| My Requests filter tabs | No change required — registry-derived |
| Detail panel (header and timeline) | No change required — shared |
| Detail panel (module section) | Build module-specific display |
| Approvals inbox | No change required — registry-derived |
| Dashboard module card | No change required — registry-derived |
| Navigation | Register two items |
| User role model | No change required — roles are universal |
| Bilingual labels | Add new strings |
| SharePoint integration | Configure library and records list |

This means that the majority of the platform's shared infrastructure — the request list, the approval inbox, the dashboard, the role model — never needs to be touched again as new modules are added. The investment in platform architecture is made once.

---

## Appendix A — Navigation Structure

The complete platform navigation, showing all sections and their access rules:

**Platform**
- Dashboard — all users
- My Requests — all users

**Solutions**
- Safety Data — users with Safety Data access
  - New Chemical
  - Master Sheet
  - Add to My Site
  - User Guide
- Cash Advance — users with Cash Advance access
  - New Advance
  - My Advances
  - Reconciliation
- Daily Expense — users with Daily Expense access
  - New Expense
- Security Escort — users with Security Escort access
  - New Escort Request
- Management of Change — users with MOC access
  - New Change Request

**Safety Data Administration** — Safety Data Module Administrator and Global Administrator
- Chemical Inventory
- Manufacturers
- PPE
- Storage
- Workflows

**[Module] Administration** — repeating pattern for each future module
- Module-specific administration pages

**Platform Administration** — Global Administrator only
- Approvals
- Users and Roles
- Platform Settings
- Audit Log

---

## Appendix B — Module Reference

| Module | Key | Prefix | Status | Approval Stages |
|---|---|---|---|---|
| Safety Data | safety | CHM | Live | Submission, Safety Review, EMP Review, IH Review, Review Complete |
| Cash Advance | cash | ADV | Live | Submission, Line Manager, Finance Review, CFO Approval |
| Daily Expense | expense | EXP | Live | Submission, Line Manager, Finance Validation |
| Security Escort | escort | ESC | Live | Submission, Security Coordinator, HSE Sign-off, Operations Approval |
| Management of Change | moc | MOC | In development | Submission, Technical Review, HSE Review, Management Approval, Implementation Sign-off |

---

## Appendix C — Glossary

| Term | Definition |
|---|---|
| Module | A distinct functional domain of the platform, such as Safety Data or Cash Advance |
| Module Key | The internal identifier for a module, used throughout the platform's logic and data |
| Module Registry | The central directory of all modules and their metadata |
| Request Envelope | The universal data structure that wraps every request on the platform |
| Payload | The module-specific data attached to a request envelope |
| Platform Role | The user's function on the platform: Field User, Reviewer, Module Admin, or Global Admin |
| Module Access | The list of modules a user is explicitly authorised to interact with |
| Approval Stage | One step in a module's multi-level review process |
| SLA | Service Level Agreement — the maximum permitted duration for a request to remain at a stage |
| Bottleneck | The stage within a module where requests take the longest on average |
| Timeline | The append-only, immutable record of every action taken on a request |
| Revision | A new version of a request created when a submitter resubmits after a return |
| Global Administrator | The role responsible for platform-wide governance: users, roles, settings, and audit |
| Module Administrator | The role responsible for one module's content, configuration, and approval oversight |
| Azure AD / Entra ID | Microsoft's cloud identity service, used for all eTPC authentication |
| SharePoint Online | Microsoft's cloud document management platform, used for document storage and record archival |
| Power Automate | Microsoft's workflow automation service, used for eTPC event notifications |
| Azure SQL | Microsoft's cloud relational database, the primary data store for eTPC |
| Azure Functions | Microsoft's serverless compute service, hosting the eTPC backend API |
| Azure Key Vault | Microsoft's secrets management service, holding all eTPC connection strings and API keys |

---

*This document constitutes the authorised platform blueprint for eTPC. All development, configuration, and deployment decisions should be made in alignment with the architecture defined herein. Proposed deviations require review and sign-off by the IT Department.*

*Document Reference: eTPC-BLUEPRINT-v1.0 — TPC Chad Information Technology Department — 31 May 2026*
