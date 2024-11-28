import { Plugin } from "./.deps.ts";
import { IconSetGenerateConfig } from "../iconsets/IconSetGenerateConfig.ts";
import { IconSetConfig } from "../iconsets/IconSetConfig.ts";
import { useIconSetComponents } from "../iconsets/component.utils.tsx";
import { establishIconSetSheetRoute } from "./routes/iconsets/fresh-icon-set-sheet.ts";
// import { establishIconSetComponentLibraryRoute } from "./routes/iconsets/fresh-icon-set-components.ts";

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

    await useIconSetComponents(genCfg, "/iconset/library");
  }

  const iconSetSheetRoute = establishIconSetSheetRoute(genCfg.IconSet!);

  // const iconSetComponentLibraryRoute =
  //   establishIconSetComponentLibraryRoute(genCfg);

  return {
    name: "fathym_atomic_icons",
    routes: [
      {
        path: `/${genCfg.SpriteSheet || "iconset/icons"}`,
        ...iconSetSheetRoute,
      },
      // {
      //   path: `/${genCfg.ComponentLibrary || './iconset/library'}/[...path]`,
      //   ...iconSetComponentLibraryRoute,
      // },
    ],
  };
}
