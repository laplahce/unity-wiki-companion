import { createFileRoute, Link } from "@tanstack/react-router";
import { PACKAGES } from "@/data/docs";
import {
  ArrowRight,
  Github,
  Mail,
  Package as PackageIcon,
  Wrench,
  Heart,
  ArrowUpRight,
  FileText,
  CalendarClock,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { PackageBanner } from "@/components/package-media";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "laplahce - Unity Asset Store packages & tools" },
      {
        name: "description",
        content:
          "Independent Unity Asset Store developer. Browse my effect packs and editor tools, try the playable demos, and read the full documentation for every package.",
      },
      { property: "og:title", content: "laplahce - Unity Asset Store packages & tools" },
      {
        property: "og:description",
        content:
          "Effect packs and editor tools for Unity, built solo. Playable demos, clear docs and changelogs for every package.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 pb-10">
      {/* Hero */}
      <section className="pt-10 sm:pt-16">
        <div className="eyebrow inline-flex items-center gap-2">
          <Wrench className="h-3.5 w-3.5" /> Unity Asset Developer
        </div>
        <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
          Hi, I&apos;m <span className="text-brand">laplahce</span>.
          <br />I build Assets for your games.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          I&apos;ve been creating asset packs on the Unity Asset Store for a while
          now. Here you&apos;ll find all my packages, their documentation, media & more.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/packages/$package"
            params={{ package: PACKAGES[0].slug }}
            className="btn btn-grad px-5 py-3 text-sm"
          >
            See my packages <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/docs"
            className="btn btn-solid px-5 py-3 text-sm"
          >
            Browse the docs
          </Link>
        </div>
      </section>

      {/* Packages grid */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="eyebrow">Catalog</div>
            <h2 className="display mt-2 text-2xl sm:text-3xl">
              Packages I&apos;ve created
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A handful of my favorites. See the full catalog for everything.
            </p>
          </div>
          <Link to="/packages" className="text-sm font-semibold text-brand hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {PACKAGES.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              to="/packages/$package"
              params={{ package: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card card-shadow transition hover:border-brand"
            >
              <div className="relative">
                <PackageBanner pkg={p} className="h-36">
                  <span className="px-3 text-center text-2xl font-extrabold tracking-tight text-white drop-shadow">
                    {p.label}
                  </span>
                </PackageBanner>
                {p.status && (
                  <span className="absolute left-3 top-3">
                    <StatusBadge
                      status={p.status}
                      size="xs"
                      className="!border-white/30 !bg-black/40 !text-white backdrop-blur"
                    />
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {p.category}
                </div>
                <div className="mt-1 text-base font-bold text-foreground">
                  {p.name}
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {p.tagline}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Open package <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {PACKAGES.length > 4 && (
          <div className="mt-6 flex justify-center">
            <Link
              to="/packages"
              className="btn btn-solid px-5 py-3 text-sm"
            >
              See all {PACKAGES.length} packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {/* About */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-10">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="space-y-3">
            <div className="eyebrow inline-flex items-center gap-2">
              <Wrench className="h-3.5 w-3.5" /> About
            </div>
            <h2 className="display text-2xl sm:text-3xl">A bit about me</h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              I&apos;m a solo developer creating Unity Asset Store packs. I try to
              focus on ease-of-use &amp; love to make the user experience as good as
              possible. If a pack of mine helped you, a review goes a long way - and
              if something is broken, unclear, or you want to request a feature, just
              reach out.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <Link to="/contact" className="btn btn-solid px-5 py-3 text-sm">
              <Mail className="h-4 w-4 text-brand" /> Get in touch
            </Link>
            {SITE.github && (
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-solid px-5 py-3 text-sm"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Published packages", value: PACKAGES.length, Icon: PackageIcon },
          {
            label: "Documentation pages",
            value: PACKAGES.reduce((n, p) => n + p.pages.length, 0),
            Icon: FileText,
          },
          { label: "Years on the store", value: "3+", Icon: CalendarClock },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card px-5 py-6"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <s.Icon className="h-3.5 w-3.5 text-brand" /> {s.label}
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">
              {s.value}
            </div>
          </div>
        ))}
      </section>

      {/* Patreon support */}
      {SITE.patreonUrl && (
        <section className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 via-transparent to-transparent p-6 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="space-y-3">
              <div className="eyebrow inline-flex items-center gap-2 text-brand">
                <Heart className="h-3.5 w-3.5 fill-current" /> Support me
              </div>
              <h2 className="display text-2xl sm:text-3xl">
                Help support my work
              </h2>
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                My assets take a long time to create, from prototype to marketing to documentation.
                If you want to help me with my dream, becoming a patreon is the best way to make that happen.
              </p>
            </div>
            <a
              href={SITE.patreonUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-grad px-6 py-3 text-sm"
            >
              Support on Patreon <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
