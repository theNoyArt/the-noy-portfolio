import { tv } from "../../lib/cn";

/*
 * Shared pieces of the hand-built case studies (DriveThruRPG, Bond, Art practice, Portfolio).
 * Use them inside an element with the `case-scope` utility, which supplies the case-study palette.
 * Theme differences use glass: (Glass light) and cyber: (Cyber dark).
 */

/** ✦ before a section label in Glass light. */
export const star = "glass:before:mr-2 glass:before:text-[#8a6cf0] glass:before:content-star";

/** Page section (.sec). `first` = the opening section, `dev` = inside the build-track zone. */
export const sec = tv({
  base: "flex flex-col gap-7 border-t border-line-2 px-case py-[clamp(48px,6vw,96px)]",
  variants: {
    first: { true: "gap-8 border-t-0 pt-12" },
    dev: { true: "border-t-0" },
  },
});

/** Label row above a section heading, with a link on the right. */
export const secHead = "flex flex-wrap items-baseline justify-between gap-3";

/** Section heading (h2). */
export const secTitle =
  "case-heading max-w-[26ch] text-[clamp(28px,2.8vw,44px)] leading-[1.05] text-balance";

/** Small link next to a section label ("… in Figma ↗"). */
export const secLink = "border-b border-accent pb-[2px] font-mono text-[12px]";

/** Small uppercase mono label. `star` = directly above a section heading (gets ✦ in Glass light). */
export const label = tv({
  base: "font-mono text-[11px] tracking-[0.1em] text-muted uppercase",
  variants: {
    tone: {
      muted: "",
      accent: "text-accent",
      dev: "text-dev-muted",
      devAccent: "text-dev-accent",
    },
    star: { true: star },
  },
  defaultVariants: { tone: "muted" },
});

/** Top row of the opening section: section number, kind, year. */
export const metaRow = tv({
  slots: {
    root: "flex flex-wrap justify-between gap-3 border-b border-line-2 pb-[14px] font-mono text-[11px] tracking-[0.1em] text-muted uppercase",
    first: star,
  },
});

/** Project title (h1), with a gradient fill in Glass light. Pair with caseTitleSub and caseTitleDot. */
export const caseTitle =
  "display text-[clamp(52px,8vw,132px)] leading-[0.9] text-balance " +
  "glass:text-clip glass:bg-[linear-gradient(180deg,#1b1630_0%,#3b3166_38%,#7a6bb8_52%,#2a2348_64%,#4c3f86_100%)]";
export const caseTitleSub =
  "text-muted glass:text-clip glass:bg-[linear-gradient(100deg,#5a2fd0,#8a6cf0_60%,#5a2fd0)]";
export const caseTitleDot = "text-accent glass:[-webkit-text-fill-color:#8a6cf0]";

export const lead = "max-w-[62ch] text-[clamp(19px,1.6vw,23px)] leading-[1.4] text-pretty";

export const bodyMuted = tv({
  base: "max-w-[65ch] text-[16px] text-pretty text-muted",
  variants: { dev: { true: "text-dev-muted" } },
});

/** Heading on one side, text on the other; one column when narrow. */
export const twoCol = tv({
  base: "grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-[clamp(24px,4vw,56px)] gap-y-6",
  variants: { end: { true: "items-end" } },
});

/* ---------------------------------------------------------------- buttons */

export const btnRow = "flex flex-wrap gap-[10px]";

/** Case-study button. `devPrimary`/`devOutline` sit inside the build-track zone. */
export const caseBtn = tv({
  base:
    "inline-flex min-h-12 items-center gap-2 rounded-card border border-line-2 px-[18px] py-0 text-[15px] whitespace-nowrap " +
    "glass:rounded-full",
  variants: {
    variant: {
      outline: "glass-blur border-glass-edge shadow-glass",
      primary:
        "border-accent bg-accent font-semibold text-accent-ink hover:text-accent-ink " +
        "shadow-[var(--glow),0_8px_20px_-8px_color-mix(in_srgb,var(--accent)_60%,transparent)] " +
        "glass:border-white/50 glass:bg-[linear-gradient(135deg,#5a2fd0_0%,#6e4ae6_55%,#7356e8_100%)] " +
        "glass:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-10px_rgba(90,47,208,0.7),0_0_24px_-6px_rgba(140,110,255,0.45)]",
      devOutline:
        "glass-blur border-glass-edge text-dev-ink shadow-glass hover:text-dev-ink " +
        "glass:border-white/95 glass:bg-white/70 glass:shadow-[0_0_0_1px_rgba(47,95,216,0.12),0_6px_14px_-8px_rgba(47,95,216,0.35)]",
      devPrimary:
        "border-dev-accent bg-dev-accent font-semibold text-dev-bg hover:text-dev-bg " +
        "glass:border-white/50 glass:bg-[linear-gradient(135deg,#2f5fd8_0%,#3f74ea_55%,#4a80f0_100%)] glass:text-white glass:hover:text-white " +
        "glass:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-10px_rgba(47,95,216,0.7),0_0_24px_-6px_rgba(80,140,255,0.5)]",
    },
  },
  defaultVariants: { variant: "outline" },
});

/** An outside link without a URL yet. */
export const todoLink = "cursor-not-allowed opacity-55 hover:text-inherit";

/* ---------------------------------------------------------------- lists */

/** Key–value facts (dl). */
export const caseKv = tv({
  slots: {
    root: "flex flex-col border-t border-line-2",
    row: "grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-b border-line py-[10px] text-[14px]",
    key: "pt-[2px] font-mono text-[11px] tracking-[0.08em] text-muted uppercase",
  },
});

/** Numbered steps next to a wireframe. `mobile` uses the second accent for the numbers. */
export const steps = tv({
  slots: {
    root: "flex list-none flex-col border-t border-line p-0",
    item: "grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-b border-line py-3",
    n: "flex h-[26px] w-[26px] items-center justify-center rounded-full bg-accent font-mono text-[12px] font-medium text-accent-ink",
    title: "block text-[15.5px] font-semibold",
    desc: "block text-[14px] text-pretty text-muted",
  },
  variants: { mobile: { true: { n: "bg-accent-2 text-accent-2-ink" } } },
});

/** Design notes: a bold title over a muted line. `extra` = inside the dashed "not yet" box. */
export const notes = tv({
  slots: {
    root: "flex list-none flex-col border-t border-line p-0",
    item: "flex flex-col gap-1 border-b border-line py-3",
    title: "text-[15.5px] font-semibold",
    desc: "text-[14px] leading-[1.55] text-muted",
    tag: "self-start rounded-[4px] border border-line-2 px-[6px] py-[2px] font-mono text-[14px] leading-[1.55] tracking-[0.08em] text-accent uppercase",
  },
  variants: { extra: { true: { root: "border-t-0", item: "last:border-b-0 last:pb-0" } } },
});

/* ---------------------------------------------------------------- controls */

/** Pill segmented control; the pressed button follows aria-pressed. */
export const seg = tv({
  slots: {
    root: "glass-blur inline-flex rounded-full border border-glass-edge bg-bg p-[3px] shadow-glass",
    btn:
      "min-h-10 cursor-pointer rounded-full border-0 bg-transparent px-[18px] py-0 font-mono text-[12px] tracking-[0.08em] text-muted uppercase hover:text-ink " +
      "aria-pressed:bg-[color:var(--on-bg,var(--ink))] aria-pressed:text-[color:var(--on-ink,var(--bg))] aria-pressed:shadow-[var(--on-shadow,none)]",
  },
});

/** Row of controls (segmented switch + hint). */
export const controls = "flex flex-wrap items-center gap-x-5 gap-y-3";

/* ---------------------------------------------------------------- panels */

/** Wireframe / mockup frame next to its notes. */
export const wfRow = tv({
  slots: {
    root: "grid items-start gap-x-8 gap-y-5 pt-2 max-[899px]:grid-cols-[minmax(0,1fr)]",
    preview: "",
    side: "sticky top-6 max-[899px]:static",
    sideLabel: "pb-2",
  },
  variants: {
    layout: {
      desktop: { root: "grid-cols-[minmax(0,1fr)_minmax(260px,340px)]" },
      board: { root: "grid-cols-[minmax(0,1fr)_minmax(260px,340px)]" },
      mobile: {
        root: "grid-cols-[minmax(0,340px)_minmax(0,1fr)]",
        preview: "max-[899px]:mx-auto max-[899px]:w-full max-[899px]:max-w-[360px]",
      },
      single: {
        root: "grid-cols-[minmax(0,360px)_minmax(0,1fr)]",
        preview: "max-[899px]:mx-auto max-[899px]:w-full max-[899px]:max-w-[360px]",
      },
    },
  },
  defaultVariants: { layout: "desktop" },
});

/* ---------------------------------------------------------------- lens */

/**
 * The redesign in one theme, the other revealed in a circle under the cursor. The host sets
 * --mx, --my and --r on the stage; `open` = opened by a tap.
 */
export const heroLens = tv({
  slots: {
    root: "flex flex-col gap-2",
    stage:
      "group/lens glass-blur lens-scan relative aspect-[16/8] cursor-crosshair touch-pan-y overflow-hidden rounded-card border border-line-2 bg-surface-2 shadow-glass " +
      "[--mx:50%] [--my:50%] [--r:0px]",
    layer: "absolute inset-0 bg-cover bg-[position:center_top] bg-no-repeat",
    back: "lens-clip cyber:group-hover/lens:animate-lens-glitch",
    ring:
      "lens-ring opacity-0 group-hover/lens:opacity-100 " +
      "glass:group-hover/lens:before:animate-lens-echo glass:group-hover/lens:after:animate-lens-echo-late",
    chip:
      "pointer-events-none absolute bottom-3 left-3 rounded-full border border-line-2 bg-bg px-[9px] py-1 font-mono text-[11px] text-muted opacity-0 " +
      "[transition:opacity_0.2s] group-hover/lens:opacity-100",
    cap: "flex flex-wrap justify-between gap-x-3 gap-y-1 font-mono text-[11.5px] text-muted",
  },
  variants: {
    open: {
      true: {
        back: "cyber:animate-lens-glitch",
        ring: "opacity-100 glass:before:animate-lens-echo glass:after:animate-lens-echo-late",
        chip: "opacity-100",
      },
    },
  },
});
