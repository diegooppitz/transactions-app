import { mount } from "@vue/test-utils";
import { createStore } from 'vuex';
import ModalBody from '@/components/ModalBody';

const stateMock = {
  "id":"5f89f9f257fe42957bf6dbfd",
  "title":"Resgate",
  "description":"et labore proident aute nulla",
  "status":"created",
  "amount":2078.66,
  "date":"2020-07-01",
  "from":"Aposentadoria",
  "to":"Conta Warren"
}

let store;

describe('ModalBody', () => {
  beforeEach(() => {
    store = createStore({
      state: { modalData: stateMock },
    })
  })

  test('check modal-body class, subtitles and test formatAmount function', async () => {
    const wrapper = mount(ModalBody, {
      global: { plugins: [store] }
    })

    expect(wrapper.attributes('class')).toBe('modal-body');
    expect(wrapper.find('h4').exists()).toBe(true);

    const formatAmount = wrapper.vm.formatAmount(500);
    expect(formatAmount).toBe('R$ 500,00');
  })
})