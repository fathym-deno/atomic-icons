import { IconSetConfig } from "./IconSetConfig.tsx";

export interface IconSetGenerateConfig {
  ComponentLibrary?: string;

  Exports?: boolean;

  Generate: boolean;

  Imports?: string;

  OutputDirectory?: string;

  IconSet: IconSetConfig;

  SpriteSheet: string;
}
