var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { outputFile } from 'fs-extra';
import path from 'path';
import { walk } from 'walk';
export var relativePath = function () {
    var relativePath = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        relativePath[_i] = arguments[_i];
    }
    return (
    // path.resolve(__dirname, '..', ...relativePath)
    path.resolve.apply(
    // path.resolve(__dirname, '..', ...relativePath)
    path, relativePath));
};
export var radarPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return (relativePath.apply(void 0, __spreadArray(['radar'], pathInSrc)));
};
export var stylesPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return (relativePath.apply(void 0, __spreadArray(['styles'], pathInSrc)));
};
export var assetsPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return (relativePath.apply(void 0, __spreadArray(['assets'], pathInSrc)));
};
export var faviconPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return (relativePath.apply(void 0, __spreadArray(['assets/favicon.ico'], pathInSrc)));
};
export var jsPath = function () {
    var pathInSrc = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInSrc[_i] = arguments[_i];
    }
    return (relativePath.apply(void 0, __spreadArray(['js'], pathInSrc)));
};
export var distPath = function () {
    var pathInDist = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathInDist[_i] = arguments[_i];
    }
    return (relativePath.apply(void 0, __spreadArray(['src'], pathInDist)));
};
export var getAllMarkdownFiles = function (folder) { return (getAllFiles(folder, isMarkdownFile)); };
var getAllFiles = function (folder, predicate) { return (new Promise(function (resolve, reject) {
    var walker = walk(folder, { followLinks: false });
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
                console.error(n.error.message || (n.error.code + ": " + n.error.path));
            }
        });
        next();
    });
    walker.on("end", function () {
        resolve(files.sort());
    });
})); };
var isMarkdownFile = function (name) { return name.match(/\.md$/) !== null; };
export var save = function (data, fileName) { return outputFile(distPath(fileName), data); };
