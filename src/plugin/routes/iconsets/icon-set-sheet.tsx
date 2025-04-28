import { EaCRuntimeHandler } from "../../../deno.deps.ts";
import { preactRenderToString } from "../../../src.deps.ts";
import { IconSet } from "../../../iconsets/IconSet.tsx";
import { IconSetConfig } from "../../../iconsets/IconSetConfig.ts";

export async function establishIconSetSheetRoute(iconSet: IconSetConfig) {
  const map = new IconSet(iconSet);

  const spriteSheet = await map.ToSheet();

  let svg = preactRenderToString(spriteSheet);

  const handler: EaCRuntimeHandler<Record<string, unknown>> = (_req, _ctx) => {
    setTimeout(() => {
      svg = preactRenderToString(spriteSheet);
    }, 0);

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  };

  return handler;
}
