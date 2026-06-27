## Goal

You should be able to add or change a package's docs by dropping/editing Markdown files — no TypeScript edits, no boilerplate. The design layer stays untouched.

## New content layout

```
src/content/packages/
  dotween/
    _package.md          ← package metadata + landing copy (overview)
    01-installation.md
    02-getting-started.md
    03-configuration.md
    ...
    99-faq.md
  odin-inspector/
    _package.md
    ...
```

- **File order** = sidebar order. The `NN-` prefix is stripped from the slug.
- **`_package.md`** holds package-level metadata (frontmatter) and the Overview body. Adding a folder with this file = new package, automatically wired into the homepage, `/packages`, `/docs`, etc.
- **Per-page `.md`** holds page metadata (frontmatter) + body. Adding a file = new sidebar entry.

## Frontmatter schema

`_package.md`:
```yaml
---
name: DOTween
tagline: Fast, type-safe tween engine for Unity.
category: Animation
color: "#f4a300"
label: DOTween
status: awaiting-review        # optional, omit if published
reviewUrl: https://...#reviews # optional
demoUrl: https://...           # optional
infobox:
  - { label: Developer, value: Demigiant }
  - { label: License, value: Proprietary }
references:
  - { id: 1, text: "DOTween home", url: "https://dotween.demigiant.com" }
---
<overview body in markdown>
```

Per-page (e.g. `01-installation.md`):
```yaml
---
title: Installation
slug: installation             # optional, otherwise derived from filename
emphasized: true               # optional
status: in-development         # optional
kind: demo                     # optional, renders WebGL demo template
guide:                         # optional step-by-step
  - { title: "Open Package Manager", caption: "..." }
---
<page body>
```

The `faq.md` body uses standard `## Question` / paragraph pairs — the existing `FaqAccordion` already parses that.

## Implementation

1. Add deps: `marked`, `gray-matter`.
2. New module `src/data/content.ts`:
   - `import.meta.glob('/src/content/packages/**/*.md', { eager: true, query: '?raw', import: 'default' })`
   - Parse each file with `gray-matter`, render body with `marked`.
   - Build the `PACKAGES: DocPackage[]` array exposed by `src/data/docs.ts` today, preserving the existing `DocPackage` / `DocPage` shape so no UI code changes.
3. Rewrite `src/data/docs.ts` to re-export from `content.ts` (keep `getPackage`, `getPackagePage`, types). Delete the hardcoded `PACKAGE_STATUS`, `PAGE_STATUS`, `REVIEW_URLS`, `DEMO_URLS`, `GUIDES`, `placeholderPages`, `installGuide` — all replaced by frontmatter.
4. Migrate current content (DOTween, Odin Inspector, A* Pathfinding, Cinemachine — whatever's in `ARTICLES`) into `src/content/packages/<slug>/*.md` files so the site renders identically after the swap.
5. Keep `src/data/articles.ts` only if `wiki.$slug.tsx` still uses it; otherwise delete. (Will verify before deleting.)

## What you do afterwards

- New package: create `src/content/packages/my-pkg/_package.md` + a few page `.md` files. Done.
- Edit copy: open the `.md` file, save. Hot reload picks it up.
- Reorder sidebar: rename the `NN-` prefix.
- Mark unpublished: add `status: in-development` to the frontmatter.

No component, route, or TS edits required for content changes.

## Out of scope

- No design changes.
- No new routes.
- MDX/JSX-in-markdown (overkill — `marked` handles raw HTML inside `.md` if you ever need a custom block).
