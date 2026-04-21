#!/bin/zsh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

ISSUES=(
  T001
  T002
  T301
  T101
  T102
  T103
  T104
  T201
)

echo "Checking GitHub CLI authentication..."
if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Run: gh auth login"
  exit 1
fi

echo "About to create ${#ISSUES[@]} issues in order:"
for issue_id in "${ISSUES[@]}"; do
  echo "  - ${issue_id}"
done

echo
read "confirm?Continue? [y/N]: "
if [[ "${confirm:-N}" != "y" && "${confirm:-N}" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

for issue_id in "${ISSUES[@]}"; do
  echo
  echo "Creating issue ${issue_id}..."
  zsh "${SCRIPT_DIR}/gh_issue_create_first8.sh" "${issue_id}"
done

echo
echo "Done. Attempted all first 8 issues."
