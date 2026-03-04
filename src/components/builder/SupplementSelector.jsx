import { MENU } from "../../data/menu";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";
import SupplementCard from "../ui/SupplementCard";

export default function SupplementSelector({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const toggleSupplement = useBuilderStore((s) => s.toggleSupplement);

  if (!recipe) return null;

  const suppCost = recipe.supplements.length * PRICING.addOns.supplement;

  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-base font-semibold">
          Add Supplements
        </h3>
        <span className="text-xs text-gray-400">
          +${PRICING.addOns.supplement.toFixed(2)} each &middot; All optional
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MENU.supplements.map((cat) => (
          <SupplementCard
            key={cat.category}
            category={cat.category}
            ingredients={cat.ingredients}
            selectedIngredients={recipe.supplements}
            onToggle={(ingredient) =>
              toggleSupplement(recipeIndex, ingredient)
            }
          />
        ))}
      </div>
      {recipe.supplements.length > 0 && (
        <p className="text-xs text-gray-500 mt-3">
          {recipe.supplements.length} supplement
          {recipe.supplements.length > 1 ? "s" : ""} selected &middot; +$
          {suppCost.toFixed(2)}
        </p>
      )}
    </div>
  );
}
