import defaultConfig from "../../data/config.default.json";
import _userConfig from "../../data/config.json";

type Config = typeof defaultConfig & {
  quadrants?: (typeof defaultConfig)["segments"];
};

const userConfig = _userConfig as Config;
const config = { ...defaultConfig, ...userConfig };

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

export default config;
