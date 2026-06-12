import { CircleDashed, Clock } from "lucide-react";

export type PublishStatus = "in-development" | "awaiting-review";

export const STATUS_LABEL: Record<PublishStatus, string> = {
  "in-development": "In Development",
  "awaiting-review": "Awaiting Asset Store Review",
};

export const STATUS_DESCRIPTION: Record<PublishStatus, string> = {
  "in-development":
    "Still actively being built. The page or package isn't published yet.",
  "awaiting-review":
    "Submitted to the Unity Asset Store and waiting for their review team to approve the release.",
};

const STATUS_STYLE: Record<PublishStatus, string> = {
  "in-development":
    "border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-300",
  "awaiting-review":
    "border-sky-400/40 bg-sky-400/10 text-sky-700 dark:text-sky-300",
};

const STATUS_ICON: Record<PublishStatus, React.ComponentType<{ className?: string }>> = {
  "in-development": CircleDashed,
  "awaiting-review": Clock,
};

export function StatusBadge({
  status,
  size = "sm",
  className = "",
}: {
  status: PublishStatus;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const Icon = STATUS_ICON[status];
  const sizeCls =
    size === "md"
      ? "px-2.5 py-1 text-xs"
      : size === "xs"
        ? "px-1.5 py-0.5 text-[10px]"
        : "px-2 py-0.5 text-[11px]";
  const iconCls = size === "md" ? "h-3.5 w-3.5" : "h-3 w-3";
  return (
    <span
      title={STATUS_DESCRIPTION[status]}
      className={`inline-flex shrink-0 items-center gap-1 rounded-md border font-semibold uppercase tracking-wide whitespace-nowrap ${sizeCls} ${STATUS_STYLE[status]} ${className}`}
    >
      <Icon className={iconCls} />
      {STATUS_LABEL[status]}
    </span>
  );
}

// Compact, label-less dot for tight spots like sidebar list items.
export function StatusDot({
  status,
  className = "",
}: {
  status: PublishStatus;
  className?: string;
}) {
  const color =
    status === "in-development"
      ? "bg-amber-500"
      : "bg-sky-500";
  return (
    <span
      title={`${STATUS_LABEL[status]} — ${STATUS_DESCRIPTION[status]}`}
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${color} ${className}`}
    />
  );
}
