// libs
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

// helpers
import { stateMockFn } from "@/helpers/stateMock";

// components
import ModalHeader from "@/components/modal/ModalHeader";

const stateMock = stateMockFn();

let fnMock;
let store;

describe("ModalHeader", () => {
  beforeEach(() => {
    fnMock = jest.fn();
    store = createStore({
      state: { modalData: stateMock },
      actions: { closeModal: fnMock },
    });
  });

  test("check modal-header class and subtitle", async () => {
    const wrapper = mount(ModalHeader, {
      global: { plugins: [store] },
    });

    expect(wrapper.attributes("class")).toBe("modal-header");
    expect(wrapper.find("h3").exists()).toBe(true);
  });

  test("call closeModal function", async () => {
    const wrapper = mount(ModalHeader, {
      global: { plugins: [store] },
    });

    const closeImg = wrapper.find("img");
    await closeImg.trigger("click");
    expect(fnMock).toHaveBeenCalled();
  });
});
