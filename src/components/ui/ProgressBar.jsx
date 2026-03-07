import clsx from "clsx";

const STEPS = [
  { num: 1, label: "Box Size" },
  { num: 2, label: "Build Recipe" },
  { num: 3, label: "Quantities" },
  { num: 4, label: "Recipe 2" },
  { num: 5, label: "Recipe 3" },
  { num: 6, label: "Review" },
  { num: 7, label: "Purchase" },
];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="flex items-center gap-1 w-full py-4">
      {STEPS.map((step, i) => {
        const isComplete = currentStep > step.num;
        const isCurrent = currentStep === step.num;
        return (
          <div key={step.num} className="flex items-center flex-1">
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
                  step.num
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
            {i < STEPS.length - 1 && (
              <div
                className={clsx(
                  "h-0.5 flex-1 mx-1 rounded-full transition-colors duration-300",
                  currentStep > step.num ? "bg-brand" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
