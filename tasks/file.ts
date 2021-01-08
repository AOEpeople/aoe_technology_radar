import { outputFile } from 'fs-extra';
import path from 'path';
import { walk } from 'walk';

export const relativePath = (...relativePath: string[]): string => (
  // path.resolve(__dirname, '..', ...relativePath)
  path.resolve(...relativePath)
);

export const radarPath = (...pathInSrc: string[]) => (
  relativePath('radar', ...pathInSrc)
);

export const stylesPath = (...pathInSrc: string[]) => (
  relativePath('styles', ...pathInSrc)
);

export const assetsPath = (...pathInSrc: string[]) => (
  relativePath('assets', ...pathInSrc)
);

export const faviconPath = (...pathInSrc: string[]) => (
    relativePath('assets/favicon.ico', ...pathInSrc)
);

export const jsPath = (...pathInSrc: string[]) => (
  relativePath('js', ...pathInSrc)
);

export const distPath = (...pathInDist: string[]) => (
  relativePath('src', ...pathInDist)
);

export const getAllMarkdownFiles = (folder: string) => (
  getAllFiles(folder, isMarkdownFile)
);

const getAllFiles = (folder: string, predicate: (s: string) => boolean): Promise<string[]> => (
  new Promise((resolve, reject) => {
    const walker = walk(folder, { followLinks: false });
    const files: string[] = [];

    walker.on("file", (root, fileStat, next) => {
      if (predicate(fileStat.name)) {
        files.push(path.resolve(root, fileStat.name));
      }
      next();
    });

    walker.on("errors", (root, nodeStatsArray, next) => {
      nodeStatsArray.forEach(function (n) {
        console.error("[ERROR] " + n.name)
        if (n.error) {
          console.error(n.error.message || (n.error.code + ": " + n.error.path));
        }
      });
      next();
    });

    walker.on("end", () => {
      resolve(files.sort());
    });
  })
);

const isMarkdownFile = (name: string) => name.match(/\.md$/) !== null;

export const save = (data: string | Buffer | DataView, fileName: string) => outputFile(distPath(fileName), data);
