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
      <span className="text-brand text-xs font-bold uppercase tracking-widest">
        Step 5
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-2 tracking-tight text-dark">
        How Would You Like to Purchase?
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Subscribe to save on every order.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Subscribe */}
        <button
          onClick={handleSubscribe}
          className={clsx(
            "relative rounded-2xl p-6 text-left transition-all duration-200 ease-out cursor-pointer",
            purchaseType === "subscription"
              ? "border-2 border-brand bg-brand-50 shadow-[0_4px_20px_rgba(22,163,74,0.12)]"
              : "border-2 border-gray-100 bg-white hover:border-gray-300"
          )}
        >
          <span className="inline-block bg-brand text-white text-[11px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Save 25% First Order
          </span>
          <h3 className="text-lg font-extrabold mb-3 text-dark tracking-tight">
            Subscribe & Save
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-500">
            {[
              "Save 25% on first order",
              "Save 15% every renewal",
              "Free Athlete's Blender",
              "Edit box anytime",
              "Skip or pause anytime",
              "Cancel anytime",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-brand-50 text-brand flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          {purchaseType === "subscription" && (
            <span className="absolute top-4 right-4 w-7 h-7 bg-brand rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(22,163,74,0.3)]">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </button>

        {/* One-Time */}
        <button
          onClick={handleOneTime}
          className={clsx(
            "relative rounded-2xl p-6 text-left transition-all duration-200 ease-out cursor-pointer",
            purchaseType === "one_time"
              ? "border-2 border-dark shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              : "border-2 border-gray-100 bg-white hover:border-gray-300"
          )}
        >
          <h3 className="text-lg font-extrabold mb-3 mt-8 text-dark tracking-tight">
            One-Time Purchase
          </h3>
          <p className="text-sm text-gray-500">
            Full price, no commitment. Order whenever you want.
          </p>
          {purchaseType === "one_time" && (
            <span className="absolute top-4 right-4 w-7 h-7 bg-dark rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </button>
      </div>

      {/* Frequency selector */}
      {purchaseType === "subscription" && (
        <div className="mt-8">
          <label className="block text-sm font-bold text-dark mb-3">
            Delivery Frequency
          </label>
          <div className="flex flex-wrap gap-3">
            {PRICING.subscriptionFrequencies.map((freq) => (
              <button
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={clsx(
                  "rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all duration-200 ease-out cursor-pointer",
                  frequency === freq.id
                    ? "bg-brand text-white border-brand shadow-[0_2px_8px_rgba(22,163,74,0.2)]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-brand/40"
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
