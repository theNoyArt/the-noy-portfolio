import type { Localized, ShowcaseProject } from "./types";

export const SHOWCASE_DESC: Localized = {
  en: "Self-initiated projects that show the full path, from research and design to a tested front end.",
  pl: "Własne projekty pokazujące całą drogę: od badań i projektu po przetestowany front-end.",
};

// Project showcase cards. The first project gets the large card.
// Each one also opens as a full case study (stages.research / stages.tests feed
// the Research and Testing sections there).
// images: { cover, hero, flows, ia, wireframes, screens, components, designSystem, prototype }
// links: { live, source } — leave a link as '' to hide its button.
export const SHOWCASE: ShowcaseProject[] = [
  {
    // Hand-built case-study page: src/pages/dtrpg (content in src/content/dtrpg).
    // The fields below feed the showcase card, the About links and the AI chat.
    id: "dtrpg",
    page: "dtrpg",
    name: "DriveThruRPG",
    type: { en: "E-commerce · Marketplace", pl: "E-commerce · Marketplace" },
    origin: { en: "Self-initiated", pl: "Projekt własny" },
    year: "2026",
    hue: 268,
    short: {
      en: "A UX/UI audit and redesign of the biggest tabletop-RPG marketplace, rebuilt as a working React storefront on a mock API.",
      pl: "Audyt UX/UI i redesign największego marketplace’u z grami RPG, odtworzony jako działający sklep w React na mock API.",
    },
    tech: ["React 19", "TypeScript", "TanStack", "shadcn/ui", "Figma"],
    tools: "Figma, FigJam, Claude",
    role: {
      en: "UX/UI Designer, Front-end Developer",
      pl: "Projektantka UX/UI, Front-end Developerka",
    },
    team: { en: "Solo", pl: "Samodzielnie" },
    duration: { en: "2 weeks", pl: "2 tygodnie" },
    intro: {
      en: "DriveThruRPG is one of the biggest marketplaces for tabletop RPG PDFs and print-on-demand books. I audited it, redesigned it in Figma and built the redesign as a clickable React storefront.",
      pl: "DriveThruRPG to jeden z największych marketplace’ów z RPG w PDF i książkami drukowanymi na żądanie. Zrobiłam audyt, redesign w Figmie i zbudowałam go jako klikalny sklep w React.",
    },
    product: {
      en: "A marketplace with tens of thousands of titles: browse, filter, cart, checkout and a personal library.",
      pl: "Marketplace z dziesiątkami tysięcy tytułów: przeglądanie, filtry, koszyk, płatność i biblioteka.",
    },
    audience: {
      en: "Players and game masters browsing tens of thousands of titles.",
      pl: "Gracze i mistrzowie gry przeglądający dziesiątki tysięcy tytułów.",
    },
    problem: {
      en: "The site feels dated because of three compounding problems: visual inconsistency, a mobile layout that only reflows desktop, and a split, incomplete filter system.",
      pl: "Strona wydaje się przestarzała przez trzy nakładające się problemy: niespójność wizualną, mobile będący tylko przełamanym desktopem i rozbity, niepełny system filtrów.",
    },
    resp: {
      en: "Heuristic audit, wireframes, design system and final designs in Figma, React front-end build on a mock API.",
      pl: "Audyt heurystyczny, wireframe’y, design system i finalne projekty w Figmie, front-end w React na mock API.",
    },
    stages: {
      research: {
        en: "Heuristic evaluation against Nielsen’s 10 heuristics: 87 insights across 6 pages.",
        pl: "Ocena heurystyczna według 10 heurystyk Nielsena: 87 wniosków z 6 stron.",
      },
      design: {
        en: "Wireframes, a shadcn/ui design system with light and dark tokens, and 12 screens of mockups.",
        pl: "Wireframe’y, design system na shadcn/ui z tokenami jasnymi i ciemnymi oraz 12 ekranów makiet.",
      },
      frontend: {
        en: "React 19 and TypeScript with TanStack Router and Query, on a mock API documented with OpenAPI.",
        pl: "React 19 i TypeScript z TanStack Router i Query, na mock API opisanym w OpenAPI.",
      },
      tests: {
        en: "Vitest with Testing Library, run through Vite+.",
        pl: "Vitest z Testing Library, uruchamiany przez Vite+.",
      },
    },
    ux: [
      {
        t: { en: "One entry point for filters", pl: "Jedno wejście do filtrów" },
        d: {
          en: "Filters and Browse Categories merge; facets move to the results and listing pages.",
          pl: "Filtry i Browse Categories łączą się; fasety trafiają na strony wyników i listingu.",
        },
      },
      {
        t: { en: "Settings in the header", pl: "Ustawienia w nagłówku" },
        d: {
          en: "Language, currency and theme move up from a footer about 2,000px down on mobile.",
          pl: "Język, waluta i motyw przenoszą się ze stopki, która na telefonie jest ok. 2000px niżej.",
        },
      },
    ],
    ui: [
      {
        t: { en: "Red for one action per view", pl: "Czerwień dla jednej akcji na widok" },
        d: {
          en: "Brand red is reserved for the primary action and status signals; primary-text and primary-solid keep it AA.",
          pl: "Czerwień marki tylko dla głównej akcji i statusów; primary-text i primary-solid utrzymują AA.",
        },
      },
    ],
    arch: [
      {
        t: { en: "Mock API with a contract", pl: "Mock API z kontraktem" },
        d: {
          en: "One dependency-free Node file serves /api/v1, described by OpenAPI 3.0.3 and explorable in Swagger UI.",
          pl: "Jeden plik Node bez zależności obsługuje /api/v1, opisany w OpenAPI 3.0.3 i dostępny w Swagger UI.",
        },
      },
      {
        t: { en: "Validated responses", pl: "Walidowane odpowiedzi" },
        d: {
          en: "TanStack Query fetches and Zod validates every response.",
          pl: "TanStack Query pobiera dane, a Zod waliduje każdą odpowiedź.",
        },
      },
    ],
    challenge: {
      en: "Making a prototype behave like a real product without a back end.",
      pl: "Sprawić, by prototyp działał jak prawdziwy produkt bez back-endu.",
    },
    solution: {
      en: "A small mock API with generated data, hosted for free, so the prototype can be shared by link and reset in seconds.",
      pl: "Małe mock API z generowanymi danymi, hostowane za darmo, więc prototyp można udostępnić linkiem i zresetować w kilka sekund.",
    },
    code: "",
    results: [
      { v: "87", l: { en: "audit insights", pl: "wniosków z audytu" } },
      { v: "12", l: { en: "screens designed", pl: "zaprojektowanych ekranów" } },
      { v: "2", l: { en: "themes, checked for contrast", pl: "motywy ze sprawdzonym kontrastem" } },
    ],
    learned: {
      en: "None of the problems needed a full rebuild: they could be fixed as a component-level pass.",
      pl: "Żaden z problemów nie wymagał przebudowy od zera: wystarczyło poprawić komponenty.",
    },
    improve: {
      en: "Design the states the mockups don’t show yet.",
      pl: "Zaprojektować stany, których makiety jeszcze nie pokazują.",
    },
    links: {
      live: "https://drivethrurpg-redesign.paulinatargo.workers.dev/",
      source: "https://github.com/theNoyArt/drivethrurpg-redesign",
    },
    images: {
      coverLight: "/images/dtrpg/cover-light.webp",
      coverDark: "/images/dtrpg/cover-dark.webp",
    },
  },
  {
    // Hand-built page: src/pages/portfolio (content in src/content/portfolioCase.ts). This site.
    id: "portfolio",
    page: "portfolio",
    name: "Portfolio website",
    type: { en: "Website · Portfolio", pl: "Strona · Portfolio" },
    origin: { en: "Self-initiated", pl: "Projekt własny" },
    year: "2026",
    hue: 260,
    short: {
      en: "This site: explored in Claude Design, rebuilt in React and TypeScript, with two themes, EN/PL and an AI assistant.",
      pl: "Ta strona: zaprojektowana w Claude Design, zbudowana w React i TypeScript, z dwoma motywami, EN/PL i asystentem AI.",
    },
    tech: ["React 19", "TypeScript", "Vite+", "Tailwind CSS", "Gemini API"],
    tools: "Claude Design, Claude Code",
    role: {
      en: "UX/UI Designer, Front-end Developer",
      pl: "Projektantka UX/UI, Front-end Developerka",
    },
    team: { en: "Solo", pl: "Samodzielnie" },
    duration: { en: "In progress", pl: "W trakcie" },
    intro: {
      en: "This portfolio website, as a case study. Three directions were explored in Claude Design (Editorial, Index, Index v2); Index v2 was rebuilt in React 19 + TypeScript on Vite+ with Tailwind CSS and no UI library. Features: Glass light and Cyber dark themes with a glitch transition, English and Polish, typed content files, hand-built case studies (DriveThruRPG, Bond, Art practice assistant), an AI assistant on the free Gemini API (Groq as backup) that answers from the site content and knows which case study is open, WCAG AA contrast checks and reduced-motion support. Next: finish case studies, deploy, tests and real illustrations.",
      pl: "Ta strona portfolio jako case study. W Claude Design powstały trzy kierunki (Editorial, Index, Index v2); Index v2 został zbudowany w React 19 + TypeScript na Vite+, w Tailwind CSS bez biblioteki UI. Funkcje: motywy Glass light i Cyber dark z przejściem glitch, angielski i polski, typowane pliki treści, ręcznie budowane case studies (DriveThruRPG, Bond, Asystent praktyki artystycznej), asystent AI na darmowym Gemini API (Groq jako zapas), który odpowiada na podstawie treści strony i wie, które case study jest otwarte, kontrast WCAG AA i obsługa ograniczonego ruchu. Dalej: dokończenie case studies, publikacja, testy i prawdziwe ilustracje.",
    },
    product: {
      en: "A developer & designer portfolio.",
      pl: "Portfolio developerki i projektantki.",
    },
    audience: {
      en: "Recruiters, hiring managers and teams looking for a front-end developer with UX/UI skills.",
      pl: "Rekruterzy, managerowie i zespoły szukające front-endowczyni z umiejętnościami UX/UI.",
    },
    problem: {
      en: "Showing both design and front-end work in one place.",
      pl: "Pokazanie projektowania i front-endu w jednym miejscu.",
    },
    resp: {
      en: "Design in Claude Design, front-end in React and TypeScript, content and copy.",
      pl: "Projekt w Claude Design, front-end w React i TypeScript, treść.",
    },
    stages: {
      research: {
        en: "Three directions explored in Claude Design.",
        pl: "Trzy kierunki sprawdzone w Claude Design.",
      },
      design: {
        en: "Index v2 refined: two themes, hero panels, case study pages.",
        pl: "Dopracowany Index v2: dwa motywy, panele hero, strony case studies.",
      },
      frontend: {
        en: "React 19, TypeScript, Vite+, Tailwind CSS; AI chat on the Gemini API.",
        pl: "React 19, TypeScript, Vite+, Tailwind CSS; czat AI na Gemini API.",
      },
      tests: {
        en: "Unit tests in Vitest (Vite+) for content, helpers and the AI chat backend; Lighthouse and an accessibility audit planned.",
        pl: "Testy jednostkowe w Vitest (Vite+) dla treści, helperów i backendu czatu AI; Lighthouse i audyt dostępności planowane.",
      },
    },
    ux: [],
    ui: [],
    arch: [],
    challenge: { en: "", pl: "" },
    solution: { en: "", pl: "" },
    code: "",
    results: [],
    learned: { en: "", pl: "" },
    improve: { en: "", pl: "" },
    images: {
      coverLight: "/images/portfolio/home-light.webp",
      coverDark: "/images/portfolio/home-dark.webp",
    },
  },
  {
    // Hand-built page: src/pages/tamagotchi (content in src/content/tamagotchi.ts). In progress.
    id: "tamagotchi",
    page: "tamagotchi",
    inProgress: true,
    stage: { label: { en: "Research & design", pl: "Badania i projektowanie" }, step: 2, steps: 4 },
    name: "Bond",
    type: { en: "Tamagotchi-inspired game", pl: "Gra inspirowana Tamagotchi" },
    origin: { en: "Self-initiated", pl: "Projekt własny" },
    year: "2026",
    hue: 300,
    short: {
      en: "A Tamagotchi-inspired game (working title). Your pet lives for a month, and how you care for it shapes its attachment style and how its life ends.",
      pl: "Gra inspirowana Tamagotchi (tytuł roboczy). Zwierzak żyje miesiąc, a to, jak się nim opiekujesz, kształtuje jego styl przywiązania i koniec jego życia.",
    },
    tech: ["Game design", "Psychology research", "Illustration"],
    tools: "Figma, FigJam",
    role: {
      en: "Game design, UX/UI, illustration, front-end",
      pl: "Projekt gry, UX/UI, ilustracja, front-end",
    },
    team: { en: "Solo", pl: "Samodzielnie" },
    duration: { en: "In progress", pl: "W trakcie" },
    intro: {
      en: "Bond (working title) is a work-in-progress, Tamagotchi-inspired virtual-pet game. The pet lives for about a month, and how the player cares for it shapes its attachment style (secure, anxious, avoidant or disorganized) and its ending, from dying of neglect to a happy life ending in old age. Paulina is designing the core game and researching attachment and early trauma; the platform (web + browser extension, web or mobile) and tech stack are not chosen yet. Art: one character drawn in many states as a sprite set.",
      pl: "Bond (tytuł roboczy) to gra o wirtualnym zwierzaku inspirowana Tamagotchi, w trakcie tworzenia. Zwierzak żyje około miesiąca, a to, jak gracz się nim opiekuje, kształtuje jego styl przywiązania (bezpieczny, lękowo-ambiwalentny, unikający lub zdezorganizowany) i zakończenie: od śmierci z zaniedbania po szczęśliwe życie zakończone starością. Paulina projektuje rdzeń gry i bada przywiązanie oraz wczesną traumę; platforma (web + rozszerzenie, web lub mobile) i stack nie są jeszcze wybrane. Grafika: jedna postać w wielu stanach jako zestaw sprite’ów.",
    },
    product: {
      en: "A care game with one life of about a month and real consequences.",
      pl: "Gra o opiece z jednym życiem trwającym około miesiąca i prawdziwymi konsekwencjami.",
    },
    audience: { en: "To be defined in research.", pl: "Do określenia w badaniach." },
    problem: { en: "To be defined in research.", pl: "Do określenia w badaniach." },
    resp: {
      en: "Research, game design, scenarios, illustration and sprites, game UI and development.",
      pl: "Badania, projekt gry, scenariusze, ilustracje i sprite’y, interfejs gry i programowanie.",
    },
    stages: {
      research: {
        en: "In progress: attachment styles, early trauma and neglect, child development.",
        pl: "W trakcie: style przywiązania, wczesna trauma i zaniedbanie, rozwój dziecka.",
      },
      design: {
        en: "In progress: core game design and the behaviour → result map. Planned: sprites and game UI.",
        pl: "W trakcie: rdzeń gry i mapa zachowanie → skutek. Planowane: sprite’y i interfejs gry.",
      },
      frontend: { en: "Planned.", pl: "Planowane." },
      tests: { en: "Planned: playtests.", pl: "Planowane: testy z graczami." },
    },
    ux: [],
    ui: [],
    arch: [],
    challenge: { en: "", pl: "" },
    solution: { en: "", pl: "" },
    code: "",
    results: [],
    learned: { en: "", pl: "" },
    improve: { en: "", pl: "" },
  },
  {
    // Hand-built page: src/pages/artpractice (content in src/content/artpractice.ts). Research & design.
    id: "artpractice",
    page: "artpractice",
    inProgress: true,
    stage: { label: { en: "Research & design", pl: "Badania i projektowanie" }, step: 1, steps: 4 },
    name: "Art practice assistant",
    type: { en: "App · Art education", pl: "Aplikacja · Edukacja artystyczna" },
    origin: { en: "Self-initiated", pl: "Projekt własny" },
    year: "2026",
    hue: 330,
    short: {
      en: "Set an art goal and get small daily exercises (gesture, poses, anatomy, colour), linked to my drawing streams and video lessons.",
      pl: "Ustaw cel artystyczny i dostawaj małe codzienne ćwiczenia (gest, pozy, anatomia, kolor), powiązane z moimi streamami i lekcjami wideo.",
    },
    tech: ["UX/UI", "React", "React Native"],
    tools: "Figma",
    role: { en: "Research, UX/UI, front-end", pl: "Badania, UX/UI, front-end" },
    team: { en: "Solo", pl: "Samodzielnie" },
    duration: { en: "In progress", pl: "W trakcie" },
    intro: {
      en: "An art practice assistant (web and/or mobile) in the research & design stage. The user sets a goal, the app helps decide what and how to learn and suggests small day-to-day exercises: gesture drawing, figure and poses, anatomy, colour. It tracks practice day by day or week by week. Paulina wants to use free pose/reference APIs and connect it with her theNoyArt drawing streams and planned YouTube tutorials, so each lesson comes with exercises. Likely built with React and/or React Native.",
      pl: "Asystent praktyki artystycznej (web i/lub mobile) na etapie badań i projektowania. Użytkownik ustawia cel, aplikacja pomaga zdecydować, czego i jak się uczyć, i podsuwa małe codzienne ćwiczenia: gest, postać i pozy, anatomię, kolor. Śledzi praktykę dzień po dniu lub tydzień po tygodniu. Paulina chce użyć darmowych API z pozami/referencjami i połączyć aplikację ze streamami theNoyArt i planowanymi tutorialami na YouTube. Prawdopodobnie React i/lub React Native.",
    },
    product: {
      en: "A practice planner and exercise app for artists.",
      pl: "Planer praktyki i aplikacja z ćwiczeniami dla artystów.",
    },
    audience: {
      en: "Artists learning to draw; viewers of theNoyArt streams and tutorials.",
      pl: "Osoby uczące się rysować; widzowie streamów i tutoriali theNoyArt.",
    },
    problem: { en: "To be defined in research.", pl: "Do określenia w badaniach." },
    resp: {
      en: "Research, UX/UI design and front-end.",
      pl: "Badania, projekt UX/UI i front-end.",
    },
    stages: {
      research: {
        en: "In progress: how artists practise, free pose APIs, similar tools.",
        pl: "W trakcie: jak artyści ćwiczą, darmowe API póz, podobne narzędzia.",
      },
      design: {
        en: "In progress: concept, goal setting and plan logic.",
        pl: "W trakcie: koncepcja, ustawianie celu i logika planu.",
      },
      frontend: {
        en: "Planned: React and/or React Native.",
        pl: "Planowane: React i/lub React Native.",
      },
      tests: { en: "Planned.", pl: "Planowane." },
    },
    ux: [],
    ui: [],
    arch: [],
    challenge: { en: "", pl: "" },
    solution: { en: "", pl: "" },
    code: "",
    results: [],
    learned: { en: "", pl: "" },
    improve: { en: "", pl: "" },
  },
];

/** Shown after the projects as a "coming soon" card. Remove an entry once it becomes a real case study. */
export const SHOWCASE_UPCOMING: {
  title: Localized;
  meta: Localized;
  desc: Localized;
  muted?: boolean;
}[] = [
  {
    // Not started yet: shown greyed out, not clickable.
    muted: true,
    title: { en: "Sword store", pl: "Sklep z mieczami" },
    meta: { en: "In progress · Redesign + refactor", pl: "W trakcie · Redesign + refaktor" },
    desc: {
      en: "Redesign and front-end refactor of an online sword store: clearer product pages and a cleaner codebase.",
      pl: "Redesign i refaktor front-endu sklepu z mieczami: czytelniejsze karty produktów i porządniejszy kod.",
    },
  },
];
