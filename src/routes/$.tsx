import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "404 — Page not found | UnityWiki" },
      { name: "description", content: "The page you requested could not be found on UnityWiki." },
      { property: "og:title", content: "404 — Page not found | UnityWiki" },
      { property: "og:description", content: "The page you requested could not be found on UnityWiki." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div
        aria-hidden="true"
        className="select-none font-mono text-5xl sm:text-6xl text-brand"
      >
        ¯\_(ツ)_/¯
      </div>
      <div className="eyebrow mt-6">Error 404 · Page not found</div>
      <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
        This article hasn&apos;t been written yet.
      </h1>
      <p className="mt-4 text-muted-foreground">
        We looked everywhere — under the prefabs, behind the scriptable objects,
        even inside the scene hierarchy. No luck. The page you&apos;re after
        either moved, was renamed, or never existed in the first place.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white card-grad card-shadow"
        >
          ← Back to the main page
        </Link>
        <a
          href="https://assetstore.unity.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-brand"
        >
          Browse the Asset Store
        </a>
      </div>
    </div>
  );
}
