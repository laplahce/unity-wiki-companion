import { createFileRoute, Link } from "@tanstack/react-router";
import { PACKAGES } from "@/data/docs";
import { Mail, MessageCircle, HelpCircle, BookOpen } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — UnityWiki" },
      {
        name: "description",
        content:
          "Get in touch with UnityWiki for support, feedback, or questions about Asset Store documentation.",
      },
      { property: "og:title", content: "Contact & Support — UnityWiki" },
      {
        property: "og:description",
        content:
          "Get in touch with UnityWiki for support, feedback, or questions about Asset Store documentation.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="pt-6">
        <div className="eyebrow">Support</div>
        <h1 className="display mt-3 text-3xl sm:text-4xl">Contact &amp; Support</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Have a question, found an issue, or want to suggest a package for documentation?
          Here are the best ways to reach us.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <Mail className="h-5 w-5 text-accent-foreground" />
          </div>
          <h3 className="text-base font-bold">Email us</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            For general inquiries, feedback, and partnership requests.
          </p>
          <a
            href="mailto:support@unitywiki.dev"
            className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
          >
            support@unitywiki.dev
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <HelpCircle className="h-5 w-5 text-accent-foreground" />
          </div>
          <h3 className="text-base font-bold">Documentation issues</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Found a typo, broken link, or outdated API reference? Let us know.
          </p>
          <a
            href="mailto:support@unitywiki.dev?subject=Documentation%20Issue"
            className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Report an issue
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <BookOpen className="h-5 w-5 text-accent-foreground" />
          </div>
          <h3 className="text-base font-bold">Request a package</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Want us to document a specific Asset Store package? Send a request.
          </p>
          <a
            href="mailto:support@unitywiki.dev?subject=Package%20Request"
            className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Request documentation
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <MessageCircle className="h-5 w-5 text-accent-foreground" />
          </div>
          <h3 className="text-base font-bold">Response time</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We typically reply within 1–2 business days. For urgent issues, email is fastest.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="display text-xl">Frequently asked questions</h2>
        <div className="mt-6 space-y-5">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
              Is UnityWiki affiliated with Unity Technologies?
              <span className="ml-2 text-muted-foreground transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              No. UnityWiki is an independent educational reference and is not affiliated with
              Unity Technologies or any Asset Store publisher.
            </p>
          </details>
          <div className="h-px bg-border" />
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
              Can I contribute documentation?
              <span className="ml-2 text-muted-foreground transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              At this time contributions are managed internally. If you are interested in
              collaborating, reach out via email and we will review your request.
            </p>
          </details>
          <div className="h-px bg-border" />
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
              Where can I find the original vendor docs?
              <span className="ml-2 text-muted-foreground transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Each package page includes a references section with links back to the official
              documentation from the vendor. We always encourage checking the source for the
              latest updates.
            </p>
          </details>
          <div className="h-px bg-border" />
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
              Do you host the actual Asset Store packages?
              <span className="ml-2 text-muted-foreground transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              No — UnityWiki only provides documentation. To purchase or download a package,
              visit the{" "}
              <a
                href="https://assetstore.unity.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand hover:underline"
              >
                Unity Asset Store
              </a>{" "}
              directly.
            </p>
          </details>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="display text-xl">Browse documentation</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {PACKAGES.map((p) => (
            <Link
              key={p.slug}
              to="/docs/$package"
              params={{ package: p.slug }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:bg-surface-alt"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg card-grad text-sm font-extrabold text-white">
                {p.label.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
