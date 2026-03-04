import clsx from "clsx";

export default function IngredientPill({
  label,
  selected = false,
  isPaid = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 border cursor-pointer",
        selected
          ? "bg-green text-black border-green"
          : "bg-white text-black border-card-border hover:border-green"
      )}
    >
      {label}
      {isPaid && selected && (
        <span className="ml-1.5 text-xs opacity-70">+$</span>
      )}
    </button>
  );
}
