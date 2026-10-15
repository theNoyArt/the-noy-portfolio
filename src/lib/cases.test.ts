import { describe, expect, it } from "vite-plus/test";
import { SHOWCASE } from "../content/showcase";
import { SHOW_CASES, getCase, nextCase } from "./cases";

describe("cases", () => {
  it("resolves every showcase project by id", () => {
    for (const s of SHOWCASE) expect(getCase(s.id)?.name).toBe(s.name);
    expect(getCase("does-not-exist")).toBeNull();
    expect(getCase(null)).toBeNull();
  });

  it("walks the showcase in order and wraps around", () => {
    expect(nextCase(SHOW_CASES[0]).id).toBe(SHOW_CASES[1].id);
    expect(nextCase(SHOW_CASES[SHOW_CASES.length - 1]).id).toBe(SHOW_CASES[0].id);
  });

  it("follows the portfolio with Bond (its next-project card has the mascot cover)", () => {
    const portfolio = SHOW_CASES.find((c) => c.id === "portfolio")!;
    expect(nextCase(portfolio).id).toBe("tamagotchi");
  });
});
