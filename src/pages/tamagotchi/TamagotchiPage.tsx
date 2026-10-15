import { useState, type CSSProperties, type ReactNode } from "react";
import { useApp } from "../../app/AppContext";
import { caseSections } from "../../app/sections";
import { TG, type PhaseStatus, type RoadmapPhase } from "../../content/tamagotchi";
import type { Localized } from "../../content/types";
import type { ResolvedCase } from "../../lib/cases";
import { cn, tv } from "../../lib/cn";
import { useI18n } from "../../lib/i18n";
import { CaseMobileBar } from "../CaseMobileBar";
import {
  bodyMuted,
  btnRow,
  caseBtn,
  caseTitle,
  caseTitleSub,
  label,
  lead,
  metaRow,
  sec,
  secHead,
} from "../dtrpg/case-ui";
import { Closing } from "../dtrpg/Closing";
import { Creature } from "./Creature";
import {
  badge,
  cap,
  card,
  draft,
  headNote,
  insp,
  ov,
  pillars,
  secLabel,
  secTitle,
  stage,
  sub,
  tgRoot,
  tl,
  wipDot,
} from "./tg-ui";

const pad = (n: number) => String(n).padStart(2, "0");

const STATUS: Record<PhaseStatus, Localized> = {
  done: { en: "Done", pl: "Gotowe" },
  active: { en: "In progress", pl: "W trakcie" },
  planned: { en: "Planned", pl: "Planowane" },
};

const ICONS: Record<RoadmapPhase["icon"], ReactNode> = {
  research: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </>
  ),
  game: (
    <>
      <rect x="2" y="7" width="20" height="11" rx="5" />
      <path d="M7 11v3M5.5 12.5h3" />
      <circle cx="15.5" cy="12" r="1" />
      <circle cx="18" cy="13.5" r="1" />
    </>
  ),
  design: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M17.5 14v7M14 17.5h7" />
    </>
  ),
  scenario: (
    <>
      <path d="M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v6" />
      <path d="M6 12v9" />
      <circle cx="6" cy="3" r="1.5" />
    </>
  ),
  art: (
    <>
      <path d="m14.5 4.5 5 5L9 20H4v-5z" />
      <path d="m12.5 6.5 5 5" />
    </>
  ),
  ui: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 13h4M7 16h7" />
    </>
  ),
  platform: (
    <>
      <rect x="2" y="4" width="14" height="10" rx="1.5" />
      <path d="M6 18h6M9 14v4" />
      <rect x="17" y="8" width="5" height="11" rx="1" />
    </>
  ),
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  test: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </>
  ),
};

/* ---------------------------------------------------------------- page recipes */

/** The device: a generic egg-shaped handheld with an LCD screen; a hard-edged neon handheld in Cyber dark. */
const device = {
  root:
    "relative flex aspect-[0.82] w-[min(100%,380px)] animate-tg-float flex-col items-center gap-[22px] px-[13%] pt-[18%] pb-0 " +
    "rounded-[50%_50%_46%_46%/56%_56%_44%_44%] max-[899px]:w-[min(100%,280px)] " +
    "bg-[radial-gradient(60%_40%_at_35%_20%,rgba(255,255,255,0.85),transparent_70%),linear-gradient(160deg,#f6d4f0,#c9b1f5_55%,#a993ee)] " +
    "shadow-[inset_0_-14px_30px_rgba(90,47,208,0.25),inset_0_6px_14px_rgba(255,255,255,0.7),0_30px_60px_-24px_rgba(90,47,208,0.5),0_0_60px_-10px_rgba(232,111,196,0.35)] " +
    "cyber:bg-[linear-gradient(160deg,#241a3a,#150f24)] cyber:shadow-[inset_0_0_0_1px_rgba(197,139,255,0.45),0_0_50px_-10px_rgba(197,139,255,0.45)]",
  screen:
    "relative grid aspect-[1.1] w-full place-items-center overflow-hidden rounded-[18%] " +
    "bg-[repeating-linear-gradient(0deg,rgba(40,60,30,0.05)_0_2px,transparent_2px_4px),linear-gradient(180deg,#e9f6d8,#cfe6b8)] " +
    "shadow-[inset_0_0_0_6px_rgba(60,30,120,0.18),inset_0_4px_14px_rgba(40,60,30,0.25)] " +
    "cyber:bg-[#08070d] cyber:bg-[image:repeating-linear-gradient(0deg,rgba(127,215,232,0.06)_0_2px,transparent_2px_4px)] cyber:shadow-[inset_0_0_0_1px_rgba(127,215,232,0.4)]",
  hud: "absolute inset-x-[12%] top-[9%] flex justify-between font-mono text-[11px] text-[#3f5a2c] cyber:text-[#7fd7e8]",
  creature: "mt-[8%] w-[62%]",
  bubble:
    "absolute top-[24%] right-[10%] animate-tg-bubble rounded-[8px] bg-white px-[7px] py-[3px] font-mono text-[10px] text-[#3f5a2c] " +
    "cyber:rounded-none cyber:bg-[#141024] cyber:text-[#7fd7e8] cyber:shadow-[inset_0_0_0_1px_rgba(127,215,232,0.4)]",
  btns: "flex gap-[18px]",
  btn:
    "h-[22px] w-[22px] rounded-full bg-[linear-gradient(160deg,#fff,#f3b6e2)] shadow-[inset_0_-3px_5px_rgba(140,50,140,0.3),0_3px_6px_-2px_rgba(90,47,208,0.45)] " +
    "cyber:bg-[#c58bff] cyber:bg-none cyber:shadow-[0_0_12px_rgba(197,139,255,0.7)]",
};

/** Attachment style cards: a coloured top edge and number in the style's colour (--sc). */
const styleCard = tv({
  slots: {
    root: "flex animate-tg-in flex-col gap-2 overflow-hidden p-5 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[var(--sc)] before:content-['']",
    pet: "mt-1 mr-0 mb-[6px] -ml-[6px] w-[84px]",
    n: "font-mono text-[11px] text-[var(--sc)]",
    name: "display m-0 text-[22px] leading-[1.15]",
    dl: "mt-1 flex flex-col gap-[10px]",
    dt: "font-mono text-[10.5px] tracking-[0.06em] text-muted uppercase",
    dd: "text-[14px] leading-[1.45]",
  },
  variants: {
    id: {
      secure: { root: "[--sc:var(--tg-done)]" },
      anxious: { root: "[--sc:#e8a13a]" },
      avoidant: { root: "[--sc:#6c8ae8]" },
      disorganized: { root: "[--sc:#d9577f]" },
    },
  },
});

/** Possible endings: a gradient bar with the labels spread along it (two per row below 1200px). */
const endings = {
  root: "flex flex-col gap-[10px]",
  bar: "h-2 rounded-full bg-[linear-gradient(90deg,#d9577f,#e8a13a_40%,#9a8be8_65%,var(--tg-done))] cyber:rounded-none",
  list:
    "flex list-none justify-between gap-3 p-0 text-[13px] leading-[1.3] " +
    "max-[1199px]:grid max-[1199px]:grid-cols-2 max-[1199px]:gap-x-4 max-[1199px]:gap-y-[6px]",
  // Wraps in the two-column layout: "Niepewny, ale w porządku" is wider than a column at 390px.
  item: "whitespace-nowrap first:font-semibold last:font-semibold max-[1199px]:whitespace-normal max-[1199px]:even:text-right",
};

/** The core loop: a slowly turning dashed ring with numbered steps around the mascot. */
const loop = {
  root: "relative mx-auto aspect-square w-[min(100%,440px)]",
  ring: "absolute inset-0 overflow-visible",
  circle:
    "origin-center animate-tg-spin fill-none stroke-accent opacity-60 [stroke-dasharray:2_2.4] [stroke-width:0.6] [transform-box:fill-box]",
  core: "absolute inset-[30%] flex flex-col items-center justify-center gap-1 rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_70%)]",
  steps: "m-0 list-none p-0",
  step: "absolute flex w-[120px] [transform:translate(-50%,-50%)] flex-col items-center gap-[6px] text-center max-[599px]:w-[92px]",
  n:
    "grid h-[34px] w-[34px] animate-tg-pulse place-items-center rounded-full bg-accent font-mono text-[13px] font-semibold text-accent-ink " +
    "shadow-[0_0_0_5px_var(--bg),0_0_18px_-2px_color-mix(in_srgb,var(--accent)_70%,transparent)] cyber:rounded-none",
  l: "text-[13.5px] leading-[1.2] font-semibold max-[599px]:text-[12px]",
  caption: "absolute inset-x-0 -bottom-7 text-center",
};

/** Behaviour map rows, tinted by outcome (--tc); the outcome is a tag with high-contrast text. */
const map = tv({
  slots: {
    root: "flex flex-col",
    row: "grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-4 border-b border-line py-[11px] text-[14.5px] max-[899px]:grid-cols-2",
    act: "flex items-baseline gap-[10px] font-semibold max-[899px]:col-span-full",
    dot: "h-[9px] w-[9px] flex-none rounded-full bg-[var(--tc)] shadow-[0_0_8px_var(--tc)] cyber:rounded-none",
    later:
      "self-start justify-self-start rounded-full border border-[color-mix(in_srgb,var(--tc)_40%,transparent)] bg-[color-mix(in_srgb,var(--tc)_16%,transparent)] " +
      "px-[10px] py-[3px] text-[13.5px] leading-[1.4] font-semibold text-[var(--tc)] cyber:rounded-none cyber:bg-[color-mix(in_srgb,var(--tc)_14%,transparent)]",
  },
  variants: {
    tone: {
      head: { row: "pt-0 font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase" },
      good: { row: "[--tc:var(--tg-done)]", later: "glass:text-[#0f5c37] cyber:text-[#7ff0bd]" },
      mid: { row: "[--tc:#e8a13a]", later: "glass:text-[#7a4300] cyber:text-[#ffc970]" },
      bad: { row: "[--tc:#d9577f]", later: "glass:text-[#8f1d45] cyber:text-[#ff9dbb]" },
    },
  },
});

const states = {
  root: "m-0 grid list-none grid-cols-6 gap-3 p-0 max-[1199px]:grid-cols-3",
  item: "flex animate-tg-in flex-col items-center gap-[6px] px-[10px] pt-[14px] pb-3 text-[13px] font-semibold",
  creature: "w-[80%] max-w-[110px]",
};

/** Inspiration group colours. */
const GROUP_GC: Record<string, string> = {
  pets: "",
  choices: "[--gc:#e8a13a]",
  feelings: "[--gc:#2fbf9a]",
  psych: "[--gc:var(--tg-pink)]",
  gamepsych: "[--gc:var(--accent-2)]",
};

/** Roadmap: a sticky summary on the left, the phases as a vertical timeline on the right. */
const rm = {
  root: "grid grid-cols-[minmax(240px,300px)_minmax(0,1fr)] items-start gap-x-[clamp(24px,4vw,56px)] gap-y-7 max-[1199px]:grid-cols-1",
  summary:
    "sticky top-6 flex flex-col gap-[22px] p-6 max-[1199px]:static max-[1199px]:grid max-[1199px]:grid-cols-[auto_minmax(0,1fr)] max-[1199px]:items-center max-[599px]:flex",
  /** Summary blocks next to the ring when the summary is a row. */
  side: "max-[1199px]:col-[2]",
  ring: "relative mx-auto aspect-square w-[150px] max-[1199px]:row-span-3 max-[1199px]:w-[130px]",
  ringSvg: "h-full w-full [transform:rotate(-90deg)]",
  ringTrack: "fill-none stroke-line stroke-[9]",
  ringFill:
    "fill-none stroke-accent stroke-[9] [stroke-dasharray:calc(var(--p,0)*1)_100] [stroke-linecap:round] cyber:[stroke-linecap:butt] " +
    "[filter:drop-shadow(0_0_6px_color-mix(in_srgb,var(--accent)_60%,transparent))]",
  ringV: "display absolute inset-0 grid place-items-center text-[34px]",
  stats: "grid grid-cols-2 gap-3 border-y border-line-2 py-[14px]",
  statK: "font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase",
  statV: "display text-[26px] leading-[1.1]",
  now: "flex flex-col gap-2",
  nowItem: "flex items-center gap-[9px] text-[14.5px] font-semibold",
};

const legend = tv({
  slots: {
    root: "flex flex-wrap gap-[14px] font-mono text-[11px] tracking-[0.06em] text-muted uppercase",
    item: "inline-flex items-center gap-[7px] before:h-[9px] before:w-[9px] before:rounded-full before:border-2 before:border-current before:content-['']",
  },
  variants: {
    status: {
      done: { item: "before:border-[var(--tg-done)] before:bg-[var(--tg-done)]" },
      active: { item: "before:border-accent before:bg-accent" },
      planned: {},
    },
  },
});

/** A phase card's header button, progress bar and task list. */
const phase = tv({
  slots: {
    head: "group/head grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto_18px] items-center gap-[14px] border-0 bg-transparent p-0 text-left max-[599px]:grid-cols-[minmax(0,1fr)_18px]",
    n: "font-mono text-[11px] text-muted max-[599px]:hidden",
    titles: "flex min-w-0 flex-col gap-[2px]",
    title: "group-hover/head:text-accent",
    goal: "text-[13.5px] text-pretty text-muted",
    badge: "max-[599px]:col-[1] max-[599px]:row-[2] max-[599px]:justify-self-start",
    chev: "h-[9px] w-[9px] border-r-2 border-b-2 border-muted [transform:rotate(45deg)_translateY(-3px)] [transition:transform_0.3s]",
    icon: "h-5 w-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]",
    progress: "flex items-center gap-3",
    bar: "h-2 flex-1 overflow-hidden rounded-full bg-line cyber:rounded-none",
    fill:
      "block h-full rounded-[inherit] bg-[linear-gradient(90deg,var(--accent),var(--tg-pink))] shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_50%,transparent)] " +
      "[transition:width_1s_cubic-bezier(0.2,0.8,0.2,1)]",
    pct: "min-w-[74px] text-right font-mono text-[11px] text-muted",
    tasks:
      "m-0 grid animate-tg-in-quick list-none grid-cols-2 gap-x-5 gap-y-2 border-t border-line px-0 pt-3 pb-0 text-[14px] max-[599px]:grid-cols-1",
  },
  variants: {
    open: { true: { chev: "[transform:rotate(-135deg)_translateY(-3px)]" } },
    /** Started, but no task ticked yet: a moving striped stub instead of an empty bar. */
    started: {
      true: {
        fill: "!w-[14%] animate-tg-stripes bg-[repeating-linear-gradient(-45deg,var(--accent)_0_6px,color-mix(in_srgb,var(--accent)_55%,var(--tg-pink))_6px_12px)] bg-[length:34px_100%]",
      },
    },
  },
});

const task = tv({
  slots: {
    root: "flex items-start gap-[9px]",
    box: "mt-[3px] h-[15px] w-[15px] flex-none rounded-[4px] border-[1.5px] border-line-2 cyber:rounded-none",
  },
  variants: {
    done: { true: { root: "text-muted line-through", box: "tg-tick border-[var(--tg-done)]" } },
  },
});

/** Tamagotchi-style game: a work-in-progress project page with a vertical roadmap. */
export function TamagotchiPage({ c }: { c: ResolvedCase }) {
  const { t } = useI18n();
  const app = useApp();

  return (
    <article className={tgRoot}>
      {app.narrow && <CaseMobileBar c={c} sections={caseSections(c, t)} />}
      <Overview />
      <Idea />
      <Attachment />
      <Concept />
      <Inspirations />
      <Roadmap />
      <Closing c={c} />
    </article>
  );
}

/** Shown wherever the placeholder mascot stands in for the final art. */
function PhCap() {
  const { L } = useI18n();
  return (
    <span className={cn(cap, "mt-1 block")}>
      {L({
        en: "Placeholder mascot · final art in progress",
        pl: "Tymczasowa maskotka · finalna grafika w trakcie",
      })}
    </span>
  );
}

function SecHead({
  n,
  label: lbl,
  title,
  children,
}: {
  n: number;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <>
      <span className={secLabel}>
        [{pad(n)}] {lbl}
      </span>
      <div className={secHead}>
        <h2 className={secTitle}>{title}</h2>
        {children}
      </div>
    </>
  );
}

function Overview() {
  const { L } = useI18n();
  const app = useApp();
  const meta = metaRow();
  const st = stage();
  return (
    <section className={sec({ first: true })} id="c-overview" data-nav-section>
      <div className={meta.root()}>
        <span className={meta.first()}>[01] {L({ en: "Overview", pl: "Przegląd" })}</span>
        <span>{L(TG.meta.kind)}</span>
        <span className="inline-flex items-center gap-2">
          <span className={wipDot} aria-hidden="true" />
          {L(TG.meta.origin)}
        </span>
      </div>
      <div className={ov.root}>
        <div className={ov.text}>
          <h1 className={cn(caseTitle, ov.title)}>
            {L(TG.title)}
            <span className={caseTitleSub}>.</span>
          </h1>
          <div className={ov.headline}>
            <p className={ov.subtitle}>{L(TG.sub)}</p>
            <div className={st.root()} role="status">
              <span className={st.dot()} aria-hidden="true" />
              <span className={st.k()}>{L({ en: "Current stage", pl: "Obecny etap" })}</span>
              <span className={st.v()}>
                {L({ en: "Research & design", pl: "Badania i projektowanie" })}
              </span>
              <span className={st.steps()} aria-hidden="true">
                <i className={st.step({ on: true })} />
                <i className={st.step({ on: true })} />
                <i className={st.step()} />
                <i className={st.step()} />
              </span>
            </div>
          </div>
          <p className={lead}>{L(TG.lead)}</p>
          <div className={btnRow}>
            <button
              type="button"
              className={caseBtn({ variant: "primary" })}
              onClick={() => app.scrollToCaseSection("roadmap")}
            >
              {L({ en: "See the roadmap ↓", pl: "Zobacz roadmapę ↓" })}
            </button>
          </div>
        </div>
        <div className={ov.aside}>
          <div className={device.root} aria-hidden="true">
            <div className={device.screen}>
              <div className={device.hud}>
                <span>♥ ♥ ♥</span>
                <span>{L({ en: "Day 1/30", pl: "Dzień 1/30" })}</span>
              </div>
              <Creature className={device.creature} />
              <div className={device.bubble}>hi!</div>
            </div>
            <div className={device.btns}>
              <span className={device.btn} />
              <span className={cn(device.btn, "translate-y-2")} />
              <span className={device.btn} />
            </div>
          </div>
          <span className={cap}>
            {L({
              en: "Placeholder mascot · final art in progress",
              pl: "Tymczasowa maskotka · finalna grafika w trakcie",
            })}
          </span>
        </div>
      </div>
    </section>
  );
}

function Idea() {
  const { t, L } = useI18n();
  const pl = pillars();
  return (
    <section className={sec()} id="c-idea" data-nav-section>
      <SecHead
        n={2}
        label={t.tgIdea}
        title={L({
          en: "One life. Your care decides how it goes.",
          pl: "Jedno życie. Twoja opieka decyduje, jak się potoczy.",
        })}
      />
      <div className={pl.root()}>
        {TG.pillars.map((p, i) => (
          <article
            key={p.k.en}
            className={card({ class: pl.item() })}
            style={{ "--i": i } as CSSProperties}
          >
            <span className={pl.k()}>
              {pad(i + 1)} · {L(p.k)}
            </span>
            <h3 className={pl.title()}>{L(p.title)}</h3>
            <p className={bodyMuted()}>{L(p.desc)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Attachment() {
  const { t, L } = useI18n();
  return (
    <section className={sec()} id="c-attachment" data-nav-section>
      <SecHead
        n={3}
        label={t.tgAttachment}
        title={L({
          en: "Four ways it can learn to love.",
          pl: "Cztery sposoby, w jakie może nauczyć się kochać.",
        })}
      >
        <p className={bodyMuted({ class: headNote })}>
          {L({
            en: "Attachment theory describes how early care shapes the way we relate to others. The game uses the four styles as the personalities your pet can grow into.",
            pl: "Teoria przywiązania opisuje, jak wczesna opieka kształtuje nasze relacje z innymi. Gra używa czterech stylów jako osobowości, w które może wyrosnąć Twój zwierzak.",
          })}
        </p>
      </SecHead>
      <div className="grid grid-cols-4 gap-[14px] max-[1199px]:grid-cols-2 max-[599px]:grid-cols-1">
        {TG.attachment.map((s, i) => {
          const sc = styleCard({ id: s.id as "secure" | "anxious" | "avoidant" | "disorganized" });
          return (
            <article
              key={s.id}
              className={card({ class: sc.root() })}
              style={{ "--i": i } as CSSProperties}
            >
              <Creature mood={s.mood} className={sc.pet()} />
              <span className={sc.n()}>{pad(i + 1)}</span>
              <h3 className={sc.name()}>{L(s.name)}</h3>
              <dl className={sc.dl()}>
                <div>
                  <dt className={sc.dt()}>{L({ en: "Care it gets", pl: "Opieka" })}</dt>
                  <dd className={sc.dd()}>{L(s.care)}</dd>
                </div>
                <div>
                  <dt className={sc.dt()}>{L({ en: "How it behaves", pl: "Zachowanie" })}</dt>
                  <dd className={sc.dd()}>{L(s.shows)}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
      <PhCap />
    </section>
  );
}

function Concept() {
  const { t, L } = useI18n();
  const n = TG.loop.length;
  const head = map({ tone: "head" });
  return (
    <section className={sec()} id="c-concept" data-nav-section>
      <SecHead
        n={4}
        label={t.tgConcept}
        title={L({
          en: "Every response teaches it something.",
          pl: "Każda reakcja czegoś go uczy.",
        })}
      />

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-center gap-x-[clamp(32px,5vw,80px)] gap-y-10 max-[899px]:grid-cols-1">
        <div className="flex flex-col gap-7">
          <p className={lead}>
            {L({
              en: "Over about a month the pet signals what it needs: food, rest, play, comfort. Each time you respond, or don’t, it learns what to expect from you. Small moments add up to a personality and, in the end, to how its life ends.",
              pl: "Przez około miesiąc zwierzak sygnalizuje, czego potrzebuje: jedzenia, odpoczynku, zabawy, pocieszenia. Za każdym razem, gdy reagujesz albo nie, uczy się, czego może się po Tobie spodziewać. Drobne chwile składają się na osobowość, a w końcu na to, jak skończy się jego życie.",
            })}
          </p>
          <div className={endings.root}>
            <span className={label()}>
              {L({ en: "Possible endings", pl: "Możliwe zakończenia" })}
            </span>
            <div className={endings.bar} aria-hidden="true" />
            <ol className={endings.list}>
              {TG.endings.map((e) => (
                <li key={e.en} className={endings.item}>
                  {L(e)}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <figure className={loop.root} aria-label={L({ en: "Core loop", pl: "Główna pętla" })}>
          <svg className={loop.ring} viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="38" className={loop.circle} />
          </svg>
          <div className={loop.core}>
            <Creature className="w-[64%]" />
            <span className={label()}>{L({ en: "Core loop", pl: "Główna pętla" })}</span>
          </div>
          <ol className={loop.steps}>
            {TG.loop.map((s, i) => {
              const a = (i / n) * Math.PI * 2 - Math.PI / 2;
              return (
                <li
                  key={s.en}
                  className={loop.step}
                  style={
                    {
                      left: 50 + 38 * Math.cos(a) + "%",
                      top: 50 + 38 * Math.sin(a) + "%",
                      "--i": i,
                    } as CSSProperties
                  }
                >
                  <span className={loop.n}>{i + 1}</span>
                  <span className={loop.l}>{L(s)}</span>
                </li>
              );
            })}
          </ol>
          <figcaption className={loop.caption}>
            <PhCap />
          </figcaption>
        </figure>
      </div>

      <div className={sub.root}>
        <div className={sub.head}>
          <h3 className={sub.title}>{L({ en: "Behaviour map", pl: "Mapa zachowań" })}</h3>
          <span className={draft}>
            {L({ en: "Draft · being researched", pl: "Szkic · w trakcie badań" })}
          </span>
        </div>
        <div className={head.root()} role="table">
          <div className={head.row()} role="row">
            <span role="columnheader" className="max-[899px]:hidden">
              {L({ en: "What you do", pl: "Co robisz" })}
            </span>
            <span role="columnheader">{L({ en: "Right away", pl: "Od razu" })}</span>
            <span role="columnheader">{L({ en: "Over its life", pl: "W ciągu życia" })}</span>
          </div>
          {TG.behaviours.map((b) => {
            const m = map({ tone: b.tone });
            return (
              <div key={b.act.en} className={m.row()} role="row">
                <span role="cell" className={m.act()}>
                  <span className={m.dot()} aria-hidden="true" />
                  {L(b.act)}
                </span>
                <span role="cell">{L(b.now)}</span>
                <span role="cell" className={m.later()}>
                  {L(b.later)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={sub.root}>
        <div className={sub.head}>
          <h3 className={sub.title}>
            {L({ en: "One pet, many states", pl: "Jeden zwierzak, wiele stanów" })}
          </h3>
          <p className={bodyMuted({ class: sub.note })}>
            {L({
              en: "Few illustrations, one character: the same creature drawn happy, sad, sick, overfed or underfed. These become the sprite set.",
              pl: "Mało ilustracji, jedna postać: ten sam stworek narysowany jako szczęśliwy, smutny, chory, przekarmiony lub niedożywiony. Z tego powstanie zestaw sprite’ów.",
            })}
          </p>
        </div>
        <ul className={states.root}>
          {TG.states.map((s, i) => (
            <li
              key={s.mood}
              className={card({ class: states.item })}
              style={{ "--i": i } as CSSProperties}
            >
              <Creature mood={s.mood} className={states.creature} />
              <span>{L(s.label)}</span>
            </li>
          ))}
        </ul>
        <PhCap />
      </div>
    </section>
  );
}

/** A short label for where an inspiration link goes. */
function sourceOf(url: string) {
  const h = new URL(url).hostname;
  if (h.includes("steampowered")) return "Steam";
  if (h.includes("wikipedia")) return "Wikipedia";
  if (h.includes("apple.com")) return "App Store";
  if (h.includes("gamestudies")) return "Game Studies";
  if (h.includes("sciencedaily")) return "ScienceDaily";
  return h.replace(/^www\./, "");
}

function Inspirations() {
  const { t, L } = useI18n();
  const s = insp();
  return (
    <section className={sec()} id="c-inspirations" data-nav-section>
      <SecHead
        n={5}
        label={t.tgInspirations}
        title={L({ en: "Where it comes from.", pl: "Skąd się wziął." })}
      >
        <p className={bodyMuted({ class: headNote })}>
          {L({
            en: "Virtual pets, games where choices shape a character, games about emotions, and the psychology behind both the creature and the play.",
            pl: "Wirtualne zwierzaki, gry, w których wybory kształtują postać, gry o emocjach oraz psychologia stojąca za stworkiem i za graniem.",
          })}
        </p>
      </SecHead>
      <div className={s.groups()}>
        {TG.inspirationGroups.map((g) => (
          <div key={g.id} className={s.group({ class: GROUP_GC[g.id] })}>
            <span className={s.k()}>{L(g.label)}</span>
            <ul className={s.list()}>
              {TG.inspirations
                .filter((x) => x.g === g.id)
                .map((x) => {
                  const name = typeof x.name === "string" ? x.name : L(x.name);
                  return (
                    <li key={name} className={s.li()}>
                      <a
                        className={card({ class: s.item() })}
                        href={x.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={s.name()}>{name}</span>
                        <span className={s.take()}>{L(x.take)}</span>
                        <span className={s.src()}>
                          {sourceOf(x.url)} <span aria-hidden="true">↗</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Roadmap() {
  const { t, L } = useI18n();
  const phases = TG.roadmap;
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(phases.filter((p) => p.status === "active").map((p) => p.id)),
  );
  const toggle = (id: string) =>
    setOpen((o) => {
      const n = new Set(o);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  // A phase's progress: its manual % if set, otherwise the share of ticked tasks.
  const prog = (p: RoadmapPhase) =>
    p.status === "done"
      ? 100
      : (p.progress ?? Math.round((p.tasks.filter((x) => x.done).length / p.tasks.length) * 100));
  const pct = Math.round(phases.reduce((s, p) => s + prog(p), 0) / phases.length);
  const started = phases.filter((p) => p.status !== "planned").length;
  const active = phases.filter((p) => p.status === "active");
  const finished = phases.filter((p) => p.status === "done").length;
  const st = (s: PhaseStatus) => L(STATUS[s]);
  const lg = legend();

  return (
    <section className={sec()} id="c-roadmap" data-nav-section>
      <SecHead
        n={6}
        label={t.tgRoadmap}
        title={L({ en: "The road to launch.", pl: "Droga do premiery." })}
      />

      <div className={rm.root}>
        <aside className={card({ class: rm.summary })}>
          <div className={rm.ring} style={{ "--p": pct } as CSSProperties}>
            <svg viewBox="0 0 100 100" className={rm.ringSvg} aria-hidden="true">
              <circle cx="50" cy="50" r="42" className={rm.ringTrack} />
              {pct > 0 && (
                <circle cx="50" cy="50" r="42" className={rm.ringFill} pathLength={100} />
              )}
            </svg>
            <span className={rm.ringV}>{pct}%</span>
          </div>
          <dl className={cn(rm.stats, rm.side)}>
            <div>
              <dt className={rm.statK}>{L({ en: "Phases started", pl: "Etapy rozpoczęte" })}</dt>
              <dd className={rm.statV}>
                {started}/{phases.length}
              </dd>
            </div>
            <div>
              <dt className={rm.statK}>{L({ en: "Phases done", pl: "Etapy gotowe" })}</dt>
              <dd className={rm.statV}>
                {finished}/{phases.length}
              </dd>
            </div>
          </dl>
          <div className={cn(rm.now, rm.side)}>
            <span className={label()}>{L({ en: "Working on now", pl: "Teraz pracuję nad" })}</span>
            {active.map((p) => (
              <span key={p.id} className={rm.nowItem}>
                <span className={wipDot} aria-hidden="true" />
                {L(p.title)}
              </span>
            ))}
          </div>
          <div className={lg.root({ class: rm.side })} aria-hidden="true">
            {(["done", "active", "planned"] as PhaseStatus[]).map((s) => (
              <span key={s} className={lg.item({ status: s })}>
                {st(s)}
              </span>
            ))}
          </div>
        </aside>

        <ol className={tl().root()}>
          {phases.map((p, i) => {
            const ppct = prog(p);
            const isOpen = open.has(p.id);
            const s = tl({ status: p.status });
            const ph = phase({ open: isOpen, started: p.status === "active" && ppct === 0 });
            return (
              <li key={p.id} className={s.item()} style={{ "--i": i } as CSSProperties}>
                <span className={s.node()} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className={ph.icon()}>
                    {ICONS[p.icon]}
                  </svg>
                </span>
                <div className={card({ class: s.card() })}>
                  <button
                    type="button"
                    className={ph.head()}
                    aria-expanded={isOpen}
                    onClick={() => toggle(p.id)}
                  >
                    <span className={ph.n()}>{pad(i + 1)}</span>
                    <span className={ph.titles()}>
                      <span className={cn(s.title(), ph.title())}>{L(p.title)}</span>
                      <span className={ph.goal()}>{L(p.goal)}</span>
                    </span>
                    <span className={badge({ status: p.status, class: ph.badge() })}>
                      {st(p.status)}
                    </span>
                    <span className={ph.chev()} aria-hidden="true" />
                  </button>
                  <div className={ph.progress()}>
                    <span className={ph.bar()} aria-hidden="true">
                      <span className={ph.fill()} style={{ width: ppct + "%" }} />
                    </span>
                    <span className={ph.pct()}>{ppct}%</span>
                  </div>
                  {isOpen && (
                    <ul className={ph.tasks()}>
                      {p.tasks.map((x) => {
                        const tk = task({ done: x.done });
                        return (
                          <li key={x.label.en} className={tk.root()}>
                            <span className={tk.box()} aria-hidden="true" />
                            {L(x.label)}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
