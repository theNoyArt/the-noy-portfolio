// Site-wide switches. These were the "Tweaks" in Claude Design.

export type ThemeName = "dark" | "light";

export const CONFIG = {
  /** Mode a first-time visitor sees: "dark" is Cyber dark, "light" is Glass light. After that the site remembers their choice. */
  defaultTheme: "dark" as ThemeName,
  /**
   * Case studies without real `metrics` show generated placeholder numbers in the
   * UX audit, testing and analytics sections. Set to false before publishing to hide
   * those sections for any project you haven't filled in.
   */
  showPlaceholderMetrics: true,
  /** Where the AI chat sends questions. See server/chat.ts. */
  chatEndpoint: "/api/chat",
};
