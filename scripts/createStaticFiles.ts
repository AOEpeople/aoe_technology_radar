#!/usr/bin/env node
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import XmlSitemap from "xml-sitemap";
import { createRadar } from "./generateJson/radar";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

const createStaticFiles = async () => {
  console.log("starting static");
  const radar = await createRadar();

  copyFileSync("build/index.html", "build/overview.html");
  copyFileSync("build/index.html", "build/help-and-about-tech-radar.html");
  const rawConf = readFileSync("build/config.json", "utf-8");
  const config = JSON.parse(rawConf);

  Object.keys(config.quadrants).forEach((quadrant) => {
    const destFolder = `build/${quadrant}`;
    copyFileSync("build/index.html", `${destFolder}.html`);
    if (!existsSync(destFolder)) {
      mkdirSync(destFolder);
    }
  });

  const sitemap = new XmlSitemap();

  radar.items.forEach((item) => {
    copyFileSync(
      "build/index.html",
      `build/${item.quadrant}/${item.name}.html`
    );

    sitemap.add(`${process.env.PUBLIC_URL}/${item.quadrant}/${item.name}.html`, {
      lastmod: 'now',
      changefreq: 'weekly'
    });
  });

  writeFileSync("build/sitemap.xml", sitemap.xml);
};

createStaticFiles()
  .then(() => {
    console.log(`created static files.`);
  })
  .catch((err) => {
    if (err && err.message) {
      console.error(err.message);
    }
    process.exit(1);
  });
