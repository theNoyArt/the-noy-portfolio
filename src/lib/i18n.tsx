import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LANGS, type Lang, type Localized } from "../content/types";
import { UI, type UIStrings } from "../content/ui";
import { PERSON } from "../content/person";
import { readPref, writePref } from "./storage";

interface I18n {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: UIStrings;
  /** Pick the current language from a { en, pl } value. */
  L: (v: Localized | undefined | null) => string;
  /** Fill {firstName} and {email} placeholders. */
  fmt: (s: string) => string;
}

const Ctx = createContext<I18n | null>(null);

function initialLang(): Lang {
  const saved = readPref("lang", LANGS);
  if (saved) return saved;
  return typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("pl")
    ? "pl"
    : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    writePref("lang", l);
  }, []);

  const value = useMemo<I18n>(() => {
    const L = (v: Localized | undefined | null) => (v ? (v[lang] ?? v.en) : "");
    const fmt = (s: string) =>
      s.replace("{firstName}", PERSON.firstName).replace("{email}", PERSON.email);
    return { lang, setLang, t: UI[lang], L, fmt };
  }, [lang, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18n {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside I18nProvider");
  return v;
}
