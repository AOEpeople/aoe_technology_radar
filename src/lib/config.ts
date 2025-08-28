import defaultConfig from "../../data/config.default.json";
import _userConfig from "../../data/config.json";

import { FooterLink } from "@/lib/types";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type Config = typeof defaultConfig & {
  footerLinks?: FooterLink[];
};

type UserConfig = DeepPartial<Config> & {
  // deprecated - users should update to `segments`
  quadrants?: (typeof defaultConfig)["segments"];
};

const userConfig = _userConfig as unknown as UserConfig;
const config = { ...defaultConfig, ...userConfig } as Config;

if (userConfig.colors)
  config.colors = { ...defaultConfig.colors, ...userConfig.colors };

if (userConfig.labels)
  config.labels = { ...defaultConfig.labels, ...userConfig.labels };

if (userConfig.toggles)
  config.toggles = { ...defaultConfig.toggles, ...userConfig.toggles };

if (userConfig.fuzzySearch)
  config.fuzzySearch = {
    ...defaultConfig.fuzzySearch,
    ...userConfig.fuzzySearch,
  };

// support for deprecated "quadrants" property
if (userConfig.quadrants?.length) {
  config.segments = userConfig.quadrants;
}

// override basePath if provided
const basePath = (process.env.BASE_PATH ?? config.basePath) || "";
config.basePath = basePath;

const baseUrl = (process.env.BASE_URL ?? config.baseUrl) || "";
config.baseUrl = baseUrl;

export default config;
