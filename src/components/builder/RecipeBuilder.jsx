import { useBuilderStore } from "../../store/builderStore";
import { computeRecipeAddOnCost } from "../../utils/pricingEngine";
import RecipeNameInput from "./RecipeNameInput";
import BaseSelector from "./BaseSelector";
import AddInSelector from "./AddInSelector";
import SorbetSelector from "./SorbetSelector";
import SupplementSelector from "./SupplementSelector";

export default function RecipeBuilder({ recipeIndex, showValidation }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);

  if (!recipe) return null;

  const addOnCost = computeRecipeAddOnCost(recipe);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Step 2
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight text-dark">
            Build Recipe {recipeIndex + 1}
          </h2>
        </div>
        {addOnCost > 0 && (
          <span className="text-sm font-bold text-brand bg-brand-50 px-3 py-1.5 rounded-lg">
            +${addOnCost.toFixed(2)} add-ons
          </span>
        )}
      </div>
      <RecipeNameInput recipeIndex={recipeIndex} />
      <BaseSelector recipeIndex={recipeIndex} showValidation={showValidation} />
      <AddInSelector recipeIndex={recipeIndex} showValidation={showValidation} />
      <SorbetSelector recipeIndex={recipeIndex} />
      <SupplementSelector recipeIndex={recipeIndex} />
    </div>
  );
}
