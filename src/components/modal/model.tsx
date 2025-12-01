import React, { useMemo } from "react";
import { Button } from "../ui";
import "./model.css";
import { InfoIcon, WaringIcon, CorrectIcon } from "../icons";

interface ModalProps {
  title?: string;
  message?: string | React.ReactNode;
  variant?: "warning" | "success" | "error" | "info";
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title = "Notification",
  message = "This is a message.",
  variant = "info",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showCancel = true,
}) => {
  const IconMap = useMemo(() => {
    switch (variant) {
      case "success":
        return <CorrectIcon color="#34d399" size="70px" />;
      case "warning":
        return <WaringIcon color="#fbbf24" size="70px" />;
      case "error":
        return <WaringIcon color="#f87171" size="70px" />;
      case "info":
      default:
        return <InfoIcon color="#3b82f6" size="70px" />;
    }
  }, [variant]);

  return (
    <div className="modal-container">
      <div className="modal-backdrop"></div>
      <div className={`modal-content modal-default`}>
        <div className="model-title-container">
          {IconMap}
          <div className="unsaved-model-info">
            <h3 className="modal-title">{title}</h3>
            <p className="modal-message">{message}</p>
          </div>
        </div>

        <div className="modal-actions">
          {showCancel && (
            <Button variant="outline" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button variant={"primary"} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
