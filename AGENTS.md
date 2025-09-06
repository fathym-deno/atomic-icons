# AGENTS

This document guides contributors and automation agents working on this repository. Keep changes focused, minimal, and aligned with the existing style.

## Project Overview

Atomic Icons provides utilities to:

- Build SVG sprite sheets from a map of icon URLs (`IconSet`, `useFileIconSet`).
- Generate typed Preact icon components that wrap `<Icon />` (`useIconSetComponents`).
- Optionally serve the sprite sheet via Fathym's Everything‑as‑Code (EaC) runtime.

Primary entry points:

- `mod.ts`: Library exports.
- `browser.ts`: Browser‑safe exports (`Icon`, `JSX`).
- `plugin.ts`: EaC runtime plugin exports.

Key source folders:

- `src/iconsets`: Core iconset types and generation utilities.
- `src/eac`: EaC processor type guards.
- `src/plugin`: IoC bindings and request handlers.
- `tests`: Test scaffolding and utilities.

## Local Development

Requirements:

- Deno (stable). The CI uses `denoland/setup-deno` with `vx.x.x`.

Helpful commands (see `deno.jsonc`):

- Format: `deno fmt`
- Lint: `deno lint`
- Type check: `deno check **/*.ts && deno check **/*.tsx`
- Tests: `deno task test`
- Full build: `deno task build`

If you are iterating on docs/examples only, at minimum run `deno fmt`.

## Conventions

- TypeScript and Preact: follow existing patterns and import sources from `src/src.deps.ts` or `src/deno.deps.ts` where appropriate.
- Avoid one‑letter identifiers. Prefer descriptive names and small, focused functions.
- Preserve public APIs. If you must change them, coordinate and update README/examples accordingly.
- Keep patches scoped. Do not fix unrelated issues in the same change.
- Do not add license headers to files.
- Keep exports centralized via the existing `.exports.ts` barrels.

## Docs & Examples

- README code should compile. Prefer `ts`, `tsx`, and `jsonc` fences.
- Favor JSR imports in examples: `jsr:@fathym/atomic-icons@x.y.z`.
- When showing generated component usage, reference the `$fathym/atomic-icons` alias (created by `useIconSetComponents` when `Exports` is true).

## Testing

- Add or extend targeted tests when changing logic in `src/iconsets` or request handlers.
- Keep tests fast and isolated. Use existing utilities in `tests/tests.deps.ts` where possible.
- Run `deno task test` locally.

## Release & Versioning

- CI handles publishing to JSR and tags via GitHub Actions.
- Semantic bumping is driven by commit content and optional markers:
  - Use `(MAJOR)` in the commit subject to force a major version bump.
  - Use `(MINOR)` to force a minor bump.
  - Otherwise, commits are treated as patch updates.
- Do not create tags manually; the workflow tags and publishes after a successful build.

## Common Tasks

1) Update README
- Keep instructions current with the exports in `mod.ts`, `browser.ts`, and generator behaviors.
- Fix typos and ensure links are valid.

2) Add an icon example
- Update `fathym-atomic-icons.config.ts` in examples.
- Show how to run `deno task icons`.

3) Extend generation behavior
- Keep options on `IconSetConfig` / `IconSetGenerateConfig` minimal and orthogonal.
- Update `src/iconsets/component.utils.tsx` and add tests.

## PR Checklist

- Reason for change is clear and scoped.
- Code compiles: `deno task build`.
- Tests pass: `deno task test`.
- Lint/format clean: `deno fmt && deno lint`.
- README/docs updated if behavior or API changed.

## Notes for Automation Agents

- Prefer surgical diffs. Avoid mass refactors.
- Do not introduce new tooling (formatters, linters) beyond what's configured.
- When in doubt about public API changes, propose in PR description before implementing broadly.

