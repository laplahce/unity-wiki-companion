import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { getPackage } from "@/data/docs";

export const Route = createFileRoute("/packages/$package")({
  loader: ({ params }) => {
    const pkg = getPackage(params.package);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => {
    const pkg = loaderData?.pkg;
    if (!pkg) return { meta: [{ title: "Package not found — laplahce" }] };
    return {
      meta: [
        { title: `${pkg.name} — laplahce` },
        { name: "description", content: pkg.tagline },
        { property: "og:title", content: `${pkg.name} — laplahce` },
        { property: "og:description", content: pkg.tagline },
      ],
    };
  },
  component: () => <Outlet />,
});