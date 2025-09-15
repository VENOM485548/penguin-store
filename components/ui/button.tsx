import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-black text-white hover:opacity-75",
  outline: "border border-gray-300 bg-white text-black hover:bg-gray-100",
  ghost: "bg-transparent hover:bg-gray-100 text-black",
  link: "bg-transparent underline text-black hover:text-gray-700",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "px-5 py-3 text-sm",
  sm: "px-3 py-1 text-sm",
  lg: "px-6 py-4 text-base",
  icon: "h-10 w-10 p-0",
};


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      disabled,
      type = "button",
      variant = "default",
      size = "default",
      ...props
    },
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
