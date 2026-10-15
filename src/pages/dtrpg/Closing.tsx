import { useRef, type PointerEvent } from "react";
import { useApp } from "../../app/AppContext";
import { PERSON } from "../../content/person";
import { nextCase, type ResolvedCase } from "../../lib/cases";
import { useI18n } from "../../lib/i18n";
import { coverFor, imageBg, stripes } from "../../lib/visual";
import { label, sec } from "./case-ui";
import { Creature } from "../tamagotchi/Creature";
import { useTr } from "./tr";


/**
 * Next case study next to a contact card. With no other showcase project the card
 * leads back to the showcase instead.
 */
/** "Read the case study →": both parts nudge right on hover. */
const GO =
  "inline-block [transition:transform_0.25s] group-hover/next:[transform:translateX(6px)] motion-reduce:transition-none";

export function Closing({ c }: { c: ResolvedCase }) {
  const { tr, f } = useTr();
  const { t, L } = useI18n();
  const app = useApp();
  const media = useRef<HTMLSpanElement>(null);

  const n = nextCase(c);
  const next = n && n.id !== c.id ? n : null;

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    const m = media.current;
    if (e.pointerType === "touch" || !m) return;
    const b = m.getBoundingClientRect();
    m.style.setProperty("--mx", e.clientX - b.left + "px");
    m.style.setProperty("--my", e.clientY - b.top + "px");
    m.style.setProperty("--r", Math.round(Math.min(b.width, b.height) * 0.32) + "px");
  };

  const go = () => (next ? app.openCase(next.id) : app.goSection("showcase"));
  const cover = next ? coverFor(next.images, app.theme) : null;
  // Bond has no cover image yet: show its mascot, as on the home showcase card.
  const mascot = !!next && !cover && next.page === "tamagotchi";

  return (
    <section
      className={sec({
        class:
          "grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-stretch gap-4 pb-[clamp(32px,4vw,56px)] max-[1099px]:grid-cols-[minmax(0,1fr)]",
      })}
      aria-label={tr("More work")}
    >
      {/* Next case study: text on one side, a cover with the same lens reveal as the hero on the other. */}
      <a
        className={
          "group/next glass-blur grid min-h-80 grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] overflow-hidden rounded-card border border-glass-edge bg-surface text-ink shadow-glass " +
          "[transition:border-color_0.25s,box-shadow_0.25s] hover:border-accent hover:text-ink hover:shadow-glow"
        }
        href={next ? `#/case/${next.id}` : "#/"}
        onClick={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <span className="flex flex-col justify-center gap-3 p-[clamp(24px,3.5vw,44px)] text-ink">
          <span className={label({ tone: "accent" })}>{tr(next ? "Next case study →" : "More work")}</span>
          <span className="display text-[clamp(36px,3.6vw,60px)] leading-[0.95] whitespace-nowrap">
            {next ? next.name : tr("All projects.")}
          </span>
          <span className="font-mono text-[12px] text-muted">
            {next
              ? [L(next.category), next.origin ? L(next.origin) : null, next.year].filter(Boolean).join(" · ")
              : tr("UX/UI design · Front-end development")}
          </span>
          <span className="max-w-[420px] text-[16px] text-pretty text-muted">
            {next
              ? L(next.short)
              : tr(
                  "This case study is one of my selected projects. Head back to the showcase for the rest of my design and front-end work.",
                )}
          </span>
          <span className="mt-2 font-semibold text-accent">
            <span className={GO}>{tr(next ? "Read the case study" : "Back to the showcase")}</span>{" "}
            <span className={GO} aria-hidden="true">
              →
            </span>
          </span>
        </span>
        <span
          className={
            "lens-scan relative cursor-crosshair overflow-hidden border-l border-line [--mx:50%] [--my:50%] [--r:0px] " +
            "max-[799px]:min-h-[200px] max-[799px]:border-t max-[799px]:border-l-0"
          }
          ref={media}
          aria-hidden="true"
          onPointerMove={onMove}
          onPointerLeave={() => media.current?.style.setProperty("--r", "0px")}
        >
          <span
            className="absolute inset-0 bg-[repeating-linear-gradient(90deg,var(--ph-a)_0_3px,var(--ph-b)_3px_9px)]"
            style={next && !mascot ? imageBg(cover, stripes(next.hue, app.theme)) : undefined}
          />
          {mascot && (
            <span className="absolute inset-0 grid place-items-center bg-[radial-gradient(60%_60%_at_50%_45%,var(--accent-soft),transparent_70%)]">
              <Creature
                className={
                  "w-[44%] max-w-[200px] [transition:transform_0.4s_cubic-bezier(0.3,1.4,0.5,1)] " +
                  "group-hover/next:[transform:scale(1.08)_rotate(-3deg)] motion-reduce:transition-none"
                }
              />
            </span>
          )}
          <span className="lens-clip absolute inset-0 bg-accent" />
          <span
            className={
              "lens-ring opacity-0 group-hover/next:opacity-100 " +
              "glass:group-hover/next:before:animate-lens-echo glass:group-hover/next:after:animate-lens-echo-late"
            }
          />
          {!cover && (
            <span className="absolute bottom-[14px] left-4 font-mono text-[11px] text-muted">
              {mascot ? t.mascotPh : next ? f.cover(next.name) : tr("project showcase")}
            </span>
          )}
        </span>
      </a>
      <div className="glass-blur flex flex-col gap-[14px] rounded-card border border-glass-edge bg-surface p-[clamp(24px,3vw,36px)] shadow-glass">
        <span className={label({ tone: "accent" })}>{tr("Let’s talk")}</span>
        <p className="text-[17px] leading-[1.5] text-pretty">{tr("Liked how this was put together? I’m open to new work.")}</p>
        <a className="group/mail self-start" href={`mailto:${PERSON.email}`}>
          <span className="block border-b border-current text-[clamp(17px,1.4vw,20px)] font-semibold break-all text-accent group-hover/mail:text-ink">
            {PERSON.email}
          </span>
        </a>
        <a
          className="group/top mt-auto font-mono text-[12px]"
          href="#c-overview"
          onClick={(e) => {
            e.preventDefault();
            app.scrollToCaseSection("overview");
          }}
        >
          <span className="text-muted group-hover/top:text-ink">{tr("Back to top ↑")}</span>
        </a>
      </div>
    </section>
  );
}
