import { JSX } from "preact";
import {
  SpriteMap,
  SpriteMapGenerateConfig,
  useSheet,
  useSheetComponents,
} from "../sprites/SpriteMap.tsx";
import { PageProps, Plugin } from "../src.deps.ts";

export async function spriteMapPlugin(
  config: SpriteMapGenerateConfig,
): Promise<Plugin> {
  await useSheetComponents(config);

  return {
    name: "fathym_atomic_icons",
    routes: [
      {
        path: config.SpriteSheet,
        handler: {
          async GET(_, ctx) {
            const map = new SpriteMap(config.Sprites!);

            const spriteSheet = await map.ToSheet();

            return ctx.render(spriteSheet);
          },
        },
        component: (props: PageProps<JSX.Element | null>) => {
          return props.data!;
        },
      },
    ],
    async renderAsync(ctx) {
      const res = await ctx.renderAsync();

      console.log(res.htmlText);

      return {};
    },
  };
}