import defaultConfig from "../../data/config.default.json";
import _userConfig from "../../data/config.json";

const userConfig = _userConfig as typeof defaultConfig;
const config = { ...defaultConfig, ...userConfig };

if (userConfig.colors)
  config.colors = { ...defaultConfig.colors, ...userConfig.colors };

if (userConfig.labels)
  config.labels = { ...defaultConfig.labels, ...userConfig.labels };

if (userConfig.toggles)
  config.toggles = { ...defaultConfig.toggles, ...userConfig.toggles };

export default config;
