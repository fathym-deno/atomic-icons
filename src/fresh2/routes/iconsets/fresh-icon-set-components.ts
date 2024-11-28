// import { Handlers, JSX, resolve } from '../../../src.deps.ts';
// import { IconSetGenerateConfig } from '../../../iconsets/IconSetGenerateConfig.ts';
// import { buildIconSetOptions } from '../../../iconsets/component.utils.tsx';

// export function establishIconSetComponentLibraryRoute(
//   genCfg: IconSetGenerateConfig
// ) {
//   const handler: Handlers<JSX.Element, Record<string, unknown>> = {
//     async GET(_req, ctx) {
//       const { path } = ctx.params;

//       const options = buildIconSetOptions(genCfg);

//       const filePath = resolve(options.IconsDir, path);

//       try {
//         const libraryComponent = await Deno.readTextFile(filePath);

//         return new Response(libraryComponent, {
//           headers: { 'Content-Type': 'application/typescript' },
//         });
//       } catch (err) {
//         return await ctx.renderNotFound();
//       }
//     },
//   };

//   return { handler, component: undefined };
// }
