import clsx from "clsx";

export default function AllocationBar({ total, assigned, recipes = [] }) {
  if (total === 0) return null;

  const milestones = total === 10
    ? [0, 5, 10]
    : total === 20
    ? [0, 10, 20]
    : [0, 10, 20, 30];

  return (
    <div className="w-full">
      {/* Milestone dots */}
      <div className="relative flex items-center justify-between mb-1">
        {/* Track line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, (assigned / total) * 100)}%` }}
        />

        {milestones.map((m) => (
          <div
            key={m}
            className={clsx(
              "relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all duration-150",
              assigned >= m
                ? "bg-green border-green text-white"
                : "bg-white border-gray-300 text-gray-400"
            )}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}
