import { useBuilderStore } from "../../store/builderStore";
import BuilderSidebar from "./BuilderSidebar";
import BoxSizeSelector from "./BoxSizeSelector";
import PurchaseTypeSelector from "./PurchaseTypeSelector";
import RecipeBuilder from "./RecipeBuilder";
import QuantitySelector from "./QuantitySelector";
import BoxReview from "./BoxReview";
import Button from "../ui/Button";

export default function BuilderShell() {
  const {
    currentStep,
    setCurrentStep,
    activeRecipeIndex,
    recipes,
    boxSize,
    totalAssigned,
    isBoxComplete,
    addRecipe,
    setActiveRecipeIndex,
  } = useBuilderStore();

  const assigned = totalAssigned();
  const complete = isBoxComplete();

  const renderMainContent = () => {
    if (currentStep === 1 || !boxSize) return null;

    switch (currentStep) {
      case 2:
        return <RecipeBuilder recipeIndex={activeRecipeIndex} />;
      case 3:
        return <QuantitySelector />;
      case 6:
        return <BoxReview />;
      case 7:
        return <PurchaseTypeSelector />;
      default:
        return <RecipeBuilder recipeIndex={activeRecipeIndex} />;
    }
  };

  const handleNext = () => {
    if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (complete) {
        setCurrentStep(6);
      } else if (recipes.length < 3) {
        addRecipe();
        setActiveRecipeIndex(recipes.length);
        setCurrentStep(2);
      }
    } else if (currentStep === 6) {
      setCurrentStep(7);
    }
  };

  const handleBack = () => {
    if (currentStep === 2 && activeRecipeIndex > 0) {
      setActiveRecipeIndex(activeRecipeIndex - 1);
      return;
    }
    if (currentStep === 7) setCurrentStep(6);
    else if (currentStep === 6) setCurrentStep(3);
    else if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
  };

  const nextLabel = () => {
    if (currentStep === 2) return "Set Quantities →";
    if (currentStep === 3 && !complete && recipes.length < 3)
      return `Add Recipe ${recipes.length + 1} →`;
    if (currentStep === 3 && complete) return "Review Box →";
    if (currentStep === 6) return "Choose Purchase Type →";
    return "Next →";
  };

  const canGoNext = () => {
    if (currentStep === 1) return false;
    if (currentStep === 2)
      return (
        recipes[activeRecipeIndex]?.bases?.length > 0 &&
        recipes[activeRecipeIndex]?.addIns?.length > 0
      );
    if (currentStep === 3) return complete || recipes.length < 3;
    return true;
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-28 lg:pb-8">
      {/* ── TOP CONFIG SECTION (always visible) ── */}
      <div className="text-center py-10 border-b border-gray-100 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">
          Build Your Box
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Fully customizable smoothie packs, built around you.
        </p>

        {/* Box size toggles */}
        <div className="max-w-lg mx-auto mb-5">
          <BoxSizeSelector />
        </div>

        {/* Purchase type inline toggles */}
        {boxSize && (
          <div className="max-w-xl mx-auto">
            <PurchaseTypeSelector inline />
          </div>
        )}
      </div>

      {/* ── CATEGORY TABS (recipe switching) ── */}
      {boxSize && currentStep === 2 && recipes.length > 1 && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-gray-400 mr-2">Building:</span>
          {recipes.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActiveRecipeIndex(i)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-all duration-150 cursor-pointer ${
                activeRecipeIndex === i
                  ? "bg-green text-white border-green"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green"
              }`}
            >
              {r.name || `Recipe ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      {/* ── TWO-COLUMN BUILDER ── */}
      {boxSize && (
        <div className="flex gap-8">
          {/* Left: content grid */}
          <div className="flex-1 min-w-0">
            {/* Section label */}
            {currentStep >= 2 && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    {currentStep === 2 && "Customize Your Recipe"}
                    {currentStep === 3 && "Assign Quantities"}
                    {currentStep === 6 && "Review Your Box"}
                    {currentStep === 7 && "Purchase Options"}
                  </h2>
                </div>
                <span className="text-xs text-gray-400">
                  Showing: Recipe {activeRecipeIndex + 1}
                </span>
              </div>
            )}

            {renderMainContent()}

            {/* Navigation */}
            {currentStep > 1 && (
              <div className="flex items-center gap-3 mt-10 mb-4">
                <Button variant="outline" onClick={handleBack}>
                  ← Back
                </Button>
                {currentStep !== 7 && (
                  <Button
                    variant="green"
                    onClick={handleNext}
                    disabled={!canGoNext()}
                  >
                    {nextLabel()}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <BuilderSidebar />
        </div>
      )}
    </div>
  );
}
