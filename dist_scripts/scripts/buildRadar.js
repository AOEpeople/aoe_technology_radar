#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs-extra"));
var child_process_1 = require("child_process");
var paths = __importStar(require("./paths"));
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", function (err) {
    throw err;
});
fs.removeSync(paths.templateNodeModules);
fs.ensureSymlinkSync(paths.appNodeModules, paths.templateNodeModules);
var runCommand = function (command) {
    return new Promise(function (resolve, reject) {
        var executedCommand = child_process_1.spawn(command, {
            stdio: "inherit",
            shell: true,
        });
        executedCommand.on("error", function (error) {
            reject(error);
        });
        executedCommand.on("exit", function (code) {
            if (code === 0) {
                resolve(code);
            }
            else {
                reject();
            }
        });
    }).catch(function (error) {
        console.error(error);
        process.exit(1);
    });
};
var buildTemplate = function () {
    var packageManager = fs.existsSync(paths.appYarnLock) ? "yarn" : "npm";
    fs.emptyDirSync(paths.templateBuild);
    process.chdir(paths.template);
    return runCommand(packageManager + " run build");
};
buildTemplate().then(function () {
    fs.copySync(paths.templateBuild, paths.appBuild);
    fs.copySync(paths.appPublic, paths.appBuild);
    console.log(paths.appBuild + " was created and can be deployed.");
});
