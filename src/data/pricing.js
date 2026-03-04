export const PRICING = {
  boxSizes: [
    {
      id: "starter",
      label: "Starter",
      count: 10,
      basePrice: { oneTime: 34.99, subscription: 29.99 },
      badge: null,
    },
    {
      id: "pro",
      label: "Pro",
      count: 20,
      basePrice: { oneTime: 59.99, subscription: 49.99 },
      badge: "Most Popular",
    },
    {
      id: "elite",
      label: "Elite",
      count: 30,
      basePrice: { oneTime: 84.99, subscription: 69.99 },
      badge: "Best Value",
    },
  ],

  addOns: {
    extraBase: 1.0,
    extraAddIn: 1.0,
    extraSorbet: 1.5,
    supplement: 0.5,
  },

  included: {
    bases: 2,
    addIns: 2,
    sorbets: 1,
  },

  subscriptionFrequencies: [
    { id: "weekly", label: "Weekly" },
    { id: "biweekly", label: "Every 2 Weeks" },
    { id: "monthly", label: "Monthly" },
  ],

  firstOrderDiscount: 0.25,
  renewalDiscount: 0.15,

  blender: {
    standalonePrice: 49.99,
    freeWithFirstSub: true,
  },
};
