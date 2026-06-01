import { Link } from "@tanstack/react-router";
import { Star, Sparkles, ExternalLink, Play, ArrowRight } from "lucide-react";
import type { DocPackage, DocPage } from "@/data/docs";
import { extractToc, type TocItem } from "@/lib/toc";
import { OnThisPage } from "@/components/on-this-page";
import { StepGuide } from "@/components/step-guide";
import { HtmlContent } from "@/components/html-content";
import { PageFooterMeta } from "@/components/page-feedback";

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
      <div
        className="flex h-36 w-full items-center justify-center"
        style={{ background: pkg.color }}
      >
        <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
          {pkg.label}
        </span>
      </div>
      <div className="px-4 py-3 border-b border-border">
        <div className="text-base font-bold leading-tight">{pkg.name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{pkg.tagline}</div>
      </div>
      <table className="w-full">
        <tbody>
          {pkg.infoboxFields.map((f) => (
            <tr key={f.label} className="border-b border-border last:border-0">
              <td className="w-[40%] px-4 py-2 align-top text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {f.label}
              </td>
              <td className="px-4 py-2 align-top">{f.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}

function ReviewPrompt({ pkg }: { pkg: DocPackage }) {
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
  if (!pkg.reviewUrl) return null;
  return (
    <a
      href={pkg.reviewUrl.replace("#reviews", "")}
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

// Prominent callout shown on emphasized pages (e.g. Installation) to signal
// that this is one of the most important pages in the package docs.
function EmphasisBanner({ pkg, page }: { pkg: DocPackage; page: DocPage }) {
  return (
    <div className="not-prose my-4 inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground mx-[8px]">
      <Sparkles className="h-3.5 w-3.5 text-brand" />
      <span>Start here — recommended first read</span>
    </div>
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
          {pkg.name}
        </Link>{" "}
        / {page.title}
      </div>
      <h1>{page.title}</h1>
      <ReviewPrompt pkg={pkg} />
      {page.emphasized && <EmphasisBanner pkg={pkg} page={page} />}
      {isOverview && (
        <p className="mt-1 mb-6 text-lg text-muted-foreground">{pkg.tagline}</p>
      )}

      {isOverview && <PackageInfobox pkg={pkg} />}
      {isOverview && <PurchaseBanner pkg={pkg} />}

      <HtmlContent html={html} />

      {page.guide && page.guide.length > 0 && (
        <StepGuide steps={page.guide} />
      )}

      {page.kind === "demo" && <DemoRedirectCard pkg={pkg} />}

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

      <PageFooterMeta pageKey={`${pkg.slug}/${page.slug}`} />

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

