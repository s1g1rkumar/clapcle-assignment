import "./home.css";
import type { SectionId } from "./index";
import {
  CompanyIcon,
  ContactaIcon,
  AddressIcon,
  PaymentIcon,
  PageIcon,
  CreditIcon,
} from "../../components/icons";

interface SidebarProps {
  activeSection: SectionId;
  handleSidebarClick: (id: SectionId) => void;
}

const formSections = [
  { id: "company", label: "Company Information", Icon: CompanyIcon },
  { id: "contact", label: "Contact Information", Icon: ContactaIcon },
  { id: "address", label: "Primary Address Information", Icon: AddressIcon },
  { id: "bank", label: "Bank Details", Icon: PaymentIcon },
  { id: "statutory", label: "Other Statutory Details", Icon: PageIcon },
  { id: "credit", label: "Credit , Commissions & Price list", Icon: CreditIcon },
];

export default function Sidebar({ activeSection, handleSidebarClick }: SidebarProps) {
  const ACTIVE_COLOR = "#8257fb";
  const INACTIVE_COLOR = "#94a3b8";

  return (
    <div className="sidebar-ui">
      <div className="sidebar-ui-card">
        {formSections.map(({ id, label, Icon }) => {
          const isActive = activeSection === id;
          return (
            <div
              key={id}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={() => handleSidebarClick(id)}
            >
              <span className="sidebar-icon">
                <Icon color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} />
              </span>
              <span className="sidebar-text">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
