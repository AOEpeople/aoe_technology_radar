#!/usr/bin/env node

import * as fs from "fs-extra";
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

const generateJson = async () => {
  const { createRadar } = require("./generateJson/radar");
  const { save } = require("./generateJson/file");

  const radar = await createRadar();
  await save(JSON.stringify(radar), paths.radarJson);
};

generateJson()
  .then(() => {
    console.log(`${paths.appRdJson} created.`);
  })
  .catch((err) => {
    if (err && err.message) {
      console.error(err.message);
    }
    process.exit(1);
  });
