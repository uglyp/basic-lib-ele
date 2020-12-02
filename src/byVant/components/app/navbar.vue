<template>
  <van-nav-bar class="head" fixed placeholder z-index="100">
    <van-icon v-if="isFstRoute" slot="left" name="arrow-left" @click="back" />
    <van-icon v-else slot="left" name="wap-nav" @click="showMenu" />
    <template slot="title">
      <div v-html="$root.sonds" v-if="$route.meta.sond"></div>
      <template v-else>
        <img v-if="logo" :src="logo" />
        <div v-html="title"></div>
        <div v-if="titles" v-html="titles" class="titles"></div>
      </template>
    </template>
  </van-nav-bar>
</template>
<script>
export default {
  data() {
    return {
      isFstRoute: true,
      title: "",
      logo: "",
      titles: "",
      sonds: false
    };
  },
  created() {
    this.setInfo();
  },
  watch: {
    $route() {
      window.sfn = this.setInfo;
      this.setInfo();
    }
  },
  methods: {
    setTitle({ title, logo, titles }) {
      this.title = title;
      document.title = title;
      this.logo = logo;
      this.titles = titles;
    },
    setInfo() {
      const { matched, query } = this.$route;
      const m = matched[matched.length - 1];
      const { instances } = m || {};
      const { default: d } = instances || {};
      const { nav } = d || {};
      const { app } = this.$store.getters;
      let { title, logo, titles } = nav || {};
      if (!title) {
        title = app.title;
        logo = app.logo;
        titles = app.titles;
      }
      this.isFstRoute = matched.length > 1 || query.mapid || query.bookid;
      this.setTitle({ title, logo, titles });
    },
    back() {
      this.$router.back();
    },
    showMenu() {
      this.$emit("showMenu");
    }
  }
};
</script>
