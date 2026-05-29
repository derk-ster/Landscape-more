export type CategoryItem = {
  id: string;
  name: string;
  note?: string;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  badge: string;
  slug: string;
  exampleItems: CategoryItem[];
  starterItems: string[];
};

/**
 * Inventory aligned with in-store photos (May 2026) and customer reviews.
 */
export const categories: Category[] = [
  {
    id: "plants-greenhouse",
    title: "Plants & Greenhouse",
    description: "Greenhouse annuals, begonias, gerbera daisies, hanging baskets, and seasonal color.",
    badge: "Greenhouse",
    slug: "plants-greenhouse",
    exampleItems: [
      { id: "pg1", name: "Flower flats and annuals" },
      { id: "pg2", name: "Begonias and gerbera daisies" },
      { id: "pg3", name: "Hanging baskets" },
      { id: "pg4", name: "Ferns and foliage pots" },
    ],
    starterItems: ["Healthy flower flats", "Hanging basket", "Premium potting soil"],
  },
  {
    id: "seeds-starts",
    title: "Seeds & Garden Starts",
    description: "Organic vegetable and herb seed packets plus seasonal garden starts.",
    badge: "Organic seeds",
    slug: "seeds-starts",
    exampleItems: [
      { id: "ss1", name: "Organic vegetable seed packets" },
      { id: "ss2", name: "Herb seeds (basil, dill, parsley)" },
      { id: "ss3", name: "Tomato and pepper starts when in season" },
    ],
    starterItems: ["Herb starter pack", "Organic seed packets", "Seed starting trays"],
  },
  {
    id: "metal-yard-art",
    title: "Metal Yard Art & Spinners",
    description: "Roosters, flowers, dinosaurs, palm trees, wind spinners, and large metal sculptures.",
    badge: "Huge selection",
    slug: "metal-yard-art",
    exampleItems: [
      { id: "my1", name: "Metal roosters and farm animals" },
      { id: "my2", name: "Large metal flowers and palm trees" },
      { id: "my3", name: "Wind spinners and kinetic stakes" },
      { id: "my4", name: "Metal dinosaurs and novelty sculptures" },
    ],
    starterItems: ["Rustic metal yard art", "Metal flower stake", "Wind spinner"],
  },
  {
    id: "pots-pottery",
    title: "Pots & Pottery",
    description: "Glazed ceramic planters, Talavera pottery, and one of a kind containers.",
    badge: "Unique finds",
    slug: "pots-pottery",
    exampleItems: [
      { id: "pp1", name: "Glazed ceramic planters" },
      { id: "pp2", name: "Talavera pots and fish planters" },
      { id: "pp3", name: "One of a kind planters" },
      { id: "pp4", name: "Concrete and resin garden statues" },
    ],
    starterItems: ["One of a kind planter", "Ceramic statement pot", "Premium potting soil"],
  },
  {
    id: "signs-decor",
    title: "Signs & Outdoor Decor",
    description: "Wooden lake signs, metal wall art, welcome signs, and metal birdhouses.",
    badge: "Gift friendly",
    slug: "signs-decor",
    exampleItems: [
      { id: "sd1", name: "Wooden lake and fishing signs" },
      { id: "sd2", name: "Metal welcome and novelty signs" },
      { id: "sd3", name: "Metal birdhouses" },
      { id: "sd4", name: "Metal butterflies and wall decor" },
    ],
    starterItems: ["Decorative outdoor sign", "Metal welcome sign", "Metal birdhouse"],
  },
  {
    id: "soil-rock-firewood",
    title: "Stone & Bulk Materials",
    description: "Chopped stone, flagstone, topsoil, and river rock. Call for stock.",
    badge: "Bulk",
    slug: "soil-rock-firewood",
    exampleItems: [
      { id: "sr1", name: "Chopped stone and flagstone" },
      { id: "sr2", name: "Topsoil" },
      { id: "sr3", name: "River rock" },
    ],
    starterItems: ["Chopped stone and flagstone", "Topsoil", "River rock"],
  },
  {
    id: "water-features",
    title: "Water Features",
    description: "Tiered pottery fountains and slate fountains for patio and garden.",
    badge: "Showroom",
    slug: "water-features",
    exampleItems: [
      { id: "wf1", name: "Tiered pottery fountains" },
      { id: "wf2", name: "Slate fountains" },
      { id: "wf3", name: "Planted fountain displays" },
    ],
    starterItems: ["Tiered pottery fountain", "River rock", "Patio accent decor"],
  },
  {
    id: "garden-supplies",
    title: "Garden Supplies",
    description: "Potting soil, mulch, seed trays, basket liners, and watering supplies.",
    badge: "Projects",
    slug: "garden-supplies",
    exampleItems: [
      { id: "gs1", name: "Premium potting soil and mulch" },
      { id: "gs2", name: "Seed starting trays" },
      { id: "gs3", name: "Coco basket liners" },
      { id: "gs4", name: "Watering cans and garden hooks" },
    ],
    starterItems: ["Premium potting soil", "Hardwood mulch", "Seed starting trays"],
  },
  {
    id: "seasonal-patio",
    title: "Seasonal & Patio",
    description: "Seasonal decor, pumpkins, outdoor benches, and porch refresh pieces.",
    badge: "Seasonal",
    slug: "seasonal-patio",
    exampleItems: [
      { id: "sp1", name: "Seasonal pumpkins and decor" },
      { id: "sp2", name: "Outdoor benches" },
      { id: "sp3", name: "Porch planters and accents" },
    ],
    starterItems: ["Seasonal pumpkins", "Porch planter", "Patio accent decor"],
  },
];
