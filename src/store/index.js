import { createStore } from 'vuex'

export default createStore({
  state: {
    modalData: {},
    modalActive: false,
  },
  mutations: {
    SET_MODAL_ACTIVE(state, payload) {
      state.modalActive = payload;
    },

    SET_MODAL_DATA(state, payload) {
      state.modalData = payload;
    },
  },
  actions: {
    openModal({ commit }, data) {
      commit("SET_MODAL_ACTIVE", true);
      commit("SET_MODAL_DATA", data);
    },

    closeModal({ commit }) {
      commit("SET_MODAL_ACTIVE", false);
      commit("SET_MODAL_DATA", {});
    }
  },
})
