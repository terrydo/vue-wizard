import type { Component } from 'vue';

/**
 * Expose methods so that other components could use
 */
export interface WizardApi {
  currentStepIndex: number;

  /**
   * Set the Wizard step to a number. STARTS FROM 0 !
   *
   * @param   {number}  step  Step number to go to
   * @return  {void}
   */
  setStep: (step: number) => void;
}

export interface WizardStep {
  component: Component;

  // Set the label to empty string to remove the button
  nextLabel?: string;
  prevLabel?: string;

  onClickNext?: (instance: WizardApi) => void;
  onClickPrev?: (instance: WizardApi) => void;
}
