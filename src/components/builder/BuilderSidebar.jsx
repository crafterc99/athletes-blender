import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useBuilderStore } from "../../store/builderStore";
import {
  computeRecipeAddOnCost,
  computeBoxTotal,
} from "../../utils/pricingEngine";
import { validateBuilderReadyForCheckout } from "../../utils/validation";
import { processCheckout } from "../../services/checkout";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../store/toastStore";
import AllocationBar from "../ui/AllocationBar";
import Button from "../ui/Button";
import ConfirmModal from "../ui/ConfirmModal";

function SidebarContent() {
  const store = useBuilderStore();
  const {
    boxSize,
    recipes,
    purchaseType,
    frequency,
    blenderIncluded,
    totalAssigned,
    setQuantity,
    resetBuilder,
  } = store;
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const toast = useToast();

  const [showConfirm, setShowConfirm] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const order = await processCheckout({
        userId: user?.id || 'guest_' + Date.now(),
        boxSize,
        recipes,
        purchaseType,
        frequency,
        blenderIncluded,
        total: boxTotal,
      });
      resetBuilder();
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { state: { order } });
    } catch (err) {
      toast.error(err.message || 'Checkout failed. Please try again.');
    }
    setCheckoutLoading(false);
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-brand flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-dark">Your Box</h3>
        </div>
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
          <div className="flex items-center gap-2 text-xs font-bold text-brand bg-brand-50 px-3 py-2 rounded-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
            FREE: Athlete&apos;s Blender included
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
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-dark truncate">
                  {recipe.name || `Recipe ${i + 1}`}
                </div>
                {addOn > 0 && (
                  <div className="text-[11px] text-gray-400 font-medium">
                    +${addOn.toFixed(2)}/ea add-ons
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button
                  onClick={() =>
                    setQuantity(i, Math.max(0, recipe.quantity - 1))
                  }
                  className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-sm font-bold text-gray-500 hover:border-brand hover:text-brand transition-all duration-200 cursor-pointer"
                >
                  -
                </button>
                <span className="w-5 text-center text-sm font-bold tabular-nums text-dark">
                  {recipe.quantity}
                </span>
                <button
                  onClick={() => {
                    if (assigned < total) {
                      setQuantity(i, recipe.quantity + 1);
                    }
                  }}
                  className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-sm font-bold text-gray-500 hover:border-brand hover:text-brand transition-all duration-200 cursor-pointer"
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
        <div className="p-5 border-t border-gray-100 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Box Base</span>
            <span className="font-bold tabular-nums">${basePrice.toFixed(2)}</span>
          </div>
          {addOnTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Add-ons</span>
              <span className="font-bold tabular-nums">+${addOnTotal.toFixed(2)}</span>
            </div>
          )}
          {discount > 0 && (
            <div className="flex justify-between text-brand">
              <span className="font-semibold">First Order Discount (25%)</span>
              <span className="font-bold tabular-nums">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-extrabold text-lg pt-3 border-t border-gray-100 text-dark">
            <span>Total</span>
            <motion.span
              key={boxTotal}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
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
          <p className="text-xs text-gray-500 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg font-medium">
            Assign all {total} smoothies to continue
          </p>
        </div>
      )}

      {/* Checkout */}
      <div className="p-5 border-t border-gray-100">
        <Button
          variant="primary"
          disabled={!canCheckout}
          className="w-full"
          size="lg"
          onClick={() => canCheckout && setShowConfirm(true)}
        >
          Continue to Checkout
        </Button>
      </div>

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleCheckout}
        title="Confirm Your Order"
        message={`You're about to place a ${purchaseType === 'subscription' ? 'subscription' : 'one-time'} order for a ${boxSize?.label} Box (${boxSize?.count} smoothies) at $${boxTotal.toFixed(2)}.`}
        confirmLabel="Place Order"
        loading={checkoutLoading}
      />
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
        <div className="sticky top-20 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden max-h-[calc(100vh-6rem)]">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-full bg-dark text-white px-5 py-4 flex items-center justify-between cursor-pointer shadow-[0_-4px_16px_rgba(0,0,0,0.12)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <span className="text-sm font-bold">
              {total > 0 ? `${assigned}/${total} smoothies` : "Your Box"}
            </span>
          </div>
          <span className="font-extrabold text-lg tabular-nums">
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
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-hidden flex flex-col shadow-[0_-8px_32px_rgba(0,0,0,0.15)]"
              >
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-brand flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-dark">Your Box</h3>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer transition-colors"
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
