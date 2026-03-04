import { MENU } from "../../data/menu";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";
import IngredientCard from "../ui/IngredientCard";

export default function AddInSelector({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const toggleAddIn = useBuilderStore((s) => s.toggleAddIn);

  if (!recipe) return null;

  const included = PRICING.included.addIns;

  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg font-bold">Choose Add-Ins</h3>
        <span className="text-xs text-gray-400">
          {included} included &middot; +${PRICING.addOns.extraAddIn.toFixed(2)} each after
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {MENU.addIns.map((addIn) => {
          const isSelected = recipe.addIns.includes(addIn);
          const idx = recipe.addIns.indexOf(addIn);
          return (
            <IngredientCard
              key={addIn}
              name={addIn}
              selected={isSelected}
              count={isSelected ? 1 : 0}
              isPaid={isSelected && idx >= included}
              onAdd={() => { if (!isSelected) toggleAddIn(recipeIndex, addIn); }}
              onRemove={() => { if (isSelected) toggleAddIn(recipeIndex, addIn); }}
            />
          );
        })}
      </div>
      {recipe.addIns.length > included && (
        <p className="text-xs text-green font-medium mt-3">
          +${((recipe.addIns.length - included) * PRICING.addOns.extraAddIn).toFixed(2)} for{" "}
          {recipe.addIns.length - included} extra add-in
          {recipe.addIns.length - included > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
