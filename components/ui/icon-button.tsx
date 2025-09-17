import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactElement } from "react";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: ReactElement;
  className?: string;
  type?: "button" | "submit" | "reset"; // default: button
  ariaLabel?: string; // ✅ accessibility label
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  type = "button",
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "rounded-full flex items-center justify-center border shadow-md p-2",
        "bg-white hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        "hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
