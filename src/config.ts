import { Item } from "./model";

export const radarName =
  process.env.REACT_APP_RADAR_NAME || "Technology Radar";
export const radarNameShort = radarName;

export const quadrants = [
  "data-ingestion-and-export",
  "data-storage-and-processing",
  "data-transformation-and-modelling",
  "orchestration-and-dashboard"
];

export const rings = ["all", "adopt", "trial", "assess", "hold"] as const;

export type Ring = typeof rings[number];

export const getItemPageNames = (items: Item[]) =>
  items.map((item) => `${item.quadrant}/${item.name}`);

export const showEmptyRings = false;

const messages: { [k: string]: string } = {
  "data-ingestion-and-export": "Data Ingestion & Export",
  "data-storage-and-processing": "Data Storage & Processing",
  "data-transformation-and-modelling": "Data Transformation & Modelling",
  "orchestration-and-observability": "Orchestration, Observability & Discovery"
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
