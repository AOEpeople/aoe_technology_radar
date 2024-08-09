#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("child_process");
const crypto = require("crypto");
const chokidar = require("chokidar");

const CWD = process.cwd();
const BUILDER_DIR = path.join(CWD, ".techradar");
const SOURCE_DIR = path.join(CWD, "node_modules", "aoe_technology_radar");
const HASH_FILE = path.join(BUILDER_DIR, "hash");

const PARAMETER = process.argv[2]; // "build" or "serve" or "dev"

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
  if (!fs.existsSync(path.join(CWD, "radar"))) {
    warn(
      "Could not find radar directory. Created a bootstrap radar directory in your current working directory. Feel free to customize it.",
    );
    fs.cpSync(path.join(SOURCE_DIR, "data", "radar"), path.join(CWD, "radar"), {
      recursive: true,
    });
  }

  if (!fs.existsSync(path.join(CWD, "public"))) {
    warn(
      "Could not find public directory. Created a public radar directory in your current working directory.",
    );
    fs.cpSync(path.join(SOURCE_DIR, "public"), path.join(CWD, "public"), {
      recursive: true,
    });
  }

  if (!fs.existsSync(path.join(CWD, "config.json"))) {
    warn(
      "Could not find a config.json. Created a bootstrap config.json in your current working directory. Customize it to your needs.",
    );
    fs.copyFileSync(
      path.join(SOURCE_DIR, "data", "config.default.json"),
      path.join(CWD, "config.json"),
    );
  }

  if (!fs.existsSync(path.join(CWD, "about.md"))) {
    warn(
      "Could not find a about.md. Created a bootstrap about.md in your current working directory. Customize it to your needs.",
    );
    fs.copyFileSync(
      path.join(SOURCE_DIR, "data", "about.md"),
      path.join(CWD, "about.md"),
    );
  }

  if (!fs.existsSync(path.join(CWD, "custom.css"))) {
    warn("Created a bootstrap custom.css in your current working directory.");
    fs.copyFileSync(
      path.join(SOURCE_DIR, "src", "styles", "custom.css"),
      path.join(CWD, "custom.css"),
    );
  }
}

// Calculate current hash of package.json
function calculateHash(file) {
  const fileBuffer = fs.readFileSync(file);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
}

const CURRENT_HASH = calculateHash(path.join(CWD, "package.json"));

// Check if builder dir needs to be recreated
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
  if (fs.existsSync(path.join(BUILDER_DIR, "data", "radar"))) {
    fs.rmSync(path.join(BUILDER_DIR, "data", "radar"), { recursive: true });
  }
  fs.cpSync(path.join(CWD, "radar"), path.join(BUILDER_DIR, "data", "radar"), {
    recursive: true,
  });
  fs.cpSync(path.join(CWD, "public"), path.join(BUILDER_DIR, "public"), {
    recursive: true,
  });
  fs.copyFileSync(
    path.join(CWD, "about.md"),
    path.join(BUILDER_DIR, "data", "about.md"),
  );
  fs.copyFileSync(
    path.join(CWD, "custom.css"),
    path.join(BUILDER_DIR, "src", "styles", "custom.css"),
  );
  fs.copyFileSync(
    path.join(CWD, "config.json"),
    path.join(BUILDER_DIR, "data", "config.json"),
  );
  process.chdir(BUILDER_DIR);
} catch (e) {
  error(e.message);
}

info("Building data");
execSync("npm run build:data", { stdio: "inherit" });

if (PARAMETER === "serve") {
  info("Starting techradar");
  execSync("npm run dev", { stdio: "inherit" });
}

if (PARAMETER === "build") {
  info("Building techradar");
  execSync("npm run build", { stdio: "inherit" });
  if (fs.existsSync(path.join(CWD, "build"))) {
    fs.rmSync(path.join(CWD, "build"), { recursive: true });
  }
  info(`Copying techradar to ${path.join(CWD, "build")}`);
  fs.renameSync(path.join(BUILDER_DIR, "out"), path.join(CWD, "build"));
}

if (PARAMETER === "dev") {
  info("Developing techradar");

  // Let's spawn this a child process, so that it doesn't block our main thread
  // The process is killed when the main thread is killed
  spawn("npm", ["run", "dev"], { stdio: "inherit", detached: false });

  // Watch certain files for changes
  // These variables could be used in the rest of this file as well,
  // but we want to focus on additive changes, so that it's easy to pull the latest updates from origin.
  const RADAR_CONTENT_DIR_SOURCE = path.join(CWD, "radar");
  const RADAR_CONTENT_DIR_BUILD = path.join(BUILDER_DIR, "data", "radar");

  const ABOUT_FILE_SOURCE = path.join(CWD, "about.md");
  const ABOUT_FILE_BUILD = path.join(BUILDER_DIR, "data", "about.md");

  const CUSTOMCSS_FILE_SOURCE = path.join(CWD, "custom.css");
  const CUSTOMCSS_FILE_BUILD = path.join(
    BUILDER_DIR,
    "src",
    "styles",
    "custom.css",
  );

  const CONFIG_FILE_SOURCE = path.join(CWD, "config.json");
  const CONFIG_FILE_BUILD = path.join(BUILDER_DIR, "data", "config.json");

  // Initialize watching of source directory and files with chokidar
  const assetsToWatch = [
    RADAR_CONTENT_DIR_SOURCE,
    ABOUT_FILE_SOURCE,
    CUSTOMCSS_FILE_SOURCE,
    CONFIG_FILE_SOURCE,
  ];
  const watcher = chokidar.watch(assetsToWatch, {
    ignored: /^\./, // Ignore dotfiles
    persistent: true,
    ignoreInitial: true,
    depth: 5,
  });

  // Rebuild the data when a change is detected
  // Debounce the function to avoid multiple rebuilds at the same time
  const rebuildData = debounce(({ path }) => {
    try {
      // First copy over the changed file to the build directory
      switch (path) {
        case ABOUT_FILE_SOURCE:
          info("about.md changed");
          fs.copyFileSync(ABOUT_FILE_SOURCE, ABOUT_FILE_BUILD);
          break;
        case CUSTOMCSS_FILE_SOURCE:
          info("custom.css changed");
          fs.copyFileSync(CUSTOMCSS_FILE_SOURCE, CUSTOMCSS_FILE_BUILD);
          break;
        case CONFIG_FILE_SOURCE:
          info("config.json changed");
          fs.copyFileSync(CONFIG_FILE_SOURCE, CONFIG_FILE_BUILD);
          break;
        default:
          if (path.startsWith(RADAR_CONTENT_DIR_SOURCE)) {
            const file = path.replace(RADAR_CONTENT_DIR_SOURCE, "");
            info(`${file} changed, going to rebuild the data.`);
            if (fs.existsSync(RADAR_CONTENT_DIR_BUILD)) {
              fs.rmSync(RADAR_CONTENT_DIR_BUILD, { recursive: true });
            }
            fs.cpSync(RADAR_CONTENT_DIR_SOURCE, RADAR_CONTENT_DIR_BUILD, {
              recursive: true,
            });
          } else {
            info("Unknown file changed");
          }
      }

      // Now rebuild the json files, so that the next.js server can pick up the changes
      execSync("npm run build:data", { stdio: "inherit" });
    } catch (error) {
      error("Unable to rebuild data. Please restart the server.", error);
    }
  }, 1000);

  // Event handlers
  watcher
    .on("add", (path) => rebuildData({ path }))
    .on("change", (path) => rebuildData({ path }))
    .on("unlink", (path) => rebuildData({ path }));
}
