const config = require("./data/config.json");
const basePath = process.env.BASE_PATH || config.basePath || "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: basePath && basePath !== "/" ? basePath : "",
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
