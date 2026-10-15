import { useRef, useState, type PointerEvent } from "react";
import { useApp } from "../../app/AppContext";
import { DT_FACTS, DT_IMG, DT_LINKS, DT_TECH } from "../../content/dtrpg/project";
import { cn, tv } from "../../lib/cn";
import {
  btnRow,
  caseBtn,
  caseKv,
  caseTitle,
  caseTitleDot,
  caseTitleSub,
  heroLens,
  label,
  lead,
  metaRow,
  sec,
} from "./case-ui";
import { useTr } from "./tr";
import { Ext } from "./ui";

/** Tech pills: purple for design tools, the build-track colour for front end; flat with a glow in Glass light. */
const tech = tv({
  base:
    "rounded-full border border-[color-mix(in_srgb,var(--tc)_40%,transparent)] bg-[color-mix(in_srgb,var(--tc)_12%,transparent)] px-[11px] py-1 text-[13px] leading-[1.4] font-medium text-ink " +
    "glass:border-[color-mix(in_srgb,var(--tc)_30%,transparent)] glass:bg-[color-mix(in_srgb,var(--tc)_9%,#ffffff)] glass:px-[13px] glass:py-[5px] glass:text-[#1d1a33] " +
    "glass:shadow-[0_0_12px_-3px_color-mix(in_srgb,var(--tc)_26%,transparent)] glass:[transition:box-shadow_0.2s] glass:hover:shadow-[0_0_16px_-1px_color-mix(in_srgb,var(--tc)_38%,transparent)] " +
    "glass:before:mr-2 glass:before:inline-block glass:before:h-[6px] glass:before:w-[6px] glass:before:rounded-full glass:before:bg-[var(--tc)] glass:before:align-[2px] " +
    "glass:before:shadow-[0_0_5px_1px_color-mix(in_srgb,var(--tc)_55%,transparent)]",
  variants: {
    kind: {
      ui: "[--tc:var(--accent)] glass:[--tc:#7a5cf0]",
      fe: "[--tc:var(--accent-2)] glass:[--tc:#3b78f0]",
    },
  },
});

export function Overview() {
  const { tr } = useTr();
  const meta = metaRow();
  const kv = caseKv();
  return (
    <section className={sec({ first: true })} id="c-overview" data-nav-section>
      <div className={meta.root()}>
        <span className={meta.first()}>{tr("[01] Overview")}</span>
        <span>{tr("E-commerce · Marketplace redesign")}</span>
        <span>{tr("Self-initiated · 2026")}</span>
      </div>
      {/* Project text on one side, the before/after lens on the other. */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] items-stretch gap-x-[clamp(28px,4vw,56px)] gap-y-8 max-[999px]:grid-cols-[minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-7">
          <h1 className={cn(caseTitle, "text-[clamp(48px,5.6vw,96px)] leading-[0.9]")}>
            DriveThruRPG
            <br />
            <span className={caseTitleSub}>
              {tr("Redesign")}
              <span className={caseTitleDot}>.</span>
            </span>
          </h1>
          <div className="flex flex-col gap-[clamp(40px,4.5vw,64px)]">
            <div className="flex flex-col gap-6">
              <p className={lead}>
                {tr(
                  "A UX/UI audit and modernization of the biggest tabletop-RPG marketplace, rebuilt as a working React storefront on a mock API. Every screen of the redesign is clickable: browse, filter, cart, checkout, library.",
                )}
              </p>
              <div className={btnRow}>
                <Ext className={caseBtn({ variant: "primary" })} href={DT_LINKS.demo}>
                  {tr("Live demo ↗")}
                </Ext>
                <Ext className={caseBtn()} href={DT_LINKS.github}>
                  &lt;/&gt; GitHub ↗
                </Ext>
                <Ext className={caseBtn()} href={DT_LINKS.figma}>
                  Figma ↗
                </Ext>
              </div>
            </div>
            <div className="flex flex-col gap-[clamp(36px,3.5vw,48px)]">
              <dl className={kv.root()}>
                {DT_FACTS.map(([k, v]) => (
                  <div key={k} className={kv.row()}>
                    <dt className={kv.key()}>{tr(k)}</dt>
                    <dd>{tr(v)}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-[22px]">
                <TechRow name={tr("Design")} items={DT_TECH.design} kind="ui" />
                <TechRow name={tr("Front end")} items={DT_TECH.frontend} kind="fe" />
              </div>
            </div>
          </div>
        </div>
        <HeroLens />
      </div>
    </section>
  );
}

function TechRow({ name, items, kind }: { name: string; items: string[]; kind: "ui" | "fe" }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] items-baseline gap-3 max-[599px]:grid-cols-[minmax(0,1fr)] max-[599px]:gap-[6px]">
      <span className={label()}>{name}</span>
      <ul className="flex list-none flex-wrap gap-[6px] p-0">
        {items.map((x) => (
          <li key={x} className={tech({ kind })}>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The redesign in the page's theme, with the original site revealed inside a circle under the cursor. */
function HeroLens() {
  const { tr, f } = useTr();
  const { theme } = useApp();
  const dark = theme === "dark";
  const stage = useRef<HTMLDivElement>(null);
  const down = useRef<{ x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);
  const touchOnly = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const setLens = (x: number, y: number, r: number) => {
    const s = stage.current;
    if (!s) return;
    s.style.setProperty("--mx", x + "px");
    s.style.setProperty("--my", y + "px");
    s.style.setProperty("--r", r + "px");
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || open || !stage.current) return;
    const b = stage.current.getBoundingClientRect();
    setLens(e.clientX - b.left, e.clientY - b.top, Math.round(Math.min(b.width, b.height) * 0.3));
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || open) return;
    stage.current?.style.setProperty("--r", "0px");
  };
  // Touch: a tap opens the original from the tap point; another tap closes it.
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") down.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch" || !down.current || !stage.current) return;
    const moved = Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y);
    down.current = null;
    if (moved > 10) return;
    const b = stage.current.getBoundingClientRect();
    const next = !open;
    setOpen(next);
    setLens(
      e.clientX - b.left,
      e.clientY - b.top,
      next ? Math.ceil(Math.hypot(b.width, b.height)) : 0,
    );
  };

  const s = heroLens({ open });
  return (
    <figure
      className={s.root({ class: "min-h-0 min-[1000px]:relative" })}
      aria-label={tr("Redesigned home page compared with the original")}
    >
      <div
        ref={stage}
        className={s.stage({
          class:
            "aspect-auto min-h-[560px] flex-1 max-[999px]:aspect-[3/4] max-[999px]:min-h-0 max-[999px]:flex-none",
        })}
        role="img"
        aria-label={tr(
          "Redesigned home page. Move the cursor over it, or tap, to reveal the original site underneath.",
        )}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        <div
          className={s.layer()}
          style={{
            backgroundImage: `url("${DT_IMG}/hero/new-home-${dark ? "dark" : "light"}.webp")`,
          }}
        />
        <div
          className={cn(s.layer(), s.back())}
          style={{ backgroundImage: `url("${DT_IMG}/hero/old-home.webp")` }}
        />
        <span className={s.ring()} aria-hidden="true" />
        <span className={s.chip()} aria-hidden="true">
          {tr("Before · drivethrurpg.com")}
        </span>
      </div>
      {/* From 1000px the caption hangs below the frame, so the frame ends level with the text column. */}
      <figcaption
        className={s.cap({
          class: "min-[1000px]:absolute min-[1000px]:inset-x-0 min-[1000px]:top-[calc(100%_+_8px)]",
        })}
      >
        <span>{f.heroCap(dark)}</span>
        <span>
          {tr(touchOnly ? "Tap to compare with the original" : "Hover to see the original site")}
        </span>
      </figcaption>
    </figure>
  );
}
