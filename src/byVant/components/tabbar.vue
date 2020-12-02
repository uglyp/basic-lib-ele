<template>
  <van-tabbar fixed v-model="cur" placeholder safe-area-inset-bottom>
    <van-tabbar-item
      v-for="(t, key) in menu"
      icon-prefix="my-icon"
      :icon="t.icon"
      :key="key"
      :to="key"
      :name="key"
      :badge="t.badge * 1 ? t.badge : ''"
    >
      {{ t.txt }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  props: {
    menu: Object
  },
  data() {
    return {
      cur: 0
    };
  },
  watch: {
    $route(r) {
      this.cur = r.matched[0].path;
    }
  }
};
</script>
