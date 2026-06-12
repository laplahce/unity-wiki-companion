// Documentation data model: each package has multiple doc pages,
// plus a shared set of general pages that appear in every sidebar.

import { ARTICLES, type WikiArticle } from "./articles";
import type { PublishStatus } from "@/components/status-badge";

export type { PublishStatus } from "@/components/status-badge";

export type DocPage = {
  slug: string;
  title: string;
  html: string;
  // When set, the page renders a special template instead of raw HTML.
  // "demo" renders the embedded WebGL playable demo.
  kind?: "demo";
  // Optional step-by-step visual guide. When present, a navigable GIF tutorial
  // is shown at the top of the page (used for more complex workflows).
  guide?: GuideStep[];
  // When true, the page is visually emphasized (highlighted callout + sidebar
  // treatment) because it is especially important — e.g. the installation page.
  emphasized?: boolean;
  // When set, the page is NOT yet published — it is either still being
  // written ("in-development") or has been submitted and is awaiting Asset
  // Store review ("awaiting-review"). Published pages leave this undefined.
  status?: PublishStatus;
};

// A single step in a step-by-step visual guide.
export type GuideStep = {
  // Short title for the step (shown above the caption).
  title: string;
  // Explanatory text shown beneath the GIF.
  caption: string;
  // URL of the animated GIF (or any image/video) demonstrating this step.
  // Leave undefined to show a placeholder until the asset is ready.
  gif?: string;
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
  // URL to the published WebGL build (the folder/index.html produced by a
  // Unity WebGL export, or any embeddable game URL). Leave undefined until a
  // real demo build is available — the demo page shows a placeholder instead.
  demoUrl?: string;
  // Direct link to the package's review section on the Unity Asset Store.
  // When set, a non-intrusive review prompt is shown on every doc page.
  reviewUrl?: string;
  // When set, the package is NOT yet published on the Asset Store. Same
  // semantics as DocPage.status above. Published packages omit this field.
  status?: PublishStatus;
};

// Per-package WebGL demo build URLs. Fill these in as demos become available,
// e.g. DEMO_URLS["dotween"] = "https://your-host.com/dotween-demo/index.html".
// Until a slug has an entry here, its demo page shows a "coming soon" state.
export const DEMO_URLS: Record<string, string> = {};

// Per-package Asset Store review URLs. The #reviews anchor scrolls to the
// reviews tab on the Asset Store page. Add more slugs as needed.
export const REVIEW_URLS: Record<string, string> = {
  dotween: "https://assetstore.unity.com/packages/tools/visual-scripting/dotween-pro-32416#reviews",
  "odin-inspector": "https://assetstore.unity.com/packages/tools/utilities/odin-inspector-and-serializer-89041#reviews",
  "a-pathfinding-project": "https://assetstore.unity.com/packages/tools/behavior-ai/a-pathfinding-project-pro-87744#reviews",
};

// Per-package publish status overrides. Only list packages that are NOT yet
// published — anything missing here is considered live on the Asset Store.
export const PACKAGE_STATUS: Record<string, PublishStatus> = {
  cinemachine: "in-development",
  dotween: "awaiting-review",
};

// Per-page publish status overrides, keyed by "<packageSlug>/<pageSlug>".
// Only list pages that are NOT yet published.
export const PAGE_STATUS: Record<string, PublishStatus> = {
  "dotween/faq": "awaiting-review",
};

// Per-page step-by-step visual guides, keyed by "<packageSlug>/<pageSlug>".
// Each entry is an ordered list of steps; every step has a title, a caption,
// and an optional `gif` URL. Add a `gif` once the recording is ready — until
// then each step shows a labelled placeholder so the flow is fully testable.
//
// Example:
//   GUIDES["dotween/getting-started"] = [
//     { title: "Import DOTween", caption: "Open the Package Manager…", gif: "https://…/step-1.gif" },
//     { title: "Create a tween", caption: "Call transform.DOMove(...)", gif: "https://…/step-2.gif" },
//   ];
export const GUIDES: Record<string, GuideStep[]> = {
  // Demo guide so the feature is visible out of the box. Replace/extend freely.
  "dotween/getting-started": [
    {
      title: "Import the package",
      caption:
        "Open Window → Package Manager and import DOTween Pro into your project.",
    },
    {
      title: "Run the setup utility",
      caption:
        "Go to Tools → Demigiant → DOTween Utility Panel and click Setup DOTween.",
    },
    {
      title: "Create your first tween",
      caption:
        "Add a script and call transform.DOMoveX(5, 1) to animate an object over one second.",
    },
    {
      title: "Press Play",
      caption:
        "Enter Play mode and watch the tween run. Tweak the duration and easing to taste.",
    },
  ],
};

// A generic step-by-step installation walkthrough applied to every package's
// installation page (unless a package overrides it in GUIDES above). Add a
// `gif` to each step as recordings become available.
function installGuide(name: string): GuideStep[] {
  return [
    {
      title: "Open the Package Manager",
      caption: `In Unity, go to Window → Package Manager to manage ${name} and its dependencies.`,
    },
    {
      title: `Import ${name}`,
      caption: `Select the ${name} package you downloaded from the Asset Store and click Import.`,
    },
    {
      title: "Confirm the import",
      caption:
        "Review the file list in the import dialog and confirm to add every required file to your project.",
    },
    {
      title: "Verify the installation",
      caption:
        "Wait for Unity to recompile, then check the Console — a clean compile means you're ready to go.",
    },
  ];
}

// package's documentation so users can try the package in the browser.
function demoPage(name: string): DocPage {
  return {
    slug: "try-demo",
    title: "Try the demo",
    kind: "demo",
    html: `<p>Play an interactive WebGL demo of <b>${name}</b> right in your browser — no install required.</p>`,
  };
}

// Standardized placeholder subpages added to every package so the
// documentation has a consistent, fully navigable structure. Content is
// intentionally generic placeholder text for now.
function placeholderPages(name: string, storeUrl?: string): DocPage[] {
  const note = `<p class="text-muted-foreground"><i>This page is a placeholder. Detailed ${name} documentation is coming soon.</i></p>`;
  const purchaseNote = storeUrl
    ? `<p class="not-prose my-4 text-sm text-muted-foreground">Don't own ${name}? <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80">Get it on the Unity Asset Store &rarr;</a></p>`
    : "";
  return [
    {
      slug: "installation",
      title: "Installation",
      emphasized: true,
      html: `${note}${purchaseNote}
<h2>Requirements</h2>
<p>Before installing ${name}, make sure your project meets the minimum Unity version listed in the overview infobox.</p>
<p>You should also have a backup of your project — installing a new package modifies the asset database and rebuilds the script assemblies, which can occasionally surface latent compile errors in unrelated code.</p>
<h3>Supported platforms</h3>
<p>${name} ships with prebuilt support for Windows, macOS, Linux, iOS, Android and WebGL. Console targets are available on request from the publisher.</p>
<h2>Install via Package Manager</h2>
<ol>
<li>Open <b>Window → Package Manager</b>.</li>
<li>Import the ${name} package downloaded from the Asset Store.</li>
<li>Wait for Unity to recompile, then verify there are no console errors.</li>
</ol>
<h2>Install via .unitypackage</h2>
<p>If you obtained ${name} as a standalone <code>.unitypackage</code> file, double-click it with the target Unity project open and accept every file in the import dialog.</p>
<h2>Post-install checklist</h2>
<ul>
<li>Open the Console window and confirm there are no red errors.</li>
<li>Open the <b>Project Settings</b> and locate the new ${name} entry.</li>
<li>Run the bundled sample scene, if one ships with the package.</li>
</ul>
<h2>Updating</h2>
<p>To update ${name} later, remove the existing folder from your project before re-importing the new version. This guarantees deleted files do not linger between releases.</p>
<h2>Uninstalling</h2>
<p>Delete the ${name} root folder and any generated files in <code>Assets/Plugins</code>. Unity will reimport your project and remove the related menu entries.</p>`,
    },
    {
      slug: "getting-started",
      title: "Getting started",
      html: `${note}
<h2>Your first steps</h2>
<p>This guide will walk you through a minimal ${name} setup once full documentation is available.</p>
<p>The goal of this page is to get something visible on the screen as quickly as possible so you can confirm the package is wired up correctly before going further.</p>
<h3>Prerequisites</h3>
<p>A fresh Unity project with ${name} already installed (see the Installation page). Any 2D or 3D template will do.</p>
<h2>Hello, ${name}</h2>
<p>Create a new empty GameObject, attach a fresh script, and call into the ${name} API from <code>Start()</code>. You should see output in the Console as soon as you enter Play mode.</p>
<h2>Inspecting the result</h2>
<p>Most ${name} workflows expose runtime state in custom inspectors. Open the Inspector window with the active object selected to follow along.</p>
<h2>Next steps</h2>
<ul>
<li>Review the configuration options.</li>
<li>Explore the examples.</li>
<li>Consult the API reference for details.</li>
</ul>
<h2>Where to go from here</h2>
<p>Once the minimal setup works, jump to <i>Examples</i> for end-to-end recipes, or to the <i>API reference</i> when you need to look up a specific type.</p>`,
    },
    {
      slug: "configuration",
      title: "Configuration",
      html: `${note}
<h2>Settings</h2>
<p>${name} exposes a number of settings that can be tuned to fit your project. A complete reference will be documented here.</p>
<h3>Editor settings</h3>
<p>Editor-only options live under <b>Edit → Preferences → ${name}</b>. They affect how the package behaves while you are authoring content, not at runtime.</p>
<h3>Project settings</h3>
<p>Runtime configuration is stored in <b>Project Settings → ${name}</b> and is committed to source control alongside the rest of your project.</p>
<h2>Per-scene overrides</h2>
<p>Several systems support per-scene overrides via a component you can drop in the scene root. Overrides take precedence over project-level defaults for the lifetime of the scene.</p>
<h2>Recommended defaults</h2>
<ul>
<li>Leave logging on <b>Warnings</b> for shipping builds.</li>
<li>Enable strict mode while iterating, then turn it off before profiling.</li>
<li>Pin the package version in your manifest to avoid accidental upgrades.</li>
</ul>
<h2>Troubleshooting configuration</h2>
<p>If a setting does not appear to take effect, confirm there is no per-scene override masking it, then restart the editor — a handful of options are read only at startup.</p>`,
    },
    {
      slug: "api-reference",
      title: "API reference",
      html: `${note}
<h2>Public API</h2>
<p>A full breakdown of the ${name} public types, methods, and properties will live on this page.</p>
<h3>Core types</h3>
<p>The entry point lives in the package's main namespace and is composed of a small number of public types intended for everyday use.</p>
<h3>Extension points</h3>
<p>Advanced users can plug into ${name} through a handful of interfaces; consult the source-level XML docs for the full surface area.</p>
<h2>Stability guarantees</h2>
<p>Types marked <code>[Obsolete]</code> are slated for removal in the next major version. Internal types are not covered by the package's stability promise and may move without notice.</p>
<h2>Threading model</h2>
<p>Unless explicitly noted, ${name} APIs are not thread-safe and must be called from Unity's main thread.</p>
<h2>Versioning</h2>
<p>${name} follows semantic versioning. Breaking changes only ship in major releases, and every break is called out in the changelog.</p>`,
    },
    {
      slug: "examples",
      title: "Examples",
      html: `${note}
<h2>Sample projects</h2>
<p>Hands-on examples demonstrating common ${name} workflows will be added here.</p>
<h3>Minimal sample</h3>
<p>A single-scene sample showing the absolute minimum required to get ${name} running. Ideal as a smoke test after installation.</p>
<h3>Integration sample</h3>
<p>A more realistic scene that wires ${name} into a small gameplay loop with input, UI and persistence.</p>
<h2>Importing the samples</h2>
<p>Open the Package Manager, select ${name}, then expand the <b>Samples</b> section and click <b>Import</b> next to each sample you'd like to try.</p>
<h2>Recipes</h2>
<ul>
<li>Wiring ${name} into an existing scene.</li>
<li>Driving ${name} from a ScriptableObject.</li>
<li>Exposing ${name} state to a custom editor window.</li>
</ul>
<h2>Where to find more</h2>
<p>The publisher maintains a community Discord and a GitHub discussions board with additional examples contributed by users.</p>`,
    },
    {
      slug: "troubleshooting",
      title: "Troubleshooting",
      html: `${note}
<h2>Common issues</h2>
<p>Solutions to frequently reported ${name} problems will be collected on this page.</p>
<h3>${name} silently does nothing</h3>
<p>Verify that the relevant component is enabled, the scene is in Play mode, and that no error was logged during initialisation.</p>
<h3>Missing script references</h3>
<p>Re-importing the ${name} folder usually resolves missing-script warnings caused by a partial import.</p>
<h3>Performance regressions</h3>
<p>Disable strict-mode logging in shipping builds and avoid calling ${name} APIs from <code>Update()</code> when an event-driven alternative exists.</p>
<h2>Reporting bugs</h2>
<p>When opening a ticket, include your Unity version, the ${name} version, the target platform, and a minimal reproduction project — this is by far the fastest path to a fix.</p>
<h2>Known issues</h2>
<p>The publisher tracks a short list of known issues in the changelog at the bottom of each release.</p>`,
    },
    {
      slug: "changelog",
      title: "Changelog",
      html: `${note}
<h2>Release history</h2>
<p>Every published release of ${name}, newest first. Each row links to the upstream release notes when available.</p>

<h3>2.4.0 — Current <span class="badge-latest">Latest</span></h3>
<table>
<thead><tr><th>Type</th><th>Change</th></tr></thead>
<tbody>
<tr><td><span class="changelog-type-added">Added</span></td><td>Unity 6 compatibility and new project template.</td></tr>
<tr><td><span class="changelog-type-added">Added</span></td><td>Async/await helpers for long-running ${name} operations.</td></tr>
<tr><td><span class="changelog-type-changed">Changed</span></td><td>Default logging level lowered from <code>Info</code> to <code>Warning</code>.</td></tr>
<tr><td><span class="changelog-type-fixed">Fixed</span></td><td>Crash when reloading domain with strict mode enabled.</td></tr>
<tr><td><span class="changelog-type-deprecated">Deprecated</span></td><td><code>LegacyRunner</code> — use <code>Runner</code> instead.</td></tr>
</tbody>
</table>

<h3>2.3.2</h3>
<table>
<thead><tr><th>Type</th><th>Change</th></tr></thead>
<tbody>
<tr><td><span class="changelog-type-fixed">Fixed</span></td><td>Memory leak when reusing pooled objects across scenes.</td></tr>
<tr><td><span class="changelog-type-fixed">Fixed</span></td><td>IL2CPP build error on iOS 17 SDK.</td></tr>
<tr><td><span class="changelog-type-changed">Changed</span></td><td>Internal allocator switched to a slab pool — ~12% faster on average.</td></tr>
</tbody>
</table>

<h3>2.3.0</h3>
<table>
<thead><tr><th>Type</th><th>Change</th></tr></thead>
<tbody>
<tr><td><span class="changelog-type-added">Added</span></td><td>New inspector for the core ${name} settings asset.</td></tr>
<tr><td><span class="changelog-type-added">Added</span></td><td>Sample scene demonstrating the recommended setup.</td></tr>
<tr><td><span class="changelog-type-changed">Changed</span></td><td>Minimum supported Unity version raised to 2020.3 LTS.</td></tr>
<tr><td><span class="changelog-type-removed">Removed</span></td><td>Long-deprecated <code>BootstrapV1</code> entry point.</td></tr>
</tbody>
</table>

<h3>2.2.0</h3>
<table>
<thead><tr><th>Type</th><th>Change</th></tr></thead>
<tbody>
<tr><td><span class="changelog-type-added">Added</span></td><td>WebGL platform support with a reduced feature surface.</td></tr>
<tr><td><span class="changelog-type-fixed">Fixed</span></td><td>Editor freeze when opening the ${name} settings window on macOS.</td></tr>
</tbody>
</table>

<h3>2.1.0</h3>
<table>
<thead><tr><th>Type</th><th>Change</th></tr></thead>
<tbody>
<tr><td><span class="changelog-type-added">Added</span></td><td>Public extension API for custom backends.</td></tr>
<tr><td><span class="changelog-type-changed">Changed</span></td><td>Reorganised assemblies — see migration notes below.</td></tr>
</tbody>
</table>

<h3>2.0.0</h3>
<table>
<thead><tr><th>Type</th><th>Change</th></tr></thead>
<tbody>
<tr><td><span class="changelog-type-breaking">Breaking</span></td><td>Namespace renamed from <code>${name.replace(/\s+/g, "")}.Old</code> to <code>${name.replace(/\s+/g, "")}</code>.</td></tr>
<tr><td><span class="changelog-type-added">Added</span></td><td>Full rewrite on top of Unity's job system.</td></tr>
<tr><td><span class="changelog-type-removed">Removed</span></td><td>All members marked <code>[Obsolete]</code> in the 1.x line.</td></tr>
</tbody>
</table>

<h2>Migration notes</h2>
<p>When upgrading across a major version, read the corresponding migration section in the release notes — APIs marked <code>[Obsolete]</code> in the previous major are typically removed.</p>

<h2>Deprecation policy</h2>
<p>APIs are marked <code>[Obsolete]</code> for at least one minor release before they are removed, giving you time to migrate.</p>`,
    },
    {
      slug: "faq",
      title: "FAQ",
      html: `${note}
<h2>Frequently asked questions</h2>
<p>Short answers to the questions I get most often about ${name}. If yours isn't here, the <a href="/contact">contact page</a> is the fastest way to reach me.</p>

<h3>Which Unity versions are supported?</h3>
<p>The supported range is listed in the overview infobox at the top of this package's docs. In general, I target the current Unity LTS plus the two previous LTS releases.</p>

<h3>Does ${name} work in WebGL / mobile / consoles?</h3>
<p>WebGL, iOS and Android are tested in CI. Console targets compile but I cannot test them on every patch — ping me before shipping if you depend on console support.</p>

<h3>Can I use ${name} in a commercial project?</h3>
<p>Yes. The license is the standard Unity Asset Store EULA — one seat per developer, unlimited shipped projects.</p>

<h3>How do I report a bug?</h3>
<p>Open the <a href="/contact">contact page</a> with your Unity version, the ${name} version, the platform you're targeting, and a minimal reproduction project. That gets a fix out the door fastest.</p>

<h3>Will ${name} keep getting updates?</h3>
<p>Yes — every package on this site is actively maintained. The changelog page shows the release cadence at a glance.</p>

<h3>How do I request a feature?</h3>
<p>Send it through the contact form. I read everything and roadmap the ones that fit ${name}'s scope.</p>`,
    },
  ];
}

export const PACKAGES: DocPackage[] = ARTICLES.map((a: WikiArticle) => ({
  slug: a.slug,
  name: a.title,
  tagline: a.tagline,
  category: a.category,
  color: a.infobox.image?.color ?? "#7b5cff",
  label: a.infobox.image?.label ?? a.title,
  infoboxFields: [
    { label: "Category", value: a.category },
    ...a.infobox.fields,
  ],
  pages: (() => {
    // The lead acts as the "Overview" page. If the article also defines a
    // section called "overview", merge it into the lead so the sidebar
    // doesn't show two "Overview" entries.
    const leadSection = a.sections.find((s) => s.id === "overview");
    const rest = a.sections.filter((s) => s.id !== "overview");
    const realPages: DocPage[] = [
      {
        slug: "overview",
        title: "Overview",
        html: leadSection ? `${a.lead}\n${leadSection.html}` : a.lead,
      },
      // The playable demo sits right after the overview (second page).
      demoPage(a.title),
      ...rest.map((s) => ({ slug: s.id, title: s.title, html: s.html })),
    ];
    // Append standardized placeholder subpages, skipping any slug that
    // already exists as a real section.
    const existing = new Set(realPages.map((p) => p.slug));
    const extras = placeholderPages(a.title, REVIEW_URLS[a.slug]).filter(
      (p) => !existing.has(p.slug),
    );
    // The installation page is the most important page in the docs and
    // must always sit immediately below "Try the demo" — pull it out of
    // the placeholder bucket and splice it in right after the demo page.
    const installIdx = extras.findIndex((p) => p.slug === "installation");
    const installPage = installIdx >= 0 ? extras.splice(installIdx, 1)[0] : null;
    const demoIdx = realPages.findIndex((p) => p.slug === "try-demo");
    if (installPage && demoIdx >= 0) {
      realPages.splice(demoIdx + 1, 0, installPage);
    }
    // Attach any step-by-step guide registered for this package + page. The
    // installation page always gets a guide (a registered one, or the generic
    // installation walkthrough) since it's an emphasized, important page.
    return [...realPages, ...extras].map((p) => ({
      ...p,
      guide:
        GUIDES[`${a.slug}/${p.slug}`] ??
        (p.slug === "installation" ? installGuide(a.title) : undefined),
      status: PAGE_STATUS[`${a.slug}/${p.slug}`],
    }));
  })(),
  references: a.references,
  demoUrl: DEMO_URLS[a.slug],
  reviewUrl: REVIEW_URLS[a.slug],
  status: PACKAGE_STATUS[a.slug],
}));


export function getPackage(slug: string): DocPackage | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function getPackagePage(
  pkg: DocPackage,
  slug: string,
): DocPage | undefined {
  return pkg.pages.find((p) => p.slug === slug);
}
