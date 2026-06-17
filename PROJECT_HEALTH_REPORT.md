# Project Health Report
**Repo:** `mern-revamp-tlm` — `movie-buzz-finished` reference implementation
**Date:** 2026-06-17
**Session scope:** Phase 0 recon + Phase 1 (.env/gitignore) + Phase 2 (route/controller cleanup)

---

## Phase 0 — Recon Tables (actual findings)

### 1. Axios-call Table

| File | Call | URL | Matches plural REST? |
|------|------|-----|----------------------|
| `client/src/services/movieService.js` | `getMovies()` | `GET /api/movies` | ✅ |
| `client/src/services/movieService.js` | `getMovie(id)` | `GET /api/movies/:id` | ✅ |
| `client/src/services/movieService.js` | `createMovie(data)` | `POST /api/movies` | ✅ |
| `client/src/services/movieService.js` | `updateMovie(id, data)` | `PUT /api/movies/:id` | ✅ |
| `client/src/services/movieService.js` | `deleteMovie(id)` | `DELETE /api/movies/:id` | ✅ |
| `client/src/index.jsx` | (none — no direct axios) | — | ✅ |

`index.jsx` imports only `{ movieService }` from the service layer. No direct `axios` import. No `window.location` anywhere in `client/src`.

### 2. Service-layer Table

| Export | URL | Called by index.jsx? |
|--------|-----|----------------------|
| `movieService.getMovies()` | `GET /api/movies` | ✅ `fetchMovies()` |
| `movieService.getMovie(id)` | `GET /api/movies/:id` | Not from index.jsx directly (used by edit form via prop) |
| `movieService.createMovie(data)` | `POST /api/movies` | ✅ `onAdd()` |
| `movieService.updateMovie(id, data)` | `PUT /api/movies/:id` | ✅ `editMovie()` |
| `movieService.deleteMovie(id)` | `DELETE /api/movies/:id` | ✅ `onDelete()` |

**"Dead movieService.js" hypothesis — REFUTED.** All four operations used by `index.jsx` route through `movieService`. The service is the only API layer in the client.

### 3. Route Registration Table

`server.js` mounts `app.use(movieRouter)` with no prefix. The router registers full paths internally.

| Method | Full path | Controller fn | Notes |
|--------|-----------|---------------|-------|
| GET | `/api/movies` | `getMovies` | ✅ |
| GET | `/api/movies/:id` | `getMovieToEdit` → renamed `getMovieById` | See Phase 2 |
| POST | `/api/movies` | `createMovie` | ✅ |
| PUT | `/api/movies/:id` | `updateMovie` | ✅ |
| DELETE | `/api/movies/:id` | `deleteMovie` | ✅ |

No old singular/action-suffix routes (`/api/movie/new`, `/api/movie/:id`) exist anywhere in the codebase. These were removed in commit `51ebf0f5`.

**Non-standard Express mounting pattern noted:** Routes hardcode the full `/api/movies` prefix inside the router rather than using a mount prefix in `server.js`. Functionally correct, but non-idiomatic. See Reserved section.

### 4. Secrets Check

| File | Tracked? | Content | Risk |
|------|----------|---------|------|
| `movie-buzz-finished/client/.env` | **Yes (intentional)** | `HOST=localhost`, `DANGEROUSLY_DISABLE_HOST_CHECK=true` | None — no credentials; intentional CRA config per CONVENTIONS.md §8 |
| `movie-buzz-finished/server/.env.example` | Yes | `PORT=4000`, `MONGO_URI=mongodb://127.0.0.1/movie-buzz`, `NODE_ENV=development`, `CLIENT_URL=http://localhost:3000` | None — placeholder/local values only |
| `movie-buzz-finished/server/.env` | **No** — server `.gitignore` protecting it | (not read) | Server `.gitignore` working correctly |

**Root `.gitignore` gap:** Had no `.env` pattern at all. Fixed in Phase 1.
**No real credentials found.** No rotation needed.

### 5. Curriculum-doc Entanglement

```
grep -rln "/api/movie[^s]" --include="*.md" .  →  no output
grep -rln "/api/movie/" --include="*.md" .      →  no output
```

No `.md` files reference the old singular/action-suffix route shape. Nothing to carry forward.

---

## Phase 1 — Changes Made

### 1. Root `.gitignore` — added `.env` protection

**File:** `.gitignore`

Added:
```
# Environment files — never commit secrets
.env
.env.local
.env.*.local

# Exception: client/.env is intentionally tracked (CRA DANGEROUSLY_DISABLE_HOST_CHECK, no secrets)
!movie-buzz-finished/client/.env
```

The negation exception preserves the intentionally-tracked `client/.env` (documented in CONVENTIONS.md §8) while blocking any future accidental `.env` commits elsewhere in the repo.

### 2. Created `movie-buzz-finished/client/.gitignore`

**File:** `movie-buzz-finished/client/.gitignore` (new)

Covers CRA's sensitive local-override variants (`.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local`). A plain `.env` at the client level remains trackable (and currently is tracked, intentionally).

### Verification — Phase 1

```bash
git ls-files | grep -E '(^|/)\.env$'
# Output: movie-buzz-finished/client/.env
# → intentional file remains tracked; no other .env tracked

grep -n '\.env' .gitignore
# Output:
# 8:.env
# 9:.env.local
# 10:.env.*.local
# 12:# Exception: client/.env is intentionally tracked …
# 13:!movie-buzz-finished/client/.env

node -e "require('dotenv').config(); console.log(!!process.env.MONGO_URI)"
# (run from movie-buzz-finished/server)
# Output: true
# → dotenv loads correctly from untracked server .env
```

**No git history purge required.** The committed `client/.env` contains no secrets. Zero credentials were ever committed. Hunter's go-ahead for `git filter-repo` is neither needed nor appropriate here — there is no sensitive history to erase.

---

## Phase 2 — Changes Made

### 1. Renamed `getMovieToEdit` → `getMovieById`

**File:** `movie-buzz-finished/server/controllers/movieController.js` line 21

```js
// Before
async getMovieToEdit(req, res) {

// After
async getMovieById(req, res) {
```

**File:** `movie-buzz-finished/server/routes/movieRoutes.js` line 9

```js
// Before
// GET single movie by ID (for edit form)
router.get('/api/movies/:id', movieController.getMovieToEdit);

// After
// GET single movie by ID
router.get('/api/movies/:id', movieController.getMovieById);
```

**Rationale:** CONVENTIONS.md §5 uses `getMovieById` as the canonical name. The old name `getMovieToEdit` implied a route that exists only to serve one UI component, contradicting the REST resource model the curriculum is trying to teach.

### Verification — Phase 2

```bash
# Old singular route must 404
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4000/api/movie/new
# Output: 404 ✅

# GET all movies
curl -s http://localhost:4000/api/movies | head -c 200
# Output: 200, bare JSON array ✅

# POST create
curl -s -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Movie","year":2024,"rating":"PG","length":"1h30m","description":"Test","genre":["Drama"],"director":"Test Dir","stars":["Actor A"]}'
# Output: 201, bare created object ✅

# Invalid ObjectId → 400
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4000/api/movies/not-a-real-id
# Output: 400 ✅

# Valid ObjectId shape, no matching doc → 404
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4000/api/movies/000000000000000000000000
# Output: 404 ✅

# No direct axios import in index.jsx
grep -n "axios" movie-buzz-finished/client/src/index.jsx
# Output: no output ✅

# No window.location in client
grep -rn "window.location" movie-buzz-finished/client/src
# Output: no output ✅
```

### Mocha test suite

```
8 passing (914ms)
```

All eight tests pass after the rename. No test-file edits were required — the tests assert on route URLs (`/api/movies`, `/api/movies/:id`), not on controller function names.

---

## Files Changed in This Session

| File | Change |
|------|--------|
| `.gitignore` | Added `.env`, `.env.local`, `.env.*.local` patterns with negation exception for `client/.env` |
| `movie-buzz-finished/client/.gitignore` | **New** — covers CRA sensitive `.env` local variants |
| `movie-buzz-finished/server/controllers/movieController.js` | Renamed `getMovieToEdit` → `getMovieById` |
| `movie-buzz-finished/server/routes/movieRoutes.js` | Updated route binding + comment to match `getMovieById` |

---

## Reserved — Requires Hunter's Decision

### 1. Express route mounting pattern

Current: `movieRoutes.js` hardcodes full paths (`/api/movies`, `/api/movies/:id`) inside the router; `server.js` mounts it at root with `app.use(movieRouter)`. This works correctly but is non-standard Express pedagogy. Standard pattern: routes use `'/'` and `'/:id'`, mounted at `app.use('/api/movies', movieRouter)`. Purely a teaching-clarity change; zero functional impact.

### 2. `movieService.js` async pattern

The service object uses `.then()` chains (`axios.get(BASE).then(res => res.data)`). CONVENTIONS.md §3 mandates `async/await` for all new code. The convention examples are server-side controllers, but the same principle applies to client service functions. Whether to convert the service to named `async function` exports (matching the prompt's target pattern) is Hunter's call — it would also change the import shape in `index.jsx` from `{ movieService }` to `{ getMovies, deleteMovie, … }`.

### 3. `index.jsx` uses `.then()` on service calls

Same issue, same decision — `index.jsx` itself chains `.then()/.catch()` on the `movieService` calls in `fetchMovies`, `onDelete`, `onAdd`, `editMovie`. Converting to `async/await` inside those handlers is low-risk but changes multiple lines of `index.jsx`.

### 4. Curriculum `.md` file updates

Phase 0 found no `.md` files referencing old routes. No action needed here. If any future student/instructor guide generation pass produces route examples, those should reference the plural REST shape.

---

## Out of Scope (carried forward, not touched)

- `MovieBlock.jsx` unsafe `.join()` on possibly-non-array data — separate, narrowly-scoped fix
- `test_helper.js` `beforeEach` async race condition — separate pass
- Weekly module route/controller files — not part of the reference implementation audit

---

## Prior Audit Reconciliation

The "two Critical/Blocker" findings described in the session prompt were:
1. **Route convention violation / dead `movieService.js`** — Already resolved in commit `51ebf0f5 Movie Buzz audit fixes: plural REST routes, async controller, env/test/client cleanup`. Confirmed clean in Phase 0 recon. No code changes needed here beyond the `getMovieToEdit` naming cleanup.
2. **Committed `.env` files** — The committed `client/.env` contains no credentials (intentional CRA config). The actual incomplete item was the **root `.gitignore` gap** flagged in Round 2. Fixed in this session.

The Round 2 audit note "`.env gitignore`... fixes were incomplete" is now fully resolved.
