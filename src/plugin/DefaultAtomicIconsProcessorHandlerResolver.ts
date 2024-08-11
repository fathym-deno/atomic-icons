import {
  EaCApplicationProcessorConfig,
  EaCRuntimeEaC,
  EaCRuntimeHandler,
  ProcessorHandlerResolver,
} from "../deno.deps.ts";
import { IoCContainer } from "../src.deps.ts";
import { isEaCAtomicIconsProcessor } from "../eac/EaCAtomicIconsProcessor.ts";

export class DefaultAtomicIconsProcessorHandlerResolver
  implements ProcessorHandlerResolver {
  public async Resolve(
    ioc: IoCContainer,
    appProcCfg: EaCApplicationProcessorConfig,
    eac: EaCRuntimeEaC,
  ): Promise<EaCRuntimeHandler | undefined> {
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
