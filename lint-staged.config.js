module.exports = {
  "*.{json, md, yml, scss}": ["prettier --write"],
  "*.{js, ts, tsx}": [
    "eslint",
    "prettier --write",
    "react-scripts test --watchAll=false --findRelatedTests",
  ],
};
