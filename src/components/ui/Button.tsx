import React from "react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantStyles = {
  primary: "bg-brand-primary text-white hover:bg-gray-800 focus:ring-brand-primary shadow-button active:scale-95",
  secondary: "bg-brand-light text-brand-secondary border border-brand-border-light hover:bg-gray-200 hover:text-brand-primary focus:ring-brand-secondary",
  ghost: "text-brand-secondary hover:text-brand-primary hover:bg-brand-light focus:ring-brand-secondary",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-button", 
  lg: "px-10 py-4 text-lg rounded-button",
};

export default function Button({
  variant = "primary",
  size = "md", 
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner 
          size="sm" 
          color={variant === "primary" ? "white" : "primary"}
          className="mr-2" 
        />
      )}
      {children}  
    </button>
  );
}