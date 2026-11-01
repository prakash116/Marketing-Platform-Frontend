import { cva, type VariantProps } from "class-variance-authority";
import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Type scale                                                           */
/* ------------------------------------------------------------------ */

const headingVariants = cva("font-display text-foreground", {
  variants: {
    level: {
      display: "text-[48px] leading-14 font-extrabold tracking-[-0.02em]",
      h1: "text-[36px] leading-11 font-bold tracking-[-0.02em]",
      h2: "text-[30px] leading-9.5 font-bold tracking-[-0.01em]",
      h3: "text-[24px] leading-8 font-semibold tracking-[-0.01em]",
      h4: "text-[18px] leading-7 font-semibold",
    },
  },
  defaultVariants: {
    level: "h2",
  },
});

const textVariants = cva("font-sans", {
  variants: {
    variant: {
      "body-lg": "text-[16px] leading-6.5",
      body: "text-[14px] leading-5.5",
      small: "text-[13px] leading-5",
      caption: "text-[12px] leading-4 font-medium",
      overline: "text-[11px] leading-4 font-bold tracking-[0.08em] uppercase",
      label: "text-[14px] leading-5 font-semibold",
    },
    tone: {
      default: "text-foreground",
      secondary: "text-text-secondary",
      muted: "text-muted-foreground",
      primary: "text-primary",
      success: "text-success-soft-foreground",
      warning: "text-warning-soft-foreground",
      danger: "text-destructive-soft-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
});

export type HeadingLevel = NonNullable<VariantProps<typeof headingVariants>["level"]>;
export type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>;
export type TextTone = NonNullable<VariantProps<typeof textVariants>["tone"]>;

const headingTag: Record<HeadingLevel, "h1" | "h2" | "h3" | "h4"> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

/* ------------------------------------------------------------------ */
/* Heading                                                              */
/* ------------------------------------------------------------------ */

export interface HeadingProps
  extends Omit<ComponentPropsWithoutRef<"h1">, "children">, VariantProps<typeof headingVariants> {
  /** Render as a different element while keeping the visual level. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  children?: ReactNode;
}

export function Heading({ level = "h2", as, className, ...props }: HeadingProps) {
  const Tag: ElementType = as ?? headingTag[level ?? "h2"];
  return <Tag className={cn(headingVariants({ level }), className)} {...props} />;
}

/* ------------------------------------------------------------------ */
/* Text                                                                 */
/* ------------------------------------------------------------------ */

export interface TextProps
  extends Omit<ComponentPropsWithoutRef<"p">, "children">, VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label" | "li" | "dt" | "dd" | "figcaption";
  children?: ReactNode;
}

export function Text({ variant, tone, as = "p", className, ...props }: TextProps) {
  return createElement(as, { className: cn(textVariants({ variant, tone }), className), ...props });
}

/* ------------------------------------------------------------------ */
/* Kpi — large numbers in dashboards                                    */
/* ------------------------------------------------------------------ */

export interface KpiProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

export function Kpi({ className, ...props }: KpiProps) {
  return (
    <span
      className={cn(
        "font-sans text-[32px] leading-10 font-bold text-foreground tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Code — inline monospace                                              */
/* ------------------------------------------------------------------ */

export interface CodeProps extends ComponentPropsWithoutRef<"code"> {
  children?: ReactNode;
}

export function Code({ className, ...props }: CodeProps) {
  return (
    <code
      className={cn(
        "rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] leading-5 text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { headingVariants, textVariants };
