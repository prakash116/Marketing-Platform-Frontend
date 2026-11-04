import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";
import { authLinks } from "./nav-config";
import { ScrollStateHeader } from "./scroll-state";

/**
 * C02 · Website header (before login).
 * ≥1280 full menu + theme + Login · 1024–1279 About and theme move into
 * Resources · <1024 logo, small Start free and the menu sheet (theme sits in
 * its bottom bar).
 */
export function SiteHeader() {
  return (
    <ScrollStateHeader className="sticky top-0 z-30 border-b border-border bg-card">
      {/* 1344 - 2×32 padding = the 1280 content width from the design. */}
      <div className="relative mx-auto flex h-16 w-full max-w-336 items-center gap-6 px-4 lg:h-18 lg:px-8">
        <Logo
          size={32}
          markClassName="lg:size-9 lg:[&_svg]:size-5"
          wordmarkClassName="lg:text-[20px]"
        />

        <DesktopNav className="hidden flex-1 lg:flex" />

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <ThemeToggle variant="ghost" className="hidden size-11 xl:inline-flex [&_svg]:size-5" />
          <Button
            variant="secondary"
            size="lg"
            className="hidden h-11 text-[14px] lg:inline-flex"
            asChild
          >
            <Link href={authLinks.login} prefetch={false}>
              Login
            </Link>
          </Button>
          <Button
            size="lg"
            className="relative h-9 px-4 text-[13px] after:absolute after:inset-x-0 after:-inset-y-1 lg:h-11 lg:px-6 lg:text-[14px] lg:after:hidden"
            asChild
          >
            <Link href={authLinks.signup}>Start free</Link>
          </Button>
          <div className="-mr-2 lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </ScrollStateHeader>
  );
}
