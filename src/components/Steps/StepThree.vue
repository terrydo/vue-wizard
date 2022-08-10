<template>
  <div class="text-center">
    <h1 class="font-semibold text-3xl">Summary</h1>

    <h2 class="text-2xl">{{ insuranceBuyForm.name }},</h2>

    <div class="text-center mt-3">
      <p>Name: {{ insuranceBuyForm.name }}</p>
      <p>Age: {{ insuranceBuyForm.age }}</p>
      <p>Where do you live: {{ insuranceBuyForm.location }}</p>
      <p>Package: {{ selectedPackage.name }}</p>
      <p>Premium: {{ cost[1] }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { useInsuranceWizard } from '@/stores/insuranceWizard';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    ...mapState(useInsuranceWizard, [
      'insuranceBuyForm',
      'selectedLocation',
      'selectedPackage',
      'cost',
    ]),
  },
});
</script>
