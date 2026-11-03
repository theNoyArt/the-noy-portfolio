import type { Person } from "./types";

// Everything about you that appears on Home, in the footer and in the AI chat.
// Images go in /public/images and are referenced like '/images/portrait.jpg'.
// portrait is not shown at the moment (the hero uses a graphic panel instead).
// Leave an image as null to show the striped placeholder.
export const PERSON: Person = {
  name: "Paulina Targosz",
  firstName: "Paulina",
  email: "paulinatargo@gmail.com",
  role: {
    en: "Front-end Developer + UX/UI Designer",
    pl: "Front-end Developerka + Projektantka UX/UI",
  },
  intro: {
    en: "Hi, I’m Paulina! I’ve spent 10 years in product teams: 6 building React and Angular apps and 6 designing them, including 2 years combining both roles. I know the whole process, from the first user interview to tested code in production.",
    pl: "Cześć, jestem Paulina! Od 10 lat pracuję w zespołach produktowych: przez 6 lat budowałam aplikacje w React i Angularze, a przez 6 je projektowałam, w tym przez 2 lata łączyłam obie role. Znam cały proces: od pierwszej rozmowy z użytkownikiem po przetestowany kod na produkcji.",
  },

  location: { en: "Poland · CET", pl: "Polska · CET" },
  status: { en: "Open to front-end and UX/UI roles", pl: "Otwarta na role front-endowe i UX/UI" },
  yearsExperience: 10,
  links: [
    { label: "GitHub", url: "https://github.com/theNoyArt" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/paulina-targosz" },
  ],
  // One CV per role, each in both languages. The home page (/) offers both; /frontend and /ux only their own.
  cv: {
    frontend: {
      label: { en: "CV Front-end", pl: "CV Front-end" },
      url: {
        en: "/cv/Paulina_Targosz_CV_2026_light.pdf",
        pl: "/cv/Paulina_Targosz_CV_2026_PL_light.pdf",
      },
    },
    ux: {
      label: { en: "CV UX/UI", pl: "CV UX/UI" },
      url: {
        en: "/cv/Paulina_Targosz_CV_UX_2026_EN.pdf",
        pl: "/cv/Paulina_Targosz_CV_UX_2026_PL.pdf",
      },
    },
  },
  portrait: {
    primary: null,
    alt: null,
    description: {
      en: "Photo of Paulina Targosz; the lens reveals her illustrated self-portrait",
      pl: "Zdjęcie Pauliny Targosz; soczewka odsłania jej ilustrowany autoportret",
    },
  },
  education:
    "Graphic design, specialisation Game Design, at Wyższa Szkoła Technologii Informatycznych w Katowicach (until 2026)",
  languages: "Polish (native), English (B2)",
  hobbies: "Illustration & 3D art, tabletop RPGs, photography, backpacking",
  chatSuggestions: {
    en: [
      "What has Paulina built with React?",
      "Which AI products has she designed?",
      "How does she use AI in her daily work?",
      "What roles is she looking for?",
    ],
    pl: [
      "Co Paulina zbudowała w React?",
      "Jakie produkty AI projektowała?",
      "Jak używa AI w codziennej pracy?",
      "Jakiej roli szuka?",
    ],
  },
};
