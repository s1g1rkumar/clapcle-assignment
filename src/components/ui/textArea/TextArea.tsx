import { forwardRef, useState } from "react";
import "./TextArea.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ maxLength = 200, value: externalValue, onChange, ...rest }, ref) => {
    const [internalValue, setInternalValue] = useState("");

    const finalValue = externalValue ?? internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);
      if (onChange) onChange(e); 
    };

    return (
      <div className="textarea-wrapper">
        <textarea
          ref={ref}
          className="textarea-field"
          maxLength={maxLength}
          value={finalValue}
          onChange={handleChange}
          {...rest}
        />
        <span className="textarea-counter">
          {String(finalValue?.toString().length || 0).padStart(2, "0")}/{maxLength}
        </span>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
