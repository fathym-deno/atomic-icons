import { JSX, optimizeSvg, path, preactRenderToString } from "../src.deps.ts";
import { IconSet } from "./IconSet.tsx";
import { IconSetConfig } from "./IconSetConfig.ts";

export async function useIconSet(
  config: IconSetConfig,
  action: (sheet: JSX.Element) => Promise<void>,
): Promise<void> {
  const map = new IconSet(config);

  const spriteSheet = await map.ToSheet();

  await action(spriteSheet);
}

export async function useFileIconSet(
  outputPath: string,
  config: IconSetConfig,
): Promise<void> {
  await useIconSet(config, async (iconSet) => {
    const dir = path.dirname(outputPath);

    await Deno.mkdir(dir, {
      recursive: true,
    });

    let svg = preactRenderToString(iconSet);

    if (config.Optimize) {
      const optimizeResult = optimizeSvg(svg);

      svg = optimizeResult.data;
    }

    await Deno.writeTextFile(outputPath, svg);
  });
}
