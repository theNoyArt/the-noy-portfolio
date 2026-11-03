import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useApp } from "../../app/AppContext";
import { caseSections } from "../../app/sections";
import type { Localized } from "../../content/types";
import { VA, VA_IMG, VA_LINKS } from "../../content/vantgard";
import type { ResolvedCase } from "../../lib/cases";
import { cn } from "../../lib/cn";
import { useI18n } from "../../lib/i18n";
import { CaseMobileBar } from "../CaseMobileBar";
import {
  bodyMuted,
  btnRow,
  caseBtn,
  caseKv,
  caseTitle,
  caseTitleSub,
  lead,
  metaRow,
  sec,
  secHead,
  secLink,
} from "../dtrpg/case-ui";
import { Closing } from "../dtrpg/Closing";
import { LightboxProvider, useLightbox } from "../dtrpg/ui";
import { badge, card, cap, headNote, ov, secLabel, secTitle, tgRoot } from "../tamagotchi/tg-ui";

/*
 * Vantgard Arms: a self-initiated, unimplemented proposal shown anonymized. UX/UI only, so the page ends with the
 * planned stack instead of a build section, and the only outside link is the Figma file.
 */

const pad = (n: number) => String(n).padStart(2, "0");

/** The prototype's own fonts, loaded only while this page is open (type samples). */
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=IBM+Plex+Mono:wght@400&family=Jost:wght@400;500&display=swap";

function useProtoFonts() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONTS_HREF}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONTS_HREF;
    document.head.appendChild(l);
  }, []);
}

/** Steel tokens, for the type and UI samples drawn in code. */
const STEEL = {
  "--va-bg": "#0B0C0E",
  "--va-card": "#131519",
  "--va-border": "#2A2D33",
  "--va-fg": "#F2F3F5",
  "--va-muted": "#9CA2AA",
  "--va-primary": "#D9DCE1",
  "--va-new": "#A3231B",
} as CSSProperties;

const FONT_STACK: Record<string, string> = {
  "Cormorant Garamond": "'Cormorant Garamond', Georgia, serif",
  Jost: "'Jost', system-ui, sans-serif",
  "IBM Plex Mono": "'IBM Plex Mono', ui-monospace, monospace",
};

export function VantgardPage({ c }: { c: ResolvedCase }) {
  const { t, L } = useI18n();
  const app = useApp();
  useProtoFonts();
  return (
    <article className={tgRoot}>
      {app.narrow && <CaseMobileBar c={c} sections={caseSections(c, t)} />}
      <LightboxProvider>
        <Overview />
        <Process />
        <DesignSystem />
        <Decisions />
        <Changes />
        <Mockups />
        <Stack />
        <Closing c={c} />
        <p className="block px-[max(16px,min(4vw,56px))] pb-5 font-mono text-[11.5px] text-muted">
          {L({
            en: "Self-initiated proposal, not implemented, shown anonymized · names and photos replaced",
            pl: "Własna propozycja, niewdrożona, pokazana anonimowo · nazwy i zdjęcia zastąpione",
          })}
        </p>
      </LightboxProvider>
    </article>
  );
}

function SecHead({
  n,
  label,
  title,
  link,
  children,
}: {
  n: number;
  label: string;
  title: string;
  link?: { href: string; text: string };
  children?: ReactNode;
}) {
  return (
    <>
      <div className={secHead}>
        <span className={secLabel}>
          [{pad(n)}] {label}
        </span>
        {link && (
          <a className={secLink} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.text} ↗
          </a>
        )}
      </div>
      <div className={secHead}>
        <h2 className={secTitle}>{title}</h2>
        {children}
      </div>
    </>
  );
}

/** Bold label + text on one line ("Problem: …"). */
function Labelled({ k, v }: { k: Localized; v: Localized }) {
  const { L } = useI18n();
  return (
    <p className="m-0 text-[16px] leading-[1.55] text-pretty">
      <b className="font-semibold">{L(k)}:</b> <span className="text-muted">{L(v)}</span>
    </p>
  );
}

/* ---------------------------------------------------------------- image slot */

function VaShot({
  src,
  alt,
  className,
  frame,
}: {
  src: string;
  alt: string;
  className?: string;
  frame?: string;
}) {
  const lightbox = useLightbox();
  const [loaded, setLoaded] = useState(false);
  const url = `${VA_IMG}/${src}`;
  return (
    <button
      type="button"
      className={cn(
        "glass-blur relative block w-full max-w-full cursor-zoom-in overflow-hidden rounded-card border border-line-2 bg-[#0B0C0E] p-0 text-left shadow-glass",
        !loaded && "bg-[repeating-linear-gradient(90deg,var(--ph-a)_0_3px,var(--ph-b)_3px_9px)]",
        frame,
      )}
      onClick={() => lightbox(url, alt)}
      aria-label={alt}
    >
      <img
        className={cn("block h-auto w-full", className)}
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) setLoaded(true);
        }}
      />
    </button>
  );
}

/* ---------------------------------------------------------------- 01 overview */

function Overview() {
  const { L } = useI18n();
  const meta = metaRow();
  const kv = caseKv();
  return (
    <section className={sec({ first: true })} id="c-overview" data-nav-section>
      <div className={meta.root()}>
        <span className={meta.first()}>[01] {L({ en: "Overview", pl: "Przegląd" })}</span>
        <span>{L(VA.meta.kind)}</span>
        <span>{L(VA.meta.origin)}</span>
      </div>
      <div className={ov.root}>
        <div className={ov.text}>
          <h1 className={cn(caseTitle, ov.title)}>
            {L(VA.title)}
            <span className={caseTitleSub}>.</span>
          </h1>
          <div className={ov.headline}>
            <p className={ov.subtitle}>{L(VA.sub)}</p>
          </div>
          <p className={lead}>{L(VA.lead)}</p>
          <div className={btnRow}>
            <a
              className={caseBtn({ variant: "primary" })}
              href={VA_LINKS.figma}
              target="_blank"
              rel="noopener noreferrer"
            >
              {L({ en: "Figma file", pl: "Plik w Figmie" })} ↗
            </a>
          </div>
        </div>
        <div className={ov.aside}>
          <VaShot
            src="after-product.webp"
            alt={L({
              en: "Product page with the 4-step configurator",
              pl: "Strona produktu z 4-krokowym konfiguratorem",
            })}
          />
          <span className={cap}>
            {L({ en: "Product page · prototype", pl: "Strona produktu · prototyp" })}
          </span>
        </div>
      </div>

      <aside className={card({ class: "flex flex-col gap-2 border-dashed px-5 py-4" })} role="note">
        <span className="font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
          ⓘ {L(VA.note.title)}
        </span>
        <p className={bodyMuted({ class: "max-w-none" })}>{L(VA.note.body)}</p>
      </aside>

      <div className={card({ class: "flex flex-col gap-3 px-6 py-5" })}>
        <span className="display text-[22px]">TL;DR</span>
        {VA.tldr.map((x) => (
          <Labelled key={x.k.en} k={x.k} v={x.v} />
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-x-[clamp(24px,4vw,56px)] gap-y-8 max-[899px]:grid-cols-1">
        <div className="flex flex-col gap-4">
          <h3 className="display m-0 text-[24px]">{L({ en: "Overview", pl: "Przegląd" })}</h3>
          <p className={bodyMuted()}>{L(VA.overview)}</p>
          <h3 className="display m-0 mt-2 text-[24px]">{L({ en: "Goals", pl: "Cele" })}</h3>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {VA.goals.map((g) => (
              <li
                key={g.en}
                className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 text-[15.5px] text-pretty"
              >
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                {L(g)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="display m-0 text-[24px]">
            {L({ en: "Role, timeline and constraints", pl: "Rola, czas i ograniczenia" })}
          </h3>
          <dl className={kv.root({ class: "m-0" })}>
            {VA.facts.map((f) => (
              <div key={f.k.en} className={kv.row({ class: "grid-cols-[110px_minmax(0,1fr)]" })}>
                <dt className={kv.key()}>{L(f.k)}</dt>
                <dd className="m-0 text-pretty">{L(f.v)}</dd>
              </div>
            ))}
          </dl>
          <h3 className="display m-0 mt-2 text-[24px]">{L({ en: "Scope", pl: "Zakres" })}</h3>
          <p className={bodyMuted()}>
            {L({ en: "Desktop and mobile views for:", pl: "Widoki desktop i mobile dla:" })}
          </p>
          <dl className={kv.root({ class: "m-0" })}>
            {VA.scope.map((s) => (
              <div key={s.t.en} className={kv.row({ class: "grid-cols-[110px_minmax(0,1fr)]" })}>
                <dt className={kv.key()}>{L(s.t)}</dt>
                <dd className="m-0 text-pretty text-muted">{L(s.d)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 02 process */

function Process() {
  const { t, L } = useI18n();
  return (
    <section className={sec()} id="c-process" data-nav-section>
      <SecHead
        n={2}
        label={t.pfProcess}
        title={L({
          en: "From platform research to a clickable prototype.",
          pl: "Od wyboru platformy po klikalny prototyp.",
        })}
        link={{
          href: VA_LINKS.overview,
          text: L({ en: "Overview in Figma", pl: "Przegląd w Figmie" }),
        }}
      />
      <ol className="m-0 grid list-none grid-cols-3 gap-[14px] p-0 max-[1199px]:grid-cols-2 max-[699px]:grid-cols-1">
        {VA.process.map((p, i) => (
          <li
            key={p.t.en}
            className={card({
              class: cn(
                "flex flex-col gap-3 px-5 py-[18px]",
                p.next && "border-dashed bg-transparent shadow-none",
              ),
            })}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  "grid h-[30px] w-[30px] place-items-center rounded-full font-mono text-[13px] font-semibold cyber:rounded-none",
                  p.next
                    ? "border border-dashed border-line-2 text-muted"
                    : "bg-accent text-accent-ink",
                )}
              >
                {i + 1}
              </span>
              {p.next && (
                <span className={badge({ status: "planned" })}>
                  {L({ en: "Next", pl: "Dalej" })}
                </span>
              )}
            </div>
            <h3 className={cn("display m-0 text-[20px] leading-[1.2]", p.next && "text-muted")}>
              {L(p.t)}
            </h3>
            <p className="m-0 text-[14.5px] font-semibold text-pretty">
              {L({ en: "Goal", pl: "Cel" })}: <span className="font-normal">{L(p.goal)}</span>
            </p>
            <ul className="m-0 flex list-disc flex-col gap-[6px] pl-[18px] text-[14px] text-pretty text-muted marker:text-accent">
              {p.items.map((x) => (
                <li key={x.en}>{L(x)}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- 03 design system */

function DesignSystem() {
  const { t, L } = useI18n();
  const s = VA.system;
  return (
    <section className={sec()} id="c-system" data-nav-section>
      <SecHead n={3} label={t.designSystem} title={L(s.name)}>
        <p className={bodyMuted({ class: headNote })}>
          {L({
            en: "Graphite surfaces, silver for actions, and colour kept for one signal. Tokens named as in shadcn/ui, so the prototype maps one-to-one to code.",
            pl: "Grafitowe powierzchnie, srebro dla akcji i kolor tylko dla jednego sygnału. Tokeny nazwane jak w shadcn/ui, więc prototyp przekłada się na kod jeden do jednego.",
          })}
        </p>
      </SecHead>
      {/* Always dark: the Steel palette is the product's own, whatever the portfolio theme. */}
      <div
        className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6 rounded-card border border-[#2A2D33] bg-[var(--va-bg)] p-[clamp(18px,3vw,32px)] text-[var(--va-fg)] max-[999px]:grid-cols-1"
        style={STEEL}
      >
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 max-[420px]:grid-cols-1">
          {s.tokens.map((tk) => (
            <li
              key={tk.k}
              className="flex items-center gap-3 rounded-[4px] border border-[var(--va-border)] bg-[var(--va-card)] p-[10px]"
            >
              <span
                className="h-9 w-9 shrink-0 rounded-[4px] border border-white/15"
                style={{ background: tk.v }}
                aria-hidden="true"
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-mono text-[12px]">{tk.k}</span>
                <span className="font-mono text-[11px] text-[var(--va-muted)]">{tk.v}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-5">
          {s.type.map((ty, i) => (
            <div
              key={ty.label}
              className="flex flex-col gap-1 border-b border-[var(--va-border)] pb-4 last:border-b-0"
            >
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-[var(--va-muted)] uppercase">
                {ty.label}
              </span>
              <span
                style={{ fontFamily: FONT_STACK[ty.font] }}
                className={cn(
                  i === 0
                    ? "text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-medium"
                    : i === 1
                      ? "text-[16px] leading-[1.5] text-[var(--va-muted)]"
                      : "text-[13px]",
                )}
              >
                {L(ty.sample)}
              </span>
            </div>
          ))}
          <div
            className="flex flex-wrap items-center gap-3"
            style={{ fontFamily: FONT_STACK.Jost }}
          >
            <span className="rounded-[4px] bg-[var(--va-primary)] px-4 py-[10px] text-[12px] font-medium tracking-[0.14em] text-[var(--va-bg)] uppercase">
              {s.samples[0]} →
            </span>
            <span className="rounded-[4px] border border-[var(--va-border)] px-4 py-[10px] text-[12px] font-medium tracking-[0.14em] uppercase">
              {s.samples[1]}
            </span>
            <span className="rounded-[3px] bg-[var(--va-new)] px-2 py-1 text-[11px] font-medium tracking-[0.14em] uppercase">
              {s.samples[2]}
            </span>
            <span className="rounded-[3px] border border-[var(--va-border)] px-2 py-1 text-[11px] font-medium tracking-[0.14em] uppercase">
              ◷ {s.samples[3]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 04 decisions */

function Decisions() {
  const { t, L } = useI18n();
  const rows: [Localized, "considered" | "chose" | "why" | "cost"][] = [
    [{ en: "Considered", pl: "Rozważane" }, "considered"],
    [{ en: "Chose", pl: "Wybrane" }, "chose"],
    [{ en: "Why", pl: "Dlaczego" }, "why"],
    [{ en: "Cost", pl: "Koszt" }, "cost"],
  ];
  return (
    <section className={sec()} id="c-decisions" data-nav-section>
      <SecHead
        n={4}
        label={t.pfFeatures}
        title={L({ en: "Key decisions and trade-offs.", pl: "Kluczowe decyzje i kompromisy." })}
        link={{
          href: VA_LINKS.decisions,
          text: L({ en: "Decisions in Figma", pl: "Decyzje w Figmie" }),
        }}
      >
        <p className={bodyMuted({ class: headNote })}>{L(VA.decisionsLead)}</p>
      </SecHead>
      <ol className="m-0 grid list-none grid-cols-2 gap-[14px] p-0 max-[999px]:grid-cols-1">
        {VA.decisions.map((d, i) => (
          <li key={d.t.en} className={card({ class: "flex flex-col gap-3 px-5 py-[18px]" })}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[13px] font-semibold text-accent">{pad(i + 1)}</span>
              <h3 className="display m-0 text-[20px] leading-[1.2]">{L(d.t)}</h3>
            </div>
            <dl className="m-0 flex flex-col gap-2">
              {rows.map(([k, key]) => (
                <div
                  key={key}
                  className={cn(
                    "grid grid-cols-[96px_minmax(0,1fr)] gap-3 text-[14.5px] max-[420px]:grid-cols-1 max-[420px]:gap-0",
                    key === "chose" &&
                      "rounded-[8px] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-2 py-[6px] -mx-2 cyber:rounded-none",
                  )}
                >
                  <dt className="pt-[2px] font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                    {L(k)}
                  </dt>
                  <dd className="m-0 text-pretty">{L(d[key])}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- 05 before / after */

function Changes() {
  const { t, L } = useI18n();
  return (
    <section className={sec()} id="c-changes" data-nav-section>
      <SecHead
        n={5}
        label={t.vaChanges}
        title={L({ en: "Before and after: 4 key screens.", pl: "Przed i po: 4 kluczowe ekrany." })}
      >
        <p className={bodyMuted({ class: headNote })}>{L(VA.beforeAfterLead)}</p>
      </SecHead>
      <div className="flex flex-col gap-10">
        {VA.beforeAfter.map((b) => (
          <div key={b.t.en} className="flex flex-col gap-4">
            <h3 className="display m-0 border-b border-line-2 pb-2 text-[24px]">{L(b.t)}</h3>
            <div className="grid grid-cols-2 items-start gap-[clamp(14px,2vw,24px)] max-[799px]:grid-cols-1">
              {(
                [
                  ["before", b.before],
                  ["after", b.after],
                ] as const
              ).map(([kind, side]) => (
                <figure key={kind} className="m-0 flex min-w-0 flex-col gap-3">
                  <span
                    className={cn(
                      "self-start rounded-full px-[10px] py-[3px] font-mono text-[10.5px] tracking-[0.1em] uppercase cyber:rounded-none",
                      kind === "after"
                        ? "bg-accent text-accent-ink"
                        : "border border-line-2 text-muted",
                    )}
                  >
                    {kind === "after"
                      ? L({ en: "After", pl: "Po" })
                      : L({ en: "Before", pl: "Przed" })}
                  </span>
                  <VaShot src={side.img} alt={L(side.alt)} />
                  <figcaption className="text-[14.5px] text-pretty text-muted">
                    {L(side.d)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 06 mockups */

function Mockups() {
  const { t, L } = useI18n();
  const [home, product] = VA.mockups.desktop;
  return (
    <section className={sec()} id="c-mockups" data-nav-section>
      <SecHead
        n={6}
        label={t.mockups}
        title={L({ en: "The prototype, desktop and mobile.", pl: "Prototyp, desktop i mobile." })}
        link={{
          href: VA_LINKS.mockups,
          text: L({ en: "Mockups in Figma", pl: "Makiety w Figmie" }),
        }}
      >
        <p className={bodyMuted({ class: headNote })}>{L(VA.mockupsLead)}</p>
      </SecHead>
      <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start gap-[clamp(14px,2vw,24px)] max-[899px]:grid-cols-1">
        <figure className="m-0 flex min-w-0 flex-col gap-2">
          <div className="max-h-[720px] overflow-y-auto overscroll-contain rounded-card [scrollbar-width:thin]">
            <VaShot src={home.img} alt={L(home.t)} />
          </div>
          <figcaption className={cap}>
            {L(home.t)} ·{" "}
            {L({
              en: "scroll inside, or click to enlarge",
              pl: "przewiń w środku albo kliknij, by powiększyć",
            })}
          </figcaption>
        </figure>
        <div className="flex min-w-0 flex-col gap-[clamp(14px,2vw,24px)]">
          <figure className="m-0 flex flex-col gap-2">
            <VaShot src={product.img} alt={L(product.t)} />
            <figcaption className={cap}>{L(product.t)}</figcaption>
          </figure>
          <ul className="m-0 grid list-none grid-cols-3 gap-[clamp(10px,1.5vw,18px)] p-0 max-[599px]:flex max-[599px]:snap-x max-[599px]:overflow-x-auto max-[599px]:pb-2">
            {VA.mockups.mobile.map((m) => (
              <li
                key={m.img}
                className="flex min-w-0 flex-col gap-2 max-[599px]:w-[62vw] max-[599px]:shrink-0 max-[599px]:snap-start"
              >
                <VaShot
                  src={m.img}
                  alt={L(m.t)}
                  frame="rounded-[28px] border-0 bg-transparent shadow-none"
                />
                <span className={cap}>{L(m.t)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 07 planned stack */

function Stack() {
  const { t, L } = useI18n();
  const kv = caseKv();
  return (
    <section className={sec()} id="c-stack" data-nav-section>
      <SecHead
        n={7}
        label={t.vaStack}
        title={L({ en: "Planned front-end stack.", pl: "Planowany stack front-endu." })}
      >
        <p className={bodyMuted({ class: headNote })}>
          {L({
            en: "Design only: the proposal hasn’t been implemented, so this stack is a plan.",
            pl: "Tylko projekt: propozycja nie została wdrożona, więc ten stack to plan.",
          })}
        </p>
      </SecHead>
      <dl className={kv.root({ class: "m-0 max-w-[900px]" })}>
        {VA.stack.map((f) => (
          <div
            key={f.k.en}
            className={kv.row({
              class: "grid-cols-[180px_minmax(0,1fr)] max-[520px]:grid-cols-1 max-[520px]:gap-1",
            })}
          >
            <dt className={kv.key()}>{L(f.k)}</dt>
            <dd className="m-0 text-pretty">{L(f.v)}</dd>
          </div>
        ))}
      </dl>
      <div className={btnRow}>
        <a
          className={caseBtn({ variant: "primary" })}
          href={VA_LINKS.figma}
          target="_blank"
          rel="noopener noreferrer"
        >
          {L({ en: "Open the Figma file", pl: "Otwórz plik w Figmie" })} ↗
        </a>
      </div>
    </section>
  );
}
