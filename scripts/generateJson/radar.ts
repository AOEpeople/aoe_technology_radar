import { readFile } from "fs-extra";
import { readFileSync } from "fs";
import * as path from "path";
import frontMatter from "front-matter";
// @ts-ignore esModuleInterop is activated in tsconfig.scripts.json, but IDE typescript uses default typescript config
import { marked } from "marked";
import highlight from "highlight.js";

import { radarPath, getAllMarkdownFiles } from "./file";
import { Item, Revision, ItemAttributes, Radar, FlagType } from "../../src/model";
import { appBuild } from "../paths";

type FMAttributes = ItemAttributes;

marked.setOptions({
  highlight: (code: any) => highlight.highlightAuto(code).value,
});

export const createRadar = async (): Promise<Radar> => {
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

const checkAttributes = (fileName: string, attributes: FMAttributes) => {
  const rawConf = readFileSync(path.resolve(appBuild, 'config.json'), 'utf-8');
  const config = JSON.parse(rawConf);

  if (attributes.ring && !config.rings.includes(attributes.ring)) {
    throw new Error(
      `Error: ${fileName} has an illegal value for 'ring' - must be one of ${config.rings}`
    );
  }

  const quadrants = Object.keys(config.quadrants);
  if (attributes.quadrant && !quadrants.includes(attributes.quadrant)) {
    throw new Error(
      `Error: ${fileName} has an illegal value for 'quadrant' - must be one of ${quadrants}`
    );
  }

  return attributes;
};

const createRevisionsFromFiles = (fileNames: string[]) => {
  const publicUrl = process.env.PUBLIC_URL;
  return Promise.all(
    fileNames.map(
      (fileName) =>
        new Promise<Revision>((resolve, reject) => {
          readFile(fileName, "utf8", async (err, data) => {
            if (err) {
              reject(err);
            } else {
              const fm = frontMatter<FMAttributes>(data);
              // add target attribute to external links
              // todo: check path
              let html = marked(fm.body.replace(/\]\(\//g, `](${publicUrl}/`));
              html = html.replace(
                /a href="http/g,
                'a target="_blank" rel="noopener noreferrer" href="http'
              );

              resolve({
                ...itemInfoFromFilename(fileName),
                ...checkAttributes(fileName, fm.attributes),
                fileName,
                body: html,
              } as Revision);
            }
          });
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
    .map((item) => ({ ...item, ["title"]: item.title || item.name }))
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
  },
  revision: Revision
): Item => {
  let newItem: Item = {
    ...item,
    ...revision,
    body: ignoreEmptyRevisionBody(revision, item),
  };

  if (revisionCreatesNewHistoryEntry(revision)) {
    newItem = {
      ...newItem,
      revisions: [revision, ...newItem.revisions],
    };
  }

  return newItem;
};

const revisionCreatesNewHistoryEntry = (revision: Revision) => {
  return revision.body.trim() !== "" || typeof revision.ring !== "undefined";
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
