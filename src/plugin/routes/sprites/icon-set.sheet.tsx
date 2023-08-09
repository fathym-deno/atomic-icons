import { JSX } from "preact";
import { IconSet, IconSetConfig } from "../../../sprites/IconSet.tsx";
import { Handlers, PageProps, render } from "../../../src.deps.ts";

export function establishIconSetSheet(iconSet: IconSetConfig) {
  const handler: Handlers<JSX.Element, Record<string, unknown>> = {
    async GET(_req, ctx) {
      const map = new IconSet(iconSet);

      const spriteSheet = await map.ToSheet();

      const svg = render(spriteSheet);

      console.log(svg);

      // return ctx.render(spriteSheet);
      return new Response(svg, {
        headers: { "Content-Type": "image/svg+xml" },
      });
    },
  };

  return { handler, component: undefined };
}
