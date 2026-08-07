import type { PublishStatus } from "@/components/status-badge";
import type { PageHighlight } from "@/components/page-highlight";

export type { PublishStatus, PageHighlight };

export type DocPageKind =
  | "overview"
  | "installation"
  | "faq"
  | "demo"
  | "changelog"
  | "compatibility";

export type GuideStep = {
  title: string;
  caption: string;
  gif?: string;
};

export type DocPage = {
  slug: string;
  title: string;
  html: string;
  kind?: DocPageKind;
  guide?: GuideStep[];
  emphasized?: boolean;
  highlight?: PageHighlight;
  status?: PublishStatus;
  // ISO date string from the page's `updated:` frontmatter field.
  updated?: string;
};

// Declared in the overview page's frontmatter under `compatibility:`.
export type Compatibility = {
  unity?: string;
  pipelines?: string[];
  platforms?: string[];
  // Free-form exceptions, e.g. "Android + Built-In on 2022 is unsupported".
  notes?: string[];
};

// Declared in `_package.md` under `media:` - key/value pairs of image or video
// URLs used across the cards, hero and gallery.
export type PackageMedia = {
  banner?: string;
  bannerVideo?: string;
  icon?: string;
  screenshots?: string[];
  extra?: Record<string, string[]>;
};

export type DocPackage = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  color: string;
  label: string;
  infoboxFields: { label: string; value: string }[];
  pages: DocPage[];
  references: { id: string; text: string; url?: string }[];
  demoUrl?: string;
  highlights?: string[];
  demoExternalUrl?: string;
  // Short intro text shown on the package's demo page. Set via `demoNote:` in `_package.md`.
  demoNote?: string;
  reviewUrl?: string;
  assetStoreUrl?: string;
  trailerUrl?: string;
  media?: PackageMedia;
  // Small square icon, used on the "All packages" list. Set via `icon:` in `_package.md`.
  icon?: string;
  status?: PublishStatus;
  compatibility?: Compatibility;
};
