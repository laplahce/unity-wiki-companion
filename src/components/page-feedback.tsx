import { useState } from "react";
import { Link2, Check, Printer } from "lucide-react";

// Deterministic "last updated" date per page so the timestamp is stable
// across renders/sessions without a real CMS behind it.
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function lastUpdatedFor(key: string): Date {
  const daysAgo = (hashString(key) % 75) + 3; // 3–77 days ago
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ShareLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // give up silently
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:border-brand hover:text-foreground"
      title="Copy a link to this page (includes the current section anchor)"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-brand" />
          Link copied
        </>
      ) : (
        <>
          <Link2 className="h-3.5 w-3.5" />
          Copy link
        </>
      )}
    </button>
  );
}

function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:border-brand hover:text-foreground"
      title="Print this page or save as PDF"
    >
      <Printer className="h-3.5 w-3.5" />
      Print / PDF
    </button>
  );
}

export function PageFooterMeta({
  pageKey,
  updated: updatedISO,
}: {
  pageKey: string;
  updated?: string;
}) {
  // An explicit `updated:` date in the page's markdown frontmatter wins;
  // otherwise fall back to the deterministic placeholder date.
  const parsed = updatedISO ? new Date(updatedISO) : null;
  const updated =
    parsed && !Number.isNaN(parsed.getTime()) ? parsed : lastUpdatedFor(pageKey);

  return (
    <div className="not-prose mt-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm print:hidden">
      <div className="text-xs text-muted-foreground">
        Last updated{" "}
        <time dateTime={updated.toISOString()} className="font-medium text-foreground">
          {formatDate(updated)}
        </time>
      </div>
      <div className="flex items-center gap-2">
        <ShareLinkButton />
        <PrintButton />
      </div>
    </div>
  );
}
