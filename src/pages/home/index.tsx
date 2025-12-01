import React from "react";
import Sidebar from "./sidebar";
import "./home.css";
import NewCustomerForm from "./newCustomerForm";
import { useActiveSectionTracking } from "../../customHooks/useActiveSectionTracking";

export type SectionId =
  | "company"
  | "contact"
  | "address"
  | "bank"
  | "statutory"
  | "credit"
  | string;

const Index: React.FC = () => {
  const { activeSection, handleSidebarClick } = useActiveSectionTracking();
  return (
    <div className="customer-layout">
      <div>
        <Sidebar
          activeSection={activeSection}
          handleSidebarClick={handleSidebarClick}
        />
      </div>
      <div className="customer-container">
        <NewCustomerForm
        />
      </div>
    </div>
  );
};

export default Index;
