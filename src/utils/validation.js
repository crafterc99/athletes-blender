export function validateRecipe(recipe) {
  const errors = [];
  if (!recipe.bases || recipe.bases.length === 0)
    errors.push("Choose at least 1 base.");
  if (!recipe.addIns || recipe.addIns.length === 0)
    errors.push("Choose at least 1 add-in.");
  return errors;
}

export function validateBoxQuantities(recipes, boxCount) {
  const total = recipes.reduce((sum, r) => sum + (r.quantity ?? 0), 0);
  if (total !== boxCount) {
    return [
      `Assign all ${boxCount} smoothies. Currently: ${total} assigned.`,
    ];
  }
  return [];
}

export function validateBuilderReadyForCheckout(store) {
  const errors = [];
  if (!store.boxSize) errors.push("Choose a box size.");
  if (store.recipes.length === 0) errors.push("Build at least one recipe.");
  store.recipes.forEach((r, i) => {
    const recipeErrors = validateRecipe(r);
    recipeErrors.forEach((e) => errors.push(`Recipe ${i + 1}: ${e}`));
  });
  const qtyErrors = validateBoxQuantities(
    store.recipes,
    store.boxSize?.count ?? 0
  );
  errors.push(...qtyErrors);
  if (!store.purchaseType)
    errors.push("Choose subscription or one-time purchase.");
  return errors;
}
