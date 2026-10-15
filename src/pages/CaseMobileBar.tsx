import { useState } from "react";
import { useApp } from "../app/AppContext";
import type { CaseSection } from "../app/sections";
import type { ResolvedCase } from "../lib/cases";
import { cn } from "../lib/cn";
import { useI18n } from "../lib/i18n";
import { iconButton, trackDot } from "../styles/recipes";

/*
 * Menu items set no font size or colour of their own: the case pages' scopes give buttons
 * `font: inherit; color: inherit`, so they take the bar's 16px ink text. The active weight sits on the
 * spans, since the legacy `.dt button { font: inherit }` would reset it on the button.
 */

/** Sticky section bar on narrow screens: back button, current section, progress and a section menu. */
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
    <div className="sticky top-[65px] z-15 border-b border-line bg-[color-mix(in_oklab,var(--bg)_94%,transparent)] backdrop-blur-[12px] glass:glass-blur">
      <div className="flex items-center gap-[10px] px-4 py-2">
        <button
          type="button"
          className={iconButton({ size: "sm" })}
          aria-label={c.group === "show" ? t.backShow : t.backExp}
          onClick={() => app.goSection(c.group === "show" ? "showcase" : "experience")}
        >
          ←
        </button>
        <button
          type="button"
          className="flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-between gap-[10px] rounded-card-sm border border-line2 bg-surface px-3 py-0 text-left"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="font-mono text-[11px] text-accent">
              {cur.num}/{String(sections.length).padStart(2, "0")}
            </span>
            <span className="overflow-hidden text-[14px] font-semibold text-ellipsis whitespace-nowrap">{cur.label}</span>
          </span>
          <span className="flex-none font-mono text-[11px] whitespace-nowrap text-muted">
            {t.sections} {open ? "▴" : "▾"}
          </span>
        </button>
      </div>
      <div className="h-[2px] bg-line">
        <div
          className="h-full bg-accent shadow-glow [transition:width_0.4s_cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ width: ((ci + 1) / sections.length) * 100 + "%" }}
        />
      </div>
      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col border-b border-line2 bg-bg px-4 pt-[6px] pb-[14px] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)]">
          {sections.map((s) => {
            const active = s.dom === app.activeCaseSection;
            return (
              <button
                key={s.id}
                type="button"
                className={cn(
                  "flex min-h-[46px] cursor-pointer items-center gap-2 border-0 border-b border-line bg-transparent p-0 text-left",
                  active && "bg-accent-soft px-[10px] text-ink",
                )}
                onClick={() => {
                  setOpen(false);
                  app.scrollToCaseSection(s.id);
                }}
              >
                <span className={cn("w-[26px] font-mono text-[11px] opacity-70", active && "font-semibold")}>{s.num}</span>
                <span className={cn("flex-1", active && "font-semibold")}>{s.label}</span>
                <span className={trackDot({ track: s.track ?? "none" })} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
