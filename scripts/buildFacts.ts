import fs from "fs";
import path from "path";

const radarDir = path.join(__dirname, "../data/radar");
const factsDir = path.join(radarDir, "01-facts");
const template = `## Overview

This cool technology {{filename}} can be used and is easy to implement...

## Facts

- **Representative**: someone@example.com
- **Contacts**: someoneelse@example.com

## Provided Features

- Feature 1: Description of feature 1.
- Feature 2: Description of feature 2.
- Feature 3: Description of feature 3.

## Restrictions

- Restriction 1: Description of restriction 1.
- Restriction 2: Description of restriction 2.
- Restriction 3: Description of restriction 3.

## Example use cases

- Use case 1: Description of use case 1.
- Use case 2: Description of use case 2.
- Use case 3: Description of use case 3.

## Technical Documentation and further Links

- [Project Repository](https://github.com/AOEpeople/techradar)
- [Deployed AOE Tech Radar](https://www.aoe.com/techradar/index.html)
- [Additional Documentation](link-to-additional-documentation)
`;

function createFactFiles(dir: string) {
  let createdFilesCount = 0;

  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        if (file !== "01-facts") {
          createFactFiles(filePath); // Recursively process subdirectories
        }
      } else {
        const factFilePath = path.join(factsDir, `${file}`);
        if (!fs.existsSync(factFilePath)) {
          fs.writeFileSync(
            factFilePath,
            template.replace("{{filename}}", path.parse(file).name),
          );
          createdFilesCount++;
        }
      }
    });

    if (createdFilesCount > 0) {
      console.log(
        `Created ${createdFilesCount} fact file(s). Check ${factsDir} and update your content.`,
      );
    }
  });
}

createFactFiles(radarDir);
