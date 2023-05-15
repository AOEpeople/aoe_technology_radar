import frontMatter from "front-matter";
import { readFileSync } from "fs";
import { readFile } from "fs-extra";
import highlight from "highlight.js";
import { marked } from "marked";
import * as path from "path";

import {
  FlagType,
  Item,
  ItemAttributes,
  Radar,
  Revision,
} from "../../src/model";
import { appBuild } from "../paths";
import { getAllMarkdownFiles, radarPath } from "./file";

import { ConfigData, publicUrl } from "../../src/config";

marked.setOptions({
  highlight: (code: any) => highlight.highlightAuto(code).value,
});

export const createRadar = async (): Promise<Radar> => {
  const fileNames = await getAllMarkdownFiles(radarPath());
  const revisions: (Revision | undefined)[] = await createRevisionsFromFiles(
    fileNames
  );
  const filterdRevisions: Revision[] = revisions.filter(
    (r) => r !== undefined
  ) as Revision[];
  const allReleases = getAllReleases(filterdRevisions);
  const items = createItems(filterdRevisions);
  const flaggedItems = flagItem(items, allReleases);

  items.forEach((item) => checkAttributes(item.name, item));

  return {
    items: flaggedItems,
    releases: allReleases,
  };
};

const checkAttributes = (fileName: string, attributes: ItemAttributes) => {
  const rawConf = readFileSync(path.resolve(appBuild, "config.json"), "utf-8");
  const config = JSON.parse(rawConf) as ConfigData;

  if (!config.rings.includes(attributes.ring)) {
    throw new Error(
      `Error: ${fileName} has an illegal value for 'ring' - must be one of ${config.rings}`
    );
  }

  const quadrants = Object.keys(config.quadrants);
  if (!quadrants.includes(attributes.quadrant)) {
    throw new Error(
      `Error: ${fileName} has an illegal value for 'quadrant' - must be one of ${quadrants}`
    );
  }

  if (config.tags) {
    for (let tag of config.tags) {
      if (attributes.tags && attributes.tags.includes(tag)) {
        return attributes;
      }
    }
    return undefined;
  } else {
    return attributes;
  }
};

const createRevisionsFromFiles = (fileNames: string[]) => {
  return Promise.all(
    fileNames.map((fileName) =>
      readFile(fileName, "utf8").then((data) => {
        const fm = frontMatter<ItemAttributes>(data);
        let html = marked(fm.body.replace(/\]\(\//g, `](${publicUrl}`));
        html = html.replace(
          /a href="http/g,
          'a target="_blank" rel="noopener noreferrer" href="http'
        );
        const attributes = checkAttributes(fileName, fm.attributes);
        if (attributes) {
          return {
            ...itemInfoFromFilename(fileName),
            ...attributes,
            fileName,
            body: html,
          } as Revision;
        }
      })
    )
  );
};

const itemInfoFromFilename = (fileName: string) => {
  const [release, name] = fileName.split(path.sep).slice(-2);
  return {
    name: path.basename(name, ".md"),
    release,
  };
};

const getAllReleases = (revisions: Revision[]) =>
  revisions
    .reduce<string[]>((allReleases, { release }) => {
      if (!allReleases.includes(release)) {
        return [...allReleases, release];
      }
      return allReleases;
    }, [])
    .sort();

const createItems = (revisions: Revision[]) => {
  const itemMap = revisions.reduce<{ [name: string]: Item }>(
    (items, revision) => {
      return {
        ...items,
        [revision.name]: addRevisionToItem(items[revision.name], revision),
      };
    },
    {}
  );

  return Object.values(itemMap)
    .map((item) => ({ ...item, title: item.title || item.name }))
    .sort((x, y) => (x.name > y.name ? 1 : -1));
};

const ignoreEmptyRevisionBody = (revision: Revision, item: Item) => {
  if (!revision.body || revision.body.trim() === "") {
    return item.body;
  }
  return revision.body;
};

const addRevisionToItem = (
  item: Item = {
    flag: FlagType.default,
    featured: true,
    revisions: [],
    name: "",
    title: "",
    ring: "trial",
    quadrant: "",
    body: "",
    info: "",
    angleFraction: Math.random(),
    radiusFraction: Math.random()
  },
  revision: Revision
): Item => {
  let newItem: Item = {
    ...item,
    ...revision,
    body: ignoreEmptyRevisionBody(revision, item),
  };

  if (revisionCreatesNewHistoryEntry(revision, item)) {
    newItem = {
      ...newItem,
      revisions: [revision, ...newItem.revisions],
    };
  }

  return newItem;
};

const revisionCreatesNewHistoryEntry = (revision: Revision, item: Item) => {
  return (
    revision.body.trim() !== "" ||
    (typeof revision.ring !== "undefined" && revision.ring !== item.ring) ||
    (typeof revision.quadrant !== "undefined" &&
      revision.quadrant !== item.quadrant)
  );
};

const flagItem = (items: Item[], allReleases: string[]) =>
  items.map(
    (item) =>
      ({
        ...item,
        flag: getItemFlag(item, allReleases),
      } as Item),
    []
  );

const isInLastRelease = (item: Item, allReleases: string[]) =>
  item.revisions[0].release === allReleases[allReleases.length - 1];

const isNewItem = (item: Item, allReleases: string[]) =>
  item.revisions.length === 1 && isInLastRelease(item, allReleases);

const hasItemChanged = (item: Item, allReleases: string[]) =>
  item.revisions.length > 1 && isInLastRelease(item, allReleases);

const getItemFlag = (item: Item, allReleases: string[]): string => {
  if (isNewItem(item, allReleases)) {
    return FlagType.new;
  }
  if (hasItemChanged(item, allReleases)) {
    return FlagType.changed;
  }
  return FlagType.default;
};
