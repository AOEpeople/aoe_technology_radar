#!/usr/bin/env node

import * as fs from "fs-extra";
import { spawn } from "child_process";
import * as paths from "./paths";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

fs.removeSync(paths.templateNodeModules);
fs.ensureSymlinkSync(paths.appNodeModules, paths.templateNodeModules);

const runCommand = (command: string) =>
  new Promise((resolve, reject) => {
    const executedCommand = spawn(command, {
      stdio: "inherit",
      shell: true,
    });

    executedCommand.on("error", (error) => {
      reject(error);
    });

    executedCommand.on("exit", (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject();
      }
    });
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });

const buildTemplate = () => {
  const packageManager = fs.existsSync(paths.appYarnLock) ? "yarn" : "npx";

  fs.emptyDirSync(paths.templateBuild);
  process.chdir(paths.template);

  return runCommand(`${packageManager} build`);
};

buildTemplate().then(() => {
  fs.copySync(paths.templateBuild, paths.appBuild);
  fs.copySync(paths.appPublic, paths.appBuild);
  console.log(`${paths.appBuild} was created and can be deployed.`);
});
