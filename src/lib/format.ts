import { getAppName } from "@/lib/data";

// Format the title of the page
export function formatTitle(...title: string[]): string {
  return [...title, getAppName()].join(" | ");
}

// Formats a release (2024-02-14) to a date (February 2024)
export function formatRelease(release: string): string {
  const date = new Date(release);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
