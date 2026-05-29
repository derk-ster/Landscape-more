export const reviewTags = [
  "Friendly Staff",
  "Plants",
  "Yard Art",
  "Outdoor Decor",
  "Atmosphere",
  "Good Prices",
  "Helpful Service",
  "Big Variety",
] as const;

export type Review = {
  id: string;
  quote: string;
  tags: string[];
};

export const reviews: Review[] = [
  {
    id: "1",
    quote:
      "Great staff, competitive prices, and a great atmosphere.",
    tags: ["Friendly Staff", "Good Prices", "Atmosphere"],
  },
  {
    id: "2",
    quote:
      "The flowers were in excellent health, as were the herbs.",
    tags: ["Plants"],
  },
  {
    id: "3",
    quote:
      "Love this place. Spent lots getting new yard art for the spring.",
    tags: ["Yard Art", "Big Variety"],
  },
  {
    id: "4",
    quote: "Nice place. Lots to see. I plan to return.",
    tags: ["Atmosphere", "Big Variety"],
  },
  {
    id: "5",
    quote:
      "Very cool business with lots of very cool items in stock.",
    tags: ["Big Variety", "Outdoor Decor"],
  },
  {
    id: "6",
    quote: "Love all their stuff, big variety to pick from.",
    tags: ["Big Variety"],
  },
  {
    id: "7",
    quote: "Cool place. Good prices.",
    tags: ["Good Prices"],
  },
  {
    id: "8",
    quote: "Excellent customer service. I recommend it.",
    tags: ["Helpful Service", "Friendly Staff"],
  },
  {
    id: "9",
    quote:
      "Beautiful healthy plants and a huge selection of metal sculptures and signs.",
    tags: ["Plants", "Yard Art"],
  },
  {
    id: "10",
    quote: "A large selection of one of a kind pots.",
    tags: ["Outdoor Decor", "Big Variety"],
  },
];
