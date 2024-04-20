import csv from "csv-parser";
import fs from "node:fs";

import type { DataRow } from "../src/lib/datarow";
import config from "./../data/config.json";

/**
 * Generates a slug from the given input string.
 *
 * @param input - The input string to generate the slug from.
 * @returns The generated slug.
 */
function generateSlug(input: string): string {
  console.log("input", input);
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Create a reverse mapping from ring titles to ids
const ringTitleToId: { [key: string]: string } = {};
for (const ring of config.rings) {
  ringTitleToId[ring.title] = ring.id;
}

// Create a reverse mapping from quadrant titles to ids
const quadrantTitleToId: { [key: string]: string } = {};
for (const quadrant of config.quadrants) {
  quadrantTitleToId[quadrant.title] = quadrant.id;
}

/**
 * Processes the CSV file and generates markdown files based on the data.
 */
fs.createReadStream("./data/data.csv")
  .pipe(
    csv({
      mapHeaders: ({ header, index }) => generateSlug(header),
    }),
  )
  .on("headers", (headers) => {
    console.log("headers", headers);
  })
  .on("data", (row: DataRow) => {
    console.log("row", row);

    const slug = generateSlug(row.name);
    const fileName = `${slug}.md`;

    const now = new Date();
    const actualDate = now.toISOString().split("T")[0];

    const dataTemplate = `---
title: "${row.name}"
ring: ${ringTitleToId[row.ring]}
quadrant: ${quadrantTitleToId[row.quadrant]}
tags: ${row.category}
---

${row.description}`;

    const folder = `./data/radar/${actualDate}`;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    fs.writeFile(
      `${folder}/${fileName}`,
      dataTemplate,
      (err: NodeJS.ErrnoException | null) => {
        if (err) throw err;
        console.log(`${fileName} has been saved!`);
      },
    );
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
