import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 ease-out cursor-pointer select-none",
        // Sizes
        size === "sm" && "rounded-lg px-4 py-2 text-sm min-h-[36px]",
        size === "md" && "rounded-xl px-6 py-3 text-sm min-h-[44px]",
        size === "lg" && "rounded-xl px-8 py-4 text-base min-h-[52px]",
        // Variants
        variant === "primary" &&
          "bg-brand text-white shadow-[0_2px_8px_rgba(22,163,74,0.3)] hover:bg-brand-dark hover:shadow-[0_4px_16px_rgba(22,163,74,0.4)] active:scale-[0.98]",
        variant === "cta" &&
          "bg-brand text-white shadow-[0_2px_8px_rgba(22,163,74,0.3)] hover:bg-brand-dark hover:shadow-[0_4px_16px_rgba(22,163,74,0.4)] active:scale-[0.98]",
        variant === "dark" &&
          "bg-dark text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:bg-dark-light active:scale-[0.98]",
        variant === "outline" &&
          "border-2 border-gray-200 text-dark bg-transparent hover:border-dark hover:bg-gray-50 active:scale-[0.98]",
        variant === "outline-light" &&
          "border-2 border-white/30 text-white bg-transparent hover:bg-white hover:text-dark active:scale-[0.98]",
        variant === "ghost" &&
          "text-gray-600 hover:text-dark hover:bg-gray-100 active:scale-[0.98]",
        // Disabled
        disabled && "opacity-40 cursor-not-allowed pointer-events-none !shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
