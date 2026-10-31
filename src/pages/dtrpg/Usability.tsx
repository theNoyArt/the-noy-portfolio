import type { CSSProperties } from "react";
import { useApp } from "../../app/AppContext";
import { DS_THEMES } from "../../content/dtrpg/designSystem";
import { DT_LINKS } from "../../content/dtrpg/project";
import {
  UT_CHANGES,
  UT_INTRO,
  UT_ISSUES,
  UT_LIMITS,
  UT_METRICS,
  UT_PARTICIPANTS,
  UT_SUS,
  UT_TASKS,
  UT_TASKS_NOTE,
  susAverage,
} from "../../content/dtrpg/usability";
import { cn } from "../../lib/cn";
import { bodyMuted, label, lead, sec, secHead, secLink } from "./case-ui";
import { useTr } from "./tr";
import { Ext } from "./ui";

const sub = "text-[19px] leading-[1.25] font-semibold";
const card =
  "glass-blur flex flex-col gap-4 rounded-card border border-glass-edge bg-surface p-[clamp(18px,2vw,26px)] shadow-glass";
/** Live site in a muted tone, the prototype in the client's brand red (--brand, set on the section). */
const LIVE = "bg-[color-mix(in_srgb,var(--muted)_60%,transparent)]";
const PROTO = "bg-[color:var(--brand)]";

export function Usability() {
  const { tr, f } = useTr();
  const { theme } = useApp();
  const brand = { "--brand": DS_THEMES[theme].tokens.primary } as CSSProperties;
  const withUnit = (n: number, unit?: "s" | "%") =>
    f.num(n) + (unit === "s" ? " s" : unit === "%" ? "%" : "");
  const max = Math.max(...UT_TASKS.flatMap((x) => [x.live, x.proto]));

  return (
    <section className={sec()} id="c-usability" data-nav-section style={brand}>
      <div className={secHead}>
        <span className={label({ tone: "accent", star: true })}>{tr("[07] Usability test")}</span>
        <Ext className={secLink} href={DT_LINKS.usability}>
          {tr("Full usability test in Figma ↗")}
        </Ext>
      </div>
      <p className={lead}>{tr(UT_INTRO)}</p>

      {/* Headline numbers: live site → prototype. */}
      <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] border-t border-l border-t-line-2 border-l-line p-0">
        {UT_METRICS.map((m) => {
          const live = withUnit(m.live, m.unit);
          const proto = withUnit(m.proto, m.unit);
          return (
            <li
              key={m.l}
              className="flex flex-col gap-2 border-r border-b border-line px-[18px] py-4"
            >
              <span className={label()}>{tr(m.l)}</span>
              <span className="flex flex-wrap items-baseline gap-x-2" aria-hidden="true">
                <span className="text-[18px] text-muted tabular-nums">{live}</span>
                <span className="text-muted">→</span>
                <b className="display text-[34px] leading-none font-semibold tabular-nums">
                  {proto}
                </b>
              </span>
              <span className="sr-only">{f.versus(live, proto)}</span>
              <span className="text-[13.5px] text-muted">{tr(m.note)}</span>
            </li>
          );
        })}
      </ul>

      {/* Median time per task: plain bars, every value also as text. */}
      <figure className={card}>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
          <span className={sub}>{tr("Median time per task")}</span>
          <span
            className="flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-muted"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-2">
              <span className={cn("h-3 w-3 rounded-[3px]", LIVE)} />
              {tr("Live site")}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className={cn("h-3 w-3 rounded-[3px]", PROTO)} />
              {tr("Prototype")}
            </span>
          </span>
        </figcaption>
        <ol className="flex list-none flex-col gap-4 p-0">
          {UT_TASKS.map((x, i) => (
            <li
              key={x.t}
              className="grid grid-cols-[minmax(120px,170px)_minmax(0,1fr)] items-center gap-x-4 gap-y-2 max-[599px]:grid-cols-[minmax(0,1fr)] narrow:grid-cols-[minmax(0,1fr)]"
            >
              <span className="text-[14.5px] font-medium">
                {i + 1}. {tr(x.t)}
              </span>
              <span className="flex flex-col gap-[6px]">
                {(
                  [
                    ["Live site", x.live, LIVE],
                    ["Prototype", x.proto, PROTO],
                  ] as const
                ).map(([name, v, color]) => (
                  <span key={name} className="flex items-center gap-2">
                    <span
                      className={cn("h-[14px] min-w-[3px] rounded-r-[3px]", color)}
                      style={{ width: `calc((100% - 64px) * ${v / max})` }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[12.5px] whitespace-nowrap tabular-nums">
                      <span className="sr-only">{tr(name)}: </span>
                      {withUnit(v, "s")}
                    </span>
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ol>
        <p className={bodyMuted({ class: "text-[14.5px]" })}>{tr(UT_TASKS_NOTE)}</p>
      </figure>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-4">
        <div className={card}>
          <h3 className={sub}>{tr("SUS per participant")}</h3>
          <table className="w-full border-collapse text-[14.5px] tabular-nums">
            <thead>
              <tr className="border-b border-line-2 text-left">
                <th scope="col" className={label({ class: "py-2 pr-3 font-normal" })}>
                  {tr("Participant")}
                </th>
                <th scope="col" className={label({ class: "py-2 pr-3 text-right font-normal" })}>
                  {tr("Live site")}
                </th>
                <th scope="col" className={label({ class: "py-2 text-right font-normal" })}>
                  {tr("Prototype")}
                </th>
              </tr>
            </thead>
            <tbody>
              {UT_SUS.map((r) => (
                <tr key={r.p} className="border-b border-line">
                  <th scope="row" className="py-2 pr-3 text-left font-normal">
                    {r.p}
                  </th>
                  <td className="py-2 pr-3 text-right text-muted">{f.num(r.live)}</td>
                  <td className="py-2 text-right">{f.num(r.proto)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold">
                <th scope="row" className="pt-3 pr-3 text-left">
                  {tr("Average")}
                </th>
                <td className="pt-3 pr-3 text-right">{f.num(susAverage("live"))}</td>
                <td className="pt-3 text-right">{f.num(susAverage("proto"))}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className={card}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className={sub}>{tr("Top issues")}</h3>
            <span className={label()}>{tr("Severity 0–4")}</span>
          </div>
          <ol className="flex list-none flex-col border-t border-line p-0">
            {UT_ISSUES.map((x) => (
              <li
                key={x.t}
                className="flex flex-col gap-2 border-b border-line py-3 last:border-b-0 last:pb-0"
              >
                <span className="text-[14.5px] leading-[1.45] text-pretty">{tr(x.t)}</span>
                <span className="flex flex-wrap gap-[6px] font-mono text-[11.5px]">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-px",
                      x.v === "prototype"
                        ? "border-accent text-accent"
                        : "border-line-2 text-muted",
                    )}
                  >
                    {tr(x.v === "live" ? "Live site" : "Prototype")}
                  </span>
                  <span className="rounded-full border border-line-2 px-2 py-px text-muted">
                    {f.ofN(x.n, UT_PARTICIPANTS)}
                  </span>
                  <span className="rounded-full border border-line-2 px-2 py-px text-muted">
                    {f.severity(x.sev)}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-4">
        <div className={cn(card, "border-l-[3px] border-l-accent")}>
          <h3 className={sub}>{tr("Changes after the test")}</h3>
          <p className="text-[15px] leading-[1.55] text-pretty">{tr(UT_CHANGES)}</p>
        </div>
        <div className={card}>
          <h3 className={sub}>{tr("Limitations")}</h3>
          <ul className="flex list-disc flex-col gap-[6px] pl-5 text-[14.5px] leading-[1.55] text-muted marker:text-accent">
            {UT_LIMITS.map((x) => (
              <li key={x}>{tr(x)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
