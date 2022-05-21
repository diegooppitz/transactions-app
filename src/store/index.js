import { createStore } from "vuex";

export default createStore({
  state: {
    // filters
    status: {
      id: "status",
      name: "Todos os status",
    },
    term: null,

    // modal
    modalData: {},
    modalActive: false,
  },
  mutations: {
    // filters
    SET_FILTER_STATUS(state, payload) {
      state.status = payload;
    },
    SET_FILTER_TERM(state, payload) {
      state.term = payload;
    },

    // modal
    SET_MODAL_ACTIVE(state, payload) {
      state.modalActive = payload;
    },
    SET_MODAL_DATA(state, payload) {
      state.modalData = payload;
    },
  },
  actions: {
    changeStatus({ commit }, payload) {
      if (payload) commit("SET_FILTER_STATUS", payload);
    },

    changeTerm({ commit }, payload) {
      const termValue = payload?.target?.value;
      if (termValue) commit("SET_FILTER_TERM", termValue);
      else commit("SET_FILTER_TERM", "");
    },

    openModal({ commit }, data) {
      commit("SET_MODAL_ACTIVE", true);
      commit("SET_MODAL_DATA", data);
    },

    closeModal({ commit }) {
      commit("SET_MODAL_ACTIVE", false);
      commit("SET_MODAL_DATA", {});
    },
  },
});
