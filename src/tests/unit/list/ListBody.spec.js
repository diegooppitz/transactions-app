// libs
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

// views
import ListBody from "@/components/list/ListBody";

let fnMock;
let store;

describe("ListBody", () => {
  beforeEach(() => {
    fnMock = jest.fn();
    store = createStore({
      actions: { openModal: fnMock },
      state: {
        status: {
          id: "status",
          name: "Todos os status",
        },
        term: "",
      },
    });
  });

  test("check ListBody class", async () => {
    const wrapper = mount(ListBody, {
      global: { plugins: [store] },
    });

    expect(wrapper.attributes("class")).toBe("transactions-list");
  });

  test("call formatAmount and formatStatus functions", async () => {
    const wrapper = mount(ListBody, {
      global: { plugins: [store] },
    });

    const formatAmount = wrapper.vm.formatAmount(500);
    expect(formatAmount).toBe("R$ 500,00");

    const formatStatus = wrapper.vm.formatStatus("created");
    expect(formatStatus).toBe("Solicitada");
  });
});
