import { SITE } from "@/data/site";

/** Site logo. Uses `logoImageDark` from site.md when dark mode is active. */
export function SiteLogo({ className = "" }: { className?: string }) {
  if (!SITE.logoImage && !SITE.logoImageDark) {
    return <span className="font-extrabold">{SITE.logoText}</span>;
  }
  const light = SITE.logoImage ?? SITE.logoImageDark!;
  const dark = SITE.logoImageDark ?? SITE.logoImage!;
  return (
    <>
      <img
        src={light}
        alt={SITE.name}
        className={`h-full w-full object-contain dark:hidden ${className}`}
      />
      <img
        src={dark}
        alt={SITE.name}
        className={`hidden h-full w-full object-contain dark:block ${className}`}
      />
    </>
  );
}
