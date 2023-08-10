import { IconSetConfig } from "./IconSetConfig.tsx";

export interface IconSetGenerateConfig {
  Exports?: boolean;

  Imports?: string;

  OutputDirectory?: string;

  IconSet: IconSetConfig;

  SpriteSheet: string;
}
