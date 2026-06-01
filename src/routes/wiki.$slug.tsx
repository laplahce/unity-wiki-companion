import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wiki/$slug")({
  loader: ({ params }) => {
    throw redirect({
      to: "/docs/$package",
      params: { package: params.slug },
    });
  },
});
