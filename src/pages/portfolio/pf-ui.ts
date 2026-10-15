import { tv } from "../../lib/cn";

/*
 * Pieces of the Portfolio case study that the shared case recipes (../dtrpg/case-ui.ts) do not cover.
 * Use them inside the page's `case-scope` root. Theme differences use glass: and cyber:.
 */

/** Frosted card (stack items, feature cards). */
export const card =
  "glass-blur relative rounded-card border border-line-2 bg-surface glass:border-glass-edge glass:shadow-glass";

/** Sub-section inside a section: a heading row over its content. */
export const sub = tv({
  slots: {
    root: "mt-7 flex flex-col gap-4",
    head: "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-2 pb-3",
    title: "display m-0 text-[clamp(22px,2vw,28px)]",
  },
});

/* ---------------------------------------------------------------- hero */

/** Glass / Cyber switch with a sliding knob; `dark` = the site is in Cyber dark. */
export const themeSwitch = tv({
  slots: {
    root:
      "relative isolate inline-grid cursor-pointer grid-cols-2 rounded-full border border-line-2 bg-surface p-1 " +
      "[transition:border-color_0.3s,box-shadow_0.3s] cyber:rounded-none " +
      "hover:border-accent hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_15%,transparent),0_0_24px_-6px_var(--accent)]",
    light: "",
    dark: "",
    icon: "h-[15px] w-[15px] fill-current",
    knob:
      "absolute top-1 bottom-1 left-1 z-0 w-[calc(50%_-_4px)] rounded-full bg-[linear-gradient(135deg,#5a2fd0,#3b78f0)] " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_16px_-6px_rgba(90,47,208,0.7)] " +
      "[transition:transform_0.45s_cubic-bezier(0.3,1.4,0.5,1),background_0.35s,border-radius_0.35s] motion-reduce:[transition:none]",
  },
  variants: {
    dark: {
      false: { light: "text-white" },
      true: {
        dark: "text-[#0a0910]",
        knob:
          "[transform:translateX(100%)] rounded-none bg-[linear-gradient(135deg,#c58bff,#7fd7e8)] shadow-[0_0_18px_rgba(197,139,255,0.7)]",
      },
    },
  },
});

/** One side of the theme switch (pair with themeSwitch's light/dark slot for the active colour). */
export const switchOpt =
  "relative z-[1] inline-flex h-[38px] min-w-[104px] items-center justify-center gap-[7px] px-[14px] py-0 " +
  "font-mono text-[12px] font-semibold tracking-[0.08em] text-muted uppercase [transition:color_0.35s]";

/* ---------------------------------------------------------------- lo-fi page maps */

const box = "relative rounded-[10px] border-[1.5px] px-[14px] py-3 cyber:rounded-none";
const stripes =
  "bg-[repeating-linear-gradient(135deg,transparent_0_10px,color-mix(in_srgb,var(--ink)_3%,transparent)_10px_20px)]";
const band = "flex flex-col gap-1 border-dashed py-[6px]";

/** Lo-fi wireframe of a page layout, with numbered pins. `home` leaves room for the chat button. */
export const pfMap = tv({
  slots: {
    root:
      "relative grid grid-cols-[150px_minmax(0,1fr)] gap-[10px] rounded-card border-[1.5px] border-dashed border-line-2 p-[14px] text-[13px] " +
      "cyber:rounded-none max-[599px]:grid-cols-[minmax(0,1fr)]",
    side: `${box} ${stripes} flex flex-col gap-2 border-line-2`,
    main: "relative flex flex-col gap-2",
    /** Block title. */
    b: "block font-mono text-[11px] tracking-[0.06em] text-ink uppercase",
    /** Muted line of text. */
    t: "text-muted",
    push: "mt-auto text-muted",
    chat:
      "absolute right-[22px] bottom-[22px] rounded-full bg-accent px-3 py-[6px] text-[12px] font-semibold text-accent-ink cyber:rounded-none " +
      "max-[599px]:static max-[599px]:justify-self-end",
  },
  variants: {
    home: { true: { root: "pb-[52px]", chat: "bottom-3" } },
  },
});

/** A row of the page map. `hero` and `tall` hold two cells; `band` / `dev` mark the track zones. */
export const mapRow = tv({
  slots: {
    root: "relative",
    bandText: "font-mono text-[11px] text-accent",
  },
  variants: {
    kind: {
      plain: { root: `${box} ${stripes} flex flex-col gap-1 border-line-2` },
      hero: { root: "grid grid-cols-[1fr_1fr] gap-2 max-[599px]:grid-cols-[minmax(0,1fr)]" },
      tall: { root: "grid grid-cols-[1.1fr_0.9fr] gap-2 max-[599px]:grid-cols-[minmax(0,1fr)]" },
      band: {
        root:
          `${box} ${band} border-[color-mix(in_srgb,var(--accent)_50%,transparent)] ` +
          "bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]",
      },
      dev: {
        root:
          `${box} ${band} border-[color-mix(in_srgb,var(--accent-2)_50%,transparent)] ` +
          "bg-[color-mix(in_srgb,var(--accent-2)_8%,transparent)]",
        bandText: "text-accent-2",
      },
    },
  },
  defaultVariants: { kind: "plain" },
});

/** A cell of a two-cell map row. `alt` = the swappable panel (accent edge). */
export const mapCell = tv({
  base: `${box} ${stripes} min-h-[90px]`,
  variants: {
    tall: { true: "min-h-[110px]" },
    alt: { false: "border-line-2", true: "border-[color-mix(in_srgb,var(--accent)_50%,transparent)]" },
  },
  defaultVariants: { alt: false },
});

const sketch = "mt-[6px] grid gap-[6px] cyber:*:rounded-none";
const outlined = "*:rounded-[6px] *:border-[1.5px] *:border-line-2";

/** Tiny sketches inside the map rows (children are empty <i>s). */
export const mapSketch = {
  tabs: `${sketch} ${outlined} grid-cols-[repeat(4,1fr)] *:h-[14px] *:first:bg-[color-mix(in_srgb,var(--accent)_25%,transparent)]`,
  cards: `${sketch} ${outlined} grid-cols-[repeat(3,1fr)] *:h-7`,
  lanes: `${sketch} *:block *:h-[7px] *:rounded-[4px] *:bg-[color-mix(in_srgb,var(--accent)_45%,transparent)]`,
  kv: `${sketch} *:h-[6px] *:w-[80%] *:rounded-[3px] *:bg-line-2`,
  stats: `${sketch} grid-cols-[repeat(3,1fr)] *:font-mono *:text-[13px] *:font-bold *:text-ink *:not-italic`,
  chips: `${sketch} ${outlined} grid-cols-[repeat(3,60px)] *:h-[14px]`,
  split: `${sketch} ${outlined} grid-cols-[2fr_1fr] *:h-[44px]`,
  /** Swatches mixing from the accent to the second accent; each <i> sets --k (0–5). */
  sw: `${sketch} grid-cols-[repeat(6,1fr)] *:h-[18px] *:rounded-[4px] *:bg-[color-mix(in_srgb,var(--accent)_calc(100%_-_var(--k,0)_*_15%),var(--accent-2))]`,
};

/** Lo-fi phone frame for the mobile layouts: rows stack inside a narrow, rounded outline. */
export const pfPhone = tv({
  slots: {
    root:
      "relative mx-auto flex w-full max-w-[300px] flex-col gap-2 rounded-[30px] border-[1.5px] border-dashed border-line-2 px-3 pt-7 pb-5 text-[12.5px] " +
      "cyber:rounded-none",
    notch: "absolute top-[10px] left-1/2 h-[5px] w-[56px] -translate-x-1/2 rounded-full bg-line-2 cyber:rounded-none",
    /** Top bar / section bar: a single row with items at both ends. */
    bar: `${box} flex items-center justify-between gap-2 border-line-2 py-2`,
    /** Section bar: leaves room under the controls for the progress line. */
    sectionBar: `${box} flex items-center gap-2 border-line-2 pt-2 pb-[13px]`,
    /** A small outlined control in a bar (menu, back, dropdown). */
    ctl: "rounded-[6px] border-[1.5px] border-line-2 px-[6px] py-[1px] font-mono text-[10px] text-muted cyber:rounded-none",
    /** Thin reading-progress line under the section bar. */
    progress: "absolute right-3 bottom-[5px] left-3 h-[2px] bg-[linear-gradient(90deg,var(--accent)_0_40%,transparent_40%)]",
    chat:
      "absolute right-4 bottom-3 z-[2] rounded-full bg-accent px-[10px] py-[5px] text-[11px] font-semibold text-accent-ink shadow-[0_0_0_3px_var(--bg)] cyber:rounded-none",
  },
});

/** Sketches only the phone frames use. */
export const phoneSketch = {
  /** Two stacked full-width buttons, the first one filled. */
  ctas: `${sketch} ${outlined} grid-cols-1 *:h-[14px] *:first:bg-[color-mix(in_srgb,var(--accent)_30%,transparent)]`,
  /** Email field across, then two equal link buttons. */
  contact: `${sketch} ${outlined} grid-cols-2 *:h-[14px] *:first:col-span-2`,
  /** One column of cards. */
  cards: `${sketch} ${outlined} grid-cols-1 *:h-6`,
  /** The sticky company strip: chips in a row, the first one selected. */
  strip: `${sketch} ${outlined} grid-cols-[repeat(3,1fr)] *:h-[14px] *:first:border-accent *:first:bg-[color-mix(in_srgb,var(--accent)_20%,transparent)]`,
};

/** The notes column of the split sketch: ruled lines. */
export const splitNotes =
  "bg-[repeating-linear-gradient(180deg,var(--line-2)_0_2px,transparent_2px_9px)] bg-clip-content p-[6px]";

/** Numbered pin on the map. `chat` = on the chat button. */
export const pin = tv({
  base:
    "absolute -top-[9px] -left-[9px] z-[2] grid h-[20px] min-w-[20px] place-items-center rounded-full bg-accent px-1 " +
    "font-mono text-[10.5px] font-bold text-accent-ink not-italic shadow-[0_0_0_3px_var(--bg)] cyber:rounded-none",
  variants: { chat: { true: "-top-[10px] -left-[10px]" } },
});

/* ---------------------------------------------------------------- mood boards */

/**
 * A theme's mood board. Each board keeps its own palette (--m-*) whatever theme the page is in.
 */
export const mood = tv({
  slots: {
    root: "relative flex flex-col gap-4 overflow-hidden p-[22px] text-[color:var(--m-ink)]",
    head: "flex flex-col gap-1",
    k: "font-mono text-[10.5px] tracking-[0.1em] text-[color:var(--m-acc)] uppercase",
    name: "m-0 font-[family-name:var(--m-display)] text-[32px] leading-[1.05] font-semibold tracking-[-0.03em]",
    concept: "text-[14.5px] text-[color:var(--m-muted)]",
    grid: "grid grid-cols-[1.1fr_1fr] grid-rows-[auto_auto] gap-[10px] max-[599px]:grid-cols-[minmax(0,1fr)]",
    tex: "row-span-2 grid min-h-[230px] place-items-center overflow-hidden max-[599px]:row-auto max-[599px]:min-h-[180px]",
    texCard: "",
    type:
      "flex min-h-[110px] flex-col justify-between rounded-[14px] border border-[color:var(--m-line)] p-[14px] " +
      "bg-[color-mix(in_srgb,var(--m-bg)_70%,transparent)]",
    aa: "font-[family-name:var(--m-display)] text-[54px] leading-none font-semibold",
    fonts: "font-mono text-[10.5px] text-[color:var(--m-muted)]",
    ui: "flex min-h-[110px] flex-col justify-center gap-[10px]",
    sw: "col-span-full m-0 grid list-none grid-cols-5 gap-2 p-0 max-[599px]:grid-cols-3",
    swItem: "flex flex-col gap-[3px] text-[11.5px]",
    swChip: "h-[54px] rounded-[12px] border border-[color:var(--m-line)]",
    swCode: "font-mono text-[10px] text-[color:var(--m-muted)]",
    trend:
      "border-l-[3px] border-l-[color:var(--m-acc)] bg-[color-mix(in_srgb,var(--m-acc)_10%,transparent)] px-[14px] py-3 text-[14px] leading-[1.5]",
    kw: "flex list-none flex-wrap gap-[6px] p-0",
    kwItem: "rounded-full border border-[color:var(--m-line)] px-[11px] py-1 text-[12.5px] text-[color:var(--m-ink)]",
  },
  variants: {
    kind: {
      glass: {
        root:
          "[--m-bg:#f2f0fb] [--m-ink:#111018] [--m-muted:#4d4766] [--m-acc:#5a2fd0] [--m-acc2:#3b78f0] [--m-line:rgba(60,40,140,0.14)] " +
          "[--m-display:Instrument_Sans,system-ui,sans-serif] " +
          "rounded-[24px] border border-[rgba(255,255,255,0.9)] shadow-[0_30px_60px_-30px_rgba(90,60,200,0.45)] " +
          "[background:radial-gradient(40%_40%_at_15%_10%,rgba(232,111,196,0.35),transparent_70%),radial-gradient(45%_45%_at_90%_20%,rgba(59,120,240,0.3),transparent_70%),radial-gradient(50%_50%_at_50%_100%,rgba(138,108,240,0.35),transparent_70%),var(--m-bg)]",
        tex:
          "rounded-[18px] " +
          "[background:radial-gradient(circle_at_30%_35%,#e86fc4_0_18%,transparent_19%),radial-gradient(circle_at_70%_65%,#3b78f0_0_22%,transparent_23%),radial-gradient(circle_at_65%_25%,#8a6cf0_0_14%,transparent_15%),#d9d2f7]",
        texCard:
          "grid aspect-[1.3] w-[70%] place-items-center rounded-[20px] border border-[rgba(255,255,255,0.85)] bg-[rgba(255,255,255,0.35)] " +
          "[-webkit-backdrop-filter:blur(16px)_saturate(1.6)] [backdrop-filter:blur(16px)_saturate(1.6)] " +
          "shadow-[inset_0_1px_0_#fff,0_20px_40px_-20px_rgba(60,30,140,0.5)] " +
          "font-[family-name:var(--m-display)] text-[44px] font-medium text-[#1b1630]",
        aa: "text-clip bg-[linear-gradient(100deg,#5a2fd0,#3b78f0)] font-medium",
      },
      cyber: {
        root:
          "[--m-bg:#0a0910] [--m-ink:#ebe8f4] [--m-muted:#a29cb8] [--m-acc:#c58bff] [--m-acc2:#7fd7e8] [--m-line:rgba(170,150,255,0.3)] " +
          "[--m-display:Tomorrow,Hanken_Grotesk,sans-serif] " +
          "rounded-none border border-[color:var(--m-line)] shadow-[0_0_50px_-16px_rgba(197,139,255,0.5)] " +
          "[background:repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0_1px,transparent_1px_3px),linear-gradient(rgba(170,150,255,0.06)_1px,transparent_1px)_0_0/22px_22px,linear-gradient(90deg,rgba(170,150,255,0.06)_1px,transparent_1px)_0_0/22px_22px,var(--m-bg)]",
        name: "[text-shadow:0_0_18px_rgba(197,139,255,0.55)]",
        tex:
          "relative border border-[color:var(--m-line)] " +
          "[background:linear-gradient(transparent_60%,rgba(197,139,255,0.25)),repeating-linear-gradient(90deg,rgba(197,139,255,0.35)_0_1px,transparent_1px_28px),linear-gradient(180deg,#0a0910_50%,#1c1030)] " +
          "before:absolute before:top-[22%] before:left-1/2 before:-ml-[35px] before:h-[70px] before:w-[70px] before:rounded-full before:content-[''] " +
          "before:bg-[linear-gradient(180deg,#ff8fd8,#c58bff_60%,transparent_61%)] before:shadow-[0_0_40px_rgba(255,143,216,0.6)]",
        texCard:
          "relative mb-[18px] self-end border border-[#7fd7e8] bg-[rgba(10,9,16,0.8)] px-[10px] py-[6px] " +
          "font-mono text-[13px] text-[#7fd7e8] [text-shadow:0_0_8px_rgba(127,215,232,0.8)]",
        type: "rounded-none",
        aa: "text-[color:var(--m-acc)] [text-shadow:0_0_16px_rgba(197,139,255,0.7)]",
        swChip: "rounded-none",
        kwItem: "rounded-none font-mono text-[11.5px] text-[color:var(--m-acc2)] uppercase",
      },
    },
  },
});

/** Glass light UI fragment: a gradient button and a pill. */
export const moodBtn =
  "self-start rounded-full bg-[linear-gradient(135deg,#5a2fd0,#7356e8)] px-4 py-[9px] text-[13px] font-semibold text-white " +
  "shadow-[0_10px_22px_-10px_rgba(90,47,208,0.8)]";
export const moodPill =
  "self-start rounded-full border border-[rgba(90,47,208,0.3)] bg-[rgba(255,255,255,0.6)] px-3 py-[5px] text-[12px] font-semibold";

/** Cyber dark UI fragment: an achievement toast and an HP bar. */
export const moodToast = tv({
  slots: {
    root:
      "flex items-center gap-[10px] border border-[rgba(127,215,232,0.6)] bg-[#141024] px-3 py-2 text-[13px] font-semibold " +
      "shadow-[0_0_24px_-6px_rgba(127,215,232,0.6)]",
    icon: "text-[18px] text-[#7fd7e8]",
    text: "flex flex-col",
    k: "font-mono text-[9px] tracking-[0.1em] text-[#7fd7e8] not-italic",
    hp: "h-[10px] border border-[color:var(--m-line)] p-[2px]",
    hpFill: "block h-full w-[72%] bg-[repeating-linear-gradient(90deg,#c58bff_0_8px,transparent_8px_10px)]",
  },
});

/* ---------------------------------------------------------------- design-system spec */

export const dsSpec = tv({
  slots: {
    dl: "m-0 border-t border-line-2",
    row: "grid grid-cols-[90px_minmax(0,1fr)] gap-3 border-b border-line py-3 text-[14.5px]",
    dt: "pt-[2px] font-mono text-[11px] tracking-[0.08em] text-muted uppercase",
    notes: "flex flex-col gap-[10px]",
    ol: "m-0 flex list-none flex-col gap-3 p-0 [counter-reset:n]",
    li:
      "grid grid-cols-[30px_minmax(0,1fr)] gap-[10px] text-[14.5px] leading-[1.5] [counter-increment:n] " +
      "before:pt-[2px] before:font-mono before:text-[12px] before:text-accent before:content-[counter(n,decimal-leading-zero)]",
  },
});
