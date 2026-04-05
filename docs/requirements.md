# Requirements

## Project Summary

Robert Healthcare Coach currently uses the DaXin home-care integration case as the first delivery track in this repository. The immediate goal is to turn the existing proposal and research into a working project baseline that supports implementation, customer communication, and Git-based collaboration.

The DaXin engagement focuses on reducing fragmented operations across home nursing and long-term care services by consolidating operational workflows around three core systems and an automation layer.

## Business Context

- Customer: DaXin Home Nursing Clinic
- Business lines: home nursing under NHI and home care under Long-Term Care 2.0
- Current pain point: operational data is spread across multiple disconnected systems
- Delivery goal: reduce manual work, improve payroll reconciliation, and establish compliant backup processes

## Goals

- Consolidate the current fragmented setup into three core systems: `neoCare`, `JUBO`, and `WorkDo`
- Add an `n8n` automation layer to remove repeated cross-system manual work
- Support payroll automation in time for HR operations
- Build a daily backup process for medical and care records with auditability
- Keep the finalized project scope, requirements, and decisions synchronized in this repository
- Build a discovery track for AI-assisted home nursing workflows informed by real field evidence

## Users

- Administrative manager
- IT or system administrator
- Director of nursing
- Home-care supervisor
- HR consultant
- First-line nursing staff
- Care workers

## Scope

- In scope: document and manage the DaXin integration proposal in this repo
- In scope: define requirements for the target system architecture and workflows
- In scope: payroll integration workflow using WorkDo plus neoCare and JUBO scheduling data
- In scope: daily backup workflow for nursing records and care service records
- In scope: analyze field evidence and domain inputs for future AI-assisted home nursing capabilities
- In scope: project documentation for planning, implementation, testing, and customer communication
- Out of scope: replacing `neoCare` as the home nursing core system
- Out of scope: building a custom EMR or replacing all third-party operational systems
- Out of scope: final pricing negotiation with external vendors

## Functional Requirements

- The system shall support `neoCare` as the home nursing core system for NHI claims, records, and scheduling
- The system shall support `JUBO` as the long-term care and home-service core system
- The system shall support `WorkDo` as the attendance, leave, and communication platform
- The system shall provide an `n8n` workflow that retrieves monthly attendance and leave data from WorkDo
- The system shall provide an `n8n` workflow that retrieves scheduling data from `neoCare` and `JUBO`
- The system shall compare attendance against schedules to calculate service hours and payroll inputs
- The system shall export payroll outputs in `Excel` or `CSV`
- The system shall notify responsible staff when payroll outputs are generated
- The system shall run a daily backup workflow for `neoCare` nursing records and `JUBO` service records
- The system shall organize backup outputs by year, month, and case or worker grouping
- The system shall maintain backup logs and generate failure alerts

## Future Capability Requirements

- The system should support nurse-friendly capture during or immediately after home visits
- The system should reduce reliance on memory for post-visit documentation
- The system should support voice-to-text as a candidate input channel for clinical note drafting
- The system should generate editable drafts for nursing notes and care plans rather than locked final records
- The system should support clinician review and correction before any generated content is finalized
- The system should support reminders for incomplete records before compliance deadlines
- The system should support operational indicators such as documentation time, service time, and travel time

## Non-Functional Requirements

- The integration approach should minimize operational disruption and system replacement risk
- The automation layer should be self-hosted to preserve data control
- The system should support auditable outputs for payroll and backup activities
- Backup processes should align with regulatory retention expectations for long-term care records
- Documentation in this repository should be sufficient for handoff and PR-based collaboration
- Any future AI-assisted documentation capability should preserve human review, traceability, and privacy controls

## Success Metrics

- Payroll processing manual effort is reduced by at least 50%
- Daily backup success rate reaches at least 99%
- Alerting is triggered within 30 minutes of backup failure
- WorkDo attendance coverage reaches at least 95%
- Finalized requirements, specs, and decisions are maintained in repo documents

## Discovery Metrics

- Establish baseline documentation time before any AI-assisted workflow pilot
- Define measurable hypotheses for note drafting, care plan generation, and reminder effectiveness
- Validate whether field-inspired AI workflow ideas should enter the next implementation phase

## Milestones

- 2026-03-31: payroll automation workflow ready for use
- 2026-04-30: daily backup workflow in production
- 2026-06-30: overall integration acceptance completed

## Acceptance Criteria

- A documented architecture exists for the three-core-system plus `n8n` model
- Payroll workflow inputs, outputs, and ownership are defined and reviewable
- Backup workflow inputs, storage structure, logs, and alerts are defined and reviewable
- Customer-facing proposal materials are stored under `docs/proposal/`
- Supporting research and source files are stored under `docs/attachments/`
- This repository contains a current first-pass set of requirements, specifications, and decisions
