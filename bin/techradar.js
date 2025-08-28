#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("child_process");
const crypto = require("crypto");

const CWD = process.cwd();
const BUILDER_DIR = path.join(CWD, ".techradar");
const SOURCE_DIR = path.join(CWD, "node_modules", "aoe_technology_radar");
const HASH_FILE = path.join(BUILDER_DIR, "hash");

const PARAMETER = process.argv[2]; // "dev", "build" or "serve"
const FLAGS = process.argv.slice(3).join(" ");

// Central mapping for files and directories to be bootstrapped and rebuilt
const fileMapping = {
  "radar-dir": {
    isDirectory: true,
    bootstrappingSource: path.join(SOURCE_DIR, "data", "radar"),
    buildSource: path.join(CWD, "radar"),
    buildTarget: path.join(BUILDER_DIR, "data", "radar"),
    rebuildOnChange: true,
  },
  "public-dir": {
    isDirectory: true,
    bootstrappingSource: path.join(SOURCE_DIR, "public"),
    buildSource: path.join(CWD, "public"),
    buildTarget: path.join(BUILDER_DIR, "public"),
    rebuildOnChange: true,
  },
  "config-file": {
    isDirectory: false,
    bootstrappingSource: path.join(SOURCE_DIR, "data", "config.default.json"),
    buildSource: path.join(CWD, "config.json"),
    buildTarget: path.join(BUILDER_DIR, "data", "config.json"),
    rebuildOnChange: true,
  },
  "about-file": {
    isDirectory: false,
    bootstrappingSource: path.join(SOURCE_DIR, "data", "about.md"),
    buildSource: path.join(CWD, "about.md"),
    buildTarget: path.join(BUILDER_DIR, "data", "about.md"),
    rebuildOnChange: true,
  },
  "customcss-file": {
    isDirectory: false,
    bootstrappingSource: path.join(SOURCE_DIR, "src", "styles", "custom.css"),
    buildSource: path.join(CWD, "custom.css"),
    buildTarget: path.join(BUILDER_DIR, "src", "styles", "custom.css"),
    rebuildOnChange: true,
  },
};

function info(message) {
  console.log(`\x1b[32m${message}\x1b[0m`);
}

function warn(message) {
  console.log(`\x1b[33mWarning: ${message}\x1b[0m`);
}

function error(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function bootstrap() {
  for (const file of Object.values(fileMapping)) {
    const relativeBuildPath = `./${path.relative(CWD, file.buildSource)}`;
    if (!fs.existsSync(file.buildSource) && file.isDirectory) {
      warn(
        `Could not find the directory ${relativeBuildPath}. Created a bootstrap directory in your current working directory. Feel free to customize it.`,
      );
      fs.cpSync(file.bootstrappingSource, file.buildSource, {
        recursive: true,
      });
    } else if (!fs.existsSync(file.buildSource) && !file.isDirectory) {
      warn(
        `Could not find ${relativeBuildPath}. Created a bootstrap file in your current working directory. Feel free to customize it.`,
      );
      fs.copyFileSync(file.bootstrappingSource, file.buildSource);
    }
  }
}

// Calculate current hash of package.json to determine if the builder needs to be re-created
function calculateHash(file) {
  const fileBuffer = fs.readFileSync(file);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
}

function buildData() {
  info("Building data");
  execSync(`npm run build:data -- ${FLAGS}`, {
    stdio: "inherit",
  });
}

const CURRENT_HASH = calculateHash(path.join(CWD, "package.json"));

let RECREATE_DIR = false;
if (
  !fs.existsSync(BUILDER_DIR) ||
  !fs.existsSync(HASH_FILE) ||
  fs.readFileSync(HASH_FILE, "utf8") !== CURRENT_HASH
) {
  RECREATE_DIR = true;
}

if (RECREATE_DIR) {
  // Remove existing builder dir if it exists
  if (fs.existsSync(BUILDER_DIR)) {
    fs.rmSync(BUILDER_DIR, { recursive: true });
  }

  // Copy source dir to builder dir
  try {
    fs.cpSync(SOURCE_DIR, BUILDER_DIR, { recursive: true });
    fs.writeFileSync(HASH_FILE, CURRENT_HASH);
  } catch (e) {
    error(`Could not copy ${SOURCE_DIR} to ${BUILDER_DIR}`);
  }

  try {
    process.chdir(BUILDER_DIR);
    info("Installing npm packages");
    execSync("npm install", { stdio: "inherit" });
  } catch (e) {
    error("Could not install npm packages");
  }
}

bootstrap();

try {
  for (const file of Object.values(fileMapping)) {
    // Remove existing target directories if needed
    if (fs.existsSync(file.buildTarget) && file.isDirectory) {
      fs.rmSync(file.buildTarget, { recursive: true });
    }
    if (file.isDirectory) {
      fs.cpSync(file.buildSource, file.buildTarget, { recursive: true });
    } else {
      fs.copyFileSync(file.buildSource, file.buildTarget);
    }
  }
  process.chdir(BUILDER_DIR);
} catch (e) {
  error(e.message);
}

buildData();

if (PARAMETER === "serve") {
  info("Starting techradar");
  execSync("npm run dev", { stdio: "inherit" });
}

if (PARAMETER === "build") {
  info("Building techradar");
  execSync("npm run build", { stdio: "inherit" });
  const buildDir = path.join(CWD, "build");
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  info(`Copying techradar to ${buildDir}`);
  fs.renameSync(path.join(BUILDER_DIR, "out"), buildDir);
}

if (PARAMETER === "dev") {
  info("Starting techradar in development mode");

  // Spawn a child process to run the dev server so the main thread is not blocked.
  // The process has to be killed whenever the main thread is killed
  const NODEDEV_CHILD_PROCESS = spawn("npm", ["run", "dev"], {
    stdio: "inherit",
    detached: false,
  });

  process.on("exit", () => {
    NODEDEV_CHILD_PROCESS.kill();
  });

  // Array to store native watchers
  const watchers = [];

  // Debounced function to rebuild the data when a change is detected.
  const rebuildData = debounce(({ path: changedPath }) => {
    try {
      const fileConfig = Object.values(fileMapping).find(
        (config) => config.buildSource === changedPath && !config.isDirectory,
      );
      const dirConfig = Object.values(fileMapping).find(
        (config) =>
          changedPath.startsWith(config.buildSource) && config.isDirectory,
      );
      if (fileConfig) {
        const relativeBuildSrc = `./${path.relative(CWD, changedPath)}`;
        info(`♻️ ${relativeBuildSrc} changed`);
        fs.copyFileSync(fileConfig.buildSource, fileConfig.buildTarget);
      } else if (dirConfig) {
        const relativeBuildSrc = `./${path.relative(CWD, changedPath)}`;
        const relativeTargetPath = `./${path.relative(CWD, dirConfig.buildTarget)}`;
        info(
          `♻️ ${relativeBuildSrc} changed, updating all files in ${relativeTargetPath}.`,
        );
        if (fs.existsSync(dirConfig.buildTarget)) {
          fs.rmSync(dirConfig.buildTarget, { recursive: true });
        }
        fs.cpSync(dirConfig.buildSource, dirConfig.buildTarget, {
          recursive: true,
        });
      } else {
        info(`Unknown file changed: ./${path.relative(CWD, changedPath)}`);
      }

      // Rebuild JSON files (or any other assets) needed by the dev server.
      buildData();
    } catch (e) {
      error("Unable to reload updated data. Please restart the server.");
    }
  }, 1000);

  // Attach watchers for files/directories as specified in fileMapping.
  for (const fileConfig of Object.values(fileMapping)) {
    if (!fileConfig.rebuildOnChange) continue;

    if (fileConfig.isDirectory) {
      try {
        const watcher = fs.watch(
          fileConfig.buildSource,
          { recursive: true },
          (eventType, filename) => {
            const changedPath = filename
              ? path.join(fileConfig.buildSource, filename)
              : fileConfig.buildSource;
            rebuildData({ path: changedPath });
          },
        );
        watchers.push(watcher);
      } catch (err) {
        warn(`Error watching directory ${fileConfig.buildSource}: ${err}`);
      }
    } else {
      // For individual files, simply attach a watcher.
      try {
        const watcher = fs.watch(
          fileConfig.buildSource,
          (eventType, filename) => {
            rebuildData({ path: fileConfig.buildSource });
          },
        );
        watchers.push(watcher);
      } catch (err) {
        warn(`Error watching file ${fileConfig.buildSource}: ${err}`);
      }
    }
  }
}
