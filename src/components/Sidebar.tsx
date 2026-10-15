import { tv } from "../lib/cn";
import { useApp } from "../app/AppContext";
import { HOME_SECTIONS, caseSections, homeSectionLabel } from "../app/sections";
import { PERSON } from "../content/person";
import { useI18n } from "../lib/i18n";
import { useEmailLink } from "../lib/useEmailLink";
import type { ResolvedCase } from "../lib/cases";
import { monoLabel, trackDot } from "../styles/recipes";
import { PrefsButton } from "./PrefsPopover";
import { caseLinks } from "./shell.styles";
import { CaseLinks } from "../pages/dtrpg/CaseLinks";
import { PF_LINKS } from "../content/portfolioCase";

const sideNavItem = tv({
  base:
    "flex cursor-pointer items-center gap-2 border-0 border-b border-line bg-transparent px-0 py-[11px] text-left text-[15px] text-muted " +
    "transition-[padding,background-color,color] duration-300 hover:text-ink",
  variants: {
    case: { true: "py-[10px] text-[14px] [@media(max-height:880px)]:py-[7px]" },
    active: {
      true:
        "bg-accent-soft pl-[10px] font-semibold text-ink shadow-[inset_2px_0_0_var(--accent)] " +
        "glass:rounded-[12px] glass:bg-transparent glass:bg-[linear-gradient(90deg,rgba(120,90,230,0.18),rgba(120,90,230,0.03))] glass:shadow-none",
    },
  },
  compoundVariants: [{ case: true, active: true, class: "shadow-none" }],
});

const ui = tv({
  slots: {
    root:
      "sticky top-0 flex h-screen flex-col justify-between gap-6 overflow-y-auto border-r border-line px-6 py-7 transition-[border-color] duration-500 " +
      "glass:glass-blur glass:border-r-glass-edge glass:bg-[rgba(255,255,255,0.4)]",
    top: "flex flex-col gap-9",
    back:
      "mx-0 mt-[-8px] mb-[-4px] cursor-pointer self-start border-0 bg-transparent px-0 py-[6px] font-mono text-[11.5px] tracking-[0.06em] text-accent uppercase " +
      "transition-[translate,color] duration-[250ms] hover:translate-x-[-3px] hover:text-ink",
    brand:
      "flex cursor-pointer flex-col items-start gap-[6px] border-0 bg-transparent p-0 text-left",
    brandName: "display text-[22px] leading-none",
    brandRole: "font-mono text-[11px] text-muted",
    nav: "flex flex-col",
    num: "w-[22px] font-mono text-[10.5px] text-muted",
    label: "flex-1",
    caseSide: "flex flex-col gap-[18px] [@media(max-height:880px)]:gap-3",
    caseTitle: "flex flex-col gap-[2px]",
    caseName: "display text-[20px]",
  },
});

export function Sidebar({ current }: { current: ResolvedCase | null }) {
  const { t, L } = useI18n();
  const app = useApp();
  const s = ui();
  const cl = caseLinks();
  const mail = useEmailLink();
  const cvUrl = L(PERSON.cv.url);

  const contact = (
    <div className={cl.root()}>
      <span className={cl.label()}>{t.contactLabel}</span>
      <a className={cl.link()} href={mail.href} title={mail.title} onClick={mail.onClick}>
        <svg className={cl.icon()} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 6.5 8.5 7 8.5-7" />
        </svg>
        <span className={cl.text()} aria-live="polite">
          {mail.copied ? t.emailCopied : t.emailMe}
        </span>
        <span className={cl.arrow()} aria-hidden="true">
          ↗
        </span>
      </a>
      <a className={cl.link()} href={cvUrl} download={cvUrl.split("/").pop()}>
        <svg className={cl.icon()} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5" />
          <path d="M5 19h14" />
        </svg>
        <span className={cl.text()}>{t.cvDownload}</span>
        <span className={cl.arrow()} aria-hidden="true">
          ↓
        </span>
      </a>
    </div>
  );

  return (
    <aside className={s.root()}>
      <div className={s.top()}>
        {current && (
          <button
            type="button"
            className={s.back()}
            onClick={() => app.goSection(current.group === "show" ? "showcase" : "experience")}
          >
            {current.group === "show" ? t.backShow : t.backExp}
          </button>
        )}
        <button type="button" className={s.brand()} onClick={() => app.goSection("home")}>
          <span className={s.brandName()}>{PERSON.name}</span>
          <span className={s.brandRole()}>{L(PERSON.role)}</span>
        </button>

        {!current && (
          <nav aria-label={t.navMain} className={s.nav()}>
            {HOME_SECTIONS.map((key, i) => {
              const active = app.activeSection === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={sideNavItem({ active })}
                  aria-current={active ? "true" : undefined}
                  onClick={() => app.goSection(key)}
                >
                  <span className={s.num()}>0{i + 1}</span>
                  <span>{homeSectionLabel(key, t)}</span>
                </button>
              );
            })}
          </nav>
        )}
        {!current && contact}

        {current && (
          <div className={s.caseSide()}>
            <div className={s.caseTitle()}>
              <span className={monoLabel({ class: "text-[10.5px]" })}>{t.caseStudy}</span>
              <span className={s.caseName()}>{current.name}</span>
            </div>
            <nav aria-label={t.sections} className={s.nav()}>
              {caseSections(current, t).map((sec) => {
                const active = app.activeCaseSection === sec.dom;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    className={sideNavItem({ case: true, active })}
                    aria-current={active ? "true" : undefined}
                    onClick={() => app.scrollToCaseSection(sec.id)}
                  >
                    <span className={s.num()}>{sec.num}</span>
                    <span className={s.label()}>{sec.label}</span>
                    <span className={trackDot({ track: sec.track ?? "none" })} aria-hidden="true" />
                  </button>
                );
              })}
            </nav>
            {current.page === "dtrpg" && <CaseLinks />}
            {current.page === "portfolio" && <CaseLinks only={PF_LINKS} />}
            {contact}
          </div>
        )}
      </div>

      <PrefsButton />
    </aside>
  );
}
