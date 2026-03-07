import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultRecipe = () => ({
  id: null,
  name: "",
  bases: [],
  addIns: [],
  sorbet: null,
  supplements: [],
  quantity: 0,
});

export const useBuilderStore = create(
  persist(
    (set, get) => ({
      // Step 1
      boxSize: null,

      // Steps 2-5
      recipes: [],
      activeRecipeIndex: 0,

      // Step 7
      purchaseType: null,
      frequency: null,
      blenderIncluded: false,

      // UI
      currentStep: 1,
      sidebarOpen: false,

      // Computed
      totalAssigned: () =>
        get().recipes.reduce((sum, r) => sum + r.quantity, 0),
      remainingSlots: () =>
        (get().boxSize?.count ?? 0) - get().totalAssigned(),
      isBoxComplete: () =>
        get().totalAssigned() === (get().boxSize?.count ?? 0),

      // Actions
      setBoxSize: (size) => set({ boxSize: size, recipes: [], currentStep: 2 }),

      addRecipe: () => {
        const recipes = get().recipes;
        if (recipes.length >= 3) return;
        const newRecipe = { ...defaultRecipe(), id: crypto.randomUUID() };
        set({
          recipes: [...recipes, newRecipe],
          activeRecipeIndex: recipes.length,
        });
      },

      updateRecipe: (index, updates) =>
        set((state) => {
          const recipes = [...state.recipes];
          recipes[index] = { ...recipes[index], ...updates };
          return { recipes };
        }),

      removeRecipe: (index) =>
        set((state) => {
          const recipes = state.recipes.filter((_, i) => i !== index);
          return {
            recipes,
            activeRecipeIndex: Math.min(
              state.activeRecipeIndex,
              Math.max(0, recipes.length - 1)
            ),
          };
        }),

      toggleBase: (recipeIndex, base) => {
        const recipe = get().recipes[recipeIndex];
        const bases = recipe.bases.includes(base)
          ? recipe.bases.filter((b) => b !== base)
          : [...recipe.bases, base];
        get().updateRecipe(recipeIndex, { bases });
      },

      toggleAddIn: (recipeIndex, addIn) => {
        const recipe = get().recipes[recipeIndex];
        const addIns = recipe.addIns.includes(addIn)
          ? recipe.addIns.filter((a) => a !== addIn)
          : [...recipe.addIns, addIn];
        get().updateRecipe(recipeIndex, { addIns });
      },

      setSorbet: (recipeIndex, sorbet) => {
        const current = get().recipes[recipeIndex].sorbet;
        get().updateRecipe(recipeIndex, {
          sorbet: current === sorbet ? null : sorbet,
        });
      },

      toggleSupplement: (recipeIndex, ingredient) => {
        const recipe = get().recipes[recipeIndex];
        const supplements = recipe.supplements.includes(ingredient)
          ? recipe.supplements.filter((s) => s !== ingredient)
          : [...recipe.supplements, ingredient];
        get().updateRecipe(recipeIndex, { supplements });
      },

      setQuantity: (recipeIndex, quantity) => {
        get().updateRecipe(recipeIndex, { quantity });
      },

      setPurchaseType: (type) => set({ purchaseType: type }),
      setFrequency: (freq) => set({ frequency: freq }),
      setBlenderIncluded: (val) => set({ blenderIncluded: val }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setSidebarOpen: (val) => set({ sidebarOpen: val }),
      setActiveRecipeIndex: (idx) => set({ activeRecipeIndex: idx }),

      resetBuilder: () =>
        set({
          boxSize: null,
          recipes: [],
          purchaseType: null,
          frequency: null,
          blenderIncluded: false,
          currentStep: 1,
          activeRecipeIndex: 0,
        }),
    }),
    {
      name: 'ab-builder',
      partialize: (state) => ({
        boxSize: state.boxSize,
        recipes: state.recipes,
        activeRecipeIndex: state.activeRecipeIndex,
        purchaseType: state.purchaseType,
        frequency: state.frequency,
        blenderIncluded: state.blenderIncluded,
        currentStep: state.currentStep,
      }),
    }
  )
);
