import type React from "react";
import type { GlobalState } from "./newCustomerForm";
import {
  AdornedInputGroup,
  Card,
  FormField,
  Input,
  Select,
} from "../../components/ui";
import { PercentIcon, RupeeIcon } from "../../components/icons";

interface SectionProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  errors: { [key: string]: string | undefined };
  validateField: (field: string, value: string) => void;
}

const CreditCommissionsForm: React.FC<SectionProps> = ({
  globalState,
  setGlobalState,
  errors,
  validateField,
}) => {
  const update = <K extends keyof GlobalState>(field: K, value: GlobalState[K]) => {
    setGlobalState((prev) => ({ ...prev, [field]: value } as GlobalState));
    validateField(field as string, String(value));
  };

  return (
    <Card title="Credit, Commissions & Price List" id="credit">
      <div className="form-fields-grid">
        <FormField label="Credit Limit" error={errors.creditLimit}>
          <AdornedInputGroup
            suffix={<RupeeIcon />}
            value={globalState.creditLimit}
            onChange={(e) => update("creditLimit", e.target.value)}
            placeholder="Enter Limit"
            inputGroupClassName=""
            error={errors.creditLimit}
          />
        </FormField>

        <FormField label="Credit Days" error={errors.ageOfInvoice}>
          <Input
            value={globalState.ageOfInvoice}
            onChange={(e) => update("ageOfInvoice", e.target.value)}
            type="number"
            placeholder="e.g., 30"
            error={errors.ageOfInvoice}
          />
        </FormField>

        <FormField
          label="Agent/Broker Name"
          required
          error={errors.agentBrokerName}
        >
          <Select
            options={[
              { label: "Anil Sharma", value: "Anil Sharma" },
              { label: "Rakesh Singh", value: "Rakesh Singh" },
            ]}
            value={globalState.agentBrokerName}
            onChange={(val) => update("agentBrokerName", String(val))}
            error={errors.agentBrokerName}
          />
        </FormField>

        <FormField
          label="Commission Type"
          required
          error={errors.commissionType}
        >
          <Select
            options={[
              { label: "Percentage", value: "Percentage" },
              { label: "Fixed", value: "Fixed" },
            ]}
            value={globalState.commissionType}
            onChange={(val) => update("commissionType", String(val))}
            error={errors.commissionType}
          />
        </FormField>

        <FormField
          label="Commission Percent/ Commission per Quantity"
          required
          error={errors.commissionPct}
        >
          <AdornedInputGroup
            suffix={<PercentIcon />}
            value={globalState.commissionPct}
            onChange={(e) => update("commissionPct", e.target.value)}
            placeholder="Enter Percent"
            error={errors.commissionPct}
          />
        </FormField>

        <FormField
          label="Default Currency"
          required
          error={errors.defaultCurrency}
        >
          <Select
            options={[
              { label: "INR", value: "INR" },
              { label: "USD", value: "USD" },
            ]}
            value={globalState.defaultCurrency}
            onChange={(val) => update("defaultCurrency", String(val))}
            error={errors.defaultCurrency}
          />
        </FormField>

        <FormField label="Price List" required error={errors.priceList}>
          <Select
            options={[
              {
                label: "Standard Price List",
                value: "Standard Price List",
              },
              { label: "Retail List", value: "Retail List" },
            ]}
            value={globalState.priceList}
            onChange={(val) => update("priceList", String(val))}
            error={errors.priceList}
          />
        </FormField>
      </div>
    </Card>
  );
};

export default CreditCommissionsForm;