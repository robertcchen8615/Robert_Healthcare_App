# Tasks

## Overview

This file breaks the `Delivery Track` into implementation-ready tasks. The goal is to convert the current documentation baseline into work that can be assigned, tracked, and executed through GitHub issues and pull requests.

Each task is designed to be:

- small enough to assign
- clear enough to review
- tied back to existing repo documents

## Prioritization

- `P0`: immediate documentation and alignment tasks
- `P1`: payroll workflow tasks
- `P2`: backup and compliance workflow tasks
- `P3`: delivery readiness and handoff tasks

## P0: Documentation and Alignment

### T001: Confirm active customer scope baseline

Purpose:
- lock the DaXin delivery scope as the active implementation baseline

Outputs:
- reviewed `docs/requirements.md`
- reviewed `docs/spec.md`
- reviewed `docs/decisions.md`

Dependencies:
- none

Done when:
- all three files reflect the same customer scope and workflow priorities

### T002: Convert open questions into owner-based checklist

Purpose:
- make unresolved requirements actionable rather than implicit

Outputs:
- owner-tagged checklist added to a meeting note or issue

Dependencies:
- T001

Done when:
- open questions around API access, storage destination, migration scope, and payroll rules have named owners

### T003: Create delivery planning issue set

Purpose:
- turn the main delivery tasks in this file into GitHub issues or tracked action items

Outputs:
- GitHub issues or equivalent task tracker entries

Dependencies:
- T001

Done when:
- each `P1`, `P2`, and `P3` task has a tracking artifact

## P1: Payroll Workflow

### T101: Confirm WorkDo integration method

Purpose:
- determine whether WorkDo data will be obtained through API, export, or both

Outputs:
- integration note covering attendance and leave data source details

Dependencies:
- T002

Done when:
- the source, authentication method, and expected output fields are documented

### T102: Confirm JUBO scheduling data source

Purpose:
- define how scheduling or service data is retrieved from JUBO

Outputs:
- integration note covering schedule query or export mechanism

Dependencies:
- T002

Done when:
- JUBO source method and required fields are documented

### T103: Confirm neoCare scheduling data source

Purpose:
- define whether neoCare exposes API access or requires export-based integration

Outputs:
- integration note covering API or export approach

Dependencies:
- T002

Done when:
- the approved source pattern for neoCare is documented

### T104: Define payroll data mapping

Purpose:
- map attendance, leave, and schedule data into a unified payroll input model

Outputs:
- field mapping document
- mismatch and exception categories

Dependencies:
- T101
- T102
- T103

Done when:
- the team can explain how raw inputs become payroll-ready records

### T105: Define payroll calculation rules

Purpose:
- document how payroll inputs are converted into final outputs

Outputs:
- payroll rule specification
- list of configurable parameters

Dependencies:
- T104

Done when:
- calculation logic is documented with enough detail to implement and validate

### T106: Define payroll output and review workflow

Purpose:
- define what gets exported, who reviews it, and how exceptions are handled

Outputs:
- payroll output format definition
- reviewer and approval flow

Dependencies:
- T105

Done when:
- payroll outputs and human review steps are explicitly documented

### T107: Break payroll workflow into implementation PRs

Purpose:
- convert the payroll workflow into development-sized work items

Outputs:
- PR-ready task list for implementation

Dependencies:
- T106

Done when:
- the payroll workflow can be executed as a sequence of branches and PRs

## P2: Backup and Compliance Workflow

### T201: Confirm neoCare record export method

Purpose:
- define how nursing records will be retrieved for backup

Outputs:
- export method note for neoCare

Dependencies:
- T002

Done when:
- record format, export timing, and retrieval method are documented

### T202: Confirm JUBO record export method

Purpose:
- define how care-service records will be retrieved for backup

Outputs:
- export method note for JUBO

Dependencies:
- T002

Done when:
- record format, export timing, and retrieval method are documented

### T203: Define backup storage structure

Purpose:
- standardize how backup outputs are organized and stored

Outputs:
- storage structure definition
- naming rules for year, month, case, or worker grouping

Dependencies:
- T201
- T202

Done when:
- target storage paths and file organization are fully specified

### T204: Define backup log and alert model

Purpose:
- ensure backup execution is traceable and failures are visible

Outputs:
- log schema
- alert trigger conditions
- responsible owner list

Dependencies:
- T203

Done when:
- backup success and failure handling are documented end-to-end

### T205: Define compliance review process

Purpose:
- align backup handling with record retention and audit expectations

Outputs:
- review checklist
- retention assumptions
- escalation path for backup failures

Dependencies:
- T204

Done when:
- compliance-sensitive backup behaviors have explicit review expectations

### T206: Break backup workflow into implementation PRs

Purpose:
- convert the backup workflow into executable development tasks

Outputs:
- PR-ready task list for backup implementation

Dependencies:
- T205

Done when:
- the backup workflow can be implemented in branch-sized units

## P3: Vendor Dependencies

### T301: Build vendor dependency tracker

Purpose:
- centralize all external dependencies for implementation readiness

Outputs:
- tracker covering vendor, contact, dependency, status, blocker, next action

Dependencies:
- T002

Done when:
- the team can see which external dependency blocks which delivery task

### T302: Confirm migration and contract constraints

Purpose:
- identify timeline or scope constraints caused by vendor contracts and migration limits

Outputs:
- documented dependency risks and milestone impact notes

Dependencies:
- T301

Done when:
- contract and migration constraints are visible in planning

## P4: Delivery Readiness and Documentation

### T401: Create implementation meeting template note

Purpose:
- make future execution discussions consistent and easy to sync back into repo docs

Outputs:
- meeting note template or first implementation planning note in `docs/meetings/`

Dependencies:
- none

Done when:
- the team has a repeatable structure for planning meetings

### T402: Prepare acceptance checklist

Purpose:
- convert milestone success conditions into a reviewable checklist

Outputs:
- acceptance checklist aligned with payroll, backup, and documentation requirements

Dependencies:
- T106
- T205

Done when:
- the project has a milestone-based acceptance artifact

### T403: Prepare branch and PR workflow guidance

Purpose:
- make implementation execution consistent across contributors

Outputs:
- short workflow note describing branch naming, PR scope, and review expectations

Dependencies:
- T003

Done when:
- contributors can start implementation without inventing their own workflow

### T404: Keep proposal and repo docs synchronized

Purpose:
- ensure customer-facing proposal content does not drift from the repo baseline

Outputs:
- sync pass between proposal, requirements, spec, decisions, and roadmap

Dependencies:
- ongoing

Done when:
- customer-facing materials and repo documentation reflect the same project baseline

## P5: IoT Health Monitoring

### T501: Resolve IoT scope open questions

Purpose:
- confirm device vendor, platform approach, data residency, and mobile app target before implementation begins

Outputs:
- answers to all IoT open questions listed in `spec.md`
- decision log entries for vendor selection and platform approach

Dependencies:
- T002

Done when:
- device vendor, platform, residency, and app platform are confirmed and documented

### T502: Select and document IoT device vendor

Purpose:
- choose the Bluetooth medical device vendor(s) for blood pressure, blood glucose, SpO2, temperature, and weight

Outputs:
- vendor selection note with supported device models and Bluetooth SDK details
- stored under `docs/attachments/iot/`

Dependencies:
- T501

Done when:
- at least one vendor per measurement type is confirmed with SDK documentation available

### T503: Define IoT Health Platform data model

Purpose:
- specify the schema for measurement records, threshold configurations, alert events, and family access rules

Outputs:
- data model document covering all IoT Health Platform entities

Dependencies:
- T502

Done when:
- the data model is complete enough to implement the storage layer and APIs

### T504: Implement Bluetooth device pairing and measurement capture

Purpose:
- build the Caregiver Mobile App flow for pairing a device, capturing a measurement, and confirming upload

Outputs:
- mobile app feature: device pairing, reading capture, confirmation, and sync to IoT Health Platform
- integration test covering the measurement upload path

Dependencies:
- T502
- T503

Done when:
- a nurse can pair a supported device, capture a reading, confirm it, and see it reflected in the IoT platform

### T505: Build caregiver dashboard

Purpose:
- provide nursing staff with a real-time view of the latest vital signs and trends for each active patient

Outputs:
- dashboard UI showing latest readings, trend charts (7-day, 30-day), and out-of-range highlights per patient

Dependencies:
- T503
- T504

Done when:
- the dashboard reflects newly uploaded readings within the same visit session and highlights threshold violations visually

### T506: Implement threshold configuration model

Purpose:
- allow authorized nursing staff to configure per-patient thresholds for each measurement type

Outputs:
- admin interface for threshold configuration
- per-patient threshold records stored in the IoT Health Platform
- default threshold values documented and pre-loaded

Dependencies:
- T503

Done when:
- a nurse or supervisor can set and save per-patient thresholds, and those thresholds are used in alert evaluation

### T507: Implement threshold alert delivery

Purpose:
- deliver in-app and out-of-band notifications when a reading violates a threshold

Outputs:
- in-app push notification triggered by threshold violation
- SMS or email delivery for critical-severity violations
- alert event log with delivery status

Dependencies:
- T503
- T506

Done when:
- a test reading outside the threshold produces a push notification within 5 minutes and logs the event

### T508: Implement alert acknowledgment and escalation

Purpose:
- allow nurses to acknowledge alerts and ensure unacknowledged critical alerts escalate to supervisors

Outputs:
- acknowledgment flow with annotation support in the caregiver app
- escalation notification to supervisor after configurable timeout
- escalation log entries

Dependencies:
- T507

Done when:
- acknowledged alerts are logged with annotator identity; unacknowledged critical alerts escalate within the configured timeout

### T509: Build family member portal

Purpose:
- provide family members with a read-only view of their patient's recent measurements and trend charts

Outputs:
- web portal with authenticated login for family members
- per-patient data visibility rule management for nursing staff
- read-only measurement summary and trend charts

Dependencies:
- T503
- T504

Done when:
- a family member can log in and view approved health data; nursing staff can enable or restrict access per patient

### T510: Build health analytics and reporting module

Purpose:
- give supervisors and administrators population-level statistics and exportable patient health reports

Outputs:
- population-level dashboard: average readings, out-of-range rate, measurement compliance rate
- per-patient report generator (PDF and Excel)
- filter and drill-down by nurse, patient, time window, and measurement type

Dependencies:
- T503
- T504

Done when:
- a director of nursing can generate a monthly health report for a patient and view clinic-wide compliance statistics

### T511: Break IoT workflows into implementation PRs

Purpose:
- convert IoT tasks T504–T510 into development-sized PR units

Outputs:
- PR-ready task list for IoT implementation

Dependencies:
- T503

Done when:
- each IoT workflow can be implemented as a sequence of reviewable branches and PRs

## Suggested First Execution Sequence

1. T001 Confirm active customer scope baseline
2. T002 Convert open questions into owner-based checklist
3. T101 T102 T103 Confirm payroll input source methods
4. T104 Define payroll data mapping
5. T105 Define payroll calculation rules
6. T106 Define payroll output and review workflow
7. T201 T202 Confirm backup export methods
8. T203 Define backup storage structure
9. T204 Define backup log and alert model
10. T205 Define compliance review process
11. T301 Build vendor dependency tracker
12. T402 Prepare acceptance checklist
13. T107 and T206 Break both workflows into PR-ready implementation chunks
14. T501 Resolve IoT scope open questions
15. T502 T503 Select device vendor and define IoT data model
16. T504 T505 T506 Implement device pairing, dashboard, and threshold config
17. T507 T508 Implement alert delivery and escalation
18. T509 Build family portal
19. T510 Build health analytics module
20. T511 Break IoT workflows into implementation PRs

## Suggested Repo Follow-up

- If desired, split each task into a separate GitHub issue
- Add owners and target dates once the team confirms responsibility
- Add a `status` field if this file becomes the active execution board
- Add `docs/attachments/iot/` directory with device vendor SDK notes once T502 is complete
