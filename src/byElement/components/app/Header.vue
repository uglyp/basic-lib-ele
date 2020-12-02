<template>
  <el-header class="header" height="auto" :style="{ backgroundImage: `url(${img.bg})` }">
    <img class="logo" :src="app.logo" alt />
    <div class="title">
      <h2 class="unit" v-if="app.unit" v-html="app.unit"></h2>
      <h1 class="txt" v-text="app.title"></h1>
    </div>
    <ul class="other">
      <li class="hello" v-if="user">你好，{{ user }}，欢迎登录系统</li>
      <template v-for="(i, index) in app.slot">
        <li style="cursor: pointer;" v-if="app.slot" :key="index" @click="slotClick(i.down)">
          <img :src="i.icon" style="vertical-align: middle;" />
          {{ i.txt }}
        </li>
      </template>
      <li class="module" v-if="pwd" @click="editPwd">
        <a class="link">
          <i class="el-icon-lock" />
          <span>修改密码</span>
        </a>
      </li>
      <li class="module" @click="logout">
        <a class="link">
          <i class="el-icon-switch-button" />
          <span>退出</span>
        </a>
      </li>
    </ul>
  </el-header>
</template>
<script>
import bg from "../../../assets/img/header/topbg.png";
import file from "../../../utils/file";
import { Header } from "element-ui";
// const usr = window.config.usrPath || "sso/auth/";
export default {
  name: "comHeaderCse",
  components: {
    elHeader: Header
  },
  data() {
    return {
      // user: "",
      token: "",
      img: {
        bg
      }
    };
  },
  props: {
    pwd: Function
  },
  computed: {
    user() {
      if ($app.user) {
        return $app.user.NM;
      }
    },
    app() {
      // $c.log(sessionStorage);
      const { app } = this.$store.getters;
      if (app.title) {
        document.title = app.title;
      }
      return app;
    }
  },
  methods: {
    editPwd() {},
    logout() {
      window.$$.$confirm("退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
        customClass: "smalls"
      })
        .then(async () => {
          this.$emit("logout");
        })
        .catch($$.err);
    },
    slotClick(v) {
      file.down(v);
    }
  }
};
</script>
<style lang="scss">
.el-header.header {
  padding: 2rem;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  user-select: none;
  display: flex;
  width: 100%;
  color: #fff;
  align-items: center;
  .logo {
    padding: 0 1rem 0 0;
    max-height: 6.2rem;
    max-width: 15.1rem;
  }
  .title {
    display: flex;
    align-content: center;
    font-weight: bold;
    flex-wrap: wrap;
    .unit {
      font-size: 2rem;
      width: 100%;
      margin-bottom: 0.8rem;
    }
    .txt {
      font-size: 2.8rem;
    }
  }
  .other {
    flex-grow: 1000;
    flex-shrink: 0;
    list-style: none;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    li {
      display: block;
      & + li {
        margin-left: 2rem;
      }
      a {
        display: flex;
        align-items: center;
        // text-decoration: none;
        i {
          margin-right: 0.5rem;
          font-size: 1.4em;
        }
      }
    }
  }
}
</style>
