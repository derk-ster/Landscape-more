export const business = {
  name: "Landscape & More",
  subtitle: "Landscaping Supply & Garden Center",
  tagline: "Plants, metal yard art, pottery, topsoil, rock, and more on US-70 in Madill.",
  address: "11464 US-70, Madill, OK 73446",
  phone: "(580) 564-1302",
  phoneTel: "tel:5805641302",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=11464+US-70,+Madill,+OK+73446",
  rating: 4.5,
  features: [
    "Greenhouse plants",
    "Metal yard art",
    "Delivery available",
    "Onsite services",
    "Service guarantee",
    "Quick visit",
    "Wheelchair accessible entrance",
    "Wheelchair accessible parking lot",
    "Accepts credit cards",
    "Accepts debit cards",
    "Accepts NFC mobile payments",
  ],
} as const;

export const trustBarItems = [
  { label: "Wheelchair Accessible", icon: "accessibility" },
  { label: "Delivery Available", icon: "truck" },
  { label: "Onsite Services", icon: "tools" },
  { label: "Service Guarantee", icon: "shield" },
  { label: "Card & Mobile Payments", icon: "card" },
  { label: "Quick Visit", icon: "clock" },
] as const;
