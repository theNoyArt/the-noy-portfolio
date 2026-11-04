import { CONFIG } from "../config";
import { PERSON } from "../content/person";
import type { Lang } from "../content/types";
import { ILLUSTRATION } from "../content/illustration";
import { VIEWS, type HomeView } from "../content/views";
import { getCase } from "../lib/cases";

// Real URLs: /, /frontend, /ux, /illustration and /case/<id>. vercel.json sends them all to index.html.
export type Route =
  | { page: "home"; view: HomeView }
  | { page: "case"; id: string }
  | { page: "illustration" };

const ILLUSTRATION_PATH = "/illustration";

const HOME: Route = { page: "home", view: "all" };

export function pathFor(r: Route): string {
  if (r.page === "case") return `/case/${r.id}`;
  if (r.page === "illustration") return ILLUSTRATION_PATH;
  return VIEWS[r.view].path;
}

/**
 * The route for a URL. Old hash links (#/case/<id>, #/), still printed on the CVs, resolve
 * the same as their real URLs; App replaces them in the address bar.
 */
export function parseUrl(pathname: string, hash = ""): Route {
  const old = hash.match(/^#\/(?:case\/([\w-]+))?/);
  if (old) return old[1] && getCase(old[1]) ? { page: "case", id: old[1] } : HOME;
  const path = pathname.replace(/\/+$/, "") || "/";
  const m = path.match(/^\/case\/([\w-]+)$/);
  if (m) return getCase(m[1]) ? { page: "case", id: m[1] } : HOME;
  if (path === ILLUSTRATION_PATH) return { page: "illustration" };
  const view = (Object.keys(VIEWS) as HomeView[]).find((v) => VIEWS[v].path === path);
  return view ? { page: "home", view } : HOME;
}

/** Title, description and canonical path for a route. Hidden projects ask not to be indexed. */
export function routeMeta(r: Route, lang: Lang) {
  const c = r.page === "case" ? getCase(r.id) : null;
  if (c)
    return {
      title: `${c.name} · ${PERSON.name}`,
      description: c.short[lang],
      path: `/case/${c.id}`,
      noindex: !!c.hidden,
    };
  if (r.page === "illustration")
    return {
      title: ILLUSTRATION.pageTitle[lang],
      description: ILLUSTRATION.description[lang],
      path: ILLUSTRATION_PATH,
      noindex: false,
    };
  const v = VIEWS[r.page === "home" ? r.view : "all"];
  return { title: v.title[lang], description: v.description[lang], path: v.path, noindex: false };
}

/** Writes routeMeta into <head>. */
export function applyMeta(r: Route, lang: Lang) {
  const m = routeMeta(r, lang);
  document.title = m.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", m.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", CONFIG.siteUrl + m.path);
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (m.noindex && !robots) {
    robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.append(robots);
  } else if (!m.noindex) robots?.remove();
}
