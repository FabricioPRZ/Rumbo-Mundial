const configuredUrl = new URL(
  process.env.SITE_URL || "https://rumbo-mundial-khaki.vercel.app",
);
if (!['https:', 'http:'].includes(configuredUrl.protocol)) {
  throw new Error("SITE_URL debe ser una URL pública con https:// o http://.");
}

export const siteUrl = new URL(configuredUrl.origin);
export const indexable =
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development" &&
  process.env.NODE_ENV !== "development";
export const siteTitle = "Turista mundial online con amigos | Rumbo Mundial";
export const siteDescription =
  "Juega turista mundial online con amigos en Rumbo Mundial: de 2 a 6 jugadores, países, casas, hoteles y tratos. Crea una sala y comparte el enlace, sin descargar nada.";
