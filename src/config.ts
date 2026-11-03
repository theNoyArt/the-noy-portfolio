// Site-wide switches. These were the "Tweaks" in Claude Design.

export type ThemeName = "dark" | "light";

export const CONFIG = {
  /** Mode a first-time visitor sees: "dark" is Cyber dark, "light" is Glass light. After that the site remembers their choice. */
  defaultTheme: "light" as ThemeName,
  /** The live address, for canonical links (also in index.html, robots.txt and sitemap.xml). */
  siteUrl: "https://the-noy-portfolio.vercel.app",
  /** Where the AI chat sends questions. See server/chat.ts. */
  chatEndpoint: "/api/chat",
};
