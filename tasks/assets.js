import { copy } from 'fs-extra';
import {
  assetsPath,
  distPath,
} from './file';

copy(assetsPath(), distPath('assets'), (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("copied assets");
});
