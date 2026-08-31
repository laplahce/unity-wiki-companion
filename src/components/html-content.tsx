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
        const source = codeEl.textContent ?? "";

        const wrapLines = (highlighted: string) => {
          const lines = highlighted.split("\n");
          return lines
            .map((line, index) => {
              const isLastEmpty = index === lines.length - 1 && line === "";
              const content = isLastEmpty ? "&nbsp;" : line || " ";
              return `<span class="code-line" style="display:block; min-height:1.5em; white-space:pre; padding:0 0.75rem 0 0.25rem;${index === 0 ? " margin-top:0;" : ""}">${content}</span>`;
            })
            .join("");
        };

        if (cls) {
          language = cls.replace("language-", "");
          try {
            const result = hljs.highlight(source, {
              language,
              ignoreIllegals: true,
            });
            codeEl.innerHTML = wrapLines(result.value);
          } catch {
            const result = hljs.highlightAuto(source);
            codeEl.innerHTML = wrapLines(result.value);
            language = result.language ?? "";
          }
        } else {
          const result = hljs.highlightAuto(source);
          codeEl.innerHTML = wrapLines(result.value);
          language = result.language ?? "";
        }

        codeEl.classList.add("hljs");
        codeEl.style.display = "block";
        codeEl.style.whiteSpace = "pre";
        codeEl.style.lineHeight = "1.6";
        codeEl.style.padding = "1.1rem 1rem 0";
        codeEl.style.marginBottom = "-1rem";
        codeEl.style.tabSize = "4";
        codeEl.style.textAlign = "left";
        codeEl.style.background = "#292D3E";
      }

      pre.className = `${pre.className} relative overflow-x-auto rounded-xl border border-border/70 bg-[#30364C] text-sm leading-6 text-[#c9d1d9] shadow-[0_8px_24px_rgba(15,23,42,0.18)]`;

      // Language label badge (top-left).
      if (language) {
        const label = document.createElement("span");
        label.className =
          "absolute left-20 top-2 select-none text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70";
        label.textContent = language;
        pre.appendChild(label);
        cleanups.push(() => label.remove());
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy code");
      btn.title = "Copy code";
      btn.className = "copy-btn absolute right-3 top-2 inline-flex h-6 w-6 items-center justify-center rounded border border-[#454B63] bg-[#363B52] text-[#A7AEC4] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[#59617D] hover:bg-[#40465F] hover:text-[#D0D5E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#59617D]";
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
