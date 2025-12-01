import React from "react";
import { Button } from "../ui";
import "./model.css";
import { InfoIcon } from "../icons";

interface Props {
  onStay: () => void;
  onLeave: () => void;
}

const UnsavedChangesModal: React.FC<Props> = ({ onStay, onLeave }) => (
  <div className="modal-container">
    <div className="modal-backdrop"></div>
    <div className="modal-content modal-default">
      <div className="model-title-container">
        <InfoIcon color="#ffb648" size="70px"/>
        <div className="unsaved-model-info">
          <h3 className="modal-title">Unsaved Changes</h3>
          <p className="modal-message">
            You have unsaved changes. Please{" "}
            <span className="model-pragraph">submit the form</span> before
            leave. Otherwise your data will be lost.
          </p>
        </div>
      </div>

      <div className="modal-actions">
        <Button variant="outline" onClick={onStay}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onLeave}>
          Leave wthout Saving
        </Button>
      </div>
    </div>
  </div>
);

export default UnsavedChangesModal;
