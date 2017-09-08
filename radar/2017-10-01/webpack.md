---
title:      "Webpack"
ring:       trial
quadrant:   tools

---
[Webpack](https://webpack.js.org/) is a web bundler for JavaScript applications. Instead of writing scripts to build and bundle your app like you would with [Gulp](/tools/gulp.html), you just define what files you want to load into your bundle.

In the following example, we define that JavaScript files should be handled by babel-loader, excluding the files from node_modules. The logic behind the process comes from the [loader](https://webpack.js.org/concepts/loaders/). You can find the right loader in [npm](https://www.npmjs.com/search?q=loader%20webpack&page=1&ranking=optimal).

```
{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
}
```

On top of that you can use [plugins](https://webpack.js.org/plugins/) to optimize your bundle like uglifying your code or put your common libraries in a separate file.

Under the hood, you've got nice features such as:

-   [tree shaking](https://webpack.js.org/guides/tree-shaking/) to just bundle the features from a library you need
-   [chunk splitting](https://webpack.js.org/guides/code-splitting/) to split your code to manage the load prioritization

The configuration is simple and there is excellent and extensive [documentation](https://webpack.js.org/configuration/).
