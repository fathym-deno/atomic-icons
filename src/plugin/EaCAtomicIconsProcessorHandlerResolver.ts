import { ProcessorHandlerResolver } from "../deno.deps.ts";
import { getPackageLogger, path } from "../src.deps.ts";
import {
  EaCAtomicIconsProcessor,
  isEaCAtomicIconsProcessor,
} from "../eac/EaCAtomicIconsProcessor.ts";
import { IconSetGenerateConfig } from "../iconsets/IconSetGenerateConfig.tsx";
import { IconSetConfig } from "../iconsets/IconSetConfig.tsx";
import { useIconSetComponents } from "../iconsets/component.utils.tsx";
// import { establishIconSetComponentLibraryRoute } from './routes/iconsets/icon-set-components.tsx';
import { establishIconSetSheetRoute } from "./routes/iconsets/icon-set-sheet.tsx";

/** */
export const EaCAtomicIconsProcessorHandlerResolver: ProcessorHandlerResolver =
  {
    async Resolve(_ioc, appProcCfg, _eac) {
      const logger = await getPackageLogger();

      if (!isEaCAtomicIconsProcessor(appProcCfg.Application.Processor)) {
        throw new Deno.errors.NotSupported(
          "The provided processor is not supported for the EaCDFSProcessorHandlerResolver.",
        );
      }

      logger.debug("Configuring Atomic Icons...");

      const processor = appProcCfg.Application
        .Processor as EaCAtomicIconsProcessor;

      let genCfg: IconSetGenerateConfig;

      if (typeof processor.Config === "string") {
        logger.debug("From Icon Config File");

        const configStr = await Deno.readTextFile(
          path.resolve(processor.Config),
        );

        processor.Config = JSON.parse(configStr);
      }

      if ((processor.Config as IconSetConfig).IconMap !== undefined) {
        logger.debug("From IconSetConfig");

        genCfg = {
          IconSet: processor.Config,
        } as IconSetGenerateConfig;
      } else {
        logger.debug("From IconSetGenerateConfig");

        genCfg = processor.Config as IconSetGenerateConfig;
      }

      if (genCfg.Generate) {
        logger.debug("Generating components");

        await useIconSetComponents(
          genCfg,
          appProcCfg.ResolverConfig.PathPattern.replace("*", ""),
        );
      }

      // const libraryHandler = await establishIconSetComponentLibraryRoute(genCfg);

      const sheetHandler = await establishIconSetSheetRoute(genCfg.IconSet);

      return (req, ctx) => {
        genCfg = genCfg as IconSetGenerateConfig;

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
