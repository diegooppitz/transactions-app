import { mount } from "@vue/test-utils";
import { createStore } from 'vuex';
import ModalHeader from '@/components/ModalHeader';

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

let fnMock;
let store;

describe('ModalHeader', () => {
  beforeEach(() => {
    fnMock = jest.fn();
    store = createStore({
      state: { modalData: stateMock },
      actions: { closeModal: fnMock }
    })
  })

  test('check modal-header class, subtitle and call closeModal function', async () => {
    const wrapper = mount(ModalHeader, {
      global: { plugins: [store] }
    })

    expect(wrapper.attributes('class')).toBe('modal-header');
    expect(wrapper.find('h3').exists()).toBe(true);

    const closeImg = wrapper.find('img');
    await closeImg.trigger('click');
    expect(fnMock).toHaveBeenCalled();
  })
})