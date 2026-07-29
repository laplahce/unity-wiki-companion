import { QueryClient } from "@tanstack/react-query";
import { createRouter, Link, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function DefaultNotFound() {
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
        This article hasn't been written yet.
      </h1>
      <p className="mt-4 text-muted-foreground">
        We looked everywhere, under the prefabs, behind the scriptable objects,
        even inside the scene hierarchy. No luck. The page you're after
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

function DefaultError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-2xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page failed to load. You can try again or return home.
      </p>
      <div className="mt-6 flex gap-3 text-sm">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="nav-link"
        >
          Try again
        </button>
        <a href="/" className="nav-link">
          Main page
        </a>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: DefaultNotFound,
    defaultErrorComponent: DefaultError,
  });

  return router;
};
