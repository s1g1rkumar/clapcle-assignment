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
    "adorned_base";

  const focusClasses =
    "input-field:focus";

  const errorGroupClasses = error
    ? "input-field--error"
    : "";

  const suffixClasses =
    "suffix";

  return (
    <div className={`${baseGroupClasses} ${focusClasses} ${errorGroupClasses} ${inputGroupClassName}`}>
      <Input error={""} className={`${className} adorned_input`} {...rest} />
      <span className={suffixClasses}>{suffix}</span>
    </div>
  );
};

export default AdornedInputGroup;
