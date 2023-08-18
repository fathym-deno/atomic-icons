import { IconSetConfig, IconSetGenerateConfig } from "@fathym/atomic-icons";

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    "x-circle": "https://api.iconify.design/bi:x-circle.svg",
    "check-circle":
      "https://api.iconify.design/material-symbols:check-circle.svg",
    exclaim: "https://api.iconify.design/bi:exclamation-circle.svg",
  },
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  IconSet: curIconSetConfig,
  SpriteSheet: "./iconset/icons",
};
