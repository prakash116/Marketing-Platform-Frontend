"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { getQueryClient } from "@/lib/query-client";

export function Providers({ children }: { children: ReactNode }) {
  // getQueryClient() returns a stable singleton in the browser; no useState needed.
  const queryClient = getQueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <MotionProvider>
          {children}
          <Toaster
            position="top-right"
            closeButton
            richColors
            toastOptions={{ className: "animate-toast-in font-sans" }}
          />
        </MotionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
