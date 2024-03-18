// import { EaCRuntimeHandler, path, STATUS_CODE } from "../../../src.deps.ts";
// import { IconSetGenerateConfig } from "../../../iconsets/IconSetGenerateConfig.tsx";
// import { buildIconSetOptions } from "../../../iconsets/component.utils.tsx";

// export function establishIconSetComponentLibraryRoute(
//   genCfg: IconSetGenerateConfig,
// ) {
//   const options = buildIconSetOptions(genCfg);

//   const filePath = path.resolve(options.IconsDir, reqPath!);

//   const libraryComponent = await Deno.readTextFile(filePath);
//   const handler: EaCRuntimeHandler<Record<string, unknown>> = async (_req, ctx) => {
//     const { path: reqPath } = ctx.Params;

//       return new Response(libraryComponent, {
//         headers: { "Content-Type": "application/typescript" },
//       });
//     } catch (err) {
//       return new Response(null, {
//         status: STATUS_CODE.NotFound,
//       });
//     }
//   };

//   return handler;
// }
