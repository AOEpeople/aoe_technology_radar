"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.getAllMarkdownFiles = exports.builderPath = exports.buildPath = exports.publicPath = exports.jsPath = exports.faviconPath = exports.assetsPath = exports.stylesPath = exports.radarPath = exports.relativePath = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = __importDefault(require("path"));
var walk_1 = require("walk");
var relativePath = function () {
    var relativePath = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        relativePath[_i] = arguments[_i];
    }
    // path.resolve(__dirname, '..', ...relativePath)
    return path_1.default.resolve.apply(path_1.default, relativePath);
};
exports.relativePath = relativePath;
var radarPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["radar"], pathInSrc));
};
exports.radarPath = radarPath;
var stylesPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["styles"], pathInSrc));
};
exports.stylesPath = stylesPath;
var assetsPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["assets"], pathInSrc));
};
exports.assetsPath = assetsPath;
var faviconPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["assets/favicon.ico"], pathInSrc));
};
exports.faviconPath = faviconPath;
var jsPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["js"], pathInSrc));
};
exports.jsPath = jsPath;
var publicPath = function () {
    var pathInDist = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInDist[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["public"], pathInDist));
};
exports.publicPath = publicPath;
var buildPath = function () {
    var pathInDist = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInDist[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["build"], pathInDist));
};
exports.buildPath = buildPath;
var builderPath = function () {
    var pathInDist = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInDist[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["node_modules", "aoe_technology_radar", "src"], pathInDist));
};
exports.builderPath = builderPath;
var getAllMarkdownFiles = function (folder) {
    return getAllFiles(folder, isMarkdownFile);
};
exports.getAllMarkdownFiles = getAllMarkdownFiles;
var getAllFiles = function (folder, predicate) {
    return new Promise(function (resolve, reject) {
        var walker = walk_1.walk(folder, { followLinks: false });
        var files = [];
        walker.on("file", function (root, fileStat, next) {
            if (predicate(fileStat.name)) {
                files.push(path_1.default.resolve(root, fileStat.name));
            }
            next();
        });
        walker.on("errors", function (root, nodeStatsArray, next) {
            nodeStatsArray.forEach(function (n) {
                console.error("[ERROR] " + n.name);
                if (n.error) {
                    console.error(n.error.message || n.error.code + ": " + n.error.path);
                }
            });
            next();
        });
        walker.on("end", function () {
            resolve(files.sort());
        });
    });
};
var isMarkdownFile = function (name) { return name.match(/\.md$/) !== null; };
var save = function (data, fileName) {
    return fs_extra_1.outputFile(exports.buildPath(fileName), data);
};
exports.save = save;
