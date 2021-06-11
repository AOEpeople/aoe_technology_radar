"use strict";

const path = require("path");
const fs = require("fs");

const radarJson = "rd.json";
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath = "") =>
  path.resolve(appDirectory, relativePath);
const templateDirectory = fs.realpathSync(__dirname);
const resolveTemplate = (relativePath = "") =>
  path.resolve(templateDirectory, "..", relativePath);

module.exports = {
  template: resolveTemplate(),
  templateBuild: resolveTemplate("build"),
  appRdJson: resolveApp(`build/${radarJson}`),
  appBuild: resolveApp("build"),
  appYarnLock: resolveApp("yarn.lock"),
};
