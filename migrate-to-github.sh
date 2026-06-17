#!/usr/bin/env bash
#
# migrate-to-github.sh — ONE-TIME setup.
# Pushes your local MovieBuzz project into the GitHub repo.
#
# Run this ONCE, from the root of your local project.

set -euo pipefail

# ─── Config ──────────────────────────────────────────────────────────────────
GITHUB_REMOTE="https://github.com/StrayDogSyn/MERN-Revamp_MovieBuzz.git"
GITHUB_USER="StrayDogSyn"
REPO_NAME="MERN-Revamp_MovieBuzz"
# ─────────────────────────────────────────────────────────────────────────────

GOLD='\033[0;33m'; RED='\033[0;31m'; GREEN='\033[0;32m'; NC='\033[0m'
say()  { echo -e "${GOLD}▸ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
die()  { echo -e "${RED}✗ $1${NC}" >&2; exit 1; }

# ─── Sanity: are we in the right place? ──────────────────────────────────────
[ -d .git ] || die "No .git here. Run this from your project root."
[ -d lesson-viewer ] || say "Heads up: no lesson-viewer/ dir found."

# ─── STEP 1: secrets gate ────────────────────────────────────────────────────
say "Scanning for secrets before pushing to GitHub..."

LEAKS=0

# Check for any tracked .env files
if git ls-files | grep -qE '\.env$'; then
  echo -e "${RED}  .env files are currently tracked:${NC}"
  git ls-files | grep '\.env$' | sed 's/^/    /'
  LEAKS=1
fi

# Check git history for .env
if git log --all --oneline -- '*.env' 2>/dev/null | grep -q .; then
  echo -e "${RED}  .env appears in git history.${NC}"
  LEAKS=1
fi

if [ "$LEAKS" -ne 0 ]; then
  echo
  die "Secrets gate FAILED. Resolve tracked .env files before pushing."
fi
ok "Secrets gate passed."

# ─── STEP 2: .gitignore hygiene ──────────────────────────────────────────────
say "Ensuring .env and build artifacts are ignored..."
touch .gitignore
for pat in ".env" ".env.*" "!.env.example" "node_modules/" "_site/" ".DS_Store"; do
  grep -qxF "$pat" .gitignore || echo "$pat" >> .gitignore
done
ok ".gitignore covers secrets and build output."

# ─── STEP 3: configure the github remote ─────────────────────────────────────
say "Configuring GitHub remote..."
if git remote | grep -qx github; then
  git remote set-url github "$GITHUB_REMOTE"
else
  git remote add github "$GITHUB_REMOTE"
fi
ok "Remote 'github' -> $GITHUB_REMOTE"

# ─── STEP 4: stage, commit, and push ─────────────────────────────────────────
say "Staging all changes..."
git add -A

if git diff --cached --quiet; then
  say "Nothing new to commit."
else
  git commit -m "chore: prepare MovieBuzz project for GitHub Pages deployment"
  ok "Committed."
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
say "Pushing '$BRANCH' to GitHub..."
git push -u github "$BRANCH"
ok "Pushed."

# ─── Done ────────────────────────────────────────────────────────────────────
echo
ok "Migration complete."
echo -e "${GOLD}Next steps (manual):${NC}"
echo "  1. GitHub repo → Settings → Pages → Source: GitHub Actions"
echo "  2. Push will trigger the Pages workflow."
echo "  3. Site will be live at: https://${GITHUB_USER}.github.io/${REPO_NAME}/"
echo "  4. For future updates: ./deploy.sh \"your message\""
