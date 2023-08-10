import { build, emptyDir } from "./scripts.deps.ts";

await emptyDir("./build");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./build",
  shims: {
    deno: true,
  },
  package: {
    name: "@fathym/atomic-icons",
    version: Deno.args[0],
    description: "A lightweight, simple to use icon library for sprite sheets.",
    license: "MIT",
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "build/LICENSE");
    Deno.copyFileSync("README.md", "build/README.md");
  },
});
