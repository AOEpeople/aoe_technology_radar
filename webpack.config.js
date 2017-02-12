var path = require('path');

module.exports = {
  entry: {
    bundle: './js/radar.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
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
    ],
  },
}
