import { Link } from "@tanstack/react-router";
import { Star, ExternalLink, Play, ArrowRight } from "lucide-react";
import type { DocPackage, DocPage } from "@/data/docs";
import { extractToc, type TocItem } from "@/lib/toc";
import { OnThisPage } from "@/components/on-this-page";
import { StepGuide } from "@/components/step-guide";
import { HtmlContent } from "@/components/html-content";
import { PageFooterMeta } from "@/components/page-feedback";
import { StatusBadge } from "@/components/status-badge";
import { FaqAccordion } from "@/components/faq-accordion";
import { HighlightBanner } from "@/components/page-highlight";

function DocLayout({
  children,
  toc,
}: {
  children: React.ReactNode;
  toc: TocItem[];
}) {
  return (
    <div className="flex gap-10">
      <div className="min-w-0 flex-1">{children}</div>
      <OnThisPage items={toc} />
    </div>
  );
}

function PackageInfobox({ pkg }: { pkg: DocPackage }) {
  return (
    <aside className="float-none mb-6 w-full overflow-hidden rounded-2xl border border-border bg-card text-sm card-shadow sm:float-right sm:ml-8 sm:w-[320px]">
      {pkg.media?.banner ? (
        <img
          src={pkg.media.banner}
          alt={`${pkg.name} banner`}
          className="h-36 w-full object-cover"
        />
      ) : (
        <div
          className="flex h-36 w-full items-center justify-center"
          style={{ background: pkg.color }}
        >
          <span className="px-3 text-center text-2xl font-extrabold tracking-tight text-white drop-shadow">
            {pkg.label}
          </span>
        </div>
      )}
      <div className="px-4 py-3 border-b border-border">
        <div className="text-base font-bold leading-tight">{pkg.name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{pkg.tagline}</div>
      </div>
      <table className="w-full">
        <tbody>
          {pkg.infoboxFields.map((f, i) => (
            <tr key={`${f.label}-${i}`} className="border-b border-border last:border-0">
              <td className="w-[40%] px-4 py-2 align-top text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {f.label}
              </td>
              <td className="px-4 py-2 align-top">{f.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CompatibilityPanel pkg={pkg} />
    </aside>
  );
}

// Support matrix declared in the overview page's `compatibility:` frontmatter.
function CompatibilityPanel({ pkg }: { pkg: DocPackage }) {
  const c = pkg.compatibility;
  if (!c) return null;
  const rows: { label: string; items: string[] }[] = [
    { label: "Unity versions", items: c.unity ? [c.unity] : [] },
    { label: "Render pipelines", items: c.pipelines ?? [] },
    { label: "Platforms", items: c.platforms ?? [] },
  ].filter((r) => r.items.length > 0);
  if (rows.length === 0 && !c.notes?.length) return null;
  return (
    <div className="border-t border-border bg-muted/30 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Supported
      </div>
      <div className="mt-2 space-y-2.5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="text-[11px] text-muted-foreground">{r.label}</div>
            <div className="mt-1 flex flex-wrap gap-1">
              {r.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-card px-1.5 py-0.5 text-[11px] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {c.notes && c.notes.length > 0 && (
        <ul className="mt-3 space-y-1 border-t border-border pt-2 text-[11px] text-muted-foreground">
          {c.notes.map((n) => (
            <li key={n} className="flex gap-1.5">
              <span className="text-amber-600 dark:text-amber-400">!</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReviewPrompt({ pkg }: { pkg: DocPackage }) {
  return <ReviewPromptInner pkg={pkg} />;
}

// Full-width version of the support matrix, used by `kind: compatibility`
// pages so the same overview data can be shown in more detail.
function CompatibilityTable({ pkg }: { pkg: DocPackage }) {
  const c = pkg.compatibility;
  if (!c) return null;
  const rows: { label: string; items: string[] }[] = [
    { label: "Unity versions", items: c.unity ? [c.unity] : [] },
    { label: "Render pipelines", items: c.pipelines ?? [] },
    { label: "Platforms", items: c.platforms ?? [] },
  ].filter((r) => r.items.length > 0);
  return (
    <section className="not-prose my-6">
      <div className="overflow-hidden rounded-lg border border-border card-shadow">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.label} className={i % 2 ? "bg-muted/30" : undefined}>
                <th className="w-44 px-4 py-3 text-left align-top font-semibold">
                  {r.label}
                </th>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {r.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border bg-card px-2 py-0.5 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {c.notes && c.notes.length > 0 && (
        <div className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/5 px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
            Known exceptions
          </div>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {c.notes.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="text-amber-600 dark:text-amber-400">!</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function ReviewPromptInner({ pkg }: { pkg: DocPackage }) {
  if (!pkg.reviewUrl) return null;
  return (
    <a
      href={pkg.reviewUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="group mb-5 inline-flex items-center gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm card-shadow transition-colors hover:border-brand"
    >
      <Star className="h-4 w-4 text-brand" />
      <span className="text-muted-foreground">Enjoying {pkg.name}?</span>
      <span className="font-semibold text-brand group-hover:underline">
        Leave a review
      </span>
    </a>
  );
}

function PurchaseBanner({ pkg }: { pkg: DocPackage }) {
  const storeUrl = pkg.assetStoreUrl;
  if (!storeUrl) return null;
  return (
    <a
      href={storeUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="not-prose group my-4 inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-brand/50"
    >
      <ExternalLink className="h-3.5 w-3.5 text-brand" />
      <span>Don&apos;t own {pkg.name}?</span>
      <span className="text-brand group-hover:underline">Get it on the Unity Asset Store →</span>
    </a>
  );
}

// On the docs "try-demo" page we no longer embed the WebGL build inline —
// the playable demo lives at its own dedicated route. This card links there.
function DemoRedirectCard({ pkg }: { pkg: DocPackage }) {
  return (
    <Link
      to="/packages/$package/demo"
      params={{ package: pkg.slug }}
      className="not-prose group mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-brand card-shadow"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white card-grad">
        <Play className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-foreground">
          Open the {pkg.name} live demo
        </div>
        <p className="text-sm text-muted-foreground">
          Try an interactive WebGL build now. 
        </p>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:text-brand" />
    </Link>
  );
}

export function PackagePageView({
  pkg,
  page,
  isOverview,
}: {
  pkg: DocPackage;
  page: DocPage;
  isOverview: boolean;
}) {
  const currentIdx = pkg.pages.findIndex((p) => p.slug === page.slug);
  const prev = currentIdx > 0 ? pkg.pages[currentIdx - 1] : null;
  const next =
    currentIdx >= 0 && currentIdx < pkg.pages.length - 1
      ? pkg.pages[currentIdx + 1]
      : null;

  const { html, toc } = extractToc(page.html);
  const fullToc: TocItem[] = [...toc];
  if (isOverview && pkg.references.length > 0) {
    fullToc.push({ id: "references", title: "References", level: 2 });
  }

  return (
    <DocLayout toc={fullToc}>
    <article className="wiki-article">
      <div className="eyebrow mb-2">
        <Link to="/docs/$package" params={{ package: pkg.slug }} className="hover:underline">
          <span className="text-grad">{pkg.name}</span>
        </Link>{" "}
        / {page.title}
      </div>
      <h1>{page.title}</h1>
      {(pkg.status || page.status) && (
        <div className="not-prose mb-4 flex flex-wrap items-center gap-2">
          {pkg.status && (
            <StatusBadge status={pkg.status} size="md" />
          )}
          {page.status && page.status !== pkg.status && (
            <StatusBadge status={page.status} size="md" />
          )}
          <span className="text-xs text-muted-foreground">
            This {page.status && !pkg.status ? "page is" : "package is"} not
            published yet.
          </span>
        </div>
      )}
      <ReviewPrompt pkg={pkg} />
      {page.highlight && <HighlightBanner highlight={page.highlight} />}
      {isOverview && (
        <p className="mt-1 mb-6 text-lg text-muted-foreground">{pkg.tagline}</p>
      )}

      {isOverview && <PackageInfobox pkg={pkg} />}
      {isOverview && <PurchaseBanner pkg={pkg} />}

      {page.kind === "faq" || page.slug === "faq" ? (
        <FaqAccordion html={html} />
      ) : (
        <HtmlContent html={html} />
      )}

      {page.guide && page.guide.length > 0 && (
        <StepGuide steps={page.guide} />
      )}

      {page.kind === "demo" && <DemoRedirectCard pkg={pkg} />}

      {page.kind === "compatibility" && <CompatibilityTable pkg={pkg} />}

      {isOverview && pkg.references.length > 0 && (
        <section id="references">
          <h2>References</h2>
          <ol className="!pl-6 text-sm">
            {pkg.references.map((r) => (
              <li key={r.id} id={`ref-${r.id}`}>
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noreferrer noopener">
                    {r.text}
                  </a>
                ) : (
                  r.text
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      <PageFooterMeta pageKey={`${pkg.slug}/${page.slug}`} updated={page.updated} />

      <nav className="mt-12 flex items-stretch justify-between gap-3 border-t border-border pt-6 text-sm">
        {prev ? (
          <Link
            to={prev.slug === "overview" ? "/docs/$package" : "/docs/$package/$page"}
            params={
              prev.slug === "overview"
                ? { package: pkg.slug }
                : { package: pkg.slug, page: prev.slug }
            }
            className="group flex-1 rounded-xl border border-border bg-card px-4 py-3 text-left card-shadow hover:border-brand"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              ← Previous
            </div>
            <div className="mt-1 font-semibold">{prev.title}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            to="/docs/$package/$page"
            params={{ package: pkg.slug, page: next.slug }}
            className="group flex-1 rounded-xl border border-border bg-card px-4 py-3 text-right card-shadow hover:border-brand"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Next →
            </div>
            <div className="mt-1 font-semibold">{next.title}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </article>
    </DocLayout>
  );
}

