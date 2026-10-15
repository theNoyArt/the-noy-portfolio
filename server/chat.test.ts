import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { buildSystemPrompt, handleChat } from "./chat";

const ask = (content = "Who is Paulina?", extra: Record<string, unknown> = {}) => ({
  lang: "en",
  messages: [{ role: "user", content }],
  ...extra,
});

const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });
const geminiOk = (text: string) => ok({ candidates: [{ content: { parts: [{ text }] } }] });
const groqOk = (text: string) => ok({ choices: [{ message: { content: text } }] });
const claudeOk = (text: string) => ok({ content: [{ type: "text", text }] });

/** Fake fetch that answers per provider host and records the calls. */
function fakeFetch(answers: { gemini?: () => Response; groq?: () => Response; claude?: () => Response }) {
  return vi.fn(async (url: string, _init?: RequestInit) => {
    const host = new URL(url).host;
    const pick = host.includes("googleapis") ? answers.gemini : host.includes("groq") ? answers.groq : answers.claude;
    return pick ? pick() : new Response("no answer configured", { status: 500 });
  });
}

const hostOf = (call: unknown[]) => new URL(call[0] as string).host;
const systemOf = (call: unknown[]) => {
  const body = JSON.parse((call[1] as RequestInit).body as string);
  return (body.systemInstruction?.parts?.[0]?.text ?? body.messages?.[0]?.content ?? body.system?.[0]?.text) as string;
};

let visitor = 0;
const nextVisitor = () => `10.0.0.${++visitor}`;

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("handleChat", () => {
  it("rejects requests without a user question", async () => {
    expect((await handleChat(null, { GEMINI_API_KEY: "k" })).status).toBe(400);
    expect((await handleChat({ messages: [] }, { GEMINI_API_KEY: "k" })).status).toBe(400);
    expect((await handleChat({ messages: [{ role: "assistant", content: "hi" }] }, { GEMINI_API_KEY: "k" })).status).toBe(400);
  });

  it("says when no provider key is configured", async () => {
    const res = await handleChat(ask(), {});
    expect(res.status).toBe(503);
  });

  it("answers with Gemini first", async () => {
    const fetch = fakeFetch({ gemini: () => geminiOk("From Gemini") });
    vi.stubGlobal("fetch", fetch);
    const res = await handleChat(ask(), { GEMINI_API_KEY: "g", GROQ_API_KEY: "q" }, nextVisitor());
    expect(res).toEqual({ status: 200, body: { text: "From Gemini" } });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("falls back to Groq when Gemini hits its limit", async () => {
    const fetch = fakeFetch({ gemini: () => new Response("quota", { status: 429 }), groq: () => groqOk("From Groq") });
    vi.stubGlobal("fetch", fetch);
    const res = await handleChat(ask(), { GEMINI_API_KEY: "g", GROQ_API_KEY: "q" }, nextVisitor());
    expect(res.body.text).toBe("From Groq");
    expect(fetch.mock.calls.map(hostOf)).toEqual(["generativelanguage.googleapis.com", "api.groq.com"]);
  });

  it("skips providers without a key and follows CHAT_PROVIDERS", async () => {
    const fetch = fakeFetch({ claude: () => claudeOk("From Claude"), groq: () => groqOk("From Groq") });
    vi.stubGlobal("fetch", fetch);
    const res = await handleChat(ask(), { ANTHROPIC_API_KEY: "a", GROQ_API_KEY: "q", CHAT_PROVIDERS: "claude,groq" }, nextVisitor());
    expect(res.body.text).toBe("From Claude");
    expect(fetch.mock.calls.map(hostOf)).toEqual(["api.anthropic.com"]);
  });

  it("returns 502 when every provider fails", async () => {
    vi.stubGlobal("fetch", fakeFetch({ gemini: () => new Response("down", { status: 503 }) }));
    const res = await handleChat(ask(), { GEMINI_API_KEY: "g" }, nextVisitor());
    expect(res.status).toBe(502);
  });

  it("ignores Gemini's thinking parts", async () => {
    vi.stubGlobal(
      "fetch",
      fakeFetch({
        gemini: () => ok({ candidates: [{ content: { parts: [{ text: "hmm", thought: true }, { text: "Answer" }] } }] }),
      }),
    );
    const res = await handleChat(ask(), { GEMINI_API_KEY: "g" }, nextVisitor());
    expect(res.body.text).toBe("Answer");
  });

  it("limits one visitor to 15 questions per 10 minutes", async () => {
    vi.stubGlobal("fetch", fakeFetch({ gemini: () => geminiOk("ok") }));
    const who = nextVisitor();
    for (let i = 0; i < 15; i++) expect((await handleChat(ask(), { GEMINI_API_KEY: "g" }, who)).status).toBe(200);
    expect((await handleChat(ask(), { GEMINI_API_KEY: "g" }, who)).status).toBe(429);
    // Someone else can still ask.
    expect((await handleChat(ask(), { GEMINI_API_KEY: "g" }, nextVisitor())).status).toBe(200);
  });

  it("sends Groq a prompt short enough for its free tier", async () => {
    const fetch = fakeFetch({ gemini: () => new Response("quota", { status: 429 }), groq: () => groqOk("ok") });
    vi.stubGlobal("fetch", fetch);
    for (const caseId of ["dtrpg", "tamagotchi", "portfolio", "artpractice"]) {
      fetch.mockClear();
      await handleChat(ask("Tell me more", { caseId }), { GEMINI_API_KEY: "g", GROQ_API_KEY: "q" }, nextVisitor());
      const [gemini, groq] = fetch.mock.calls;
      expect(systemOf(groq).length).toBeLessThanOrEqual(20_000);
      expect(systemOf(gemini).length).toBeGreaterThanOrEqual(systemOf(groq).length);
    }
  });
});

describe("buildSystemPrompt", () => {
  it("answers in the visitor's language", () => {
    expect(buildSystemPrompt("pl")).toContain("Reply in Polish.");
    expect(buildSystemPrompt("en")).toContain("Reply in English.");
  });

  it("adds the open case study's details", () => {
    const home = buildSystemPrompt("en");
    for (const [id, heading] of [
      ["dtrpg", "DRIVETHRURPG REDESIGN CASE STUDY"],
      ["tamagotchi", "BOND CASE STUDY"],
      ["artpractice", "ART PRACTICE ASSISTANT CASE STUDY"],
      ["portfolio", "PORTFOLIO WEBSITE CASE STUDY"],
    ]) {
      const page = buildSystemPrompt("en", id);
      expect(page).toContain(heading);
      expect(page.length).toBeGreaterThan(home.length);
    }
  });

  it("keeps only English text in the facts", () => {
    expect(buildSystemPrompt("en", "tamagotchi")).not.toContain('"pl":');
  });

  it("makes a compact version without per-job detail", () => {
    expect(buildSystemPrompt("en", "tamagotchi", true).length).toBeLessThan(buildSystemPrompt("en", "tamagotchi").length);
  });
});
