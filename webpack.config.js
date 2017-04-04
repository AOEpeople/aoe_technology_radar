var path = require('path');

module.exports = {
  entry: {
    bundle: './js/client.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'techradar/assets/js/[name].js',
  },
  module: {
    rules: [
      {
         test: /\.js?$/,
         include: [
           path.resolve(__dirname, "js"),
           path.resolve(__dirname, "common"),
         ],

         loader: "babel-loader",
       },
    ],
  },
}
