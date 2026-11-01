"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads only the `domAnimation` feature bundle (~5 KB) and forbids `motion.*`
 * components via `strict` so nobody accidentally pulls the full 34 KB runtime.
 * Always use `m.div` etc. from "motion/react" inside this provider.
 * `reducedMotion="user"` honours the OS "reduce motion" setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
