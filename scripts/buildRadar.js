#!/usr/bin/env node

"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

const fs = require("fs-extra");
const paths = require("../config/paths");
const childProcess = require("child_process");

const runCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const executedCommand = childProcess.spawn(command, args, {
      stdio: "inherit",
      shell: true,
    });

    executedCommand.on("error", (error) => {
      reject(error);
    });

    executedCommand.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

const buildTemplate = () => {
  const packageManager = fs.existsSync(paths.appYarnLock) ? "yarn" : "npx";

  fs.emptyDirSync(paths.templateBuild);
  process.chdir(paths.template);

  return runCommand(`${packageManager} build`).catch((error) => {
    console.error(error);
    process.exit(1);
  });
};

if (fs.existsSync(paths.appRdJson)) {
  buildTemplate().then(() => {
    fs.copySync(paths.templateBuild, paths.appBuild);
    console.log(`${paths.appBuild} was created and can be deployed.`);
  });
} else {
  console.error(
    `${paths.appRdJson} does not exist. You have to generate it first.`
  );
  process.exit(1);
}
