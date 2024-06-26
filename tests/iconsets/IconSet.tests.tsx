import { assertEquals, render } from "../tests.deps.ts";
import { IconSet } from "../../src/iconsets/IconSet.tsx";
import { IconSetConfig } from "../../src/iconsets/IconSetConfig.tsx";
import { useFileIconSet } from "../../src/iconsets/sheet.utils.tsx";
// import manifest from "../../fresh.gen.ts";

// const CONN_INFO: ServeHandlerInfo = {
//   remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
// };

// await describe("Sprite Map Tests", async () => {
const spritePath = "C:\\temp\\test\\static\\icons.sprite.svg";

const expectedSpriteSheet =
  `<svg xmlns="http://www.w3.org/2000/svg"><defs><symbol id="x-circle" viewBox="0 0 16 16"><g fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708"/></g></symbol><symbol id="check-circle" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></symbol></defs></svg>`;

const isCfg: IconSetConfig = {
  IconMap: {
    "x-circle": "https://api.iconify.design/bi:x-circle.svg",
    "check-circle":
      "https://api.iconify.design/material-symbols:check-circle.svg",
  },
};

Deno.test("Sprite Map Direct", async () => {
  const map = new IconSet(isCfg);

  const spriteSheet = await map.ToSheet();

  const spriteSheetContent = render(spriteSheet);

  assertEquals(
    spriteSheetContent,
    expectedSpriteSheet,
  );
});

Deno.test("Use File Sheet", async () => {
  await useFileIconSet(spritePath, isCfg);

  const spriteSheetContent = await Deno.readTextFile(spritePath);

  assertEquals(spriteSheetContent, expectedSpriteSheet);
});

// Deno.test("Test Plugin", async (t) => {
//   const handler = await createHandler(manifest);

//   await t.step("#1 GET /", async () => {
//     const resp = await handler(new Request("http://127.0.0.1/"), CONN_INFO);

//     assertEquals(resp.status, 200);
//   });
// });

// Deno.test("Use Sheet Component", async () => {
//   await useIconSetComponents({
//     Exports: "./mod.ts",
//     OutputDirectory: "./build",
//     IconSet: isCfg,
//     SpriteSheet: "./icons.sprite.svg",
//   });

//   // const spriteSheetContent = dec.decode(await Deno.readFile(spritePath));

//   // assertEquals(spriteSheetContent, expectedSpriteSheet);
// });
// });
