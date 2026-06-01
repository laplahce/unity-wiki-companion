import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { getPackage } from "@/data/docs";
import { WebGLDemo } from "@/components/webgl-demo";

export const Route = createFileRoute("/packages/$package/demo")({
  loader: ({ params }) => {
    const pkg = getPackage(params.package);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => {
    const pkg = loaderData?.pkg;
    if (!pkg) return { meta: [{ title: "Demo not found — laplahce" }] };
    return {
      meta: [
        { title: `${pkg.name} demo — laplahce` },
        { name: "description", content: `Play the interactive WebGL demo for ${pkg.name}.` },
      ],
    };
  },
  component: DemoPage,
});

function DemoPage() {
  const { pkg } = Route.useLoaderData();
  const storeUrl = pkg.reviewUrl?.replace("#reviews", "");

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-10">
      <div>
        <Link
          to="/packages/$package"
          params={{ package: pkg.slug }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {pkg.name}
        </Link>
        <div className="eyebrow mt-4">Live demo</div>
        <h1 className="display mt-2 text-3xl sm:text-4xl">
          Try {pkg.name} in your browser
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The full feature set, running in WebGL — no install, no download. Use
          this to evaluate the package before buying, or to reproduce a bug.
        </p>
      </div>

      <WebGLDemo pkg={pkg} />

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-bold">How it works</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Use the on-screen controls or your keyboard.</li>
            <li>• The demo runs locally in your browser — nothing is uploaded.</li>
            <li>• Performance reflects WebGL, native is significantly faster.</li>
            <li>• Refresh the page to reset state.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-bold">Want more?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The documentation covers every feature shown here, plus the parts
            that don&apos;t fit in a demo (editor tooling, build pipeline,
            extension points).
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/docs/$package"
              params={{ package: pkg.slug }}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white card-grad"
            >
              <BookOpen className="h-4 w-4" /> Read the docs
            </Link>
            {storeUrl && (
              <a
                href={storeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:border-brand"
              >
                <ExternalLink className="h-4 w-4" /> Asset Store
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}