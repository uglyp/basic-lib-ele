<template>
  <el-container id="app" class="all" v-if="statusMap.success === status">
    <com-header @logout="out" />
    <el-container class="content">
      <com-menu :config="{ menu: config.menu, code: powerCode }" />
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
    <com-footer />
  </el-container>
  <com-load v-else-if="statusMap.load === status" />
  <com-err v-else-if="statusMap.err === status" />
  <com-login v-else-if="statusMap.login === status" @login="setUser" />
</template>
<script>
import { comMenu, comHeader, comLogin, comFooter, comErr, comLoad, $ } from "../../../element/";
import { Container, Header, Main, Aside } from "element-ui";
const p = "sso/auth/";
const info = p + "info";
const login = p + "lg";
const logout = p + "exit";
const dao = {
  init() {
    let appid;
    if (window.config) {
      appid = window.config.appid;
    }
    if (!appid) {
      $$.msg.error("config.appid 获取失败");
    }
    return $.get(info, { appid }, { silent: true });
  },
  login(act, pwd) {
    return $.get(login, { act, pwd });
  },
  logout() {
    return $.get(logout);
  }
};
const statusMap = {
  load: 0,
  login: 1,
  success: 2,
  err: 3
};
export default {
  components: {
    elAside: Aside,
    elContainer: Container,
    elHeader: Header,
    elMain: Main,
    comMenu,
    comHeader,
    comLogin,
    comLoad,
    comErr,
    comFooter
  },
  props: {
    // menu: Array,
    // code: Array,
    config: {
      type: Object,
      default(v) {
        return (
          v || {
            code: [],
            menu: []
          }
        );
      }
    },
    test: Boolean
  },
  data() {
    return {
      status: statusMap.load,
      statusMap,
      user: null,
      power: null
    };
  },
  computed: {
    powerCode() {
      let { power } = this;
      power = power || [];
      let code = this.config.code || [];
      return power.concat(code);
    }
  },
  beforeCreate() {
    window.$app = this;
    if (this.$store) {
      let config = Object.assign({}, this.$store.state.config, window.config);
      this.$store.commit("setConfig", config);
      if (this.$store.getters.app.title) {
        document.title = this.$store.getters.app.title;
      }
    } else {
      // -
    }
  },
  created() {
    if (!this.test) {
      this.checkLogin();
    } else {
      this.status = statusMap.success;
    }
  },
  methods: {
    setUser(user, power) {
      this.$store.commit("setUser", user);
      this.$store.commit("setPowerCode", power);
      const cb = () => {
        this.user = user;
        this.power = power;
        this.status = statusMap.success;
      };
      if (this.config.on && this.config.on.logined) {
        this.config.on.logined({
          $store: this.$store,
          cb
        });
      } else {
        cb();
      }
    },
    out() {
      dao
        .logout()
        .then(() => {
          this.status = statusMap.login;
          // $$.rto("/");
        })
        .catch($$.err);
    },
    checkLogin() {
      dao
        .init()
        .then(r => {
          if (r.USER) {
            this.setUser(r.USER, r.POWER);
          } else {
            this.status = statusMap.login;
          }
        })
        .catch(err => {
          $c.error(err);
          this.status = statusMap.err;
        });
    }
  }
};
</script>
