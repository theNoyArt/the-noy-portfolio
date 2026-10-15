import { useEffect, useState, type CSSProperties } from "react";
import { useApp } from "../../app/AppContext";
import { DS_GROUPS, DS_THEMES } from "../../content/dtrpg/designSystem";
import { DT_DS_FACTS, DT_LINKS } from "../../content/dtrpg/project";
import { bodyMuted, controls, label, sec, secHead, secLink, secTitle, twoCol } from "./case-ui";
import { useTr } from "./tr";
import { Ext, Seg } from "./ui";

const DS_B = "font-semibold text-[color:var(--ds-foreground)]";

export function DesignSystem() {
  const { tr } = useTr();
  const app = useApp();
  // Follows the page theme; the switch still previews the other one.
  const [theme, setTheme] = useState<"light" | "dark">(app.theme);
  useEffect(() => setTheme(app.theme), [app.theme]);
  const t = DS_THEMES[theme];
  const vars = Object.fromEntries(
    Object.entries(t.tokens).map(([k, v]) => ["--ds-" + k, v]),
  ) as CSSProperties;

  return (
    <section className={sec()} id="c-system" data-nav-section>
      <div className={secHead}>
        <span className={label({ tone: "accent", star: true })}>{tr("[04] Design system · shadcn/ui")}</span>
        <Ext className={secLink} href={DT_LINKS.colours}>
          {tr("Colour setup in Figma ↗")}
        </Ext>
      </div>
      <div className={twoCol({ end: true })}>
        <h2 className={secTitle}>{tr("One set of token names, two themes, checked for contrast.")}</h2>
        <p className={bodyMuted()}>
          {tr(
            "The UI is built on shadcn/ui: components live in the codebase and are themed only through CSS variables. Token names follow shadcn (background, card, popover, muted, border, input, primary), extended with primary-text, primary-solid and status colours. Light and dark swap the values, never the names.",
          )}
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] border-t border-l border-t-line-2 border-l-line">
        {DT_DS_FACTS.map((x) => (
          <div key={x.k} className="flex flex-col gap-[6px] border-r border-b border-line px-[18px] py-4">
            <span className={label()}>{tr(x.k)}</span>
            <b className="text-[17px] font-semibold">{tr(x.b)}</b>
            <span className="text-[13.5px] text-muted">{tr(x.d)}</span>
          </div>
        ))}
      </div>

      <div className={controls}>
        <Seg
          label={tr("Theme")}
          value={theme}
          onChange={setTheme}
          options={[
            { id: "light", label: tr("Light") },
            { id: "dark", label: tr("Dark") },
          ]}
        />
        <span className="text-[14px] text-muted">
          {tr("Previews the client’s tokens, independent of this page’s theme.")}
        </span>
      </div>

      {/* The client's own tokens, set inline as --ds-*, so the panel keeps its own colours in both page themes. */}
      <div
        className={
          "grid grid-cols-[minmax(0,1fr)] rounded-[12px] border border-[color:var(--ds-border)] bg-[color:var(--ds-background)] p-[clamp(16px,2.6vw,28px)] " +
          "font-[Inter,Instrument_Sans,system-ui,sans-serif] text-[color:var(--ds-foreground)] [transition:background-color_0.25s,color_0.25s]"
        }
        style={vars}
      >
        <div className="grid min-w-0 grid-cols-2 gap-x-[clamp(24px,4vw,48px)] gap-y-7 max-[699px]:grid-cols-[minmax(0,1fr)]">
          {DS_GROUPS.map((g) => (
            <div key={g.label}>
              <p className="pb-2 text-[11px] font-semibold tracking-[0.1em] text-[color:var(--ds-muted-foreground)] uppercase">
                {tr(g.label)}
              </p>
              {/* Compact token chips: swatch, name and hex; contrast notes live in the tooltip. */}
              <div className="flex flex-col border-t border-[color:var(--ds-border)]">
                {g.keys.map((k) => (
                  <div
                    className="flex min-w-0 items-center gap-3 border-b border-[color:var(--ds-border)] py-2"
                    key={k}
                    title={t.notes[k] ? `${k} · ${t.notes[k]}` : undefined}
                  >
                    <span
                      className="h-[26px] w-[26px] flex-none rounded-[6px] shadow-[inset_0_0_0_1px_rgb(128_128_128/0.4)]"
                      style={{ background: t.tokens[k] }}
                    />
                    <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                      <b className="overflow-hidden text-[14px] font-semibold text-ellipsis whitespace-nowrap">{k}</b>
                      <code className="flex-none font-mono text-[12px] text-[color:var(--ds-muted-foreground)]">
                        {t.tokens[k]}
                      </code>
                    </span>
                  </div>
                ))}
              </div>
              {g.label === "Brand" && (
                <p className="mt-[10px] text-[12.5px] leading-[1.5] text-[color:var(--ds-muted-foreground)]">
                  {tr("Brand red fails AA as small text and under white labels, so")}{" "}
                  <b className={DS_B}>primary-text</b> {tr("carries red copy and")}{" "}
                  <b className={DS_B}>primary-solid</b> {tr("fills buttons (white text 4.6:1).")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
