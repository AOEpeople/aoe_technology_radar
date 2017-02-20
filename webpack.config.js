var path = require('path');

module.exports = {
  entry: {
    bundle: './js/client.js',
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
           path.resolve(__dirname, "js"),
         ],

         loader: "babel-loader",
       },
    ],
  },
}
