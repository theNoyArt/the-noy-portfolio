import { VISIBLE_SHOWCASE } from "./showcase";
import type { CvKind, Localized, ShowcaseProject } from "./types";

/**
 * The three versions of the home page. "/" shows both roles; "/frontend" and "/ux" lead with
 * one role, offer only its CV and pick the projects that fit it.
 */
export type HomeView = "all" | "frontend" | "ux";

export interface View {
  path: string;
  /** The role named first in the hero and the sidebar. */
  lead: CvKind;
  /** CVs offered in the hero and the sidebar, in order. */
  cvs: CvKind[];
  /** Showcase project ids in display order; null = every visible project in showcase order. */
  projects: string[] | null;
  /** Page title and meta description. */
  title: Localized;
  description: Localized;
}

export const VIEWS: Record<HomeView, View> = {
  all: {
    path: "/",
    lead: "frontend",
    cvs: ["frontend", "ux"],
    projects: null,
    title: {
      en: "Paulina Targosz · Front-end Developer + UX/UI Designer",
      pl: "Paulina Targosz · Front-end Developerka + Projektantka UX/UI",
    },
    description: {
      en: "Portfolio of Paulina Targosz, front-end developer (React, TypeScript) and UX/UI designer: case studies, experience and projects.",
      pl: "Portfolio Pauliny Targosz, front-end developerki (React, TypeScript) i projektantki UX/UI: case studies, doświadczenie i projekty.",
    },
  },
  frontend: {
    path: "/frontend",
    lead: "frontend",
    cvs: ["frontend"],
    projects: ["dtrpg", "portfolio"],
    title: {
      en: "Paulina Targosz · Front-end Developer",
      pl: "Paulina Targosz · Front-end Developerka",
    },
    description: {
      en: "Paulina Targosz, front-end developer: React and TypeScript apps, with a UX/UI background. Case studies, experience and CV.",
      pl: "Paulina Targosz, front-end developerka: aplikacje w React i TypeScript, z zapleczem UX/UI. Case studies, doświadczenie i CV.",
    },
  },
  ux: {
    path: "/ux",
    lead: "ux",
    cvs: ["ux"],
    projects: ["dtrpg", "vantgard", "portfolio"],
    title: {
      en: "Paulina Targosz · UX/UI Designer",
      pl: "Paulina Targosz · Projektantka UX/UI",
    },
    description: {
      en: "Paulina Targosz, UX/UI designer: research, UX audits, design systems and prototypes, with front-end experience. Case studies, experience and CV.",
      pl: "Paulina Targosz, projektantka UX/UI: badania, audyty UX, design systemy i prototypy, z doświadczeniem front-endowym. Case studies, doświadczenie i CV.",
    },
  },
};

/** The showcase projects a view lists, in its order. Hidden projects never appear. */
export function showcaseFor(view: HomeView): ShowcaseProject[] {
  const ids = VIEWS[view].projects;
  if (!ids) return VISIBLE_SHOWCASE;
  return ids.flatMap((id) => VISIBLE_SHOWCASE.filter((s) => s.id === id));
}

/** "Front-end Developer + UX/UI Designer", with the view's lead role first. */
export function roleFor(view: HomeView, role: string): string {
  const parts = role.split(" + ");
  return VIEWS[view].lead === "ux" ? [...parts].reverse().join(" + ") : role;
}
