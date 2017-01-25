var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const cssLoader = ExtractTextPlugin.extract({
  loader: "css-loader"
});

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
         loader: cssLoader,
       },
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ],
}
