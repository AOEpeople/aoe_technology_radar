---
title:      "NPM"
ring:       adopt
quadrant:   tools

---
[NPM](https://www.npmjs.com/) is one of, if not the most, popular package manager for JavaScript. Because of the big community, you can find nearly every dependency in npm.

Instead of other package managers such as [bower](/tools/bower.html), you have to write your packages as [modules](https://en.wikipedia.org/wiki/CommonJS). This unifies the way you have to use, test and, of course, understand dependencies.

NPM creates a tree for your dependencies and their nesting dependencies. Because of this, you don't need to handle version conflicts, since every dependency uses there own version of e.g. [webpack](/tools/webpack.html).

With [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) you have a robust tool to lock down and manage the versions of your dependencies - following the [Pin (external) dependencies](/methods-and-patterns/pin-external-dependencies.html) approach.

For each package you have to classify your dependencies:

-   dependencies are needed for use without the need of pre compiling, e.g. [lodash](https://lodash.com/)
-   devDependencies are needed for development only, e.g. testing frameworks or pre compiler e.g. [babel](/languages-and-frameworks/babel.html)
-   peerDependencies you have to provide for using the package

With [scripts](https://docs.npmjs.com/misc/scripts) you get support for the most common build lifecycle steps, e.g. build, start, test ...

Other useful features:

-   mirror support for your own repository (e.g. [artifactory](/platforms-and-aoe-services/artifactory.html))
-   can be used for server and client JavaScript development (see [node.js](/languages-and-frameworks/node-js.html) )
