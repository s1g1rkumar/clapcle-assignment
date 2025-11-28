import { forwardRef } from "react";
import type { SelectHTMLAttributes, ChangeEvent } from "react";
import "./Select.css";
import { DropDownIcon } from "../../icons";

type OptionValue = string | number;

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  error?: string;
  className?: string;
  value?: OptionValue;
  options: { label: string; value: OptionValue }[];
  onChange?: (
    value: OptionValue,
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { error, className = "", value, options, onChange, disabled, ...rest },
    ref
  ) => {
    const errorClass = error ? "select-field--error" : "";

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;

      const matchedOption = options.find(
        (opt) => String(opt.value) === selectedValue
      );

      const finalValue =
        matchedOption && typeof matchedOption.value === "number"
          ? Number(selectedValue)
          : selectedValue;

      onChange?.(finalValue, e);
    };

    return (
      <div className="select-wrapper">
        <select
          ref={ref}
          className={`select-field ${errorClass} ${className}`}
          value={value ?? ""}
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {!disabled && <DropDownIcon className="select-wrapper__icon" size="16px"/>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;