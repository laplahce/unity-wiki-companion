import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PACKAGES } from "@/data/docs";

type Hit = {
  pkgSlug: string;
  pkgName: string;
  pageSlug: string;
  pageTitle: string;
};

const INDEX: Hit[] = PACKAGES.flatMap((pkg) =>
  pkg.pages.map((page) => ({
    pkgSlug: pkg.slug,
    pkgName: pkg.name,
    pageSlug: page.slug,
    pageTitle: page.title,
  })),
);

export function SiteSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as Hit[];
    return INDEX.filter(
      (h) =>
        h.pageTitle.toLowerCase().includes(term) ||
        h.pkgName.toLowerCase().includes(term),
    ).slice(0, 8);
  }, [q]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function go(h: Hit) {
    setOpen(false);
    setQ("");
    if (h.pageSlug === "overview") {
      navigate({ to: "/docs/$package", params: { package: h.pkgSlug } });
    } else {
      navigate({
        to: "/docs/$package/$page",
        params: { package: h.pkgSlug, page: h.pageSlug },
      });
    }
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-xs">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search docs…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              go(results[active]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className="h-9 w-full rounded-lg border border-border bg-card pl-8 pr-3 text-sm outline-none transition focus:border-brand"
        />
      </div>
      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1.5 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
          {results.length === 0 ? (
            <div className="px-3 py-4 text-sm text-muted-foreground">
              No results for &ldquo;{q}&rdquo;
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((h, i) => (
                <li key={`${h.pkgSlug}/${h.pageSlug}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(h)}
                    className={`flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm transition-colors ${
                      i === active ? "bg-accent" : ""
                    }`}
                  >
                    <span className="font-medium">{h.pageTitle}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {h.pkgName}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
