# Portfolio

React + TypeScript + Vite version of the "Portfolio B v2" design from Claude Design.
Two visual modes (Cyber dark / Glass light) with a glitch transition, EN/PL, a cursor-lens
portrait, clickable case studies and an AI chat that answers questions about you.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Local dev server with hot reload             |
| `npm run build`     | Type-check, then build the site into `dist/` |
| `npm run preview`   | Serve the built `dist/` locally              |
| `npm run typecheck` | Type-check only                              |

## Where things are

```
src/
  content/          ← YOUR CONTENT. Almost everything you'll edit is here.
    person.ts         name, role, intro, email, links, CV, portrait, chat starter questions
    about.ts          About text and the four stage tabs (Research, Design, Front-end, Tests)
    showcase.ts       Project showcase (5 cards, each also a full case study)
    experience.ts     Companies on the timeline and which projects are pinned to them
    caseStudies.ts    Case studies for work done at those companies
    activities.ts     Other activities (art, photography, talks…)
    ui.ts             Interface labels in English and Polish
    types.ts          The shape of all the above (your editor will autocomplete from it)
  config.ts         default theme, placeholder-metrics switch
  theme/themes.ts   colour and font tokens for both modes
  app/              routing, navigation, theme switch, page transitions
  sections/         Home page sections (Hero, About, Showcase, Experience, Other)
  pages/            HomePage and CaseStudyPage
  components/       sidebar, mobile menu, preferences popover, chat
server/chat.ts      AI chat backend (builds the prompt from your content)
api/chat.ts         the same backend as a Vercel function
public/images/      put your images here (see the README inside)
design-reference/   the original Claude Design files, for comparison only
```

## Filling in real content

Every text is `{ en: '...', pl: '...' }`. Write both; TypeScript will complain if one is missing.

**Your details** — `src/content/person.ts`. Set `name`, `firstName`, `email`, `links`, `cv.url`.
Put a CV PDF in `public/` (e.g. `public/cv.pdf`) and set `cv.url: '/cv.pdf'`.

**Portrait** — save two images with the same framing in `public/images/` and set:

```ts
portrait: { primary: '/images/portrait.jpg', alt: '/images/portrait-illustrated.png', ... }
```

`primary` is the photo, `alt` is the layer the cursor lens reveals.

**Add a showcase project** — copy one entry in `showcase.ts`, change the `id` (lowercase, no spaces)
and the content. The first entry in the list gets the big card. To link it from an About tab,
add its id to that tab's `links` in `about.ts`.

**Add a work project** — copy an entry in `caseStudies.ts`, give it a new `id`, then pin it on the
timeline by adding it to the right company in `experience.ts`:

```ts
projects: [{ id: 'my-new-project', at: 2025.5 }],   // at = year + fraction (2025.5 ≈ July 2025)
```

`tracks: ['ux']`, `['dev']` or `['ux', 'dev']` controls the Design / Build tags and the filter.

**Add a company** — add an entry to `experience.ts` (newest first). `to: null` means "now".
The timeline starts at the earliest `from` year automatically.

**Images in case studies** — each project has an optional `images` object:
`cover`, `hero`, `flows`, `ia`, `wireframes`, `screens`, `components`, `designSystem`, `prototype`.
Anything left out shows a striped placeholder.

**Live demo / GitHub buttons** — `links: { live: 'https://…', source: 'https://…' }`.
Set one to `''` to hide that button.

### Placeholder metrics (important before publishing)

The UX audit report, test counts and analytics funnel on case-study pages are **generated
placeholder numbers**, marked with a "Placeholder data" badge. To use real numbers, add a
`metrics` object to a project (the `CaseMetrics` type in `types.ts` lists every field; leave out
a part to hide that block). To hide the placeholders everywhere, set
`showPlaceholderMetrics: false` in `src/config.ts`; then the audit section only appears for
projects with real `metrics.audit`.

### DriveThruRPG case study (hand-built page)

The `dtrpg` showcase project has `page: "dtrpg"`, so it opens its own page
(`src/pages/dtrpg`) instead of the standard template. Its sidebar sections and project links
come from `src/app/sections.ts` and `src/pages/dtrpg/CaseLinks.tsx`.

- Content: `src/content/dtrpg/` (audit insights, wireframes, mockups, design tokens, lists).
  Polish copy is in `pl.ts`, keyed by the English text; audit insights and screen notes stay
  in English.
- Links: `DT_LINKS` in `src/content/dtrpg/project.ts` (demo, GitHub, Figma, Swagger UI,
  `openapi.json`). A link left as `""` shows its button as "coming soon".
- AI chat: on this page the chat sends `caseId: "dtrpg"`, and `server/chat.ts` adds the full
  case study (`src/content/dtrpg/chatContext.ts`: audit insights, screen notes, tokens, stack) to
  the prompt (Groq, the backup, gets the shorter general prompt). Starter questions are
  `DT_CHAT_SUGGESTIONS` in `project.ts`.
- Images: `public/images/dtrpg/` (hero before/after, wireframes, mockups in both themes,
  showcase covers).
- Styles: Tailwind classes plus the case-study recipes in `src/pages/dtrpg/case-ui.ts`. The
  `case-scope` utility (`src/styles/tw/case.css`) carries the page's own colour tokens, so the
  case study looks exactly like the approved prototype in both themes.

## Look and feel

- `src/config.ts`: `defaultTheme` (`'dark'` is Cyber dark, `'light'` is Glass light).
- `src/theme/themes.ts`: the colour tokens of both modes, set as CSS variables on `<html>`.

### Styling (Tailwind CSS v4 + tailwind-variants)

- `src/styles/app.css` is the only stylesheet entry. It maps the theme variables to Tailwind
  names (`bg-surface`, `text-muted`, `border-line2`, `text-accent`, `font-display`,
  `rounded-card`, `shadow-glass`…) and adds the variants `glass:` (Glass light), `cyber:`
  (Cyber dark), `narrow:` and `wide:` (the JS-measured mobile/desktop layout). Tailwind's
  preflight is not used; the small reset lives in its `@layer base`.
- Shared component recipes (`tv()` from tailwind-variants) are in `src/styles/recipes.ts`
  (section, buttons, chips, tags, segmented controls, lists). Area recipes sit next to their
  components: `components/shell.styles.ts`, `pages/dtrpg/case-ui.ts`, `pages/tamagotchi/tg-ui.ts`
  (Bond and Art practice), `pages/portfolio/pf-ui.ts`.
- `src/styles/tw/*.css` hold only what utilities can't express: keyframes/animations and a few
  `@utility` helpers per area (shell, home, case, projects, portfolio).
- Merge conditional classes with `cn()` from `src/lib/cn.ts` (clsx + tailwind-merge). Write
  class names in full (no `"bg-" + colour`), so Tailwind can find them.
- Fonts load from Google Fonts in `index.html`.
- Visitors' theme and language choices are remembered in their browser.

## AI chat

The chat sends questions to `/api/chat`, which builds a prompt from your content files (so it
always answers from what's on the site) and asks a model. API keys never reach the browser.

Providers are tried in order and any without a key is skipped. If one fails or hits its limit,
the next one answers; if none can, the visitor sees a friendly "email me" message.

| Order | Provider | Key | Default model | Cost |
|---|---|---|---|---|
| 1 | Google Gemini | `GEMINI_API_KEY` | `gemini-flash-latest` | Free tier |
| 2 | Groq (backup) | `GROQ_API_KEY` | `openai/gpt-oss-120b` | Free tier |
| 3 | Claude (optional) | `ANTHROPIC_API_KEY` | `claude-haiku-5-5` | Paid, a fraction of a cent per question |

1. Create a free key in Google AI Studio: https://aistudio.google.com/apikey (no card needed).
   Optionally a free Groq key too: https://console.groq.com/keys.
2. Copy `.env.example` to `.env.local` and paste the key(s).
3. Restart `npm run dev`. The chat now works locally.

Settings: `GEMINI_MODEL`, `GROQ_MODEL` and `CHAT_MODEL` (Claude) change the models;
`CHAT_PROVIDERS` changes the order, e.g. `groq,gemini`. Your current free limits are shown in
AI Studio (Rate limits) and in the Groq console.

- On a case-study page the prompt also includes that page's content: DriveThruRPG from
  `src/content/dtrpg/chatContext.ts`; Bond, Art practice and Portfolio website from
  `src/content/chatPages.ts` (built from the same content files as the pages). Groq's free tier
  allows only ~8k tokens a minute, so it gets a compact version (without per-job client detail);
  on DriveThruRPG, whose case study is too long even then, it gets the general prompt.
- Each visitor can ask 15 questions per 10 minutes and 60 a day (kept in memory, best effort),
  so one person can't use up the free daily quota. Tune `LIMITS` in `server/chat.ts`.
- The conversation is trimmed to the last 20 messages, 800 characters each.
- Gemini's free tier: outside the EU/EEA, UK and Switzerland Google may use free-tier prompts to
  improve its products. Check the current Gemini API terms for your situation.

## Tests

Unit tests use Vitest through Vite+ (`import { describe, it, expect } from "vite-plus/test"`).

```
npm test            # run once (vp test)
npm run test:watch  # re-run on changes
```

- `src/content/content.test.ts`: every text has English and Polish, interface strings match in
  both languages, covers and the CV file exist, timeline and roadmap values make sense, and each
  wireframe pin has a note.
- `src/lib/*.test.ts`: class merging (`cn`), covers per theme, case order (next project).
- `server/chat.test.ts`: the chat backend with a fake `fetch`: provider order and fallback,
  the per-visitor limit, Groq's shorter prompt, and the case-study context in the prompt.

Test settings are in the `test` block of `vite.config.ts`.

## Link previews

`index.html` has Open Graph tags with `public/og-image.jpg` (1200×630, the home page in Cyber).
Most sites need absolute URLs, so after deploying replace `/og-image.jpg` with your full address
(e.g. `https://your-domain/og-image.jpg`) and add `<meta property="og:url" content="https://your-domain/" />`.

## Deploying

**Vercel (simplest, chat works out of the box):** push this folder to a GitHub repo, import it in
Vercel, and add `GEMINI_API_KEY` (and optionally `GROQ_API_KEY`) under Project → Settings →
Environment Variables. Vercel
detects Vite and serves `api/chat.ts` as a function.

**Netlify, Cloudflare Pages, GitHub Pages, any static host:** `npm run build` and upload `dist/`.
The site works fully except the chat, which needs a server. Either port `api/chat.ts` to that
host's function format (the logic is all in `server/chat.ts`), or set `chatEndpoint` in
`src/config.ts` to a chat endpoint you host elsewhere.

## Notes

- Case studies have their own URLs (`/#/case/ledgerly`), so you can link to one directly.
- Motion respects the visitor's "reduce motion" setting.
- `design-reference/` holds the original Claude Design export. It isn't part of the build;
  delete it whenever you like.
