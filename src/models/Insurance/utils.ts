import type { InsuranceLocation, InsurancePackage } from './Insurance';

export const getAllInsuranceLocations = (): InsuranceLocation[] => {
  return [
    {
      id: 'HK',
      name: 'Hong Kong',
      currency: 'HKD',
      rate: 1,
    },
    {
      id: 'US',
      name: 'USA',
      currency: 'USD',
      rate: 2,
    },
    {
      id: 'AU',
      name: 'Australia',
      currency: 'AUD',
      rate: 3,
    },
  ];
};

export const getAllInsurancePackages = (): InsurancePackage[] => {
  return [
    {
      id: 'standard',
      name: 'Standard',
      rate: 1,
    },
    {
      id: 'safe',
      name: 'Safe',
      rate: 1.5,
    },
    {
      id: 'supersafe',
      name: 'Super Safe',
      rate: 1.75,
    },
  ];
};

export const getPackageRate = (id: string) => {
  return getAllInsurancePackages().find((pkg) => pkg.id === id)?.rate || 0;
};

interface FormulaData {
  age: number;
  location: InsuranceLocation;
  insurancePackage: InsurancePackage;
}

export const getInsuranceCost = ({
  age,
  location,
  insurancePackage,
}: FormulaData) => {
  const cost = age * 10 * location.rate * insurancePackage.rate;

  return [cost, `${cost}${location.currency}`] as const;
};
