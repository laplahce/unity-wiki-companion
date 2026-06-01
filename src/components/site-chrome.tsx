import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown, Package, Mail, Download, BookOpen } from "lucide-react";
import { PACKAGES } from "@/data/docs";
import { SiteSearch } from "@/components/site-search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


function useCurrentDocContext() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const match = pathname.match(/^\/docs\/([^/]+)(?:\/([^/]+))?/);
  const segment = match?.[1];
  const pageSlug = match?.[2];

  if (!segment) {
    return { kind: "home" as const, pathname };
  }


  const pkg = PACKAGES.find((p) => p.slug === segment) ?? null;
  return {
    kind: "package" as const,
    pathname,
    pkg,
    currentPageSlug: pageSlug ?? "overview",
  };
}

function PackagesSwitcher({

  onNavigate,
  activeSlug,
}: {
  onNavigate?: () => void;
  activeSlug?: string | null;
}) {
  return (
    <div>
      <div className="eyebrow-sidebar mb-4 pl-4">Packages</div>
      <ul className="space-y-0">
        {PACKAGES.map((p) => (
          <li key={p.slug}>
            <Link
              to="/packages/$package"
              params={{ package: p.slug }}
              onClick={onNavigate}
              className={`side-link${activeSlug === p.slug ? " active" : ""}`}
            >
              {p.name}
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
    return (
      <nav className="space-y-8">
        <div>
          <div className="eyebrow-sidebar mb-4 pl-4">{pkg.name}</div>
          <ul className="space-y-0">
            {pkg.pages.map((page) => {
              const isOverview = page.slug === "overview";
              const isActive = currentPageSlug === page.slug;
              return (
                <li key={page.slug}>
                  <Link
                    to={isOverview ? "/docs/$package" : "/docs/$package/$page"}
                    params={
                      isOverview
                        ? { package: pkg.slug }
                        : { package: pkg.slug, page: page.slug }
                    }
                    activeOptions={{ exact: true }}
                    onClick={onNavigate}
                    className={`side-link${isActive ? " active" : ""}${
                      page.emphasized ? " emphasized" : ""
                    }`}
                  >
                    {page.emphasized && (
                      <Download className="inline-block h-3.5 w-3.5 shrink-0" />
                    )}
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {includeGlobal && (
          <PackagesSwitcher onNavigate={onNavigate} activeSlug={pkg.slug} />
        )}
      </nav>
    );
  }

  // Home
  return (
    <nav>
      <PackagesSwitcher onNavigate={onNavigate} />
    </nav>
  );
}

function PackageNavMenu() {
  const ctx = useCurrentDocContext();
  const activeSlug = ctx.kind === "package" ? ctx.pkg?.slug : undefined;
  const label =
    ctx.kind === "package" && ctx.pkg ? ctx.pkg.name : "Packages";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="nav-link inline-flex items-center gap-1 outline-none">
        <Package className="h-4 w-4" /> {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My packages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {PACKAGES.map((p) => (
          <DropdownMenuItem key={p.slug} asChild>
            <Link
              to="/packages/$package"
              params={{ package: p.slug }}
              className={activeSlug === p.slug ? "font-semibold" : ""}
            >
              {p.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



export function SiteHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-3">
          <div className="flex aspect-square h-9 w-9 shrink-0 items-center justify-center rounded-lg card-grad">
            <span className="text-lg font-extrabold text-white">L</span>
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight">laplahce</div>
            <div className="hidden text-[11px] text-muted-foreground sm:block">
              Unity Asset Store developer
            </div>
          </div>
        </Link>
        <div className="ml-auto flex flex-1 justify-end md:hidden">
          <SiteSearch />
        </div>
        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex">
          <SiteSearch />
          <Link to="/" className="nav-link">Home</Link>
          <PackageNavMenu />
          <Link to="/docs" className="nav-link">Docs</Link>
          <Link to="/contact" className="nav-link">Contact</Link>

          <a
            href="https://assetstore.unity.com"
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold text-white card-grad card-shadow"
          >
            Asset Store
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Only show the doc sidebar on docs routes — the marketing/showcase pages
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
            <div className="flex aspect-square h-8 w-8 shrink-0 items-center justify-center rounded-lg card-grad">
              <span className="text-base font-extrabold text-white">L</span>
            </div>
            <span className="font-bold">laplahce</span>
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
              <div className="flex h-9 w-9 items-center justify-center rounded-lg card-grad">
                <span className="text-lg font-extrabold text-white">L</span>
              </div>
              <div className="leading-tight">
                <div className="text-base font-bold tracking-tight">laplahce</div>
                <div className="text-[11px] text-muted-foreground">Unity Asset Store developer</div>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Independent Unity tools, made with care. Each package ships with
              a playable demo and proper documentation — no guesswork.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="mailto:hello@laplahce.dev"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:bg-surface-alt"
              >
                <Mail className="h-4 w-4 text-muted-foreground" />
                hello@laplahce.dev
              </a>
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
            <FooterLink external to="https://assetstore.unity.com">Unity Asset Store</FooterLink>
            <FooterLink external to="https://docs.unity3d.com">Unity Manual</FooterLink>
            <FooterLink external to="https://forum.unity.com">Unity Forums</FooterLink>
          </FooterColumn>

          {/* Legal column */}
          <FooterColumn title="Legal">
            <FooterLink to="/">Privacy Policy</FooterLink>
            <FooterLink to="/">Terms of Use</FooterLink>
            <FooterLink to="/">Cookie Policy</FooterLink>
            <FooterLink to="/">Licenses</FooterLink>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} laplahce — Independent Unity tools.
            Not affiliated with Unity Technologies.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care, shipped with docs.
          </p>
        </div>
      </div>
    </footer>
  );
}
