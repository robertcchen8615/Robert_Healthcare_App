# Specification

## Overview

This repository defines the implementation baseline for the DaXin integration proposal. The solution is intentionally designed around existing vendor systems rather than full replacement. The target operating model is:

- `neoCare` for home nursing and NHI-related workflows
- `JUBO` for long-term care and home-service workflows
- `WorkDo` for attendance, leave, reimbursement, and internal communication
- `n8n` for cross-system automation, scheduling, export, notification, and backup orchestration
- `IoT Health Platform` for physiological device data collection, real-time monitoring, alerts, and family visibility
- `Health Analytics Module` for trend reporting, compliance tracking, and population-level statistics

In addition to the active integration baseline, this repository carries a discovery track for AI-assisted home nursing workflows based on field input from the Chimei home nursing presentation stored under `docs/attachments/chimei/`.

## System Architecture

### Core Systems

- `neoCare`
  - Primary role: home nursing records, nurse scheduling, NHI claims
  - Primary users: nursing staff and director of nursing
  - Status: retained as the nursing-side core platform

- `JUBO`
  - Primary role: long-term care scheduling, care worker management, care-service records
  - Primary users: care workers and home-care supervisors
  - Status: target upgrade path from the current CloudBerry or equivalent setup

- `WorkDo`
  - Primary role: GPS attendance, leave requests, reimbursement forms, team communication
  - Primary users: first-line staff, supervisors, administration
  - Status: target replacement for MAYO in the DaXin proposal

- `n8n`
  - Primary role: workflow orchestration and data movement between systems
  - Primary users: IT, automation maintainer, reporting stakeholders
  - Status: self-hosted integration layer with minimal business data persistence

- `IoT Health Platform`
  - Primary role: receive physiological measurements from Bluetooth-paired devices, store timestamped readings, serve data to caregiver dashboard, family portal, and analytics module
  - Primary users: nursing staff (data collection and monitoring), family members (read-only view), director of nursing (population view)
  - Supported measurement types: blood pressure (systolic, diastolic, pulse), blood glucose, SpO2, body temperature, body weight
  - Device connectivity: Bluetooth Low Energy (BLE) paired through the caregiver mobile app; auto-upload on sync
  - Status: new capability track, pending device vendor selection and pilot scope confirmation

- `Caregiver Mobile App`
  - Primary role: mobile interface for nurses and care workers during home visits; supports IoT device pairing, measurement capture, vital sign review, and alert acknowledgment
  - Primary users: first-line nursing staff and care workers
  - Status: new capability track; extends existing WorkDo mobile patterns where applicable

- `Family Member Portal`
  - Primary role: read-only web interface for family members to view patient health summaries, recent measurements, and trend charts
  - Primary users: patient family members; access controlled per patient by nursing staff
  - Status: new capability track, dependent on IoT Health Platform

### Data Flow Model

- Attendance and leave data originate in `WorkDo`
- Schedule and service context originates in `neoCare` and `JUBO`
- `n8n` pulls API or exported data, performs comparisons and transformations, then produces outputs
- Payroll outputs are exported to files and distributed to HR stakeholders
- Daily backup outputs are stored in NAS or cloud storage with logs and alerts
- Physiological measurements originate from Bluetooth IoT devices, paired through the Caregiver Mobile App
- Measurement data is uploaded to the `IoT Health Platform` upon Bluetooth sync (real-time or at end of visit)
- The `IoT Health Platform` evaluates readings against configured thresholds and emits alert events when violations are detected
- Alert events are delivered to nurses via in-app push notification and optionally via SMS or email
- The `Family Member Portal` reads from the `IoT Health Platform` via a restricted read-only API
- The `Health Analytics Module` queries aggregated measurement data for reporting and compliance tracking

## Workflows

### Workflow A: Monthly Payroll Integration

Trigger:
- Last working day of each month

Inputs:
- WorkDo attendance records
- WorkDo leave records
- neoCare schedule or service records
- JUBO schedule or service records

Processing steps:
1. Retrieve current-month attendance data from WorkDo
2. Retrieve current-month leave data from WorkDo
3. Retrieve current-month schedule data from `neoCare` and `JUBO`
4. Compare attendance against schedule records
5. Compute actual service time and identify mismatches
6. Apply payroll rules such as base pay, case count, and allowances
7. Export payroll result files
8. Notify HR stakeholders

Outputs:
- `Excel` or `CSV` payroll reports
- difference or exception report
- notification email

### Workflow B: Daily Record Backup

Trigger:
- Daily at 02:00

Inputs:
- `neoCare` nursing records in `PDF` or exportable equivalent
- `JUBO` care-service records in `JSON` or exportable equivalent

Processing steps:
1. Export current-day nursing records from `neoCare`
2. Export current-day care records from `JUBO`
3. Create target folder structure by year and month
4. Group records by case or worker context
5. Upload or write backup files to NAS or cloud destination
6. Write backup log entry
7. Send alert if backup fails

Target storage examples:
- `/big-heart/backup/nursing/YYYY/MM/case_xxxx/`
- `/big-heart/backup/homecare/YYYY/MM/worker_xxxx/`

Outputs:
- archived record files
- backup logs
- failure notifications

### Workflow D: IoT Health Device Data Collection

Trigger:
- Nurse pairs a Bluetooth device with the Caregiver Mobile App during or after a home visit

Inputs:
- Bluetooth device measurement (blood pressure, blood glucose, SpO2, temperature, or weight)
- Patient identifier (selected or auto-matched by visit context)
- Nurse identifier (authenticated session)
- Visit or timestamp context

Processing steps:
1. Nurse opens Caregiver Mobile App and selects the active patient visit
2. Nurse activates pairing mode for the measurement device
3. Device transmits measurement via BLE to the mobile app
4. App displays reading for nurse confirmation before upload
5. Confirmed reading is uploaded to the IoT Health Platform with patient ID, nurse ID, device ID, and timestamp
6. IoT Health Platform stores the record and evaluates it against configured thresholds
7. If a threshold is violated, the platform emits an alert event (see Workflow E)
8. Caregiver dashboard reflects the new reading in real time

Outputs:
- Timestamped measurement record linked to patient and visit
- Updated caregiver dashboard reading
- Threshold alert event (conditional)

Supported device types:
- Blood pressure monitor (systolic, diastolic, pulse)
- Blood glucose meter
- Pulse oximeter (SpO2)
- Digital thermometer
- Body composition scale (weight, optional BMI)

### Workflow E: Threshold Alert and Escalation

Trigger:
- IoT Health Platform detects a reading outside configured threshold for a patient

Threshold examples (configurable per patient):
- Systolic blood pressure: alert if > 160 mmHg or < 90 mmHg
- Blood glucose: alert if > 250 mg/dL or < 70 mg/dL
- SpO2: alert if < 90%
- Body temperature: alert if > 38.5°C or < 35.5°C

Processing steps:
1. IoT Health Platform evaluates incoming reading against per-patient threshold configuration
2. If threshold is violated, create an alert event with severity level (warning or critical)
3. Deliver in-app push notification to the responsible nurse
4. If severity is critical, also send SMS or email to the nurse and the supervising nurse
5. Log the alert event with reading value, threshold breached, timestamp, and delivery status
6. Start an acknowledgment timer (configurable, default 30 minutes)
7. If alert is not acknowledged within the timeout, escalate to the director of nursing or supervisor
8. Nurse acknowledges the alert in the app and optionally adds a clinical annotation
9. Escalation is cancelled upon acknowledgment

Outputs:
- In-app push notification
- SMS or email (critical severity or escalation)
- Alert event log entry with acknowledgment status
- Escalation notification (if unacknowledged)

### Workflow F: Family Portal Health Summary Update

Trigger:
- New measurement record written to the IoT Health Platform for a patient whose family portal access is enabled

Processing steps:
1. IoT Health Platform writes new measurement record
2. Family portal data service checks whether the patient has active family portal access
3. If enabled, refresh the patient's summary view for authorized family accounts
4. Family member accesses portal via browser login and views the updated data
5. Portal enforces read-only access and respects per-patient data visibility rules set by nursing staff

Outputs:
- Updated health summary visible to family members
- No write access or clinical note exposure to family accounts

### Workflow G: Health Analytics Report Generation

Trigger:
- On-demand request by nursing staff, supervisor, or administrator
- Scheduled monthly summary for compliance reporting

Inputs:
- Patient or cohort selection
- Time window (7-day, 30-day, 90-day, or custom)
- Measurement type filter (optional)

Processing steps:
1. Analytics module queries IoT Health Platform for the selected patient or cohort and time window
2. Compute summary statistics (mean, min, max, out-of-range count, measurement count)
3. Compute measurement compliance rate against the scheduled visit count
4. Generate trend charts per measurement type
5. Compile into a report artifact (PDF or Excel)
6. Make the report available for download or email delivery

Outputs:
- Per-patient or population-level health summary report
- Trend charts
- Measurement compliance rate
- Downloadable PDF or Excel report

### Workflow C: AI-Assisted Documentation Discovery Track

Status:
- research and future-phase discovery only

Motivating input:
- field evidence from the Chimei home nursing AI presentation

Candidate flow:
1. Capture visit observations through voice or structured quick input
2. Convert voice to transcript
3. Generate a nursing note draft
4. Generate a care-plan draft
5. Generate patient education draft content when appropriate
6. Require nurse review and correction
7. Save reviewed content into the target record system or export workflow

Expected value:
- reduce documentation burden
- reduce recall dependency after visits
- improve consistency of note structure
- support reminder and productivity analytics

## Data and Integrations

### Expected Integration Pattern

- Preferred pattern: vendor API access
- Fallback pattern: scheduled file export and pickup

### Integration Sources

- `WorkDo`
  - attendance API or export
  - leave API or export

- `JUBO`
  - schedule query endpoint or export
  - service-record export endpoint or export

- `neoCare`
  - API if available
  - otherwise scheduled `CSV` or `PDF` export workflow

### IoT Health Platform Data

- measurement record: patient ID, nurse ID, device ID, device type, measurement values, unit, timestamp, visit context
- threshold configuration: patient ID, measurement type, lower bound, upper bound, severity level, last modified by, last modified at
- alert event: alert ID, measurement record ID, threshold violated, severity, delivery status, acknowledged by, acknowledged at, annotation
- family portal access rule: patient ID, family account ID, visible data categories, enabled flag, set by, set at

### Future AI Input Artifacts

- visit voice recording
- transcript
- AI-generated nursing note draft
- AI-generated care-plan draft
- AI-generated patient education draft
- review metadata for who edited and approved generated content

### Repository Artifacts

- Customer-facing proposal:
  - `docs/proposal/daxin/`
- Supporting research and source attachments:
  - `docs/attachments/daxin/`

## Deployment and Operations

### Hosting

- Recommended: self-hosted `n8n` for workflow automation
- IoT Health Platform: cloud-hosted or self-hosted depending on data residency requirements; must support TLS and role-based access
- Caregiver Mobile App: Android and iOS distribution; production build deployed via enterprise mobile app distribution
- Family Portal: web-accessible, must enforce HTTPS and session-based authentication
- Candidate environments for n8n and IoT backend:
  - existing NAS (for n8n and backup)
  - VPS or managed cloud (for IoT platform and family portal)
- SSL and secure access are required for all production-facing endpoints

### Monitoring

- Backup workflow failures must trigger an alert
- Credential expiry should be reviewed on a fixed schedule
- Payroll and backup outputs should be logged for traceability
- IoT device sync failures must be surfaced to the responsible nurse within the same visit window
- Threshold alert delivery failures must be logged and retried
- Unacknowledged critical alerts must trigger supervisor escalation within the configured timeout
- Future AI-assisted workflows should log generation events, review events, and finalization events

## Security and Compliance

- Keep operational and medical records within institution-controlled storage where possible
- Preserve auditability for payroll calculation and backup execution
- Align backup retention with long-term care record retention expectations
- Avoid unnecessary duplication of sensitive data beyond required outputs and backups
- Treat any future voice capture and generated clinical content as privacy-sensitive artifacts
- Require human review before generated clinical content is treated as finalized documentation
- All IoT measurement data must be transmitted over TLS 1.2 or higher
- Patient health data stored in the IoT Health Platform must be encrypted at rest
- Role-based access control must enforce separation between nursing staff, family members, and administrators
- Family portal accounts must not have access to clinical workflows, payroll data, or other patients' information
- Alert event logs and acknowledgment records must be retained for audit compliance
- Device identifiers must be registered and decommissioned through a controlled provisioning process

## Delivery Phases

- Phase 1
  - confirm contracts, migration path, API availability, and test environment
- Phase 2
  - complete payroll integration workflow and parallel validation
- Phase 3
  - complete daily backup workflow, training, optimization, and final acceptance

## Open Questions

- Does `neoCare` provide direct API access, or only export-based integration?
- What is the final vendor-confirmed migration scope from CloudBerry to `JUBO`?
- What payroll rules must be parameterized versus hard-coded in workflow logic?
- What exact storage destination will DaXin use in production: NAS, Google Drive, or both?
- What review and signoff process will DaXin use for payroll exceptions?
- Should AI-assisted documentation remain a research track, or enter the next delivery phase?
- What consent, retention, and review policy would apply to visit voice capture?
- What minimum clinical review standard is required before generated notes can be used operationally?
- Which IoT device vendors and models will DaXin use for blood pressure, blood glucose, SpO2, temperature, and weight?
- Will DaXin use a pre-existing IoT platform (e.g., Rossmax HealthStyle, JUBO-integrated devices) or a new vendor-neutral integration layer?
- What are the clinical threshold defaults and who has authority to configure per-patient overrides?
- What is the data residency requirement for patient physiological data: NAS, local cloud, or international cloud?
- Which family member notification channels does DaXin want to support: web portal only, or also LINE/messaging integration?
- What is the mobile platform target for the Caregiver App: Android only, iOS only, or both?
- Is community health kiosk deployment within the current DaXin scope, or a future expansion?
