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

const PARAMETER = process.argv[2]; // "dev", "build" or "serve"
const FLAGS = process.argv.slice(3).join(" ");

// We need this mapping on several places, so let's maintain it centrally
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
  if (!fs.existsSync(fileMapping["radar-dir"].buildSource)) {
    warn(
      "Could not find radar directory. Created a bootstrap radar directory in your current working directory. Feel free to customize it.",
    );
    fs.cpSync(
      fileMapping["radar-dir"].bootstrappingSource,
      fileMapping["radar-dir"].buildSource,
      {
        recursive: true,
      },
    );
  }

  if (!fs.existsSync(fileMapping["public-dir"].buildSource)) {
    warn(
      "Could not find public directory. Created a public radar directory in your current working directory.",
    );
    fs.cpSync(
      fileMapping["public-dir"].bootstrappingSource,
      fileMapping["public-dir"].buildSource,
      {
        recursive: true,
      },
    );
  }

  if (!fs.existsSync(fileMapping["config-file"].buildSource)) {
    warn(
      "Could not find a config.json. Created a bootstrap config.json in your current working directory. Customize it to your needs.",
    );
    fs.copyFileSync(
      fileMapping["config-file"].bootstrappingSource,
      fileMapping["config-file"].buildSource,
    );
  }

  if (!fs.existsSync(fileMapping["about-file"].buildSource)) {
    warn(
      "Could not find a about.md. Created a bootstrap about.md in your current working directory. Customize it to your needs.",
    );
    fs.copyFileSync(
      fileMapping["about-file"].bootstrappingSource,
      fileMapping["about-file"].buildSource,
    );
  }

  if (!fs.existsSync(fileMapping["customcss-file"].buildSource)) {
    warn("Created a bootstrap custom.css in your current working directory.");
    fs.copyFileSync(
      fileMapping["customcss-file"].bootstrappingSource,
      fileMapping["customcss-file"].buildSource,
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
  if (fs.existsSync(fileMapping["radar-dir"].buildTarget)) {
    fs.rmSync(fileMapping["radar-dir"].buildTarget, { recursive: true });
  }
  fs.cpSync(
    fileMapping["radar-dir"].buildSource,
    fileMapping["radar-dir"].buildTarget,
    {
      recursive: true,
    },
  );
  fs.cpSync(
    fileMapping["public-dir"].buildSource,
    fileMapping["public-dir"].buildTarget,
    {
      recursive: true,
    },
  );
  fs.copyFileSync(
    fileMapping["about-file"].buildSource,
    fileMapping["about-file"].buildTarget,
  );
  fs.copyFileSync(
    fileMapping["customcss-file"].buildSource,
    fileMapping["customcss-file"].buildTarget,
  );
  fs.copyFileSync(
    fileMapping["config-file"].buildSource,
    fileMapping["config-file"].buildTarget,
  );
  process.chdir(BUILDER_DIR);
} catch (e) {
  error(e.message);
}

info("Building data");
execSync(`npm run build:data -- ${FLAGS}`, {
  stdio: "inherit",
});

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

  // Let's spawn a child process to run the dev server, so that it doesn't block our main thread
  // The process has to be killed whenever the main thread is killed
  const NODEDEV_CHILD_PROCESS = spawn("npm", ["run", "dev"], {
    stdio: "inherit",
    detached: false,
  });
  process.on("exit", () => {
    NODEDEV_CHILD_PROCESS.kill();
  });
  // Initialize watching of source directory and files with chokidar
  const filesToWatch = Object.values(fileMapping).filter(
    (fileConfig) => fileConfig.rebuildOnChange && !fileConfig.isDirectory,
  );
  const dirsToWatch = Object.values(fileMapping).filter(
    (fileConfig) => fileConfig.rebuildOnChange && fileConfig.isDirectory,
  );

  const srcFilesToWatch = [...filesToWatch, ...dirsToWatch].map(
    (fileConfig) => fileConfig.buildSource,
  );
  const watcher = chokidar.watch(srcFilesToWatch, {
    ignored: /^\./, // Ignore dotfiles
    persistent: true,
    ignoreInitial: true,
    depth: 5,
  });

  // Rebuild the data when a change is detected
  // Debounce the function to avoid multiple rebuilds at the same time
  const rebuildData = debounce(({ path: changedPath }) => {
    try {
      const fileConfig = Object.values(fileMapping).find(
        (fileConfig) =>
          fileConfig.buildSource === changedPath && !fileConfig.isDirectory,
      );
      const dirConfig = Object.values(fileMapping).find(
        (fileConfig) =>
          changedPath.startsWith(fileConfig.buildSource) &&
          fileConfig.isDirectory,
      );

      // First copy over the changed file to the build directory

      // Is it a file that has been changed?
      if (fileConfig) {
        const relativeBuildSrc = `./${path.relative(CWD, changedPath)}`;

        info(`${relativeBuildSrc} changed`);
        fs.copyFileSync(fileConfig.buildSource, fileConfig.buildTarget);
      } else if (dirConfig) {
        // Is it a directory that has been changed?
        const relativeBuildSrc = `./${path.relative(CWD, changedPath)}`;
        const relativeTargetPath = `./${path.relative(CWD, dirConfig.buildTarget)}`;
        info(
          `${relativeBuildSrc} changed, going to update all files in ${relativeTargetPath}.`,
        );
        if (fs.existsSync(dirConfig.buildTarget)) {
          fs.rmSync(dirConfig.buildTarget, { recursive: true });
        }
        fs.cpSync(dirConfig.buildSource, dirConfig.buildTarget, {
          recursive: true,
        });
      } else {
        info(
          "Unknown file changed. Won't be copied.",
          `./${path.relative(CWD, changedPath)}`,
        );
      }

      // Then rebuild the json files, so that the next.js dev-server picks up the changes
      execSync("npm run build:data", { stdio: "inherit" });
    } catch (e) {
      error("Unable to reload updated data. Please restart the server.", e);
    }
  }, 1000);

  // Event handlers
  watcher
    .on("add", (path) => rebuildData({ path }))
    .on("change", (path) => rebuildData({ path }))
    .on("unlink", (path) => rebuildData({ path }));
}
