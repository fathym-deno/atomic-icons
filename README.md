# Fathym Atomic Icons

Build, optimize, and consume SVG icon sprite sheets with ergonomic, typed icon components for Deno projects. Works standalone or alongside Fathym's Everything‑as‑Code (EaC) runtime.

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

> Note: You can also use the deno.land URL if preferred, but JSR is recommended for resolution and versioning.

## Naming Icons

Prefer semantic names decoupled from the upstream set. For example, map `material-symbols:check-circle` to `check-circle`. This keeps usage consistent across the app and makes future set swaps painless.

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
  Optimize: true, // run SVGO on the generated sheet
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  // When true, write typed <XxxIcon /> wrappers and add an import alias.
  Exports: true,
  // Optional: where generated files go (defaults to ./build/iconset)
  // OutputDirectory: "./build/iconset",
  IconSet: curIconSetConfig,
  // URL path where the sheet is available (static or served).
  SpriteSheet: '/iconset/icons',
};
```

2. Generate assets via a script and Deno task.

```ts
// ./scripts/icons.atomic.ts
import { useFileIconSet, useIconSetComponents } from '@fathym/atomic-icons';
import { curIconSetConfig, curIconSetGenerateConfig } from '../fathym-atomic-icons.config.ts';

// Generate a physical sheet. Adjust the path for your static files setup.
await useFileIconSet('./static/icons.sprite.svg', curIconSetConfig);

// Generate typed components + add a Deno import alias for easy consumption.
await useIconSetComponents(curIconSetGenerateConfig, '');
```

```jsonc
// deno.jsonc
{
  "tasks": {
    "icons": "deno run -A ./scripts/icons.atomic.ts"
  }
}
```

Run: `deno task icons`

Add `build/` to your `.gitignore`.

3. Use your icons.

```tsx
// Option A: Use the low-level <Icon /> with your sheet
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
// Option B: Use generated components (added under the alias below)
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

When `Exports` is true, `useIconSetComponents` writes an import alias to your `deno.json(c)`:

```jsonc
{
  "imports": {
    "$fathym/atomic-icons": "./build/iconset/icons/.exports.ts"
  }
}
```

## Serving the Sprite Sheet

- Static: Commit or copy the generated `./static/icons.sprite.svg` and reference it via `<Icon src="/icons.sprite.svg" ... />`.
- EaC runtime: This package also provides an EaC processor/handler that can serve the sheet dynamically at the `SpriteSheet` path. If you are using Fathym's runtime, wire up `EaCAtomicIconsProcessor` with your `IconSet` config and route pattern. (See the `src/plugin` folder for details.)

## Icon Sources

Any SVG can go into the sprite sheet. Good sources:

- Icônes: https://icones.js.org/
- Simple Icons: https://simpleicons.org/
- Flowbite Icons: https://flowbite.com/icons

## API Reference (quick)

- `IconSetConfig`: `{ IconMap: Record<string, string | URL>; Optimize?: boolean }`
- `useFileIconSet(outputPath, config)`: Renders and writes an SVG sheet, runs SVGO when `Optimize` is true.
- `IconSetGenerateConfig`: `{ IconSet, SpriteSheet, Exports?, Imports?, OutputDirectory?, Generate? }`
- `useIconSetComponents(config, root)`: Generates typed icon components and (optionally) adds an import alias to your Deno config. `root` should be the path prefix used when resolving `SpriteSheet` (often `""` for absolute paths).
- Browser exports: `@fathym/atomic-icons/browser` exposes `{ Icon, type IconProps, type JSX }`.

## Tips

- Keep names semantic and stable (`check-circle`, `x-circle`, etc.).
- Pin package versions in `deno.json(c)` for reproducible builds.
- If you change `SpriteSheet`, re-run the `icons` task so generated components point to the correct path.

## Acknowledgements

Thanks to the authors whose posts informed parts of this implementation:

- https://rodneylab.com/deno-fresh-svg-sprites/
- https://benadam.me/thoughts/react-svg-sprites/
