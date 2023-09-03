# Fathym Atomic Icons

Fathym's Atomic Icons is a library that supports the optimized creation of
customzied icon sets for delivery via Deno Fresh.

## Getting Started

To get started, you can add an import map to your deno configuration.

```ts
"imports": {
  ...
  "@fathym/atomic-icons": "https://deno.land/x/fathym_atomic_icons/mod.ts",
  ...
},
```

> **NOTE:** It is best to use a specific version of the fathym_atomic_icons
> library in the import map.

### Naming Icons in an Icon Set

It can be tempting to want to leverage the ids of the icons you pull in from a
library. However, we recommend that you rename them to fit a more generic usage.
For example, instead of using the Icones id `material-symbols-check-circle`, we
like to use something like `close`. This makes it simple from an atomic usage
perspective, as anywhere a close icon is needed, we use this icon.

### Automatic Configuration with Fresh

This initial configuration with Fresh can be completed by changing only the
following files:

- `./deno.json`
- `./fathym-atomic-icons.config.ts`
- `./fresh.config.ts`

Fathym Atomic Icons can be delivered as a plugin for
[Deno](https://fresh.deno.dev) Fresh, built on top of the utilities we will
detail out further down this doc.

To get running, the first thing that we will need to do is setup our
`fathym-atomic-icons.config.ts` file.

```ts ./fathym-atomic-icons.config.ts
import { IconSetConfig, IconSetGenerateConfig } from '@fathym/atomic-icons';

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    'x-circle': 'https://api.iconify.design/bi:x-circle.svg',
    'check-circle': 'https://api.iconify.design/material-symbols:check-circle.svg',
    exclaim: 'https://api.iconify.design/bi:exclamation-circle.svg',
  },
  Optimize: true
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  Exports: true,
  IconSet: curIconSetConfig,
  SpriteSheet: './iconset/icons',
};
```

Notice the use of the `Optimize: true` configuration, this will ensure that SVGO
is used to optimize the sprite sheet that is created. To disable sprite sheet
optimization, set the value to `false`.

Now we need to register our plugin in the `fresh.config.ts` file, adding the
`iconSetPlugin` to any existing config:

```ts ./fresh.config.ts
...
import { curIconSetGenerateConfig } from "./fathym-atomic-icons.config.ts";
import { iconSetPlugin } from "@fathym/atomic-icons";
...

export default defineConfig({
  plugins: [
    ...
    await iconSetPlugin(curIconSetGenerateConfig),
    ...
  ],
});
```

Two things will happen when this plugin is configured:

1. Anytime that the icon set configurations are updated, new explicit icon
   components will be generated.
2. A new route will be configured that will render the most up to date sprite
   sheet for the icon set.

Alternatively you can supply only the `curIconSetConfig` to disable the
automatic component generation, keeping only the sprite generation.

```ts ./fresh.config.ts
...
import { curIconSetConfig } from './fathym-atomic-icons.config.ts';
import { iconSetPlugin } from "@fathym/atomic-icons";
...

export default defineConfig({
  plugins: [
    ...
    await iconSetPlugin(curIconSetConfig),
    ...
  ],
});
```

That's it, you can now use your Icons in a number of various ways, taking note
that the sprite sheet is available on the path specified in config
`/iconset/icons`.

```jsx
import {
  CheckCircleIcon,
  ExclaimIcon,
  Icon,
  XCircleIcon,
} from "$fathym/atomic-icons";

export default function Page() {
  const iconSheet = `./iconset/icons`;

  const icons = ["check-circle", "exclaim"];

  return (
    <>
      <Icon src="./iconset/icons" icon="x-circle" />

      {icons.map((icon) => (
        <Icon
          src={iconSheet}
          icon={icon}
          class="text-blue-500 w-[50px] h-[50px]"
        />
      ))}

      <XCircleIcon />

      <CheckCircleIcon class="text-purple-500 w-[50px] h-[50px]" />

      <ExclaimIcon class="text-purple-500 w-[24px] h-[24px]" />
    </>
  );
}
```

## Icon Sources

Any SVG can be shifted into a sprite sheet, the following sites provide a nice
place to find the icons you want to use in your organizations customized icon
set.

### Icônes(https://icones.js.org/collection/all)

### Simple Icons (https://simpleicons.org/)

### Simple Icons (https://flowbite.com/icons)

## Custom Workflows

Following we will look at the individual parts that make up the whole, allowing
you to customize your workflow.

### Manual Sprite Setup

If you have an existing SVG sprite sheet, you can use it by placing it in the
static folder of your Deno Fresh project. If you want to start creating your own
icon set sprite sheet, you can start from this one:

```SVG ./static/icons.sprite.svg
<svg
   xmlns="http://www.w3.org/2000/svg"
   xmlns:xlink="http://www.w3.org/1999/xlink"
 >
    <defs>
        <symbol viewBox="0 0 16 16" id="x-circle"><g fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708z"></path></g></symbol>
        
        <symbol viewBox="0 0 24 24" id="check-circle"><path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"></path></symbol>
    </defs>
 </svg>
```

With our sprite sheet in hand and references added, we can now use the basic
`<Icon />` control. You'll need to import the Icon and then use it in your JSX

```JSX
import { Icon } from "@fathym/atomic-icons";

export default function Page() {
  return (
    <>
      <Icon src="./icons.sprite.svg" icon="x-circle" />

      <Icon src="./icons.sprite.svg" icon="check-circle" />
    </>
  );
}
```

You can also leverage tailwind styles to start controlling the icons look and
feel:

```JSX
<Icon
  src="./icons.sprite.svg"
  icon="x-circle"
  class="text-red-500 w-[50px] h-[50px]"
/>;
```

### Sprite Sheet Configuration

Manually copying SVG and Symbol content into our sprite sheet is not really the
way we want to manage change. Instead, we can leverage some tooling from this
library. To start, let's make sure we have a `fathym-atomic-icons.config.ts`
file at the root of our project. Then, in the scripts directory,

```ts ./scripts/icons.atomic.ts
import { curIconSetConfig } from '../fathym-atomic-icons.config.ts';
import { useFileIconSet } from '@fathym/atomic-icons';

await useFileIconSet('./static/icons.sprite.svg', curIconSetConfig);
```

Then let's add a new task to our `deno.json` file:

```Typescript
"tasks": {
  ...
  "icons": "deno run -A ./scripts/icons.atomic.ts",
  ...
},
```

And now we can easily generate our sprite sheet after updating the SVG maps:

```cli
deno task icons
```

This will generate an SVG at the file path given in `useFileIconSet`. Now we can
use the icons just as before:

```JSX
import { Icon } from "@fathym/atomic-icons";

export default function Page() {
  return (
    <>
      <Icon src="./icons.sprite.svg" icon="x-circle" />

      <Icon src="./icons.sprite.svg" icon="check-circle" />

      <Icon src="./icons.sprite.svg" icon="exclaim" />
    </>
  );
}
```

### Component Generation

Its nice to have a simple way to access our icon set from the sprite sheet, but
again we may want to extend this further to provide specific components for use
with each icon. In this way, we can use type safe components like:

```jsx
import {
  CheckCircleIcon,
  ExclaimIcon,
  XCircleIcon,
} from "$fathym/atomic-icons";

export default function Page() {
  return (
    <>
      <XCircleIcon />

      <CheckCircleIcon />

      <ExclaimIcon />
    </>
  );
}
```

To achieve this, we will again need to invoke some tooling. Let's head back into
the `./scripts/icons.atomic.ts` file and we can configure the generation of our
icons. We can go ahead and add the generation call here:

```ts ./scripts/icons.atomic.ts
import { curIconSetGenerateConfig } from '../fathym-atomic-icons.config.ts';
import { useFileIconSet, useIconSetComponents } from '@fathym/atomic-icons';

await useFileIconSet('./static/icons.sprite.svg', curIconSetGenerateConfig.IconSet);

await useIconSetComponents(curIconSetGenerateConfig);
```

And again we can run our task to not only generate the sprite sheet, but also
the icon components:

```cli
deno task icons
```

Make sure you add `build/` to your `.gitignore` file. Then, as mentioned above,
you can now use your custom icon components with ease:

```jsx
import {
  CheckCircleIcon,
  ExclaimIcon,
  XCircleIcon,
} from "$fathym/atomic-icons";

export default function Page() {
  return (
    <>
      <XCircleIcon class="text-purple-500 w-[50px] h-[50px]" />

      <CheckCircleIcon class="text-purple-500 w-[50px] h-[50px]" />

      <ExclaimIcon class="text-purple-500 w-[50px] h-[50px]" />
    </>
  );
}
```

## Thank You's

Thank you out to the following people for their work on some of the concepts
developed into this project.

https://rodneylab.com/deno-fresh-svg-sprites/

https://benadam.me/thoughts/react-svg-sprites/
