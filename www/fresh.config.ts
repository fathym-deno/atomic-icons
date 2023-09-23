import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import { curIconSetGenerateConfig } from "./fathym-atomic-icons.config.ts";
import { iconSetPlugin } from "@fathym/atomic-icons";

export default defineConfig({
  plugins: [
    twindPlugin(twindConfig),
    await iconSetPlugin(curIconSetGenerateConfig),
  ],
});
