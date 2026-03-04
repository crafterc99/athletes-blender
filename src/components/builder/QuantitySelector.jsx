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
      <p className="text-gray-500 text-sm mb-8">
        Distribute your {total} smoothies across your recipes.
      </p>

      <AllocationBar total={total} assigned={assigned} recipes={recipes} />

      <div className="mt-6 space-y-3">
        {recipes.map((recipe, i) => (
          <div
            key={recipe.id}
            className="flex items-center justify-between bg-white rounded-[14px] border border-[rgba(0,0,0,0.06)] p-4 hover:border-[rgba(0,0,0,0.15)] transition-colors duration-[125ms]"
          >
            <div>
              <span className="font-semibold text-sm">
                {recipe.name || `Recipe ${i + 1}`}
              </span>
              <span className="ml-2 text-xs text-gray-400">
                {recipe.bases.length} bases, {recipe.addIns.length} add-ins
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setQuantity(i, Math.max(0, recipe.quantity - 1))
                }
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-lg hover:border-black transition-colors duration-[125ms] cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center font-medium tabular-nums">
                {recipe.quantity}
              </span>
              <button
                onClick={() => {
                  if (assigned < total) {
                    setQuantity(i, recipe.quantity + 1);
                  }
                }}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-lg hover:border-black transition-colors duration-[125ms] cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        ))}
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
