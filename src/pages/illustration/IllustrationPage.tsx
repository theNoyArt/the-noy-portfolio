import type { CSSProperties } from "react";
import {
  ILLU_IMG,
  ILLUSTRATION,
  ILLUSTRATION_ROWS,
  ILLUSTRATIONS,
  LAYOUT_SPREADS,
  LAYOUT_TITLE,
  imagesLabel,
  thumbWidth,
  type IllustrationItem,
  type LayoutSpread,
} from "../../content/illustration";
import { useI18n } from "../../lib/i18n";
import { useEmailLink } from "../../lib/useEmailLink";
import { monoLabel, section, sectionDesc, sectionHead, sectionTitle } from "../../styles/recipes";
import { caseBtn } from "../dtrpg/case-ui";
import { LightboxProvider, useLightbox } from "../dtrpg/ui";

const full = (name: string) => `${ILLU_IMG}/${name}.webp`;
const thumb = (name: string) => `${ILLU_IMG}/${name}-thumb.webp`;
const byName = new Map(ILLUSTRATIONS.map((x) => [x.image, x]));

/* Rendered width for `sizes`. Content = main column minus the page gutter (px-page), capped at
   --wrap (1360px); the 240px sidebar shows from 900px. GAP matches the rows' gap-5. */
const GAP = 20;
const GUTTER = "clamp(16px, 3.5vw, 56px)";
const CONTENT_MID = `100vw - 2 * ${GUTTER}`;
const CONTENT_WIDE = `min(100vw - 240px - 2 * ${GUTTER}, 1360px)`;

/** `sizes` for an image taking `share` of a row of `n` images (after the gaps); one column below 640px. */
function sizesFor(share: number, n: number) {
  const gaps = (n - 1) * GAP;
  const f = share.toFixed(4);
  return (
    `(max-width: 639px) calc(${CONTENT_MID}), ` +
    `(max-width: 899px) calc((${CONTENT_MID} - ${gaps}px) * ${f}), ` +
    `calc((${CONTENT_WIDE} - ${gaps}px) * ${f})`
  );
}
/** /illustration: RPG book art and my own characters, each opening full size in the lightbox. */
export function IllustrationPage() {
  const { t, L } = useI18n();
  const mail = useEmailLink();

  return (
    <LightboxProvider>
      <section className={section({ class: "border-t-0" })} aria-labelledby="illu-title">
        <div className={sectionHead({ wide: true })}>
          <span className={monoLabel({ head: true })}>theNoyArt</span>
          <h1 id="illu-title" className={sectionTitle()}>
            {L(ILLUSTRATION.title)}
          </h1>
          <p className={sectionDesc()}>{L(ILLUSTRATION.description)}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              className={caseBtn({ variant: "primary" })}
              href={ILLUSTRATION.artstation}
              target="_blank"
              rel="noopener noreferrer"
            >
              ArtStation ↗
            </a>
            <a className={caseBtn()} href={mail.href} title={mail.title} onClick={mail.onClick}>
              <span aria-live="polite">{mail.copied ? t.emailCopied : t.emailMe}</span>
            </a>
          </div>
        </div>

        {/* Justified rows from 640px: flex: <ratio> 1 0 gives every image in a row the same height,
            and the row fills the content width. Below 640px, one column at natural ratio. */}
        <div className="flex flex-col gap-10">
          {ILLUSTRATION_ROWS.map((row) => {
            const items = row.map((name) => byName.get(name)!);
            const sum = items.reduce((a, x) => a + x.w / x.h, 0);
            return (
              <ul
                key={row.join()}
                className="m-0 flex list-none flex-col gap-10 p-0 min-[640px]:flex-row min-[640px]:items-start min-[640px]:gap-5"
              >
                {items.map((item) => (
                  <Work
                    key={item.image}
                    item={item}
                    sizes={sizesFor(item.w / item.h / sum, row.length)}
                  />
                ))}
              </ul>
            );
          })}
        </div>

        {LAYOUT_SPREADS.length > 0 && <Spreads spreads={LAYOUT_SPREADS} />}

        <p className="m-0 border-t border-line pt-4 text-[13px] text-muted">
          {L(ILLUSTRATION.note)}
        </p>
      </section>
    </LightboxProvider>
  );
}

/** A row item: flex-grow is its aspect ratio from 640px (set through --r), full width below. */
const rowItem = "flex min-w-0 flex-col gap-3 min-[640px]:[flex:var(--r)_1_0]";

/** The work itself, at its own ratio: no frame, padding or background, nothing cropped. */
function Picture({
  name,
  w,
  h,
  alt,
  sizes,
  onOpen,
}: {
  name: string;
  w: number;
  h: number;
  alt: string;
  sizes: string;
  onOpen: () => void;
}) {
  const { L } = useI18n();
  return (
    <button
      type="button"
      className="block w-full cursor-zoom-in rounded-card-sm border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      onClick={onOpen}
      title={L(ILLUSTRATION.open)}
    >
      <img
        className="block h-auto w-full rounded-card-sm"
        src={thumb(name)}
        srcSet={`${thumb(name)} ${thumbWidth(w, h)}w, ${full(name)} ${w}w`}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </button>
  );
}

function Work({ item, sizes }: { item: IllustrationItem; sizes: string }) {
  const { L } = useI18n();
  const lightbox = useLightbox();
  const title = L(item.title);
  const set = item.set?.map((s) => ({ src: full(s.image), alt: L(s.alt) }));

  return (
    <li className={rowItem} style={{ "--r": item.w / item.h } as CSSProperties}>
      <Picture
        name={item.image}
        w={item.w}
        h={item.h}
        alt={L(item.alt)}
        sizes={sizes}
        onOpen={() =>
          lightbox(set?.[0]?.src ?? full(item.image), set?.[0]?.alt ?? L(item.alt), {
            label: title,
            set,
            fit: true,
          })
        }
      />
      <div className="flex flex-col gap-1">
        <h2 className="display m-0 flex flex-wrap items-baseline gap-x-[10px] text-[22px] leading-[1.15]">
          {title}
          {item.set && (
            <span className="font-mono text-[11px] font-normal tracking-[0.06em] text-accent uppercase">
              {L(imagesLabel(item.set.length))}
            </span>
          )}
        </h2>
        <p className="m-0 text-[14px] leading-[1.5] text-muted">{L(item.meta)}</p>
      </div>
    </li>
  );
}

/** Publication layout spreads, one per row at full width; rendered only once LAYOUT_SPREADS has items. */
function Spreads({ spreads }: { spreads: LayoutSpread[] }) {
  const { L } = useI18n();
  const lightbox = useLightbox();
  return (
    <div className="flex flex-col gap-6 border-t border-line pt-10">
      <h2 className="display m-0 text-[clamp(28px,3cqi,44px)] leading-none">{L(LAYOUT_TITLE)}</h2>
      <ul className="m-0 flex list-none flex-col gap-10 p-0">
        {spreads.map((sp) => (
          <li key={sp.image} className="flex min-w-0 flex-col gap-3">
            <Picture
              name={sp.image}
              w={sp.w}
              h={sp.h}
              alt={L(sp.alt)}
              sizes={sizesFor(1, 1)}
              onOpen={() => lightbox(full(sp.image), L(sp.alt), { label: L(sp.title), fit: true })}
            />
            <div className="flex flex-col gap-1">
              <h3 className="display m-0 text-[20px] leading-[1.15]">{L(sp.title)}</h3>
              <p className="m-0 text-[14px] leading-[1.5] text-muted">{L(sp.caption)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
