import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useApp } from "../../app/AppContext";
import { caseSections } from "../../app/sections";
import { PF, PF_FACTS, PF_LINKS, PF_WIRES } from "../../content/portfolioCase";
import { Ext } from "../dtrpg/ui";
import type { Localized } from "../../content/types";
import type { ResolvedCase } from "../../lib/cases";
import { cn } from "../../lib/cn";
import { useI18n } from "../../lib/i18n";
import { CaseMobileBar } from "../CaseMobileBar";
import { Closing } from "../dtrpg/Closing";
import {
  bodyMuted,
  btnRow,
  caseBtn,
  caseKv,
  caseTitle,
  caseTitleSub,
  controls,
  heroLens,
  label,
  lead,
  metaRow,
  notes,
  sec,
  secHead,
  seg,
  steps,
  wfRow,
} from "../dtrpg/case-ui";
import {
  card,
  dsSpec,
  mapCell,
  mapRow,
  mapSketch,
  mood,
  moodBtn,
  moodPill,
  moodToast,
  pfMap,
  pfPhone,
  phoneSketch,
  pin,
  splitNotes,
  sub,
  switchOpt,
  themeSwitch,
} from "./pf-ui";

/** Entrance of a panel that is re-mounted when its switch changes. */
const swapIn = "animate-pf-in";
/** Section heading: the display face (not the case heading face) at the case-study size. */
const secTitle = "display max-w-[26ch] text-[clamp(28px,2.8vw,44px)] leading-[1.05] text-balance";
/** Text next to a section heading. */
const headNote = bodyMuted({ class: "max-w-[46ch]" });
/** Hint next to a switch. */
const hint = "text-[14px] text-muted";

const pad = (n: number) => String(n).padStart(2, "0");

/** This portfolio as a case study: process, key decisions, stack and next steps. */
export function PortfolioPage({ c }: { c: ResolvedCase }) {
  const { t } = useI18n();
  const app = useApp();
  return (
    <article className="case-scope">
      {app.narrow && <CaseMobileBar c={c} sections={caseSections(c, t)} />}
      <Overview />
      <Wireframes />
      <DesignSystem />
      <FrontEnd />
      <Closing c={c} />
    </article>
  );
}

function SecHead({
  n,
  label: name,
  title,
  children,
}: {
  n: number;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <>
      <span className={label({ tone: "accent", star: true })}>
        [{pad(n)}] {name}
      </span>
      <div className={secHead}>
        <h2 className={secTitle}>{title}</h2>
        {children}
      </div>
    </>
  );
}

function Overview() {
  const { L } = useI18n();
  const app = useApp();
  const meta = metaRow();
  const kv = caseKv();
  return (
    // The overview fills the viewport; the screenshot lens takes the full height of its column.
    <section
      className={sec({ first: true, class: "min-h-svh max-[899px]:min-h-0" })}
      id="c-overview"
      data-nav-section
    >
      <div className={meta.root()}>
        <span className={meta.first()}>[01] {L({ en: "Overview", pl: "Przegląd" })}</span>
        <span>{L(PF.meta.kind)}</span>
        <span>{L(PF.meta.origin)}</span>
      </div>
      <div className="grid flex-1 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-stretch gap-x-[clamp(28px,3.5vw,56px)] gap-y-10 max-[899px]:grid-cols-[minmax(0,1fr)]">
        <div className="flex flex-col gap-7">
          <h1 className={cn(caseTitle, "text-[clamp(52px,6.4vw,110px)] leading-[0.9]")}>
            {L(PF.title)}
            <span className={caseTitleSub}>.</span>
          </h1>
          <div className="-mt-3 flex flex-col gap-[14px] self-start">
            <p className="flex flex-wrap items-center gap-x-[14px] gap-y-2 font-display text-[clamp(22px,2.2vw,32px)] leading-[1.15] text-accent">
              {L(PF.sub)}
            </p>
          </div>
          <p className={lead}>{L(PF.lead)}</p>
          <div className={btnRow}>
            <button
              type="button"
              className={caseBtn({ variant: "primary" })}
              onClick={() => app.scrollToCaseSection("wireframes")}
            >
              {L({ en: "See the design ↓", pl: "Zobacz projekt ↓" })}
            </button>
            <Ext className={caseBtn()} href={PF_LINKS.github}>
              &lt;/&gt; GitHub {PF_LINKS.github ? "↗" : ""}
            </Ext>
          </div>
          <dl className={kv.root({ class: "mt-5" })}>
            {PF_FACTS.map(([k, v]) => (
              <div key={k.en} className={kv.row()}>
                <dt className={kv.key()}>{L(k)}</dt>
                <dd>{L(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ThemeLens />
      </div>
    </section>
  );
}

/**
 * The home page in the current theme; the other theme shows through a lens under the cursor
 * (same interaction as the DriveThruRPG before/after). The switch below flips the whole site.
 */
function ThemeLens() {
  const { L } = useI18n();
  const app = useApp();
  const dark = app.theme === "dark";
  const stage = useRef<HTMLDivElement>(null);
  const down = useRef<{ x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);

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

  const img = (t: "light" | "dark") => `url("/images/portfolio/home-${t}.webp")`;
  const other = dark ? "Glass light" : "Cyber dark";
  const s = heroLens({ open });
  const sw = themeSwitch({ dark });

  return (
    <figure
      className={s.root({ class: "min-h-0 w-full" })}
      aria-label={L({ en: "The home page in both themes", pl: "Strona główna w obu motywach" })}
    >
      <div
        ref={stage}
        className={s.stage({
          class:
            "aspect-auto min-h-[520px] flex-1 max-[899px]:aspect-[3/4] max-[899px]:min-h-0 max-[899px]:flex-none",
        })}
        role="img"
        aria-label={L({
          en: "Home page in the current theme. Move the cursor over it, or tap, to see the other theme underneath.",
          pl: "Strona główna w obecnym motywie. Najedź kursorem lub dotknij, by zobaczyć drugi motyw.",
        })}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        <div className={s.layer()} style={{ backgroundImage: img(dark ? "dark" : "light") }} />
        <div
          className={cn(s.layer(), s.back())}
          style={{ backgroundImage: img(dark ? "light" : "dark") }}
        />
        <span className={s.ring()} aria-hidden="true" />
        <span className={s.chip()} aria-hidden="true">
          {other}
        </span>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-[10px] font-mono text-[11.5px]">
        <span className="text-muted">
          {L({ en: "Hover to peek at the other theme", pl: "Najedź, by podejrzeć drugi motyw" })}
        </span>
        <button
          type="button"
          className={sw.root()}
          onClick={() => app.setTheme(dark ? "light" : "dark")}
          aria-label={L({ en: "Switch the site to ", pl: "Przełącz stronę na " }) + other}
        >
          <span className={cn(switchOpt, sw.light())}>
            <svg className={sw.icon()} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3c3 4 6 7 6 10.5A6 6 0 0 1 6 13.5C6 10 9 7 12 3z" />
            </svg>
            Glass
          </span>
          <span className={cn(switchOpt, sw.dark())}>
            <svg className={sw.icon()} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h4v4H4zM10 4h4v4h-4zM16 10h4v4h-4zM10 16h4v4h-4zM4 10h4v4H4z" />
            </svg>
            Cyber
          </span>
          <span className={sw.knob()} aria-hidden="true" />
        </button>
      </figcaption>
    </figure>
  );
}

function Pin({ n, chat }: { n: number; chat?: boolean }) {
  return <i className={pin({ chat })}>{n}</i>;
}

function WSteps({ items }: { items: { t: Localized; d: Localized }[] }) {
  const { L } = useI18n();
  const st = steps();
  return (
    <ol className={st.root()}>
      {items.map((s, i) => (
        <li key={s.t.en} className={st.item()}>
          <span className={st.n()}>{i + 1}</span>
          <span>
            <span className={st.title()}>{L(s.t)}</span>
            <span className={st.desc()}>{L(s.d)}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function WNotes({ items }: { items: { t: Localized; d: Localized }[] }) {
  const { L } = useI18n();
  const nt = notes();
  return (
    <ul className={nt.root()}>
      {items.map((n) => (
        <li key={n.t.en} className={nt.item()}>
          <b className={nt.title()}>{L(n.t)}</b>
          <span className={nt.desc()}>{L(n.d)}</span>
        </li>
      ))}
    </ul>
  );
}

function HomeFrame() {
  const { L } = useI18n();
  const m = pfMap({ home: true });
  return (
    <div className={m.root()}>
      <div className={m.side()}>
        <Pin n={1} />
        <b className={m.b()}>{L({ en: "Sidebar", pl: "Sidebar" })}</b>
        <span className={m.t()}>{L({ en: "Name & role", pl: "Imię i rola" })}</span>
        <span className={m.t()}>{L({ en: "Section index", pl: "Indeks sekcji" })}</span>
        <span className={m.push()}>{L({ en: "Language · theme", pl: "Język · motyw" })}</span>
      </div>
      <div className={m.main()}>
        <div className={mapRow({ kind: "tall" }).root()}>
          <div className={mapCell({ tall: true })}>
            <Pin n={2} />
            <b className={m.b()}>Hero</b>
            <span className={m.t()}>
              {L({ en: "Name · role · intro · 2 CTAs", pl: "Imię · rola · intro · 2 CTA" })}
            </span>
          </div>
          <div className={mapCell({ tall: true, alt: true })}>
            <Pin n={3} />
            <b className={m.b()}>{L({ en: "Theme panel", pl: "Panel motywu" })}</b>
            <span className={m.t()}>
              {L({ en: "Disciplines / Achievements", pl: "Dyscypliny / Osiągnięcia" })}
            </span>
          </div>
        </div>
        <div className={mapRow().root()}>
          <Pin n={4} />
          <b className={m.b()}>{L({ en: "About", pl: "O mnie" })}</b>
          <span className={mapSketch.tabs}>
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className={mapRow().root()}>
          <Pin n={5} />
          <b className={m.b()}>{L({ en: "Project showcase", pl: "Projekty" })}</b>
          <span className={mapSketch.cards}>
            <i className="col-span-2" />
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className={mapRow().root()}>
          <Pin n={6} />
          <b className={m.b()}>{L({ en: "Experience", pl: "Doświadczenie" })}</b>
          <span className={mapSketch.lanes}>
            <i style={{ width: "70%", marginLeft: "25%" }} />
            <i style={{ width: "35%", marginLeft: "48%" }} />
            <i style={{ width: "30%", marginLeft: "15%" }} />
          </span>
        </div>
        <div className={mapRow().root()}>
          <Pin n={7} />
          <b className={m.b()}>{L({ en: "Other activities", pl: "Inne aktywności" })}</b>
          <span className={mapSketch.cards}>
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
      <span className={m.chat()}>
        <Pin n={8} chat />
        {L({ en: "AI chat", pl: "Czat AI" })}
      </span>
    </div>
  );
}

function ProjectFrame() {
  const { L } = useI18n();
  const m = pfMap();
  const band = mapRow({ kind: "band" });
  const dev = mapRow({ kind: "dev" });
  return (
    <div className={m.root()}>
      <div className={m.side()}>
        <Pin n={1} />
        <b className={m.b()}>{L({ en: "Case sidebar", pl: "Sidebar projektu" })}</b>
        <span className={m.t()}>← {L({ en: "Projects", pl: "Projekty" })}</span>
        <span className={m.t()}>{L({ en: "Project name", pl: "Nazwa projektu" })}</span>
        <span className={m.t()}>01 {L({ en: "Overview", pl: "Przegląd" })}</span>
        <span className={m.t()}>02 {L({ en: "Audit", pl: "Audyt" })}</span>
        <span className={m.t()}>03 {L({ en: "Wireframes", pl: "Wireframe’y" })}</span>
        <span className={m.t()}>04 {L({ en: "Design system", pl: "Design system" })}</span>
        <span className={m.t()}>05 {L({ en: "Mockups", pl: "Makiety" })}</span>
        <span className={m.t()}>06 {L({ en: "Front end", pl: "Front-end" })}</span>
        <span className={m.t()}>07 Mock API</span>
        <span className={m.push()}>Demo · GitHub · Figma</span>
      </div>
      <div className={m.main()}>
        <div className={mapRow({ kind: "tall" }).root()}>
          <div className={mapCell({ tall: true })}>
            <Pin n={2} />
            <b className={m.b()}>01 · {L({ en: "Overview", pl: "Przegląd" })}</b>
            <span className={m.t()}>
              {L({ en: "Title · lead · buttons · facts", pl: "Tytuł · lead · przyciski · fakty" })}
            </span>
            <span className={mapSketch.kv}>
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className={mapCell({ tall: true, alt: true })}>
            <b className={m.b()}>{L({ en: "Hero visual", pl: "Grafika hero" })}</b>
            <span className={m.t()}>
              {L({ en: "Before / after lens", pl: "Soczewka przed / po" })}
            </span>
          </div>
        </div>
        <div className={band.root()}>
          <Pin n={3} />
          <span className={band.bandText()}>
            {L({ en: "Design track · 02—05", pl: "Ścieżka projektu · 02—05" })}
          </span>
        </div>
        <div className={mapRow().root()}>
          <Pin n={4} />
          <b className={m.b()}>02 · {L({ en: "Audit", pl: "Audyt" })}</b>
          <span className={mapSketch.stats}>
            <i>87</i>
            <i>6</i>
            <i>3</i>
          </span>
          <span className={mapSketch.chips}>
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className={mapRow().root()}>
          <Pin n={5} />
          <b className={m.b()}>03 · {L({ en: "Wireframes", pl: "Wireframe’y" })}</b>
          <span className={mapSketch.split}>
            <i />
            <i className={splitNotes} />
          </span>
        </div>
        <div className={mapRow().root()}>
          <Pin n={6} />
          <b className={m.b()}>04 · {L({ en: "Design system", pl: "Design system" })}</b>
          <span className={mapSketch.sw}>
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <i key={k} style={{ "--k": k } as CSSProperties} />
            ))}
          </span>
        </div>
        <div className={mapRow().root()}>
          <Pin n={7} />
          <b className={m.b()}>05 · {L({ en: "Mockups", pl: "Makiety" })}</b>
          <span className={mapSketch.cards}>
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className={dev.root()}>
          <Pin n={8} />
          <span className={dev.bandText()}>
            {L({ en: "Build track · 06—07", pl: "Ścieżka budowy · 06—07" })}
          </span>
        </div>
        <div className={mapRow({ kind: "hero" }).root()}>
          <div className={mapCell()}>
            <Pin n={9} />
            <b className={m.b()}>06 · {L({ en: "Front end", pl: "Front-end" })}</b>
            <span className={m.t()}>
              {L({ en: "Stack · architecture", pl: "Stack · architektura" })}
            </span>
          </div>
          <div className={mapCell()}>
            <Pin n={10} />
            <b className={m.b()}>07 · Mock API</b>
            <span className={m.t()}>
              {L({ en: "Endpoints · Swagger", pl: "Endpointy · Swagger" })}
            </span>
          </div>
        </div>
        <div className={mapRow({ kind: "hero" }).root()}>
          <div className={mapCell()}>
            <Pin n={11} />
            <b className={m.b()}>{L({ en: "Next project", pl: "Następny projekt" })}</b>
            <span className={m.t()}>{L({ en: "Cover · link", pl: "Okładka · link" })}</span>
          </div>
          <div className={mapCell()}>
            <b className={m.b()}>{L({ en: "Contact", pl: "Kontakt" })}</b>
            <span className={m.t()}>Email · ↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Top bar shared by both mobile frames. */
function PhoneTop({ n }: { n: number }) {
  const { L } = useI18n();
  const p = pfPhone();
  return (
    <div className={p.bar()}>
      <Pin n={n} />
      <b className={pfMap().b()}>{L({ en: "Name", pl: "Imię" })}</b>
      <span className="flex gap-1">
        <span className={p.ctl()}>EN</span>
        <span className={p.ctl()}>{L({ en: "Menu", pl: "Menu" })}</span>
      </span>
    </div>
  );
}

function HomePhone() {
  const { L } = useI18n();
  const p = pfPhone();
  const m = pfMap();
  const row = mapRow().root();
  return (
    <div className={p.root({ class: "pb-12" })}>
      <span className={p.notch()} aria-hidden="true" />
      <PhoneTop n={1} />
      <div className={mapCell({ tall: true })}>
        <Pin n={2} />
        <b className={m.b()}>Hero</b>
        <span className={m.t()}>{L({ en: "Name · role · intro", pl: "Imię · rola · intro" })}</span>
        <span className={phoneSketch.ctas}>
          <i />
          <i />
        </span>
      </div>
      <div className={row}>
        <Pin n={3} />
        <b className={m.b()}>{L({ en: "Contact", pl: "Kontakt" })}</b>
        <span className={phoneSketch.contact}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={row}>
        <Pin n={4} />
        <b className={m.b()}>{L({ en: "About", pl: "O mnie" })}</b>
        <span className={mapSketch.tabs}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={mapSketch.kv}>
          <i />
          <i />
        </span>
      </div>
      <div className={row}>
        <Pin n={5} />
        <b className={m.b()}>{L({ en: "Project showcase", pl: "Projekty" })}</b>
        <span className={phoneSketch.cards}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={row}>
        <Pin n={6} />
        <b className={m.b()}>{L({ en: "Experience", pl: "Doświadczenie" })}</b>
        <span className={mapSketch.lanes}>
          <i style={{ width: "60%", marginLeft: "38%" }} />
          <i style={{ width: "30%", marginLeft: "18%" }} />
        </span>
        <span className={phoneSketch.strip}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={row}>
        <Pin n={7} />
        <b className={m.b()}>{L({ en: "Other activities", pl: "Inne aktywności" })}</b>
        <span className={phoneSketch.cards}>
          <i />
          <i />
        </span>
      </div>
      <span className={p.chat()}>
        <Pin n={8} chat />
        {L({ en: "AI chat", pl: "Czat AI" })}
      </span>
    </div>
  );
}

function ProjectPhone() {
  const { L } = useI18n();
  const p = pfPhone();
  const m = pfMap();
  const row = mapRow().root();
  const band = mapRow({ kind: "band" });
  const dev = mapRow({ kind: "dev" });
  return (
    <div className={p.root()}>
      <span className={p.notch()} aria-hidden="true" />
      <PhoneTop n={1} />
      <div className={p.sectionBar()}>
        <Pin n={2} />
        <span className={p.ctl()}>←</span>
        <span className={cn(p.ctl(), "flex-1 text-left")}>
          03 {L({ en: "Wireframes", pl: "Wireframe’y" })} ▾
        </span>
        <span className={p.progress()} aria-hidden="true" />
      </div>
      <div className={mapCell({ tall: true })}>
        <Pin n={3} />
        <b className={m.b()}>01 · {L({ en: "Overview", pl: "Przegląd" })}</b>
        <span className={m.t()}>
          {L({ en: "Title · lead · buttons · facts", pl: "Tytuł · lead · przyciski · fakty" })}
        </span>
        <span className={mapSketch.kv}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={mapCell({ alt: true, class: "min-h-[64px]" })}>
        <b className={m.b()}>{L({ en: "Hero visual", pl: "Grafika hero" })}</b>
        <span className={m.t()}>{L({ en: "Lens · tap to open", pl: "Soczewka · dotknij" })}</span>
      </div>
      <div className={band.root()}>
        <Pin n={4} />
        <span className={band.bandText()}>
          {L({ en: "Design track · 02—05", pl: "Ścieżka projektu · 02—05" })}
        </span>
      </div>
      <div className={row}>
        <Pin n={5} />
        <b className={m.b()}>02—05</b>
        <span className={m.t()}>
          {L({
            en: "Switch · frame · notes below",
            pl: "Przełącznik · ramka · notatki pod spodem",
          })}
        </span>
        <span className={phoneSketch.cards}>
          <i />
          <i className={splitNotes} />
        </span>
      </div>
      <div className={dev.root()}>
        <Pin n={6} />
        <span className={dev.bandText()}>
          {L({ en: "Build track · 06—07", pl: "Ścieżka budowy · 06—07" })}
        </span>
      </div>
      <div className={row}>
        <Pin n={7} />
        <b className={m.b()}>{L({ en: "Closing", pl: "Zakończenie" })}</b>
        <span className={phoneSketch.cards}>
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}

function Seg2<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  const s = seg();
  return (
    <div className={s.root()} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={s.btn()}
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Wireframes() {
  const { t, L } = useI18n();
  const app = useApp();
  const [view, setView] = useState<"home" | "project">("home");
  // On a phone the section opens on the mobile frames.
  const [device, setDevice] = useState<"desktop" | "mobile">(() =>
    app.narrow ? "mobile" : "desktop",
  );
  const home = view === "home";
  const mobile = device === "mobile";
  const wf = wfRow(mobile ? { layout: "mobile" } : {});
  const stepsList = mobile
    ? home
      ? PF_WIRES.homeMobile
      : PF_WIRES.projectMobile
    : home
      ? PF_WIRES.home
      : PF_WIRES.project;
  const notesList = mobile
    ? home
      ? PF_WIRES.homeMobileNotes
      : PF_WIRES.projectMobileNotes
    : home
      ? PF_WIRES.homeNotes
      : PF_WIRES.projectNotes;
  const k = label({ class: "pb-2 not-first:mt-[14px]" });
  return (
    <section className={sec()} id="c-wireframes" data-nav-section>
      <SecHead
        n={2}
        label={t.wireframes}
        title={L({ en: "Two layouts carry the whole site.", pl: "Dwa układy niosą całą stronę." })}
      >
        <p className={headNote}>
          {L({
            en: "Lo-fi frames with numbered notes. The project layout comes from the DriveThruRPG case study and every project reuses it.",
            pl: "Wireframe’y lo-fi z numerowanymi notatkami. Układ projektu pochodzi z case study DriveThruRPG i każdy projekt go używa.",
          })}
        </p>
      </SecHead>
      <div className={controls}>
        <Seg2
          label={L({ en: "Layout", pl: "Układ" })}
          value={view}
          onChange={setView}
          options={[
            { id: "home", label: L({ en: "A · Home page", pl: "A · Strona główna" }) },
            { id: "project", label: L({ en: "B · Project page", pl: "B · Strona projektu" }) },
          ]}
        />
        <Seg2
          label={L({ en: "Device", pl: "Urządzenie" })}
          value={device}
          onChange={setDevice}
          options={[
            { id: "desktop", label: "Desktop" },
            { id: "mobile", label: "Mobile" },
          ]}
        />
        <span className={hint}>
          {mobile
            ? L({ en: "Mobile · below 900px", pl: "Mobile · poniżej 900px" })
            : home
              ? L({
                  en: "Desktop · numbered on the wireframe",
                  pl: "Desktop · numeracja na wireframe’ie",
                })
              : L({
                  en: "Desktop · example: DriveThruRPG",
                  pl: "Desktop · przykład: DriveThruRPG",
                })}
        </span>
      </div>
      <div
        className={wf.root({
          class: cn(
            mobile
              ? "grid-cols-[minmax(0,340px)_minmax(0,1fr)] max-[899px]:grid-cols-[minmax(0,1fr)]"
              : "grid-cols-[minmax(0,1fr)_minmax(260px,360px)] max-[1199px]:grid-cols-[minmax(0,1fr)]",
            swapIn,
          ),
        })}
        key={view + device}
      >
        {mobile ? home ? <HomePhone /> : <ProjectPhone /> : home ? <HomeFrame /> : <ProjectFrame />}
        <div className={wf.side({ class: "flex flex-col gap-[10px]" })}>
          <p className={k}>
            {L({ en: "Numbered on the wireframe", pl: "Numeracja na wireframe’ie" })}
          </p>
          <WSteps items={stepsList} />
          <p className={k}>{L({ en: "Notes", pl: "Notatki" })}</p>
          <WNotes items={notesList} />
        </div>
      </div>
    </section>
  );
}

function DesignSystem() {
  const { t, L } = useI18n();
  const app = useApp();
  const [id, setId] = useState<"glass" | "cyber">(app.theme === "dark" ? "cyber" : "glass");
  useEffect(() => setId(app.theme === "dark" ? "cyber" : "glass"), [app.theme]);
  const m = PF.moods.find((x) => x.id === id)!;
  const b = mood({ kind: id });
  const toast = moodToast();
  const spec = dsSpec();
  return (
    <section className={sec()} id="c-design" data-nav-section>
      <SecHead
        n={3}
        label={t.designSystem}
        title={L({ en: "Two moods, one system.", pl: "Dwa nastroje, jeden system." })}
      >
        <p className={headNote}>
          {L({
            en: "Both themes share the same token names and components; only the values and the attitude change. Glass follows today’s UI trends, Cyber looks back at old-school game interfaces.",
            pl: "Oba motywy dzielą nazwy tokenów i komponenty; zmieniają się tylko wartości i charakter. Glass podąża za aktualnymi trendami UI, Cyber nawiązuje do starych interfejsów gier.",
          })}
        </p>
      </SecHead>
      <div className={controls}>
        <Seg2
          label={L({ en: "Theme", pl: "Motyw" })}
          value={id}
          onChange={setId}
          options={[
            { id: "glass", label: "Glass light" },
            { id: "cyber", label: "Cyber dark" },
          ]}
        />
        <span className={hint}>
          {L({
            en: "Follows the page theme; switch to preview the other one.",
            pl: "Podąża za motywem strony; przełącz, by zobaczyć drugi.",
          })}
        </span>
      </div>
      <div
        className={cn(
          "grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-start gap-6 max-[1199px]:grid-cols-[minmax(0,1fr)]",
          swapIn,
        )}
        key={id}
      >
        <article className={b.root()}>
          <header className={b.head()}>
            <span className={b.k()}>{L({ en: "Mood board", pl: "Moodboard" })}</span>
            <h3 className={b.name()}>{m.name}</h3>
            <p className={b.concept()}>{L(m.concept)}</p>
          </header>
          <div className={b.grid()}>
            <div className={b.tex()} aria-hidden="true">
              <span className={b.texCard()}>{m.id === "glass" ? "Aa" : "> READY_"}</span>
            </div>
            <div className={b.type()}>
              <span className={b.aa()}>Aa</span>
              <span className={b.fonts()}>{m.fonts.join(" · ")}</span>
            </div>
            <div className={b.ui()} aria-hidden="true">
              {m.id === "glass" ? (
                <>
                  <span className={moodBtn}>{t.ctaProjects}</span>
                  <span className={moodPill}>
                    {L({ en: "Research & design", pl: "Badania i projektowanie" })}
                  </span>
                </>
              ) : (
                <>
                  <span className={toast.root()}>
                    <b className={toast.icon()}>◆</b>
                    <span className={toast.text()}>
                      <i className={toast.k()}>
                        {L({ en: "ACHIEVEMENT UNLOCKED", pl: "OSIĄGNIĘCIE ODBLOKOWANE" })}
                      </i>
                      {L({ en: "Working with you", pl: "Praca z Tobą" })}
                    </span>
                  </span>
                  <span className={toast.hp()}>
                    <i className={toast.hpFill()} />
                  </span>
                </>
              )}
            </div>
            <ul className={b.sw()}>
              {m.swatches.map((c) => (
                <li key={c.hex} className={b.swItem()}>
                  <span className={b.swChip()} style={{ background: c.hex }} />
                  <b className="font-semibold">{L(c.name)}</b>
                  <code className={b.swCode()}>{c.hex}</code>
                </li>
              ))}
            </ul>
          </div>
          <p className={b.trend()}>{L(m.trend)}</p>
          <ul className={b.kw()}>
            {m.keywords.map((k) => (
              <li key={k.en} className={b.kwItem()}>
                {L(k)}
              </li>
            ))}
          </ul>
        </article>

        <div className="flex flex-col gap-6">
          <dl className={spec.dl()}>
            <div className={spec.row()}>
              <dt className={spec.dt()}>{L({ en: "Type", pl: "Typografia" })}</dt>
              <dd>{m.fonts.join(" · ")}</dd>
            </div>
            <div className={spec.row()}>
              <dt className={spec.dt()}>{L({ en: "Shape", pl: "Kształt" })}</dt>
              <dd>{L(m.shape)}</dd>
            </div>
            <div className={spec.row()}>
              <dt className={spec.dt()}>{L({ en: "Effects", pl: "Efekty" })}</dt>
              <dd>{L(m.effects)}</dd>
            </div>
          </dl>
          <div className={spec.notes()}>
            <span className={label()}>{L({ en: "Design notes", pl: "Notatki projektowe" })}</span>
            <ol className={spec.ol()}>
              {m.notes.map((x) => (
                <li key={x.en} className={spec.li()}>
                  {L(x)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function FrontEnd() {
  const { t, L } = useI18n();
  const s = sub();
  return (
    <section className={sec()} id="c-stack" data-nav-section>
      <SecHead
        n={4}
        label={t.frontEnd}
        title={L({ en: "Small stack, no UI library.", pl: "Mały stack, bez biblioteki UI." })}
      >
        <p className={headNote}>
          {L({
            en: "No component library: every component is hand-built with Tailwind and small tailwind-variants recipes, in TypeScript.",
            pl: "Bez biblioteki komponentów: każdy komponent jest zbudowany ręcznie w Tailwind z małymi przepisami tailwind-variants, w TypeScript.",
          })}
        </p>
      </SecHead>
      <ul
        className={
          "m-0 grid list-none grid-cols-4 gap-3 p-0 max-[599px]:grid-cols-2 " +
          // An odd last card fills the row when there are two columns.
          "max-[599px]:[&>li:last-child:nth-child(odd)]:col-span-2"
        }
      >
        {PF.stack.map((x) => (
          <li key={x.name} className={cn(card, "flex flex-col gap-1 p-4")}>
            <span className="display text-[17px]">{x.name}</span>
            <span className={bodyMuted()}>{L(x.note)}</span>
          </li>
        ))}
      </ul>
      <div className={s.root()}>
        <div className={s.head()}>
          <h3 className={s.title()}>{L({ en: "What it does", pl: "Co potrafi" })}</h3>
        </div>
        <div className="grid grid-cols-3 gap-[14px] max-[1199px]:grid-cols-2 max-[599px]:grid-cols-[minmax(0,1fr)]">
          {PF.features.map((f, i) => (
            <article
              key={f.k.en}
              className={cn(card, "flex flex-col gap-[10px] p-[clamp(20px,2.2vw,28px)]")}
            >
              <span className="font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                {pad(i + 1)} · {L(f.k)}
              </span>
              <h3 className="display m-0 text-[clamp(20px,1.7vw,26px)] leading-[1.15]">{L(f.t)}</h3>
              <p className={bodyMuted()}>{L(f.d)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
