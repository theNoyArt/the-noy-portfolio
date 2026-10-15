export const PERSON = {
  name: "Mira Novak",
  first: "Mira",
  last: "Novak",
  initials: "MN",
  email: "hello@miranovak.design",
};

export const AREAS = {
  all: {
    title: "Selected projects",
    desc: "Product work where I owned both the design and the front-end, plus a few projects that lean further into one side.",
    topics: [],
  },
  ux: {
    title: "UX/UI Design",
    desc: "Research, flows and interfaces. How a product should behave, and why.",
    topics: [
      "UX case studies",
      "UI design",
      "Design systems",
      "User flows",
      "Research",
      "Prototypes",
      "Product design",
      "Design decisions",
    ],
  },
  dev: {
    title: "Front-end Development",
    desc: "Production interfaces in React and Angular. Architecture, APIs, testing and the technical decisions behind them.",
    topics: [
      "React",
      "Angular",
      "TypeScript",
      "JavaScript",
      "Architecture",
      "APIs",
      "Testing",
      "Technical decisions",
    ],
  },
};

export const PROJECTS = [
  {
    id: "ledgerly",
    name: "Ledgerly",
    hue: 292,
    year: "2025",
    category: "Fintech · SaaS",
    tracks: ["ux", "dev"],
    short:
      "A cash-flow dashboard redesigned for small-business owners who don\u2019t think in spreadsheets.",
    role: "Product Designer & Front-end Lead",
    team: "1 PM, 2 designers, 4 engineers",
    duration: "7 months",
    tools: "Figma, FigJam, Maze, Storybook",
    tech: ["React", "TypeScript", "Redux", "REST APIs"],
    intro:
      "Ledgerly helps small businesses see where their money is going. I led the redesign of its core dashboard, from interviews with owners to the React implementation.",
    product:
      "A web app that connects to business bank accounts and forecasts cash flow for the next 90 days.",
    audience: "Owners of 1\u201320 person businesses, mostly without a finance background.",
    problem:
      "Users signed up, connected a bank, and then stopped coming back. The dashboard showed accurate numbers that nobody knew how to act on.",
    resp: "Research planning, IA, interaction and visual design, component architecture and most of the dashboard front-end.",
    research:
      "Twelve interviews and a diary study with owners showed that people check cash once a week, usually on a phone, and want one answer: \u201cam I okay this month?\u201d",
    ux: [
      {
        t: "Lead with a single forecast",
        d: "The first screen answers one question in plain language before showing any chart.",
      },
      {
        t: "Weekly rhythm over real-time",
        d: "Notifications moved to a Monday summary, matching how owners already worked.",
      },
      {
        t: "Categories users named themselves",
        d: "Card sorting replaced accounting terms with the labels owners used in interviews.",
      },
    ],
    ui: [
      { t: "Calm data density", d: "One accent colour reserved for anything that needs action." },
      {
        t: "Chart components as a family",
        d: "Forecast, history and category charts share axes, tooltips and empty states.",
      },
    ],
    arch: [
      {
        t: "Feature modules",
        d: "Dashboard, transactions and forecast as isolated slices with their own Redux state.",
      },
      { t: "Typed API layer", d: "OpenAPI-generated TypeScript clients wrapped in RTK Query." },
      {
        t: "Shared UI package",
        d: "Chart and table components published to the internal Storybook.",
      },
    ],
    challenge: "Forecast recalculation froze the UI on accounts with thousands of transactions.",
    solution:
      "Moved aggregation into a Web Worker and memoised selectors, so the chart updates without blocking input.",
    testing:
      "React Testing Library for flows, Jest for selectors, visual regression on chart components.",
    code: "const forecast = useForecast(accountId, { horizon: 90 });\n\nreturn (\n  <ForecastCard\n    status={forecast.status}\n    summary={t('forecast.summary', forecast)}\n    series={forecast.series}\n  />\n);",
    results: [
      { v: "+38%", l: "weekly active owners" },
      { v: "\u221252%", l: "support tickets about the dashboard" },
      { v: "1.2s", l: "faster time to first chart" },
    ],
    learned: "Plain-language summaries did more for engagement than any chart improvement.",
    improve:
      "I would test the mobile layout earlier. We designed desktop-first and reworked it late.",
  },
  {
    id: "atlas",
    name: "Atlas Fleet",
    hue: 230,
    year: "2023\u201324",
    category: "Logistics · Enterprise",
    tracks: ["dev"],
    short: "A real-time operations console for dispatch teams tracking 2,000+ vehicles.",
    role: "Front-end Developer",
    team: "6 engineers, 1 designer",
    duration: "14 months",
    tools: "Figma, Jira, GitLab CI",
    tech: ["Angular", "TypeScript", "RxJS", "Jasmine"],
    intro:
      "Atlas Fleet is the console dispatchers keep open all day. I rebuilt its live map and job board in Angular and set up the team\u2019s testing practice.",
    product: "An Angular application for assigning jobs to drivers and monitoring deliveries live.",
    audience: "Dispatch teams working 10-hour shifts on large screens.",
    problem: "The legacy AngularJS app lagged under live updates and was hard to change safely.",
    resp: "Migration plan, live data architecture, job board UI and the unit-testing setup.",
    research:
      "Shadowing two dispatch shifts showed that most actions happen from the keyboard, in bursts.",
    ux: [
      { t: "Keyboard-first job board", d: "Every assignment action reachable without the mouse." },
      {
        t: "Change highlighting",
        d: "Rows that update live flash briefly so dispatchers notice them.",
      },
    ],
    ui: [{ t: "High-contrast dense table", d: "Built for long shifts and large monitors." }],
    arch: [
      { t: "Incremental migration", d: "AngularJS and Angular side by side, one route at a time." },
      { t: "Streams for live data", d: "WebSocket events merged into RxJS stores per domain." },
      { t: "OnPush everywhere", d: "Change detection scoped to rows that actually changed." },
    ],
    challenge: "2,000 vehicles updating every few seconds made the map and table stutter.",
    solution: "Batched socket events per animation frame and virtualised the job table.",
    testing: "Jasmine and Karma unit tests, coverage gate at 80% in CI.",
    code: "this.vehicles$ = this.socket.events$.pipe(\n  bufferTime(0, animationFrameScheduler),\n  filter(batch => batch.length > 0),\n  scan(applyUpdates, initialState)\n);",
    results: [
      { v: "60fps", l: "map with full fleet live" },
      { v: "84%", l: "unit-test coverage" },
      { v: "0", l: "downtime during migration" },
    ],
    learned: "Migrating route by route kept the team shipping features the whole time.",
    improve:
      "I would introduce end-to-end tests earlier; unit tests missed a few integration bugs.",
  },
  {
    id: "kinetic",
    name: "Kinetic",
    hue: 320,
    year: "2023",
    category: "Design system",
    tracks: ["ux", "dev"],
    short: "A design system shared by six product teams, from Figma tokens to a React library.",
    role: "Design Systems Designer & Engineer",
    team: "2 designers, 3 engineers",
    duration: "10 months",
    tools: "Figma, Tokens Studio, Storybook",
    tech: ["React", "TypeScript", "SCSS", "React Testing Library"],
    intro:
      "Kinetic replaced four drifting UI kits with one system. I designed the foundations and built the component library alongside them.",
    product: "Design tokens, a Figma library and a React component package with documentation.",
    audience: "Designers and engineers across six product teams.",
    problem:
      "Each team had its own buttons, spacing and colours. The same form looked different in every product.",
    resp: "Token architecture, core components in Figma and React, documentation and adoption support.",
    research: "An interface inventory found 37 button variants and 11 greys across the products.",
    ux: [
      { t: "Audit before design", d: "The inventory gave teams a shared picture of the problem." },
      { t: "Contribution model", d: "Teams propose components through a lightweight RFC." },
    ],
    ui: [
      {
        t: "Three token tiers",
        d: "Primitive, semantic and component tokens, so themes change only one layer.",
      },
      { t: "Accessible by default", d: "Focus states and contrast checked at the token level." },
    ],
    arch: [
      {
        t: "Tokens as source of truth",
        d: "Figma variables exported to JSON, transformed into SCSS and TS.",
      },
      { t: "Headless + styled layers", d: "Behaviour hooks separated from visual components." },
    ],
    challenge: "Keeping Figma and code in sync as both evolved.",
    solution: "A CI job diffs exported tokens and opens a pull request on every change.",
    testing: "Accessibility tests with axe and interaction tests in React Testing Library.",
    code: "export const Button = ({ tone = 'accent', ...props }) => {\n  const a11y = useButton(props);\n  return <button className={cx('k-btn', tone)} {...a11y} />;\n};",
    results: [
      { v: "6", l: "teams adopted in 10 months" },
      { v: "37\u21924", l: "button variants" },
      { v: "AA", l: "contrast across all themes" },
    ],
    learned: "Adoption depended on documentation and support more than on component quality.",
    improve: "I would publish a smaller first release sooner instead of waiting for full coverage.",
  },
  {
    id: "pulse",
    name: "Pulse Care",
    hue: 185,
    year: "2022",
    category: "Healthcare · Mobile",
    tracks: ["ux"],
    short: "A research-led booking and onboarding flow for a regional clinic network.",
    role: "UX/UI Designer",
    team: "1 PM, 2 designers, agency developers",
    duration: "5 months",
    tools: "Figma, Maze, Dovetail",
    tech: ["Figma", "Prototyping", "UX Research"],
    intro:
      "Pulse Care lets patients book appointments across 14 clinics. I redesigned onboarding and booking based on usability testing with patients.",
    product: "A mobile app and web flow for booking appointments and managing referrals.",
    audience: "Patients of all ages, many booking on behalf of a family member.",
    problem: "Six in ten new users abandoned onboarding before booking their first appointment.",
    resp: "Usability testing, flows, wireframes, prototypes and final UI.",
    research:
      "Moderated tests with 15 patients, including five over 65, showed that account creation before booking caused most drop-offs.",
    ux: [
      { t: "Book first, register later", d: "Account creation moved to after a slot is chosen." },
      { t: "Booking for someone else", d: "A first-class option instead of a hidden setting." },
      { t: "Plain status language", d: "Referral states rewritten with clinic staff." },
    ],
    ui: [
      { t: "Large tap targets", d: "Minimum 48px targets and 18px body text." },
      { t: "Step progress", d: "Every step shows what is left and what is saved." },
    ],
    arch: [
      { t: "Handoff specs", d: "Annotated Figma files with states, errors and edge cases." },
      { t: "Clickable prototype", d: "Used for testing and as the developer reference." },
    ],
    challenge: "Agency developers worked from static screens and missed interaction states.",
    solution: "I wrote state tables per screen and reviewed builds weekly with the team.",
    testing: "Two rounds of unmoderated Maze tests on the prototype before build.",
    code: "// State table: slot picker\nidle      \u2192 loading \u2192 slots | empty | error\nslots     \u2192 selected \u2192 confirm\nerror     \u2192 retry (keeps filters)",
    results: [
      { v: "61%\u219224%", l: "onboarding drop-off" },
      { v: "2.1\u00d7", l: "bookings for family members" },
      { v: "4.6", l: "app store rating" },
    ],
    learned: "Testing with older patients changed decisions that younger testers never questioned.",
    improve:
      "I would involve the developers in research sessions so decisions travel with context.",
  },
];

export const EXPERIENCE = [
  {
    company: "Northwind Studio",
    role: "Senior UX Engineer",
    dates: "2024 \u2014 Now",
    from: "2024",
    kind: "Design + Build",
    desc: "I own design and front-end for two B2B products, from discovery to production React.",
    resp: [
      "Run discovery workshops and usability tests",
      "Maintain the React component library",
      "Define API contracts with backend teams",
    ],
    tech: ["React", "TypeScript", "Redux", "Figma"],
  },
  {
    company: "Atlas Logistics",
    role: "Front-end Developer",
    dates: "2022 \u2014 2024",
    from: "2022",
    kind: "Build",
    desc: "Rebuilt the dispatch console in Angular and introduced the team\u2019s testing practice.",
    resp: [
      "Planned and led the AngularJS migration",
      "Built live data streams with RxJS",
      "Set up Jasmine test coverage in CI",
    ],
    tech: ["Angular", "TypeScript", "RxJS", "Jasmine"],
  },
  {
    company: "Independent",
    role: "UX/UI Designer",
    dates: "2020 \u2014 2022",
    from: "2020",
    kind: "Design",
    desc: "Research and product design for early-stage startups in health and finance.",
    resp: [
      "Usability testing and interviews",
      "Flows, wireframes and prototypes",
      "UI design and developer handoff",
    ],
    tech: ["Figma", "Maze", "Prototyping"],
  },
  {
    company: "Pixelhaus",
    role: "Junior Designer & Developer",
    dates: "2018 \u2014 2020",
    from: "2018",
    kind: "Design + Build",
    desc: "Designed and coded marketing sites and small web apps for agency clients.",
    resp: ["Visual design for web", "Responsive front-end builds", "CMS templates"],
    tech: ["JavaScript", "SCSS", "Figma"],
  },
];

export const STACK = [
  {
    t: "Design",
    cap: "How it should work",
    items: ["UX Research", "User flows", "Wireframing", "Prototyping", "Figma"],
  },
  {
    t: "Where they meet",
    cap: "The shared language",
    items: ["Design Systems", "Design tokens", "Accessibility", "CSS / SCSS"],
  },
  {
    t: "Front-end",
    cap: "How it gets built",
    items: ["React", "Angular", "TypeScript", "JavaScript", "Redux", "REST APIs"],
  },
  {
    t: "Testing & tooling",
    cap: "How it stays reliable",
    items: ["Git", "Jasmine", "Unit testing", "React Testing Library", "ESLint", "Prettier"],
  },
];

export const THEMES = {
  light: {
    "--bg": "#f6f5f2",
    "--surface": "#ffffff",
    "--surface2": "#eeece7",
    "--ink": "#17161b",
    "--muted": "#5e5b66",
    "--line": "rgba(23,22,27,0.10)",
    "--line2": "rgba(23,22,27,0.20)",
    "--accent": "oklch(0.50 0.19 292)",
    "--accent-ink": "#ffffff",
    "--accent-soft": "oklch(0.94 0.035 292)",
    "--accent2": "oklch(0.55 0.13 250)",
    "--radius": "18px",
    "--radius-sm": "999px",
    "--hud": "0",
    "--glow": "0 0 0 transparent",
    "--card-shadow": "0 1px 2px rgba(23,22,27,.04)",
    "--card-hover": "0 30px 60px -30px rgba(50,25,110,.30)",
    "--lift": "-6px",
    "--ph-a": "#ebe8e1",
    "--ph-b": "#e5e1d9",
    "--ph2-a": "oklch(0.84 0.08 292)",
    "--ph2-b": "oklch(0.80 0.10 292)",
    "--flicker": "none",
    "--bg-img": "none",
    "--bg-size": "auto",
    "--dev-bg": "#16151c",
    "--dev-ink": "#ecebf2",
    "--dev-muted": "#a3a1b0",
    "--dev-line": "rgba(255,255,255,0.12)",
    "--dev-accent": "oklch(0.80 0.11 292)",
  },
  dark: {
    "--bg": "#0a0910",
    "--surface": "#110f1a",
    "--surface2": "#181524",
    "--ink": "#ebe8f4",
    "--muted": "#a29cb8",
    "--line": "rgba(170,150,255,0.14)",
    "--line2": "rgba(170,150,255,0.30)",
    "--accent": "oklch(0.70 0.21 302)",
    "--accent-ink": "#0a0910",
    "--accent-soft": "oklch(0.32 0.11 302 / 0.45)",
    "--accent2": "oklch(0.82 0.13 200)",
    "--radius": "4px",
    "--radius-sm": "3px",
    "--hud": "1",
    "--glow": "0 0 28px oklch(0.70 0.21 302 / 0.40)",
    "--card-shadow": "0 0 0 transparent",
    "--card-hover":
      "0 0 0 1px oklch(0.70 0.21 302 / .55), 0 0 44px -10px oklch(0.70 0.21 302 / .5)",
    "--lift": "0px",
    "--ph-a": "#14111e",
    "--ph-b": "#1a1628",
    "--ph2-a": "oklch(0.36 0.16 302)",
    "--ph2-b": "oklch(0.30 0.13 302)",
    "--flicker": "flicker 7s infinite",
    "--bg-img":
      "radial-gradient(900px 520px at 85% -5%, oklch(0.45 0.2 302 / .28), transparent 65%), radial-gradient(700px 400px at 0% 40%, oklch(0.5 0.12 200 / .10), transparent 70%), linear-gradient(rgba(170,150,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(170,150,255,.05) 1px, transparent 1px)",
    "--bg-size": "auto, auto, 48px 48px, 48px 48px",
    "--dev-bg": "#06050b",
    "--dev-ink": "#e4f3f6",
    "--dev-muted": "#8fa6b0",
    "--dev-line": "oklch(0.82 0.13 200 / 0.22)",
    "--dev-accent": "oklch(0.82 0.13 200)",
  },
};
