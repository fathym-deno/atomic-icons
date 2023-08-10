import { JSX } from "preact";
import { IconSetGenerateConfig } from "../sprites/IconSetGenerateConfig.tsx";
import { IconSetConfig } from "../sprites/IconSetConfig.tsx";
import { useIconSetComponents } from "../sprites/useIconSetComponents.tsx";
import { Plugin } from "../src.deps.ts";
import { establishIconSetSheet } from "./routes/sprites/icon-set.sheet.tsx";

export async function iconSetPlugin(
  config: IconSetGenerateConfig | IconSetConfig,
): Promise<Plugin> {
  let genCfg: IconSetGenerateConfig;

  if ((config as IconSetConfig).IconMap !== undefined) {
    genCfg = {
      IconSet: config,
    } as IconSetGenerateConfig;
  } else {
    genCfg = config as IconSetGenerateConfig;

    await useIconSetComponents(genCfg);
  }

  const iconSetSheet = establishIconSetSheet(genCfg.IconSet!);

  return {
    name: "fathym_atomic_icons",
    routes: [
      {
        path: `/${genCfg.SpriteSheet}`,
        ...iconSetSheet,
      },
    ],
  };
}
