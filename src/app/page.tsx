import Home from "@/presentation/pages/Home";
import { siteUrl } from "@/server/site";
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Page() {
  return <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Rumbo Mundial",
            url: siteUrl.href,
            inLanguage: "es-MX",
          }).replace(/</g, "\\u003c"),
        }}
      />
    <Home />
  </>;
}
