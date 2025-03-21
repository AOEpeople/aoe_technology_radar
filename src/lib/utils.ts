import { type ClassValue, clsx } from "clsx";

import config from "../../next.config.js";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function assetUrl(path: string) {
  if (/^https?:/.test(path)) return path;
  if (!config.basePath) return path;
  if (!path.startsWith("/")) path = "/" + path;
  return `${config.basePath}${path}`;
}

export function listContainsAny(list: string[], comp: string[]) {
  for (const item of list) {
    if (comp.includes(item)) return true;
  }
  return false;
}
