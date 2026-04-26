# Roadmap

## Overview

This roadmap separates the project into three tracks so priorities stay clear:

- `Delivery Track`
  - customer-facing work that supports the active DaXin integration engagement
- `IoT Health Monitoring Track`
  - near-term product expansion adding physiological data collection, real-time monitoring, alerts, and family visibility
- `Discovery Track`
  - future-facing product exploration inspired by the Chimei home nursing AI workflow input

The purpose of this split is to avoid mixing near-term delivery commitments with medium-term product expansion and longer-term product bets.

## Prioritization Principles

- Protect customer delivery before expanding product scope
- Prioritize workflows with direct operational value and measurable outcomes
- Keep future AI capabilities in research mode until workflow, privacy, and review controls are clear
- Sync any confirmed roadmap changes back into `requirements`, `spec`, and `decisions`

## Track 1: Delivery Track

### Goal

Deliver the current DaXin baseline with a stable, reviewable integration plan centered on:

- `neoCare`
- `JUBO`
- `WorkDo`
- `n8n`

### Priority Order

#### P0: Documentation and Alignment

- Maintain proposal, requirements, spec, and decisions as the source of truth
- Keep customer-facing proposal materials current with repo documentation
- Capture discussion summaries under `docs/meetings/`

Success signal:
- repo documents remain current and usable for implementation and customer review

#### P1: Payroll Integration Workflow

- Confirm vendor access and integration method for WorkDo, JUBO, and neoCare
- Define payroll inputs, matching logic, outputs, and exception handling
- Finalize workflow ownership and validation process

Success signal:
- payroll workflow is defined well enough to implement, validate, and hand over

#### P2: Daily Backup and Compliance Workflow

- Define record export method for neoCare and JUBO
- Define storage structure, logging, and alerting
- Define operational ownership for backup review and exception response

Success signal:
- backup workflow is clearly spec'd with storage, logging, and failure handling

#### P3: Delivery Readiness

- Finalize milestone-based acceptance criteria
- Prepare customer review artifacts
- Keep GitHub-based collaboration ready for implementation and PR review

Success signal:
- repo and documentation are implementation-ready and can support branch and PR workflows

## Delivery Track Timeline

### Now

- Keep repo documents aligned
- clarify integration dependencies
- confirm open questions around API access and storage destination

### Next

- translate the payroll and backup workflows into implementation tasks
- define data mapping and exception handling rules
- prepare delivery tasks for branch-based execution

### Later

- support implementation, validation, and handoff
- track customer changes and sync them back into repo docs

## Track 2: IoT Health Monitoring Track

### Goal

Extend the DaXin platform with physiological data collection from Bluetooth IoT devices, a real-time caregiver dashboard, a family member portal, and a threshold alert system—closing the gap between visit-based care and continuous health visibility.

### Reference Inspiration

- Industry model: viWave ULife (如影優活) smart care platform
- Capabilities mapped: IoT device sync, caregiver app, family portal, cloud health data, analytics
- Source: `docs/attachments/iot/` (to be populated with device vendor materials)

### Priority Order

#### I0: IoT Capability Scoping

- Confirm device vendor selection and supported measurement types with DaXin
- Confirm data residency and cloud platform requirements
- Define caregiver app platform target (Android, iOS, or both)
- Document threshold defaults and configuration authority

Success signal:
- IoT scope is locked and reviewable; open questions in spec.md are resolved

#### I1: IoT Device Integration and Caregiver Dashboard

- Implement Bluetooth device pairing and measurement capture in Caregiver Mobile App
- Implement IoT Health Platform API for receiving and storing measurement records
- Build caregiver dashboard showing latest readings and trend charts per patient
- Define and implement threshold configuration model

Success signal:
- Nurse can take a measurement with a Bluetooth device and see it reflected on the dashboard within the same visit

#### I2: Threshold Alert System

- Implement threshold evaluation logic in IoT Health Platform
- Deliver in-app push notifications for threshold violations
- Implement SMS or email delivery for critical-severity alerts
- Implement acknowledgment, annotation, and escalation flow

Success signal:
- A critical reading triggers an alert, the nurse receives it within 5 minutes, and the alert is logged and escalatable

#### I3: Family Member Portal

- Build read-only family portal with authenticated login
- Implement per-patient data visibility rules configurable by nursing staff
- Display recent measurements and trend charts for authorized family accounts
- Enforce strict access control: no clinical notes, no other patients, no write access

Success signal:
- Family members can log in and view their patient's health summary; nursing staff can enable or restrict access per patient

#### I4: Health Analytics and Reporting

- Implement population-level statistics view for nursing supervisors
- Implement per-patient report generation (PDF and Excel)
- Add measurement compliance rate tracking
- Support filtering by nurse, patient, time period, and measurement type

Success signal:
- Director of nursing can generate a monthly patient health report and view clinic-wide compliance rates

## IoT Track Timeline

### Now (2026 Q2)

- Resolve IoT scope open questions (device vendor, platform, residency)
- Document device integration approach in `docs/attachments/iot/`
- Add IoT capability tasks to GitHub issues

### Next (2026 Q3)

- Implement IoT device integration and caregiver dashboard (I1)
- Begin alert system implementation (I2)
- Pilot with a subset of DaXin patients

### Later (2026 Q4)

- Roll out family portal (I3)
- Deliver health analytics module (I4)
- Conduct full acceptance testing with DaXin

## Track 3: Discovery Track

### Goal

Explore whether `Robert Healthcare Coach` should evolve beyond integration documentation into a product direction for AI-assisted home nursing workflows.

### Input Source

- `docs/attachments/chimei/奇美 智慧輔助照護-居家護理經驗分享0202.pdf`
- `docs/attachments/chimei/chimei_home_nursing_ai_input_analysis_2026-04-05.md`

### Priority Order

#### D0: Discovery Framing

- Keep the Chimei material explicitly marked as research input
- Separate evidence, assumptions, and product hypotheses
- Avoid treating external efficiency claims as validated outcomes

Success signal:
- the team has a shared understanding of what is research versus committed scope

#### D1: AI-Assisted Documentation Concept

- Define the candidate workflow for:
  - voice capture
  - transcription
  - nursing note drafting
  - care-plan drafting
  - patient education drafting
  - incomplete-record reminders

Success signal:
- a coherent concept exists for AI-assisted home nursing documentation

#### D2: Risk and Governance Design

- Define human review requirements
- Define audit and traceability expectations
- Define privacy and retention concerns for voice and generated content

Success signal:
- the AI workflow can be evaluated against clinical safety and operational governance expectations

#### D3: Product Hypothesis and Pilot Planning

- Define candidate pilot metrics
- Define who would use the workflow and when
- Decide whether this becomes a next-phase product initiative

Success signal:
- a decision can be made to either promote the work into product scope or leave it in research

## Discovery Track Timeline

### Now

- preserve the Chimei input as structured discovery evidence
- identify the top opportunity areas:
  - documentation burden
  - recall reduction
  - AI-assisted drafting
  - reminders and productivity analytics

### Next

- create a concept note or backlog for AI-assisted workflow capabilities
- decide whether the repository should remain project-first or become product-first

### Later

- design a pilot path if the team decides to move forward
- add explicit architecture and policy documents for AI-assisted documentation

## Combined Priority Summary

### Highest Priority

- keep the DaXin delivery baseline stable and current
- move payroll workflow toward implementation readiness
- move backup workflow toward implementation readiness

### Medium Priority (IoT Track)

- resolve IoT device vendor and platform scope questions
- implement IoT device integration and caregiver dashboard
- implement threshold alert system

### Medium Priority (Delivery)

- structure meeting outputs and decision logs for execution
- convert customer delivery artifacts into branch and PR-ready work items

### Lower Priority, But Strategic

- family portal and health analytics module
- investigate AI-assisted home nursing workflow concepts inspired by Chimei
- define whether AI-assisted documentation should become the next product phase after IoT

## Suggested Next Repo Updates

- Add implementation task breakdown once delivery workflow details stabilize
- Add a meeting note documenting the three-track roadmap split
- Add `docs/attachments/iot/` with device vendor materials once scoping is confirmed
- Add a separate concept note if the discovery track becomes active planning work

## Suggested Immediate Next Actions

1. Keep `Delivery Track` as the active execution priority.
2. Create a meeting note confirming the three-track roadmap split.
3. Translate the payroll workflow into implementation tasks and owners.
4. Translate the backup workflow into implementation tasks and owners.
5. Resolve IoT scope open questions to unlock I1 implementation start.
6. Decide whether the `Discovery Track` should remain research-only this quarter.
