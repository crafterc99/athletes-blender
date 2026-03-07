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
      <span className="text-brand text-xs font-bold uppercase tracking-widest">
        Step 1
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-2 tracking-tight text-dark">
        Choose Your Box
      </h2>
      <p className="text-gray-500 text-sm mb-8">
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
                "relative rounded-2xl p-6 text-left transition-all duration-200 ease-out cursor-pointer",
                isSelected
                  ? "border-2 border-brand bg-brand-50 shadow-[0_4px_20px_rgba(22,163,74,0.12)]"
                  : "border-2 border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
              )}
            >
              {size.badge && (
                <span className={clsx(
                  "absolute -top-3 left-4 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide",
                  size.badge === "Best Value"
                    ? "bg-dark text-white"
                    : "bg-brand text-white"
                )}>
                  {size.badge}
                </span>
              )}
              <div className="text-4xl font-extrabold text-dark mb-1">
                {size.count}
              </div>
              <div className="text-base font-bold text-dark mb-4">
                {size.label}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">One-time</span>
                  <span className="font-bold text-gray-500">
                    ${size.basePrice.oneTime.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand font-semibold">Subscribe</span>
                  <span className="font-bold text-brand">
                    ${size.basePrice.subscription.toFixed(2)}
                  </span>
                </div>
              </div>
              {isSelected && (
                <span className="absolute top-4 right-4 w-7 h-7 bg-brand rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(22,163,74,0.3)]">
                  <svg
                    className="w-4 h-4 text-white"
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
