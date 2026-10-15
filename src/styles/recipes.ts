import { tv, type VariantProps } from "tailwind-variants";

/*
 * Shared component recipes (tailwind-variants). Use them as class names:
 *   <button className={button({ variant: "outline", size: "sm" })}>
 * Theme differences use the glass: (Glass light) and cyber: (Cyber dark) variants.
 */

const GLASS_GRADIENT_BTN =
  "glass:border glass:border-white/50 glass:bg-transparent glass:bg-[linear-gradient(135deg,#5a2fd0_0%,#6e4ae6_55%,#7356e8_100%)] glass:text-white " +
  "glass:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-10px_rgba(90,47,208,0.7),0_0_24px_-6px_rgba(140,110,255,0.45)]";

/* ---------------------------------------------------------------- page sections */

export const section = tv({
  base: "flex flex-col gap-8 border-t border-line2 px-page py-[clamp(56px,7cqi,120px)]",
});

export const sectionHead = tv({
  base: "flex max-w-[760px] flex-col gap-3",
  variants: { wide: { true: "max-w-[880px] gap-[18px]" } },
});

export const sectionTitle = tv({
  base: "display text-[calc(clamp(36px,4.6cqi,72px)*var(--h1-scale,1))] leading-none text-balance",
});

export const sectionDesc = tv({
  base: "text-[17px] text-pretty text-muted",
  variants: { size: { md: "", sm: "text-[16px]" } },
});

/** Small uppercase mono label. `head` = the label above a section title (gets ✦ in Glass light). */
export const monoLabel = tv({
  base: "font-mono text-[11px] tracking-[0.1em] text-muted uppercase",
  variants: {
    tone: {
      muted: "",
      accent: "text-accent",
      dev: "text-dev-accent",
      devMuted: "text-dev-muted",
      inherit: "text-inherit opacity-70",
    },
    head: {
      true: "text-[11.5px] glass:before:mr-2 glass:before:text-[#8a6cf0] glass:before:content-['✦']",
    },
  },
  defaultVariants: { tone: "muted" },
});

/* ---------------------------------------------------------------- buttons */

export const button = tv({
  base: "inline-flex h-12 cursor-pointer py-0 items-center gap-[10px] rounded-card-sm px-5 text-[15px] whitespace-nowrap glass:rounded-full",
  variants: {
    variant: {
      primary:
        "border-0 bg-ink font-semibold text-bg shadow-glow transition-[background-color,color,border-radius] duration-300 hover:bg-accent hover:text-accent-ink " +
        GLASS_GRADIENT_BTN +
        " glass:hover:bg-[linear-gradient(135deg,#4f26c2_0%,#6440dc_55%,#6a4ce0_100%)] glass:hover:text-white",
      outline:
        "glass:glass-blur border border-line2 bg-transparent px-[18px] transition-[border-color] duration-[250ms] hover:border-accent hover:text-inherit " +
        "glass:border-white/95 glass:bg-white/60 glass:shadow-[0_0_0_1px_rgba(110,80,220,0.12),0_6px_14px_-8px_rgba(90,60,200,0.35)] " +
        "glass:hover:border-white glass:hover:shadow-[0_0_0_1px_rgba(110,80,220,0.3),0_8px_18px_-8px_rgba(90,60,200,0.45)]",
      accent:
        "bg-accent font-semibold text-accent-ink shadow-glow transition-transform duration-[250ms] hover:-translate-y-0.5 hover:text-accent-ink " +
        GLASS_GRADIENT_BTN,
    },
    size: {
      md: "",
      sm: "h-9 self-start px-3 text-[13px]",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export const iconButton = tv({
  base: "inline-flex flex-none cursor-pointer items-center justify-center",
  variants: {
    size: {
      md: "glass:glass-blur h-11 w-11 rounded-card-sm border border-line2 bg-surface text-[18px] glass:border-glass-edge glass:shadow-glass",
      sm: "glass:glass-blur h-10 w-10 rounded-card-sm border border-line2 bg-transparent text-[16px] glass:border-glass-edge glass:shadow-glass",
      plain: "h-8 w-8 border-0 bg-transparent text-[16px] text-muted",
    },
  },
  defaultVariants: { size: "md" },
});

/** The small dot that pulses (chat launcher, "open to roles"). */
export const pulseDot = tv({
  base: "h-2 w-2 flex-none animate-pulse-ring rounded-full bg-accent2 glass:bg-[#7a5cf0]",
});

/* ---------------------------------------------------------------- chips and tags */

export const chip = tv({
  base:
    "rounded-card-sm bg-bg px-[9px] py-1 font-mono text-[10.5px] tracking-[0.08em] uppercase " +
    "glass:rounded-full glass:border glass:border-[rgba(110,80,220,0.22)] glass:bg-[rgba(122,92,240,0.08)] glass:shadow-[0_0_10px_-3px_rgba(122,92,240,0.3)]",
});

export const trackTag = tv({
  base:
    "rounded-card-sm px-[7px] py-[2px] font-mono text-[10.5px] tracking-[0.06em] uppercase " +
    "glass:rounded-full glass:border glass:border-[color-mix(in_srgb,var(--tc)_30%,transparent)] glass:bg-[color-mix(in_srgb,var(--tc)_10%,#ffffff)] glass:py-[3px] glass:pr-[10px] glass:pl-2 glass:text-[var(--tc)] " +
    "glass:shadow-[0_0_12px_-3px_color-mix(in_srgb,var(--tc)_30%,transparent)] " +
    "glass:before:mr-[6px] glass:before:inline-block glass:before:h-[6px] glass:before:w-[6px] glass:before:rounded-full glass:before:bg-[var(--tc)] glass:before:align-[1px] " +
    "glass:before:shadow-[0_0_5px_1px_color-mix(in_srgb,var(--tc)_55%,transparent)] glass:before:content-['']",
  variants: {
    track: {
      ux: "bg-accent text-accent-ink [--tc:var(--accent)]",
      dev: "bg-accent2 text-accent2-ink [--tc:#2f5fd8]",
    },
  },
});

export const trackDot = tv({
  base: "mr-[6px] h-2 w-2 flex-none rounded-[2px] bg-transparent glass:h-[7px] glass:w-[7px] glass:rounded-full",
  variants: {
    track: {
      none: "",
      ux: "bg-accent glass:bg-[#7a5cf0] glass:shadow-[0_0_6px_1px_rgba(122,92,240,0.55)]",
      dev: "bg-accent2 glass:bg-[#3b78f0] glass:shadow-[0_0_6px_1px_rgba(59,120,240,0.55)]",
    },
  },
  defaultVariants: { track: "none" },
});

/* ---------------------------------------------------------------- segmented control */

export const seg = tv({
  slots: {
    root:
      "glass:glass-blur overflow-hidden rounded-card-sm border border-line2 " +
      "glass:gap-[3px] glass:rounded-full glass:border-glass-edge glass:bg-white/45 glass:p-[3px] glass:shadow-glass",
    btn:
      "min-h-10 cursor-pointer border-0 bg-transparent px-4 py-[10px] text-[14px] text-muted transition-[background-color,color] duration-300 glass:rounded-full",
  },
  variants: {
    layout: {
      two: { root: "grid grid-cols-2" },
      tabs: { root: "flex", btn: "[&+&]:border-l [&+&]:border-line2 glass:[&+&]:border-l-0" },
    },
    on: {
      true: {
        btn:
          "bg-ink font-semibold text-bg " +
          "glass:bg-white glass:text-ink glass:shadow-[0_1px_3px_rgba(25,20,70,0.14),0_6px_14px_-6px_rgba(25,20,70,0.22)]",
      },
    },
  },
  defaultVariants: { layout: "two" },
});

/* ---------------------------------------------------------------- lists */

/** Rows with a name, meta and arrow (About "see this stage in"). */
export const linkList = tv({
  slots: {
    root: "flex flex-col border-t border-line",
    row:
      "grid cursor-pointer grid-cols-[1fr_auto_auto] items-center gap-3 border-0 border-b border-line bg-transparent px-0 py-3 text-left " +
      "transition-[padding,color] duration-300 hover:pl-2 hover:text-accent",
    name: "text-[16px] font-semibold",
    meta: "font-mono text-[11px] text-muted",
  },
});

/** Key–value list (facts tables). */
export const kv = tv({
  slots: {
    root: "flex flex-col border-t border-line2",
    row: "grid grid-cols-[120px_1fr] gap-3 border-b border-line py-[10px] text-[14px]",
    key: "pt-[2px] font-mono text-[11px] tracking-[0.08em] text-muted uppercase",
    value: "",
  },
  variants: { size: { md: {}, sm: { root: "border-t-line", row: "py-[9px]" } } },
  defaultVariants: { size: "md" },
});

export type ButtonProps = VariantProps<typeof button>;
