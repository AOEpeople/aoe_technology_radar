import path from 'path';
import { walk } from 'walk';

export const relativePath = (...relativePath) => (
  path.resolve(__dirname, '..', ...relativePath)
);

export const radarPath = (...pathInSrc) => (
  relativePath('radar', ...pathInSrc)
);

export const staticPath = (...pathInSrc) => (
  relativePath('static-pages', ...pathInSrc)
);

export const distPath = (...pathInDist) => (
  relativePath('dist', ...pathInDist)
);

export const getAllMarkdownFiles = (folder) => (
  getAllFiles(folder, isMarkdownFile)
);

export const getAllPugFiles = (folder) => (
  getAllFiles(folder, isPugFile)
);

const getAllFiles = (folder, predicate) => (
  new Promise((resolve, reject) => {
    const walker = walk(folder, { followLinks: false });
    const files = [];

    walker.on("file", (root, fileStat, next) => {
      if (predicate(fileStat.name)) {
        files.push(path.resolve(root, fileStat.name));
      }
      next();
    });

    walker.on("errors", (root, nodeStatsArray, next) => {
      nodeStatsArray.forEach(function (n) {
        console.error("[ERROR] " + n.name)
        console.error(n.error.message || (n.error.code + ": " + n.error.path));
      });
      next();
    });

    walker.on("end", () => {
      resolve(files.sort());
    });
  })
);

const isMarkdownFile = (name) => name.match(/\.md$/);

const isPugFile = (name) => name.match(/\.pug$/);
