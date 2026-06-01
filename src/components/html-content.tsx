import { useEffect, useRef, useState } from "react";

// Renders trusted HTML and injects a "Copy" button on every <pre> code block.
export function HtmlContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pres = ref.current.querySelectorAll<HTMLPreElement>("pre");
    const cleanups: Array<() => void> = [];

    pres.forEach((pre) => {
      if (pre.dataset.copyEnhanced === "1") return;
      pre.dataset.copyEnhanced = "1";
      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy code");
      btn.className =
        "copy-btn absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-border bg-background/80 px-2 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur transition hover:border-brand hover:text-brand";
      const setLabel = (label: string) => {
        btn.textContent = label;
      };
      setLabel("Copy");

      const onClick = async () => {
        const code = pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          setLabel("Copied");
          setTimeout(() => setLabel("Copy"), 1500);
        } catch {
          setLabel("Failed");
          setTimeout(() => setLabel("Copy"), 1500);
        }
      };
      btn.addEventListener("click", onClick);
      pre.appendChild(btn);
      cleanups.push(() => {
        btn.removeEventListener("click", onClick);
        btn.remove();
        delete pre.dataset.copyEnhanced;
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
