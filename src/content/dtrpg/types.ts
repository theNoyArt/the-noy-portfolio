/** Content types for the DriveThruRPG case study (src/pages/dtrpg). */

export type AuditType = "fix" | "improvement" | "idea";

export interface AuditPage {
  id: string;
  label: string;
  /** First sentence is the verdict; the rest become the bullet points. */
  summary: string;
}

export interface AuditItem {
  /** AuditPage id. */
  p: string;
  t: AuditType;
  title: string;
  /** Issue + fix pair, or an empty issue with the text in body. */
  issue: string;
  fix: string;
  body: string;
}

export interface Step {
  n: number;
  t: string;
  d: string;
}

/** An image in /public/images/dtrpg, without extension, with its pixel size. */
export interface Img {
  name: string;
  w: number;
  h: number;
}

export interface Wireframe {
  id: string;
  label: string;
  url: string;
  insp: string;
  desktop: Step[];
  mobile: Step[];
  /** Desktop states; the first is the default. */
  dimgs: Img[];
  mimg: Img;
}

export interface Note {
  t: string;
  d: string;
  /** 1 = only applies when signed in. */
  state?: number;
}

export interface Mockup {
  id: string;
  label: string;
  sub: string;
  url: string;
  desktop: (Img & { label: string })[];
  mobile: (Img & { label: string })[];
  dnotes: Note[];
  mnotes: Note[];
  /** States the mockups don't show yet. */
  extra: Note[];
}

export interface DsTheme {
  label: string;
  tokens: Record<string, string>;
  notes: Record<string, string>;
  contrast: number[];
}

export interface DsGroup {
  label: string;
  keys: string[];
}
