"use client";

import { type HTMLMotionProps, m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_SOFT } from "./fade-in";

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: EASE_OUT_SOFT },
  },
};

export interface StaggerListProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
}

/** Children wrapped in <StaggerItem> appear one by one with a 40 ms stagger. */
export function StaggerList({ children, ...props }: StaggerListProps) {
  return (
    <m.div variants={listVariants} initial="hidden" animate="show" {...props}>
      {children}
    </m.div>
  );
}

export interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
}

export function StaggerItem({ children, ...props }: StaggerItemProps) {
  return (
    <m.div variants={itemVariants} {...props}>
      {children}
    </m.div>
  );
}
