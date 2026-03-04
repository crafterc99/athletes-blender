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
      <p className="text-text-muted text-sm mb-6">
        {boxSize.label} Box &mdash; {boxSize.count} smoothies
      </p>

      <div className="space-y-4">
        {recipes.map((recipe, i) => {
          const addOn = computeRecipeAddOnCost(recipe);
          return (
            <div
              key={recipe.id}
              className="rounded-xl border border-card-border bg-white p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold uppercase text-sm">
                  {recipe.name || `Recipe ${i + 1}`}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm">
                    x{recipe.quantity}
                  </span>
                  <button
                    onClick={() => {
                      setActiveRecipeIndex(i);
                      setCurrentStep(2);
                    }}
                    className="text-xs text-green-dark font-medium hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div>
                  <span className="text-text-muted">Bases:</span>{" "}
                  {recipe.bases.join(", ") || "None"}
                </div>
                <div>
                  <span className="text-text-muted">Add-ins:</span>{" "}
                  {recipe.addIns.join(", ") || "None"}
                </div>
                <div>
                  <span className="text-text-muted">Sorbet:</span>{" "}
                  {recipe.sorbet ? getSorbetName(recipe.sorbet) : "None"}
                </div>
                <div>
                  <span className="text-text-muted">Supplements:</span>{" "}
                  {recipe.supplements.join(", ") || "None"}
                </div>
              </div>

              {addOn > 0 && (
                <p className="text-xs font-mono text-orange mt-2">
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
