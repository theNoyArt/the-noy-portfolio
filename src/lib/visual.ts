import type { CSSProperties } from "react";
import type { ThemeName } from "../config";

/** Two tints of a hue for striped placeholders, tuned per theme. */
export function tint(hue: number, theme: ThemeName): [string, string] {
  return theme === "dark"
    ? [`oklch(0.22 0.06 ${hue})`, `oklch(0.28 0.09 ${hue})`]
    : [`oklch(0.93 0.035 ${hue})`, `oklch(0.88 0.06 ${hue})`];
}

export function stripes(hue: number, theme: ThemeName, size = 9): string {
  const [a, b] = tint(hue, theme);
  return `repeating-linear-gradient(90deg, ${a} 0 3px, ${b} 3px ${size}px)`;
}

/** The cover image for the current theme: a theme-specific one if set, otherwise the shared one. */
export function coverFor(
  images: { cover?: string | null; coverLight?: string | null; coverDark?: string | null } | undefined,
  theme: ThemeName,
): string | null {
  if (!images) return null;
  return (theme === "dark" ? images.coverDark : images.coverLight) ?? images.cover ?? null;
}

/** Background for an image slot: the image if there is one, otherwise stripes. */
export function imageBg(src: string | null | undefined, fallback: string): CSSProperties {
  return src
    ? { backgroundImage: `url("${src}")`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: fallback };
}

/** Deterministic pseudo-random number from a string, used for placeholder metrics. */
export function hash(str: string, k: number): number {
  let x = 7 + k * 31;
  for (const ch of String(str)) x = (x * 33 + ch.charCodeAt(0)) % 9973;
  return x;
}
