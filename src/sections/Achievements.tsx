import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useApp } from "../app/AppContext";
import {
  ACHIEVEMENTS,
  SECRET_ACHIEVEMENT,
  type Achievement,
  type AchievementIcon,
} from "../content/achievements";
import { PERSON } from "../content/person";
import { cn, tv } from "../lib/cn";
import { useI18n } from "../lib/i18n";

const ICONS: Record<AchievementIcon, ReactNode> = {
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  levelup: (
    <>
      <path d="m6 11 6-6 6 6" />
      <path d="m6 18 6-6 6 6" />
    </>
  ),
  dual: (
    <>
      <path d="M12 3v18" />
      <path d="M8 7 4 12l4 5" />
      <path d="m16 7 4 5-4 5" />
    </>
  ),
  mentor: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17.5" cy="9.5" r="2.2" />
      <path d="M15.5 20a4.5 4.5 0 0 1 6-4.2" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" />
      <path d="M19 2v4M17 4h4" />
    </>
  ),
  health: (
    <path d="M20.4 4.6a5.5 5.5 0 0 0-7.8 0L12 5.3l-.6-.7a5.5 5.5 0 0 0-7.8 7.8l8.4 8.4 8.4-8.4a5.5 5.5 0 0 0 0-7.8z" />
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="15" cy="7.5" r="1" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a4 4 0 0 0 2.6.6H21" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </>
  ),
};

const badge = tv({
  base:
    "grid h-[38px] w-[38px] place-items-center [clip-path:polygon(50%_0,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)] " +
    "bg-[linear-gradient(150deg,color-mix(in_srgb,var(--tc)_85%,#fff),color-mix(in_srgb,var(--tc)_70%,#000))]",
  variants: {
    tier: {
      bronze: "[--tc:var(--t-bronze)]",
      silver: "[--tc:var(--t-silver)]",
      gold: "[--tc:var(--t-gold)]",
      platinum: "[--tc:var(--t-platinum)]",
      locked: "[--tc:#6b6880]",
    },
    /* Where it sits: an earned row (smaller on phones), the quest card, or the toast. */
    at: {
      item: "narrow:h-8 narrow:w-8",
      secret: "h-[46px] w-[46px]",
      toast: "",
    },
    /* The quest badge flips in when unlocked. */
    spin: { true: "animate-ach-spin" },
  },
});

type BadgeProps = {
  a: Achievement;
  locked?: boolean;
  at: "item" | "secret" | "toast";
  spin?: boolean;
};

function Badge({ a, locked, at, spin }: BadgeProps) {
  return (
    <span className={badge({ tier: locked ? "locked" : a.tier, at, spin })} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] fill-none stroke-white stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.35))]"
      >
        {locked ? (
          <>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </>
        ) : (
          ICONS[a.icon]
        )}
      </svg>
    </span>
  );
}

/* Shared by the earned rows and the quest card. */
const CARD = "relative grid gap-[10px] overflow-hidden rounded-card-sm border cyber:rounded-none";

const secret = tv({
  base:
    CARD +
    " grid-cols-[auto_minmax(0,1fr)_auto] items-center pt-3 pr-[14px] pb-3 pl-[10px] narrow:grid-cols-[auto_minmax(0,1fr)]",
  variants: {
    unlocked: {
      false:
        "border-dashed border-[color-mix(in_srgb,var(--accent)_45%,transparent)] " +
        "bg-[linear-gradient(110deg,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_65%),repeating-linear-gradient(135deg,transparent_0_8px,color-mix(in_srgb,var(--ink)_3%,transparent)_8px_16px)]",
      true:
        "animate-ach-reveal border-solid border-[color-mix(in_srgb,var(--t-platinum)_70%,transparent)] shadow-[0_0_28px_-6px_color-mix(in_srgb,var(--t-platinum)_55%,transparent)] " +
        "[background:linear-gradient(110deg,color-mix(in_srgb,var(--t-platinum)_16%,transparent),transparent_60%),var(--surface)]",
    },
    /* Set while the particles fly (see compoundVariants). */
    bursting: { true: "" },
  },
  /* Shakes while the particles fly, until the reveal takes over. */
  compoundVariants: [{ unlocked: false, bursting: true, class: "animate-ach-shake" }],
});

/* Particle colours by index: accent, platinum, gold, repeating. */
const PARTICLE = [
  "bg-accent shadow-[0_0_8px_var(--accent)]",
  "bg-[var(--t-platinum)] shadow-[0_0_8px_var(--t-platinum)]",
  "bg-[var(--t-gold)] shadow-[0_0_8px_var(--t-gold)]",
];

/* Small uppercase keys above the bar, the quest and the earned list. */
const K = "block font-mono text-[11px] tracking-[0.12em] text-muted uppercase";
const K_SUB = "mt-[10px] text-[10.5px]";

const TEXT = "flex min-w-0 flex-col gap-px";
const NAME = "text-[14px] leading-[1.25] font-semibold narrow:text-[13px]";
/* Two lines at most; hidden on phones and on short desktop windows. */
const DESC =
  "mt-[3px] line-clamp-2 text-[12px] leading-[1.35] text-muted narrow:hidden [@media(max-height:760px)_and_(min-width:900px)]:hidden";

/* An earned achievement: slides in, light sweep on hover. */
const ITEM =
  CARD +
  " animate-ach-in grid-cols-[auto_minmax(0,1fr)] items-start border-line bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] py-[10px] pr-[10px] pl-2 " +
  "narrow:gap-2 narrow:py-2 narrow:pr-2 narrow:pl-[6px] cyber:hover:border-line2 " +
  "glass:border-[rgba(255,255,255,0.85)] glass:bg-[rgba(255,255,255,0.55)] glass:shadow-[0_0_0_1px_rgba(110,80,220,0.06),0_6px_16px_-12px_rgba(90,60,200,0.3)] " +
  "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(100deg,transparent_30%,rgba(255,255,255,0.22)_50%,transparent_70%)] " +
  "after:[transform:translateX(-100%)] hover:after:[transform:translateX(100%)] hover:after:[transition:transform_0.7s_ease]";

const toast = tv({
  base:
    "pointer-events-none absolute top-[22px] left-1/2 z-6 flex items-center gap-3 rounded-full bg-[#15121f] py-[10px] pr-[18px] pl-[10px] text-white opacity-0 cyber:rounded-none " +
    "shadow-[0_0_0_1px_color-mix(in_srgb,var(--t-platinum)_50%,transparent),0_18px_40px_-12px_rgba(0,0,0,0.5),0_0_30px_-8px_var(--t-platinum)] " +
    "[transform:translate(-50%,-160%)] [transition:transform_0.5s_cubic-bezier(0.2,0.9,0.3,1.2),opacity_0.3s]",
  variants: { on: { true: "opacity-100 [transform:translate(-50%,0)]" } },
});

/** Career milestones as game achievements, with a hidden "next quest" on top the visitor unlocks. */
export function Achievements() {
  const { t, L } = useI18n();
  const app = useApp();
  const [unlocked, setUnlocked] = useState(false);
  const [burst, setBurst] = useState(false);
  const [toastOn, setToast] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const S = SECRET_ACHIEVEMENT;
  const total = ACHIEVEMENTS.length + 1;
  // The quest card opens on click, but the count stays: the last one is earned together.
  const done = ACHIEVEMENTS.length;

  function unlock() {
    if (unlocked) return;
    if (app.reduced) {
      setUnlocked(true);
      return;
    }
    setBurst(true);
    timers.current.push(
      window.setTimeout(() => setUnlocked(true), 650),
      window.setTimeout(() => setToast(true), 700),
      window.setTimeout(() => setBurst(false), 1600),
      window.setTimeout(() => setToast(false), 4600),
    );
  }

  return (
    <div
      className={
        "relative flex items-center overflow-hidden py-10 narrow:pt-8 narrow:pb-7 " +
        "[--t-bronze:#c98a52] [--t-gold:#e8b931] [--t-platinum:#7fd7e8] [--t-silver:#a9b4c8] " +
        "before:pointer-events-none before:absolute before:inset-0 " +
        "before:bg-[radial-gradient(60%_40%_at_80%_10%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_70%),radial-gradient(50%_40%_at_10%_95%,color-mix(in_srgb,var(--accent2)_12%,transparent),transparent_70%)]"
      }
    >
      <div data-hero-panel className="relative mx-auto flex w-full max-w-[580px] flex-col gap-3">
        <header className="flex items-end justify-between">
          <div>
            <span className={K}>{t.achLabel}</span>
            <span className="display text-[clamp(24px,2.2cqi,32px)] leading-[1.1]">
              {done}/{total} <span className="text-[0.6em] text-muted">{t.achUnlocked}</span>
            </span>
          </div>
          <span className="font-mono text-[13px] text-accent">
            {Math.round((done / total) * 100)}%
          </span>
        </header>
        <div
          className="h-[6px] overflow-hidden rounded-full bg-line2 cyber:rounded-none"
          aria-hidden="true"
        >
          <span
            className={
              "block h-full rounded-[inherit] bg-[linear-gradient(90deg,var(--accent),var(--accent2))] shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_60%,transparent)] " +
              "[transition:width_0.9s_cubic-bezier(0.2,0.8,0.2,1)] cyber:rounded-none"
            }
            style={{ width: (done / total) * 100 + "%" }}
          />
        </div>

        <span className={cn(K, K_SUB)}>{t.achNext}</span>
        <div className={secret({ unlocked, bursting: burst })}>
          {burst && (
            <span className="pointer-events-none absolute top-1/2 left-[33px]" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <i
                  key={i}
                  className={cn(
                    "absolute -m-[3px] h-[6px] w-[6px] animate-ach-particle rounded-full",
                    PARTICLE[i % 3],
                  )}
                  style={{ "--a": i * (360 / 14) + "deg" } as CSSProperties}
                />
              ))}
            </span>
          )}
          <Badge a={S} locked={!unlocked} at="secret" spin={unlocked} />
          <span className={TEXT}>
            <span className={NAME}>{unlocked ? L(S.title) : t.achHidden}</span>
            <span className={DESC}>{unlocked ? L(S.desc) : t.achHiddenDesc}</span>
          </span>
          {unlocked ? (
            <a
              className={
                "cursor-pointer rounded-full border border-transparent bg-accent px-[18px] py-[10px] text-center text-[13.5px] font-semibold whitespace-nowrap text-accent-ink " +
                "hover:text-accent-ink hover:brightness-110 cyber:rounded-none narrow:col-span-full"
              }
              href={`mailto:${PERSON.email}`}
            >
              {t.achWrite}
            </a>
          ) : (
            <button
              type="button"
              className={
                "animate-ach-call cursor-pointer rounded-full border-0 bg-transparent bg-[linear-gradient(135deg,var(--accent),var(--accent2))] px-4 py-2 text-[13.5px] font-semibold text-white " +
                "shadow-[0_0_0_0_color-mix(in_srgb,var(--accent)_60%,transparent)] cyber:rounded-none narrow:col-span-full"
              }
              onClick={unlock}
            >
              {t.achUnlock}
            </button>
          )}
        </div>

        <span className={cn(K, K_SUB)}>{t.achEarned}</span>
        <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
          {ACHIEVEMENTS.map((a, i) => (
            <li key={a.id} className={ITEM} style={{ animationDelay: i * 60 + "ms" }}>
              <Badge a={a} at="item" />
              <span className={TEXT}>
                <span className={NAME}>{L(a.title)}</span>
                <span className="overflow-hidden font-mono text-[10px] text-ellipsis whitespace-nowrap text-accent">
                  {a.when}
                </span>
                <span className={DESC}>{L(a.desc)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={toast({ on: toastOn })} role="status" aria-live="polite">
        {toastOn && (
          <>
            <Badge a={S} at="toast" />
            <span className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--t-platinum)] uppercase">
                {t.achToast}
              </span>
              <span className="text-[14px] font-semibold">{L(S.title)}</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
