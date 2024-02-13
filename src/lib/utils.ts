import { type ClassValue, clsx } from "clsx";

import config from "../../next.config.mjs";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function assetUrl(path: string) {
  if (!config.basePath) return path;
  return `${config.basePath}${path}`;
}
