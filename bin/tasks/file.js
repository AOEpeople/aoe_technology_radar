"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.getAllMarkdownFiles = exports.distPath = exports.jsPath = exports.faviconPath = exports.assetsPath = exports.stylesPath = exports.radarPath = exports.relativePath = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const walk_1 = require("walk");
exports.relativePath = (...relativePath) => (
// path.resolve(__dirname, '..', ...relativePath)
path_1.default.resolve(...relativePath));
exports.radarPath = (...pathInSrc) => (exports.relativePath('radar', ...pathInSrc));
exports.stylesPath = (...pathInSrc) => (exports.relativePath('styles', ...pathInSrc));
exports.assetsPath = (...pathInSrc) => (exports.relativePath('assets', ...pathInSrc));
exports.faviconPath = (...pathInSrc) => (exports.relativePath('assets/favicon.ico', ...pathInSrc));
exports.jsPath = (...pathInSrc) => (exports.relativePath('js', ...pathInSrc));
exports.distPath = (...pathInDist) => (exports.relativePath('src', ...pathInDist));
exports.getAllMarkdownFiles = (folder) => (getAllFiles(folder, isMarkdownFile));
const getAllFiles = (folder, predicate) => (new Promise((resolve, reject) => {
    const walker = walk_1.walk(folder, { followLinks: false });
    const files = [];
    walker.on("file", (root, fileStat, next) => {
        if (predicate(fileStat.name)) {
            files.push(path_1.default.resolve(root, fileStat.name));
        }
        next();
    });
    walker.on("errors", (root, nodeStatsArray, next) => {
        nodeStatsArray.forEach(function (n) {
            console.error("[ERROR] " + n.name);
            if (n.error) {
                console.error(n.error.message || (n.error.code + ": " + n.error.path));
            }
        });
        next();
    });
    walker.on("end", () => {
        resolve(files.sort());
    });
}));
const isMarkdownFile = (name) => name.match(/\.md$/) !== null;
exports.save = (data, fileName) => fs_extra_1.outputFile(exports.distPath(fileName), data);
