import Room from "@/components/Room";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Room id={(await params).id.toUpperCase()} />;
}
