import { MENU } from "../../data/menu";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";
import IngredientPill from "../ui/IngredientPill";

export default function BaseSelector({ recipeIndex, showValidation }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const toggleBase = useBuilderStore((s) => s.toggleBase);

  if (!recipe) return null;

  const included = PRICING.included.bases;
  const hasError = showValidation && recipe.bases.length === 0;

  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-base font-bold text-dark">
          Choose Your Base
        </h3>
        <span className="text-xs font-semibold text-gray-400">
          {included} included &middot; +${PRICING.addOns.extraBase.toFixed(2)} each after
        </span>
      </div>
      {hasError && (
        <p className="text-xs font-medium text-red-500 mb-2">Please select at least one base</p>
      )}
      <div className="flex flex-wrap gap-2">
        {MENU.bases.map((base) => (
          <IngredientPill
            key={base}
            label={base}
            selected={recipe.bases.includes(base)}
            isPaid={
              recipe.bases.includes(base) &&
              recipe.bases.indexOf(base) >= included
            }
            onClick={() => toggleBase(recipeIndex, base)}
          />
        ))}
      </div>
      {recipe.bases.length > included && (
        <p className="text-xs font-semibold text-brand mt-2 bg-brand-50 inline-block px-2 py-1 rounded-lg">
          +${((recipe.bases.length - included) * PRICING.addOns.extraBase).toFixed(2)} for{" "}
          {recipe.bases.length - included} extra base
          {recipe.bases.length - included > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
