import type { Localized } from "./types";

// Vantgard Arms: content for src/pages/vantgard. A client project shown anonymized.
// UX/UI only (research, audit, visual direction, clickable prototype); no build in this portfolio.
// Text matches the Figma file "Vantgard Arms" (Project overview page).

const FIGMA = "https://www.figma.com/design/N5z6kdj3lJSg3PvCAakXZV/Vantgard-Arms";
const node = (id: string) => `${FIGMA}?node-id=${id}`;

export const VA_IMG = "/images/vantgard";

export const VA_LINKS = {
  figma: FIGMA,
  overview: node("23-2"),
  decisions: node("26-2"),
  mockups: node("25-69"),
};

export const VA_CHAT_SUGGESTIONS = {
  en: [
    "How does the sword configurator work?",
    "Why one Store page instead of a page per line?",
    "Which platform did you recommend?",
  ],
  pl: [
    "Jak działa konfigurator miecza?",
    "Dlaczego jedna strona sklepu zamiast strony na linię?",
    "Jaką platformę poleciłaś?",
  ],
};

export const VA = {
  meta: {
    kind: { en: "E-commerce · HEMA sword shop", pl: "E-commerce · Sklep z mieczami HEMA" },
    origin: { en: "Client project · UX/UI", pl: "Projekt dla klienta · UX/UI" },
  },
  title: { en: "Vantgard Arms", pl: "Vantgard Arms" },
  sub: { en: "HEMA Shop Redesign", pl: "Redesign sklepu HEMA" },
  lead: {
    en: "Client project, from research to a clickable prototype: platform choice, UX audit, a new visual direction and the key pages of a HEMA sword shop.",
    pl: "Projekt dla klienta, od badań po klikalny prototyp: wybór platformy, audyt UX, nowy kierunek wizualny i kluczowe strony sklepu z mieczami HEMA.",
  },

  note: {
    title: { en: "A note on names and photos", pl: "Uwaga o nazwach i zdjęciach" },
    body: {
      en: "This was a real client project. To protect the client’s data, the shop is shown here as the fictional Vantgard Arms. Its name, logo, product lines, product names, address, people and photos have been replaced with invented names and stock photography. Everything else is exactly as delivered to the client: the structure, flows, components, interactions and every element of the pages.",
      pl: "To był prawdziwy projekt dla klienta. Żeby chronić jego dane, sklep występuje tu jako fikcyjny Vantgard Arms. Nazwa, logo, linie produktów, nazwy produktów, adres, osoby i zdjęcia zostały zastąpione wymyślonymi nazwami i zdjęciami stockowymi. Cała reszta jest dokładnie taka, jak u klienta: struktura, ścieżki, komponenty, interakcje i każdy element stron.",
    },
  },

  tldr: [
    {
      k: { en: "Problem", pl: "Problem" },
      v: {
        en: "a small HEMA sword workshop sells through a website-builder store. Sword options live on separate guide pages, paid upgrades are sold as separate products, and lead time, VAT and shipping show up only in fine print or in the cart.",
        pl: "mały warsztat mieczy HEMA sprzedaje przez sklep z kreatora stron. Opcje miecza są na osobnych stronach z poradnikami, płatne ulepszenia to osobne produkty, a czas realizacji, VAT i wysyłka pojawiają się tylko drobnym drukiem albo w koszyku.",
      },
    },
    {
      k: { en: "What I did", pl: "Co zrobiłam" },
      v: {
        en: "a comparison of e-commerce platforms and CMSs, a UX audit of the live store (19 fixes, 7 of them high priority), a front-end stack decision, three visual directions and a clickable prototype of Home, Store, Product and Contact.",
        pl: "porównanie platform e-commerce i CMS-ów, audyt UX obecnego sklepu (19 poprawek, 7 o wysokim priorytecie), decyzję o stacku front-endu, trzy kierunki wizualne i klikalny prototyp stron Home, Store, Product i Contact.",
      },
    },
    {
      k: { en: "Key changes", pl: "Kluczowe zmiany" },
      v: {
        en: "one Store page with filters instead of a page per product line, a 4-step sword configurator with a live price, one gross price in the visitor’s currency, and a two-row header with search, language and currency.",
        pl: "jedna strona sklepu z filtrami zamiast strony na każdą linię produktów, 4-krokowy konfigurator miecza z ceną na żywo, jedna cena brutto w walucie odwiedzającego i dwurzędowy nagłówek z wyszukiwarką, językiem i walutą.",
      },
    },
    {
      k: { en: "Next", pl: "Dalej" },
      v: {
        en: "client feedback on the prototype, the platform choice, then the build in Next.js.",
        pl: "opinia klienta o prototypie, wybór platformy, potem budowa w Next.js.",
      },
    },
  ],

  overview: {
    en: "The client runs a small workshop that makes swords for historical European martial arts (HEMA): feders, sabres, sideswords, messers, bucklers and daggers, in three lines from entry level to premium. The shop works, but it has outgrown its template. The client wanted to manage products and page content without a developer, take secure payments, keep e-mail and social login, and add translations and a choice of currency. The project started with the platform question, audited the current store, and redesigned the key pages as a clickable prototype for the client to review.",
    pl: "Klient prowadzi mały warsztat, który robi miecze do historycznych europejskich sztuk walki (HEMA): federy, szable, sideswordy, messery, puklerze i sztylety, w trzech liniach od podstawowej do premium. Sklep działa, ale wyrósł ze swojego szablonu. Klient chciał zarządzać produktami i treścią stron bez programisty, przyjmować bezpieczne płatności, zachować logowanie przez e-mail i media społecznościowe oraz dodać tłumaczenia i wybór waluty. Projekt zaczął się od wyboru platformy, objął audyt obecnego sklepu i redesign kluczowych stron jako klikalny prototyp do oceny przez klienta.",
  },

  goals: [
    {
      en: "Let the client manage products and page content in a CMS, with translations and several currencies.",
      pl: "Pozwolić klientowi zarządzać produktami i treścią stron w CMS-ie, z tłumaczeniami i kilkoma walutami.",
    },
    {
      en: "Make choosing a sword clear: every option with a description and a price, on the product page.",
      pl: "Uprościć wybór miecza: każda opcja z opisem i ceną, na stronie produktu.",
    },
    {
      en: "Show what matters before the cart: lead time, gross price, shipping and warranty.",
      pl: "Pokazać to, co ważne, przed koszykiem: czas realizacji, cenę brutto, wysyłkę i gwarancję.",
    },
    {
      en: "Let visitors browse by weapon type, not only by product line.",
      pl: "Pozwolić przeglądać według rodzaju broni, nie tylko według linii produktów.",
    },
    {
      en: "Replace the template look with one visual system that fits the brand.",
      pl: "Zastąpić szablonowy wygląd jednym systemem wizualnym pasującym do marki.",
    },
  ],

  facts: [
    {
      k: { en: "Role", pl: "Rola" },
      v: {
        en: "Solo. Research, UX audit, UI design and prototyping",
        pl: "Samodzielnie. Badania, audyt UX, projekt UI i prototypowanie",
      },
    },
    {
      k: { en: "Timeline", pl: "Czas" },
      v: { en: "1 week, concept stage", pl: "1 tydzień, etap koncepcji" },
    },
    {
      k: { en: "Type", pl: "Typ" },
      v: { en: "Client project, shown anonymized", pl: "Projekt dla klienta, pokazany anonimowo" },
    },
    {
      k: { en: "Constraints", pl: "Ograniczenia" },
      v: {
        en: "The audit is based on 24 desktop screenshots of the live store, with no access to analytics or sales data. Mobile was not audited yet. Product data was copied from the live store, and some details still need the client’s confirmation.",
        pl: "Audyt opiera się na 24 zrzutach ekranu obecnego sklepu na desktopie, bez dostępu do analityki i danych sprzedaży. Mobile nie był jeszcze audytowany. Dane produktów skopiowano z obecnego sklepu, a część szczegółów wymaga jeszcze potwierdzenia klienta.",
      },
    },
  ],

  scope: [
    {
      t: { en: "Home", pl: "Home" },
      d: {
        en: "Hero, trust bar, three lines, ordering steps, shop by weapon, workshop, reviews",
        pl: "Hero, pasek zaufania, trzy linie, kroki zamówienia, zakupy według broni, warsztat, recenzje",
      },
    },
    {
      t: { en: "Store", pl: "Store" },
      d: {
        en: "All products with weapon tabs, line filter, lead-time switch and sorting",
        pl: "Wszystkie produkty z zakładkami broni, filtrem linii, przełącznikiem czasu realizacji i sortowaniem",
      },
    },
    {
      t: { en: "Product page", pl: "Strona produktu" },
      d: {
        en: "Gallery, 4-step configurator, live price, sticky buy bar, specs, related items",
        pl: "Galeria, 4-krokowy konfigurator, cena na żywo, przyklejony pasek zakupu, specyfikacja, powiązane produkty",
      },
    },
    {
      t: { en: "Contact", pl: "Contact" },
      d: { en: "Contact details and a message form", pl: "Dane kontaktowe i formularz wiadomości" },
    },
    {
      t: { en: "Global", pl: "Globalne" },
      d: {
        en: "Two-row header with mega menu, search, language and currency; cart drawer; cookie consent; footer",
        pl: "Dwurzędowy nagłówek z mega menu, wyszukiwarką, językiem i walutą; szuflada koszyka; zgoda na cookies; stopka",
      },
    },
  ],

  process: [
    {
      t: { en: "Discovery and platform research", pl: "Odkrywanie i wybór platformy" },
      goal: {
        en: "Find a platform the client can run on their own.",
        pl: "Znaleźć platformę, którą klient obsłuży sam.",
      },
      items: [
        {
          en: "Requirements with the client: a CMS for products and pages, secure payments, e-mail and social login, translations and currencies.",
          pl: "Wymagania z klientem: CMS do produktów i stron, bezpieczne płatności, logowanie przez e-mail i media społecznościowe, tłumaczenia i waluty.",
        },
        {
          en: "Comparison of hosted and open-source platforms and CMSs, free and paid, with pros and cons, currency handling and the cost of support and maintenance.",
          pl: "Porównanie platform i CMS-ów hostowanych i open source, darmowych i płatnych: plusy i minusy, obsługa walut, koszt wsparcia i utrzymania.",
        },
        {
          en: "Delivered as a shared document and a PDF for the client.",
          pl: "Oddane jako wspólny dokument i PDF dla klienta.",
        },
      ],
    },
    {
      t: { en: "UX audit of the live store", pl: "Audyt UX obecnego sklepu" },
      goal: {
        en: "Find what blocks a purchase and why the store feels like a template.",
        pl: "Znaleźć, co blokuje zakup i dlaczego sklep wygląda jak szablon.",
      },
      items: [
        {
          en: "Review of 24 desktop screenshots: navigation, home, product lists, product page, cart, account and content pages.",
          pl: "Przegląd 24 zrzutów z desktopu: nawigacja, strona główna, listy produktów, strona produktu, koszyk, konto i strony z treścią.",
        },
        {
          en: "What works and what to fix, page by page.",
          pl: "Co działa, a co poprawić, strona po stronie.",
        },
        {
          en: "19 fixes ranked by priority and effort, 7 of them high. Starting point: the product page with the configurator, and one visual system.",
          pl: "19 poprawek uszeregowanych według priorytetu i nakładu pracy, 7 o wysokim priorytecie. Punkt wyjścia: strona produktu z konfiguratorem i jeden system wizualny.",
        },
      ],
    },
    {
      t: { en: "Tech stack", pl: "Stack technologiczny" },
      goal: {
        en: "Full control over the brand, on top of a headless shop.",
        pl: "Pełna kontrola nad marką, na bazie sklepu headless.",
      },
      items: [
        {
          en: "Next.js, Tailwind CSS and shadcn/ui. MUI rejected: its Material look is hard to override.",
          pl: "Next.js, Tailwind CSS i shadcn/ui. MUI odrzucone: jego wygląd Material trudno nadpisać.",
        },
        {
          en: "Design tokens named as in shadcn/ui (background, primary, radius), so the prototype maps one-to-one to code.",
          pl: "Tokeny nazwane jak w shadcn/ui (background, primary, radius), więc prototyp przekłada się na kod jeden do jednego.",
        },
      ],
    },
    {
      t: { en: "Visual directions", pl: "Kierunki wizualne" },
      goal: {
        en: "Agree on the look before designing pages.",
        pl: "Uzgodnić wygląd, zanim powstaną strony.",
      },
      items: [
        {
          en: "Three directions on one canvas: Forge (warm, ember accents), Steel (graphite and silver) and Heraldic. An editorial Steel variant was also tested and dropped.",
          pl: "Trzy kierunki na jednym płótnie: Forge (ciepły, akcenty żaru), Steel (grafit i srebro) i Heraldic. Sprawdziłam też wariant edytorski Steel i go odrzuciłam.",
        },
        {
          en: "Chosen: Steel. A graphite background, silver as the only action colour, Cormorant Garamond for headings, Jost for text, IBM Plex Mono for specs, 4 px radius.",
          pl: "Wybrany: Steel. Grafitowe tło, srebro jako jedyny kolor akcji, Cormorant Garamond w nagłówkach, Jost w tekście, IBM Plex Mono w specyfikacjach, promień 4 px.",
        },
      ],
    },
    {
      t: { en: "Clickable prototype", pl: "Klikalny prototyp" },
      goal: {
        en: "Let the client click through the real flows before anything is built.",
        pl: "Dać klientowi przeklikać prawdziwe ścieżki, zanim cokolwiek powstanie.",
      },
      items: [
        {
          en: "Home, Store, Product and Contact, on desktop and mobile.",
          pl: "Home, Store, Product i Contact, na desktopie i mobile.",
        },
        {
          en: "Working filters, search, mega menu, language and currency (EUR, PLN, USD), a 4-step configurator with a live price and a cart drawer.",
          pl: "Działające filtry, wyszukiwarka, mega menu, język i waluta (EUR, PLN, USD), 4-krokowy konfigurator z ceną na żywo i szuflada koszyka.",
        },
        {
          en: "Refined in short design loops, then published online for the client’s review.",
          pl: "Dopracowany w krótkich pętlach projektowych, potem opublikowany online do oceny klienta.",
        },
      ],
    },
    {
      t: { en: "Build (next)", pl: "Budowa (dalej)" },
      next: true,
      goal: {
        en: "Turn the prototype into the live shop.",
        pl: "Zamienić prototyp w działający sklep.",
      },
      items: [
        { en: "Choose the platform with the client.", pl: "Wybrać platformę z klientem." },
        {
          en: "Build the storefront in Next.js from the prototype’s tokens and components.",
          pl: "Zbudować sklep w Next.js z tokenów i komponentów prototypu.",
        },
        {
          en: "Audit and test mobile, then a short usability test with fencers before launch.",
          pl: "Zaudytować i przetestować mobile, potem krótki test użyteczności z szermierzami przed startem.",
        },
      ],
    },
  ] as { t: Localized; goal: Localized; items: Localized[]; next?: boolean }[],

  stack: [
    {
      k: { en: "Framework", pl: "Framework" },
      v: {
        en: "Next.js (React), server rendering for SEO",
        pl: "Next.js (React), renderowanie po stronie serwera dla SEO",
      },
    },
    {
      k: { en: "Styling", pl: "Style" },
      v: {
        en: "Tailwind CSS, design tokens as CSS variables",
        pl: "Tailwind CSS, tokeny jako zmienne CSS",
      },
    },
    {
      k: { en: "Components", pl: "Komponenty" },
      v: {
        en: "shadcn/ui (Radix primitives), restyled to the brand; tokens named as in shadcn/ui",
        pl: "shadcn/ui (prymitywy Radix) w stylu marki; tokeny nazwane jak w shadcn/ui",
      },
    },
    {
      k: { en: "Commerce platform", pl: "Platforma sklepu" },
      v: {
        en: "To decide with the client: Medusa (official Next.js storefront) or Shopify through its Storefront API",
        pl: "Do ustalenia z klientem: Medusa (oficjalny storefront w Next.js) albo Shopify przez Storefront API",
      },
    },
    {
      k: { en: "Payments, login, CMS", pl: "Płatności, logowanie, CMS" },
      v: {
        en: "From the platform: cards, BLIK, PayPal; e-mail, Google and Facebook login; products, pages, translations and currencies",
        pl: "Z platformy: karty, BLIK, PayPal; logowanie przez e-mail, Google i Facebook; produkty, strony, tłumaczenia i waluty",
      },
    },
    {
      k: { en: "Prototype", pl: "Prototyp" },
      v: {
        en: "One self-contained HTML, CSS and JavaScript file, published online for the client",
        pl: "Jeden samodzielny plik HTML, CSS i JavaScript, opublikowany online dla klienta",
      },
    },
  ],

  system: {
    name: { en: "Design system: Steel", pl: "Design system: Steel" },
    tokens: [
      { k: "--background", v: "#0B0C0E" },
      { k: "--card", v: "#131519" },
      { k: "--card-2", v: "#1A1D22" },
      { k: "--border", v: "#2A2D33" },
      { k: "--foreground", v: "#F2F3F5" },
      { k: "--muted", v: "#9CA2AA" },
      { k: "--primary", v: "#D9DCE1" },
      { k: "--new-badge", v: "#A3231B" },
    ],
    type: [
      {
        label: "Cormorant Garamond · Medium · headings",
        font: "Cormorant Garamond",
        sample: {
          en: "HEMA swords forged for the tournament floor.",
          pl: "HEMA swords forged for the tournament floor.",
        },
      },
      {
        label: "Jost · Regular · text and UI",
        font: "Jost",
        sample: {
          en: "Feders, sabres and sidesword sets, configured to your hand and tested in sparring before they ship.",
          pl: "Feders, sabres and sidesword sets, configured to your hand and tested in sparring before they ship.",
        },
      },
      {
        label: "IBM Plex Mono · specs and data",
        font: "IBM Plex Mono",
        sample: {
          en: "Weight 1470 g · Blade 98 cm · Point of balance 7.5 cm",
          pl: "Weight 1470 g · Blade 98 cm · Point of balance 7.5 cm",
        },
      },
    ],
    samples: ["Shop the swords", "Build your feder", "New", "Ships in 21 days"],
  },

  decisionsLead: {
    en: "Each one started from an audit finding. What I considered, what I chose, and what it costs.",
    pl: "Każda zaczęła się od wniosku z audytu. Co rozważałam, co wybrałam i ile to kosztuje.",
  },
  decisions: [
    {
      t: {
        en: "Store: one page with filters, not a page per line",
        pl: "Sklep: jedna strona z filtrami, nie strona na linię",
      },
      considered: {
        en: "keeping one page per product line, as the live store does, or a filter sidebar.",
        pl: "zostawienie osobnej strony dla każdej linii produktów, jak w obecnym sklepie, albo panel filtrów z boku.",
      },
      chose: {
        en: "one Store page with weapon-type tabs and counts, a line selector, a “Ships in 21 days” switch and sorting above the grid. Store links in the mega menu open it with a filter already set.",
        pl: "jedną stronę sklepu z zakładkami rodzajów broni i licznikami, wyborem linii, przełącznikiem „Wysyłka w 21 dni” i sortowaniem nad siatką. Linki do sklepu w mega menu otwierają ją z ustawionym filtrem.",
      },
      why: {
        en: "visitors look for a weapon type first, and the catalogue is small (about 40 items in 7 types). A sidebar would take width from the grid for only three filters.",
        pl: "odwiedzający szukają najpierw rodzaju broni, a katalog jest mały (około 40 produktów w 7 rodzajach). Panel z boku zabrałby siatce szerokość dla zaledwie trzech filtrów.",
      },
      cost: {
        en: "one weapon type at a time. With a much bigger catalogue, a sidebar would make sense again.",
        pl: "jeden rodzaj broni naraz. Przy dużo większym katalogu panel z boku znów miałby sens.",
      },
    },
    {
      t: {
        en: "Product page: a configurator in 4 steps",
        pl: "Strona produktu: konfigurator w 4 krokach",
      },
      considered: {
        en: "options as colour dots and selects, with the explanations on separate guide pages, as on the live store.",
        pl: "opcje jako kolorowe kropki i listy rozwijane, z objaśnieniami na osobnych stronach poradników, jak w obecnym sklepie.",
      },
      chose: {
        en: "Blade, Hilt, Grip and Upgrades steps. Every option is a card with a description and its price, paid upgrades are the last step, and a sticky bar keeps the total and Add to cart in view.",
        pl: "kroki Ostrze, Rękojeść, Uchwyt i Ulepszenia. Każda opcja to karta z opisem i ceną, płatne ulepszenia są ostatnim krokiem, a przyklejony pasek trzyma sumę i „Dodaj do koszyka” w zasięgu wzroku.",
      },
      why: {
        en: "the configuration is the purchase. Options without context lead to questions, mistakes and returns.",
        pl: "konfiguracja to sam zakup. Opcje bez kontekstu prowadzą do pytań, pomyłek i zwrotów.",
      },
      cost: {
        en: "richer product data for the client to maintain in the CMS.",
        pl: "bogatsze dane produktów, które klient musi utrzymywać w CMS-ie.",
      },
    },
    {
      t: { en: "One price, in the visitor’s currency", pl: "Jedna cena, w walucie odwiedzającego" },
      considered: {
        en: "net and gross prices side by side, as now.",
        pl: "ceny netto i brutto obok siebie, jak teraz.",
      },
      chose: {
        en: "one gross price including VAT, the net price as a note for buyers outside the EU, and a currency switch (EUR, PLN, USD) next to the language in the header.",
        pl: "jedną cenę brutto z VAT, cenę netto jako dopisek dla kupujących spoza UE i przełącznik waluty (EUR, PLN, USD) obok języka w nagłówku.",
      },
      why: {
        en: "buyers in the EU saw the real price only in the cart.",
        pl: "kupujący z UE widzieli prawdziwą cenę dopiero w koszyku.",
      },
      cost: {
        en: "exchange rates and VAT rules have to come from the shop platform, and the final amount still depends on the checkout.",
        pl: "kursy walut i zasady VAT muszą pochodzić z platformy sklepu, a ostateczna kwota i tak zależy od płatności.",
      },
    },
    {
      t: {
        en: "Steel: silver as the only action colour",
        pl: "Steel: srebro jako jedyny kolor akcji",
      },
      considered: {
        en: "a warm ember accent (Forge) and a heraldic palette.",
        pl: "ciepły akcent żaru (Forge) i paletę heraldyczną.",
      },
      chose: {
        en: "graphite surfaces, silver for actions, and colour kept for one signal: the red New badge.",
        pl: "grafitowe powierzchnie, srebro dla akcji i kolor zostawiony dla jednego sygnału: czerwonej plakietki New.",
      },
      why: {
        en: "the products are steel and the photos bring the colour. One action colour also fixes the audit’s mix of template blue buttons, a yellow PayPal button and white boxes.",
        pl: "produkty są ze stali, a kolor wnoszą zdjęcia. Jeden kolor akcji naprawia też wskazaną w audycie mieszankę niebieskich przycisków z szablonu, żółtego przycisku PayPal i białych pól.",
      },
      cost: {
        en: "promotions can’t rely on colour to stand out.",
        pl: "promocje nie mogą wyróżniać się kolorem.",
      },
    },
  ],

  beforeAfterLead: {
    en: "Before: the live store, anonymized (names, contacts and the client’s photos replaced or blurred; layout untouched). After: the redesign in the prototype.",
    pl: "Przed: obecny sklep po anonimizacji (nazwy, kontakty i zdjęcia klienta zastąpione lub rozmyte; układ bez zmian). Po: redesign w prototypie.",
  },
  beforeAfter: [
    {
      t: { en: "Home", pl: "Strona główna" },
      before: {
        img: "before-home.webp",
        alt: {
          en: "Live store home page before the redesign, anonymized",
          pl: "Strona główna obecnego sklepu przed redesignem, zanonimizowana",
        },
        d: {
          en: "A slider with a cropped sword photo, no headline and no call to action. No featured products and no trust signals; social proof is a collage of Facebook screenshots.",
          pl: "Slider z przyciętym zdjęciem miecza, bez nagłówka i wezwania do działania. Brak polecanych produktów i sygnałów zaufania; dowodem społecznym jest kolaż zrzutów z Facebooka.",
        },
      },
      after: {
        img: "after-home.webp",
        alt: {
          en: "Redesigned home page with a hero, two actions and a trust bar",
          pl: "Nowa strona główna z hero, dwiema akcjami i paskiem zaufania",
        },
        d: {
          en: "A hero with the promise and two actions, a trust bar, the three lines with lead time and a from-price, and Shop by weapon.",
          pl: "Hero z obietnicą i dwiema akcjami, pasek zaufania, trzy linie z czasem realizacji i ceną od oraz zakupy według broni.",
        },
      },
    },
    {
      t: { en: "Product listing", pl: "Lista produktów" },
      before: {
        img: "before-listing.webp",
        alt: {
          en: "Live store product line page before the redesign, anonymized",
          pl: "Strona linii produktów w obecnym sklepie przed redesignem, zanonimizowana",
        },
        d: {
          en: "One page per product line, no filters or sorting, and two prices on every card: net in large type, gross in small grey text.",
          pl: "Osobna strona dla każdej linii, bez filtrów i sortowania, i dwie ceny na każdej karcie: netto dużą czcionką, brutto małym szarym tekstem.",
        },
      },
      after: {
        img: "after-listing.webp",
        alt: {
          en: "Redesigned Store page with weapon tabs, line selector and lead-time switch",
          pl: "Nowa strona sklepu z zakładkami broni, wyborem linii i przełącznikiem czasu realizacji",
        },
        d: {
          en: "One Store page: weapon tabs with counts, a line selector, a lead-time switch and sorting. One gross price per card and badges only where they mean something.",
          pl: "Jedna strona sklepu: zakładki broni z licznikami, wybór linii, przełącznik czasu realizacji i sortowanie. Jedna cena brutto na kartę i plakietki tylko tam, gdzie coś znaczą.",
        },
      },
    },
    {
      t: { en: "Product page", pl: "Strona produktu" },
      before: {
        img: "before-product.webp",
        alt: {
          en: "Live store product page before the redesign, anonymized",
          pl: "Strona produktu w obecnym sklepie przed redesignem, zanonimizowana",
        },
        d: {
          en: "Grip colour as unnamed dots, tip and pommel as empty selects, paid upgrades sold as separate products, and no lead time next to Add to cart.",
          pl: "Kolor uchwytu jako kropki bez nazw, sztych i głowica jako puste listy, płatne ulepszenia jako osobne produkty i brak czasu realizacji przy „Dodaj do koszyka”.",
        },
      },
      after: {
        img: "after-product.webp",
        alt: {
          en: "Redesigned product page with the 4-step configurator and a sticky buy bar",
          pl: "Nowa strona produktu z 4-krokowym konfiguratorem i przyklejonym paskiem zakupu",
        },
        d: {
          en: "A 4-step configurator with a description and price for every option, upgrades as the last step, lead time and warranty under the price, and a sticky bar with the total.",
          pl: "4-krokowy konfigurator z opisem i ceną każdej opcji, ulepszenia jako ostatni krok, czas realizacji i gwarancja pod ceną oraz przyklejony pasek z sumą.",
        },
      },
    },
    {
      t: { en: "Header and contact", pl: "Nagłówek i kontakt" },
      before: {
        img: "before-header.webp",
        alt: {
          en: "Live store header before the redesign, anonymized",
          pl: "Nagłówek obecnego sklepu przed redesignem, zanonimizowany",
        },
        d: {
          en: "Two phone numbers, an e-mail address and four social icons crowd the header; a floating contact widget covers the content.",
          pl: "Dwa numery telefonu, adres e-mail i cztery ikony społecznościowe tłoczą się w nagłówku; pływający widżet kontaktu zasłania treść.",
        },
      },
      after: {
        img: "after-contact.webp",
        alt: {
          en: "Redesigned two-row header and Contact page with a message form",
          pl: "Nowy dwurzędowy nagłówek i strona kontaktu z formularzem",
        },
        d: {
          en: "A two-row header with only what you use while shopping, and a Contact page with a message form and the workshop’s details.",
          pl: "Dwurzędowy nagłówek tylko z tym, czego używasz przy zakupach, i strona kontaktu z formularzem i danymi warsztatu.",
        },
      },
    },
  ],

  mockupsLead: {
    en: "The anonymized Vantgard Arms prototype. Same pages, components and interactions as the client version; names and photos replaced.",
    pl: "Zanonimizowany prototyp Vantgard Arms. Te same strony, komponenty i interakcje co w wersji dla klienta; nazwy i zdjęcia zastąpione.",
  },
  mockups: {
    desktop: [
      { img: "home-full.webp", t: { en: "Home, desktop", pl: "Home, desktop" }, tall: true },
      {
        img: "product-desktop.webp",
        t: {
          en: "Product page with the configurator, desktop",
          pl: "Strona produktu z konfiguratorem, desktop",
        },
      },
    ],
    mobile: [
      { img: "mobile-home.webp", t: { en: "Home, mobile", pl: "Home, mobile" } },
      { img: "mobile-store.webp", t: { en: "Store, mobile", pl: "Store, mobile" } },
      {
        img: "mobile-product.webp",
        t: { en: "Product · configurator, mobile", pl: "Produkt · konfigurator, mobile" },
      },
    ],
  },
};
