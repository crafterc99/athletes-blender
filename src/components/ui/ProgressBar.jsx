import clsx from "clsx";

export default function ProgressBar({ currentStep }) {
  const steps = [
    { num: 1, label: "Size" },
    { num: 2, label: "Recipe" },
    { num: 3, label: "Qty" },
    { num: 6, label: "Review" },
    { num: 7, label: "Checkout" },
  ];

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md mx-auto py-4">
      {steps.map((step, i) => {
        const isComplete = currentStep > step.num;
        const isCurrent = currentStep === step.num;
        return (
          <div key={step.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-150",
                  isComplete && "bg-green text-white",
                  isCurrent && "border-2 border-green text-green bg-white",
                  !isComplete && !isCurrent && "border border-gray-300 text-gray-400"
                )}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.num > 5 ? step.num - (step.num === 6 ? 2 : 3) : step.num
                )}
              </div>
              <span className="text-[10px] font-medium text-gray-400 hidden sm:block">
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={clsx(
                  "h-0.5 flex-1 mx-1 rounded",
                  currentStep > step.num ? "bg-green" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
