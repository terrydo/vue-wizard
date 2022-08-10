export interface InsuranceLocation {
  id: string;
  name: string;
  currency: string;
  rate: number;
}

export interface InsurancePackage {
  id: string;
  name: string;
  rate: number;
}

/**
 * Data to send to API
 */
export interface InsuranceBuyForm {
  name: string;
  age?: number;
  package: string;
  location: string;
  cost: number;
}
