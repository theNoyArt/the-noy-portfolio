import type { Activity, Localized } from "./types";

export const ACTIVITIES_DESC: Localized = {
  en: "Illustration, tabletop RPGs and sharing what I know. What keeps my eye and hands sharp between projects.",
  pl: "Ilustracja, gry fabularne i dzielenie się wiedzą. To, co między projektami utrzymuje w formie moje oko i ręce.",
};

// links: a "/case/<id>" url opens that case study; leave the list empty to show no links.
// images: square thumbnails on the card (in /public/images/activities), opening full size in a lightbox.
const IMG = "/images/activities";

export const ACTIVITIES: Activity[] = [
  {
    id: "rpgbooks",
    title: { en: "RPG books", pl: "Podręczniki RPG" },
    meta: { en: "Imaginarium RPG · 2022 — now", pl: "Imaginarium RPG · 2022 — obecnie" },
    desc: {
      en: "Illustrations and publication layout for a series of tabletop RPG books. Knowing RPG players from the inside is why I picked DriveThruRPG for my case study.",
      pl: "Ilustracje i skład serii podręczników do gier fabularnych. Znam graczy RPG od środka, dlatego wybrałam DriveThruRPG do mojego case study.",
    },
    topics: [
      { en: "Illustration", pl: "Ilustracja" },
      { en: "Layout & typesetting", pl: "Skład i łamanie" },
      { en: "Print-ready files", pl: "Pliki do druku" },
    ],
    images: [
      {
        src: `${IMG}/rpg-cover.webp`,
        position: "30% center",
        alt: {
          en: "Cover of Mroczny Graal, a tabletop RPG of Arthurian horror: a jewelled grail spilling black ink over old parchment",
          pl: "Okładka Mrocznego Graala, gry fabularnej o arturiańskiej grozie: zdobiony klejnotami graal, z którego wylewa się czarny tusz na stary pergamin",
        },
      },
      {
        src: `${IMG}/rpg-2.webp`,
        alt: {
          en: "Cover of Każdy jest Johnem, a competitive RPG: a crowd of illustrated characters with a ghost labelled “John” among them",
          pl: "Okładka gry Każdy jest Johnem, rywalizacyjnej gry fabularnej: tłum ilustrowanych postaci, a wśród nich duch z napisem „John”",
        },
      },
      {
        src: `${IMG}/rpg-3.webp`,
        alt: {
          en: "Noir RPG illustration: a 1920s gangster couple with a tommy gun, surrounded by playing cards, dice and banknotes, with a vintage car below",
          pl: "Ilustracja RPG w klimacie noir: para gangsterów z lat 20. z pistoletem maszynowym, wokół karty, kości i banknoty, a niżej stary samochód",
        },
      },
    ],
    stats: [
      { v: "7", l: { en: "books published", pl: "wydanych podręczników" } },
      { v: "2", l: { en: "in progress", pl: "w trakcie" } },
    ],
    links: [
      {
        label: { en: "DriveThruRPG case study", pl: "Case study DriveThruRPG" },
        url: "/case/dtrpg",
      },
    ],
  },
  {
    id: "thenoyart",
    title: { en: "theNoyArt", pl: "theNoyArt" },
    meta: { en: "Drawing streams · illustration", pl: "Streamy rysunkowe · ilustracja" },
    desc: {
      en: "My illustration portfolio and live drawing streams, with tutorials and educational content coming up.",
      pl: "Moje portfolio ilustracji i streamy z rysowania, a wkrótce tutoriale i materiały edukacyjne.",
    },
    images: [
      {
        src: `${IMG}/noy-1.webp`,
        alt: {
          en: "Digital painting of a girl with hair buns and a red panda on her shoulder, against a pink sunset sky",
          pl: "Cyfrowa ilustracja: dziewczyna z kokami i pandą czerwoną na ramieniu, na tle różowego zachodu słońca",
        },
      },
      {
        src: `${IMG}/noy-2.webp`,
        alt: {
          en: "Digital painting of a goth girl holding a phone in a misty cemetery, with a raven, candles and a zombie hand reaching out of the ground",
          pl: "Cyfrowa ilustracja: gotka z telefonem na mglistym cmentarzu, z krukiem, świecami i ręką zombie wychodzącą z ziemi",
        },
      },
      {
        src: `${IMG}/noy-3.webp`,
        alt: {
          en: "Fantasy portrait of three elves framed in a diamond, with white roses, blood and a skull",
          pl: "Fantastyczny portret trzech elfów w rombowej ramie, z białymi różami, krwią i czaszką",
        },
      },
    ],
    topics: [
      { en: "Digital painting", pl: "Malarstwo cyfrowe" },
      { en: "Character art", pl: "Postacie" },
      { en: "Live streams", pl: "Streamy na żywo" },
    ],
    links: [
      {
        label: { en: "ArtStation", pl: "ArtStation" },
        url: "https://www.artstation.com/thenoyart",
      },
      { label: { en: "YouTube", pl: "YouTube" }, url: "https://www.youtube.com/@thenoyart" },
      { label: { en: "Twitch", pl: "Twitch" }, url: "https://www.twitch.tv/thenoyart/about" },
      { label: { en: "Instagram", pl: "Instagram" }, url: "https://www.instagram.com/thenoyart/" },
    ],
  },
  {
    id: "teaching",
    title: { en: "Workshops & exhibitions", pl: "Warsztaty i wystawy" },
    meta: {
      en: "RPG & fantasy events · 2024 — 2026",
      pl: "Wydarzenia RPG i fantasy · 2024 — 2026",
    },
    desc: {
      en: "Drawing workshops, talks on tabletop RPGs, art and history, and exhibitions of my RPG illustrations.",
      pl: "Warsztaty rysunku, prelekcje o grach fabularnych, sztuce i historii oraz wystawy moich ilustracji RPG.",
    },
    topics: [
      { en: "Teaching", pl: "Nauczanie" },
      { en: "Public talks", pl: "Wystąpienia" },
      { en: "History & art", pl: "Historia i sztuka" },
    ],
    links: [],
    events: [
      { year: "2024 — 26", title: "Machina Futura", kind: { en: "Workshops", pl: "Warsztaty" } },
      {
        year: "2025",
        title: "+1 do wyobraźni · Punkt11",
        kind: { en: "Exhibition", pl: "Wystawa" },
        url: "https://punkt11.pl/wystawa-ilustracji-do-gier-fabularnych-5-23-05-2025/",
      },
      {
        year: "2021",
        title: "Spirala Cafe",
        kind: { en: "Exhibition", pl: "Wystawa" },
        url: "https://www.facebook.com/SpiralaCafe/posts/2939073486359297/",
      },
    ],
  },
];

/** Hobbies, shown as grouped chips under the activity cards. */
export const HOBBIES: { id: "make" | "mind" | "road"; label: Localized; items: Localized[] }[] = [
  {
    id: "make",
    label: { en: "Making", pl: "Tworzę" },
    items: [
      { en: "2D art & character design", pl: "Grafika 2D i projekt postaci" },
      { en: "3D art", pl: "Grafika 3D" },
      { en: "2D animation", pl: "Animacja 2D" },
      { en: "Traditional art", pl: "Sztuka tradycyjna" },
      { en: "Photography", pl: "Fotografia" },
    ],
  },
  {
    id: "mind",
    label: { en: "Curious about", pl: "Interesuję się" },
    items: [
      { en: "Tabletop RPGs", pl: "Gry fabularne" },
      { en: "Games", pl: "Gry" },
      { en: "Literature", pl: "Literatura" },
      { en: "Music", pl: "Muzyka" },
      { en: "History", pl: "Historia" },
      { en: "Psychology", pl: "Psychologia" },
      { en: "Tech & innovation", pl: "Technologie i innowacje" },
    ],
  },
  {
    id: "road",
    label: { en: "On the road", pl: "W drodze" },
    items: [{ en: "Backpacking & travel", pl: "Backpacking i podróże" }],
  },
];
