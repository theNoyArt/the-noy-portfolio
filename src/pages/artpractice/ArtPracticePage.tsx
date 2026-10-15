import type { CSSProperties, ReactNode } from "react";
import { useApp } from "../../app/AppContext";
import { caseSections } from "../../app/sections";
import { AP } from "../../content/artpractice";
import { PERSON } from "../../content/person";
import type { ResolvedCase } from "../../lib/cases";
import { cn, tv } from "../../lib/cn";
import { useI18n } from "../../lib/i18n";
import { CaseMobileBar } from "../CaseMobileBar";
import {
  bodyMuted,
  btnRow,
  caseBtn,
  caseTitle,
  caseTitleSub,
  lead,
  metaRow,
  sec,
  secHead,
} from "../dtrpg/case-ui";
import { Closing } from "../dtrpg/Closing";
import {
  badge,
  cap,
  card,
  draft,
  headNote,
  insp,
  ov,
  pillars,
  secLabel,
  secTitle,
  stage,
  sub,
  tgRoot,
  tl,
  wipDot,
} from "../tamagotchi/tg-ui";

const pad = (n: number) => String(n).padStart(2, "0");

const EX_ICONS: Record<(typeof AP.exercises)[number]["id"], ReactNode> = {
  gesture: <path d="M5 19c3-6 5-12 8-14s5 3 2 7-6 6-3 8 5-1 7-3" />,
  pose: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M12 7v6m0 0-4 7m4-7 4 7M7 10l5-2 5 2" />
    </>
  ),
  anatomy: (
    <>
      <path d="M8 3c-2 0-3 2-2 4l2 3-1 11h2l1-8h4l1 8h2l-1-11 2-3c1-2 0-4-2-4" />
      <path d="M10 6h4" />
    </>
  ),
  colour: (
    <>
      <path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="15" cy="7.5" r="1" />
    </>
  ),
};

type ExId = (typeof AP.exercises)[number]["id"];

/* ---------------------------------------------------------------- page recipes */

/** A sketch of the app's "Today" screen. */
const phone = tv({
  slots: {
    root:
      "flex w-[min(100%,330px)] animate-tg-float-slow flex-col gap-4 rounded-[36px] border border-glass-edge bg-surface px-5 pt-[22px] pb-5 " +
      "shadow-[0_0_0_8px_color-mix(in_srgb,var(--ink)_6%,transparent),0_30px_60px_-24px_color-mix(in_srgb,var(--accent)_50%,transparent)] " +
      "cyber:rounded-none cyber:shadow-[inset_0_0_0_1px_var(--line-2),0_0_50px_-14px_color-mix(in_srgb,var(--accent)_60%,transparent)]",
    top: "flex items-baseline justify-between font-display text-[26px] font-semibold",
    streak: "font-mono text-[13px] font-medium",
    goal: "flex flex-col gap-[6px] rounded-[16px] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] p-[14px] cyber:rounded-none",
    k: "font-mono text-[10px] tracking-[0.08em] text-muted uppercase",
    goalV: "text-[15px] font-bold",
    bar: "h-[6px] overflow-hidden rounded-full bg-line cyber:rounded-none",
    fill: "block h-full rounded-[inherit] bg-[linear-gradient(90deg,var(--accent),var(--tg-pink))]",
    plan: "m-0 flex list-none flex-col gap-2 p-0",
    item: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[10px] rounded-[14px] border border-line px-3 py-[10px] text-[14px] cyber:rounded-none",
    name: "",
    time: "font-mono text-[11px] text-muted",
    cta: "rounded-full bg-accent p-3 text-center font-bold text-accent-ink shadow-[0_10px_22px_-10px_color-mix(in_srgb,var(--accent)_70%,transparent)] cyber:rounded-none",
  },
  variants: { done: { true: { item: "opacity-60", name: "line-through" } } },
});

/** Exercise icon chip, tinted with the exercise colour (--c). */
const exIcon = tv({
  slots: {
    root: "grid h-8 w-8 place-items-center rounded-[10px] bg-[color-mix(in_srgb,var(--c)_18%,transparent)] text-[var(--c)] cyber:rounded-none",
    svg: "h-[18px] w-[18px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]",
  },
  variants: {
    size: { sm: {}, lg: { root: "h-10 w-10 rounded-[12px]", svg: "h-[22px] w-[22px]" } },
    ex: {
      gesture: { root: "[--c:#e86fc4]" },
      pose: { root: "[--c:#8a6cf0]" },
      anatomy: { root: "[--c:#e8a13a]" },
      colour: { root: "[--c:#2fbf9a]" },
    },
  },
  defaultVariants: { size: "sm" },
});

function ExIcon({ id, size }: { id: ExId; size?: "sm" | "lg" }) {
  const s = exIcon({ ex: id, size });
  return (
    <span className={s.root()} aria-hidden="true">
      <svg viewBox="0 0 24 24" className={s.svg()}>
        {EX_ICONS[id]}
      </svg>
    </span>
  );
}

/** Four cards in a row (two below 1200px, one below 600px). */
const grid4 =
  "m-0 grid list-none grid-cols-4 gap-[14px] p-0 max-[1199px]:grid-cols-2 max-[599px]:grid-cols-1";

/** Flow steps, with an arrow to the next one while they sit in one row. */
const flowStep =
  "flex animate-tg-in flex-col gap-2 p-5 " +
  "not-last:after:absolute not-last:after:top-[26px] not-last:after:-right-[13px] not-last:after:z-[1] not-last:after:text-[16px] not-last:after:text-accent not-last:after:content-arrow " +
  "max-[1199px]:after:hidden";

/** Lesson cards: links lift and take the accent on hover; the app card is tinted. */
const lesson = tv({
  slots: {
    root: "flex flex-col gap-2 p-5 [transition:transform_0.3s_cubic-bezier(0.2,0.8,0.2,1),border-color_0.3s]",
    k: "font-mono text-[11px] tracking-[0.08em] text-accent uppercase",
    t: "display text-[20px]",
  },
  variants: {
    kind: {
      link: { root: "hover:[transform:translateY(-3px)] hover:border-accent" },
      app: {
        root: "bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface))] cyber:border-[color-mix(in_srgb,var(--accent)_55%,transparent)]",
      },
    },
  },
});
const lessonArrow =
  "self-center text-[22px] text-accent max-[1199px]:justify-self-center max-[1199px]:[transform:rotate(90deg)]";

/** Research group colours. */
const GROUP_GC = ["[--gc:#e86fc4]", "[--gc:#e8a13a]", "[--gc:var(--accent-2)]"];

/** Art practice assistant: research & design stage, a first sketch of the project page. */
export function ArtPracticePage({ c }: { c: ResolvedCase }) {
  const { t } = useI18n();
  const app = useApp();
  return (
    <article className={tgRoot}>
      {app.narrow && <CaseMobileBar c={c} sections={caseSections(c, t)} />}
      <Overview />
      <Idea />
      <HowItWorks />
      <Lessons />
      <Research />
      <Roadmap />
      <Closing c={c} />
    </article>
  );
}

function SecHead({
  n,
  label,
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
      <span className={secLabel}>
        [{pad(n)}] {label}
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
  const st = stage();
  return (
    <section className={sec({ first: true })} id="c-overview" data-nav-section>
      <div className={meta.root()}>
        <span className={meta.first()}>[01] {L({ en: "Overview", pl: "Przegląd" })}</span>
        <span>{L(AP.meta.kind)}</span>
        <span className="inline-flex items-center gap-2">
          <span className={wipDot} aria-hidden="true" />
          {L(AP.meta.origin)}
        </span>
      </div>
      <div className={ov.root}>
        <div className={ov.text}>
          <h1 className={cn(caseTitle, ov.title)}>
            {L(AP.title)}
            <span className={caseTitleSub}>.</span>
          </h1>
          <div className={ov.headline}>
            <p className={ov.subtitle}>{L(AP.sub)}</p>
            <div className={st.root()} role="status">
              <span className={st.dot()} aria-hidden="true" />
              <span className={st.k()}>{L({ en: "Current stage", pl: "Obecny etap" })}</span>
              <span className={st.v()}>
                {L({ en: "Research & design", pl: "Badania i projektowanie" })}
              </span>
              <span className={st.steps()} aria-hidden="true">
                <i className={st.step({ on: true })} />
                <i className={st.step()} />
                <i className={st.step()} />
                <i className={st.step()} />
              </span>
            </div>
          </div>
          <p className={lead}>{L(AP.lead)}</p>
          <div className={btnRow}>
            <button
              type="button"
              className={caseBtn({ variant: "primary" })}
              onClick={() => app.scrollToCaseSection("roadmap")}
            >
              {L({ en: "See next steps ↓", pl: "Zobacz kolejne kroki ↓" })}
            </button>
          </div>
        </div>
        <TodayMock />
      </div>
    </section>
  );
}

/** A sketch of the app's "Today" screen. Placeholder UI, not a final design. */
function TodayMock() {
  const { L } = useI18n();
  const plan = [
    { ex: AP.exercises[0], time: "10 min", done: true },
    { ex: AP.exercises[2], time: "15 min", done: false },
    { ex: AP.exercises[3], time: "10 min", done: false },
  ];
  const s = phone();
  return (
    <div className={ov.aside}>
      <div className={s.root()} aria-hidden="true">
        <div className={s.top()}>
          <span>{L({ en: "Today", pl: "Dzisiaj" })}</span>
          <span className={s.streak()}>🔥 6</span>
        </div>
        <div className={s.goal()}>
          <span className={s.k()}>{L({ en: "Goal", pl: "Cel" })}</span>
          <span className={s.goalV()}>
            {L({ en: "Draw people with confidence", pl: "Pewnie rysować ludzi" })}
          </span>
          <span className={s.bar()}>
            <span className={s.fill()} style={{ width: "34%" }} />
          </span>
          <span className={s.k()}>{L({ en: "Week 2 of 6", pl: "Tydzień 2 z 6" })}</span>
        </div>
        <ul className={s.plan()}>
          {plan.map((p) => (
            <li key={p.ex.id} className={s.item({ done: p.done })}>
              <ExIcon id={p.ex.id} />
              <span className={s.name({ done: p.done })}>{L(p.ex.name)}</span>
              <span className={s.time()}>{p.done ? "✓" : p.time}</span>
            </li>
          ))}
        </ul>
        <span className={s.cta()}>{L({ en: "Start session", pl: "Zacznij sesję" })} ▸</span>
      </div>
      <span className={cap}>
        {L({
          en: "UI sketch · final design in progress",
          pl: "Szkic UI · finalny projekt w trakcie",
        })}
      </span>
    </div>
  );
}

function Idea() {
  const { t, L } = useI18n();
  const pl = pillars();
  return (
    <section className={sec()} id="c-idea" data-nav-section>
      <SecHead
        n={2}
        label={t.tgIdea}
        title={L({ en: "Practice with a plan.", pl: "Praktyka z planem." })}
      />
      <div className={pl.root()}>
        {AP.pillars.map((p, i) => (
          <article
            key={p.k.en}
            className={card({ class: pl.item() })}
            style={{ "--i": i } as CSSProperties}
          >
            <span className={pl.k()}>
              {pad(i + 1)} · {L(p.k)}
            </span>
            <h3 className={pl.title()}>{L(p.title)}</h3>
            <p className={bodyMuted()}>{L(p.desc)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t, L } = useI18n();
  return (
    <section className={sec()} id="c-flow" data-nav-section>
      <SecHead
        n={3}
        label={t.apFlow}
        title={L({ en: "Goal, plan, practice, repeat.", pl: "Cel, plan, praktyka, powtórka." })}
      />
      <ol className={grid4}>
        {AP.flow.map((f, i) => (
          <li
            key={f.t.en}
            className={card({ class: flowStep })}
            style={{ "--i": i } as CSSProperties}
          >
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-accent font-mono text-[13px] font-semibold text-accent-ink cyber:rounded-none">
              {i + 1}
            </span>
            <h3 className="display m-0 text-[20px]">{L(f.t)}</h3>
            <p className={bodyMuted()}>{L(f.d)}</p>
          </li>
        ))}
      </ol>
      <div className={sub.root}>
        <div className={sub.head}>
          <h3 className={sub.title}>{L({ en: "Exercise types", pl: "Rodzaje ćwiczeń" })}</h3>
          <span className={draft}>
            {L({ en: "First set · more to come", pl: "Pierwszy zestaw · będzie więcej" })}
          </span>
        </div>
        <ul className={grid4}>
          {AP.exercises.map((e) => (
            <li key={e.id} className={card({ class: "flex flex-col gap-2 px-5 py-[18px]" })}>
              <ExIcon id={e.id} size="lg" />
              <span className="display text-[18px]">{L(e.name)}</span>
              <span className={bodyMuted()}>{L(e.ex)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Lessons() {
  const { t, L } = useI18n();
  const yt =
    PERSON.links.find((l) => /youtube/i.test(l.url))?.url ?? "https://www.youtube.com/@thenoyart";
  const tw = "https://www.twitch.tv/thenoyart/about";
  const link = lesson({ kind: "link" });
  const app = lesson({ kind: "app" });
  return (
    <section className={sec()} id="c-lessons" data-nav-section>
      <SecHead
        n={4}
        label={t.apLessons}
        title={L({
          en: "Watch a lesson, then practise it.",
          pl: "Obejrzyj lekcję, potem ją przećwicz.",
        })}
      />
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.2fr)] items-stretch gap-[14px] max-[1199px]:grid-cols-1">
        <a
          className={card({ class: link.root() })}
          href={tw}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={link.k()}>Twitch ↗</span>
          <span className={link.t()}>
            {L({ en: "Live drawing streams", pl: "Streamy z rysowania" })}
          </span>
          <span className={bodyMuted()}>
            {L({
              en: "Practise together during the stream.",
              pl: "Ćwiczymy razem w trakcie streamu.",
            })}
          </span>
        </a>
        <span className={lessonArrow} aria-hidden="true">
          →
        </span>
        <a
          className={card({ class: link.root() })}
          href={yt}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={link.k()}>YouTube ↗</span>
          <span className={link.t()}>{L({ en: "Video tutorials", pl: "Tutoriale wideo" })}</span>
          <span className={bodyMuted()}>
            {L({
              en: "Planned: lessons on theNoyArt channel.",
              pl: "W planach: lekcje na kanale theNoyArt.",
            })}
          </span>
        </a>
        <span className={lessonArrow} aria-hidden="true">
          →
        </span>
        <div className={card({ class: app.root() })}>
          <span className={app.k()}>{L({ en: "The app", pl: "Aplikacja" })}</span>
          <span className={app.t()}>
            {L({ en: "Exercises between lessons", pl: "Ćwiczenia między lekcjami" })}
          </span>
          <span className={bodyMuted()}>
            {L({
              en: "Each lesson unlocks a set of exercises to keep practising until the next one.",
              pl: "Każda lekcja odblokowuje zestaw ćwiczeń na czas do następnej.",
            })}
          </span>
        </div>
      </div>
    </section>
  );
}

function Research() {
  const { t, L } = useI18n();
  const s = insp();
  return (
    <section className={sec()} id="c-explore" data-nav-section>
      <SecHead
        n={5}
        label={t.apResearch}
        title={L({ en: "What I’m looking into.", pl: "Co sprawdzam." })}
      >
        <p className={bodyMuted({ class: headNote })}>
          {L({
            en: "Starting points for research, not final choices.",
            pl: "Punkty startowe do badań, nie ostateczne wybory.",
          })}
        </p>
      </SecHead>
      <div className={s.groups()}>
        {AP.research.map((g, gi) => (
          <div key={g.g.en} className={s.group({ class: GROUP_GC[gi] })}>
            <span className={s.k()}>{L(g.g)}</span>
            <ul className={s.list()}>
              {g.items.map((x) => (
                <li key={x.name} className={s.li()}>
                  <a
                    className={card({ class: s.item() })}
                    href={x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={s.name()}>{x.name}</span>
                    <span className={s.take()}>{L(x.note)}</span>
                    <span className={s.src()}>
                      {new URL(x.url).hostname.replace(/^www\./, "")}{" "}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Roadmap() {
  const { t, L } = useI18n();
  return (
    <section className={sec()} id="c-roadmap" data-nav-section>
      <SecHead n={6} label={t.tgRoadmap} title={L({ en: "Next steps.", pl: "Kolejne kroki." })}>
        <p className={bodyMuted({ class: headNote })}>
          {L({
            en: "A rough plan for now; details will follow as research goes on.",
            pl: "Na razie ogólny plan; szczegóły pojawią się wraz z badaniami.",
          })}
        </p>
      </SecHead>
      <ol className={tl().root()}>
        {AP.roadmap.map((p, i) => {
          const s = tl({ status: p.status });
          return (
            <li key={p.title.en} className={s.item()} style={{ "--i": i } as CSSProperties}>
              <span
                className={s.node({ class: "font-mono text-[13px] font-semibold" })}
                aria-hidden="true"
              >
                {pad(i + 1)}
              </span>
              <div className={card({ class: s.card() })}>
                <div className="flex items-center justify-between gap-3">
                  <span className={s.title()}>{L(p.title)}</span>
                  <span className={badge({ status: p.status })}>
                    {L(
                      p.status === "active"
                        ? { en: "In progress", pl: "W trakcie" }
                        : { en: "Next", pl: "Dalej" },
                    )}
                  </span>
                </div>
                <ul className="m-0 flex list-none flex-wrap gap-x-2 gap-y-[6px] p-0">
                  {p.points.map((x) => (
                    <li
                      key={x.en}
                      className={cn(
                        "rounded-full border border-line-2 px-[11px] py-1 text-[13.5px] cyber:rounded-none",
                        p.status === "planned" && "border-dashed text-muted",
                      )}
                    >
                      {L(x)}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
