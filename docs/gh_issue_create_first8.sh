#!/bin/zsh

# Usage:
# 1. Review and edit labels if needed
# 2. Make sure gh is authenticated
# 3. Run commands one by one, or copy the specific issue you want

REPO="robertcchen8615/Robert_Healthcare_App"

gh issue create --repo "$REPO" \
  --title "T001 Confirm active customer scope baseline" \
  --body-file - <<'EOF'
## Purpose
Lock the DaXin delivery scope as the active implementation baseline.

## Priority
P0

## Owner Suggestion
Project owner or PM

## Blocked By
none

## Expected Output
- reviewed `docs/requirements.md`
- reviewed `docs/spec.md`
- reviewed `docs/decisions.md`
- aligned delivery baseline across the three documents

## Done When
- all three files reflect the same customer scope and workflow priorities
EOF

gh issue create --repo "$REPO" \
  --title "T002 Convert open questions into owner-based checklist" \
  --body-file - <<'EOF'
## Purpose
Make unresolved requirements actionable rather than implicit.

## Priority
P0

## Owner Suggestion
Project owner or PM

## Blocked By
- T001 Confirm active customer scope baseline

## Expected Output
- owner-tagged checklist for unresolved questions
- checklist stored in a meeting note or tracking issue

## Done When
- open questions around API access, storage destination, migration scope, and payroll rules have named owners
EOF

gh issue create --repo "$REPO" \
  --title "T301 Build vendor dependency tracker" \
  --body-file - <<'EOF'
## Purpose
Centralize all external dependencies for implementation readiness.

## Priority
P0

## Owner Suggestion
PM or operations lead

## Blocked By
- T002 Convert open questions into owner-based checklist

## Expected Output
- tracker including vendor, contact, dependency, status, blocker, and next action

## Done When
- the team can see which external dependency blocks which delivery task
EOF

gh issue create --repo "$REPO" \
  --title "T101 Confirm WorkDo integration method" \
  --body-file - <<'EOF'
## Purpose
Determine whether WorkDo data will be obtained through API, export, or both.

## Priority
P1

## Owner Suggestion
IT lead

## Blocked By
- T002 Convert open questions into owner-based checklist

## Expected Output
- documented attendance data source method
- documented leave data source method
- authentication approach
- expected key fields and output format

## Done When
- the source, authentication method, and expected output fields are documented
EOF

gh issue create --repo "$REPO" \
  --title "T102 Confirm JUBO scheduling data source" \
  --body-file - <<'EOF'
## Purpose
Define how scheduling or service data is retrieved from JUBO.

## Priority
P1

## Owner Suggestion
IT lead or home-care systems owner

## Blocked By
- T002 Convert open questions into owner-based checklist

## Expected Output
- documented schedule query or export mechanism
- expected required fields
- assumptions or limits from the vendor side

## Done When
- JUBO source method and required fields are documented
EOF

gh issue create --repo "$REPO" \
  --title "T103 Confirm neoCare scheduling data source" \
  --body-file - <<'EOF'
## Purpose
Define whether neoCare exposes API access or requires export-based integration.

## Priority
P1

## Owner Suggestion
IT lead or nursing systems owner

## Blocked By
- T002 Convert open questions into owner-based checklist

## Expected Output
- documented neoCare integration pattern
- API or export decision
- expected scheduling or service-related fields

## Done When
- the approved source pattern for neoCare is documented
EOF

gh issue create --repo "$REPO" \
  --title "T104 Define payroll data mapping" \
  --body-file - <<'EOF'
## Purpose
Map attendance, leave, and schedule data into a unified payroll input model.

## Priority
P1

## Owner Suggestion
Business analyst or integration lead

## Blocked By
- T101 Confirm WorkDo integration method
- T102 Confirm JUBO scheduling data source
- T103 Confirm neoCare scheduling data source

## Expected Output
- payroll input field mapping
- normalized data model
- mismatch categories
- exception categories

## Done When
- the team can explain how raw inputs become payroll-ready records
EOF

gh issue create --repo "$REPO" \
  --title "T201 Confirm neoCare record export method" \
  --body-file - <<'EOF'
## Purpose
Define how nursing records will be retrieved for backup.

## Priority
P2

## Owner Suggestion
IT lead or nursing systems owner

## Blocked By
- T002 Convert open questions into owner-based checklist

## Expected Output
- documented record export method
- export timing
- record format
- retrieval path for backup workflow

## Done When
- record format, export timing, and retrieval method are documented
EOF
