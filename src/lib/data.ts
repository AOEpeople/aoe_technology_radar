import config from "../data/config.json";
import messages from "../data/messages.json";

import { Quadrant, Ring } from "@/lib/types";

export function getMessages() {
  return messages;
}

export function getAppName() {
  return messages.radarName;
}

export function getRings(): Ring[] {
  return config.rings;
}

export function getQuadrants(): Quadrant[] {
  return config.quadrants;
}

export function getQuadrant(id: string): Quadrant | undefined {
  return getQuadrants().find((q) => q.id === id);
}
