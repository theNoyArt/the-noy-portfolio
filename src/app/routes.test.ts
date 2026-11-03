import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vite-plus/test";
import { CONFIG } from "../config";
import { SHOWCASE } from "../content/showcase";
import { parseUrl, pathFor, routeMeta } from "./routes";

describe("routes", () => {
  it("reads the real URLs", () => {
    expect(parseUrl("/")).toEqual({ page: "home", view: "all" });
    expect(parseUrl("/frontend")).toEqual({ page: "home", view: "frontend" });
    expect(parseUrl("/ux/")).toEqual({ page: "home", view: "ux" });
    expect(parseUrl("/case/dtrpg")).toEqual({ page: "case", id: "dtrpg" });
  });

  it("sends unknown pages and projects home", () => {
    expect(parseUrl("/nope")).toEqual({ page: "home", view: "all" });
    expect(parseUrl("/case/nope")).toEqual({ page: "home", view: "all" });
  });

  it("still opens old hash links, wherever they land", () => {
    expect(parseUrl("/", "#/case/dtrpg")).toEqual({ page: "case", id: "dtrpg" });
    expect(parseUrl("/", "#/")).toEqual({ page: "home", view: "all" });
    // An in-page anchor is not a route.
    expect(parseUrl("/case/dtrpg", "#c-overview")).toEqual({ page: "case", id: "dtrpg" });
  });

  it("round-trips every route through its path", () => {
    for (const p of ["/", "/frontend", "/ux", "/case/vantgard"])
      expect(pathFor(parseUrl(p))).toBe(p);
  });

  it("titles each page in both languages and keeps hidden projects out of search", () => {
    expect(routeMeta({ page: "home", view: "ux" }, "pl").title).toContain("Projektantka UX/UI");
    expect(routeMeta({ page: "case", id: "dtrpg" }, "en")).toMatchObject({
      title: "DriveThruRPG · Paulina Targosz",
      path: "/case/dtrpg",
      noindex: false,
    });
    expect(routeMeta({ page: "case", id: "tamagotchi" }, "en").noindex).toBe(true);
  });

  it("lists exactly the visible pages in sitemap.xml", () => {
    const xml = readFileSync(join(process.cwd(), "public/sitemap.xml"), "utf8");
    const locs = [...xml.matchAll(/<loc>(.+?)<\/loc>/g)].map((m) => m[1]);
    const visible = SHOWCASE.filter((s) => !s.hidden).map((s) => `/case/${s.id}`);
    expect(locs.sort()).toEqual(
      ["/", "/frontend", "/ux", ...visible].map((p) => CONFIG.siteUrl + p).sort(),
    );
  });
});
