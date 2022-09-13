import { realpathSync } from "fs";
import { resolve } from "path";

export const radarJson = "rd.json";
const appDirectory = realpathSync(process.cwd());
const resolveApp = (relativePath = "") => resolve(appDirectory, relativePath);
const templateDirectory = realpathSync(__dirname);
const resolveTemplate = (relativePath = "") =>
  resolve(templateDirectory, "../..", relativePath);

export const template = resolveTemplate(); // this repository
export const templateBuild = resolveTemplate("build"); // build folder in this repository
export const templateNodeModules = resolveTemplate("node_modules"); // node_modules folder in this repository
export const appRdJson = resolveApp(`build/${radarJson}`); // build/rd.json in project
export const appBuild = resolveApp("build"); // build folder in project
export const appPublic = resolveApp("public"); // public folder in project
export const appYarnLock = resolveApp("yarn.lock"); // yarn.lock in project
export const appNodeModules = resolveApp("node_modules"); // node_modules folder in project
