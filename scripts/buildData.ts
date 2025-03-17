import fs from "fs";
import matter from "gray-matter";
import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import path from "path";

import nextConfig from "../next.config.js";
import config from "../src/lib/config";
import ErrorHandler, { ErrorType, TextColor } from "./errorHandler.js";
import Positioner from "./positioner";

import { Flag, Item } from "@/lib/types";

const {
  rings,
  chart: { size },
} = config;

const ringIds = rings.map((r) => r.id);
const segments = config.segments.map((s, i) => ({ ...s, position: i + 1 }));
const segmentIds = segments.map((s) => s.id);
const tags = (config as { tags?: string[] }).tags || [];
const positioner = new Positioner(size, segments, rings);
const errorHandler = new ErrorHandler(segments, rings);

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

function dataPath(...paths: string[]): string {
  return path.resolve("data", ...paths);
}

function writeJsonFile(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function convertToHtml(markdown: string): string {
  // replace deprecated internal links with .html extension
  markdown = markdown.replace(/(]\(\/[^)]+)\.html/g, "$1/");

  if (nextConfig.basePath) {
    markdown = markdown.replace(/]\(\//g, `](${nextConfig.basePath}/`);
  }

  let html = marked.parse(markdown.trim()) as string;
  html = html.replace(
    /a href="http/g,
    'a target="_blank" rel="noopener noreferrer" href="http',
  );
  return html;
}

function readMarkdownFile(filePath: string) {
  const id = path.basename(filePath, ".md");
  const fileContent = fs.readFileSync(filePath, "utf8");

  try {
    const { data, content } = matter(fileContent);
    const body = convertToHtml(content);
    return { id, data, body };
  } catch (error) {
    console.error(`❌ Failed parsing ${filePath}: ${error}`);
    process.exit(1);
  }
}

// Function to recursively read Markdown files and parse them
async function parseDirectory(dirPath: string): Promise<Item[]> {
  const items: Record<string, Item> = {};

  async function readDir(dirPath: string) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        await readDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const releaseDate = path.basename(path.dirname(fullPath));
        const { id, data, body } = readMarkdownFile(fullPath);

        // check if item is using deprecated `quadrant` field
        if (data.quadrant) {
          errorHandler.processBuildErrors(
            ErrorType.DeprecatedQuadrantAttribute,
            `${releaseDate}/${entry.name}`,
          );
        }

        if (!items[id]) {
          items[id] = {
            id,
            release: releaseDate,
            title: data.title || id,
            ring: data.ring,
            segment: data.segment || data.quadrant,
            body,
            featured: data.featured !== false,
            flag: Flag.Default,
            tags: data.tags || [],
            revisions: [],
            position: [0, 0],
          };
        } else {
          items[id].release = releaseDate;
          items[id].body = body || items[id].body;
          items[id].title = data.title || items[id].title;
          items[id].ring = data.ring || items[id].ring;
          items[id].segment =
            data.segment ||
            data.quadrant ||
            items[id].segment ||
            items[id].quadrant;
          items[id].tags = data.tags || items[id].tags;
          items[id].featured =
            typeof data.featured === "boolean"
              ? data.featured
              : items[id].featured;
        }

        items[id].revisions!.push({
          release: releaseDate,
          ring: data.ring,
          body,
        });
      }
    }
  }

  await readDir(dirPath);
  return Object.values(items).sort((a, b) => a.title.localeCompare(b.title));
}

function getUniqueReleases(items: Item[]): string[] {
  const releases = new Set<string>();
  for (const item of items) {
    for (const revision of item.revisions || []) {
      releases.add(revision.release);
    }
  }
  return Array.from(releases).sort();
}

function getUniqueTags(items: Item[]): string[] {
  const tags = new Set<string>();
  for (const item of items) {
    for (const tag of item.tags || []) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

function getFlag(item: Item, allReleases: string[]): Flag {
  // return default flag if this is the first edition of the radar
  if (allReleases.length === 1) {
    return Flag.Default;
  }

  const latestRelease = allReleases[allReleases.length - 1];
  const revisions = item.revisions || [];
  const isInLatestRelease =
    revisions.length > 0 &&
    revisions[revisions.length - 1].release === latestRelease;

  if (revisions.length == 1 && isInLatestRelease) {
    return Flag.New;
  } else if (revisions.length > 1 && isInLatestRelease) {
    return Flag.Changed;
  }

  return Flag.Default;
}

function postProcessItems(items: Item[]): {
  releases: string[];
  tags: string[];
  items: Item[];
} {
  const filteredItems = items.filter((item) => {
    // check if the items' segment and ring are valid
    if (!item.segment || !item.ring) {
      errorHandler.processBuildErrors(ErrorType.NoSegmentOrRing, item.id);
      return false;
    }

    if (!segmentIds.includes(item.segment)) {
      errorHandler.processBuildErrors(
        ErrorType.InvalidSegment,
        item.id,
        item.segment,
      );
      return false;
    }

    if (!ringIds.includes(item.ring)) {
      errorHandler.processBuildErrors(
        ErrorType.InvalidRing,
        item.id,
        item.ring,
      );
      return false;
    }

    // check if config has a key `tags` and if it is an array
    if (Array.isArray(tags) && tags.length) {
      // if tags are specified, only keep items that have at least one of the tags
      return item.tags?.some((tag) => tags.includes(tag));
    }

    return true;
  });

  errorHandler.checkForBuildErrors();

  const releases = getUniqueReleases(filteredItems);
  const uniqueTags = getUniqueTags(filteredItems);
  const processedItems = filteredItems.map((item) => {
    const processedItem = {
      ...item,
      position: positioner.getNextPosition(item.segment, item.ring),
      flag: getFlag(item, releases),
      // only keep revision which ring or body is different
      revisions: item.revisions
        ?.filter((revision, index, revisions) => {
          const { ring, body } = revision;
          return (
            ring !== item.ring ||
            (body != "" &&
              body != item.body &&
              body !== revisions[index - 1]?.body)
          );
        })
        .reverse(),
    };

    // unset revisions if there are none
    if (!processedItem.revisions?.length) {
      delete processedItem.revisions;
    }

    // unset tags if there are none
    if (!processedItem.tags?.length) {
      delete processedItem.tags;
    }

    return processedItem;
  });

  return { releases, tags: uniqueTags, items: processedItems };
}

async function main() {
  // check segment length between 2 and 6
  if (!segments.length || segments.length > 6) {
    errorHandler.processBuildErrors(
      ErrorType.InvalidSegmentLength,
      `${segments.length}`,
    );
  }

  // break if segments are not defined at all
  errorHandler.checkForBuildErrors(true);

  // warn about deprecated config
  if ("quadrants" in config) {
    errorHandler.processBuildErrors(ErrorType.DeprecatedQuadrantConfig);
  }

  // write about data to JSON file
  const about = readMarkdownFile(dataPath("about.md"));
  writeJsonFile(dataPath("about.json"), about);
  console.info(`💾 Content of about.md was written to data/about.json`);

  // Parse the data and write radar data to JSON file
  const items = await parseDirectory(dataPath("radar"));
  const data = postProcessItems(items);

  if (data.items.length === 0) {
    errorHandler.processBuildErrors(ErrorType.NoRadarItems);
  }

  errorHandler.checkForBuildErrors(true);

  writeJsonFile(dataPath("data.json"), data);
  console.info(
    `💾 Data of ${data.items.length} items was written to data/data.json`,
  );

  writeJsonFile(path.resolve("public", "radar.json"), { config, data });
  console.info(`🌍️ Created public/radar.json`);

  console.log(
    errorHandler.colorizeBackground(" Build was successfull ", TextColor.Green),
  );
}

main();
