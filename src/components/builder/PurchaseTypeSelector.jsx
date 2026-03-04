import clsx from "clsx";
import { PRICING } from "../../data/pricing";
import { useBuilderStore } from "../../store/builderStore";

export default function PurchaseTypeSelector({ inline = false }) {
  const {
    purchaseType,
    frequency,
    boxSize,
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

  const subPrice = boxSize?.basePrice.subscription;
  const fullPrice = boxSize?.basePrice.oneTime;

  if (inline) {
    return (
      <div className="w-full space-y-3">
        {/* Toggle buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleSubscribe}
            className={clsx(
              "relative rounded-full py-3 px-3 text-center text-sm font-semibold transition-all duration-150 cursor-pointer",
              purchaseType === "subscription"
                ? "border-2 border-green text-black bg-white"
                : "border border-gray-300 text-black bg-white hover:border-green"
            )}
          >
            {purchaseType === "subscription" && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-green text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap uppercase">
                Save 25% First Order
              </span>
            )}
            {fullPrice && (
              <span className="line-through text-gray-400 text-xs mr-1">
                ${fullPrice?.toFixed(2)}
              </span>
            )}
            {subPrice ? `$${subPrice.toFixed(2)}` : ""} Subscribe & Save
          </button>
          <button
            onClick={handleOneTime}
            className={clsx(
              "rounded-full py-3 px-3 text-center text-sm font-semibold transition-all duration-150 cursor-pointer",
              purchaseType === "one_time"
                ? "border-2 border-green text-black bg-white"
                : "border border-gray-300 text-black bg-white hover:border-green"
            )}
          >
            {fullPrice ? `$${fullPrice.toFixed(2)}` : ""} One Time Purchase
          </button>
        </div>

        {/* Benefits under subscribe */}
        {purchaseType === "subscription" && (
          <div className="space-y-1.5 pl-1">
            {[
              `$${((fullPrice || 0) - (subPrice || 0)).toFixed(2)} Off First Order`,
              "15% Off Future Orders",
              "Free Athlete's Blender",
              "Skip or Cancel Anytime",
            ].map((b) => (
              <div key={b} className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-4 h-4 rounded-full bg-green flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {b}
              </div>
            ))}
          </div>
        )}

        {/* Frequency */}
        {purchaseType === "subscription" && (
          <div className="flex gap-2">
            {PRICING.subscriptionFrequencies.map((freq) => (
              <button
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={clsx(
                  "rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-150 cursor-pointer",
                  frequency === freq.id
                    ? "bg-green text-white border-green"
                    : "bg-white text-gray-500 border-gray-200 hover:border-green"
                )}
              >
                {freq.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full-page step version (step 7)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">How Would You Like to Purchase?</h2>
      <p className="text-gray-500 text-sm mb-8">
        Subscribe to save on every order.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleSubscribe}
          className={clsx(
            "rounded-2xl p-6 text-left transition-all duration-150 cursor-pointer",
            purchaseType === "subscription"
              ? "border-2 border-green bg-green-light/30"
              : "border border-gray-200 bg-white hover:border-green"
          )}
        >
          <span className="inline-block bg-green text-white text-[11px] font-bold px-3 py-1 rounded-full mb-4 uppercase">
            Save 25% First Order
          </span>
          <h3 className="text-lg font-bold mb-3">Subscribe & Save</h3>
          <div className="flex items-baseline gap-2 mb-3">
            {fullPrice && <span className="text-gray-400 line-through text-sm">${fullPrice.toFixed(2)}</span>}
            {subPrice && <span className="text-xl font-bold text-green">${subPrice.toFixed(2)}</span>}
          </div>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              Save 25% on first order
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              Free Athlete&apos;s Blender
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              Cancel anytime
            </li>
          </ul>
        </button>

        <button
          onClick={handleOneTime}
          className={clsx(
            "rounded-2xl p-6 text-left transition-all duration-150 cursor-pointer",
            purchaseType === "one_time"
              ? "border-2 border-green bg-green-light/30"
              : "border border-gray-200 bg-white hover:border-green"
          )}
        >
          <h3 className="text-lg font-bold mb-3 mt-8">One-Time Purchase</h3>
          {fullPrice && <span className="text-xl font-bold">${fullPrice.toFixed(2)}</span>}
          <p className="text-sm text-gray-500 mt-3">
            Full price, no commitment.
          </p>
        </button>
      </div>

      {purchaseType === "subscription" && (
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-3">Delivery Frequency</label>
          <div className="flex gap-3">
            {PRICING.subscriptionFrequencies.map((freq) => (
              <button
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium border transition-all duration-150 cursor-pointer",
                  frequency === freq.id
                    ? "bg-green text-white border-green"
                    : "bg-white text-black border-gray-200 hover:border-green"
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
