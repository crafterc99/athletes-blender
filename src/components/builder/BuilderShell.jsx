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
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-8">
      <ProgressBar currentStep={currentStep} />

      <div className="mt-8 flex gap-10">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {renderStep()}

          {/* Navigation */}
          {currentStep > 1 && (
            <div className="flex items-center gap-3 mt-10">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              {currentStep !== 7 && (
                <Button
                  variant="cta"
                  onClick={handleNext}
                  disabled={!canGoNext()}
                >
                  {nextLabel()}
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
