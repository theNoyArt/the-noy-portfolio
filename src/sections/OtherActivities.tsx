import { Fragment, type MouseEvent, type ReactNode } from "react";
import { useApp } from "../app/AppContext";
import { ACTIVITIES, ACTIVITIES_DESC, HOBBIES } from "../content/activities";
import type { Activity } from "../content/types";
import { cn } from "../lib/cn";
import { useI18n } from "../lib/i18n";
import { monoLabel, section, sectionDesc, sectionHead, sectionTitle } from "../styles/recipes";

/* Each hobby group's colour (--hc): icon, its glow and the list separators. */
const HOBBY_COLOR: Record<"make" | "mind" | "road", string> = {
  make: "[--hc:var(--accent)]",
  mind: "[--hc:var(--accent2)]",
  road: "[--hc:#e8b931]",
};

/** A compact row of side activities: short text, topic chips and links. No images. */
export function OtherActivities() {
  const { t, L } = useI18n();
  const app = useApp();
  if (!ACTIVITIES.length) return null;

  return (
    <section id="s-other" data-nav-section className={section()}>
      <div className={sectionHead()}>
        <span className={monoLabel({ head: true })}>{t.otherLabel}</span>
        <h2 className={sectionTitle()}>{t.otherTitle}</h2>
        <p className={sectionDesc()}>{L(ACTIVITIES_DESC)}</p>
      </div>
      <div className={cn("grid grid-cols-3 items-stretch gap-4", app.narrow && "grid-cols-[minmax(0,1fr)] gap-3")}>
        {ACTIVITIES.map((a, i) => (
          <Card key={a.id} a={a} n={i + 1} />
        ))}
        <div className="col-span-full mt-[18px] flex flex-col gap-[18px]">
          <span
            className={
              "flex items-center gap-[14px] font-mono text-[11px] tracking-[0.08em] text-muted uppercase " +
              "after:h-px after:flex-1 after:bg-line"
            }
          >
            {t.hobbiesLabel}
          </span>
          <div className={cn("grid grid-cols-3 gap-4", app.narrow && "grid-cols-[minmax(0,1fr)] gap-[18px]")}>
            {HOBBIES.map((g) => (
              <div key={g.id} className={cn("grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3 p-0", HOBBY_COLOR[g.id])}>
                <span className="grid h-[21px] w-[22px] place-items-center text-[var(--hc)]" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    className={
                      "h-5 w-5 fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round] " +
                      "[filter:drop-shadow(0_0_6px_color-mix(in_srgb,var(--hc)_55%,transparent))]"
                    }
                  >
                    {HOBBY_ICONS[g.id]}
                  </svg>
                </span>
                <div>
                  <h4 className="display mt-0 mb-1 text-[17px] leading-[21px]">{L(g.label)}</h4>
                  <p className="m-0 text-[14px] leading-[1.65] text-muted">
                    {g.items.map((h, i) => (
                      <Fragment key={h.en}>
                        <span className="whitespace-nowrap">
                          {L(h)}
                          {i < g.items.length - 1 && (
                            <span className="text-[color-mix(in_srgb,var(--hc)_70%,transparent)]" aria-hidden="true">
                              {" /"}
                            </span>
                          )}
                        </span>
                        {i < g.items.length - 1 && " "}
                      </Fragment>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const HOBBY_ICONS: Record<"make" | "mind" | "road", ReactNode> = {
  make: (
    <>
      <path d="m14.5 4.5 5 5L9 20H4v-5z" />
      <path d="m12.5 6.5 5 5" />
    </>
  ),
  mind: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z" />
    </>
  ),
  road: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
};

function Card({ a, n }: { a: Activity; n: number }) {
  const { L } = useI18n();
  const app = useApp();
  const mono = "font-mono text-[11px] whitespace-nowrap text-muted";
  return (
    <article
      className={
        "flex flex-col gap-3 rounded-card-sm border border-line bg-surface px-[22px] pt-[22px] pb-5 " +
        "cyber:rounded-none cyber:bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] " +
        "glass:glass-blur glass:rounded-[20px] glass:border-glass-edge glass:bg-[rgba(255,255,255,0.5)] glass:shadow-glass"
      }
    >
      <header className="flex items-baseline gap-[10px] font-mono text-[11px] tracking-[0.06em] text-muted uppercase">
        <span className="text-accent">0{n}</span>
        <span>{L(a.meta)}</span>
      </header>
      <h3 className="display m-0 text-[clamp(22px,1.9cqi,28px)] leading-[1.1]">{L(a.title)}</h3>
      <p className="m-0 text-[14.5px] leading-[1.55] text-muted">{L(a.desc)}</p>

      {a.stats && (
        <div className="flex gap-[22px]">
          {a.stats.map((st, i) => (
            <span key={st.l.en} className="flex items-baseline gap-[7px]">
              <span className={cn("display text-[28px] leading-none", i === 0 ? "text-accent" : "text-muted")}>{st.v}</span>
              <span className="font-mono text-[11px] tracking-[0.04em] text-muted uppercase">{L(st.l)}</span>
            </span>
          ))}
        </div>
      )}

      {a.events && (
        <ul className="m-0 list-none border-t border-line p-0">
          {a.events.map((e) => {
            const cls =
              "grid grid-cols-[68px_minmax(0,1fr)_auto] items-baseline gap-[10px] border-b border-line py-2 text-[13.5px] text-ink";
            const body = (
              <>
                <span className={mono}>{e.year}</span>
                <span className="min-w-0">{e.title}</span>
                <span className={mono}>
                  {L(e.kind)}
                  {e.url && <span aria-hidden="true"> ↗</span>}
                </span>
              </>
            );
            return (
              <li key={e.title}>
                {e.url ? (
                  <a className={cn(cls, "hover:text-accent")} href={e.url} target="_blank" rel="noopener noreferrer">
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* With no links below (the workshops card), the chips sit at the bottom like the others. */}
      <ul className={cn("m-0 flex list-none flex-wrap gap-[6px] p-0", a.links.length === 0 && "mt-auto")}>
        {a.topics.map((tp) => (
          <li
            key={tp.en}
            className={
              "rounded-full border border-line2 px-[10px] py-1 text-[12px] text-ink cyber:rounded-none " +
              "glass:border-[rgba(110,80,220,0.22)] glass:bg-[rgba(122,92,240,0.07)]"
            }
          >
            {L(tp)}
          </li>
        ))}
      </ul>

      {a.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-[6px] border-t border-line pt-3">
          {a.links.map((l) => {
            const caseId = l.url.startsWith("#/case/") ? l.url.slice("#/case/".length) : null;
            return (
              <a
                key={l.url}
                className="inline-flex gap-[5px] font-mono text-[12px] text-ink hover:text-accent"
                href={l.url}
                {...(caseId
                  ? {
                      onClick: (ev: MouseEvent) => {
                        ev.preventDefault();
                        app.openCase(caseId);
                      },
                    }
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                {L(l.label)}
                <span aria-hidden="true" className="text-accent">
                  {caseId ? "→" : "↗"}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
}
