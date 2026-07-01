import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
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
      <div className="not-prose my-6 flex flex-col gap-3">
        {items.map((item) => (
          <FaqItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

function FaqItem({
  item,
}: {
  item: { question: string; answer: string; id: string };
}) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-2xl border border-border bg-card card-shadow overflow-hidden">
        <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold cursor-pointer transition-colors hover:bg-muted/40">
          <span dangerouslySetInnerHTML={{ __html: item.question }} />
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
            <div
              className="wiki-article"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}