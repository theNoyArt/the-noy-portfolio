// Generated from the DriveThruRPG prototype (Figma: DriveThruRPG — UX/UI Redesign). Edit freely.
import type { Mockup } from "./types";

export const MOCKUPS: Mockup[] = [
  {
    "id": "home",
    "label": "Home",
    "sub": "Signed-out and signed-in versions",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4253-83573",
    "desktop": [
      {
        "name": "home-desktop-1",
        "w": 1920,
        "h": 2729,
        "label": "Signed out"
      },
      {
        "name": "home-desktop-2",
        "w": 1920,
        "h": 2729,
        "label": "Signed in"
      }
    ],
    "mobile": [
      {
        "name": "home-mobile-1",
        "w": 390,
        "h": 4069,
        "label": "Signed out"
      },
      {
        "name": "home-mobile-2",
        "w": 390,
        "h": 4069,
        "label": "Signed in"
      },
      {
        "name": "home-mobile-3",
        "w": 390,
        "h": 716,
        "label": "Menu · signed out"
      },
      {
        "name": "home-mobile-4",
        "w": 408,
        "h": 1004,
        "label": "Menu · signed in"
      }
    ],
    "dnotes": [
      {
        "t": "Header",
        "d": "Row one holds the settings users change once (search, currency, language, AI switch, theme, cart, account); row two is the shortcut into the catalogue, with each filter opening the listing already applied. It stays sticky, and on mobile row two collapses into a Browse drawer."
      },
      {
        "t": "Hero (carusel)",
        "d": "One main campaign at a time, with the copy and gradient on the side where the art is quiet. Arrows show on hover or focus, dots show position, and autoplay pauses on hover and stops for reduced motion."
      },
      {
        "t": "Discounts & Promos",
        "d": "Time-limited offers kept apart from the catalogue because they have a deadline. Badges say why a title is promoted and show both the percentage and the price."
      },
      {
        "t": "New releases/Bestselling/Popular...",
        "d": "Tabs split the catalogue by intent, and hovering a row fills the preview panel so users can decide without leaving Home. Signed-in users also get a Following tab, first in the list, with new titles from what they follow. Inspired by Steam store."
      },
      {
        "t": "Featured for you",
        "d": "Personalisation by genre, with a visible reason on each card (“Based on your recent viewed”) so users can trust it. Guests see popular titles per genre with an honest label instead."
      },
      {
        "t": "Catalogue banner",
        "d": "A quiet exit for people who want to browse everything, placed after the personalised sections so it doesn’t compete with them. Link to product listing page"
      },
      {
        "t": "Browse by Publisher",
        "d": "For users who shop by name, and only publishers with a real logo appear. All the others stay reachable through search and the header filter."
      },
      {
        "t": "Recently Viewed",
        "d": "Helps users return to what they were considering. It sits low because it’s a convenience, and it only shows when there is history."
      },
      {
        "t": "Footer",
        "d": "Ordered by how often it’s used: partner brands, then quick utilities with the newsletter, then link columns and legal text. Support and policy links are easy to find."
      },
      {
        "t": "Header (signed in)",
        "d": "Log in becomes an account menu with avatar and a notification badge, next to the cart count, wishlist and bell. Library is first in the menu, because returning buyers come to download.",
        "state": 1
      },
      {
        "t": "Following tab",
        "d": "First tab for signed-in users, listing new titles from what they follow, newest first. Each row says why it’s shown (“New from Free League”). If they follow nothing, it shows suggestions to follow instead of a blank list.",
        "state": 1
      },
      {
        "t": "Featured for you",
        "d": "Genres come from what the user follows, owns and recently viewed, and the label names the signal (“Because you follow Horror”). Titles they already own are left out, and recommendations can be cleared or turned off in settings.",
        "state": 1
      }
    ],
    "mnotes": [
      {
        "t": "General rules for the whole mobile page",
        "d": "Touch targets are at least 44 px, side gutters are 16 px, and nothing scrolls sideways except the swipe rows, which is a deliberate pattern."
      },
      {
        "t": "Header",
        "d": "Collapses to a hamburger (the Browse filters), the logo, the cart and Log in, with search on its own full-width row. Currency, language, AI and theme move into the menu, because they are set once."
      },
      {
        "t": "Hero",
        "d": "The banner keeps its aspect ratio and the copy sits below or over it on a full-width gradient, whatever the contentSide of the slide. Swipe changes slides, and dots replace the hover arrows because there is no hover on touch."
      },
      {
        "t": "Discounts & Promos",
        "d": "A horizontal swipe row, with the next tile peeking in so users can tell it scrolls. Two tiles side by side would be too small to read."
      },
      {
        "t": "Main section",
        "d": "Only the tab list remains. The preview panel is dropped, and tapping a row opens the product page. Tabs scroll sideways, and Following stays first for signed-in users."
      },
      {
        "t": "Featured for you",
        "d": "Genre blocks stack one under another with two covers per row. The “why you see this” line stays, because it builds trust."
      },
      {
        "t": "Catalogue banner",
        "d": "Full-width, with a button that fills the row, so it’s easy to hit with a thumb."
      },
      {
        "t": "Browse by Publisher",
        "d": "A swipe row of logos, with the last one cut off to show there is more."
      },
      {
        "t": "Footer",
        "d": "The link columns become collapsible sections, and the newsletter field takes the full width, so the page doesn’t end in a long wall of links."
      }
    ],
    "extra": []
  },
  {
    "id": "listing",
    "label": "Product listing",
    "sub": "",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4253-83597",
    "desktop": [
      {
        "name": "listing-desktop-1",
        "w": 1920,
        "h": 3301,
        "label": "Grid view"
      },
      {
        "name": "listing-desktop-2",
        "w": 1920,
        "h": 3623,
        "label": "List view"
      }
    ],
    "mobile": [
      {
        "name": "listing-mobile-1",
        "w": 390,
        "h": 5394,
        "label": "Default"
      },
      {
        "name": "listing-mobile-2",
        "w": 390,
        "h": 4952,
        "label": "Many filters"
      },
      {
        "name": "listing-mobile-3",
        "w": 390,
        "h": 747,
        "label": "Filters sheet"
      }
    ],
    "dnotes": [
      {
        "t": "Filter sidebar",
        "d": "Facets are grouped by how people choose: Promotions, Rule System, Product Type, Genre, Price, Format, Rating, Publisher, Language. Every group collapses, shows counts so the user can’t pick an empty combination, and has search where the list is long (rule systems, publishers). Selected groups show a number in the heading, and long lists show only the top values with a “+ more” link."
      },
      {
        "t": "Grid view",
        "d": "Built for browsing by cover: four columns, large covers, and a short line under each with publisher, rating, price and a quick add-to-cart. It suits people who recognise products by their art."
      },
      {
        "t": "List view",
        "d": "Built for comparing: a small cover plus tags (genre, type), reviews and price on one row, with Add to cart and wishlist right there. It suits people who read details and want to decide without opening each product page."
      },
      {
        "t": "Header and Back to Home",
        "d": "The same header as Home, so the user never loses search or the cart. A small “Back to Home” link gives a clear way out of a deep filter session."
      },
      {
        "t": "Banner",
        "d": "Context for the page, such as a campaign, a publisher or a genre. It is optional, so a plain search or filter page can skip it and give the space to results."
      },
      {
        "t": "Active filter chips",
        "d": "They sit above the results so the user can always see why they got these titles. Each chip removes with one click, and Clear all resets everything. Past a few rows they collapse behind “Show more”, so they don’t push the results down."
      },
      {
        "t": "Quick filters",
        "d": "Shortcuts for the filters people use most (D&D 5e, Year Zero, Digital PDF, Free). They save opening the sidebar, and are one click to apply and one to remove."
      },
      {
        "t": "Pagination",
        "d": "Numbered pages with Prev and Next, so users can jump and return to a position, unlike infinite scroll. Filters and page live in the URL, so the page can be shared and the Back button works."
      },
      {
        "t": "Recently Viewed and footer",
        "d": "The same blocks as on Home, so the page feels like part of one store. They sit below the results and don’t compete with them."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "The sidebar becomes a Filters button that opens a full-screen drawer with an Apply button showing the result count. The chips stay visible above the results, and the list view becomes the default."
      }
    ],
    "extra": []
  },
  {
    "id": "product",
    "label": "Product page",
    "sub": "",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4253-83610",
    "desktop": [
      {
        "name": "product-desktop-1",
        "w": 1920,
        "h": 3634,
        "label": "Default"
      }
    ],
    "mobile": [
      {
        "name": "product-mobile-1",
        "w": 390,
        "h": 6046,
        "label": "Default"
      }
    ],
    "dnotes": [
      {
        "t": "Title summary (cover, title, publisher, rating, tags)",
        "d": "The few facts that decide “is this the right product?” sit at the top: cover, name, who made it, rating and tags. The “Human-created without AI” badge is shown here because many buyers filter on it, and the tags link to the listing page for that genre or system."
      },
      {
        "t": "Tabs (Overview, Details, Reviews)",
        "d": "Three tabs so the page doesn’t read as one endless scroll. Each tab jumps to its section, and the active tab follows scrolling. The review count is in the label so users can judge popularity before opening it."
      },
      {
        "t": "Overview (description)",
        "d": "Publisher copy comes first because it is what most buyers read. Long text should collapse behind “Read more” after a few paragraphs, so the sample pages and the buy box stay close."
      },
      {
        "t": "Sample pages",
        "d": "Real page spreads let the user check layout and art quality before paying, which is the biggest doubt with PDFs. Clicking one opens a gallery. A title with no samples hides this block instead of showing an empty one."
      },
      {
        "t": "Details and credits",
        "d": "The facts people compare (authors, artists, creation method, filters, dates) in a quiet two-column grid. “Show full credits” expands the rest, so the full credit list doesn’t push the reviews down."
      },
      {
        "t": "Reviews and discussions",
        "d": "A rating summary with a bar chart for each star level lets users see the spread at a glance, not just the average. Reviews are separated from discussion threads and badged “Purchaser”, so verified opinions stand out. Replies collapse, and “Start new discussion” is a clear action for questions."
      },
      {
        "t": "Header and Back to Home",
        "d": "The same header as the rest of the store, so search and the cart stay in reach. “Back to Home” keeps the way out clear when the user arrived from a long session."
      },
      {
        "t": "Buy box (right column)",
        "d": "It stays visible as the user scrolls. Editions are listed with their price and what’s included, so choosing PDF or print is one click. Under them sit the key specs (system, format, pages, language) and one primary Add to Cart with the price in it. Wishlist and “Buy as a gift” are secondary, so they don’t compete with the main action."
      },
      {
        "t": "Follow block (publisher, series, system)",
        "d": "Following sits next to the decision to buy, because a satisfied reader is most likely to follow now. Each toggle says what it follows (publisher, product line, rule system, genre), so the user knows what will land in their email."
      },
      {
        "t": "Customers also bought",
        "d": "Cross-sell placed beside the page, where the eye goes after the buy box. Small covers with prices make it quick to scan, and “See more recommendations” leads to a full list."
      },
      {
        "t": "Footer",
        "d": "The same footer as the rest of the store, and it ends the page with support and policy links."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "The buy box becomes a bar fixed to the bottom of the screen with the price and Add to Cart, and the follow block and recommendations move below the description."
      }
    ],
    "extra": []
  },
  {
    "id": "cart",
    "label": "Cart",
    "sub": "",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4263-84600",
    "desktop": [
      {
        "name": "cart-desktop-1",
        "w": 1920,
        "h": 1358,
        "label": "Default"
      },
      {
        "name": "cart-desktop-2",
        "w": 1920,
        "h": 1515,
        "label": "Gift"
      }
    ],
    "mobile": [
      {
        "name": "cart-mobile-1",
        "w": 390,
        "h": 2002,
        "label": "Default"
      },
      {
        "name": "cart-mobile-2",
        "w": 390,
        "h": 2095,
        "label": "Gift"
      }
    ],
    "dnotes": [
      {
        "t": "Customers also bought",
        "d": "Cross-sell below the lines, with a quick Add button on each cover, so adding is one click and the cart updates in place. It is kept short and under the cart so it never pushes the checkout button away."
      },
      {
        "t": "Gift toggle",
        "d": "“This order is a gift” is a switch, not a separate flow. Turning it on expands the recipient name, email and an optional message right underneath, with a line saying the recipient gets a link to claim it and nothing lands in the user’s library. A note says that digital titles go to the recipient and print items still ship to the buyer, so nobody is surprised."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "The summary collapses into a bar fixed at the bottom of the screen with the item count, the total and a Checkout button, so the main action is always under the thumb. The gift form opens inline in the cart. “Customers also bought” becomes a swipe row."
      }
    ],
    "extra": [
      {
        "t": "Empty cart",
        "d": "Shows a short message, a link to the Wishlist and a few suggested titles, never a blank page."
      }
    ]
  },
  {
    "id": "login",
    "label": "Log in",
    "sub": "",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4263-86670",
    "desktop": [
      {
        "name": "login-desktop-1",
        "w": 1920,
        "h": 1080,
        "label": "Modal"
      }
    ],
    "mobile": [
      {
        "name": "login-mobile-1",
        "w": 390,
        "h": 757,
        "label": "Modal"
      }
    ],
    "dnotes": [
      {
        "t": "Modal over the blurred page (desktop)",
        "d": "Login opens as a dialog over the page the user was on, with the background blurred and dimmed. They keep their place, and after signing in they land back where they started, whether that is a product, the cart or a follow toggle. The dialog closes with Esc, the close button or a click outside, and focus is trapped inside it while it’s open."
      },
      {
        "t": "Remember me",
        "d": "Ticked by default on the user’s own device, so the session lasts. The label says “on this device” so people on shared computers know to untick it."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "The same dialog fills the screen width with 16 px side gutters, and the keyboard pushes it up without hiding the Log in button. Fields use the correct keyboard types (email, password) and allow the browser or password manager to fill them in. The blurred page behind it is dropped and the dialog sits on a plain dark background."
      }
    ],
    "extra": []
  },
  {
    "id": "library",
    "label": "My Library",
    "sub": "Signed-in users only",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4263-88591",
    "desktop": [
      {
        "name": "library-desktop-1",
        "w": 1920,
        "h": 2338,
        "label": "Default"
      }
    ],
    "mobile": [
      {
        "name": "library-mobile-1",
        "w": 390,
        "h": 3378,
        "label": "Default"
      },
      {
        "name": "library-mobile-2",
        "w": 390,
        "h": 747,
        "label": "Filters sheet"
      }
    ],
    "dnotes": [
      {
        "t": "Search in library",
        "d": "A search field limited to what the user owns, not the whole store. With hundreds of files, finding one title by name is the most common task, so search comes first, above the filters."
      },
      {
        "t": "Status filter",
        "d": "All, Updated, Not downloaded, Gifts and Archived, each with a count. These are the real jobs of the page: grab the updated file, find what I haven’t downloaded yet, see what was given to me, and tidy up. They come first in the sidebar, above the catalogue-style filters."
      },
      {
        "t": "Expanded files",
        "d": "The file count expands the row to list each file (PDF, ZIP) with its own download icon. Most users want just the PDF, so the extra files stay hidden until asked for."
      },
      {
        "t": "Badges (Updated, Gift from, Not downloaded yet)",
        "d": "They tell the user what needs attention without opening anything. “Updated” is green, because a new file version is good news, and “Gift from Alex” says who it came from, so the user can say thanks."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "The sidebar becomes a Filters button with a badge showing how many are active. It opens a full-screen sheet with a Clear all link and a “Show 45 results” button, so the user sees the effect before closing. Rows keep the cover, title and Download button, with the file list opening below the row."
      }
    ],
    "extra": [
      {
        "t": "Empty and first-time states",
        "d": "A new user sees “Your library is empty” with a link to the store. A filter with no matches says so and offers Clear filters."
      }
    ]
  },
  {
    "id": "account",
    "label": "Account",
    "sub": "Signed-in users only",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4263-88616",
    "desktop": [
      {
        "name": "account-desktop-1",
        "w": 1920,
        "h": 1923,
        "label": "Default"
      }
    ],
    "mobile": [
      {
        "name": "account-mobile-1",
        "w": 390,
        "h": 1342,
        "label": "My account"
      },
      {
        "name": "account-mobile-2",
        "w": 390,
        "h": 2621,
        "label": "Account"
      }
    ],
    "dnotes": [
      {
        "t": "Account balance",
        "d": "A large figure with “Redeem gift card” right beside it, so the two things people do with store credit are together. A zero balance still shows, so users know the feature exists."
      },
      {
        "t": "Left menu (Settings and Activities)",
        "d": "It splits the area by purpose. Settings (Account, Preferences) is for things the user sets once, and Activities (Orders, Following) is for things that grow over time. The balance sits above both, because it is the one number people check here. The current page is marked in the accent colour, and on mobile the menu becomes its own page."
      },
      {
        "t": "Delete account",
        "d": "Last on the page, in a quiet card with a neutral button, away from the everyday settings. It always opens a confirmation that spells out what is lost (library access, balance, orders) and asks the user to type their password."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "Two screens. “My account” is a list of links (Account, Preferences, Orders, Following) with the balance on top, and each link opens its page with a “My account” breadcrumb at the top. Cards stack in one column, buttons stay on the same row as the label they belong to, and nothing is cut off sideways."
      }
    ],
    "extra": []
  },
  {
    "id": "preferences",
    "label": "Preferences",
    "sub": "Signed-in users only",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4263-88641",
    "desktop": [
      {
        "name": "preferences-desktop-1",
        "w": 1920,
        "h": 1883,
        "label": "Default"
      }
    ],
    "mobile": [
      {
        "name": "preferences-mobile-1",
        "w": 390,
        "h": 2519,
        "label": "Default"
      }
    ],
    "dnotes": [
      {
        "t": "Page and left menu",
        "d": "The same layout as Account, with Preferences marked as the current page. The subtitle says what the page covers (notifications, publisher contact and what you see in the store), so the user knows what to expect."
      },
      {
        "t": "Pause all marketing emails",
        "d": "It sits first and acts as a master switch. It stops promotional email (Daily deal emails, Review reminders) but not receipts or account security messages, and the description says so. When it is on, the marketing switches below it are shown disabled, so the user sees the effect."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "Opens from the “My account” list with a breadcrumb. Cards stack in one column, each switch keeps its description under the label, and selects take the full row, so every target is easy to hit."
      }
    ],
    "extra": [
      {
        "t": "Edge case",
        "d": "Guests have no preferences page, but the header controls (currency, language, AI content) still work and are remembered on that device."
      }
    ]
  },
  {
    "id": "following",
    "label": "Following",
    "sub": "Signed-in users only",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4263-88677",
    "desktop": [
      {
        "name": "following-desktop-1",
        "w": 1920,
        "h": 1043,
        "label": "Default"
      }
    ],
    "mobile": [
      {
        "name": "following-mobile-1",
        "w": 390,
        "h": 1921,
        "label": "Default"
      }
    ],
    "dnotes": [
      {
        "t": "Page and left menu",
        "d": "The same layout as Account and Preferences, with Following marked as current. It sits under Activities, because the list grows with use. The subtitle says what the page is for: managing what the user follows and how they hear about it."
      },
      {
        "t": "Search and sort",
        "d": "A search field limited to followed items and a sort selector (“Recently added” by default). They matter once the list gets long, and a short list never needs them. Sort could also offer “Most new titles”, so the ones with something to see come first."
      },
      {
        "t": "“3 new” badge",
        "d": "It shows how many new titles appeared since the user last looked, and it links to the Following feed on Home. It is the reason to come back to this page, so it is outlined in the accent colour and only appears when there is something new."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "Opens from “My account” with a breadcrumb. Each follow is a card: logo and name on top, then the stats, the email switch on its own line and a full-width Following button below, so every target is easy to hit with a thumb."
      }
    ],
    "extra": [
      {
        "t": "Empty state",
        "d": "“You’re not following anything yet” with a few suggested publishers and genres and a one-click Follow on each. Without it the page would look broken for a new user."
      },
      {
        "t": "Other follow types",
        "d": "The page should group what the user follows with small headings: Publishers, Series, Genres and Game systems. Each group uses the same row, with a plain icon instead of a logo for genres and systems. Filter chips at the top (All, Publishers, Series, Genres, Systems) switch between them once the list is long."
      }
    ]
  },
  {
    "id": "orders",
    "label": "Orders",
    "sub": "Signed-in users only",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4263-88702",
    "desktop": [
      {
        "name": "orders-desktop-1",
        "w": 1920,
        "h": 1370,
        "label": "Default"
      }
    ],
    "mobile": [
      {
        "name": "orders-mobile-1",
        "w": 390,
        "h": 2110,
        "label": "Default"
      }
    ],
    "dnotes": [
      {
        "t": "Search, date range and status filters",
        "d": "Search by order number or title, a period selector (“Last month” by default) and a status selector. They sit above the list because the common task is finding one order. The period should offer Last 3 months, This year and Custom range, since invoices are often needed for a tax year."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "Opens from “My account” with a breadcrumb. The search field and the two selectors stack, and each order is a card with the summary line wrapped in four columns, the title below, and Invoice and View details as two equal full-width buttons. That keeps them easy to hit with a thumb."
      }
    ],
    "extra": [
      {
        "t": "Empty state",
        "d": "“No orders yet” with a link to the store. A filter with no results says so and offers Clear filters."
      }
    ]
  },
  {
    "id": "notifications",
    "label": "Notifications",
    "sub": "Signed-in users only",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4263-88727",
    "desktop": [
      {
        "name": "notifications-desktop-1",
        "w": 1920,
        "h": 1370,
        "label": "Panel open"
      }
    ],
    "mobile": [
      {
        "name": "notifications-mobile-1",
        "w": 390,
        "h": 704,
        "label": "Sheet"
      }
    ],
    "dnotes": [
      {
        "t": "Bell and panel (desktop)",
        "d": "Notifications open as a dropdown from the bell in the header, so the user can check them from any page without losing their place. The bell carries a badge with the unread count. The panel closes with Esc or a click outside, and focus moves into it when it opens."
      },
      {
        "t": "Unread vs read",
        "d": "Unread items get a brighter background and a small dot, and read ones fade back. The difference should not rely on colour alone, so the dot stays for users who can’t tell the shades apart."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "The bell opens a sheet that covers the screen instead of a small dropdown, with a back arrow to close it. The items are the same, with larger touch targets, and “Mark all as read” and “Notification settings” stay reachable at the top and bottom."
      }
    ],
    "extra": [
      {
        "t": "Empty state",
        "d": "“You’re all caught up” with a short note about what will appear here. No badge is shown."
      }
    ]
  },
  {
    "id": "wishlist",
    "label": "Wishlist",
    "sub": "Signed-in users only",
    "url": "https://www.figma.com/design/pckNOLhUrC8jyhUZDyIrVT/DriveThruRPG--UX-UI-Redesign?node-id=4271-88752",
    "desktop": [
      {
        "name": "wishlist-desktop-1",
        "w": 1920,
        "h": 3102,
        "label": "Grid view"
      },
      {
        "name": "wishlist-desktop-2",
        "w": 1920,
        "h": 3296,
        "label": "List view"
      }
    ],
    "mobile": [
      {
        "name": "wishlist-mobile-1",
        "w": 390,
        "h": 5050,
        "label": "Grid view"
      },
      {
        "name": "wishlist-mobile-2",
        "w": 390,
        "h": 4144,
        "label": "List view"
      }
    ],
    "dnotes": [
      {
        "t": "Page structure (grid and list)",
        "d": "The wishlist reuses the listing page, so the user already knows how to filter, sort and switch views. The same sidebar, grid and list views apply, and only the header changes: the title says “Wishlist”, and the actions are specific to it. The grid is for browsing by cover, and the list is for deciding what to buy first."
      },
      {
        "t": "Price-drop banner",
        "d": "A strip at the top, such as “2 titles on your wishlist are on sale”. It is the reason to come back to the page, so it sits above the results. It has a button that filters the list to just those items, and a close icon, so it doesn’t nag once seen."
      },
      {
        "t": "Header actions (Share, Add all to cart)",
        "d": "Two actions on the title row. Share creates a link to the list, which the user can turn on or off, and it is private by default. “Add all to cart” is the shortcut for the user who came here to buy. If some items are unavailable or already owned, it skips them and says how many."
      },
      {
        "t": "Recently Viewed and footer",
        "d": "The same blocks as the other pages, below the results."
      }
    ],
    "mnotes": [
      {
        "t": "How it adapts",
        "d": "Two views. Grid shows two covers per row with the heart and Add to cart on each, and list shows a compact row with a small cover, the price and a full-width Add to cart. The filters become a Filters button that opens a sheet, and Share and Add all to cart stay in the title row."
      }
    ],
    "extra": [
      {
        "t": "Unavailable and owned items",
        "d": "A withdrawn title stays on the list, greyed out with “No longer available” and no buy button, so the user understands why it disappeared. An item the user now owns shows “In your library” instead of Add to cart."
      },
      {
        "t": "Empty state",
        "d": "“Your wishlist is empty” with a short line on how to add titles (the heart on any cover) and a few suggested titles."
      }
    ]
  }
];
