import { useApp } from "../../app/AppContext";
import { caseSections } from "../../app/sections";
import type { ResolvedCase } from "../../lib/cases";
import { cn } from "../../lib/cn";
import { useI18n } from "../../lib/i18n";
import { CaseMobileBar } from "../CaseMobileBar";
import { Audit } from "./Audit";
import { Build } from "./Build";
import { Closing } from "./Closing";
import { DesignSystem } from "./DesignSystem";
import { Overview } from "./Overview";
import { Mockups, Wireframes } from "./Screens";
import { useTr } from "./tr";
import { Band, LightboxProvider } from "./ui";

/** DriveThruRPG redesign: a hand-built case study (ported from the approved prototype). */
export function DtrpgPage({ c }: { c: ResolvedCase }) {
  const { t } = useI18n();
  const { tr, lang } = useTr();
  const app = useApp();

  return (
    // Polish type labels ("Krytyczna poprawka") need a wider type column in the insight table.
    <article className={cn("case-scope", lang === "pl" && "[--type-col:176px]")}>
      {app.narrow && <CaseMobileBar c={c} sections={caseSections(c, t)} />}
      <LightboxProvider>
        <Overview />
        <Band label={tr("Design track")} nums="02 — 05" />
        <Audit />
        <Wireframes />
        <DesignSystem />
        <Mockups />
        <Build />
        <Closing c={c} />
        <p className="block px-[max(16px,min(4vw,56px))] pb-5 font-mono text-[11.5px] text-muted">
          {tr("Not affiliated with DriveThruRPG · portfolio case study")}
        </p>
      </LightboxProvider>
    </article>
  );
}
