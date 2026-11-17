import type { HTMLAttributes } from "react";
export default function PlayerMarker({ color, className = "player-dot", style, ...props }: HTMLAttributes<HTMLElement> & { color?: string }) {
  return <i {...props} className={className} style={{ ...style, background: color }} aria-hidden="true" />;
}
