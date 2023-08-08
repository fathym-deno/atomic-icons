import { JSX } from "preact";
import {
  SpriteMap,
  SpriteMapGenerateConfig,
  useSheet,
  useSheetComponents,
} from "../sprites/SpriteMap.tsx";
import { PageProps, Plugin } from "../src.deps.ts";

export function spriteMapPlugin(
  config: SpriteMapGenerateConfig,
): Plugin {
  //   await useSheetComponents(config);

  return {
    name: "fathym_atomic_icons",
    routes: [
      {
        path: config.SpriteSheet,
        handler: {
          async GET(_, ctx) {
            const map = new SpriteMap(config.Sprites!);

            const spriteSheet = await map.ToSheet();

            console.log(spriteSheet);

            return ctx.render(spriteSheet);
          },
        },
        component: (props: PageProps<JSX.Element | null>) => {
          console.log("================================");

          return props.data!;
        },
      },
    ],
    // async renderAsync(ctx) {
    //   const res = await ctx.renderAsync();

    //   console.log(res.htmlText);

    //   return {};
    // },
  };
}
