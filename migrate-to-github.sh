#!/usr/bin/env bash
#
# migrate-to-github.sh — ONE-TIME setup.
# Pushes your local MovieBuzz project into the (currently empty) GitHub repo
# so GitHub becomes a real, browsable copy — not a hollow mirror.
#
# Run this ONCE, from the root of your local project, after recon.
# After this, use ./deploy.sh for every future update.
#
# It will REFUSE to push if it finds anything that shouldn't go public.
# That refusal is the point — do not "fix" it by deleting the check.

set -euo pipefail

# ─── Config — the only two lines you might edit ──────────────────────────────
GITHUB_REMOTE="https://github.com/StrayDogSyn/MERN-peer-review.git"
GITHUB_USER="StrayDogSyn"
REPO_NAME="MERN-peer-review"
# ─────────────────────────────────────────────────────────────────────────────

GOLD='\033[0;33m'; RED='\033[0;31m'; GREEN='\033[0;32m'; NC='\033[0m'
say()  { echo -e "${GOLD}▸ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
die()  { echo -e "${RED}✗ $1${NC}" >&2; exit 1; }

# ─── Sanity: are we in the right place? ──────────────────────────────────────
[ -d .git ] || die "No .git here. Run this from your project root (the folder git tracks)."
[ -d lesson-viewer ] || say "Heads up: no lesson-viewer/ dir found — confirm you're in the project root."

# ─── STEP 1: secrets gate (HARD — blocks the whole script) ───────────────────
say "Scanning for secrets before anything touches GitHub..."

LEAKS=0

# .env tracked right now?
if git ls-files | grep -qiE '(^|/)\.env$'; then
  echo -e "${RED}  .env is currently tracked by git.${NC}"; LEAKS=1
fi

# .env anywhere in history (outside the known-safe client file)?
if git log --all --oneline -- '*.env' ':(exclude)movie-buzz-finished/client/.env' 2>/dev/null | grep -q .; then
  echo -e "${RED}  .env appears in git HISTORY (untracking now isn't enough — history needs purging).${NC}"; LEAKS=1
fi

# live-looking credentials?
if git log --all --oneline -- '*ples with localhost URIs), week_* dirs
if git grep -niE 'mongodb(\+srv)?://[^ "'"'"']+|password\s*=\s*['"'"'"][^'"'"'"]+|secret\s*=\s*['"'"'"][^'"'"'"]+|api[_-]?key\s*=\s*['"'"'"][^'"'"'"]+' \
   -- \
   ':(exclude)*.md' \
   ':(exclude)*.example' \
   ':(exclude)node_modules' \
   ':(exclude)lesson-viewer/' \
   ':(exclude)week_*/' \
   2>/dev/null | grep -qvE 'mongodb://(localhost|127\.0\.0\.1)'; then
  echo -e "${RED}  Possible live credential(s) in tracked files:${NC}"
  git grep -niE 'mongodb(\+srv)?://[^ "'"'"']+|password\s*=|secret\s*=|api[_-]?key\s*=' \
    -- \
    ':(exclude)*.md' ':(exclude)*.example' ':(exclude)node_modules' \
    ':(exclude)lesson-viewer/' ':(exclude)week_*/' \
    2>/dev/null | grep -vE 'mongodb://(localhost|127\.0\.0\.1)' | head -10
  LEAKS=1
fi

if [ "$LEAKS" -ne 0 ]; then
  echo
  die "Secrets gate FAILED. Nothing was pushed. Resolve the above, then re-run.
       This script will not make a leak public. That is not a bug."
fi
ok "Secrets gate passed."

# ─── STEP 2: .gitignore hygiene ──────────────────────────────────────────────
say "Ensuring .env and build artifacts are ignored..."
touch .gitignore
for pat in ".env" ".env.*" "!.env.example" "node_modules/" "client/build/" "_site/"; do
  grep -qxF "$pat" .gitignore || echo "$pat" >> .gitignore
done
ok ".gitignore covers secrets and build output."

# ─── STEP 3: CRA base-path for project Pages (/<repo>/client) ─────────────────
say "Setting CRA homepage so assets resolve under the Pages sub-path..."
if [ -f movie-buzz-finished/client/package.json ]; then
  HOMEPAGE="https://${GITHUB_USER}.github.io/${REPO_NAME}"
  node - "$HOMEPAGE" <<'NODE'
const fs = require('fs');
const homepage = process.argv[2];
const p = 'movie-buzz-finished/client/package.json';
const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
if (pkg.homepage !== homepage) {
  pkg.homepage = homepage;
  fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
  console.log('  set homepage =', homepage);
} else {
  console.log('  homepage already correct');
}
NODE
  ok "CRA homepage configured."
else
  say "No movie-buzz-finished/client/package.json — skipping CRA homepage."
fi

# ─── STEP 4: point origin (or a github remote) at GitHub ──────────────────────
say "Wiring up the GitHub remote..."
if git remote | grep -qx github; then
  git remote set-url github "$GITHUB_REMOTE"
else
  git remote add github "$GITHUB_REMOTE"
fi
ok "Remote 'github' -> $GITHUB_REMOTE"

# ─── STEP 5: stage, commit, and push to a clean branch ───────────────────────
say "Staging the full project..."
git add -A
if git diff --cached --quiet; then
  say "Nothing new to commit — tree already matches last commit."
else
  git commit -m "chore: migrate MovieBuzz project into GitHub for Pages demo"
  ok "Committed."
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
say "Pushing '$BRANCH' to GitHub (this populates the empty repo)..."
echo -e "${GOLD}  You may be prompted for a GitHub username + Personal Access Token.${NC}"
git push -u github "$BRANCH"
ok "Pushed."

# ─── Done ────────────────────────────────────────────────────────────────────
echo
ok "Migration complete."
echo -e "${GOLD}Next steps (manual, one time):${NC}"
echo "  1. GitHub repo → Settings → Pages → Source: GitHub Actions"
echo "  2. If '$BRANCH' isn't 'main', either merge it to main or set main as default."
echo "  3. Run your deploy workflow once (workflow_dispatch), then verify the live URLs."
echo "  4. From now on, just run:  ./deploy.sh \"your message\""
