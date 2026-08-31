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
  Film,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { PackageBanner } from "@/components/package-media";
import { SITE } from "@/data/site";
import { youtubeId } from "@/data/content";
import { useRef, useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "laplahce" },
      {
        name: "description",
        content:
          "Solo Unity Asset Store developer. Browse my effect packs and editor tools, try the playable demos, and read the full documentation for every package.",
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

const PHRASES = [
  "take a look around",
  "This is what I do",
  "made for your next project",
  "crafted with care",
];

const FOCUS_PHRASES = [
  "great quality",
  "ease-of-use",
  "fast workflow",
  "and clean design"
];

function CyclingText() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [focusAnimating, setFocusAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const isLastRef = useRef(false);
  const doneRef = useRef(false);

  const isLast = index === PHRASES.length - 1;
  isLastRef.current = isLast;

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLastRef.current) return;
      setAnimating(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setAnimating(false);
      }, 300);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (!isLastRef.current) return;
      if (doneRef.current) return;

      if (count >= FOCUS_PHRASES.length - 1) {
        doneRef.current = true;
        // hide text
        setTimeout(() => setVisible(false), 800);
        // reset everything and loop
        setTimeout(() => {
          setIndex(0);
          setFocusIndex(0);
          doneRef.current = false;
          count = 0;
          setVisible(true);
        }, 2000);
        return;
      }

      setFocusAnimating(true);
      setTimeout(() => {
        setFocusIndex((i) => (i + 1) % FOCUS_PHRASES.length);
        setFocusAnimating(false);
        count++;
      }, 300);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest text-white/70 transition-all duration-500"
      style={{
        opacity: visible ? (animating ? 0 : 1) : 0,
        transform: animating ? "translateY(-8px)" : "translateY(0px)",
      }}
    >
      {isLast ? (
        <>
          with focus on{" "}
          <span
            className="text-white transition-all duration-300 inline-block"
            style={{
              transform: focusAnimating ? "translateY(-6px)" : "translateY(0px)",
              opacity: focusAnimating ? 0 : 1,
            }}
          >
            {FOCUS_PHRASES[focusIndex]}
          </span>
        </>
      ) : (
        PHRASES[index]
      )}
    </p>
  );
}

function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 pb-10">
      {/* Hero */}
      <section className="-mt-10 sm:-mt-16">
        {SITE.trailerUrl ? (
          <div className="mt-8 space-y-4">
            {SITE.trailerUrl ? (
              <div className="relative w-screen left-1/2 -translate-x-1/2" style={{ aspectRatio: "16/9", maxHeight: "60vh" }}>
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={SITE.trailerUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-start justify-center">
                  <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                    <CyclingText />
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
                Hi, I&apos;m <span className="text-brand">laplahce</span>.
                <br />I build Assets for your games.
              </h1>
            )}
          </div>
        ) : (
          <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="text-brand">laplahce</span>.
            <br />I build Assets for your games.
          </h1>
        )}
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
          {["cartoon-fx-pack-v2", "obstacle-course-kit", "candy-merge", "level-design-toolkit"]
            .map((slug) => PACKAGES.find((p) => p.slug === slug))
            .filter(Boolean)
            .map((p) => (
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
              focus on ease-of-use &amp; making the user experience as good as
              possible. If a pack of mine helped you, a review goes a long way. If
              something is broken, unclear, or you want to request a feature, just
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
        <section className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/5 via-transparent to-transparent dark:from-brand/10 p-6 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="space-y-3">
              <div className="eyebrow inline-flex items-center gap-2 text-brand">
                <Heart className="h-3.5 w-3.5 fill-current" /> Support me
              </div>
              <h2 className="display text-2xl sm:text-3xl">
                Help support my work
              </h2>
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                My assets take a long time to create, from prototype to developing to documentation.
                Using my assets is the best way to show your support, but if you&apos;d like to go further,
                supporting me on Patreon allows me to spend more time developing quality assets for everyone.
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
