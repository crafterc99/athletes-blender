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
      <span className="text-brand text-xs font-bold uppercase tracking-widest">
        Step 3
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-2 tracking-tight text-dark">
        Assign Quantities
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Distribute your {total} smoothies across your recipes.
      </p>

      <AllocationBar total={total} assigned={assigned} recipes={recipes} />

      <div className="mt-6 space-y-3">
        {recipes.map((recipe, i) => (
          <div
            key={recipe.id}
            className="flex items-center justify-between bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 hover:border-gray-200 transition-all duration-200"
          >
            <div>
              <span className="font-bold text-sm text-dark">
                {recipe.name || `Recipe ${i + 1}`}
              </span>
              <span className="ml-2 text-xs text-gray-400 font-medium">
                {recipe.bases.length} bases, {recipe.addIns.length} add-ins
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setQuantity(i, Math.max(0, recipe.quantity - 1))
                }
                className="w-9 h-9 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-lg font-bold text-gray-500 hover:border-brand hover:text-brand transition-all duration-200 cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center font-extrabold tabular-nums text-dark text-lg">
                {recipe.quantity}
              </span>
              <button
                onClick={() => {
                  if (assigned < total) {
                    setQuantity(i, recipe.quantity + 1);
                  }
                }}
                className="w-9 h-9 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-lg font-bold text-gray-500 hover:border-brand hover:text-brand transition-all duration-200 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {assigned !== total && (
        <p className="text-sm font-medium text-amber-700 bg-amber-50 mt-4 px-4 py-2.5 rounded-xl">
          Assign all {total} smoothies to continue. Currently: {assigned}{" "}
          assigned.
        </p>
      )}
    </div>
  );
}
