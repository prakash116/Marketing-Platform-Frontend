"use client";

import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppHeaderData } from "@/hooks/use-app-header-data";
import { cn } from "@/lib/utils";

/** 1–9 as is, then "9+". */
export function formatBadgeCount(count: number): string {
  return count > 9 ? "9+" : String(count);
}

export function notificationsLabel(count: number): string {
  if (count <= 0) return "Notifications";
  return `${count} unread notification${count === 1 ? "" : "s"}`;
}

export function NotificationBadge({ count, className }: { count: number; className?: string }) {
  if (count <= 0) return null;
  return (
    <span
      aria-hidden="true"
      data-testid="notification-badge"
      className={cn(
        "pointer-events-none absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-none font-bold text-destructive-foreground tabular-nums ring-2 ring-card",
        className,
      )}
    >
      {formatBadgeCount(count)}
    </span>
  );
}

export function NotificationsButton() {
  const { data } = useAppHeaderData();
  const count = data?.unreadNotifications ?? 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative [&_svg]:size-5"
          aria-label={notificationsLabel(count)}
        >
          <Bell aria-hidden="true" />
          <NotificationBadge count={count} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(380px,calc(100vw-24px))]">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-[14px] font-semibold">Notifications</p>
          <span className="text-[12px] font-medium text-muted-foreground">
            {notificationsLabel(count)}
          </span>
        </div>
        {/* TODO: list approvals, new chats and payments from the notifications API. */}
        <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <BellOff className="size-5" aria-hidden="true" />
          </span>
          <p className="text-[14px] font-semibold">Nothing to show yet</p>
          <p className="text-[13px] leading-5 text-muted-foreground">
            Approvals, new chats and payments will appear here.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
