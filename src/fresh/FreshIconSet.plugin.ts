import { IconSetGenerateConfig } from "../iconsets/IconSetGenerateConfig.tsx";
import { IconSetConfig } from "../iconsets/IconSetConfig.tsx";
import { useIconSetComponents } from "../iconsets/component.utils.tsx";
import { Plugin } from "../src.deps.ts";
import { establishIconSetSheetRoute } from "./routes/iconsets/icon-set-sheet.tsx";
import { establishIconSetComponentLibraryRoute } from "./routes/iconsets/icon-set-components.tsx";

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

  const iconSetComponentLibraryRoute = establishIconSetComponentLibraryRoute(
    genCfg,
  );

  return {
    name: "fathym_atomic_icons",
    routes: [
      {
        path: `/${genCfg.SpriteSheet || "iconset/icons"}`,
        ...iconSetSheetRoute,
      },
      {
        path: `/${genCfg.ComponentLibrary || "./iconset/library"}/[...path]`,
        ...iconSetComponentLibraryRoute,
      },
    ],
  };
}
