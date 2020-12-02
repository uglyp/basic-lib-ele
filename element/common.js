import './init'
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Vue from 'vue';
import store from '../src/store/'
import Router from 'vue-router';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI.Loading);
Vue.use(Router);
import '../theme/index.css'
import '../src/assets/style/element/index.scss'
import _p from '../package.json'

const init = (config = {}) => {
  const {
    App,
    routes,
    p
  } = config
  if (!App) {
    $c.error('请传入App (app.vue)')
    return
  }
  if (!routes) {
    $c.error('请传入routes (router.js)')
    return
  }
  if (!p) {
    $c.error('请传入p (package.json)')
    return
  }
  $c.version(_p)
  $c.version(p)
  const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
  new Vue({
    router: new Router({
      mode: "history",
      routes
    }),
    store,
    render: h => h(App)
  }).$mount("#app");

}
export {
  ElementUI,
  Vue,
  Vuex,
  VuexPersistence,
  Router,
  locale,
  store,
  init
}
