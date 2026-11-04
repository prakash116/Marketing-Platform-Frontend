"use client";

import { CreditCard, LogOut, Settings, User, Users } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppHeaderData } from "@/hooks/use-app-header-data";
import { appRoutes } from "./app-routes";

const accountLinks = [
  { title: "Profile", icon: User, href: appRoutes.profile },
  { title: "Team", icon: Users, href: appRoutes.team },
  { title: "Billing & plan", icon: CreditCard, href: appRoutes.billing },
  { title: "Settings", icon: Settings, href: appRoutes.settings },
];

export function UserMenu() {
  const { data } = useAppHeaderData();
  const user = data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={user ? `Account menu for ${user.name}` : "Account menu"}
        className="group flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-[12px] font-bold text-primary-soft-foreground transition-shadow duration-150 group-hover:ring-2 group-hover:ring-primary-border group-data-[state=open]:ring-2 group-data-[state=open]:ring-primary-border md:size-9 md:text-[13px]"
        >
          {user?.initials}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        {user ? (
          <div className="px-2.5 pt-2 pb-2">
            <p className="truncate text-[14px] leading-5 font-semibold text-foreground">
              {user.name}
            </p>
            <p className="truncate text-[12px] leading-4 text-muted-foreground">{user.email}</p>
          </div>
        ) : null}
        <DropdownMenuSeparator />
        {accountLinks.map(({ title, icon: Icon, href }) => (
          <DropdownMenuItem key={title} asChild>
            <Link href={href} prefetch={false}>
              <Icon aria-hidden="true" />
              {title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {/* TODO: call the auth sign-out endpoint, clear the query cache, redirect to /login. */}
        <DropdownMenuItem variant="destructive">
          <LogOut aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
