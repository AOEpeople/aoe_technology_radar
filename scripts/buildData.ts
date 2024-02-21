import fs from "fs";
import matter from "gray-matter";
import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import path from "path";

import config from "../next.config.mjs";

import { Flag, Item } from "@/lib/types";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

function dataPath(...paths: string[]): string {
  return path.resolve("data", ...paths);
}

function convertToHtml(markdown: string): string {
  if (config.basePath) {
    markdown = markdown.replace(/]\(\//g, `](${config.basePath}/`);
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
  const { data, content } = matter(fileContent);
  const body = convertToHtml(content);

  return { id, data, body };
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

        if (!items[id]) {
          items[id] = {
            id,
            title: data.title || id,
            ring: data.ring,
            quadrant: data.quadrant,
            body,
            featured: data.featured !== false,
            flag: Flag.Default,
            tags: data.tags || [],
            revisions: [],
          };
        } else {
          items[id].body = body || items[id].body;
          items[id].title = data.title || items[id].title;
          items[id].ring = data.ring || items[id].ring;
          items[id].quadrant = data.quadrant || items[id].quadrant;
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
    for (const tag of item.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

function getFlag(item: Item, latestRelease: string): Flag {
  const revisions = item.revisions || [];
  const isInLatestRelease = !!(
    revisions.length &&
    revisions[revisions.length - 1].release === latestRelease
  );

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
  const releases = getUniqueReleases(items);
  const tags = getUniqueTags(items);
  const latestRelease = releases[releases.length - 1];

  const processedItems = items.map((item) => ({
    ...item,
    // @todo: Maybe we should use a better random number generator to avoid overlapping of blips
    random: [Math.sqrt(Math.random()), Math.random()] as [number, number],
    flag: getFlag(item, latestRelease),
    // only keep revision which ring or body is different
    revisions: item.revisions?.filter((revision, index, revisions) => {
      const { ring, body } = revision;
      return (
        ring !== item.ring ||
        (body != "" && body != item.body && body !== revisions[index - 1]?.body)
      );
    }),
  }));

  return { releases, tags, items: processedItems };
}

// Parse the data and write radar data to JSON file
parseDirectory(dataPath("radar")).then((items) => {
  const data = postProcessItems(items);
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataPath("data.json"), json);
});

// write about data to JSON file
const about = readMarkdownFile(dataPath("about.md"));
fs.writeFileSync(dataPath("about.json"), JSON.stringify(about, null, 2));
