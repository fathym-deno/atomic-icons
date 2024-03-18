import {
  EaCRuntimeConfig,
  EaCRuntimePlugin,
  EaCRuntimePluginConfig,
  IoCContainer,
} from "../src.deps.ts";
import { EaCAtomicIconsProcessorHandlerResolver } from "./EaCAtomicIconsProcessorHandlerResolver.tsx";

export default class FathymAtomicIconsPlugin implements EaCRuntimePlugin {
  public Build(_config: EaCRuntimeConfig): Promise<EaCRuntimePluginConfig> {
    const pluginConfig: EaCRuntimePluginConfig = {
      Name: "FathymEaCPlugin",
      IoC: new IoCContainer(),
    };

    pluginConfig.IoC!.Register(() => EaCAtomicIconsProcessorHandlerResolver, {
      Name: "EaCAtomicIconsProcessor",
      Type: pluginConfig.IoC!.Symbol("ProcessorHandlerResolver"),
    });

    return Promise.resolve(pluginConfig);
  }
}
