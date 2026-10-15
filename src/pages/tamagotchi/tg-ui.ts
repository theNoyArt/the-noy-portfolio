import { tv } from "tailwind-variants";
import { label } from "../dtrpg/case-ui";

/*
 * Pieces shared by the work-in-progress project pages (Bond, Art practice). They sit inside
 * `tgRoot`, which adds the page's own colours on top of the case-study palette (case-scope).
 */

/** Page root: the case-study palette plus the project colours (--tg-pink, --tg-done). */
export const tgRoot =
  "case-scope [--tg-pink:#e86fc4] [--tg-done:#2fbf7a] cyber:[--tg-pink:#ff8fd8] cyber:[--tg-done:#4fe0a0]";

/** Glass card. In Cyber dark --glass-edge is the plain line colour and --glass-shadow is none. */
export const card = tv({
  base: "glass-blur relative rounded-card border border-glass-edge bg-surface shadow-glass",
});

/** Section label + heading (h2), with an optional note on the right. */
export const secLabel = label({ tone: "accent", star: true });
export const secTitle = "display max-w-[26ch] text-[clamp(28px,2.8vw,44px)] leading-[1.05] text-balance";
/** Short note next to a section heading. */
export const headNote = "max-w-[46ch]";

/** Small mono caption under a drawing or sketch. */
export const cap = "font-mono text-[11px] text-muted";

/** Pulsing status dot ("work in progress", "working on now"). A plain box-shadow, so tg-ping animates from it. */
export const wipDot =
  "h-2 w-2 animate-tg-ping rounded-full bg-accent [box-shadow:0_0_0_0_color-mix(in_srgb,var(--improvement)_50%,transparent)]";

/* ---------------------------------------------------------------- overview */

/** Text on one side, the device / sketch on the other. */
export const ov = {
  root: "grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center gap-x-[clamp(32px,5vw,80px)] gap-y-10 max-[899px]:grid-cols-1",
  text: "flex flex-col gap-7",
  /** Size of the project title (with caseTitle). */
  title: "text-[clamp(52px,6.4vw,110px)] leading-[0.9]",
  /** Subtitle and stage share one width: the stage stretches to the subtitle. */
  headline: "-mt-3 flex flex-col gap-[14px] self-start",
  subtitle:
    "flex flex-wrap items-center gap-x-[14px] gap-y-2 font-display text-[clamp(22px,2.2vw,32px)] leading-[1.15] text-accent",
  /** Next to the title: the device or the UI sketch with its caption. */
  aside: "flex flex-col items-center gap-[14px]",
};

/** Header status: which stage the project is in, with step marks. */
export const stage = tv({
  slots: {
    root:
      "inline-flex flex-wrap items-center gap-x-3 gap-y-2 self-stretch rounded-full border border-[color-mix(in_srgb,var(--accent)_55%,transparent)] " +
      "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] py-2 pr-4 pl-3 cyber:rounded-none",
    dot: "h-[10px] w-[10px] animate-tg-ping rounded-full bg-accent cyber:rounded-none",
    k: "font-mono text-[11px] tracking-[0.08em] text-accent uppercase",
    v: "text-[15px] font-bold",
    steps: "ml-auto inline-flex gap-1",
    step: "h-[5px] w-[18px] rounded-[3px] bg-line-2 cyber:rounded-none",
  },
  variants: { on: { true: { step: "bg-accent" } } },
});

/* ---------------------------------------------------------------- blocks */

/** Three idea cards; each gets a gradient top edge that fades with --i. */
export const pillars = tv({
  slots: {
    root: "grid grid-cols-3 gap-4 max-[899px]:grid-cols-1",
    item:
      "flex animate-tg-in flex-col gap-3 p-[clamp(20px,2.4vw,30px)] " +
      "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-card before:bg-[linear-gradient(90deg,var(--accent),var(--tg-pink))] " +
      "before:opacity-[calc(1-var(--i,0)*0.25)] before:content-['']",
    k: "font-mono text-[11px] tracking-[0.08em] text-accent uppercase",
    title: "display m-0 text-[clamp(20px,1.7vw,26px)] leading-[1.15]",
  },
});

/** A titled block inside a section (behaviour map, states, exercise types). */
export const sub = {
  root: "mt-7 flex flex-col gap-4",
  head: "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-2 pb-3",
  title: "display m-0 text-[clamp(22px,2vw,28px)]",
  note: "max-w-[60ch]",
};

/** Dashed "draft" tag next to a sub-block title. */
export const draft =
  "rounded-full border border-dashed border-improvement px-[9px] py-[2px] font-mono text-[10.5px] tracking-[0.06em] text-improvement-ink uppercase cyber:rounded-none";

/** Grouped link cards (inspirations, research). The group sets its colour in --gc. */
export const insp = tv({
  slots: {
    groups: "flex flex-col gap-[22px]",
    group:
      "grid grid-cols-[190px_minmax(0,1fr)] items-start gap-x-6 gap-y-3 border-t border-line-2 pt-[18px] [--gc:var(--accent)] max-[899px]:grid-cols-1",
    k:
      "flex items-center gap-[9px] pt-1 font-mono text-[11px] tracking-[0.08em] text-ink uppercase " +
      "before:h-[9px] before:w-[9px] before:flex-none before:rounded-full before:bg-[var(--gc)] before:shadow-[0_0_8px_var(--gc)] before:content-[''] cyber:before:rounded-none",
    list: "m-0 grid list-none grid-cols-3 gap-3 p-0 max-[899px]:grid-cols-1 min-[900px]:max-[1199px]:grid-cols-2",
    li: "flex",
    /** The card link: a group-coloured left edge (Cyber dark), lifts and takes the group colour on hover. */
    item:
      "group/insp flex flex-1 flex-col gap-[6px] border-l-[3px] px-5 py-[18px] text-inherit " +
      "[transition:transform_0.3s_cubic-bezier(0.2,0.8,0.2,1),border-color_0.3s] cyber:border-l-[var(--gc)] " +
      "hover:[transform:translateY(-3px)] hover:border-[var(--gc)]",
    name: "display text-[20px] leading-[1.2] group-hover/insp:text-[var(--gc)]",
    take: "text-[14px] text-pretty text-muted",
    src: "mt-auto pt-2 font-mono text-[10.5px] tracking-[0.06em] text-[var(--gc)] uppercase",
  },
});

/* ---------------------------------------------------------------- roadmap timeline */

/** Vertical timeline: a node per phase, a rail down to the next one (solid once started). */
export const tl = tv({
  slots: {
    root: "m-0 flex list-none flex-col gap-[14px] p-0",
    item:
      "relative grid animate-tg-in grid-cols-[48px_minmax(0,1fr)] items-start gap-4 max-[599px]:grid-cols-[36px_minmax(0,1fr)] max-[599px]:gap-[10px] " +
      "not-last:before:absolute not-last:before:top-12 not-last:before:-bottom-[14px] not-last:before:left-[23px] not-last:before:w-[2px] not-last:before:content-[''] " +
      "not-last:before:bg-[repeating-linear-gradient(180deg,var(--line-2)_0_6px,transparent_6px_11px)] " +
      "max-[599px]:not-last:before:top-9 max-[599px]:not-last:before:left-[17px]",
    node:
      "relative z-[1] grid h-12 w-12 place-items-center rounded-full border-2 border-dashed border-line-2 bg-bg text-muted max-[599px]:h-9 max-[599px]:w-9 cyber:rounded-none",
    card: "flex flex-col gap-3 px-5 pt-4 pb-[18px] [transition:border-color_0.3s,box-shadow_0.3s]",
    title: "display text-[19px] leading-[1.2]",
  },
  variants: {
    status: {
      done: {
        item: "not-last:before:bg-none not-last:before:bg-[var(--tg-done)]",
        node: "border-solid border-[var(--tg-done)] bg-[var(--tg-done)] text-white",
      },
      active: {
        item: "not-last:before:bg-[linear-gradient(180deg,var(--accent),var(--line-2))]",
        node: "animate-tg-node-ping border-solid border-accent bg-[color-mix(in_srgb,var(--accent)_16%,var(--bg))] text-accent",
        card:
          "cyber:border-[color-mix(in_srgb,var(--accent)_55%,transparent)] cyber:shadow-[0_14px_30px_-18px_color-mix(in_srgb,var(--accent)_70%,transparent)]",
      },
      planned: { card: "border-dashed" },
    },
  },
});

/** Phase status pill. */
export const badge = tv({
  base: "rounded-full border border-line-2 px-2 py-[2px] font-mono text-[10px] tracking-[0.06em] whitespace-nowrap text-muted uppercase cyber:rounded-none",
  variants: {
    status: {
      done: "border-transparent bg-[var(--tg-done)] text-white",
      active: "border-transparent bg-accent text-accent-ink",
      planned: "",
    },
  },
});
