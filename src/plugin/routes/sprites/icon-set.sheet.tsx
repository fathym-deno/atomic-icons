import { JSX } from "preact";
import { SpriteMap, SpriteMapConfig } from "../../../sprites/SpriteMap.tsx";
import { Handlers, PageProps, render } from "../../../src.deps.ts";

export function establishIconSetSheet(sprites: SpriteMapConfig) {
  const handler: Handlers<JSX.Element, Record<string, unknown>> = {
    async GET(_req, ctx) {
      const map = new SpriteMap(sprites);

      const spriteSheet = await map.ToSheet();

      const svg = render(spriteSheet);

      console.log(svg);

      // return ctx.render(spriteSheet);
      return new Response(svg);
    },
  };

  return { handler, component: undefined };
}
