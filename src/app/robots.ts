import { indexable, siteUrl } from "@/server/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    ...(indexable ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
