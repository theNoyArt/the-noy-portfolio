import { clsx, type ClassValue } from "clsx";
import { createTV } from "tailwind-variants";
import { extendTailwindMerge, validators } from "tailwind-merge";

/**
 * Teaches tailwind-merge the custom theme names from src/styles/app.css and tw/*.css. Without it,
 * `rounded-card` vs `rounded-full` or `shadow-glass` vs `shadow-[…]` are both kept and CSS order
 * decides, so variant and className overrides can silently lose. Animations are all custom
 * (`animate-tg-bob`, `animate-flicker`…), so any name counts as one.
 */
const twMergeConfig = {
  extend: {
    theme: {
      radius: ["card", "card-sm"],
      shadow: ["glow", "glass", "pop", "card-hover"],
      animate: [validators.isAny],
    },
  },
};

const twMerge = extendTailwindMerge(twMergeConfig);

/** Join class names and resolve Tailwind conflicts (the last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** tailwind-variants with the same merge rules as cn(). Import tv from here, not the package. */
export const tv = createTV({ twMergeConfig });
