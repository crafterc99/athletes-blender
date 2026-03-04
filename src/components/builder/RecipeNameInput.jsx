import { useBuilderStore } from "../../store/builderStore";

export default function RecipeNameInput({ recipeIndex }) {
  const recipe = useBuilderStore((s) => s.recipes[recipeIndex]);
  const updateRecipe = useBuilderStore((s) => s.updateRecipe);

  if (!recipe) return null;

  return (
    <div className="mb-8">
      <label className="block text-sm font-semibold mb-2">
        Name Your Recipe
      </label>
      <input
        type="text"
        value={recipe.name}
        onChange={(e) =>
          updateRecipe(recipeIndex, { name: e.target.value })
        }
        placeholder={`Recipe ${recipeIndex + 1}`}
        className="w-full max-w-sm px-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-green transition-colors duration-150"
      />
    </div>
  );
}
