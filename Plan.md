# Atomic Icons – Project Plan

This plan captures the steps to finalize the repository toward two outcomes:

- Community Edition (CE): a self‑contained, open‑source library + CLI + optional server usable in any Deno project, including Fresh.
- Hosted/Cloud Edition (SaaS): a multi‑tenant service to host icon sets, sprite sheets, and generated component libraries.

The plan is organized by workstreams with phased milestones, acceptance criteria, and a focused backlog.

## Current State (Assessment)

- Core library
  - Sprite generation: `IconSet` builds a sprite sheet from a URL map; `useFileIconSet` writes to disk with optional SVGO optimize.
  - Component generation: `useIconSetComponents` writes typed Preact icon components and configures a Deno import alias.
  - Types/configs: `IconSetConfig`, `IconSetGenerateConfig`.
  - Browser export: `browser.ts` re‑exports `Icon` and `JSX` for app usage.
- Runtime plugin (EaC)
  - `FathymAtomicIconsPlugin` and resolvers can serve the sprite sheet dynamically at the configured path.
  - Component library route is stubbed but commented out.
- Tooling & CI
  - JSR exports: `mod.ts`, `browser.ts`, `plugin.ts`.
  - CI workflow publishes to JSR; versioning automated.
  - Tests minimal/stubbed; formatting/linting configured.
- Docs
  - README updated; AGENTS.md added.

Gaps relative to goals:

- No CLI entrypoint or commands.
- No Fresh plugin (export commented in `deno.jsonc`).
- No standalone server app (single‑tenant) and no multi‑tenant cloud service.
- Component library route for runtime hosting not implemented.
- Limited tests and examples.
- Community docs (CONTRIBUTING, CODE_OF_CONDUCT, SECURITY) not present.

## Guiding Principles

- Single source of truth: `IconSetConfig` and `IconSetGenerateConfig` power all runtimes (CLI, server, plugins).
- Lightweight defaults: minimal dependencies; standards‑first Deno/JSR usage.
- Deterministic builds: pinned versions; clear inputs/outputs; idempotent generators.
- Ergonomic DX: simple CLI, watch mode, and clear errors.
- Extensibility: plugins for EaC and Fresh; stable public API.

## Workstreams & Milestones

### 1) Library Hardening (Core)

Goals: Robust features, strong tests, stable public API.

Deliverables:

- Input sources
  - [ ] Support `http(s)` URLs (already) and local file paths (e.g., `./icons/check.svg`).
  - [ ] Optional disk cache for fetched icons (`--cacheDir`), checksum‑validated.
  - [ ] Clear errors with context (icon key, URL/path, fetch/read cause).
- Generation
  - [ ] SVGO configuration option pass‑through (allow custom plugins/presets).
  - [ ] Concurrency limits and retry policy when fetching icons.
  - [ ] Preserve `viewBox` and ensure `currentColor` friendliness.
  - [ ] Deterministic symbol ordering based on icon name.
- Component generation
  - [ ] Allow base `class` default via config (applies to all generated components).
  - [ ] Respect `SpriteSheet` as absolute or with provided `root` prefix.
  - [ ] Optional cleanup of removed icons (delete stale files) behind a flag.
- API surface
  - [ ] Audit and freeze `IconSetConfig`/`IconSetGenerateConfig` names and shapes.
  - [ ] JSDoc across public APIs.
- Tests
  - [ ] Unit tests: local file icons, HTTP icons (mock), optimize on/off.
  - [ ] Unit tests: XML parsing and symbol shape; viewBox preserved.
  - [ ] Unit tests: component file generation and exports file.

Acceptance criteria:

- Green `deno task test` with meaningful coverage for `src/iconsets` and routes.
- README examples align with final API and pass type checks.

### 2) CLI (Community Edition)

Goals: First‑class CLI usable in any Deno project.

Design:

- Entry: `./cli.ts` exported as `"./cli"` in `deno.jsonc`.
- Parser: `jsr:@std/cli` or `cliffy` (evaluate footprint; prefer `@std/cli`).
- Commands:
  - `atomic-icons init` → scaffold `fathym-atomic-icons.config.ts`.
  - `atomic-icons sheet --config <path> --out <file> [--optimize] [--cache-dir <dir>]`
  - `atomic-icons components --config <path> [--out <dir>] [--imports <alias>] [--root <path>] [--cleanup]`
  - `atomic-icons generate` → runs both sheet + components.
  - `atomic-icons serve --config <path> [--port 8000] [--watch]` → single‑tenant server.
  - `atomic-icons watch --config <path>` → watches config/icon sources; regenerates.
  - Reserved for cloud: `login`, `publish`, `push` (no‑ops until SaaS).

Deliverables:

- [ ] Implement CLI commands mapped to existing library functions.
- [ ] `deno install -g jsr:@fathym/atomic-icons/cli` docs.
- [ ] Helpful errors and `--verbose` logging.
- [ ] Exit codes and non‑interactive suitability for CI.

Acceptance criteria:

- Usable end‑to‑end in a blank Deno project to create a sheet and components.
- README includes CLI quickstart and flags.

### 3) Fresh Plugin

Goals: Drop‑in plugin for Fresh users.

Deliverables:

- [ ] Implement Fresh plugin entry (uncomment export in `deno.jsonc`).
- [ ] Provide route for `SpriteSheet` (server‑rendered sheet with caching).
- [ ] Optional dev‑time generation of components (behind config flag).
- [ ] Example app under `examples/fresh/` with Tailwind usage.
- [ ] README subsection for Fresh integration.

Acceptance criteria:

- Fresh example runs and serves `/iconset/icons` with provided config.
- Generated components importable via alias.

### 4) EaC Runtime Integration (Finalize)

Goals: Complete and document the existing EaC plugin.

Deliverables:

- [ ] Implement component library route (currently stubbed) to serve generated component TS modules.
- [ ] Validate `Generate` flow on startup and on config updates.
- [ ] Add caching controls and content headers.
- [ ] Example under `examples/eac/` showing processor wiring.
- [ ] Documentation for EaC usage (config structures and resolver semantics).

Acceptance criteria:

- Route(s) serve sheet and components; `Generate` produces files where expected.
- Example works under local EaC runtime.

### 5) Standalone Server (CE)

Goals: A simple `serve` mode for teams wanting to host without EaC/Fresh.

Deliverables:

- [ ] `server.ts` used by CLI `serve` command with `Deno.serve`.
- [ ] Endpoints: `GET <SpriteSheet>`, `GET /components/:name.tsx` (optional), health check.
- [ ] Watch mode to regenerate on config/icon changes.
- [ ] Static file serving for generated components directory.
- [ ] Dockerfile or publish instructions (Deno Deploy/CLI run).

Acceptance criteria:

- `atomic-icons serve --config ./fathym-atomic-icons.config.ts` serves a working sheet and components locally.

### 6) Cloud/SaaS (Multi‑Tenant)

Goals: Hosted service to manage icon sets at scale.

Architecture (iterative):

- Config store: Deno KV (starter) → pluggable adapter (KV, Redis, Postgres) later.
- Tenancy: subdomain or header namespace; per‑tenant icon set and outputs.
- Auth: PAT or OAuth (phase 2); rate limiting; request logging.
- APIs:
  - `PUT /v1/iconsets/:tenant` → upsert config (IconMap, Optimize, SpriteSheet, etc.).
  - `GET /v1/iconsets/:tenant/sprite.svg` → sprite sheet.
  - `GET /v1/iconsets/:tenant/components/:name.tsx` → component module.
- Publisher CLI:
  - `atomic-icons login`, `atomic-icons push --config <path> [--tenant <id>]`.

Deliverables:

- [ ] Minimal multi‑tenant server with KV store and simple token auth.
- [ ] CLI `push` to publish config and trigger generation on the service.
- [ ] Hosting story (Deno Deploy baseline) and environment docs.

Acceptance criteria:

- Multiple tenants can store and retrieve independent sheets/components.
- Smoke tests verifying tenant isolation and cache headers.

### 7) Examples & Docs

Deliverables:

- [ ] `examples/basic/` (plain Deno project using CLI).
- [ ] `examples/fresh/` (plugin usage with Tailwind).
- [ ] `examples/eac/` (EaC runtime usage).
- [ ] README sections: CLI, Fresh, EaC, Server, Cloud overview.
- [ ] Migration notes if any breaking changes.

Acceptance criteria:

- Copy‑paste runnable examples; pass `deno check`.

### 8) Community & Governance

Deliverables:

- [ ] CONTRIBUTING.md (dev setup, branching, commit conventions, running tests).
- [ ] CODE_OF_CONDUCT.md
- [ ] SECURITY.md (vuln reporting process)
- [ ] Issue/PR templates and labels (good‑first‑issue, help‑wanted).
- [ ] Roadmap badges/links in README.

Acceptance criteria:

- Healthy contributor docs; triage templates live.

## Backlog (Targeted Enhancements)

- [ ] Icon source adapters (Iconify name resolution: `iconify:mdi:check` → URL resolution).
- [ ] Sprite namespacing (prefixes) and grouping support.
- [ ] Theming strategies (e.g., size variants, default classes per group).
- [ ] Source maps or manifest file (icon → viewBox, URL, checksum).
- [ ] Performance: streaming build, incremental regeneration, and ETag support.
- [ ] Diagnostics: `atomic-icons doctor` to validate config and environment.
- [ ] Optional NPM build wrapper for Node ecosystems.

## Risks & Mitigations

- Network fragility fetching icons → caching, retries, and clear surfacing of failures.
- API churn → freeze core config shapes before Fresh/EaC/server work.
- Over‑scope in SaaS → phase with minimal MVP; defer auth/limits/persistence tuning.

## Milestone Sequencing (Suggested)

1. Library Hardening → 2. CLI → 3. Fresh Plugin → 4. EaC finalize → 5. Standalone Server → 6. SaaS → 7. Examples/Docs → 8. Community

The output of each step should leave the project in a shippable state, enabling early adopters to use the pieces they need while later stages are under development.

