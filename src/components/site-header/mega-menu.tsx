import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import { cn } from "@/lib/utils";
import { authLinks, featureItems, industryItems, type NavLinkItem } from "./nav-config";

/** Body of the "Features" mega menu. Rendered inside NavigationMenu.Content. */
export function FeaturesMegaMenu() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_400px] gap-4 p-4">
      <div className="flex flex-col px-2 pt-2">
        <p className="px-2 text-[11px] leading-4 font-bold tracking-[0.08em] text-muted-foreground uppercase">
          Features
        </p>
        <ul className="mt-3 grid grid-flow-col grid-cols-2 grid-rows-3 gap-x-3 gap-y-2">
          {featureItems.map((item) => (
            <li key={item.href}>
              <FeatureLink item={item} />
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border px-2 pt-4 pb-2">
          <p className="text-[13px] leading-5 text-muted-foreground">
            Made for: {industryItems.map((item) => item.title).join(" · ")}
          </p>
          <NavigationMenu.Link asChild>
            <Link
              href={authLinks.allFeatures}
              prefetch={false}
              className="inline-flex shrink-0 items-center gap-1 rounded-sm text-[13px] leading-5 font-semibold text-primary hover:underline"
            >
              All features <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </NavigationMenu.Link>
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-primary-soft p-4">
        <div
          aria-hidden="true"
          className="flex aspect-[16/8] items-center justify-center rounded-lg bg-primary"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-card text-primary shadow-md">
            <Play className="ml-0.5 size-6" strokeWidth={2} />
          </span>
        </div>
        <p className="mt-5 font-display text-[16px] leading-6 font-bold text-foreground">
          See it in 60 seconds
        </p>
        <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
          How a restaurant got 3× more orders.
        </p>
        <NavigationMenu.Link asChild>
          <Link
            href={authLinks.bookDemo}
            prefetch={false}
            className="mt-4 inline-flex w-fit items-center gap-1 rounded-sm text-[13px] leading-5 font-semibold text-primary hover:underline"
          >
            Book a demo <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </NavigationMenu.Link>
      </div>
    </div>
  );
}

function FeatureLink({ item }: { item: NavLinkItem }) {
  const Icon = item.icon;
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={item.href}
        prefetch={false}
        className={cn(
          "flex items-start gap-4 rounded-lg p-3.5 transition-colors duration-150 outline-none",
          "hover:bg-muted focus-visible:bg-muted",
        )}
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
          <span className="mt-1 block text-[13px] leading-5 text-muted-foreground">
            {item.description}
          </span>
        </span>
      </Link>
    </NavigationMenu.Link>
  );
}
