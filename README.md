# Robert Healthcare Coach

This repository is the working space for the Robert Healthcare Coach project.

## Purpose

- Capture product requirements and specifications.
- Track key technical and business decisions.
- Store proposal materials and supporting attachments.
- Provide a single source of truth for implementation and collaboration.

## Project Scope

Robert Healthcare Coach integrates the DaXin Home Nursing Clinic's fragmented operations into a unified platform. Beyond workflow automation, the project now incorporates an **IoT Health Monitoring** track inspired by industry-leading smart care platforms, enabling real-time physiological data collection, caregiver dashboards, family visibility portals, and threshold-based alerts.

### Core Capability Areas

| Area | Description |
| --- | --- |
| Workflow Automation | Payroll integration and daily record backup via `n8n` |
| IoT Health Monitoring | Bluetooth-connected devices for blood pressure, blood glucose, SpO2, temperature, and body composition |
| Real-time Caregiver Dashboard | Live vital sign feeds and anomaly detection for nursing staff |
| Family Member Portal | Read-only access for family members to view patient health summaries |
| Health Analytics & Reporting | Trend analysis, population-level statistics, and compliance-ready exports |
| AI-Assisted Documentation | Discovery-track voice capture and note drafting for home nursing visits |

## Repository Structure

- `docs/requirements.md`: business goals, user needs, scope, and acceptance criteria
- `docs/spec.md`: system design, workflows, architecture, and implementation details
- `docs/decisions.md`: major decisions, rationale, and follow-up items
- `docs/roadmap.md`: delivery and discovery track timelines and priorities
- `docs/tasks.md`: implementation task breakdown by priority
- `docs/attachments/`: supporting source files and external references
- `docs/proposal/`: proposal drafts, customer-facing materials, and planning docs

## Working Rules

- Finalized decisions should be written back into the repo.
- Feature work should be done through branches and pull requests.
- Keep customer-facing content in `docs/proposal/`.
- Keep raw supporting materials in `docs/attachments/`.
- IoT device integration notes and hardware specs belong in `docs/attachments/iot/`.
