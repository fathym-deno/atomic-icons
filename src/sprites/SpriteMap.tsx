// deno-lint-ignore-file no-explicit-any
import { dirname, js2xml, JSX, render, xml2js } from "../src.deps.ts";

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

export interface SpriteMapConfig {
  SVGMap: Record<string, string | URL>;
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
