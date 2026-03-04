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
      <p className="text-gray-500 text-sm mb-8">
        How many smoothies do you want per delivery?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {PRICING.boxSizes.map((size) => {
          const isSelected = boxSize?.id === size.id;
          return (
            <button
              key={size.id}
              onClick={() => handleSelect(size)}
              className={clsx(
                "relative rounded-[14px] p-6 text-left transition-all duration-[125ms] ease-in-out cursor-pointer",
                isSelected
                  ? "border-2 border-black shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  : "border border-[rgba(0,0,0,0.06)] bg-white hover:border-[rgba(0,0,0,0.30)]"
              )}
            >
              {size.badge && (
                <span className="absolute -top-3 left-4 bg-black text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  {size.badge}
                </span>
              )}
              <div className="text-4xl font-bold mb-1">
                {size.count}
              </div>
              <div className="text-base font-semibold mb-4">
                {size.label}
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">One-time</span>
                  <span className="font-medium">
                    ${size.basePrice.oneTime.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Subscribe</span>
                  <span className="font-medium">
                    ${size.basePrice.subscription.toFixed(2)}
                  </span>
                </div>
              </div>
              {isSelected && (
                <span className="absolute top-4 right-4 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
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
