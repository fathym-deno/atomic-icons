import { JSX } from "preact";
import { IconSetGenerateConfig } from "../sprites/IconSet.tsx";
import { Plugin } from "../src.deps.ts";
import { IconSetMiddleware } from "./routes/_middleware.tsx";
import { establishIconSetSheet } from "./routes/sprites/icon-set.sheet.tsx";

export function iconSetPlugin(
  config: IconSetGenerateConfig,
): Plugin {
  // await useSheetComponents(config);

  const IconSetSheet = establishIconSetSheet(config.Sprites!);

  return {
    name: "fathym_atomic_icons",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: IconSetMiddleware(),
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
