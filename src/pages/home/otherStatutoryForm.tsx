import type React from "react";
import type { GlobalState } from "./newCustomerForm";
import {
  Card,
  FormField,
  Input,
  RadioBoolean,
  Select,
} from "../../components/ui";

interface SectionProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  errors: { [key: string]: string | undefined };
  validateField: (field: string, value: string) => void;
}

const OtherStatutoryForm: React.FC<SectionProps> = ({
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
    <Card title="Other Statutory Details" id="statutory">
      <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-2">
        <FormField label="TDS Applicable" required error={errors.tdsApplicable}>
          <RadioBoolean
            value={globalState.tdsApplicable}
            onChange={(val) => update("tdsApplicable", val)}
            error={errors.tdsApplicable}
          />
        </FormField>

        <FormField
          label="Ignore TDS exemption limit for TDS deduction"
          required
          error={errors.ignoreTdsExemption}
        >
          <RadioBoolean
            value={globalState.ignoreTdsExemption}
            onChange={(val) => update("ignoreTdsExemption", val)}
            error={errors.ignoreTdsExemption}
          />
        </FormField>

        <FormField
          label="TDS Application"
          required
          error={errors.tdsApplication}
        >
          <RadioBoolean
            value={globalState.tdsApplication}
            onChange={(val) => update("tdsApplication", val)}
            error={errors.tdsApplication}
          />
        </FormField>

        <FormField
          label="TDS Deductee type"
          required
          error={errors.tdsDeducteeType}
        >
          <Select
            options={[{ label: "Company", value: "Company" }]}
            value={globalState.tdsDeducteeType}
            onChange={(val) => update("tdsDeducteeType", String(val))}
            error={errors.tdsDeducteeType}
          />
        </FormField>

        <FormField
          label="Deductee type (Auto from PAN)"
          required
          error={errors.deducteeTypeAuto}
        >
          <Select
            options={[{ label: "Company", value: "Company" }]}
            value={globalState.deducteeTypeAuto}
            onChange={(val) => update("deducteeTypeAuto", String(val))}
            error={errors.deducteeTypeAuto}
          />
        </FormField>

        <FormField label="TAN Number" required error={errors.tanNumber}>
          <Input
            value={globalState.tanNumber}
            onChange={(e) => update("tanNumber", e.target.value)}
            error={errors.tanNumber}
          />
        </FormField>

        <FormField label="IEC Number" required error={errors.iecNumber}>
          <Input
            value={globalState.iecNumber}
            onChange={(e) => update("iecNumber", e.target.value)}
            error={errors.iecNumber}
          />
        </FormField>
      </div>
    </Card>
  );
};

export default OtherStatutoryForm;
