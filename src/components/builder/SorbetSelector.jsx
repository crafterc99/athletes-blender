import { MENU } from "../../data/menu";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";
import SorbetCard from "../ui/SorbetCard";

export default function SorbetSelector({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const setSorbet = useBuilderStore((s) => s.setSorbet);

  if (!recipe) return null;

  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-base font-semibold">
          Choose Sorbet
        </h3>
        <span className="text-xs text-gray-400">
          {PRICING.included.sorbets} included &middot; +$
          {PRICING.addOns.extraSorbet.toFixed(2)} each after
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {MENU.sorbets.map((sorbet) => (
          <SorbetCard
            key={sorbet.id}
            sorbet={sorbet}
            selected={recipe.sorbet === sorbet.id}
            onClick={() => setSorbet(recipeIndex, sorbet.id)}
          />
        ))}
      </div>
    </div>
  );
}
