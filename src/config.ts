import { Item } from "./model";

export const radarName =
  process.env.REACT_APP_RADAR_NAME || "Technology Radar";
export const radarNameShort = radarName;

export const quadrants = [
  "data-ingestion",
  "data-storage-and-processing",
  "data-transformation",
  "data-outgest",
  "data-qa",
  "orchestration-and-dashboard",
  "retrival-query",
];

export const rings = ["all", "adopt", "trial", "assess", "hold"] as const;

export type Ring = typeof rings[number];

export const getItemPageNames = (items: Item[]) =>
  items.map((item) => `${item.quadrant}/${item.name}`);

export const showEmptyRings = false;

const messages: { [k: string]: string } = {
  "data-ingestion": "Ingest",
  "data-transformation": "Transformation",
  "data-outgest": "Outgest",
  "data-qa": "Data Quality Assurance",
  "data-storage-and-processing": "Unknown",
  "orchestration-and-dashboard": "Orchestration & Dashboard",
  "retrival-query": "Retrieval & Query"
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
