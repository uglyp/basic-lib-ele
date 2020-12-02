<template>
  <el-header class="head" height="auto">
    <div class="header" :style="{ backgroundImage: `url(${img.bg})` }">
      <div class="logo-box">
        <img :src="img.logo" alt class="mt25" />
      </div>
      <div class="title-box">
        <!-- <img class="company-title" :src="img.conName" /> -->
        <p class="system-title" v-text="title"></p>
      </div>
      <ul class="layout-right">
        <li class="hello">你好，{{ user }}，欢迎登录系统</li>
        <li class="module" @click="toPwd">
          <a class="link">
            <img :src="img.pwd" />修改密码
          </a>
        </li>
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
import logo from "../../../assets/img/header/logo.png";
import out from "../../../assets/img/header/out.png";
import bg from "../../../assets/img/header/topbg.png";
import pwd from "../../../assets/img/header/pwd.png";
import { Header } from "element-ui";
// import { userExit } from "./dao";
export default {
  name: "Header",
  components: {
    elHeader: Header,
  },
  data() {
    return {
      img: {
        logo,
        out,
        bg,
        pwd,
      },
    };
  },
  props: {
    user: String,
    title: String,
    userExit: Function,
  },
  created() {
    // this.user = window.$app && window.$app.user && window.$app.user.NM;
    document.title = window.config.title || "";
  },
  methods: {
    toPwd() {
      $$.to("/sys/pwd");
    },
    logout() {
      this.$confirm("退出登录吗?")
        .then(async () => {
          this.$emit("exit");
          await this.userExit();
        })
        .catch(() => {
          //-
        });
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

  .logo-box {
    height: 9.5rem;
    display: inline-block;
    padding-left: 1rem;
    display: flex;
    align-items: center;

    img {
      width: 7.8rem;
    }
  }

  .title-box {
    display: inline-block;
    vertical-align: top;
    padding: 0.6rem 0 0 2rem;
    font-weight: bold;
    color: #ffffff;

    .company-title {
      font-size: 2rem;
      line-height: 4rem;
      margin: 0;
      margin-top: 1rem;
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
    padding-right: 2.8rem;
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
