import Room from "@/presentation/pages/Room";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sala de juego",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id.toUpperCase();
  return <Room key={id} id={id} />;
}
