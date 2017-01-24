import fs, { readFile, outputFile } from 'fs-extra';
import path from 'path';
import frontmatter from 'front-matter';
import marked from 'marked';
import {
  radarPath,
  distPath,
  getAllMarkdownFiles,
} from './file';
import { item as itemTemplate } from './template';

export const createRadar = async (tree) => {
  const fileNames = (await getAllMarkdownFiles(radarPath())).reverse();
  const revisions = await createRevisionsFromFiles(fileNames);
  const quadrants = createQuadrants(revisions);
  return quadrants;
};

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
            body: marked(fm.body),
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


export const outputRadar = (radar) => {
  return Promise.all(
    Object.entries(radar).map(([quadrantName, quadrant]) => (
      Object.entries(quadrant).map(([itemName, item]) => (
        new Promise((resolve, reject) => {
          outputFile(distPath(quadrantName, `${itemName}.html`), itemTemplate({
            quadrantName,
            item,
          }), (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          })
        })
      ))
    ))
  );
};
