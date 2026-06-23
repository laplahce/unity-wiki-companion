import { createFileRoute, Link } from "@tanstack/react-router";
import { PACKAGES } from "@/data/docs";
import { ArrowRight, Github, Mail, Package as PackageIcon, Wrench } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "laplahce — Unity Asset Store developer" },
      {
        name: "description",
        content:
          "Independent Unity Asset Store developer. Tools for animation, AI, inspectors and more — each shipped with a playable demo and proper docs.",
      },
      { property: "og:title", content: "laplahce — Unity Asset Store developer" },
      {
        property: "og:description",
        content:
          "Independent Unity Asset Store developer. Each package ships with a playable demo and proper docs.",
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
          <Wrench className="h-3.5 w-3.5" /> Independent Unity dev
        </div>
        <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
          Hi, I&apos;m <span className="text-brand">laplahce</span>.
          <br />I build small, sharp tools for Unity.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          I&apos;ve been shipping packages on the Unity Asset Store for a while
          now — animation engines, editor extensions, AI helpers. Every package
          you&apos;ll find here is mine, every line of code, every demo, every
          page of documentation.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/packages/$package"
            params={{ package: PACKAGES[0].slug }}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white card-grad card-shadow"
          >
            See my packages <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/docs"
            className="rounded-xl border border-border-strong px-5 py-3 text-sm font-semibold hover:bg-surface-alt"
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
              Packages I&apos;ve shipped
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A handful of my favorites — see the full catalog for everything.
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
              <div className="card-grad relative flex h-36 items-center justify-center">
                <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
                  {p.label}
                </span>
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
              className="inline-flex items-center gap-2 rounded-xl border border-border-strong px-5 py-3 text-sm font-semibold hover:bg-surface-alt"
            >
              See all {PACKAGES.length} packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {/* About */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-10">
        <div className="grid gap-8 sm:grid-cols-[1fr_2fr]">
          <div>
            <div className="eyebrow">About</div>
            <h2 className="display mt-2 text-2xl">A bit about me</h2>
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a solo developer working on Unity tools full-time. I
              prefer tools that do one thing well, ship with a demo you can
              actually play, and read like a real reference instead of a
              marketing page.
            </p>
            <p>
              If a package of mine helped you, a review goes a long way. If
              something is broken or unclear, please tell me — I usually
              respond within a day.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:border-brand"
              >
                <Mail className="h-4 w-4 text-brand" /> Get in touch
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:border-brand"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Packages on the store", value: PACKAGES.length },
          { label: "Documentation pages", value: PACKAGES.reduce((n, p) => n + p.pages.length, 0) },
          { label: "Years on the store", value: "6+" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card px-5 py-6"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <PackageIcon className="h-3.5 w-3.5 text-brand" /> {s.label}
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">
              {s.value}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}