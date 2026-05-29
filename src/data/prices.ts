/**
 * Estimated in-store prices for demo / quote planning.
 * Based on typical garden-center pricing for items shown in store photos.
 */

export type ItemPrice = {
  amount: number;
  unit?: "each" | "yd" | "flat" | "bag" | "pack" | "ft";
};

const prices: Record<string, ItemPrice> = {
  // Featured products
  "chopped stone & flagstone": { amount: 85, unit: "yd" },
  "greenhouse flower flats": { amount: 22, unit: "flat" },
  "begonias & gerbera daisies": { amount: 9.99, unit: "each" },
  "organic seed packets": { amount: 3.49, unit: "each" },
  "metal rooster yard art": { amount: 59, unit: "each" },
  "large metal flower stake": { amount: 75, unit: "each" },
  "metal sculptures & spinners": { amount: 65, unit: "each" },
  "glazed ceramic planters": { amount: 42, unit: "each" },
  "talavera pottery": { amount: 55, unit: "each" },
  "wooden lake & fishing sign": { amount: 48, unit: "each" },
  "metal welcome sign": { amount: 38, unit: "each" },
  "metal birdhouse": { amount: 36, unit: "each" },
  "tiered pottery fountain": { amount: 225, unit: "each" },

  // Plants & greenhouse
  "healthy flower flats": { amount: 22, unit: "flat" },
  "flower flats and annuals": { amount: 22, unit: "flat" },
  "begonias and gerbera daisies": { amount: 9.99, unit: "each" },
  "hanging basket": { amount: 34.99, unit: "each" },
  "hanging baskets": { amount: 34.99, unit: "each" },
  "ferns and foliage pots": { amount: 18.99, unit: "each" },

  // Seeds & starts
  "herb starter pack": { amount: 16.99, unit: "pack" },
  "organic vegetable seed packets": { amount: 3.49, unit: "each" },
  "herb seeds (basil, dill, parsley)": { amount: 2.99, unit: "each" },
  "tomato and pepper starts when in season": { amount: 3.99, unit: "each" },
  "seed starting trays": { amount: 12.99, unit: "each" },

  // Metal yard art
  "rustic metal yard art": { amount: 59, unit: "each" },
  "metal flower stake": { amount: 75, unit: "each" },
  "wind spinner": { amount: 39, unit: "each" },
  "metal roosters and farm animals": { amount: 59, unit: "each" },
  "large metal flowers and palm trees": { amount: 85, unit: "each" },
  "wind spinners and kinetic stakes": { amount: 39, unit: "each" },
  "metal dinosaurs and novelty sculptures": { amount: 95, unit: "each" },
  "metal yard art": { amount: 49, unit: "each" },

  // Pots & pottery
  "one of a kind planter": { amount: 65, unit: "each" },
  "ceramic statement pot": { amount: 48, unit: "each" },
  "talavera pots and fish planters": { amount: 55, unit: "each" },
  "concrete and resin garden statues": { amount: 95, unit: "each" },

  // Signs & decor
  "decorative outdoor sign": { amount: 42, unit: "each" },
  "wooden lake and fishing signs": { amount: 48, unit: "each" },
  "wooden lake sign": { amount: 48, unit: "each" },
  "metal welcome and novelty signs": { amount: 38, unit: "each" },
  "metal birdhouses": { amount: 36, unit: "each" },
  "metal butterflies and wall decor": { amount: 28, unit: "each" },

  // Bulk materials
  "chopped stone and flagstone": { amount: 85, unit: "yd" },
  "chopped stone edging": { amount: 12, unit: "ft" },
  "topsoil": { amount: 55, unit: "yd" },
  "river rock": { amount: 75, unit: "yd" },
  "hardwood mulch": { amount: 38, unit: "yd" },

  // Water features
  "tiered pottery fountains": { amount: 225, unit: "each" },
  "slate fountains": { amount: 189, unit: "each" },
  "planted fountain displays": { amount: 150, unit: "each" },

  // Garden supplies
  "premium potting soil": { amount: 14.99, unit: "bag" },
  "premium potting soil and mulch": { amount: 14.99, unit: "bag" },
  "coco basket liners": { amount: 8.99, unit: "each" },
  "watering cans and garden hooks": { amount: 24.99, unit: "each" },

  // Seasonal & patio
  "seasonal pumpkins": { amount: 8.99, unit: "each" },
  "seasonal pumpkins and decor": { amount: 8.99, unit: "each" },
  "porch planter": { amount: 45, unit: "each" },
  "porch planters and accents": { amount: 45, unit: "each" },
  "patio accent decor": { amount: 32, unit: "each" },
  "outdoor benches": { amount: 149, unit: "each" },
};

function normalizeKey(name: string): string {
  return name.toLowerCase().trim();
}

export function getItemPrice(itemName: string): ItemPrice | null {
  if (!itemName?.trim()) return null;
  return prices[normalizeKey(itemName)] ?? null;
}

export function formatPriceTotal(amount: number): string {
  if (amount <= 0) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatItemPrice(price: ItemPrice): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price.amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price.amount);

  switch (price.unit) {
    case "yd":
      return `~${formatted}/yd`;
    case "flat":
      return `~${formatted}/flat`;
    case "bag":
      return `~${formatted}/bag`;
    case "pack":
      return `~${formatted}/pack`;
    case "ft":
      return `~${formatted}/ft`;
    case "each":
      return `~${formatted}`;
    default:
      return `~${formatted}`;
  }
}

export function getLineTotal(itemName: string, quantity = 1): number | null {
  const price = getItemPrice(itemName);
  if (!price) return null;
  return price.amount * quantity;
}

export function sumItemPrices(names: string[]): number {
  return names.reduce((sum, name) => sum + (getLineTotal(name) ?? 0), 0);
}

export const PRICE_DISCLAIMER =
  "Estimated in-store prices for planning. Call for current stock and exact pricing.";
