import type React from "react";
import type { GlobalState } from "./newCustomerForm";
import { Card, FormField, Input, Select, TextArea } from "../../components/ui";
import {
  businessNutureList,
  GstRegTypesList,
  parentGroupList,
} from "../../helpers";
import { ImageInput } from "../../components/ui/imageInput";

interface SectionProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  errors: { [key: string]: string | undefined };
  validateField: (field: string, value: string) => void;
}

const CompanyInformationForm: React.FC<SectionProps> = ({
  globalState,
  setGlobalState,
  errors,
  validateField,
}) => {
  const update = (
    field: keyof GlobalState,
    value: GlobalState[keyof GlobalState]
  ) => {
    setGlobalState((prev) => ({ ...prev, [field]: value }));
    if (typeof value === "string") {
      validateField(field as string, value as string);
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setGlobalState((prev) => ({
        ...prev,
        profileImageFile: file,
        profileImageUrl: imageUrl,
      }));
    } else {
      setGlobalState((prev) => ({
        ...prev,
        profileImageFile: undefined,
        profileImageUrl: undefined,
      }));
    }
  };

  return (
    <Card title="Company Information" id="company">
      <ImageInput
        imageUrl={globalState.profileImageUrl as string | undefined}
        onImageChange={handleImageChange}
        error={errors.profileImageFile}
      />
      <div className="form-fields-grid">
        <FormField
          label="GST Registration Type"
          required
          error={errors.gstRegType}
        >
          <Select
            options={GstRegTypesList}
            onChange={(val) => update("gstRegType", val)}
            value={globalState.gstRegType}
            error={errors.gstRegType}
          />
        </FormField>
        <FormField label="GST Number" required error={errors.gstNo}>
          <Input
            type="text"
            placeholder="Enter GST Number"
            value={globalState.gstNo}
            onChange={(e) => update("gstNo", e.target.value)}
            error={errors.gstNo}
          />
        </FormField>

        <FormField label="PAN Number" required error={errors.panNo}>
          <Input
            value={globalState.panNo}
            onChange={(e) => update("panNo", e.target.value)}
            error={errors.panNo}
          />
        </FormField>

        <FormField
          label="MSME Registration Number"
          required
          error={errors.msmeNumber}
        >
          <Input
            value={globalState.msmeNumber}
            onChange={(e) => update("msmeNumber", e.target.value)}
            error={errors.msmeNumber}
          />
        </FormField>

        <FormField label="Legal Name" required error={errors.legalName}>
          <Input
            value={globalState.legalName}
            onChange={(e) => update("legalName", e.target.value)}
            error={errors.legalName}
          />
        </FormField>

        <FormField label="Nick Name" required error={errors.nickName}>
          <Input
            value={globalState.nickName}
            onChange={(e) => update("nickName", e.target.value)}
            error={errors.nickName}
          />
        </FormField>

        <FormField label="Parent Group" required error={errors.parentGroup}>
          <Select
            options={parentGroupList}
            onChange={(val) => update("parentGroup", val)}
            value={globalState.parentGroup}
            error={errors.parentGroup}
          />
        </FormField>

        <FormField label="Website URL" error={errors.websiteUrl}>
          <Input
            value={globalState.websiteUrl}
            placeholder="https://www.xyz.com"
            onChange={(e) => update("websiteUrl", e.target.value)}
          />
        </FormField>

        <FormField label="Business Nature">
          <Select
            options={businessNutureList}
            onChange={(val) => update("businessExecutor", val)}
            value={globalState.businessExecutor}
          />
        </FormField>
      </div>

      <FormField label="Business Description">
        <TextArea
          value={globalState.businessDesc}
          onChange={(e) => update("businessDesc", e.target.value)}
          maxLength={200}
          placeholder="Describe your business..."
        />
      </FormField>
    </Card>
  );
};

export default CompanyInformationForm;
