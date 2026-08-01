import type { DocPackage } from "@/data/docs";
import { youtubeId } from "@/data/content";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const isVideoFile = (url?: string) => !!url && /\.(mp4|webm|ogv)(\?|$)/i.test(url);

/**
 * Card / infobox banner for a package. Uses `media.banner` from `_package.md`
 * when present, otherwise falls back to the gradient + label placeholder.
 */
export function PackageBanner({
  pkg,
  className = "",
  children,
}: {
  pkg: DocPackage;
  className?: string;
  children?: React.ReactNode;
}) {
  const banner = pkg.media?.banner;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {banner ? (
        <>
          <img
            src={banner}
            alt={`${pkg.name} banner`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        </>
      ) : (
        <div className="card-grad absolute inset-0" />
      )}
      <div className="relative flex h-full items-center justify-center">
        {children ?? (
          <span className="px-3 text-center text-2xl font-extrabold tracking-tight text-white drop-shadow">
            {pkg.label}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Square icon for a package, used on the "All packages" list. Uses `icon:`
 * from `_package.md`; falls back to the banner/gradient + first letter.
 */
export function PackageIcon({
  pkg,
  className = "",
}: {
  pkg: DocPackage;
  className?: string;
}) {
  const icon = pkg.media?.icon;
  if (icon) {
    return (
      <div className={`relative overflow-hidden bg-surface-alt ${className}`}>
        <img
          src={icon}
          alt={`${pkg.name} icon`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <PackageBanner pkg={pkg} className={className}>
      <span className="text-sm font-extrabold text-white drop-shadow">
        {pkg.label.charAt(0)}
      </span>
    </PackageBanner>
  );
}

/**
 * Hero backdrop for a package page. Prefers, in order:
 *   1. `media.bannerVideo` (mp4/webm) — autoplaying muted loop
 *   2. `trailerUrl` — the YouTube trailer, autoplaying muted on loop
 *   3. `media.banner` — a still image
 *   4. gradient placeholder
 */
export function PackageHeroBackdrop({ pkg }: { pkg: DocPackage }) {
  const videoFile = pkg.media?.bannerVideo ?? (isVideoFile(pkg.media?.banner) ? pkg.media?.banner : undefined);
  const trailerId = pkg.trailerUrl ? youtubeId(pkg.trailerUrl) : undefined;
  const image = !isVideoFile(pkg.media?.banner) ? pkg.media?.banner : undefined;
  const playerRef = useRef<any>(null);
  const apiLoadedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trailerId) return;

    function initializePlayer() {
      if (!playerRef.current) {
        playerRef.current = new window.YT!.Player("youtube-player", {
          videoId: trailerId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            rel: 0,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            iv_load_policy: 3,
            disablekb: 1,
            showinfo: 0,
          },
          events: {
            onReady: (event: any) => {
              event.target.mute();
              event.target.playVideo();
            },
            onStateChange: (event: any) => {
              // Reveal the player only once actually playing
              if (event.data === window.YT!.PlayerState.PLAYING) {
                if (containerRef.current) {
                  containerRef.current.style.opacity = "1";
                }
              }
              // Loop video when it ends
              if (event.data === window.YT!.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      }
    }

    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        apiLoadedRef.current = true;
        initializePlayer();
      };
    } else if (window.YT!.Player) {
      initializePlayer();
    } else {
      // API script already added but not ready yet — wait for the callback
      window.onYouTubeIframeAPIReady = () => {
        apiLoadedRef.current = true;
        initializePlayer();
      };
    }

    return () => {
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
          playerRef.current = null;
        } catch (e) {
          // Player might already be destroyed
        }
      }
    };
  }, [trailerId]);

  return (
    <>
      {videoFile ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoFile}
          autoPlay
          loop
          muted
          playsInline
          poster={image}
        />
      ) : trailerId ? (
        <div
          ref={containerRef}
          className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500"
          style={{ opacity: 0 }}
        >
          <div
            id="youtube-player"
            className="absolute left-1/2 top-1/2 h-[110vh] min-h-full w-[195vh] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
          {/* Transparent shield — blocks YouTube's play button overlay from rendering */}
          <div className="absolute inset-0 z-10 pointer-events-none" />
        </div>
      ) : image ? (
        <img
          src={image}
          alt={`${pkg.name} banner`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="card-grad absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              Banner video placeholder
            </span>
          </div>
        </>
      )}
    </>
  );
}
