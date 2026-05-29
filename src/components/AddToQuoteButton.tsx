"use client";

import { useQuote } from "@/context/QuoteContext";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  itemName: string;
  source?: string;
  variant?: "primary" | "secondary" | "ghost";
  showCheckWhenAdded?: boolean;
};

export function AddToQuoteButton({
  itemName,
  source,
  variant = "primary",
  showCheckWhenAdded = true,
  className,
  children,
  onClick,
  ...props
}: Props) {
  const { addToQuote, isInQuote } = useQuote();
  const onList = showCheckWhenAdded && isInQuote(itemName);

  const variants = {
    primary:
      "bg-sage-600 text-white hover:bg-sage-700 disabled:bg-sage-400",
    secondary:
      "border border-sage-300 bg-white text-sage-700 hover:bg-sage-50",
    ghost: "text-sage-700 hover:bg-sage-100/80",
  };

  return (
    <button
      type="button"
      disabled={onList}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition sm:text-sm",
        variants[variant],
        onList && "cursor-default opacity-80",
        className
      )}
      onClick={(e) => {
        addToQuote(itemName, source, e.currentTarget);
        onClick?.(e);
      }}
      {...props}
    >
      {onList ? (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          On list
        </>
      ) : (
        children ?? "Add to list"
      )}
    </button>
  );
}
