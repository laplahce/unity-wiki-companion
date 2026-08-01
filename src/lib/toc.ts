// Extract a table of contents from an HTML string and inject stable ids
// onto the headings so the "On this page" sidebar can link to them.

export type TocItem = { id: string; title: string; level: number };

// Decode the handful of entities the markdown renderer emits so TOC labels
// read as plain text (e.g. "Don&#39;t" -> "Don't").
export function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_m, d: string) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, h: string) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function slugify(text: string): string {
  return (
    decodeEntities(text)
      .replace(/<[^>]+>/g, "")
      .toLowerCase()
      .trim()
      // drop apostrophes/quotes entirely instead of turning them into dashes
      .replace(/['\u2018\u2019\u201c\u201d"]/g, "")
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
      const title = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
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
