#!/usr/bin/env node

import * as paths from "./paths";
import { createRadar } from "./generateJson/radar";
import { save } from "./generateJson/file";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

const generateJson = async () => {
  try {
    const radar = await createRadar();

    await save(JSON.stringify(radar), paths.radarJson);
  } catch (e) {
    console.error("error:", e);
  }
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
