// Global site settings. Edit `src/content/site.md` — no TS changes required.
import raw from "@/content/site.md?raw";
import { parseFrontmatter, renderMarkdown } from "./content";

export type SiteConfig = {
  name: string;
  tagline: string;
  logoText: string;
  logoImage?: string;
  favicon?: string;
  email: string;
  github?: string;
  assetStoreUrl: string;
  copyright: string;
  footerNote?: string;
  /** Body of site.md, rendered to HTML — used as the short blurb. */
  blurbHtml: string;
  blurb: string;
};

const parsed = parseFrontmatter(raw);
const f = parsed.data as Record<string, string>;
const str = (v: unknown, fallback = "") =>
  v === undefined || v === null || v === "" ? fallback : String(v);

export const SITE: SiteConfig = {
  name: str(f.name, "laplahce"),
  tagline: str(f.tagline, "Unity Asset Store developer"),
  logoText: str(f.logoText, "L"),
  logoImage: str(f.logoImage) || undefined,
  favicon: str(f.favicon) || undefined,
  email: str(f.email, "hello@laplahce.dev"),
  github: str(f.github) || undefined,
  assetStoreUrl: str(f.assetStoreUrl, "https://assetstore.unity.com"),
  copyright: str(f.copyright, "© {year} laplahce").replace(
    "{year}",
    String(new Date().getFullYear()),
  ),
  footerNote: str(f.footerNote) || undefined,
  blurbHtml: renderMarkdown(parsed.content),
  blurb: parsed.content.trim().replace(/\s+/g, " "),
};
