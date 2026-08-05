import type { SocialLink } from "@/data/site";
import type { ComponentType } from "react";

function ItchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.257 1.975c-1.71 0-2.565.79-3.064 2.37-.5 1.58-.6 2.734-.6 3.465 0 .89.314 1.69.943 2.397.63.708 1.397 1.062 2.3 1.062.49 0 .943-.134 1.36-.403.417-.268.758-.612 1.022-1.03.263.418.604.762 1.02 1.03.42.27.872.404 1.362.404.904 0 1.67-.354 2.3-1.062.63-.707.943-1.507.943-2.397 0-.73-.1-1.885-.6-3.465-.5-1.58-1.355-2.37-3.065-2.37-.57 0-1.08.16-1.53.48-.45.32-.76.71-.94 1.17-.18-.46-.49-.85-.94-1.17-.45-.32-.96-.48-1.53-.48zm12.63 0c-.57 0-1.08.16-1.53.48-.45.32-.76.71-.94 1.17-.18-.46-.49-.85-.94-1.17-.45-.32-.96-.48-1.53-.48-1.71 0-2.565.79-3.064 2.37-.5 1.58-.6 2.734-.6 3.465 0 .89.314 1.69.943 2.397.63.708 1.397 1.062 2.3 1.062.49 0 .943-.134 1.36-.403.417-.268.758-.612 1.022-1.03.263.418.604.762 1.02 1.03.42.27.872.404 1.362.404.904 0 1.67-.354 2.3-1.062.63-.707.943-1.507.943-2.397 0-.73-.1-1.885-.6-3.465-.5-1.58-1.355-2.37-3.065-2.37zM2.536 12.5c-.58 0-1.08.21-1.5.63-.42.42-.63.92-.63 1.5v6.37c0 .58.21 1.08.63 1.5.42.42.92.63 1.5.63h6.37c.58 0 1.08-.21 1.5-.63.42-.42.63-.92.63-1.5v-6.37c0-.58-.21-1.08-.63-1.5-.42-.42-.92-.63-1.5-.63H2.536zm12.63 0c-.58 0-1.08.21-1.5.63-.42.42-.63.92-.63 1.5v6.37c0 .58.21 1.08.63 1.5.42.42.92.63 1.5.63h6.37c.58 0 1.08-.21 1.5-.63.42-.42.63-.92.63-1.5v-6.37c0-.58-.21-1.08-.63-1.5-.42-.42-.92-.63-1.5-.63h-6.37zM5.72 14.5h3.56l.8 1.4-.9 1.6H5.82l-.9-1.6.8-1.4zm12.63 0h3.56l.8 1.4-.9 1.6h-3.36l-.9-1.6.8-1.4z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const ICONS: Record<string, (props: { className?: string }) => JSX.Element> = {
  itch: ItchIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  tiktok: TikTokIcon,
};

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function SocialLinks({ socials }: { socials: SocialLink[] }) {
  if (!socials.length) return null;
  return (
    <div className="flex items-center gap-2">
      {socials.map((social) => {
        const key = normalizeName(social.name);
        const Icon = ICONS[key];
        if (!Icon) return null;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-foreground/20 hover:text-foreground hover:bg-surface"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        );
      })}
    </div>
  );
}
