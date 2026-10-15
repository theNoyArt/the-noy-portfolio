// Vercel Function: POST /api/chat
// Set GEMINI_API_KEY (free, from Google AI Studio) in the Vercel project's Environment Variables;
// optionally GROQ_API_KEY as a free backup and ANTHROPIC_API_KEY for Claude. See "AI chat" in README.md.

import { handleChat } from "../server/chat.js";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const visitor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const e = process.env;
  const result = await handleChat(
    body,
    {
      GEMINI_API_KEY: e.GEMINI_API_KEY,
      GEMINI_MODEL: e.GEMINI_MODEL,
      GROQ_API_KEY: e.GROQ_API_KEY,
      GROQ_MODEL: e.GROQ_MODEL,
      ANTHROPIC_API_KEY: e.ANTHROPIC_API_KEY,
      CHAT_MODEL: e.CHAT_MODEL,
      CHAT_PROVIDERS: e.CHAT_PROVIDERS,
    },
    visitor,
  );
  return Response.json(result.body, { status: result.status });
}
