import { emptyDir } from 'fs-extra';
import { distPath } from '../common/file';

var distDir = distPath();


emptyDir(distDir, (err) => {
  if (!err) {
    console.log('Cleaned dist dir', distDir);
  } else {
    console.error(err);
  }
});
