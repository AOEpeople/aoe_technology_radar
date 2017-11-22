---
title:      "Pin external dependencies"
ring:       adopt
quadrant:   methods-and-patterns
---

A lot of applications have dependencies on other modules or components. We have
used different approaches regarding how and when these dependencies are resolved
and have agreed on using a method we call "Pin (External) dependencies".

This is especially relevant for script languages, where the dependency
management references the code and not immutable prebuild binaries - and
therefore resolves the complete transient dependencies on the fly.

Most of these package- or dependency management solutions support two artefacts:

* a semantic dependency definition. This defines the compatible versions of the
  required dependencies. (Composer: composer.json / NPM: package.json)
* a lock file defining the exact revisions of the dependencies and the transient
  dependencies (dependencies of dependencies). This is created after running the
  tool. (Composer: composer.lock / NPM: npm-shrinkwrap.json / yarn: yarn.lock).

We suggest the following:

* Keep the dependency definition AND the lock file in version control. This
  ensures that chained dependencies are also locked and you have changes of that
  file visible in your version control commit history. This helps finding issues
  or bugs that might relate to unintended updates in external modules or
  transient dependencies.
* Build Step: The application build step should use the the pinned versions
  (with the help of the lock file) to ensure that the same revisions of the
  dependent packages are used.
* It's also suggested to use local or central caches for the retrieval of
  packages. (E.g.
  [artifactory as composer and npm cache](/platforms-and-aoe-services/artifactory.html))

For updating of dependencies define a process in the team. This can either be
done on the dev-system or in a seperate automated CI job - both resulting in
updated dependency definitions in the applications VCS.
