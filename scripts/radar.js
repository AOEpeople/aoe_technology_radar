import { walk } from 'walk';
import fs, { readFileSync } from 'fs-extra';
import path from 'path';
import frontmatter from 'front-matter';
import marked from 'marked';
import waterfall from 'async/waterfall';
import { srcPath } from './file';

export const getTree = () => (
  new Promise((resolve, reject) => {
    const walker = walk(srcPath(), { followLinks: false });
    let radar = {};

    walker.on("file", (root, fileStat, next) => {
      if (isMarkdownFile(fileStat.name)) {
        radar = addItemToRadar(radar, path.resolve(root, fileStat.name))
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
      resolve(radar);
    });
  })
);

const isMarkdownFile = (name) => name.match(/\.md$/);

const addItemToRadar = (radar, pathName) => {
  const item = createItemFromPath(pathName);
  return {
    ...radar,
    [item.version]: addItemToVersion(radar[item.version] || {}, item),
  }
};

const addItemToVersion = (version, item) => {
  return {
    ...version,
    [item.quadrant]: addItemToQuadrant(version[item.quadrant] || {}, item),
  };
};

const addItemToQuadrant = (quadrant, item) => {
  return {
    ...quadrant,
    [item.name]: item.path,
  };
};

const createItemFromPath = (pathName) => {
  const [version, quadrant, fileName] = pathName.split('/').slice(-3);
  return {
    version,
    quadrant,
    path: pathName,
    name: fileName.substr(0, fileName.length - 3),
  };
};

export const createRadar = async (tree) => {
  const versionNames = Object.keys(tree).sort();
  const radar = versionNames.reduce((radar, versionName) => {
    return updateRadarWithVersion(radar, versionName, tree);
  }, {});

  return readItemsDataFromFiles(radar);
};

const updateRadarWithVersion = (radar, versionName, tree) => {
  const version = tree[versionName];
  const quadrantNames = Object.keys(version);
  return quadrantNames.reduce((updatedRadar, quadrantName) => {
    return {
      ...updatedRadar,
      [quadrantName]: updateQuadrantWithVersion(updatedRadar[quadrantName] || {}, quadrantName, versionName, tree),
    }
  }, radar);
};

const updateQuadrantWithVersion = (quadrant, quadrantName, versionName, tree) => {
  const quadrantInNewVersion = tree[versionName][quadrantName];
  const fileNames = Object.keys(quadrantInNewVersion);
  return fileNames.reduce((updatedQuadrant, fileName) => {
    return {
      ...updatedQuadrant,
      [fileName]: updateItemWithVersion(updatedQuadrant[fileName], fileName, quadrantName, versionName, tree),
    }
  }, quadrant);
};

const updateItemWithVersion = (file = { revision: 0, files: [] }, fileName, quadrantName, versionName, tree) => {
  const fileInNewVersion = tree[versionName][quadrantName][fileName];
  return {
    files: file.files.concat([{
      version: versionName,
      file: fileInNewVersion,
    }]),
  };
};

const readItemsDataFromFiles = (radar) => {
  return Object.entries(radar).reduce((newRadar, [quadrantName, quadrant]) => {
    return {
      ...newRadar,
      [quadrantName]: Object.entries(quadrant).reduce((newQuadrant, [itemName, item]) => {
        return {
          ...newQuadrant,
          [itemName]: {
            revisions: item.files.length,
            data: mergeDataFromFiles(item.files)
          },
        };
      }, {}),
    }
  }, {});
};

const mergeDataFromFiles = (files) => {
  const frontmatters = getFrontmatterForAllFiles(files);
  console.log()
  return frontmatters;
};

const getFrontmatterForAllFiles = (files) => {
  return files.map(({ file }) => {
    return getFrontmatter(file);
  })
};

const getFrontmatter = (fileName) => {
  return frontmatter(readFileSync(fileName, 'utf8'));
};
