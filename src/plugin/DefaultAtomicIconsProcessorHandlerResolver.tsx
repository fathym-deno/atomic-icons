import {
  EaCApplicationProcessorConfig,
  EaCRuntimeEaC,
  IoCContainer,
  ProcessorHandlerResolver,
} from "../src.deps.ts";
import { isEaCAtomicIconsProcessor } from "../eac/EaCAtomicIconsProcessor.ts";

export class DefaultAtomicIconsProcessorHandlerResolver
  implements ProcessorHandlerResolver {
  public async Resolve(
    ioc: IoCContainer,
    appProcCfg: EaCApplicationProcessorConfig,
    eac: EaCRuntimeEaC,
  ) {
    let toResolveName: string = "";

    if (isEaCAtomicIconsProcessor(appProcCfg.Application.Processor)) {
      toResolveName = "EaCAtomicIconsProcessor";
    }

    if (toResolveName) {
      const resolver = await ioc.Resolve<ProcessorHandlerResolver>(
        ioc.Symbol("ProcessorHandlerResolver"),
        toResolveName,
      );

      return await resolver.Resolve(ioc, appProcCfg, eac);
    } else {
      return undefined;
    }
  }
}
