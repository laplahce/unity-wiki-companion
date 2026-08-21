// Global site settings. Edit `src/content/site.md` - no TS changes required.
import raw from "@/content/site.md?raw";
import { parseFrontmatter, renderMarkdown } from "./content";

export type SocialLink = {
  name: string;
  url: string;
  /** Optional image path (e.g. "/content/socials/itch.svg"). Falls back to a built-in icon. */
  icon?: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  logoText: string;
  logoImage?: string;
  logoImageDark?: string;
  favicon?: string;
  email: string;
  patreonUrl?: string;
  github?: string;
  trailerUrl?: string;
  assetStoreUrl: string;
  copyright: string;
  footerNote?: string;
  socials: SocialLink[];
  /** Body of site.md, rendered to HTML - used as the short blurb. */
  blurbHtml: string;
  blurb: string;
};

const parsed = parseFrontmatter(raw);
const f = parsed.data as Record<string, unknown>;
const str = (v: unknown, fallback = "") =>
  v === undefined || v === null || v === "" ? fallback : String(v);

function parseSocials(raw: unknown): SocialLink[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      name: str((item as Record<string, unknown>).name),
      url: str((item as Record<string, unknown>).url),
      icon: str((item as Record<string, unknown>).icon) || undefined,
    }))
    .filter((s) => s.name && s.url);
}

export const SITE: SiteConfig = {
  name: str(f.name, "laplahce"),
  tagline: str(f.tagline, "Unity Asset Store developer"),
  logoText: str(f.logoText, "L"),
  logoImage: str(f.logoImage) || undefined,
  logoImageDark: str(f.logoImageDark) || undefined,
  favicon: str(f.favicon) || undefined,
  email: str(f.email, "hello@laplahce.dev"),
  patreonUrl: str(f.patreonUrl) || undefined,
  github: str(f.github) || undefined,
  trailerUrl: str(f.trailerUrl) || undefined,
  assetStoreUrl: str(f.assetStoreUrl, "https://assetstore.unity.com"),
  copyright: str(f.copyright, "© {year} laplahce").replace("{year}", "2026"),
  footerNote: str(f.footerNote) || undefined,
  socials: parseSocials(f.socials),
  blurbHtml: renderMarkdown(parsed.content),
  blurb: parsed.content.trim().replace(/\s+/g, " "),
};
