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
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl">
          Build Recipe {recipeIndex + 1}
        </h2>
        {addOnCost > 0 && (
          <span className="text-sm text-gray-500">
            Add-ons: +${addOnCost.toFixed(2)}
          </span>
        )}
      </div>
      <RecipeNameInput recipeIndex={recipeIndex} />
      <BaseSelector recipeIndex={recipeIndex} />
      <AddInSelector recipeIndex={recipeIndex} />
      <SorbetSelector recipeIndex={recipeIndex} />
      <SupplementSelector recipeIndex={recipeIndex} />
    </div>
  );
}
