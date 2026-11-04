"use client";

import { CircleHelp, Keyboard, LifeBuoy, MessageCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appRoutes, whatsappSupportUrl } from "./app-routes";

export function showKeyboardShortcuts() {
  // TODO: replace with a shortcuts dialog once there are more than one.
  toast("Keyboard shortcuts", { description: "⌘K / Ctrl K: search campaigns, chats and pages" });
}

export function HelpMenu({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Help" className={className}>
          <CircleHelp aria-hidden="true" className="size-5!" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={appRoutes.help} prefetch={false}>
            <LifeBuoy aria-hidden="true" />
            Help centre
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={whatsappSupportUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" />
            WhatsApp support
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={showKeyboardShortcuts}>
          <Keyboard aria-hidden="true" />
          Keyboard shortcuts
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
