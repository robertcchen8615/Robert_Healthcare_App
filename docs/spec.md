# Specification

## Overview

This repository currently defines the first implementation baseline for the DaXin integration proposal. The solution is intentionally designed around existing vendor systems rather than full replacement. The target operating model is:

- `neoCare` for home nursing and NHI-related workflows
- `JUBO` for long-term care and home-service workflows
- `WorkDo` for attendance, leave, reimbursement, and internal communication
- `n8n` for cross-system automation, scheduling, export, notification, and backup orchestration

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

### Data Flow Model

- Attendance and leave data originate in `WorkDo`
- Schedule and service context originates in `neoCare` and `JUBO`
- `n8n` pulls API or exported data, performs comparisons and transformations, then produces outputs
- Payroll outputs are exported to files and distributed to HR stakeholders
- Daily backup outputs are stored in NAS or cloud storage with logs and alerts

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

### Repository Artifacts

- Customer-facing proposal:
  - `docs/proposal/daxin/`
- Supporting research and source attachments:
  - `docs/attachments/daxin/`

## Deployment and Operations

### Hosting

- Recommended: self-hosted `n8n`
- Candidate environments:
  - existing NAS
  - small VPS
- SSL and secure access are required for production exposure

### Monitoring

- Backup workflow failures must trigger an alert
- Credential expiry should be reviewed on a fixed schedule
- Payroll and backup outputs should be logged for traceability

## Security and Compliance

- Keep operational and medical records within institution-controlled storage where possible
- Preserve auditability for payroll calculation and backup execution
- Align backup retention with long-term care record retention expectations
- Avoid unnecessary duplication of sensitive data beyond required outputs and backups

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
