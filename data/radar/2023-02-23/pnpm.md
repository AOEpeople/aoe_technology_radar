---
title: "pnpm"
ring: assess
quadrant: tools
tags: [coding, frontend]
---

[pnpm](https://pnpm.io/motivation) is an alternative tool to manage your frontend dependencies. Unlike yarn 1 it manages
all packages in a central place and creates symbolic links only inside the npm_modules of a project. This results in
considerably less usage of disk space and reduces build-times, when a package is already available.

Additionally, a cache server can be setup and used during pipeline builds to decrease network traffic and build times.
