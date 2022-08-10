<template>
  <div class="wizard-container">
    <div class="wizard-container__wrapper">
      <component :is="currentComponent"></component>

      <div class="text-center mt-4">
        <AppWizardButton
          :outline="true"
          data-test="prev-button"
          v-if="currentStep.prevLabel"
          @click="prevStep"
        >
          {{ currentStep.prevLabel }}
        </AppWizardButton>

        <AppWizardButton
          data-test="next-button"
          class="ml-5"
          v-if="currentStep.nextLabel"
          @click="toNextStep"
        >
          {{ currentStep.nextLabel }}
        </AppWizardButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import AppWizardButton from './AppWizardButton.vue';
import type { WizardStep, WizardApi } from './types';

export default defineComponent({
  components: {
    AppWizardButton,
  },
  data() {
    return {
      currentStepIndex: 0,
    };
  },
  computed: {
    currentComponent() {
      return this.steps[this.currentStepIndex].component;
    },
    currentStep() {
      return this.steps[this.currentStepIndex];
    },
    wizardApi(): WizardApi {
      return {
        currentStepIndex: this.currentStepIndex,
        setStep: this.setStep,
      };
    },
  },
  props: {
    steps: {
      type: Array as PropType<WizardStep[]>,
      default: () => [],
      required: true,
    },
  },
  methods: {
    toNextStep() {
      const nextStepIndex = this.currentStepIndex + 1;

      if (!this.currentStep.onClickNext) {
        this.currentStepIndex = nextStepIndex;
      } else {
        this.currentStep.onClickNext(this.wizardApi);
      }
    },
    prevStep() {
      const nextStepIndex = this.currentStepIndex - 1;

      if (!this.currentStep.onClickPrev) {
        this.currentStepIndex = nextStepIndex;
      } else {
        this.currentStep.onClickPrev(this.wizardApi);
      }
    },
    setStep(newStep: number) {
      this.currentStepIndex = newStep;
    },
  },
});
</script>

<style lang="scss">
.wizard-container {
  @apply fixed flex w-full h-full items-center justify-center bg-gray-600;

  &__wrapper {
    @apply bg-gray-800 text-white rounded-lg p-10;
  }
}
</style>
