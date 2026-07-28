// Content loader: turns the markdown files under `src/content/packages/<slug>/`
// into the `PACKAGES` array consumed by the rest of the app.
//
// Goal: editing content should never require a TS change. Drop a folder with
// `_package.md` to add a package, drop a `NN-slug.md` to add a page, edit any
// `.md` to change copy. The design layer below is untouched.

import { marked } from "marked";
import type {
  Compatibility,
  DocPackage,
  DocPage,
  DocPageKind,
  GuideStep,
  PageHighlight,
  PublishStatus,
} from "./docs-types";

marked.setOptions({ gfm: true, breaks: false });

// Eagerly load every markdown file in the content tree as a raw string.
const RAW = import.meta.glob("/src/content/packages/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

type PackageFront = {
  name: string;
  tagline: string;
  category: string;
  color?: string;
  label?: string;
  status?: PublishStatus;
  reviewUrl?: string;
  demoUrl?: string;
  trailerUrl?: string;
  infobox?: { label: string; value: string }[];
  references?: { id: string; text: string; url?: string }[];
};

type PageFront = {
  title: string;
  slug?: string;
  emphasized?: boolean;
  highlight?: PageHighlight;
  status?: PublishStatus;
  kind?: DocPageKind;
  guide?: GuideStep[];
  compatibility?: Compatibility;
};

// Minimal frontmatter parser — supports the YAML-ish subset we actually use:
//   scalars, quoted strings, booleans, numbers, flow lists/maps, block lists
//   of scalars or flow maps. Avoids gray-matter so we don't pull Node's Buffer
//   into the browser bundle.
function parseScalar(v: string): unknown {
  const s = v.trim();
  if (s === "") return "";
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null") return null;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
  return s;
}

function parseFlow(input: string): unknown {
  // Naive JSON-ish flow parser: convert YAML flow to JSON then JSON.parse.
  // Handles {a: b, c: "d"} and [1, 2, "x"] forms used in frontmatter.
  const s = input.trim();
  if (!s) return s;
  const json = s
    // quote bare keys: { foo: ... -> { "foo": ...
    .replace(/([{,]\s*)([A-Za-z_][\w-]*)\s*:/g, '$1"$2":')
    // single-quoted -> double-quoted strings
    .replace(/'([^']*)'/g, '"$1"');
  try {
    return JSON.parse(json);
  } catch {
    return s;
  }
}

function parseFrontmatter(src: string): { data: Record<string, unknown>; content: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: src };
  const body = m[2];
  const lines = m[1].split(/\r?\n/);
  const data: Record<string, unknown> = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!kv) {
      i++;
      continue;
    }
    const key = kv[1];
    const rest = kv[2];
    if (rest.trim() === "") {
      // block list of "  - <flow or scalar>"
      const items: unknown[] = [];
      i++;
      while (i < lines.length && /^\s+-\s/.test(lines[i])) {
        const item = lines[i].replace(/^\s+-\s/, "");
        items.push(item.startsWith("{") || item.startsWith("[") ? parseFlow(item) : parseScalar(item));
        i++;
      }
      data[key] = items;
      continue;
    }
    if (rest.startsWith("{") || rest.startsWith("[")) {
      data[key] = parseFlow(rest);
    } else {
      data[key] = parseScalar(rest);
    }
    i++;
  }
  return { data, content: body };
}

function render(md: string): string {
  return marked.parse(md.trim(), { async: false }) as string;
}

function slugFromFilename(file: string): string {
  // e.g. "01-installation.md" -> "installation"
  const base = file.replace(/\.md$/, "");
  return base.replace(/^\d+[-_]/, "");
}

function orderFromFilename(file: string): number {
  const m = file.match(/^(\d+)[-_]/);
  return m ? parseInt(m[1], 10) : 999;
}

// ---------------- Build the package list ----------------
//
// Every documentation page is its own markdown file inside the package folder.
// The `NN-` filename prefix decides sidebar order; the `kind:` frontmatter
// field marks the special pages:
//
//   kind: overview      -> the package landing / home doc page
//   kind: installation  -> the "start here" page (gets the first-read banner)
//   kind: faq           -> rendered as fold-out question cards
//   kind: demo          -> links out to the dedicated demo page
//
// `_package.md` holds package metadata only.

type RawEntry = { pkg: string; file: string; raw: string };

function loadEntries(): RawEntry[] {
  return Object.entries(RAW).map(([path, raw]) => {
    const rel = path.replace("/src/content/packages/", "");
    const [pkg, file] = rel.split("/");
    return { pkg, file, raw };
  });
}

function buildPackages(): DocPackage[] {
  const entries = loadEntries();
  const byPkg = new Map<string, RawEntry[]>();
  for (const e of entries) {
    if (!byPkg.has(e.pkg)) byPkg.set(e.pkg, []);
    byPkg.get(e.pkg)!.push(e);
  }

  const packages: DocPackage[] = [];

  for (const [slug, files] of byPkg) {
    const meta = files.find((f) => f.file === "_package.md");
    if (!meta) continue;

    const front = parseFrontmatter(meta.raw).data as PackageFront;

    const pageFiles = files
      .filter((f) => f.file !== "_package.md")
      .sort((a, b) => orderFromFilename(a.file) - orderFromFilename(b.file));

    const pages: DocPage[] = pageFiles.map((f) => {
      const p = parseFrontmatter(f.raw);
      const fm = p.data as PageFront;
      const kind = fm.kind;
      const pageSlug = fm.slug ?? (kind === "overview" ? "overview" : slugFromFilename(f.file));
      return {
        slug: pageSlug,
        title: fm.title ?? pageSlug,
        html: render(p.content),
        kind,
        // Only the installation page is ever the "recommended first read".
        emphasized: kind === "installation" ? true : undefined,
        status: fm.status,
        guide: fm.guide,
      };
    });

    // The overview page always leads the sidebar.
    const overviewIdx = pages.findIndex((p) => p.kind === "overview" || p.slug === "overview");
    if (overviewIdx > 0) pages.unshift(pages.splice(overviewIdx, 1)[0]);
    if (overviewIdx === -1) {
      pages.unshift({
        slug: "overview",
        title: "Overview",
        kind: "overview",
        html: `<p>${front.tagline ?? ""}</p>`,
      });
    }

    const infoboxFields = [
      { label: "Category", value: front.category },
      ...(front.infobox ?? []),
    ];

    packages.push({
      slug,
      name: front.name,
      tagline: front.tagline,
      category: front.category,
      color: front.color ?? "#7b5cff",
      label: front.label ?? front.name,
      infoboxFields,
      pages,
      references: front.references ?? [],
      demoUrl: front.demoUrl,
      reviewUrl: front.reviewUrl,
      trailerUrl: front.trailerUrl,
      status: front.status,
    });
  }

  return packages.sort((a, b) => a.name.localeCompare(b.name));
}

export const PACKAGES: DocPackage[] = buildPackages();

export function getPackage(slug: string): DocPackage | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function getPackagePage(
  pkg: DocPackage,
  slug: string,
): DocPage | undefined {
  return pkg.pages.find((p) => p.slug === slug);
}