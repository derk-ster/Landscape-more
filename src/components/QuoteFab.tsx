"use client";

import { useQuote } from "@/context/QuoteContext";
import { SpecialButtonDecor, SpecialButtonEffects } from "./ui/SpecialButtonEffects";

export function QuoteFab() {
  const { count, toggleDrawer } = useQuote();

  return (
    <div className="fixed bottom-6 right-6 z-40 sm:hidden">
      <SpecialButtonEffects className="btn-special-wrap--primary">
      <button
        type="button"
        data-quote-target
        data-quote-target-priority
        data-special-inner
        onClick={toggleDrawer}
        className="btn-special-inner cta-glow flex items-center gap-2 rounded-full bg-sage-600 px-4 py-3 text-sm font-medium text-white shadow-glow transition hover:bg-sage-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
        aria-label={`Open list, ${count} items`}
      >
        <SpecialButtonDecor />
        <span className="relative z-[1] inline-flex items-center gap-2">
          List
          {count > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-sage-700">
              {count}
            </span>
          )}
        </span>
      </button>
    </SpecialButtonEffects>
    </div>
  );
}
