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
      <h2 className="text-2xl font-bold mb-2">Assign Quantities</h2>
      <p className="text-gray-500 text-sm mb-8">
        Distribute your {total} smoothies across your recipes.
      </p>

      <AllocationBar total={total} assigned={assigned} recipes={recipes} />

      <div className="mt-6 space-y-3">
        {recipes.map((recipe, i) => {
          const colors = ["#5B9A3E", "#3B82F6", "#F59E0B"];
          return (
            <div
              key={recipe.id}
              className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: colors[i % colors.length] }}
                >
                  R{i + 1}
                </div>
                <div>
                  <span className="font-semibold text-sm">
                    {recipe.name || `Recipe ${i + 1}`}
                  </span>
                  <div className="text-xs text-gray-400">
                    {recipe.bases.length} bases, {recipe.addIns.length} add-ins
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0 bg-gray-100 rounded-full">
                <button
                  onClick={() =>
                    setQuantity(i, Math.max(0, recipe.quantity - 1))
                  }
                  className="w-10 h-10 flex items-center justify-center text-lg rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  &minus;
                </button>
                <span className="w-8 text-center font-bold tabular-nums">
                  {recipe.quantity}
                </span>
                <button
                  onClick={() => {
                    if (assigned < total) {
                      setQuantity(i, recipe.quantity + 1);
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center text-lg rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {assigned !== total && (
        <p className="text-sm text-gray-500 mt-4">
          Assign all {total} smoothies to continue. Currently: {assigned}{" "}
          assigned.
        </p>
      )}
    </div>
  );
}
