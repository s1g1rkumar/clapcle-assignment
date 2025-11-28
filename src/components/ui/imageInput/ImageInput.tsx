import React from "react";
import { CameraIcon } from "../../icons";
import './ImageInput.css'

interface ProfileImageSectionProps {
  imageUrl?: string;
  onImageChange: (file: File | null) => void;
  error?: string;
}

const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  imageUrl,
  onImageChange,
  error,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
    e.target.value = ''; 
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const boxClasses = `
    profile-upload-box 
    ${error ? 'upload-error' : ''}
  `;

  const purpleColor = "#7C3AED"; 

  return (
    <div className="profile-upload-wrapper">
      <div 
        className={boxClasses} 
        onClick={handleUploadClick}
        title="Click to upload profile image"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Profile Preview" className="preview-image" />
        ) : (
          <div className="placeholder-icon" />
        )}
        
        <div className="camera-btn">
          <CameraIcon size="14px" color={purpleColor} />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden-input"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ProfileImageSection;