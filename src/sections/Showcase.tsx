import { useApp } from "../app/AppContext";
import { SHOWCASE, SHOWCASE_DESC, SHOWCASE_UPCOMING } from "../content/showcase";
import { useI18n } from "../lib/i18n";
import { coverFor, imageBg, stripes } from "../lib/visual";
import { Creature } from "../pages/tamagotchi/Creature";
import { cn, tv } from "../lib/cn";
import {
  chip,
  monoLabel,
  section,
  sectionDesc,
  sectionHead,
  sectionTitle,
} from "../styles/recipes";

const card = tv({
  slots: {
    root:
      "group flex h-full flex-col rounded-[calc(var(--radius)+4px)] border border-line bg-surface p-[10px] text-inherit " +
      "[transition:transform_0.4s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.4s,border-color_0.3s] " +
      "glass:glass-blur glass:border-glass-edge glass:shadow-glass",
    cover: "relative aspect-[4/3] overflow-hidden rounded-card",
    title:
      "display text-[calc(clamp(24px,2.2cqi,32px)*var(--h1-scale,1))] leading-none [transition:color_0.3s] group-hover:text-accent",
  },
  variants: {
    /* A project to open, or an upcoming one ("coming soon"). */
    kind: {
      link: {
        // In Glass light the hover keeps the glass shadow and only brightens the edge.
        root:
          "hover:[transform:translateY(var(--card-lift))] focus-visible:[transform:translateY(var(--card-lift))] " +
          "cyber:hover:border-accent cyber:hover:shadow-card-hover cyber:focus-visible:border-accent cyber:focus-visible:shadow-card-hover " +
          "glass:hover:border-[rgba(255,255,255,0.95)] glass:focus-visible:border-[rgba(255,255,255,0.95)]",
      },
      soon: {
        root: "border-dashed cyber:border-line2 glass:hover:border-[rgba(255,255,255,0.95)]",
      },
    },
    big: {
      true: {
        cover: "aspect-[16/8.2]",
        // leading repeated: tailwind-merge drops the base leading-* when the text size is merged.
        title: "text-[calc(clamp(30px,3.2cqi,48px)*var(--h1-scale,1))] leading-none",
      },
    },
    /* Upcoming project that hasn't started: greyed out and inert. */
    muted: { true: { root: "pointer-events-none opacity-55 grayscale" } },
  },
  defaultVariants: { kind: "link" },
});

/* Placeholder cover for work in progress: a soft glow over stripes. */
const COVER_SOON =
  "grid place-items-center bg-[radial-gradient(60%_60%_at_50%_45%,var(--accent-soft),transparent_70%),repeating-linear-gradient(90deg,var(--ph-a)_0_3px,var(--ph-b)_3px_9px)]";

/* In-progress project with its own page: its mascot instead of a cover image. */
const MASCOT =
  "relative m-auto w-[42%] max-w-[180px] [transition:transform_0.4s_cubic-bezier(0.3,1.4,0.5,1)] group-hover:[transform:scale(1.08)_rotate(-3deg)]";

const TYPE = "absolute top-3 left-3";
const BODY = "flex flex-1 flex-col gap-2 px-1 pt-4 pb-1";
const SHORT = "text-[15px] text-pretty text-muted";
/* Tech line and "Open project" sit at the bottom of every card. */
const FOOT = "mt-auto flex flex-wrap items-baseline justify-between gap-2 pt-[6px]";
const TECH = "font-mono text-[11px] text-muted";

export function Showcase() {
  const { t, L } = useI18n();
  const app = useApp();

  return (
    <section id="s-showcase" data-nav-section className={section()}>
      <div className={sectionHead()}>
        <span className={monoLabel({ head: true })}>{t.showLabel}</span>
        <h2 className={sectionTitle()}>{t.showTitle}</h2>
        <p className={sectionDesc()}>{L(SHOWCASE_DESC)}</p>
      </div>
      <div
        className={cn(
          "grid grid-cols-3 gap-[clamp(14px,1.6cqi,24px)]",
          app.narrow && "grid-cols-1",
        )}
      >
        {SHOWCASE.map((x, i) => {
          const big = i === 0 && !app.narrow;
          const cover = coverFor(x.images, app.theme);
          const c = card({ big });
          return (
            <div key={x.id} data-reveal={(i % 3) * 80} className={big ? "col-span-2" : undefined}>
              <a
                href={`#/case/${x.id}`}
                className={c.root()}
                onClick={(e) => {
                  e.preventDefault();
                  app.openCase(x.id);
                }}
              >
                <div className={cn(c.cover(), x.inProgress && !cover && COVER_SOON)}>
                  {x.inProgress && !cover ? (
                    x.page === "tamagotchi" ? (
                      <>
                        <Creature className={MASCOT} />
                        <span className="absolute right-0 bottom-3 left-0 text-center font-mono text-[10.5px] text-muted">
                          {t.mascotPh}
                        </span>
                      </>
                    ) : (
                      <svg
                        className={
                          "w-[30%] max-w-[110px] fill-none stroke-accent stroke-[1.4] opacity-80 [stroke-linecap:round] [stroke-linejoin:round] " +
                          "[filter:drop-shadow(0_0_14px_color-mix(in_srgb,var(--accent)_60%,transparent))] [transition:transform_0.4s_cubic-bezier(0.3,1.4,0.5,1)] " +
                          "group-hover:[transform:rotate(-8deg)_scale(1.06)]"
                        }
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        {x.page === "portfolio" ? (
                          <>
                            <rect x="2.5" y="4" width="19" height="15" rx="2" />
                            <path d="M2.5 8.5h19M9.5 12l-2.5 2.5 2.5 2.5M14.5 12l2.5 2.5-2.5 2.5" />
                          </>
                        ) : (
                          <>
                            <path d="m14.5 4.5 5 5L9 20H4v-5z" />
                            <path d="m12.5 6.5 5 5" />
                          </>
                        )}
                      </svg>
                    )
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 [transition:transform_0.8s_cubic-bezier(0.2,0.7,0.2,1),filter_0.4s] group-hover:[filter:var(--cover-filter-hover)] group-hover:[transform:scale(1.06)]",
                        // The portfolio cover is a tall page screenshot: show its top.
                        x.id === "portfolio" && "bg-top!",
                      )}
                      style={imageBg(cover, stripes(x.hue, app.theme))}
                    />
                  )}
                  <span className={cn(chip(), TYPE)}>
                    {x.inProgress ? t.inProgress : L(x.type)}
                  </span>
                  <span className="absolute top-3 right-3 font-mono text-[11px]">{x.year}</span>
                  {!cover && !x.inProgress && (
                    <span className="absolute bottom-3 left-[14px] font-mono text-[10.5px] text-muted">
                      {x.name} · {t.coverPh}
                    </span>
                  )}
                </div>
                <div className={BODY}>
                  {x.stage && (
                    // Project stage on in-progress cards.
                    <span
                      className={
                        "mb-1 flex flex-wrap items-center gap-x-[10px] gap-y-[6px] self-stretch rounded-full border border-[color-mix(in_srgb,var(--accent)_50%,transparent)] " +
                        "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] py-[5px] pr-3 pl-[10px] cyber:rounded-none"
                      }
                    >
                      <span
                        className="h-2 w-2 animate-show-stage-ping rounded-full bg-accent shadow-[0_0_0_0_color-mix(in_srgb,var(--accent)_50%,transparent)] cyber:rounded-none"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] tracking-[0.08em] text-accent uppercase">
                        {t.stageLabel}
                      </span>
                      <span className="text-[13px] font-bold text-ink">{L(x.stage.label)}</span>
                      <span className="ml-auto inline-flex gap-[3px]" aria-hidden="true">
                        {Array.from({ length: x.stage.steps }, (_, i) => (
                          <i
                            key={i}
                            className={cn(
                              "h-1 w-[14px] rounded-[2px] bg-line2 cyber:rounded-none",
                              i < x.stage!.step && "bg-accent",
                            )}
                          />
                        ))}
                      </span>
                    </span>
                  )}
                  <span className={c.title()}>{x.name}</span>
                  <span className={SHORT}>{L(x.short)}</span>
                  <div className={FOOT}>
                    <span className={TECH}>{x.tech.join(" · ")}</span>
                    <span className="text-[14px] font-medium text-accent">{t.open}</span>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
        {SHOWCASE_UPCOMING.map((x, i) => {
          const soon = card({ kind: "soon", muted: x.muted });
          return (
            <div key={i} data-reveal={((SHOWCASE.length + i) % 3) * 80}>
              <div className={soon.root()} aria-disabled={x.muted || undefined}>
                <div className={cn(soon.cover(), COVER_SOON)}>
                  <span
                    className="font-mono text-[clamp(40px,5cqi,72px)] text-accent opacity-55 [text-shadow:var(--glow)]"
                    aria-hidden="true"
                  >
                    {"</>"}
                  </span>
                  <span className={cn(chip(), TYPE)}>{t.inProgress}</span>
                </div>
                <div className={BODY}>
                  <span className={soon.title()}>{L(x.title)}</span>
                  <span className={SHORT}>{L(x.desc)}</span>
                  <div className={FOOT}>
                    <span className={TECH}>{L(x.meta)}</span>
                    <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
                      {t.comingSoon}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
