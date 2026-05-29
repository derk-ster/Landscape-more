import type { NamedImageSlot } from "./images";

export type FloatingPhoto = {
  id: string;
  slot: NamedImageSlot;
  alt: string;
  side: "left" | "right";
  /** Anchor from top of document flow, expressed as viewport height units */
  anchorVh: number;
  size: number;
  rotate: number;
  /** Section whose scroll position drives fade-in */
  sectionId: string;
  floatDelay: number;
  floatDuration: number;
  parallax: number;
};

export const floatingPhotos: FloatingPhoto[] = [
  {
    id: "float-flowers",
    slot: "flowers",
    alt: "Greenhouse flowers",
    side: "left",
    anchorVh: 12,
    size: 76,
    rotate: -5,
    sectionId: "home",
    floatDelay: 0,
    floatDuration: 9,
    parallax: 0.06,
  },
  {
    id: "float-herbs",
    slot: "herbs",
    alt: "Herbs and starts",
    side: "right",
    anchorVh: 28,
    size: 68,
    rotate: 4,
    sectionId: "home",
    floatDelay: 1.2,
    floatDuration: 10,
    parallax: 0.05,
  },
  {
    id: "float-plants",
    slot: "plants",
    alt: "Greenhouse plants",
    side: "right",
    anchorVh: 55,
    size: 82,
    rotate: 3,
    sectionId: "products",
    floatDelay: 0.4,
    floatDuration: 11,
    parallax: 0.07,
  },
  {
    id: "float-pots",
    slot: "pots-planters",
    alt: "Pots and planters",
    side: "left",
    anchorVh: 72,
    size: 70,
    rotate: -3,
    sectionId: "featured",
    floatDelay: 2,
    floatDuration: 8.5,
    parallax: 0.055,
  },
  {
    id: "float-yard-art",
    slot: "yard-art",
    alt: "Metal yard art",
    side: "left",
    anchorVh: 98,
    size: 74,
    rotate: -6,
    sectionId: "project-finder",
    floatDelay: 0.8,
    floatDuration: 9.5,
    parallax: 0.065,
  },
  {
    id: "float-mulch",
    slot: "mulch-soil",
    alt: "Soil and rock",
    side: "right",
    anchorVh: 118,
    size: 64,
    rotate: 5,
    sectionId: "calculator",
    floatDelay: 1.6,
    floatDuration: 10.5,
    parallax: 0.05,
  },
  {
    id: "float-patio",
    slot: "patio-porch",
    alt: "Patio and porch decor",
    side: "right",
    anchorVh: 145,
    size: 72,
    rotate: -4,
    sectionId: "reviews",
    floatDelay: 0.2,
    floatDuration: 9,
    parallax: 0.06,
  },
  {
    id: "float-storefront",
    slot: "storefront",
    alt: "Landscape and More storefront",
    side: "left",
    anchorVh: 168,
    size: 78,
    rotate: 3,
    sectionId: "contact",
    floatDelay: 1,
    floatDuration: 11.5,
    parallax: 0.045,
  },
];
