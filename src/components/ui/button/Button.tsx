import type { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  startIcon,
  endIcon,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`btn btn--${variant} btn--${size} ${isDisabled ? "cursor-not-allowed opacity-60" : ""} ${className}`}
    >
      {!loading && startIcon && <span className="btn__icon">{startIcon}</span>}

      {loading ? (
        <>
          <span className="btn__spinner"></span>
          {loadingText && <span className="btn__text m-l-2">{loadingText}</span>}
        </>
      ) : (
        <span className="btn__text">{children}</span>
      )}

      {!loading && endIcon && <span className="btn__icon">{endIcon}</span>}
    </button>
  );
};  

export default Button;
