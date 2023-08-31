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
export const titleFormat =
  process.env.REACT_APP_RADAR_TITLE_FORMAT || "%TECHNOLOGY_NAME% | %APP_TITLE%";

export function setTitle(document: Document, title?: string) {
  document.title = title
    ? titleFormat
        .replace("%TECHNOLOGY_NAME%", title)
        .replace("%APP_TITLE%", radarName)
    : radarName;
}

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

export const isCustomMode =
    process.env.REACT_APP_CUSTOM_MODE === "true" || false;
export const publicUrl =
  (process.env.PUBLIC_URL || "").replace(/\/$/, "") + "/";

export function assetUrl(file: string) {
  return publicUrl + file;
}

export function translate(config: ConfigData, key: string) {
  return config.quadrants[key] || "-";
}
