<template>
  <span v-if="amountInNumber > 0 && amountInPercentage > 0">
    (+{{ amountInNumber }}{{ currency }}, {{ amountInPercentage }}%)
  </span>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    costDifference: {
      type: Object as PropType<[number, number]>,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  computed: {
    amountInNumber() {
      return this.costDifference[0];
    },
    amountInPercentage() {
      return this.costDifference[1];
    },
  },
});
</script>
