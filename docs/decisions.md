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

## Current Working Assumptions

- DaXin is the first active customer track documented in this repository
- Payroll automation is the first operational priority
- Daily backup and compliance support are the second operational priority
- Vendor documentation collected under `docs/attachments/daxin/` is reference material, not a substitute for final signed vendor commitments

## Pending Decisions

- Final GitHub workflow for feature branches and PR reviews
- Whether customer-facing deliverables should also be versioned as PDF exports on each milestone
- Whether a separate environment document is needed for production deployment details
