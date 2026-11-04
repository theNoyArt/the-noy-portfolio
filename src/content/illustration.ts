import type { Localized } from "./types";

// The /illustration page. Images live in /public/images/illustration as NAME.webp (full size)
// and NAME-thumb.webp (900 px on the long side). w and h are the full image's size: they give
// the real aspect ratio for the justified rows and the srcset widths.

export const ILLU_IMG = "/images/illustration";

export const ILLUSTRATION = {
  title: { en: "Illustration", pl: "Ilustracja" },
  /** Browser tab title. */
  pageTitle: { en: "Illustration · Paulina Targosz", pl: "Ilustracje · Paulina Targosz" },
  description: {
    en: "Illustration and publication design for tabletop RPGs, plus characters from my own series.",
    pl: "Ilustracja i skład podręczników do gier fabularnych oraz postacie z moich własnych serii.",
  },
  artstation: "https://www.artstation.com/thenoyart",
  note: {
    en: "Published titles are shown with the permission of Imaginarium RPG.",
    pl: "Wydane tytuły pokazuję za zgodą Imaginarium RPG.",
  },
  open: { en: "Open full size", pl: "Otwórz w pełnym rozmiarze" },
} satisfies Record<string, Localized | string>;

/** "4 images" / "4 obrazy", "5 obrazów": shown on items that open a set. */
export function imagesLabel(n: number): Localized {
  const few = n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14);
  return { en: `${n} images`, pl: `${n} ${few ? "obrazy" : "obrazów"}` };
}

export interface IllustrationItem {
  /** File name without extension: NAME.webp and NAME-thumb.webp. */
  image: string;
  /** Full image size in px. */
  w: number;
  h: number;
  title: Localized;
  meta: Localized;
  alt: Localized;
  /** Images the lightbox shows instead of the cover image, in order. */
  set?: { image: string; alt: Localized }[];
}

export const ILLUSTRATIONS: IllustrationItem[] = [
  {
    image: "omerta",
    w: 1379,
    h: 2000,
    title: { en: "Omerta", pl: "Omerta" },
    meta: {
      en: "Imaginarium RPG, 2023 · Illustration and layout",
      pl: "Imaginarium RPG, 2023 · Ilustracja i skład",
    },
    alt: {
      en: "A 1920s gangster couple with a tommy gun, surrounded by cards, dice and banknotes, above a vintage car at night",
      pl: "Para gangsterów z lat 20. z pistoletem maszynowym wśród kart, kości i banknotów, nad starym samochodem nocą",
    },
  },
  {
    image: "skladanka-tajemnic",
    w: 1985,
    h: 2000,
    title: { en: "Składanka Tajemnic", pl: "Składanka Tajemnic" },
    meta: {
      en: "Personal project, comic · Character design",
      pl: "Projekt własny, komiks · Projekt postaci",
    },
    alt: {
      en: "Poster with four characters, Nana, Sammy, Red and Lonnie, in black and white with one spot color each",
      pl: "Plakat z czterema postaciami, Naną, Sammym, Red i Lonnie, w czerni i bieli, każda z własnym kolorem",
    },
  },
  {
    image: "dolina-lata",
    w: 2000,
    h: 705,
    title: { en: "Dolina lata", pl: "Dolina lata" },
    meta: {
      en: "Personal project, RPG series · Character design",
      pl: "Projekt własny, seria RPG · Projekt postaci",
    },
    alt: {
      en: "Four small animal adventurers: a hare, a mouse under a leaf cloak, a chinchilla druid and a mouse with a needle sword",
      pl: "Czworo małych zwierzęcych bohaterów: zając, mysz w płaszczu z liścia, szynszyla druid i mysz z mieczem z igły",
    },
    set: [
      {
        image: "dolina-lata-krolik",
        alt: {
          en: "A hare adventurer in a green cloak holding a glowing orb",
          pl: "Zając w zielonym płaszczu ze świecącą kulą w dłoni",
        },
      },
      {
        image: "dolina-lata-mysz-lisc",
        alt: {
          en: "A mouse in a red hood under a leaf cloak, raising two glowing green blades",
          pl: "Mysz w czerwonym kapturze i płaszczu z liścia, unosząca dwa świecące zielone ostrza",
        },
      },
      {
        image: "dolina-lata-szynszyla",
        alt: {
          en: "A chinchilla druid in a mossy robe with a staff covered in mushrooms",
          pl: "Szynszyla druid w omszałej szacie, z kosturem porośniętym grzybami",
        },
      },
      {
        image: "dolina-lata-mysz-igla",
        alt: {
          en: "A white mouse in a green cape with a button shield and a needle sword",
          pl: "Biała mysz w zielonej pelerynie, z tarczą z guzika i mieczem z igły",
        },
      },
    ],
  },
  {
    image: "piesni-z-polnocy",
    w: 2000,
    h: 617,
    title: { en: "Pieśni z Północy", pl: "Pieśni z Północy" },
    meta: {
      en: "Personal project, Witcher fan art · Character portraits",
      pl: "Projekt własny, fan art Wiedźmina · Portrety postaci",
    },
    alt: {
      en: "Five painted fantasy character portraits with ink linework",
      pl: "Pięć malowanych portretów postaci fantasy z tuszowym rysunkiem",
    },
    set: [
      {
        image: "piesni-z-polnocy-1",
        alt: {
          en: "A scarred, bearded man in a dark hood and prayer beads",
          pl: "Brodaty mężczyzna z bliznami, w ciemnym kapturze i z różańcem",
        },
      },
      {
        image: "piesni-z-polnocy-2",
        alt: {
          en: "A long-haired man with round glasses and an earring, in a brown coat",
          pl: "Długowłosy mężczyzna w okrągłych okularach, z kolczykiem, w brązowym płaszczu",
        },
      },
      {
        image: "piesni-z-polnocy-3",
        alt: {
          en: "A scarred red-haired elf holding a finger to her lips",
          pl: "Rudowłosa elfka z bliznami, z palcem przy ustach",
        },
      },
      {
        image: "piesni-z-polnocy-4",
        alt: {
          en: "A young woman with a braid and a red feathered hat",
          pl: "Młoda kobieta z warkoczem, w czerwonym kapeluszu z piórami",
        },
      },
      {
        image: "piesni-z-polnocy-5",
        alt: {
          en: "A dark-haired woman with yellow eyes, a wound on her neck and two swords on her back",
          pl: "Ciemnowłosa kobieta o żółtych oczach, z raną na szyi i dwoma mieczami na plecach",
        },
      },
    ],
  },
  {
    image: "mroczny-graal",
    w: 1410,
    h: 2000,
    title: { en: "Mroczny Graal", pl: "Mroczny Graal" },
    meta: {
      en: "Imaginarium RPG, extended edition · Cover illustration and layout",
      pl: "Imaginarium RPG, wydanie rozszerzone · Ilustracja okładkowa i skład",
    },
    alt: {
      en: "A knight kneeling with a sword in a dark, flooded Gothic hall",
      pl: "Rycerz klęczący z mieczem w ciemnej, zalanej gotyckiej sali",
    },
  },
  {
    image: "kazdy-jest-johnem",
    w: 1414,
    h: 2000,
    title: { en: "Każdy jest Johnem", pl: "Każdy jest Johnem" },
    meta: {
      en: "Imaginarium RPG, 2022 · Cover illustration and layout",
      pl: "Imaginarium RPG, 2022 · Ilustracja okładkowa i skład",
    },
    alt: {
      en: "A crowd of expressive characters around a faceless figure with “John” written on its head",
      pl: "Tłum wyrazistych postaci wokół postaci bez twarzy z napisem „John” na głowie",
    },
  },
  {
    image: "samuraj",
    w: 1414,
    h: 2000,
    title: { en: "Samurai and oni", pl: "Samuraj i oni" },
    meta: { en: "Personal work", pl: "Praca własna" },
    alt: {
      en: "A samurai in a blue kimono with a red oni mask behind him, among dark clouds and petals",
      pl: "Samuraj w niebieskim kimonie, a za nim czerwona maska oni, wśród ciemnych chmur i płatków",
    },
  },
  {
    image: "nekromanta",
    w: 1920,
    h: 1080,
    title: { en: "Nek(r)omanta", pl: "Nek(r)omanta" },
    meta: {
      en: "Personal project, comic · Character sheet",
      pl: "Projekt własny, komiks · Arkusz postaci",
    },
    alt: {
      en: "A character sheet for a young necromancer and a zombie cat, with sketches, variants and color palettes",
      pl: "Arkusz postaci młodego nekromanty i kota zombie ze szkicami, wariantami i paletami",
    },
  },
  {
    image: "rip-noy",
    w: 1579,
    h: 2000,
    title: { en: "R.I.P. Noy", pl: "R.I.P. Noy" },
    meta: { en: "theNoyArt · Personal work", pl: "theNoyArt · Praca własna" },
    alt: {
      en: "A goth girl with a phone in a misty cemetery, with a raven, candles and a zombie hand",
      pl: "Gotka z telefonem na mglistym cmentarzu, z krukiem, świecami i ręką zombie",
    },
  },
];

/**
 * Justified rows from 640 px up: the works in a row share one height and fill the content width.
 * Every item appears once, in ILLUSTRATIONS order (a test checks this).
 */
export const ILLUSTRATION_ROWS: string[][] = [
  ["omerta", "skladanka-tajemnic"],
  ["dolina-lata"],
  ["piesni-z-polnocy"],
  ["mroczny-graal", "kazdy-jest-johnem", "samuraj"],
  ["nekromanta", "rip-noy"],
];

/** Thumb width: NAME-thumb.webp is 900 px on its long side. */
export const thumbWidth = (w: number, h: number) => (w >= h ? 900 : Math.round((900 * w) / h));

/** A publication layout spread, for the layout case study to come. */
export interface LayoutSpread {
  /** File name without extension, as for ILLUSTRATIONS. */
  image: string;
  w: number;
  h: number;
  title: Localized;
  caption: Localized;
  alt: Localized;
}

/** Empty for now: the page shows its section only once a spread is added. */
export const LAYOUT_SPREADS: LayoutSpread[] = [];

/** Heading of the spreads section, used once LAYOUT_SPREADS has items. */
export const LAYOUT_TITLE: Localized = { en: "Publication layout", pl: "Skład publikacji" };
