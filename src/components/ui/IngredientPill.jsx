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
        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-[125ms] ease-in-out border cursor-pointer",
        selected
          ? "bg-black text-white border-black"
          : "bg-white text-black border-gray-200 hover:border-gray-400"
      )}
    >
      {label}
      {isPaid && selected && (
        <span className="ml-1.5 text-xs text-white/70">+$</span>
      )}
    </button>
  );
}
