export default function AllocationBar({ total, assigned, recipes = [] }) {
  if (total === 0) return null;

  const colors = ["#000000", "#6B7280", "#C8C8C8"];

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-medium mb-1.5">
        <span>
          {assigned} / {total} assigned
        </span>
        <span className="text-gray-400">{total - assigned} remaining</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
        {recipes.map((r, i) =>
          r.quantity > 0 ? (
            <div
              key={r.id}
              className="h-full transition-all duration-300"
              style={{
                width: `${(r.quantity / total) * 100}%`,
                backgroundColor: colors[i % colors.length],
              }}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
