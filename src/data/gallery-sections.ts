export type GallerySectionId =
  | "overview"
  | "greenhouse"
  | "metal-art"
  | "pottery"
  | "signs"
  | "materials"
  | "water-features"
  | "garden-supplies";

export type GallerySection = {
  id: GallerySectionId;
  title: string;
  description: string;
};

export const gallerySections: GallerySection[] = [
  {
    id: "overview",
    title: "Overview",
    description: "Storefront, building, and location on US-70 in Madill.",
  },
  {
    id: "greenhouse",
    title: "Greenhouse & Plants",
    description: "Annuals, begonias, hanging baskets, and seasonal color.",
  },
  {
    id: "metal-art",
    title: "Metal Yard Art & Spinners",
    description: "Roosters, flowers, dinosaurs, palm trees, and wind spinners.",
  },
  {
    id: "pottery",
    title: "Pots & Pottery",
    description: "Glazed ceramic, Talavera, and decorative planters.",
  },
  {
    id: "signs",
    title: "Signs & Wall Decor",
    description: "Wooden lake signs, metal welcome pieces, and birdhouses.",
  },
  {
    id: "materials",
    title: "Stone & Bulk Materials",
    description: "Topsoil, river rock, chopped stone, and flagstone.",
  },
  {
    id: "water-features",
    title: "Water Features",
    description: "Fountains and water displays in the showroom.",
  },
  {
    id: "garden-supplies",
    title: "Garden Seeds & Supplies",
    description: "Organic seeds and supplies for planting projects.",
  },
];

/** Primary section per gallery filename */
export const photoSectionMap: Record<string, GallerySectionId> = {
  "Screenshot 2026-05-28 172101.png": "overview",
  "Screenshot 2026-05-28 172112.png": "garden-supplies",
  "Screenshot 2026-05-28 172118.png": "metal-art",
  "Screenshot 2026-05-28 172123.png": "pottery",
  "Screenshot 2026-05-28 172139.png": "metal-art",
  "Screenshot 2026-05-28 172145.png": "metal-art",
  "Screenshot 2026-05-28 172151.png": "greenhouse",
  "Screenshot 2026-05-28 172155.png": "greenhouse",
  "Screenshot 2026-05-28 172159.png": "pottery",
  "Screenshot 2026-05-28 172206.png": "pottery",
  "Screenshot 2026-05-28 172211.png": "pottery",
  "Screenshot 2026-05-28 172215.png": "water-features",
  "Screenshot 2026-05-28 172230.png": "signs",
  "Screenshot 2026-05-28 172235.png": "water-features",
  "Screenshot 2026-05-28 172244.png": "signs",
  "Screenshot 2026-05-28 172249.png": "signs",
  "Screenshot 2026-05-28 172308.png": "metal-art",
  "Screenshot 2026-05-28 172315.png": "materials",
  "Screenshot 2026-05-28 172417.png": "signs",
  "Screenshot 2026-05-28 172423.png": "greenhouse",
  "Screenshot 2026-05-28 172427.png": "metal-art",
  "Screenshot 2026-05-28 172446.png": "overview",
  "Screenshot 2026-05-28 172523.png": "overview",
  "Screenshot 2026-05-28 172558.png": "signs",
  "Screenshot 2026-05-28 172610.png": "overview",
};

export function getSectionForFile(file: string): GallerySectionId {
  return photoSectionMap[file] ?? "overview";
}

/** First overview photo — used as site hero background (hidden from gallery overview) */
export const HERO_GALLERY_FILE = "Screenshot 2026-05-28 172101.png";

export function isHeroGalleryFile(file: string): boolean {
  return file === HERO_GALLERY_FILE;
}
