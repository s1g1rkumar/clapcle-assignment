import Input from "./Input";
import type { ReactNode, InputHTMLAttributes } from "react";

interface AdornedInputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  suffix: ReactNode;
  error?: string;
  className?: string;
  inputGroupClassName?: string;
}

const AdornedInputGroup: React.FC<AdornedInputGroupProps> = ({
  suffix,
  error,
  className = "",
  inputGroupClassName = "",
  ...rest
}) => {
  const baseGroupClasses =
    "flex items-end adorned_base";

  const focusClasses =
    "focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20";

  const errorGroupClasses = error
    ? "input-field--error"
    : "";

  const suffixClasses =
    "flex item-center justify-center suffix";

  return (
    <div className={`${baseGroupClasses} ${focusClasses} ${errorGroupClasses} ${inputGroupClassName}`}>
      <Input error={""} className={`${className} adorned_input`} {...rest} />
      <span className={suffixClasses}>{suffix}</span>
    </div>
  );
};

export default AdornedInputGroup;
