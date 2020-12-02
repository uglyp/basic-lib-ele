<template>
  <el-header class="head" height="auto" :style="{ backgroundImage: `url(${img.bg})` }">
    <div class="logo-box-qnlm">
      <img :src="img.logo" alt class="mt25" />
      <div class="title-box-qnlm">
        <!-- <img class="company-title" :src="img.conName" /> -->
        <p class="system-title" v-text="title"></p>
      </div>
    </div>
    <ul class="layout-right">
      <li class="hello">你好，{{ user }}，欢迎登录系统</li>
      <li class="module" @click="toPwd">
        <a class="link"> <img :src="img.pwd" />修改密码 </a>
      </li>
      <li class="module" @click="logout">
        <a class="link"> <img :src="img.out" />退出 </a>
      </li>
    </ul>
  </el-header>
</template>

<script>
import logo from "../../../assets/img/header/logoQnlm.png";
import out from "../../../assets/img/header/out.png";
import bg from "../../../assets/img/header/topbg.png";
import pwd from "../../../assets/img/header/pwd.png";
import { Header } from "element-ui";
import $ from "../../../http";
// import { userExit } from "./dao";
export default {
  name: "comHeaderQnlm",
  components: {
    elHeader: Header
  },
  data() {
    return {
      user: "",
      token: "",
      img: {
        logo,
        // conName,
        out,
        bg,
        pwd
      }
    };
  },
  props: {
    title: String,
    userExit: Function,
    config: Object
  },
  mounted() {
    const self = this;
    $.jsonPost("/js/usr/auth/lg")
      .then(val => {
        self.token = val.token;
        $.jsonPost("/js/usr/auth/usernm")
          .then(vals => {
            self.user = vals.APP_NM;
          })
          .catch($$.err);
      })
      .catch($$.err);
  },
  created() {
    document.title = this.title || "";
  },
  methods: {
    toPwd() {
      $.jsonPost("/sso/usr/pwd/separateset", { callback: window.location });
    },
    logout() {
      $$.$confirm("确定要退出登录吗？", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: "smalls",
        center: true
      })
        .then(async () => {
          this.$emit("exit");
          await this.userExit(this.token);
        })
        .catch($$.err);
    }
  }
};
</script>
<style lang="scss">
.head {
  background-repeat: no-repeat;
  background-position: left top;
  background-size: auto 100%;
  background-color: #0b4c8c;
  user-select: none;
  display: flex;

  .logo-box-qnlm {
    display: inline-block;
    padding-left: 1rem;
    display: flex;
    align-items: center;

    img {
      width: 8rem;
    }
  }

  .title-box-qnlm {
    display: inline-block;
    vertical-align: top;
    padding: 0.6rem 0 1rem 2rem;
    font-weight: bold;
    color: #ffffff;

    .company-title {
      font-size: 2rem;
      line-height: 4rem;
      margin: 0;
      margin-top: 1rem;
      width: 29rem;
      max-width: 100%;
    }

    .system-title {
      font-size: 2.8rem;
      line-height: 3.5rem;
      margin: 0;
    }
  }

  .layout-right {
    flex-grow: 1000;
    list-style: none;
    color: rgba(255, 255, 255, 1);
    font-size: 1.4rem;
    padding-right: 2.7rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    li {
      display: inline-block;
      margin-left: 2rem;

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
