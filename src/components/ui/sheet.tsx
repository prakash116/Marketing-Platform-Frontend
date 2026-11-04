"use client";

import { AnimatePresence, m } from "motion/react";
import { Dialog as DialogPrimitive, VisuallyHidden } from "radix-ui";
import { createContext, use, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Off-canvas panel built on Radix Dialog (focus trap, scroll lock, Esc) with a
 * `motion` slide. Needs a controlled `open` so AnimatePresence can play the exit.
 * MotionProvider sets `reducedMotion="user"`, so the slide is skipped when the OS asks.
 */

const SheetOpenContext = createContext(false);

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <SheetOpenContext value={open}>
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        {children}
      </DialogPrimitive.Root>
    </SheetOpenContext>
  );
}

export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export interface SheetContentProps {
  side?: "left" | "right";
  /** Accessible name; rendered visually hidden. */
  title: string;
  className?: string;
  children: ReactNode;
}

const ease = [0.2, 0, 0, 1] as const;

export function SheetContent({ side = "right", title, className, children }: SheetContentProps) {
  const open = use(SheetOpenContext);
  const offscreen = side === "left" ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {open ? (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <m.div
              className="fixed inset-0 z-50 bg-[rgb(var(--shadow-color)/0.5)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
            <m.div
              className={cn(
                "fixed inset-y-0 z-50 flex flex-col bg-card text-foreground shadow-xl outline-none",
                side === "left" ? "left-0" : "right-0",
                className,
              )}
              initial={{ x: offscreen }}
              animate={{ x: 0 }}
              exit={{ x: offscreen }}
              transition={{ duration: 0.25, ease }}
            >
              <VisuallyHidden.Root asChild>
                <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
              </VisuallyHidden.Root>
              {children}
            </m.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  );
}
