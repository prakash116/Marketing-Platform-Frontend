import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isActivePath, type NavCta, type NavLinkItem, type NavMenu } from "./nav-config";

export interface MegaMenuProps {
  menu: NavMenu;
  pathname: string;
  /** Items shown only below 1280px (e.g. About, which is a top-level link from xl). */
  collapsedItems?: NavLinkItem[];
  /** Extra footer content shown only below 1280px (e.g. the theme toggle). */
  collapsedFooter?: ReactNode;
}

/** Body of a desktop mega menu panel. Rendered inside NavigationMenu.Content. */
export function MegaMenu({ menu, pathname, collapsedItems = [], collapsedFooter }: MegaMenuProps) {
  const { icon: PromoIcon, ...promo } = menu.promo;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_400px]">
      <div className="flex flex-col px-2 pt-2">
        <p className="px-2 text-[11px] leading-4 font-bold tracking-[0.08em] text-muted-foreground uppercase">
          {menu.title}
        </p>
        <ul
          className={cn(
            "mt-3 grid grid-cols-2 gap-x-3 gap-y-2 pb-4",
            menu.columnMajor && "grid-flow-col grid-rows-3",
          )}
        >
          {menu.items.map((item) => (
            <li key={item.href}>
              <MegaMenuLink item={item} pathname={pathname} />
            </li>
          ))}
          {collapsedItems.map((item) => (
            <li key={item.href} className="xl:hidden">
              <MegaMenuLink item={item} pathname={pathname} />
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border px-2 pt-4 pb-2">
          <p className="text-[13px] leading-5 text-muted-foreground">{menu.footer.text}</p>
          <div className="flex shrink-0 items-center gap-3">
            {collapsedFooter ? <div className="xl:hidden">{collapsedFooter}</div> : null}
            <ArrowLink cta={menu.footer.cta} />
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-primary-soft p-4">
        <div
          aria-hidden="true"
          className="flex aspect-16/8 items-center justify-center rounded-lg bg-primary"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-card text-primary shadow-md">
            <PromoIcon className="size-6" strokeWidth={2} />
          </span>
        </div>
        <p className="mt-5 font-display text-[16px] leading-6 font-bold text-foreground">
          {promo.title}
        </p>
        <p className="mt-1 text-[13px] leading-5 text-muted-foreground">{promo.description}</p>
        <ArrowLink cta={promo.cta} className="mt-4" />
      </div>
    </div>
  );
}

function ArrowLink({ cta, className }: { cta: NavCta; className?: string }) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={cta.href}
        prefetch={false}
        className={cn(
          "inline-flex w-fit shrink-0 items-center gap-1 rounded-sm text-[13px] leading-5 font-semibold text-primary hover:underline",
          className,
        )}
      >
        {cta.title} <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </NavigationMenu.Link>
  );
}

function MegaMenuLink({ item, pathname }: { item: NavLinkItem; pathname: string }) {
  const Icon = item.icon;
  return (
    <NavigationMenu.Link asChild active={isActivePath(pathname, item.href)}>
      <Link
        href={item.href}
        prefetch={false}
        className="flex items-start gap-4 rounded-lg p-3.5 transition-colors duration-150 outline-none hover:bg-muted focus-visible:bg-muted data-active:bg-muted"
      >
        {Icon ? (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
            <Icon className="size-5" aria-hidden="true" />
          </span>
        ) : null}
        <span className="min-w-0 pt-0.5">
          <span className="block text-[15px] leading-5 font-semibold text-foreground">
            {item.title}
          </span>
          {item.description ? (
            <span className="mt-1 block text-[13px] leading-5 text-muted-foreground">
              {item.description}
            </span>
          ) : null}
        </span>
      </Link>
    </NavigationMenu.Link>
  );
}
