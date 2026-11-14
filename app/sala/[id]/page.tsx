import type { Metadata } from "next";
import Room from "@/components/Room";
export const metadata: Metadata = {
  title: "Sala de juego",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Room id={(await params).id.toUpperCase()} />;
}
