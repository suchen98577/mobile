export default {
  state: {
    cartList: []
  },
  getters: {
    getcartList(state) {
      return state.cartList;
    }
  },
  mutations: {
    changecartList(state, payload) {
      state.cartList = payload;
    }
  },
  actions: {
    changecartListSync({ commit },payload) {
        commit("changecartList", payload);
    }
  },
  namespaced: true
};
