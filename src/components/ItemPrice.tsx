import { formatItemPrice, getItemPrice } from "@/data/prices";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  className?: string;
  size?: "sm" | "md";
};

export function ItemPrice({ name, className, size = "sm" }: Props) {
  const price = getItemPrice(name);
  if (!price) return null;

  return (
    <span
      className={cn(
        "shrink-0 font-medium tabular-nums text-sage-600",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
    >
      {formatItemPrice(price)}
    </span>
  );
}
