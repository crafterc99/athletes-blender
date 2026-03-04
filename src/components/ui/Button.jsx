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
        "inline-flex items-center justify-center font-display font-bold uppercase tracking-wide rounded-lg px-6 py-3 text-sm transition-all duration-150 cursor-pointer",
        variant === "primary" &&
          "bg-black text-white hover:bg-green hover:text-black",
        variant === "cta" &&
          "bg-green text-black hover:bg-black hover:text-white",
        variant === "outline" &&
          "border-2 border-black text-black hover:bg-black hover:text-white",
        disabled && "opacity-40 cursor-not-allowed hover:bg-inherit hover:text-inherit",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
