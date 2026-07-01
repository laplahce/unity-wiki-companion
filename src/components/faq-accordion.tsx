import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HtmlContent } from "@/components/html-content";

// Splits FAQ HTML (a flat <h3>question</h3><p>answer</p>... sequence, possibly
// preceded by an intro h2/paragraphs) into an intro block + collapsible Q&A.
export function FaqAccordion({ html }: { html: string }) {
  // Accept h2 or h3 as the question heading — markdown authors reach for `##`
  // more naturally, but existing content may still use h3.
  const parts = html.split(/(?=<h[23][\s>])/i);
  const intro = parts[0] ?? "";
  const items = parts.slice(1).flatMap((part, i) => {
    const m = part.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>([\s\S]*)/i);
    if (!m) return [];
    return [{ question: m[1].trim(), answer: m[2].trim(), id: `faq-${i}` }];
  });

  return (
    <>
      {intro && <HtmlContent html={intro} />}
      {items.length > 0 && (
        <div className="not-prose my-6 rounded-2xl border border-border bg-card card-shadow">
          <Accordion type="multiple" className="divide-y divide-border">
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b-0 px-4"
              >
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  <span dangerouslySetInnerHTML={{ __html: item.question }} />
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <div
                    className="wiki-article"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </>
  );
}