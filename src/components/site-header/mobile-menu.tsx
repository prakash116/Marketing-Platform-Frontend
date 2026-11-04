"use client";

import { ChevronDown, ChevronRight, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion } from "radix-ui";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { authLinks, isActivePath, mainNav, whatsappChatUrl, type NavLinkItem } from "./nav-config";

/** Full-screen navigation sheet for viewports below 1024px. */
export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close on route change (adjusting state during render, no effect needed).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-11 [&_svg]:size-5"
          aria-label="Open menu"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent title="Menu" className="w-full">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
          <Logo size={32} />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 [&_svg]:size-5"
              aria-label="Close menu"
            >
              <X aria-hidden="true" />
            </Button>
          </SheetClose>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-4 py-2">
          <Accordion.Root type="multiple" className="flex flex-col">
            {mainNav.map((item) =>
              item.kind === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={item.prefetch ? undefined : false}
                  aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-12 items-center border-b border-border text-[15px] font-semibold text-foreground last:border-b-0"
                >
                  {item.title}
                </Link>
              ) : (
                <Accordion.Item key={item.id} value={item.id} className="border-b border-border">
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex min-h-12 w-full cursor-pointer items-center justify-between text-left text-[15px] font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {item.title}
                      {item.id === "features" ? (
                        <ChevronDown
                          aria-hidden="true"
                          className="size-4 text-muted-foreground transition-transform duration-150 group-data-[state=open]:rotate-180"
                        />
                      ) : (
                        <ChevronRight
                          aria-hidden="true"
                          className="size-4 text-muted-foreground transition-transform duration-150 group-data-[state=open]:rotate-90"
                        />
                      )}
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="pb-3 data-[state=open]:animate-pop-in">
                    <MobileLinkList items={item.items} pathname={pathname} />
                  </Accordion.Content>
                </Accordion.Item>
              ),
            )}
          </Accordion.Root>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-border px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            <ThemeToggle variant="ghost" className="-ml-2 size-11 [&_svg]:size-5" />
            <a
              href={whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-[13px] font-semibold text-success"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" className="h-12" asChild>
              <Link href={authLinks.login} prefetch={false}>
                Login
              </Link>
            </Button>
            <Button className="h-12" asChild>
              <Link href={authLinks.signup}>Start free</Link>
            </Button>
          </div>
          <p className="text-center text-[12px] leading-4 text-muted-foreground">
            No card needed · Cancel anytime
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileLinkList({ items, pathname }: { items: NavLinkItem[]; pathname: string }) {
  return (
    <ul className="flex flex-col rounded-lg bg-muted p-1.5">
      {items.map((link) => {
        const Icon = link.icon;
        const active = isActivePath(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={false}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-md px-2.5 text-[14px] font-medium text-text-secondary hover:bg-card hover:text-foreground",
                active && "text-foreground",
              )}
            >
              {Icon ? <Icon className="size-4 text-muted-foreground" aria-hidden="true" /> : null}
              {link.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
