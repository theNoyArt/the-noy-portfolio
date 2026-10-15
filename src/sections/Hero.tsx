import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useApp } from "../app/AppContext";
import { PERSON } from "../content/person";
import { useI18n } from "../lib/i18n";
import { cn, tv } from "../lib/cn";
import { button, pulseDot } from "../styles/recipes";
import { HeroMedia } from "./HeroMedia";

/* 15px line icons in the bottom bar. */
const SVG_ICON =
  "h-[15px] w-[15px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]";

/* Profile and CV links in the bottom bar. In Glass light they stay frosted on hover. */
const BAR_LINK =
  "inline-flex items-center gap-[7px] rounded-full border border-line2 px-[13px] py-[7px] text-[14px] font-medium text-ink " +
  "[transition:border-color_0.2s,background-color_0.2s] cyber:rounded-none cyber:hover:border-accent cyber:hover:bg-accent-soft " +
  "glass:border-glass-edge glass:bg-[rgba(255,255,255,0.55)] glass:shadow-[0_0_0_1px_rgba(110,80,220,0.1),0_6px_14px_-8px_rgba(90,60,200,0.3)]";

/* Copy-email button: turns green once copied. */
const copyBtn = tv({
  base:
    "inline-grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-line2 bg-transparent p-0 text-muted " +
    "[transition:color_0.2s,border-color_0.2s,background-color_0.2s] cyber:rounded-none",
  variants: {
    done: {
      true: "border-[#2fd67b] text-[#2fd67b]",
      false: "hover:border-accent hover:text-accent",
    },
  },
});

/** Home: name, role, intro and contact, with the interactive panel (HeroMedia) beside them. */
export function Hero() {
  const { t, L } = useI18n();
  const app = useApp();
  return (
    <section
      id="s-home"
      data-nav-section
      className={
        "grid min-h-svh grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] grid-rows-[1fr_auto] items-center " +
        "px-[max(0px,calc((100%-var(--wrap)-2*var(--gutter))/2))] narrow:flex narrow:min-h-0 narrow:flex-col-reverse"
      }
    >
      <div className="flex flex-col justify-center gap-[clamp(56px,6cqi,88px)] px-[clamp(16px,3.5cqi,56px)] py-[clamp(56px,6cqi,96px)]">
        <div data-reveal="0" className="flex flex-col gap-[clamp(24px,2.4cqi,36px)]">
          <h1
            className={
              "display mb-[0.08em] animate-flicker text-[calc(clamp(56px,8cqi,150px)*var(--h1-scale,1))] leading-[0.92] " +
              "narrow:text-[calc(clamp(56px,17cqi,120px)*var(--h1-scale,1))] " +
              // Glass light: gradient text; clipped gradients cut off descenders ("g"), so give the glyphs room.
              "glass:-mb-[0.16em] glass:bg-[linear-gradient(180deg,#1b1630_0%,#3b3166_38%,#7a6bb8_52%,#2a2348_64%,#4c3f86_100%)] glass:pb-[0.24em] glass:text-clip"
            }
          >
            {PERSON.name.split(" ").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 ? (
                  <br />
                ) : (
                  <span className="text-accent glass:text-[#8a6cf0] glass:[-webkit-text-fill-color:#8a6cf0]">
                    .
                  </span>
                )}
              </span>
            ))}
          </h1>
          <p className="display flex max-w-[680px] flex-col gap-[0.08em] text-[calc(clamp(30px,3.2cqi,50px)*var(--h1-scale,1))] leading-[1.05]">
            {L(PERSON.role)
              .split(" + ")
              .map((part, i) => (
                <span
                  key={i}
                  className={cn(
                    "inline-flex items-center gap-[0.28em]",
                    i === 0
                      ? "text-ink"
                      : "text-clip bg-[linear-gradient(90deg,var(--accent)_0%,color-mix(in_srgb,var(--accent)_55%,var(--accent2))_100%)] pb-[0.06em] " +
                          "cyber:[filter:drop-shadow(0_0_14px_color-mix(in_srgb,var(--accent2)_35%,transparent))]",
                  )}
                >
                  {i > 0 && (
                    <span
                      className="inline-grid h-[0.9em] w-[0.9em] flex-none place-items-center text-accent [filter:drop-shadow(0_0_8px_color-mix(in_srgb,var(--accent)_55%,transparent))]"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-full w-full fill-none stroke-current stroke-[3.2] [stroke-linecap:round] cyber:[stroke-linecap:square]"
                      >
                        <path d="M12 6.5v11M6.5 12h11" />
                      </svg>
                    </span>
                  )}
                  {i > 0 && <span className="sr-only">+ </span>}
                  {part}
                </span>
              ))}
          </p>
          <p className="max-w-[520px] text-[17px] text-pretty text-muted">{L(PERSON.intro)}</p>
          <div className="flex flex-wrap gap-[10px] pt-3 narrow:grid narrow:grid-cols-1">
            <button
              type="button"
              className={cn(button(), "narrow:justify-center")}
              onClick={() => app.goSection("showcase")}
            >
              {t.ctaProjects}
            </button>
            <button
              type="button"
              className={cn(
                button({ variant: "outline" }),
                "cyber:hover:border-accent2 narrow:justify-center",
              )}
              onClick={() => app.setChatOpen(true)}
            >
              <span className={pulseDot()} aria-hidden="true" />
              {t.ctaAsk}
            </button>
          </div>
        </div>
      </div>

      <HeroMedia />

      <HeroBar />
    </section>
  );
}

const ICONS: Record<string, ReactNode> = {
  GitHub: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  CV: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6M9 15l3 3 3-3" />
    </>
  ),
};

/** Bottom strip of the hero: availability, email with copy, and links. */
function HeroBar() {
  const { t, L } = useI18n();
  const app = useApp();
  const [copied, setCopied] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Line the links up with the right edge of the panel above (achievements or the disciplines graphic).
  useLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;
    const align = () => {
      const panel = el.parentElement?.querySelector("[data-hero-panel]");
      if (!panel || app.narrow) {
        el.style.removeProperty("--bar-end");
        return;
      }
      const gap = el.getBoundingClientRect().right - panel.getBoundingClientRect().right;
      el.style.setProperty("--bar-end", Math.max(0, Math.round(gap)) + "px");
    };
    align();
    const ro = new ResizeObserver(align);
    ro.observe(el);
    const panel = el.parentElement?.querySelector("[data-hero-media]");
    if (panel) ro.observe(panel);
    return () => ro.disconnect();
  }, [app.theme, app.narrow]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PERSON.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is still selectable */
    }
  }

  const links = [
    ...PERSON.links.map((l) => ({ label: l.label, url: l.url, icon: ICONS[l.label] })),
    { label: L(PERSON.cv.label), url: L(PERSON.cv.url), icon: ICONS.CV },
  ];

  return (
    <div
      className={
        "col-span-full mx-[clamp(16px,3.5cqi,56px)] flex flex-wrap items-center gap-x-7 gap-y-[14px] border-t border-line2 pt-[18px] pb-[22px] " +
        // The links end where the panel above ends (--bar-end, set in the effect above).
        "pr-[var(--bar-end,0px)] narrow:-order-1 " +
        // Mobile: status on top, the email as one full-width field with copy, links as two equal halves.
        "narrow:grid narrow:grid-cols-2 narrow:self-stretch narrow:gap-x-2 narrow:gap-y-3 narrow:pt-6 narrow:pb-7"
      }
      data-reveal="120"
      ref={bar}
    >
      <span className="inline-flex items-center gap-[10px] font-mono text-[14px] tracking-[0.04em] text-muted uppercase narrow:col-span-2 narrow:text-[13px]">
        <span
          className="h-2 w-2 animate-hero-dot rounded-full bg-[#2fd67b] shadow-[0_0_0_0_rgba(47,214,123,0.5)]"
          aria-hidden="true"
        />
        {L(PERSON.status)}
      </span>
      <div
        className={
          "inline-flex min-w-0 items-center gap-[10px] " +
          "narrow:col-span-2 narrow:justify-between narrow:rounded-full narrow:border narrow:border-line2 narrow:py-[5px] narrow:pr-[5px] narrow:pl-4 " +
          "cyber:narrow:rounded-none cyber:narrow:bg-surface glass:narrow:border-glass-edge glass:narrow:bg-[rgba(255,255,255,0.55)] glass:narrow:shadow-[0_0_0_1px_rgba(110,80,220,0.1),0_6px_14px_-8px_rgba(90,60,200,0.3)]"
        }
      >
        <a
          className="font-display text-[14px] font-medium break-all narrow:min-w-0 narrow:truncate narrow:text-[15px] narrow:break-normal"
          href={`mailto:${PERSON.email}`}
        >
          {PERSON.email}
        </a>
        <button
          type="button"
          className={copyBtn({ done: copied })}
          onClick={copy}
          aria-label={copied ? t.copied : t.copy}
          title={copied ? t.copied : t.copy}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={SVG_ICON}>
            {copied ? (
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            ) : (
              <>
                <rect x="8.5" y="8.5" width="11" height="11" rx="2.2" />
                <path d="M15.5 8.5V6.7a2.2 2.2 0 0 0-2.2-2.2H6.7a2.2 2.2 0 0 0-2.2 2.2v6.6a2.2 2.2 0 0 0 2.2 2.2h1.8" />
              </>
            )}
          </svg>
          <span className="sr-only" aria-live="polite">
            {copied ? t.copied : ""}
          </span>
        </button>
      </div>
      <div className="ml-auto flex flex-wrap gap-2 narrow:col-span-2 narrow:ml-0 narrow:grid narrow:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(BAR_LINK, "narrow:justify-center narrow:py-[10px]")}
          >
            {l.icon && (
              <svg viewBox="0 0 24 24" aria-hidden="true" className={SVG_ICON}>
                {l.icon}
              </svg>
            )}
            {l.label}
            <span aria-hidden="true" className="text-[14px] text-accent">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
