// deno-lint-ignore-file no-explicit-any
import {
  dirname,
  exists,
  join,
  js2xml,
  JSX,
  pascalCase,
  render,
  xml2js,
} from "../src.deps.ts";

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

export async function useIconSetComponents(
  config: IconSetGenerateConfig,
): Promise<void> {
  const options = {
    DenoConfigPath: "./deno.json",
    get ExportsPath() {
      return `${this.IconsDir}/_exports.ts`;
    },
    OutDir: `${config.OutputDirectory || "./build"}/iconset`,
    get IconsDir() {
      return `${this.OutDir}/icons`;
    },
    IconDeps:
      `export { Icon, type IconProps } from "https://deno.land/x/fathym_atomic_icons/mod.ts"`,
    get IconDepsPath() {
      return `${this.OutDir}/icon.deps.ts`;
    },
    IconFile(iconName: string, icon: string): string {
      return `import { Icon, IconProps } from "../icon.deps.ts"

export function ${iconName}(props: IconProps) {
  return <Icon {...props} src="${config.SpriteSheet}" icon="${icon}" />;
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
      action: (cfg: Record<string, any>) => boolean,
    ): Promise<void> {
      const cfg = JSON.parse(
        await exists(this.DenoConfigPath)
          ? await Deno.readTextFile(this.DenoConfigPath)
          : "",
      );

      const shouldWrite = action(cfg);

      if (shouldWrite) {
        await Deno.writeTextFile(
          this.DenoConfigPath,
          JSON.stringify(cfg, null, 2),
        );
      }
    },
  };

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

  const iconExports: string[] = [];

  await Object.keys(config.IconSet.IconMap).forEach(async (icon) => {
    const iconName = `${pascalCase(icon)}Icon`;

    curIcons = curIcons.filter((ci) => !ci.startsWith(iconName));

    const iconTsx = `${iconName}.tsx`;

    iconExports.push(`export * from "./${iconTsx}"`);

    await options.EnsureFile(
      options.IconFilePath(iconTsx),
      options.IconFile(iconName, icon),
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

export interface IconSetConfig {
  IconMap: Record<string, string | URL>;
}

export interface IconSetGenerateConfig {
  Exports?: boolean;

  Imports?: string;

  OutputDirectory?: string;

  IconSet: IconSetConfig;

  SpriteSheet: string;
}

export class IconSet {
  //# Fields
  protected config: IconSetConfig;
  //#

  //# Properties
  //#

  //# Constructors
  constructor(config: IconSetConfig) {
    this.config = config;
  }
  //#

  //# API Methods
  public async GenerateComponents(): Promise<void> {
  }

  public async ToSheet(): Promise<JSX.Element> {
    const map = Object.keys(this.config.IconMap).map(
      (key) => {
        return { key, url: this.config.IconMap[key] };
      },
    );

    const symbols = new Array<JSX.Element>();

    for (let { key, url } of map) {
      if (typeof url === "string") {
        url = new URL(url) as URL;
      }

      const sym = await this.convertSvgToSymbol(key, url);

      symbols.push(sym);
    }

    const svg = (
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          {symbols}
        </defs>
      </svg>
    );

    return svg;
  }
  //#

  //# Helpers
  protected async convertSvgToSymbol(
    id: string,
    svgUrl: URL,
  ): Promise<JSX.Element> {
    try {
      const svgResp = await fetch(svgUrl, {
        headers: {
          "content-type": "application/json",
        },
      });

      if (!svgResp.ok) {
        throw new Deno.errors.BadResource(
          `Request failed with status ${svgResp.status}`,
        );
      } else if (!svgResp.body) {
        throw new Deno.errors.UnexpectedEof(
          `The download url ${svgUrl} doesn't contain a file to download`,
        );
      } else if (svgResp.status === 404) {
        throw new Deno.errors.NotFound(
          `The requested url "${svgUrl}" could not be found`,
        );
      }

      const svgMarkup = await svgResp.text();

      const svgObject = xml2js(svgMarkup, {}) as any;

      const svgElement = svgObject.elements[0] as any;
      // const width = svgElement?.attributes.width || undefined;
      // const height = svgElement?.attributes.height || undefined;
      const viewBox = svgElement?.attributes.viewBox || undefined;
      const content = js2xml(svgElement, {});

      const props = {
        id,
        viewBox,
        // width,
        // height,
        dangerouslySetInnerHTML: { __html: content },
      };

      const svgSym: JSX.Element = (
        <symbol {...props}>
        </symbol>
      );

      return svgSym;
    } catch (e) {
      console.log(e);

      throw e;
    }
  }
  //#
}
