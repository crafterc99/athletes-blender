import { MENU } from "../../data/menu";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";
import IngredientPill from "../ui/IngredientPill";

export default function AddInSelector({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const toggleAddIn = useBuilderStore((s) => s.toggleAddIn);

  if (!recipe) return null;

  const included = PRICING.included.addIns;

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display text-lg uppercase tracking-wide">
          Choose Add-Ins
        </h3>
        <span className="text-xs text-text-muted font-mono">
          {included} included &middot; additional add-ins +$
          {PRICING.addOns.extraAddIn.toFixed(2)} each
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {MENU.addIns.map((addIn) => (
          <IngredientPill
            key={addIn}
            label={addIn}
            selected={recipe.addIns.includes(addIn)}
            isPaid={
              recipe.addIns.includes(addIn) &&
              recipe.addIns.indexOf(addIn) >= included
            }
            onClick={() => toggleAddIn(recipeIndex, addIn)}
          />
        ))}
      </div>
      {recipe.addIns.length > included && (
        <p className="text-xs text-orange font-mono mt-2">
          +${((recipe.addIns.length - included) * PRICING.addOns.extraAddIn).toFixed(2)} for{" "}
          {recipe.addIns.length - included} extra add-in
          {recipe.addIns.length - included > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
