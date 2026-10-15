import { useEffect, useRef, useState, type FormEvent } from "react";
import { tv } from "tailwind-variants";
import { useApp } from "../app/AppContext";
import { CONFIG } from "../config";
import { PERSON } from "../content/person";
import { DT_CHAT_SUGGESTIONS } from "../content/dtrpg/project";
import { getCase } from "../lib/cases";
import { useI18n } from "../lib/i18n";
import { iconButton, pulseDot } from "../styles/recipes";
import { GLASS_LAYER } from "./shell.styles";

const GLASS_GRADIENT =
  "glass:border glass:border-white/50 glass:bg-transparent glass:bg-[linear-gradient(135deg,#5a2fd0_0%,#6e4ae6_55%,#7356e8_100%)] glass:text-white " +
  "glass:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-10px_rgba(90,47,208,0.7),0_0_24px_-6px_rgba(140,110,255,0.45)]";

const launcher = tv({
  base:
    "fixed right-5 bottom-5 z-[33] flex h-12 cursor-pointer items-center gap-[10px] rounded-[999px] border border-line2 bg-ink py-0 pr-[18px] pl-[14px] font-body text-[14px] font-semibold whitespace-nowrap text-bg " +
    "shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35),var(--glow)] transition-[opacity,translate] duration-300 hover:translate-y-[-2px] " +
    GLASS_GRADIENT,
  variants: {
    away: { true: "pointer-events-none translate-y-4 opacity-0" },
  },
});

const chat = tv({
  slots: {
    root:
      "fixed right-5 bottom-5 z-[37] flex h-[min(620px,calc(100vh-40px))] w-[400px] flex-col overflow-hidden rounded-[calc(var(--radius)+6px)] border border-line2 bg-bg font-body text-ink shadow-pop " +
      GLASS_LAYER,
    head: "flex items-start justify-between gap-3 border-b border-line px-4 pt-4 pb-[14px]",
    titles: "flex flex-col gap-1",
    title: "display flex items-center gap-2 text-[20px]",
    dot: "h-[9px] w-[9px] rounded-full bg-accent2",
    note: "text-[13px] text-pretty text-muted",
    list: "flex flex-1 flex-col gap-[10px] overflow-y-auto p-4",
    suggestions: "flex flex-col gap-2",
    suggestion:
      "cursor-pointer rounded-card-sm border border-line2 bg-transparent px-3 py-[10px] text-left text-[14px] " +
      "transition-[border-color,background-color] duration-[250ms] hover:border-accent hover:bg-accent-soft",
    form: "flex gap-2 border-t border-line p-3",
    input:
      "h-11 min-w-0 flex-1 rounded-card-sm border border-line2 bg-bg px-[14px] py-0 text-[15px] outline-none focus-visible:border-accent",
    send:
      "h-11 cursor-pointer rounded-card-sm border-0 bg-accent px-4 py-0 font-semibold text-accent-ink disabled:cursor-progress disabled:opacity-60 " +
      GLASS_GRADIENT,
  },
  variants: {
    full: { true: { root: "inset-0 h-auto w-auto rounded-none border-0" } },
  },
});

const msg = tv({
  base: "rounded-card px-[14px] py-[10px] text-[14.5px] leading-[1.5] whitespace-pre-wrap",
  variants: {
    role: {
      user: "max-w-[85%] self-end bg-ink text-bg",
      assistant: "max-w-[90%] self-start border border-line bg-surface",
    },
    error: { true: "border-accent2" },
    thinking: { true: "font-mono text-[13px] text-muted" },
  },
});

interface Msg {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
}

/** Floating "Ask AI about me" button plus the chat panel. Answers come from /api/chat. */
export function Chat() {
  const { t, lang, fmt } = useI18n();
  const app = useApp();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // On a hand-built case study the assistant also gets that project's full detail.
  const current = app.route.page === "case" ? getCase(app.route.id) : null;
  const caseId = current?.page ? current.id : undefined;
  const suggestions =
    caseId === "dtrpg" ? DT_CHAT_SUGGESTIONS[lang] : PERSON.chatSuggestions[lang];

  useEffect(() => {
    const l = listRef.current;
    if (l) l.scrollTop = l.scrollHeight;
  }, [msgs.length, busy, app.chatOpen]);

  useEffect(() => {
    if (app.chatOpen) inputRef.current?.focus();
  }, [app.chatOpen]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const history = [...msgs.filter((m) => !m.error), { role: "user" as const, content: q }];
    setMsgs((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch(CONFIG.chatEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lang,
          caseId,
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await res.json().catch(() => null)) as { text?: string } | null;
      if (res.status === 429) {
        setMsgs((m) => [...m, { role: "assistant", content: fmt(t.chatLimit), error: true }]);
        return;
      }
      if (!res.ok || !data?.text) throw new Error("chat failed");
      setMsgs((m) => [...m, { role: "assistant", content: data.text!.trim() }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: fmt(t.chatError), error: true }]);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const showLauncher = !app.chatOpen && !(app.menuOpen && app.narrow);
  // On the hero the intro already has an "Ask AI" button, and the corner is where the contact bar ends.
  const onHero = app.route.page === "home" && app.activeSection === "home";
  const s = chat({ full: app.narrow });

  return (
    <>
      {showLauncher && (
        <button
          type="button"
          data-chat-launcher=""
          className={launcher({ away: onHero })}
          onClick={() => app.setChatOpen(true)}
          tabIndex={onHero ? -1 : undefined}
          aria-hidden={onHero || undefined}
        >
          <span className={pulseDot({ class: "h-[10px] w-[10px] glass:bg-white" })} aria-hidden="true" />
          {t.chatLauncher}
        </button>
      )}
      {app.chatOpen && (
        <section
          className={s.root()}
          role="dialog"
          aria-label={fmt(t.chatTitle)}
        >
          <div className={s.head()}>
            <div className={s.titles()}>
              <span className={s.title()}>
                <span className={s.dot()} aria-hidden="true" />
                {fmt(t.chatTitle)}
              </span>
              <span className={s.note()}>{caseId ? t.chatNoteCase : t.chatNote}</span>
            </div>
            <button
              type="button"
              className={iconButton()}
              aria-label={t.close}
              onClick={() => app.setChatOpen(false)}
            >
              ×
            </button>
          </div>
          <div ref={listRef} className={s.list()} aria-live="polite">
            {msgs.length === 0 && (
              <div className={s.suggestions()}>
                {suggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className={s.suggestion()}
                    onClick={() => void send(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => (
              <div
                key={i}
                className={msg({ role: m.role, error: m.error })}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className={msg({ role: "assistant", thinking: true })}>
                {t.thinking}
                <span className="animate-blink">_</span>
              </div>
            )}
          </div>
          <form className={s.form()} onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="chat-input">
              {t.chatPh}
            </label>
            <input
              id="chat-input"
              className={s.input()}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatPh}
              maxLength={800}
              autoComplete="off"
            />
            <button type="submit" className={s.send()} disabled={busy}>
              {t.send}
            </button>
          </form>
        </section>
      )}
    </>
  );
}
