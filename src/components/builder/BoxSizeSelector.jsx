import clsx from "clsx";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";

export default function BoxSizeSelector() {
  const { boxSize, setBoxSize, addRecipe } = useBuilderStore();

  const handleSelect = (size) => {
    setBoxSize(size);
    addRecipe();
  };

  return (
    <div>
      <h2 className="text-2xl mb-2">Choose Your Box</h2>
      <p className="text-text-muted text-sm mb-6">
        How many smoothies do you want per delivery?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PRICING.boxSizes.map((size) => {
          const isSelected = boxSize?.id === size.id;
          return (
            <button
              key={size.id}
              onClick={() => handleSelect(size)}
              className={clsx(
                "relative rounded-xl p-6 text-left transition-all duration-150 border-2 cursor-pointer",
                isSelected
                  ? "border-green bg-green/5 shadow-md"
                  : "border-card-border bg-white hover:border-green/50 shadow-sm"
              )}
            >
              {size.badge && (
                <span className="absolute -top-3 left-4 bg-green text-black text-xs font-display font-bold uppercase px-3 py-1 rounded-full">
                  {size.badge}
                </span>
              )}
              <div className="font-display text-3xl font-bold mb-1">
                {size.count}
              </div>
              <div className="font-display text-lg uppercase tracking-wide mb-3">
                {size.label}
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">One-time</span>
                  <span className="font-mono">
                    ${size.basePrice.oneTime.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-dark font-medium">Subscribe</span>
                  <span className="font-mono text-green-dark">
                    ${size.basePrice.subscription.toFixed(2)}
                  </span>
                </div>
              </div>
              {isSelected && (
                <span className="absolute top-4 right-4 w-6 h-6 bg-green rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
