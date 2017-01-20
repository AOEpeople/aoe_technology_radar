var fs = require('fs-extra');
var frontmatter = require('front-matter');
var marked = require('marked');
var file = require('./file');

var fileName = file.path('radar/v1/tools/grunt.md');

fs.readFile(fileName, 'utf8', function(err, data) {
  if (err) throw err;

  var item = frontmatter(data);

  var html = marked(item.body);

  console.log(item.attributes);
  console.log(html);

  fs.outputFile(file.distDir() + '/test.html', html, function (err) {
    console.log(err) // => null
  })
});
