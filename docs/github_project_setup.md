# GitHub Project Setup

## Recommended Project Name

`Robert Healthcare Coach - Delivery Track`

## Project Description

```md
This Project manages the `Robert Healthcare Coach` Delivery Track.

Use it to execute the DaXin integration baseline in a clear sequence:
documentation alignment, vendor dependency confirmation, payroll workflow definition, and backup workflow definition.

Status columns:
- Backlog
- Ready
- In Progress
- Done

Sort by `Priority` first, then by dependency order.
Any confirmed change must be synced back to the repo docs in `requirements`, `spec`, `decisions`, and `meetings`.
```

## PM-Style Short Description

```md
This Project is the execution board for the DaXin delivery baseline.

Use it to move work from documentation alignment into implementation-ready workflows:
vendor dependencies, payroll workflow definition, backup workflow definition, and delivery readiness.

Columns:
- Backlog
- Ready
- In Progress
- Done

Order work by `Priority`, then by blocker impact.
Any confirmed scope or workflow change must be written back to repo docs.
```

## Suggested Fields

- `Status`
  - `Backlog`
  - `Ready`
  - `In Progress`
  - `Done`
- `Priority`
  - `P0`
  - `P1`
  - `P2`
  - `P3`
- `Owner`
- `Blocked by`
- `Expected output`

## Sorting Rule

1. Sort by `Priority`
2. Within the same priority, put blocker issues first
3. Within the same dependency tier, prefer work that unlocks payroll and backup definition

## First 8 Issues To Add

- `T001 Confirm active customer scope baseline`
- `T002 Convert open questions into owner-based checklist`
- `T301 Build vendor dependency tracker`
- `T101 Confirm WorkDo integration method`
- `T102 Confirm JUBO scheduling data source`
- `T103 Confirm neoCare scheduling data source`
- `T104 Define payroll data mapping`
- `T201 Confirm neoCare record export method`

## Related Repo Files

- `docs/tasks.md`
- `docs/issue_board_seed.md`
- `docs/issue_templates_first8.md`
- `docs/gh_issue_create_first8.sh`
- `docs/gh_issue_create_first8_batch.sh`
