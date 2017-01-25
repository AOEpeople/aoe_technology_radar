var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let cssLoader = ExtractTextPlugin.extract({
  fallbackLoader: "style-loader",
  loader: [
    "css-loader",
    "postcss-loader",
  ]
});

console.log('------------------------------');
console.log(cssLoader);
console.log('------------------------------');

// cssLoader = 'css-loader';

module.exports = {
  entry: {
    bundle: './js/radar.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
         test: /\.js?$/,
         include: [
           path.resolve(__dirname, "js")
         ],

         loader: "babel-loader",
       },
       {
         test: /\.css?$/,
         include: [
           path.resolve(__dirname, "styles")
         ],
         use: [
           {
             loader: cssLoader,
           }
         ],
       },
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ],
}
