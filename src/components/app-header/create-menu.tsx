"use client";

import { ChevronDown, FileText, Plus, Radio, Rocket, SquarePen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appRoutes } from "./app-routes";

const createItems = [
  { title: "Post", icon: SquarePen, href: appRoutes.newPost },
  { title: "Campaign", icon: Rocket, href: appRoutes.newCampaign },
  { title: "Broadcast", icon: Radio, href: appRoutes.newBroadcast },
  { title: "Creator brief", icon: FileText, href: appRoutes.newBrief },
];

function CreateMenuItems() {
  return createItems.map(({ title, icon: Icon, href }) => (
    <DropdownMenuItem key={title} asChild>
      <Link href={href} prefetch={false}>
        <Icon aria-hidden="true" />
        {title}
      </Link>
    </DropdownMenuItem>
  ));
}

/**
 * The only primary button in the header. From 768px it sits in the header;
 * below that it becomes a floating round "+" in the bottom-right corner.
 */
export function CreateMenu() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="group hidden gap-1.5 px-4 md:inline-flex">
            <Plus aria-hidden="true" />
            Create
            <ChevronDown
              aria-hidden="true"
              className="size-3.5! opacity-80 transition-transform duration-150 group-data-[state=open]:rotate-180"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-48">
          <CreateMenuItems />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Create"
            className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 size-14 rounded-full p-0 shadow-lg md:hidden [&_svg]:size-6"
          >
            <Plus aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" className="min-w-48">
          <CreateMenuItems />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
