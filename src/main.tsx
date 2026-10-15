// Tailwind (theme, base, utilities) first, then the legacy shared CSS still being migrated.
import "./styles/app.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "./lib/i18n";
import { App } from "./app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
