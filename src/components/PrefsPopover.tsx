import { useEffect, useRef } from "react";
import { tv } from "../lib/cn";
import { useApp } from "../app/AppContext";
import type { ThemeName } from "../config";
import type { Lang } from "../content/types";
import { useI18n } from "../lib/i18n";
import { iconButton, monoLabel, seg } from "../styles/recipes";
import { GLASS_LAYER } from "./shell.styles";

const prefsBtn = tv({
  slots: {
    root:
      "flex h-[46px] w-full cursor-pointer items-center justify-between gap-[10px] rounded-card-sm border border-line2 bg-surface px-3 py-0 " +
      "transition-[border-color] duration-[250ms] cyber:hover:border-accent glass:glass-blur glass:border-glass-edge glass:shadow-glass",
    left: "flex items-center gap-[10px]",
    swatch:
      "h-4 w-4 rounded-full bg-[conic-gradient(oklch(0.5_0.19_292)_0_50%,var(--accent2)_0)] shadow-[0_0_0_1px_var(--line2)]",
    label:
      "font-mono text-[11.5px] tracking-[0.08em] whitespace-nowrap uppercase glass:tracking-[0.04em]",
    caret: "font-mono text-[11px] text-muted",
  },
  variants: {
    compact: { true: { root: "h-11 w-auto" } },
    dark: {
      true: { swatch: "bg-[conic-gradient(oklch(0.7_0.21_302)_0_50%,oklch(0.82_0.13_200)_0)]" },
    },
  },
});

const prefs = tv({
  slots: {
    backdrop: "fixed inset-0 z-[39]",
    root:
      "fixed bottom-[84px] left-4 z-40 flex w-[300px] max-w-[calc(100vw-24px)] flex-col gap-4 rounded-[calc(var(--radius)+4px)] border border-line2 bg-bg p-4 text-ink shadow-pop " +
      GLASS_LAYER,
    head: "flex items-center justify-between",
    group: "flex flex-col gap-2",
    title: "text-[13px] font-semibold",
    modes: "grid grid-cols-[1fr_1fr] gap-2",
  },
  variants: {
    top: { true: { root: "top-[62px] right-3 bottom-auto left-auto" } },
  },
});

const modeCard = tv({
  slots: {
    root: "flex cursor-pointer flex-col items-start gap-[6px] rounded-card-sm border border-line2 bg-transparent p-2 text-left",
    preview:
      "flex h-[54px] w-full flex-col gap-1 border border-[rgba(128,128,128,0.25)] p-2 [&>span]:rounded-[2px]",
    name: "text-[14px] font-semibold",
    desc: "text-[12px] leading-[1.35] text-muted",
  },
  variants: {
    on: { true: { root: "border-accent bg-accent-soft" } },
  },
});

/** The button that opens Preferences: a sidebar row on desktop, a chip in the mobile header. */
export function PrefsButton({ compact = false }: { compact?: boolean }) {
  const { lang } = useI18n();
  const app = useApp();
  const dark = app.theme === "dark";
  const s = prefsBtn({ compact, dark });
  return (
    <button
      type="button"
      className={s.root()}
      aria-expanded={app.prefsOpen}
      aria-haspopup="dialog"
      onClick={() => app.setPrefsOpen(!app.prefsOpen)}
    >
      <span className={s.left()}>
        <span className={s.swatch()} aria-hidden="true" />
        <span className={s.label()}>
          {compact
            ? lang.toUpperCase()
            : `${lang.toUpperCase()} · ${dark ? "Cyber dark" : "Glass light"}`}
        </span>
      </span>
      {!compact && (
        <span className={s.caret()} aria-hidden="true">
          {app.prefsOpen ? "▾" : "▴"}
        </span>
      )}
    </button>
  );
}

const MODES: { id: ThemeName; name: string; bg: string; c1: string; c2: string; fg: string }[] = [
  {
    id: "dark",
    name: "Cyber dark",
    bg: "#0a0910",
    c1: "oklch(0.70 0.21 302)",
    c2: "oklch(0.82 0.13 200)",
    fg: "#ebe8f4",
  },
  {
    id: "light",
    name: "Glass light",
    bg: "linear-gradient(135deg, #e9e2ff, #f6f4ff 55%, #e2ecff)",
    c1: "#5a2fd0",
    c2: "#3b78f0",
    fg: "#16151a",
  },
];

const LANG_NAMES: [Lang, string][] = [
  ["en", "English"],
  ["pl", "Polski"],
];

export function PrefsPopover() {
  const { t, lang, setLang } = useI18n();
  const app = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const s = prefs({ top: app.narrow });
  const sg = seg({ layout: "two" });

  useEffect(() => {
    ref.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')?.focus();
  }, []);

  return (
    <>
      <div className={s.backdrop()} onClick={() => app.setPrefsOpen(false)} />
      <div ref={ref} role="dialog" aria-label={t.prefs} className={s.root()}>
        <div className={s.head()}>
          <span className={monoLabel({ class: "text-[10.5px]" })}>{t.prefs}</span>
          <button
            type="button"
            className={iconButton({ size: "plain" })}
            aria-label={t.close}
            onClick={() => app.setPrefsOpen(false)}
          >
            ×
          </button>
        </div>
        <div className={s.group()}>
          <span className={s.title()}>{t.visualMode}</span>
          <div className={s.modes()}>
            {MODES.map((m) => {
              const on = app.theme === m.id;
              const mc = modeCard({ on });
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={on}
                  className={mc.root()}
                  onClick={() => app.setTheme(m.id)}
                >
                  <span
                    className={mc.preview()}
                    style={{ background: m.bg, borderRadius: m.id === "dark" ? 0 : 10 }}
                  >
                    <span style={{ width: "70%", height: 8, background: m.fg }} />
                    <span style={{ width: "45%", height: 5, background: m.c1 }} />
                    <span style={{ width: "30%", height: 5, background: m.c2 }} />
                  </span>
                  <span className={mc.name()}>{m.name}</span>
                  <span className={mc.desc()}>{m.id === "dark" ? t.cyberDesc : t.studioDesc}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className={s.group()}>
          <span className={s.title()}>{t.language}</span>
          <div className={sg.root()}>
            {LANG_NAMES.map(([l, label]) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                className={sg.btn({ on: lang === l })}
                onClick={() => setLang(l)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
