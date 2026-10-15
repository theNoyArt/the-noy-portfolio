import { PERSON } from "../content/person";
import { useI18n } from "../lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="flex flex-wrap justify-between gap-3 border-t border-line2 px-[clamp(16px,3.5cqi,56px)] pt-5 pb-[96px] font-mono text-[11.5px] text-muted">
      <span>
        © {new Date().getFullYear()} {PERSON.name}
      </span>
      <span>{t.footerStack}</span>
    </footer>
  );
}
