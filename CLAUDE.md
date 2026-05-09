# CLAUDE.md

Notes for Claude Code (and human contributors) working on this repo. The
[README](README.md) is the canonical source for installation, features, and
release notes. This file captures conventions and workflows that aren't
obvious from the codebase alone.

## Project shape

React Automation Studio is a multi-service Docker Compose deployment:

- `ReactApp/` — Vite + React frontend (pnpm-managed)
- `pvServer/` — Flask + Flask-SocketIO + PyEpics (UV-managed Python)
- `alarmHandlerServer/` — alarm processing
- `mongoSetup/` — MongoDB replica set bootstrap
- `nginx/` — TLS termination + load balancing
- `docker/` — Dockerfiles for every service
- `epics/` — demo IOC

Backend containers all build `FROM service:epicsbase` (the foundational image
introduced in V8). Frontend containers build `FROM node_cache`.

## Single sources of truth (don't duplicate these)

| What | Where | Notes |
|------|-------|-------|
| Node version | `docker/node_cache/Dockerfile` line 1 | All other frontend Dockerfiles inherit from `node_cache` |
| pnpm version | `ReactApp/package.json` `packageManager` field | Containers run `corepack enable` so this drives the in-container pnpm |
| Python version | `docker/epicsBase/Dockerfile` (`uv python install X.Y.Z`) | `epicsbase` is the base for all Python services |
| EPICS Base version | `docker/epicsBase/Dockerfile` (`base-X.Y.Z.tar.gz`) | Same |
| Frontend deps | `ReactApp/package.json` (exact pins, no `^`/`~`) | See lockfile policy below |
| Backend deps | `pvServer/pyproject.toml`, `alarmHandlerServer/pyproject.toml` | UV-managed |

## Lockfile policy: don't commit them

This repo deliberately does **not** commit any lockfile (`pnpm-lock.yaml`,
`package-lock.json`, `uv.lock`, `poetry.lock`). All are gitignored.
Reproducibility is achieved by exact-pinning every dependency in
`package.json` / `pyproject.toml`.

When updating dependencies:
- Edit the manifest directly with exact versions
- Don't rely on `pnpm update` / `npm update` (lockfile-driven)
- If `pnpm install` produces a `pnpm-lock.yaml` locally, delete it before
  committing — it's gitignored, but don't `git add -f` it

## Verifying changes: build the dev compose

The canonical verification path is the dev Docker Compose stack, not a
local `pnpm build`:

```bash
docker compose -f docker-compose-dev.yml up --build                  # full dev stack (HMR, served by Vite)
docker compose -f docker-compose-dev-styleguide-dev.yml up --build   # styleguide in isolation
docker compose up --build                                            # production stack (compiled build, served by Nginx)
```

These exercise the full deployment: `node_cache` rebuild, in-container
`pnpm install` via corepack, frontend + storybook + pvServer + epicsbase.
First builds take several minutes.

The dev compose serves source files via Vite with HMR; the production
compose serves the **compiled** Vite output via Nginx. Some bugs only
show up in the production build (minified output, code splitting,
asset URL handling), so always finish a release with a production
`docker compose up --build` smoke test before tagging.

### Manual browser-based final checks

Type checks, builds, and a clean compose `up` only confirm the code
*starts*. Before signing off on any release prep or non-trivial change,
manually browse the running app — there is no automated end-to-end suite
that covers the full UI surface. Typical things to spot-check:

- **Dashboard** (`https://localhost:3000` for dev, `https://localhost:5000`
  for prod) — "Whats New" panel shows the expected version and changelog
  entry; widgets render and connect to PVs.
- **Login screen** (if `VITE_EnableLogin=true` in `.env`) — version
  footer reads correctly; local login + any enabled external auth
  works.
- **Browser tab title** — should match the release version (driven by
  `ReactApp/index.html`).
- **pvServer startup log** (`docker compose ... logs pvserver1`) —
  banner line `React Automation Studio VX.Y.Z` confirms backend version
  bump took effect.
- **AlarmHandler / LoadSave** — page loads, MongoDB-backed lists render,
  add/remove still works (only paths that exercise the Mongo replica
  set).
- **Styleguide** (`https://localhost:6060`, or run the styleguide-dev
  compose) — components render and document examples still work after
  a package bump. Worth a separate `up` of
  `docker-compose-dev-styleguide-dev.yml` after major frontend dep
  changes.

## Frontend package update workflow

1. **Bump the toolchain first.** Update Node pin in
   `docker/node_cache/Dockerfile` to the latest Node LTS, and pnpm pin in
   `ReactApp/package.json` `packageManager` field. Update local pnpm to
   match (`pnpm add -g pnpm@X.Y.Z`, `corepack prepare`, etc.).

2. **Survey outdated packages with `npx --yes npm-check-updates` (ncu),
   not `pnpm outdated`.** `pnpm outdated` requires a lockfile, which this
   repo does not use. Run from `ReactApp/`.

3. **Categorize before applying.** Patch/minor + same-major bumps go into
   patch releases. Major bumps are deferred to RAS major releases — MUI
   majors in particular have historically driven RAS majors (V6→MUI 6,
   V7→MUI 7, V8→Node 24, etc.).

4. **Coupling to keep in mind.** These move together:
   - `react` ↔ `react-dom`
   - `@vitejs/plugin-react` ↔ `vite`
   - `mdi-material-ui` major ↔ MUI major
   - `@mui/x-date-pickers` major ↔ MUI major
   - `@types/three` ↔ `three`
   - All `@storybook/*` + `eslint-plugin-storybook` + `storybook` (full cluster)

5. **Apply updates** by editing `package.json` directly (exact pins, no
   `^`/`~`).

6. **Verify** by running the dev compose build + up (see above).

7. **Clean up** any local lockfile before committing.

## Backend package updates

Python deps are UV-managed via `pyproject.toml` in each service folder
(`pvServer/`, `alarmHandlerServer/`). The shared UV cache lives at
`/opt/uv-cache/uv` inside `epicsbase` and is reused by all backend
containers via Docker BuildKit cache mounts.

## Branch and release conventions

- Patch/minor work happens on a `VX.Y.Zupdates` branch (e.g. `V8.0.1updates`)
  off `master`, then PR'd in.
- Migration guides live in `docs/migrate-from-VN-to-VN+1.md`. Add one for
  every major release with breaking changes.
- The README `Changelog` section is updated at the top with each release.

## Version pin locations (update every one on every release)

The version string is duplicated across several files. When releasing, every
location below must be bumped — there is no central constant. Easy to miss
items that aren't user-visible (`package.json`, browser title) so use this
as a checklist.

**Top-level / docs:**

| File | What to change |
|------|----------------|
| `README.md` (top) | `Current Release: VX.Y.Z` |
| `README.md` (Changelog section) | Add a new entry above the previous one — date format `Day D Month YYYY` |

**Frontend:**

| File | What to change |
|------|----------------|
| `ReactApp/package.json` | `"version": "X.Y.Z"` (no `V` prefix) |
| `ReactApp/index.html` | `<title>React Automation Studio VX.Y.Z</title>` (browser tab title) |
| `ReactApp/src/AppRoutes.jsx` | `<Login version="VX.Y.Z" ...>` prop |
| `ReactApp/src/components/SystemComponents/Login.md` | `version="VX.Y.Z"` in the styleguide example |
| `ReactApp/src/components/UI/MainDashboard.jsx` | Add a new entry to the "Whats New" changelog panel above the previous one |

**Backend (each service has its own `pyproject.toml`):**

| File | What to change |
|------|----------------|
| `pvServer/pyproject.toml` | `version = "X.Y.Z"` |
| `pvServer/pvServer.py` | startup `log.info("React Automation Studio VX.Y.Z")` banner |
| `alarmHandlerServer/src/python/pyproject.toml` | `version = "X.Y.Z"` |
| `mongoSetup/pyproject.toml` | `version = "X.Y.Z"` |
| `adminDbInit/pyproject.toml` | `version = "X.Y.Z"` |
| `alarmHandlerDbInit/pyproject.toml` | `version = "X.Y.Z"` |
| `loadSaveDbInit/pyproject.toml` | `version = "X.Y.Z"` |

Major-release-only:
- `docs/migrate-from-VN-to-VN+1.md` — add a new migration guide
- `README.md` — replace/add the "VX.Y.Z Breaking Changes Summary" section
  near the top
- `README.md` — update the Migration Guides list at the top to link the new
  guide

Sanity check before committing a release:
```bash
# Replace 8.0.0 (or VX.Y.Z) with the *previous* version
grep -rn "8\.0\.0\|V8\.0\.0" \
  --include="*.md" --include="*.json" --include="*.jsx" --include="*.tsx" \
  --include="*.html" --include="*.py" --include="*.toml" \
  ReactApp README.md docs pvServer alarmHandlerServer mongoSetup \
  adminDbInit alarmHandlerDbInit loadSaveDbInit
```
Any hit is either an intentional historical reference (deprecation notes,
prior changelogs, migration guides) or a missed bump. There is no
automation; eyeball each result.
