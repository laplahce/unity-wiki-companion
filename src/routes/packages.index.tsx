import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package as PackageIcon } from "lucide-react";
import { PACKAGES } from "@/data/docs";
import { StatusBadge } from "@/components/status-badge";
import { PackageBanner } from "@/components/package-media";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "All packages" },
      {
        name: "description",
        content:
          "The full catalog of my Unity Asset Store packages.",
      },
      { property: "og:title", content: "All packages" },
      {
        property: "og:description",
        content: "The full catalog of my Unity Asset Store packages.",
      },
    ],
  }),
  component: PackagesIndex,
});

function PackagesIndex() {
  // Group by category for a nicer scan.
  const grouped = PACKAGES.reduce<Record<string, typeof PACKAGES>>(
    (acc, p) => {
      (acc[p.category] ||= []).push(p);
      return acc;
    },
    {},
  );
  const categories = Object.keys(grouped).sort();

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-12">
      <section className="pt-10">
        <div className="eyebrow">Catalog</div>
        <h1 className="display mt-3 text-4xl sm:text-5xl">
          All my packages
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Every pack I&apos;ve published on the Asset Store, grouped by category.
          Each one comes with a well thought out documentation.
        </p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <div>
            <span className="font-bold text-foreground">{PACKAGES.length}</span>{" "}
            packages
          </div>
          <div>
            <span className="font-bold text-foreground">{categories.length}</span>{" "}
            categories
          </div>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat}>
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="display text-xl sm:text-2xl">{cat}</h2>
            <div className="text-xs text-muted-foreground">
              {grouped[cat].length} package{grouped[cat].length === 1 ? "" : "s"}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <ul className="divide-y divide-border">
              {grouped[cat].map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/packages/$package"
                    params={{ package: p.slug }}
                    className="group flex items-center gap-4 px-5 py-4 transition hover:bg-surface-alt"
                  >
                    <PackageBanner pkg={p} className="h-12 w-12 shrink-0 rounded-xl">
                      <span className="text-sm font-extrabold text-white drop-shadow">
                        {p.label.charAt(0)}
                      </span>
                    </PackageBanner>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="truncate text-base font-bold text-foreground">
                          {p.name}
                        </div>
                        {p.status && <StatusBadge status={p.status} size="xs" />}
                        <div className="hidden text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:block">
                          · {p.pages.length} docs pages
                        </div>
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                        {p.tagline}
                      </p>
                    </div>
                    <PackageIcon className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
