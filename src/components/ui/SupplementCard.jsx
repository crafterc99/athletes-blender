import { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PRICING } from "../../data/pricing";

export default function SupplementCard({
  category,
  ingredients,
  selectedIngredients = [],
  onToggle,
}) {
  const [expanded, setExpanded] = useState(false);
  const selectedCount = ingredients.filter((i) =>
    selectedIngredients.includes(i)
  ).length;

  const price = PRICING.addOns.supplement;

  return (
    <div className={clsx(
      "rounded-2xl border-2 bg-white overflow-hidden transition-all duration-200",
      selectedCount > 0 ? "border-brand/30 bg-brand-50/30" : "border-gray-100 hover:border-gray-200"
    )}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gray-50/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-dark">
            {category}
          </span>
          {selectedCount > 0 && (
            <span className="text-[11px] font-bold text-brand bg-brand-50 px-2 py-0.5 rounded-md">
              {selectedCount} selected
            </span>
          )}
        </div>
        <ChevronDownIcon
          className={clsx(
            "w-5 h-5 text-gray-400 transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>
      {expanded && (
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {ingredients.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient);
            return (
              <button
                key={ingredient}
                onClick={() => onToggle(ingredient)}
                className={clsx(
                  "rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ease-out border-2 cursor-pointer",
                  isSelected
                    ? "bg-brand text-white border-brand shadow-[0_2px_6px_rgba(22,163,74,0.2)]"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-brand/40"
                )}
              >
                {ingredient}
                {isSelected && (
                  <span className="ml-1 text-[10px] text-white/70">+${price.toFixed(2)}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
