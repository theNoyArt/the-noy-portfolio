import { describe, expect, it } from "vite-plus/test";
import { cn, tv } from "./cn";

describe("cn", () => {
  it("joins class names and skips falsy ones", () => {
    expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
  });

  it("lets the last conflicting Tailwind class win", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });

  it("keeps classes behind different variants apart", () => {
    expect(cn("bg-surface", "glass:bg-white", "hover:bg-accent")).toBe(
      "bg-surface glass:bg-white hover:bg-accent",
    );
  });

  it("resolves the custom theme radii, shadows and animations", () => {
    expect(cn("rounded-card", "rounded-full")).toBe("rounded-full");
    expect(cn("rounded-[6px]", "rounded-card-sm")).toBe("rounded-card-sm");
    expect(cn("glass:shadow-[0_0_6px_red]", "glass:shadow-glass")).toBe("glass:shadow-glass");
    expect(cn("shadow-glow", "shadow-none")).toBe("shadow-none");
    expect(cn("animate-tg-bob", "animate-none")).toBe("animate-none");
  });

  it("keeps custom shadows apart from shadow colours", () => {
    expect(cn("shadow-pop", "shadow-accent")).toBe("shadow-pop shadow-accent");
  });
});

describe("tv", () => {
  it("lets a variant override a custom theme class from the base", () => {
    const pill = tv({
      base: "rounded-card-sm shadow-glass",
      variants: { round: { true: "rounded-full shadow-none" } },
    });
    expect(pill({ round: true })).toBe("rounded-full shadow-none");
  });
});
