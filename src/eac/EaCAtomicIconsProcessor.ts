import { IconSetConfig } from "../iconsets/IconSetConfig.tsx";
import { IconSetGenerateConfig } from "../iconsets/IconSetGenerateConfig.tsx";
import { EaCProcessor, isEaCProcessor } from "../src.deps.ts";

export type EaCAtomicIconsProcessor = {
  Config: string | IconSetConfig | IconSetGenerateConfig;
} & EaCProcessor<"AtomicIcons">;

export function isEaCAtomicIconsProcessor(
  proc: unknown,
): proc is EaCAtomicIconsProcessor {
  const x = proc as EaCAtomicIconsProcessor;

  return (
    isEaCProcessor("AtomicIcons", x) &&
    x.Config !== undefined &&
    (typeof x.Config === "string" ||
      (x.Config as IconSetConfig).IconMap !== undefined ||
      (x.Config as IconSetGenerateConfig).IconSet !== undefined)
  );
}
