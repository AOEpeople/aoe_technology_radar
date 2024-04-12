---
title: "Monorepo"
ring: trial
quadrant: methods-and-patterns
featured: true
tags: [coding]
---

A monorepo is a single repository containing multiple projects and shared libraries with their relationships.

At AOE, we are using a monorepo that is home to both our React and Next.js based frontends and
our [Go](/languages-and-frameworks/go-lang.html) / [Flamingo](/languages-and-frameworks/flamingo.html) based backends,
as well as shared libraries we use in all of our projects.

The main benefits in that approach are:

- Breaking changes are directly detected and must be fixed within the same pull request on all projects
- No conflicting versions of dependencies
- Same CI Setup for everything and no overhead on new projects
- Tool consistency over all projects

If you take the monorepo approach, of course you want to have a tool to manage it. There are a lot of them on the market
and at AOE we have decided to go with [Nx](/tools/nx.html).
