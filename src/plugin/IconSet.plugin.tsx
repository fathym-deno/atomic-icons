import { JSX } from "preact";
import {
  IconSetGenerateConfig,
  useIconSetComponents,
} from "../sprites/IconSet.tsx";
import { Plugin } from "../src.deps.ts";
import { establishIconSetSheet } from "./routes/sprites/icon-set.sheet.tsx";

export async function iconSetPlugin(
  config: IconSetGenerateConfig,
): Promise<Plugin> {
  await useIconSetComponents(config);

  const iconSetSheet = establishIconSetSheet(config.IconSet!);

  return {
    name: "fathym_atomic_icons",
    routes: [
      {
        path: `/${config.SpriteSheet}`,
        ...iconSetSheet,
      },
    ],
  };
}
