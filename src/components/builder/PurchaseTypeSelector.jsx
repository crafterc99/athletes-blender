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
      <p className="text-gray-500 text-sm mb-8">
        Subscribe to save on every order.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Subscribe */}
        <button
          onClick={handleSubscribe}
          className={clsx(
            "rounded-[14px] p-6 text-left transition-all duration-[125ms] ease-in-out cursor-pointer",
            purchaseType === "subscription"
              ? "border-2 border-black shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              : "border border-[rgba(0,0,0,0.06)] bg-white hover:border-[rgba(0,0,0,0.30)]"
          )}
        >
          <span className="inline-block bg-black text-white text-[11px] font-semibold px-3 py-1 rounded-full mb-4">
            Save 25% First Order
          </span>
          <h3 className="text-lg font-bold mb-3">
            Subscribe & Save
          </h3>
          <ul className="space-y-2 text-sm text-gray-500">
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
            "rounded-[14px] p-6 text-left transition-all duration-[125ms] ease-in-out cursor-pointer",
            purchaseType === "one_time"
              ? "border-2 border-black shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              : "border border-[rgba(0,0,0,0.06)] bg-white hover:border-[rgba(0,0,0,0.30)]"
          )}
        >
          <h3 className="text-lg font-bold mb-3 mt-8">
            One-Time Purchase
          </h3>
          <p className="text-sm text-gray-500">
            Full price, no commitment. Order whenever you want.
          </p>
        </button>
      </div>

      {/* Frequency selector */}
      {purchaseType === "subscription" && (
        <div className="mt-8">
          <label className="block text-sm font-semibold mb-3">
            Delivery Frequency
          </label>
          <div className="flex gap-3">
            {PRICING.subscriptionFrequencies.map((freq) => (
              <button
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium border transition-all duration-[125ms] ease-in-out cursor-pointer",
                  frequency === freq.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200 hover:border-gray-400"
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
