#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var crypto_1 = require("crypto");
var fs = __importStar(require("fs-extra"));
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
        var executedCommand = (0, child_process_1.spawn)(command, {
            stdio: "inherit",
            shell: true,
            env: __assign({ REACT_APP_RADAR_NAME: "CHT Technology Radar", REACT_APP_RADAR_TITLE_FORMAT: "%TECHNOLOGY_NAME% | %APP_TITLE%", REACT_APP_BUILDHASH: (0, crypto_1.randomBytes)(10).toString("hex"), GENERATE_SOURCEMAP: "false" }, process.env),
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
    return runCommand("".concat(packageManager, " run build"));
};
buildTemplate().then(function () {
    fs.copySync(paths.templateBuild, paths.appBuild);
    fs.ensureDirSync(paths.appPublic);
    fs.copySync(paths.appPublic, paths.appBuild);
    console.log("".concat(paths.appBuild, " was created and can be deployed."));
});
