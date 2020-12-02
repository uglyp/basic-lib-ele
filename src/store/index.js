import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Vue from 'vue';
const vuexSession = new VuexPersistence({
  storage: window.localStorage
});
const copy = (data) => {
  return Object.assign(data || {}, {})
}
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    config: {},
    isShowAuthCode:false,
    powerCode:[]
  },
  mutations: {
    setUser(state, user) {
      state.user = Object.assign({}, user)
    },
    setConfig(state, config) {
      state.config = config;
    },
    setPowerCode(state, powerCode) {
      state.powerCode = powerCode;
    },
    setIsShowAuthCode(state, b) {
      state.isShowAuthCode = b;
    },
  },
  actions: {},
  getters: {
    user: (state) => {
      return copy(state.user)
    },
    hasConfig: (state) => {
      return JSON.stringify(state.config) !== '{}'
    },
    cfg: (state) => {
      return copy(state.config)
    },
    app: (state) => {
      return copy(state.config.app)
    },
    list: (state) => {
      return copy(state.config.list)
    },
    info: (state) => {
      return copy(state.config.info)
    },
    ajax: (state) => {
      return copy(state.config.ajax)
    },
    menu: (state) => {
      return copy(state.config.menu)
    },
    head: (state) => {
      return copy(state.config.head)
    },
    style: (state) => {
      return copy(state.config.style)
    }
  },
  plugins: [vuexSession.plugin]
});
