import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react";
import type { GuideStep } from "@/data/docs";

// localStorage key that records whether the user has already seen the
// "how this guide works" coachmark. Once set, the intro is skipped forever.
const COACHMARK_KEY = "lovable.guide.coachmark.seen.v1";

function hasSeenCoachmark(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(COACHMARK_KEY) === "1";
  } catch {
    return true;
  }
}

function markCoachmarkSeen() {
  try {
    window.localStorage.setItem(COACHMARK_KEY, "1");
  } catch {
    /* ignore storage errors (private mode, etc.) */
  }
}

/**
 * A navigable step-by-step visual guide.
 *
 * - Each step shows a GIF (or placeholder) plus a title and caption.
 * - Users move between steps with the Prev/Next controls or the step dots.
 * - The very first time a user opens any guide, a coachmark dims the page and
 *   highlights the Next control to explain how to navigate. We persist that the
 *   user has seen it (localStorage) and skip it on every later visit.
 */
export function StepGuide({ steps }: { steps: GuideStep[] }) {
  const [index, setIndex] = useState(0);
  const [showCoachmark, setShowCoachmark] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<DOMRect | null>(null);

  const last = steps.length - 1;
  const step = steps[index];

  // Show the intro coachmark on first ever visit.
  useEffect(() => {
    if (hasSeenCoachmark()) return;
    // Wait a frame so layout (images, fonts) has settled before measuring.
    const t = window.setTimeout(() => setShowCoachmark(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  // Track the Next button's position so the spotlight follows it (and reacts to
  // scrolling / resizing) while the coachmark is open.
  useEffect(() => {
    if (!showCoachmark) return;
    const update = () => {
      if (nextRef.current) setSpotlight(nextRef.current.getBoundingClientRect());
    };
    // Bring the whole guide card into view first, then keep re-measuring while
    // the smooth scroll animates so the spotlight lands on the button.
    const el = rootRef.current ?? nextRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const target =
        window.scrollY + rect.top - Math.max(24, (window.innerHeight - rect.height) / 2);
      window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    }
    update();
    const started = Date.now();
    const poll = window.setInterval(() => {
      update();
      if (Date.now() - started > 1200) window.clearInterval(poll);
    }, 50);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.clearInterval(poll);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [showCoachmark]);

  const dismissCoachmark = () => {
    markCoachmarkSeen();
    setShowCoachmark(false);
  };

  const goNext = () => setIndex((i) => Math.min(i + 1, last));
  const goPrev = () => setIndex((i) => Math.max(i - 1, 0));

  if (steps.length === 0) return null;

  return (
    <div ref={rootRef} className="not-prose my-8 scroll-mt-24">
      <div className="overflow-hidden rounded-2xl border border-border bg-card card-shadow">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <MousePointerClick className="h-4 w-4 text-brand" />
            Step-by-step guide
          </div>
          <div className="text-xs font-medium text-muted-foreground">
            Step {index + 1} of {steps.length}
          </div>
        </div>

        {/* GIF / visual */}
        <div className="relative aspect-video w-full bg-black">
          {step.gif ? (
            <img
              src={step.gif}
              alt={step.title}
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted to-muted/60 text-center">
              <span className="text-sm font-semibold text-muted-foreground">
                GIF coming soon
              </span>
              <span className="max-w-xs px-4 text-xs text-muted-foreground/80">
                Add a recording for this step in <code>GUIDES</code>.
              </span>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="px-5 py-4">
          <div className="text-base font-semibold">{step.title}</div>
          <p className="mt-1 text-sm text-muted-foreground">{step.caption}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:border-brand hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card disabled:hover:border-border"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>

          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-5 bg-brand" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>

          <button
            ref={nextRef}
            type="button"
            onClick={goNext}
            disabled={index === last}
            className="relative inline-flex cursor-pointer items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand/85 hover:shadow-lg hover:ring-2 hover:ring-brand/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-brand disabled:hover:shadow-sm disabled:hover:ring-0"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* First-visit coachmark */}
      {showCoachmark && (
        <Coachmark spotlight={spotlight} onDismiss={dismissCoachmark} />
      )}
    </div>
  );
}

function Coachmark({
  spotlight,
  onDismiss,
}: {
  spotlight: DOMRect | null;
  onDismiss: () => void;
}) {
  // Position the tooltip above or below the highlighted button depending on
  // available room, and clamp it inside the viewport so it can never render
  // off-screen on small or unusual resolutions.
  const vw = typeof window === "undefined" ? 1024 : window.innerWidth;
  const vh = typeof window === "undefined" ? 768 : window.innerHeight;
  const TOOLTIP_W = Math.min(256, vw - 24);
  const TOOLTIP_H = 200; // approximate; used only to choose a side
  const margin = 12;

  const roomBelow = spotlight ? vh - spotlight.bottom : 0;
  const roomAbove = spotlight ? spotlight.top : 0;
  const tooltipBelow = spotlight
    ? roomBelow >= TOOLTIP_H + margin || roomBelow >= roomAbove
    : true;

  const centerX = spotlight ? spotlight.left + spotlight.width / 2 : vw / 2;
  const clampedX = Math.min(
    Math.max(centerX, TOOLTIP_W / 2 + margin),
    vw - TOOLTIP_W / 2 - margin,
  );
  const rawY = spotlight
    ? tooltipBelow
      ? spotlight.bottom + 14
      : spotlight.top - 14
    : vh / 2;
  const clampedY = Math.min(Math.max(rawY, margin), vh - margin);

  return (
    <div
      className="fixed inset-0 z-[100] animate-fade-in"
      role="dialog"
      aria-label="How the step-by-step guide works"
      onClick={onDismiss}
    >
      {/* Dim layer with a spotlight cut out around the Next button */}
      {spotlight ? (
        <div
          className="pointer-events-none absolute rounded-xl ring-2 ring-white/90"
          style={{
            top: spotlight.top - 6,
            left: spotlight.left - 6,
            width: spotlight.width + 12,
            height: spotlight.height + 12,
            boxShadow: "0 0 0 9999px rgba(2, 6, 23, 0.72)",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-[rgba(2,6,23,0.72)]" />
      )}

      {/* Tooltip — anchored to the button's center, offset clear of it */}
      {spotlight && (
        <div
          className="absolute max-h-[80vh] overflow-auto rounded-xl border border-border bg-card p-4 text-center card-shadow animate-scale-in"
          style={{
            width: TOOLTIP_W,
            left: clampedX,
            top: clampedY,
            transform: tooltipBelow
              ? "translate(-50%, 0)"
              : "translate(-50%, -100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >

          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-brand">
            <MousePointerClick className="h-5 w-5" />
          </div>
          <div className="text-sm font-semibold">This is a step-by-step guide</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Use <b>Next</b> and <b>Prev</b> (or the dots) to move through each
            step. Each step has a short clip and a tip.
          </p>
          <button
            type="button"
            onClick={onDismiss}
            className="mt-3 w-full rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
