---
title:      "PostCSS"
ring:       adopt
quadrant:   languages-and-frameworks

---

PostCSS is a tool for transforming stylesheets with JavaScript plugins. It comes with a parser that reads your CSS file into an AST, pipes it through the loaded plugins and finally
stringifies it back into a (transformed) CSS output file.

We at AOE love PostCSS because it gives us the power to use [CSS Modules](https://github.com/css-modules/css-modules), which finally ends the curse of global CSS.

It also has a huge list of more than 350 other [available plugins](http://postcss.parts/).
Sure, not all of them are useful, but the sheer number of plugins shows how easy it is to write your own plugin for it.
In fact, it´s just a matter of writing a single JS function.

Finally, PostCSS is very fast and easy to setup because it runs 100% in JavaScript.
Compared to [SASS](/languages-and-frameworks/sass.html) as a preprocessor, it feels much more powerful but at the same time less bloated with superfluous functionality because everything comes in its own little plugin
