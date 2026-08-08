import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Play, ArrowRight, Star, Check, Film } from "lucide-react";
import { getPackage, PACKAGES } from "@/data/docs";
import { StatusBadge } from "@/components/status-badge";
import { PackageBanner, PackageHeroBackdrop } from "@/components/package-media";
import { SITE } from "@/data/site";

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
  const storeUrl = pkg.assetStoreUrl ?? SITE.assetStoreUrl;
  const related = PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);
  const shots = pkg.media?.screenshots ?? [];
  const highlights = pkg.highlights ?? [];

  return (
    <div>
      {/* Hero banner - looping trailer video, banner media, or placeholder */}
      <section className="relative -mt-6 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[520px] w-screen overflow-hidden sm:h-[640px]">
        <PackageHeroBackdrop pkg={pkg} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80" />
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
              className="btn btn-on-dark px-5 py-3 text-sm"
            >
              <BookOpen className="h-4 w-4" /> Documentation
            </Link>
            <a
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-grad px-5 py-3 text-sm"
            >
              <ExternalLink className="h-4 w-4" /> View on Asset Store
            </a>
            {pkg.demoUrl && (
              <Link
                to="/packages/$package/demo"
                params={{ package: pkg.slug }}
                className="btn btn-glass px-5 py-3 text-sm"
              >
                <Play className="h-4 w-4" /> Try the demo
              </Link>
            )}
          </div>
        </div>

        {/* Trailer shortcut */}
        {pkg.trailerUrl && (
          <a
            href={pkg.trailerUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-glass absolute bottom-6 right-6 !rounded-full px-4 py-2 text-sm"
          >
            <Film className="h-4 w-4" /> Watch the trailer
          </a>
        )}
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16 sm:px-10">
        {/* Highlights */}
        {highlights.length > 0 && (<section>
          <div className="eyebrow">What you get</div>
          <h2 className="display mt-2 text-2xl sm:text-3xl">Highlights</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {highlights.map((h: string) => (
              <div
                key={h}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-sm text-foreground">{h}</span>
              </div>
            ))}
          </div>
        </section>)}

        {/* Media gallery */}
        <section>
          <div className="eyebrow">Gallery</div>
          <h2 className="display mt-2 text-2xl sm:text-3xl">In action</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(shots.length > 0 ? shots : [1, 2, 3, 4]).map((shot: string | number, i: number) => (
              <div
                key={i}
                className="relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted card-shadow"
              >
                {typeof shot === "string" ? (
                  <img
                    src={shot}
                    alt={`${pkg.name} screenshot ${i + 1}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <div className="card-grad absolute inset-0 opacity-70" />
                    <span className="relative font-mono text-sm font-semibold text-white/90">
                      Screenshot / GIF placeholder {i + 1}
                    </span>
                  </>
                )}
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
                A quick review on the Asset Store helps me a ton. Thanks!
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
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-brand"
                >
                  <PackageBanner pkg={p} className="h-24">
                    <span className="px-3 text-center text-base font-extrabold text-white drop-shadow">
                      {p.label}
                    </span>
                  </PackageBanner>
                  <div className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {p.category}
                  </div>
                  <div className="mt-1 font-bold">{p.name}</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {p.tagline}
                  </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
