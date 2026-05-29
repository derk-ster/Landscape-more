"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SpecialButtonDecor, SpecialButtonEffects } from "./SpecialButtonEffects";

type Variant = "primary" | "secondary" | "outline" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  href?: string;
  external?: boolean;
  glow?: boolean;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-sage-600 text-white hover:bg-sage-700 shadow-soft hover:shadow-glow border border-sage-700/20 btn-shine",
  secondary:
    "bg-cream-100 text-sage-800 hover:bg-cream-200 border border-sage-200/60",
  outline:
    "bg-white/80 text-sage-700 border border-sage-300 hover:bg-sage-50 hover:border-sage-400",
  ghost: "text-sage-700 hover:bg-sage-100/60",
};

function buttonClasses(
  variant: Variant,
  glow: boolean | undefined,
  className: string | undefined
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 disabled:opacity-50",
    variants[variant],
    glow && "cta-glow btn-special-inner",
    !glow && "transition-all duration-300",
    className
  );
}

function SpecialButtonContent({
  children,
  glow,
}: {
  children: ReactNode;
  glow?: boolean;
}) {
  if (!glow) return <>{children}</>;

  return (
    <span className="relative z-[1] inline-flex items-center justify-center gap-2">
      {children}
    </span>
  );
}

export function Button({
  variant = "primary",
  children,
  href,
  external,
  glow,
  className,
  disabled,
  ...props
}: Props) {
  const classes = buttonClasses(variant, glow, className);

  const inner = href ? (
    <a
      href={href}
      data-special-inner={glow ? "" : undefined}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {glow && <SpecialButtonDecor />}
      <SpecialButtonContent glow={glow}>{children}</SpecialButtonContent>
    </a>
  ) : (
    <button
      type="button"
      data-special-inner={glow ? "" : undefined}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {glow && <SpecialButtonDecor />}
      <SpecialButtonContent glow={glow}>{children}</SpecialButtonContent>
    </button>
  );

  if (!glow) return inner;

  const widthClasses = className
    ?.split(/\s+/)
    .filter((c) => /^(?:[a-z]+:)?w-/.test(c))
    .join(" ");

  return (
    <SpecialButtonEffects
      className={cn(widthClasses, `btn-special-wrap--${variant}`)}
      disabled={disabled}
    >
      {inner}
    </SpecialButtonEffects>
  );
}
