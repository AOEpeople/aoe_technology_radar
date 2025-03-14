#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const crypto = require("crypto");

const CWD = process.cwd();
const BUILDER_DIR = path.join(CWD, ".techradar");
const SOURCE_DIR = path.join(CWD, "node_modules", "aoe_technology_radar");
const HASH_FILE = path.join(BUILDER_DIR, "hash");

const PARAMETER = process.argv[2]; // "build" or "serve"
const FLAGS = process.argv.slice(3).join(" ");

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
