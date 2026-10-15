import { tv } from "../lib/cn";
import { monoLabel } from "../styles/recipes";

/** Popovers and full-screen layers stay nearly opaque in Glass light so text over them reads cleanly. */
export const GLASS_LAYER =
  "glass:border-glass-edge glass:bg-[rgba(248,246,255,0.88)] glass:backdrop-blur-[26px] glass:backdrop-saturate-[1.6]";

/** Contact / project link list in the sidebar (Sidebar and dtrpg CaseLinks). */
export const caseLinks = tv({
  slots: {
    root: "flex flex-col",
    label: monoLabel({ class: "pb-[6px] text-[10.5px]" }),
    link:
      "group/link flex items-center gap-[10px] border-b border-line py-[7px] text-[14px] text-muted hover:text-ink " +
      "[@media(max-height:880px)]:py-[5px] [@media(max-height:880px)]:text-[13.5px]",
    todo:
      "flex cursor-default items-center gap-[10px] border-b border-line py-[7px] text-[14px] text-muted opacity-60 " +
      "[@media(max-height:880px)]:py-[5px] [@media(max-height:880px)]:text-[13.5px]",
    icon:
      "h-4 w-4 flex-none fill-none stroke-current opacity-80 [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.75] " +
      "group-hover/link:text-accent group-hover/link:opacity-100",
    text: "flex-1",
    arrow:
      "text-accent transition-transform duration-200 group-hover/link:translate-x-[2px] group-hover/link:translate-y-[-2px] " +
      "glass:grid glass:h-[22px] glass:w-[22px] glass:place-items-center glass:rounded-full glass:border glass:border-[rgba(122,92,240,0.22)] " +
      "glass:bg-[rgba(122,92,240,0.08)] glass:text-[11px] glass:text-[#5a2fd0] glass:transition-[background,box-shadow,color] " +
      "glass:group-hover/link:translate-none glass:group-hover/link:border-[#6e4ae6] glass:group-hover/link:bg-[#6e4ae6] glass:group-hover/link:text-white " +
      "glass:group-hover/link:shadow-[0_0_10px_1px_rgba(122,92,240,0.5)]",
    soon: "font-mono text-[10px] tracking-[0.06em] uppercase",
  },
});
