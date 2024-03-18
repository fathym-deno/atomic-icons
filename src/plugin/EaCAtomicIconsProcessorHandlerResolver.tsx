import { path, ProcessorHandlerResolver } from "../src.deps.ts";
import {
  EaCAtomicIconsProcessor,
  isEaCAtomicIconsProcessor,
} from "../eac/EaCAtomicIconsProcessor.ts";
import { IconSetGenerateConfig } from "../iconsets/IconSetGenerateConfig.tsx";
import { IconSetConfig } from "../iconsets/IconSetConfig.tsx";
import { useIconSetComponents } from "../iconsets/component.utils.tsx";
// import { establishIconSetComponentLibraryRoute } from './routes/iconsets/icon-set-components.tsx';
import { establishIconSetSheetRoute } from "./routes/iconsets/icon-set-sheet.tsx";

export const EaCAtomicIconsProcessorHandlerResolver: ProcessorHandlerResolver =
  {
    async Resolve(ioc, appProcCfg, eac) {
      if (!isEaCAtomicIconsProcessor(appProcCfg.Application.Processor)) {
        throw new Deno.errors.NotSupported(
          "The provided processor is not supported for the EaCDFSProcessorHandlerResolver.",
        );
      }

      const processor = appProcCfg.Application
        .Processor as EaCAtomicIconsProcessor;

      let genCfg: IconSetGenerateConfig;

      if (typeof processor.Config === "string") {
        const configStr = await Deno.readTextFile(
          path.resolve(processor.Config),
        );

        genCfg = JSON.parse(configStr);
      } else if ((processor.Config as IconSetConfig).IconMap !== undefined) {
        genCfg = {
          IconSet: processor.Config,
        } as IconSetGenerateConfig;
      } else {
        genCfg = processor.Config as IconSetGenerateConfig;

        if (genCfg.Generate) {
          await useIconSetComponents(genCfg);
        }
      }

      // const libraryHandler = await establishIconSetComponentLibraryRoute(genCfg);

      const sheetHandler = await establishIconSetSheetRoute(genCfg.IconSet);

      return (req, ctx) => {
        if (ctx.Runtime.URLMatch.Path === genCfg.SpriteSheet) {
          return sheetHandler(req, ctx);
          // } else if (ctx.Runtime.URLMatch.Path === genCfg.ComponentLibrary) {
          //   return libraryHandler(req, ctx);
        } else {
          throw new Deno.errors.NotFound(
            "The path was invalid for the atomic icons assets.",
          );
        }
      };
    },
  };
