# Decisions

## Decision Log

| Date | Decision | Reason | Owner | Follow-up |
| --- | --- | --- | --- | --- |
| 2026-02-21 | Use `neoCare` as the retained home nursing core system | The proposal treats neoCare as strong in NHI claims, nursing records, and compliance-sensitive workflows | Project team + customer | Confirm exact integration method: API or file export |
| 2026-02-21 | Use `JUBO` as the target long-term care and home-service core system | The proposal assumes JUBO is the preferred upgrade path for long-term care operations and data integration | Project team + customer | Confirm migration scope, data mapping, and vendor support |
| 2026-02-21 | Replace MAYO with `WorkDo` for attendance and admin workflows | WorkDo better matches the stated first-line needs and reduces unnecessary platform scope | Project team + customer | Validate rollout, training plan, and historical data retention |
| 2026-02-21 | Use self-hosted `n8n` as the integration and automation layer | This minimizes license cost and keeps data handling under customer control | Project team | Confirm hosting target, credentials, and operational ownership |
| 2026-02-21 | Deliver the project in three phases | Phase delivery reduces risk and aligns with payroll-first business priorities | Project manager | Keep milestones synchronized with customer and vendors |
| 2026-04-05 | Treat this repository as the source of truth for finalized proposal content | ChatGPT discussions and project materials need a stable home for implementation and PR-based collaboration | Repository owner | Keep requirements, spec, and decisions updated when scope changes |
| 2026-04-05 | Treat Chimei home nursing AI material as a discovery input, not current delivery scope | The PDF provides strong field evidence for future AI-assisted documentation ideas, but it does not by itself validate deployability for the current customer engagement | Repository owner | Track AI-assisted documentation as a future capability area |
| 2026-04-26 | Add IoT Health Monitoring as a second product track alongside the DaXin delivery baseline | Industry reference (viWave ULife) demonstrates that Bluetooth IoT device sync, caregiver dashboards, family portals, and threshold alerts are achievable and operationally valuable for home nursing organizations | Repository owner | Resolve open questions: device vendor, platform, data residency, mobile app target |
| 2026-04-26 | Use Bluetooth Low Energy (BLE) as the primary device connectivity method for IoT integration | BLE is the standard protocol for certified medical IoT devices (blood pressure monitors, glucose meters, pulse oximeters); it minimizes infrastructure requirements at home visit sites and aligns with vendor SDK availability | Repository owner | Confirm BLE SDK compatibility with target mobile platforms during T502 |
| 2026-04-26 | Separate family member portal access from clinical workflows with strict read-only enforcement | Family members should have health visibility but must not access clinical notes, payroll data, or other patients; mixing access models risks both privacy violations and compliance exposure | Repository owner | Define per-patient visibility rules and confirm which data categories are shareable |
| 2026-04-26 | Default to cloud-hosted IoT Health Platform with data residency review before production | Self-hosting is feasible but adds operational burden; a managed or local cloud option is preferred pending DaXin confirmation of residency requirements and budget | Repository owner | Confirm data residency requirement (T501) before selecting hosting model |

## Current Working Assumptions

- DaXin is the first active customer track documented in this repository
- Payroll automation is the first operational priority
- Daily backup and compliance support are the second operational priority
- IoT Health Monitoring is the third operational priority, pending device vendor and platform scoping
- Vendor documentation collected under `docs/attachments/daxin/` is reference material, not a substitute for final signed vendor commitments
- Chimei material under `docs/attachments/chimei/` is a product discovery input for future workflow design
- IoT device vendor materials will be stored under `docs/attachments/iot/` once scoping is confirmed
- viWave ULife capabilities (blood pressure, blood glucose, SpO2, temperature, body weight via BLE) serve as the reference model for IoT feature design

## Pending Decisions

- Final GitHub workflow for feature branches and PR reviews
- Whether customer-facing deliverables should also be versioned as PDF exports on each milestone
- Whether a separate environment document is needed for production deployment details
- Whether AI-assisted documentation should become phase-three product scope or remain research-only
- IoT device vendor selection (blood pressure, blood glucose, SpO2, temperature, weight)
- Whether to use a vendor-provided IoT platform SDK or build a vendor-neutral integration layer
- Data residency requirement for patient physiological data: NAS, local cloud, or international cloud
- Mobile platform scope for the Caregiver App: Android only, iOS only, or both
- Whether community health kiosk integration is within the current DaXin engagement scope
