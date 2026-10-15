import { useEffect, useRef } from "react";
import { tv } from "../lib/cn";
import { useApp } from "../app/AppContext";
import { HOME_SECTIONS, homeSectionLabel } from "../app/sections";
import { PERSON } from "../content/person";
import { useI18n } from "../lib/i18n";
import { iconButton, monoLabel } from "../styles/recipes";
import { PrefsButton } from "./PrefsPopover";
import { GLASS_LAYER } from "./shell.styles";

const header = tv({
  slots: {
    root:
      "sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] px-4 py-[10px] backdrop-blur-[14px] " +
      "glass:glass-blur glass:bg-[rgba(255,255,255,0.62)]",
    brand: "display cursor-pointer border-0 bg-transparent p-0 text-[19px]",
    actions: "flex items-center gap-2",
    menu: iconButton({
      class: "w-auto min-w-[44px] px-3 py-0 font-mono text-[11px] tracking-[0.08em]",
    }),
  },
});

const menu = tv({
  slots: {
    root:
      "fixed inset-0 z-[38] flex flex-col gap-5 overflow-y-auto bg-bg px-4 pt-3 pb-7 text-ink " +
      GLASS_LAYER,
    head: "flex items-center justify-between",
    nav: "flex flex-1 flex-col",
    item: "display flex min-h-[60px] cursor-pointer items-baseline gap-2 border-0 border-b border-line bg-transparent px-0 py-[14px] text-left text-[32px] text-ink",
    num: "w-8 font-mono text-[12px] font-normal tracking-[0] text-muted",
  },
  variants: {
    active: { true: { item: "text-accent" } },
  },
});

export function MobileHeader() {
  const { t } = useI18n();
  const app = useApp();
  const s = header();
  return (
    <header className={s.root()}>
      <button type="button" className={s.brand()} onClick={() => app.goSection("home")}>
        {PERSON.name}
      </button>
      <div className={s.actions()}>
        <PrefsButton compact />
        <button
          type="button"
          className={s.menu()}
          aria-expanded={app.menuOpen}
          onClick={() => app.setMenuOpen(true)}
        >
          {t.menu.toUpperCase()}
        </button>
      </div>
    </header>
  );
}

export function MobileMenu() {
  const { t } = useI18n();
  const app = useApp();
  const closeRef = useRef<HTMLButtonElement>(null);
  const s = menu();

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className={s.root()} role="dialog" aria-modal="true" aria-label={t.menu}>
      <div className={s.head()}>
        <span className={monoLabel()}>{t.menu}</span>
        <button
          ref={closeRef}
          type="button"
          className={iconButton()}
          aria-label={t.close}
          onClick={() => app.setMenuOpen(false)}
        >
          ×
        </button>
      </div>
      <nav className={s.nav()} aria-label={t.navMain}>
        {HOME_SECTIONS.map((key, i) => {
          const active = app.route.page === "home" && app.activeSection === key;
          return (
            <button
              key={key}
              type="button"
              className={s.item({ active })}
              onClick={() => app.goSection(key)}
            >
              <span className={s.num()}>0{i + 1}</span>
              <span>{homeSectionLabel(key, t)}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
