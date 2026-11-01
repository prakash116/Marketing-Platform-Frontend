"use client";

import { type HTMLMotionProps, m } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT_SOFT = [0.2, 0, 0, 1] as const;

export interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** Delay in seconds before the animation starts. */
  delay?: number;
  children?: ReactNode;
}

/** Fades in while moving 8px upward. Only `opacity` and `transform` are animated. */
export function FadeIn({ delay = 0, children, ...props }: FadeInProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay, ease: EASE_OUT_SOFT }}
      {...props}
    >
      {children}
    </m.div>
  );
}
