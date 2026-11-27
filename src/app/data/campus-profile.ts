export interface CampusProfile {
  campusName: string;
  legalName: string;
  gstin: string;
  pan: string;
  email: string;
  phone: string;
  financialYearStart: string;
  defaultCurrency: string;
  registeredAddress: string;
}

export const campusProfileFields = [
  {key: 'campusName', label: 'Campus Name', max: 100},
  {key: 'legalName', label: 'Legal Entity Name', max: 100},
  {key: 'gstin', label: 'GSTIN', max: 15},
  {key: 'pan', label: 'PAN', max: 10},
  {key: 'email', label: 'Contact Email', max: 256},
  {key: 'phone', label: 'Phone', max: 40},
  {key: 'financialYearStart', label: 'Financial Year Start', max: 9},
  {key: 'defaultCurrency', label: 'Default Currency', max: 3},
  {key: 'registeredAddress', label: 'Registered Address', max: 500}
] as const;
