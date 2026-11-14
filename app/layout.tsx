import type { Metadata } from "next";
import { indexable, siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteTitle, template: "%s | Rumbo Mundial" },
  description: siteDescription,
  applicationName: "Rumbo Mundial",
  robots: { index: indexable, follow: indexable },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Rumbo Mundial",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/art/world-center.webp", alt: "Mapa ilustrado de Rumbo Mundial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/art/world-center.webp"],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
