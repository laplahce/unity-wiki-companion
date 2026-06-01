import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PACKAGES } from "@/data/docs";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/docs", changefreq: "weekly", priority: "0.9" },
          ...PACKAGES.flatMap((p) => [
            { path: `/packages/${p.slug}`, changefreq: "monthly" as const, priority: "0.95" },
            { path: `/packages/${p.slug}/demo`, changefreq: "monthly" as const, priority: "0.8" },
            { path: `/docs/${p.slug}`, changefreq: "monthly" as const, priority: "0.9" },
            ...p.pages
              .filter((page) => page.slug !== "overview")
              .map((page) => ({
                path: `/docs/${p.slug}/${page.slug}`,
                changefreq: "monthly" as const,
                priority: "0.7",
              })),
          ]),
        ];

        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
