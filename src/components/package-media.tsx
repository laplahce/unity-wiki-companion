import type { DocPackage } from "@/data/docs";
import { youtubeId } from "@/data/content";
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
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <iframe
            title={`${pkg.name} trailer`}
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute left-1/2 top-1/2 h-[110vh] min-h-full w-[195vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
          />
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
