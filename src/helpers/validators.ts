// validation.ts
export type ValidationRule = (value: string) => string | undefined;

// Basic validations
export const required: ValidationRule = (value) =>
  value.trim() === "" ? "This field is required" : undefined;

export const email: ValidationRule = (value) =>
  /^\S+@\S+\.\S+$/.test(value) ? undefined : "Invalid email format";

export const phone: ValidationRule = (value) =>
  /^(?=(?:.*\d){7,15})[0-9\s()+-]+$/.test(value) ? undefined : "Invalid phone number";

export const zip: ValidationRule = (value) =>
  /^[0-9]{4,10}$/.test(value) ? undefined : "Invalid ZIP Code";

export const gstNo: ValidationRule = (value) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(value)
    ? undefined
    : "Invalid GST Number";

export const panNo: ValidationRule = (value) =>
  /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
    ? undefined
    : "Invalid PAN Number";

// MSME Number (example format: MSME/YYYY/######)
export const msmeNumber: ValidationRule = (value) =>
  /^MSME\/\d{4}\/\d{6}$/.test(value) ? undefined : "Invalid MSME Number";

// Legal Name & Nick Name (allow letters, numbers, spaces, basic punctuation)
export const legalName: ValidationRule = (value) =>
  /^[\w\s.,'-]{2,100}$/.test(value) ? undefined : "Invalid Legal Name";

export const nickName: ValidationRule = (value) =>
  /^[\w\s.,'-]{2,50}$/.test(value) ? undefined : "Invalid Nick Name";

// Parent Group (letters, numbers, underscores)
export const parentGroup: ValidationRule = (value) =>
  /^[\w\s]{2,50}$/.test(value) ? undefined : "Invalid Parent Group";

// Business Executor & Description
export const businessExecutor: ValidationRule = (value) =>
  value.length <= 100 ? undefined : "Too long";

export const businessDesc: ValidationRule = (value) =>
  value.length <= 500 ? undefined : "Description too long";

// Contact Name
export const contactName: ValidationRule = (value) =>
  /^[A-Za-z\s]{2,50}$/.test(value) ? undefined : "Invalid Contact Name";

// Country Code (like +91)
export const countryCode: ValidationRule = (value) =>
  /^\+\d{1,4}$/.test(value) ? undefined : "Invalid Country Code";

// Bank Validations
export const bankName: ValidationRule = (value) =>
  /^[\w\s]{2,50}$/.test(value) ? undefined : "Invalid Bank Name";

export const accountNumber: ValidationRule = (value) =>
  /^[0-9]{6,20}$/.test(value) ? undefined : "Invalid Account Number";

export const ifscCode: ValidationRule = (value) =>
  /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value) ? undefined : "Invalid IFSC Code";

export const micrNumber: ValidationRule = (value) =>
  /^[0-9]{9}$/.test(value) ? undefined : "Invalid MICR Number";

// TDS, TAN, IEC, numeric and optional validations
export const tanNumber: ValidationRule = (value) =>
  /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/.test(value) ? undefined : "Invalid TAN Number";

export const iecNumber: ValidationRule = (value) =>
  /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/.test(value) ? undefined : "Invalid IEC Number";

// Credit Limit, Commission, Age of Invoice (numbers)
export const numeric: ValidationRule = (value) =>
  /^[0-9,]+$/.test(value) ? undefined : "Must be numeric";

// Percentage (0-100)
export const percentage: ValidationRule = (value) =>
  /^\d{1,2}(\.\d{1,2})?$/.test(value) && Number(value) <= 100
    ? undefined
    : "Invalid percentage";

// Price List, Agent Name, Commission Type, Currency (basic text)
export const textShort: ValidationRule = (value) =>
  /^[\w\s]{1,50}$/.test(value) ? undefined : "Invalid value";

// Export all together
export const validators = {
  required,
  email,
  phone,
  zip,
  gstNo,
  panNo,
  msmeNumber,
  legalName,
  nickName,
  parentGroup,
  businessExecutor,
  businessDesc,
  contactName,
  countryCode,
  bankName,
  accountNumber,
  ifscCode,
  micrNumber,
  tanNumber,
  iecNumber,
  numeric,
  percentage,
  textShort,
};
