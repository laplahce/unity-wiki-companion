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
    if (!pkg) return { meta: [{ title: "Package not found" }] };
    return {
      meta: [
        { title: `${pkg.name}` },
        { name: "description", content: pkg.tagline },
        { property: "og:title", content: `${pkg.name}` },
        { property: "og:description", content: pkg.tagline },
      ],
    };
  },
  component: () => <Outlet />,
});
