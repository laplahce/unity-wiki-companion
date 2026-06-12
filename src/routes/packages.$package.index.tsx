import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Play, ArrowRight, Star, Check } from "lucide-react";
import { getPackage, PACKAGES } from "@/data/docs";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/packages/$package/")({
  loader: ({ params }) => {
    const pkg = getPackage(params.package);
    if (!pkg) throw notFound();
    return { pkg };
  },
  component: PackageShowcase,
});

function PackageShowcase() {
  const { pkg } = Route.useLoaderData();
  const storeUrl = pkg.reviewUrl?.replace("#reviews", "") ?? "https://assetstore.unity.com";
  const related = PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <div className="-mx-4 sm:-mx-8">
      {/* Hero banner — placeholder gradient until a real GIF is wired up */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[520px]">
        <div className="card-grad absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            Banner GIF placeholder
          </span>
        </div>
        <div className="relative mx-auto flex h-full max-w-5xl flex-col items-start justify-end px-6 pb-12 text-white sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
            {pkg.category}
          </div>
          {pkg.status && (
            <div className="mt-3">
              <StatusBadge status={pkg.status} size="md" className="!border-white/30 !bg-white/10 !text-white" />
            </div>
          )}
          <h1 className="mt-4 font-serif text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {pkg.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
            {pkg.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/docs/$package"
              params={{ package: pkg.slug }}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              <BookOpen className="h-4 w-4" /> Documentation
            </Link>
            <a
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white card-grad card-shadow"
            >
              <ExternalLink className="h-4 w-4" /> View on Asset Store
            </a>
            <Link
              to="/packages/$package/demo"
              params={{ package: pkg.slug }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Play className="h-4 w-4" /> Try the demo
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16 sm:px-10">
        {/* Highlights */}
        <section>
          <div className="eyebrow">What you get</div>
          <h2 className="display mt-2 text-2xl sm:text-3xl">Highlights</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              "Drop-in setup, no scene wiring",
              "Source included, MIT-friendly license",
              "Long-term support across Unity LTS",
              "Playable WebGL demo included",
              "Editor tooling that respects undo",
              "Battle-tested in shipped games",
            ].map((h) => (
              <div
                key={h}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-sm text-foreground">{h}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Media gallery */}
        <section>
          <div className="eyebrow">Gallery</div>
          <h2 className="display mt-2 text-2xl sm:text-3xl">In action</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted card-shadow"
              >
                <div className="card-grad absolute inset-0 opacity-70" />
                <span className="relative font-mono text-sm font-semibold text-white/90">
                  Screenshot / GIF placeholder {i}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Specs */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="eyebrow">Specs</div>
          <h2 className="display mt-2 text-2xl">Package details</h2>
          <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {pkg.infoboxFields.map((f: { label: string; value: string }) => (
              <div key={f.label} className="flex justify-between border-b border-border py-2 text-sm">
                <span className="font-semibold uppercase tracking-wide text-[11px] text-muted-foreground">
                  {f.label}
                </span>
                <span className="text-foreground">{f.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Review prompt */}
        {pkg.reviewUrl && (
          <a
            href={pkg.reviewUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition hover:border-brand"
          >
            <Star className="h-6 w-6 shrink-0 text-brand" />
            <div className="flex-1">
              <div className="font-semibold">Using {pkg.name}?</div>
              <p className="text-sm text-muted-foreground">
                A quick review on the Asset Store helps me keep shipping. Thanks!
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:text-brand" />
          </a>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section>
            <div className="eyebrow">More from me</div>
            <h2 className="display mt-2 text-2xl">Other packages</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/packages/$package"
                  params={{ package: p.slug }}
                  className="group rounded-2xl border border-border bg-card p-5 transition hover:border-brand"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {p.category}
                  </div>
                  <div className="mt-1 font-bold">{p.name}</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {p.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}