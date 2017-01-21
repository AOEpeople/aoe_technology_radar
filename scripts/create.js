import {
  readFile,
  outputFile,
} from 'fs-extra';
import frontmatter from 'front-matter';
import marked from 'marked';
import waterfall from 'async/waterfall';
import {
  srcPath,
  distPath,
} from './file';
import {
  getTree,
  createRadar,
} from './radar';


(async () => {
  try {
    const tree = await getTree();
    // console.log(JSON.stringify(tree, null, 2));
    const radar = await createRadar(tree);
    console.log(JSON.stringify(radar, null, 2));
  } catch(e) {
    console.error('error:', e);
  }
})()

//
// const fileName = srcPath('v1/tools/grunt.md');
//
// console.log('<<< start creating files');
//
// waterfall([
//     (callback) => {
//       readFile(fileName, 'utf8', callback);
//     },
//     (data, callback) => {
//       const item = frontmatter(data);
//       const html = marked(item.body);
//
//       outputFile(distPath('test3.html'), html, callback);
//     }
//   ],
//   (err, results) => {
//     if (!err) {
//       console.log('done creating files >>>');
//     } else {
//       console.error(err);
//     }
//   }
// );
