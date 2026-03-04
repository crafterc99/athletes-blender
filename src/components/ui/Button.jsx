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
        "inline-flex items-center justify-center font-semibold rounded-full px-6 py-3 min-h-[44px] text-sm transition-all duration-150 cursor-pointer",
        variant === "primary" &&
          "bg-black text-white hover:bg-dark",
        variant === "green" &&
          "bg-green text-white hover:bg-green-dark",
        variant === "cta" &&
          "bg-green text-white hover:bg-green-dark",
        variant === "outline" &&
          "border border-gray-300 text-black bg-white hover:border-black",
        variant === "outline-green" &&
          "border-2 border-green text-green bg-white hover:bg-green-light",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
