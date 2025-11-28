import React, { useState } from "react";
import Sidebar from "./sidebar";
import "./home.css";
import NewCustomerForm from "./newCustomerForm";

export type SectionId =
  | "company"
  | "contact"
  | "address"
  | "bank"
  | "statutory"
  | "credit"
  | string;

const Index: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("company");

  return (
    <div className="flex flex-start customer-layout">
      <div>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      <div className="customer-container">
        <NewCustomerForm
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
    </div>
  );
};

export default Index;
