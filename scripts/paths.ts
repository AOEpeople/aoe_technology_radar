import { resolve } from "path";
import { realpathSync } from "fs";

export const radarJson = "rd.json";
const appDirectory = realpathSync(process.cwd());
const resolveApp = (relativePath = "") => resolve(appDirectory, relativePath);
const templateDirectory = realpathSync(__dirname);
const resolveTemplate = (relativePath = "") =>
  resolve(templateDirectory, "../..", relativePath);

export const template = resolveTemplate();
export const templateBuild = resolveTemplate("build");
export const appRdJson = resolveApp(`build/${radarJson}`);
export const appBuild = resolveApp("build");
export const appPublic = resolveApp("public");
export const appYarnLock = resolveApp("yarn.lock");
