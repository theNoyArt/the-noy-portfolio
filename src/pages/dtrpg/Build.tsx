import { DT_API, DT_FLOW, DT_FRONTEND, DT_LINKS, type DtIcon } from "../../content/dtrpg/project";
import { cn } from "../../lib/cn";
import { bodyMuted, btnRow, caseBtn, label, sec, secTitle, twoCol } from "./case-ui";
import { Icon } from "./icons";
import { useTr } from "./tr";
import { Band, Ext, pad } from "./ui";

/** Build track: front end and mock API, on its own zone (dark band in Cyber, cool blue glass in Glass light). */
export function Build() {
  const { tr } = useTr();
  return (
    <div
      className={
        "border-t border-line-2 bg-dev-bg text-dev-ink " +
        "glass:border-t-[rgba(47,95,216,0.18)] glass:[background:radial-gradient(55%_40%_at_95%_6%,rgba(80,140,255,0.20),transparent_70%),radial-gradient(45%_35%_at_5%_55%,rgba(110,120,255,0.14),transparent_70%),linear-gradient(180deg,rgba(222,233,255,0.85)_0%,rgba(226,236,255,0.7)_75%,rgba(226,236,255,0)_100%)]"
      }
    >
      <Band label={tr("Build track")} nums="06 — 07" dev />

      <section className={sec({ dev: true })} id="c-stack" data-nav-section>
        <span className={label({ tone: "devAccent", star: true })}>{tr("[06] Front end")}</span>
        <div className={twoCol({ end: true })}>
          <h2 className={secTitle}>
            {tr("A typed React storefront, built, tested and linted with one toolchain.")}
          </h2>
          <div className="flex flex-col gap-5">
            <p className={bodyMuted({ dev: true })}>
              {tr(
                "The redesign is a front-end prototype built to look and behave like a real product, without needing a back end. The mock API is one small Node file serving generated JSON data and images, documented with OpenAPI and hosted for free, so the whole prototype can be shared by link and reset in seconds.",
              )}
            </p>
            <div className={btnRow}>
              <Ext className={caseBtn({ variant: "devPrimary" })} href={DT_LINKS.demo}>
                {tr("Open the demo app ↗")}
              </Ext>
              <Ext className={caseBtn({ variant: "devOutline" })} href={DT_LINKS.github}>
                {tr("</> Source on GitHub ↗")}
              </Ext>
            </div>
          </div>
        </div>
        <TiList items={DT_FRONTEND} />
      </section>

      <section
        className={sec({
          dev: true,
          class: "border-t border-dev-line glass:border-t-[rgba(47,95,216,0.12)]",
        })}
        id="c-api"
        data-nav-section
      >
        <span className={label({ tone: "devAccent", star: true })}>{tr("[07] Mock API")}</span>
        <div className={twoCol({ end: true })}>
          <h2 className={secTitle}>
            {tr("Not a static prototype: a real storefront on a mock API.")}
          </h2>
          <div className="flex flex-col gap-5">
            <p className={bodyMuted({ dev: true })}>
              {tr(
                "One dependency-free Node file serves generated JSON and images under /api/v1, described by an OpenAPI contract and explorable in Swagger UI.",
              )}
            </p>
            <div className={btnRow}>
              <Ext className={caseBtn({ variant: "devPrimary" })} href={DT_LINKS.swagger}>
                {tr("Swagger UI ↗")}
              </Ext>
              <Ext className={caseBtn({ variant: "devOutline" })} href={DT_LINKS.openapi}>
                openapi.json ↗
              </Ext>
            </div>
          </div>
        </div>
        {/* Build flow: four steps from generated data to the React app. */}
        <ol
          className={
            "grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-px border border-dev-line bg-dev-line p-0 " +
            "glass:overflow-hidden glass:rounded-[18px] glass:border-white/90 glass:bg-[rgba(47,95,216,0.12)] " +
            "glass:shadow-[0_0_0_1px_rgba(47,95,216,0.08),0_12px_28px_-16px_rgba(47,95,216,0.4)]"
          }
          aria-label={tr("Mock API")}
        >
          {DT_FLOW.map((s, i) => (
            <li
              key={s.t}
              className={cn(
                "relative flex flex-col gap-[6px] bg-dev-bg px-5 pt-[18px] pb-5 glass:bg-white/62",
                "not-last:after:absolute not-last:after:top-4 not-last:after:right-3 not-last:after:font-mono not-last:after:text-[13px] not-last:after:text-dev-accent not-last:after:content-arrow",
                "max-[899px]:after:hidden",
              )}
            >
              <span className="font-mono text-[11px] text-dev-accent glass:text-[#2f5fd8] glass:[text-shadow:0_0_10px_rgba(47,95,216,0.35)]">
                {pad(i + 1)}
              </span>
              <b className="text-[17px] font-semibold">{tr(s.t)}</b>
              <span className="text-[14px] leading-[1.55] text-dev-muted">{tr(s.d)}</span>
            </li>
          ))}
        </ol>
        <TiList items={DT_API} />
      </section>
    </div>
  );
}

/** Stack list: icon, name and detail, two columns from 900px. */
function TiList({ items }: { items: { ic: DtIcon; t: string; d: string }[] }) {
  const { tr } = useTr();
  return (
    <ul className="grid list-none grid-cols-2 gap-x-[clamp(28px,4vw,56px)] gap-y-0 border-t border-dev-line p-0 max-[899px]:grid-cols-[minmax(0,1fr)]">
      {items.map((x) => (
        <li
          className="grid grid-cols-[24px_minmax(0,1fr)] gap-[14px] border-b border-dev-line py-[11px]"
          key={x.t}
        >
          <Icon
            name={x.ic}
            className="mt-px h-5 w-5 fill-none stroke-dev-accent stroke-[1.75] [stroke-linecap:round] [stroke-linejoin:round] glass:[filter:drop-shadow(0_0_4px_rgba(47,95,216,0.35))]"
          />
          <span>
            <b className="block text-[15px] font-semibold">{tr(x.t)}</b>
            <span className="mt-[2px] block text-[14px] leading-[1.55] text-pretty text-dev-muted">
              {tr(x.d)}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
