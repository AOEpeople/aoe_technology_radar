import { Item } from "./model";

export const radarName =
  process.env.REACT_APP_RADAR_NAME || "Technology Radar";
export const radarNameShort = radarName;

export const quadrants = [
  "extract-load-transform",
  "orchestration-and-observability",
  "storage-and-compute",
  "tools-and-methods"
];

export const rings = ["all", "adopt", "trial", "assess", "hold"] as const;

export type Ring = typeof rings[number];

export const getItemPageNames = (items: Item[]) =>
  items.map((item) => `${item.quadrant}/${item.name}`);

export const showEmptyRings = false;

const messages: { [k: string]: string } = {
  "extract-load-transform": "Extract, Load, Transform",
  "orchestration-and-observability": "Orchestration & Observability",
  "storage-and-compute": "Storage & Compute",
  "tools-and-methods": "Tools & Methods",
};

export const translate = (key: string) => messages[key] || "-";

export function isMobileViewport() {
  // return false for server side rendering
  if (typeof window == "undefined") return false;

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return width < 1200;
}

export function assetUrl(file: string) {
  return process.env.PUBLIC_URL + "/" + file;
}
