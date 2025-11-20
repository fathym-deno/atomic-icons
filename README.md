---
FrontmatterVersion: 1
DocumentType: Guide
Title: Fathym Atomic Icons
Summary: Build, optimize, and consume SVG icon sprite sheets with typed Preact icon components for Deno projects.
Created: 2025-11-20
Updated: 2025-11-20
Owners:
  - fathym
References:
  - Label: Micro-Frameworks README
    Path: ../README.md
  - Label: Micro-Frameworks AGENTS
    Path: ../AGENTS.md
  - Label: Micro-Frameworks GUIDE
    Path: ../GUIDE.md
  - Label: Workspace README
    Path: ../../README.md
  - Label: Workspace AGENTS
    Path: ../../AGENTS.md
  - Label: Workspace GUIDE
    Path: ../../WORKSPACE_GUIDE.md
  - Label: Project AGENTS Guide
    Path: ./AGENTS.md
  - Label: Project GUIDE
    Path: ./GUIDE.md
---

# Fathym Atomic Icons

Build, optimize, and consume SVG icon sprite sheets with ergonomic, typed icon components for Deno projects. Works standalone or alongside Fathym's Everything-as-Code (EaC) runtime.

## Install

Add imports to your `deno.json` or `deno.jsonc` using JSR. Pin a version for stability.

```ts
{
  "imports": {
    "@fathym/atomic-icons": "jsr:@fathym/atomic-icons@^0.0.0",
    "@fathym/atomic-icons/browser": "jsr:@fathym/atomic-icons/browser@^0.0.0"
  }
}
```

## Naming Icons

Prefer semantic names decoupled from the upstream set (e.g., map `material-symbols:check-circle` to `check-circle`) to keep usage consistent and swaps painless.

## Quick Start

1. Create a config describing your icon set and generation options.

```ts
// ./fathym-atomic-icons.config.ts
import { IconSetConfig, IconSetGenerateConfig } from '@fathym/atomic-icons';

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    'x-circle': 'https://api.iconify.design/bi:x-circle.svg',
    'check-circle': 'https://api.iconify.design/material-symbols:check-circle.svg',
    'exclaim': 'https://api.iconify.design/bi:exclamation-circle.svg',
  },
  Optimize: true,
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  Exports: true,
  IconSet: curIconSetConfig,
  SpriteSheet: '/iconset/icons',
};
```

2. Generate assets via a script and Deno task.

```ts
// ./scripts/icons.atomic.ts
import { useFileIconSet, useIconSetComponents } from '@fathym/atomic-icons';
import { curIconSetConfig, curIconSetGenerateConfig } from '../fathym-atomic-icons.config.ts';

await useFileIconSet('./static/icons.sprite.svg', curIconSetConfig);
await useIconSetComponents(curIconSetGenerateConfig, '');
```

```jsonc
{
  "tasks": {
    "icons": "deno run -A ./scripts/icons.atomic.ts"
  }
}
```

Run: `deno task icons`. Add `build/` to `.gitignore`.

3. Use your icons.

```tsx
import { Icon } from '@fathym/atomic-icons/browser';

export default function Page() {
  return (
    <>
      <Icon src='/iconset/icons' icon='x-circle' />
      <Icon src='/iconset/icons' icon='check-circle' class='text-blue-500 w-[50px] h-[50px]' />
    </>
  );
}
```

```tsx
import { CheckCircleIcon, ExclaimIcon, XCircleIcon } from '$fathym/atomic-icons';

export default function Page() {
  return (
    <>
      <XCircleIcon />
      <CheckCircleIcon class='text-purple-500 w-[50px] h-[50px]' />
      <ExclaimIcon class='text-purple-500 w-[24px] h-[24px]' />
    </>
  );
}
```

When `Exports` is true, `useIconSetComponents` writes an import alias:

```jsonc
{
  "imports": {
    "$fathym/atomic-icons": "./build/iconset/icons/.exports.ts"
  }
}
```

## Serving the Sprite Sheet

Place the generated sheet where your server can serve it (e.g., `/static/icons.sprite.svg`) and point `SpriteSheet` to that path. Generated components expect the sheet URL you provide.

## Development Tasks

- Format/lint/check: `deno fmt`, `deno lint`, `deno check`.
- Tests: `deno task test`.
- Build: `deno task build` (fmt + lint + publish check + tests).
- Tailwind config generation: `deno task build:tailwind`.
- Publish flows: `deno task publish:check`, `deno task npm:build/publish`.

## Notes

- Keep semantic icon naming and document any licensed/external sets you map.
- Maintain examples in this README aligned with current exports in `mod.ts`, `browser.ts`, and generator behavior.
