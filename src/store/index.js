import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  breadListState: [] // 面包屑列表数据
};
export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
    breadListMutations(state, list) {
      state.breadListState = list;
    }
  },
  actions: {
  },
  modules: {
  }
})
