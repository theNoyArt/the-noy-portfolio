import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useApp } from "../app/AppContext";
import { EXPERIENCE, EXPERIENCE_DESC } from "../content/experience";
import type { Track, WorkProject } from "../content/types";
import { getWorkCase } from "../lib/cases";
import { useI18n } from "../lib/i18n";
import { TrackTag } from "../components/TrackTag";
import { cn, tv } from "../lib/cn";
import { monoLabel, section, sectionDesc, sectionHead, sectionTitle, seg } from "../styles/recipes";

/* Rise-in delays for rows and cards after a company switch, by position. */
const RESP_DELAY = [
  "[animation-delay:0.1s]",
  "[animation-delay:0.15s]",
  "[animation-delay:0.2s]",
  "[animation-delay:0.25s]",
  "[animation-delay:0.3s]",
];
const ROW_DELAY = ["[animation-delay:0.14s]", "[animation-delay:0.22s]", "[animation-delay:0.3s]", "[animation-delay:0.38s]"];
const delay = (list: string[], i: number) => list[Math.min(i, list.length - 1)];

const lane = tv({
  slots: {
    root:
      "group flex cursor-pointer flex-col gap-2 rounded-card-sm p-3 narrow:gap-[6px] narrow:px-3 narrow:py-[9px] " +
      "[transition:background-color_0.3s,opacity_0.3s,transform_0.3s_cubic-bezier(0.2,0.8,0.2,1)]",
    /* Bars grow from their start year the first time the timeline is seen, one lane after another. */
    bar:
      "absolute top-0 bottom-0 origin-left overflow-hidden rounded-full opacity-90 cyber:rounded-none " +
      "[transition:transform_1s_cubic-bezier(0.2,0.8,0.2,1)_calc(var(--i,0)*0.12s),filter_0.3s,opacity_0.3s] " +
      "group-hover:[filter:brightness(1.12)_saturate(1.1)] motion-reduce:[scale:1] motion-reduce:[transition:none]",
    /* Project pins pop in once their bar is there (with reduced motion: no pop and no transform at all, as before). */
    pin:
      "absolute top-1/2 flex h-[22px] cursor-pointer items-center rounded-card-sm border border-ink bg-bg px-[9px] font-mono text-[10.5px] whitespace-nowrap text-ink " +
      "[transform:translateY(-50%)] hover:[transform:translateY(-50%)_scale(1.06)] " +
      "[transition:scale_0.4s_cubic-bezier(0.3,1.5,0.5,1)_calc(0.7s+var(--i,0)*0.12s),opacity_0.3s,transform_0.25s] " +
      "motion-reduce:[scale:1] motion-reduce:[transform:none] motion-reduce:[transition:none] motion-reduce:hover:[transform:none]",
  },
  variants: {
    on: {
      true: {
        root: "bg-surface shadow-[inset_0_0_0_1px_var(--line2)]",
        // Selected lane: a light sweep runs along its bar.
        bar:
          "shadow-[var(--glow),0_0_14px_-2px_color-mix(in_srgb,var(--accent)_55%,transparent)] " +
          "after:absolute after:inset-0 after:animate-lane-sweep after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)] after:[transform:translateX(-100%)]",
      },
      false: {
        root:
          "hover:bg-[color-mix(in_srgb,var(--surface)_55%,transparent)] hover:[transform:translateX(4px)] motion-reduce:hover:[transform:none]",
      },
    },
    seen: {
      true: { bar: "[transform:scaleX(1)]", pin: "[scale:1]" },
      false: { bar: "[transform:scaleX(0)] motion-reduce:[transform:none]", pin: "[scale:0]" },
    },
    dot: { true: { pin: "h-[14px] w-[14px] min-w-[14px] rounded-full p-0" } },
  },
});

/* Rows that rise in after a company switch. */
const RISE = "animate-exp-in";

type Filter = "all" | Track;

// Timeline runs from the earliest start year to the end of the current year.
const Y0 = Math.min(...EXPERIENCE.map((x) => x.from));
const Y1 = new Date().getFullYear() + 0.9;
const SPAN = Y1 - Y0;
const pct = (y: number) => ((y - Y0) / SPAN) * 100;

export function Experience() {
  const { t, L, lang } = useI18n();
  const app = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [sel, setSel] = useState(0);
  // The timeline bars grow in the first time the timeline scrolls into view.
  const tl = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = tl.current;
    if (!el || seen) return;
    if (app.reduced || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [app.reduced, seen]);

  const matches = (kinds: Track[]) => filter === "all" || kinds.includes(filter);

  function changeFilter(f: Filter) {
    setFilter(f);
    if (f !== "all")
      setSel(
        Math.max(
          0,
          EXPERIENCE.findIndex((x) => x.kind.includes(f)),
        ),
      );
  }

  const years: number[] = [];
  for (let y = Y0; y <= Math.floor(Y1); y += app.narrow ? 2 : 1) years.push(y);

  const detail = useRef<HTMLDivElement>(null);
  const ex = EXPERIENCE[sel] ?? EXPERIENCE[0];
  const exProjects = ex.projects.map((p) => getWorkCase(p.id)).filter(Boolean);

  return (
    <section id="s-experience" data-nav-section className={section()}>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className={sectionHead()}>
          <span className={monoLabel({ head: true })}>{t.expLabel}</span>
          <h2 className={sectionTitle()}>{t.expTitle}</h2>
          <p className={sectionDesc({ size: "sm" })}>{L(EXPERIENCE_DESC)}</p>
        </div>
        <div className={seg({ layout: "tabs" }).root()} role="group" aria-label={t.expTitle}>
          {(["all", "ux", "dev"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              className={seg({ layout: "tabs", on: filter === f }).btn()}
              onClick={() => changeFilter(f)}
            >
              {t[f]}
            </button>
          ))}
        </div>
      </div>

      <div data-reveal="0" ref={tl} className="flex flex-col gap-1">
        <div className="relative h-[22px] font-mono text-[10.5px] text-muted" aria-hidden="true">
          {years.map((y) => (
            <span key={y} className="absolute top-0" style={{ left: `calc(12px + (100% - 24px) * ${(y - Y0) / SPAN})` }}>
              {app.narrow ? "'" + String(y).slice(2) : y}
            </span>
          ))}
        </div>
        {EXPERIENCE.map((x, i) => {
          const on = i === sel;
          const l = lane({ on, seen });
          const to = x.to ?? Y1;
          const bg =
            x.kind.length > 1
              ? "linear-gradient(90deg, var(--accent), var(--accent2))"
              : x.kind[0] === "ux"
                ? "var(--accent)"
                : "var(--accent2)";
          return (
            <div
              key={x.id}
              className={l.root()}
              style={{ opacity: matches(x.kind) ? (on ? 1 : 0.8) : 0.3, "--i": i } as CSSProperties}
              onClick={() => setSel(i)}
            >
              <button
                type="button"
                className="flex cursor-pointer flex-wrap justify-between gap-x-3 gap-y-1 border-0 bg-transparent p-0 text-left text-[14px]"
                aria-pressed={on}
                onClick={() => setSel(i)}
              >
                <span>
                  <strong className="font-semibold">{x.company}</strong>
                  <span className="text-muted narrow:hidden"> · {L(x.role)}</span>
                </span>
                <span className="font-mono text-[11px] text-muted">{L(x.dates)}</span>
              </button>
              <span className="relative my-1 block h-[10px] rounded-full bg-surface2 narrow:my-[3px] narrow:h-[6px] [transition:background-color_0.5s] cyber:rounded-none">
                <span
                  className={l.bar()}
                  style={{
                    left: pct(x.from) + "%",
                    width: pct(to) - pct(x.from) + "%",
                    background: bg,
                  }}
                />
                {x.projects.map((p) => {
                  const pr = getWorkCase(p.id);
                  if (!pr) return null;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      title={pr.name}
                      aria-label={`${t.caseStudy}: ${pr.name}`}
                      className={lane({ seen, dot: app.narrow }).pin()}
                      style={{ left: pct(p.at) + "%", opacity: matches(pr.tracks) ? 1 : 0.35 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        app.openCase(pr.id);
                      }}
                    >
                      {app.narrow ? "" : pr.name}
                    </button>
                  );
                })}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: a company strip that sticks under the header while you read a company's projects. */}
      <div className="flex flex-col gap-3">
      {app.narrow && <CompanyStrip sel={sel} onSelect={setSel} matches={matches} detail={detail} />}

      {/* Details: switch companies and the panel content rises in, cards and rows one by one. */}
      <div
        ref={detail}
        className={cn(
          "grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(24px,3cqi,48px)] rounded-card border border-line2 bg-surface p-[clamp(20px,3cqi,36px)] " +
            "[transition:border-radius_0.5s,background-color_0.5s] glass:glass-blur glass:border-glass-edge glass:shadow-glass",
          ex.work?.length && "grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] narrow:grid-cols-[minmax(0,1fr)]",
        )}
      >
        <div className="flex animate-exp-col flex-col gap-[10px]" key={"a-" + ex.id}>
          <span className={monoLabel({ tone: "accent" })}>{L(ex.dates)}</span>
          <span className="display text-[calc(clamp(30px,3.2cqi,48px)*var(--h1-scale,1))] leading-none">{ex.company}</span>
          <span className="text-[16px] text-muted">{L(ex.role)}</span>
          <p className="mt-[6px] text-[16px] text-pretty">{L(ex.desc)}</p>
          <ul className="mt-2 flex list-none flex-col border-t border-line p-0">
            {(ex.resp[lang] ?? ex.resp.en).map((r, i) => (
              <li key={r} className={cn(RISE, "border-b border-line py-[9px] text-[14.5px]", delay(RESP_DELAY, i))}>
                {r}
              </li>
            ))}
          </ul>
          <p className="font-mono text-[12px] text-muted">{ex.tech.join(" · ")}</p>
        </div>
        <div className="flex animate-exp-col-late flex-col gap-[10px]" key={"b-" + ex.id}>
          <span className={monoLabel()}>
            {t.projectsAt} {ex.company}
          </span>
          {ex.work && ex.work.length > 0 ? (
            <WorkList work={ex.work} company={ex.company} note={ex.note ? L(ex.note) : null} />
          ) : exProjects.length > 0 ? (
            <div className="flex flex-col border-t border-line2">
              {exProjects.map((pr, i) => (
                <a
                  key={pr!.id}
                  href={`#/case/${pr!.id}`}
                  className={cn(
                    RISE,
                    "group flex flex-col gap-[6px] border-b border-line py-4 text-inherit [transition:opacity_0.3s]",
                    delay(ROW_DELAY, i),
                  )}
                  style={{ opacity: matches(pr!.tracks) ? 1 : 0.4 }}
                  onClick={(e) => {
                    e.preventDefault();
                    app.openCase(pr!.id);
                  }}
                >
                  <span className="flex items-center justify-between gap-[10px]">
                    <span className="display text-[calc(clamp(24px,2.2cqi,32px)*var(--h1-scale,1))] leading-none [transition:color_0.25s] group-hover:text-accent">
                      {pr!.name}
                    </span>
                    <span className="flex items-center gap-1">
                      {pr!.tracks.map((tr) => (
                        <TrackTag key={tr} track={tr} />
                      ))}
                      <span className="ml-[6px] text-[18px] text-accent" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </span>
                  <span className="text-[14px] text-pretty text-muted">{L(pr!.short)}</span>
                  <span className="font-mono text-[11px] text-muted">
                    {pr!.year} · {L(pr!.role)}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="border-t border-line2 py-4 text-[15px] text-muted">{L(ex.note)}</p>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}

/** Sticky row of companies (mobile). Picking one while reading lower down jumps back to the top of its details. */
function CompanyStrip({
  sel,
  onSelect,
  matches,
  detail,
}: {
  sel: number;
  onSelect: (i: number) => void;
  matches: (kinds: Track[]) => boolean;
  detail: { current: HTMLDivElement | null };
}) {
  const { t, L } = useI18n();
  const strip = useRef<HTMLDivElement>(null);

  // Keep the selected company visible in the strip.
  useEffect(() => {
    const row = strip.current;
    const btn = row?.querySelector<HTMLElement>("[aria-pressed=true]");
    if (!row || !btn) return;
    const left = btn.offsetLeft - (row.clientWidth - btn.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [sel]);

  function pick(i: number) {
    onSelect(i);
    const d = detail.current;
    const bar = strip.current?.parentElement;
    if (!d || !bar) return;
    const stuck = bar.getBoundingClientRect().bottom;
    const top = d.getBoundingClientRect().top;
    // Only scroll when the details' top has already gone up under the strip.
    if (top < stuck) window.scrollBy({ top: top - stuck - 8, behavior: "smooth" });
  }

  return (
    <div
      className={
        "sticky top-[65px] z-[5] -mx-4 border-b border-line bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] py-2 backdrop-blur-[14px]"
      }
    >
      <div
        ref={strip}
        className="flex gap-[6px] overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label={t.expTitle}
      >
        {EXPERIENCE.map((x, i) => {
          const on = i === sel;
          return (
            <button
              key={x.id}
              type="button"
              aria-pressed={on}
              onClick={() => pick(i)}
              className={cn(
                "flex flex-none cursor-pointer flex-col items-start gap-[2px] rounded-card-sm border px-3 py-[6px] text-left [transition:background-color_0.25s,border-color_0.25s,opacity_0.25s] cyber:rounded-none",
                on
                  ? "border-accent bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface))] text-ink shadow-[0_0_14px_-4px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
                  : "border-line2 bg-surface text-ink",
                !matches(x.kind) && !on && "opacity-45",
              )}
            >
              <span className="max-w-[180px] truncate text-[13.5px] font-semibold">{x.company}</span>
              <span className={cn("font-mono text-[10.5px]", on ? "text-accent" : "text-muted")}>{L(x.dates)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Client projects at one company: featured ones as cards, the rest as a compact list.
 * Each has a small bar showing when it ran within the company's project span.
 */
function WorkList({ work, company, note }: { work: WorkProject[]; company: string; note: string | null }) {
  const { t, L } = useI18n();
  const dated = work.filter((w) => w.from != null && w.to != null);
  const a = Math.min(...dated.map((w) => w.from!));
  const b = Math.max(...dated.map((w) => w.to!));
  const span = Math.max(b - a, 0.5);
  const featured = work.filter((w) => w.featured);
  const earlier = work.filter((w) => !w.featured);

  // When the project ran, within the span of all projects at this company; draws in after its card.
  const bar = (w: WorkProject) =>
    w.from == null || w.to == null ? null : (
      <span className="relative mt-1 mb-[2px] block h-1 rounded-[2px] bg-line cyber:rounded-none" aria-hidden="true">
        <span
          className={
            "absolute top-0 bottom-0 min-w-[6px] origin-left animate-exp-bar rounded-[2px] bg-[linear-gradient(90deg,var(--accent),var(--accent2))] cyber:rounded-none"
          }
          style={{ left: ((w.from - a) / span) * 100 + "%", width: ((w.to - w.from) / span) * 100 + "%" }}
        />
      </span>
    );
  const top = "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1";
  const dates = "font-mono text-[11px] tracking-[0.04em] whitespace-nowrap text-accent";
  const meta = "text-[13.5px] text-muted";
  const hover = "[transition:transform_0.3s_cubic-bezier(0.2,0.8,0.2,1),box-shadow_0.3s,border-color_0.3s]";

  return (
    <div className="flex flex-col gap-[clamp(18px,2cqi,26px)]">
      <div className="flex flex-col gap-3">
        {featured.map((w, i) => (
          <article
            key={w.id}
            className={cn(
              RISE,
              hover,
              "flex flex-col gap-2 rounded-card-sm border border-line2 bg-[color-mix(in_srgb,var(--accent)_5%,transparent)] p-[clamp(16px,1.8cqi,22px)] " +
                "hover:[transform:translateY(-3px)] motion-reduce:hover:[transform:none] " +
                "glass:border-glass-edge glass:bg-[rgba(255,255,255,0.5)] glass:shadow-[0_0_0_1px_rgba(110,80,220,0.08),0_10px_24px_-16px_rgba(90,60,200,0.3)]",
              delay(ROW_DELAY, i),
            )}
          >
            <div className={top}>
              <span className="display text-[clamp(19px,1.7cqi,23px)] leading-[1.15] text-balance">{L(w.title)}</span>
              <span className={dates}>{L(w.dates)}</span>
            </div>
            <span className={meta}>
              {L(w.client)} · {L(w.role)}
            </span>
            {bar(w)}
            <p className="mt-1 text-[15px] leading-[1.55] text-pretty">{L(w.desc)}</p>
            <ul className="mt-1 flex list-none flex-wrap gap-[6px] p-0">
              {w.tags.map((tg) => (
                <li
                  key={tg}
                  className={
                    "rounded-full border border-line2 px-[9px] py-[3px] text-[12px] text-muted cyber:rounded-none " +
                    "glass:border-[rgba(110,80,220,0.2)] glass:bg-[rgba(122,92,240,0.06)]"
                  }
                >
                  {tg}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {earlier.length > 0 && (
        <div className="flex flex-col">
          <span className={cn(monoLabel(), "border-b border-line2 pb-2")}>
            {t.earlierAt} {company}
          </span>
          {earlier.map((w, i) => (
            <div key={w.id} className={cn(RISE, hover, "flex flex-col gap-1 border-b border-line py-[14px]", delay(ROW_DELAY, i))}>
              <div className={top}>
                <span className="text-[15.5px] font-semibold">{L(w.title)}</span>
                <span className={dates}>{L(w.dates)}</span>
              </div>
              <span className={meta}>
                {L(w.client)} · {L(w.role)}
              </span>
              {bar(w)}
              <p className="mt-[2px] text-[14px] text-pretty text-muted">{L(w.desc)}</p>
            </div>
          ))}
        </div>
      )}
      {note && <p className="m-0 text-[13px] text-muted">{note}</p>}
    </div>
  );
}
