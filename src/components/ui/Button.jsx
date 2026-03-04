import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  className,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center font-semibold rounded-[14px] px-6 py-3 min-h-[44px] text-sm transition-all duration-[125ms] ease-in-out cursor-pointer",
        variant === "primary" &&
          "bg-black text-white shadow-[0_2px_3px_rgba(0,0,0,0.20)] hover:bg-dark",
        variant === "cta" &&
          "bg-black text-white shadow-[0_2px_3px_rgba(0,0,0,0.20)] hover:bg-dark",
        variant === "outline" &&
          "border border-black text-black bg-transparent hover:bg-gray-50",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
