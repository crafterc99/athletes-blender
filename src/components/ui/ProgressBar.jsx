import clsx from "clsx";

const DISPLAY_STEPS = [
  { label: "Box Size" },
  { label: "Recipes" },
  { label: "Review" },
  { label: "Purchase" },
  { label: "Checkout" },
];

// Map internal steps (1-7) to display steps (1-5)
function toDisplayStep(internal) {
  if (internal <= 1) return 1;
  if (internal <= 3) return 2; // steps 2-3 = Recipes
  if (internal === 6) return 3; // Review
  if (internal === 7) return 4; // Purchase
  return 5; // Checkout
}

export default function ProgressBar({ currentStep }) {
  const displayStep = toDisplayStep(currentStep);

  return (
    <div className="flex items-center gap-1 w-full py-4">
      {DISPLAY_STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isComplete = displayStep > stepNum;
        const isCurrent = displayStep === stepNum;
        return (
          <div key={stepNum} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={clsx(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200",
                  isComplete && "bg-brand text-white shadow-[0_2px_8px_rgba(22,163,74,0.25)]",
                  isCurrent && "bg-brand text-white ring-2 ring-brand/20 ring-offset-2 shadow-[0_2px_8px_rgba(22,163,74,0.25)]",
                  !isComplete && !isCurrent && "bg-gray-100 text-gray-400"
                )}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={clsx(
                  "text-[11px] font-semibold hidden sm:block transition-colors duration-200",
                  isCurrent ? "text-brand" : isComplete ? "text-gray-600" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < DISPLAY_STEPS.length - 1 && (
              <div
                className={clsx(
                  "h-0.5 flex-1 mx-1 rounded-full transition-colors duration-300",
                  displayStep > stepNum ? "bg-brand" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
