import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-black text-white hover:opacity-75 dark:bg-white dark:text-black dark:hover:opacity-80",
  outline: "border border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800",
  ghost: "bg-transparent hover:bg-gray-100 text-black dark:text-white dark:hover:bg-neutral-800",
  link: "bg-transparent underline text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "px-5 py-3 text-sm",
  sm: "px-3 py-1 text-sm",
  lg: "px-6 py-4 text-base",
  icon: "h-10 w-10 p-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, disabled, type = "button", variant = "default", size = "default", ...props },
    ref
  ) => {
    return (
      <button
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
