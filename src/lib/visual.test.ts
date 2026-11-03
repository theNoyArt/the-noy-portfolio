import { describe, expect, it } from "vite-plus/test";
import { coverFor, imageBg, stripes } from "./visual";

describe("coverFor", () => {
  const images = { coverLight: "/light.webp", coverDark: "/dark.webp" };

  it("picks the cover for the current theme", () => {
    expect(coverFor(images, "light")).toBe("/light.webp");
    expect(coverFor(images, "dark")).toBe("/dark.webp");
  });

  it("falls back to the shared cover, then to null", () => {
    expect(coverFor({ cover: "/both.webp" }, "dark")).toBe("/both.webp");
    expect(coverFor({}, "light")).toBeNull();
    expect(coverFor(undefined, "light")).toBeNull();
  });
});

describe("imageBg", () => {
  it("uses the image when there is one", () => {
    expect(imageBg("/a.webp", "red").backgroundImage).toBe('url("/a.webp")');
  });

  it("uses the fallback without an image", () => {
    expect(imageBg(null, stripes(260, "dark"))).toEqual({ background: stripes(260, "dark") });
  });
});
