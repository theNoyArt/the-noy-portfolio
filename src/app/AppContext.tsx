import { createContext, useContext } from "react";
import type { ThemeName } from "../config";
import type { CaseSectionId, HomeSection } from "./sections";

export type Route = { page: "home" } | { page: "case"; id: string };

export interface AppApi {
  route: Route;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  narrow: boolean;
  reduced: boolean;
  /** Home section currently in view. */
  activeSection: HomeSection;
  /** DOM id of the case-study section currently in view. */
  activeCaseSection: string;
  goSection: (key: HomeSection) => void;
  openCase: (id: string, section?: CaseSectionId) => void;
  scrollToCaseSection: (id: CaseSectionId) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  prefsOpen: boolean;
  setPrefsOpen: (v: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
}

export const AppCtx = createContext<AppApi | null>(null);

export function useApp(): AppApi {
  const v = useContext(AppCtx);
  if (!v) throw new Error("useApp must be used inside the App");
  return v;
}
