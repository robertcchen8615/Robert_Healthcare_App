# Issue Board Seed

## Overview

This file defines the recommended first wave of GitHub issues for the `Delivery Track`.

## Recommended Issue Creation Order

| Order | Issue title | Priority | Owner 建議 | Blocked by | Expected output |
| --- | --- | --- | --- | --- | --- |
| 1 | T001 Confirm active customer scope baseline | P0 | Project owner or PM | none | aligned `requirements`, `spec`, and `decisions` baseline |
| 2 | T002 Convert open questions into owner-based checklist | P0 | Project owner or PM | T001 | owner-tagged checklist for unresolved delivery questions |
| 3 | T301 Build vendor dependency tracker | P0 | PM or operations lead | T002 | tracker with vendor, contact, dependency, blocker, and next action |
| 4 | T101 Confirm WorkDo integration method | P1 | IT lead | T002 | documented attendance and leave source method, auth, and fields |
| 5 | T102 Confirm JUBO scheduling data source | P1 | IT lead or home-care systems owner | T002 | documented JUBO scheduling or service data retrieval approach |
| 6 | T103 Confirm neoCare scheduling data source | P1 | IT lead or nursing systems owner | T002 | documented neoCare API or export integration approach |
| 7 | T104 Define payroll data mapping | P1 | Business analyst or integration lead | T101, T102, T103 | field mapping and mismatch categories for payroll inputs |
| 8 | T201 Confirm neoCare record export method | P2 | IT lead or nursing systems owner | T002 | documented nursing record export method for backup workflow |
| 9 | T202 Confirm JUBO record export method | P2 | IT lead or home-care systems owner | T002 | documented care record export method for backup workflow |
| 10 | T105 Define payroll calculation rules | P1 | HR consultant plus business analyst | T104 | payroll rule spec and configurable parameter list |
| 11 | T106 Define payroll output and review workflow | P1 | HR consultant plus PM | T105 | output format, review roles, and exception handling flow |
| 12 | T203 Define backup storage structure | P2 | IT lead | T201, T202 | approved storage path, naming scheme, and organization rules |
| 13 | T204 Define backup log and alert model | P2 | IT lead or automation owner | T203 | log schema, alert triggers, and responsible owner list |
| 14 | T205 Define compliance review process | P2 | Nursing lead plus compliance owner | T204 | review checklist, retention assumptions, and escalation path |
| 15 | T302 Confirm migration and contract constraints | P2 | PM or operations lead | T301 | migration and contract risk note with milestone impact |
| 16 | T107 Break payroll workflow into implementation PRs | P1 | Tech lead | T106 | PR-ready implementation breakdown for payroll workflow |
| 17 | T206 Break backup workflow into implementation PRs | P2 | Tech lead | T205 | PR-ready implementation breakdown for backup workflow |
| 18 | T402 Prepare acceptance checklist | P3 | PM or QA owner | T106, T205 | milestone-based acceptance checklist |
| 19 | T403 Prepare branch and PR workflow guidance | P3 | Tech lead | T001 | short branch and PR workflow guidance |
| 20 | T404 Keep proposal and repo docs synchronized | P3 | Project owner or PM | ongoing | synchronized proposal, roadmap, and repo documentation |

## Suggested First 8 Issues

These are the first issues to create if you want the smallest useful execution board:

| Issue title | Priority | Owner 建議 | Blocked by | Expected output |
| --- | --- | --- | --- | --- |
| T001 Confirm active customer scope baseline | P0 | Project owner or PM | none | aligned baseline docs |
| T002 Convert open questions into owner-based checklist | P0 | Project owner or PM | T001 | owner-based unresolved question checklist |
| T301 Build vendor dependency tracker | P0 | PM or operations lead | T002 | vendor dependency tracker |
| T101 Confirm WorkDo integration method | P1 | IT lead | T002 | documented WorkDo source method |
| T102 Confirm JUBO scheduling data source | P1 | IT lead or home-care systems owner | T002 | documented JUBO data source |
| T103 Confirm neoCare scheduling data source | P1 | IT lead or nursing systems owner | T002 | documented neoCare data source |
| T104 Define payroll data mapping | P1 | Business analyst or integration lead | T101, T102, T103 | payroll field mapping and mismatch model |
| T201 Confirm neoCare record export method | P2 | IT lead or nursing systems owner | T002 | documented neoCare backup export approach |

## Notes

- If the team is small, the same person may own several early issues.
- `P1` payroll tasks should remain ahead of the backup implementation tasks because payroll is the primary business priority.
- `P2` backup tasks should still be opened early enough to avoid late discovery of export or compliance blockers.
