<template>
  <van-grid :column-num="col">
    <van-grid-item
      icon-prefix="my-icon"
      v-for="(m, key) in menu"
      :key="key"
      :icon="m.icon"
      :text="m.txt"
      :class="m.class"
      @click="to(`${path}${key}`)"
    />
  </van-grid>
</template>
<script>
export default {
  props: {
    menu: Object,
    col: Number,
    path: String,
    border: Boolean,
    err: String,
    unto: Array,
    all: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  methods: {
    to(rt) {
      if (this.all) {
        this.$router.push(rt);
      } else {
        if ($app.person.all == true) {
          this.unto.indexOf(rt) == -1 ? this.$router.push(rt) : window.$$.msg.error(this.err);
        } else {
          this.$router.push(rt);
        }
      }
    }
  }
};
</script>
