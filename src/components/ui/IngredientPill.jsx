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
          ? "bg-green text-white border-green"
          : "bg-white text-black border-gray-200 hover:border-green"
      )}
    >
      {label}
      {isPaid && selected && (
        <span className="ml-1.5 text-xs text-white/70">+$</span>
      )}
    </button>
  );
}
