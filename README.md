# Fathym Atomic Icons

Fathym's Atomic Icons is a library that supports the optimized creation of
customzied icon sets for delivery via Deno Fresh.

## Getting Started

To get started, you can add an import map to your deno configuration.

```ts
"imports": {
  ...
  "$atomic/icons": "https://deno.land/x/fathym_atomic_icons/mod.ts",
  ...
},
```

### Naming Icons in an Icon Set

It can be tempting to want to leverage the ids of the icons you pull in from a
library. However, we recommend that you rename them to fit a more generic usage.
For example, instead of using the Icones id `material-symbols-check-circle`, we
like to use something like `close`. This makes it simple from an atomic usage
perspective, as anywhere a close icon is needed, we use this icon.

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
import { Icon } from "$atomic/icons";

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
library. To start, let's create a new `icons.atomic.ts` file in the scripts
directory.

```ts ./scripts/icons.atomic.ts
import { useFileSheet } from '$atomic/icons';

const SVGMap: Record<string, string | URL> = {
  'x-circle': 'https://api.iconify.design/bi:x-circle.svg',
  'check-circle':
    'https://api.iconify.design/material-symbols:check-circle.svg',
  exclaim: 'https://api.iconify.design/bi:exclamation-circle.svg',
};

const spriteConfig: IconSetConfig = { SVGMap };

await useFileSheet('./static/icons.sprite.svg', spriteConfig);
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

This will generate an SVG at the file path given in `useFileSheet`. Now we can
use the icons just as before:

```JSX
import { Icon } from "$atomic/icons";

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

To achieve this, we will again need to invoke some helpers. Let's head back into
the `./scripts/icons.atomic.ts` file and we can configure the generation of our
icons. We can go ahead and add the generation call here:

```ts ./scripts/icons.atomic.ts
import { useFileSheet, useSheetComponents } from '$atomic/icons';

const SVGMap: Record<string, string | URL> = {
  'x-circle': 'https://api.iconify.design/bi:x-circle.svg',
  'check-circle':
    'https://api.iconify.design/material-symbols:check-circle.svg',
  exclaim: 'https://api.iconify.design/bi:exclamation-circle.svg',
};

const spriteConfig: IconSetConfig = { SVGMap };

await useFileSheet('./static/icons.sprite.svg', spriteConfig);

await useSheetComponents('./static/icons.sprite.svg', { 
  Sprites: spriteConfig,
  SpriteSheet: './icons.sprite.svg',
});
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

### Automatic Configuration with Fresh

Fathym Atomic Icons is also delivered as a plugin, built on top of the utilities
that can be used to integrate in other custom fashion. The first thing that we
will need to do is setup our `fathym-atomic-icons.config.ts` file.

```ts ./fathym-atomic-icons.config.ts
import { IconSetConfig, IconSetGenerateConfig } from '$atomic/icons';

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    'x-circle': 'https://api.iconify.design/bi:x-circle.svg',
    'check-circle': 'https://api.iconify.design/material-symbols:check-circle.svg',
  },
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  IconSet: curIconSetConfig,
  SpriteSheet: './iconset/icons',
};
```

Now we need to register our plugin in the `main.ts` file:

```ts ./main.ts
import { curIconSetGenerateConfig } from './fathym-atomic-icons.config.ts';

await start(manifest, {
  plugins: [await iconSetPlugin(curIconSetGenerateConfig)],
});
```

Two things will happen when this plugin is configured:

1. Anytime that the icon set configurations are updated, new explicit icon
   components will be generated.
2. A new route will be configured that will render the most up to date sprite
   sheet for the icon set.

That's it, you can now use your icons just like before, taking note that the
sprite sheet is available on the path specified in config (`/iconset/icons`)

## Icon Sources

Any SVG can be shifted into a sprite sheet, the following provide a nice place
to find the icons you want to use in your organizations customized icon set.

### Icônes(https://icones.js.org/collection/all)

#### Manual Addition

#### Configured Addition

### Simple Icons (https://simpleicons.org/)

## Thank You's

Thank you out to the following people for their work on some of the concepts
developed into this project.

https://rodneylab.com/deno-fresh-svg-sprites/

https://benadam.me/thoughts/react-svg-sprites/
