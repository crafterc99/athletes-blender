import clsx from "clsx";

export default function SorbetCard({ sorbet, selected = false, onClick }) {
  const isLight =
    sorbet.color === "#F5F5F0" ||
    sorbet.color === "#FFD54F" ||
    sorbet.color === "#FFB300";

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative rounded-2xl p-4 h-28 flex items-end transition-all duration-200 ease-out cursor-pointer border-2",
        selected
          ? "border-brand shadow-[0_4px_20px_rgba(22,163,74,0.15)] scale-[1.02]"
          : "border-transparent hover:border-brand/30 shadow-sm hover:shadow-md"
      )}
      style={{ backgroundColor: sorbet.color }}
    >
      <span
        className={clsx(
          "font-bold text-sm",
          isLight ? "text-dark" : "text-white"
        )}
      >
        {sorbet.name}
      </span>
      {selected && (
        <span className="absolute top-2.5 right-2.5 w-6 h-6 bg-brand rounded-lg flex items-center justify-center shadow-[0_2px_6px_rgba(22,163,74,0.3)]">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}
