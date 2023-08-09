import { JSX } from "preact";
import { SpriteMap, SpriteMapConfig } from "../../../sprites/SpriteMap.tsx";
import { Handlers, PageProps } from "../../../src.deps.ts";

export function establishIconSetSheet(sprites: SpriteMapConfig) {
  const handler: Handlers<JSX.Element, Record<string, unknown>> = {
    async GET(_req, ctx) {
      const map = new SpriteMap(sprites);

      const spriteSheet = await map.ToSheet();

      console.log("<><><><><><><><><><><><><><><><><><><><><>");

      return ctx.render(spriteSheet);
    },
  };

  function component(props: PageProps<JSX.Element>) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    return props.data;
  }

  return { handler, component };
}
