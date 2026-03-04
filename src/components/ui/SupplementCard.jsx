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
    <div className="rounded-xl border border-card-border bg-white overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-surface/50 transition-colors"
      >
        <div>
          <span className="font-display font-bold text-sm uppercase tracking-wide">
            {category}
          </span>
          {selectedCount > 0 && (
            <span className="ml-2 text-xs font-mono text-green-dark">
              {selectedCount} selected
            </span>
          )}
        </div>
        <ChevronDownIcon
          className={clsx(
            "w-5 h-5 text-text-muted transition-transform duration-150",
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
                    ? "bg-green text-black border-green"
                    : "bg-surface text-black border-card-border hover:border-green"
                )}
              >
                {ingredient}
                {isSelected && (
                  <span className="ml-1 font-mono text-[10px]">+$0.50</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
