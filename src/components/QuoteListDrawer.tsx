"use client";

import { business } from "@/data/business";
import { formatPriceTotal, PRICE_DISCLAIMER, sumItemPrices } from "@/data/prices";
import { useQuote } from "@/context/QuoteContext";
import { useEffect } from "react";
import { Button } from "./ui/Button";
import { ItemPrice } from "./ItemPrice";

export function QuoteListDrawer() {
  const {
    items,
    count,
    isOpen,
    closeDrawer,
    removeItem,
    clearItems,
  } = useQuote();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeDrawer]);

  if (!isOpen) return null;

  const quoteTotal = sumItemPrices(items.map((i) => i.name));

  return (
    <div className="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="quote-drawer-title">
      <button
        type="button"
        className="absolute inset-0 bg-sage-900/20 backdrop-blur-sm"
        onClick={closeDrawer}
        aria-label="Close quote list"
      />
      <div className="quote-drawer relative flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-sage-100 p-5">
          <div>
            <h2 id="quote-drawer-title" className="font-serif text-xl text-sage-900">
              Quote List
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
            onClick={closeDrawer}
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
          {items.length === 0 ? (
            <p className="text-center text-sm text-sage-600 py-8">
              Your list is empty. Add items from products, categories, or the project finder.
            </p>
          ) : (
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-sage-100 bg-white px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium text-sage-800">{item.name}</span>
                    <ItemPrice name={item.name} className="mt-0.5 block" />
                    {item.source && (
                      <span className="mt-0.5 block text-xs text-sage-500">{item.source}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 rounded-lg px-2 py-1 text-xs text-sage-600 hover:bg-sage-50 hover:text-sage-900"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-sage-100 p-5 space-y-3">
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearItems}
              className="w-full rounded-xl border border-sage-200 py-2 text-sm text-sage-600 hover:bg-sage-50"
            >
              Clear List
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
