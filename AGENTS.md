---
FrontmatterVersion: 1
DocumentType: Guide
Title: Atomic Icons Agents Guide
Summary: Guardrails for collaborating on the Fathym Atomic Icons micro-framework.
Created: 2025-11-20
Updated: 2025-11-20
Owners:
  - fathym
References:
  - Label: Project README
    Path: ./README.md
  - Label: Project GUIDE
    Path: ./GUIDE.md
  - Label: Micro-Frameworks README
    Path: ../README.md
  - Label: Micro-Frameworks AGENTS
    Path: ../AGENTS.md
  - Label: Micro-Frameworks GUIDE
    Path: ../GUIDE.md
  - Label: Workspace AGENTS
    Path: ../../AGENTS.md
---

# AGENTS: Atomic Icons

Guardrails for humans and AI collaborating on Atomic Icons.

## Core Guardrails

1. **Stay scoped.** Keep work under `projects/micro-frameworks/atomic-icons/`; link cross-pod dependencies (EaC runtimes, reference architecture) when relevant.
2. **Frontmatter required.** All docs include frontmatter and relative references back to parent guides.
3. **API stability.** Preserve icon generation/config APIs and component surfaces; document breaking changes and add migration notes.
4. **Provenance.** Capture upstream sources and version pins in `UPSTREAM.md` when publishing (JSR/npm); prefer upstream-first fixes before diverging.
5. **Security & licensing.** Do not embed licensed assets without proper handling; avoid secrets; document external icon sources and licenses when applicable.

## Communication

- Declare intent before editing; summarize outcomes and next steps in the project README or a short log.
- Notify consumers (web runtimes, products, reference-architecture) when icon APIs or generation behaviors change.
