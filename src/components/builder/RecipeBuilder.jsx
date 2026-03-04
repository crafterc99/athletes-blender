import { useBuilderStore } from "../../store/builderStore";
import { computeRecipeAddOnCost } from "../../utils/pricingEngine";
import RecipeNameInput from "./RecipeNameInput";
import BaseSelector from "./BaseSelector";
import AddInSelector from "./AddInSelector";
import SorbetSelector from "./SorbetSelector";
import SupplementSelector from "./SupplementSelector";

export default function RecipeBuilder({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);

  if (!recipe) return null;

  const addOnCost = computeRecipeAddOnCost(recipe);

  return (
    <div>
      {addOnCost > 0 && (
        <div className="mb-4 inline-flex items-center gap-2 bg-green-light text-green-dark text-xs font-semibold px-3 py-1.5 rounded-full">
          Add-ons: +${addOnCost.toFixed(2)} per smoothie
        </div>
      )}
      <RecipeNameInput recipeIndex={recipeIndex} />
      <BaseSelector recipeIndex={recipeIndex} />
      <AddInSelector recipeIndex={recipeIndex} />
      <SorbetSelector recipeIndex={recipeIndex} />
      <SupplementSelector recipeIndex={recipeIndex} />
    </div>
  );
}
