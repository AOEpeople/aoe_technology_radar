import config from "../../data/config.json";
import data from "../../data/data.json";
import messages from "../../data/messages.json";

import { Flag, Item, Quadrant, Ring } from "@/lib/types";

export function getMessages() {
  return messages;
}

export function getAppName() {
  return messages.radarName;
}

export function getFlag(flag: Exclude<Flag, Flag.Default>) {
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

export function getQuadrants(): Quadrant[] {
  return config.quadrants;
}

export function getQuadrant(id: string): Quadrant | undefined {
  return getQuadrants().find((q) => q.id === id);
}

export function getItems(featured?: boolean): Item[] {
  return data.items.filter((item) => !featured || item.featured) as Item[];
}

export function getItem(id: string): Item | undefined {
  return data.items.find((item) => item.id === id) as Item;
}

export const sortByFeaturedAndTitle = (a: Item, b: Item) =>
  Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title);
