// libs
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

// views
import ListHeader from "@/components/list/ListHeader";

let fnMock;
let store;

describe("ListHeader", () => {
  beforeEach(() => {
    fnMock = jest.fn();
    store = createStore({
      actions: { changeStatus: fnMock, changeTerm: fnMock },
    });
  });

  test("check ListHeader class", async () => {
    const wrapper = mount(ListHeader, {
      global: { plugins: [store] },
    });

    expect(wrapper.attributes("class")).toBe("list-header");
  });
});
