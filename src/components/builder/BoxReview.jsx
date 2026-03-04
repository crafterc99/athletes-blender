import { useBuilderStore } from "../../store/builderStore";
import { computeRecipeAddOnCost } from "../../utils/pricingEngine";
import { MENU } from "../../data/menu";

export default function BoxReview() {
  const { recipes, boxSize, setCurrentStep, setActiveRecipeIndex } =
    useBuilderStore();

  if (!boxSize) return null;

  const getSorbetName = (id) =>
    MENU.sorbets.find((s) => s.id === id)?.name ?? "None";

  return (
    <div>
      <h2 className="text-2xl mb-2">Review Your Box</h2>
      <p className="text-gray-500 text-sm mb-8">
        {boxSize.label} Box &mdash; {boxSize.count} smoothies
      </p>

      <div className="space-y-3">
        {recipes.map((recipe, i) => {
          const addOn = computeRecipeAddOnCost(recipe);
          return (
            <div
              key={recipe.id}
              className="rounded-[14px] border border-[rgba(0,0,0,0.06)] bg-white p-5 hover:border-[rgba(0,0,0,0.15)] transition-colors duration-[125ms]"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">
                  {recipe.name || `Recipe ${i + 1}`}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium tabular-nums">
                    x{recipe.quantity}
                  </span>
                  <button
                    onClick={() => {
                      setActiveRecipeIndex(i);
                      setCurrentStep(2);
                    }}
                    className="text-xs font-medium text-gray-500 hover:text-black cursor-pointer transition-colors"
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
                <p className="text-xs text-gray-500 mt-3">
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
