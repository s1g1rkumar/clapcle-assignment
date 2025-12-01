import { useMemo, useState } from "react";
import CompanyInformationForm from "./companyInformationForm";
import BankDetailsSection from "./bankDetailsForm";
import ContactInfoForm from "./contactInfoForm";
import AddressInfoForm from "./addressInfoForm";
import OtherStatutoryForm from "./otherStatutoryForm";
import CreditCommissionsForm from "./creditCommissionsForm";
import { Button } from "../../components/ui";
import { useValidation } from "../../customHooks/useValidation";
import { newCustomerDefaultValues, STORAGE_KEY } from "../../helpers/constant";
import { useUnsavedNavigation } from "../../customHooks/useUnsavedChanges";
import { UnsavedChangesModal } from "../../components/modal";
import Modal from "../../components/modal/model";

export interface GlobalState {
  [key: string]: any;
}

type ModalType = "draft" | "submit" | "error" | null;

const defaultValues: GlobalState = newCustomerDefaultValues;

const NewCustomerForm = () => {
  const [globalState, setGlobalState] = useState<GlobalState>(() => {
    const draft = localStorage.getItem(STORAGE_KEY);
    return draft ? JSON.parse(draft) : defaultValues;
  });
  const [modalType, setModalType] = useState<ModalType>(null);
  const [savedState, setSavedState] = useState(globalState);
  const isDirty = useMemo(
    () => JSON.stringify(globalState) !== JSON.stringify(savedState),
    [globalState, savedState]
  );
  const { showPrompt, stay, leave } = useUnsavedNavigation(isDirty);
  const { errors, validateForm, validateField } = useValidation();

  const handleSaveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
    setSavedState(globalState);
    setModalType("draft");
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGlobalState(defaultValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(globalState);
    const isValid = Object.keys(formErrors).length === 0;

    if (!isValid) {
      setModalType("error");
      return;
    }
    setSavedState(globalState);
    localStorage.removeItem(STORAGE_KEY);
    console.log("Submitted Data:", globalState);
    setModalType("submit");
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <CompanyInformationForm
          {...{ globalState, setGlobalState, errors, validateField }}
        />
        <ContactInfoForm
          {...{ globalState, setGlobalState, errors, validateField }}
        />
        <AddressInfoForm
          {...{ globalState, setGlobalState, errors, validateField }}
        />
        <BankDetailsSection
          {...{ globalState, setGlobalState, errors, validateField }}
        />
        <OtherStatutoryForm
          {...{ globalState, setGlobalState, errors, validateField }}
        />
        <CreditCommissionsForm
          {...{ globalState, setGlobalState, errors, validateField }}
        />

        <div className="fixed-form-footer">
          <div className="button-row">
            <Button type="button" variant="text" onClick={handleClear}>
              Clear Fields
            </Button>
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button type="submit" variant="primary">
              Proceed to Submit
            </Button>
          </div>
        </div>
      </form>

      {/* FIXED FOOTER*/}

      {showPrompt && <UnsavedChangesModal onStay={stay} onLeave={leave} />}
      {modalType === "draft" && (
        <Modal
          variant="success"
          title="Draft Saved"
          message="Your progress has been saved. You can continue working or return later."
          confirmText="OK"
          showCancel={false}
          onConfirm={() => setModalType(null)}
        />
      )}

      {modalType === "submit" && (
        <Modal
          variant="success"
          title="Submission Successful"
          message="Your form has been submitted successfully and is now being processed."
          confirmText="Done"
          showCancel={false}
          onConfirm={() => setModalType(null)}
        />
      )}

      {modalType === "error" && (
        <Modal
          variant="error"
          title="Validation Required"
          message="Please fix all validation errors before submitting."
          confirmText="Got it"
          showCancel={false}
          onConfirm={() => setModalType(null)}
        />
      )}
    </div>
  );
};

export default NewCustomerForm;
