"use client";

import type { Category } from "@/data/categories";
import { resolveCategorySrc } from "@/data/images";
import { useQuote } from "@/context/QuoteContext";
import { useEffect } from "react";
import { AddToQuoteButton } from "./AddToQuoteButton";
import { ItemPrice } from "./ItemPrice";
import { StockIndicator } from "./StockIndicator";
import { StoreImage } from "./StoreImage";
import { formatPriceTotal, sumItemPrices } from "@/data/prices";

type Props = {
  category: Category | null;
  onClose: () => void;
};

export function CategoryDrawer({ category, onClose }: Props) {
  const { addManyToQuote, isInQuote } = useQuote();

  useEffect(() => {
    if (!category) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [category, onClose]);

  if (!category) return null;

  const starterOnList = category.starterItems.every((n) => isInQuote(n));
  const starterCount = category.starterItems.length;
  const starterTotal = sumItemPrices(category.starterItems);

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-drawer-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-sage-900/20 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close category details"
      />
      <div className="drawer-panel relative flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl sm:max-w-lg">
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-sage-100">
          <StoreImage
            src={resolveCategorySrc(category.id)}
            alt={category.title}
            fill
            sizes="400px"
            placeholderLabel={category.title}
          />
        </div>
        <div className="flex items-start justify-between border-b border-sage-100 p-5">
          <div>
            <span className="rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-medium text-sage-700">
              {category.badge}
            </span>
            <h2 id="category-drawer-title" className="mt-2 font-serif text-2xl text-sage-900">
              {category.title}
            </h2>
            <p className="mt-1 text-sm text-sage-600">{category.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-sage-600 hover:bg-sage-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <h3 className="text-sm font-semibold text-sage-800">Add one item</h3>
          <p className="mt-1 text-xs text-sage-600">
            Tap Add next to anything you want on your list.
          </p>
          <ul className="mt-3 space-y-2">
            {category.exampleItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-sage-100 bg-white px-3 py-2.5 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-sage-800">{item.name}</span>
                  <ItemPrice name={item.name} className="mt-0.5 block" />
                  <StockIndicator itemName={item.name} className="mt-1" />
                  {item.note && (
                    <span className="mt-0.5 block text-xs text-sage-500">{item.note}</span>
                  )}
                </div>
                <AddToQuoteButton
                  itemName={item.name}
                  source={category.title}
                  variant="secondary"
                  className="shrink-0 py-2"
                >
                  Add
                </AddToQuoteButton>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-sage-200/80 bg-sage-50/50 p-4">
            <h3 className="text-sm font-semibold text-sage-800">
              Starter pack ({starterCount} items)
            </h3>
            <p className="mt-1 text-xs text-sage-600">
              Adds these together if you tap the button below.
            </p>
            <ul className="mt-3 space-y-2">
              {category.starterItems.map((name) => (
                <li key={name} className="flex items-center justify-between gap-2 text-sm text-sage-700">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500" aria-hidden />
                    <span className={isInQuote(name) ? "text-sage-500 line-through" : ""}>
                      {name}
                    </span>
                    {isInQuote(name) && (
                      <span className="text-xs text-sage-500">(on list)</span>
                    )}
                  </span>
                  <ItemPrice name={name} />
                </li>
              ))}
            </ul>
            {starterTotal > 0 && (
              <p className="mt-3 text-sm font-medium text-sage-800">
                Pack estimate: ~{formatPriceTotal(starterTotal)}
              </p>
            )}
            <button
              type="button"
              disabled={starterOnList}
              onClick={(e) =>
                addManyToQuote(category.starterItems, category.title, e.currentTarget)
              }
              className="mt-4 w-full rounded-xl bg-sage-600 py-2.5 text-sm font-medium text-white transition hover:bg-sage-700 disabled:cursor-default disabled:bg-sage-400 btn-shine"
            >
              {starterOnList
                ? "Starter pack already on list"
                : `Add all ${starterCount} starter items`}
            </button>
          </div>
        </div>

        <div className="border-t border-sage-100 p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-sage-300 bg-white py-2.5 text-sm font-medium text-sage-700 hover:bg-sage-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
