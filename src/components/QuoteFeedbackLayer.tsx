"use client";

import type { QuoteFlyParticle, QuoteToast } from "@/context/QuoteContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  toasts: QuoteToast[];
  flyParticles: QuoteFlyParticle[];
  targetPulse: boolean;
  onDismissToast: (id: string) => void;
};

function formatToastMessage(toast: QuoteToast): { title: string; detail?: string } {
  const { added, skipped } = toast;

  if (added.length === 1 && skipped.length === 0) {
    return {
      title: `Added to quote list`,
      detail: added[0],
    };
  }

  if (added.length > 1 && skipped.length === 0) {
    return {
      title: `Added ${added.length} items to quote list`,
      detail: added.join(", "),
    };
  }

  if (added.length === 0 && skipped.length === 1) {
    return {
      title: `Already on your quote list`,
      detail: skipped[0],
    };
  }

  if (added.length === 0 && skipped.length > 1) {
    return {
      title: `${skipped.length} items already on your list`,
      detail: skipped.join(", "),
    };
  }

  return {
    title: `Added ${added.length}, skipped ${skipped.length} duplicate${skipped.length === 1 ? "" : "s"}`,
    detail: [...added, ...skipped.map((s) => `${s} (already added)`)].join(", "),
  };
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function QuoteFeedbackLayer({
  toasts,
  flyParticles,
  targetPulse,
  onDismissToast,
}: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {targetPulse && (
        <style>{`
          [data-quote-target] { animation: quote-target-pulse 0.65s ease-out; }
        `}</style>
      )}

      <div
        className="pointer-events-none fixed inset-0 z-[90]"
        aria-live="polite"
        aria-atomic="true"
      >
        {flyParticles.map((particle) => (
          <div
            key={particle.id}
            className={`quote-fly-heart ${reducedMotion ? "quote-fly-reduced" : ""}`}
            style={
              {
                "--fly-start-x": `${particle.startX}px`,
                "--fly-start-y": `${particle.startY}px`,
                "--fly-dx": `${particle.endX - particle.startX}px`,
                "--fly-dy": `${particle.endY - particle.startY}px`,
              } as React.CSSProperties
            }
          >
            <HeartIcon className="h-5 w-5 text-sage-600 drop-shadow-sm" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none fixed bottom-20 left-4 right-4 z-[95] flex flex-col items-center gap-2 sm:bottom-6 sm:left-auto sm:right-6 sm:items-end">
        {toasts.map((toast) => {
          const { title, detail } = formatToastMessage(toast);
          const isDuplicateOnly = toast.added.length === 0;

          return (
            <div
              key={toast.id}
              role="status"
              className={`quote-toast pointer-events-auto flex max-w-sm gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-md ${
                isDuplicateOnly
                  ? "border-sage-200 bg-white/95"
                  : "border-sage-300/80 bg-cream-50/98"
              }`}
            >
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isDuplicateOnly ? "bg-sage-100 text-sage-500" : "bg-sage-600 text-white"
                }`}
              >
                {isDuplicateOnly ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <HeartIcon className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0 flex-1 pr-1">
                <p className="text-sm font-semibold text-sage-900">{title}</p>
                {detail && (
                  <p className="mt-0.5 text-xs leading-relaxed text-sage-600 line-clamp-3">
                    {detail}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onDismissToast(toast.id)}
                className="pointer-events-auto shrink-0 rounded-lg p-1 text-sage-500 hover:bg-sage-100 hover:text-sage-800"
                aria-label="Dismiss notification"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
