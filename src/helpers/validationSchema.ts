import {
  required,
  email,
  phone,
  zip,
  gstNo,
  panNo,
  legalName as legalNameValidator,
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
  type ValidationRule,
} from "./validators";

export const validationSchema: Record<string, ValidationRule[]> = {
  // Basic company info
  gstRegType: [required],
  gstNo: [required, gstNo],
  panNo: [required, panNo],
  legalName: [required, legalNameValidator],
  nickName: [required, nickName],
  parentGroup: [required, parentGroup],
  msmeNumber: [required],
  businessExecutor: [businessExecutor],
  businessDesc: [required, businessDesc],

  // Contact info
  contactName: [required, contactName],
  countryCode: [required, countryCode],
  phoneNumber: [required, phone],
  email: [required, email],

  // Addresses (array)
  "addresses[].street": [required],
  "addresses[].city": [required],
  "addresses[].country": [required],
  "addresses[].zip": [required, zip],

  // Bank accounts (array)
  "bankAccounts[].bankName": [required, bankName],
  "bankAccounts[].accountNumber": [required, accountNumber],
  "bankAccounts[].ifscCode": [required, ifscCode],
  "bankAccounts[].micrNumber": [micrNumber],

  // TDS, TAN, IEC, numeric fields
  tdsDeduction: [],
  tdsApplication: [],
  gstinNo: [gstNo],
  tdsAccNo: [textShort],
  tdsApplyDropdown: [textShort],
  ignoreTdsExemption: [],
  ignoreTcsExemption: [],
  tdsApplicationDup: [],
  deducteeTypeAuto: [textShort],
  tanNumber: [tanNumber],
  iecNumber: [iecNumber],

  // Financial fields
  creditLimit: [numeric],
  commissionPct: [percentage],
  ageOfInvoice: [numeric],
  priceList: [textShort],
  agentBrokerName: [textShort],
  commissionType: [textShort],
  defaultCurrency: [textShort],
};
