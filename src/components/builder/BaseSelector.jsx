import { MENU } from "../../data/menu";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";
import IngredientPill from "../ui/IngredientPill";

export default function BaseSelector({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const toggleBase = useBuilderStore((s) => s.toggleBase);

  if (!recipe) return null;

  const included = PRICING.included.bases;

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display text-lg uppercase tracking-wide">
          Choose Your Base
        </h3>
        <span className="text-xs text-text-muted font-mono">
          {included} included &middot; additional bases +$
          {PRICING.addOns.extraBase.toFixed(2)} each
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {MENU.bases.map((base, i) => (
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
        <p className="text-xs text-orange font-mono mt-2">
          +${((recipe.bases.length - included) * PRICING.addOns.extraBase).toFixed(2)} for{" "}
          {recipe.bases.length - included} extra base
          {recipe.bases.length - included > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
