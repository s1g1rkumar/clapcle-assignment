import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from "react";
import "./Radio.css";

interface RadioBooleanProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue"> {
  value?: boolean;
  defaultValue?: boolean;
  error?: string;
  onChange?: (value: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioBoolean = forwardRef<HTMLInputElement, RadioBooleanProps>(
  ({ value, defaultValue = true, onChange, error, className = "", ...rest }, ref) => {
    
    const selected = value ?? defaultValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isTrue = e.target.value === "true";
      onChange?.(isTrue, e);
    };

    return (
      <div className={`radio-wrapper ${className}`}>
        
        {/* Yes */}
        <label className={`radio-row ${error ? "radio-error" : ""}`}>
          <input
            ref={ref}
            type="radio"
            value="true"
            checked={selected === true}
            onChange={handleChange}
            {...rest}
          />
          <span className="radio-ui"></span>
          <span className="radio-label">Yes</span>
        </label>

        {/* No */}
        <label className={`radio-row ${error ? "radio-error" : ""}`}>
          <input
            type="radio"
            value="false"
            checked={selected === false}
            onChange={handleChange}
            {...rest}
          />
          <span className="radio-ui"></span>
          <span className="radio-label">No</span>
        </label>
      </div>
    );
  }
);

RadioBoolean.displayName = "RadioBoolean";
export default RadioBoolean;
