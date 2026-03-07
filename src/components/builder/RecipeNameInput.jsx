import { useBuilderStore } from "../../store/builderStore";

export default function RecipeNameInput({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const updateRecipe = useBuilderStore((s) => s.updateRecipe);

  if (!recipe) return null;

  return (
    <div className="mb-8">
      <label className="block text-sm font-bold text-dark mb-2">
        Recipe Name
      </label>
      <input
        type="text"
        value={recipe.name}
        onChange={(e) =>
          updateRecipe(recipeIndex, { name: e.target.value })
        }
        placeholder={`Recipe ${recipeIndex + 1}`}
        className="w-full max-w-sm px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all duration-200 placeholder:text-gray-400"
      />
    </div>
  );
}
