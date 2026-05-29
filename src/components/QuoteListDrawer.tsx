"use client";

import { business } from "@/data/business";
import { formatPriceTotal, PRICE_DISCLAIMER, sumItemPrices } from "@/data/prices";
import { useQuote } from "@/context/QuoteContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { ItemPrice } from "./ItemPrice";
import { StockIndicator } from "./StockIndicator";
import { cn } from "@/lib/utils";

const EXIT_MS = 280;
const CLOSE_MS = 320;
const CLEAR_MS = 380;

export function QuoteListDrawer() {
  const {
    items,
    count,
    isOpen,
    closeDrawer,
    removeItem,
    clearItems,
  } = useQuote();

  const reducedMotion = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const [exitingIds, setExitingIds] = useState<Set<string>>(() => new Set());
  const [clearing, setClearing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const exitDuration = reducedMotion ? 0 : EXIT_MS;
  const closeDuration = reducedMotion ? 0 : CLOSE_MS;
  const clearDuration = reducedMotion ? 0 : CLEAR_MS;

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      closeDrawer();
      setClosing(false);
    }, closeDuration);
  }, [closing, closeDrawer, closeDuration]);

  useEffect(() => {
    if (isOpen) {
      setClosing(false);
      setExitingIds(new Set());
      setClearing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && !closing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closing, requestClose]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  const handleRemove = (id: string) => {
    if (exitingIds.has(id) || clearing) return;
    setExitingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      removeItem(id);
      setExitingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, exitDuration);
  };

  const handleClear = () => {
    if (clearing || items.length === 0) return;
    setClearing(true);
    setExitingIds(new Set(items.map((i) => i.id)));
    setTimeout(() => {
      clearItems();
      setClearing(false);
      setExitingIds(new Set());
    }, clearDuration);
  };

  if (!isOpen && !closing) return null;

  const quoteTotal = sumItemPrices(items.map((i) => i.name));
  const showEmpty = items.length === 0 && !clearing;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex justify-end",
        closing && "quote-drawer-overlay--closing"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-drawer-title"
    >
      <button
        type="button"
        className={cn(
          "quote-drawer-backdrop absolute inset-0 bg-sage-900/20 backdrop-blur-sm",
          closing && "quote-drawer-backdrop--closing"
        )}
        onClick={requestClose}
        aria-label="Close list"
      />
      <div
        className={cn(
          "quote-drawer relative flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl",
          closing && "quote-drawer--closing"
        )}
      >
        <div className="flex items-center justify-between border-b border-sage-100 p-5">
          <div>
            <h2 id="quote-drawer-title" className="font-serif text-xl text-sage-900">
              List
            </h2>
            <p className="text-sm text-sage-600">
              {count} {count === 1 ? "item" : "items"}
              {quoteTotal > 0 && (
                <span className="font-medium text-sage-800">
                  {" "}
                  · est. ~{formatPriceTotal(quoteTotal)}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="rounded-lg p-2 text-sage-600 hover:bg-sage-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="border-b border-sage-100 bg-sage-50/50 px-5 py-4">
          <p className="text-sm text-sage-700">
            Use this list when you call or visit.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-medium text-sage-700">
              Delivery Available
            </span>
            <span className="rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-medium text-sage-700">
              Service Guarantee
            </span>
          </div>
          <p className="mt-3 text-xs text-sage-600">{business.address}</p>
          <p className="mt-2 text-xs text-sage-500">{PRICE_DISCLAIMER}</p>
          <a href={business.phoneTel} className="mt-1 block text-sm font-medium text-sage-800 hover:text-sage-900">
            {business.phone}
          </a>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {showEmpty ? (
            <p className="py-8 text-center text-sm text-sage-600 quote-list-empty-in">
              Your list is empty. Add items from products, categories, or the project finder.
            </p>
          ) : (
            <ul
              className={cn("space-y-2", clearing && "quote-list--clearing")}
              aria-busy={clearing}
            >
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    "quote-list-item flex items-center justify-between gap-3 rounded-xl border border-sage-100 bg-white px-4 py-3",
                    (exitingIds.has(item.id) || clearing) && "quote-list-item--exit"
                  )}
                  style={
                    clearing && !reducedMotion
                      ? { animationDelay: `${index * 35}ms` }
                      : undefined
                  }
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium text-sage-800">{item.name}</span>
                    <ItemPrice name={item.name} className="mt-0.5 block" />
                    <StockIndicator itemName={item.name} className="mt-1" variant="detail" />
                    {item.source && (
                      <span className="mt-0.5 block text-xs text-sage-500">{item.source}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    disabled={exitingIds.has(item.id) || clearing}
                    className="shrink-0 rounded-lg px-2 py-1 text-xs text-sage-600 hover:bg-sage-50 hover:text-sage-900 disabled:opacity-40"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 border-t border-sage-100 p-5">
          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              disabled={clearing}
              className={cn(
                "w-full rounded-xl border border-sage-200 py-2 text-sm text-sage-600 hover:bg-sage-50 disabled:opacity-50",
                clearing && "quote-clear-btn--active"
              )}
            >
              {clearing ? "Clearing…" : "Clear List"}
            </button>
          )}
          <Button variant="primary" glow href={business.phoneTel} className="w-full">
            Call Store
          </Button>
          <Button variant="outline" href={business.mapsUrl} external className="w-full">
            Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
}
