import type { ReactNode } from "react";
import { useApp } from "../app/AppContext";
import { pathFor } from "../app/routes";
import { useI18n } from "../lib/i18n";

/** The "Illustration" item in the sidebar and the mobile menu: a real link, opened without a reload. */
export function IllustrationLink({ className, num }: { className: string; num: ReactNode }) {
  const { t } = useI18n();
  const app = useApp();
  const route = { page: "illustration" } as const;
  const active = app.route.page === "illustration";
  return (
    <a
      className={className}
      href={pathFor(route)}
      aria-current={active ? "page" : undefined}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        app.goTo(route);
      }}
    >
      {num}
      <span>{t.illustrationNav}</span>
    </a>
  );
}
