import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Rumbo Mundial · El mundo en tu mesa",
  description:
    "Viaja, compra y negocia con tus amigos. Juego de mesa multijugador en español.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
