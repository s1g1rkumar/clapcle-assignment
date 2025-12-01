import React from "react";
import { Select } from "../select";
import { Input } from "../input";
import "./PhoneInput.css";
import { countryCodeList } from "../../../helpers/constant";

interface PhoneInputProps {
  countryCode: string;
  onCodeChange: (value: string) => void;
  phoneNumber: string;
  onNumberChange: (value: string) => void;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  onCodeChange,
  phoneNumber,
  onNumberChange,
  error,
}) => {
  const inputContainerClasses = `
    phone-input-wrapper
    ${error ? "phone-border-danger" : ""} 
  `;

  return (
    <div className="phone-input-component">
      <div className={inputContainerClasses}>
        <Select
          options={countryCodeList}
          value={countryCode}
          onChange={(value) => onCodeChange(String(value))}
          className="phone-code-select"
        />
        <Input
          id="phone-number"
          type="tel"
          placeholder="12345 67890"
          value={phoneNumber}
          onChange={(e) => onNumberChange(e.target.value)}
          className="phone-number-input"
          maxLength={15}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
