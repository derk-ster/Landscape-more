/**
 * Metadata for photos in public/assets/store/gallery/
 * Generated from visual review of Google Maps screenshots.
 */

export type GalleryPhoto = {
  file: string;
  alt: string;
  tags: string[];
  featured?: boolean;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    file: "Screenshot 2026-05-28 172101.png",
    alt: "Landscape and More storefront with metal yard art and plants",
    tags: ["storefront", "metal-art", "plants"],
    featured: true,
  },
  {
    file: "Screenshot 2026-05-28 172112.png",
    alt: "Organic vegetable and herb seed packets on display",
    tags: ["seeds", "garden-supplies"],
  },
  {
    file: "Screenshot 2026-05-28 172118.png",
    alt: "Colorful metal rooster and chicken yard art",
    tags: ["metal-art"],
    featured: true,
  },
  {
    file: "Screenshot 2026-05-28 172123.png",
    alt: "Glazed ceramic planters in teal and earth tones",
    tags: ["pots", "pottery"],
  },
  {
    file: "Screenshot 2026-05-28 172139.png",
    alt: "Metal flower stakes, pottery, and garden statues outdoors",
    tags: ["metal-art", "pots", "statues"],
  },
  {
    file: "Screenshot 2026-05-28 172145.png",
    alt: "Metal palm trees and large flower sculptures inside the shop",
    tags: ["metal-art", "interior"],
  },
  {
    file: "Screenshot 2026-05-28 172151.png",
    alt: "Greenhouse filled with flowering annuals and hanging baskets",
    tags: ["greenhouse", "plants", "flowers"],
    featured: true,
  },
  {
    file: "Screenshot 2026-05-28 172155.png",
    alt: "Gerbera daisies and begonias in the greenhouse",
    tags: ["greenhouse", "flowers"],
  },
  {
    file: "Screenshot 2026-05-28 172159.png",
    alt: "Talavera pottery and southwestern garden decor",
    tags: ["pottery", "decor"],
  },
  {
    file: "Screenshot 2026-05-28 172206.png",
    alt: "Hand-painted Talavera fish planter with succulents",
    tags: ["pottery", "pots"],
  },
  {
    file: "Screenshot 2026-05-28 172211.png",
    alt: "Colorful Talavera pots on display shelves",
    tags: ["pottery", "pots"],
  },
  {
    file: "Screenshot 2026-05-28 172215.png",
    alt: "Planted stone planter and slate fountain",
    tags: ["fountains", "pots"],
  },
  {
    file: "Screenshot 2026-05-28 172230.png",
    alt: "Hand-painted metal birdhouses hanging in the greenhouse",
    tags: ["decor", "birdhouses"],
  },
  {
    file: "Screenshot 2026-05-28 172235.png",
    alt: "Tiered pottery water fountain with metal garden art",
    tags: ["fountains", "metal-art"],
  },
  {
    file: "Screenshot 2026-05-28 172244.png",
    alt: "Rustic wooden lake and fishing themed signs",
    tags: ["signs"],
    featured: true,
  },
  {
    file: "Screenshot 2026-05-28 172249.png",
    alt: "Fishing and lake life metal and wood signs",
    tags: ["signs"],
  },
  {
    file: "Screenshot 2026-05-28 172308.png",
    alt: "Large metal dinosaur sculptures and wind spinners outdoors",
    tags: ["metal-art", "spinners"],
  },
  {
    file: "Screenshot 2026-05-28 172315.png",
    alt: "Pallet of gray chopped stone and flagstone",
    tags: ["stone", "hardscape"],
  },
  {
    file: "Screenshot 2026-05-28 172417.png",
    alt: "Metal welcome sign with colorful dragonfly",
    tags: ["signs", "metal-art"],
  },
  {
    file: "Screenshot 2026-05-28 172423.png",
    alt: "Outdoor bench with plants beside the greenhouse",
    tags: ["greenhouse", "patio"],
  },
  {
    file: "Screenshot 2026-05-28 172427.png",
    alt: "Large metal flowers and palm trees in the showroom",
    tags: ["metal-art", "interior"],
  },
  {
    file: "Screenshot 2026-05-28 172446.png",
    alt: "Storefront with wind spinners and metal sculptures",
    tags: ["storefront", "spinners"],
  },
  {
    file: "Screenshot 2026-05-28 172523.png",
    alt: "Landscape and More business card",
    tags: ["branding"],
  },
  {
    file: "Screenshot 2026-05-28 172558.png",
    alt: "Humorous metal wall sign",
    tags: ["signs", "metal-art"],
  },
  {
    file: "Screenshot 2026-05-28 172610.png",
    alt: "Landscape and More building with topsoil, river rock, and metal art signs",
    tags: ["storefront", "bulk-materials"],
    featured: true,
  },
];

export function galleryPhotoMeta(file: string): GalleryPhoto | undefined {
  return galleryPhotos.find((p) => p.file === file);
}
