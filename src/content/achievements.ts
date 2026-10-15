import type { Localized } from "./types";

export type AchievementIcon =
  | "code"
  | "levelup"
  | "dual"
  | "mentor"
  | "data"
  | "ai"
  | "health"
  | "book"
  | "palette"
  | "handshake";

export type Tier = "bronze" | "silver" | "gold" | "platinum";

export interface Achievement {
  id: string;
  icon: AchievementIcon;
  tier: Tier;
  title: Localized;
  desc: Localized;
  /** When it was unlocked, e.g. "2016" or "2020 — 2022". */
  when: string;
}

// Career milestones shown as game achievements in the hero, most important first.
// Every one is taken from experience.ts / activities.ts; keep them true.
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "decade",
    icon: "levelup",
    tier: "gold",
    title: { en: "Decade club", pl: "Klub dekady" },
    desc: {
      en: "10 years in product teams: 6 in front-end, 4 in UX/UI design.",
      pl: "10 lat w zespołach produktowych: 6 we front-endzie, 4 w UX/UI.",
    },
    when: "2016 — 2026",
  },
  {
    id: "multiclass",
    icon: "dual",
    tier: "silver",
    title: { en: "Multiclass", pl: "Multiklasa" },
    desc: {
      en: "UX/UI designer and front-end developer in one, research to React.",
      pl: "Projektantka UX/UI i front-endowczyni w jednym, od badań po React.",
    },
    when: "2022 — 2026",
  },
  {
    id: "ai",
    icon: "ai",
    tier: "platinum",
    title: { en: "AI whisperer", pl: "Zaklinaczka AI" },
    desc: {
      en: "3 AI products designed in one year: reports, insights, sales assistant.",
      pl: "3 produkty AI w jeden rok: raporty, wnioski, asystent sprzedaży.",
    },
    when: "2026",
  },
  {
    id: "data",
    icon: "data",
    tier: "gold",
    title: { en: "Data tamer", pl: "Pogromczyni danych" },
    desc: {
      en: "7 data-heavy products: dashboards, marketplaces, warehouses, AI reports.",
      pl: "7 produktów pełnych danych: dashboardy, marketplace’y, magazyny, raporty AI.",
    },
    when: "2020 — 2026",
  },
  {
    id: "healthcare",
    icon: "health",
    tier: "gold",
    title: { en: "Healer’s path", pl: "Ścieżka uzdrowicielki" },
    desc: {
      en: "6 healthcare and pharma projects, from transplants to clinical reports.",
      pl: "6 projektów medycznych i pharma, od przeszczepów po raporty kliniczne.",
    },
    when: "JCommerce — 2026",
  },
  {
    id: "mentor",
    icon: "mentor",
    tier: "silver",
    title: { en: "Party leader", pl: "Liderka drużyny" },
    desc: {
      en: "Led front-end mentoring programs and mentored junior designers.",
      pl: "Prowadziłam mentoring front-endowców i młodszych projektantów.",
    },
    when: "JCommerce · Craftware",
  },
];

/** The hidden one the visitor unlocks. */
export const SECRET_ACHIEVEMENT: Achievement = {
  id: "together",
  icon: "handshake",
  tier: "platinum",
  title: { en: "Working with you", pl: "Praca z Tobą" },
  desc: {
    en: "The next quest: building something great for your team.",
    pl: "Kolejny quest: zbudować coś świetnego dla Twojego zespołu.",
  },
  when: "2026",
};
