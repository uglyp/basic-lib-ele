<template>
  <van-tabbar class="foot" fixed v-model="cur" v-if="!hide" placeholder>
    <van-tabbar-item
      v-for="(t, k) in tabbar.list"
      :key="k"
      :icon-prefix="tabbar.iconPrefix"
      :icon="t.icon"
      :badge="t.badge * 1 ? t.badge : ''"
      @click="gto(`/${k}`)"
      :name="`/${k}`"
      >{{ t.txt }}</van-tabbar-item
    >
  </van-tabbar>
</template>
<script>
export default {
  props: {
    tabbar: Object
  },
  data() {
    return {
      active: null
    };
  },
  computed: {
    hide() {
      return this.$route.meta.noBar;
    },
    cur: {
      get() {
        if (this.$route.matched[0]) {
          // $c.log(this.$route.matched[0])
          if (
            this.$route.matched[0].path == "/lspecial" ||
            this.$route.matched[0].path == "/special"
          ) {
            return "/book";
          }
          return this.$route.matched[0].path;
        }
      },
      set(val) {
        this.active = val;
      }
    }
  },
  methods: {
    gto(round) {
      if (round == "/nus") {
        $$.msg.error("建设中");
      } else {
        $c.log(round)
        $to(round);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .van-tabbar {
  height: 56px;
}
</style>
