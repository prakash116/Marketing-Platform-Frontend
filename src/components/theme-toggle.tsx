"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

const subscribeNoop = () => () => {};

export function ThemeToggle({
  variant = "secondary",
  className,
}: Pick<ButtonProps, "variant" | "className">) {
  const { resolvedTheme, setTheme } = useTheme();
  // Theme is unknown during SSR; avoid a hydration mismatch on the icon.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant={variant}
      size="icon"
      className={className}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      data-testid="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
