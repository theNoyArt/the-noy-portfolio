import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CONFIG, type ThemeName } from "../config";
import { cn } from "../lib/cn";
import { useI18n } from "../lib/i18n";
import { useNarrow, useReducedMotion } from "../lib/hooks";
import { readPref, writePref } from "../lib/storage";
import { useReveal } from "../lib/useReveal";
import { getCase } from "../lib/cases";
import { GLITCH_COLORS, themeVars } from "../theme/themes";
import { AppCtx, type AppApi } from "./AppContext";
import { applyMeta, parseUrl, pathFor, type Route } from "./routes";
import type { HomeView } from "../content/views";
import { HOME_SECTIONS, type CaseSectionId, type HomeSection } from "./sections";
import { Sidebar } from "../components/Sidebar";
import { MobileHeader, MobileMenu } from "../components/MobileNav";
import { PrefsPopover } from "../components/PrefsPopover";
import { Chat } from "../components/Chat";
import { HomePage } from "../pages/HomePage";
import { DtrpgPage } from "../pages/dtrpg/DtrpgPage";
import { TamagotchiPage } from "../pages/tamagotchi/TamagotchiPage";
import { ArtPracticePage } from "../pages/artpractice/ArtPracticePage";
import { VantgardPage } from "../pages/vantgard/VantgardPage";
import { PortfolioPage } from "../pages/portfolio/PortfolioPage";
import { IllustrationPage } from "../pages/illustration/IllustrationPage";
import { Footer } from "../components/Footer";

const THEMES: ThemeName[] = ["dark", "light"];

/** The route for the address bar. Old hash links (#/case/<id>) are swapped for their real URL. */
function readUrl(): Route {
  const { pathname, hash, search } = window.location;
  const r = parseUrl(pathname, hash);
  const routeHash = hash.startsWith("#/");
  if (routeHash || pathname !== pathFor(r))
    window.history.replaceState(null, "", pathFor(r) + search + (routeHash ? "" : hash));
  return r;
}

/** Offset for the sticky mobile header (and the case-study section bar below it). */
function scrollOffset(narrow: boolean, onCase: boolean) {
  if (!narrow) return 0;
  return onCase ? 116 : 66;
}

export function App() {
  const { lang, t } = useI18n();
  const narrow = useNarrow();
  const reduced = useReducedMotion();

  const [route, setRoute] = useState<Route>(readUrl);
  // The home view stays in effect on case studies, so going back returns to the same version of home.
  const [view, setView] = useState<HomeView>(route.page === "home" ? route.view : "all");
  useEffect(() => {
    if (route.page === "home") setView(route.view);
  }, [route]);
  const [theme, setThemeState] = useState<ThemeName>(
    () => readPref("theme", THEMES) ?? CONFIG.defaultTheme,
  );
  const [activeSection, setActiveSection] = useState<HomeSection>("home");
  const [activeCaseSection, setActiveCaseSection] = useState("c-overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const appRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const themeBusy = useRef(false);
  const afterRoute = useRef<(() => void) | null>(null);
  const animateIn = useRef(false);

  // ---- theme ---------------------------------------------------------------
  useLayoutEffect(() => {
    const vars = themeVars(theme);
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.dataset.theme = theme;
  }, [theme]);

  const glitch = useCallback((toDark: boolean) => {
    const ov = overlayRef.current;
    const app = appRef.current;
    if (!ov || !app) return;
    const cols = GLITCH_COLORS[toDark ? "dark" : "light"];
    Array.from(ov.children).forEach((node, i) => {
      const s = node as HTMLElement;
      const w = 20 + Math.random() * 70;
      s.style.top = Math.random() * 96 + "%";
      s.style.height = 1 + Math.random() * (toDark ? 6 : 4) + "%";
      s.style.left = Math.random() * (100 - w) + "%";
      s.style.width = w + "%";
      s.style.background = cols[i % cols.length];
      const dx = (Math.random() * 2 - 1) * (toDark ? 60 : 30);
      s.animate(
        [
          { opacity: 0, transform: `translateX(${dx}%)` },
          { opacity: 1, transform: "none", offset: 0.2 },
          { opacity: 0, offset: 0.35 },
          { opacity: 1, transform: `translateX(${-dx / 2}%)`, offset: 0.55 },
          { opacity: 0, transform: "none" },
        ],
        { duration: 560 + Math.random() * 200, delay: i * 22, easing: "steps(5)" },
      );
    });
    const k = toDark ? 1 : 0.6;
    app.animate(
      [
        { filter: "none", transform: "none" },
        {
          filter: `drop-shadow(${6 * k}px 0 0 rgba(255,0,90,.6)) drop-shadow(${-6 * k}px 0 0 rgba(0,230,255,.6))`,
          transform: `translate(${-5 * k}px, ${2 * k}px)`,
          offset: 0.2,
        },
        { filter: "none", transform: "none", offset: 0.35 },
        {
          filter: `drop-shadow(${-4 * k}px 0 0 rgba(255,0,90,.5)) drop-shadow(${4 * k}px 0 0 rgba(0,230,255,.5))`,
          transform: `translateX(${4 * k}px)`,
          offset: 0.5,
        },
        { filter: "none", transform: "none" },
      ],
      { duration: 680, easing: "steps(8)" },
    );
  }, []);

  const setTheme = useCallback(
    (next: ThemeName) => {
      if (next === theme || themeBusy.current) return;
      writePref("theme", next);
      if (reduced) return setThemeState(next);
      themeBusy.current = true;
      glitch(next === "dark");
      window.setTimeout(() => setThemeState(next), 260);
      window.setTimeout(() => (themeBusy.current = false), 800);
    },
    [theme, reduced, glitch],
  );

  // ---- language change: soft blur-in of the content ------------------------
  const firstLang = useRef(true);
  useEffect(() => {
    if (firstLang.current) return void (firstLang.current = false);
    if (!reduced)
      contentRef.current?.animate(
        [
          { opacity: 0.2, filter: "blur(2px)" },
          { opacity: 1, filter: "none" },
        ],
        { duration: 380, easing: "ease-out" },
      );
  }, [lang, reduced]);

  // ---- routing ---------------------------------------------------------------
  const scrollToDom = useCallback(
    (domId: string, onCase: boolean) => {
      const el = document.getElementById(domId);
      const top =
        domId === "s-home" || !el
          ? 0
          : el.getBoundingClientRect().top + window.scrollY - scrollOffset(narrow, onCase);
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [narrow, reduced],
  );

  /** Swap pages with a wipe: old content wipes up, new content wipes down in. */
  const navigate = useCallback(
    (next: Route, after?: () => void) => {
      const path = pathFor(next);
      const apply = () => {
        afterRoute.current = after ?? null;
        animateIn.current = !reduced;
        if (window.location.pathname !== path) window.history.pushState(null, "", path);
        setRoute(next);
      };
      const el = contentRef.current;
      if (reduced || !el) return apply();
      const out = el.animate(
        [
          { opacity: 1, clipPath: "inset(0 0 0 0)" },
          { opacity: 0, clipPath: "inset(100% 0 0 0)" },
        ],
        { duration: 260, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" },
      );
      out.onfinish = () => {
        apply();
        window.setTimeout(() => out.cancel(), 30);
      };
    },
    [reduced],
  );

  // After a route change: jump to top, play the wipe-in, then run any follow-up scroll.
  const routeKey =
    route.page === "case"
      ? "case:" + route.id
      : route.page === "illustration"
        ? "illustration"
        : "home:" + route.view;
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (animateIn.current) {
      contentRef.current?.animate(
        [
          { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, clipPath: "inset(0 0 0 0)" },
        ],
        { duration: 560, easing: "cubic-bezier(.7,0,.2,1)" },
      );
      animateIn.current = false;
    }
    const after = afterRoute.current;
    afterRoute.current = null;
    if (after) requestAnimationFrame(() => requestAnimationFrame(after));
    setActiveCaseSection("c-overview");
  }, [routeKey]);

  // Title, description and canonical for the page and language.
  useEffect(() => applyMeta(route, lang), [route, lang]);

  // Browser back/forward, and old hash links typed into the address bar.
  useEffect(() => {
    const on = () => {
      // In-page anchors like #content are not routes.
      const h = window.location.hash;
      if (h && !h.startsWith("#/")) return;
      const next = readUrl();
      setRoute((cur) => (pathFor(cur) === pathFor(next) ? cur : next));
    };
    window.addEventListener("popstate", on);
    window.addEventListener("hashchange", on);
    return () => {
      window.removeEventListener("popstate", on);
      window.removeEventListener("hashchange", on);
    };
  }, []);

  const goSection = useCallback(
    (key: HomeSection) => {
      setMenuOpen(false);
      const run = () => scrollToDom("s-" + key, false);
      if (route.page !== "home") navigate({ page: "home", view }, run);
      else run();
    },
    [route.page, view, navigate, scrollToDom],
  );

  const openCase = useCallback(
    (id: string, section?: CaseSectionId) => {
      setPrefsOpen(false);
      setMenuOpen(false);
      navigate({ page: "case", id }, section ? () => scrollToDom("c-" + section, true) : undefined);
    },
    [navigate, scrollToDom],
  );

  /** Client-side navigation to any route (internal links). */
  const goTo = useCallback(
    (next: Route) => {
      setPrefsOpen(false);
      setMenuOpen(false);
      if (pathFor(next) === pathFor(route)) window.scrollTo({ top: 0 });
      else navigate(next);
    },
    [route, navigate],
  );

  const scrollToCaseSection = useCallback(
    (id: CaseSectionId) => scrollToDom("c-" + id, true),
    [scrollToDom],
  );

  // ---- which section is in view ---------------------------------------------
  useEffect(() => {
    let raf = 0;
    const track = () => {
      raf = 0;
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
      // A section counts as current once its top passes this line (below the sticky bars on mobile).
      const line = 200 + scrollOffset(narrow, route.page === "case");
      let cur: string | null = els[0]?.id ?? null;
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < line) cur = el.id;
      });
      if (!cur) return;
      if (route.page === "home") {
        const key = cur.slice(2) as HomeSection;
        if (HOME_SECTIONS.includes(key)) setActiveSection(key);
      } else setActiveCaseSection(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(track);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    track();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [route.page, routeKey, narrow]);

  useEffect(() => {
    if (!narrow) setMenuOpen(false);
  }, [narrow]);

  // Escape closes whichever overlay is open.
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPrefsOpen(false);
      setMenuOpen(false);
      setChatOpen(false);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  useReveal([routeKey, narrow], reduced);

  const api = useMemo<AppApi>(
    () => ({
      route,
      view,
      theme,
      setTheme,
      narrow,
      reduced,
      activeSection,
      activeCaseSection,
      goSection,
      openCase,
      goTo,
      scrollToCaseSection,
      menuOpen,
      setMenuOpen,
      prefsOpen,
      setPrefsOpen,
      chatOpen,
      setChatOpen,
    }),
    [
      route,
      view,
      theme,
      setTheme,
      narrow,
      reduced,
      activeSection,
      activeCaseSection,
      goSection,
      openCase,
      goTo,
      scrollToCaseSection,
      menuOpen,
      prefsOpen,
      chatOpen,
    ],
  );

  const current = route.page === "case" ? getCase(route.id) : null;

  return (
    <AppCtx.Provider value={api}>
      <a
        className="fixed top-[-60px] left-3 z-[100] rounded-card-sm bg-ink px-[14px] py-[10px] text-bg focus:top-3"
        href="#content"
      >
        {t.skip}
      </a>
      {/* "app" / "app--narrow" are hooks for the wide: / narrow: variants. */}
      <div
        ref={appRef}
        className={cn(
          "app grid min-h-screen grid-cols-[240px_minmax(0,1fr)] items-start text-ink @container",
          narrow && "app--narrow block",
        )}
      >
        {!narrow && <Sidebar current={current} />}
        <main id="content" className="min-w-0 focus:outline-none" tabIndex={-1}>
          {narrow && <MobileHeader />}
          <div ref={contentRef}>
            {current?.page === "dtrpg" ? (
              <DtrpgPage key={current.id} c={current} />
            ) : current?.page === "portfolio" ? (
              <PortfolioPage key={current.id} c={current} />
            ) : current?.page === "artpractice" ? (
              <ArtPracticePage key={current.id} c={current} />
            ) : current?.page === "vantgard" ? (
              <VantgardPage key={current.id} c={current} />
            ) : current?.page === "tamagotchi" ? (
              <TamagotchiPage key={current.id} c={current} />
            ) : route.page === "illustration" ? (
              <IllustrationPage />
            ) : (
              <HomePage />
            )}
          </div>
          <Footer />
        </main>
      </div>

      {/* Cyber scanlines. Off on /illustration, so nothing darkens the artwork. */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-30 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.22)_0_1px,transparent_1px_3px)] opacity-[calc(var(--hud)*0.3)] transition-opacity duration-[600ms]",
          route.page === "illustration" && "opacity-0",
        )}
        aria-hidden="true"
      />
      <Chat />
      {narrow && menuOpen && <MobileMenu />}
      {prefsOpen && <PrefsPopover />}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[60] overflow-hidden [&>div]:absolute [&>div]:opacity-0"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ mixBlendMode: i % 2 === 0 ? "difference" : "normal" }} />
        ))}
      </div>
    </AppCtx.Provider>
  );
}
