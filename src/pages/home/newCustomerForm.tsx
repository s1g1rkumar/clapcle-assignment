import { useEffect, useState } from "react";
import CompanyInformationForm from "./companyInformationForm";
import BankDetailsSection from "./bankDetailsForm";
import ContactInfoForm from "./contactInfoForm";
import AddressInfoForm from "./addressInfoForm";
import OtherStatutoryForm from "./otherStatutoryForm";
import CreditCommissionsForm from "./creditCommissionsForm";
import { Button } from "../../components/ui";
import { useValidation } from "../../customHooks/useValidation";
import type { SectionId } from "./index";

export interface GlobalState {
  [key: string]: any;
}

interface NewCustomerFormProps {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
}

const STORAGE_KEY = "customerFormDraft";

const defaultValues: GlobalState = {
  profileImageUrl: undefined,
  profileImageFile: undefined,
  gstRegType: "regular",
  gstNo: "27ABCDE1234F1Z5",
  panNo: "ABCDE1234F",
  legalName: "Zeesh Textiles Pvt Ltd",
  nickName: "Zeesh Textiles",
  parentGroup: "zeesh_group",
  websiteUrl: "https://www.xyz.com",
  msmeNumber: "UDYAM-MH-05-0012345",
  businessExecutor: "manufacturer",
  businessDesc: "We manufacture high-quality textiles.",
  contactName: "Ankit Kumar",
  countryCode: "+91",
  phoneNumber: "9876502090",
  email: "ankit.kumar@gmail.com",
  department: "UDYAM-MH-05-0012345",
  addresses: [
    {
      type: "Billing",
      street: "123 Commercial Street, Near City Center",
      city: "Mumbai",
      country: "India",
      zip: "400001",
      isEditable: true,
    },
    {
      type: "Shipping",
      street: "Plot No. 50, MIDC Industrial Area",
      city: "Surat",
      country: "India",
      zip: "395006",
      isEditable: false,
    },
  ],
  bankAccounts: [
    {
      bankName: "HDFC Bank",
      accountNumber: "50100123456789",
      ifscCode: "HDFC0000123",
      micrNumber: "400020002",
      errors: {},
    },
    {
      bankName: "State Bank of India",
      accountNumber: "30012345678",
      ifscCode: "SBIN0000123",
      micrNumber: "110002005",
      errors: {},
    },
  ],
  tdsDeduction: true,
  tdsApplication: true,
  gstinNo: "27ABCDE1234F1Z5",
  tdsAccNo: "UDYAN PAN 12 0001234",
  tdsApplyDropdown: "Company",
  ignoreTdsExemption: false,
  ignoreTcsExemption: true,
  tdsApplicationDup: true,
  deducteeTypeAuto: "Company",
  tdsDeducteeType: "Company",
  tanNumber: "MUMB00001A",
  iecNumber: "UDYAM-MH-05-0012345",
  creditLimit: "100000",
  commissionPct: "5.0",
  ageOfInvoice: "30",
  priceList: "Standard Price List",
  agentBrokerName: "Anil Sharma",
  commissionType: "Percentage",
  defaultCurrency: "INR",
};

const sectionIds: SectionId[] = [
  "company",
  "contact",
  "address",
  "bank",
  "statutory",
  "credit",
];

type ConfirmationDialog = {
  isOpen: boolean;
  title: string;
  message: string;
};

const NewCustomerForm = ({
  activeSection,
  setActiveSection,
}: NewCustomerFormProps) => {
  const [globalState, setGlobalState] = useState<GlobalState>(() => {
    const draft =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return draft ? JSON.parse(draft) : defaultValues;
  });
  const { errors, validateForm, validateField } = useValidation();

  const [isDirty, setIsDirty] = useState(false);
  const [showLeavePrompt, setShowLeavePrompt] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);

  const [confirmationDialog, setConfirmationDialog] =
    useState<ConfirmationDialog>({
      isOpen: false,
      title: "",
      message: "",
    });

  useEffect(() => {
    if (showLeavePrompt || confirmationDialog.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLeavePrompt, confirmationDialog.isOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) =>
            entry.isIntersecting &&
            setActiveSection(entry.target.id as SectionId)
        );
      },
      { root: document.querySelector(".customer-container"), threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      if (JSON.stringify(globalState) !== JSON.stringify(defaultValues)) {
        setIsDirty(true);
      } else {
        setIsDirty(false);
      }
      return;
    }

    if (JSON.stringify(globalState) !== saved) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [globalState]);

  useEffect(() => {
    let wasBlocked = false;

    // Handler for the native browser warning
    const handler = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;

      // 1. Block Navigation: Tells the browser to show its native prompt.
      e.preventDefault();

      // ✅ FIX: Use return statement for modern browsers.
      // This is the functional replacement for the deprecated e.returnValue = ""
      wasBlocked = true;
      return "You have unsaved changes.";
    };

    // Handler for detecting when the user returns to the page after canceling the native prompt
    const restoreCheck = () => {
      if (wasBlocked) {
        wasBlocked = false;
        setTimeout(() => {
          setShowLeavePrompt(true);
        }, 50);
      }
    };

    // Attach listeners
    window.addEventListener("beforeunload", handler);
    window.addEventListener("focus", restoreCheck);

    // Cleanup function
    return () => {
      window.removeEventListener("beforeunload", handler);
      window.removeEventListener("focus", restoreCheck);
    };
  }, [isDirty]);

  const attemptLeave = (action: () => void) => {
    if (isDirty) {
      setPendingAction(() => action);
      setShowLeavePrompt(true);
    } else {
      action();
    }
  };

  const confirmLeave = () => {
    setShowLeavePrompt(false);
    setIsDirty(false);
    if (pendingAction) {
      const actionToRun = pendingAction;
      setPendingAction(null);
      actionToRun();
    }
  };

  const stayOnPage = () => {
    setShowLeavePrompt(false);
    setPendingAction(null);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog({ isOpen: false, title: "", message: "" });
  };

  const handleSaveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
    setIsDirty(false);
    setConfirmationDialog({
      isOpen: true,
      title: "Draft Saved",
      message: "Your form data has been successfully saved as a draft.",
    });
  };

  const handleClear = () => {
    setGlobalState(defaultValues);
    localStorage.removeItem(STORAGE_KEY);
    setIsDirty(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 2. VALIDATION CHECK
    const formErrors = validateForm(globalState);
    const isValid = Object.keys(formErrors).length === 0;

    if (!isValid) {
      console.log("Validation Failed. Submission stopped.");

      // 2. VALIDATION CHECK
      setConfirmationDialog({
        isOpen: true,
        title: "Validation Error",
        message:
          "Please correct the highlighted errors on the form before proceeding to submit.",
      });
      return;
    }

    // 3. SUCCESS PATH: If valid, proceed with submission
    localStorage.removeItem(STORAGE_KEY);
    setIsDirty(false);

    console.log("Submitted Data:", globalState);

    setConfirmationDialog({
      isOpen: true,
      title: "Form Submitted",
      message: "The new customer form has been successfully submitted.",
    });
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

        <div className="button-row mr-4">
          <Button
            type="button"
            variant="text"
            onClick={() => attemptLeave(handleClear)}
          >
            Clear Fields
          </Button>
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button type="submit" variant="primary">
            Proceed to Submit
          </Button>
        </div>
      </form>

      {/* MODAL FOR UNSAVED CHANGES (Leave Prompt) */}
      {showLeavePrompt && (
        <div className="leave-modal-overlay">
          <div className="leave-modal">
            <h2>Unsaved Changes</h2>
            <p>
              You have unsaved changes. Do you really want to clear the form
              data?
            </p>

            <div className="modal-actions">
              <Button variant="outline" onClick={stayOnPage}>
                Stay
              </Button>
              <Button variant="primary" onClick={confirmLeave}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR SUCCESS/CONFIRMATION (Save/Submit) */}
      {confirmationDialog.isOpen && (
        <div className="leave-modal-overlay">
          <div className="leave-modal">
            <h2>{confirmationDialog.title}</h2>
            <p>{confirmationDialog.message}</p>

            <div className="modal-actions">
              <Button variant="primary" onClick={closeConfirmationDialog}>
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCustomerForm;
