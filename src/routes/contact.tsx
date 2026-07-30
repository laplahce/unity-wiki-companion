import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/data/site";
import { PACKAGES } from "@/data/docs";
import { Mail, MessageCircle, HelpCircle, BookOpen } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — laplahce" },
      {
        name: "description",
        content:
          "Get in touch with me for support, feedback, or questions about my Unity Asset Store packages.",
      },
      { property: "og:title", content: "Contact — laplahce" },
      {
        property: "og:description",
        content:
          "Get in touch with me for support, feedback, or questions about my Unity Asset Store packages.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="pt-6">
        <div className="eyebrow">Say hi</div>
        <h1 className="display mt-3 text-3xl sm:text-4xl">Get in touch</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Got a question about one of my packages, found a bug, or just want
          to say hi? Here&apos;s the easiest way to reach me — I usually reply
          within a day.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <Mail className="h-5 w-5 text-accent-foreground" />
          </div>
          <h3 className="text-base font-bold">Email me</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Best for general questions, feedback, and partnership ideas.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
          >
            {SITE.email}
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <HelpCircle className="h-5 w-5 text-accent-foreground" />
          </div>
          <h3 className="text-base font-bold">Bug or doc issue</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Found a bug in a package or something off in my docs? Let me know
            and I&apos;ll fix it.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Bug%20report`}
            className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Report an issue
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <BookOpen className="h-5 w-5 text-accent-foreground" />
          </div>
          <h3 className="text-base font-bold">Feature request</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Wish one of my packages did something it doesn&apos;t? Tell me —
            I read every email.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Feature%20request`}
            className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Send a request
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <MessageCircle className="h-5 w-5 text-accent-foreground" />
          </div>
          <h3 className="text-base font-bold">Response time</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            I usually reply within a day. For anything urgent, email is the
            fastest way to reach me.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="display text-xl">Frequently asked questions</h2>
        <div className="mt-6 space-y-5">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
              Are you affiliated with Unity Technologies?
              <span className="ml-2 text-muted-foreground transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Nope. I&apos;m an independent developer. I sell my own packages
              on the Asset Store, but I&apos;m not affiliated with Unity
              Technologies in any way.
            </p>
          </details>
          <div className="h-px bg-border" />
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
              Can I use your packages in a commercial game?
              <span className="ml-2 text-muted-foreground transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes — the Asset Store license covers commercial use. Check the
              license tab on each package page if you want the exact terms.
            </p>
          </details>
          <div className="h-px bg-border" />
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
              Do you offer custom work or consulting?
              <span className="ml-2 text-muted-foreground transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Occasionally, depending on the project and my schedule. Send me
              an email with the details and I&apos;ll let you know.
            </p>
          </details>
          <div className="h-px bg-border" />
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
              How do I buy a package?
              <span className="ml-2 text-muted-foreground transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              All my packages are listed on the{" "}
              <a
                href={SITE.assetStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand hover:underline"
              >
                Unity Asset Store
              </a>
              . Each package page on this site also links straight to its
              Asset Store listing.
            </p>
          </details>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="display text-xl">Browse my packages</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {PACKAGES.map((p) => (
            <Link
              key={p.slug}
              to="/packages/$package"
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
