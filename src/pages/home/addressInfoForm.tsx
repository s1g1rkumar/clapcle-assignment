import type React from "react";
import type { Address, GlobalState } from "./newCustomerForm";
import { Button, Card, FormField, Input, Select } from "../../components/ui";
import "./home.css";
import { DeleteIcon, EditIcon } from "../../components/icons";

// ⚠️ STEP 1: Update SectionProps to include validateField
interface SectionProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  errors: { [key: string]: string | undefined };
  validateField: (field: string, value: string) => string | undefined; // Added
}


interface BaseAddressProps {
  address: Address;
  index: number;
  onToggleEdit: (index: number) => void;
  onDelete: (index: number) => void;
  errors: { [key: string]: string | undefined };
}

interface EditableAddressFormProps extends BaseAddressProps {
  onUpdate: (
    index: number,
    field: keyof Omit<Address, "isEditable">,
    value: string
  ) => void;
  validateField: (field: string, value: string) => string | undefined; // Added
}

type DisplayAddressCardProps = BaseAddressProps;

const DisplayAddressCard: React.FC<DisplayAddressCardProps> = ({
  address,
  index,
  onToggleEdit,
  onDelete,
}) => (
  // ℹ️ Note: Display cards typically don't show errors, so we ignore the errors prop here.
  <div
    key={index}
    className="p-4 bg-white flex justify-between items-start address-display-card"
  >
    <div>
      <h3 className="font-bold">{address.type} Address</h3>
      <p className="mt-1 address-display-text">
        {address.street} | {address.city} | {address.country} {address.zip}
      </p>
    </div>
    <div className="flex items-center gap-4">
      <div onClick={() => onToggleEdit(index)} className="cursor-pointer">
        <EditIcon size="16" />
      </div>
      {index > 0 && (
        <div onClick={() => onDelete(index)} className="cursor-pointer">
          <DeleteIcon size="16" color="var(--color-danger)" />
        </div>
      )}
    </div>
  </div>
);

const EditableAddressForm: React.FC<EditableAddressFormProps> = ({
  address,
  index,
  onUpdate,
  onToggleEdit,
  onDelete,
  errors,
  validateField, // Destructured
}) => {
  const handleChange = (
    field: keyof Omit<Address, "isEditable">,
    value: string
  ) => {
    // 1. Update the parent state
    onUpdate(index, field, value);

    // 2. Construct the indexed key (e.g., addresses[0].street) and validate
    const indexedKey = `addresses[${index}].${field}`;
    validateField(indexedKey, value); 
  };
  
  // Helper to get the correct error key
  const getErrorKey = (field: keyof Omit<Address, "isEditable">) => 
    `addresses[${index}].${field}`;

  return (
    <div className="border border-purple-300 p-4 rounded-lg mb-6 bg-purple-50">
      <h4 className="font-semibold text-purple-700 mb-3 flex justify-between items-center">
        {address.type || `Address ${index + 1}`} - Edit Mode
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            variant="text"
            // NOTE: Clicking Save here should ideally run validateForm or validate all address fields before toggling edit mode off.
            onClick={() => onToggleEdit(index)} 
          >
            Save
          </Button>
          {index > 0 && (
            <div
              onClick={() => onDelete(index)}
              className="inline-block cursor-pointer mr-2"
            >
              <DeleteIcon size="16" color="var(--color-danger)"/>
            </div>
          )}
        </div>
      </h4>

      <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
        <FormField
          label="Address Type"
          required
          // Note: address type is usually not validated against external rules, only 'required'
          error={errors[getErrorKey("type")]} 
        >
          <Select
            options={[
              { label: "Shipping", value: "Shipping" },
              { label: "Billing", value: "Billing" },
            ]}
            value={address.type}
            onChange={(val) => handleChange("type", String(val))}
          />
        </FormField>
        <FormField
          label="Street Address"
          required
          error={errors[getErrorKey("street")]}
        >
          <Input
            value={address.street}
            onChange={(e) => handleChange("street", e.target.value)}
            error={errors[getErrorKey("street")]}
          />
        </FormField>
        <FormField
          label="City"
          required
          error={errors[getErrorKey("city")]}
        >
          <Input
            value={address.city}
            onChange={(e) => handleChange("city", e.target.value)}
            error={errors[getErrorKey("city")]}
          />
        </FormField>
        <FormField
          label="Country"
          required
          error={errors[getErrorKey("country")]}
        >
          <Input
            value={address.country}
            onChange={(e) => handleChange("country", e.target.value)}
            error={errors[getErrorKey("country")]}
          />
        </FormField>
        <FormField
          label="ZIP/Postal Code"
          required
          error={errors[getErrorKey("zip")]}
        >
          <Input
            value={address.zip}
            onChange={(e) => handleChange("zip", e.target.value)}
            error={errors[getErrorKey("zip")]}
          />
        </FormField>
      </div>
    </div>
  );
};

const AddressDetailsSection: React.FC<SectionProps> = ({
  globalState,
  setGlobalState,
  errors,
  validateField, // Destructured
}) => {
  const handleAddressUpdate = (
    index: number,
    field: keyof Omit<Address, "isEditable">,
    value: string
  ) => {
    setGlobalState((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) =>
        i === index ? { ...addr, [field]: value } : addr
      ),
    }));
  };

  const handleToggleEdit = (index: number) => {
    setGlobalState((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) =>
        i === index ? { ...addr, isEditable: !addr.isEditable } : addr
      ),
    }));
  };

  const handleAddNewAddress = () => {
    setGlobalState((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          type: "Shipping",
          street: "",
          city: "",
          country: "",
          zip: "",
          isEditable: true,
        },
      ],
    }));
  };

  const handleDeleteAddress = (index: number) => {
    if (globalState.addresses.length > 1) {
      setGlobalState((prev) => ({
        ...prev,
        addresses: prev.addresses.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <Card title="Primary Address Information" id="address">
      <div className="flex flex-col gap-4">
        {globalState.addresses.map((addr, index) =>
          addr?.isEditable ? (
            <EditableAddressForm
              key={index}
              index={index}
              address={addr}
              onUpdate={handleAddressUpdate}
              onToggleEdit={handleToggleEdit}
              onDelete={handleDeleteAddress}
              errors={errors}
              validateField={validateField} // ⚠️ STEP 2: Passed down
            />
          ) : (
            <DisplayAddressCard
              key={index}
              index={index}
              address={addr}
              onToggleEdit={handleToggleEdit}
              onDelete={handleDeleteAddress}
              errors={errors}
            />
          )
        )}
      </div>
      <div className="add-new">
        <Button type="button" variant="text" onClick={handleAddNewAddress}>
          + Add New Address
        </Button>
      </div>
    </Card>
  );
};

export default AddressDetailsSection;