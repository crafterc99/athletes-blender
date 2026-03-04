import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useBuilderStore } from "../../store/builderStore";
import {
  computeRecipeAddOnCost,
  computeBoxTotal,
} from "../../utils/pricingEngine";
import { validateBuilderReadyForCheckout } from "../../utils/validation";
import AllocationBar from "../ui/AllocationBar";

function SidebarContent() {
  const store = useBuilderStore();
  const {
    boxSize,
    recipes,
    purchaseType,
    blenderIncluded,
    totalAssigned,
    setQuantity,
  } = store;

  const assigned = totalAssigned();
  const total = boxSize?.count ?? 0;
  const errors = validateBuilderReadyForCheckout(store);
  const canCheckout = errors.length === 0;
  const boxTotal = computeBoxTotal(boxSize, recipes, purchaseType, true);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 border-b border-gray-100">
        <h3 className="font-bold text-base mb-3">
          {assigned < total
            ? `Please Assign All ${total} Smoothies`
            : `${total} Smoothies Ready`}
        </h3>
        {boxSize && (
          <AllocationBar total={total} assigned={assigned} recipes={recipes} />
        )}
      </div>

      {/* Free items */}
      {purchaseType === "subscription" && (
        <div className="border-b border-gray-100">
          {/* Free blender */}
          <div className="flex items-center gap-3 p-4 relative">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-lg">🍹</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">Athlete&apos;s Blender</div>
              <div className="text-xs text-green">Free With Your First Order</div>
            </div>
            <span className="absolute top-2 right-0 bg-green text-white text-[9px] font-bold px-1.5 py-3 rounded-l-md uppercase"
              style={{ writingMode: "vertical-rl" }}
            >
              Free
            </span>
          </div>
        </div>
      )}

      {/* Selected recipes */}
      <div className="flex-1 overflow-y-auto">
        {recipes.length === 0 && (
          <p className="text-sm text-gray-400 p-4">
            Choose a box size to get started.
          </p>
        )}
        {recipes.map((recipe, i) => {
          const addOn = computeRecipeAddOnCost(recipe);
          const colors = ["#5B9A3E", "#3B82F6", "#F59E0B"];
          return (
            <div
              key={recipe.id}
              className="flex items-center gap-3 p-4 border-b border-gray-100"
            >
              {/* Color indicator */}
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-lg"
                style={{ backgroundColor: colors[i % colors.length] + "20" }}
              >
                <span style={{ color: colors[i % colors.length] }}>
                  R{i + 1}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">
                  {recipe.name || `Recipe ${i + 1}`}
                </div>
                {addOn > 0 && (
                  <div className="text-[11px] text-gray-400">
                    +${addOn.toFixed(2)}/ea add-ons
                  </div>
                )}
              </div>

              {/* Qty stepper */}
              <div className="flex items-center gap-0 bg-gray-100 rounded-full">
                <button
                  onClick={() => setQuantity(i, Math.max(0, recipe.quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-lg rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  &minus;
                </button>
                <span className="w-8 text-center text-sm font-bold tabular-nums">
                  {recipe.quantity}
                </span>
                <button
                  onClick={() => {
                    if (assigned < total) setQuantity(i, recipe.quantity + 1);
                  }}
                  className="w-9 h-9 flex items-center justify-center text-lg rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom status bar */}
      <div className="p-3">
        <button
          disabled={!canCheckout}
          onClick={() => {
            if (canCheckout) {
              alert("Checkout stub — Shopify integration coming in Phase 2!");
            }
          }}
          className={clsx(
            "w-full rounded-full py-3.5 px-4 flex items-center justify-between text-sm font-semibold transition-all duration-150",
            canCheckout
              ? "bg-green text-white hover:bg-green-dark cursor-pointer"
              : "bg-gray-800 text-white cursor-not-allowed"
          )}
        >
          <span>
            {canCheckout
              ? "Continue to Checkout"
              : assigned < total
              ? `Please Assign All ${total} Smoothies`
              : "Complete All Steps"}
          </span>
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">
            {assigned}/{total}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function BuilderSidebar() {
  const { sidebarOpen, setSidebarOpen, boxSize, totalAssigned, recipes, purchaseType } =
    useBuilderStore();

  const assigned = totalAssigned();
  const total = boxSize?.count ?? 0;
  const boxTotal = computeBoxTotal(boxSize, recipes, purchaseType, true);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[380px] shrink-0">
        <div className="sticky top-20 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-h-[calc(100vh-6rem)]">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-full bg-gray-800 text-white px-5 py-3.5 flex items-center justify-between cursor-pointer"
        >
          <span className="text-sm font-semibold">
            {total > 0
              ? `${assigned}/${total} smoothies assigned`
              : "Your Box"}
          </span>
          <span className="bg-green text-white text-xs font-bold px-2.5 py-1 rounded-full">
            ${boxTotal.toFixed(2)}
          </span>
        </button>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[85vh] overflow-hidden flex flex-col"
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <h3 className="font-bold">Your Box</h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-400 hover:text-black text-2xl cursor-pointer transition-colors"
                  >
                    &times;
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <SidebarContent />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
