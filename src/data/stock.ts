/**
 * In-store stock levels (demo data aligned with May 2026 photos).
 * Call the store for exact counts before visiting.
 */

export type StockStatus = "in_stock" | "low" | "out";

export type StockUnit = "each" | "yd" | "flat" | "bag" | "pack" | "ft" | "sets";

export type StockEntry = {
  name: string;
  quantity: number;
  unit: StockUnit;
  status: StockStatus;
  /** Where shoppers usually find it in the store */
  location: string;
};

const UNIT_LABELS: Record<StockUnit, { one: string; many: string }> = {
  each: { one: "unit", many: "units" },
  yd: { one: "yd", many: "yd" },
  flat: { one: "flat", many: "flats" },
  bag: { one: "bag", many: "bags" },
  pack: { one: "pack", many: "packs" },
  ft: { one: "ft", many: "ft" },
  sets: { one: "set", many: "sets" },
};

function normalizeKey(name: string): string {
  return name.toLowerCase().trim();
}

const stockByKey: Record<string, StockEntry> = {
  // Featured products
  "chopped stone & flagstone": {
    name: "Chopped Stone & Flagstone",
    quantity: 18,
    unit: "yd",
    status: "in_stock",
    location: "Bulk yard (US-70 fence)",
  },
  "greenhouse flower flats": {
    name: "Greenhouse Flower Flats",
    quantity: 24,
    unit: "flat",
    status: "in_stock",
    location: "Greenhouse benches",
  },
  "begonias & gerbera daisies": {
    name: "Begonias & Gerbera Daisies",
    quantity: 36,
    unit: "each",
    status: "in_stock",
    location: "Greenhouse tables",
  },
  "organic seed packets": {
    name: "Organic Seed Packets",
    quantity: 48,
    unit: "pack",
    status: "in_stock",
    location: "Indoor seed rack",
  },
  "metal rooster yard art": {
    name: "Metal Rooster Yard Art",
    quantity: 14,
    unit: "each",
    status: "in_stock",
    location: "Outdoor yard art",
  },
  "large metal flower stake": {
    name: "Large Metal Flower Stake",
    quantity: 9,
    unit: "each",
    status: "low",
    location: "Showroom stakes",
  },
  "metal sculptures & spinners": {
    name: "Metal Sculptures & Spinners",
    quantity: 22,
    unit: "each",
    status: "in_stock",
    location: "Yard display",
  },
  "glazed ceramic planters": {
    name: "Glazed Ceramic Planters",
    quantity: 16,
    unit: "each",
    status: "in_stock",
    location: "Pottery aisle",
  },
  "talavera pottery": {
    name: "Talavera Pottery",
    quantity: 11,
    unit: "each",
    status: "in_stock",
    location: "Pottery aisle",
  },
  "wooden lake & fishing sign": {
    name: "Wooden Lake & Fishing Sign",
    quantity: 7,
    unit: "each",
    status: "low",
    location: "Sign wall",
  },
  "metal welcome sign": {
    name: "Metal Welcome Sign",
    quantity: 10,
    unit: "each",
    status: "in_stock",
    location: "Sign wall",
  },
  "metal birdhouse": {
    name: "Metal Birdhouse",
    quantity: 8,
    unit: "each",
    status: "in_stock",
    location: "Greenhouse decor",
  },
  "tiered pottery fountain": {
    name: "Tiered Pottery Fountain",
    quantity: 3,
    unit: "each",
    status: "low",
    location: "Showroom fountains",
  },

  // Category example items
  "flower flats and annuals": {
    name: "Flower flats and annuals",
    quantity: 24,
    unit: "flat",
    status: "in_stock",
    location: "Greenhouse",
  },
  "begonias and gerbera daisies": {
    name: "Begonias and gerbera daisies",
    quantity: 36,
    unit: "each",
    status: "in_stock",
    location: "Greenhouse",
  },
  "hanging baskets": {
    name: "Hanging baskets",
    quantity: 12,
    unit: "each",
    status: "in_stock",
    location: "Greenhouse hooks",
  },
  "ferns and foliage pots": {
    name: "Ferns and foliage pots",
    quantity: 15,
    unit: "each",
    status: "in_stock",
    location: "Greenhouse",
  },
  "organic vegetable seed packets": {
    name: "Organic vegetable seed packets",
    quantity: 40,
    unit: "pack",
    status: "in_stock",
    location: "Indoor rack",
  },
  "herb seeds (basil, dill, parsley)": {
    name: "Herb seeds (basil, dill, parsley)",
    quantity: 32,
    unit: "pack",
    status: "in_stock",
    location: "Indoor rack",
  },
  "tomato and pepper starts when in season": {
    name: "Tomato and pepper starts when in season",
    quantity: 0,
    unit: "each",
    status: "out",
    location: "Greenhouse (seasonal)",
  },
  "metal roosters and farm animals": {
    name: "Metal roosters and farm animals",
    quantity: 18,
    unit: "each",
    status: "in_stock",
    location: "Yard art",
  },
  "large metal flowers and palm trees": {
    name: "Large metal flowers and palm trees",
    quantity: 6,
    unit: "each",
    status: "low",
    location: "Yard display",
  },
  "wind spinners and kinetic stakes": {
    name: "Wind spinners and kinetic stakes",
    quantity: 20,
    unit: "each",
    status: "in_stock",
    location: "Yard art",
  },
  "metal dinosaurs and novelty sculptures": {
    name: "Metal dinosaurs and novelty sculptures",
    quantity: 12,
    unit: "each",
    status: "in_stock",
    location: "Yard art",
  },
  "talavera pots and fish planters": {
    name: "Talavera pots and fish planters",
    quantity: 11,
    unit: "each",
    status: "in_stock",
    location: "Pottery",
  },
  "concrete and resin garden statues": {
    name: "Concrete and resin garden statues",
    quantity: 5,
    unit: "each",
    status: "low",
    location: "Garden accents",
  },
  "wooden lake and fishing signs": {
    name: "Wooden lake and fishing signs",
    quantity: 7,
    unit: "each",
    status: "low",
    location: "Sign wall",
  },
  "metal welcome and novelty signs": {
    name: "Metal welcome and novelty signs",
    quantity: 10,
    unit: "each",
    status: "in_stock",
    location: "Sign wall",
  },
  "metal birdhouses": {
    name: "Metal birdhouses",
    quantity: 8,
    unit: "each",
    status: "in_stock",
    location: "Greenhouse area",
  },
  "metal butterflies and wall decor": {
    name: "Metal butterflies and wall decor",
    quantity: 14,
    unit: "each",
    status: "in_stock",
    location: "Wall decor",
  },
  "chopped stone and flagstone": {
    name: "Chopped stone and flagstone",
    quantity: 18,
    unit: "yd",
    status: "in_stock",
    location: "Bulk yard",
  },
  "topsoil": {
    name: "Topsoil",
    quantity: 30,
    unit: "yd",
    status: "in_stock",
    location: "Bulk yard",
  },
  "river rock": {
    name: "River rock",
    quantity: 22,
    unit: "yd",
    status: "in_stock",
    location: "Bulk yard",
  },
  "tiered pottery fountains": {
    name: "Tiered pottery fountains",
    quantity: 3,
    unit: "each",
    status: "low",
    location: "Showroom",
  },
  "slate fountains": {
    name: "Slate fountains",
    quantity: 2,
    unit: "each",
    status: "low",
    location: "Showroom",
  },
  "planted fountain displays": {
    name: "Planted fountain displays",
    quantity: 4,
    unit: "sets",
    status: "in_stock",
    location: "Showroom",
  },
  "premium potting soil and mulch": {
    name: "Premium potting soil and mulch",
    quantity: 45,
    unit: "bag",
    status: "in_stock",
    location: "Garden supplies",
  },
  "seed starting trays": {
    name: "Seed starting trays",
    quantity: 28,
    unit: "each",
    status: "in_stock",
    location: "Garden supplies",
  },
  "coco basket liners": {
    name: "Coco basket liners",
    quantity: 24,
    unit: "each",
    status: "in_stock",
    location: "Garden supplies",
  },
  "watering cans and garden hooks": {
    name: "Watering cans and garden hooks",
    quantity: 16,
    unit: "each",
    status: "in_stock",
    location: "Garden supplies",
  },
  "seasonal pumpkins and decor": {
    name: "Seasonal pumpkins and decor",
    quantity: 0,
    unit: "each",
    status: "out",
    location: "Seasonal (off-season)",
  },
  "outdoor benches": {
    name: "Outdoor benches",
    quantity: 4,
    unit: "each",
    status: "low",
    location: "Near greenhouse",
  },
  "porch planters and accents": {
    name: "Porch planters and accents",
    quantity: 12,
    unit: "each",
    status: "in_stock",
    location: "Patio display",
  },

  // Starter / list aliases
  "healthy flower flats": {
    name: "Healthy flower flats",
    quantity: 24,
    unit: "flat",
    status: "in_stock",
    location: "Greenhouse",
  },
  "hanging basket": {
    name: "Hanging basket",
    quantity: 12,
    unit: "each",
    status: "in_stock",
    location: "Greenhouse",
  },
  "premium potting soil": {
    name: "Premium potting soil",
    quantity: 45,
    unit: "bag",
    status: "in_stock",
    location: "Garden supplies",
  },
  "herb starter pack": {
    name: "Herb starter pack",
    quantity: 8,
    unit: "pack",
    status: "low",
    location: "Greenhouse",
  },
  "rustic metal yard art": {
    name: "Rustic metal yard art",
    quantity: 14,
    unit: "each",
    status: "in_stock",
    location: "Yard art",
  },
  "metal flower stake": {
    name: "Metal flower stake",
    quantity: 9,
    unit: "each",
    status: "low",
    location: "Showroom",
  },
  "wind spinner": {
    name: "Wind spinner",
    quantity: 20,
    unit: "each",
    status: "in_stock",
    location: "Yard art",
  },
  "one of a kind planter": {
    name: "One of a kind planter",
    quantity: 6,
    unit: "each",
    status: "low",
    location: "Pottery",
  },
  "ceramic statement pot": {
    name: "Ceramic statement pot",
    quantity: 16,
    unit: "each",
    status: "in_stock",
    location: "Pottery",
  },
  "decorative outdoor sign": {
    name: "Decorative outdoor sign",
    quantity: 7,
    unit: "each",
    status: "low",
    location: "Sign wall",
  },
  "hardwood mulch": {
    name: "Hardwood mulch",
    quantity: 40,
    unit: "yd",
    status: "in_stock",
    location: "Bulk yard",
  },
  "seasonal pumpkins": {
    name: "Seasonal pumpkins",
    quantity: 0,
    unit: "each",
    status: "out",
    location: "Seasonal (off-season)",
  },
  "porch planter": {
    name: "Porch planter",
    quantity: 12,
    unit: "each",
    status: "in_stock",
    location: "Patio display",
  },
  "patio accent decor": {
    name: "Patio accent decor",
    quantity: 12,
    unit: "each",
    status: "in_stock",
    location: "Patio display",
  },
};

export function getStock(itemName: string): StockEntry | null {
  if (!itemName?.trim()) return null;
  return stockByKey[normalizeKey(itemName)] ?? null;
}

export function formatStockQuantity(entry: StockEntry): string {
  if (entry.status === "out" || entry.quantity <= 0) return "Out of stock";
  const labels = UNIT_LABELS[entry.unit];
  const unitWord = entry.quantity === 1 ? labels.one : labels.many;
  return `${entry.quantity} ${unitWord}`;
}

export function stockStatusLabel(status: StockStatus): string {
  switch (status) {
    case "in_stock":
      return "In stock";
    case "low":
      return "Low stock";
    case "out":
      return "Out of stock";
  }
}
