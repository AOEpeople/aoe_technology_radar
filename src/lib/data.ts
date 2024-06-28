import data from "../../data/data.json";
import config from "./config";

import { format } from "@/lib/format";
import { Flag, Item, Quadrant, Ring } from "@/lib/types";
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

export function getTags(): string[] {
  return data.tags;
}

export function getEditUrl(props: { id: string; release: string }) {
  if (!config.editUrl) return "";
  return format(config.editUrl, props);
}

export function getQuadrants(): Quadrant[] {
  return config.quadrants.map((q, i) => ({ ...q, position: i + 1 }));
}

export function getQuadrant(id: string): Quadrant | undefined {
  return getQuadrants().find((q) => q.id === id);
}

export function getItems(quadrant?: string, featured?: boolean): Item[] {
  return data.items.filter((item) => {
    if (quadrant && item.quadrant !== quadrant) return false;
    return !(featured && !item.featured);
  }) as Item[];
}

export function getImprintUrl() {
  return config.imprint;
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

export const groupItemsByQuadrant = (items: Item[]) => {
  return getQuadrants().reduce(
    (acc, quadrant) => {
      const quadrantItems = items.filter(
        (item) => item.quadrant === quadrant.id,
      );
      if (quadrantItems.length) acc[quadrant.id] = quadrantItems;
      return acc;
    },
    {} as { [quadrantId: string]: Item[] },
  );
};
