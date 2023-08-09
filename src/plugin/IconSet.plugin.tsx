import { JSX } from "preact";
import {
  IconSetGenerateConfig,
  useIconSetComponents,
} from "../sprites/IconSet.tsx";
import { Plugin } from "../src.deps.ts";
import { IconSetMiddleware } from "./routes/_middleware.tsx";
import { establishIconSetSheet } from "./routes/sprites/icon-set.sheet.tsx";

export function iconSetPlugin(
  config: IconSetGenerateConfig,
): Plugin {
  // await useIconSetComponents(config);

  const iconSetSheet = establishIconSetSheet(config.Sprites!);

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
        ...iconSetSheet,
      },
    ],
  };
}
