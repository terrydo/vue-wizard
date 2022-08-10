import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import AppWizard from './AppWizard.vue';
import { defineComponent, shallowRef } from 'vue';

describe('AppWizard Test Suite', () => {
  it('Options passed should work properly', () => {
    const wrapper = mount(AppWizard, {
      props: {
        steps: [{ nextLabel: 'Next page 1234', prevLabel: 'Prev page 1234' }],
      },
    } as never);

    expect(wrapper.text()).toContain('Next page 1234');
    expect(wrapper.text()).toContain('Prev page 1234');
  });

  it('Should render correctly when navigating between steps', async () => {
    const A = defineComponent({
      render() {
        return 'Foo';
      },
    });

    const B = defineComponent({
      render() {
        return 'Bar';
      },
    });

    const wrapper = mount(AppWizard, {
      props: {
        steps: [
          { component: shallowRef(A), nextLabel: 'Next', prevLabel: 'Prev' },
          { component: shallowRef(B), nextLabel: 'Next', prevLabel: 'Prev' },
        ],
      },
    } as never);

    expect(wrapper.text()).toContain('Foo');
    expect(wrapper.text()).not.toContain('Bar');

    const nextButton = wrapper.findComponent('[data-test="next-button"]');
    const prevButton = wrapper.findComponent('[data-test="prev-button"]');
    nextButton.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain('Foo');
    expect(wrapper.text()).toContain('Bar');

    prevButton.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Foo');
    expect(wrapper.text()).not.toContain('Bar');
  });

  it('Should expose API so as other component could interact with', async () => {
    const A = defineComponent({
      template: 'foo',
    });

    const B = defineComponent({
      template: 'bar',
    });

    const wrapper = mount(AppWizard, {
      props: {
        steps: [{ component: shallowRef(A) }, { component: shallowRef(B) }],
      },
    } as never);

    expect(wrapper.vm.wizardApi).toBeTruthy();
  });
});
