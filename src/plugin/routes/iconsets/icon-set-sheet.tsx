import { JSX } from "preact";
import { IconSet } from "../../../iconsets/IconSet.tsx";
import { IconSetConfig } from "../../../iconsets/IconSetConfig.tsx";
import { Handlers, PageProps, render } from "../../../src.deps.ts";

export function establishIconSetSheetRoute(iconSet: IconSetConfig) {
  const handler: Handlers<JSX.Element, Record<string, unknown>> = {
    async GET(_req, ctx) {
      const map = new IconSet(iconSet);

      const spriteSheet = await map.ToSheet();

      const svg = render(spriteSheet);

      return new Response(svg, {
        headers: { "Content-Type": "image/svg+xml" },
      });
    },
  };

  return { handler, component: undefined };
}