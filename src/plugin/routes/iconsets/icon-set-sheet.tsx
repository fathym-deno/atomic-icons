import { EaCRuntimeHandler } from "../../../deno.deps.ts";
import { preactRenderToString } from "../../../src.deps.ts";
import { IconSet } from "../../../iconsets/IconSet.tsx";
import { IconSetConfig } from "../../../iconsets/IconSetConfig.ts";

export async function establishIconSetSheetRoute(iconSet: IconSetConfig) {
  const map = new IconSet(iconSet);

  const spriteSheet = await map.ToSheet();

  const svg = preactRenderToString(spriteSheet);

  const handler: EaCRuntimeHandler<Record<string, unknown>> = (_req, _ctx) => {
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache", //"public, max-age=604800",
      },
    });
  };

  return handler;
}
