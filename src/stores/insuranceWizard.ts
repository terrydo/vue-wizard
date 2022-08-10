import {
  getAllInsuranceLocations,
  getAllInsurancePackages,
  getInsuranceCost,
  type InsuranceBuyForm,
  type InsuranceLocation,
  type InsurancePackage,
} from '@/models/Insurance';
import { defineStore } from 'pinia';

const locations = getAllInsuranceLocations();
const packages = getAllInsurancePackages();

const defaultInsuranceBuyForm: InsuranceBuyForm = {
  name: '',
  package: packages[0].id,
  location: locations[0].id,
  cost: 0,
};

export const useInsuranceWizard = defineStore({
  id: 'insurance_wizard',
  state: () => ({
    insuranceBuyForm: defaultInsuranceBuyForm,
  }),
  getters: {
    selectedLocation(state): InsuranceLocation {
      return (
        locations.find(
          (location) => location.id === state.insuranceBuyForm.location
        ) || locations[0]
      );
    },
    selectedPackage(state): InsurancePackage {
      return (
        packages.find((pkg) => pkg.id === state.insuranceBuyForm.package) ||
        packages[0]
      );
    },
    cost(state): ReturnType<typeof getInsuranceCost> {
      return getInsuranceCost({
        age: state.insuranceBuyForm.age || 0,
        location: this.selectedLocation,
        insurancePackage: this.selectedPackage,
      });
    },
  },
  actions: {
    setInsuranceBuyForm(form: typeof this.insuranceBuyForm) {
      this.insuranceBuyForm = form;
    },
  },
});
