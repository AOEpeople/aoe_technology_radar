import { emptyDir } from 'fs-extra';
import { distPath } from './file';

var distDir = distPath();

console.log('<<< start cleaning dist dir: ', distDir);

emptyDir(distDir, (err) => {
  if (!err) {
    console.log('done cleaning dist dir >>>');
  } else {
    console.error(err);
  }
});
