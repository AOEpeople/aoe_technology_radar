import { getAppName } from "@/lib/data";

// Replaces placeholders in a string with values from a context object
// e.g. format("Hello {name}.", {name: "World"}) => "Hello World."
export function format(text: string, context: Record<string, any>): string {
  return text.replace(/{(\w+)}/g, (match, key) => {
    return context[key] || match;
  });
}

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
