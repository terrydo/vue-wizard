<template>
  <h1 class="text-3xl font-semibold">Tell us about yourself</h1>

  <form class="mt-4">
    <div class="mb-4">
      <label for=""> Name </label>

      <input type="text" class="w-full" v-model="insuranceBuyForm.name" />
    </div>

    <div class="mb-4">
      <label for=""> Age </label>

      <input
        type="number"
        required
        min="0"
        class="w-full"
        v-model.number="insuranceBuyForm.age"
      />
    </div>

    <div class="mb-4">
      <label for="">Where do you live?</label>

      <select v-model="insuranceBuyForm.location">
        <option
          :key="location.id"
          v-for="location in locations"
          :value="location.id"
        >
          {{ location.name }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block" :key="item.id" v-for="item in packages">
        <input
          type="radio"
          :value="item.id"
          v-model="insuranceBuyForm.package"
          name="package"
        />
        {{ item.name }}
        <CostDifference
          :costDifference="getCostDifference(item)"
          :currency="selectedLocation.currency"
        />
      </label>
    </div>

    <div class="mt-5">Your premium is: {{ cost[1] }}</div>
  </form>
</template>
<script lang="ts">
import type { InsurancePackage } from '@/models/Insurance';
import { defineComponent } from 'vue';
import {
  getAllInsuranceLocations,
  getInsuranceCost,
  getAllInsurancePackages,
} from '@/models/Insurance';
import { useInsuranceWizard } from '@/stores/insuranceWizard';
import CostDifference from './CostDifference.vue';
import { mapState, mapWritableState } from 'pinia';

const locations = getAllInsuranceLocations();
const packages = getAllInsurancePackages();

export default defineComponent({
  components: {
    CostDifference,
  },
  data: () => {
    return {
      packages,
      locations,
    };
  },
  computed: {
    ...mapWritableState(useInsuranceWizard, ['insuranceBuyForm']),
    ...mapState(useInsuranceWizard, [
      'selectedLocation',
      'selectedPackage',
      'cost',
    ]),

    standardCost() {
      return getInsuranceCost({
        age: this.insuranceBuyForm.age || 0,
        location: this.selectedLocation,
        insurancePackage: packages[0],
      });
    },
    costNumber() {
      return this.cost[0];
    },
    costText() {
      return this.cost[1];
    },
  },
  methods: {
    getCostDifference(comparisonPackage: InsurancePackage) {
      const standardCostNumber = this.standardCost[0];
      const rateDifference = comparisonPackage.rate - 1;

      return [standardCostNumber * rateDifference, rateDifference * 100];
    },
  },
});
</script>

<style scoped>
input[type='text'],
input[type='number'],
select {
  @apply w-full p-2 rounded bg-white bg-opacity-90 text-black;
}

select option {
  @apply text-black;
}
</style>
