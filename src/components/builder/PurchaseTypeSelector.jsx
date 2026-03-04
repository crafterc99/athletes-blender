import clsx from "clsx";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";

export default function PurchaseTypeSelector() {
  const {
    purchaseType,
    frequency,
    setPurchaseType,
    setFrequency,
    setBlenderIncluded,
  } = useBuilderStore();

  const handleSubscribe = () => {
    setPurchaseType("subscription");
    setBlenderIncluded(true);
    if (!frequency) setFrequency("biweekly");
  };

  const handleOneTime = () => {
    setPurchaseType("one_time");
    setBlenderIncluded(false);
  };

  return (
    <div>
      <h2 className="text-2xl mb-2">How Would You Like to Purchase?</h2>
      <p className="text-text-muted text-sm mb-6">
        Subscribe to save on every order.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Subscribe */}
        <button
          onClick={handleSubscribe}
          className={clsx(
            "rounded-xl p-6 text-left transition-all duration-150 border-2 cursor-pointer",
            purchaseType === "subscription"
              ? "border-green bg-green/5 shadow-md"
              : "border-card-border bg-white hover:border-green/50"
          )}
        >
          <span className="inline-block bg-green text-black text-xs font-display font-bold uppercase px-3 py-1 rounded-full mb-3">
            Save 25% First Order
          </span>
          <h3 className="font-display text-xl uppercase mb-3">
            Subscribe & Save
          </h3>
          <ul className="space-y-1.5 text-sm text-text-muted">
            <li>Save 25% on first order</li>
            <li>Save 15% every renewal</li>
            <li>Free Athlete&apos;s Blender with first order</li>
            <li>Edit box anytime</li>
            <li>Skip or pause anytime</li>
            <li>Cancel anytime</li>
          </ul>
        </button>

        {/* One-Time */}
        <button
          onClick={handleOneTime}
          className={clsx(
            "rounded-xl p-6 text-left transition-all duration-150 border-2 cursor-pointer",
            purchaseType === "one_time"
              ? "border-green bg-green/5 shadow-md"
              : "border-card-border bg-white hover:border-green/50"
          )}
        >
          <h3 className="font-display text-xl uppercase mb-3 mt-8">
            One-Time Purchase
          </h3>
          <p className="text-sm text-text-muted">
            Full price, no commitment. Order whenever you want.
          </p>
        </button>
      </div>

      {/* Frequency selector */}
      {purchaseType === "subscription" && (
        <div className="mt-6">
          <label className="block font-display text-sm uppercase tracking-wide mb-2">
            Delivery Frequency
          </label>
          <div className="flex gap-3">
            {PRICING.subscriptionFrequencies.map((freq) => (
              <button
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium border transition-all duration-150 cursor-pointer",
                  frequency === freq.id
                    ? "bg-green text-black border-green"
                    : "bg-white text-black border-card-border hover:border-green"
                )}
              >
                {freq.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
