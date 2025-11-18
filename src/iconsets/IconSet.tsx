import {
  buildXml,
  getPackageLogger,
  JSX,
  parseXml,
  xml_document,
  xml_node,
} from "../src.deps.ts";
import { IconSetConfig } from "./IconSetConfig.ts";

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
    const map = Object.keys(this.config.IconMap).map((key) => {
      return { key, url: this.config.IconMap[key] };
    });

    const symbols = new Array<string>();

    for (let { key, url } of map) {
      if (typeof url === "string") {
        url = new URL(url) as URL;
      }

      const sym = await this.convertSvgToSymbol(key, url);

      symbols.push(sym);
    }

    const svg = (
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{
            __html: symbols.join(""),
          }}
        >
        </defs>
      </svg>
    );

    return svg;
  }
  //#endregion

  //#region Helpers
  protected async convertSvgToSymbol(id: string, svgUrl: URL): Promise<string> {
    const logger = await getPackageLogger(import.meta);

    try {
      const svgResp = await fetch(svgUrl, {
        headers: {
          // You could likely drop this header entirely, but leaving it if needed:
          "content-type": "application/json",
        },
      });

      // 404 first, then generic !ok
      if (svgResp.status === 404) {
        let body = "";
        try {
          body = await svgResp.text();
        } catch {
          // ignore body read failure
        }

        const msg = `The requested url "${svgUrl}" could not be found (404).` +
          (body ? ` Body: ${body.slice(0, 2000)}` : "");

        logger.error("Icon fetch 404", { id, url: svgUrl.toString(), body });

        throw new Deno.errors.NotFound(msg);
      } else if (!svgResp.ok) {
        let body = "";
        try {
          body = await svgResp.text();
        } catch {
          // ignore body read failure
        }

        const msg =
          `Request to ${svgUrl} failed with status ${svgResp.status}.` +
          (body ? ` Body: ${body.slice(0, 2000)}` : "");

        logger.error("Icon fetch failed", {
          id,
          url: svgUrl.toString(),
          status: svgResp.status,
          body,
        });

        throw new Deno.errors.BadResource(msg);
      } else if (!svgResp.body) {
        throw new Deno.errors.UnexpectedEof(
          `The download url ${svgUrl} doesn't contain a file to download`,
        );
      }

      const svgMarkup = await svgResp.text();

      const svgObject = parseXml(svgMarkup, {});

      const svgElement = svgObject["~children"][0] as xml_node;

      const viewBox = svgElement["@viewBox"] || undefined;

      const content = buildXml(
        {
          symbol: {
            "@id": id,
            "@viewBox": viewBox,
            ...svgElement["~children"].reduce((acc, c) => {
              acc[c["~name"]] = c;
              return acc;
            }, {} as Record<string, unknown>),
          },
        } satisfies Partial<xml_document>,
        {
          format: {
            breakline: -1,
            indent: "",
          },
        },
      );

      return content;
    } catch (e) {
      logger.error("There was an issue converting the svg to a symbol.", {
        id,
        url: svgUrl.toString(),
        error: e,
      });
      throw e;
    }
  }
  //#endregion
}
