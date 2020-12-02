<template>
  <div v-if="status === statusMap.load"></div>
  <div v-else-if="status === statusMap.login" class="bg" :style="style">
    <login @login="login" :user="user" />
  </div>
  <div id="app" class="bg" v-else-if="status === statusMap.success">
    <slot />
    <van-pull-refresh class="heds" v-model="refresh" @refresh="onRefresh" :disabled="app.noRefresh">
      <navbar @showMenu="showMenu" ref="nav" />
    </van-pull-refresh>
    <div class="content f-c-g" v-if="!refresh">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <tabbar ref="tabbar" v-if="showTab && cfg.tabbar" :tabbar="cfg.tabbar" />
    <van-popup v-model="show" position="left" :style="{ width: '80%', height: '100%' }">
      <left-menu />
    </van-popup>
  </div>
  <div v-else-if="status === statusMap.err" class="bg err" :style="style">
    <h1>
      <img src />
    </h1>
    <h2>系统维护中</h2>
    <p>给您造成不便 , 请谅解</p>
  </div>
</template>
<script>
import { $ } from "../../../vant/";
import login from "../components/app/login";
import tabbar from "../components/app/tabbar";
import navbar from "../components/app/navbar";
import leftMenu from "../components/app/leftMenu";
const userKey = "uswq";
const statusMap = {
  load: 0,
  login: 1,
  success: 2,
  err: 3
};
const p = "sso/auth/";
const dao = {
  lg: p + "lg",
  info: p + "info",
  exit: p + "exit"
};
export default {
  components: {
    login,
    tabbar,
    navbar,
    leftMenu
  },
  props: {
    config: Object,
    test: Boolean
  },
  data() {
    return {
      refresh: false,
      loadCount: 0,
      toast: null,
      statusMap,
      status: statusMap.load,
      show: false,
      showTab: true,
      u: { act: "", pwd: "", isSave: false },
      stys:false
    };
  },
  computed: {
    app() {
      return this.$store.getters.app;
    },
    cfg() {
      return this.config || {};
    },
    style() {
      return {
        backgroundImage: `url(${this.$store.getters.app.bg})`
      };
    },
    noRefresh() {
      return this.$route.meta.noRefresh;
    },
    user: {
      set(u) {
        this.u = u;
      },
      get() {
        const userTxt = window.localStorage.getItem(userKey);
        if (userTxt) {
          this.u = JSON.parse(userTxt);
        }
        return this.u;
      }
    }
  },
  watch: {
    $route(v) {
      window.$r = v;
    }
  },
  beforeCreate() {
    window.$app = this;
    if (this.$store) {
      //$c.log(window.config,'window.config')
      this.$store.commit("setConfig", Object.assign({}, this.$store.state.config, window.config));
    }
  },
  created() {
    const check = () => {
      if (this.test) {
        this.status = statusMap.success;
      } else {
        this.checkUser();
      }
    };
    if (this.config.on && this.config.on.load) {
      this.config.on.load({
        $store: this.$store,
        cb: check
      });
    } else {
      check();
    }
  },
  methods: {
    setTab(cfg) {
      let tabbar = this.config.tabbar.list;
      for (let k in cfg) {
        for (let key in cfg[k]) {
          tabbar[k][key] = cfg[k][key];
        }
      }
      this.showTab = false;
      this.$nextTick(() => (this.showTab = true));
    },
    setTitle(title) {
      const $nav = this.$refs.nav;
      if ($nav) {
        $nav.setTitle(title);
      }
    },
    onRefresh() {
      this.refresh = true;
      this.$nextTick(() => {
        this.refresh = false;
      });
    },
    showMenu() {
      this.show = true;
    },
    exit() {
      $.jsonPost(dao.exit)
        .then(() => {
          this.show = false;
          this.status = statusMap.login;
          this.$store.commit("setConfig", window.config);
          // this.$store.commit("setUser", {});
          $$.to("/");
        })
        .catch($$.err);
    },
    setUser(user) {
      // this.$store.commit("setUser", {});
      this.$store.commit("setUser", JSON.parse(JSON.stringify(user)));
      const cb = () => {
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
    login(user) {
      const { act, pwd } = user;
      $.get(dao.lg, { act, pwd })
        .then(r => {
          this.setUser(r.USER);
          this.$router.push("/");
          if (user.isSave) {
            window.localStorage.setItem(userKey, JSON.stringify(user));
          } else {
            window.localStorage.removeItem(userKey);
          }
        })
        .catch($$.err);
    },
    checkUser() {
      $.jsonPost(dao.info, null, {
        silent: true
      })
        .then(r => {
          if (r.USER) {
            this.setUser(r.USER);
          } else {
            this.status = statusMap.login;
          }
        })
        .catch(() => {
          this.status = statusMap.err;
        });
    },
    setLoad(isAdd = -1) {
      this.loadCount += isAdd;
      if (this.loadCount&&!this.$root.listStats) {
        this.toast = this.$toast.loading({
          message: "加载中...",
          duration: 0,
          overlay: true,
          forbidClick: true
        });
      } else {
        setTimeout(() => {
          if (this.toast && !this.loadCount) {
            this.toast.clear();
          }
        }, 100);
      }
    }
  }
};
</script>
