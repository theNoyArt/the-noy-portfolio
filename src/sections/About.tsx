import { useEffect, useState, type CSSProperties } from "react";
import { tv } from "tailwind-variants";
import { useApp } from "../app/AppContext";
import { STAGE_SECTION } from "../app/sections";
import { ABOUT, ABOUT_TABS, ABOUT_WORKFLOW, ABOUT_WORKFLOW_DESC } from "../content/about";
import { SHOWCASE } from "../content/showcase";
import { cn } from "../lib/cn";
import { useI18n } from "../lib/i18n";
import { linkList, monoLabel, section, sectionHead, sectionTitle } from "../styles/recipes";

/** A stage tab: lifts on hover; the selected one is a solid block (Cyber: a neon panel, Glass: a lit glass tile). */
const stageTab = tv({
  slots: {
    root:
      "group flex cursor-pointer flex-col items-start gap-[6px] rounded-card-sm border-0 bg-surface px-[14px] pt-[14px] pb-4 text-left text-ink " +
      // Mobile: all four stages in one row, just the colour bar and the name.
      "narrow:gap-1 narrow:px-2 narrow:pt-[10px] narrow:pb-[10px] " +
      "[transition:background-color_0.35s,color_0.35s,box-shadow_0.35s,transform_0.35s_cubic-bezier(0.2,0.8,0.2,1)] " +
      "glass:glass-blur glass:border glass:border-glass-edge",
    /* The stage's colour bar; the selected one fills in with a light sweep. */
    bar:
      "relative mb-[6px] block h-1 w-full origin-left overflow-hidden rounded-[2px] opacity-35 [transition:opacity_0.4s] narrow:mb-1 narrow:h-[3px]",
    num: "font-mono text-[11px] opacity-70 narrow:hidden",
    cap: "text-[13px] opacity-75 narrow:hidden",
  },
  variants: {
    on: {
      false: {
        root: "hover:[transform:translateY(-3px)] motion-reduce:hover:[transform:none] glass:shadow-glass",
        bar: "group-hover:opacity-70",
      },
      true: {
        root:
          "bg-ink text-bg shadow-glow " +
          "cyber:bg-[color-mix(in_srgb,var(--accent)_16%,var(--surface))] cyber:text-ink " +
          "cyber:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_70%,transparent),0_0_26px_-6px_color-mix(in_srgb,var(--accent)_60%,transparent)] " +
          "glass:border-[color-mix(in_srgb,#7a5cf0_40%,#ffffff)] glass:bg-[color-mix(in_srgb,#7a5cf0_12%,#ffffff)] glass:text-ink " +
          "glass:shadow-[0_0_0_1px_rgba(122,92,240,0.18),0_0_22px_-4px_rgba(122,92,240,0.45)]",
        bar:
          "animate-about-bar-fill opacity-100 " +
          "after:absolute after:inset-0 after:animate-about-bar-sweep after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)] after:[transform:translateX(-100%)]",
        num: "cyber:text-muted",
        cap: "cyber:text-muted",
      },
    },
  },
});

/* Pills: tools on a stage (tinted with its colour) and the way of working (accent). */
const pill = tv({
  base:
    "rounded-full border border-line2 px-3 py-[6px] text-[14px] leading-[1.3] font-medium cyber:rounded-none " +
    "[transition:transform_0.25s_cubic-bezier(0.2,0.8,0.2,1),border-color_0.25s,box-shadow_0.25s] " +
    "hover:border-accent hover:[transform:translateY(-2px)] motion-reduce:hover:[transform:none] " +
    "cyber:hover:shadow-[0_6px_16px_-8px_color-mix(in_srgb,var(--accent)_60%,transparent)]",
  variants: {
    kind: {
      stage:
        "animate-about-pill border-[color-mix(in_srgb,var(--stage,var(--accent))_40%,transparent)] bg-[color-mix(in_srgb,var(--stage,var(--accent))_10%,transparent)] " +
        "glass:shadow-[0_0_10px_-3px_color-mix(in_srgb,var(--stage,var(--accent))_35%,transparent)]",
      // leading repeated: tailwind-merge drops an earlier leading-* when a later text size is merged in.
      workflow:
        "border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-4 py-[9px] text-[15px] leading-[1.3] font-semibold text-ink " +
        "glass:bg-[color-mix(in_srgb,#7a5cf0_10%,#ffffff)] glass:shadow-[0_0_12px_-3px_rgba(122,92,240,0.4)]",
    },
  },
});

const PILLS = "m-0 flex list-none flex-wrap gap-2 p-0";

export function About() {
  const { t, L } = useI18n();
  const app = useApp();
  const [tab, setTab] = useState(0);
  const cur = ABOUT_TABS[tab] ?? ABOUT_TABS[0];
  const last = Math.max(1, ABOUT_TABS.length - 1);
  const links = linkList();

  // The hero graphic opens a stage here: window.dispatchEvent(new CustomEvent("about:stage", { detail: "design" })).
  useEffect(() => {
    const on = (e: Event) => {
      const i = ABOUT_TABS.findIndex((x) => x.id === (e as CustomEvent<string>).detail);
      if (i >= 0) setTab(i);
    };
    window.addEventListener("about:stage", on);
    return () => window.removeEventListener("about:stage", on);
  }, []);

  return (
    <section id="s-about" data-nav-section className={cn(section(), "gap-[clamp(32px,4cqi,56px)]")}>
      <div className={sectionHead({ wide: true })}>
        <span className={monoLabel({ head: true })}>{t.aboutLabel}</span>
        <h2 data-reveal="0" className={sectionTitle()}>
          {L(ABOUT.title)}
        </h2>
        <p data-reveal="60" className="text-[18px] text-pretty">
          {L(ABOUT.p1)}
        </p>
        <p data-reveal="100" className="text-[16px] text-pretty text-muted">
          {L(ABOUT.p2)}
        </p>
      </div>

      <div data-reveal="0">
        <div role="tablist" aria-label={t.about} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-[3px] narrow:grid-cols-4">
          {ABOUT_TABS.map((g, i) => {
            const on = i === tab;
            const c = stageTab({ on });
            return (
              <button
                key={g.id}
                id={"tab-" + g.id}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="about-panel"
                tabIndex={on ? 0 : -1}
                className={c.root()}
                onClick={() => setTab(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const n =
                      (tab + (e.key === "ArrowRight" ? 1 : -1) + ABOUT_TABS.length) %
                      ABOUT_TABS.length;
                    setTab(n);
                    document.getElementById("tab-" + ABOUT_TABS[n].id)?.focus();
                  }
                }}
              >
                <span
                  className={c.bar()}
                  style={{
                    background: `color-mix(in oklab, var(--accent) ${Math.round((1 - i / last) * 100)}%, var(--accent2))`,
                  }}
                />
                <span className="flex w-full justify-between gap-2">
                  <span className="text-[16px] font-semibold narrow:text-[13px] narrow:whitespace-nowrap">{t[g.id]}</span>
                  <span className={c.num()}>0{i + 1}</span>
                </span>
                <span className={c.cap()}>{L(g.cap)}</span>
              </button>
            );
          })}
        </div>

        <div
          id="about-panel"
          role="tabpanel"
          aria-labelledby={"tab-" + cur.id}
          className={
            "grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[clamp(24px,4cqi,64px)] border-b border-line2 py-[clamp(24px,3cqi,40px)] glass:glass-blur narrow:gap-5 narrow:pt-4 narrow:pb-5"
          }
          style={
            {
              "--stage": `color-mix(in oklab, var(--accent) ${Math.round((1 - tab / last) * 100)}%, var(--accent2))`,
            } as CSSProperties
          }
        >
          <div className="flex animate-about-in flex-col gap-[22px] narrow:gap-3" key={"l-" + cur.id}>
            <p className="text-[clamp(19px,1.8cqi,23px)] leading-[1.4] text-pretty narrow:text-[16px] narrow:leading-[1.45]">{L(cur.desc)}</p>
            <div className="flex flex-col gap-2 narrow:gap-1">
              <span className={monoLabel()}>{t.seeIn}</span>
              <div className={links.root()}>
                {cur.links.map((id) => {
                  const p = SHOWCASE.find((s) => s.id === id);
                  if (!p) return null;
                  return (
                    <button
                      key={id}
                      type="button"
                      className={cn(links.row(), "px-0 narrow:py-2")}
                      onClick={() => app.openCase(id, STAGE_SECTION[cur.id])}
                    >
                      <span className={links.name()}>{p.name}</span>
                      <span className={links.meta()}>{L(p.type)}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex animate-about-in-late flex-col gap-[clamp(22px,2.4cqi,32px)] narrow:gap-4" key={"r-" + cur.id}>
            {cur.items.length > 0 && <ItemList label={t.methods} items={cur.items} />}
            {cur.tools.length > 0 && <ItemList
                label={cur.toolsLabel === "stack" ? t.techStack : t.tools}
                items={cur.tools}
                tools
              />}
          </div>
        </div>

        {/* Way of working: its own panel under the stages, since it applies to all of them. */}
        <div
          className={
            "mt-[clamp(20px,2.4cqi,32px)] grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-center gap-x-[clamp(24px,4cqi,64px)] gap-y-4 rounded-card border border-line2 p-[clamp(20px,2.4cqi,28px)] " +
            "[background:linear-gradient(110deg,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_55%),var(--surface)] narrow:grid-cols-[minmax(0,1fr)] " +
            "cyber:shadow-[inset_3px_0_0_var(--accent)] " +
            "glass:glass-blur glass:border-glass-edge glass:shadow-glass glass:[background:linear-gradient(110deg,rgba(122,92,240,0.12),transparent_60%),rgba(255,255,255,0.55)]"
          }
          data-reveal="60"
        >
          <div className="flex flex-col gap-[6px]">
            <span className="display text-[calc(clamp(24px,2.2cqi,32px)*var(--h1-scale,1))] leading-[1.1]">{t.workflow}</span>
            <span className="text-[15px] text-muted">{L(ABOUT_WORKFLOW_DESC)}</span>
          </div>
          <ul className={cn(PILLS, "justify-end gap-[10px] narrow:justify-start")}>
            {ABOUT_WORKFLOW.map((w, i) => (
              <li key={w} className={pill({ kind: "workflow" })} style={{ "--i": i } as CSSProperties}>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Methods as an even list; tools as compact pills. */
function ItemList({ label, items, tools }: { label: string; items: string[]; tools?: boolean }) {
  return (
    <div className="flex flex-col gap-[10px] narrow:gap-2">
      <div className="flex items-baseline justify-between border-b border-line2 pb-2 narrow:pb-[6px]">
        <span className={monoLabel()}>{label}</span>
        <span className={cn(monoLabel(), "text-[color:var(--stage,var(--accent))]")}>{String(items.length).padStart(2, "0")}</span>
      </div>
      {tools ? (
        <ul className={cn(PILLS, "pt-1 narrow:gap-[6px] narrow:pt-0")}>
          {items.map((it, i) => (
            <li
              key={it}
              className={cn(pill({ kind: "stage" }), "narrow:px-[9px] narrow:py-[3px] narrow:text-[13px]")}
              style={{ "--i": i } as CSSProperties}
            >
              {it}
            </li>
          ))}
        </ul>
      ) : (
        // Methods as an even two-column list, so each stage reads as a set of skills, not a sentence.
        <ul
          className={
            "m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,210px),1fr))] gap-x-[clamp(16px,2.4cqi,32px)] p-0 " +
            "narrow:grid-cols-[repeat(2,minmax(0,1fr))] narrow:gap-x-4"
          }
        >
          {items.map((it, i) => (
            <li
              key={it}
              className={
                "group flex min-w-0 animate-about-item items-start gap-3 border-b border-line py-3 text-[clamp(16px,1.3cqi,18px)] leading-[1.3] font-medium " +
                "narrow:gap-2 narrow:py-[6px] narrow:text-[14px]"
              }
              style={{ "--i": i } as CSSProperties}
            >
              <span
                className={
                  "mt-[0.45em] h-[7px] w-[7px] flex-none rounded-full bg-[var(--stage,var(--accent))] shadow-[0_0_8px_color-mix(in_srgb,var(--stage,var(--accent))_55%,transparent)] " +
                  "[transition:transform_0.25s] group-hover:[transform:scale(1.6)] cyber:rounded-none"
                }
                aria-hidden="true"
              />
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
