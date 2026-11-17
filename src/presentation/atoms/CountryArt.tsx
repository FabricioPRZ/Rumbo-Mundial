import { COUNTRY_ART } from "@/presentation/assets/art";
import Image from "next/image";
export function CountryArt({ id }: { id: number }) {
  const art = COUNTRY_ART[id];
  if (!art) return null;
  return <Image className="country-art" src={art.src} alt={`Ilustración de ${art.name}`} width={960} height={640} sizes="(max-width: 780px) 90vw, 430px" />;
}
