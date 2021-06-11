#!/usr/bin/env node

import { createRadar } from "./radar";
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { quadrants } from "../src/config";

(async () => {
  try {
    console.log("starting static");
    const radar = await createRadar();

    copyFileSync("build/index.html", "build/overview.html");
    copyFileSync("build/index.html", "build/help-and-about-tech-radar.html");

    quadrants.forEach((quadrant) => {
      const destFolder = `build/${quadrant}`;
      copyFileSync("build/index.html", `${destFolder}.html`);
      if (!existsSync(destFolder)) {
        mkdirSync(destFolder);
      }
    });
    radar.items.forEach((item) => {
      copyFileSync(
        "build/index.html",
        `build/${item.quadrant}/${item.name}.html`
      );
    });

    console.log("created static");
  } catch (e) {
    console.error("error:", e);
  }
})();
