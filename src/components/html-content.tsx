import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/common";
import "highlight.js/styles/github-dark.css";

const COPY_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const CHECK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

// Renders trusted HTML, syntax-highlights every <pre><code>, and injects
// a copy-icon button + language label on each code block.
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

      // Syntax highlight: respect language-xxx class if present, otherwise auto-detect.
      const codeEl = pre.querySelector("code");
      let language = "";
      if (codeEl) {
        const cls = Array.from(codeEl.classList).find((c) =>
          c.startsWith("language-"),
        );
        if (cls) {
          language = cls.replace("language-", "");
          try {
            const result = hljs.highlight(codeEl.textContent ?? "", {
              language,
              ignoreIllegals: true,
            });
            codeEl.innerHTML = result.value;
          } catch {
            const result = hljs.highlightAuto(codeEl.textContent ?? "");
            codeEl.innerHTML = result.value;
            language = result.language ?? "";
          }
        } else {
          const result = hljs.highlightAuto(codeEl.textContent ?? "");
          codeEl.innerHTML = result.value;
          language = result.language ?? "";
        }
        codeEl.classList.add("hljs");
      }

      // Language label badge (top-left).
      if (language) {
        const label = document.createElement("span");
        label.className =
          "absolute left-3 top-2 select-none text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70";
        label.textContent = language;
        pre.appendChild(label);
        cleanups.push(() => label.remove());
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy code");
      btn.title = "Copy code";
      btn.className =
        "copy-btn absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground backdrop-blur transition hover:border-brand hover:text-brand";
      btn.innerHTML = COPY_SVG;

      const onClick = async () => {
        const code = pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          btn.innerHTML = CHECK_SVG;
          btn.classList.add("text-brand");
          setTimeout(() => {
            btn.innerHTML = COPY_SVG;
            btn.classList.remove("text-brand");
          }, 1500);
        } catch {
          btn.title = "Copy failed";
          setTimeout(() => (btn.title = "Copy code"), 1500);
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
