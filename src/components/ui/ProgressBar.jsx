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
    <div className="flex items-center gap-1 w-full px-4 py-4">
      {STEPS.map((step, i) => {
        const isComplete = currentStep > step.num;
        const isCurrent = currentStep === step.num;
        return (
          <div key={step.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-[125ms]",
                  isComplete && "bg-black text-white",
                  isCurrent && "bg-black text-white ring-2 ring-black/20 ring-offset-2",
                  !isComplete && !isCurrent && "border border-gray-200 text-gray-400"
                )}
              >
                {isComplete ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span className="text-[11px] font-medium text-gray-500 hidden sm:block">
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={clsx(
                  "h-px flex-1 mx-1",
                  currentStep > step.num ? "bg-black" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
