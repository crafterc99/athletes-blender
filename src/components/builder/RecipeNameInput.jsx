import { useBuilderStore } from "../../store/builderStore";

export default function RecipeNameInput({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const updateRecipe = useBuilderStore((s) => s.updateRecipe);

  if (!recipe) return null;

  return (
    <div className="mb-6">
      <label className="block font-display text-sm uppercase tracking-wide mb-2">
        Recipe Name
      </label>
      <input
        type="text"
        value={recipe.name}
        onChange={(e) =>
          updateRecipe(recipeIndex, { name: e.target.value })
        }
        placeholder={`Recipe ${recipeIndex + 1}`}
        className="w-full max-w-sm px-4 py-2.5 rounded-lg border border-card-border bg-white text-sm focus:outline-none focus:border-green transition-colors"
      />
    </div>
  );
}
