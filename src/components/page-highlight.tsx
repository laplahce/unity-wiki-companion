import {
  Download,
  Sparkles,
  RefreshCw,
  FlaskConical,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

// Special-page markers a `.md` file can declare with `highlight: <value>` in
// its frontmatter. They drive the sidebar dot/icon and the banner at the top
// of the page — purely presentational, no routing meaning.
export type PageHighlight =
  | "start-here"
  | "new"
  | "updated"
  | "experimental"
  | "advanced"
  | "deprecated";

export const HIGHLIGHTS: Record<
  PageHighlight,
  {
    label: string;
    banner: string;
    icon: React.ComponentType<{ className?: string }>;
    dot: string;
    text: string;
  }
> = {
  "start-here": {
    label: "Start here",
    banner: "Start here — recommended first read",
    icon: Download,
    dot: "bg-brand",
    text: "text-brand",
  },
  new: {
    label: "New",
    banner: "New page — recently added to these docs",
    icon: Sparkles,
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  updated: {
    label: "Updated",
    banner: "Updated — this page changed in the latest release",
    icon: RefreshCw,
    dot: "bg-sky-500",
    text: "text-sky-600 dark:text-sky-400",
  },
  experimental: {
    label: "Experimental",
    banner: "Experimental — the API described here can still change",
    icon: FlaskConical,
    dot: "bg-violet-500",
    text: "text-violet-600 dark:text-violet-400",
  },
  advanced: {
    label: "Advanced",
    banner: "Advanced — assumes you already went through the basics",
    icon: GraduationCap,
    dot: "bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  deprecated: {
    label: "Deprecated",
    banner: "Deprecated — kept for reference, avoid in new projects",
    icon: AlertTriangle,
    dot: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
  },
};

export function HighlightDot({ highlight }: { highlight: PageHighlight }) {
  const h = HIGHLIGHTS[highlight];
  return (
    <span
      title={h.banner}
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${h.dot}`}
    />
  );
}

export function HighlightBanner({ highlight }: { highlight: PageHighlight }) {
  const h = HIGHLIGHTS[highlight];
  const Icon = h.icon;
  return (
    <div className="not-prose my-4 inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground mx-[8px]">
      <Icon className={`h-3.5 w-3.5 ${h.text}`} />
      <span>{h.banner}</span>
    </div>
  );
}