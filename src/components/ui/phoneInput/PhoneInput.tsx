import React from "react";
import { Select } from "../select";
import { Input } from "../input";
import './PhoneInput.css'

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
  const countryOptions = [
    { label: "+91", value: "+91" },
    { label: "+86", value: "+86" },
    { label: "+65", value: "+65" },
    { label: "+81", value: "+81" },
    { label: "+82", value: "+82" },
    { label: "+62", value: "+62" },
    { label: "+63", value: "+63" },
    { label: "+971", value: "+971" },
    { label: "+92", value: "+92" },
  ];

  const inputContainerClasses = `
    flex
    items-end
    phone-input-wrapper
    ${error ? 'phone-border-danger' : ''} 
  `;

  return (
    <div className="flex-col">
      <div className={inputContainerClasses}>
        <Select
          options={countryOptions}
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