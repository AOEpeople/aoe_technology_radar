import data from "../../data/data.json";
import config from "./config";

import { format } from "@/lib/format";
import { Flag, FooterLink, Item, Ring, Segment } from "@/lib/types";
import { assetUrl } from "@/lib/utils";

export function getLabel(key: keyof typeof config.labels) {
  return config.labels[key] || "";
}

export function getToggle(key: keyof typeof config.toggles) {
  return config.toggles[key] || false;
}

export function getSections() {
  return config.sections;
}

export function getAppName() {
  return getLabel("title");
}

export function getLogoUrl() {
  return assetUrl(config.logoFile);
}

export function getJsUrl(): string {
  if (!config.jsFile) return "";
  return assetUrl(config.jsFile);
}

export function getChartConfig() {
  return config.chart;
}

export function getColors() {
  return config.colors;
}

export function getFlags() {
  return config.flags;
}

export function getFlag(flag: Flag) {
  return config.flags[flag];
}

export const getFuzzySearchConfig = () => {
  return config.fuzzySearch;
};

export function getRings(): Ring[] {
  return config.rings;
}

export function getRing(id: string): Ring | undefined {
  return getRings().find((r) => r.id === id);
}

export function getReleases(): string[] {
  return data.releases;
}

export function getSocialLinks() {
  return config.social;
}

export function getFooterLinks(): FooterLink[] {
  return config.footerLinks?.length
    ? config.footerLinks
    : [
        {
          label: getLabel("imprint"),
          url: config.imprint,
        },
      ];
}

export function getTags(): string[] {
  return data.tags;
}

export function getEditUrl(props: { id: string; release: string }) {
  if (!config.editUrl) return "";
  return format(config.editUrl, props);
}

export function getSegments(): Segment[] {
  return config.segments.map((s, i) => ({ ...s, position: i + 1 }));
}

export function getSegment(id: string): Segment | undefined {
  return getSegments().find((q) => q.id === id);
}

export function getItems(segment?: string, featured?: boolean): Item[] {
  return data.items.filter((item) => {
    if (segment && item.segment !== segment) return false;
    return !(featured && !item.featured);
  }) as Item[];
}

export function getAbsoluteUrl(path: string = "/") {
  return `${config.baseUrl}${path}`;
}

export function getItem(id: string): Item | undefined {
  return data.items.find((item) => item.id === id) as Item;
}

export const sortByFeaturedAndTitle = (a: Item, b: Item) =>
  Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title);

export const groupItemsByRing = (items: Item[]) => {
  const showEmptyRings = getToggle("showEmptyRings");
  return getRings().reduce(
    (acc, ring) => {
      const ringItems = items.filter((item) => item.ring === ring.id);
      if (ringItems.length || showEmptyRings) acc[ring.id] = ringItems;
      return acc;
    },
    {} as { [ringId: string]: Item[] },
  );
};

export const groupItemsBySegment = (items: Item[]) => {
  return getSegments().reduce(
    (acc, segment) => {
      const segmentItems = items.filter((item) => item.segment === segment.id);
      if (segmentItems.length) acc[segment.id] = segmentItems;
      return acc;
    },
    {} as { [segmentId: string]: Item[] },
  );
};
