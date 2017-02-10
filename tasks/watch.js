import { watch } from 'fs';
import { exec } from 'child_process';

import {
  stylesPath,
  assetsPath,
  jsPath,
  radarPath,
  staticPath,
  templatesPath,
} from './file';

const watchBuild = (name) => (eventType, fileName) => {
  exec(`npm run build:${name}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  })
}

const options = {
  recursive: true,
}

watch(stylesPath(), options, watchBuild('css'));
watch(jsPath(), options, watchBuild('js'));
watch(assetsPath(), options, watchBuild('assets'));
watch(radarPath(), options, watchBuild('pages'));
watch(staticPath(), options, watchBuild('pages'));
watch(templatesPath(), options, watchBuild('pages'));

console.log('Watching for changes, press CTRL+C to quit');
