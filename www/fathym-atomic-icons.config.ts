import { IconSetConfig, IconSetGenerateConfig } from "@fathym/atomic-icons";

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    "chevron-down": "https://api.iconify.design/mdi:chevron-down.svg",
    user: "https://api.iconify.design/material-symbols:account-circle-full.svg",
  },
  Optimize: true,
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  Exports: true,
  IconSet: curIconSetConfig,
  SpriteSheet: "iconset/icons",
};
