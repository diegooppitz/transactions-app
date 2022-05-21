// libs
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

// helpers
import { stateMockFn } from "@/helpers/stateMock";

// views
import Home from "@/views/Home";

// components
import Modal from "@/components/modal/ModalComponent";

const stateMock = stateMockFn();
let fnMock;
let store;

describe("Home", () => {
  beforeEach(() => {
    fnMock = jest.fn();
    store = createStore({
      actions: { openModal: fnMock },
      state: {
        modalActive: false,
        modalData: stateMock,
      },
    });
  });

  test("check home class", async () => {
    const wrapper = mount(Home, {
      global: { plugins: [store] },
    });

    expect(wrapper.attributes("class")).toBe("home");
  });

  test("check if modal exists and if it is not visible", async () => {
    const wrapper = mount(Home, {
      global: { plugins: [store] },
    });

    const modal = wrapper.findComponent(Modal);
    expect(modal.exists()).toBe(true);
    expect(modal.isVisible()).toBe(false);
  });
});
