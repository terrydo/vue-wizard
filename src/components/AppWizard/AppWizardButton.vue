<template>
  <button
    class="py-2 px-5 rounded mt-2"
    :class="{
      'bg-black text-white': !outline,
      'bg-white border-black text-black': outline,
    }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    outline: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
