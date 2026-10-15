import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DT_IMG } from "../../content/dtrpg/project";
import type { Img } from "../../content/dtrpg/types";
import { cn, tv } from "../../lib/cn";
import { caseBtn, label as monoLabel, seg, todoLink } from "./case-ui";
import { useTr } from "./tr";

export const pad = (n: number) => String(n).padStart(2, "0");

/** An outside link. With no URL yet it stays in place, marked "coming soon".
 * (`is-todo` stays as a hook for the pages still styled by the legacy `.dt` rules.) */
export function Ext({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { tr } = useTr();
  if (!href)
    return (
      <a
        className={cn(className, "is-todo", todoLink)}
        href="#"
        aria-disabled="true"
        title={tr("Coming soon")}
        onClick={(e) => e.preventDefault()}
      >
        {children}
      </a>
    );
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const chip = tv({
  slots: {
    root:
      "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-card border border-line-2 bg-transparent px-[14px] py-0 text-[14px] " +
      "[transition:background-color_0.2s,color_0.2s,border-color_0.2s]",
    count: "font-mono text-[11px] tabular-nums opacity-70",
    dot: "h-2 w-2 rounded-full bg-muted glass:bg-[color:var(--type-color,var(--muted))]",
  },
  variants: {
    kind: {
      // Frosted glass chip; its edge stays the glass edge when hovered or pressed.
      chip: { root: "glass-blur border-glass-edge shadow-glass" },
      pill: {
        root: "glass-blur min-h-9 gap-[7px] rounded-full border-glass-edge pr-[13px] pl-[11px] shadow-glass",
        dot: "glass:shadow-[0_0_6px_1px_color-mix(in_srgb,var(--type-color,#7a5cf0)_60%,transparent)]",
      },
      // Page tabs: marked by an underline rather than a filled block.
      tab: {
        root:
          "-mb-px min-h-[46px] flex-none rounded-none border-0 border-b-2 border-b-transparent px-[2px] text-[15px] text-muted " +
          "hover:border-b-line-2 hover:text-ink focus-visible:-outline-offset-2",
        count: "rounded-full bg-surface-2 px-[7px] py-px text-muted opacity-100",
      },
    },
    type: {
      none: "",
      all: "",
      fix: { root: "[--type-color:var(--fix)] [--type-ink:var(--fix-ink)]", dot: "bg-fix" },
      improvement: {
        root: "[--type-color:var(--improvement)] [--type-ink:var(--improvement-ink)]",
        dot: "bg-improvement",
      },
      idea: { root: "[--type-color:var(--idea)] [--type-ink:var(--idea-ink)]", dot: "bg-idea" },
    },
    pressed: { true: { root: "bg-accent-soft font-semibold text-ink" } },
  },
  compoundVariants: [
    { kind: "pill", pressed: true, class: { dot: "bg-current" } },
    {
      kind: "tab",
      pressed: true,
      class: {
        root: "border-b-accent bg-transparent text-ink hover:border-b-accent",
        count: "bg-accent-soft text-ink",
      },
    },
    {
      type: ["fix", "improvement", "idea"],
      pressed: true,
      class: {
        root:
          "bg-[color-mix(in_srgb,var(--type-color)_14%,transparent)] text-[color:var(--type-ink,var(--type-color))] " +
          "glass:border-[color-mix(in_srgb,var(--type-color)_45%,transparent)] glass:bg-[color-mix(in_srgb,var(--type-color)_12%,#ffffff)] " +
          "glass:shadow-[0_0_16px_-2px_color-mix(in_srgb,var(--type-color)_45%,transparent)]",
      },
    },
  ],
  defaultVariants: { kind: "chip", type: "none" },
});

export function Chip({
  pressed,
  onClick,
  pill,
  type,
  lead,
  count,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  pill?: boolean;
  type?: "tab" | "all" | "fix" | "improvement" | "idea";
  /** Number shown before the label (screen index). */
  lead?: string;
  /** Number shown after the label. */
  count?: number;
  children: ReactNode;
}) {
  const s = chip({
    kind: type === "tab" ? "tab" : pill ? "pill" : "chip",
    type: !type || type === "tab" ? "none" : type,
    pressed,
  });
  return (
    <button type="button" className={s.root()} aria-pressed={pressed} onClick={onClick}>
      {lead && <span className={s.count()}>{lead}</span>}
      {pill && <span className={s.dot()} />}
      {children}
      {count != null && <span className={s.count()}>{count}</span>}
    </button>
  );
}

export function Seg<T extends string>({
  label,
  labelledBy,
  value,
  options,
  onChange,
}: {
  label?: string;
  labelledBy?: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const s = seg();
  return (
    <div className={s.root()} role="group" aria-label={label} aria-labelledby={labelledBy}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={s.btn()}
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Track band ("Design track ——— 02 — 05"). */
export function Band({ label, nums, dev }: { label: string; nums: string; dev?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-y px-case py-[14px] font-mono text-[11.5px] tracking-[0.1em] uppercase",
        dev
          ? "border-dev-line text-dev-accent glass:border-t-0 glass:bg-[linear-gradient(90deg,rgba(47,95,216,0.08),rgba(47,95,216,0))] glass:before:-mr-1 glass:before:content-star"
          : "border-line text-accent",
      )}
    >
      <span>{label}</span>
      <span className="h-px flex-1 bg-current opacity-40" />
      <span>{nums}</span>
    </div>
  );
}

/** The wide "Explore … / Hide …" button that opens a collapsible block. */
export function ReportToggle({
  open,
  onToggle,
  controls,
  label,
  hint,
}: {
  open: boolean;
  onToggle: () => void;
  controls: string;
  label: string;
  hint: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      className={
        "group glass-blur flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 rounded-card border border-glass-edge bg-surface px-5 py-[14px] text-left text-ink shadow-glass " +
        "[transition:border-color_0.2s,background-color_0.2s] hover:border-accent aria-expanded:border-accent aria-expanded:bg-accent-soft"
      }
      aria-expanded={open}
      aria-controls={controls}
      onClick={() => {
        onToggle();
        // Collapsing a long block from below: bring the button back into view.
        if (open && ref.current && ref.current.getBoundingClientRect().top < 0)
          requestAnimationFrame(() => ref.current?.scrollIntoView({ block: "center" }));
      }}
    >
      <span className="flex flex-col gap-[2px]">
        <b className="text-[16px] font-semibold">{label}</b>
        <span className="text-[13.5px] text-muted">{hint}</span>
      </span>
      <span
        className={
          "h-[11px] w-[11px] flex-none border-r-2 border-b-2 border-accent [transform:rotate(45deg)_translate(-3px,-3px)] [transition:transform_0.25s] " +
          "group-aria-expanded:[transform:rotate(225deg)_translate(-3px,-3px)]"
        }
        aria-hidden="true"
      />
    </button>
  );
}

/* ---------------------------------------------------------------- lightbox */

type OpenShot = (src: string, alt: string) => void;
const LightboxCtx = createContext<OpenShot>(() => {});
export const useLightbox = () => useContext(LightboxCtx);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const { tr } = useTr();
  const ref = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback<OpenShot>((src, alt) => setShot({ src, alt }), []);

  useEffect(() => {
    const d = ref.current;
    if (!d || !shot) return;
    if (!d.open) d.showModal();
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [shot]);

  const close = () => {
    ref.current?.close();
    setShot(null);
  };

  return (
    <LightboxCtx.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        className={
          "glass-blur m-auto h-[calc(100dvh_-_32px)] max-h-none w-[min(1480px,100vw_-_32px)] max-w-none overflow-hidden rounded-card border border-line-2 bg-surface p-0 text-ink " +
          "backdrop:bg-[rgb(0_0_0/0.72)] open:flex open:flex-col glass:bg-[rgba(248,246,255,0.97)]"
        }
        aria-label={shot?.alt ?? ""}
        onClose={() => setShot(null)}
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-[14px] py-[10px]">
          <span className={monoLabel()}>{shot?.alt}</span>
          <button className={caseBtn()} type="button" onClick={close}>
            {tr("Close ✕")}
          </button>
        </div>
        <div className="flex-1 overflow-auto overscroll-contain bg-bg p-4" ref={bodyRef}>
          {shot && (
            <img className="mx-auto block h-auto max-w-full" src={shot.src} alt={shot.alt} />
          )}
        </div>
      </dialog>
    </LightboxCtx.Provider>
  );
}

/* ---------------------------------------------------------------- image slot */

/** A screenshot slot: striped until the image loads, click to view full size. */
export function Shot({
  img,
  dir,
  ext,
  alt,
  className,
}: {
  img: Img;
  /** Folder under /images/dtrpg, with a trailing slash. */
  dir: string;
  ext: string;
  alt: string;
  /** Background behind the image (replaces the stripes), e.g. "bg-none bg-[#f6f5f3]". */
  className?: string;
}) {
  const src = `${DT_IMG}/${dir}${img.name}${ext}`;
  // Tracks which src has loaded, so switching images shows the stripe until the new one arrives.
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;
  const lightbox = useLightbox();
  return (
    <div
      className={cn(
        "glass-blur relative max-w-full overflow-hidden rounded-card border border-line-2 shadow-glass",
        "bg-[repeating-linear-gradient(90deg,var(--ph-a)_0_3px,var(--ph-b)_3px_9px)]",
        loaded && "cursor-zoom-in",
        className,
      )}
      onClick={() => loaded && lightbox(src, alt)}
    >
      {/* Holds the frame's size until the image has loaded. */}
      <div className="w-full" style={loaded ? undefined : { aspectRatio: `${img.w} / ${img.h}` }}>
        <img
          className="block h-auto w-full max-w-full"
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoadedSrc(src)}
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0) setLoadedSrc(src);
          }}
        />
      </div>
    </div>
  );
}

/** Figure with caption and an Enlarge button around a Shot. */
export function Preview({
  kind,
  caption,
  shot,
  className,
}: {
  kind: string;
  caption: string;
  shot: { img: Img; dir: string; ext: string; alt: string; className?: string };
  className?: string;
}) {
  const { tr } = useTr();
  const lightbox = useLightbox();
  return (
    <figure className={cn("min-w-0", className)}>
      <Shot {...shot} />
      <figcaption className="mt-2 flex flex-wrap justify-between gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
        <b className="text-[10.5px] font-medium tracking-[0.08em] text-ink uppercase">{kind}</b>
        <span>{caption}</span>
        <button
          className="ml-auto cursor-pointer border-0 border-b border-line-2 bg-transparent p-0 text-ink hover:border-ink"
          type="button"
          onClick={() => lightbox(`${DT_IMG}/${shot.dir}${shot.img.name}${shot.ext}`, shot.alt)}
        >
          {tr("Enlarge ⤢")}
        </button>
      </figcaption>
    </figure>
  );
}
