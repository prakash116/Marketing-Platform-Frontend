"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./mega-menu";
import { aboutItem, isActivePath, mainNav } from "./nav-config";

const itemClass = cn(
  "group relative inline-flex h-10 cursor-pointer items-center gap-1 rounded-md px-3 text-[15px] leading-5 font-medium whitespace-nowrap text-text-secondary outline-none",
  "transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
  "data-[state=open]:bg-muted data-[state=open]:text-foreground",
  // Current page: foreground text + 2px underline.
  "data-active:text-foreground data-active:after:absolute data-active:after:inset-x-3 data-active:after:bottom-0.5 data-active:after:h-0.5 data-active:after:rounded-full data-active:after:bg-foreground",
);

/*
 * Every Content is force-mounted so the menu links are in the server HTML
 * (crawlable). Closed panels are hidden with CSS. Because all panels stay
 * mounted, only the last one is Radix's "top" dismissable layer, so closed
 * panels ignore outside clicks/Esc and Esc is handled here for the open one.
 */
export function DesktopNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const triggers = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    if (!value) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setValue("");
      triggers.current.get(value)?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [value]);

  const closedGuards = (id: string) => {
    const guard = (event: Event) => {
      if (value !== id) event.preventDefault();
    };
    return { onPointerDownOutside: guard, onFocusOutside: guard, onEscapeKeyDown: guard };
  };

  return (
    <NavigationMenu.Root
      aria-label="Main"
      value={value}
      onValueChange={setValue}
      className={cn("flex justify-center", className)}
    >
      <NavigationMenu.List className="flex items-center gap-1">
        {mainNav.map((item) => {
          if (item.kind === "link") {
            const isAbout = item.href === aboutItem.href;
            return (
              <NavigationMenu.Item key={item.href} className={cn(isAbout && "hidden xl:block")}>
                <NavigationMenu.Link asChild active={isActivePath(pathname, item.href)}>
                  <Link
                    href={item.href}
                    prefetch={item.prefetch ? undefined : false}
                    className={itemClass}
                  >
                    {item.title}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          const active = item.items.some((link) => isActivePath(pathname, link.href));
          const isResources = item.id === "resources";
          return (
            <NavigationMenu.Item key={item.id} value={item.id}>
              <NavigationMenu.Trigger
                ref={(node) => {
                  if (node) triggers.current.set(item.id, node);
                  else triggers.current.delete(item.id);
                }}
                data-active={active || undefined}
                className={itemClass}
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 text-muted-foreground transition-transform duration-150 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                forceMount
                {...closedGuards(item.id)}
                // Spans the 1280 container, 8px under the 72px header.
                className="fixed inset-x-0 top-20 z-40 mx-auto w-[min(1280px,calc(100vw-64px))] rounded-2xl border border-border bg-card shadow-lg data-[state=closed]:hidden data-[state=open]:animate-pop-in"
              >
                <MegaMenu
                  menu={item}
                  pathname={pathname}
                  // 1024–1279px: About and the theme toggle move into Resources.
                  collapsedItems={isResources ? [aboutItem] : undefined}
                  collapsedFooter={
                    isResources ? (
                      <ThemeToggle variant="ghost" className="[&_svg]:size-5" />
                    ) : undefined
                  }
                />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
