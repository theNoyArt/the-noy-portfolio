import { describe, expect, it } from "vite-plus/test";
import { SHOWCASE } from "../content/showcase";
import { SHOW_CASES, VISIBLE_SHOW_CASES, getCase, nextCase } from "./cases";

describe("cases", () => {
  it("resolves every showcase project by id, hidden ones included", () => {
    for (const s of SHOWCASE) expect(getCase(s.id)?.name).toBe(s.name);
    expect(getCase("tamagotchi")?.hidden).toBe(true);
    expect(getCase("artpractice")?.hidden).toBe(true);
    expect(getCase("does-not-exist")).toBeNull();
    expect(getCase(null)).toBeNull();
  });

  it("walks the visible showcase in order and wraps around", () => {
    const v = VISIBLE_SHOW_CASES;
    expect(nextCase(v[0]).id).toBe(v[1].id);
    expect(nextCase(v[v.length - 1]).id).toBe(v[0].id);
  });

  it("never points the next-project link at a hidden project", () => {
    for (const c of SHOW_CASES) expect(nextCase(c).hidden).toBeFalsy();
  });

  it("follows the portfolio with DriveThruRPG now that Bond and Art practice are hidden", () => {
    const portfolio = SHOW_CASES.find((c) => c.id === "portfolio")!;
    expect(nextCase(portfolio).id).toBe("dtrpg");
  });
});
