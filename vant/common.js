import './init'
import Vuex from 'vuex';
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import '../src/assets/style/vant/index.scss';
import VuexPersistence from 'vuex-persist';
import store from '../src/store/'
import Router from 'vue-router';
import en from 'element-ui/lib/locale/lang/en';
import {
  conTxt,
  conRadio,
  conUploader,
  conDateRange,
  conCheckbox,
  conOpinion,
  conApprove,
  conSelect,
  conSelectTree
}
from './tmpCons';
const cons = {
  conTxt,
  conRadio,
  conUploader,
  conDateRange,
  conCheckbox,
  conOpinion,
  conApprove,
  conSelect,
  conSelectTree
}
for (let k in cons) {
  Vue.component(cons[k].name, cons[k])
}
Vue.use(Router);
Vue.use(Vant);
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
  Vue,
  Vuex,
  VuexPersistence,
  Router,
  en,
  store,
  init
}
