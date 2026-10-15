// Generated from the DriveThruRPG prototype (Figma: DriveThruRPG — UX/UI Redesign). Edit freely.
import type { Wireframe } from "./types";

export const WIREFRAMES: Wireframe[] = [
  {
    "id": "login",
    "label": "Login",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4233-131269",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Modal over the page",
        "d": "Login opens as a dialog over the current page; closing it returns to the same place."
      },
      {
        "n": 2,
        "t": "Password field",
        "d": "Show/hide control and a Forgot password link on the same row as the label."
      },
      {
        "n": 3,
        "t": "Social sign-in",
        "d": "Roll20, Google and Facebook sit below the primary action; Register is a text link."
      }
    ],
    "mobile": [],
    "dimgs": [
      {
        "name": "04-login-desktop",
        "w": 1200,
        "h": 663
      }
    ],
    "mimg": {
      "name": "M04-login-mobile",
      "w": 391,
      "h": 663
    }
  },
  {
    "id": "home",
    "label": "Home",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4231-131205",
    "insp": "Simplified and inspired by elements of the Steam Store UI.",
    "desktop": [
      {
        "n": 1,
        "t": "Header — signed in",
        "d": "Library, wishlist, notifications (with unread count), cart and avatar. Region and theme are in the avatar menu and in Preferences."
      },
      {
        "n": 2,
        "t": "One hero",
        "d": "Single message and one primary button; no auto-rotation."
      },
      {
        "n": 3,
        "t": "Discounts & Promos",
        "d": "Three promo tiles with a discount badge; “View more” leads to the Specials listing."
      },
      {
        "n": 4,
        "t": "Content tabs",
        "d": "New Releases / Bestselling / Popular Upcoming / Specials / Free & PWYW share one list with a detail preview panel."
      },
      {
        "n": 5,
        "t": "Featured for you",
        "d": "Genre blocks with a one-line reason label (“Because you follow...” when signed in, “Popular this week” when signed out)."
      },
      {
        "n": 6,
        "t": "Catalog banner",
        "d": "Stats line plus a single “Browse all titles” action."
      },
      {
        "n": 7,
        "t": "Browse by Publisher",
        "d": "Publisher logos link to publisher pages."
      },
      {
        "n": 8,
        "t": "Browse menus",
        "d": "Publisher, Genre, Product Type, Rule System and Format open dropdowns; Community, Information, Support on the right."
      },
      {
        "n": 9,
        "t": "Footer",
        "d": "Partner-site strip, newsletter, link columns, social links."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Hero",
        "d": "One message and one button."
      },
      {
        "n": 2,
        "t": "Promos",
        "d": "Horizontally scrolling promo tiles with “View more”."
      },
      {
        "n": 3,
        "t": "New Releases",
        "d": "Compact list rows with price and chevron."
      },
      {
        "n": 4,
        "t": "Featured for you",
        "d": "Genre blocks with a reason line."
      },
      {
        "n": 5,
        "t": "Catalog banner",
        "d": "Single action to the full catalog. Menus (genre, publisher, system) live in the ☰ drawer with language, currency and theme at the top."
      }
    ],
    "dimgs": [
      {
        "name": "01-home-signed-in-desktop",
        "w": 1200,
        "h": 1665
      }
    ],
    "mimg": {
      "name": "M01-home-mobile",
      "w": 297,
      "h": 1665
    }
  },
  {
    "id": "listing",
    "label": "Product listing",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4231-131206",
    "insp": "Simplified and inspired by elements of the Allegro listing page.",
    "desktop": [
      {
        "n": 1,
        "t": "Page title and breadcrumb",
        "d": "Breadcrumb plus H1 with the active category; no promo banner above the results."
      },
      {
        "n": 2,
        "t": "Facet sidebar",
        "d": "Collapsible groups with result counts; checkboxes for multi-select (Genre, Format), radios for single-choice (Price, Rating). Search inside long lists."
      },
      {
        "n": 3,
        "t": "Applied filters",
        "d": "One row of removable chips with Clear all."
      },
      {
        "n": 4,
        "t": "Grid / list",
        "d": "Grid is the default; one compact list view; sort sits next to the toggle."
      },
      {
        "n": 5,
        "t": "Product cards",
        "d": "Same fields everywhere: publisher, title, format and system tags, rating, price, wishlist heart and quick-add."
      },
      {
        "n": 6,
        "t": "Pagination",
        "d": "Numbered pages with Prev / Next; filters, sort and page live in the URL."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Title and breadcrumb",
        "d": "Category heading with result count; no promo banner above the grid."
      },
      {
        "n": 2,
        "t": "Filters + Sort",
        "d": "Two equal buttons with an applied-filter count; grid is two columns."
      },
      {
        "n": 3,
        "t": "Cards",
        "d": "Same fields as desktop: publisher, title, tags, rating, price, heart and quick add."
      },
      {
        "n": 4,
        "t": "Filter sheet",
        "d": "Accordion groups show the current selection; “Show N results” updates live; Clear all at the top."
      }
    ],
    "dimgs": [
      {
        "name": "02-listing-grid-desktop",
        "w": 1200,
        "h": 1402
      }
    ],
    "mimg": {
      "name": "M02-listing-mobile",
      "w": 741,
      "h": 1402
    }
  },
  {
    "id": "product",
    "label": "Product page",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4231-131208",
    "insp": "Simplified, with a clear side panel.",
    "desktop": [
      {
        "n": 1,
        "t": "Breadcrumb",
        "d": "Home › system › title instead of a bare “Back to Home”."
      },
      {
        "n": 2,
        "t": "Section menu",
        "d": "Overview / Details / Reviews & Discussions scroll to anchors on the same page; the active section is highlighted."
      },
      {
        "n": 3,
        "t": "Reviews & Discussions",
        "d": "One consistent count everywhere (240), average and distribution bars that add up to 100%."
      },
      {
        "n": 4,
        "t": "Review controls",
        "d": "Filter All / Reviews / Questions, sort, “Helpful” votes, replies, report."
      },
      {
        "n": 5,
        "t": "Purchase panel",
        "d": "Format options as selectable rows with price, key facts, one primary Add to Cart, wishlist and gift option."
      },
      {
        "n": 6,
        "t": "Publisher & follow",
        "d": "Publisher card matches the byline; follow switches refer to this publisher and genre."
      },
      {
        "n": 7,
        "t": "Sticky header",
        "d": "After scrolling past the title block, a slim header stays pinned: cover thumbnail, title, section tabs, price and Add to Cart."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Title block",
        "d": "Cover, title, publisher, rating and tags first."
      },
      {
        "n": 2,
        "t": "Purchase options",
        "d": "Format rows with prices, then a single Add to Cart."
      },
      {
        "n": 3,
        "t": "Section chips",
        "d": "Overview / Details / Reviews scroll to anchors; sections stay expanded."
      },
      {
        "n": 4,
        "t": "Reviews",
        "d": "Consistent count, distribution, filter chips, sort, helpful votes."
      },
      {
        "n": 5,
        "t": "Sticky bar",
        "d": "After scrolling past the buy block, a compact bar stays pinned: cover thumbnail, title, price and Add to Cart."
      }
    ],
    "dimgs": [
      {
        "name": "03-product-desktop",
        "w": 1200,
        "h": 1635
      },
      {
        "name": "03b-product-scrolled-sticky-header-desktop",
        "w": 1200,
        "h": 1683
      }
    ],
    "mimg": {
      "name": "M03-product-mobile",
      "w": 326,
      "h": 1683
    }
  },
  {
    "id": "cart",
    "label": "Cart",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4232-131212",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Line items",
        "d": "Format, delivery note, struck-through list price, sale price and −20% badge. Quantity stepper only for print items; Save for later and Remove on every line."
      },
      {
        "n": 2,
        "t": "Order summary",
        "d": "Subtotal, savings and total reconcile ($74.97 − $15.00 = $59.97); tax and shipping are calculated at checkout."
      },
      {
        "n": 3,
        "t": "Gift option",
        "d": "Gift switch; expands into a recipient form (see gift state)."
      },
      {
        "n": 4,
        "t": "Checkout",
        "d": "One primary button; trust notes and payment methods below it."
      },
      {
        "n": 5,
        "t": "Customers also bought",
        "d": "Carousel with arrows; compact cards with a short Add action."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Line items",
        "d": "Sale price, list price and badge; quantity stepper only for print items; Save for later and Remove."
      },
      {
        "n": 2,
        "t": "Gift option",
        "d": "Switch expands to recipient name, email and message."
      },
      {
        "n": 3,
        "t": "Order summary",
        "d": "Subtotal − savings = total; tax and shipping at checkout."
      },
      {
        "n": 4,
        "t": "Sticky checkout bar",
        "d": "Total and one primary button."
      }
    ],
    "dimgs": [
      {
        "name": "11-cart-desktop",
        "w": 1200,
        "h": 986
      },
      {
        "name": "11b-cart-gift-expanded-desktop",
        "w": 1200,
        "h": 1097
      }
    ],
    "mimg": {
      "name": "M09-cart-mobile",
      "w": 329,
      "h": 1097
    }
  },
  {
    "id": "library",
    "label": "My Library",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4235-131280",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Status filter",
        "d": "One status at a time (All, Updated, Not downloaded, Gifts, Archived) with live counts; the other filters sit below it."
      },
      {
        "n": 2,
        "t": "Library search",
        "d": "Searches titles, publishers and file names inside the library."
      },
      {
        "n": 3,
        "t": "Select all + sort",
        "d": "Row checkboxes and a Select all control above the list."
      },
      {
        "n": 4,
        "t": "Bulk action bar",
        "d": "When one or more rows are selected, the toolbar swaps to a selection bar with the count, Select all 45 and Download / Add to collection / Mark as downloaded / Clear."
      },
      {
        "n": 5,
        "t": "Row layout",
        "d": "Cover, title with status tags (Updated, Gift from...), publisher and purchase date, expandable file list, Download and a labelled ⋯ menu."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Search",
        "d": "Searches titles, publishers and file names."
      },
      {
        "n": 2,
        "t": "Toolbar",
        "d": "Select all, Filters and Sort on one row."
      },
      {
        "n": 3,
        "t": "Selection bar",
        "d": "Selecting rows pins a bottom bar with count, Download, Add to collection and more."
      },
      {
        "n": 4,
        "t": "Filter sheet",
        "d": "Same groups as desktop; Status is single-choice."
      }
    ],
    "dimgs": [
      {
        "name": "05-library-desktop",
        "w": 1200,
        "h": 1149
      },
      {
        "name": "05b-library-selection-desktop",
        "w": 1200,
        "h": 1149
      }
    ],
    "mimg": {
      "name": "M05-library-mobile",
      "w": 1390,
      "h": 1149
    }
  },
  {
    "id": "account",
    "label": "Account",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4236-131291",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Security in Sign-in",
        "d": "Email, password and two-factor authentication live in one card."
      },
      {
        "n": 2,
        "t": "Connected accounts",
        "d": "Each row shows its state and a matching action (Connect / Disconnect)."
      },
      {
        "n": 3,
        "t": "App keys",
        "d": "Keys are masked after creation; Manage keys opens create / revoke."
      },
      {
        "n": 4,
        "t": "Your data",
        "d": "Data export request."
      },
      {
        "n": 5,
        "t": "Delete account",
        "d": "Separate, last block with an outlined button and a confirmation dialog."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Grouped menu",
        "d": "Settings and Activity groups; each row previews what is inside. Notifications are reached from the bell."
      },
      {
        "n": 2,
        "t": "Connected accounts",
        "d": "State text plus a matching Connect / Disconnect action."
      },
      {
        "n": 3,
        "t": "Delete account",
        "d": "Last block, outlined button, confirmation dialog."
      }
    ],
    "dimgs": [
      {
        "name": "06-account-desktop",
        "w": 1200,
        "h": 1533
      }
    ],
    "mimg": {
      "name": "M06-account-mobile",
      "w": 848,
      "h": 1533
    }
  },
  {
    "id": "preferences",
    "label": "Preferences",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4236-131301",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Email notifications",
        "d": "Switches save immediately; one Unsubscribe from all marketing action."
      },
      {
        "n": 2,
        "t": "Publisher contact",
        "d": "Both options off by default."
      },
      {
        "n": 3,
        "t": "Content & display",
        "d": "Adult and AI switches plus language, currency and theme."
      }
    ],
    "mobile": [],
    "dimgs": [
      {
        "name": "07-preferences-desktop",
        "w": 1200,
        "h": 1428
      }
    ],
    "mimg": {
      "name": "M07-preferences-mobile",
      "w": 407,
      "h": 1428
    }
  },
  {
    "id": "following",
    "label": "Following",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4239-131317",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Search and sort",
        "d": "Search is scoped to followed publishers."
      },
      {
        "n": 2,
        "t": "Per-publisher control",
        "d": "Email switch plus a Following menu (Unfollow) on each row; “N new” shows unseen releases."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Type chips",
        "d": "One list for publishers, imprints and rule systems; chips filter it and show counts."
      },
      {
        "n": 2,
        "t": "New from what you follow",
        "d": "The latest releases from everything you follow, each saying who it came from. “See all” opens the full feed. The same data feeds the Following tab on Home."
      },
      {
        "n": 3,
        "t": "Followed rows",
        "d": "Name, type, size and an email switch. “N new” marks unseen releases; tapping the row opens the actions sheet."
      },
      {
        "n": 4,
        "t": "Find something to follow",
        "d": "A search sheet across publishers, imprints and systems with a one-tap Follow, so it never needs a trip to the catalog."
      },
      {
        "n": 5,
        "t": "Empty state",
        "d": "Says what following does and offers suggestions."
      },
      {
        "n": 6,
        "t": "Row actions",
        "d": "View, email on/off and Unfollow in a bottom sheet. Unfollow is outlined, not red."
      }
    ],
    "dimgs": [
      {
        "name": "08-following-desktop",
        "w": 1200,
        "h": 773
      }
    ],
    "mimg": {
      "name": "M11-following-mobile",
      "w": 1084,
      "h": 773
    }
  },
  {
    "id": "wishlist",
    "label": "Wishlist",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4239-131328",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Price-drop banner",
        "d": "Summarises titles on sale with one action."
      },
      {
        "n": 2,
        "t": "Compact filters",
        "d": "Quick-filter chips and sort replace the full listing facet sidebar."
      },
      {
        "n": 3,
        "t": "Wishlist rows",
        "d": "Same card fields as the listing; filled heart / Remove, Add to Cart, sale badge."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Price-drop banner",
        "d": "Counts titles on sale and offers one action: add them all to the cart. Sale rows also show the price you saw when you saved."
      },
      {
        "n": 2,
        "t": "Quick-filter chips",
        "d": "All, On sale, Free and In library as one scrolling row. Sort and the full filter sheet sit under it."
      },
      {
        "n": 3,
        "t": "Wishlist rows",
        "d": "Publisher, title, tags, price, filled heart to remove, and one action row: Add to cart, or Open in library when you already own it. Pre-orders are labelled."
      },
      {
        "n": 4,
        "t": "Sort & filter sheet",
        "d": "Sort is single choice; filters reuse the listing groups. The button shows the live count."
      },
      {
        "n": 5,
        "t": "Empty state",
        "d": "Explains how to save titles and offers one primary action."
      },
      {
        "n": 6,
        "t": "Popular on wishlists",
        "d": "Fills the empty state with titles other people save, each with a one-tap save."
      },
      {
        "n": 7,
        "t": "Undo toast",
        "d": "Removing a title shows a toast with Undo instead of a confirmation dialog."
      }
    ],
    "dimgs": [
      {
        "name": "10-wishlist-desktop",
        "w": 1200,
        "h": 1133
      }
    ],
    "mimg": {
      "name": "M10-wishlist-mobile",
      "w": 1397,
      "h": 1133
    }
  },
  {
    "id": "orders",
    "label": "Orders",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4229-131009",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Orders list",
        "d": "Search, date range and status filters; every order has its own number, date, total, payment method, invoice and View details."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Search",
        "d": "Order number or any title in an order."
      },
      {
        "n": 2,
        "t": "Period and status",
        "d": "Two dropdowns open one filter sheet. The default is the last month."
      },
      {
        "n": 3,
        "t": "Order cards",
        "d": "Number, status, date, payment method and total in a header, then the items with publisher. Invoice and View details sit at the bottom of the card."
      },
      {
        "n": 4,
        "t": "Filter sheet",
        "d": "Period and Status, single choice each, with a live count."
      },
      {
        "n": 5,
        "t": "Order detail",
        "d": "Items with a download link each, payment breakdown, billing address and Invoice (PDF)."
      },
      {
        "n": 6,
        "t": "Order lookup",
        "d": "For people not signed in: order number plus email. The error says what to check and never reveals whether the number exists."
      }
    ],
    "dimgs": [
      {
        "name": "09-orders-desktop",
        "w": 1200,
        "h": 1000
      }
    ],
    "mimg": {
      "name": "M12-orders-mobile",
      "w": 1373,
      "h": 1000
    }
  },
  {
    "id": "notifications",
    "label": "Notifications",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4239-131350",
    "insp": "",
    "desktop": [
      {
        "n": 1,
        "t": "Notification centre",
        "d": "Opens from the bell. Tabs separate order messages from updates and offers; Mark all as read; link to Notification settings (Preferences)."
      }
    ],
    "mobile": [
      {
        "n": 1,
        "t": "Type tabs",
        "d": "All, Orders, Updates and Offers. A dot marks tabs with unread items. On mobile the bell opens this page, not a small popover."
      },
      {
        "n": 2,
        "t": "Grouped by day",
        "d": "Unread rows are tinted and carry a dot. Tapping a row marks it read and opens what it is about: the order, the library title or the offer."
      },
      {
        "n": 3,
        "t": "Settings link",
        "d": "Always at the end of the list: it leads to the notification switches in Preferences."
      },
      {
        "n": 4,
        "t": "Empty state",
        "d": "Explains what will show up here."
      },
      {
        "n": 5,
        "t": "Item actions",
        "d": "The ⋯ menu offers Open, Mark as read, and turning that kind of message off."
      },
      {
        "n": 6,
        "t": "Bell and message types",
        "d": "The bell shows a dot or a count up to 9+. Each message type maps to a switch in Preferences."
      }
    ],
    "dimgs": [
      {
        "name": "09b-orders-notifications-open-desktop",
        "w": 1200,
        "h": 1007
      }
    ],
    "mimg": {
      "name": "M13-notifications-mobile",
      "w": 1265,
      "h": 526
    }
  }
];
