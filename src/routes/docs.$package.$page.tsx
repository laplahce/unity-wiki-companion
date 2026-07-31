import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPackage, getPackagePage } from "@/data/docs";
import { PackagePageView } from "@/components/doc-view";

export const Route = createFileRoute("/docs/$package/$page")({
  loader: ({ params }) => {
    const pkg = getPackage(params.package);
    if (!pkg) throw notFound();
    const page = getPackagePage(pkg, params.page);
    if (!page) throw notFound();
    return { pkg, page };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Page not found" }] };
    const { pkg, page } = loaderData;
    return {
      meta: [
        { title: `${page.title} - ${pkg.name}` },
        { name: "description", content: `${page.title} in the ${pkg.name} documentation.` },
      ],
    };
  },
  component: PackagePage,
});

function PackagePage() {
  const { pkg, page } = Route.useLoaderData();
  return <PackagePageView pkg={pkg} page={page} isOverview={page.slug === "overview"} />;
}
