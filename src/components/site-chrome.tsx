import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Package, Mail, Download, Heart, ArrowUpRight } from "lucide-react";
import { PACKAGES, type DocPackage, type DocPage } from "@/data/docs";
import { SITE } from "@/data/site";
import { SiteLogo } from "@/components/site-logo";
import { SiteSearch } from "@/components/site-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { StatusDot } from "@/components/status-badge";
import { HighlightDot } from "@/components/page-highlight";
import { SocialLinks } from "@/components/social-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


function useCurrentDocContext() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const match = pathname.match(/^\/(?:docs|packages)\/([^/]+)(?:\/([^/]+))?/);
  const segment = match?.[1];
  const pageSlug = match?.[2];

  if (!segment) {
    return { kind: "home" as const, pathname };
  }


  const pkg = PACKAGES.find((p) => p.slug === segment) ?? null;
  if (!pkg) return { kind: "home" as const, pathname };
  return {
    kind: "package" as const,
    pathname,
    pkg,
    currentPageSlug: pageSlug ?? "overview",
  };
}

// Packages grouped by the `category:` field in each `_package.md`.
function packagesByCategory() {
  const grouped = new Map<string, typeof PACKAGES>();
  for (const p of PACKAGES) {
    if (!grouped.has(p.category)) grouped.set(p.category, []);
    grouped.get(p.category)!.push(p);
  }
  return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function PackagesSwitcher({

  onNavigate,
  activeSlug,
  variant = "packages",
}: {
  onNavigate?: () => void;
  activeSlug?: string | null;
  variant?: "packages" | "docs";
}) {
  const isDocs = variant === "docs";
  return (
    <div>
      <div className="eyebrow-sidebar mb-4 pl-4">
        {isDocs ? "All package docs" : "Packages"}
      </div>
      <ul className="space-y-0">
        {PACKAGES.map((p) => (
          <li key={p.slug}>
            <Link
              to={isDocs ? "/docs/$package" : "/packages/$package"}
              params={{ package: p.slug }}
              onClick={onNavigate}
              className={`side-link${activeSlug === p.slug ? " active" : ""}`}
            >
              <span className="inline-flex items-center gap-1.5">
                {p.name}
                {p.status && <StatusDot status={p.status} />}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SidebarNav({
  onNavigate,
  includeGlobal = false,
}: {
  onNavigate?: () => void;
  includeGlobal?: boolean;
}) {
  const ctx = useCurrentDocContext();

  if (ctx.kind === "package" && ctx.pkg) {
    const { pkg, currentPageSlug } = ctx;
    const tree = buildPageTree(pkg);
    return (
      <nav className="space-y-8">
        <div>
          <div className="eyebrow-sidebar mb-4 pl-4">{pkg.name}</div>
          <ul className="space-y-0">
            {tree.map((node) => (
              <SidebarPageItem
                key={node.page.slug}
                pkg={pkg}
                node={node}
                currentPageSlug={currentPageSlug}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
        {includeGlobal && (
          <PackagesSwitcher onNavigate={onNavigate} activeSlug={pkg.slug} variant="docs" />
        )}
      </nav>
    );
  }

  // Docs home / other docs routes
  return (
    <nav>
      <PackagesSwitcher onNavigate={onNavigate} variant="docs" />
    </nav>
  );
}

function PackageNavMenu() {
  const ctx = useCurrentDocContext();
  const activeSlug = ctx.kind === "package" ? ctx.pkg?.slug : undefined;
  const label =
    ctx.kind === "package" && ctx.pkg ? ctx.pkg.name : "Packages";
  const categories = packagesByCategory();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="nav-link inline-flex items-center gap-1 rounded-md px-3 py-2 outline-none">
        <Package className="h-4 w-4" /> {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My packages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map(([category, pkgs]) => (
          <DropdownMenuSub key={category}>
            <DropdownMenuSubTrigger>
              <span className="flex-1">{category}</span>
              <span className="ml-2 text-xs text-muted-foreground">{pkgs.length}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-60">
              {pkgs.map((p) => (
                <DropdownMenuItem key={p.slug} asChild>
                  <Link
                    to="/packages/$package"
                    params={{ package: p.slug }}
                    className={activeSlug === p.slug ? "font-semibold" : ""}
                  >
                    <span className="flex-1">{p.name}</span>
                    {p.status && <StatusDot status={p.status} />}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/packages" className="font-semibold text-brand">
            View all packages →
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



export function SiteHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showSearch = pathname.startsWith("/docs");
  const ctx = useCurrentDocContext();
  // When browsing a package (or its docs), the Asset Store button points at
  // that package's own store page.
  const storeUrl =
    (ctx.kind === "package" && ctx.pkg?.assetStoreUrl) || SITE.assetStoreUrl;
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-ml-1 inline-flex aspect-square h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-3">
          <div className="flex aspect-square h-9 w-9 shrink-0 items-center justify-center">
            <SiteLogo />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight">{SITE.name}</div>
            <div className="hidden text-[11px] text-muted-foreground sm:block">
              {SITE.tagline}
            </div>
          </div>
        </Link>
        {showSearch && (
          <div className="ml-auto flex flex-1 justify-end md:hidden">
            <SiteSearch />
          </div>
        )}
        <div className="ml-auto md:hidden">
          <ThemeToggle />
        </div>
        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex">
          {showSearch && <SiteSearch />}
          <Link to="/" className="nav-link rounded-md px-3 py-2">Home</Link>
          <PackageNavMenu />
          <Link to="/docs" className="nav-link rounded-md px-3 py-2">Docs</Link>
          <Link to="/contact" className="nav-link rounded-md px-3 py-2">Contact</Link>

          <ThemeToggle />
          <a
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-grad !rounded-lg px-4 py-2 text-sm inline-flex items-center gap-1.5"
          >
            Asset Store
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Only show the doc sidebar on docs routes - the marketing/showcase pages
  // are full-width.
  if (!pathname.startsWith("/docs")) return null;
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface px-4 py-10 text-sm lg:block">
      <div className="sticky top-24">
        <SidebarNav />
      </div>
    </aside>
  );
}

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-background shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square h-8 w-8 shrink-0 items-center justify-center">
              <SiteLogo />
            </div>
            <span className="font-bold">{SITE.name}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 py-6">
          <SidebarNav onNavigate={onClose} includeGlobal />
        </div>
      </div>
    </div>
  );
}

export function useMobileSidebar() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow-sidebar mb-4">{title}</div>
      <ul className="space-y-2.5">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ to, external, children }: { to: string; external?: boolean; children: React.ReactNode }) {
  if (external) {
    return (
      <li>
        <a
          href={to}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link to={to} className="text-sm text-muted-foreground transition hover:text-foreground">
        {children}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      {/* Main footer content */}
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center">
                <SiteLogo />
              </div>
              <div className="leading-tight">
                <div className="text-base font-bold tracking-tight">{SITE.name}</div>
                <div className="text-[11px] text-muted-foreground">{SITE.tagline}</div>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {SITE.blurb}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="btn btn-solid !rounded-lg px-3 py-2 text-sm"
              >
                <Mail className="h-4 w-4 text-muted-foreground" />
                {SITE.email}
              </a>
              <SocialLinks socials={SITE.socials} />
            </div>
          </div>

          {/* Packages column */}
          <FooterColumn title="Packages">
            <FooterLink to="/docs">All docs</FooterLink>
            {PACKAGES.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link
                  to="/packages/$package"
                  params={{ package: p.slug }}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          {/* Resources column */}
          <FooterColumn title="Resources">
            <FooterLink to="/contact">Contact &amp; Support</FooterLink>
            <FooterLink external to={SITE.assetStoreUrl}>My Asset Store page</FooterLink>
          </FooterColumn>
        </div>

        {/* Patreon support flap */}
        {SITE.patreonUrl && (
          <div className="mt-10 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/5 to-transparent p-6 sm:p-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                <Heart className="h-4 w-4 fill-current" /> Support my work
              </div>
              <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
                Enjoying my assets? Patreons help me spend more time building packages,
                writing documentation, and keeping everything up to date.
              </p>
            </div>
            <a
              href={SITE.patreonUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-grad shrink-0 !rounded-lg px-5 py-2.5 text-sm"
            >
              Become a patron <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-xs text-muted-foreground">
            {SITE.copyright}
          </p>
          <p className="text-xs text-muted-foreground">
            {SITE.footerNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
