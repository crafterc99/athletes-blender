import { computeBoxTotal } from "./pricingEngine";

export function buildShopifyPayload(store) {
  const { boxSize, recipes, purchaseType, frequency, blenderIncluded } = store;
  const properties = {
    box_type: purchaseType,
    subscription_frequency: frequency ?? "none",
    blender_included: String(blenderIncluded),
  };

  recipes.forEach((r, i) => {
    const n = i + 1;
    properties[`recipe_${n}_name`] = r.name || `Recipe ${n}`;
    properties[`recipe_${n}_bases`] = r.bases.join(", ");
    properties[`recipe_${n}_add_ins`] = r.addIns.join(", ");
    properties[`recipe_${n}_sorbet`] = r.sorbet ?? "none";
    properties[`recipe_${n}_supplements`] = r.supplements.join(", ");
    properties[`recipe_${n}_quantity`] = r.quantity;
  });

  return {
    variantId: `SMOOTHIE-BOX-${boxSize.count}`,
    quantity: 1,
    price: computeBoxTotal(boxSize, recipes, purchaseType, true),
    properties,
    blenderLineItem: blenderIncluded
      ? {
          variantId: "BLENDER-FREE-VARIANT",
          quantity: 1,
          price: 0,
        }
      : null,
  };
}
