import {
  DECISION_KEYS,
  DT_BEFORE_AFTER,
  DT_DECISIONS,
  type BeforeAfterSide,
} from "../../content/dtrpg/decisions";
import { DT_IMG } from "../../content/dtrpg/project";
import { cn } from "../../lib/cn";
import { bodyMuted, label, sec, secTitle, twoCol } from "./case-ui";
import { useTr } from "./tr";
import { pad, useLightbox } from "./ui";

const card =
  "glass-blur flex flex-col gap-4 rounded-card border border-glass-edge bg-surface p-[clamp(18px,2vw,26px)] shadow-glass";

/** Key decisions with their trade-offs, then four before/after pairs. */
export function Decisions() {
  const { tr } = useTr();
  return (
    <section className={sec()} id="c-decisions" data-nav-section>
      <span className={label({ tone: "accent", star: true })}>
        {tr("[06] Decisions and changes")}
      </span>
      <div className={twoCol({ end: true })}>
        <h2 className={secTitle}>{tr("Key decisions and trade-offs")}</h2>
        <p className={bodyMuted()}>
          {tr(
            "Each one started from an audit finding. Here’s what I considered, what I chose, and what it costs.",
          )}
        </p>
      </div>
      <ol className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4 p-0">
        {DT_DECISIONS.map((d, i) => (
          <li key={d.t} className={card}>
            <h3 className="flex items-baseline gap-3 text-[19px] leading-[1.25] font-semibold text-balance">
              <span className="font-mono text-[12px] font-medium text-accent">{pad(i + 1)}</span>
              {tr(d.t)}
            </h3>
            <ul className="flex list-none flex-col border-t border-line p-0">
              {DECISION_KEYS.map(([k, name]) => (
                <li
                  key={k}
                  className="border-b border-line py-[10px] text-[14.5px] leading-[1.55] text-pretty last:border-b-0 last:pb-0"
                >
                  <b className="font-semibold">{tr(name)}:</b>{" "}
                  <span className="text-muted">{tr(d[k])}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-3 pt-[clamp(24px,3vw,40px)]">
        <h3 className="case-heading text-[clamp(22px,2vw,30px)] leading-[1.1] text-balance">
          {tr("Before and after: 4 key changes")}
        </h3>
        <p className={bodyMuted()}>
          {tr(
            "Before: the live site, from the audit. After: the redesign, in the mockups and the working app.",
          )}
        </p>
      </div>
      <div className="flex flex-col gap-[clamp(32px,4vw,56px)]">
        {DT_BEFORE_AFTER.map((x) => (
          <div key={x.t} className="flex flex-col gap-4 border-t border-line-2 pt-5">
            <h4 className="text-[18px] font-semibold">{tr(x.t)}</h4>
            <div className="grid grid-cols-2 items-start gap-[clamp(16px,2.4vw,32px)] max-[699px]:grid-cols-[minmax(0,1fr)] narrow:grid-cols-[minmax(0,1fr)]">
              <Side kind="Before" side={x.before} />
              <Side kind="After" side={x.after} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** One half of a pair: the changed area of the screenshot in a fixed frame; click opens it in full. */
function Side({ kind, side }: { kind: "Before" | "After"; side: BeforeAfterSide }) {
  const { tr } = useTr();
  const lightbox = useLightbox();
  const src = `${DT_IMG}/${side.dir}${side.img.name}.webp`;
  const alt = tr(side.alt);
  const after = kind === "After";
  const { zoom, tx = "0", ty = "0" } = side.crop;
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <button
        type="button"
        className={cn(
          "group/shot glass-blur relative block aspect-[392/243] w-full cursor-zoom-in overflow-hidden rounded-card border border-line-2 p-0 shadow-glass",
          "[transition:border-color_0.2s] hover:border-accent",
          after ? "bg-[#0f0f12]" : "bg-white",
        )}
        onClick={() => lightbox(src, alt)}
      >
        {/* The hover zoom sits on a wrapper so it doesn't override the crop's transform. */}
        <span className="absolute inset-0 [transition:transform_0.4s] group-hover/shot:scale-[1.015] motion-reduce:transition-none">
          <img
            className="absolute top-0 left-0 h-auto max-w-none"
            style={{ width: `calc(${zoom} * 100%)`, transform: `translate(${tx}, ${ty})` }}
            src={src}
            alt={alt}
            width={side.img.w}
            height={side.img.h}
            loading="lazy"
            decoding="async"
          />
        </span>
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full border px-[10px] py-[3px] font-mono text-[11px] tracking-[0.1em] uppercase",
            after
              ? "border-accent bg-accent text-accent-ink"
              : "border-line-2 bg-bg text-ink glass:bg-white",
          )}
        >
          {tr(kind)}
        </span>
        <span
          className="absolute right-3 bottom-3 rounded-full border border-line-2 bg-bg px-[9px] py-[3px] font-mono text-[11px] text-ink opacity-0 [transition:opacity_0.2s] group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100"
          aria-hidden="true"
        >
          {tr("Enlarge ⤢")}
        </span>
      </button>
      <figcaption className="text-[14.5px] leading-[1.55] text-pretty text-muted">
        {tr(side.cap)}
      </figcaption>
    </figure>
  );
}
