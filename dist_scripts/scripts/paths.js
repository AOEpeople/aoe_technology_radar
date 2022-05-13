"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appNodeModules = exports.appYarnLock = exports.appPublic = exports.appBuild = exports.appRdJson = exports.templateNodeModules = exports.templateBuild = exports.template = exports.radarJson = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
exports.radarJson = "rd.json";
var appDirectory = (0, fs_1.realpathSync)(process.cwd());
var resolveApp = function (relativePath) {
    if (relativePath === void 0) { relativePath = ""; }
    return (0, path_1.resolve)(appDirectory, relativePath);
};
var templateDirectory = (0, fs_1.realpathSync)(__dirname);
var resolveTemplate = function (relativePath) {
    if (relativePath === void 0) { relativePath = ""; }
    return (0, path_1.resolve)(templateDirectory, "../..", relativePath);
};
exports.template = resolveTemplate(); // this repository
exports.templateBuild = resolveTemplate("build"); // build folder in this repository
exports.templateNodeModules = resolveTemplate("node_modules"); // node_modules folder in this repository
exports.appRdJson = resolveApp("build/".concat(exports.radarJson)); // build/rd.json in project
exports.appBuild = resolveApp("build"); // build folder in project
exports.appPublic = resolveApp("public"); // public folder in project
exports.appYarnLock = resolveApp("yarn.lock"); // yarn.lock in project
exports.appNodeModules = resolveApp("node_modules"); // node_modules folder in project
