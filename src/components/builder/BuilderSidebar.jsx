import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
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
    blenderIncluded,
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
      <div className="p-4 border-b border-card-border">
        <h3 className="font-display text-lg uppercase tracking-wide mb-2">
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
        <div className="px-4 pt-3 space-y-1">
          <div className="text-xs text-green-dark font-medium">
            FREE: Athlete&apos;s Blender
          </div>
        </div>
      )}

      {/* Recipes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {recipes.length === 0 && (
          <p className="text-sm text-text-muted">
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
                <div className="font-display text-sm font-bold uppercase truncate">
                  {recipe.name || `Recipe ${i + 1}`}
                </div>
                {addOn > 0 && (
                  <div className="text-[10px] font-mono text-text-muted">
                    +${addOn.toFixed(2)}/ea
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() =>
                    setQuantity(i, Math.max(0, recipe.quantity - 1))
                  }
                  className="w-6 h-6 rounded-full border border-card-border flex items-center justify-center text-xs font-mono hover:border-green transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-5 text-center font-mono text-sm">
                  {recipe.quantity}
                </span>
                <button
                  onClick={() => {
                    if (assigned < total) {
                      setQuantity(i, recipe.quantity + 1);
                    }
                  }}
                  className="w-6 h-6 rounded-full border border-card-border flex items-center justify-center text-xs font-mono hover:border-green transition-colors cursor-pointer"
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
        <div className="p-4 border-t border-card-border space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Box Base</span>
            <span className="font-mono">${basePrice.toFixed(2)}</span>
          </div>
          {addOnTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-text-muted">Add-ons</span>
              <span className="font-mono">+${addOnTotal.toFixed(2)}</span>
            </div>
          )}
          {discount > 0 && (
            <div className="flex justify-between text-green-dark">
              <span>Discount (25%)</span>
              <span className="font-mono">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base pt-2 border-t border-card-border">
            <span>Total</span>
            <motion.span
              key={boxTotal}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="font-mono"
            >
              ${boxTotal.toFixed(2)}
            </motion.span>
          </div>
        </div>
      )}

      {/* Warning */}
      {boxSize && assigned !== total && (
        <div className="px-4 pb-2">
          <p className="text-xs text-orange font-medium">
            Assign all {total} smoothies to continue
          </p>
        </div>
      )}

      {/* Checkout */}
      <div className="p-4 border-t border-card-border">
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
        <div className="sticky top-4 bg-white rounded-xl border border-card-border shadow-sm overflow-hidden max-h-[calc(100vh-2rem)]">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-full bg-black text-white px-4 py-3 flex items-center justify-between cursor-pointer"
        >
          <span className="font-display uppercase text-sm">
            {total > 0 ? `${assigned}/${total} smoothies` : "Your Box"}
          </span>
          <span className="font-mono text-green">
            ${boxTotal.toFixed(2)}
          </span>
        </button>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="flex justify-between items-center p-4 border-b border-card-border">
                  <h3 className="font-display uppercase">Your Box</h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-text-muted text-2xl cursor-pointer"
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
