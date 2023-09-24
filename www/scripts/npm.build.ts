import { build, emptyDir } from "$dnt";

await emptyDir("./build");

await build({
  entryPoints: ["mod.ts"],
  outDir: "./build",
  shims: {
    deno: true,
  },
  package: {
    name: "@fathym-deno/atomic-icons",
    version: Deno.args[0],
    description: "ES6 based module project.",
    license: "MIT",
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "build/LICENSE");
    Deno.copyFileSync("README.md", "build/README.md");
  },
});
