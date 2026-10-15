import { describe, expect, it } from "vite-plus/test";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class names and skips falsy ones", () => {
    expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
  });

  it("lets the last conflicting Tailwind class win", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });

  it("keeps classes behind different variants apart", () => {
    expect(cn("bg-surface", "glass:bg-white", "hover:bg-accent")).toBe("bg-surface glass:bg-white hover:bg-accent");
  });
});
