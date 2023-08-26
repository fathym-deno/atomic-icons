import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import { iconSetPlugin } from "@fathym/atomic-icons";
import { curIconSetGenerateConfig } from "./fathym-atomic-icons.config.ts";

import { kvAuthOptions } from "./kv-auth.config.ts";
import { kvOauthPlugin } from "@fresh_kv_oauth";

export default defineConfig({
  plugins: [
    twindPlugin(twindConfig),
    await iconSetPlugin(curIconSetGenerateConfig),
    kvOauthPlugin(kvAuthOptions),
  ],
});
