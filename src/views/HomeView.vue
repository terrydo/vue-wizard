<script setup lang="ts">
import StepOne from '@/components/Steps/StepOne.vue';
import StepTwo from '@/components/Steps/StepTwo.vue';
import StepThree from '@/components/Steps/StepThree.vue';
import AppWizard from '@/components/AppWizard/AppWizard.vue';
import StepAlert from '@/components/Steps/StepAlert.vue';
import { useInsuranceWizard } from '@/stores/insuranceWizard';

const { insuranceBuyForm } = useInsuranceWizard();
</script>

<template>
  <main>
    <AppWizard
      :steps="[
        {
          component: StepOne,
          nextLabel: 'Start',
        },
        {
          component: StepTwo,
          nextLabel: 'Next',
          prevLabel: 'Back',

          onClickNext({ setStep, currentStepIndex }) {
            const age = insuranceBuyForm.age ?? 0;

            if (!insuranceBuyForm.name) {
              return window.alert('You must enter your name!');
            }

            if (age <= 0) {
              return window.alert('You must enter a valid age!');
            }

            if (age > 100) {
              return setStep(3);
            }

            return setStep(currentStepIndex + 1);
          },
        },
        {
          component: StepThree,
          nextLabel: 'Buy',
          prevLabel: 'Back',
          onClickNext({ setStep }) {
            window.alert('Noice!');
            setStep(0);
          },
        },
        {
          component: StepAlert,
          nextLabel: 'OK :(',
          onClickNext({ setStep }) {
            setStep(0);
          },
        },
      ]"
    >
    </AppWizard>
  </main>
</template>
