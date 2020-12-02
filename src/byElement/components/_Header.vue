<template>
  <el-header class="head" height="auto">
    <div class="header" :style="{ backgroundImage: `url(${img.bg})` }">
      <div class="logo-box-cse">
        <img :src="logo" alt class="mt25" />
      </div>
      <div class="title-box-cse">
        <h2 v-if="unit" class="company-title" v-text="unit"></h2>
        <h1 class="system-title" v-text="title"></h1>
      </div>
      <ul class="layout-right">
        <li v-if="user" class="hello">你好，{{ user }}，欢迎登录系统</li>
        <!-- <li class="module" @click="toPwd">
          <a class="link">
            <img :src="img.pwd" />修改密码
          </a>
        </li>-->
        <li class="module" @click="logout">
          <a class="link">
            <img :src="img.out" />退出
          </a>
        </li>
      </ul>
    </div>
  </el-header>
</template>
<script>
import out from "../../assets/img/header/out.png";
import bg from "../../assets/img/header/topbg.png";
import pwd from "../../assets/img/header/pwd.png";
import { Header } from "element-ui";
import $ from "../../http";
const usr = window.config.usrPath || "sso/auth/";
export default {
  name: "comHeaderCse",
  components: {
    elHeader: Header,
  },
  data() {
    return {
      user: "",
      token: "",
      unit: window.config.unit,
      logo: window.config.logo,
      title: window.config.title,
      img: {
        out,
        bg,
        pwd,
      },
    };
  },
  props: {
    config: Object,
  },
  mounted() {
    const self = this;
    self.token = self.getQueryString("sso_token");
    $.get(usr + "info", {
      sso_token: self.getQueryString("sso_token"),
    })
      .then((r) => {
        self.user = r.NM;
        window.$app.users = false;
      })
      .catch($$.err);
  },
  created() {
    document.title = this.title || "";
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    toPwd() {
      $.jsonPost(usr + "separateset", {
        callback: window.location,
      });
    },
    logout() {
      window.$$.$confirm("退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
        customClass: "smalls",
      })
        .then(async () => {
          $.get(usr + "exit", {
            sso_token: $app.user.SSO_TOKEN,
          })
            .then($app.exit)
            .catch($$.err);
        })
        .catch($$.err);
    },
  },
};
</script>
<style lang="scss">
.header {
  height: 9.5rem;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: auto 100%;
  background-color: #0b4c8c;
  user-select: none;
  display: flex;
  width: 100%;
  .logo-box-cse {
    display: inline-block;
    padding: 0 1rem;
    display: flex;
    align-items: center;

    img {
      height: 4.6rem;
    }
  }

  .title-box-cse {
    display: flex;
    align-content: center;
    font-weight: bold;
    color: #ffffff;
    flex-wrap: wrap;

    .company-title {
      font-size: 2rem;
      width: 100%;
      margin-bottom: 0.8rem;
      line-height: 1;
    }

    .system-title {
      font-size: 2.8rem;
      line-height: 1;
    }
  }

  .layout-right {
    flex-grow: 1000;
    flex-shrink: 0;
    list-style: none;
    color: rgba(255, 255, 255, 1);
    font-size: 1.4rem;
    padding-right: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    li {
      display: inline-block;
      margin-left: 2rem;
      a {
        display: flex;
        align-items: center;
      }

      span {
        cursor: pointer;
      }

      img {
        vertical-align: middle;
        margin-right: 1rem;
      }
    }

    li.hello {
      margin-right: 2rem;
    }
  }
}
</style>
