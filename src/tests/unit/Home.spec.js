// libs
import { mount } from "@vue/test-utils";
import { createStore } from 'vuex';

// helpers
import { stateMockFn } from '@/helpers/stateMock';

// views
import Home from '@/views/Home';

// components
import Modal from '@/components/Modal';

const stateMock = stateMockFn();
let fnMock;
let store;

describe('Home', () => {
  beforeEach(() => {
    fnMock = jest.fn();
    store = createStore({
      actions: { openModal: fnMock },
      state: { 
        modalActive: false,
        modalData: stateMock
      },
    })
  })

  test('check home class', async () => {
    const wrapper = mount(Home, {
      global: { plugins: [store] }
    })

    expect(wrapper.attributes('class')).toBe('transactions-table');
  })

  test('check if modal exists and if it is not visible', async () => {
    const wrapper = mount(Home, {
      global: { plugins: [store] }
    })

    const modal = wrapper.findComponent(Modal);
    expect(modal.exists()).toBe(true);
    expect(modal.isVisible()).toBe(false);
  })

  test('call formatAmount and formatStatus functions', async () => {
    const wrapper = mount(Home, {
      global: { plugins: [store] }
    })

    const formatAmount = wrapper.vm.formatAmount(500);
    expect(formatAmount).toBe('R$ 500,00');


    const formatStatus = wrapper.vm.formatStatus('created');
    expect(formatStatus).toBe('Solicitada');
  })
})