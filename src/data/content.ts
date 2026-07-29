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
  updated?: string;
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

const indentOf = (line: string) => line.match(/^\s*/)![0].length;

// Parses an indented block of `key: value` pairs. Values can be scalars, flow
// lists/maps, block lists of scalars/flow maps, or a nested indented map.
function parseBlock(
  lines: string[],
  start: number,
  indent: number,
): { data: Record<string, unknown>; next: number } {
  const data: Record<string, unknown> = {};
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    if (indentOf(line) < indent) break;
    const kv = line.trim().match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!kv) {
      i++;
      continue;
    }
    const key = kv[1];
    const rest = kv[2].trim();
    if (rest === "") {
      i++;
      // Look ahead: block list, nested map, or empty value.
      const nextLine = lines.slice(i).find((l) => l.trim() && !l.trim().startsWith("#"));
      if (nextLine && /^\s*-\s/.test(nextLine) && indentOf(nextLine) > indent) {
        const items: unknown[] = [];
        while (i < lines.length && /^\s*-\s/.test(lines[i]) && indentOf(lines[i]) > indent) {
          const item = lines[i].trim().replace(/^-\s*/, "");
          items.push(
            item.startsWith("{") || item.startsWith("[") ? parseFlow(item) : parseScalar(item),
          );
          i++;
        }
        data[key] = items;
      } else if (nextLine && indentOf(nextLine) > indent) {
        const nested = parseBlock(lines, i, indentOf(nextLine));
        data[key] = nested.data;
        i = nested.next;
      } else {
        data[key] = "";
      }
      continue;
    }
    data[key] =
      rest.startsWith("{") || rest.startsWith("[") ? parseFlow(rest) : parseScalar(rest);
    i++;
  }
  return { data, next: i };
}

function parseFrontmatter(src: string): { data: Record<string, unknown>; content: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: src };
  return { data: parseBlock(m[1].split(/\r?\n/), 0, 0).data, content: m[2] };
}

// Inline YouTube embeds. Write anywhere in a markdown file, on its own line:
//
//   ::youtube{id=dQw4w9WgXcQ caption="Feature trailer"}
//   ::youtube{url=https://youtu.be/dQw4w9WgXcQ}
//   ::youtube{caption="Coming soon"}   -> renders a "video doesn't exist" card
//
function youtubeId(raw: string): string | undefined {
  const s = raw.trim().replace(/^["']|["']$/g, "");
  if (!s) return undefined;
  if (/^[\w-]{6,}$/.test(s)) return s;
  const m =
    s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{6,})/) ?? null;
  return m ? m[1] : undefined;
}

function parseAttrs(body: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([A-Za-z_][\w-]*)\s*=\s*("[^"]*"|'[^']*'|[^\s}]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    attrs[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return attrs;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderYoutube(body: string): string {
  const attrs = parseAttrs(body);
  const id = youtubeId(attrs.id ?? attrs.url ?? attrs.src ?? "");
  const caption = attrs.caption ?? attrs.title ?? "";
  if (!id) {
    return `<figure class="video-placeholder" data-caption="${esc(
      caption || "This video doesn’t exist yet.",
    )}"></figure>`;
  }
  return `<figure class="video-embed">
  <div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(
    id,
  )}" title="${esc(caption || "YouTube video")}" loading="lazy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}
</figure>`;
}

function expandDirectives(md: string): string {
  return md.replace(/^[ \t]*::youtube\{([^}]*)\}[ \t]*$/gim, (_m, body: string) =>
    renderYoutube(body),
  );
}

function render(md: string): string {
  return marked.parse(expandDirectives(md.trim()), { async: false }) as string;
}

// ---------------- Changelog rendering (`kind: changelog`) ----------------
//
// Write releases as level-2 headings, then one bullet per change:
//
//   ## 2.4.0 — 2026-07-20 (latest)
//   - added: New comic impact effects
//   - fixed: Editor preview flicker
//
// Supported change types: added, changed, fixed, improved, deprecated,
// removed, breaking. Anything before the first heading renders as intro copy.

const CHANGE_TYPES = [
  "added",
  "changed",
  "fixed",
  "improved",
  "deprecated",
  "removed",
  "breaking",
];

function inline(md: string): string {
  return (marked.parseInline(md.trim(), { async: false }) as string) ?? "";
}

function renderRelease(heading: string, body: string): string {
  // "2.4.0 — 2026-07-20 (latest)"
  const latest = /\(latest\)/i.test(heading);
  const head = heading.replace(/\(latest\)/i, "").trim();
  const parts = head.split(/\s+[—–-]\s+/);
  const version = parts[0]?.trim() ?? head;
  const date = parts.slice(1).join(" — ").trim();

  const rows = body
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => /^[-*]\s+/.test(l))
    .map((l) => {
      const text = l.replace(/^[-*]\s+/, "");
      const m = text.match(/^([A-Za-z]+)\s*:\s*(.*)$/);
      const type = m && CHANGE_TYPES.includes(m[1].toLowerCase()) ? m[1].toLowerCase() : "changed";
      const desc = m && CHANGE_TYPES.includes(m[1].toLowerCase()) ? m[2] : text;
      return `<tr><td><span class="changelog-type changelog-type-${type}">${esc(
        type,
      )}</span></td><td>${inline(desc)}</td></tr>`;
    })
    .join("\n");

  const notes = body
    .split(/\r?\n/)
    .filter((l) => l.trim() && !/^\s*[-*]\s+/.test(l))
    .join("\n");

  return `<section class="release">
  <header class="release-head">
    <h2 id="${esc(version.toLowerCase().replace(/[^\w.]+/g, "-"))}" class="release-version">${esc(
      version,
    )}</h2>
    ${latest ? '<span class="badge-latest">Latest</span>' : ""}
    ${date ? `<span class="release-date">${esc(date)}</span>` : ""}
  </header>
  ${notes ? `<div class="release-notes">${render(notes)}</div>` : ""}
  ${rows ? `<table class="release-table"><tbody>${rows}</tbody></table>` : ""}
</section>`;
}

function renderChangelog(md: string): string {
  const src = md.trim();
  const sections = src.split(/^##\s+/m);
  const intro = sections.shift() ?? "";
  const out = sections.map((sec) => {
    const nl = sec.indexOf("\n");
    const heading = nl === -1 ? sec : sec.slice(0, nl);
    const body = nl === -1 ? "" : sec.slice(nl + 1);
    return renderRelease(heading, body);
  });
  return `${intro.trim() ? render(intro) : ""}<div class="changelog">${out.join("\n")}</div>`;
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

    let compatibility: Compatibility | undefined;

    const pages: DocPage[] = pageFiles.map((f) => {
      const p = parseFrontmatter(f.raw);
      const fm = p.data as PageFront;
      const kind = fm.kind;
      const pageSlug = fm.slug ?? (kind === "overview" ? "overview" : slugFromFilename(f.file));
      if (kind === "overview" && fm.compatibility) compatibility = fm.compatibility;
      // `highlight:` in the frontmatter marks a special page; the installation
      // page defaults to "start here" without needing the field.
      const highlight: PageHighlight | undefined =
        fm.highlight ?? (kind === "installation" ? "start-here" : undefined);
      return {
        slug: pageSlug,
        title: fm.title ?? pageSlug,
        html: kind === "changelog" ? renderChangelog(p.content) : render(p.content),
        kind,
        highlight,
        // Only the installation page is ever the "recommended first read".
        emphasized: highlight === "start-here" ? true : undefined,
        status: fm.status,
        guide: fm.guide,
        updated: fm.updated ? String(fm.updated) : undefined,
      };
    });

    // The overview page always leads the sidebar.
    const overviewIdx = pages.findIndex((p) => p.kind === "overview" || p.slug === "overview");

    // Only one page can ever be the "start here" read — the installation page
    // wins, otherwise the first one that declared it.
    const startHere =
      pages.find((p) => p.kind === "installation" && p.highlight === "start-here") ??
      pages.find((p) => p.highlight === "start-here");
    for (const p of pages) {
      if (p.highlight === "start-here" && p !== startHere) {
        p.highlight = undefined;
        p.emphasized = undefined;
      }
    }
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
      compatibility,
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