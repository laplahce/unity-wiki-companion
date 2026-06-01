import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPackage } from "@/data/docs";
import { PackagePageView } from "@/components/doc-view";

export const Route = createFileRoute("/docs/$package/")({
  loader: ({ params }) => {
    const pkg = getPackage(params.package);
    if (!pkg) throw notFound();
    return { pkg };
  },
  component: PackageOverview,
});

function PackageOverview() {
  const { pkg } = Route.useLoaderData();
  return <PackagePageView pkg={pkg} page={pkg.pages[0]} isOverview />;
}
