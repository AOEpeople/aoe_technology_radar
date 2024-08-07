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
