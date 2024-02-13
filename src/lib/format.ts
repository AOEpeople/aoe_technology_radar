// Format the title of the page
import { getAppName } from "@/lib/data";

export function formatTitle(title: string = ""): string {
  if (!title) return getAppName();
  return `${title} | ${getAppName()}`;
}
