# MERN-Revamp — Movie Buzz Curriculum

Peer-review workspace for the **TLM Movie Buzz** 16-week full-stack bootcamp revamp.

## Repository layout

```
MERN-peer-review/
└── tlm-mern-moviebuzz-revamp/     # all curriculum content lives here
    ├── welcome-player-one.html    # entry-point splash page (auto-redirects to lesson viewer)
    ├── lesson-viewer/             # static build system → pre-rendered HTML curriculum
    │   ├── build.js               # markdown-it build script
    │   ├── src/                   # nav-data, markdown-rules, HTML template
    │   └── weeks/                 # BUILD OUTPUT — one index.html per week (all 19 pages built)
    ├── movie-buzz-finished/       # reference MERN implementation (client + server)
    ├── movie-buzz-slides/         # presentation slides
    ├── week_00_welcome_call/ … week_16_frontend_backend_integration/
    ├── week_optional_search_feature/
    ├── week_optional_testing_suite/
    ├── log_01_ai_engineering_loop/
    └── PROJECT_HEALTH_REPORT.md   # audit findings and changes from the current session
```

## Lesson viewer

All 19 curriculum pages are pre-rendered to static HTML (no client-side JavaScript required):

- **Weeks 00–07** — Pre-Backend (Bash & Git, Dev Environment, React)
- **Weeks 08–16** — Backend (Node.js, Express, CORS, MongoDB, Mongoose, full CRUD)
- **Optional** — Search feature, Testing suite (Mocha)
- **Log 01** — AI Engineering Loop

Open `tlm-mern-moviebuzz-revamp/welcome-player-one.html` in a browser to enter the lesson viewer. It auto-redirects to `lesson-viewer/weeks/index.html` after 3 seconds.

## Reference implementation (`movie-buzz-finished`)

Full-stack MERN app with plural REST routes, `async/await` controllers, and a Mocha test suite.

| Layer | Stack |
|-------|-------|
| Client | React (CRA), Axios |
| Server | Node.js, Express, Mongoose |
| Database | MongoDB |
| Tests | Mocha + Chai (8 passing) |

**API routes** — all under `/api/movies`:

| Method | Path | Controller |
|--------|------|------------|
| GET | `/api/movies` | `getMovies` |
| GET | `/api/movies/:id` | `getMovieById` |
| POST | `/api/movies` | `createMovie` |
| PUT | `/api/movies/:id` | `updateMovie` |
| DELETE | `/api/movies/:id` | `deleteMovie` |

## Session audit status

See `tlm-mern-moviebuzz-revamp/PROJECT_HEALTH_REPORT.md` for full findings. Summary:

| Phase | Status |
|-------|--------|
| Phase 0 — Recon (routes, secrets, service layer) | ✅ Complete |
| Phase 1 — `.gitignore` / `.env` protection | ✅ Complete |
| Phase 2 — Route/controller cleanup (`getMovieToEdit` → `getMovieById`) | ✅ Complete |
| Reserved items (Express mount pattern, async/await service layer) | ⏳ Awaiting decision |

## Running the reference app

```bash
# Server
cd tlm-mern-moviebuzz-revamp/movie-buzz-finished/server
cp .env.example .env          # edit MONGO_URI if needed
npm install
npm start                      # http://localhost:4000

# Client (separate terminal)
cd ../client
npm install
npm start                      # http://localhost:3000
```

## Running tests

```bash
cd tlm-mern-moviebuzz-revamp/movie-buzz-finished/server
npm test
# 8 passing
```

## GitHub Pages

The repository is set up to publish the static peer-review site through GitHub Actions.

- The root `index.html` redirects to `welcome-player-one.html`
- The Pages artifact includes `lesson-viewer/`, `movie-buzz-slides/`, and the splash page
- The workflow is defined in `.github/workflows/pages.yml`

After pushing `main` to GitHub, enable Pages to use GitHub Actions as the source.