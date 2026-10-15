// Generated stand-in numbers for case studies that don't have real `metrics` yet.
// These are NOT real results. Replace them by adding `metrics` to a project
// (see CaseMetrics in content/types.ts), or hide them with CONFIG.showPlaceholderMetrics.

import type { CaseMetrics, IssueStatus, LocalizedList, Severity } from "../content/types";
import { hash } from "./visual";

const both = (en: string, pl: string) => ({ en, pl });

export const DEFAULT_FUNNEL_STEPS: LocalizedList = {
  en: ["Visited", "Engaged", "Started task", "Completed"],
  pl: ["Wizyty", "Zaangażowanie", "Rozpoczęcie zadania", "Ukończenie"],
};

const HEURISTICS = {
  en: [
    "Visibility of status",
    "Match with the real world",
    "User control",
    "Consistency",
    "Error prevention",
    "Recognition over recall",
  ],
  pl: [
    "Widoczność stanu",
    "Zgodność ze światem",
    "Kontrola użytkownika",
    "Spójność",
    "Zapobieganie błędom",
    "Rozpoznawanie, nie pamiętanie",
  ],
};

const NOTES = {
  en: [
    "Loading and saving states were often silent, so users repeated actions.",
    "Labels used internal terms that users didn’t recognise in interviews.",
    "Several flows had no clear way back or to undo a step.",
    "The same action looked different on different screens.",
    "Forms accepted invalid input and only failed on submit.",
    "Users had to remember values from earlier steps.",
  ],
  pl: [
    "Stany ładowania i zapisu były często nieme, więc użytkownicy powtarzali akcje.",
    "Etykiety używały wewnętrznych terminów, których użytkownicy nie rozpoznawali.",
    "W kilku procesach brakowało wyraźnego powrotu lub cofnięcia kroku.",
    "Ta sama akcja wyglądała różnie na różnych ekranach.",
    "Formularze przyjmowały błędne dane i zgłaszały błąd dopiero przy wysłaniu.",
    "Użytkownicy musieli pamiętać wartości z wcześniejszych kroków.",
  ],
};

const ISSUES = {
  en: [
    "No feedback after saving changes",
    "Primary action hidden below the fold on mobile",
    "Error messages don’t explain how to fix the problem",
    "Inconsistent button styles for the same action",
    "Jargon in navigation labels",
    "No undo after deleting an item",
    "Low contrast on secondary text",
    "Empty states give no next step",
  ],
  pl: [
    "Brak informacji zwrotnej po zapisaniu zmian",
    "Główna akcja ukryta poniżej ekranu na telefonie",
    "Komunikaty błędów nie mówią, jak naprawić problem",
    "Niespójne style przycisków dla tej samej akcji",
    "Żargon w etykietach nawigacji",
    "Brak cofnięcia po usunięciu elementu",
    "Niski kontrast tekstu pomocniczego",
    "Puste stany nie wskazują kolejnego kroku",
  ],
};

const WHERE = {
  en: [
    "Onboarding",
    "Dashboard",
    "Forms",
    "Navigation",
    "Settings",
    "Checkout",
    "List view",
    "Empty states",
  ],
  pl: [
    "Onboarding",
    "Panel",
    "Formularze",
    "Nawigacja",
    "Ustawienia",
    "Płatność",
    "Lista",
    "Puste stany",
  ],
};

const SEVERITY: Severity[] = ["high", "medium", "low"];
const STATUS: IssueStatus[] = ["fixed", "progress", "backlog"];
const EFFORT = ["S", "M", "L"] as const;

export function placeholderMetrics(c: { id: string; name: string; tech: string[] }): CaseMetrics {
  const id = c.id || "x";
  const tech = c.tech.join(" ");

  const heuristics = HEURISTICS.en.map((_, i) => {
    const before = 1.6 + (hash(id, i + 3) % 14) / 10;
    const after = Math.min(5, before + 1.4 + (hash(id, i + 9) % 8) / 10);
    return {
      name: both(HEURISTICS.en[i], HEURISTICS.pl[i]),
      before,
      after,
      note: both(NOTES.en[i], NOTES.pl[i]),
    };
  });

  const log = ISSUES.en.map((_, i) => {
    const sv = hash(id, 50 + i) % 3;
    const st = sv === 0 ? 0 : hash(id, 60 + i) % 3;
    const w = (i + hash(id, 70)) % WHERE.en.length;
    return {
      issue: both(ISSUES.en[i], ISSUES.pl[i]),
      where: both(WHERE.en[w], WHERE.pl[w]),
      severity: SEVERITY[sv],
      effort: EFFORT[hash(id, 80 + i) % 3],
      status: STATUS[st],
    };
  });

  const unit = 60 + (hash(id, 20) % 180);
  const integration = 12 + (hash(id, 21) % 40);
  const e2e = 4 + (hash(id, 22) % 16);

  let pv = 100;
  const funnel = [0, 1, 2, 3].map((i) => {
    if (i) pv = Math.round(pv * (0.55 + (hash(id, 30 + i) % 35) / 100));
    return pv;
  }) as [number, number, number, number];

  return {
    audit: {
      issuesCount: 18 + (hash(id, 1) % 30),
      screensCount: 8 + (hash(id, 2) % 20),
      method: both(
        "Heuristic evaluation, 5 moderated sessions, analytics review",
        "Ocena heurystyczna, 5 moderowanych sesji, analiza danych",
      ),
      participants: both("5 users, 2 stakeholders", "5 użytkowników, 2 interesariuszy"),
      scope: both(
        `I audited the live version of ${c.name} before the redesign. The goal was to find where users struggle, rank the problems by impact, and agree a fix order with the team.`,
        `Przeprowadziłam audyt działającej wersji ${c.name} przed przeprojektowaniem. Celem było znaleźć miejsca, w których użytkownicy mają trudności, uszeregować problemy według wpływu i ustalić z zespołem kolejność poprawek.`,
      ),
      summary: both(
        `High-severity issues in ${c.name} were addressed in the first release. Medium and low items were moved into the product backlog with owners.`,
        `Problemy o wysokim priorytecie w ${c.name} rozwiązano w pierwszym wydaniu. Średnie i niskie trafiły do backlogu z przypisanymi osobami.`,
      ),
      heuristics,
      log,
      reportUrl: "#",
    },
    tests: {
      tools: /Angular/.test(tech)
        ? "Jasmine · Karma"
        : /Figma/.test(tech) && !/React|TypeScript/.test(tech)
          ? "Maze · Lookback"
          : "Vitest · RTL · Playwright",
      unit,
      integration,
      e2e,
      coverage: 72 + (hash(id, 23) % 24) + "%",
    },
    analytics: {
      tools: ["GA4 · Hotjar", "Mixpanel · FullStory", "Plausible · Clarity"][hash(id, 40) % 3],
      funnel,
      session: 2 + (hash(id, 41) % 6) + "m " + (10 + (hash(id, 42) % 49)) + "s",
      taskSuccess: 78 + (hash(id, 43) % 20) + "%",
    },
  };
}
