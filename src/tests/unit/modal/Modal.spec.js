// libs
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

// helpers
import { stateMockFn } from "@/helpers/stateMock";

//  components
import Modal from "@/components/modal/ModalComponent";
import ModalHeader from "@/components/modal/ModalHeader";
import ModalBody from "@/components/modal/ModalBody";

const stateMock = stateMockFn();
let fnMock;
let store;

describe("Modal", () => {
  beforeEach(() => {
    fnMock = jest.fn();
    store = createStore({
      actions: { closeModal: fnMock },
      state: { modalData: stateMock },
    });
  });

  test("check modal class and components", async () => {
    const wrapper = mount(Modal, {
      global: { plugins: [store] },
    });

    expect(wrapper.attributes("class")).toBe("modal");

    const modalHeader = wrapper.findComponent(ModalHeader);
    expect(modalHeader.exists()).toBe(true);

    const modalBody = wrapper.findComponent(ModalBody);
    expect(modalBody.exists()).toBe(true);
  });

  test("call closeModal function", async () => {
    const wrapper = mount(Modal, {
      global: { plugins: [store] },
    });

    const closeModal = wrapper.find(".modal");
    await closeModal.trigger("click");
    expect(fnMock).toHaveBeenCalled();
  });
});
