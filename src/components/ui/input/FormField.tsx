import type { ReactNode } from "react";
import "./Input.css";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

const FormField = ({
  label,
  error,
  children,
  required = false,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={`form-field ${className}`}>
      <label className="form-field__label">
        {label}
        {required && <span className="form-field__required-star">*</span>}
      </label>
      {children}
      {error && <p className="form-field__error">{error}</p>}
    </div>
  );
};

export default FormField;
