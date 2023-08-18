import { JSX } from "preact";
import { IconSetGenerateConfig } from "../iconsets/IconSetGenerateConfig.tsx";
import { IconSetConfig } from "../iconsets/IconSetConfig.tsx";
import { useIconSetComponents } from "../iconsets/component.utils.tsx";
import { Plugin } from "../src.deps.ts";
import { establishIconSetSheetRoute } from "./routes/iconsets/icon-set-sheet.tsx";

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

  const iconSetSheetRoute = establishIconSetSheetRoute(genCfg.IconSet!);

  return {
    name: "fathym_atomic_icons_sprite_sheet",
    routes: [
      {
        path: `/${genCfg.SpriteSheet}`,
        ...iconSetSheetRoute,
      },
    ],
  };
}
