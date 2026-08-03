import { createFileRoute, Link } from "@tanstack/react-router";
import { PACKAGES } from "@/data/docs";
import { OnThisPage } from "@/components/on-this-page";
import type { TocItem } from "@/lib/toc";
import { StatusBadge } from "@/components/status-badge";
import { ArrowRight } from "lucide-react";
import { PackageBanner } from "@/components/package-media";

const HOME_TOC: TocItem[] = [
  { id: "welcome", title: "Welcome", level: 2 },
  { id: "featured", title: "Browse documentation", level: 2 },
  { id: "contents", title: "All packages", level: 2 },
];

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Documentation" },
      {
        name: "description",
        content:
          "Setup guides, compatibility matrices, changelogs and FAQs for every laplahce Unity Asset Store package, all in one place.",
      },
      { property: "og:title", content: "Documentation - laplahce Unity packages" },
      {
        property: "og:description",
        content:
          "Setup guides, compatibility matrices, changelogs and FAQs for every laplahce Unity Asset Store package.",
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
          Docs for all my Packages.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          A list of all my packages&apos; documentations.
          Each package has its own multi-page docs with clean & concise writing and easy-to-follow guides.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/docs/$package"
            params={{ package: PACKAGES[0].slug }}
            className="btn btn-grad px-5 py-3 text-sm"
          >
            Open {PACKAGES[0].name} docs →
          </Link>
          <a
            href="#contents"
            className="btn btn-solid px-5 py-3 text-sm"
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
          {PACKAGES.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              to="/docs/$package"
              params={{ package: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card card-shadow"
            >
              <PackageBanner pkg={p} className="h-40" />
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
          <a
            href="#contents"
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card p-6 text-center transition hover:border-brand hover:bg-surface-alt"
          >
            <div className="text-3xl font-extrabold tracking-tight text-brand">
              +{Math.max(0, PACKAGES.length - 3)}
            </div>
            <div className="font-semibold text-foreground">View all packages</div>
            <div className="text-sm text-muted-foreground">
              Browse the full documentation catalog
            </div>
            <div className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
              See all <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </div>
          </a>
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

      </div>
      <OnThisPage items={HOME_TOC} />
    </div>
  );
}
