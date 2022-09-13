import { HomepageOption, Item, QuadrantConfig } from "./model";

export interface ConfigData {
  tags?: string[];
  quadrants: { [key: string]: string };
  rings: string[];
  showEmptyRings: boolean;
  quadrantsMap: { [quadrant: string]: QuadrantConfig };
  chartConfig: {
    size: number;
    scale: number[];
    blipSize: number;
    ringsAttributes: { radius: number; arcWidth: number }[];
  };
  homepageContent: HomepageOption;
  dateFormat?: string;
  editLink?: {
    radarLink: string;
    title?: string;
  };
}

export const radarName =
  process.env.REACT_APP_RADAR_NAME || "AOE Technology Radar";
export const radarNameShort = radarName;

export const getItemPageNames = (items: Item[]) =>
  items.map((item) => `${item.quadrant}/${item.name}`);

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

export function translate(config: ConfigData, key: string) {
  return config.quadrants[key] || "-";
}
