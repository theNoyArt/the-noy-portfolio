import { useApp } from "../app/AppContext";
import { Achievements } from "./Achievements";
import { Disciplines } from "./Disciplines";

/** The right-hand hero panel (desktop only): the disciplines graphic in Glass light, achievements in Cyber dark. */
export function HeroMedia() {
  const { theme, narrow } = useApp();
  const light = theme === "light";
  // On mobile the hero panel (achievements in Cyber, disciplines in Glass) is left out:
  // the hero stays short and to the point.
  if (narrow) return null;
  return (
    <div
      data-hero-media
      className="relative overflow-clip pr-[clamp(16px,3.5cqi,56px)] [overflow-clip-margin:40px]"
    >
      {light ? <Disciplines /> : <Achievements />}
    </div>
  );
}
