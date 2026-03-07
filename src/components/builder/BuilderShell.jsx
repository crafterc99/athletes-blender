import { useBuilderStore } from "../../store/builderStore";
import ProgressBar from "../ui/ProgressBar";
import BuilderSidebar from "./BuilderSidebar";
import BoxSizeSelector from "./BoxSizeSelector";
import RecipeBuilder from "./RecipeBuilder";
import QuantitySelector from "./QuantitySelector";
import BoxReview from "./BoxReview";
import PurchaseTypeSelector from "./PurchaseTypeSelector";
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BoxSizeSelector />;
      case 2:
        return <RecipeBuilder recipeIndex={activeRecipeIndex} />;
      case 3:
        return <QuantitySelector />;
      case 6:
        return <BoxReview />;
      case 7:
        return <PurchaseTypeSelector />;
      default:
        return <BoxSizeSelector />;
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
    if (currentStep === 2) return "Set Quantities";
    if (currentStep === 3 && !complete && recipes.length < 3)
      return `Add Recipe ${recipes.length + 1}`;
    if (currentStep === 3 && complete) return "Review Box";
    if (currentStep === 6) return "Choose Purchase Type";
    return "Next";
  };

  const canGoNext = () => {
    if (currentStep === 1) return false;
    if (currentStep === 2) return recipes[activeRecipeIndex]?.bases?.length > 0 && recipes[activeRecipeIndex]?.addIns?.length > 0;
    if (currentStep === 3) return complete || recipes.length < 3;
    return true;
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-8">
      <ProgressBar currentStep={currentStep} />

      <div className="mt-6 flex gap-8 lg:gap-10">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          {currentStep > 1 && (
            <div className="flex items-center gap-3 mt-6">
              <Button variant="outline" onClick={handleBack}>
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </Button>
              {currentStep !== 7 && (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canGoNext()}
                >
                  {nextLabel()}
                  <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BuilderSidebar />
      </div>
    </div>
  );
}
