export default function AllocationBar({ total, assigned, recipes = [] }) {
  if (total === 0) return null;

  const colors = ["#16A34A", "#15803D", "#86EFAC"];

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-bold mb-2">
        <span className="text-dark">
          {assigned} / {total} assigned
        </span>
        <span className={assigned === total ? "text-brand" : "text-gray-400"}>
          {assigned === total ? "Complete!" : `${total - assigned} remaining`}
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
        {recipes.map((r, i) =>
          r.quantity > 0 ? (
            <div
              key={r.id}
              className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
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
