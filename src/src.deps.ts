export * from "../deps.ts";

export * as path from "jsr:@std/path@1.0.8";
export * from "jsr:@std/http@1.0.13/status";

export { getPackageLogger } from "jsr:@fathym/common@0.2.297/log";

export {
  parse as parseXml,
  stringify as buildXml,
  type xml_document,
  type xml_node,
} from "jsr:@libs/xml@5.4.16";

export { kebabCase, pascalCase } from "jsr:@luca/cases@1.0.0";

export { render as preactRenderToString } from "npm:preact-render-to-string@6.5.13";

export { optimize as optimizeSvg } from "npm:svgo@3.3.2";
