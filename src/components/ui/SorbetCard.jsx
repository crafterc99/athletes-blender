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
        "relative rounded-2xl overflow-hidden transition-all duration-150 cursor-pointer border-2 bg-white",
        selected
          ? "border-green shadow-sm"
          : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div
        className="h-28 w-full flex items-center justify-center"
        style={{ backgroundColor: sorbet.color }}
      >
        {selected && (
          <span className="w-7 h-7 bg-green rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </div>
      <div className="p-3 text-center">
        <span className={clsx("text-sm font-semibold")}>
          {sorbet.name}
        </span>
      </div>
    </button>
  );
}
