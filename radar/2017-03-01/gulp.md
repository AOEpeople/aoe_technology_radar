---
title:      "Gulp"
ring:       adopt
quadrant:   tools
---

Gulp is a javascript task runner much like Grunt. The tasks are written in javascript code.

It is a tool that helps you automate numerous tasks surrounding web development. A typical use is to configure preprocessors for Sass, to compile CSS or to optimize CSS, Javascript and Images.

With Gulp and its many plugins you can also do stuff such as start a web server and reload the browser if changes happen.

To get started you need to install Gulp on your machine via npm.

```javascript
npm install gulp -g

```


You also need it locally in your project, so you have to install it as a dependency in your project .

```javascript
npm install gulp --save-dev

```

You can split your tasks into various smaller sub-tasks and even split it up into smaller files.

A basic Gulp task can look like this:

```javascript
const gulp = require('gulp');
// Requires the gulp-sass plugin
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss') // tell gulp where your source files are
    .pipe(sass()) // Converts sass into css with the help of a gulp plugin called gulp-sass
    .pipe(autoprefixer({browsers: ['last 2 versions']})) // auto prefixes the css for the last 2 versions of browser, like ie9 specific css
    .pipe(cssnano()) // minify the css
    .pipe(gulp.dest('app/css')) // tell gulp where to put the converted file. this is the first time where a file is written
});

```

you can now run this task simply by executing the following command in your terminal:

```javascript
gulp sass
```
