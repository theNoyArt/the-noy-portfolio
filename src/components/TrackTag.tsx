import type { Track } from "../content/types";
import { useI18n } from "../lib/i18n";
import { trackTag } from "../styles/recipes";

/** Small "Design" / "Build" label. */
export function TrackTag({ track }: { track: Track }) {
  const { t } = useI18n();
  return (
    <span className={trackTag({ track })}>
      {track === "ux" ? t.designTag : t.buildTag}
    </span>
  );
}
