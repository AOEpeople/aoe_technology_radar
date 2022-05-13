"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.getAllMarkdownFiles = exports.buildPath = exports.jsPath = exports.faviconPath = exports.stylesPath = exports.radarPath = exports.relativePath = void 0;
var fs_extra_1 = require("fs-extra");
var path = __importStar(require("path"));
var walk_1 = require("walk");
var relativePath = function () {
    var relativePath = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        relativePath[_i] = arguments[_i];
    }
    return path.resolve.apply(path, relativePath);
};
exports.relativePath = relativePath;
var radarPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["radar"], pathInSrc, false));
};
exports.radarPath = radarPath;
var stylesPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["styles"], pathInSrc, false));
};
exports.stylesPath = stylesPath;
var faviconPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["assets/favicon.ico"], pathInSrc, false));
};
exports.faviconPath = faviconPath;
var jsPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["js"], pathInSrc, false));
};
exports.jsPath = jsPath;
var buildPath = function () {
    var pathInDist = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInDist[_i] = arguments[_i];
    }
    return exports.relativePath.apply(void 0, __spreadArray(["build"], pathInDist, false));
};
exports.buildPath = buildPath;
var getAllMarkdownFiles = function (folder) {
    return getAllFiles(folder, isMarkdownFile);
};
exports.getAllMarkdownFiles = getAllMarkdownFiles;
var getAllFiles = function (folder, predicate) {
    return new Promise(function (resolve, reject) {
        var walker = (0, walk_1.walk)(folder, { followLinks: false });
        var files = [];
        walker.on("file", function (root, fileStat, next) {
            if (predicate(fileStat.name)) {
                files.push(path.resolve(root, fileStat.name));
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
    return (0, fs_extra_1.outputFile)((0, exports.buildPath)(fileName), data);
};
exports.save = save;
