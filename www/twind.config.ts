import { Options } from "$fresh/plugins/twind.ts";
import { defineConfig } from "twind";
// import * as colors from "twind/colors";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";

export default {
  ...defineConfig({
    presets: [presetAutoPrefix(), presetTailWind()],
    theme: {
      extend: {
        colors: {
          // primary: colors.blue,
          // secondary: colors.blue,
          // tertiary: colors.blue,
        },
      },
    },
  }),
  selfURL: import.meta.url,
} as Options;
