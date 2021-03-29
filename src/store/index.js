import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import cate from "./modules/cate"
import cart from "./modules/cart"

import presistedstate from "vuex-persistedstate";

// 创建仓库
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    cate,cart
  },
  plugins: [presistedstate({ storage: window.sessionStorage })]
});
