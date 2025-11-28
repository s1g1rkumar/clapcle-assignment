import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", error, className = "", ...rest }, ref) => {
    const errorClass = error ? "input-field--error" : "";

    return (
      <input
        ref={ref}
        type={type}
        className={`input-field ${errorClass} ${className}`}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;