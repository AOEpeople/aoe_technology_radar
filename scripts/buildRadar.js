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

const runCommand = (command, args) => {
  const cp = require("child_process");
  return new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
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

// TODO: Check if rd.json was created
// TODO: Check how to empty folders without interfere with generateJson job
// TODO: add dist folder for precompiled builder

process.chdir("node_modules/aoe_technology_radar");
fs.emptyDirSync("build");
runCommand("yarn build")
  .then(() => {
    fs.copySync("build", "../../build");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
