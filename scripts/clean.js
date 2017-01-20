var fs = require('fs-extra');
var async = require('async');
var file = require('./file');

var distDir = file.distDir();

console.log('<<< start cleaning dist dir: ', distDir);

async.series([
    function(callback) {
      fs.ensureDir(distDir, callback);
    },
    function(callback) {
      fs.emptyDir(distDir, callback);
    }
  ],
  function(err, results) {
    if (!err) {
      console.log('done cleaning dist dir >>>');
    } else {
      console.error(err);
    }
  }
);
