"use client";

import { Check, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppHeaderData } from "@/hooks/use-app-header-data";
import { cn } from "@/lib/utils";
import { appRoutes } from "./app-routes";

function BusinessAvatar({ initials }: { initials: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent-soft text-[10px] font-bold text-accent-soft-foreground"
    >
      {initials}
    </span>
  );
}

export function BusinessSwitcher({ className }: { className?: string }) {
  const { data } = useAppHeaderData();
  if (!data) return <div className={cn("h-9 w-[246px] rounded-md bg-muted", className)} />;

  const { business, businesses } = data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Business: ${business.name}, ${business.plan} plan. Switch business`}
        className={cn(
          "flex h-9 w-[246px] cursor-pointer items-center gap-2 rounded-md border border-border bg-card pr-2 pl-1.5 text-left outline-none",
          "transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-muted",
          className,
        )}
      >
        <BusinessAvatar initials={business.initials} />
        <span className="min-w-0 flex-1 truncate text-[14px] leading-5 font-semibold text-foreground">
          {business.name}
        </span>
        <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] leading-4 font-bold text-primary-soft-foreground">
          {business.plan}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-64"
      >
        <DropdownMenuLabel>Businesses</DropdownMenuLabel>
        {businesses.map((item) => {
          const current = item.id === business.id;
          return (
            // TODO: switch the active business via the API and invalidate the header query.
            <DropdownMenuItem key={item.id} aria-current={current || undefined}>
              <BusinessAvatar initials={item.initials} />
              <span className="flex-1 truncate">{item.name}</span>
              <span className="text-[11px] font-semibold text-muted-foreground">{item.plan}</span>
              <Check
                aria-hidden="true"
                className={cn("text-primary!", current ? "visible" : "invisible")}
              />
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={appRoutes.addBusiness} prefetch={false}>
            <Plus aria-hidden="true" />
            Add business
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
