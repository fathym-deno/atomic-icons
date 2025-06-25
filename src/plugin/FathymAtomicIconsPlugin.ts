import {
  EaCRuntimeConfig,
  EaCRuntimePlugin,
  EaCRuntimePluginConfig,
} from "../deno.deps.ts";
import { IoCContainer } from "../src.deps.ts";
import { EaCAtomicIconsProcessorHandlerResolver } from "./EaCAtomicIconsProcessorHandlerResolver.ts";

export default class FathymAtomicIconsPlugin implements EaCRuntimePlugin {
  public Setup(_config: EaCRuntimeConfig): Promise<EaCRuntimePluginConfig> {
    const pluginConfig: EaCRuntimePluginConfig = {
      Name: "FathymAtomicIconsPlugin",
      IoC: new IoCContainer(),
    };

    pluginConfig.IoC!.Register(() => EaCAtomicIconsProcessorHandlerResolver, {
      Name: "EaCAtomicIconsProcessor",
      Type: pluginConfig.IoC!.Symbol("ProcessorHandlerResolver"),
    });

    return Promise.resolve(pluginConfig);
  }
}
