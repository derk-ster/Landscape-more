export type QuizOption = { id: string; label: string };

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What are you working on?",
    options: [
      { id: "flower-bed", label: "Flower bed refresh" },
      { id: "patio-porch", label: "Patio or porch setup" },
      { id: "curb-appeal", label: "Front yard curb appeal" },
      { id: "herb-garden", label: "Herb or vegetable garden" },
      { id: "seasonal", label: "Seasonal decorating" },
      { id: "yard-art", label: "Yard art upgrade" },
    ],
  },
  {
    id: "q2",
    question: "What style do you want?",
    options: [
      { id: "clean", label: "Clean and simple" },
      { id: "colorful", label: "Colorful" },
      { id: "rustic", label: "Rustic" },
      { id: "unique", label: "Unique" },
      { id: "low-maint", label: "Low maintenance" },
    ],
  },
  {
    id: "q3",
    question: "How much space are you working with?",
    options: [
      { id: "small", label: "Small porch or patio" },
      { id: "medium", label: "Medium flower bed" },
      { id: "large", label: "Large yard area" },
      { id: "multiple", label: "Multiple areas" },
    ],
  },
  {
    id: "q4",
    question: "Do you need delivery or onsite help?",
    options: [
      { id: "delivery", label: "Delivery would help" },
      { id: "onsite", label: "I may need onsite services" },
      { id: "pickup", label: "Pickup is fine" },
      { id: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "q5",
    question: "What matters most?",
    options: [
      { id: "price", label: "Best price" },
      { id: "low-maint", label: "Low maintenance" },
      { id: "color", label: "More color" },
      { id: "unique", label: "Something unique" },
      { id: "staff", label: "Staff recommendations" },
    ],
  },
];

export type QuizAnswers = Record<string, string>;

export type QuizResult = {
  projectName: string;
  summary: string;
  categories: string[];
  starterList: string[];
  visitNote: string;
  deliveryNote?: string;
  onsiteNote?: string;
};

export function generateQuizResult(answers: QuizAnswers): QuizResult {
  const project = answers.q1;
  const style = answers.q2;
  const space = answers.q3;
  const logistics = answers.q4;
  const priority = answers.q5;

  const projectMap: Record<string, { name: string; summary: string; base: string[] }> = {
    "flower-bed": {
      name: "Flower Bed Refresh",
      summary: "Good fit for a flower bed refresh.",
      base: ["Healthy flower flats", "Topsoil", "Hardwood mulch", "Chopped stone edging"],
    },
    "patio-porch": {
      name: "Patio or Porch Setup",
      summary: "Good fit for a patio or porch setup.",
      base: ["Porch planter", "Talavera pottery", "Premium potting soil", "Hanging basket"],
    },
    "curb-appeal": {
      name: "Front Yard Curb Appeal",
      summary: "Good fit for front yard curb appeal.",
      base: ["Healthy flower flats", "Hardwood mulch", "Wooden lake sign", "Metal welcome sign"],
    },
    "herb-garden": {
      name: "Herb or Vegetable Garden",
      summary: "Good fit for an herb or vegetable garden.",
      base: ["Organic seed packets", "Herb starter pack", "Topsoil", "Premium potting soil"],
    },
    seasonal: {
      name: "Seasonal Decorating",
      summary: "Good fit for seasonal decorating.",
      base: ["Seasonal pumpkins", "Metal yard art", "Patio accent decor"],
    },
    "yard-art": {
      name: "Yard Art Upgrade",
      summary: "Good fit for a yard art upgrade.",
      base: ["Metal rooster yard art", "Wind spinner", "Wooden lake sign", "One of a kind planter"],
    },
  };

  const base = projectMap[project] ?? projectMap["flower-bed"];
  const starterList = [...base.base];

  if (style === "colorful" || priority === "color") {
    if (!starterList.includes("Healthy flower flats")) {
      starterList.push("Healthy flower flats");
    }
  }
  if (style === "rustic" || project === "yard-art") {
    if (!starterList.includes("Metal rooster yard art")) {
      starterList.push("Metal rooster yard art");
    }
  }
  if (style === "unique" || priority === "unique") {
    starterList.push("One of a kind planter");
  }
  if (priority === "low-maint" || style === "low-maint") {
    starterList.push("Begonias and gerbera daisies");
  }
  if (space === "large" || space === "multiple") {
    starterList.push("River rock");
  }

  const categories: string[] = [];
  if (["flower-bed", "curb-appeal"].includes(project)) {
    categories.push("Plants & Greenhouse", "Stone & Bulk Materials");
  }
  if (["patio-porch", "curb-appeal"].includes(project)) {
    categories.push("Seasonal & Patio", "Pots & Pottery");
  }
  if (project === "herb-garden") {
    categories.push("Seeds & Garden Starts", "Garden Supplies");
  }
  if (project === "seasonal") {
    categories.push("Seasonal & Patio", "Metal Yard Art & Spinners");
  }
  if (project === "yard-art") {
    categories.push("Metal Yard Art & Spinners", "Signs & Outdoor Decor");
  }
  if (project === "patio-porch") {
    categories.push("Water Features");
  }
  if (categories.length === 0) {
    categories.push("Signs & Outdoor Decor", "Garden Supplies");
  }

  const uniqueCategories = [...new Set(categories)];

  let deliveryNote: string | undefined;
  let onsiteNote: string | undefined;
  if (logistics === "delivery") {
    deliveryNote = "Delivery is available for bigger projects. Call to check coverage and timing.";
  }
  if (logistics === "onsite") {
    onsiteNote = "Ask about onsite services when you call. The team can talk through your project.";
  }

  const visitNote =
    priority === "staff"
      ? "Bring your idea in. The team can help you find what fits."
      : "Call ahead to check what is in stock before you visit.";

  return {
    projectName: base.name,
    summary: base.summary,
    categories: uniqueCategories,
    starterList: [...new Set(starterList)],
    visitNote,
    deliveryNote,
    onsiteNote,
  };
}
