// Modal.tsx (Using Custom Classes)

import React, { useRef, useEffect } from "react";
import './model.css' // Ensure the CSS file is imported

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean; 
  isFullscreen?: boolean; 
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true, 
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Effect to close the modal on 'Escape' key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Effect to lock/unlock body scrolling
  useEffect(() => {
    // We add a class to the body instead of manipulating style directly
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "modal-fullscreen"
    : "modal-default";

  return (
    // Main modal container (fixed position, full screen)
    <div className="modal-container">
      
      {/* Backdrop (Glass/Blurred Background) */}
      {!isFullscreen && (
        <div
          className="modal-backdrop"
          onClick={onClose}
        ></div>
      )}
      
      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`modal-content ${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {showCloseButton && !isFullscreen && ( // Typically hide 'X' button on fullscreen apps
          <button
            onClick={onClose}
            className="modal-close-btn"
          >
            {/* SVG icon remains */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};