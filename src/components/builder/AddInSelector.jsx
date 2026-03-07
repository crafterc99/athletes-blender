import { MENU } from "../../data/menu";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";
import IngredientPill from "../ui/IngredientPill";

export default function AddInSelector({ recipeIndex, showValidation }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const toggleAddIn = useBuilderStore((s) => s.toggleAddIn);

  if (!recipe) return null;

  const included = PRICING.included.addIns;
  const hasError = showValidation && recipe.addIns.length === 0;

  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-base font-bold text-dark">
          Choose Add-Ins
        </h3>
        <span className="text-xs font-semibold text-gray-400">
          {included} included &middot; +${PRICING.addOns.extraAddIn.toFixed(2)} each after
        </span>
      </div>
      {hasError && (
        <p className="text-xs font-medium text-red-500 mb-2">Please select at least one add-in</p>
      )}
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
        <p className="text-xs font-semibold text-brand mt-2 bg-brand-50 inline-block px-2 py-1 rounded-lg">
          +${((recipe.addIns.length - included) * PRICING.addOns.extraAddIn).toFixed(2)} for{" "}
          {recipe.addIns.length - included} extra add-in
          {recipe.addIns.length - included > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
