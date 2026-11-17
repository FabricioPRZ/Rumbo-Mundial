import { indexable, siteUrl } from "@/server/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexable ? [{ url: siteUrl.href }] : [];
}
