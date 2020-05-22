import Vue from 'vue'
import Vuex from 'vuex'
import { globalStore } from '@galaplat/utils/lib/store/globalStore'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: globalStore
  },
  state: {
  },
  getters: {
  },
  actions: {
  },
  mutations: {
  }
})
