import type React from "react";
import type { GlobalState } from "./newCustomerForm";
import { Button, Card, FormField, Input, Select } from "../../components/ui";
import "./home.css";
import { DeleteIcon, EditIcon } from "../../components/icons";

interface SectionProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  errors: { [key: string]: string | undefined };
  validateField: (field: string, value: string) => string | undefined;
}

interface Address {
  type: string;
  street: string;
  city: string;
  country: string;
  zip: string;
  isEditable?: boolean;
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
  <div
    key={index}
    className="address-display-card"
  >
    <div>
      <h3 className="font-bold">{address.type} Address</h3>
      <p className="address-display-text">
        {address.street} | {address.city} | {address.country} {address.zip}
      </p>
    </div>
    <div className="address-actions">
      <div onClick={() => onToggleEdit(index)} >
        <EditIcon size="16" />
      </div>
      {index > 0 && (
        <div onClick={() => onDelete(index)} >
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
  validateField,
}) => {
  const handleChange = (
    field: keyof Omit<Address, "isEditable">,
    value: string
  ) => {
    onUpdate(index, field, value);

    const indexedKey = `addresses[${index}].${field}`;
    validateField(indexedKey, value);
  };

  const getErrorKey = (field: keyof Omit<Address, "isEditable">) =>
    `addresses[${index}].${field}`;

  return (
    <div className="address-editable-form">
      <h4 className="font-semibold address-editable-title">
        {address.type || `Address ${index + 1}`} - Edit Mode
        <div className="address-actions">
          <Button
            type="button"
            variant="text"
            onClick={() => onToggleEdit(index)}
          >
            Save
          </Button>
          {index > 0 && (
            <div
              onClick={() => onDelete(index)}
              
            >
              <DeleteIcon size="16" color="var(--color-danger)" />
            </div>
          )}
        </div>
      </h4>

      <div className="form-fields-grid">
        <FormField
          label="Address Type"
          required
          error={errors[getErrorKey("type")]}
        >
          <Select
            options={[
              { label: "Shipping", value: "Shipping" },
              { label: "Billing", value: "Billing" },
            ]}
            value={address.type}
            onChange={(val) => handleChange("type", String(val))}
            error={errors[getErrorKey("type")]}
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
        <FormField label="City" required error={errors[getErrorKey("city")]}>
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
      addresses: prev.addresses.map((addr: Address, i: number) =>
        i === index ? { ...addr, [field]: value } : addr
      ),
    }));
  };

  const handleToggleEdit = (index: number) => {
    setGlobalState((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr: Address, i: number) =>
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
        addresses: prev.addresses.filter(
          (_: Address, i: number) => i !== index
        ),
      }));
    }
  };

  return (
    <Card title="Primary Address Information" id="address">
      <div className="list-container">
        {globalState.addresses.map((addr: Address, index: number) =>
          addr?.isEditable ? (
            <EditableAddressForm
              key={index}
              index={index}
              address={addr}
              onUpdate={handleAddressUpdate}
              onToggleEdit={handleToggleEdit}
              onDelete={handleDeleteAddress}
              errors={errors}
              validateField={validateField}
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
