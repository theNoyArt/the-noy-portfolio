import type { Experience, Localized, WorkProject } from "./types";

export const EXPERIENCE_DESC: Localized = {
  en: "Ten years across front-end development and UX/UI design. Select a company on the timeline to see what I did there.",
  pl: "Dziesięć lat w front-endzie i projektowaniu UX/UI. Wybierz firmę na osi czasu, aby zobaczyć, czym się tam zajmowałam.",
};

/** Month → fractional year: end(2026, 10) is the end of October 2026. */
const end = (y: number, month: number) => y + month / 12;

const CONFIDENTIAL: Localized = {
  en: "Client names are kept confidential.",
  pl: "Nazwy klientów pozostają poufne.",
};

const PHARMA: Localized = { en: "Pharma client", pl: "Klient z branży farmaceutycznej" };

// Kept general (title, one sentence, years) until the contract terms for client detail are confirmed.
const CRAFTWARE_WORK: WorkProject[] = [
  {
    id: "ai-csr",
    featured: true,
    title: { en: "AI report generation", pl: "Generowanie raportów z AI" },
    client: PHARMA,
    role: { en: "UX/UI Designer", pl: "Projektantka UX/UI" },
    dates: { en: "2025 — 2026", pl: "2025 — 2026" },
    desc: {
      en: "A data-heavy platform for creating and reviewing AI-generated reports.",
      pl: "Platforma pełna danych do tworzenia i przeglądania raportów generowanych przez AI.",
    },
    tags: ["AI", "Healthcare", "Data-heavy", "Figma"],
  },
  {
    id: "ai-insights",
    featured: true,
    title: { en: "AI data insights", pl: "Wnioski z danych z AI" },
    client: PHARMA,
    role: { en: "UX/UI Designer", pl: "Projektantka UX/UI" },
    dates: { en: "2026", pl: "2026" },
    desc: {
      en: "An internal AI tool that turns company data into insights.",
      pl: "Wewnętrzne narzędzie AI, które zamienia dane firmy we wnioski.",
    },
    tags: ["AI", "Data visualization", "Research", "Figma"],
  },
  {
    id: "sales-assistant",
    featured: true,
    title: { en: "AI sales assistance", pl: "Wsparcie sprzedaży z AI" },
    client: { en: "Enterprise client", pl: "Klient korporacyjny" },
    role: { en: "UX/UI & Graphic Designer", pl: "Projektantka UX/UI i graficzka" },
    dates: { en: "2026", pl: "2026" },
    desc: {
      en: "An AI assistant for sales teams, designed from research to branding.",
      pl: "Asystent AI dla zespołów sprzedaży, zaprojektowany od badań po branding.",
    },
    tags: ["AI", "Research", "Branding", "Figma"],
  },
  {
    id: "pharma-ds-2",
    title: { en: "Pharma UI & design system", pl: "UI i design system dla pharmy" },
    client: PHARMA,
    role: { en: "UI Designer", pl: "Projektantka UI" },
    dates: { en: "2024 — 2025", pl: "2024 — 2025" },
    desc: {
      en: "UI support for an internal tool built on the client’s design system.",
      pl: "Wsparcie UI w wewnętrznym narzędziu opartym na design systemie klienta.",
    },
    tags: ["Pharma", "UI", "Design system"],
  },
  {
    id: "ecommerce",
    title: { en: "E-commerce UI", pl: "UI dla e-commerce" },
    client: { en: "E-commerce client", pl: "Klient z branży e-commerce" },
    role: { en: "UI Designer", pl: "Projektantka UI" },
    dates: { en: "2025", pl: "2025" },
    desc: {
      en: "UI support for an e-commerce platform.",
      pl: "Wsparcie UI dla platformy e-commerce.",
    },
    tags: ["E-commerce", "UI"],
  },
  {
    id: "pharma-ds-1",
    title: { en: "Pharma UI & design system", pl: "UI i design system dla pharmy" },
    client: PHARMA,
    role: { en: "UI Designer", pl: "Projektantka UI" },
    dates: { en: "2023 — 2025", pl: "2023 — 2025" },
    desc: {
      en: "UI support for another internal tool with its own design system.",
      pl: "Wsparcie UI w innym wewnętrznym narzędziu z własnym design systemem.",
    },
    tags: ["Pharma", "UI", "Design system"],
  },
  {
    id: "data-marketplace",
    title: { en: "Pharma data platform", pl: "Platforma danych dla pharmy" },
    client: PHARMA,
    role: { en: "UX/UI Designer", pl: "Projektantka UX/UI" },
    dates: { en: "2022 — 2024", pl: "2022 — 2024" },
    desc: {
      en: "Research and UX/UI design of a platform that brings many data sources together.",
      pl: "Badania i projekt UX/UI platformy łączącej wiele źródeł danych.",
    },
    tags: ["Pharma", "Research", "Data management", "Figma"],
  },
];

const ITTI_WORK: WorkProject[] = [
  {
    id: "warehouse",
    featured: true,
    title: { en: "Warehouse & production tracking", pl: "Magazyn i śledzenie produkcji" },
    client: { en: "Manufacturing client", pl: "Klient produkcyjny" },
    role: { en: "UX/UI Designer", pl: "Projektantka UX/UI" },
    dates: { en: "2023 — 2025", pl: "2023 — 2025" },
    desc: {
      en: "A full application for the production process: receiving materials into the warehouse, scanning and tracking each step, placing them on shelves, and following them through production in one system. Designed for large touch screens, with a special UI: bold colours, very clear and visible from a distance, and adapted for smaller screens too.",
      pl: "Pełna aplikacja do procesu produkcji: przyjęcie materiałów do magazynu, skanowanie i śledzenie każdego kroku, rozmieszczenie na półkach i prowadzenie ich przez produkcję w jednym systemie. Projektowana na duże ekrany dotykowe, ze specjalnym UI: wyraziste kolory, bardzo czytelna i widoczna z daleka, dostosowana też do mniejszych ekranów.",
    },
    tags: ["Warehouse", "Production", "Touch screens", "Scanning", "Process tracking", "Figma"],
  },
  {
    id: "waste",
    featured: true,
    title: { en: "Waste management panel", pl: "Panel do zarządzania odpadami" },
    client: { en: "Waste management company", pl: "Firma zajmująca się odpadami" },
    role: { en: "UX/UI Designer", pl: "Projektantka UX/UI" },
    dates: { en: "2023 — 2025", pl: "2023 — 2025" },
    desc: {
      en: "A professional panel for a company that collects and resolves waste issues across different kinds of materials, bringing all the data together in one place. A very data-heavy application.",
      pl: "Profesjonalny panel dla firmy, która odbiera odpady i rozwiązuje problemy z nimi dla różnych rodzajów materiałów, zbierający wszystkie dane w jednym miejscu. Aplikacja bardzo bogata w dane.",
    },
    tags: ["Data-heavy", "Dashboard", "Operations", "Figma"],
  },
  {
    id: "transcription",
    featured: true,
    title: { en: "Text transcription & classification", pl: "Transkrypcja i klasyfikacja tekstu" },
    client: { en: "Enterprise client", pl: "Klient korporacyjny" },
    role: { en: "UX/UI Designer", pl: "Projektantka UX/UI" },
    dates: { en: "2023 — 2025", pl: "2023 — 2025" },
    desc: {
      en: "A tool for transcribing and classifying text, with complex workflows for reviewing and organising the results.",
      pl: "Narzędzie do transkrypcji i klasyfikacji tekstu, ze złożonymi procesami przeglądania i porządkowania wyników.",
    },
    tags: ["Data management", "Workflows", "Figma"],
  },
  {
    id: "parking",
    featured: true,
    title: { en: "Parking assistant · POC", pl: "Asystent parkowania · POC" },
    client: { en: "Proof of concept", pl: "Proof of concept" },
    role: { en: "UX/UI Designer", pl: "Projektantka UX/UI" },
    dates: { en: "1 month", pl: "1 miesiąc" },
    desc: {
      en: "A small proof of concept: a parking map that shows which spaces are free or taken.",
      pl: "Mały proof of concept: mapa parkingu pokazująca, które miejsca są wolne, a które zajęte.",
    },
    tags: ["POC", "UX", "UI", "Figma"],
  },
];

const FINTECH_WORK: WorkProject[] = [
  {
    id: "fiat-crypto",
    featured: true,
    title: { en: "Fiat & crypto financial dashboard", pl: "Dashboard finansowy fiat i krypto" },
    client: { en: "BlockchainWares", pl: "BlockchainWares" },
    role: {
      en: "UX/UI Designer & Front-end Developer",
      pl: "Projektantka UX/UI i front-end developerka",
    },
    dates: { en: "2020 — 2022", pl: "2020 — 2022" },
    desc: {
      en: "One dashboard bringing fiat currencies and cryptocurrencies together: financial data from multiple sources and certificates in one view. I designed it from the UX/UI side and built it in React, with unit tests in Jest, for the whole duration of the project.",
      pl: "Jeden dashboard łączący waluty fiat i kryptowaluty: dane finansowe z wielu źródeł i certyfikaty w jednym widoku. Projektowałam go od strony UX/UI i budowałam w React, z testami jednostkowymi w Jest, przez cały czas trwania projektu.",
    },
    tags: [
      "Fintech",
      "Crypto",
      "Dashboard",
      "React",
      "TypeScript",
      "Jest",
      "Ant Design",
      "Adobe XD",
    ],
  },
];

const JCOMMERCE_WORK: WorkProject[] = [
  {
    id: "jc-ecommerce",
    featured: true,
    title: { en: "Large Polish e-commerce platform", pl: "Duża polska platforma e-commerce" },
    client: { en: "E-commerce company", pl: "Firma e-commerce" },
    role: { en: "Front-end Developer", pl: "Front-end Developerka" },
    dates: { en: "~1.5 years · until 2022", pl: "~1,5 roku · do 2022" },
    desc: {
      en: "Front-end development on one of the biggest Polish e-commerce platforms, in React with unit testing. The team worked in Kanban.",
      pl: "Front-end jednej z największych polskich platform e-commerce, w React z testami jednostkowymi. Zespół pracował w Kanbanie.",
    },
    tags: ["E-commerce", "React", "Unit testing", "Kanban"],
  },
  {
    id: "jc-betting",
    featured: true,
    title: { en: "Sports betting platform", pl: "Platforma zakładów sportowych" },
    client: {
      en: "British sports & gambling company",
      pl: "Brytyjska firma z branży sportu i zakładów",
    },
    role: { en: "Front-end Developer", pl: "Front-end Developerka" },
    dates: { en: "~1 year", pl: "~1 rok" },
    desc: {
      en: "Front-end development in React for a British sports and gambling platform.",
      pl: "Front-end w React dla brytyjskiej platformy sportowo-bukmacherskiej.",
    },
    tags: ["Sports", "Betting", "React"],
  },
  {
    id: "jc-transplant",
    featured: true,
    title: { en: "Transplant coordination system", pl: "System do obsługi przeszczepów" },
    client: { en: "Polish public healthcare", pl: "Polska publiczna służba zdrowia" },
    role: { en: "Front-end Developer", pl: "Front-end Developerka" },
    dates: { en: "~1 year", pl: "~1 rok" },
    desc: {
      en: "A medical panel supporting the process of finding transplants, moving the documentation from paper into one system. Built in Angular for a public healthcare institution.",
      pl: "Panel medyczny wspierający proces poszukiwania przeszczepów, przenoszący dokumentację z papieru do jednego systemu. Zbudowany w Angularze dla publicznej instytucji ochrony zdrowia.",
    },
    tags: ["Healthcare", "Public sector", "Angular", "Scrum"],
  },
  {
    id: "jc-extension",
    featured: true,
    title: {
      en: "Firefox extension · watch connection",
      pl: "Rozszerzenie Firefox · połączenie z zegarkiem",
    },
    client: { en: "Short project", pl: "Krótki projekt" },
    role: { en: "Front-end Developer", pl: "Front-end Developerka" },
    dates: { en: "~2 months", pl: "~2 miesiące" },
    desc: {
      en: "A small Mozilla extension built with XUL, connecting a watch with a web application.",
      pl: "Małe rozszerzenie Mozilli w XUL, łączące zegarek z aplikacją webową.",
    },
    tags: ["Browser extension", "XUL", "Integration"],
  },
  {
    id: "jc-automotive",
    featured: true,
    title: { en: "Modular automotive platform", pl: "Modułowa platforma motoryzacyjna" },
    client: { en: "Automotive client", pl: "Klient z branży motoryzacyjnej" },
    role: {
      en: "Junior → Regular Front-end Developer",
      pl: "Junior → Regular Front-end Developerka",
    },
    dates: { en: "~2.5 years · from 2016", pl: "~2,5 roku · od 2016" },
    desc: {
      en: "A modular platform where separate teams owned separate modules. I built two of them in React and Redux, with tests, in Scrum, and grew from junior to regular developer on this project.",
      pl: "Modułowa platforma, w której osobne zespoły odpowiadały za osobne moduły. Zbudowałam dwa z nich w React i Reduksie, z testami, w Scrumie, i na tym projekcie awansowałam z juniorki na regular.",
    },
    tags: ["Automotive", "React", "Redux", "Testing", "Scrum", "Agile"],
  },
];

// One entry per company, newest first. `to: null` would mean "now".
// projects[].id points to a case study in caseStudies.ts; `at` places its pin on the
// timeline as a fractional year (2024.25 ≈ April 2024).
// `kind` drives the UX/UI and Development filter.
export const EXPERIENCE: Experience[] = [
  {
    id: "craftware",
    company: "Craftware",
    from: 2022,
    to: end(2026, 10),
    dates: { en: "2022 — Oct 2026", pl: "2022 — paź 2026" },
    kind: ["ux", "dev"],
    role: { en: "Senior UX/UI Designer", pl: "Senior UX/UI Designer" },
    desc: {
      en: "Diverse projects including AI-powered applications, healthcare, e-commerce and university platforms.",
      pl: "Różnorodne projekty, m.in. aplikacje oparte na AI, medycyna, e-commerce i platformy uczelniane.",
    },
    resp: {
      en: [
        "UX & UI: research, UX audits, usability testing, IA, hi-fi mockups, prototypes, design systems; branding",
        "Front-end (Angular): maintenance, bug fixing and improvements of a business data management app as Frontend Support Developer",
        "Ran a small UX/UI company with two designers working mainly for Craftware, and later took over part of the projects myself",
        "2 years mentoring 3 UX designers, including those two",
        "Responsible for recruitment (dozens of interviews) and technical estimates for 3–5 projects",
      ],
      pl: [
        "UX i UI: badania, audyty UX, testy użyteczności, IA, makiety hi-fi, prototypy, design systemy; branding",
        "Front-end (Angular): utrzymanie, poprawki i usprawnienia aplikacji do zarządzania danymi jako Frontend Support Developer",
        "Prowadziłam małą firmę UX/UI z dwiema osobami projektującymi głównie dla Craftware, a później przejęłam część projektów",
        "2 lata mentoringu 3 osób w UX, w tym tych dwóch",
        "Odpowiadałam za rekrutację (dziesiątki rozmów) i techniczne wyceny 3–5 projektów",
      ],
    },
    tech: ["Figma", "Adobe XD", "Miro", "Angular", "Azure DevOps", "MUI", "Lightning"],
    projects: [],
    work: CRAFTWARE_WORK,
    note: CONFIDENTIAL,
  },
  {
    id: "itti",
    company: "ITTI",
    from: 2023,
    to: 2025,
    dates: { en: "2023 — 2025", pl: "2023 — 2025" },
    kind: ["ux"],
    role: { en: "UX/UI Designer", pl: "Projektantka UX/UI" },
    desc: {
      en: "Digital solutions for warehouse management, text transcription and classification, and data management: complex workflows and data-heavy interfaces.",
      pl: "Rozwiązania do zarządzania magazynem, transkrypcji i klasyfikacji tekstu oraz zarządzania danymi: złożone procesy i interfejsy pełne danych.",
    },
    resp: {
      en: [
        "User research and UX audits",
        "Low and high-fidelity mockups, interactive prototypes, design systems and UI design",
        "Branding, visual identity and supporting graphic materials",
      ],
      pl: [
        "Badania użytkowników i audyty UX",
        "Makiety low i high-fidelity, interaktywne prototypy, design systemy i projekt UI",
        "Branding, identyfikacja wizualna i materiały graficzne",
      ],
    },
    tech: ["Figma", "Photoshop", "Illustrator"],
    projects: [],
    work: ITTI_WORK,
    note: CONFIDENTIAL,
  },
  {
    id: "fintech",
    company: "BlockchainWares",
    from: 2020,
    to: 2022,
    dates: { en: "2020 — 2022", pl: "2020 — 2022" },
    kind: ["ux", "dev"],
    role: { en: "Front-end Developer & UX/UI", pl: "Front-end Developerka i UX/UI" },
    desc: {
      en: "Apps connecting traditional banking with cryptocurrency, managing fiat and crypto assets, with financial dashboards that consolidate data from multiple sources.",
      pl: "Aplikacje łączące tradycyjną bankowość z kryptowalutami, do zarządzania aktywami fiat i krypto, z dashboardami finansowymi łączącymi dane z wielu źródeł.",
    },
    resp: {
      en: [
        "Built and maintained React web apps, translating designs into responsive, functional interfaces",
        "Unit testing in Jest",
        "Wireframes, high-fidelity mockups, interactive prototypes and the design system",
      ],
      pl: [
        "Budowa i utrzymanie aplikacji w React, przekładanie projektów na responsywne, działające interfejsy",
        "Testy jednostkowe w Jest",
        "Wireframe’y, makiety high-fidelity, interaktywne prototypy i design system",
      ],
    },
    tech: ["React", "TypeScript", "Jest", "Git", "Ant Design", "Adobe XD"],
    projects: [],
    work: FINTECH_WORK,
  },
  {
    id: "jcommerce",
    company: "JCommerce",
    from: 2016,
    to: 2022,
    dates: { en: "2016 — 2022", pl: "2016 — 2022" },
    kind: ["dev"],
    role: { en: "Front-end Developer", pl: "Front-end Developerka" },
    desc: {
      en: "Front-end developer, primarily React with additional Angular, on outsourced projects across e-commerce, healthcare, automotive, sports betting and data management.",
      pl: "Front-end developerka, głównie React, dodatkowo Angular, w projektach outsourcingowych z e-commerce, medycyny, motoryzacji, zakładów sportowych i zarządzania danymi.",
    },
    resp: {
      en: [
        "Built and maintained web applications in React and Angular",
        "Led front-end mentoring programs: 1 year mentoring 5–7 front-end developers, supporting their technical skills and best practices",
      ],
      pl: [
        "Budowa i utrzymanie aplikacji w React i Angularze",
        "Prowadzenie programów mentoringowych dla front-endowców: rok mentoringu 5–7 osób w front-endzie, rozwój umiejętności i dobrych praktyk",
      ],
    },
    tech: [
      "React",
      "Angular",
      "TypeScript",
      "Redux",
      "RxJS",
      "SCSS",
      "REST APIs",
      "RTL",
      "Jasmine",
    ],
    projects: [],
    work: JCOMMERCE_WORK,
    note: {
      en: "Plus a few shorter projects in between. Client names are kept confidential.",
      pl: "Do tego kilka krótszych projektów pomiędzy. Nazwy klientów pozostają poufne.",
    },
  },
];
