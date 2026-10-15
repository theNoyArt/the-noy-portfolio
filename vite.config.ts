import { defineConfig, loadEnv, type Connect, type Plugin, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

type ChatModule = typeof import("./server/chat");

/**
 * Serves POST /api/chat during `npm run dev` and `npm run preview`, using the same
 * handler as the Vercel function. Reads the chat keys (GEMINI_API_KEY etc.) from .env.local.
 */
function chatApi(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), "");

  const handler =
    (load: () => Promise<ChatModule>): Connect.NextHandleFunction =>
    (req, res) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.end();
        return;
      }
      let raw = "";
      req.on("data", (chunk: Buffer) => (raw += chunk));
      req.on("end", async () => {
        let body: unknown = null;
        try {
          body = JSON.parse(raw);
        } catch {
          /* handled as an invalid request */
        }
        const { handleChat } = await load();
        const result = await handleChat(body, {
          GEMINI_API_KEY: env.GEMINI_API_KEY,
          GEMINI_MODEL: env.GEMINI_MODEL,
          GROQ_API_KEY: env.GROQ_API_KEY,
          GROQ_MODEL: env.GROQ_MODEL,
          ANTHROPIC_API_KEY: env.ANTHROPIC_API_KEY,
          CHAT_MODEL: env.CHAT_MODEL,
          CHAT_PROVIDERS: env.CHAT_PROVIDERS,
        });
        res.statusCode = result.status;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(result.body));
      });
    };

  return {
    name: "portfolio-chat-api",
    // In dev the handler is loaded through Vite, so edits to your content apply without a restart.
    configureServer(server) {
      server.middlewares.use(
        "/api/chat",
        handler(() => server.ssrLoadModule("/server/chat.ts") as Promise<ChatModule>),
      );
    },
    configurePreviewServer(server) {
      server.middlewares.use(
        "/api/chat",
        handler(() => import("./server/chat")),
      );
    },
  };
}

export default defineConfig(({ mode }) => ({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: lazyPlugins(() => [tailwindcss(), react(), chatApi(mode)]),
  // `npm test` (vp test): unit tests for content, helpers and the chat backend.
  test: {
    include: ["src/**/*.test.ts", "server/**/*.test.ts"],
    environment: "node",
  },
}));
