import type { WikiArticle } from "@/data/articles";
import { Link } from "@tanstack/react-router";

export function Infobox({ article }: { article: WikiArticle }) {
  const { infobox, title, tagline, category } = article;
  return (
    <aside className="float-none mb-6 w-full overflow-hidden rounded-2xl border border-border bg-card text-sm card-shadow sm:float-right sm:ml-8 sm:w-[320px]">
      {infobox.image && (
        <div
          className="flex h-36 w-full items-center justify-center"
          style={{ background: infobox.image.color }}
        >
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
            {infobox.image.label}
          </span>
        </div>
      )}
      <div className="px-4 py-3 border-b border-border">
        <div className="text-base font-bold leading-tight">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{tagline}</div>
      </div>
      <table className="w-full">
        <tbody>
          <tr className="border-b border-border">
            <td className="w-[40%] px-4 py-2 align-top text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Category
            </td>
            <td className="px-4 py-2 align-top">{category}</td>
          </tr>
          {infobox.fields.map((f) => (
            <tr key={f.label} className="border-b border-border last:border-0">
              <td className="w-[40%] px-4 py-2 align-top text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {f.label}
              </td>
              <td className="px-4 py-2 align-top">{f.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}

export function ArticleToc({ article }: { article: WikiArticle }) {
  return (
    <nav className="mb-8 inline-block min-w-[280px] rounded-2xl border border-border bg-card px-5 py-4 text-sm card-shadow">
      <div className="eyebrow mb-2">Contents</div>
      <ol className="list-decimal space-y-1 pl-5">
        {article.sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="nav-link">
              <span className="mr-1 text-muted-foreground">{i + 1}</span>
              {s.title}
            </a>
          </li>
        ))}
        <li>
          <a href="#references" className="nav-link">
            <span className="mr-1 text-muted-foreground">
              {article.sections.length + 1}
            </span>
            References
          </a>
        </li>
        {article.seeAlso.length > 0 && (
          <li>
            <a href="#see-also" className="nav-link">
              <span className="mr-1 text-muted-foreground">
                {article.sections.length + 2}
              </span>
              See also
            </a>
          </li>
        )}
      </ol>
    </nav>
  );
}

export function ArticleBody({ article }: { article: WikiArticle }) {
  return (
    <article className="wiki-article">
      <div className="eyebrow mb-2">UnityWiki</div>
      <h1>{article.title}</h1>
      <p className="mt-1 mb-6 text-lg text-muted-foreground">{article.tagline}</p>


      <Infobox article={article} />

      <div dangerouslySetInnerHTML={{ __html: article.lead }} />

      <ArticleToc article={article} />

      {article.sections.map((s) => (
        <section key={s.id} id={s.id}>
          <h2>{s.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: s.html }} />
        </section>
      ))}

      <section id="references">
        <h2>References</h2>
        <ol className="!pl-6 text-sm">
          {article.references.map((r) => (
            <li key={r.id} id={`ref-${r.id}`}>
              {r.url ? (
                <a href={r.url} target="_blank" rel="noreferrer noopener">
                  {r.text}
                </a>
              ) : (
                r.text
              )}
            </li>
          ))}
        </ol>
      </section>

      {article.seeAlso.length > 0 && (
        <section id="see-also">
          <h2>See also</h2>
          <ul>
            {article.seeAlso.map((slug) => (
              <li key={slug}>
                <Link to="/wiki/$slug" params={{ slug }}>
                  {slug
                    .split("-")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" ")}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
