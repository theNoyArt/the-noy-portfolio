import { describe, expect, it } from "vite-plus/test";
import { UI } from "../content/ui";
import { getCase } from "../lib/cases";
import { caseSections } from "./sections";

describe("caseSections", () => {
  it("lists the DriveThruRPG decisions and usability test between the mockups and the build track", () => {
    const dtrpg = getCase("dtrpg")!;
    const s = caseSections(dtrpg, UI.en);
    expect(s.map((x) => x.id)).toEqual([
      "overview",
      "audit",
      "wireframes",
      "system",
      "mockups",
      "decisions",
      "usability",
      "stack",
      "api",
    ]);
    expect(s.find((x) => x.id === "decisions")).toMatchObject({
      dom: "c-decisions",
      num: "06",
      label: "Decisions and changes",
      track: "ux",
    });
    expect(s.find((x) => x.id === "usability")).toMatchObject({
      dom: "c-usability",
      num: "07",
      track: "ux",
    });
    expect(caseSections(dtrpg, UI.pl).find((x) => x.id === "usability")?.label).toBe(
      "Test użyteczności",
    );
  });
});
