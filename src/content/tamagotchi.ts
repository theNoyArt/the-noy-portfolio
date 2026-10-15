import type { Localized } from "./types";

// Tamagotchi-style game: content for src/pages/tamagotchi.
// Concept from Paulina (Oct 2026). Task lists and the behaviour map are working drafts:
// tick tasks (done: true) and change phase statuses as the project moves.

export type PhaseStatus = "done" | "active" | "planned";
export type Mood = "happy" | "sad" | "sick" | "anxious" | "chubby" | "thin";

export interface RoadmapPhase {
  id: string;
  icon: "research" | "game" | "design" | "scenario" | "art" | "ui" | "platform" | "code" | "test";
  title: Localized;
  goal: Localized;
  status: PhaseStatus;
  /** Optional manual progress in %, used instead of counting ticked tasks. */
  progress?: number;
  tasks: { label: Localized; done: boolean }[];
}

export type InspirationGroup = "pets" | "choices" | "feelings" | "psych" | "gamepsych";

export const TG = {
  meta: {
    kind: { en: "Game · Virtual pet", pl: "Gra · Wirtualny zwierzak" },
    origin: {
      en: "Self-initiated · designing the core",
      pl: "Projekt własny · projektuję rdzeń gry",
    },
  },
  /** Working title, to be replaced once the game has a name. */
  title: { en: "Bond", pl: "Bond" },
  sub: { en: "A Tamagotchi-inspired game", pl: "Gra inspirowana Tamagotchi" },
  lead: {
    en: "One small life, about a month long. Your pet needs you, and the way you respond to it shapes its attachment style, its personality and how its life ends: from a happy old age to a trauma you caused, or an early death from neglect. Built on real psychology of attachment and early childhood.",
    pl: "Jedno małe życie, trwające około miesiąca. Twój zwierzak Cię potrzebuje, a to, jak na niego reagujesz, kształtuje jego styl przywiązania, osobowość i to, jak skończy się jego życie: od szczęśliwej starości, przez traumę, którą mu zafundujesz, po wczesną śmierć z zaniedbania. Oparte na prawdziwej psychologii przywiązania i wczesnego dzieciństwa.",
  },
  facts: [] as [Localized, Localized][],

  pillars: [
    {
      k: { en: "One life", pl: "Jedno życie" },
      title: { en: "It lives for about a month", pl: "Żyje około miesiąca" },
      desc: {
        en: "Every pet has one life in real time. There is no restart button halfway: what happens to it stays with it.",
        pl: "Każdy zwierzak ma jedno życie w realnym czasie. Nie ma restartu w połowie: to, co mu się przydarzy, zostaje z nim.",
      },
    },
    {
      k: { en: "Attachment", pl: "Przywiązanie" },
      title: {
        en: "Your care shapes who it becomes",
        pl: "Twoja opieka kształtuje to, kim się stanie",
      },
      desc: {
        en: "Its personality forms from how you respond to its needs, following the four attachment styles from psychology.",
        pl: "Jego osobowość powstaje z tego, jak odpowiadasz na jego potrzeby, zgodnie z czterema stylami przywiązania znanymi z psychologii.",
      },
    },
    {
      k: { en: "Consequences", pl: "Konsekwencje" },
      title: { en: "Not always a happy ending", pl: "Nie zawsze szczęśliwe zakończenie" },
      desc: {
        en: "You can do everything right, or you can fail. Neglect and inconsistency leave marks, and some paths end early.",
        pl: "Możesz zrobić wszystko dobrze albo ponieść porażkę. Zaniedbanie i niekonsekwencja zostawiają ślady, a niektóre ścieżki kończą się wcześnie.",
      },
    },
  ],

  /** The four attachment styles (pl: style przywiązania). */
  attachment: [
    {
      id: "secure",
      name: { en: "Secure", pl: "Bezpieczny" },
      care: {
        en: "Care that is warm, consistent and responsive.",
        pl: "Opieka ciepła, przewidywalna i responsywna.",
      },
      shows: {
        en: "Calm and curious. It explores, plays, comes back for comfort and recovers quickly.",
        pl: "Spokojny i ciekawy. Eksploruje, bawi się, wraca po pocieszenie i szybko dochodzi do siebie.",
      },
      mood: "happy" as Mood,
    },
    {
      id: "anxious",
      name: { en: "Anxious", pl: "Lękowo-ambiwalentny" },
      care: {
        en: "Care that comes and goes: sometimes there, sometimes not.",
        pl: "Opieka, która raz jest, a raz jej nie ma.",
      },
      shows: {
        en: "Clingy and worried. It calls for you often and is hard to settle when you return.",
        pl: "Przylepny i zaniepokojony. Często Cię woła i trudno go uspokoić, gdy wracasz.",
      },
      mood: "anxious" as Mood,
    },
    {
      id: "avoidant",
      name: { en: "Avoidant", pl: "Unikający" },
      care: {
        en: "Needs met, but feelings ignored or pushed away.",
        pl: "Potrzeby zaspokojone, ale emocje ignorowane lub odpychane.",
      },
      shows: {
        en: "Too independent. It stops asking for help and hides how it feels.",
        pl: "Zbyt niezależny. Przestaje prosić o pomoc i ukrywa, co czuje.",
      },
      mood: "sad" as Mood,
    },
    {
      id: "disorganized",
      name: { en: "Disorganized", pl: "Zdezorganizowany" },
      care: {
        en: "Care that is frightening, chaotic or neglectful.",
        pl: "Opieka przerażająca, chaotyczna lub zaniedbująca.",
      },
      shows: {
        en: "Confused and unpredictable. It wants you and fears you at the same time.",
        pl: "Zagubiony i nieprzewidywalny. Jednocześnie Cię potrzebuje i się Ciebie boi.",
      },
      mood: "sick" as Mood,
    },
  ],

  /** Draft behaviour → result map: what the player does, the immediate reaction, the long-term mark. */
  behaviours: [
    {
      act: { en: "Responds when it calls", pl: "Reagujesz, gdy woła" },
      now: { en: "Settles quickly", pl: "Szybko się uspokaja" },
      later: { en: "Trust · towards secure", pl: "Zaufanie · w stronę bezpiecznego" },
      tone: "good",
    },
    {
      act: { en: "Feeds and rests it on a rhythm", pl: "Karmisz i usypiasz go w rytmie" },
      now: { en: "Healthy weight and energy", pl: "Zdrowa waga i energia" },
      later: { en: "Grows strong · longer life", pl: "Rośnie silny · dłuższe życie" },
      tone: "good",
    },
    {
      act: {
        en: "Attention on some days, none on others",
        pl: "Uwaga jednego dnia, brak drugiego",
      },
      now: { en: "Calls more, harder to calm", pl: "Woła częściej, trudniej go uspokoić" },
      later: { en: "Towards anxious", pl: "W stronę lękowego" },
      tone: "mid",
    },
    {
      act: { en: "Feeds it but ignores crying", pl: "Karmisz, ale ignorujesz płacz" },
      now: { en: "Stops calling", pl: "Przestaje wołać" },
      later: { en: "Towards avoidant", pl: "W stronę unikającego" },
      tone: "mid",
    },
    {
      act: { en: "Overfeeds or feeds only treats", pl: "Przekarmiasz lub dajesz same słodycze" },
      now: { en: "Gains weight, gets sick", pl: "Tyje, choruje" },
      later: { en: "Health problems · shorter life", pl: "Problemy zdrowotne · krótsze życie" },
      tone: "mid",
    },
    {
      act: { en: "Scares or punishes it", pl: "Straszysz lub karzesz go" },
      now: { en: "Freezes, hides", pl: "Zamiera, chowa się" },
      later: { en: "Trauma · towards disorganized", pl: "Trauma · w stronę zdezorganizowanego" },
      tone: "bad",
    },
    {
      act: { en: "Forgets about it for days", pl: "Zapominasz o nim na kilka dni" },
      now: { en: "Hungry, weak, sick", pl: "Głodny, słaby, chory" },
      later: { en: "Can die", pl: "Może umrzeć" },
      tone: "bad",
    },
  ] as { act: Localized; now: Localized; later: Localized; tone: "good" | "mid" | "bad" }[],

  /** Endings, from worst to best. */
  endings: [
    { en: "Dies from neglect", pl: "Umiera z zaniedbania" },
    { en: "Lives with trauma", pl: "Żyje z traumą" },
    { en: "Insecure, but okay", pl: "Niepewny, ale w porządku" },
    { en: "Happy life, dies of old age", pl: "Szczęśliwe życie, umiera ze starości" },
  ] as Localized[],

  loop: [
    { en: "It signals a need", pl: "Sygnalizuje potrzebę" },
    { en: "You respond, or not", pl: "Reagujesz albo nie" },
    { en: "It reacts", pl: "Reaguje" },
    { en: "It learns what to expect", pl: "Uczy się, czego się spodziewać" },
    { en: "Its personality forms", pl: "Kształtuje się osobowość" },
  ] as Localized[],

  /** One character, many states: the sprite set. */
  states: [
    { mood: "happy", label: { en: "Happy", pl: "Szczęśliwy" } },
    { mood: "sad", label: { en: "Sad", pl: "Smutny" } },
    { mood: "anxious", label: { en: "Anxious", pl: "Zalękniony" } },
    { mood: "sick", label: { en: "Sick", pl: "Chory" } },
    { mood: "chubby", label: { en: "Overfed", pl: "Przekarmiony" } },
    { mood: "thin", label: { en: "Underfed", pl: "Niedożywiony" } },
  ] as { mood: Mood; label: Localized }[],

  inspirationGroups: [
    { id: "pets", label: { en: "Virtual pets", pl: "Wirtualne zwierzaki" } },
    { id: "choices", label: { en: "Choices & consequences", pl: "Wybory i konsekwencje" } },
    {
      id: "feelings",
      label: { en: "Emotions & mental health", pl: "Emocje i zdrowie psychiczne" },
    },
    { id: "psych", label: { en: "Psychology", pl: "Psychologia" } },
    { id: "gamepsych", label: { en: "Psychology of games", pl: "Psychologia gier" } },
  ] as { id: InspirationGroup; label: Localized }[],

  inspirations: [
    {
      g: "pets",
      name: "Tamagotchi",
      url: "https://en.wikipedia.org/wiki/Tamagotchi",
      take: {
        en: "One small life in your pocket that depends on you, and can die.",
        pl: "Małe życie w kieszeni, które zależy od Ciebie i może umrzeć.",
      },
    },
    {
      g: "pets",
      name: "Digimon V-Pet",
      url: "https://en.wikipedia.org/wiki/Digital_Monster",
      take: {
        en: "Care mistakes change what the creature evolves into.",
        pl: "Błędy w opiece zmieniają to, w co stworek ewoluuje.",
      },
    },
    {
      g: "pets",
      name: "Creatures",
      url: "https://en.wikipedia.org/wiki/Creatures_(1996_video_game)",
      take: {
        en: "Artificial life that learns from how you treat it.",
        pl: "Sztuczne życie, które uczy się z tego, jak je traktujesz.",
      },
    },
    {
      g: "pets",
      name: "Nintendogs",
      url: "https://en.wikipedia.org/wiki/Nintendogs",
      take: {
        en: "A pet that bonds with you through daily touch and attention.",
        pl: "Zwierzak, który przywiązuje się dzięki codziennemu dotykowi i uwadze.",
      },
    },
    {
      g: "pets",
      name: "Finch",
      url: "https://apps.apple.com/app/id1528595748",
      take: {
        en: "A pet whose wellbeing is tied to everyday habits.",
        pl: "Zwierzak, którego dobrostan zależy od codziennych nawyków.",
      },
    },
    {
      g: "pets",
      name: "Black & White",
      url: "https://en.wikipedia.org/wiki/Black_%26_White_(video_game)",
      take: {
        en: "A creature that learns from being rewarded or punished, and grows to match how you raised it.",
        pl: "Stwór, który uczy się z nagród i kar i staje się taki, jak go wychowałeś.",
      },
    },
    {
      g: "pets",
      name: "Chao Garden",
      url: "https://en.wikipedia.org/wiki/Chao_Garden",
      take: {
        en: "Small creatures that change shape and personality based on how you raise them.",
        pl: "Małe stworki, które zmieniają wygląd i charakter zależnie od tego, jak je wychowujesz.",
      },
    },
    {
      g: "pets",
      name: "Petz",
      url: "https://en.wikipedia.org/wiki/Petz",
      take: {
        en: "Pets with their own personalities that remember how they were treated.",
        pl: "Zwierzaki z własnym charakterem, które pamiętają, jak je traktowano.",
      },
    },
    {
      g: "choices",
      name: "Slay the Princess",
      url: "https://store.steampowered.com/app/1989270/Slay_the_Princess/",
      take: {
        en: "How you treat her reshapes who she becomes, and the story with her.",
        pl: "To, jak ją traktujesz, zmienia to, kim się staje, a razem z nią całą historię.",
      },
    },
    {
      g: "choices",
      name: "The Sims",
      url: "https://store.steampowered.com/app/1222670/The_Sims_4/",
      take: {
        en: "Needs that drift over time and choices with visible consequences.",
        pl: "Potrzeby, które zmieniają się w czasie, i wybory z widocznymi konsekwencjami.",
      },
    },
    {
      g: "choices",
      name: "Spiritfarer",
      url: "https://store.steampowered.com/app/972660/Spiritfarer_Farewell_Edition/",
      take: {
        en: "Care as the core mechanic, and a gentle way to talk about loss.",
        pl: "Opieka jako główna mechanika i delikatny sposób mówienia o stracie.",
      },
    },
    {
      g: "choices",
      name: "Undertale",
      url: "https://store.steampowered.com/app/391540/Undertale/",
      take: {
        en: "Mercy or violence: the game remembers how you treated everyone and changes its ending.",
        pl: "Litość albo przemoc: gra pamięta, jak traktowałeś innych, i zmienia zakończenie.",
      },
    },
    {
      g: "feelings",
      name: "Coffee Talk",
      url: "https://store.steampowered.com/app/914800/Coffee_Talk/",
      take: {
        en: "Listen to customers’ problems over a drink; what you serve changes their stories.",
        pl: "Słuchasz problemów klientów przy napoju; to, co podasz, zmienia ich historie.",
      },
    },
    {
      g: "feelings",
      name: "Celeste",
      url: "https://store.steampowered.com/app/504230/Celeste/",
      take: {
        en: "A hard climb that is really about anxiety and self-acceptance.",
        pl: "Trudna wspinaczka, która tak naprawdę opowiada o lęku i akceptacji siebie.",
      },
    },
    {
      g: "feelings",
      name: "Florence",
      url: "https://store.steampowered.com/app/1102130/Florence/",
      take: {
        en: "Simple mechanics that feel like the emotions of a relationship.",
        pl: "Proste mechaniki, które oddają emocje związku.",
      },
    },
    {
      g: "feelings",
      name: "Gris",
      url: "https://store.steampowered.com/app/683320/GRIS/",
      take: {
        en: "Grief told through colour and movement, almost without words.",
        pl: "Żałoba opowiedziana kolorem i ruchem, prawie bez słów.",
      },
    },
    {
      g: "psych",
      name: { en: "Attachment theory", pl: "Teoria przywiązania" },
      url: "https://en.wikipedia.org/wiki/Attachment_theory",
      take: {
        en: "Bowlby and Ainsworth: how early care shapes the four attachment styles.",
        pl: "Bowlby i Ainsworth: jak wczesna opieka kształtuje cztery style przywiązania.",
      },
    },
    {
      g: "psych",
      name: { en: "Early trauma research", pl: "Badania nad wczesną traumą" },
      url: "https://en.wikipedia.org/wiki/Adverse_childhood_experiences",
      take: {
        en: "How neglect and adverse experiences in early life show up later in behaviour.",
        pl: "Jak zaniedbanie i trudne doświadczenia we wczesnym życiu ujawniają się później w zachowaniu.",
      },
    },
    {
      g: "psych",
      name: { en: "Stages of development", pl: "Etapy rozwoju" },
      url: "https://en.wikipedia.org/wiki/Erikson%27s_stages_of_psychosocial_development",
      take: {
        en: "Erikson: the first stage of life is about learning trust or mistrust.",
        pl: "Erikson: pierwszy etap życia to nauka zaufania albo nieufności.",
      },
    },
    {
      g: "gamepsych",
      name: { en: "Player motivation", pl: "Motywacja graczy" },
      url: "https://www.sciencedaily.com/releases/2006/12/061226134706.htm",
      take: {
        en: "Self-determination theory in games: autonomy, competence and relatedness keep players coming back.",
        pl: "Teoria autodeterminacji w grach: autonomia, kompetencja i relacje sprawiają, że gracze wracają.",
      },
    },
    {
      g: "gamepsych",
      name: { en: "Attachment to game characters", pl: "Przywiązanie do postaci w grach" },
      url: "https://gamestudies.org/2001/articles/burgessjones",
      take: {
        en: "Why players grieve for, protect and feel guilty towards characters they care for.",
        pl: "Dlaczego gracze przeżywają stratę postaci, chronią je i czują wobec nich winę.",
      },
    },
  ] as { g: InspirationGroup; name: string | Localized; take: Localized; url: string }[],

  roadmap: [
    {
      id: "psych",
      icon: "research",
      status: "active",
      progress: 30,
      title: { en: "Psychology research", pl: "Badania psychologiczne" },
      goal: {
        en: "Learn enough to model care, attachment and trauma honestly.",
        pl: "Poznać temat na tyle, by uczciwie odwzorować opiekę, przywiązanie i traumę.",
      },
      tasks: [
        { label: { en: "Attachment styles", pl: "Style przywiązania" }, done: false },
        {
          label: { en: "Early trauma & neglect", pl: "Wczesna trauma i zaniedbanie" },
          done: false,
        },
        { label: { en: "Child development stages", pl: "Etapy rozwoju dziecka" }, done: false },
        {
          label: { en: "Behaviour → outcome sources", pl: "Źródła: zachowanie → skutek" },
          done: false,
        },
      ],
    },
    {
      id: "games",
      icon: "game",
      status: "active",
      progress: 50,
      title: { en: "Game research", pl: "Badania gier" },
      goal: {
        en: "Learn from virtual pets, choice-driven games and the psychology of play.",
        pl: "Uczyć się od wirtualnych zwierzaków, gier opartych na wyborach i psychologii grania.",
      },
      tasks: [
        { label: { en: "Tamagotchi-like games", pl: "Gry w stylu Tamagotchi" }, done: false },
        { label: { en: "Games with consequences", pl: "Gry z konsekwencjami" }, done: false },
        { label: { en: "Psychology of games", pl: "Psychologia gier" }, done: false },
        {
          label: { en: "Mechanics worth borrowing", pl: "Mechaniki warte zapożyczenia" },
          done: false,
        },
      ],
    },
    {
      id: "core",
      icon: "design",
      status: "active",
      progress: 10,
      title: { en: "Core game design", pl: "Rdzeń gry" },
      goal: {
        en: "Define the rules: one month of life, needs, and how care turns into personality.",
        pl: "Zdefiniować zasady: miesiąc życia, potrzeby i to, jak opieka zmienia się w osobowość.",
      },
      tasks: [
        { label: { en: "Life length & life stages", pl: "Długość i etapy życia" }, done: false },
        { label: { en: "Needs & signals", pl: "Potrzeby i sygnały" }, done: false },
        { label: { en: "Behaviour → result map", pl: "Mapa: zachowanie → skutek" }, done: false },
        {
          label: {
            en: "Endings, from neglect to old age",
            pl: "Zakończenia, od zaniedbania po starość",
          },
          done: false,
        },
      ],
    },
    {
      id: "scenarios",
      icon: "scenario",
      status: "planned",
      title: { en: "Scenarios", pl: "Scenariusze" },
      goal: {
        en: "Write the possible paths a life can take and test them on paper.",
        pl: "Rozpisać możliwe ścieżki życia i przetestować je na papierze.",
      },
      tasks: [
        { label: { en: "Paths for all 4 styles", pl: "Ścieżki dla 4 stylów" }, done: false },
        { label: { en: "Events & reactions", pl: "Wydarzenia i reakcje" }, done: false },
        { label: { en: "Paper playtest", pl: "Test na papierze" }, done: false },
      ],
    },
    {
      id: "art",
      icon: "art",
      status: "planned",
      title: { en: "Character & sprites", pl: "Postać i sprite’y" },
      goal: {
        en: "One pet, drawn in every state it can be in.",
        pl: "Jeden zwierzak, narysowany w każdym stanie, w jakim może być.",
      },
      tasks: [
        { label: { en: "Character design", pl: "Projekt postaci" }, done: false },
        {
          label: {
            en: "Moods: happy, sad, anxious…",
            pl: "Nastroje: szczęśliwy, smutny, zalękniony…",
          },
          done: false,
        },
        {
          label: {
            en: "Body & health: sick, overfed, underfed",
            pl: "Ciało i zdrowie: chory, przekarmiony, niedożywiony",
          },
          done: false,
        },
        { label: { en: "Life stages & animations", pl: "Etapy życia i animacje" }, done: false },
      ],
    },
    {
      id: "ui",
      icon: "ui",
      status: "planned",
      title: { en: "Game UI", pl: "Interfejs gry" },
      goal: {
        en: "Decide where everything lives, then design the screens.",
        pl: "Zdecydować, gdzie co jest, i zaprojektować ekrany.",
      },
      tasks: [
        { label: { en: "Layout & interactions", pl: "Układ i interakcje" }, done: false },
        {
          label: { en: "Needs & mood indicators", pl: "Wskaźniki potrzeb i nastroju" },
          done: false,
        },
        {
          label: { en: "Onboarding & endings screens", pl: "Onboarding i ekrany zakończeń" },
          done: false,
        },
      ],
    },
    {
      id: "platform",
      icon: "platform",
      status: "planned",
      title: { en: "Platform & tech stack", pl: "Platforma i technologie" },
      goal: {
        en: "Choose between web + extension, web or mobile, and the stack to build it.",
        pl: "Wybrać między web + rozszerzeniem, webem i mobile oraz stack do budowy.",
      },
      tasks: [
        { label: { en: "Compare platforms", pl: "Porównanie platform" }, done: false },
        { label: { en: "Pick the tech stack", pl: "Wybór stacku" }, done: false },
        { label: { en: "Technical prototype", pl: "Prototyp techniczny" }, done: false },
      ],
    },
    {
      id: "dev",
      icon: "code",
      status: "planned",
      title: { en: "Development", pl: "Programowanie" },
      goal: {
        en: "Build the life simulation and the game around it.",
        pl: "Zbudować symulację życia i grę wokół niej.",
      },
      tasks: [
        { label: { en: "Time & life simulation", pl: "Czas i symulacja życia" }, done: false },
        {
          label: { en: "Attachment & outcome logic", pl: "Logika przywiązania i skutków" },
          done: false,
        },
        { label: { en: "UI build & sprites", pl: "Budowa UI i sprite’y" }, done: false },
        { label: { en: "Saves & notifications", pl: "Zapis i powiadomienia" }, done: false },
      ],
    },
    {
      id: "release",
      icon: "test",
      status: "planned",
      title: { en: "Playtests & release", pl: "Testy i premiera" },
      goal: {
        en: "Check the paths feel fair and the hard topics are handled with care.",
        pl: "Sprawdzić, czy ścieżki są uczciwe, a trudne tematy potraktowane z wyczuciem.",
      },
      tasks: [
        { label: { en: "Playtests", pl: "Testy z graczami" }, done: false },
        { label: { en: "Balancing", pl: "Balans" }, done: false },
        { label: { en: "Launch", pl: "Premiera" }, done: false },
      ],
    },
  ] as RoadmapPhase[],
};
