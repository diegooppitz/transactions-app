// libs
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

// helpers
import { stateMockFn } from "@/helpers/stateMock";

// components
import ModalBody from "@/components/modal/ModalBody";
import ChartBar from "@/components/modal/ChartBar";

const stateMock = stateMockFn();

let store;

describe("ModalBody", () => {
  beforeEach(() => {
    store = createStore({
      state: { modalData: stateMock },
    });
  });

  test("check modal-body class, subtitles and components", async () => {
    const wrapper = mount(ModalBody, {
      global: { plugins: [store] },
    });

    expect(wrapper.attributes("class")).toBe("modal-body");
    expect(wrapper.find("h4").exists()).toBe(true);

    const chartBar = wrapper.findComponent(ChartBar);
    expect(chartBar.exists()).toBe(true);
  });

  test("call formatAmount function", async () => {
    const wrapper = mount(ModalBody, {
      global: { plugins: [store] },
    });

    const formatAmount = wrapper.vm.formatAmount(500);
    expect(formatAmount).toBe("R$ 500,00");
  });
});
