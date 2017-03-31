---
title:      "Grunt"
ring:       hold
quadrant:   tools
---


Grunt is a JavaScript task runner that automates repetitive tasks. While Grunt served us well for a good amount of projects,
other alternatives such as [Gulp](http://gulpjs.com/) emerged in the meantime and proved to be a better pick for the
majority of our teams.

We have two main reasons for discarding Grunt in favor of other tools:

### Speed
If a decent amount of tasks is reached, Grunt is known to run slower than other tools, because it heavily relies on I/O operations and
always stores the result of one task as files on the disk.

### Configuration
On large projects where a lot of automation is required, it can get very tedious to maintain complex and parallel running tasks.
The grunt configuration files sometimes simply don´t gave us the flexibility that we needed.

Currently our preferred way to go is either simply use [NPM scripts](https://docs.npmjs.com/misc/scripts) or rely on [Webpack loaders](https://webpack.js.org/concepts/loaders/) for file preprocessing. For non-webpack projects we also utilize Gulp.



