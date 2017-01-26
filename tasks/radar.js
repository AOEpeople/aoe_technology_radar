import fs, { readFile, outputFile } from 'fs-extra';
import path from 'path';
import frontmatter from 'front-matter';
import marked from 'marked';
import {
  radarPath,
  distPath,
  getAllMarkdownFiles,
} from './file';
import {
  item as itemTemplate,
  quadrant as quadrantTemplate,
  vars,
} from './template';

export const createRadar = async (tree) => {
  const fileNames = (await getAllMarkdownFiles(radarPath()));
  const revisions = await createRevisionsFromFiles(fileNames);
  const allVersions = getAllVersions(revisions);
  const quadrants = createQuadrants(revisions);
  const quadrantsWithIsNewFlag = flagWithIsNew(quadrants, allVersions);

  return quadrantsWithIsNewFlag;
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

const getAllVersions = (revisions) => (
  revisions.reduce((allVersions, { version }) => {
    if(!allVersions.includes(version)) {
      return [...allVersions, version];
    }
    return allVersions;
  }, []).sort()
)

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
  attributes: {
    isFeatured: true,
  },
  revisions: [],
}, revision) => {
  const {
    name,
    quadrant,
    fileName,
    ...rest,
  } = revision;
  let newItem = {
    ...item,
    attributes: {
      ...item.attributes,
      ...revision.attributes,
    },
  };

  if (revisionCreatesNewHistoryEntry(revision)) {
    newItem = {
      ...newItem,
      revisions: [
        rest,
        ...newItem.revisions,
      ],
    }
  }

  return newItem;
};

const revisionCreatesNewHistoryEntry = (revision) => {
  return revision.body.trim() !== '' ||
         typeof revision.attributes.ring !== 'undefined';
};

export const outputRadar = (radar) => {
  return Promise.all(
    Object.entries(radar).map(async ([quadrantName, quadrant]) => {
      await outputQuadrantPage(quadrantName, quadrant);
      Object.entries(quadrant).map(([itemName, item]) => (
        new Promise((resolve, reject) => {
          outputFile(distPath(quadrantName, `${itemName}.html`), itemTemplate(vars({
            quadrantName,
            item,
          })), (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          })
        })
      ))
    })
  );
};

const outputQuadrantPage = (quadrantName, quadrant) => (
  new Promise((resolve, reject) => {
    outputFile(distPath(`${quadrantName}.html`), quadrantTemplate(vars({
      quadrantName,
      quadrant,
    })), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
)

const flagWithIsNew = (radar, allVersions) => (
  Object.entries(radar).reduce((newRadar, [quadrantName, quadrant]) => ({
    ...newRadar,
    [quadrantName]: Object.entries(quadrant).reduce((newItem, [itemName, item]) => ({
      ...newItem,
      [itemName]: {
        ...item,
        isNew: isNewItem(item, allVersions),
      },
    }), {}),
  }), {})
);

const isNewItem = (item, allVersions) => {
  return item.revisions[0].version === allVersions[allVersions.length-1]
}
