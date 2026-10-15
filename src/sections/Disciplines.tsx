import { useState, type ReactNode } from "react";
import { useApp } from "../app/AppContext";
import type { Localized, Stage } from "../content/types";
import { cn, tv } from "../lib/cn";
import { useI18n } from "../lib/i18n";

interface Discipline {
  id: "ux" | "ui" | "fe";
  /** About tab opened on click. */
  stage: Stage;
  letter: string;
  title: Localized;
  sub: Localized;
  icon: ReactNode;
}

const ITEMS: Discipline[] = [
  {
    id: "ux",
    stage: "research",
    letter: "A",
    title: { en: "UX research", pl: "Badania UX" },
    sub: { en: "Audits · interviews · usability tests", pl: "Audyty · wywiady · testy użyteczności" },
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5" />
        <path d="M8 10.5h5M10.5 8v5" />
      </>
    ),
  },
  {
    id: "ui",
    stage: "design",
    letter: "B",
    title: { en: "UI design", pl: "Projektowanie UI" },
    sub: { en: "Wireframes · design systems · hi-fi", pl: "Wireframe’y · design systemy · hi-fi" },
    icon: (
      <>
        <path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2z" />
        <circle cx="7.5" cy="11" r="1" />
        <circle cx="10" cy="7" r="1" />
        <circle cx="15" cy="7.5" r="1" />
      </>
    ),
  },
  {
    id: "fe",
    stage: "frontend",
    letter: "C",
    title: { en: "Front-end development", pl: "Front-end" },
    sub: { en: "React · TypeScript · tested code", pl: "React · TypeScript · przetestowany kod" },
    icon: (
      <>
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </>
    ),
  },
];

/** What the overlaps mean: where two disciplines meet in my work. */
const OVERLAPS: { id: "ab" | "ac" | "bc"; label: Localized }[] = [
  { id: "ab", label: { en: "User-tested\ndesign", pl: "Projekt testowany\nz użytkownikami" } },
  { id: "ac", label: { en: "Accessible\ncode", pl: "Dostępny\nkod" } },
  { id: "bc", label: { en: "Design systems\nin code", pl: "Design system\nw kodzie" } },
];

// Circle geometry in % of the stage (matches the circle positions in `vd` below).
const C = { ux: [50, 33], ui: [34, 61], fe: [66, 61] } as const;
const R = 26;

const vd = tv({
  slots: {
    /* Coloured orbs behind the glass, each with its letter on the part that sticks out. */
    orb:
      "absolute grid aspect-square w-[27%] animate-vd-float place-items-center rounded-full font-display text-[clamp(18px,2cqi,26px)] font-semibold text-white " +
      "shadow-[0_18px_40px_-16px_var(--orb-glow)] [transform:translate(-50%,-50%)] [transition:filter_0.4s,box-shadow_0.4s]",
    letter: "absolute [text-shadow:0_0_6px_rgba(255,255,255,0.55),0_0_14px_var(--orb-glow)]",
    /* The glass circles (the buttons). */
    circle:
      "absolute z-0 grid aspect-square w-[52%] cursor-pointer place-items-center rounded-full border p-0 backdrop-blur-[18px] backdrop-saturate-[1.3] [transform:translate(-50%,-50%)] " +
      "[transition:transform_0.45s_cubic-bezier(0.2,0.8,0.2,1),opacity_0.35s,border-color_0.35s] focus-visible:outline-offset-4 " +
      "border-[rgba(255,255,255,0.85)] bg-[rgba(255,255,255,0.34)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_18px_40px_-22px_rgba(60,40,140,0.35)] " +
      "cyber:border-[rgba(200,180,255,0.34)] cyber:bg-[rgba(255,255,255,0.07)] cyber:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_40px_-12px_rgba(170,120,255,0.35)]",
    /* Icon as a soft watermark in the part of the circle that doesn't overlap the others. */
    icon: "grid aspect-square w-[clamp(38px,3.6cqi,50px)] place-items-center [transition:transform_0.4s_cubic-bezier(0.2,0.8,0.2,1)]",
    svg:
      "h-full w-full fill-none stroke-(--ic) stroke-[1.3] opacity-[0.38] [stroke-linecap:round] [stroke-linejoin:round] [transition:filter_0.4s] " +
      "[filter:drop-shadow(0_0_4px_color-mix(in_srgb,var(--ic)_35%,transparent))]",
    /* Labels with leader lines. */
    label: "pointer-events-none absolute flex w-[42%] flex-col gap-[3px] [transition:opacity_0.3s] narrow:w-[46%]",
    title: "text-[15px] font-semibold narrow:text-[13.5px]",
    more: "mt-1 font-mono text-[11px] text-accent opacity-0 [transition:opacity_0.3s] narrow:hidden",
  },
  variants: {
    id: {
      ux: {
        orb: "top-[13%] left-1/2 bg-[linear-gradient(135deg,#e3a6ff_0%,#8a5cf0_45%,#3b3ef0_100%)] [--orb-glow:rgba(70,60,240,0.6)]",
        letter: "top-[4%] left-1/2 [transform:translateX(-50%)]",
        circle: "top-[33%] left-1/2",
        icon: "[--ic:#5b3ff0] [transform:translateY(-62%)] cyber:[--ic:#9d86ff]",
        label: "top-[2%] right-0 w-[34%] narrow:w-[32%]",
      },
      ui: {
        orb: "top-[76%] left-[15%] bg-[linear-gradient(200deg,#b07cff_0%,#d98be0_50%,#ffb38a_100%)] [animation-delay:-2.3s] [--orb-glow:rgba(200,120,230,0.6)]",
        letter: "bottom-[20%] left-[24%]",
        circle: "top-[61%] left-[34%]",
        icon: "[--ic:#b452e0] [transform:translate(-52%,22%)] cyber:[--ic:#d68cff]",
        label: "top-[92%] left-0",
      },
      fe: {
        orb: "top-[76%] left-[85%] bg-[linear-gradient(160deg,#ff8fb1_0%,#e83ec8_60%,#c62ad8_100%)] [animation-delay:-4.6s] [--orb-glow:rgba(230,60,200,0.6)]",
        letter: "right-[24%] bottom-[20%]",
        circle: "top-[61%] left-[66%]",
        icon: "[--ic:#e0309e] [transform:translate(52%,22%)] cyber:[--ic:#ff6fd0]",
        label: "top-[92%] right-0 items-end text-right",
      },
    },
    /* The hovered or focused discipline. */
    on: {
      true: {
        orb: "shadow-[0_18px_50px_-10px_var(--orb-glow)] [filter:saturate(1.25)_brightness(1.08)]",
        circle: "z-2 border-white [transform:translate(-50%,-50%)_scale(1.04)] cyber:border-white",
        svg: "opacity-60 [filter:drop-shadow(0_0_7px_color-mix(in_srgb,var(--ic)_50%,transparent))]",
        title: "text-accent",
        more: "opacity-100",
      },
    },
    /* Another discipline is in focus: this one steps back. */
    dim: {
      true: { circle: "opacity-55", label: "opacity-40" },
    },
  },
});

/* Tinted overlaps: each pair of circles, then the centre where all three meet. */
const OV = "[transition:opacity_0.35s]";
const OV_FILL = {
  ab: "fill-[rgba(150,100,255,0.16)] cyber:fill-[rgba(170,120,255,0.22)]",
  ac: "fill-[rgba(120,90,255,0.13)] cyber:fill-[rgba(130,110,255,0.2)]",
  bc: "fill-[rgba(235,100,210,0.15)] cyber:fill-[rgba(240,100,220,0.2)]",
  abc: "fill-[rgba(90,47,208,0.18)] cyber:fill-[rgba(197,139,255,0.28)]",
};

/* Overlap labels, centred on their regions (centroids of the overlap shapes) and tinted to their pair. */
const OVL =
  "pointer-events-none absolute z-3 flex max-w-none flex-col items-center gap-1 text-center font-display text-[clamp(11.5px,1cqi,14px)] leading-[1.12] font-semibold tracking-[-0.01em] whitespace-pre-line " +
  "[transform:translate(-50%,-50%)] [transition:opacity_0.3s] narrow:max-w-[17%] narrow:text-[9.5px]";
const OVL_AT = {
  ab: "top-[43.7%] left-[36.3%] text-[#5a3fc8] cyber:text-[#c7b5ff]",
  ac: "top-[43.7%] left-[63.7%] text-[#4a4ad6] cyber:text-[#b5bcff]",
  bc: "top-[67.5%] left-1/2 text-[#b0369a] cyber:text-[#ffb1e6]",
};

/** Three overlapping glass circles (research, design, front end) with glowing orbs behind. */
export function Disciplines() {
  const { L, lang, t } = useI18n();
  const app = useApp();
  const [on, setOn] = useState<Discipline["id"] | null>(null);

  const open = (d: Discipline) => {
    window.dispatchEvent(new CustomEvent("about:stage", { detail: d.stage }));
    app.goSection("about");
  };

  return (
    <div className="relative grid place-items-center overflow-visible pt-10 pb-14 narrow:pb-[72px]">
      <div data-hero-panel className="relative aspect-square w-full max-w-[720px]">
        {ITEMS.map((d) => (
          <span key={d.id} className={vd({ id: d.id, on: on === d.id }).orb()} aria-hidden="true">
            <span className={vd({ id: d.id }).letter()}>{d.letter}</span>
          </span>
        ))}
        {ITEMS.map((d) => (
          <button
            key={d.id}
            type="button"
            className={vd({ id: d.id, on: on === d.id, dim: on !== null && on !== d.id }).circle()}
            onPointerEnter={() => setOn(d.id)}
            onPointerLeave={() => setOn(null)}
            onFocus={() => setOn(d.id)}
            onBlur={() => setOn(null)}
            onClick={() => open(d)}
            aria-label={`${L(d.title)}: ${L(d.sub)}. ${t.vdOpen}`}
          >
            <span className={vd({ id: d.id }).icon()} aria-hidden="true">
              <svg viewBox="0 0 24 24" className={vd({ on: on === d.id }).svg()}>
                {d.icon}
              </svg>
            </span>
          </button>
        ))}
        {/* Tinted overlaps: each pair of circles, then the centre where all three meet. */}
        <svg
          className="pointer-events-none absolute inset-0 z-1 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <defs>
            {ITEMS.map((d) => (
              <clipPath key={d.id} id={"vd-clip-" + d.id}>
                <circle cx={C[d.id][0]} cy={C[d.id][1]} r={R} />
              </clipPath>
            ))}
          </defs>
          <g clipPath="url(#vd-clip-ux)">
            <circle className={cn(OV, OV_FILL.ab, on && "opacity-35")} cx={C.ui[0]} cy={C.ui[1]} r={R} />
          </g>
          <g clipPath="url(#vd-clip-ux)">
            <circle className={cn(OV, OV_FILL.ac, on && "opacity-35")} cx={C.fe[0]} cy={C.fe[1]} r={R} />
          </g>
          <g clipPath="url(#vd-clip-ui)">
            <circle className={cn(OV, OV_FILL.bc, on && "opacity-35")} cx={C.fe[0]} cy={C.fe[1]} r={R} />
          </g>
          <g clipPath="url(#vd-clip-ux)">
            <g clipPath="url(#vd-clip-ui)">
              <circle className={cn(OV, OV_FILL.abc, on && "opacity-35")} cx={C.fe[0]} cy={C.fe[1]} r={R} />
            </g>
          </g>
        </svg>
        {OVERLAPS.map((o) => (
          <span key={o.id} className={cn(OVL, OVL_AT[o.id], on && "opacity-35")} aria-hidden="true">
            {L(o.label)}
          </span>
        ))}
        {/* The result, as plain text in the centre where all three overlap. */}
        <span
          className={
            "pointer-events-none absolute top-[51.6%] left-1/2 z-3 flex max-w-none flex-col items-center gap-1 rounded-none p-0 text-center " +
            "font-display text-[clamp(13px,1.15cqi,16px)] leading-[1.02] font-semibold tracking-[-0.02em] whitespace-pre-line text-white " +
            "[text-shadow:0_0_14px_rgba(110,60,230,0.55),0_1px_2px_rgba(70,30,160,0.4)] [transform:translate(-50%,-50%)] " +
            "narrow:max-w-[18%] narrow:text-[10px]"
          }
          aria-hidden="true"
        >
          {lang === "pl" ? "Produkty,\nktóre działają" : "Products\nthat work"}
        </span>
        {ITEMS.map((d) => (
          <div key={d.id} className={vd({ id: d.id, dim: on !== null && on !== d.id }).label()}>
            <span className="mb-1 block h-px w-14 bg-muted opacity-60" aria-hidden="true" />
            <span className={vd({ on: on === d.id }).title()}>{L(d.title)}</span>
            <span className="text-[12.5px] leading-[1.35] text-muted narrow:text-[11.5px]">{L(d.sub)}</span>
            <span className={vd({ on: on === d.id }).more()}>{t.vdOpen}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
