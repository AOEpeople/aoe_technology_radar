import { MetadataRoute } from "next";

import { getAbsoluteUrl, getItems, getSegments } from "@/lib/data";

export const dynamic = "force-static";
export const revalidate = 60;

export default function sitemap(): MetadataRoute.Sitemap {
  const segments = getSegments().map((segment) => ({
    url: getAbsoluteUrl(`/${segment.id}/`),
    lastModified: new Date(),
    priority: 0.8,
  }));

  const items = getItems().map((item) => ({
    url: getAbsoluteUrl(`/${item.segment}/${item.id}/`),
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [
    {
      url: getAbsoluteUrl(),
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: getAbsoluteUrl("/overview/"),
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/help-and-about-tech-radar/"),
      lastModified: new Date(),
      priority: 0.9,
    },
    ...segments,
    ...items,
  ];
}
