import { JSX } from "preact";
import {
  SpriteMap,
  SpriteMapGenerateConfig,
  useSheet,
  useSheetComponents,
} from "../sprites/SpriteMap.tsx";
import { MiddlewareHandlerContext, PageProps, Plugin } from "../src.deps.ts";
import { spriteMapMiddleware } from "./routes/_middleware.tsx";
import { establishIconSetSheet } from "./routes/sprites/icon-set.sheet.tsx";

export async function spriteMapPlugin(
  config: SpriteMapGenerateConfig,
): Promise<Plugin> {
  await useSheetComponents(config);

  const IconSetSheet = establishIconSetSheet(config.Sprites!);

  return {
    name: "fathym_atomic_icons",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: spriteMapMiddleware(),
        },
      },
    ],
    routes: [
      {
        path: `/${config.SpriteSheet}`,
        ...IconSetSheet,
      },
    ],
  };
}
