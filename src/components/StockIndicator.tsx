import {
  formatStockQuantity,
  getStock,
  stockStatusLabel,
  type StockEntry,
} from "@/data/stock";
import { cn } from "@/lib/utils";

type Props = {
  itemName: string;
  className?: string;
  /** compact: single line; detail: includes location */
  variant?: "compact" | "detail";
};

function StockContent({
  entry,
  variant,
}: {
  entry: StockEntry;
  variant: "compact" | "detail";
}) {
  const qty = formatStockQuantity(entry);
  const status = stockStatusLabel(entry.status);

  return (
    <>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
          entry.status === "in_stock" && "bg-emerald-50 text-emerald-800",
          entry.status === "low" && "bg-amber-50 text-amber-900",
          entry.status === "out" && "bg-sage-100 text-sage-600"
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            entry.status === "in_stock" && "bg-emerald-500",
            entry.status === "low" && "bg-amber-500",
            entry.status === "out" && "bg-sage-400"
          )}
          aria-hidden
        />
        {status}
        {entry.status !== "out" && (
          <>
            <span className="text-sage-400" aria-hidden>
              ·
            </span>
            <span className="font-semibold">{qty}</span>
          </>
        )}
      </span>
      {variant === "detail" && entry.status !== "out" && (
        <span className="mt-1 block text-xs text-sage-500">
          On the floor: {entry.location}
        </span>
      )}
    </>
  );
}

export function StockIndicator({
  itemName,
  className,
  variant = "compact",
}: Props) {
  const entry = getStock(itemName);
  if (!entry) return null;

  return (
    <div className={cn("stock-indicator", className)}>
      <StockContent entry={entry} variant={variant} />
    </div>
  );
}
