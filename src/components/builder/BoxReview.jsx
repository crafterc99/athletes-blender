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
      <span className="text-brand text-xs font-bold uppercase tracking-widest">
        Step 4
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-2 tracking-tight text-dark">
        Review Your Box
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        {boxSize.label} Box &mdash; {boxSize.count} smoothies
      </p>

      <div className="space-y-4">
        {recipes.map((recipe, i) => {
          const addOn = computeRecipeAddOnCost(recipe);
          return (
            <div
              key={recipe.id}
              className="rounded-2xl border-2 border-gray-100 bg-white p-5 sm:p-6 hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-dark">
                  {recipe.name || `Recipe ${i + 1}`}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-dark bg-gray-100 px-3 py-1 rounded-lg tabular-nums">
                    x{recipe.quantity}
                  </span>
                  <button
                    onClick={() => {
                      setActiveRecipeIndex(i);
                      setCurrentStep(2);
                    }}
                    className="text-xs font-bold text-brand hover:text-brand-dark cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Bases</span>
                  <p className="text-gray-600 mt-0.5">{recipe.bases.join(", ") || "None"}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Add-ins</span>
                  <p className="text-gray-600 mt-0.5">{recipe.addIns.join(", ") || "None"}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Sorbet</span>
                  <p className="text-gray-600 mt-0.5">{recipe.sorbet ? getSorbetName(recipe.sorbet) : "None"}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Supplements</span>
                  <p className="text-gray-600 mt-0.5">{recipe.supplements.join(", ") || "None"}</p>
                </div>
              </div>

              {addOn > 0 && (
                <p className="text-xs font-semibold text-brand mt-4 bg-brand-50 inline-block px-2 py-1 rounded-lg">
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
