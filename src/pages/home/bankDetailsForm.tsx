import { DeleteIcon } from "../../components/icons";
import { Button, Card, FormField, Input } from "../../components/ui";
import type { GlobalState } from "./newCustomerForm";

interface BankAccount {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  micrNumber: string;
  errors: { [key: string]: string | undefined };
}

interface BankDetailsFormProps {
  account: BankAccount;
  index: number;
  onUpdate: (
    index: number,
    field: keyof Omit<BankAccount, "errors">,
    value: string
  ) => void;
  onDelete: (index: number) => void;
  errors: { [key: string]: string | undefined };
  validateField: (field: string, value: string) => string | undefined;
}

const BankDetailsForm: React.FC<BankDetailsFormProps> = ({
  account,
  index,
  onUpdate,
  onDelete,
  errors,
  validateField,
}) => {
  const getErrorKey = (field: keyof Omit<BankAccount, "errors">) =>
    `bankAccounts[${index}].${field}`;

  const handleChange = (
    field: keyof Omit<BankAccount, "errors">,
    value: string
  ) => {
    onUpdate(index, field, value);

    const indexedKey = getErrorKey(field);
    validateField(indexedKey, value); 
  };

  return (
    <div className=" p-4 mb-6">
      <h3 className="bank-account-title">
        Bank #{index + 1}
        {index > 0 && (
          <div onClick={() => onDelete(index)} className="cursor-pointer">
            <DeleteIcon size="16" color="var(--color-danger)" />
          </div>
        )}
      </h3>

      <div className="form-fields-grid">
        <FormField
          label="Bank Name"
          required
          error={errors[`bankAccounts[${index}].bankName`]}
        >
          <Input
            value={account.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
            placeholder="Enter Bank Name"
            error={errors[`bankAccounts[${index}].bankName`]}
          />
        </FormField>
        <FormField
          label="Account Number"
          required
          error={errors[`bankAccounts[${index}].accountNumber`]}
        >
          <Input
            value={account.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
            placeholder="Enter Account Number"
            error={errors[`bankAccounts[${index}].accountNumber`]}
          />
        </FormField>
        <FormField
          label="IFSC Code"
          required
          error={errors[`bankAccounts[${index}].ifscCode`]}
        >
          <Input
            value={account.ifscCode}
            onChange={(e) => handleChange("ifscCode", e.target.value)}
            placeholder="Enter IFSC Code"
            error={errors[`bankAccounts[${index}].ifscCode`]}
          />
        </FormField>
        <FormField
          label="MICR Number"
          required
          error={errors[`bankAccounts[${index}].micrNumber`]}
        >
          <Input
            value={account.micrNumber}
            onChange={(e) => handleChange("micrNumber", e.target.value)}
            placeholder="Enter MICR Number"
            error={errors[`bankAccounts[${index}].micrNumber`]}
          />
        </FormField>
      </div>
    </div>
  );
};

interface SectionProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  errors: { [key: string]: string | undefined };
  validateField: (field: string, value: string) => string | undefined;
}

const BankDetailsSection: React.FC<SectionProps> = ({
  globalState,
  setGlobalState,
  errors,
  validateField,
}) => {
  const handleBankUpdate = (
    index: number,
    field: keyof Omit<BankAccount, "errors">,
    value: string
  ) => {
    setGlobalState((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.map((account: BankAccount, i: number) =>
        i === index
          ? {
              ...account,
              [field]: value,
              errors: { ...account.errors, [field]: undefined },
            }
          : account
      ),
    }));
  };

  const handleAddNewBank = () => {
    setGlobalState((prev) => ({
      ...prev,
      bankAccounts: [
        ...prev.bankAccounts,
        {
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          micrNumber: "",
        },
      ],
    }));
  };

  const handleDeleteBank = (index: number) => {
    if (globalState.bankAccounts.length > 1) {
      setGlobalState((prev) => ({
        ...prev,
        bankAccounts: prev.bankAccounts.filter(
          (_: BankAccount, i: number) => i !== index
        ),
      }));
    }
  };

  return (
    <div id="bank">
      <Card title="Bank Details" id="bank">
        {globalState.bankAccounts.map((account: BankAccount, index: number) => (
          <BankDetailsForm
            key={index}
            index={index}
            account={account}
            onUpdate={handleBankUpdate}
            onDelete={handleDeleteBank}
            errors={errors}
            validateField={validateField}
          />
        ))}

        <div className="add-new">
          <Button type="button" variant="text" onClick={handleAddNewBank}>
            + Add New Bank
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BankDetailsSection;
