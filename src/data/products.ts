export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  /** Gallery filename — product only appears when this photo exists */
  galleryFile: string;
};

export const products: Product[] = [
  {
    id: "prod-3",
    name: "Chopped Stone & Flagstone",
    category: "Stone & Bulk Materials",
    description: "Gray chopped stone and flagstone pallets for edging and paths.",
    badge: "Hardscape",
    galleryFile: "Screenshot 2026-05-28 172315.png",
  },
  {
    id: "prod-7",
    name: "Greenhouse Flower Flats",
    category: "Plants & Greenhouse",
    description: "Seasonal color from the greenhouse.",
    badge: "In season",
    galleryFile: "Screenshot 2026-05-28 172151.png",
  },
  {
    id: "prod-8",
    name: "Begonias & Gerbera Daisies",
    category: "Plants & Greenhouse",
    description: "Popular picks in multiple pot sizes.",
    badge: "Greenhouse",
    galleryFile: "Screenshot 2026-05-28 172155.png",
  },
  {
    id: "prod-10",
    name: "Organic Seed Packets",
    category: "Seeds & Garden Starts",
    description: "USDA organic vegetable and herb seeds on the rack inside.",
    badge: "Organic",
    galleryFile: "Screenshot 2026-05-28 172112.png",
  },
  {
    id: "prod-12",
    name: "Metal Rooster Yard Art",
    category: "Metal Yard Art & Spinners",
    description: "Colorful painted metal roosters and chickens in many sizes.",
    badge: "Local favorite",
    galleryFile: "Screenshot 2026-05-28 172118.png",
  },
  {
    id: "prod-13",
    name: "Large Metal Flower Stake",
    category: "Metal Yard Art & Spinners",
    description: "Oversized metal daisies, sunflowers, and roses on tall stakes.",
    badge: "Showroom",
    galleryFile: "Screenshot 2026-05-28 172139.png",
  },
  {
    id: "prod-14",
    name: "Metal Sculptures & Spinners",
    category: "Metal Yard Art & Spinners",
    description: "Dinosaurs, spinners, and large outdoor metal pieces.",
    badge: "Outdoor",
    galleryFile: "Screenshot 2026-05-28 172308.png",
  },
  {
    id: "prod-15",
    name: "Glazed Ceramic Planters",
    category: "Pots & Pottery",
    description: "Teal and earth-tone ceramic pots in many sizes.",
    badge: "Unique",
    galleryFile: "Screenshot 2026-05-28 172123.png",
  },
  {
    id: "prod-16",
    name: "Talavera Pottery",
    category: "Pots & Pottery",
    description: "Hand-painted pots, fish planters, and birdbaths.",
    badge: "Hand painted",
    galleryFile: "Screenshot 2026-05-28 172211.png",
  },
  {
    id: "prod-17",
    name: "Wooden Lake & Fishing Sign",
    category: "Signs & Outdoor Decor",
    description: "Rustic painted wood signs with lake themes.",
    badge: "Gift idea",
    galleryFile: "Screenshot 2026-05-28 172244.png",
  },
  {
    id: "prod-18",
    name: "Metal Welcome Sign",
    category: "Signs & Outdoor Decor",
    description: "Welcome signs with dragonflies and metal cutouts.",
    badge: "Porch",
    galleryFile: "Screenshot 2026-05-28 172417.png",
  },
  {
    id: "prod-19",
    name: "Metal Birdhouse",
    category: "Signs & Outdoor Decor",
    description: "Hand-painted metal birdhouses in the greenhouse area.",
    badge: "Decor",
    galleryFile: "Screenshot 2026-05-28 172230.png",
  },
  {
    id: "prod-20",
    name: "Tiered Pottery Fountain",
    category: "Water Features",
    description: "Fountains on display in the showroom.",
    badge: "Showroom",
    galleryFile: "Screenshot 2026-05-28 172235.png",
  },
];

export function resolveProductGallerySrc(
  product: Product,
  gallery: { file: string; src: string }[]
): string | null {
  const match = gallery.find((g) => g.file === product.galleryFile);
  return match?.src ?? null;
}
