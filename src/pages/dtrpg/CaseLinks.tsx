import { caseLinks } from "../../components/shell.styles";
import { DT_LINKS } from "../../content/dtrpg/project";
import { useI18n } from "../../lib/i18n";
import { LINK_ICONS } from "./icons";

/** Project links under the section index in the sidebar. */
export function CaseLinks({ only }: { only?: { github: string } }) {
  const { t } = useI18n();
  const cl = caseLinks();
  const all = [
    { k: "demo", label: t.linkDemo, url: DT_LINKS.demo },
    { k: "github", label: "GitHub", url: DT_LINKS.github },
    { k: "figma", label: t.figmaFile, url: DT_LINKS.figma },
    { k: "swagger", label: t.apiDocs, url: DT_LINKS.swagger },
  ] as const;
  const links = only ? [{ k: "github" as const, label: "GitHub", url: only.github }] : all;
  return (
    <div className={cl.root()}>
      <span className={cl.label()}>{t.projectLinks}</span>
      {links.map((l) =>
        l.url ? (
          <a key={l.k} className={cl.link()} href={l.url} target="_blank" rel="noopener noreferrer">
            <svg className={cl.icon()} viewBox="0 0 24 24" aria-hidden="true">
              {LINK_ICONS[l.k]}
            </svg>
            <span className={cl.text()}>{l.label}</span>
            <span className={cl.arrow()} aria-hidden="true">
              ↗
            </span>
          </a>
        ) : (
          <span key={l.k} className={cl.todo()} title={t.comingSoon}>
            <svg className={cl.icon()} viewBox="0 0 24 24" aria-hidden="true">
              {LINK_ICONS[l.k]}
            </svg>
            <span className={cl.text()}>{l.label}</span>
            <span className={cl.soon()}>{t.comingSoon}</span>
          </span>
        ),
      )}
    </div>
  );
}
