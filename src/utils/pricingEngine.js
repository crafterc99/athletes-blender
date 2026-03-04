import { PRICING } from "../data/pricing";

export function computeRecipeAddOnCost(recipe) {
  const { extraBase, extraAddIn, extraSorbet, supplement } = PRICING.addOns;
  const {
    bases: incBases,
    addIns: incAddIns,
    sorbets: incSorbets,
  } = PRICING.included;

  const baseOverage =
    Math.max(0, (recipe.bases?.length ?? 0) - incBases) * extraBase;
  const addInOverage =
    Math.max(0, (recipe.addIns?.length ?? 0) - incAddIns) * extraAddIn;
  const sorbetCost = recipe.sorbet
    ? Math.max(0, 1 - incSorbets) * extraSorbet
    : 0;
  const suppCost = (recipe.supplements?.length ?? 0) * supplement;

  return baseOverage + addInOverage + sorbetCost + suppCost;
}

export function computeRecipeTotal(recipe) {
  return computeRecipeAddOnCost(recipe);
}

export function computeBoxTotal(
  boxSize,
  recipes,
  purchaseType,
  isFirstOrder = false
) {
  if (!boxSize) return 0;

  const basePrice =
    purchaseType === "subscription"
      ? boxSize.basePrice.subscription
      : boxSize.basePrice.oneTime;

  const addOnTotal = recipes.reduce(
    (sum, r) => sum + computeRecipeAddOnCost(r) * r.quantity,
    0
  );

  let total = basePrice + addOnTotal;

  if (purchaseType === "subscription") {
    const discount = isFirstOrder
      ? PRICING.firstOrderDiscount
      : PRICING.renewalDiscount;
    total = total * (1 - discount);
  }

  return Math.round(total * 100) / 100;
}
