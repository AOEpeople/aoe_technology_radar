import { watch } from 'fs';
import { exec } from 'child_process';
import liveServer from 'live-server';

import {
  stylesPath,
  assetsPath,
  jsPath,
  radarPath,
  staticPath,
  templatesPath,
  distPath,
} from './file';


const runBuild = (name) => (
  exec(`npm run build:${name}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  })
);

const watchBuild = (name) => (eventType, fileName) => runBuild(name);

const options = {
  recursive: true,
}

runBuild('all');

watch(stylesPath(), options, watchBuild('css'));
watch(jsPath(), options, watchBuild('js'));
watch(assetsPath(), options, watchBuild('assets'));
watch(radarPath(), options, watchBuild('pages'));
watch(staticPath(), options, watchBuild('pages'));
watch(templatesPath(), options, watchBuild('pages'));

var params = {
    root: distPath(),
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
};
liveServer.start(params);
