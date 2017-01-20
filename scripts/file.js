var path = require('path');

module.exports = {
  path: function(relativePath) {
    return path.resolve(__dirname, '..', relativePath)
  },
  distDir: function() {
    return this.path('dist');
  }
};
