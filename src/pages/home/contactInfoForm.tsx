import type React from "react";
import type { GlobalState } from "./newCustomerForm";
import { Card, FormField, Input, PhoneInput } from "../../components/ui";

interface SectionProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  errors: { [key: string]: string | undefined };
  validateField: (field: string, value: string) => void;
}

const ContactInfoForm: React.FC<SectionProps> = ({
  globalState,
  setGlobalState,
  errors,
  validateField,
}) => {
  const update = <K extends keyof GlobalState>(
    field: K,
    value: GlobalState[K]
  ) => {
    setGlobalState((prev) => ({ ...prev, [field]: value }));
    validateField(field as string, String(value));
  };
  return (
    <Card title="Contact Information" id="contact">
      <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-2">
        <FormField
          label="Contact Person name"
          required
          error={errors.contactName}
        >
          <Input
            value={globalState.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            error={errors.contactName}
          />
        </FormField>
        <FormField label="Contact Number" required error={errors.email}>
          <PhoneInput
            countryCode={globalState.countryCode}
            onCodeChange={(val) => update("countryCode", val)}
            phoneNumber={globalState.phoneNumber}
            onNumberChange={(phoneNumber) => update("phoneNumber", phoneNumber)}
            error={errors.phoneNumber}
          />
        </FormField>
        <FormField label="Email Address" required error={errors.email}>
          <Input
            value={globalState.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
          />
        </FormField>
        <FormField label="Department" required error={errors.department}>
          <Input
            value={globalState.department}
            onChange={(e) => update("department", e.target.value)}
            error={errors.department}
          />
        </FormField>
      </div>
    </Card>
  );
};

export default ContactInfoForm;
