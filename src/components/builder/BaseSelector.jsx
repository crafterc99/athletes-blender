import { MENU } from "../../data/menu";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";
import IngredientCard from "../ui/IngredientCard";

export default function BaseSelector({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const toggleBase = useBuilderStore((s) => s.toggleBase);

  if (!recipe) return null;

  const included = PRICING.included.bases;

  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg font-bold">Choose Your Base</h3>
        <span className="text-xs text-gray-400">
          {included} included &middot; +${PRICING.addOns.extraBase.toFixed(2)} each after
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {MENU.bases.map((base) => {
          const isSelected = recipe.bases.includes(base);
          const idx = recipe.bases.indexOf(base);
          return (
            <IngredientCard
              key={base}
              name={base}
              selected={isSelected}
              count={isSelected ? 1 : 0}
              isPaid={isSelected && idx >= included}
              onAdd={() => { if (!isSelected) toggleBase(recipeIndex, base); }}
              onRemove={() => { if (isSelected) toggleBase(recipeIndex, base); }}
            />
          );
        })}
      </div>
      {recipe.bases.length > included && (
        <p className="text-xs text-green font-medium mt-3">
          +${((recipe.bases.length - included) * PRICING.addOns.extraBase).toFixed(2)} for{" "}
          {recipe.bases.length - included} extra base
          {recipe.bases.length - included > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
