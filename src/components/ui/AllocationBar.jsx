export default function AllocationBar({ total, assigned, recipes = [] }) {
  if (total === 0) return null;

  const colors = ["#00D68F", "#FF6B35", "#64B5F6"];

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-mono mb-1">
        <span>
          {assigned} / {total} assigned
        </span>
        <span className="text-text-muted">{total - assigned} remaining</span>
      </div>
      <div className="w-full h-3 bg-surface-2 rounded-full overflow-hidden flex">
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
