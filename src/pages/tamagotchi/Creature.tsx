import { useId } from "react";
import type { Mood } from "../../content/tamagotchi";
import { cn } from "../../lib/cn";

const BODY: Record<Mood, [string, string, string]> = {
  happy: ["#fff6fd", "#f7c6ea", "#c99af2"],
  sad: ["#f3f4ff", "#c9cdf2", "#9aa3e0"],
  anxious: ["#fff9f0", "#f5dcc6", "#d9a8d8"],
  sick: ["#f7fbea", "#d6e6b2", "#a9c48a"],
  chubby: ["#fff6fd", "#f7c6ea", "#c99af2"],
  thin: ["#fbf7ff", "#e2d3f2", "#b9a3d9"],
};

/** Slower when it is sad or sick, a shiver when anxious. */
const BOB: Record<Mood, string> = {
  happy: "animate-tg-bob",
  chubby: "animate-tg-bob",
  thin: "animate-tg-bob",
  sad: "animate-tg-bob-slow",
  sick: "animate-tg-bob-slow",
  anxious: "animate-tg-shiver",
};

const STEM = "fill-none stroke-[#3d8f5a] stroke-[2.4] [stroke-linecap:round]";
const LEAF = "fill-[#7fcf8f] stroke-[#3d8f5a] stroke-[1.6]";
const FOOT = "fill-[#c99af2] stroke-[#5a2fd0] stroke-2";
const EYES = "origin-[60px_64px] animate-tg-blink fill-[#2a1b55]";
const MOUTH = "fill-none stroke-[#2a1b55] stroke-2 [stroke-linecap:round]";

/**
 * The game's placeholder mascot: a small round creature that bobs and blinks.
 * One character in several states (mood, health, body), like the planned sprite set. Original art, drawn in SVG.
 */
export function Creature({ className, mood = "happy" }: { className?: string; mood?: Mood }) {
  const id = useId().replace(/:/g, "");
  const [a, b, c] = BODY[mood];
  const sx = mood === "chubby" ? 1.2 : mood === "thin" ? 0.78 : 1;
  const droop = mood === "sad" || mood === "sick";

  return (
    <svg
      className={cn("block overflow-visible", className)}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={"tg-b" + id} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor={a} />
          <stop offset="0.55" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </radialGradient>
      </defs>
      <ellipse
        className="origin-[60px_104px] animate-tg-shadow fill-[rgba(60,30,120,0.18)]"
        cx="60"
        cy="104"
        rx={26 * sx}
        ry="5"
      />
      <g className={cn("origin-[60px_100px]", BOB[mood])}>
        {/* sprout: wilts when it is sad or sick */}
        {droop ? (
          <>
            <path d="M60 30c0-6 3-9 8-8" className={STEM} />
            <path d="M68 22c5 1 8 6 6 10-5-1-7-5-6-10z" className={LEAF} />
          </>
        ) : (
          <>
            <path d="M60 30c0-8 4-13 10-15" className={STEM} />
            <path d="M70 15c6-3 12 0 13 5-6 3-11 1-13-5z" className={LEAF} />
          </>
        )}
        <g transform={`translate(60 65) scale(${sx} 1) translate(-60 -65)`}>
          <path
            d="M60 30c22 0 34 17 34 38 0 20-14 32-34 32S26 88 26 68c0-21 12-38 34-38z"
            fill={`url(#tg-b${id})`}
            className="stroke-[#5a2fd0] stroke-[2.2]"
          />
          <ellipse cx="47" cy="99" rx="7" ry="3.5" className={FOOT} />
          <ellipse cx="73" cy="99" rx="7" ry="3.5" className={FOOT} />
        </g>

        {/* eyes */}
        {mood === "happy" || mood === "chubby" ? (
          <g className={EYES}>
            <ellipse cx="49" cy="64" rx="4" ry="5" />
            <ellipse cx="71" cy="64" rx="4" ry="5" />
            <circle cx="50.5" cy="62" r="1.3" className="fill-white" />
            <circle cx="72.5" cy="62" r="1.3" className="fill-white" />
          </g>
        ) : mood === "anxious" ? (
          <g className={EYES}>
            <circle cx="49" cy="63" r="5.5" className="fill-white stroke-[#2a1b55] stroke-[1.2]" />
            <circle cx="71" cy="63" r="5.5" className="fill-white stroke-[#2a1b55] stroke-[1.2]" />
            <circle cx="49" cy="64" r="2" />
            <circle cx="71" cy="64" r="2" />
          </g>
        ) : (
          <g className={EYES}>
            <ellipse cx="49" cy="66" rx="3.6" ry={mood === "sick" ? 1.6 : 4} />
            <ellipse cx="71" cy="66" rx="3.6" ry={mood === "sick" ? 1.6 : 4} />
            <path d="M43 58l10 3M77 58l-10 3" className="fill-none stroke-[#2a1b55] stroke-[1.8] [stroke-linecap:round]" />
          </g>
        )}

        {mood !== "sick" && mood !== "thin" && (
          <>
            <ellipse cx="42" cy="73" rx="5" ry="3" className="fill-[#f48fc8] opacity-70" />
            <ellipse cx="78" cy="73" rx="5" ry="3" className="fill-[#f48fc8] opacity-70" />
          </>
        )}

        {/* mouth */}
        {mood === "happy" || mood === "chubby" ? (
          <path d="M55 73c2.5 3 7.5 3 10 0" className={MOUTH} />
        ) : mood === "anxious" ? (
          <path d="M53 76l2.5-2 2.5 2 2.5-2 2.5 2 2.5-2" className={MOUTH} />
        ) : mood === "sick" ? (
          <path d="M54 76c2-2 4-2 6 0s4 2 6 0" className={MOUTH} />
        ) : (
          <path d="M55 77c2.5-3 7.5-3 10 0" className={MOUTH} />
        )}

        {/* extras */}
        {mood === "sad" && <path d="M45 71c-1.5 3-1.5 5 0 6 1.5-1 1.5-3 0-6z" className="fill-[#8fd0ff] stroke-[#4a90c8] stroke-[0.8]" />}
        {mood === "anxious" && <path d="M85 50c-2 3-2 5 0 6 2-1 2-3 0-6z" className="fill-[#8fd0ff] stroke-[#4a90c8] stroke-[0.8]" />}
        {mood === "sick" && (
          <path
            d="M88 40h6l-6 6h6"
            className="fill-none stroke-[#6d8a4a] stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
          />
        )}
      </g>
    </svg>
  );
}
