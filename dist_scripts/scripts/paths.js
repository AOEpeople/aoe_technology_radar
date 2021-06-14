"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appYarnLock = exports.appPublic = exports.appBuild = exports.appRdJson = exports.templateBuild = exports.template = exports.radarJson = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
exports.radarJson = "rd.json";
var appDirectory = fs_1.realpathSync(process.cwd());
var resolveApp = function (relativePath) {
    if (relativePath === void 0) { relativePath = ""; }
    return path_1.resolve(appDirectory, relativePath);
};
var templateDirectory = fs_1.realpathSync(__dirname);
var resolveTemplate = function (relativePath) {
    if (relativePath === void 0) { relativePath = ""; }
    return path_1.resolve(templateDirectory, "../..", relativePath);
};
exports.template = resolveTemplate();
exports.templateBuild = resolveTemplate("build");
exports.appRdJson = resolveApp("build/" + exports.radarJson);
exports.appBuild = resolveApp("build");
exports.appPublic = resolveApp("public");
exports.appYarnLock = resolveApp("yarn.lock");
