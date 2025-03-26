import defaultConfig from "../../data/config.default.json";
import _userConfig from "../../data/config.json";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type Config = typeof defaultConfig;
type UserConfig = DeepPartial<typeof defaultConfig>;

const userConfig = _userConfig as UserConfig;
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

export default config;
