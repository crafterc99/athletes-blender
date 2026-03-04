import { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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

  return (
    <div className={clsx(
      "rounded-2xl border overflow-hidden transition-colors duration-150",
      selectedCount > 0 ? "border-green bg-green-light/30" : "border-gray-200 bg-white"
    )}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">
            {category}
          </span>
          {selectedCount > 0 && (
            <span className="bg-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
        </div>
        <ChevronDownIcon
          className={clsx(
            "w-5 h-5 text-gray-400 transition-transform duration-150",
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
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 border cursor-pointer",
                  isSelected
                    ? "bg-green text-white border-green"
                    : "bg-white text-black border-gray-200 hover:border-green"
                )}
              >
                {ingredient}
                {isSelected && (
                  <span className="ml-1 text-[10px] text-white/80">+$0.50</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
