import type { Localized } from "./types";

// Portfolio website: content for src/pages/portfolio. This site, as a case study.

export const PF = {
  meta: {
    kind: { en: "Website · Portfolio", pl: "Strona · Portfolio" },
    origin: { en: "Self-initiated · 2026", pl: "Projekt własny · 2026" },
  },
  title: { en: "Portfolio website", pl: "Strona portfolio" },
  sub: { en: "The site you’re on, designed and built by me", pl: "Strona, na której jesteś, zaprojektowana i zbudowana przeze mnie" },
  lead: {
    en: "My portfolio, designed and coded from scratch to show how I work on both sides: UX/UI and front end. Two themes with their own personality, English and Polish, a case-study template reused by every project, and an AI assistant that answers questions about my experience.",
    pl: "Moje portfolio, zaprojektowane i zakodowane od zera, żeby pokazać, jak pracuję po obu stronach: UX/UI i front-end. Dwa motywy z własnym charakterem, angielski i polski, szablon case study używany przez każdy projekt i asystent AI, który odpowiada na pytania o moje doświadczenie.",
  },

  process: [
    {
      t: { en: "Explore directions", pl: "Szukanie kierunku" },
      d: {
        en: "Three directions prototyped in Claude Design: Editorial, Index and Index v2.",
        pl: "Trzy kierunki w Claude Design: Editorial, Index i Index v2.",
      },
      tag: { en: "Claude Design", pl: "Claude Design" },
    },
    {
      t: { en: "Pick and refine", pl: "Wybór i dopracowanie" },
      d: {
        en: "Index v2 won: a sidebar index, two themes and room for case studies.",
        pl: "Wygrał Index v2: indeks w sidebarze, dwa motywy i miejsce na case studies.",
      },
      tag: { en: "Prototype", pl: "Prototyp" },
    },
    {
      t: { en: "Rebuild in React", pl: "Przebudowa w React" },
      d: {
        en: "Ported to React 19 and TypeScript on Vite+, with all content in typed files.",
        pl: "Przeniesione do React 19 i TypeScript na Vite+, z całą treścią w typowanych plikach.",
      },
      tag: { en: "Front-end", pl: "Front-end" },
    },
    {
      t: { en: "Real content", pl: "Prawdziwa treść" },
      d: {
        en: "Filled from my CV: experience, client projects, skills and activities, in English and Polish.",
        pl: "Uzupełnione na podstawie CV: doświadczenie, projekty, umiejętności i aktywności, po angielsku i polsku.",
      },
      tag: { en: "Content", pl: "Treść" },
    },
    {
      t: { en: "Iterate", pl: "Iteracje" },
      d: {
        en: "Many small rounds on the hero, layout, contrast and motion, checked on screenshots in both themes.",
        pl: "Wiele małych rund nad hero, układem, kontrastem i animacjami, sprawdzanych na zrzutach w obu motywach.",
      },
      tag: { en: "UX/UI", pl: "UX/UI" },
    },
    {
      t: { en: "Case studies", pl: "Case studies" },
      d: {
        en: "Hand-built pages per project: DriveThruRPG, Bond, Art practice assistant and this one.",
        pl: "Osobne strony dla projektów: DriveThruRPG, Bond, Asystent praktyki artystycznej i ta.",
      },
      tag: { en: "Final stage", pl: "Etap końcowy" },
    },
  ] as { t: Localized; d: Localized; tag: Localized }[],

  features: [
    {
      k: { en: "Two themes", pl: "Dwa motywy" },
      t: { en: "Glass light & Cyber dark", pl: "Glass light i Cyber dark" },
      d: {
        en: "Two personalities, not just two colour sets: soft glass and rounded shapes, or square neon with a glitch transition between them.",
        pl: "Dwie osobowości, nie tylko dwie palety: miękkie szkło i zaokrąglenia albo kwadratowy neon, z przejściem w stylu glitch.",
      },
    },
    {
      k: { en: "Two languages", pl: "Dwa języki" },
      t: { en: "English & Polish", pl: "Angielski i polski" },
      d: {
        en: "Every text exists in both languages, and TypeScript won’t build if one is missing.",
        pl: "Każdy tekst istnieje w obu językach, a TypeScript nie zbuduje strony, jeśli któregoś brakuje.",
      },
    },
    {
      k: { en: "AI assistant", pl: "Asystent AI" },
      t: { en: "Ask AI about me", pl: "Zapytaj AI o mnie" },
      d: {
        en: "A chat on Gemini Flash’s free tier, with Groq as a backup, that answers from my real content only and knows which case study you’re reading.",
        pl: "Czat na darmowym planie Gemini Flash, z Groq jako zapasem, który odpowiada tylko na podstawie mojej treści i wie, które case study czytasz.",
      },
    },
    {
      k: { en: "Content first", pl: "Treść najpierw" },
      t: { en: "Typed content files", pl: "Typowane pliki treści" },
      d: {
        en: "Text, projects and roadmaps live in small typed files, so updating a progress bar is a one-line change.",
        pl: "Teksty, projekty i roadmapy są w małych typowanych plikach, więc zmiana paska postępu to jedna linijka.",
      },
    },
    {
      k: { en: "Accessible", pl: "Dostępność" },
      t: { en: "Contrast & motion", pl: "Kontrast i ruch" },
      d: {
        en: "Text checked against WCAG AA contrast, keyboard-friendly tabs, and every animation off for reduced motion.",
        pl: "Tekst sprawdzony pod kątem kontrastu WCAG AA, tabsy obsługiwane klawiaturą, a animacje wyłączone przy ograniczonym ruchu.",
      },
    },
    {
      k: { en: "Playful details", pl: "Detale" },
      t: { en: "A hero for each theme", pl: "Hero dla każdego motywu" },
      d: {
        en: "A clickable disciplines diagram in light mode and game-style achievements with a quest to start in dark mode.",
        pl: "Klikalny diagram dyscyplin w jasnym motywie i osiągnięcia w stylu gier z questem do rozpoczęcia w ciemnym.",
      },
    },
  ] as { k: Localized; t: Localized; d: Localized }[],

  stack: [
    { name: "Claude Design", note: { en: "Prototypes", pl: "Prototypy" } },
    { name: "React 19", note: { en: "UI", pl: "UI" } },
    { name: "TypeScript", note: { en: "Types for code and content", pl: "Typy dla kodu i treści" } },
    { name: "Vite+", note: { en: "Build & tooling", pl: "Build i narzędzia" } },
    { name: "Tailwind CSS v4", note: { en: "Theme variants, tailwind-variants recipes, no UI library", pl: "Warianty motywów, przepisy tailwind-variants, bez biblioteki UI" } },
    { name: "Gemini API", note: { en: "AI assistant, Groq as backup", pl: "Asystent AI, Groq jako zapas" } },
    { name: "Vitest", note: { en: "Unit tests, run with Vite+", pl: "Testy jednostkowe, uruchamiane przez Vite+" } },
  ] as { name: string; note: Localized }[],

  /** Two mood boards, one per theme. Colours and fonts are the real tokens from src/theme/themes.ts. */
  moods: [
    {
      id: "glass",
      name: "Glass light",
      concept: {
        en: "Calm, airy and modern: frosted panels floating over a soft lavender light.",
        pl: "Spokojny, lekki i nowoczesny: matowe panele unoszące się nad miękkim lawendowym światłem.",
      },
      trend: {
        en: "Follows today’s UI trends: glassmorphism and Apple’s Liquid Glass (2025), with translucent layers, soft depth and gentle gradients.",
        pl: "Podąża za aktualnymi trendami UI: glassmorphism i Liquid Glass od Apple (2025), z przezroczystymi warstwami, miękką głębią i delikatnymi gradientami.",
      },
      swatches: [
        { hex: "#f2f0fb", name: { en: "Lavender mist", pl: "Lawendowa mgła" } },
        { hex: "#ffffff", name: { en: "Frost", pl: "Szron" } },
        { hex: "#5a2fd0", name: { en: "Violet", pl: "Fiolet" } },
        { hex: "#3b78f0", name: { en: "Sky blue", pl: "Błękit" } },
        { hex: "#111018", name: { en: "Ink", pl: "Atrament" } },
      ],
      fonts: ["Instrument Sans", "JetBrains Mono"],
      shape: { en: "Rounded: 18px cards, 12px controls, pill buttons", pl: "Zaokrąglone: karty 18px, kontrolki 12px, przyciski-pigułki" },
      effects: { en: "Backdrop blur 22px + saturation 1.7, white inner edge, soft violet shadows", pl: "Rozmycie tła 22px + saturacja 1.7, biała wewnętrzna krawędź, miękkie fioletowe cienie" },
      notes: [
        { en: "Dark ink on a light field keeps body text above WCAG AA, even on translucent panels.", pl: "Ciemny atrament na jasnym tle utrzymuje tekst powyżej WCAG AA, nawet na przezroczystych panelach." },
        { en: "Colour lives in the background blobs, so cards can stay calm and readable.", pl: "Kolor żyje w plamach w tle, więc karty mogą być spokojne i czytelne." },
        { en: "Violet is the action colour; blue only supports it in gradients and the front-end track.", pl: "Fiolet to kolor akcji; niebieski tylko go wspiera w gradientach i ścieżce front-endu." },
        { en: "Glows are subtle and flat: they hint at light, not neon.", pl: "Poświaty są subtelne i płaskie: sugerują światło, nie neon." },
      ],
      keywords: [
        { en: "Frosted glass", pl: "Matowe szkło" },
        { en: "Soft light", pl: "Miękkie światło" },
        { en: "Rounded", pl: "Zaokrąglenia" },
        { en: "Depth", pl: "Głębia" },
        { en: "Calm", pl: "Spokój" },
      ],
    },
    {
      id: "cyber",
      name: "Cyber dark",
      concept: {
        en: "A nod to old-school game interfaces: square panels, neon on black and a little glitch.",
        pl: "Ukłon w stronę starych interfejsów gier: kwadratowe panele, neon na czerni i odrobina glitcha.",
      },
      trend: {
        en: "Inspired by retro game UI: CRT scanlines, arcade neon, HUD frames, achievement pop-ups and terminal-style mono type.",
        pl: "Inspirowany retro interfejsami gier: linie CRT, neon z automatów, ramki HUD, wyskakujące osiągnięcia i monospace jak w terminalu.",
      },
      swatches: [
        { hex: "#0a0910", name: { en: "Void", pl: "Pustka" } },
        { hex: "#110f1a", name: { en: "Panel", pl: "Panel" } },
        { hex: "#c58bff", name: { en: "Neon violet", pl: "Neonowy fiolet" } },
        { hex: "#7fd7e8", name: { en: "Cyan", pl: "Cyjan" } },
        { hex: "#ebe8f4", name: { en: "Phosphor", pl: "Fosfor" } },
      ],
      fonts: ["Tomorrow", "Hanken Grotesk", "JetBrains Mono"],
      shape: { en: "Square: 0px radius everywhere, 1px outlines, HUD-style frames", pl: "Kwadratowe: promień 0px wszędzie, obrysy 1px, ramki w stylu HUD" },
      effects: { en: "CRT scanlines, faint grid, neon glow, flicker on headings, glitch transition", pl: "Linie CRT, delikatna siatka, neonowa poświata, migotanie nagłówków, przejście glitch" },
      notes: [
        { en: "Square corners and mono labels make it read like a game HUD, not a dark copy of the light theme.", pl: "Kwadratowe rogi i etykiety monospace sprawiają, że wygląda jak HUD gry, a nie ciemna kopia jasnego motywu." },
        { en: "Neon is reserved for accents; body text stays soft phosphor white for long reading.", pl: "Neon tylko dla akcentów; tekst pozostaje miękko fosforyzującą bielą do dłuższego czytania." },
        { en: "Cyan marks the front-end track and system messages, violet everything you can click.", pl: "Cyjan oznacza ścieżkę front-endu i komunikaty systemowe, fiolet wszystko, co klikalne." },
        { en: "Scanlines and glitch are decoration only, and switch off for reduced motion.", pl: "Linie i glitch to tylko dekoracja i wyłączają się przy ograniczonym ruchu." },
      ],
      keywords: [
        { en: "CRT scanlines", pl: "Linie CRT" },
        { en: "Arcade neon", pl: "Neon z automatów" },
        { en: "HUD", pl: "HUD" },
        { en: "Achievements", pl: "Osiągnięcia" },
        { en: "Glitch", pl: "Glitch" },
      ],
    },
  ],

  /** Ideas for later: features that would be fun to add. */
  ideas: [
    { en: "Theme that follows the time of day", pl: "Motyw zależny od pory dnia" },
    { en: "Optional retro sound effects in Cyber", pl: "Opcjonalne retro dźwięki w Cyber" },
    { en: "Saved achievements & secret quests", pl: "Zapisywane osiągnięcia i sekretne questy" },
    { en: "Keyboard shortcuts & command menu", pl: "Skróty klawiszowe i menu komend" },
    { en: "Print-friendly CV view", pl: "Widok CV do druku" },
    { en: "Reading progress in case studies", pl: "Postęp czytania w case studies" },
  ] as Localized[],

  next: [
    { status: "active", title: { en: "Finish case studies", pl: "Dokończyć case studies" }, points: [{ en: "Real data for Bond and Art practice", pl: "Prawdziwe dane dla Bond i Asystenta" }] },
    { status: "planned", title: { en: "Deploy", pl: "Publikacja" }, points: [{ en: "Hosting and the chat API in production", pl: "Hosting i API czatu na produkcji" }] },
    { status: "planned", title: { en: "Tests & checks", pl: "Testy i kontrole" }, points: [{ en: "Unit tests, Lighthouse, accessibility audit", pl: "Testy jednostkowe, Lighthouse, audyt dostępności" }] },
    { status: "planned", title: { en: "Real art", pl: "Prawdziwa grafika" }, points: [{ en: "Replace placeholders with my own illustrations", pl: "Zastąpić placeholdery moimi ilustracjami" }] },
  ] as { status: "active" | "planned"; title: Localized; points: Localized[] }[],
};

/** Overview table. */
export const PF_FACTS: [Localized, Localized][] = [
  [{ en: "Role", pl: "Rola" }, { en: "UX/UI design, front-end, content", pl: "Projekt UX/UI, front-end, treść" }],
  [{ en: "Scope", pl: "Zakres" }, { en: "Home page, 4 case studies, 2 themes, EN/PL, AI chat", pl: "Strona główna, 4 case studies, 2 motywy, EN/PL, czat AI" }],
  [{ en: "Year", pl: "Rok" }, { en: "2026", pl: "2026" }],
  [{ en: "Tools", pl: "Narzędzia" }, { en: "Claude Design, Claude Code", pl: "Claude Design, Claude Code" }],
  [{ en: "Stack", pl: "Stack" }, { en: "React 19, TypeScript, Vite+, Tailwind CSS, Gemini API", pl: "React 19, TypeScript, Vite+, Tailwind CSS, Gemini API" }],
];

type WStep = { t: Localized; d: Localized };

/** Wireframe annotations, numbered to match the pins on each frame. */
export const PF_WIRES: {
  home: WStep[];
  project: WStep[];
  homeNotes: WStep[];
  projectNotes: WStep[];
  homeMobile: WStep[];
  projectMobile: WStep[];
  homeMobileNotes: WStep[];
  projectMobileNotes: WStep[];
} = {
  home: [
    { t: { en: "Sidebar index", pl: "Indeks w sidebarze" }, d: { en: "Always visible on desktop: name, sections with the active one highlighted, language and theme at the bottom.", pl: "Zawsze widoczny na desktopie: imię, sekcje z podświetloną aktywną, język i motyw na dole." } },
    { t: { en: "Hero", pl: "Hero" }, d: { en: "Name, role with a “+” between the two disciplines, a short intro and two CTAs. Full screen height.", pl: "Imię, rola z „+” między dyscyplinami, krótkie intro i dwa CTA. Pełna wysokość ekranu." } },
    { t: { en: "Theme panel", pl: "Panel motywu" }, d: { en: "Changes with the theme: a clickable disciplines diagram in Glass, game achievements in Cyber.", pl: "Zmienia się z motywem: klikalny diagram dyscyplin w Glass, osiągnięcia w Cyber." } },
    { t: { en: "About", pl: "O mnie" }, d: { en: "Four stage tabs (research, design, front end, tests) with methods, tools and links into case studies.", pl: "Cztery etapy (badania, projekt, front-end, testy) z metodami, narzędziami i linkami do case studies." } },
    { t: { en: "Project showcase", pl: "Projekty" }, d: { en: "One large card, then a grid; in-progress cards show their stage.", pl: "Jedna duża karta, potem siatka; projekty w trakcie pokazują swój etap." } },
    { t: { en: "Experience", pl: "Doświadczenie" }, d: { en: "A timeline with filters; picking a company opens its client projects below.", pl: "Oś czasu z filtrami; wybór firmy otwiera jej projekty poniżej." } },
    { t: { en: "Other activities", pl: "Inne aktywności" }, d: { en: "Three compact cards and a row of hobbies, no images.", pl: "Trzy kompaktowe karty i rząd hobby, bez zdjęć." } },
    { t: { en: "AI chat", pl: "Czat AI" }, d: { en: "Floating button, hidden on the hero where the intro already has one.", pl: "Pływający przycisk, ukryty w hero, gdzie intro już go ma." } },
  ],
  homeNotes: [
    { t: { en: "Max width", pl: "Maks. szerokość" }, d: { en: "Content stops at 1360px; dividers still run edge to edge.", pl: "Treść kończy się na 1360px; linie podziału idą od krawędzi do krawędzi." } },
    { t: { en: "Mobile", pl: "Mobile" }, d: { en: "The sidebar becomes a top bar with a menu; sections stack.", pl: "Sidebar zmienia się w górny pasek z menu; sekcje układają się w kolumnę." } },
  ],
  project: [
    { t: { en: "Case sidebar", pl: "Sidebar projektu" }, d: { en: "Back to projects, the project name, numbered sections and links (demo, GitHub, Figma).", pl: "Powrót do projektów, nazwa projektu, numerowane sekcje i linki (demo, GitHub, Figma)." } },
    { t: { en: "01 · Overview", pl: "01 · Przegląd" }, d: { en: "Meta row, big title, lead, buttons and a facts table, next to a hero visual (a before/after lens on DriveThruRPG).", pl: "Wiersz meta, duży tytuł, lead, przyciski i tabela faktów obok wizualu (soczewka przed/po w DriveThruRPG)." } },
    { t: { en: "Design track band", pl: "Pasek ścieżki projektu" }, d: { en: "A coloured divider that opens the design part, 02—05.", pl: "Kolorowy podział otwierający część projektową, 02—05." } },
    { t: { en: "02 · Audit", pl: "02 · Audyt" }, d: { en: "Numbers first, then filterable findings by page and type (fix, improvement, idea).", pl: "Najpierw liczby, potem filtrowane wnioski według strony i typu (poprawka, ulepszenie, pomysł)." } },
    { t: { en: "03 · Wireframes", pl: "03 · Wireframe’y" }, d: { en: "Screen cards, a desktop/mobile switch and numbered notes next to each frame.", pl: "Karty ekranów, przełącznik desktop/mobile i numerowane notatki obok każdej ramki." } },
    { t: { en: "04 · Design system", pl: "04 · Design system" }, d: { en: "Tokens and components with a light/dark switch and contrast checks.", pl: "Tokeny i komponenty z przełącznikiem jasny/ciemny i sprawdzeniem kontrastu." } },
    { t: { en: "05 · Mockups", pl: "05 · Makiety" }, d: { en: "Final screens by device and theme, opening in a lightbox.", pl: "Finalne ekrany według urządzenia i motywu, otwierane w lightboxie." } },
    { t: { en: "Build track band", pl: "Pasek ścieżki budowy" }, d: { en: "A second colour opens the code part, 06—07.", pl: "Drugi kolor otwiera część kodu, 06—07." } },
    { t: { en: "06 · Front end", pl: "06 · Front-end" }, d: { en: "Stack, architecture and key code decisions.", pl: "Stack, architektura i kluczowe decyzje w kodzie." } },
    { t: { en: "07 · Mock API", pl: "07 · Mock API" }, d: { en: "Endpoints and a link to the live Swagger docs.", pl: "Endpointy i link do dokumentacji Swagger." } },
    { t: { en: "Closing", pl: "Zakończenie" }, d: { en: "Next case study with a cover, and a contact card with “back to top”.", pl: "Następne case study z okładką i karta kontaktu z „do góry”." } },
  ],
  homeMobile: [
    { t: { en: "Top bar", pl: "Górny pasek" }, d: { en: "Replaces the sidebar: name, language & theme, and a menu that opens the sections full screen.", pl: "Zastępuje sidebar: imię, język i motyw oraz menu otwierające sekcje na pełnym ekranie." } },
    { t: { en: "Hero", pl: "Hero" }, d: { en: "Name, role, intro and two full-width CTAs stacked. The theme panel is left out to keep the first screen short.", pl: "Imię, rola, intro i dwa CTA na pełną szerokość, jedno pod drugim. Panel motywu jest pominięty, by pierwszy ekran był krótki." } },
    { t: { en: "Contact", pl: "Kontakt" }, d: { en: "Status, the email as one field with a copy button, then GitHub and CV as two equal halves.", pl: "Status, e-mail jako jedno pole z przyciskiem kopiowania, potem GitHub i CV jako dwie równe połowy." } },
    { t: { en: "About", pl: "O mnie" }, d: { en: "The four stage tabs in one row; the selected stage fits on one screen.", pl: "Cztery etapy w jednym rzędzie; wybrany etap mieści się na jednym ekranie." } },
    { t: { en: "Project showcase", pl: "Projekty" }, d: { en: "Cards in one column, in-progress stages still visible.", pl: "Karty w jednej kolumnie, etapy projektów w trakcie nadal widoczne." } },
    { t: { en: "Experience", pl: "Doświadczenie" }, d: { en: "A compact timeline, then a company strip that sticks under the top bar while you read the projects.", pl: "Kompaktowa oś czasu, potem pasek firm, który przykleja się pod górnym paskiem podczas czytania projektów." } },
    { t: { en: "Other activities", pl: "Inne aktywności" }, d: { en: "Cards stacked, hobbies wrap below.", pl: "Karty jedna pod drugą, hobby zawijają się poniżej." } },
    { t: { en: "AI chat", pl: "Czat AI" }, d: { en: "Floating button after the hero; the chat opens full screen.", pl: "Pływający przycisk po hero; czat otwiera się na pełnym ekranie." } },
  ],
  homeMobileNotes: [
    { t: { en: "Breakpoint", pl: "Breakpoint" }, d: { en: "Below 900px the sidebar turns into the top bar and every section stacks.", pl: "Poniżej 900px sidebar zmienia się w górny pasek, a sekcje układają się w kolumnę." } },
    { t: { en: "Thumb first", pl: "Pod kciuk" }, d: { en: "Main actions are full width and at least 44px tall.", pl: "Główne akcje mają pełną szerokość i co najmniej 44px wysokości." } },
  ],
  projectMobile: [
    { t: { en: "Top bar", pl: "Górny pasek" }, d: { en: "The same bar as on the home page: name, language & theme, menu.", pl: "Ten sam pasek co na stronie głównej: imię, język i motyw, menu." } },
    { t: { en: "Section bar", pl: "Pasek sekcji" }, d: { en: "Sticks under the top bar: back to projects, the current section with a progress line, and a menu to jump to any section.", pl: "Przykleja się pod górnym paskiem: powrót do projektów, bieżąca sekcja z paskiem postępu i menu do skoku do dowolnej sekcji." } },
    { t: { en: "01 · Overview", pl: "01 · Przegląd" }, d: { en: "Title, lead, buttons and facts; the hero visual moves below them and the lens opens with a tap.", pl: "Tytuł, lead, przyciski i fakty; wizual przechodzi pod nie, a soczewka otwiera się dotknięciem." } },
    { t: { en: "Design track band", pl: "Pasek ścieżki projektu" }, d: { en: "The coloured dividers stay, so the two tracks still read on a phone.", pl: "Kolorowe podziały zostają, więc obie ścieżki są czytelne także na telefonie." } },
    { t: { en: "Sections", pl: "Sekcje" }, d: { en: "Everything stacks; side notes move under their frame and switches stay on top.", pl: "Wszystko układa się w kolumnę; notatki trafiają pod ramkę, a przełączniki zostają na górze." } },
    { t: { en: "Build track band", pl: "Pasek ścieżki budowy" }, d: { en: "Opens the code part, as on desktop.", pl: "Otwiera część kodu, jak na desktopie." } },
    { t: { en: "Closing", pl: "Zakończenie" }, d: { en: "Next project card above the contact card.", pl: "Karta następnego projektu nad kartą kontaktu." } },
  ],
  projectMobileNotes: [
    { t: { en: "No sidebar", pl: "Bez sidebara" }, d: { en: "The section bar does the sidebar’s job: where you are, how far you’ve read, where to go next.", pl: "Pasek sekcji przejmuje rolę sidebara: gdzie jesteś, ile przeczytałeś i dokąd dalej." } },
    { t: { en: "Same content", pl: "Ta sama treść" }, d: { en: "Nothing is cut from a case study on a phone; only the layout changes.", pl: "Na telefonie nic nie znika z case study; zmienia się tylko układ." } },
  ],
  projectNotes: [
    { t: { en: "One template", pl: "Jeden szablon" }, d: { en: "Every project reuses this order and shortens it: Bond and Art practice swap audit for research and a roadmap.", pl: "Każdy projekt używa tej kolejności i ją skraca: Bond i Asystent zamieniają audyt na badania i roadmapę." } },
    { t: { en: "Two tracks", pl: "Dwie ścieżki" }, d: { en: "Design and build sections get their own colour, so the reader always knows which skill they’re looking at.", pl: "Sekcje projektu i budowy mają własny kolor, więc czytelnik wie, którą umiejętność ogląda." } },
  ],
};

/** Project links. Leave a url empty to show it as "coming soon". */
export const PF_LINKS = { github: "" };
