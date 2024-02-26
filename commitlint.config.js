module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "sec",
        "fix",
        "bug",
        "test",
        "refactor",
        "rework",
        "ops",
        "ci",
        "cd",
        "build",
        "doc",
        "perf",
        "chore",
        "update",
      ],
    ],
  },
};
