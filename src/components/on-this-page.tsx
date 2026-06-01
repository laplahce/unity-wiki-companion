import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export function OnThisPage({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    items[0]?.id ?? null,
  );

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const getNavH = () => {
      const header = document.querySelector("header");
      return header instanceof HTMLElement ? header.offsetHeight : 64;
    };

    const onScroll = () => {
      const navH = getNavH();
      // Treat headings as "active" once they've scrolled into the upper
      // quarter of the visible content area (below the navbar). This
      // matches what the reader is actually looking at instead of waiting
      // for the heading to reach the very top.
      const visibleH = window.innerHeight - navH;
      const line = navH + Math.max(80, visibleH * 0.25);
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top - line <= 0) current = h.id;
        else break;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = headings[headings.length - 1].id;
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-24 text-sm">
        <div className="eyebrow-sidebar mb-4 pl-3">On this page</div>
        <ul className="space-y-0 border-l border-border">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", `#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
                className={`block border-l-2 py-1 text-muted-foreground transition-colors hover:text-foreground ${
                  item.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === item.id
                    ? "border-brand font-medium text-foreground"
                    : "border-transparent"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
