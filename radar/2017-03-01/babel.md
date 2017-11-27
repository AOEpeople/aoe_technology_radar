---
title:      "Babel"
ring:       trial
quadrant:   languages-and-frameworks

---

[Babel](https://babeljs.io/) gives you the possibility to use the latest features from JavaScript ([ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)) in the browser of your choice.

Without Babel you had to use the feature set of your oldest browser or use feature detections such as [modernizr](https://modernizr.com/) or write polyfills on your own.

In general, Babel is split in 2 ways to bring you the new goodies you want.

1. New syntax will be compiled to old EcmaScript 5 code e.g.:

   * [arrow-functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
   * [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
   * [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
   * [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
   * [...](https://babeljs.io/learn-es2015/)

2. New globals and functions are provided by [babel-polyfill](http://babeljs.io/docs/usage/polyfill/) e.g.:

   * [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
   * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
   * [...](https://github.com/zloirock/core-js#index)

The configuration is really simple due to the [plugin system](http://babeljs.io/docs/plugins/). You can choose which ECMAScript version and [stage presets](http://babeljs.io/docs/plugins/#presets) you want to use.

* for the latest ECMAScript version use [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/)
* for version 2015 only use [babel-preset-2015](https://babeljs.io/docs/plugins/preset-es2015/)

To know what you need you can practice ECMAScript 6 by doing it with [es6katas](http://es6katas.org/) and ask [caniuse](http://caniuse.com/).

If you are using [TypeScript](/languages-and-frameworks/typescript.html), Babel is not necessary since you already get the new features with TypeScript.