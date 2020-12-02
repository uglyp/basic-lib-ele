import App from "./App.vue";
import routes from "./router";
import {
  init
} from '../element/common';
import p from '../package.json'
init({
  App,
  routes,
  p
})