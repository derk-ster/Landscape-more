/**
 * Image slots for Landscape & More.
 * Drop files in public/assets/store/ (see README), then run: npm run sync-images
 */

export const ASSET_BASE = "/assets/store";

export type NamedImageSlot =
  | "storefront"
  | "plants"
  | "flowers"
  | "shrubs-trees"
  | "herbs"
  | "pots-planters"
  | "yard-art"
  | "signs-decor"
  | "mulch-soil"
  | "seasonal"
  | "patio-porch"
  | "garden-supplies"
  | "interior";

export type ImageSlotMeta = {
  slot: NamedImageSlot;
  file: string;
  alt: string;
  inventoryHints: string[];
};

export const namedImageSlots: ImageSlotMeta[] = [
  {
    slot: "storefront",
    file: "storefront.jpg",
    alt: "Landscape and More on US-70 with topsoil, river rock, and metal art",
    inventoryHints: ["storefront", "topsoil", "river rock", "metal art"],
  },
  {
    slot: "plants",
    file: "plants.jpg",
    alt: "Greenhouse annuals and hanging baskets",
    inventoryHints: ["greenhouse", "annuals"],
  },
  {
    slot: "flowers",
    file: "flowers.jpg",
    alt: "Begonias and gerbera daisies in the greenhouse",
    inventoryHints: ["begonias", "gerbera"],
  },
  {
    slot: "shrubs-trees",
    file: "shrubs-trees.jpg",
    alt: "Plants and greenhouse beside the store",
    inventoryHints: ["greenhouse", "nursery"],
  },
  {
    slot: "herbs",
    file: "herbs.jpg",
    alt: "Organic vegetable and herb seed display",
    inventoryHints: ["seeds", "organic"],
  },
  {
    slot: "pots-planters",
    file: "pots-planters.jpg",
    alt: "Glazed ceramic planters",
    inventoryHints: ["ceramic pots"],
  },
  {
    slot: "yard-art",
    file: "yard-art.jpg",
    alt: "Colorful metal rooster yard art",
    inventoryHints: ["metal roosters", "yard art"],
  },
  {
    slot: "signs-decor",
    file: "signs-decor.jpg",
    alt: "Wooden lake and fishing signs",
    inventoryHints: ["signs"],
  },
  {
    slot: "mulch-soil",
    file: "mulch-soil.jpg",
    alt: "Chopped stone and flagstone pallets",
    inventoryHints: ["stone", "flagstone"],
  },
  {
    slot: "seasonal",
    file: "seasonal.jpg",
    alt: "Storefront seasonal display with yard art",
    inventoryHints: ["seasonal", "storefront"],
  },
  {
    slot: "patio-porch",
    file: "patio-porch.jpg",
    alt: "Outdoor bench and plants by the greenhouse",
    inventoryHints: ["patio", "bench"],
  },
  {
    slot: "garden-supplies",
    file: "garden-supplies.jpg",
    alt: "Talavera pottery and garden supplies",
    inventoryHints: ["pottery", "supplies"],
  },
  {
    slot: "interior",
    file: "interior.jpg",
    alt: "Metal palm trees and flower sculptures inside",
    inventoryHints: ["showroom", "metal art"],
  },
];

export const categoryImageSlots: Record<string, NamedImageSlot> = {
  "plants-greenhouse": "plants",
  "seeds-starts": "herbs",
  "metal-yard-art": "yard-art",
  "pots-pottery": "pots-planters",
  "signs-decor": "signs-decor",
  "soil-rock-firewood": "mulch-soil",
  "water-features": "interior",
  "garden-supplies": "garden-supplies",
  "seasonal-patio": "patio-porch",
};


export type GalleryManifest = {
  generatedAt: string;
  gallery: { file: string; src: string }[];
  named: Partial<Record<NamedImageSlot, string>>;
  galleryCount: number;
  namedCount: number;
};

import manifestJson from "./gallery-manifest.json";

export const galleryManifest = manifestJson as GalleryManifest;

export function resolveNamedSrc(
  slot: NamedImageSlot,
  manifest: GalleryManifest = galleryManifest
): string | null {
  return manifest.named[slot] ?? null;
}

export function resolveCategorySrc(categoryId: string): string | null {
  const slot = categoryImageSlots[categoryId];
  if (!slot) return null;
  return resolveNamedSrc(slot);
}

