import { useState } from "react";
import { AUDIT_ITEMS, AUDIT_PAGES } from "../../content/dtrpg/audit";
import { DT_LINKS, DT_PROBLEMS, DT_STATS } from "../../content/dtrpg/project";
import type { AuditItem, AuditType } from "../../content/dtrpg/types";
import { cn } from "../../lib/cn";
import { label, sec, secHead, secLink } from "./case-ui";
import { useTr } from "./tr";
import { Chip, Ext, ReportToggle, pad } from "./ui";

const TYPES: { id: AuditType; label: string }[] = [
  { id: "fix", label: "Critical fix" },
  { id: "improvement", label: "Improvement" },
  { id: "idea", label: "Idea" },
];
const TYPE_LABEL = Object.fromEntries(TYPES.map((t) => [t.id, t.label])) as Record<
  AuditType,
  string
>;
const PAGE_LABEL = Object.fromEntries(AUDIT_PAGES.map((p) => [p.id, p.label]));
const TYPE_ORDER: Record<AuditType, number> = { fix: 0, improvement: 1, idea: 2 };
const PAGE_ORDER = Object.fromEntries(AUDIT_PAGES.map((p, i) => [p.id, i]));

/** Per-type colour (--type-color) and readable text colour (--type-ink). */
const TYPE_VARS: Record<AuditType, string> = {
  fix: "[--type-color:var(--fix)] [--type-ink:var(--fix-ink)]",
  improvement: "[--type-color:var(--improvement)] [--type-ink:var(--improvement-ink)]",
  idea: "[--type-color:var(--idea)] [--type-ink:var(--idea-ink)]",
};
const TYPE_TEXT: Record<AuditType, string> = {
  fix: "text-fix glass:text-fix-ink",
  improvement: "text-improvement glass:text-improvement-ink",
  idea: "text-idea glass:text-idea-ink",
};
const TYPE_BG: Record<AuditType, string> = {
  fix: "bg-fix [--seg:var(--fix)]",
  improvement: "bg-improvement [--seg:var(--improvement)]",
  idea: "bg-idea [--seg:var(--idea)]",
};

/* Stat tiles: one block in Cyber dark; separate glass cards in Glass light, numbers in their type colour (--sc). */
const STAT_COLOR: Record<string, string> = {
  "c-fix": "text-fix",
  "c-improvement": "text-improvement",
  "c-idea": "text-idea",
};
const STAT_SC = [
  "[--sc:#7a5cf0]",
  "[--sc:var(--fix)]",
  "[--sc:var(--improvement)]",
  "[--sc:var(--idea)]",
];
const STAT =
  "flex flex-col gap-[6px] bg-bg p-5 " +
  "glass:relative glass:overflow-hidden glass:rounded-[16px] glass:border glass:border-white/95 glass:bg-transparent " +
  "glass:bg-[linear-gradient(165deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.7)_45%,color-mix(in_srgb,var(--sc,#7a5cf0)_3%,rgba(255,255,255,0.7))_100%)] " +
  "glass:backdrop-blur-[14px] glass:backdrop-saturate-[1.6] " +
  "glass:shadow-[inset_0_1px_0_#fff,0_0_0_1px_color-mix(in_srgb,var(--sc,#7a5cf0)_10%,transparent),0_12px_26px_-14px_color-mix(in_srgb,var(--sc,#7a5cf0)_45%,transparent)] " +
  "glass:after:pointer-events-none glass:after:absolute glass:after:-top-[90px] glass:after:-right-20 glass:after:h-60 glass:after:w-60 glass:after:rounded-full glass:after:blur-[6px] " +
  "glass:after:bg-[radial-gradient(circle,color-mix(in_srgb,var(--sc,#7a5cf0)_10%,transparent)_0%,color-mix(in_srgb,var(--sc,#7a5cf0)_5%,transparent)_35%,transparent_70%)]";
const STAT_V =
  "display text-[44px] leading-none tabular-nums glass:text-clip " +
  "glass:[filter:drop-shadow(0_0_10px_color-mix(in_srgb,var(--sc)_35%,transparent))_drop-shadow(0_0_2px_color-mix(in_srgb,var(--sc)_25%,transparent))]";
const STAT_V_GRADIENT = [
  "glass:bg-[linear-gradient(180deg,#3a2b78_0%,#5034a8_100%)]",
  "glass:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sc)_82%,#1b1630)_0%,color-mix(in_srgb,var(--sc)_90%,#1b1630)_100%)]",
];

/** Type badge: coloured text and dot on a faint wash of the same colour; flat with a glow in Glass light. */
const TYPE_TAG =
  "inline-flex items-center gap-[7px] rounded-full border border-[color-mix(in_srgb,var(--type-color)_35%,transparent)] bg-[color-mix(in_srgb,var(--type-color)_12%,transparent)] " +
  "py-[3px] pr-[10px] pl-2 text-[13px] leading-[1.3] font-semibold whitespace-nowrap text-[color:var(--type-ink,var(--type-color))] " +
  "before:h-[7px] before:w-[7px] before:flex-none before:rounded-full before:bg-current " +
  "glass:border-[color-mix(in_srgb,var(--type-color)_30%,transparent)] glass:bg-[color-mix(in_srgb,var(--type-color)_10%,#ffffff)] glass:py-1 glass:pr-[11px] glass:pl-[9px] " +
  "glass:text-[color:var(--type-ink)] glass:shadow-[0_0_14px_-2px_color-mix(in_srgb,var(--type-color)_38%,transparent)] " +
  "glass:before:bg-[color:var(--type-color)] glass:before:shadow-[0_0_6px_1px_color-mix(in_srgb,var(--type-color)_70%,transparent)]";

const INSIGHT_P = "text-[15px] leading-[1.6] text-pretty";
const INSIGHT_K = "mb-1 block font-mono text-[10.5px] tracking-[0.08em] uppercase";
const INSIGHT_K_FIX = INSIGHT_K + " font-semibold text-[color:var(--type-ink,var(--type-color))]";

/** The insight table's columns; one-page views drop the Page column. */
const ROW_GRID =
  "grid grid-cols-[44px_var(--type-col,128px)_minmax(0,1fr)_120px_24px] items-center gap-[14px]";
const ROW_GRID_ONE_PAGE = "grid-cols-[44px_var(--type-col,128px)_minmax(0,1fr)_24px]";

/** Splits a page summary into its verdict (first sentence) and the specific problems. */
function splitSummary(s: string): [string, string[]] {
  const parts = s.split(/(?<=[.!?])\s+(?=[A-Z“"])/);
  const points = parts.slice(1).map((x) => {
    const y = x.replace(/^(But|And|Also)\s+/, "");
    return y.charAt(0).toUpperCase() + y.slice(1);
  });
  return [parts[0], points];
}

export function Audit() {
  const { tr } = useTr();
  const [open, setOpen] = useState(false);

  return (
    <section className={sec()} id="c-audit" data-nav-section>
      <div className={secHead}>
        <span className={label({ tone: "accent", star: true })}>{tr("[02] UX audit report")}</span>
        <Ext className={secLink} href={DT_LINKS.audit}>
          {tr("Full audit in Figma ↗")}
        </Ext>
      </div>
      {/* Key finding: a short claim, the three problems as evidence, and what already works. */}
      <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start gap-x-[clamp(24px,4vw,56px)] gap-y-6 max-[899px]:grid-cols-[minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <span className={label()}>{tr("Key finding")}</span>
          <h2 className="case-heading text-[clamp(28px,2.8vw,40px)] leading-[1.12] text-balance">
            {tr("The site feels dated because of three compounding problems.")}
          </h2>
          <p
            className={
              "glass-blur border-l-[3px] border-accent-2 bg-[color-mix(in_srgb,var(--accent-2)_8%,transparent)] px-4 py-3 text-[15px] leading-[1.6] text-muted " +
              // Glass light: a flat glowing callout with a ✓ badge.
              "glass:relative glass:rounded-[16px] glass:border glass:border-[color-mix(in_srgb,var(--accent-2)_26%,transparent)] glass:bg-[color-mix(in_srgb,var(--accent-2)_7%,#ffffff)] " +
              "glass:py-[14px] glass:pr-[18px] glass:pl-[52px] glass:shadow-[0_0_18px_-4px_color-mix(in_srgb,var(--accent-2)_30%,transparent)] " +
              "glass:before:absolute glass:before:top-[15px] glass:before:left-4 glass:before:grid glass:before:h-[22px] glass:before:w-[22px] glass:before:place-items-center glass:before:rounded-full " +
              "glass:before:bg-accent-2 glass:before:text-[12px] glass:before:font-bold glass:before:text-white glass:before:content-check " +
              "glass:before:shadow-[0_0_10px_1px_color-mix(in_srgb,var(--accent-2)_55%,transparent)]"
            }
          >
            <b className="font-semibold text-ink glass:text-accent-2">{tr("What works:")}</b>
            {tr(
              " search, browse, cart and checkout are broadly consistent. None of this needs a full rebuild: it can be fixed as a component-level pass.",
            )}
          </p>
        </div>
        <div
          className={
            "glass-blur grid grid-cols-2 gap-px self-start overflow-hidden rounded-card border border-glass-edge bg-line-2 shadow-glass " +
            "glass:gap-[10px] glass:overflow-visible glass:border-0 glass:bg-transparent glass:shadow-none glass:backdrop-filter-none"
          }
        >
          {DT_STATS.map((s, i) => (
            <div className={cn(STAT, STAT_SC[i])} key={s.l}>
              <span className={cn(STAT_V, s.c && STAT_COLOR[s.c], STAT_V_GRADIENT[i ? 1 : 0])}>
                {s.v}
              </span>
              <span className="text-[13.5px] text-muted">{tr(s.l)}</span>
            </div>
          ))}
        </div>
      </div>
      <ol className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3 p-0">
        {DT_PROBLEMS.map((p, i) => (
          <li
            className={
              "glass-blur flex flex-col gap-2 rounded-card border border-t-[3px] border-line-2 border-t-accent bg-surface px-5 pt-[18px] pb-5 shadow-glass " +
              "glass:relative glass:overflow-hidden glass:border-t glass:border-t-glass-edge " +
              "glass:before:absolute glass:before:inset-x-0 glass:before:top-0 glass:before:h-[3px] glass:before:bg-[linear-gradient(90deg,#5a2fd0,#b4a2ff)]"
            }
            key={p.t}
          >
            <span className="font-mono text-[12px] text-accent">{pad(i + 1)}</span>
            <b className="text-[18px] leading-[1.3] font-semibold">{tr(p.t)}</b>
            <span className="text-[14.5px] leading-[1.6] text-pretty text-muted">{tr(p.d)}</span>
          </li>
        ))}
      </ol>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[14px] leading-[1.6] text-muted">
        <span className={label({ tone: "accent" })}>{tr("Method")}</span>
        {tr(
          " Heuristic evaluation of drivethrurpg.com against Nielsen’s 10 usability heuristics, page by page, with research notes on each pattern.",
        )}
      </p>

      <ReportToggle
        open={open}
        onToggle={() => setOpen(!open)}
        controls="audit-report"
        label={tr(open ? "Hide the full report" : "Explore the full report")}
        hint={tr("87 insights across 6 pages, filterable by page and type")}
      />
      {open && <Report />}
    </section>
  );
}

function Report() {
  const { tr, f } = useTr();
  const [page, setPage] = useState("home");
  const [type, setType] = useState<AuditType | "all">("all");
  // Which rows are open. null = the default for this view: the first two rows open.
  const [openRows, setOpenRows] = useState<Set<AuditItem> | null>(null);

  const inPage = AUDIT_ITEMS.filter((x) => page === "all" || x.p === page);
  const shown = inPage.filter((x) => type === "all" || x.t === type);
  // Critical fixes first, then improvements, then ideas; page order inside each type.
  const sorted = shown
    .slice()
    .sort(
      (a, b) =>
        TYPE_ORDER[a.t] - TYPE_ORDER[b.t] ||
        PAGE_ORDER[a.p] - PAGE_ORDER[b.p] ||
        AUDIT_ITEMS.indexOf(a) - AUDIT_ITEMS.indexOf(b),
    );
  const opened = openRows ?? new Set(sorted.slice(0, 2));
  const allOpen = sorted.length > 0 && sorted.every((x) => opened.has(x));

  const cur = AUDIT_PAGES.find((p) => p.id === page);
  const allPages = page === "all";
  const count = (t: AuditType) => inPage.filter((x) => x.t === t).length;

  const pick = (next: () => void) => {
    next();
    setOpenRows(null);
  };
  const toggleRow = (x: AuditItem, isOpen: boolean) => {
    if (opened.has(x) === isOpen) return;
    const s = new Set(opened);
    if (isOpen) s.add(x);
    else s.delete(x);
    setOpenRows(s);
  };

  return (
    <div className="flex flex-col gap-[clamp(20px,2.4vw,28px)]" id="audit-report">
      <div className="flex flex-col gap-[18px]">
        {/* Page tabs: navigation between audited pages. */}
        <div
          className="flex gap-[26px] overflow-x-auto border-b border-line-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label={tr("Page")}
        >
          {[{ id: "all", label: "All pages" }, ...AUDIT_PAGES].map((p) => (
            <Chip
              key={p.id}
              pressed={page === p.id}
              onClick={() => pick(() => setPage(p.id))}
              count={AUDIT_ITEMS.filter((x) => p.id === "all" || x.p === p.id).length}
              type="tab"
            >
              {tr(p.label)}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-[14px] gap-y-2">
          <span className={label()} id="lbl-type">
            {tr("Type")}
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="lbl-type">
            {[{ id: "all" as const, label: "All types" }, ...TYPES].map((t) => (
              <Chip
                key={t.id}
                pressed={type === t.id}
                onClick={() => pick(() => setType(t.id))}
                count={t.id === "all" ? inPage.length : count(t.id)}
                pill
                type={t.id}
              >
                {tr(t.label)}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {cur && (
        <PageSummary
          name={tr(cur.label)}
          summary={cur.summary}
          total={inPage.length}
          critical={count("fix")}
        />
      )}

      {/* Type mix: one stacked bar that doubles as the legend. */}
      <div className="flex flex-col gap-[10px]" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[12px] text-muted">
          <span>
            {f.showing(shown.length, inPage.length, cur ? tr(cur.label) : null, AUDIT_PAGES.length)}
          </span>
          <button
            type="button"
            className="cursor-pointer border-0 border-b border-line-2 bg-transparent px-0 py-1 text-ink hover:border-ink"
            aria-pressed={allOpen}
            onClick={() => setOpenRows(allOpen ? new Set() : new Set(sorted))}
          >
            {tr(allOpen ? "Collapse all" : "Expand all")}
          </button>
        </div>
        <div
          className="flex h-3 gap-[2px] glass:h-[10px] glass:gap-[3px] glass:rounded-full"
          aria-hidden="true"
        >
          {TYPES.map((t) =>
            count(t.id) ? (
              <span
                key={t.id}
                className={cn(
                  "min-w-1 [transition:flex-grow_0.35s_ease] data-[dim=true]:opacity-[0.22]",
                  "glass:relative glass:rounded-full glass:bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_55%)]",
                  "glass:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_0_10px_-1px_color-mix(in_srgb,var(--seg)_70%,transparent),0_3px_12px_-3px_color-mix(in_srgb,var(--seg)_80%,transparent)]",
                  "glass:data-[dim=true]:shadow-none",
                  TYPE_BG[t.id],
                )}
                style={{ flexGrow: count(t.id) }}
                data-dim={String(type !== "all" && type !== t.id)}
              />
            ) : null,
          )}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-[6px] text-[13.5px]">
          {TYPES.map((t) => (
            <span
              key={t.id}
              className={cn(
                TYPE_TEXT[t.id],
                "glass:[text-shadow:0_0_12px_color-mix(in_srgb,currentColor_35%,transparent)]",
              )}
            >
              <b className="mr-[6px] font-mono font-semibold tabular-nums">{count(t.id)}</b>
              {tr(t.label)}
            </span>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="border border-dashed border-line-2 p-6 text-muted">
          {tr("No insights of this type on this page.")}
        </p>
      ) : (
        // Expandable insight table: one scannable line per insight, details on demand.
        <div className="border-t border-line-2">
          <div
            className={cn(
              ROW_GRID,
              !allPages && ROW_GRID_ONE_PAGE,
              "border-b border-line-2 px-3 py-[10px] font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase max-[699px]:hidden",
            )}
            aria-hidden="true"
          >
            <span>#</span>
            <span>{tr("Type")}</span>
            <span>{tr("Insight")}</span>
            {allPages && <span>{tr("Page")}</span>}
            <span />
          </div>
          <div>
            {sorted.map((x, i) => (
              <details
                key={AUDIT_ITEMS.indexOf(x)}
                className={cn("group/irow border-b border-line", TYPE_VARS[x.t])}
                data-type={x.t}
                open={opened.has(x)}
                onToggle={(e) => toggleRow(x, e.currentTarget.open)}
              >
                <summary
                  className={cn(
                    ROW_GRID,
                    !allPages && ROW_GRID_ONE_PAGE,
                    "min-h-[52px] cursor-pointer list-none border-l-[3px] border-l-transparent px-3 py-[14px] [transition:background-color_0.15s] hover:bg-surface",
                    "focus-visible:-outline-offset-2 [&::-webkit-details-marker]:hidden",
                    "group-open/irow:border-l-[color:var(--type-color)] group-open/irow:bg-surface",
                    // Phones: number on the left, then type, title and page stacked, chevron on the right.
                    "max-[699px]:grid-cols-[30px_minmax(0,1fr)_16px] max-[699px]:items-start max-[699px]:gap-x-[10px] max-[699px]:gap-y-[6px]",
                  )}
                >
                  <span className="font-mono text-[12px] text-muted tabular-nums max-[699px]:col-start-1 max-[699px]:row-[1/span_3] max-[699px]:pt-[2px]">
                    {pad(i + 1)}
                  </span>
                  <span
                    className={cn(
                      TYPE_TAG,
                      "justify-self-start max-[699px]:col-start-2 max-[699px]:row-start-1",
                    )}
                  >
                    {tr(TYPE_LABEL[x.t])}
                  </span>
                  <span className="text-[16px] leading-[1.35] font-semibold max-[699px]:col-start-2 max-[699px]:row-start-2">
                    {x.title}
                  </span>
                  {allPages && (
                    <span className="text-[13.5px] text-muted max-[699px]:col-start-2 max-[699px]:row-start-3">
                      {tr(PAGE_LABEL[x.p])}
                    </span>
                  )}
                  <span
                    className={
                      "h-[10px] w-[10px] justify-self-end border-r-[1.5px] border-b-[1.5px] border-muted [transform:rotate(45deg)_translateY(-3px)] [transition:transform_0.2s] " +
                      "group-open/irow:[transform:rotate(225deg)_translateY(-3px)] max-[699px]:col-start-3 max-[699px]:row-[1/span_3] max-[699px]:self-center"
                    }
                  />
                </summary>
                <div
                  className={
                    "grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-8 gap-y-3 border-l-[3px] border-l-[color:var(--type-color)] bg-surface " +
                    "pt-1 pr-3 pb-5 pl-[calc(44px_+_var(--type-col,128px)_+_28px_+_15px)] max-[699px]:pb-[18px] max-[699px]:pl-[52px]"
                  }
                >
                  {x.issue ? (
                    <>
                      <p className={INSIGHT_P + " text-muted"}>
                        <span className={INSIGHT_K + " text-muted"}>{tr("Issue")}</span>
                        {x.issue}
                      </p>
                      <p className={INSIGHT_P}>
                        <span className={INSIGHT_K_FIX}>{tr("Fix")}</span>
                        {x.fix}
                      </p>
                    </>
                  ) : (
                    <p className={INSIGHT_P}>
                      <span className={INSIGHT_K_FIX}>
                        {tr(x.t === "idea" ? "Idea" : "Recommendation")}
                      </span>
                      {x.body}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PageSummary({
  name,
  summary,
  total,
  critical,
}: {
  name: string;
  summary: string;
  total: number;
  critical: number;
}) {
  const { tr, f } = useTr();
  const [lead, points] = splitSummary(summary);
  return (
    // Verdict first, then the specific problems as a scannable list.
    <article
      className={
        "glass-blur grid grid-cols-[minmax(180px,240px)_minmax(0,1fr)] gap-x-[clamp(24px,4vw,56px)] gap-y-5 rounded-card border border-glass-edge bg-surface p-[clamp(18px,2.4vw,28px)] shadow-glass " +
        "max-[799px]:grid-cols-[minmax(0,1fr)]"
      }
    >
      <header className="flex flex-col gap-2 self-start">
        <span className={label()}>{tr("Page summary")}</span>
        <h3 className="case-heading text-[clamp(28px,3vw,38px)] leading-none">{name}</h3>
        <span className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] text-muted">
          <span>
            <b className="font-semibold text-ink">{total}</b> {f.insights}
          </span>
          <span className="text-fix">
            <b className="font-semibold text-fix-ink">{critical}</b> {f.critical}
          </span>
        </span>
      </header>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-[clamp(18px,1.6vw,21px)] leading-[1.45] font-medium text-pretty">
          {lead}
        </p>
        <p className={label({ class: "pt-1" })}>{tr("What the audit found")}</p>
        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-7 gap-y-0 border-t border-line p-0">
          {points.map((p) => (
            <li
              key={p}
              className={
                "relative border-b border-line py-[11px] pr-0 pl-5 text-[15px] leading-[1.55] text-pretty text-muted " +
                "before:absolute before:top-[19px] before:left-[2px] before:h-[2px] before:w-2 before:bg-accent"
              }
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
