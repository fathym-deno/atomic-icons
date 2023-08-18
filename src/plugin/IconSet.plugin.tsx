import { JSX } from "preact";
import { IconSetGenerateConfig } from "../iconsets/IconSetGenerateConfig.tsx";
import { IconSetConfig } from "../iconsets/IconSetConfig.tsx";
import { useIconSetComponents } from "../iconsets/component.utils.tsx";
import { Plugin } from "../src.deps.ts";
import { establishIconSetSheet } from "./routes/iconsets/icon-set.sheet.tsx";

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
