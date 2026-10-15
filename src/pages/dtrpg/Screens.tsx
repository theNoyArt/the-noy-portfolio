import { useEffect, useRef, useState } from "react";
import { useApp } from "../../app/AppContext";
import { MOCKUPS } from "../../content/dtrpg/mockups";
import { DT_IMG, DT_LINKS } from "../../content/dtrpg/project";
import type { Note, Step } from "../../content/dtrpg/types";
import { WIREFRAMES } from "../../content/dtrpg/wireframes";
import { cn, tv } from "../../lib/cn";
import {
  bodyMuted,
  caseBtn,
  controls,
  label,
  notes as notesCls,
  sec,
  secHead,
  secLink,
  secTitle,
  steps as stepsCls,
  twoCol,
  wfRow,
} from "./case-ui";
import { useTr } from "./tr";
import { Chip, Ext, Preview, ReportToggle, Seg, pad } from "./ui";

type View = "desktop" | "mobile";
type Theme = "light" | "dark";

const chips = "flex flex-wrap gap-[6px]";
const viewer = "flex flex-col gap-[clamp(20px,2.4vw,28px)]";

/** Card thumbnail background: stripes until the image loads, or the mockup theme's page colour. */
const CARD_IMG_BG = {
  stripes: "bg-[repeating-linear-gradient(90deg,var(--ph-a)_0_3px,var(--ph-b)_3px_9px)]",
  light: "bg-[#f6f5f3]",
  dark: "bg-[#0f0f12]",
};

/** The screen-by-screen viewer: one frame with its title, controls and notes. */
const screen = tv({
  slots: {
    root: "glass-blur flex scroll-mt-6 flex-col gap-5 rounded-card border border-glass-edge bg-surface p-[clamp(16px,2.4vw,28px)] shadow-glass max-[899px]:scroll-mt-[130px]",
    head: "flex flex-wrap items-end justify-between gap-x-6 gap-y-3",
    titles: "flex flex-col gap-[6px]",
    name: "case-heading text-[clamp(30px,3vw,46px)] leading-none",
  },
});

/** Opens a collapsible viewer and scrolls to it once it has rendered. */
function useViewer() {
  const { reduced } = useApp();
  const [open, setOpen] = useState(false);
  const [jump, setJump] = useState(0);
  const screen = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (jump)
      screen.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on a new jump request
  }, [jump]);
  const openAndScroll = () => {
    setOpen(true);
    setJump((n) => n + 1);
  };
  return { open, setOpen, screen, openAndScroll };
}

/** Every screen at a glance; a card opens the detailed viewer on that screen. */
function Cards({
  label,
  items,
  onPick,
}: {
  label: string;
  items: {
    key: string;
    src: string;
    title: string;
    meta: string;
    aria: string;
    bg?: keyof typeof CARD_IMG_BG;
  }[];
  onPick: (key: string) => void;
}) {
  return (
    <ol
      className="grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-3 p-0"
      aria-label={label}
    >
      {items.map((x, i) => (
        <li key={x.key}>
          <button
            type="button"
            className={
              "glass-blur flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-card border border-glass-edge bg-surface p-0 text-left text-ink shadow-glass " +
              "[transition:border-color_0.2s,transform_0.2s] hover:border-accent hover:[transform:translateY(-2px)] " +
              "motion-reduce:transition-none motion-reduce:hover:transform-none"
            }
            aria-label={x.aria}
            onClick={() => onPick(x.key)}
          >
            <span
              className={cn(
                "block aspect-[480/340] overflow-hidden border-b border-line",
                CARD_IMG_BG[x.bg ?? "stripes"],
              )}
            >
              <img
                className="block h-full w-full max-w-full object-cover object-top"
                src={x.src}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              />
            </span>
            <span className="flex flex-col gap-[3px] px-3 pt-[10px] pb-3">
              <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
              <span className="text-[15px] font-semibold">{x.title}</span>
              <span className="text-[12.5px] text-muted">{x.meta}</span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

function ScreenTabs({
  items,
  current,
  onPick,
}: {
  items: { id: string; label: string }[];
  current: string;
  onPick: (id: string) => void;
}) {
  const { tr } = useTr();
  return (
    <div className={chips} role="group" aria-label={tr("Choose a screen")}>
      {items.map((w, i) => (
        <Chip key={w.id} pressed={w.id === current} onClick={() => onPick(w.id)} lead={pad(i + 1)}>
          {w.label}
        </Chip>
      ))}
    </div>
  );
}

function Steps({ items, mobile }: { items: Step[]; mobile?: boolean }) {
  const c = stepsCls({ mobile });
  return (
    <ol className={c.root()}>
      {items.map((s) => (
        <li key={s.n} className={c.item()}>
          <span className={c.n()}>{s.n}</span>
          <span>
            <span className={c.title()}>{s.t}</span>
            {s.d && <span className={c.desc()}>{s.d}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Notes({ items, extra }: { items: Note[]; extra?: boolean }) {
  const { tr } = useTr();
  const c = notesCls({ extra });
  return (
    <ul className={c.root()}>
      {items.map((n, i) => (
        <li key={i} className={c.item()}>
          {n.state ? <span className={c.tag()}>{tr("Signed in")}</span> : null}
          <b className={c.title()}>{n.t}</b>
          <span className={c.desc()}>{n.d}</span>
        </li>
      ))}
    </ul>
  );
}

function stateLabel(name: string, i: number) {
  if (i === 0) return "Default";
  return name
    .replace(/^\d+b-[a-z]+-/, "")
    .replace(/-desktop$/, "")
    .replace(/-/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

/* ---------------------------------------------------------------- wireframes */

export function Wireframes() {
  const { tr, f } = useTr();
  const v = useViewer();
  const [id, setId] = useState(WIREFRAMES[0].id);
  const [state, setState] = useState(0);
  const [view, setView] = useState<View>("desktop");

  const cur = WIREFRAMES.find((w) => w.id === id) ?? WIREFRAMES[0];
  const idx = WIREFRAMES.indexOf(cur);
  const isDesk = view === "desktop";
  const stateIdx = Math.min(state, cur.dimgs.length - 1);
  const dimg = cur.dimgs[stateIdx];
  const pick = (next: string) => {
    setId(next);
    setState(0);
  };
  const sc = screen();
  // A wide mobile frame (a board of several phones) keeps the desktop proportions.
  const row = wfRow({ layout: isDesk ? "desktop" : cur.mimg.w > 600 ? "board" : "mobile" });

  return (
    <section className={sec()} id="c-wireframes" data-nav-section>
      <div className={secHead}>
        <span className={label({ tone: "accent", star: true })}>{tr("[03] Wireframes")}</span>
        <Ext className={secLink} href={DT_LINKS.wireframes}>
          {tr("All wireframes in Figma ↗")}
        </Ext>
      </div>
      <div className={twoCol({ end: true })}>
        <h2 className={secTitle}>
          {tr("From audit findings to a new structure, screen by screen.")}
        </h2>
        <p className={bodyMuted()}>
          {tr(
            "Based on the UX audit and research findings, the wireframes were generated iteratively with Claude. They aren’t final: they show the proposed structure and explore layout and component ideas for the final mockups.",
          )}
        </p>
      </div>
      <Cards
        label={tr("Wireframes")}
        items={WIREFRAMES.map((w) => ({
          key: w.id,
          src: `${DT_IMG}/wireframes/thumbs/${w.dimgs[0].name}.webp`,
          title: w.label,
          meta:
            f.notes(w.desktop.length + w.mobile.length) +
            (w.dimgs.length > 1 ? " · " + f.states(w.dimgs.length) : ""),
          aria: f.openCard(w.label, "wireframe"),
        }))}
        onPick={(k) => {
          pick(k);
          v.openAndScroll();
        }}
      />
      <ReportToggle
        open={v.open}
        onToggle={() => v.setOpen(!v.open)}
        controls="wf-detail"
        label={tr(v.open ? "Hide the screen-by-screen view" : "Explore screen by screen")}
        hint={tr("Desktop and mobile wireframes with numbered notes and links to Figma")}
      />
      {v.open && (
        <div className={viewer} id="wf-detail">
          <ScreenTabs items={WIREFRAMES} current={cur.id} onPick={pick} />
          <div className={sc.root()} ref={v.screen}>
            <div className={sc.head()}>
              <div className={sc.titles()}>
                <span className={label()}>{f.screen(pad(idx + 1), pad(WIREFRAMES.length))}</span>
                <span className={sc.name()}>{cur.label}</span>
                {cur.insp && <span className="text-muted">{cur.insp}</span>}
              </div>
              <Ext className={caseBtn()} href={cur.url}>
                {f.openInFigma(cur.label)}
              </Ext>
            </div>
            <div className={controls}>
              <Seg
                label={tr("Wireframes")}
                value={view}
                onChange={setView}
                options={[
                  { id: "desktop", label: tr("Desktop") },
                  { id: "mobile", label: tr("Mobile") },
                ]}
              />
              {isDesk && cur.dimgs.length > 1 && (
                <div className={chips} role="group" aria-label={tr("Desktop state")}>
                  <span className={label()}>{tr("Desktop state")}</span>
                  {cur.dimgs.map((d, i) => (
                    <Chip key={d.name} pressed={i === stateIdx} onClick={() => setState(i)} pill>
                      {tr(stateLabel(d.name, i))}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
            {isDesk ? (
              <div className={row.root()}>
                <Preview
                  className={row.preview()}
                  kind={tr("Desktop")}
                  caption={`${dimg.name}.webp · ${dimg.w}×${dimg.h}`}
                  shot={{
                    img: dimg,
                    dir: "wireframes/",
                    ext: ".webp",
                    alt: f.wireAlt(cur.label, "desktop"),
                  }}
                />
                <div className={row.side()}>
                  <p className={label({ class: row.sideLabel() })}>
                    {tr("Desktop · numbered on the wireframe")}
                  </p>
                  <Steps items={cur.desktop} />
                </div>
              </div>
            ) : (
              <div className={row.root()}>
                <Preview
                  className={row.preview()}
                  kind={tr("Mobile")}
                  caption={`${cur.mimg.name}.webp · ${cur.mimg.w}×${cur.mimg.h}`}
                  shot={{
                    img: cur.mimg,
                    dir: "wireframes/",
                    ext: ".webp",
                    alt: f.wireAlt(cur.label, "mobile"),
                  }}
                />
                <div className={row.side()}>
                  <p className={label({ class: row.sideLabel() })}>
                    {tr("Mobile · numbered on the wireframe")}
                  </p>
                  {cur.mobile.length ? (
                    <Steps items={cur.mobile} mobile />
                  ) : (
                    <p className="border-t border-line pt-3 text-[14px] text-muted">
                      {tr("Same structure as desktop, stacked into one column.")}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- mockups */

export function Mockups() {
  const { tr, f } = useTr();
  const app = useApp();
  const v = useViewer();
  const [id, setId] = useState(MOCKUPS[0].id);
  const [state, setState] = useState(0);
  const [view, setView] = useState<View>("desktop");
  // Follows the page theme (Glass light → light mockups, Cyber dark → dark); the switch still compares.
  const [theme, setTheme] = useState<Theme>(app.theme);
  useEffect(() => setTheme(app.theme), [app.theme]);

  const cur = MOCKUPS.find((m) => m.id === id) ?? MOCKUPS[0];
  const idx = MOCKUPS.indexOf(cur);
  const isDesk = view === "desktop";
  const light = theme === "light";
  const list = isDesk ? cur.desktop : cur.mobile;
  const stateIdx = Math.min(state, list.length - 1);
  const img = list[stateIdx];

  let notes = isDesk ? cur.dnotes : cur.mnotes;
  if (isDesk) {
    const signedIn = /signed in/i.test(img.label);
    notes = notes.filter((n) => !n.state || signedIn);
    notes = [...notes.filter((n) => n.state), ...notes.filter((n) => !n.state)];
  }
  const pick = (next: string) => {
    setId(next);
    setState(0);
  };
  const sc = screen();
  const row = wfRow({ layout: isDesk ? "desktop" : "single" });

  return (
    <section className={sec()} id="c-mockups" data-nav-section>
      <div className={secHead}>
        <span className={label({ tone: "accent", star: true })}>
          {tr("[05] Mockups · light and dark")}
        </span>
        <span className="inline-flex flex-wrap gap-x-4 gap-y-[6px]">
          <Ext className={secLink} href={DT_LINKS.mockupsLight}>
            {tr("Light theme in Figma ↗")}
          </Ext>
          <Ext className={secLink} href={DT_LINKS.mockupsDark}>
            {tr("Dark theme in Figma ↗")}
          </Ext>
        </span>
      </div>
      <div className={twoCol({ end: true })}>
        <h2 className={secTitle}>
          {tr(
            "Twelve screens, designed for desktop and mobile, with the reasoning next to each one.",
          )}
        </h2>
        <p className={bodyMuted()}>
          {tr(
            "The final mockups apply the design system to every screen from the wireframes, in both the light and the dark theme. Each one comes with the notes written next to it in Figma: why a block sits where it does, how it adapts on mobile, and the states the mockups don’t show yet.",
          )}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className={label()} id="lbl-mk-theme">
          {tr("Theme")}
        </span>
        <Seg
          labelledBy="lbl-mk-theme"
          value={theme}
          onChange={setTheme}
          options={[
            { id: "light", label: tr("Light") },
            { id: "dark", label: tr("Dark") },
          ]}
        />
      </div>
      <Cards
        label={tr("Mockups")}
        items={MOCKUPS.map((m) => ({
          key: m.id,
          src: `${DT_IMG}/mockups/${light ? "light/" : ""}thumbs/${m.id}.webp`,
          title: m.label,
          meta:
            f.frames(m.desktop.length + m.mobile.length) +
            " · " +
            f.notes(m.dnotes.length + m.mnotes.length),
          aria: f.openCard(m.label, "mockup"),
          bg: light ? "light" : "dark",
        }))}
        onPick={(k) => {
          pick(k);
          v.openAndScroll();
        }}
      />
      <ReportToggle
        open={v.open}
        onToggle={() => v.setOpen(!v.open)}
        controls="mk-detail"
        label={tr(v.open ? "Hide the screen-by-screen view" : "Explore screen by screen")}
        hint={tr(
          "Full-size desktop and mobile mockups, every state, with the design notes from Figma",
        )}
      />
      {v.open && (
        <div className={viewer} id="mk-detail">
          <ScreenTabs items={MOCKUPS} current={cur.id} onPick={pick} />
          <div className={sc.root()} ref={v.screen}>
            <div className={sc.head()}>
              <div className={sc.titles()}>
                <span className={label()}>{f.screen(pad(idx + 1), pad(MOCKUPS.length))}</span>
                <span className={sc.name()}>{cur.label}</span>
                {cur.sub && <span className="text-muted">{cur.sub}</span>}
              </div>
              <Ext className={caseBtn()} href={cur.url}>
                {f.openInFigma(cur.label)}
              </Ext>
            </div>
            <div className={controls}>
              <Seg
                label={tr("Mockups")}
                value={view}
                onChange={(next) => {
                  setView(next);
                  setState(0);
                }}
                options={[
                  { id: "desktop", label: tr("Desktop") },
                  { id: "mobile", label: tr("Mobile") },
                ]}
              />
              {list.length > 1 && (
                <div className={chips} role="group" aria-label={tr("State")}>
                  <span className={label()}>{tr("State")}</span>
                  {list.map((s, i) => (
                    <Chip key={s.name} pressed={i === stateIdx} onClick={() => setState(i)} pill>
                      {tr(s.label)}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
            <div className={row.root()}>
              <Preview
                className={row.preview()}
                kind={tr(isDesk ? "Desktop" : "Mobile")}
                caption={`${light ? "light/" : ""}${img.name}.webp · ${img.w}×${img.h}`}
                shot={{
                  img,
                  dir: light ? "mockups/light/" : "mockups/",
                  ext: ".webp",
                  alt:
                    f.mockAlt(cur.label, view, theme === "dark") +
                    (list.length > 1 ? ", " + tr(img.label) : ""),
                  className: light ? "bg-none bg-[#f6f5f3]" : "bg-none bg-[#0f0f12]",
                }}
              />
              <div className={row.side()}>
                <p className={label({ class: row.sideLabel() })}>
                  {tr(isDesk ? "Desktop · design notes" : "Mobile · design notes")}
                </p>
                <Notes items={notes} />
                {cur.extra.length > 0 && (
                  <div className="glass-blur mt-5 rounded-card border border-dashed border-line-2 px-4 py-[14px]">
                    <p className={label()}>{tr("Not in the mockup yet")}</p>
                    <Notes items={cur.extra} extra />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
