import { useBuilderStore } from "../../store/builderStore";
import AllocationBar from "../ui/AllocationBar";

export default function QuantitySelector() {
  const { recipes, boxSize, totalAssigned } = useBuilderStore();
  const setQuantity = useBuilderStore((s) => s.setQuantity);

  if (!boxSize) return null;

  const total = boxSize.count;
  const assigned = totalAssigned();

  return (
    <div>
      <h2 className="text-2xl mb-2">Assign Quantities</h2>
      <p className="text-text-muted text-sm mb-6">
        Distribute your {total} smoothies across your recipes.
      </p>

      <AllocationBar total={total} assigned={assigned} recipes={recipes} />

      <div className="mt-6 space-y-4">
        {recipes.map((recipe, i) => (
          <div
            key={recipe.id}
            className="flex items-center justify-between bg-white rounded-xl border border-card-border p-4"
          >
            <div>
              <span className="font-display font-bold uppercase text-sm">
                {recipe.name || `Recipe ${i + 1}`}
              </span>
              <span className="ml-2 text-xs text-text-muted font-mono">
                {recipe.bases.length} bases, {recipe.addIns.length} add-ins
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setQuantity(i, Math.max(0, recipe.quantity - 1))
                }
                className="w-8 h-8 rounded-full border border-card-border flex items-center justify-center text-lg font-mono hover:border-green transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center font-mono font-medium">
                {recipe.quantity}
              </span>
              <button
                onClick={() => {
                  if (assigned < total) {
                    setQuantity(i, recipe.quantity + 1);
                  }
                }}
                className="w-8 h-8 rounded-full border border-card-border flex items-center justify-center text-lg font-mono hover:border-green transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {assigned !== total && (
        <p className="text-sm text-orange font-medium mt-4">
          Assign all {total} smoothies to continue. Currently: {assigned}{" "}
          assigned.
        </p>
      )}
    </div>
  );
}
