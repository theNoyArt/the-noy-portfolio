// DriveThruRPG case study: key decisions and the before/after pairs. English text here is translated through ./pl.ts.
import type { Img } from "./types";

export interface Decision {
  t: string;
  considered: string;
  chose: string;
  why: string;
  cost: string;
}

/** Labels of a decision's lines, in the order they show. */
export const DECISION_KEYS = [
  ["considered", "Considered"],
  ["chose", "Chose"],
  ["why", "Why"],
  ["cost", "Cost"],
] as const;

export const DT_DECISIONS: Decision[] = [
  {
    t: "Filters: a side panel, not a toolbar",
    considered: "a horizontal filter bar with dropdowns, as on many stores.",
    chose: "a collapsible side panel with result counts and search inside long lists.",
    why: "there are 9 filter groups, and rule systems and publishers run to hundreds of values. A bar would hide them behind dropdowns again.",
    cost: "a narrower results grid on desktop. On mobile the panel becomes a full-screen drawer with “Show N results”.",
  },
  {
    t: "Library: checkboxes, not switches",
    considered: "keeping the toggle switches the live Library uses for selection.",
    chose: "row checkboxes, Select all and a selection bar with bulk actions.",
    why: "a switch means a setting that applies at once; picking titles is a temporary choice before an action. Switches stay only for settings that save instantly.",
    cost: "one extra step (select, then act), and current users have to relearn it.",
  },
  {
    t: "Brand red: two accessible variants",
    considered: "using the one brand red everywhere, as today, or replacing it.",
    chose:
      "keep the brand red and add primary-text (#CA2B29, 5.4:1 on cards) for small red text and primary-solid (#D73A38, white text 4.6:1) for buttons.",
    why: "the brand red fails WCAG AA as small text and under white labels (4.42:1).",
    cost: "two more tokens to maintain, and reds slightly darker than the brand.",
  },
  {
    t: "Home: one campaign at a time",
    considered: "keeping the 3 rotating banners and about 10 shelves.",
    chose:
      "one main campaign, time-limited offers in their own row, and fewer shelves, each labelled by what it contains.",
    why: "when everything is promoted, nothing stands out, and the catalogue is pushed far down, especially on mobile.",
    cost: "fewer promo slots for publishers and sponsors, a trade-off the business would need to accept.",
  },
];

export interface BeforeAfterSide {
  /** Folder under /images/dtrpg, with a trailing slash. */
  dir: string;
  img: Img;
  alt: string;
  cap: string;
}

export interface BeforeAfter {
  t: string;
  before: BeforeAfterSide;
  after: BeforeAfterSide;
}

export const DT_BEFORE_AFTER: BeforeAfter[] = [
  {
    t: "Home",
    before: {
      dir: "before/",
      img: { name: "old-home", w: 1200, h: 2200 },
      alt: "Live DriveThruRPG home page before the redesign",
      cap: "About 10 shelves and 3 competing banners. Language, currency, theme and AI settings sit about 2,000px down, in the mobile footer.",
    },
    after: {
      dir: "mockups/",
      img: { name: "home-desktop-1", w: 1920, h: 2729 },
      alt: "Redesigned home page, desktop mockup",
      cap: "One main campaign, time-limited offers kept apart, and those settings in the sticky header.",
    },
  },
  {
    t: "Product listing",
    before: {
      dir: "before/",
      img: { name: "old-listing", w: 1200, h: 1100 },
      alt: "Live DriveThruRPG product listing before the redesign",
      cap: "9 filter buttons that open modals, so no filter option is visible by default. 4 shelves repeat titles from the list above it.",
    },
    after: {
      dir: "mockups/",
      img: { name: "listing-desktop-1", w: 1920, h: 3301 },
      alt: "Redesigned product listing, desktop mockup",
      cap: "An inline side panel with counts, active-filter chips and quick filters. On mobile, a Filters drawer that shows the result count before you apply.",
    },
  },
  {
    t: "Cart",
    before: {
      dir: "before/",
      img: { name: "old-cart", w: 1200, h: 1100 },
      alt: "Live DriveThruRPG cart before the redesign",
      cap: "“Customers also bought” (about 20 items) is longer than the cart and fills about 90% of the mobile page. The total is far from the checkout button.",
    },
    after: {
      dir: "mockups/",
      img: { name: "cart-desktop-1", w: 1920, h: 1358 },
      alt: "Redesigned cart, desktop mockup",
      cap: "An order summary with Checkout right under the total, sticky on desktop and a bottom bar on mobile. Cross-sell is a short row below the cart.",
    },
  },
  {
    t: "My Library",
    before: {
      dir: "before/",
      img: { name: "old-library", w: 1200, h: 1100 },
      alt: "Live DriveThruRPG library before the redesign",
      cap: "Every file is listed with its own Download button, toggle switches select titles, and updates are a bare “NEW UPDATES” tag.",
    },
    after: {
      dir: "mockups/",
      img: { name: "library-desktop-1", w: 1920, h: 2338 },
      alt: "Redesigned library, desktop mockup",
      cap: "Search first, then views with counts (Updated, Not downloaded, Gifts, Archived), checkboxes with bulk download, and files folded under each title.",
    },
  },
];
