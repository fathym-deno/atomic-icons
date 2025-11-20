---
FrontmatterVersion: 1
DocumentType: Guide
Title: Atomic Icons Guide
Summary: Playbook for building, testing, and publishing the Fathym Atomic Icons micro-framework.
Created: 2025-11-20
Updated: 2025-11-20
Owners:
  - fathym
References:
  - Label: Project README
    Path: ./README.md
  - Label: Project AGENTS
    Path: ./AGENTS.md
  - Label: Micro-Frameworks GUIDE
    Path: ../GUIDE.md
  - Label: Workspace GUIDE
    Path: ../../WORKSPACE_GUIDE.md
---

# Atomic Icons Guide

## Workflow

1. Align scope in `README.md`: note intended change (icon sources/config, generation behavior, release prep) and affected consumers.
2. Develop icons/config changes; update examples/config files as needed.
3. Validate with `deno fmt`, `deno lint`, `deno check`, `deno task test`, and `deno task build`; run `deno task icons` or relevant scripts for generation.
4. Update `.env*` or config samples if required; keep secrets and licensed assets out of the repo.
5. Record provenance/version pins in `UPSTREAM.md` when publishing (JSR/npm); document breaking changes and migration notes for consumers.

## Verification

- Builds/tests/lint/format pass; generated outputs updated if behavior changes.
- Links remain relative; single-line paragraphs maintained.
- Consumer impacts (web runtimes, products, ref-arch) communicated when API or generation contracts change.
