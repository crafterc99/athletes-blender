import clsx from "clsx";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";

export default function BoxSizeSelector() {
  const { boxSize, setBoxSize, addRecipe, recipes } = useBuilderStore();

  const handleSelect = (size) => {
    setBoxSize(size);
    if (recipes.length === 0) addRecipe();
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {PRICING.boxSizes.map((size) => {
          const isSelected = boxSize?.id === size.id;
          return (
            <button
              key={size.id}
              onClick={() => handleSelect(size)}
              className={clsx(
                "relative rounded-full py-3 px-4 text-center font-semibold text-sm transition-all duration-150 cursor-pointer",
                isSelected
                  ? "border-2 border-green text-green bg-white"
                  : "border border-gray-300 text-black bg-white hover:border-green"
              )}
            >
              {size.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap uppercase">
                  {size.badge}
                </span>
              )}
              {size.count} Smoothies
            </button>
          );
        })}
      </div>
    </div>
  );
}
