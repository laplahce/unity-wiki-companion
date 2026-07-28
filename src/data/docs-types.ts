import type { PublishStatus } from "@/components/status-badge";

export type { PublishStatus };

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
  status?: PublishStatus;
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
};