import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { DocPackage } from "@/data/docs";

/**
 * Embeds a playable WebGL demo for a package.
 *
 * To wire up a real demo, add the build's URL to `DEMO_URLS` in
 * `src/data/docs.ts`, keyed by the package slug. The URL should point at the
 * `index.html` of a published WebGL export (e.g. a Unity WebGL build hosted on
 * any static host or storage bucket). Until then this renders a placeholder.
 */
export function WebGLDemo({ pkg }: { pkg: DocPackage }) {
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!pkg.demoUrl) {
    return (
      <div className="not-prose mt-6 flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
        <div className="text-lg font-semibold">Demo coming soon</div>
        <p className="max-w-md text-sm text-muted-foreground">
          The interactive WebGL demo for {pkg.name} hasn&apos;t been added yet.
          Once the build is ready it will be playable right here.
        </p>
      </div>
    );
  }

  return (
    <div className="not-prose mt-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black card-shadow">
        {started ? (
          <>
            <iframe
              src={pkg.demoUrl}
              title={`${pkg.name} WebGL demo`}
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; gamepad; xr-spatial-tracking"
              allowFullScreen
            />
            {!loaded && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-black/85 to-black/70 text-white">
                <Loader2 className="h-8 w-8 animate-spin text-white/80" />
                <span className="text-sm font-semibold">Loading the demo…</span>
                <span className="text-xs text-white/60">
                  WebGL builds can take a moment on the first load.
                </span>
                <span className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-white/20">
                  <span className="block h-full w-1/3 animate-[loadbar_1.4s_ease-in-out_infinite] rounded-full bg-white/70" />
                </span>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-black/80 to-black/60 text-white transition-colors hover:from-black/70 hover:to-black/50"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80">
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-7 w-7 fill-current"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-base font-semibold">Play the demo</span>
            <span className="text-xs text-white/70">
              Loads an interactive WebGL build of {pkg.name}
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Having trouble?{" "}
        <a
          href={pkg.demoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="underline hover:text-foreground"
        >
          Open the demo in a new tab
        </a>
        .
      </p>
    </div>
  );
}
