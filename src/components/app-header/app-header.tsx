import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { appRoutes } from "./app-routes";
import { BusinessSwitcher } from "./business-switcher";
import { CreateMenu } from "./create-menu";
import { GlobalSearch } from "./global-search";
import { HelpMenu } from "./help-menu";
import { MobileNavDrawer } from "./mobile-nav-drawer";
import { NotificationsButton } from "./notifications-button";
import { UserMenu } from "./user-menu";
import { HeaderWaCredits } from "./wa-credits-chip";

function Divider({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("h-6 w-px shrink-0 bg-border", className)} />;
}

/**
 * C01 · App header (after login).
 * ≥1280 everything · 1024–1279 search 320px, credits amount only ·
 * 768–1023 search icon, help + theme in the drawer · <768 mobile row and a
 * floating Create button.
 */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="flex h-14 items-center gap-2 px-3 md:h-16 md:px-6">
        <div className="flex shrink-0 items-center gap-1 md:gap-3">
          <MobileNavDrawer />
          <Logo
            size={28}
            href={appRoutes.dashboard}
            markClassName="md:size-8 md:[&_svg]:size-[18px]"
            wordmarkClassName="md:text-[18px]"
          />
          <Divider className="hidden md:block" />
          <BusinessSwitcher className="hidden md:flex" />
        </div>

        <GlobalSearch className="lg:ml-6" />

        <div className="flex shrink-0 items-center gap-2 lg:ml-6">
          <HeaderWaCredits />
          <CreateMenu />
          <Divider className="mx-1 hidden md:block" />
          <div className="flex items-center gap-1">
            <NotificationsButton />
            <HelpMenu className="hidden lg:inline-flex" />
            <ThemeToggle variant="ghost" className="hidden lg:inline-flex [&_svg]:size-5" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
