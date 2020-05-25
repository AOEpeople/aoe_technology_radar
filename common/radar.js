import { readFile } from 'fs-extra';
import path from 'path';
import frontmatter from 'front-matter';
import marked from 'marked';
import hljs from 'highlight.js';
import { quadrants, rings } from './config';
import { radarPath, getAllMarkdownFiles } from './file';

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
});

export const createRadar = async tree => {
  const fileNames = await getAllMarkdownFiles(radarPath());
  const revisions = await createRevisionsFromFiles(fileNames);
  const allReleases = getAllReleases(revisions);
  const items = createItems(revisions);
  const flaggedItems = flagItem(items, allReleases);

  return {
    items: flaggedItems,
    releases: allReleases,
  };
};

const checkAttributes = (fileName, attributes) => {
  if (attributes.ring && !rings.includes(attributes.ring)) {
    throw new Error(`Error: ${fileName} has an illegal value for 'ring' - must be one of ${rings}`);
  }

  if (attributes.quadrant && !quadrants.includes(attributes.quadrant)) {
    throw new Error(`Error: ${fileName} has an illegal value for 'quadrant' - must be one of ${quadrants}`);
  }

  if (!attributes.quadrant) {
    const defaultQuadrant = quadrants[0];

    console.warn(`${fileName} missing 'quadrant', using default: ${defaultQuadrant}`);

    attributes.quadrant = defaultQuadrant;
  }

  if (!attributes.title) {
    attributes.title = path.basename(fileName);
  }
};

const createRevisionsFromFiles = fileNames =>
  Promise.all(
    fileNames.map(fileName => {
      return new Promise((resolve, reject) => {
        readFile(fileName, 'utf8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            const fm = frontmatter(data);
            // prepend subfolder to links
            fm.body = fm.body.replace(/\]\(\//g, '](/techradar/');

            // add target attribute to external links
            let html = marked(fm.body);
            html = html.replace(
              /a href="http/g,
              'a target="_blank" href="http',
            );

            checkAttributes(fileName, fm.attributes);
            resolve({
              ...itemInfoFromFilename(fileName),
              ...fm.attributes,
              fileName,
              body: html,
            });
          }
        });
      });
    }),
  );

const itemInfoFromFilename = fileName => {
  const [release, nameWithSuffix] = fileName.split(path.sep).slice(-2);
  return {
    name: nameWithSuffix.substr(0, nameWithSuffix.length - 3),
    release,
  };
};

const getAllReleases = revisions =>
  revisions
    .reduce((allReleases, { release }) => {
      if (!allReleases.includes(release)) {
        return [...allReleases, release];
      }
      return allReleases;
    }, [])
    .sort();

const addRevisionToQuadrant = (quadrant = {}, revision) => ({
  ...quadrant,
  [revision.ring]: addRevisionToRing(quadrant[revision.ring], revision),
});

const createItems = revisions => {
  const itemMap = revisions.reduce((items, revision) => {
    return {
      ...items,
      [revision.name]: addRevisionToItem(items[revision.name], revision),
    };
  }, {});

  return Object.values(itemMap).sort((x, y) => (x.name > y.name ? 1 : -1));
};

const ignoreEmptyRevisionBody = (revision, item) => {
  if (!revision.body || revision.body.trim() === '') {
    return item.body;
  }
  return revision.body;
};

const addRevisionToItem = (
  item = {
    flag: 'default',
    featured: true,
    revisions: [],
  },
  revision,
) => {
  const { fileName, ...rest } = revision;
  let newItem = {
    ...item,
    ...rest,
    body: ignoreEmptyRevisionBody(rest, item),
    attributes: {
      ...item.attributes,
      ...revision.attributes,
    },
  };

  if (revisionCreatesNewHistoryEntry(revision)) {
    newItem = {
      ...newItem,
      revisions: [rest, ...newItem.revisions],
    };
  }

  return newItem;
};

const revisionCreatesNewHistoryEntry = revision => {
  return revision.body.trim() !== '' || typeof revision.ring !== 'undefined';
};

const flagItem = (items, allReleases) =>
  items.map(
    item => ({
      ...item,
      flag: getItemFlag(item, allReleases),
    }),
    [],
  );

const isInLastRelease = (item, allReleases) =>
  item.revisions[0].release === allReleases[allReleases.length - 1];

const isNewItem = (item, allReleases) =>
  item.revisions.length === 1 && isInLastRelease(item, allReleases);

const hasItemChanged = (item, allReleases) =>
  item.revisions.length > 1 && isInLastRelease(item, allReleases);

const getItemFlag = (item, allReleases) => {
  if (isNewItem(item, allReleases)) {
    return 'new';
  }
  if (hasItemChanged(item, allReleases)) {
    return 'changed';
  }
  return 'default';
};
