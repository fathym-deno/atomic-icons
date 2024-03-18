import { exists, existsSync, pascalCase } from "../src.deps.ts";
import { IconSetGenerateConfig } from "./IconSetGenerateConfig.tsx";

export function buildIconSetOptions(config: IconSetGenerateConfig) {
  return {
    DenoConfigPaths: ["./deno.json", "./deno.jsonc"],
    get ExportsPath() {
      return `${this.IconsDir}/_exports.ts`;
    },
    OutDir: `${config.OutputDirectory || "./build/iconset"}`,
    get IconsDir() {
      return `${this.OutDir}/icons`;
    },
    IconDeps:
      `export { Icon, type IconProps } from "@fathym/atomic-icons/browser";`,
    get IconDepsPath() {
      return `${this.IconsDir}/icon.deps.ts`;
    },
    IconFile(root: string, iconName: string, icon: string): string {
      return `import { Icon, IconProps } from "./icon.deps.ts"

export function ${iconName}(props: IconProps) {
  return <Icon {...props} src="${root}${config.SpriteSheet}" icon="${icon}" />;
}
`;
    },
    IconFilePath(iconTsx: string): string {
      return `${this.IconsDir}/${iconTsx}`;
    },

    async EnsureFile(path: string, newContent: string): Promise<void> {
      const pathExists = await exists(path);

      const curText = pathExists && await Deno.readTextFile(path);

      if (curText != newContent) {
        await Deno.writeTextFile(path, newContent);
      }
    },
    async EnsureExports(exports: string[]) {
      await this.EnsureFile(this.ExportsPath, exports.join("\n"));
    },
    async EnsureIconDeps() {
      await this.EnsureFile(this.IconDepsPath, this.IconDeps);
    },
    async WithDenoConfig(
      // deno-lint-ignore no-explicit-any
      action: (cfg: Record<string, any>) => boolean,
    ): Promise<void> {
      const denoCfgPath = this.DenoConfigPaths.find((path) =>
        existsSync(path)
      )!;

      const denoCfgStr = (await Deno.readTextFile(denoCfgPath)) || "{}";

      const denoCfg = JSON.parse(denoCfgStr);

      const shouldWrite = action(denoCfg);

      if (shouldWrite) {
        await Deno.writeTextFile(
          denoCfgPath,
          JSON.stringify(denoCfg, null, 2),
        );
      }
    },
  };
}

export async function useIconSetComponents(
  config: IconSetGenerateConfig,
  root: string,
): Promise<void> {
  const options = buildIconSetOptions(config);

  await Deno.mkdir(options.IconsDir, {
    recursive: true,
  });

  await options.EnsureIconDeps();

  let curIcons: string[] = [];

  for await (const icon of await Deno.readDir(options.IconsDir)) {
    if (icon.isFile && icon.name != "_exports.ts") {
      curIcons.push(icon.name);
    }
  }

  const iconExports: string[] = ['export * from "./icon.deps.ts"'];

  await Object.keys(config.IconSet.IconMap).forEach(async (icon) => {
    const iconName = `${pascalCase(icon)}Icon`;

    curIcons = curIcons.filter((ci) => !ci.startsWith(iconName));

    const iconTsx = `${iconName}.tsx`;

    iconExports.push(`export * from "./${iconTsx}"`);

    await options.EnsureFile(
      options.IconFilePath(iconTsx),
      options.IconFile(root, iconName, icon),
    );
  });

  // await curIcons.forEach(async (icon) => {
  //   await Deno.remove(join(options.IconsDir, icon));
  // });
  const importPath = config.Imports || `$fathym/atomic-icons`;

  if (config.Exports) {
    await options.WithDenoConfig((denoCfg) => {
      if (!denoCfg.imports) {
        denoCfg.imports = {};
      }

      if (!denoCfg.imports[importPath]) {
        denoCfg.imports[importPath] = `${options.IconsDir}/_exports.ts`;

        return true;
      }

      return false;
    });
  }

  options.EnsureExports(iconExports);
}
