import type { PublishStatus } from "@/components/status-badge";
import type { PageHighlight } from "@/components/page-highlight";

export type { PublishStatus, PageHighlight };

export type DocPageKind = "overview" | "installation" | "faq" | "demo";

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
};

// Declared in the overview page's frontmatter under `compatibility:`.
export type Compatibility = {
  unity?: string;
  pipelines?: string[];
  platforms?: string[];
  // Free-form exceptions, e.g. "Android + Built-In on 2022 is unsupported".
  notes?: string[];
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
  reviewUrl?: string;
  trailerUrl?: string;
  status?: PublishStatus;
  compatibility?: Compatibility;
};