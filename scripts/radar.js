import { walk } from 'walk';
import fs, { readFile } from 'fs-extra';
import path from 'path';
import frontmatter from 'front-matter';
import marked from 'marked';
import { srcPath } from './file';

export const createRadar = async (tree) => {
  const fileNames = await getAllMarkdownFiles();
  const revisions = await createRevisionsFromFiles(fileNames);
  const quadrants = createQuadrants(revisions);
  return quadrants;
};

const getAllMarkdownFiles = () => (
  new Promise((resolve, reject) => {
    const walker = walk(srcPath(), { followLinks: false });
    const files = [];

    walker.on("file", (root, fileStat, next) => {
      if (isMarkdownFile(fileStat.name)) {
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
      resolve(files.sort().reverse());
    });
  })
);

const isMarkdownFile = (name) => name.match(/\.md$/);

const createRevisionsFromFiles = (fileNames) => (
  Promise.all(fileNames.map((fileName) => {
    return new Promise((resolve, reject) => {
      readFile(fileName, 'utf8', (err, data) => {
        if(err) {
          reject(err);
        } else {
          const fm = frontmatter(data);
          resolve({
            ...itemInfoFromFilename(fileName),
            fileName,
            attributes: fm.attributes,
            body: fm.body,
          });
        }
      });
    })
  }))
)

const itemInfoFromFilename = (fileName) => {
  const [
    version,
    quadrant,
    nameWithSuffix,
  ] = fileName.split('/').slice(-3);
  return {
    name: nameWithSuffix.substr(0, nameWithSuffix.length - 3),
    version,
    quadrant,
  }
};

const createQuadrants = (revisions) => (
  revisions.reduce((quadrants, revision) => {
    return {
      ...quadrants,
      [revision.quadrant]: addRevisionToQuadrant(quadrants[revision.quadrant], revision),
    };
  }, {})
);

const addRevisionToQuadrant = (quadrant = {}, revision) => ({
  ...quadrant,
  [revision.name]: addRevisionToItem(quadrant[revision.name], revision),
});

const addRevisionToItem = (item = {
  attributes: {},
  revisions: [],
}, revision) => {
  const {
    name,
    quadrant,
    fileName,
    ...rest,
  } = revision;
  return {
    attributes: {
      ...item.attributes,
      ...revision.attributes,
    },
    revisions: item.revisions.concat(rest),
  };
};
