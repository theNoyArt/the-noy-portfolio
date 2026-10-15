import { useCallback } from "react";
import { PL } from "../../content/dtrpg/pl";
import { useI18n } from "../../lib/i18n";

/** Polish for copy the prototype left in English (list details, captions). */
export const PL_MORE: Record<string, string> = {
  "Choose a screen": "Wybierz ekran",
  // Mockup state chips (Screens.tsx); screen names stay as in the product.
  "Signed out": "Niezalogowany",
  "Menu · signed in": "Menu · zalogowany",
  "Menu · signed out": "Menu · niezalogowany",
  "My account": "Moje konto",
  "Grid view": "Widok siatki",
  "List view": "Widok listy",
  "Filters sheet": "Panel filtrów",
  "Many filters": "Wiele filtrów",
  "Panel open": "Otwarty panel",
  Sheet: "Panel wysuwany",
  Modal: "Okno modalne",
  Gift: "Prezent",
  // Audited pages
  Home: "Strona główna",
  "Product listing": "Lista produktów",
  "Product page": "Strona produktu",
  Cart: "Koszyk",
  "My Library": "Moja biblioteka",
  Settings: "Ustawienia",
  "React 19, TypeScript": "React 19, TypeScript",
  "react-hook-form with Zod. Zod also validates API responses.":
    "react-hook-form z Zod. Zod waliduje też odpowiedzi API.",
  "i18next, with English, Polish and a pseudo-locale (en-XA) for testing text expansion":
    "i18next z angielskim, polskim i pseudo-lokalizacją (en-XA) do testowania dłuższych tekstów",
  "Tailwind CSS v4, design tokens as CSS variables, dark-first theme with a light theme":
    "Tailwind CSS v4, tokeny jako zmienne CSS, motyw ciemny jako bazowy plus jasny",
  "shadcn/ui (Radix primitives), WCAG AA contrast checked on tokens":
    "shadcn/ui (prymitywy Radix), kontrast WCAG AA sprawdzony na tokenach",
  "Vitest (run through Vite+) with Testing Library":
    "Vitest (uruchamiany przez Vite+) z Testing Library",
  "Vite+ (VoidZero’s unified toolchain). One vp CLI runs the dev server and production builds (Vite and Rolldown), tests (Vitest), linting (Oxlint), formatting (Oxfmt) and type checking (tsgo).":
    "Vite+ (zunifikowany toolchain VoidZero). Jedno CLI vp uruchamia serwer deweloperski i buildy produkcyjne (Vite i Rolldown), testy (Vitest), linting (Oxlint), formatowanie (Oxfmt) i sprawdzanie typów (tsgo).",
  "A single dependency-free Node.js file (server.js, Node 18 or newer, built-in http only). It serves /api/v1/*.":
    "Jeden plik Node.js bez zależności (server.js, Node 18 lub nowszy, tylko wbudowany http). Obsługuje /api/v1/*.",
  "Static JSON files in data/, with state held in memory (follows, cart, wishlist and so on reset on restart). Polish translations are an overlay file applied per request.":
    "Statyczne pliki JSON w data/, stan trzymany w pamięci (obserwowani, koszyk, lista życzeń itd. resetują się po restarcie). Polskie tłumaczenia to nakładka stosowana przy każdym żądaniu.",
  "Python 3 scripts (generate.py, then enrich.py, real.py and v4.py as later passes) build the JSON, with Pillow for images.":
    "Skrypty Python 3 (generate.py, potem enrich.py, real.py i v4.py jako kolejne przebiegi) budują JSON, a Pillow obrazy.",
  "OpenAPI 3.0.3, generated into data/openapi.json. Interactive docs are served at /docs with Swagger UI.":
    "OpenAPI 3.0.3, generowane do data/openapi.json. Interaktywna dokumentacja w Swagger UI pod /docs.",
  "Swagger UI ↗": "Swagger UI ↗",
  "Desktop state": "Stan desktopu",
  "Signed in": "Zalogowany",
  Recommendation: "Rekomendacja",
  "Brand red fails AA as small text and under white labels, so":
    "Czerwień marki nie spełnia AA jako mały tekst i pod białymi etykietami, więc",
  "carries red copy and": "niesie czerwony tekst, a",
  "fills buttons (white text 4.6:1).": "wypełnia przyciski (biały tekst 4,6:1).",
  "Coming soon": "Wkrótce",
  "project showcase": "portfolio projektów",
  "Redesigned home page compared with the original":
    "Strona główna po redesignie w porównaniu z oryginałem",
  "Redesigned home page. Move the cursor over it, or tap, to reveal the original site underneath.":
    "Strona główna po redesignie. Najedź kursorem lub dotknij, by odsłonić pod spodem oryginalną stronę.",
};

const EN_FMT = {
  heroCap: (dark: boolean) => `Redesigned home page · ${dark ? "dark" : "light"} theme`,
  showing: (n: number, of: number, page: string | null, pages: number) =>
    `Showing ${n} of ${of} insights` + (page ? ` on ${page}` : ` across ${pages} pages`),
  insights: "insights",
  critical: "critical",
  screen: (i: string, n: string) => `Screen ${i} of ${n}`,
  openInFigma: (label: string) => `Open ${label} in Figma ↗`,
  openCard: (label: string, kind: "wireframe" | "mockup") => `Open ${label} ${kind}`,
  notes: (n: number) => `${n} notes`,
  states: (n: number) => `${n} states`,
  frames: (n: number) => `${n} frames`,
  cover: (title: string) => `cover · ${title}`,
  wireAlt: (label: string, view: "desktop" | "mobile") => `${label} wireframe, ${view}`,
  mockAlt: (label: string, view: "desktop" | "mobile", dark: boolean) =>
    `${label} mockup, ${view}, ${dark ? "dark" : "light"} theme`,
};

/** Polish plural: 1 notatka, 2–4 notatki (not 12–14), 5+ notatek. */
function plural(n: number, one: string, few: string, many: string) {
  if (n === 1) return `${n} ${one}`;
  const d = n % 10;
  const t = n % 100;
  return `${n} ${d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : many}`;
}

const PL_FMT: typeof EN_FMT = {
  heroCap: (dark) => `Strona główna po redesignie · motyw ${dark ? "ciemny" : "jasny"}`,
  showing: (n, of, page, pages) =>
    `Widoczne ${n} z ${of} wniosków` + (page ? ` · ${page}` : ` z ${pages} stron`),
  insights: "wniosków",
  critical: "krytycznych",
  screen: (i, n) => `Ekran ${i} z ${n}`,
  openInFigma: (label) => `Otwórz ${label} w Figmie ↗`,
  openCard: (label, kind) => `Otwórz ${kind === "wireframe" ? "wireframe" : "makietę"}: ${label}`,
  notes: (n) => plural(n, "notatka", "notatki", "notatek"),
  states: (n) => plural(n, "stan", "stany", "stanów"),
  frames: (n) => plural(n, "ekran", "ekrany", "ekranów"),
  cover: (title) => `okładka · ${title}`,
  wireAlt: (label, view) => `Wireframe: ${label}, ${view}`,
  mockAlt: (label, view, dark) => `Makieta: ${label}, ${view}, motyw ${dark ? "ciemny" : "jasny"}`,
};

/** English copy in, the current language out. Text without a translation stays English. */
export function useTr() {
  const { lang } = useI18n();
  const tr = useCallback(
    (s: string) => {
      if (lang !== "pl") return s;
      if (PL[s] !== undefined) return PL[s];
      if (PL_MORE[s] !== undefined) return PL_MORE[s];
      return s;
    },
    [lang],
  );
  return { tr, f: lang === "pl" ? PL_FMT : EN_FMT, lang };
}
