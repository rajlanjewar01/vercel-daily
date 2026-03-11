import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: "primary" | "secondary" | "white";
}

const sizeClasses = {
  sm: "h-4 w-4 border-[2px]",
  md: "h-5 w-5 border-[3px]", 
  lg: "h-6 w-6 border-[4px]",
};

const colorClasses = {
  primary: "border-brand-primary border-t-transparent",
  secondary: "border-brand-secondary border-t-transparent",
  white: "border-white border-t-transparent",
};

export default function LoadingSpinner({ 
  size = "md", 
  className,
  color = "secondary" 
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}