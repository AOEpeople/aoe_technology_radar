import { outputFile } from 'fs-extra';
import pug from 'pug';
import frontmatter from 'front-matter';
import marked from 'marked';
import {
  staticPath,
  distPath,
  getAllPugFiles,
} from './file';
import {
  vars,
} from './template';

export const createStatic = async (radar) => {
  const paths = await getAllPugFiles(staticPath());
  const fileNames = getPlainFileNames(paths);
  return renderStaticPages(radar, fileNames);
  return fileNames;
};

const getPlainFileNames = (paths) => (
  paths.map((fileName) => {
    const [ nameWithSuffix ] = fileName.split('/').slice(-1);
    return nameWithSuffix.substr(0, nameWithSuffix.length - 4);
  })
)

const renderStaticPages = (radar, fileNames) => (
  Promise.all(fileNames.map((name) => (
    new Promise((resolve, reject) => (
      outputFile(distPath(`${name}.html`), pug.renderFile(staticPath(`${name}.pug`), vars({
        radar,
      })), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    ))
  )))
);
