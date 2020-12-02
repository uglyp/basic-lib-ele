<template>
  <div class="left-menu">
    <div class="top" :style="style">
      <strong v-text="user.NM"></strong>
      <span v-text="user.DEPARTMENT_NM"></span>
    </div>
    <ul class="menu">
      <li @click="exit">
        <van-icon name="guanbi" class-prefix="icon" />
        <span>退出</span>
      </li>
    </ul>
  </div>
</template>
<script>
import menubg from "@/assets/img/mbg.jpg";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    style() {
      return {
        backgroundImage: `url(${menubg})`
      };
    }
  },
  mounted() {
    //$c.log(this.user, "用户信息");
  },
  methods: {
    exit() {
      this.$dialog
        .confirm({
          title: "确认",
          message: "您确定退出登录吗?"
        })
        .then(() => {
          $app.exit();
        })
        .catch(() => {
          // -
        });
    }
  }
};
</script>
