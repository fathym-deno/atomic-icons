import { Handlers, JSX } from "../../.deps.ts";
import { IconSet } from "../../../iconsets/IconSet.tsx";
import { IconSetConfig } from "../../../iconsets/IconSetConfig.ts";
import { preactRenderToString } from "../../.deps.ts";

export function establishIconSetSheetRoute(iconSet: IconSetConfig) {
  const handler: Handlers<JSX.Element, Record<string, unknown>> = {
    async GET(_req, _ctx) {
      const map = new IconSet(iconSet);

      const spriteSheet = await map.ToSheet();

      const svg = preactRenderToString(spriteSheet);

      return new Response(svg, {
        headers: { "Content-Type": "image/svg+xml" },
      });
    },
  };

  return { handler, component: undefined };
}
