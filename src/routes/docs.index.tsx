import { createFileRoute, Link } from "@tanstack/react-router";
import { PACKAGES } from "@/data/docs";
import { OnThisPage } from "@/components/on-this-page";
import type { TocItem } from "@/lib/toc";
import { StatusBadge } from "@/components/status-badge";

const HOME_TOC: TocItem[] = [
  { id: "welcome", title: "Welcome", level: 2 },
  { id: "featured", title: "Browse documentation", level: 2 },
  { id: "how-it-works", title: "How these docs work", level: 2 },
  { id: "contents", title: "All packages", level: 2 },
  { id: "about", title: "What this site is", level: 2 },
];

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Docs — laplahce" },
      {
        name: "description",
        content:
          "Modern, encyclopedia-style documentation for popular Unity Asset Store packages: DOTween, Odin Inspector, Cinemachine, A* Pathfinding Project.",
      },
      { property: "og:title", content: "Docs — laplahce" },
      {
        property: "og:description",
        content: "Modern, encyclopedia-style documentation for popular Unity Asset Store packages.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex gap-10">
      <div className="min-w-0 flex-1 space-y-16">
      {/* Hero */}
      <section id="welcome" className="pt-6">
        <div className="eyebrow">Documentation</div>
        <h1 className="display mt-3 text-4xl sm:text-5xl lg:text-6xl">
          Docs for the Unity Asset Store, in one place.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          A curated documentation hub for the packages real studios ship with.
          Each package has its own multi-page reference — clean writing,
          neutral voice, citations included.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/docs/$package"
            params={{ package: PACKAGES[0].slug }}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-white card-grad card-shadow"
          >
            Open {PACKAGES[0].name} docs →
          </Link>
          <a
            href="#contents"
            className="rounded-xl border border-border-strong px-5 py-3 text-sm font-semibold hover:bg-surface-alt"
          >
            Browse all packages
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <div><span className="font-bold text-foreground">{PACKAGES.length}</span> packages documented</div>
          <div><span className="font-bold text-foreground">{PACKAGES.reduce((n, p) => n + p.pages.length, 0)}</span> doc pages</div>
          <div>Updated continuously</div>
        </div>
      </section>

      {/* Featured grid */}
      <section id="featured">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="eyebrow">Packages</div>
            <h2 className="display mt-2 text-2xl sm:text-3xl">Browse documentation</h2>
          </div>
          <a href="#contents" className="text-sm font-semibold text-brand hover:underline">
            View all
          </a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((p) => (
            <Link
              key={p.slug}
              to="/docs/$package"
              params={{ package: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card card-shadow"
            >
              <div className="card-grad flex h-40 items-center justify-center">
                <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
                  {p.label}
                </span>
              </div>
              <div className="p-4">
                <div className="mb-1 h-0.5 w-6 bg-brand/60" />
                <div className="text-base font-bold text-foreground">{p.name}</div>
                <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {p.tagline}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {p.pages.length} pages · {p.category}
                  </div>
                  {p.status && <StatusBadge status={p.status} size="xs" />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="eyebrow">Start here</div>
        <h2 className="display mt-2 text-2xl">How these docs work</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="font-semibold">One package at a time</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a package and the left sidebar shows only its pages. Use the
              <b> Packages</b> menu in the top bar to switch to another package.
            </p>
          </div>
          <div>
            <div className="font-semibold">Conventions</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Code samples are C# targeting Unity 2020.3 LTS or later unless
              noted. Each overview carries an infobox with version, developer,
              license, and engine compatibility.
            </p>
          </div>
          <div>
            <div className="font-semibold">Neutral &amp; cited</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Every package is summarised in an encyclopedia voice with
              citations linking back to the upstream vendor documentation.
            </p>
          </div>
        </div>
      </section>


      {/* Index */}
      <section id="contents">
        <div className="mb-6">
          <div className="eyebrow">Index</div>
          <h2 className="display mt-2 text-2xl sm:text-3xl">All packages</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-alt text-left">
                <th className="px-5 py-3 font-semibold">Package</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Pages</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Summary</th>
              </tr>
            </thead>
            <tbody>
              {PACKAGES.map((p) => (
                <tr
                  key={p.slug}
                  className="border-b border-border last:border-0 align-top transition-colors hover:bg-surface-alt"
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <Link
                      to="/docs/$package"
                      params={{ package: p.slug }}
                      className="font-semibold text-brand hover:underline"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{p.category}</td>
                  <td className="px-5 py-4 text-muted-foreground">{p.pages.length}</td>
                  <td className="px-5 py-4">
                    {p.status ? (
                      <StatusBadge status={p.status} size="xs" />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{p.tagline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* About */}
      <section id="about" className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="eyebrow">About</div>
        <h2 className="display mt-2 text-2xl">What this site is</h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          The documentation hub for the packages shipped on this site. Each
          package has its own multi-page reference covering setup, public API,
          licensing, and release history in a neutral, encyclopedia voice.
          It is intended as a complete reference for engineers and technical
          artists integrating these packages into their projects.
        </p>
      </section>
      </div>
      <OnThisPage items={HOME_TOC} />
    </div>
  );
}
