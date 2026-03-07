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
        "rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ease-out border-2 cursor-pointer",
        selected
          ? "bg-brand text-white border-brand shadow-[0_2px_8px_rgba(22,163,74,0.2)]"
          : "bg-white text-gray-600 border-gray-200 hover:border-brand/40 hover:text-dark"
      )}
    >
      {label}
      {isPaid && selected && (
        <span className="ml-1.5 text-xs text-white/70">+$</span>
      )}
    </button>
  );
}
