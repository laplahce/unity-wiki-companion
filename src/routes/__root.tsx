import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteSidebar, SiteFooter, MobileSidebar, useMobileSidebar } from "@/components/site-chrome";
import { SITE } from "@/data/site";

function NotFoundComponent() {
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
        We looked everywhere, under the prefabs, behind the scriptable objects,
        even inside the scene hierarchy. No luck. The page you're after
        either moved, was renamed, or never existed in the first place.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="btn btn-grad !rounded-lg px-4 py-2 text-sm"
        >
          ← Back to the main page
        </Link>
        <Link to="/packages" className="btn btn-solid !rounded-lg px-4 py-2 text-sm">
          Browse my packages
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-2xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The article failed to load. You can try again or return home.
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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "laplahce — Unity Asset Store developer" },
      {
        name: "description",
        content:
          "Independent Unity Asset Store developer. Tools, playable demos and proper documentation for every package.",
      },
      { property: "og:title", content: "laplahce — Unity Asset Store developer" },
      {
        property: "og:description",
        content:
          "Independent Unity Asset Store developer. Tools, playable demos and proper documentation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "laplahce — Unity Asset Store developer" },
      { name: "twitter:description", content: "A technical documentation website for Unity Asset Store packages, featuring interactive changelogs, code snippets, and FAQs." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8a11eb6a-9682-4229-83d4-06b71ed104db/id-preview-b4e8fe18--b7241294-9d5a-46e8-aa24-d45fcb08f01f.lovable.app-1780322228801.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8a11eb6a-9682-4229-83d4-06b71ed104db/id-preview-b4e8fe18--b7241294-9d5a-46e8-aa24-d45fcb08f01f.lovable.app-1780322228801.png" },
      { name: "description", content: "A technical documentation website for Unity Asset Store packages, featuring interactive changelogs, code snippets, and FAQs." },
      { property: "og:description", content: "A technical documentation website for Unity Asset Store packages, featuring interactive changelogs, code snippets, and FAQs." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...(SITE.favicon ? [{ rel: "icon", href: SITE.favicon }] : []),
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('laplahce-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { open, setOpen } = useMobileSidebar();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader onMenuClick={() => setOpen(true)} />
        <MobileSidebar open={open} onClose={() => setOpen(false)} />
        <div className="mx-auto flex w-full max-w-[1400px] flex-1">
          <SiteSidebar />
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
            <Outlet />
          </main>
        </div>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
