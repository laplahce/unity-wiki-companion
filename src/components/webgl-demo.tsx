import { useState } from "react";
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
          <iframe
            src={pkg.demoUrl}
            title={`${pkg.name} WebGL demo`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; gamepad; xr-spatial-tracking"
            allowFullScreen
          />
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
