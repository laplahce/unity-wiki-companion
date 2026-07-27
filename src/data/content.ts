// Content loader: turns the markdown files under `src/content/packages/<slug>/`
// into the `PACKAGES` array consumed by the rest of the app.
//
// Goal: editing content should never require a TS change. Drop a folder with
// `_package.md` to add a package, drop a `NN-slug.md` to add a page, edit any
// `.md` to change copy. The design layer below is untouched.

import { marked } from "marked";
import type { DocPackage, DocPage, GuideStep, PublishStatus } from "./docs-types";

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
  status?: PublishStatus;
  kind?: "demo";
  guide?: GuideStep[];
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

// ---------------- Standard placeholder pages ----------------
// These are appended to every package automatically so the docs feel complete
// even before any per-page markdown is authored. Authoring a real
// `<slug>.md` for any of these overrides the placeholder entirely.

const STANDARD_ORDER = [
  "installation",
  "getting-started",
  "configuration",
  "examples",
  "api-reference",
  "troubleshooting",
  "changelog",
  "faq",
] as const;

// Canonical navigation order. Every package's sidebar follows this shape so
// the same "type" of page (installation, changelog, faq…) always lives in the
// same slot across packages. User-authored pages fall into the GUIDES slot,
// keeping their declared numeric order.
const CANONICAL_ORDER = [
  "overview",
  "installation",
  "getting-started",
  "__user__",
  "configuration",
  "examples",
  "api-reference",
  "troubleshooting",
  "changelog",
  "faq",
  "try-demo",
] as const;

function standardPage(slug: string, name: string, reviewUrl?: string): DocPage {
  const note = `<p class="text-muted-foreground"><i>This page is a placeholder. Detailed ${name} documentation is coming soon.</i></p>`;
  const buy = reviewUrl
    ? `<p class="not-prose my-4 text-sm text-muted-foreground">Don't own ${name}? <a href="${reviewUrl}" target="_blank" rel="noopener noreferrer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80">Get it on the Unity Asset Store &rarr;</a></p>`
    : "";

  const body: Record<string, string> = {
    installation: `${note}${buy}
<h2>Requirements</h2><p>Make sure your project meets the minimum Unity version listed in the overview infobox before installing ${name}.</p>
<h2>Install via Package Manager</h2><ol><li>Open <b>Window → Package Manager</b>.</li><li>Import the ${name} package.</li><li>Wait for Unity to recompile and check the Console.</li></ol>
<h2>Updating</h2><p>Remove the existing ${name} folder before re-importing a new version to avoid stale files.</p>`,
    "getting-started": `${note}<h2>Your first steps</h2><p>A minimal ${name} walkthrough will live here.</p>`,
    configuration: `${note}<h2>Settings</h2><p>${name} settings live under <b>Project Settings → ${name}</b>.</p>`,
    examples: `${note}<h2>Sample projects</h2><p>Hands-on ${name} examples will be added here.</p>`,
    "api-reference": `${note}<h2>Public API</h2><p>A breakdown of ${name}'s public types and methods will live here.</p>`,
    troubleshooting: `${note}<h2>Common issues</h2><p>Solutions to frequently reported ${name} problems.</p>`,
    changelog: `${note}<h2>Release history</h2><p>${name} release notes will be listed here as versions ship.</p>`,
    faq: `${note}<h2>Frequently asked questions</h2><p>Short answers about ${name}. If yours isn't here, the <a href="/contact">contact page</a> is the fastest way to reach me.</p>`,
  };

  const titles: Record<string, string> = {
    installation: "Installation",
    "getting-started": "Getting started",
    configuration: "Configuration",
    examples: "Examples",
    "api-reference": "API reference",
    troubleshooting: "Troubleshooting",
    changelog: "Changelog",
    faq: "FAQ",
  };

  return {
    slug,
    title: titles[slug],
    html: body[slug],
    emphasized: slug === "installation" ? true : undefined,
  };
}

function installGuide(name: string): GuideStep[] {
  return [
    { title: "Open the Package Manager", caption: `In Unity, go to Window → Package Manager to manage ${name}.` },
    { title: `Import ${name}`, caption: `Select the ${name} package and click Import.` },
    { title: "Confirm the import", caption: "Review the file list and confirm." },
    { title: "Verify the installation", caption: "Check the Console for a clean compile." },
  ];
}

function demoPage(name: string): DocPage {
  return {
    slug: "try-demo",
    title: "Try the demo",
    kind: "demo",
    html: `<p>Play an interactive WebGL demo of <b>${name}</b> right in your browser — no install required.</p>`,
  };
}

// ---------------- Build the package list ----------------

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

    const parsed = parseFrontmatter(meta.raw);
    const front = parsed.data as PackageFront;
    const overviewHtml = render(parsed.content);

    const overview: DocPage = { slug: "overview", title: "Overview", html: overviewHtml };
    const demo = demoPage(front.name);

    // User-authored pages (anything other than _package.md).
    const userFiles = files
      .filter((f) => f.file !== "_package.md")
      .sort((a, b) => orderFromFilename(a.file) - orderFromFilename(b.file));

    const userPages: DocPage[] = userFiles.map((f) => {
      const p = parseFrontmatter(f.raw);
      const fm = p.data as PageFront;
      const pageSlug = fm.slug ?? slugFromFilename(f.file);
      return {
        slug: pageSlug,
        title: fm.title,
        html: render(p.content),
        // Only the installation page is ever the "recommended first read",
        // so there can never be two emphasized pages in a package.
        emphasized: pageSlug === "installation" ? true : undefined,
        status: fm.status,
        kind: fm.kind,
        guide: fm.guide,
      };
    });

    // Index user pages by slug so a user file can override any standard slot
    // (e.g. authoring a real installation.md replaces the placeholder).
    const userBySlug = new Map(userPages.map((p) => [p.slug, p]));
    const standardSlugs = new Set<string>(STANDARD_ORDER);

    const orderedPages: DocPage[] = [];
    for (const slot of CANONICAL_ORDER) {
      if (slot === "overview") {
        orderedPages.push(overview);
      } else if (slot === "try-demo") {
        orderedPages.push(userBySlug.get("try-demo") ?? demo);
        userBySlug.delete("try-demo");
      } else if (slot === "__user__") {
        // Any user-authored page whose slug isn't a canonical standard slot.
        for (const p of userPages) {
          if (!standardSlugs.has(p.slug) && p.slug !== "try-demo") {
            orderedPages.push(p);
            userBySlug.delete(p.slug);
          }
        }
      } else {
        const override = userBySlug.get(slot);
        if (override) {
          orderedPages.push(override);
          userBySlug.delete(slot);
        } else {
          orderedPages.push(standardPage(slot, front.name, front.reviewUrl));
        }
      }
    }

    const allPages: DocPage[] = orderedPages.map((p) => ({
      ...p,
      guide:
        p.guide ?? (p.slug === "installation" ? installGuide(front.name) : undefined),
    }));

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
      pages: allPages,
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