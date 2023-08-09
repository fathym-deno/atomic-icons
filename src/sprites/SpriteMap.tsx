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

export async function useSheet(
  config: SpriteMapConfig,
  action: (sheet: JSX.Element) => Promise<void>,
): Promise<void> {
  const map = new SpriteMap(config);

  const spriteSheet = await map.ToSheet();

  await action(spriteSheet);
}

export async function useFileSheet(
  outputPath: string,
  config: SpriteMapConfig,
): Promise<void> {
  await useSheet(config, async (sheet) => {
    const dir = dirname(outputPath);

    await Deno.mkdir(dir, {
      recursive: true,
    });

    await Deno.writeTextFile(outputPath, render(sheet));
  });
}

export async function useSheetComponents(
  config: SpriteMapGenerateConfig,
): Promise<void> {
  const outDir = `${config.OutputDirectory || "./build"}/icons`;

  await Deno.mkdir(outDir, {
    recursive: true,
  });

  await Deno.writeTextFile(
    join(outDir, "icon.deps.ts"),
    `export { Icon, type IconProps } from "https://deno.land/x/fathym_atomic_icons/mod.ts"`,
  );

  const denoCfgPath = "./deno.json";

  const denoCfg = JSON.parse(
    await exists(denoCfgPath) ? await Deno.readTextFile(denoCfgPath) : "",
  );

  const importPath = `$atomic/${config.Exports || "mycons"}`;

  if (!denoCfg.imports) {
    denoCfg.imports = {};
  }

  if (!denoCfg.imports[importPath]) {
    denoCfg.imports[importPath] = `${outDir}/_exports.ts`;

    await Deno.writeTextFile(denoCfgPath, JSON.stringify(denoCfg, null, 2));
  }

  const iconExports: string[] = [];

  await Object.keys(config.Sprites.SVGMap).forEach(async (icon) => {
    const iconName = `${pascalCase(icon)}Icon`;

    const iconTsx = `./${iconName}.tsx`;

    iconExports.push(`export * from "${iconTsx}"`);

    const iconFilePath = join(outDir, iconTsx);

    const iconFile = `import { Icon, IconProps } from "./icon.deps.ts"

export function ${iconName}(props: IconProps) {
  return <Icon {...props} src="${config.SpriteSheet}" icon="${icon}" />;
}
`;

    await Deno.writeTextFile(iconFilePath, iconFile);
  });

  await Deno.writeTextFile(
    join(outDir, "_exports.ts"),
    iconExports.join("\n"),
  );
}

export interface SpriteMapConfig {
  SVGMap: Record<string, string | URL>;
}

export interface SpriteMapGenerateConfig {
  Exports?: string;

  OutputDirectory?: string;

  Sprites: SpriteMapConfig;

  SpriteSheet: string;
}

export class SpriteMap {
  //# Fields
  protected config: SpriteMapConfig;
  //#

  //# Properties
  //#

  //# Constructors
  constructor(config: SpriteMapConfig) {
    this.config = config;
  }
  //#

  //# API Methods
  public async GenerateComponents(): Promise<void> {
  }

  public async ToSheet(): Promise<JSX.Element> {
    const map = Object.keys(this.config.SVGMap).map(
      (key) => {
        return { key, url: this.config.SVGMap[key] };
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
