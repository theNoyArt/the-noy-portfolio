import { useState } from "react";
import { useApp } from "../app/AppContext";
import { caseSections, type CaseSection } from "../app/sections";
import { PERSON } from "../content/person";
import type { CaseMetrics, IssueStatus, Severity } from "../content/types";
import { nextCase, type ResolvedCase } from "../lib/cases";
import { useI18n } from "../lib/i18n";
import { DEFAULT_FUNNEL_STEPS } from "../lib/placeholderMetrics";
import { imageBg, stripes } from "../lib/visual";
import "./case.css";

export function CaseStudyPage({ c }: { c: ResolvedCase }) {
  const { t } = useI18n();
  const app = useApp();
  const sections = caseSections(c, t);
  const num = (id: CaseSection["id"]) => sections.find((s) => s.id === id)?.num ?? "";
  const uxNums = sections.filter((s) => s.track === "ux").map((s) => s.num);
  const { audit, tests, analytics } = c.metricsResolved;

  return (
    <article className="case">
      {app.narrow && <CaseMobileBar c={c} sections={sections} />}
      <Overview c={c} n={num("overview")} />
      <Context c={c} n={num("context")} />

      <div className="track-band">
        <div className="track-band__label track-band__label--ux">
          <span>{t.designTrack}</span>
          <span className="track-band__rule" />
          <span>
            {uxNums[0]} — {uxNums[uxNums.length - 1]}
          </span>
        </div>
        <Research c={c} n={num("research")} />
        {audit && <Audit c={c} audit={audit} n={num("audit")} />}
        <Design c={c} n={num("design")} />
      </div>

      <div className="dev-band">
        <div className="track-band__label track-band__label--dev">
          <span>{t.buildTrack}</span>
          <span className="track-band__rule" />
          <span>{num("build")}</span>
        </div>
        <Build c={c} n={num("build")} />
      </div>

      <Outcome c={c} n={num("outcome")} />
      <Testing c={c} n={num("testing")} tests={tests} analytics={analytics} />
    </article>
  );
}

function SectionLabel({
  n,
  label,
  accent,
}: {
  n: string;
  label: string;
  accent?: "accent" | "dev";
}) {
  return (
    <span
      className={
        "mono-label" +
        (accent === "accent" ? " mono-label--accent" : accent === "dev" ? " mono-label--dev" : "")
      }
    >
      [{n}] {label}
    </span>
  );
}

function PlaceholderBadge({ show }: { show: boolean }) {
  const { t } = useI18n();
  if (!show) return null;
  return (
    <span className="ph-badge" title="Replace with real data in src/content">
      {t.placeholder}
    </span>
  );
}

/* ---------------------------------------------------------------- mobile bar */

export function CaseMobileBar({ c, sections }: { c: ResolvedCase; sections: CaseSection[] }) {
  const { t } = useI18n();
  const app = useApp();
  const [open, setOpen] = useState(false);
  const ci = Math.max(
    0,
    sections.findIndex((s) => s.dom === app.activeCaseSection),
  );
  const cur = sections[ci];
  return (
    <div className="case-bar">
      <div className="case-bar__row">
        <button
          type="button"
          className="icon-btn icon-btn--sm"
          aria-label={c.group === "show" ? t.backShow : t.backExp}
          onClick={() => app.goSection(c.group === "show" ? "showcase" : "experience")}
        >
          ←
        </button>
        <button
          type="button"
          className="case-bar__toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="case-bar__cur">
            <span className="case-bar__num">
              {cur.num}/{String(sections.length).padStart(2, "0")}
            </span>
            <span className="case-bar__label">{cur.label}</span>
          </span>
          <span className="case-bar__caret">
            {t.sections} {open ? "▴" : "▾"}
          </span>
        </button>
      </div>
      <div className="case-bar__progress">
        <div style={{ width: ((ci + 1) / sections.length) * 100 + "%" }} />
      </div>
      {open && (
        <div className="case-bar__menu">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className={"case-bar__item" + (s.dom === app.activeCaseSection ? " is-active" : "")}
              onClick={() => {
                setOpen(false);
                app.scrollToCaseSection(s.id);
              }}
            >
              <span className="case-bar__item-num">{s.num}</span>
              <span className="case-bar__item-label">{s.label}</span>
              <span
                className={"track-dot" + (s.track ? " track-dot--" + s.track : "")}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ sections */

function Overview({ c, n }: { c: ResolvedCase; n: string }) {
  const { t, L } = useI18n();
  const app = useApp();
  const meta = [
    { k: t.mRole, v: L(c.role) },
    { k: t.mTeam, v: L(c.team) },
    { k: t.mDuration, v: L(c.duration) },
    { k: t.mTools, v: c.tools },
    { k: t.mTech, v: c.tech.join(", ") },
  ];
  const live = c.links?.live;
  const source = c.links?.source;
  return (
    <section id="c-overview" data-nav-section className="case-sec case-sec--first">
      <div className="case-meta-row">
        <span>
          [{n}] {t.overview}
        </span>
        <span>{L(c.category)}</span>
        <span>
          {c.company ?? L(c.origin)} · {c.year}
        </span>
      </div>
      <h1 className="case-title display flicker">
        {c.name}
        {!c.name.endsWith(".") && <span className="accent">.</span>}
      </h1>
      <div className="grid-auto grid-auto--360">
        <div className="stack-24">
          <p className="case-intro">{L(c.intro)}</p>
          {(live || source) && (
            <div className="row-wrap">
              {live && (
                <a className="btn-accent" href={live} target="_blank" rel="noopener noreferrer">
                  <span className="btn-accent__dot" aria-hidden="true" />
                  {t.liveDemo}
                </a>
              )}
              {source && (
                <a className="btn-outline" href={source} target="_blank" rel="noopener noreferrer">
                  <span className="mono-sm">&lt;/&gt;</span>GitHub ↗
                </a>
              )}
            </div>
          )}
        </div>
        <dl className="kv">
          {meta.map((m) => (
            <div key={m.k} className="kv__row">
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="case-hero">
        <div
          className="case-hero__img"
          style={imageBg(c.images?.hero, stripes(c.hue, app.theme, 11))}
        />
        {!c.images?.hero && <div className="case-hero__ph">hero · final product</div>}
      </div>
    </section>
  );
}

function Context({ c, n }: { c: ResolvedCase; n: string }) {
  const { t, L } = useI18n();
  const rows = [
    { k: t.product, v: L(c.product) },
    { k: t.audience, v: L(c.audience) },
    { k: t.myResp, v: L(c.resp) },
  ];
  return (
    <section id="c-context" data-nav-section className="case-sec case-sec--border">
      <SectionLabel n={n} label={t.context} />
      <h2 data-reveal="0" className="case-h2 display">
        {L(c.problem)}
      </h2>
      <dl className="rows">
        {rows.map((r) => (
          <div key={r.k} data-reveal="0" className="rows__row">
            <dt>{r.k}</dt>
            <dd>{r.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Decisions({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ol className="decisions">
      {items.map((x, i) => (
        <li key={i} data-reveal="0" className="decisions__row">
          <span className="decisions__n">0{i + 1}</span>
          <span className="decisions__t">{x.t}</span>
          <span className="decisions__d">{x.d}</span>
        </li>
      ))}
    </ol>
  );
}

function ImageSlot({
  src,
  label,
  className,
}: {
  src?: string | null;
  label: string;
  className: string;
}) {
  return (
    <div
      className={className + (src ? " has-img" : "")}
      style={src ? { backgroundImage: `url("${src}")` } : undefined}
      role={src ? "img" : undefined}
      aria-label={src ? label : undefined}
    >
      {!src && label}
    </div>
  );
}

function Research({ c, n }: { c: ResolvedCase; n: string }) {
  const { t, L } = useI18n();
  const img = c.images ?? {};
  const artifacts = [
    { label: t.flows, src: img.flows },
    { label: t.ia, src: img.ia },
    { label: t.wire, src: img.wireframes },
  ];
  return (
    <section id="c-research" data-nav-section className="case-sec">
      <SectionLabel n={n} label={t.uxr} accent="accent" />
      <p data-reveal="0" className="case-quote">
        “{L(c.research)}”
      </p>
      <div className="grid-auto grid-auto--220 gap-12">
        {artifacts.map((a, i) => (
          <figure key={a.label} data-reveal={i * 80} className="artifact">
            <ImageSlot src={a.src} label={a.label} className="ph ph--43" />
            <figcaption>{a.label}</figcaption>
          </figure>
        ))}
      </div>
      <Decisions items={c.ux.map((x) => ({ t: L(x.t), d: L(x.d) }))} />
    </section>
  );
}

const SEV: Severity[] = ["high", "medium", "low"];

function SevTag({ s }: { s: Severity }) {
  const { t } = useI18n();
  return <span className={"sev sev--" + s}>{t[s]}</span>;
}

function Audit({
  c,
  audit,
  n,
}: {
  c: ResolvedCase;
  audit: NonNullable<CaseMetrics["audit"]>;
  n: string;
}) {
  const { t, L } = useI18n();
  const app = useApp();
  const [open, setOpen] = useState(false);
  const findings = [...c.ux, ...c.ui].slice(0, 4);
  const recs = [...c.ux, ...c.ui, ...c.arch].map((x) => L(x.t));
  const roadmap = [
    { label: t.now, items: recs.slice(0, 2) },
    { label: t.nextStep, items: recs.slice(2, 4) },
    { label: t.later, items: recs.slice(4, 6) },
  ].filter((r) => r.items.length > 0);
  const issues = `${audit.issuesCount} ${t.issues}`;
  const screens = `${audit.screensCount} ${t.screens}`;
  const facts = [
    { k: t.kMethod, v: L(audit.method) },
    { k: t.kScope, v: `${screens}, ${issues}` },
    { k: t.kPeople, v: L(audit.participants) },
    { k: t.kDate, v: c.year },
    { k: t.kAuthor, v: PERSON.name },
  ];
  const statusLabel: Record<IssueStatus, string> = {
    fixed: t.fixed,
    progress: t.progress,
    backlog: t.backlog,
  };
  const prefix =
    c.name
      .replace(/[^A-Za-z]/g, "")
      .slice(0, 2)
      .toUpperCase() || "XX";

  function toggle() {
    const next = !open;
    setOpen(next);
    if (!next) app.scrollToCaseSection("audit");
  }

  return (
    <section id="c-audit" data-nav-section className="case-sec case-sec--line">
      <div className="row-between">
        <span className="row-wrap">
          <SectionLabel n={n} label={t.audit} accent="accent" />
          <PlaceholderBadge show={c.metricsArePlaceholder} />
        </span>
        <button type="button" className="link-btn" onClick={toggle}>
          {open ? t.collapseShort : t.readShort}
        </button>
      </div>
      <div className="grid-auto grid-auto--340 gap-lg">
        <div data-reveal="0" className="stack-14">
          <span className="mono-label">{t.keyFinding}</span>
          <p className="audit-finding display">{L(c.problem)}</p>
          <div className="mono-meta row-wrap">
            <span>{issues}</span>
            <span>{screens}</span>
          </div>
        </div>
        <div data-reveal="80" className="stack-10">
          <div className="heur-legend">
            <span>{t.heuristics}</span>
            <span className="row-wrap">
              <span className="legend">
                <span className="legend__sw legend__sw--before" />
                {t.before}
              </span>
              <span className="legend">
                <span className="legend__sw legend__sw--after" />
                {t.after}
              </span>
            </span>
          </div>
          {audit.heuristics.map((h) => (
            <div key={h.name.en} className="heur">
              <span>{L(h.name)}</span>
              <span
                className="heur__track"
                role="img"
                aria-label={`${h.before.toFixed(1)} → ${h.after.toFixed(1)}`}
              >
                <span className="heur__before" style={{ width: (h.before / 5) * 100 + "%" }} />
                <span className="heur__after" style={{ width: (h.after / 5) * 100 + "%" }} />
              </span>
              <span className="heur__val">
                {h.before.toFixed(1)}→{h.after.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="findings">
        {findings.map((f, i) => (
          <div key={i} data-reveal="0" className="findings__row">
            <span className="row-wrap gap-10">
              <span className="mono-xs muted">0{i + 1}</span>
              <SevTag s={SEV[Math.min(2, i)]} />
            </span>
            <span className="findings__t">{L(f.t)}</span>
            <span className="findings__d">{L(f.d)}</span>
          </div>
        ))}
      </div>

      <div className={"report-wrap" + (open ? " is-open" : "")} aria-hidden={!open}>
        <div className="report-wrap__inner">
          <div className="report">
            <div className="report__head">
              <span className="report__title display">
                {t.audit} · {c.name}
              </span>
              <span className="mono-meta">v1.2 · {c.year.slice(0, 4)}</span>
            </div>
            <div className="grid-auto grid-auto--260 gap-md">
              <div className="stack-10">
                <span className="mono-label">01 · {t.rScope}</span>
                <p className="report__p">{L(audit.scope)}</p>
              </div>
              <dl className="kv kv--sm">
                {facts.map((f) => (
                  <div key={f.k} className="kv__row">
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="stack-12">
              <span className="mono-label">02 · {t.rHeur}</span>
              <div className="grid-auto grid-auto--280 gap-12">
                {audit.heuristics.map((h) => (
                  <div key={h.name.en} className="report-card">
                    <span className="row-between">
                      <strong>{L(h.name)}</strong>
                      <span className="mono-accent">
                        {h.before.toFixed(1)}→{h.after.toFixed(1)}
                      </span>
                    </span>
                    <span className="muted-sm">{L(h.note)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="stack-12">
              <span className="mono-label">03 · {t.rLog}</span>
              <div className="table-scroll">
                <table className="issue-log">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{t.cIssue}</th>
                      <th>{t.cWhere}</th>
                      <th>{t.cSev}</th>
                      <th>{t.cEffort}</th>
                      <th>{t.cStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audit.log.map((row, i) => (
                      <tr key={i}>
                        <td className="mono-xs muted">
                          {prefix}-{String(i + 1).padStart(2, "0")}
                        </td>
                        <td>{L(row.issue)}</td>
                        <td className="muted">{L(row.where)}</td>
                        <td>
                          <SevTag s={row.severity} />
                        </td>
                        <td className="mono-sm">{row.effort}</td>
                        <td>
                          <span className={"status status--" + row.status}>
                            {statusLabel[row.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {roadmap.length > 0 && (
              <div className="stack-12">
                <span className="mono-label">04 · {t.rRoadmap}</span>
                <div className="grid-auto grid-auto--220 gap-12">
                  {roadmap.map((r) => (
                    <div key={r.label} className="roadmap-card">
                      <strong>{r.label}</strong>
                      {r.items.map((it) => (
                        <span key={it} className="roadmap-card__item">
                          <span className="accent">→</span>
                          <span>{it}</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="report__foot">
              <span className="muted-sm">{L(audit.summary)}</span>
              {audit.reportUrl && (
                <a
                  className="underline-link"
                  href={audit.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.downloadReport}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <button type="button" className="report-toggle" aria-expanded={open} onClick={toggle}>
        <span className="stack-2">
          <strong>{open ? t.collapse : t.readFull}</strong>
          <span className="mono-xs muted">{t.rMeta}</span>
        </span>
        <span className={"report-toggle__caret" + (open ? " is-open" : "")} aria-hidden="true">
          ↓
        </span>
      </button>
    </section>
  );
}

function Design({ c, n }: { c: ResolvedCase; n: string }) {
  const { t, L } = useI18n();
  const img = c.images ?? {};
  return (
    <section id="c-design" data-nav-section className="case-sec case-sec--line">
      <SectionLabel n={n} label={t.uid} accent="accent" />
      <div className="grid-auto grid-auto--260 gap-12">
        <div data-reveal="0" className="span-all">
          <ImageSlot
            src={img.screens}
            label="final screens · desktop + mobile"
            className="ph ph--wide ph--tinted"
          />
        </div>
        <div data-reveal="0">
          <ImageSlot src={img.components} label="components · states" className="ph ph--square" />
        </div>
        <div data-reveal="80">
          <ImageSlot
            src={img.designSystem}
            label="design system · tokens"
            className="ph ph--square"
          />
        </div>
        <div data-reveal="160">
          <ImageSlot src={img.prototype} label="prototype · recording" className="ph ph--square" />
        </div>
      </div>
      <Decisions items={c.ui.map((x) => ({ t: L(x.t), d: L(x.d) }))} />
    </section>
  );
}

function Build({ c, n }: { c: ResolvedCase; n: string }) {
  const { t, L } = useI18n();
  return (
    <section id="c-build" data-nav-section className="case-sec">
      <SectionLabel n={n} label={t.devl} accent="dev" />
      <div className="terminal">
        <div className="terminal__bar">
          <span className="terminal__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>~/{c.id}/architecture</span>
          <span>{c.tech.join(" · ")}</span>
        </div>
        <div className="terminal__body">
          <div className="terminal__arch">
            {c.arch.map((a, i) => (
              <div key={i} data-reveal={i * 80} className="terminal__item">
                <span>
                  <span className="dev-accent">&gt; </span>
                  {L(a.t)}
                </span>
                <span className="terminal__desc">{L(a.d)}</span>
              </div>
            ))}
            <span className="terminal__prompt">
              <span className="dev-accent">&gt; </span>
              <span className="cursor" />
            </span>
          </div>
          <pre className="terminal__code">
            <code>{c.code}</code>
          </pre>
        </div>
      </div>
      <div className="dev-cells">
        <div>
          <span className="mono-label mono-label--dev-muted">{t.challenge}</span>
          <span>{L(c.challenge)}</span>
        </div>
        <div>
          <span className="mono-label mono-label--dev">{t.solution}</span>
          <span>{L(c.solution)}</span>
        </div>
        <div>
          <span className="mono-label mono-label--dev-muted">{t.testing}</span>
          <span>{L(c.testing)}</span>
        </div>
      </div>
    </section>
  );
}

function Outcome({ c, n }: { c: ResolvedCase; n: string }) {
  const { t, L } = useI18n();
  const app = useApp();
  const next = nextCase(c);
  return (
    <section id="c-outcome" data-nav-section className="case-sec case-sec--border">
      <SectionLabel n={n} label={t.outcome} />
      <div className="results">
        {c.results.map((r) => (
          <div key={r.v + r.l.en} className="results__cell">
            <span className="results__v display">{r.v}</span>
            <span className="muted-sm">{L(r.l)}</span>
          </div>
        ))}
      </div>
      <dl className="rows">
        <div className="rows__row">
          <dt>{t.learned}</dt>
          <dd>{L(c.learned)}</dd>
        </div>
        <div className="rows__row">
          <dt>{t.improve}</dt>
          <dd>{L(c.improve)}</dd>
        </div>
      </dl>
      {next && next.id !== c.id && (
        <a
          href={`#/case/${next.id}`}
          className="next-card"
          onClick={(e) => {
            e.preventDefault();
            app.openCase(next.id);
          }}
        >
          <span className="stack-4">
            <span className="mono-label mono-label--inherit">{t.next}</span>
            <span className="next-card__name display">{next.name}</span>
          </span>
          <span className="next-card__arrow" aria-hidden="true">
            →
          </span>
        </a>
      )}
    </section>
  );
}

function Testing({
  c,
  n,
  tests,
  analytics,
}: {
  c: ResolvedCase;
  n: string;
  tests: CaseMetrics["tests"];
  analytics: CaseMetrics["analytics"];
}) {
  const { t, L, lang } = useI18n();
  const max = tests ? Math.max(tests.unit, tests.integration, tests.e2e, 1) : 1;
  const rows = tests
    ? [
        { name: t.unit, n: tests.unit, cls: "bar--accent" },
        { name: t.integration, n: tests.integration, cls: "bar--mix" },
        { name: t.e2e, n: tests.e2e, cls: "bar--accent2" },
      ]
    : [];
  const steps = analytics ? (analytics.funnelSteps ?? DEFAULT_FUNNEL_STEPS)[lang] : [];
  return (
    <section id="c-testing" data-nav-section className="case-sec case-sec--border case-sec--last">
      <SectionLabel n={n} label={t.testan} />
      <div className="grid-auto grid-auto--340 gap-16">
        <div data-reveal="0" className="panel">
          <div className="row-between">
            <span className="panel__title">{t.testing}</span>
            <span className="row-wrap gap-10">
              <PlaceholderBadge show={!!tests && c.metricsArePlaceholder} />
              {tests && <span className="mono-xs muted">{tests.tools}</span>}
            </span>
          </div>
          <p className="muted-sm">{L(c.testing)}</p>
          {tests && (
            <>
              <div className="stack-10">
                {rows.map((r) => (
                  <div key={r.name} className="test-row">
                    <span>{r.name}</span>
                    <span className="bar-track">
                      <span className={"bar " + r.cls} style={{ width: (r.n / max) * 100 + "%" }} />
                    </span>
                    <span className="mono-sm align-right">{r.n}</span>
                  </div>
                ))}
              </div>
              <div className="coverage">
                <span className="coverage__v display">{tests.coverage}</span>
                <span className="muted-sm">{t.coverage}</span>
              </div>
            </>
          )}
        </div>
        {analytics && (
          <div data-reveal="80" className="panel">
            <div className="row-between">
              <span className="panel__title">{t.analytics}</span>
              <span className="row-wrap gap-10">
                <PlaceholderBadge show={c.metricsArePlaceholder} />
                <span className="mono-xs muted">{analytics.tools}</span>
              </span>
            </div>
            <span className="mono-label">{t.funnel}</span>
            <div className="stack-8">
              {analytics.funnel.map((v, i) => (
                <div key={i} className="funnel-row">
                  <div className="row-between">
                    <span>{steps[i]}</span>
                    <span className="mono-sm">{v}%</span>
                  </div>
                  <span className="bar-track bar-track--tall">
                    <span
                      className={"bar " + (i === 3 ? "bar--accent2" : "bar--accent")}
                      style={{ width: v + "%", opacity: 1 - i * 0.15 }}
                    />
                  </span>
                </div>
              ))}
            </div>
            <div className="kpis">
              <div>
                <span className="kpis__v">{analytics.session}</span>
                <span className="muted-xs">{t.kpi1}</span>
              </div>
              <div>
                <span className="kpis__v">{analytics.taskSuccess}</span>
                <span className="muted-xs">{t.kpi2}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
