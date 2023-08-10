// deno-lint-ignore-file no-explicit-any
import { js2xml, JSX, xml2js } from "../src.deps.ts";
import { IconSetConfig } from "./IconSetConfig.tsx";

export class IconSet {
  //#region Fields
  protected config: IconSetConfig;
  //#endregion

  //#region Properties
  //#endregion

  //#region Constructors
  constructor(config: IconSetConfig) {
    this.config = config;
  }
  //#endregion

  //#region API Methods
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
  //#endregion

  //#region Helpers
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
  //#endregion
}
