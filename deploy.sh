#!/usr/bin/env bash
#
# deploy.sh — push changes to GitHub, which triggers the Pages workflow.
#
# Usage:
#   ./deploy.sh "message"
#   ./deploy.sh "fix: typo in Week 03 lesson"

set -euo pipefail

GOLD='\033[0;33m'; RED='\033[0;31m'; GREEN='\033[0;32m'; NC='\033[0m'
say()  { echo -e "${GOLD}▸ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
die()  { echo -e "${RED}✗ $1${NC}" >&2; exit 1; }

MESSAGE="${1:-chore: update peer review site}"

say "Staging changes..."
git add -A

if git diff --cached --quiet; then
  say "No changes to commit."
  exit 0
fi

say "Committing: $MESSAGE"
git commit -m "$MESSAGE"
ok "Committed."

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
say "Pushing '$BRANCH' to GitHub..."
git push -u origin "$BRANCH"
ok "Pushed."

echo
ok "Deployment triggered."
echo -e "${GOLD}Check workflow status at: https://github.com/StrayDogSyn/MERN-Revamp_MovieBuzz/actions${NC}"
