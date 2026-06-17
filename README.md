# MERN-Revamp_MovieBuzz

This repository is configured to publish a GitHub Pages build of:

- `https://gitlab.com/eric.petross/tlm-mern-moviebuzz-revamp.git`

## How it works

A GitHub Actions workflow (`.github/workflows/deploy-gitlab-pages.yml`) does the following:

1. Clones the GitLab repository.
2. Detects whether the frontend app is in `client/` or the repository root.
3. Uses `.nvmrc` from the GitLab repository when present (falls back to Node 20).
4. Installs dependencies.
5. Runs `npm run build`.
6. Deploys the generated `build/` or `dist/` output to GitHub Pages.

## Publishing

1. In this GitHub repository, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. *(Optional)* Add a repository secret named `GITLAB_TOKEN` if the GitLab project is private.
4. Run the **Deploy GitLab MovieBuzz to GitHub Pages** workflow (or wait for the daily schedule).
