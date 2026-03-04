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
        "relative rounded-[14px] p-4 h-28 flex items-end transition-all duration-[125ms] ease-in-out cursor-pointer border-2",
        selected
          ? "border-black shadow-[0_4px_20px_rgba(0,0,0,0.15)] scale-[1.02]"
          : "border-transparent hover:border-[rgba(0,0,0,0.30)] shadow-sm"
      )}
      style={{ backgroundColor: sorbet.color }}
    >
      <span
        className={clsx(
          "font-semibold text-sm",
          isLight ? "text-black" : "text-white"
        )}
      >
        {sorbet.name}
      </span>
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}
