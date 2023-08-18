import { dirname, JSX, render } from "../src.deps.ts";
import { IconSet } from "./IconSet.tsx";
import { IconSetConfig } from "./IconSetConfig.tsx";

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
    const dir = dirname(outputPath);

    await Deno.mkdir(dir, {
      recursive: true,
    });

    await Deno.writeTextFile(outputPath, render(iconSet));
  });
}
