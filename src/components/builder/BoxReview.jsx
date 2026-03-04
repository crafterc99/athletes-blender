import { useBuilderStore } from "../../store/builderStore";
import { computeRecipeAddOnCost } from "../../utils/pricingEngine";
import { MENU } from "../../data/menu";

export default function BoxReview() {
  const { recipes, boxSize, setCurrentStep, setActiveRecipeIndex } =
    useBuilderStore();

  if (!boxSize) return null;

  const getSorbetName = (id) =>
    MENU.sorbets.find((s) => s.id === id)?.name ?? "None";

  const colors = ["#5B9A3E", "#3B82F6", "#F59E0B"];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Review Your Box</h2>
      <p className="text-gray-500 text-sm mb-8">
        {boxSize.label} Box &mdash; {boxSize.count} smoothies
      </p>

      <div className="space-y-3">
        {recipes.map((recipe, i) => {
          const addOn = computeRecipeAddOnCost(recipe);
          return (
            <div
              key={recipe.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  >
                    R{i + 1}
                  </div>
                  <h3 className="font-bold text-sm">
                    {recipe.name || `Recipe ${i + 1}`}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold tabular-nums bg-gray-100 px-3 py-1 rounded-full">
                    x{recipe.quantity}
                  </span>
                  <button
                    onClick={() => {
                      setActiveRecipeIndex(i);
                      setCurrentStep(2);
                    }}
                    className="text-xs font-semibold text-green hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div>
                  <span className="text-gray-400">Bases:</span>{" "}
                  {recipe.bases.join(", ") || "None"}
                </div>
                <div>
                  <span className="text-gray-400">Add-ins:</span>{" "}
                  {recipe.addIns.join(", ") || "None"}
                </div>
                <div>
                  <span className="text-gray-400">Sorbet:</span>{" "}
                  {recipe.sorbet ? getSorbetName(recipe.sorbet) : "None"}
                </div>
                <div>
                  <span className="text-gray-400">Supplements:</span>{" "}
                  {recipe.supplements.join(", ") || "None"}
                </div>
              </div>

              {addOn > 0 && (
                <p className="text-xs text-green font-semibold mt-3">
                  Add-ons: +${addOn.toFixed(2)} per smoothie
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
