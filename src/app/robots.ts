import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*", "/image.png"],
      disallow: "/private/",
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}
