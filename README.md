# Paulina Targosz · Portfolio

**Front-end Developer + UX/UI Designer**

🔗 **Live:** [https://the-noy-portfolio.vercel.app/](https://the-noy-portfolio.vercel.app/)

My personal portfolio, designed and built by me from the first sketch to the deployed code. It shows both sides of my work, design and front-end development, in one place: hand-built case studies, ten years of experience on an interactive timeline, and an AI assistant that answers questions about my work.

## Highlights

- **Two themes, two personalities.** _Glass light_ (frosted panels, soft gradients, inspired by today's glassmorphism and Liquid Glass trends) and _Cyber dark_ (old-school game UI: neon, scanlines, HUD frames and a glitch transition between themes).
- **A hero for each theme.** A clickable disciplines diagram in Glass, game-style achievements with a quest to start in Cyber.
- **Hand-built case studies.** DriveThruRPG (UX audit → wireframes → design system → React build on a mock API), Bond (a Tamagotchi-inspired game about attachment), an Art practice assistant and this portfolio itself, each with its own process and visuals.
- **"Ask AI about me".** A chat that answers only from the site's content and knows which case study you're reading. It runs on Gemini Flash's free tier, with Groq as a backup and a per-visitor limit.
- **English & Polish.** Every text exists in both languages; TypeScript and tests make sure none is missing.
- **Mobile-first details.** A sticky section bar on case studies, a pinned company strip in Experience, and compact layouts that fit one screen.
- **Accessible.** WCAG AA contrast, keyboard-friendly tabs, and every animation turned off for reduced motion.

## Stack

| Area      | Tools                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------- |
| Design    | Claude Design (prototypes)                                                                          |
| Front end | React 19 · TypeScript · Vite+                                                                       |
| Styling   | Tailwind CSS v4 with `glass:` / `cyber:` theme variants · tailwind-variants recipes · no UI library |
| AI chat   | Gemini API (Groq backup) via a serverless function                                                  |
| Tests     | Vitest (through Vite+)                                                                              |
| Hosting   | Vercel                                                                                              |

## Run it locally

```bash
npm install
cp .env.example .env.local   # add GEMINI_API_KEY for the chat (free in Google AI Studio)
npm run dev
```

```bash
npm test         # unit tests
npm run build    # typecheck + production build
```

---

Designed & built by **Paulina Targosz** · [paulinatargo@gmail.com](mailto:paulinatargo@gmail.com) · [GitHub](https://github.com/theNoyArt)
