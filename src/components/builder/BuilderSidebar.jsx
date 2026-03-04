import { motion, AnimatePresence } from "framer-motion";
import { useBuilderStore } from "../../store/builderStore";
import {
  computeRecipeAddOnCost,
  computeBoxTotal,
} from "../../utils/pricingEngine";
import { validateBuilderReadyForCheckout } from "../../utils/validation";
import AllocationBar from "../ui/AllocationBar";
import Button from "../ui/Button";

function SidebarContent() {
  const store = useBuilderStore();
  const {
    boxSize,
    recipes,
    purchaseType,
    totalAssigned,
    setQuantity,
  } = store;

  const assigned = totalAssigned();
  const total = boxSize?.count ?? 0;
  const errors = validateBuilderReadyForCheckout(store);
  const canCheckout = errors.length === 0;

  const basePrice = boxSize
    ? purchaseType === "subscription"
      ? boxSize.basePrice.subscription
      : boxSize.basePrice.oneTime
    : 0;

  const addOnTotal = recipes.reduce(
    (sum, r) => sum + computeRecipeAddOnCost(r) * r.quantity,
    0
  );

  const boxTotal = computeBoxTotal(boxSize, recipes, purchaseType, true);

  const discount =
    purchaseType === "subscription" ? (basePrice + addOnTotal) * 0.25 : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-base font-semibold mb-3">
          Your Box
        </h3>
        {boxSize && (
          <AllocationBar
            total={total}
            assigned={assigned}
            recipes={recipes}
          />
        )}
      </div>

      {/* Freebies */}
      {purchaseType === "subscription" && (
        <div className="px-5 pt-4">
          <div className="text-xs font-medium text-success">
            FREE: Athlete&apos;s Blender
          </div>
        </div>
      )}

      {/* Recipes */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {recipes.length === 0 && (
          <p className="text-sm text-gray-400">
            Choose a box size to get started.
          </p>
        )}
        {recipes.map((recipe, i) => {
          const addOn = computeRecipeAddOnCost(recipe);
          return (
            <div
              key={recipe.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">
                  {recipe.name || `Recipe ${i + 1}`}
                </div>
                {addOn > 0 && (
                  <div className="text-[11px] text-gray-400">
                    +${addOn.toFixed(2)}/ea
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button
                  onClick={() =>
                    setQuantity(i, Math.max(0, recipe.quantity - 1))
                  }
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:border-black transition-colors duration-[125ms] cursor-pointer"
                >
                  -
                </button>
                <span className="w-5 text-center text-sm font-medium tabular-nums">
                  {recipe.quantity}
                </span>
                <button
                  onClick={() => {
                    if (assigned < total) {
                      setQuantity(i, recipe.quantity + 1);
                    }
                  }}
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:border-black transition-colors duration-[125ms] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing */}
      {boxSize && (
        <div className="p-5 border-t border-gray-100 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Box Base</span>
            <span className="font-medium tabular-nums">${basePrice.toFixed(2)}</span>
          </div>
          {addOnTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Add-ons</span>
              <span className="font-medium tabular-nums">+${addOnTotal.toFixed(2)}</span>
            </div>
          )}
          {discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount (25%)</span>
              <span className="font-medium tabular-nums">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-100">
            <span>Total</span>
            <motion.span
              key={boxTotal}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.125 }}
              className="tabular-nums"
            >
              ${boxTotal.toFixed(2)}
            </motion.span>
          </div>
        </div>
      )}

      {/* Warning */}
      {boxSize && assigned !== total && (
        <div className="px-5 pb-2">
          <p className="text-xs text-gray-500">
            Assign all {total} smoothies to continue
          </p>
        </div>
      )}

      {/* Checkout */}
      <div className="p-5 border-t border-gray-100">
        <Button
          variant="cta"
          disabled={!canCheckout}
          className="w-full"
          onClick={() => {
            if (canCheckout) {
              alert(
                "Checkout stub — Shopify integration coming in Phase 2!"
              );
            }
          }}
        >
          Continue to Checkout
        </Button>
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
      <aside className="hidden lg:block w-[340px] shrink-0">
        <div className="sticky top-20 bg-white rounded-[14px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden max-h-[calc(100vh-6rem)]">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-full bg-black text-white px-5 py-3.5 flex items-center justify-between cursor-pointer shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
        >
          <span className="text-sm font-semibold">
            {total > 0 ? `${assigned}/${total} smoothies` : "Your Box"}
          </span>
          <span className="font-medium tabular-nums">
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
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h3 className="font-semibold">Your Box</h3>
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
