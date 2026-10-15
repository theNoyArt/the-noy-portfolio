import type { Localized } from "./types";

// Art practice assistant: content for src/pages/artpractice. Research & design stage, first sketch.

export type ApStatus = "active" | "planned";

export const AP = {
  meta: {
    kind: { en: "App · Art education", pl: "Aplikacja · Edukacja artystyczna" },
    origin: { en: "Self-initiated · research & design", pl: "Projekt własny · badania i projektowanie" },
  },
  title: { en: "Art practice assistant", pl: "Asystent praktyki artystycznej" },
  sub: { en: "Small exercises, every day", pl: "Małe ćwiczenia, codziennie" },
  lead: {
    en: "An app that helps artists practise with a plan. You set a goal, it helps you decide what to learn and how, and it serves small day-to-day exercises: gesture, poses, anatomy, colour. It tracks your practice week by week and connects to my drawing streams and YouTube lessons, so every lesson comes with exercises to keep going.",
    pl: "Aplikacja, która pomaga artystom ćwiczyć według planu. Ustawiasz cel, a ona pomaga zdecydować, czego i jak się uczyć, i podsuwa małe codzienne ćwiczenia: gest, pozy, anatomię, kolor. Śledzi Twoją praktykę tydzień po tygodniu i łączy się z moimi streamami i lekcjami na YouTube, więc każda lekcja ma ćwiczenia, żeby iść dalej.",
  },

  pillars: [
    {
      k: { en: "Goal", pl: "Cel" },
      title: { en: "Know what you’re practising for", pl: "Wiesz, po co ćwiczysz" },
      desc: {
        en: "Pick a goal, like drawing people with confidence, and the app helps turn it into skills to learn and a way to learn them.",
        pl: "Wybierasz cel, np. pewne rysowanie ludzi, a aplikacja pomaga zamienić go w umiejętności do nauki i sposób nauki.",
      },
    },
    {
      k: { en: "Daily", pl: "Codziennie" },
      title: { en: "Small exercises, not big projects", pl: "Małe ćwiczenia, nie wielkie projekty" },
      desc: {
        en: "Short, focused sessions with timers and good references, so practice fits into a normal day.",
        pl: "Krótkie, skupione sesje z timerem i dobrymi referencjami, żeby praktyka mieściła się w zwykłym dniu.",
      },
    },
    {
      k: { en: "Lessons", pl: "Lekcje" },
      title: { en: "From lesson to lesson", pl: "Od lekcji do lekcji" },
      desc: {
        en: "Exercises linked to my streams and video tutorials, so what you watch turns into what you practise.",
        pl: "Ćwiczenia powiązane z moimi streamami i tutorialami, żeby to, co oglądasz, zamieniało się w praktykę.",
      },
    },
  ],

  flow: [
    { t: { en: "Set a goal", pl: "Ustaw cel" }, d: { en: "What you want to learn, and how much time you have.", pl: "Czego chcesz się nauczyć i ile masz czasu." } },
    { t: { en: "Get a plan", pl: "Dostań plan" }, d: { en: "A day-by-day or week-by-week mix of exercises.", pl: "Mix ćwiczeń dzień po dniu lub tydzień po tygodniu." } },
    { t: { en: "Practise", pl: "Ćwicz" }, d: { en: "Timed sessions with references and short instructions.", pl: "Sesje z timerem, referencjami i krótkimi instrukcjami." } },
    { t: { en: "Track & adjust", pl: "Śledź i dopasuj" }, d: { en: "See your streak and progress; the plan adapts.", pl: "Widzisz serię i postępy; plan się dopasowuje." } },
  ],

  exercises: [
    { id: "gesture", name: { en: "Gesture drawing", pl: "Rysunek gestu" }, ex: { en: "30s–2 min poses, line of action", pl: "Pozy 30 s–2 min, linia akcji" } },
    { id: "pose", name: { en: "Figure & poses", pl: "Postać i pozy" }, ex: { en: "Longer poses, proportions, balance", pl: "Dłuższe pozy, proporcje, równowaga" } },
    { id: "anatomy", name: { en: "Anatomy", pl: "Anatomia" }, ex: { en: "Bones, muscles, hands, faces", pl: "Kości, mięśnie, dłonie, twarze" } },
    { id: "colour", name: { en: "Colour & value", pl: "Kolor i walor" }, ex: { en: "Value studies, palettes, light", pl: "Studia waloru, palety, światło" } },
  ] as { id: "gesture" | "pose" | "anatomy" | "colour"; name: Localized; ex: Localized }[],

  /** Things to research. Links are starting points, not decisions. */
  research: [
    {
      g: { en: "Pose & reference sources", pl: "Źródła póz i referencji" },
      items: [
        { name: "Unsplash API", url: "https://unsplash.com/developers", note: { en: "Free photo API", pl: "Darmowe API zdjęć" } },
        { name: "Pexels API", url: "https://www.pexels.com/api/", note: { en: "Free photo & video API", pl: "Darmowe API zdjęć i wideo" } },
        { name: "PoseMy.Art", url: "https://posemy.art/", note: { en: "3D pose references", pl: "Referencje póz 3D" } },
      ],
    },
    {
      g: { en: "Practice tools to learn from", pl: "Narzędzia do nauki od innych" },
      items: [
        { name: "Line of Action", url: "https://line-of-action.com/", note: { en: "Timed gesture sessions", pl: "Sesje gestu z timerem" } },
        { name: "Quickposes", url: "https://quickposes.com/", note: { en: "Timed figure references", pl: "Referencje postaci z timerem" } },
        { name: "Drawabox", url: "https://drawabox.com/", note: { en: "Structured lessons & homework", pl: "Lekcje i zadania krok po kroku" } },
      ],
    },
    {
      g: { en: "Platform", pl: "Platforma" },
      items: [
        { name: "React", url: "https://react.dev/", note: { en: "Web app", pl: "Aplikacja webowa" } },
        { name: "React Native", url: "https://reactnative.dev/", note: { en: "Mobile app", pl: "Aplikacja mobilna" } },
      ],
    },
  ] as { g: Localized; items: { name: string; url: string; note: Localized }[] }[],

  /** A light roadmap: less defined than Bond’s on purpose. */
  roadmap: [
    {
      status: "active",
      title: { en: "Research", pl: "Badania" },
      points: [
        { en: "How artists practise today", pl: "Jak artyści ćwiczą dziś" },
        { en: "Free pose & reference APIs", pl: "Darmowe API póz i referencji" },
        { en: "Similar apps and sites", pl: "Podobne aplikacje i strony" },
      ],
    },
    {
      status: "active",
      title: { en: "Concept & UX", pl: "Koncepcja i UX" },
      points: [
        { en: "Goal setting & plan logic", pl: "Ustawianie celu i logika planu" },
        { en: "Exercise library structure", pl: "Struktura biblioteki ćwiczeń" },
        { en: "Key flows & wireframes", pl: "Główne przepływy i wireframe’y" },
      ],
    },
    {
      status: "planned",
      title: { en: "UI design", pl: "Projekt UI" },
      points: [
        { en: "Visual style", pl: "Styl wizualny" },
        { en: "Web and mobile screens", pl: "Ekrany web i mobile" },
      ],
    },
    {
      status: "planned",
      title: { en: "Build the MVP", pl: "Budowa MVP" },
      points: [
        { en: "React and/or React Native", pl: "React i/lub React Native" },
        { en: "Timer, references, tracking", pl: "Timer, referencje, śledzenie" },
      ],
    },
    {
      status: "planned",
      title: { en: "Connect with lessons", pl: "Połączenie z lekcjami" },
      points: [
        { en: "Exercises for streams & YouTube tutorials", pl: "Ćwiczenia do streamów i tutoriali na YouTube" },
      ],
    },
  ] as { status: ApStatus; title: Localized; points: Localized[] }[],
};
