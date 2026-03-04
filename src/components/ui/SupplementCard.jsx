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
    <div className="rounded-[14px] border border-[rgba(0,0,0,0.06)] bg-white overflow-hidden hover:border-[rgba(0,0,0,0.15)] transition-colors duration-[125ms]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gray-50 transition-colors duration-[125ms]"
      >
        <div>
          <span className="font-semibold text-sm">
            {category}
          </span>
          {selectedCount > 0 && (
            <span className="ml-2 text-xs text-gray-500">
              {selectedCount} selected
            </span>
          )}
        </div>
        <ChevronDownIcon
          className={clsx(
            "w-5 h-5 text-gray-400 transition-transform duration-[125ms]",
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
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-[125ms] ease-in-out border cursor-pointer",
                  isSelected
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-black border-gray-200 hover:border-gray-400"
                )}
              >
                {ingredient}
                {isSelected && (
                  <span className="ml-1 text-[10px] text-white/70">+$0.50</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
