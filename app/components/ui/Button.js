export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
}) {
  const baseStyles = "rounded-lg font-medium transition duration-300";
  const sizeStyles = size === "sm" ? "px-3 py-1 text-sm" : "px-4 py-2";

  const variantStyles = {
    primary: "bg-purple-600 text-white text-white hover:bg-blue-500",
    success: "bg-green-600 text-white hover:bg-green-500",
    destructive: "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}
