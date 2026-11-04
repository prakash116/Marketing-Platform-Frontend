"use client";

import { Keyboard, LifeBuoy, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { useAppHeaderData } from "@/hooks/use-app-header-data";
import { useUiStore } from "@/stores/ui-store";
import { appRoutes, whatsappSupportUrl } from "./app-routes";
import { BusinessSwitcher } from "./business-switcher";
import { showKeyboardShortcuts } from "./help-menu";
import { WaCreditsChip } from "./wa-credits-chip";

const rowClass =
  "flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-md px-3 text-[14px] font-medium text-text-secondary hover:bg-muted hover:text-foreground [&_svg]:size-4 [&_svg]:text-muted-foreground";

/**
 * Below 1024px: the menu button opens a left drawer with the business switcher,
 * WA credits, help and theme. TODO: replace with the full app sidebar.
 */
export function MobileNavDrawer() {
  const open = useUiStore((state) => state.mobileNavOpen);
  const setOpen = useUiStore((state) => state.setMobileNavOpen);
  const { data } = useAppHeaderData();
  const pathname = usePathname();

  // Close on route change. The store lives outside React, so sync it in an effect.
  useEffect(() => {
    useUiStore.getState().setMobileNavOpen(false);
  }, [pathname]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-ml-1 lg:hidden [&_svg]:size-5"
      >
        <Menu aria-hidden="true" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" title="App menu" className="w-[min(320px,calc(100vw-48px))]">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-3">
            <Logo size={28} href={appRoutes.dashboard} />
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                className="[&_svg]:size-5"
              >
                <X aria-hidden="true" />
              </Button>
            </SheetClose>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto p-3">
            <section className="space-y-2">
              <p className="px-1 text-[11px] leading-4 font-bold tracking-[0.08em] text-muted-foreground uppercase">
                Business
              </p>
              <BusinessSwitcher className="w-full" />
              {data ? <WaCreditsChip amount={data.waCredits} className="w-fit" /> : null}
            </section>
            <section className="space-y-1">
              <p className="px-1 pb-1 text-[11px] leading-4 font-bold tracking-[0.08em] text-muted-foreground uppercase">
                Help
              </p>
              <Link href={appRoutes.help} prefetch={false} className={rowClass}>
                <LifeBuoy aria-hidden="true" />
                Help centre
              </Link>
              <a
                href={whatsappSupportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
              >
                <MessageCircle aria-hidden="true" />
                WhatsApp support
              </a>
              <button type="button" onClick={showKeyboardShortcuts} className={rowClass}>
                <Keyboard aria-hidden="true" />
                Keyboard shortcuts
              </button>
            </section>
            <section className="flex items-center justify-between rounded-md border border-border px-3 py-1.5">
              <span className="text-[14px] font-medium text-text-secondary">Theme</span>
              <ThemeToggle variant="ghost" className="[&_svg]:size-5" />
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
