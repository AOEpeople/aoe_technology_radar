module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? [
          "postcss-nested",
          [
            "postcss-preset-env",
            {
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
              features: {
                "custom-properties": false,
              },
            },
          ],
        ]
      : [
          // No transformations in development
          // because it won't affect turbo
        ],
};
