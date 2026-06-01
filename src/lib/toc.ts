// Extract a table of contents from an HTML string and inject stable ids
// onto the headings so the "On this page" sidebar can link to them.

export type TocItem = { id: string; title: string; level: number };

function slugify(text: string): string {
  return (
    text
      .replace(/<[^>]+>/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section"
  );
}

export function extractToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const out = html.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const title = inner.replace(/<[^>]+>/g, "").trim();
      if (!title) return _match;

      const base = slugify(title);
      let id = base;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);

      const level = tag.toLowerCase() === "h2" ? 2 : 3;
      toc.push({ id, title, level });

      const attrsWithoutId = attrs.replace(/\sid=("[^"]*"|'[^']*')/i, "");
      return `<${tag}${attrsWithoutId} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html: out, toc };
}
